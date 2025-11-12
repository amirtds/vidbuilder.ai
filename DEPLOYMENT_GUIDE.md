# Production Deployment Guide - Hetzner Ubuntu 24.04

Complete guide to deploy **VidBuilder** on Hetzner with high availability and scalability.

**Application:** VidBuilder  
**Domain:** backend.vidbuilder.ai  
**Node Version:** 24.x (Latest LTS)

## 🎯 Architecture Overview

```
Internet
    ↓
Nginx (Reverse Proxy + SSL)
    ↓
PM2 Process Manager (Auto-restart, Load Balancing)
    ↓
Node.js App (Multiple instances)
    ↓
AWS S3 (Video Storage)
```

## 📋 Prerequisites

- ✅ Hetzner VM with Ubuntu 24.04
- ✅ Root or sudo access
- ✅ Domain: backend.vidbuilder.ai pointed to server IP
- ✅ AWS S3 configured (from previous setup)

---

## 🚀 Quick Deploy with Automated Scripts (Recommended)

### Option A: Fully Automated Deployment (15 minutes)

This is the fastest way to deploy VidBuilder using the provided scripts.

#### Step 1: Upload Scripts to Server

From your local machine:

```bash
# Upload all deployment files to server
scp setup-server.sh deploy.sh monitor.sh ecosystem.config.js nginx.conf root@YOUR_SERVER_IP:~/

# Or if you have the repo:
cd /Users/amir/cubite/aiVideoGenerator
scp setup-server.sh deploy.sh monitor.sh ecosystem.config.js nginx.conf root@YOUR_SERVER_IP:~/
```

#### Step 2: Run Server Setup Script

SSH into your server and run the setup script:

```bash
# SSH into server
ssh root@YOUR_SERVER_IP

# Make script executable
chmod +x setup-server.sh

# Run setup (installs Node.js 24, PM2, Nginx, etc.)
./setup-server.sh
```

**This script will:**
- ✅ Update system packages
- ✅ Install Node.js 24.x
- ✅ Install PM2 process manager
- ✅ Install Nginx
- ✅ Configure firewall (UFW)
- ✅ Create `vidbuilder` user
- ✅ Setup Fail2Ban
- ✅ Configure automatic security updates
- ✅ Setup swap space
- ✅ Install Certbot for SSL

#### Step 3: Deploy Application

```bash
# Switch to vidbuilder user
su - vidbuilder

# Create app directory
mkdir -p ~/apps
cd ~/apps

# Clone your repository
git clone https://github.com/yourusername/aiVideoGenerator.git vidbuilder
cd vidbuilder

# Install dependencies
npm install --production

# Create .env file
nano .env
```

**Add to .env:**
```env
PORT=3000
NODE_ENV=production

# AWS S3 Configuration
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=vidbuilder

# Optional: CORS
ALLOWED_ORIGINS=https://backend.vidbuilder.ai,https://vidbuilder.ai
```

**Start the application:**
```bash
# Create logs directory
mkdir -p logs

# Copy ecosystem config (if not in repo)
# cp ~/ecosystem.config.js .

# Start with PM2
pm2 start ecosystem.config.js --env production

# Save PM2 process list
pm2 save

# Check status
pm2 status

# View logs
pm2 logs vidbuilder
```

#### Step 4: Configure Nginx

Exit back to root user:

```bash
exit  # Exit from vidbuilder user
```

As root, configure Nginx:

```bash
# Copy nginx config
cp ~/nginx.conf /etc/nginx/sites-available/vidbuilder

# Edit the config to update domain
nano /etc/nginx/sites-available/vidbuilder
```

**Update these lines in the config:**
```nginx
# Change this:
server_name your-domain.com www.your-domain.com;

# To this:
server_name backend.vidbuilder.ai;
```

**Also update the app path:**
```nginx
# Change this:
alias /home/videoapp/apps/aiVideoGenerator/output/;

# To this:
alias /home/vidbuilder/apps/vidbuilder/output/;
```

