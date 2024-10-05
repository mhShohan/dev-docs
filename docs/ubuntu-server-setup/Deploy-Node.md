# Deploy Node.js Application on Ubuntu Server Using Nginx
## 1. Install Node.js
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash # Install NVM (Node Version Manager)
nvm install node # Install Latest Node.js
# or
nvm install --lts # Install Latest LTS Node.js
# or
nvm install 14.17.6 # Install Specific Node.js
```
## 2. Install Yarn
```bash
npm install -g yarn
```
## 3. Install PM2(Production Process Manager for Node.js)
```bash
npm install -g pm2
```
## 4. Clone Node.js Application
```bash
git clone [repository_url] # Clone Node.js Application
cd [repository_name] # Change Directory
yarn install # Install Dependencies
```
## 5. Build Node.js Application
```bash
yarn build # Build Node.js Application
```
## 6. Start Node.js Application
```bash
pm2 start npm --name "[app_name]" -- start # Start Node.js Application
```
## 7. Setup Nginx
```bash
sudo apt install -y nginx # Install Nginx
sudo systemctl start nginx # Start Nginx
sudo systemctl enable nginx # Enable Nginx to Start on Boot
sudo nano /etc/nginx/sites-available/default # Open Nginx Configuration File
```
```nginx
server {
    listen 80;
    server_name [domain_name];

    location / {
        proxy_pass http://localhost:[port];
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
```bash
sudo systemctl restart nginx # Restart Nginx
sudo systemctl status nginx # Check Nginx Status
```
## 8. Setup Firewall
```bash
sudo ufw allow 'Nginx Full' # Allow Nginx Full
sudo ufw allow 'OpenSSH' # Allow OpenSSH
sudo ufw enable # Enable Firewall
sudo ufw status # Check Firewall Status
```

## 9. PM2 Commands
```bash
pm2 monit # Monitor Node.js Application

pm2 stop [app_name] # Stop Node.js Application

pm2 restart [app_name] # Restart Node.js Application

pm2 kill # Kill PM2

pm2 delete [app_name] # Delete Node.js Application
```

## 10. Setup Domain
```bash
sudo nano /etc/hosts # Open Hosts File
```
```plaintext
[server_ip] [domain_name] # Add Domain to Hosts File
```
## 10. Setup SSL (Certbot)
```bash
sudo apt install -y certbot python3-certbot-nginx # Install Certbot
sudo certbot --nginx # Setup SSL 
```
```bash
sudo certbot renew # Renew SSL

sudo certbot renew --dry-run # Test SSL Renewal

sudo certbot certificates # Check SSL Certificates

sudo certbot delete --cert-name [domain_name] # Delete SSL Certificate
```


## 12. Setup Logrotate
```bash
#Logrotate is a utility designed for administrators who manage servers producing a high volume of log files to help them save some disk space as well as to avoid a potential risk of unavailability of services. It allows automatic rotation, compression, removal, and mailing of log files. Each log file may be handled daily, weekly, monthly, or when it grows too large.

sudo nano /etc/logrotate.d/pm2 # Open Logrotate Configuration File
```
```plaintext
/var/log/pm2.log {
    daily
    missingok
    rotate 7
    compress
    delaycompress
    notifempty
    create 640 root adm
    sharedscripts
    postrotate
        [ -f /var/run/pm2.pid ] && kill -USR2 `cat /var/run/pm2.pid`
    endscript
}
```
## 13. Setup Backup( Cron Job )
```bash
# Cron is a time-based job scheduler in Unix-like operating systems. Cron is driven by a crontab (cron table) file, a configuration file that specifies shell commands to run periodically on a given schedule. The crontab files are stored where the lists of jobs and other instructions to the cron daemon are kept.

sudo crontab -e # Open Cron Tab 
```
```plaintext
0 0 * * * tar -zcvf /var/backups/pm2-$(date +\%Y\%m\%d\%H\%M\%S).tar.gz /home/ubuntu/.pm2 # Backup PM2
```