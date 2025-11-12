# VidBuilder Deployment Checklist

**Application:** VidBuilder  
**Domain:** backend.vidbuilder.ai  
**Server:** Hetzner Ubuntu 24.04  
**Node Version:** 24.x

---

## 📋 Pre-Deployment Checklist

### Server Requirements
- [ ] Hetzner VM with Ubuntu 24.04 provisioned
- [ ] Root SSH access configured
- [ ] Server IP address noted: `_______________`
- [ ] Minimum 2GB RAM, 2 CPU cores
- [ ] 20GB+ disk space available

### Domain & DNS
- [ ] Domain `backend.vidbuilder.ai` registered
- [ ] DNS A record pointing to server IP
- [ ] DNS propagated (check with `dig backend.vidbuilder.ai`)

### AWS S3
- [ ] S3 bucket `vidbuilder` created
- [ ] IAM user created with S3 permissions
- [ ] Access Key ID obtained: `AKIA...`
- [ ] Secret Access Key saved securely
- [ ] CORS configured on bucket

### Local Preparation
- [ ] All deployment scripts downloaded
- [ ] Scripts made executable: `chmod +x *.sh`
- [ ] Git repository URL ready
- [ ] `.env` values prepared

---

## 🚀 Deployment Steps

### Step 1: Upload Scripts to Server ✅

```bash
# From your local machine
cd /Users/amir/cubite/aiVideoGenerator

# Upload scripts and configs
scp setup-server.sh deploy.sh monitor.sh ecosystem.config.js nginx-pre-ssl.conf nginx.conf root@YOUR_SERVER_IP:~/
```

**Verification:**
```bash
ssh root@YOUR_SERVER_IP
ls -la ~/*.sh ~/*.conf
```

---

### Step 2: Run Server Setup Script ✅

```bash
# SSH into server
ssh root@YOUR_SERVER_IP

# Make executable
chmod +x setup-server.sh

# Run setup
./setup-server.sh
```

**What it does:**
- ✅ Updates system packages
- ✅ Installs Node.js 24.x
- ✅ Installs PM2, Nginx
- ✅ Configures firewall (ports 22, 80, 443)
- ✅ Creates `vidbuilder` user
- ✅ Sets up Fail2Ban, security updates
- ✅ Creates 4GB swap
- ✅ Installs Certbot

**Verification:**
```bash
node --version  # Should show v24.x.x
pm2 --version
nginx -v
ufw status
id vidbuilder
```

---

### Step 3: Deploy Application ✅

```bash
# Switch to vidbuilder user
su - vidbuilder

# Create app directory
mkdir -p ~/apps
cd ~/apps

# Clone repository
git clone https://github.com/yourusername/aiVideoGenerator.git vidbuilder
cd vidbuilder

# Install dependencies
npm install --production
```

**Verification:**
```bash
ls -la
ls node_modules | wc -l  # Should show many packages
```

---

### Step 4: Configure Environment ✅

```bash
# Create .env file
nano .env
```

**Add these values:**
```env
PORT=3000
NODE_ENV=production

# AWS S3 Configuration
AWS_ACCESS_KEY_ID=AKIA___your_key_here___
AWS_SECRET_ACCESS_KEY=___your_secret_key_here___
AWS_REGION=us-east-1
AWS_S3_BUCKET=vidbuilder

# Optional: CORS
ALLOWED_ORIGINS=https://backend.vidbuilder.ai,https://vidbuilder.ai
```

**Verification:**
```bash
cat .env | grep AWS_S3_BUCKET
```

---

### Step 5: Start Application with PM2 ✅

```bash
# Create logs directory
mkdir -p logs

# Start with PM2
pm2 start ecosystem.config.js --env production

# Save PM2 process list
pm2 save

# Check status
pm2 status

# View logs
pm2 logs vidbuilder --lines 50
```

**Verification:**
```bash
pm2 status  # Should show "online"
curl http://localhost:3000/api/health  # Should return {"status":"ok"}
```

---

### Step 6: Configure Nginx (Pre-SSL) ✅

```bash
# Exit to root user
exit

# IMPORTANT: Use nginx-pre-ssl.conf (without SSL config)
cp ~/nginx-pre-ssl.conf /etc/nginx/sites-available/vidbuilder

# Verify domain is correct
grep server_name /etc/nginx/sites-available/vidbuilder
# Should show: server_name backend.vidbuilder.ai;

# Enable site
ln -s /etc/nginx/sites-available/vidbuilder /etc/nginx/sites-enabled/

# Remove default site
rm /etc/nginx/sites-enabled/default

# Test configuration (should pass now)
nginx -t

# Reload Nginx
systemctl reload nginx

# Test HTTP access
curl http://backend.vidbuilder.ai/api/health
```

**Verification:**
```bash
nginx -t  # Should show "test is successful"
systemctl status nginx  # Should show "active (running)"
curl http://backend.vidbuilder.ai/api/health  # Should return {"status":"ok"}
```

**Why Pre-SSL Config?**
The main `nginx.conf` has SSL directives that require certificates to exist. We use `nginx-pre-ssl.conf` first (HTTP only), then Certbot will automatically add SSL configuration when we get the certificate.

---

### Step 7: Setup SSL Certificate ✅

```bash
# Get SSL certificate
certbot --nginx -d backend.vidbuilder.ai

# Follow prompts:
# 1. Enter email address
# 2. Agree to terms (Y)
# 3. Share email? (N)
# 4. Redirect HTTP to HTTPS? (2)

# Test auto-renewal
certbot renew --dry-run
```