**Enable the site:**
```bash
# Create symbolic link
ln -s /etc/nginx/sites-available/vidbuilder /etc/nginx/sites-enabled/

# Remove default site
rm /etc/nginx/sites-enabled/default

# Test configuration
nginx -t

# Reload Nginx
systemctl reload nginx
```

#### Step 5: Setup SSL Certificate

```bash
# Install Certbot (if not already installed)
apt install -y certbot python3-certbot-nginx

# Get SSL certificate for backend.vidbuilder.ai
certbot --nginx -d backend.vidbuilder.ai

# Follow prompts:
# - Enter email address
# - Agree to terms
# - Choose redirect HTTP to HTTPS (option 2)

# Test auto-renewal
certbot renew --dry-run
```

#### Step 6: Setup PM2 Startup

```bash
# As root, configure PM2 to start on boot
env PATH=$PATH:/usr/bin pm2 startup systemd -u vidbuilder --hp /home/vidbuilder

# Switch to vidbuilder user and save
su - vidbuilder
cd ~/apps/vidbuilder
pm2 save
exit
```

#### Step 7: Verify Deployment

```bash
# Check PM2 status
su - vidbuilder
pm2 status
pm2 logs vidbuilder

# Check health endpoint
curl http://localhost:3000/api/health

# Check from outside (after SSL)
curl https://backend.vidbuilder.ai/api/health

# Run monitoring dashboard
cd ~/apps/vidbuilder
./monitor.sh
```

**🎉 Done! Your VidBuilder app is now live at https://backend.vidbuilder.ai**

---

## 📝 Using the Deploy Script for Updates

After initial deployment, use the deploy script for zero-downtime updates:

```bash
# SSH as vidbuilder user
ssh vidbuilder@YOUR_SERVER_IP

# Navigate to app
cd ~/apps/vidbuilder

# Make deploy script executable (first time only)
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

**The deploy script will:**
1. ✅ Create backup of current version
2. ✅ Pull latest code from Git
3. ✅ Install dependencies
4. ✅ Reload PM2 (zero-downtime)
5. ✅ Run health check
6. ✅ Show status and logs
7. ✅ Clean old backups

---

## 📊 Using the Monitor Script

Monitor your application in real-time:

```bash
# SSH as vidbuilder user
ssh vidbuilder@YOUR_SERVER_IP

# Navigate to app
cd ~/apps/vidbuilder

# Make monitor script executable (first time only)
chmod +x monitor.sh

# Run monitoring dashboard
./monitor.sh
```

**Shows:**
- System resources (CPU, memory, disk)
- PM2 application status
- Nginx status
- Application health check
- S3 configuration
- Recent logs
- SSL certificate status
- Network connections
- Quick action commands

---

## 🔧 Manual Deployment (Alternative Method)

If you prefer manual setup or need to customize, follow these detailed steps:

---

## 🚀 Part 1: Server Setup (30 minutes)

### Step 1: Connect to Your Server

```bash
# SSH into your Hetzner server
ssh root@your-server-ip

# Or if using SSH key
ssh -i ~/.ssh/your-key.pem root@your-server-ip
```

### Step 2: Update System

```bash
# Update package list
apt update && apt upgrade -y

# Install essential tools
apt install -y curl wget git build-essential
```

### Step 3: Install Node.js 20.x (LTS)

```bash
# Add NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_24.x | bash -

# Install Node.js
apt install -y nodejs

# Verify installation
node --version  # Should show v24.x.x
npm --version   # Should show 10.x.x
```

### Step 4: Install Nginx

```bash
# Install Nginx
apt install -y nginx

# Enable and start Nginx
systemctl enable nginx
systemctl start nginx

# Check status
systemctl status nginx
```

### Step 5: Install PM2 (Process Manager)

```bash
# Install PM2 globally
npm install -g pm2

