// event-emitter.js (Producer)
const amqp = require('amqplib');
const { v4: uuidv4 } = require('uuid');

class EventEmitter {
  constructor(config = {}) {
    this.config = {
      url: config.url || 'amqp://localhost',
      exchange: config.exchange || 'events',
      exchangeType: config.exchangeType || 'topic',
      appId: config.appId || 'event-emitter'
    };
    this.connection = null;
    this.channel = null;
    this.isConnected = false;
    this.connectPromise = null;
  }
  
  async connect() {
    if (this.isConnected) return;
    
    if (this.connectPromise) {
      return this.connectPromise;
    }
    
    this.connectPromise = (async () => {
      try {
        this.connection = await amqp.connect(this.config.url);
        this.connection.on('error', this.handleConnectionError.bind(this));
        
        this.channel = await this.connection.createChannel();
        await this.channel.assertExchange(this.config.exchange, this.config.exchangeType, {
          durable: true,
          autoDelete: false
        });
        
        this.isConnected = true;
        console.log(`[✓] Connected to RabbitMQ and initialized exchange '${this.config.exchange}'`);
      } catch (error) {
        console.error('Failed to connect to RabbitMQ:', error);
        this.isConnected = false;
        throw error;
      } finally {
        this.connectPromise = null;
      }
    })();
    
    return this.connectPromise;
  }
  
  handleConnectionError(error) {
    console.error('Connection error:', error);
    this.isConnected = false;
    
    // Attempt to reconnect after delay
    setTimeout(() => {
      console.log('Attempting to reconnect...');
      this.connect().catch(e => console.error('Reconnect failed:', e));
    }, 5000);
  }
  
  async emit(eventType, data, options = {}) {
    if (!this.isConnected) {
      await this.connect();
    }
    
    const event = {
      eventId: options.eventId || uuidv4(),
      eventType,
      timestamp: options.timestamp || new Date().toISOString(),
      source: options.source || this.config.appId,
      correlationId: options.correlationId,
      data
    };
    
    const routingKey = options.routingKey || eventType;
    
    try {
      this.channel.publish(this.config.exchange, routingKey, Buffer.from(JSON.stringify(event)), {
        persistent: true,
        contentType: 'application/json',
        contentEncoding: 'utf-8',
        messageId: event.eventId,
        appId: this.config.appId,
        timestamp: Math.floor(Date.now() / 1000),
        correlationId: options.correlationId,
        headers: options.headers || {}
      });
      
      console.log(`[→] Emitted event ${eventType} with ID ${event.eventId}`);
      return event.eventId;
    } catch (error) {
      console.error(`Failed to emit event ${eventType}:`, error);
      throw error;
    }
  }
  
  async close() {
    if (this.channel) await this.channel.close();
    if (this.connection) await this.connection.close();
    this.isConnected = false;
    console.log('EventEmitter connection closed');
  }
}

// Example usage:
async function simulateIoTSystem() {
  const emitter = new EventEmitter({
    appId: 'iot-sensors',
    exchange: 'sensor-events'
  });
  
  await emitter.connect();
  
  // Simulate different sensors
  const sensors = [
    { id: 'temp-1', type: 'temperature', location: 'warehouse-a' },
    { id: 'temp-2', type: 'temperature', location: 'warehouse-b' },
    { id: 'hum-1', type: 'humidity', location: 'warehouse-a' },
    { id: 'motion-1', type: 'motion', location: 'entrance' }
  ];
  
  // Emit events
  for (let i = 0; i < 10; i++) {
    for (const sensor of sensors) {
      // Generate random sensor data
      let value;
      switch (sensor.type) {
        case 'temperature':
          value = 20 + Math.random() * 10; // 20-30°C
          break;
        case 'humidity':
          value = 30 + Math.random() * 40; // 30-70%
          break;
        case 'motion':
          value = Math.random() > 0.7; // Boolean
          break;
      }
      
      await emitter.emit('sensor.reading', {
        sensorId: sensor.id,
        sensorType: sensor.type,
        location: sensor.location,
        value,
        unit: sensor.type === 'temperature' ? 'celsius' : 
              sensor.type === 'humidity' ? 'percent' : 'boolean'
      }, {
        routingKey: `sensor.${sensor.type}.${sensor.location}`,
        headers: {
          priority: sensor.type === 'motion' ? 'high' : 'normal'
        }
      });
      
      // Random delay
      await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300));
    }
  }
  
  await emitter.close();
}

// Uncomment to run:
// simulateIoTSystem().catch(console.error);

// event-processor.js (Consumer)
const amqp = require('amqplib');

class EventProcessor {
  constructor(config = {}) {
    this.config = {
      url: config.url || 'amqp://localhost',
      exchange: config.exchange || 'events',
      exchangeType: config.exchangeType || 'topic',
      queueName: config.queueName,
      bindings: config.bindings || ['#'],
      prefetch: config.prefetch || 10
    };
    this.connection = null;
    this.channel = null;
    this.handlers = new Map();
  }
  
