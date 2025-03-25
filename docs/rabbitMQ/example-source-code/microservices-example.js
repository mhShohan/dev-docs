// order-service.js (Producer)
const amqp = require('amqplib');

async function processOrder(orderData) {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    
    // Use an exchange for routing to multiple services
    const exchange = 'orders';
    await channel.assertExchange(exchange, 'topic', { durable: true });
    
    // Different routing keys for different events
    const routingKey = 'order.created';
    channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(orderData)), {
      persistent: true,
      contentType: 'application/json'
    });
    
    console.log(`[x] Published order ${orderData.orderId} to ${routingKey}`);
    
    setTimeout(() => connection.close(), 500);
    return true;
  } catch (error) {
    console.error('Failed to publish order:', error);
    return false;
  }
}

// Sample usage
processOrder({
  orderId: '12345',
  customerId: 'cust-789',
  items: [{ productId: 'prod-101', quantity: 2 }],
  totalAmount: 59.98,
  timestamp: new Date().toISOString()
});

// inventory-service.js (Consumer)
const amqp = require('amqplib');

async function startInventoryService() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    
    const exchange = 'orders';
    const queueName = 'inventory-updates';
    
    await channel.assertExchange(exchange, 'topic', { durable: true });
    const { queue } = await channel.assertQueue(queueName, { durable: true });
    
    // Bind to specific routing patterns
    await channel.bindQueue(queue, exchange, 'order.created');
    await channel.bindQueue(queue, exchange, 'order.updated');
    
    channel.prefetch(1);
    
    console.log('[*] Inventory service waiting for order events');
    
    channel.consume(queue, async (msg) => {
      if (msg) {
        try {
          const orderData = JSON.parse(msg.content.toString());
          console.log(`[x] Processing inventory update for order ${orderData.orderId}`);
          
          // Update inventory logic would go here
          await updateInventory(orderData);
          
          channel.ack(msg);
        } catch (error) {
          console.error('Error processing message:', error);
          // Reject the message and requeue
          channel.nack(msg, false, true);
        }
      }
    });
  } catch (error) {
    console.error('Inventory service failed to start:', error);
  }
}

async function updateInventory(orderData) {
  // Simulate inventory update
  console.log(`Updating inventory for items: ${JSON.stringify(orderData.items)}`);
  return new Promise(resolve => setTimeout(resolve, 500));
}

startInventoryService();