# Verify installation
pm2 --version
```

### Step 6: Setup Firewall

```bash
# Install UFW if not present
apt install -y ufw

# Allow SSH (IMPORTANT - do this first!)
ufw allow 22/tcp

# Allow HTTP and HTTPS
ufw allow 80/tcp
ufw allow 443/tcp

# Enable firewall
ufw --force enable

# Check status
ufw status
```

---

## 🔧 Part 2: Application Deployment

### Step 1: Create Application User

```bash
# Create dedicated user for the app
adduser --disabled-password --gecos "" videoapp

# Add to sudo group (optional)
usermod -aG sudo videoapp

# Switch to app user
su - videoapp
```

### Step 2: Clone Your Repository

```bash
# Create app directory
mkdir -p /home/videoapp/apps
cd /home/videoapp/apps

# Clone your repository (replace with your repo)
git clone https://github.com/yourusername/aiVideoGenerator.git
# OR upload files via SCP/SFTP

cd aiVideoGenerator
```

### Step 3: Install Dependencies

```bash
# Install Node.js dependencies
npm install --production

# Install additional dependencies for video processing
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner dotenv
```

### Step 4: Configure Environment Variables

```bash
# Create .env file
nano .env
```

Add your configuration:

```env
# Server Configuration
PORT=3000
NODE_ENV=production

# AWS S3 Configuration
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=vidbuilder

# Optional: Add domain for CORS
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

Save and exit (Ctrl+X, Y, Enter)

### Step 5: Create Required Directories

```bash
# Create output and temp directories
mkdir -p output temp uploads

# Set permissions
chmod 755 output temp uploads
```

---

## 🔄 Part 3: PM2 Configuration (High Availability)

### Step 1: Create PM2 Ecosystem File

```bash
# Create ecosystem config
nano ecosystem.config.js
```

Paste this configuration:

```javascript
module.exports = {
  apps: [{
    name: 'video-generator',
    script: './server.js',
    instances: 'max', // Use all CPU cores
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    max_memory_restart: '2G',
    watch: false,
    ignore_watch: ['node_modules', 'output', 'temp', 'uploads', 'logs'],
    max_restarts: 10,
    min_uptime: '10s',
    kill_timeout: 5000,
    wait_ready: true,
    listen_timeout: 10000
  }]
};
```

### Step 2: Create Logs Directory

```bash
mkdir -p logs
```

### Step 3: Start Application with PM2

```bash
# Start the app
pm2 start ecosystem.config.js

# Check status
pm2 status

# View logs
pm2 logs video-generator

# Monitor in real-time
pm2 monit
```

### Step 4: Setup PM2 Startup Script

```bash
# Exit from videoapp user back to root
exit

# As root, setup PM2 startup
env PATH=$PATH:/usr/bin pm2 startup systemd -u videoapp --hp /home/videoapp

# Switch back to videoapp
su - videoapp
cd /home/videoapp/apps/aiVideoGenerator

# Save PM2 process list
pm2 save

# Exit back to root
exit
```

---

## 🌐 Part 4: Nginx Configuration (Reverse Proxy)

### Step 1: Create Nginx Configuration

```bash
# As root, create site config
nano /etc/nginx/sites-available/video-generator
```

Paste this configuration:

```nginx
# Upstream Node.js app
upstream video_app {
    least_conn;
    server 127.0.0.1:3000 max_fails=3 fail_timeout=30s;
    keepalive 64;
}

# HTTP Server (will redirect to HTTPS later)
server {
    listen 80;
    listen [::]:80;
    server_name your-domain.com www.your-domain.com;  # Replace with your domain
    
    # Or use IP if no domain
    # server_name your-server-ip;
    
    client_max_body_size 500M;
    
    # Logging
    access_log /var/log/nginx/video-generator-access.log;
    error_log /var/log/nginx/video-generator-error.log;
    
    # Proxy settings
    location / {
        proxy_pass http://video_app;
        proxy_http_version 1.1;
        
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts for long video processing
        proxy_connect_timeout 600s;
        proxy_send_timeout 600s;
        proxy_read_timeout 600s;
        send_timeout 600s;
    }
    
    # Static files (if serving from Nginx)
    location /output/ {
        alias /home/videoapp/apps/aiVideoGenerator/output/;
        expires 7d;
        add_header Cache-Control "public, immutable";
    }
    
    # Health check endpoint
    location /health {
        proxy_pass http://video_app/api/health;
        access_log off;
    }
}
```

