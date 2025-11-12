#!/bin/bash

# Fix Chrome/Remotion Dependencies for Ubuntu 24.04
# This installs the required system libraries for Remotion's Chrome headless browser

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}🔧 Fixing Chrome/Remotion Dependencies${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo -e "${RED}❌ Please run as root (use sudo)${NC}"
    exit 1
fi

echo -e "${YELLOW}📦 Installing Chrome dependencies...${NC}\n"

# Update package list
apt-get update -qq

# Install all required libraries for Chrome/Chromium
# Note: Ubuntu 24.04 uses t64 variants for some packages
apt-get install -y \
    libnss3 \
    libnspr4 \
    libatk1.0-0t64 \
    libatk-bridge2.0-0t64 \
    libcups2t64 \
    libdrm2 \
    libdbus-1-3 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libpango-1.0-0 \
    libcairo2 \
    libasound2t64 \
    libatspi2.0-0t64 \
    libxshmfence1 \
    fonts-liberation \
    libappindicator3-1 \
    xdg-utils \
    wget \
    ca-certificates

echo -e "\n${GREEN}✅ Chrome dependencies installed successfully!${NC}\n"

# Verify installation
echo -e "${YELLOW}🔍 Verifying installation...${NC}\n"

if ldconfig -p | grep -q libnss3.so; then
    echo -e "${GREEN}✅ libnss3.so found${NC}"
else
    echo -e "${RED}❌ libnss3.so not found${NC}"
fi

if ldconfig -p | grep -q libgbm.so; then
    echo -e "${GREEN}✅ libgbm.so found${NC}"
else
    echo -e "${RED}❌ libgbm.so not found${NC}"
fi

echo -e "\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ Dependencies installation complete!${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"

echo -e "${YELLOW}📝 Next steps:${NC}"
echo -e "1. Restart your application:"
echo -e "   ${GREEN}su - vidbuilder${NC}"
echo -e "   ${GREEN}cd ~/apps/vidbuilder${NC}"
echo -e "   ${GREEN}pm2 restart vidbuilder${NC}"
echo -e "\n2. Test video generation:"
echo -e "   ${GREEN}curl -X POST http://localhost:3000/api/generate-flexible-video \\${NC}"
echo -e "   ${GREEN}  -H 'Content-Type: application/json' \\${NC}"
echo -e "   ${GREEN}  -d '{...}'${NC}"
echo -e "\n3. Check logs:"
echo -e "   ${GREEN}pm2 logs vidbuilder${NC}\n"
