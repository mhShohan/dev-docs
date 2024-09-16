To containerize your MERN stack application using Docker and Docker Compose, we'll create separate services for the **client (Next.js)** and **server (Node.js with MongoDB)**. Here's a step-by-step guide to help you set up your Docker environment.

### Directory Structure

Assuming your project has this structure:

```plaintext
/your-project
    /client           # Next.js frontend
    /server           # Node.js backend
    /db               # MongoDB data
    docker-compose.yml
```

### Step 1: Create Dockerfiles for the Client and Server

#### **Client (Next.js) Dockerfile**

In the `/client` directory, create a `Dockerfile`:

```Dockerfile
# Dockerfile for Client (Next.js)

# Use Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app for production
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Run the Next.js app
CMD ["npm", "start"]
```

#### **Server (Node.js Backend) Dockerfile**

In the `/server` directory, create a `Dockerfile`:

```Dockerfile
# Dockerfile for Server (Node.js)

# Use Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 5000
EXPOSE 5000

# Start the Node.js server
CMD ["npm", "start"]
```

### Step 2: Docker Compose Configuration

In the root directory of your project, create a `docker-compose.yml` file that defines services for **client**, **server**, and **MongoDB**.

```yaml
version: '3.8'
services:
  # MongoDB Service
  mongodb:
    image: mongo:6.0
    container_name: mongo
    ports:
      - '27017:27017'
    volumes:
      - ./db:/data/db
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: example

  # Backend Service
  server:
    build: ./server
    container_name: server
    environment:
      - PORT=5000
      - MONGODB_URI=mongodb://root:example@mongodb:27017/your-db-name?authSource=admin
    ports:
      - '5000:5000'
    depends_on:
      - mongodb
    volumes:
      - ./server:/app
    env_file:
      - ./server/.env

  # Frontend Service
  client:
    build: ./client
    container_name: client
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:5000
    ports:
      - '3000:3000'
    depends_on:
      - server
    volumes:
      - ./client:/app
    env_file:
      - ./client/.env
```

### Step 3: Environment Variables

Make sure you have the required environment variables in the respective `.env` files for both `server` and `client` directories.

#### `/server/.env`

```plaintext
PORT=5000
MONGODB_URI=mongodb://root:example@mongodb:27017/your-db-name?authSource=admin
```

#### `/client/.env`

```plaintext
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Step 4: Build and Run with Docker Compose

Now, you can build and run your MERN stack application using Docker Compose.

1. **Build the containers**:

   ```bash
   docker-compose build
   ```

2. **Run the containers**:

   ```bash
   docker-compose up
   ```

### Step 5: Verify the Services

- **MongoDB** should be accessible at `mongodb://localhost:27017`.
- **Server** should be running on `http://localhost:5000`.
- **Client** should be accessible on `http://localhost:3000`.

### Step 6: Use Docker Compose in Detached Mode (Optional)

To run Docker Compose in the background, use the `-d` flag:

```bash
docker-compose up -d
```

### Explanation:

- **MongoDB** is defined as a service with authentication (`root`/`example`) and a volume to persist the data (`./db:/data/db`).
- The **server** depends on **mongodb**, and its `MONGODB_URI` environment variable points to the MongoDB container.
- The **client** depends on the **server**, and the environment variable `NEXT_PUBLIC_API_URL` points to the backend.

This setup will make sure your frontend and backend services are isolated but can communicate with each other via Docker Compose networking.