### Step 2: Enable Site

```bash
# Create symbolic link
ln -s /etc/nginx/sites-available/video-generator /etc/nginx/sites-enabled/

# Remove default site
rm /etc/nginx/sites-enabled/default

# Test configuration
nginx -t

# Reload Nginx
systemctl reload nginx
```

---

## 🔒 Part 5: SSL/HTTPS Setup (Let's Encrypt)

### Step 1: Install Certbot

```bash
# Install Certbot
apt install -y certbot python3-certbot-nginx
```

### Step 2: Obtain SSL Certificate

```bash
# Get certificate (replace with your domain)
certbot --nginx -d your-domain.com -d www.your-domain.com

# Follow prompts:
# - Enter email address
# - Agree to terms
# - Choose redirect HTTP to HTTPS (option 2)
```

### Step 3: Test Auto-Renewal

```bash
# Test renewal
certbot renew --dry-run

# Certbot automatically sets up cron job for renewal
```

---

## 📊 Part 6: Monitoring & Maintenance

### PM2 Monitoring

```bash
# Real-time monitoring
pm2 monit

# View logs
pm2 logs video-generator --lines 100

# View specific log
pm2 logs video-generator --err  # Errors only
pm2 logs video-generator --out  # Output only

# Restart app
pm2 restart video-generator

# Reload app (zero-downtime)
pm2 reload video-generator

# Stop app
pm2 stop video-generator

# Delete from PM2
pm2 delete video-generator
```

### System Monitoring

```bash
# Check disk space
df -h

# Check memory
free -h

# Check CPU
htop  # Install with: apt install htop

# Check Nginx status
systemctl status nginx

# Check Nginx logs
tail -f /var/log/nginx/video-generator-access.log
tail -f /var/log/nginx/video-generator-error.log
```

### Application Health

```bash
# Test health endpoint
curl http://localhost:3000/api/health

# Test from outside
curl https://your-domain.com/health
```

---

## 🔄 Part 7: Deployment Updates

### Method 1: Manual Update

```bash
# SSH into server
ssh videoapp@your-server-ip

# Navigate to app
cd /home/videoapp/apps/aiVideoGenerator

# Pull latest changes
git pull origin main

# Install new dependencies
npm install --production

# Reload app (zero-downtime)
pm2 reload video-generator
```

### Method 2: Automated Deployment Script

Create `deploy.sh`:

```bash
#!/bin/bash
set -e

echo "🚀 Deploying Video Generator..."

# Navigate to app directory
cd /home/videoapp/apps/aiVideoGenerator

# Pull latest code
echo "📥 Pulling latest code..."
git pull origin main

# Install dependencies
echo "📦 Installing dependencies..."
npm install --production

# Run any migrations or setup
# npm run migrate  # If you have database migrations

# Reload PM2
echo "🔄 Reloading application..."
pm2 reload video-generator

echo "✅ Deployment complete!"

# Show status
pm2 status
```

Make executable:
```bash
chmod +x deploy.sh
```

---

## 🎯 Part 8: Performance Optimization

### 1. Increase System Limits

```bash
# Edit limits
nano /etc/security/limits.conf
```

Add:
```
videoapp soft nofile 65536
videoapp hard nofile 65536
```

### 2. Optimize Node.js

Add to `.env`:
```env
NODE_OPTIONS="--max-old-space-size=4096"
UV_THREADPOOL_SIZE=128
```