**Verification:**
```bash
certbot certificates
curl https://backend.vidbuilder.ai/api/health  # Should work with HTTPS
```

---

### Step 8: Setup PM2 Startup ✅

```bash
# As root, configure PM2 startup
env PATH=$PATH:/usr/bin pm2 startup systemd -u vidbuilder --hp /home/vidbuilder

# Switch to vidbuilder and save
su - vidbuilder
cd ~/apps/vidbuilder
pm2 save
exit
```

**Verification:**
```bash
systemctl status pm2-vidbuilder  # Should show "active"
```

---

### Step 9: Final Verification ✅

```bash
# As vidbuilder user
su - vidbuilder
cd ~/apps/vidbuilder

# Make scripts executable
chmod +x deploy.sh monitor.sh

# Run monitoring dashboard
./monitor.sh
```

**Check all these:**
- [ ] PM2 status: online
- [ ] Nginx: running
- [ ] Health check: passing
- [ ] S3: configured
- [ ] SSL: valid
- [ ] No errors in logs

**Test from outside:**
```bash
# From your local machine
curl https://backend.vidbuilder.ai/api/health
```

---

## ✅ Post-Deployment Verification

### Application Tests
- [ ] Health endpoint: `https://backend.vidbuilder.ai/api/health`
- [ ] Web interface: `https://backend.vidbuilder.ai/advanced-client.html`
- [ ] Generate test video
- [ ] Verify S3 upload works
- [ ] Download video from S3 link

### System Tests
- [ ] PM2 auto-restart: `pm2 restart vidbuilder` (should restart quickly)
- [ ] Server reboot: `sudo reboot` (app should auto-start)
- [ ] Nginx reload: `systemctl reload nginx` (no downtime)
- [ ] SSL certificate: Check expiry date

### Security Tests
- [ ] Firewall active: `ufw status`
- [ ] Only ports 22, 80, 443 open
- [ ] Fail2Ban running: `systemctl status fail2ban`
- [ ] `.env` not accessible via web
- [ ] Root login disabled (optional)

---

## 📊 Monitoring Setup

### Daily Checks
```bash
# SSH as vidbuilder
ssh vidbuilder@YOUR_SERVER_IP

# Run monitor
cd ~/apps/vidbuilder
./monitor.sh
```

### What to Monitor
- [ ] CPU usage < 80%
- [ ] Memory usage < 80%
- [ ] Disk space > 20% free
- [ ] PM2 restart count (should be low)
- [ ] Nginx error logs (should be minimal)
- [ ] Application logs (no critical errors)

---

## 🔄 Deployment Updates

### Using Deploy Script
```bash
# SSH as vidbuilder
ssh vidbuilder@YOUR_SERVER_IP
cd ~/apps/vidbuilder

# Run deployment
./deploy.sh
```

**This will:**
1. Create backup
2. Pull latest code
3. Install dependencies
4. Reload PM2 (zero-downtime)
5. Run health check
6. Show status

---

## 🆘 Troubleshooting

### App Won't Start
```bash
pm2 logs vidbuilder --lines 100
pm2 restart vidbuilder
```

### 502 Bad Gateway
```bash
pm2 status  # Check if app is running
nginx -t    # Check Nginx config
systemctl restart nginx
```

### SSL Issues
```bash
certbot certificates
certbot renew
systemctl reload nginx
```

### High Memory
```bash
pm2 restart vidbuilder
# Or adjust max_memory_restart in ecosystem.config.js
```

### S3 Upload Failing
```bash
cat .env | grep AWS
# Verify credentials are correct
# Check S3 bucket permissions
```

---

## 📞 Quick Reference

### Important Files
- **App Directory:** `/home/vidbuilder/apps/vidbuilder`
- **Nginx Config:** `/etc/nginx/sites-available/vidbuilder`
- **PM2 Config:** `/home/vidbuilder/apps/vidbuilder/ecosystem.config.js`
- **Environment:** `/home/vidbuilder/apps/vidbuilder/.env`
- **Logs:** `/home/vidbuilder/apps/vidbuilder/logs/`

### Important Commands
```bash
# PM2
pm2 status
pm2 logs vidbuilder
pm2 restart vidbuilder
pm2 reload vidbuilder
pm2 monit

# Nginx
systemctl status nginx
systemctl reload nginx
nginx -t
tail -f /var/log/nginx/vidbuilder-access.log

# System
df -h
free -h
htop
ufw status

# Deployment
./deploy.sh
./monitor.sh
```

### Important URLs
- **Application:** https://backend.vidbuilder.ai
- **Client UI:** https://backend.vidbuilder.ai/advanced-client.html
- **Health Check:** https://backend.vidbuilder.ai/api/health
- **S3 Bucket:** https://s3.console.aws.amazon.com/s3/buckets/vidbuilder

---

## 🎉 Deployment Complete!

Your VidBuilder application is now:
- ✅ Running on production server
- ✅ Accessible at https://backend.vidbuilder.ai
- ✅ Auto-restarting on crashes
- ✅ Load balanced across CPU cores
- ✅ Secured with SSL/HTTPS
- ✅ Uploading videos to S3
- ✅ Monitored and logged
- ✅ Ready for production traffic

**Next Steps:**
1. Test video generation end-to-end
2. Share URL with team
3. Monitor performance
4. Set up backups (optional)
5. Configure CloudFront CDN (optional)

**Support:**
- Full Guide: `DEPLOYMENT_GUIDE.md`
- Quick Start: `PRODUCTION_QUICK_START.md`
- Scripts: `setup-server.sh`, `deploy.sh`, `monitor.sh`
