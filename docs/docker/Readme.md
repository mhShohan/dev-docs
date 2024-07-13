- **_Docker:_** Docker is a platform that automates the deployment, scaling, and management of applications using containerization, allowing developers to package applications with all their dependencies into standardized units called containers.
- **_Docker Images:_** A Docker image is a lightweight, standalone package that includes everything needed to run a piece of software, such as code, runtime, libraries, and settings. It serves as a template for creating Docker containers.
- **_Docker Container:_** Docker image is a file that contains all the parts needed to run an application, like code and libraries. It's like a blueprint for creating a running version of your app, called a container.

# Docker Commands

- `docker ps` or `docker container ls` - show all running containers
- `docker container ls -a` - show all containers
- `docker start/stop container__id` - start/stop a container
- `docker exec -it container_id_or_name bash` - enter inside of container
- `docker compose up/down -d`

# Docker Networking - [Official Doc](https://docs.docker.com/network/)

- `docker network inspect network___name`
- `docker network ls` - list of all network or network driver
- `docker network create -d mode network__name` - create a new network
- `docker run -it --network=network__name --name container__name image__name` - run container in network