### 3. Enable Nginx Caching

Add to Nginx config:
```nginx
# Cache zone
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=video_cache:10m max_size=1g inactive=60m;

# In location block
proxy_cache video_cache;
proxy_cache_valid 200 60m;
proxy_cache_use_stale error timeout updating http_500 http_502 http_503 http_504;
```

### 4. Setup Log Rotation

```bash
# Create logrotate config
nano /etc/logrotate.d/video-generator
```

Add:
```
/home/videoapp/apps/aiVideoGenerator/logs/*.log {
    daily
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 videoapp videoapp
    sharedscripts
    postrotate
        pm2 reloadLogs
    endscript
}
```

---

## 🔐 Part 9: Security Hardening

### 1. Setup Fail2Ban

```bash
# Install fail2ban
apt install -y fail2ban

# Create jail for Nginx
nano /etc/fail2ban/jail.local
```

Add:
```ini
[nginx-http-auth]
enabled = true

[nginx-noscript]
enabled = true

[nginx-badbots]
enabled = true

[nginx-noproxy]
enabled = true
```

Restart:
```bash
systemctl restart fail2ban
```

### 2. Disable Root SSH

```bash
nano /etc/ssh/sshd_config
```

Change:
```
PermitRootLogin no
PasswordAuthentication no  # Use SSH keys only
```

Restart SSH:
```bash
systemctl restart sshd
```

### 3. Setup Automatic Updates

```bash
apt install -y unattended-upgrades
dpkg-reconfigure -plow unattended-upgrades
```

---

## 📈 Part 10: Scaling Strategies

### Vertical Scaling (Single Server)
- ✅ Already implemented with PM2 cluster mode
- ✅ Uses all CPU cores
- ✅ Auto-restart on crashes
- ✅ Load balancing across instances

### Horizontal Scaling (Multiple Servers)
For high traffic, consider:

1. **Load Balancer** (Hetzner Load Balancer)
   - Distribute traffic across multiple VMs
   - Health checks
   - SSL termination

2. **Separate Video Processing**
   - Use job queue (Bull/BullMQ)
   - Dedicated worker servers
   - Redis for queue management

3. **CDN** (CloudFlare/CloudFront)
   - Cache static assets
   - DDoS protection
   - Global distribution

---

## ✅ Deployment Checklist

- [ ] Server updated and secured
- [ ] Node.js 20.x installed
- [ ] Nginx installed and configured
- [ ] PM2 installed and app running
- [ ] Firewall configured (UFW)
- [ ] SSL certificate installed
- [ ] Environment variables set
- [ ] S3 integration working
- [ ] Health check responding
- [ ] Logs rotating properly
- [ ] Monitoring setup
- [ ] Backup strategy defined
- [ ] Domain DNS configured
- [ ] CORS configured for domain

---

## 🆘 Troubleshooting

### App won't start
```bash
# Check PM2 logs
pm2 logs video-generator --lines 50

# Check if port is in use
netstat -tulpn | grep 3000

# Restart PM2
pm2 restart video-generator
```

### Nginx errors
```bash
# Test config
nginx -t

# Check logs
tail -f /var/log/nginx/error.log

# Restart Nginx
systemctl restart nginx
```

### Out of memory
```bash
# Check memory
free -h

# Increase swap
fallocate -l 4G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab
```

### Videos not uploading to S3
```bash
# Check AWS credentials
cat .env | grep AWS

# Test S3 access
aws s3 ls s3://vidbuilder  # Install AWS CLI first
```

---

## 📞 Support Resources

- **PM2 Docs**: https://pm2.keymetrics.io/
- **Nginx Docs**: https://nginx.org/en/docs/
- **Let's Encrypt**: https://letsencrypt.org/
- **Hetzner Docs**: https://docs.hetzner.com/

---

**Your app is now production-ready with high availability and scalability!** 🚀
