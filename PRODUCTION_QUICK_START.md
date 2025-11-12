# Production Deployment - Quick Start Guide

Get your video generator deployed to Hetzner in 30 minutes!

## 🚀 Super Quick Deploy (Copy-Paste Commands)

### 1. Initial Server Setup (as root)

```bash
# SSH into your Hetzner server
ssh root@YOUR_SERVER_IP

# Download and run setup script
wget https://raw.githubusercontent.com/yourusername/aiVideoGenerator/main/setup-server.sh
chmod +x setup-server.sh
./setup-server.sh
```

**Or manual setup:**

```bash
# Update system
apt update && apt upgrade -y

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Install PM2, Nginx, and tools
npm install -g pm2
apt install -y nginx git build-essential ufw

# Setup firewall
ufw allow 22 && ufw allow 80 && ufw allow 443
ufw --force enable

# Create app user
adduser --disabled-password --gecos "" videoapp
```

### 2. Deploy Application (as videoapp user)

```bash
# Switch to app user
su - videoapp

# Create directories
mkdir -p ~/apps ~/backups

# Clone repository
cd ~/apps
git clone https://github.com/yourusername/aiVideoGenerator.git
cd aiVideoGenerator

# Install dependencies
npm install --production

# Create .env file
nano .env
```

**Add to .env:**
```env
PORT=3000
NODE_ENV=production

AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_REGION=us-east-1
AWS_S3_BUCKET=vidbuilder
```

**Start with PM2:**
```bash
# Create logs directory
mkdir -p logs

# Start app
pm2 start ecosystem.config.js --env production

# Save PM2 config
pm2 save

# Exit to root
exit
```

### 3. Configure Nginx (as root)

```bash
# Create Nginx config
nano /etc/nginx/sites-available/video-generator
```

**Paste this (replace YOUR_DOMAIN):**
```nginx
upstream video_app {
    server 127.0.0.1:3000;
    keepalive 64;
}

server {
    listen 80;
    server_name YOUR_DOMAIN.com www.YOUR_DOMAIN.com;
    
    client_max_body_size 500M;
    
    location / {
        proxy_pass http://video_app;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        proxy_connect_timeout 600s;
        proxy_send_timeout 600s;
        proxy_read_timeout 600s;
    }
}
```

**Enable site:**
```bash
# Enable site
ln -s /etc/nginx/sites-available/video-generator /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default

# Test and reload
nginx -t
systemctl reload nginx
```

### 4. Setup SSL (as root)

```bash
# Install Certbot
apt install -y certbot python3-certbot-nginx

# Get certificate (replace YOUR_DOMAIN)
certbot --nginx -d YOUR_DOMAIN.com -d www.YOUR_DOMAIN.com

# Follow prompts and select redirect HTTP to HTTPS
```

### 5. Setup PM2 Startup (as root)

```bash
# Setup PM2 to start on boot
env PATH=$PATH:/usr/bin pm2 startup systemd -u videoapp --hp /home/videoapp

# Switch to videoapp and save
su - videoapp
cd ~/apps/aiVideoGenerator
pm2 save
exit
```

---

## ✅ Verify Deployment

```bash
# Check PM2 status
pm2 status

# Check app health
curl http://localhost:3000/api/health

# Check from outside
curl https://YOUR_DOMAIN.com/api/health

# View logs
pm2 logs video-generator
```

---

## 🎯 Common Commands

### Application Management
```bash
# View status
pm2 status

# View logs
pm2 logs video-generator

# Monitor in real-time
pm2 monit

# Restart app
pm2 restart video-generator

# Reload app (zero-downtime)
pm2 reload video-generator

# Stop app
pm2 stop video-generator
```

### Nginx Management
```bash
# Test config
nginx -t

# Reload Nginx
systemctl reload nginx

# Restart Nginx
systemctl restart nginx

# View logs
tail -f /var/log/nginx/video-generator-access.log
tail -f /var/log/nginx/video-generator-error.log
```

### System Monitoring
```bash
# Check disk space
df -h

# Check memory
free -h

# Check CPU
htop

# Check processes
ps aux | grep node

# Check network
ss -tlnp | grep :3000
```

