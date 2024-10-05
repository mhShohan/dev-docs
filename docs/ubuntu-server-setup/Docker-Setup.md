# Setup Docker on Linux(Ubuntu) for First Time

## 1. Install Docker
```bash
# Update package lists
sudo apt-get update

# Remove existing Docker packages
sudo apt-get remove docker docker-engine docker.io containerd runc -y

# Install required packages for Docker installation
sudo apt-get install apt-transport-https ca-certificates curl software-properties-common -y

# Add Docker's official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

# Add Docker repository
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"

# Update package information with the new Docker repository
sudo apt-get update

# Install Docker CE (Community Edition)
sudo apt-get install docker-ce -y

# Check the status of Docker service
sudo systemctl status docker

sudo usermod -aG docker $USER # Add User to Docker Group (Reboot Required) 
```

## 2. Install Docker Compose
```bash
sudo apt install -y docker-compose
```

## 3. Test Docker
```bash
docker --version # Check Docker Version
docker-compose --version # Check Docker Compose Version
```

## 4. Check Docker Status
```bash
sudo systemctl status docker # Check Docker Status
```


## 5. Docker Configuration File
```bash
sudo nano /etc/docker/daemon.json # Open Docker Configuration File
```

## 6. Docker Log Files
```bash
sudo journalctl -u docker # Check Docker Log Files
```

## 7. List Docker Images
```bash
docker images # List Docker Images
```

## 8. List Docker Containers
```bash
docker ps -a # List Docker Containers
```

## 9. Run NodeJS Docker Container
```bash
docker run -it node:latest bash # Run NodeJS Docker Container
```
## 9.1. Run Nginx Docker Container
```bash
docker run -d -p 80:80 nginx # Run Nginx Docker Container
```

## 10. Remove Docker Images
```bash
docker rmi <image_id> # Remove Docker Images
```

## 11. Remove Docker Containers
```bash
docker rm <container_id> # Remove Docker Containers
```

## 12. Docker Comands
```bash
docker --help # Docker Help
docker container --help # Docker Container Help
docker image --help # Docker Image Help
docker volume --help # Docker Volume Help
docker network --help # Docker Network Help
docker info # Docker Information
docker system df # Docker Disk Usage
docker system prune # Docker System Prune
```
