To install Docker and Docker Compose on **Ubuntu 24.04**, follow these steps. I'll guide you through the process:

### 1. **Update Package Index**

Open a terminal and run the following command to update the system package index:

```bash
sudo apt update
```

### 2. **Install Required Packages**

Install the necessary packages that allow `apt` to use repositories over HTTPS:

```bash
sudo apt install apt-transport-https ca-certificates curl software-properties-common
```

### 3. **Add Docker’s Official GPG Key**

Run the following command to add Docker’s official GPG key to your system:

```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

### 4. **Add Docker Repository**

Now, set up the **Docker stable repository**:

```bash
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

### 5. **Install Docker Engine**

Update the package index again and install Docker:

```bash
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io
```

### 6. **Verify Docker Installation**

To check if Docker was installed successfully, run:

```bash
sudo docker --version
```

You should see the version of Docker that you installed.

### 7. **Manage Docker as a Non-Root User (Optional)**

To avoid using `sudo` for every Docker command, you can add your user to the `docker` group:

```bash
sudo usermod -aG docker $USER
```

Then, log out and back in or run:

```bash
newgrp docker
```

### 8. **Install Docker Compose**

Docker Compose is a tool for running multi-container Docker applications. Follow these steps:

- Download the Docker Compose binary from the official GitHub repository:

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

- Set the correct permissions for the binary:

```bash
sudo chmod +x /usr/local/bin/docker-compose
```

- Verify the installation:

```bash
docker-compose --version
```

### 9. **Enable and Start Docker**

Ensure Docker starts on boot:

```bash
sudo systemctl enable docker
sudo systemctl start docker
```

# For the permission error solve

The error you're encountering, "permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock", happens because your user doesn't have the necessary permissions to communicate with the Docker daemon. By default, Docker requires root privileges to manage containers.

Here’s how to fix it:

### 1. **Add Your User to the Docker Group**

The most common way to resolve this issue is to add your user to the `docker` group, which grants the required permissions to access the Docker daemon without using `sudo`.

Run the following command:

```bash
sudo usermod -aG docker $USER
```

After running this command, log out of your session and log back in, or run the following command to refresh the group membership:

```bash
newgrp docker
```

Now try running `docker-compose up` again. You should no longer see the "permission denied" error.

### 2. **Check Docker Group Membership**

To confirm that your user has been successfully added to the `docker` group, you can check your group memberships by running:

```bash
groups $USER
```

You should see `docker` listed as one of the groups. If it's not listed, try the steps again, ensuring to log out and log back in.

### 3. **Check Docker Service is Running**

If you're still having issues, make sure the Docker service is running properly:

```bash
sudo systemctl status docker
```

If the service is inactive, you can start it with:

```bash
sudo systemctl start docker
```

### 4. **Use `sudo` as a Temporary Fix (Optional)**

If you don't want to add your user to the `docker` group, you can run Docker commands with `sudo` as a workaround:

```bash
sudo docker-compose up
```

However, adding your user to the `docker` group is the best solution for convenience.

Once you've done this, you should be able to run `docker-compose` commands without facing permission issues.
