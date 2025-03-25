// producer.js
const amqp = require('amqplib');

async function sendMessage() {
  try {
    // Connect to RabbitMQ server
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    
    // Declare a queue
    const queue = 'tasks';
    await channel.assertQueue(queue, { durable: true });
    
    // Send a message
    const message = 'Task to process';
    channel.sendToQueue(queue, Buffer.from(message), { persistent: true });
    console.log(`[x] Sent: ${message}`);
    
    // Close the connection
    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    console.error('Error:', error);
  }
}

sendMessage();

// consumer.js
const amqp = require('amqplib');

async function receiveMessages() {
  try {
    // Connect to RabbitMQ server
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    
    // Declare the same queue
    const queue = 'tasks';
    await channel.assertQueue(queue, { durable: true });
    
    // Tell RabbitMQ not to give more than one message at a time
    channel.prefetch(1);
    
    console.log('[*] Waiting for messages. To exit press CTRL+C');
    
    // Consume messages
    channel.consume(queue, (msg) => {
      if (msg !== null) {
        const content = msg.content.toString();
        console.log(`[x] Received: ${content}`);
        
        // Simulate processing time
        setTimeout(() => {
          console.log('[x] Done processing');
          // Acknowledge message (remove from queue)
          channel.ack(msg);
        }, 1000);
      }
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

receiveMessages();