  async start() {
    try {
      this.connection = await amqp.connect(this.config.url);
      this.connection.on('error', this.handleConnectionError.bind(this));
      
      this.channel = await this.connection.createChannel();
      await this.channel.assertExchange(this.config.exchange, this.config.exchangeType, { durable: true });
      
      // Create a queue with a specific name or let RabbitMQ generate one
      const { queue } = await this.channel.assertQueue(this.config.queueName || '', {
        exclusive: !this.config.queueName,
        durable: !!this.config.queueName,
        autoDelete: !this.config.queueName
      });
      
      this.queueName = queue;
      
      // Bind queue to exchange with specified routing patterns
      for (const binding of this.config.bindings) {
        await this.channel.bindQueue(queue, this.config.exchange, binding);
      }
      
      this.channel.prefetch(this.config.prefetch);
      
      console.log(`[✓] Event processor started with queue '${queue}', listening to: ${this.config.bindings.join(', ')}`);
      
      this.channel.consume(queue, this.processEvent.bind(this));
    } catch (error) {
      console.error('Failed to start event processor:', error);
      throw error;
    }
  }
  
  async processEvent(msg) {
    if (!msg) return;
    
    try {
      const event = JSON.parse(msg.content.toString());
      const routingKey = msg.fields.routingKey;
      
      console.log(`[←] Received ${event.eventType} event with routing key ${routingKey}`);
      
      let handled = false;
      
      // Find and execute matching handlers
      for (const [pattern, handler] of this.handlers.entries()) {
        if (this.matchRoutingKey(routingKey, pattern)) {
          try {
            await handler(event, {
              routingKey,
              properties: msg.properties,
              headers: msg.properties.headers || {}
            });
            handled = true;
          } catch (handlerError) {
            console.error(`Handler for pattern '${pattern}' failed:`, handlerError);
            // Don't acknowledge - let it be requeued
            this.channel.nack(msg, false, true);
            return;
          }
        }
      }
      
      if (!handled) {
        console.warn(`No handler processed event ${event.eventId} (${event.eventType})`);
      }
      
      // Acknowledge the message
      this.channel.ack(msg);
    } catch (error) {
      console.error('Error processing event:', error);
      // In case of parsing errors, reject without requeue
      this.channel.reject(msg, false);
    }
  }
  
  matchRoutingKey(routingKey, pattern) {
    if (pattern === '#') return true;
    
    const routingParts = routingKey.split('.');
    const patternParts = pattern.split('.');
    
    if (patternParts.length > routingParts.length && patternParts[patternParts.length - 1] !== '#') {
      return false;
    }
    
    for (let i = 0; i < patternParts.length; i++) {
      if (patternParts[i] === '#') return true;
      if (patternParts[i] !== '*' && patternParts[i] !== routingParts[i]) return false;
    }
    
    return patternParts.length === routingParts.length || 
           (patternParts[patternParts.length - 1] === '#');
  }
  
  on(pattern, handler) {
    if (typeof handler !== 'function') {
      throw new Error('Handler must be a function');
    }
    
    this.handlers.set(pattern, handler);
    console.log(`[+] Registered handler for pattern: ${pattern}`);
    return this;
  }
  
  handleConnectionError(error) {
    console.error('Connection error:', error);
    // Attempt to reconnect after delay
    setTimeout(() => {
      console.log('Attempting to reconnect...');
      this.start().catch(e => console.error('Reconnect failed:', e));
    }, 5000);
  }
  
  async close() {
    if (this.channel) await this.channel.close();
    if (this.connection) await this.connection.close();
    console.log('Event processor closed');
  }
}

// Example usage:
async function startAlertSystem() {
  const processor = new EventProcessor({
    exchange: 'sensor-events',
    queueName: 'alert-system',
    bindings: ['sensor.temperature.#', 'sensor.motion.entrance']
  });
  
  // Register handlers
  processor.on('sensor.temperature.#', async (event, meta) => {
    if (event.data.value > 28) {
      console.log(`🔥 HIGH TEMPERATURE ALERT: ${event.data.value}°C at ${event.data.location}`);
      // In a real system, you might trigger alerts, notifications, etc.
    }
  });
  
  processor.on('sensor.motion.entrance', async (event, meta) => {
    if (event.data.value === true) {
      console.log(`🚨 MOTION DETECTED at ${event.data.location}`);
      // Log access, trigger cameras, etc.
    }
  });
  
  await processor.start();
  
  // Keep process running
  console.log('Alert system running. Press Ctrl+C to exit.');
}

// Uncomment to run:
// startAlertSystem().catch(console.error);
