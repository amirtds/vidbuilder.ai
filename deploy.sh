#!/bin/bash

###############################################################################
# Deployment Script for Video Generator
# Usage: ./deploy.sh
###############################################################################

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
APP_DIR="/home/vidbuilder/apps/vidbuilder"
APP_NAME="vidbuilder"
BRANCH="master"

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}🚀 VidBuilder Deployment${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Check if running as vidbuilder user
if [ "$USER" != "vidbuilder" ]; then
    echo -e "${RED}❌ Error: This script must be run as 'vidbuilder' user${NC}"
    echo -e "${YELLOW}💡 Run: su - vidbuilder${NC}"
    exit 1
fi

# Navigate to app directory
echo -e "\n${YELLOW}📂 Navigating to app directory...${NC}"
cd "$APP_DIR" || exit 1

# Backup current version
echo -e "\n${YELLOW}💾 Creating backup...${NC}"
BACKUP_DIR="$HOME/backups/$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"
cp -r "$APP_DIR" "$BACKUP_DIR/" 2>/dev/null || true
echo -e "${GREEN}✅ Backup created: $BACKUP_DIR${NC}"

# Pull latest code
echo -e "\n${YELLOW}📥 Pulling latest code from $BRANCH...${NC}"
git fetch origin
git checkout "$BRANCH"
git pull origin "$BRANCH"
echo -e "${GREEN}✅ Code updated${NC}"

# Install dependencies
echo -e "\n${YELLOW}📦 Installing dependencies...${NC}"
npm install --production
echo -e "${GREEN}✅ Dependencies installed${NC}"

# Run database migrations (if any)
# echo -e "\n${YELLOW}🗄️  Running migrations...${NC}"
# npm run migrate
# echo -e "${GREEN}✅ Migrations complete${NC}"

# Build assets (if needed)
# echo -e "\n${YELLOW}🔨 Building assets...${NC}"
# npm run build
# echo -e "${GREEN}✅ Build complete${NC}"

# Reload PM2 (zero-downtime deployment)
echo -e "\n${YELLOW}🔄 Reloading application...${NC}"
pm2 reload "$APP_NAME" --update-env
echo -e "${GREEN}✅ Application reloaded${NC}"

# Wait for app to be ready
echo -e "\n${YELLOW}⏳ Waiting for app to be ready...${NC}"
sleep 5

# Health check
echo -e "\n${YELLOW}🏥 Running health check...${NC}"
HEALTH_URL="http://localhost:3000/api/health"
if curl -f -s "$HEALTH_URL" > /dev/null; then
    echo -e "${GREEN}✅ Health check passed${NC}"
else
    echo -e "${RED}❌ Health check failed${NC}"
    echo -e "${YELLOW}💡 Check logs: pm2 logs $APP_NAME${NC}"
    exit 1
fi

# Show status
echo -e "\n${YELLOW}📊 Application status:${NC}"
pm2 status "$APP_NAME"

# Show recent logs
echo -e "\n${YELLOW}📝 Recent logs:${NC}"
pm2 logs "$APP_NAME" --lines 20 --nostream

echo -e "\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ Deployment complete!${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Cleanup old backups (keep last 5)
echo -e "\n${YELLOW}🧹 Cleaning old backups...${NC}"
cd "$HOME/backups" || exit 0
ls -t | tail -n +6 | xargs -r rm -rf
echo -e "${GREEN}✅ Cleanup complete${NC}"

echo -e "\n${GREEN}🎉 All done! Your app is now running the latest version.${NC}"
echo -e "${YELLOW}💡 Monitor logs: pm2 logs $APP_NAME${NC}"
echo -e "${YELLOW}💡 View status: pm2 status${NC}"
echo -e "${YELLOW}💡 Monitor metrics: pm2 monit${NC}\n"
