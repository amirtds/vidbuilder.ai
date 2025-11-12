#!/bin/bash

###############################################################################
# Monitoring Script for Video Generator
# Shows real-time status, metrics, and health
# Usage: ./monitor.sh
###############################################################################

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

clear

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}📊 Video Generator - System Monitor${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# System Information
echo -e "\n${CYAN}🖥️  System Information${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "Hostname:     $(hostname)"
echo -e "Uptime:       $(uptime -p)"
echo -e "Load Average: $(uptime | awk -F'load average:' '{print $2}')"

# CPU Usage
echo -e "\n${CYAN}💻 CPU Usage${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
top -bn1 | grep "Cpu(s)" | sed "s/.*, *\([0-9.]*\)%* id.*/\1/" | awk '{print "CPU Usage: " 100 - $1"%"}'

# Memory Usage
echo -e "\n${CYAN}🧠 Memory Usage${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
free -h | awk 'NR==2{printf "Memory: %s / %s (%.2f%%)\n", $3, $2, $3*100/$2}'
free -h | awk 'NR==3{printf "Swap:   %s / %s\n", $3, $2}'

# Disk Usage
echo -e "\n${CYAN}💾 Disk Usage${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
df -h / | awk 'NR==2{printf "Root:   %s / %s (%s used)\n", $3, $2, $5}'

# Application directories
if [ -d "/home/vidbuilder/apps/vidbuilder/output" ]; then
    OUTPUT_SIZE=$(du -sh /home/vidbuilder/apps/vidbuilder/output 2>/dev/null | cut -f1)
    echo -e "Output: ${OUTPUT_SIZE:-0}"
fi

# PM2 Status
echo -e "\n${CYAN}🔄 PM2 Application Status${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
if command -v pm2 &> /dev/null; then
    pm2 jlist 2>/dev/null | jq -r '.[] | "App: \(.name) | Status: \(.pm2_env.status) | CPU: \(.monit.cpu)% | Memory: \(.monit.memory / 1024 / 1024 | floor)MB | Restarts: \(.pm2_env.restart_time)"' 2>/dev/null || pm2 status
else
    echo -e "${RED}PM2 not found${NC}"
fi

# Nginx Status
echo -e "\n${CYAN}🌐 Nginx Status${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
if systemctl is-active --quiet nginx; then
    echo -e "${GREEN}✅ Nginx is running${NC}"
    NGINX_CONNECTIONS=$(ss -s | grep 'TCP:' | awk '{print $2}')
    echo -e "Active connections: $NGINX_CONNECTIONS"
else
    echo -e "${RED}❌ Nginx is not running${NC}"
fi

# Application Health Check
echo -e "\n${CYAN}🏥 Application Health${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
HEALTH_URL="http://localhost:3000/api/health"
if curl -f -s "$HEALTH_URL" > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Application is healthy${NC}"
    RESPONSE=$(curl -s "$HEALTH_URL")
    echo -e "Response: $RESPONSE"
else
    echo -e "${RED}❌ Application health check failed${NC}"
fi

# S3 Configuration
echo -e "\n${CYAN}☁️  AWS S3 Status${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
if [ -f "/home/vidbuilder/apps/vidbuilder/.env" ]; then
    if grep -q "AWS_S3_BUCKET" /home/vidbuilder/apps/vidbuilder/.env 2>/dev/null; then
        BUCKET=$(grep "AWS_S3_BUCKET" /home/vidbuilder/apps/vidbuilder/.env | cut -d'=' -f2)
        REGION=$(grep "AWS_REGION" /home/vidbuilder/apps/vidbuilder/.env | cut -d'=' -f2)
        echo -e "${GREEN}✅ S3 Configured${NC}"
        echo -e "Bucket: $BUCKET"
        echo -e "Region: $REGION"
    else
        echo -e "${YELLOW}⚠️  S3 not configured${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  .env file not found${NC}"
fi

# Recent Logs
echo -e "\n${CYAN}📝 Recent Application Logs (last 10 lines)${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
if command -v pm2 &> /dev/null; then
    pm2 logs vidbuilder --lines 10 --nostream 2>/dev/null || echo "No logs available"
else
    echo "PM2 not available"
fi

# Network Connections
echo -e "\n${CYAN}🌍 Network Connections${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "Port 3000: $(ss -tlnp | grep :3000 | wc -l) connections"
echo -e "Port 80:   $(ss -tlnp | grep :80 | wc -l) connections"
echo -e "Port 443:  $(ss -tlnp | grep :443 | wc -l) connections"

# SSL Certificate Status
echo -e "\n${CYAN}🔒 SSL Certificate${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
if [ -d "/etc/letsencrypt/live" ]; then
    CERT_DOMAINS=$(ls /etc/letsencrypt/live 2>/dev/null | grep -v README)
    if [ -n "$CERT_DOMAINS" ]; then
        echo -e "${GREEN}✅ SSL Certificate installed${NC}"
        for domain in $CERT_DOMAINS; do
            EXPIRY=$(openssl x509 -enddate -noout -in "/etc/letsencrypt/live/$domain/cert.pem" 2>/dev/null | cut -d= -f2)
            echo -e "Domain: $domain"
            echo -e "Expires: $EXPIRY"
        done
    else
        echo -e "${YELLOW}⚠️  No SSL certificates found${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  Let's Encrypt not configured${NC}"
fi

# Quick Actions
echo -e "\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}⚡ Quick Actions${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "View logs:       ${GREEN}pm2 logs vidbuilder${NC}"
echo -e "Monitor live:    ${GREEN}pm2 monit${NC}"
echo -e "Restart app:     ${GREEN}pm2 restart vidbuilder${NC}"
echo -e "Reload app:      ${GREEN}pm2 reload vidbuilder${NC}"
echo -e "Check Nginx:     ${GREEN}systemctl status nginx${NC}"
echo -e "Nginx logs:      ${GREEN}tail -f /var/log/nginx/vidbuilder-access.log${NC}"
echo -e "Deploy updates:  ${GREEN}./deploy.sh${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