### Deployment Updates
```bash
# SSH as videoapp
ssh videoapp@YOUR_SERVER_IP

# Navigate to app
cd ~/apps/aiVideoGenerator

# Pull latest code
git pull origin main

# Install dependencies
npm install --production

# Reload app
pm2 reload video-generator

# Check status
pm2 status
```

---

## 🔧 Troubleshooting

### App won't start
```bash
# Check logs
pm2 logs video-generator --lines 50

# Check if port is in use
ss -tlnp | grep :3000

# Kill process on port 3000
kill $(lsof -t -i:3000)

# Restart PM2
pm2 restart video-generator
```

### Nginx errors
```bash
# Test config
nginx -t

# Check error log
tail -f /var/log/nginx/error.log

# Restart Nginx
systemctl restart nginx
```

### SSL issues
```bash
# Renew certificate
certbot renew

# Test renewal
certbot renew --dry-run

# Check certificate
certbot certificates
```

### Out of memory
```bash
# Check memory
free -h

# Add swap
fallocate -l 4G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab
```

### S3 upload failing
```bash
# Check .env file
cat .env | grep AWS

# Test AWS credentials
# Install AWS CLI: apt install awscli
aws s3 ls s3://vidbuilder --region us-east-1
```

---

## 📊 Monitoring Dashboard

Run the monitoring script:
```bash
cd ~/apps/aiVideoGenerator
./monitor.sh
```

Shows:
- System resources (CPU, memory, disk)
- PM2 app status
- Nginx status
- Application health
- S3 configuration
- Recent logs
- SSL certificate status

---

## 🔄 Automated Deployment

Use the deploy script for updates:
```bash
cd ~/apps/aiVideoGenerator
./deploy.sh
```

This will:
1. Create backup
2. Pull latest code
3. Install dependencies
4. Reload app (zero-downtime)
5. Run health check
6. Show status

---

## 🎯 Performance Tips

### 1. Enable Nginx Caching
Add to Nginx config:
```nginx
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=video_cache:10m;

location / {
    proxy_cache video_cache;
    proxy_cache_valid 200 60m;
}
```

### 2. Increase PM2 Instances
Edit `ecosystem.config.js`:
```javascript
instances: 4,  // or 'max' for all CPU cores
```

### 3. Optimize Node.js Memory
Add to `.env`:
```env
NODE_OPTIONS="--max-old-space-size=4096"
UV_THREADPOOL_SIZE=128
```

### 4. Setup Log Rotation
Already configured in setup script!

---

## 🔒 Security Checklist

- [ ] Firewall enabled (UFW)
- [ ] SSH key authentication only
- [ ] Root login disabled
- [ ] SSL certificate installed
- [ ] Fail2Ban configured
- [ ] Automatic security updates enabled
- [ ] Strong passwords
- [ ] AWS credentials in .env (not in code)
- [ ] .env added to .gitignore
- [ ] Regular backups configured

---

## 📈 Scaling Options

### Vertical Scaling (Current)
- ✅ PM2 cluster mode (uses all CPU cores)
- ✅ Auto-restart on crashes
- ✅ Load balancing

### Horizontal Scaling (Future)
- Add Hetzner Load Balancer
- Deploy to multiple servers
- Use Redis for session storage
- Separate video processing workers

---

## 📞 Quick Links

- **Full Guide**: `DEPLOYMENT_GUIDE.md`
- **Nginx Config**: `nginx.conf`
- **PM2 Config**: `ecosystem.config.js`
- **Deploy Script**: `deploy.sh`
- **Monitor Script**: `monitor.sh`
- **Setup Script**: `setup-server.sh`

---

## 🎉 You're Live!

Your video generator is now:
- ✅ Running on production server
- ✅ Auto-restarting on crashes
- ✅ Load balanced across CPU cores
- ✅ Secured with SSL
- ✅ Uploading to S3
- ✅ Ready to scale

**Access your app:**
- https://YOUR_DOMAIN.com
- https://YOUR_DOMAIN.com/advanced-client.html

**Monitor:**
```bash
pm2 monit
```

**Deploy updates:**
```bash
./deploy.sh
```

🚀 **Happy video generating!**
