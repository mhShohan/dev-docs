// job-scheduler.js (Producer)
const amqp = require('amqplib');

class JobScheduler {
  constructor() {
    this.connection = null;
    this.channel = null;
    this.initialize();
  }

  async initialize() {
    try {
      this.connection = await amqp.connect('amqp://localhost');
      this.channel = await this.connection.createChannel();

      // Set up different queues for different job types
      this.queues = {
        reports: 'reports_generation',
        emails: 'email_sending',
        imageProcessing: 'image_processing'
      };

      // Initialize all queues
      for (const queue of Object.values(this.queues)) {
        await this.channel.assertQueue(queue, { durable: true });
      }

      console.log('[✓] Job scheduler initialized');
    } catch (error) {
      console.error('Failed to initialize job scheduler:', error);
      throw error;
    }
  }

  async scheduleJob(type, data, options = {}) {
    if (!this.queues[type]) {
      throw new Error(`Unknown job type: ${type}`);
    }

    const queue = this.queues[type];
    const job = {
      id: `job_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      type,
      data,
      createdAt: new Date().toISOString()
    };

    try {
      this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(job)), {
        persistent: true,
        contentType: 'application/json',
        priority: options.priority || 0,
        expiration: options.ttl?.toString(),
        ...options.messageProps
      });

      console.log(`[+] Scheduled ${type} job: ${job.id}`);
      return job.id;
    } catch (error) {
      console.error(`Failed to schedule ${type} job:`, error);
      throw error;
    }
  }

  async close() {
    if (this.channel) await this.channel.close();
    if (this.connection) await this.connection.close();
  }
}

// Example usage:
async function demo() {
  const scheduler = new JobScheduler();

  // Wait for initialization
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Schedule various jobs
  await scheduler.scheduleJob('reports', {
    reportType: 'monthly-sales',
    format: 'pdf',
    filters: { month: 3, year: 2025 }
  });

  await scheduler.scheduleJob('emails', {
    template: 'welcome',
    recipient: 'user@example.com',
    variables: { name: 'New User', activationLink: 'https://example.com/activate/abc123' }
  }, { priority: 10 });

  await scheduler.scheduleJob('imageProcessing', {
    sourceFile: '/uploads/image1.jpg',
    operations: ['resize', 'compress', 'watermark'],
    targetPath: '/processed/'
  }, { ttl: 3600000 });  // 1 hour TTL

  // Close connections
  await scheduler.close();
}

// Run the demo
demo().catch(console.error);

// worker.js (Consumer)
const amqp = require('amqplib');
const { fork } = require('child_process');
const path = require('path');

class Worker {
  constructor(queueName, handlersPath, concurrency = 1) {
    this.queueName = queueName;
    this.handlersPath = handlersPath;
    this.concurrency = concurrency;
    this.connection = null;
    this.channel = null;
    this.activeJobs = new Map();
  }

  async start() {
    try {
      this.connection = await amqp.connect('amqp://localhost');
      this.connection.on('error', this.handleConnectionError.bind(this));

      this.channel = await this.connection.createChannel();
      await this.channel.assertQueue(this.queueName, { durable: true });
      this.channel.prefetch(this.concurrency);

      console.log(`[*] Worker started for queue '${this.queueName}' with concurrency ${this.concurrency}`);

      this.channel.consume(this.queueName, this.processJob.bind(this));
    } catch (error) {
      console.error(`Error starting worker for queue '${this.queueName}':`, error);
      this.handleConnectionError(error);
    }
  }

  async processJob(msg) {
    if (!msg) return;

    try {
      const job = JSON.parse(msg.content.toString());
      console.log(`[>] Processing job ${job.id} of type ${job.type}`);

      // Create a child process to handle the job
      const child = fork(this.handlersPath, [], {
        env: { ...process.env, JOB_DATA: JSON.stringify(job) }
      });

      this.activeJobs.set(job.id, { child, startTime: Date.now() });

      child.on('message', (result) => {
        if (result.success) {
          console.log(`[✓] Job ${job.id} completed successfully`);
          this.channel.ack(msg);
        } else {
          console.error(`[✗] Job ${job.id} failed:`, result.error);
          // Determine whether to retry or dead-letter
          const retryCount = (msg.properties.headers?.retryCount || 0) + 1;
          if (retryCount <= 3) {
            // Retry with backoff
            const backoff = Math.pow(2, retryCount) * 1000;
            setTimeout(() => {
              this.channel.publish('', this.queueName, msg.content, {
                persistent: true,
                headers: { ...msg.properties.headers, retryCount }
              });
              this.channel.ack(msg);
            }, backoff);
            console.log(`[↻] Retrying job ${job.id} in ${backoff}ms (attempt ${retryCount})`);
          } else {
            // Move to dead-letter queue
            this.channel.sendToQueue('dead_letter', msg.content, {
              persistent: true,
              headers: { ...msg.properties.headers, failedQueue: this.queueName }
            });
            this.channel.ack(msg);
            console.log(`[☠] Moved job ${job.id} to dead-letter queue after ${retryCount} failed attempts`);
          }
        }
        this.activeJobs.delete(job.id);
      });

      child.on('error', (error) => {
        console.error(`[!] Child process error for job ${job.id}:`, error);
        this.channel.nack(msg, false, true);
        this.activeJobs.delete(job.id);
      });

      // Set timeout for long-running jobs
      setTimeout(() => {
        if (this.activeJobs.has(job.id)) {
          console.warn(`[⏰] Job ${job.id} timed out after 5 minutes`);
          child.kill('SIGTERM');
          this.channel.nack(msg, false, true);
          this.activeJobs.delete(job.id);
        }
      }, 5 * 60 * 1000);

    } catch (error) {
      console.error('Error processing message:', error);
      this.channel.nack(msg, false, false);
    }
  }

  handleConnectionError(error) {
    console.error('Connection error:', error);
    // Attempt to reconnect after a delay
    setTimeout(() => this.start(), 5000);
  }

  async shutdown() {
    console.log('Shutting down worker...');

    // Give active jobs a chance to complete
    const activeJobCount = this.activeJobs.size;
    if (activeJobCount > 0) {
      console.log(`Waiting for ${activeJobCount} active jobs to complete...`);
      // Wait for jobs with a timeout
      setTimeout(() => {
        // Force kill any remaining jobs
        for (const [jobId, { child }] of this.activeJobs.entries()) {
          console.warn(`Forcefully terminating job ${jobId}`);
          child.kill('SIGKILL');
        }
        this.closeConnection();
      }, 10000);
    } else {
      this.closeConnection();
    }
  }

  async closeConnection() {
    try {
      if (this.channel) await this.channel.close();
      if (this.connection) await this.connection.close();
      console.log('Worker shutdown complete');
    } catch (error) {
      console.error('Error during shutdown:', error);
      process.exit(1);
    }
  }
}

// Example job handler (imageProcessor.js)
process.on('message', async () => {
  const job = JSON.parse(process.env.JOB_DATA);

  try {
    // Simulate image processing
    console.log(`Processing image ${job.data.sourceFile} with operations: ${job.data.operations.join(', ')}`);

    // Simulate work
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Send success message back to parent
    process.send({ success: true, result: { processedPath: job.data.targetPath + 'processed_' + path.basename(job.data.sourceFile) } });
  } catch (error) {
    // Send error message back to parent
    process.send({ success: false, error: error.message });
  }
});

// Start workers for different queues
const imageWorker = new Worker('image_processing', './imageProcessor.js', 2);
imageWorker.start();

// Handle graceful shutdown
process.on('SIGTERM', () => imageWorker.shutdown());
process.on('SIGINT', () => imageWorker.shutdown());
