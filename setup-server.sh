#!/bin/bash

###############################################################################
# Initial Server Setup Script for Ubuntu 24.04
# Run this script as ROOT on a fresh Hetzner server
# Usage: bash setup-server.sh
###############################################################################

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}🖥️  Server Setup for Video Generator${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo -e "${RED}❌ Please run as root${NC}"
    exit 1
fi

# Update system
echo -e "\n${YELLOW}📦 Updating system packages...${NC}"
apt update && apt upgrade -y
echo -e "${GREEN}✅ System updated${NC}"

# Install essential tools
echo -e "\n${YELLOW}🔧 Installing essential tools...${NC}"
apt install -y curl wget git build-essential htop ufw fail2ban unattended-upgrades
echo -e "${GREEN}✅ Essential tools installed${NC}"

# Install Node.js 24.x
echo -e "\n${YELLOW}📦 Installing Node.js 24.x...${NC}"
curl -fsSL https://deb.nodesource.com/setup_24.x | bash -
apt install -y nodejs
echo -e "${GREEN}✅ Node.js $(node --version) installed${NC}"
echo -e "${GREEN}✅ npm $(npm --version) installed${NC}"

# Install PM2
echo -e "\n${YELLOW}📦 Installing PM2...${NC}"
npm install -g pm2
echo -e "${GREEN}✅ PM2 $(pm2 --version) installed${NC}"

# Install Nginx
echo -e "\n${YELLOW}📦 Installing Nginx...${NC}"
apt install -y nginx
systemctl enable nginx
systemctl start nginx
echo -e "${GREEN}✅ Nginx installed and started${NC}"

# Setup Firewall
echo -e "\n${YELLOW}🔥 Configuring firewall...${NC}"
ufw --force enable
ufw allow 22/tcp   # SSH
ufw allow 80/tcp   # HTTP
ufw allow 443/tcp  # HTTPS
echo -e "${GREEN}✅ Firewall configured${NC}"

# Create application user
echo -e "\n${YELLOW}👤 Creating application user...${NC}"
if id "vidbuilder" &>/dev/null; then
    echo -e "${YELLOW}⚠️  User 'vidbuilder' already exists${NC}"
else
    adduser --disabled-password --gecos "" vidbuilder
    echo -e "${GREEN}✅ User 'vidbuilder' created${NC}"
fi

# Create app directories
echo -e "\n${YELLOW}📁 Creating application directories...${NC}"
su - vidbuilder -c "mkdir -p /home/vidbuilder/apps"
su - vidbuilder -c "mkdir -p /home/vidbuilder/backups"
su - vidbuilder -c "mkdir -p /home/vidbuilder/logs"
echo -e "${GREEN}✅ Directories created${NC}"

# Setup Fail2Ban
echo -e "\n${YELLOW}🛡️  Configuring Fail2Ban...${NC}"
cat > /etc/fail2ban/jail.local <<EOF
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 5

[sshd]
enabled = true

[nginx-http-auth]
enabled = true

[nginx-noscript]
enabled = true

[nginx-badbots]
enabled = true
EOF
systemctl restart fail2ban
echo -e "${GREEN}✅ Fail2Ban configured${NC}"

# Setup automatic security updates
echo -e "\n${YELLOW}🔒 Enabling automatic security updates...${NC}"
dpkg-reconfigure -plow unattended-upgrades
echo -e "${GREEN}✅ Automatic updates enabled${NC}"

# Increase system limits
echo -e "\n${YELLOW}⚙️  Increasing system limits...${NC}"
cat >> /etc/security/limits.conf <<EOF

# VidBuilder limits
vidbuilder soft nofile 65536
vidbuilder hard nofile 65536
vidbuilder soft nproc 4096
vidbuilder hard nproc 4096
EOF
echo -e "${GREEN}✅ System limits increased${NC}"

# Setup swap (if not exists)
echo -e "\n${YELLOW}💾 Setting up swap space...${NC}"
if [ ! -f /swapfile ]; then
    fallocate -l 4G /swapfile
    chmod 600 /swapfile
    mkswap /swapfile
    swapon /swapfile
    echo '/swapfile none swap sw 0 0' >> /etc/fstab
    echo -e "${GREEN}✅ 4GB swap created${NC}"
else
    echo -e "${YELLOW}⚠️  Swap already exists${NC}"
fi

# Install Certbot for SSL
echo -e "\n${YELLOW}🔒 Installing Certbot for SSL...${NC}"
apt install -y certbot python3-certbot-nginx
echo -e "${GREEN}✅ Certbot installed${NC}"

# Create log rotation config
echo -e "\n${YELLOW}📝 Setting up log rotation...${NC}"
cat > /etc/logrotate.d/vidbuilder <<EOF
/home/vidbuilder/apps/vidbuilder/logs/*.log {
    daily
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 vidbuilder vidbuilder
    sharedscripts
    postrotate
        su - vidbuilder -c "pm2 reloadLogs" > /dev/null 2>&1 || true
    endscript
}
EOF
echo -e "${GREEN}✅ Log rotation configured${NC}"

# Display summary
echo -e "\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ Server setup complete!${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

echo -e "\n${YELLOW}📋 Summary:${NC}"
echo -e "  • Node.js: $(node --version)"
echo -e "  • npm: $(npm --version)"
echo -e "  • PM2: $(pm2 --version)"
echo -e "  • Nginx: $(nginx -v 2>&1 | cut -d'/' -f2)"
echo -e "  • User: vidbuilder"
echo -e "  • App directory: /home/vidbuilder/apps"

echo -e "\n${YELLOW}🎯 Next steps:${NC}"
echo -e "  1. Switch to vidbuilder user: ${GREEN}su - vidbuilder${NC}"
echo -e "  2. Clone your repository: ${GREEN}cd /home/vidbuilder/apps && git clone <your-repo> vidbuilder${NC}"
echo -e "  3. Install dependencies: ${GREEN}cd vidbuilder && npm install${NC}"
echo -e "  4. Create .env file: ${GREEN}nano .env${NC}"
echo -e "  5. Start with PM2: ${GREEN}pm2 start ecosystem.config.js --env production${NC}"
echo -e "  6. Configure Nginx: ${GREEN}See DEPLOYMENT_GUIDE.md${NC}"
echo -e "  7. Setup SSL: ${GREEN}certbot --nginx -d backend.vidbuilder.ai${NC}"

echo -e "\n${YELLOW}📖 Full guide: DEPLOYMENT_GUIDE.md${NC}\n"
