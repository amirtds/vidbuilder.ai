#!/bin/bash

# Test Webhook URL Validation
# This script tests the webhook URL validation for the async API

echo "🧪 Testing Webhook URL Validation"
echo "=================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
API_URL="http://localhost:3000/api/generate-video-async"
USERNAME="admin"
PASSWORD="changeme"

# Test 1: Missing webhook URL
echo -e "${YELLOW}Test 1: Missing webhookUrl (should fail)${NC}"
curl -u "$USERNAME:$PASSWORD" \
  -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "theme": "corporate",
    "music": {"trackId": "corp-1", "volume": 0.3},
    "quality": "1080p",
    "scenes": [
      {
        "type": "hero-title",
        "duration": 4,
        "content": {
          "title": "Test Video",
          "subtitle": "No webhook URL"
        }
      }
    ]
  }' | jq '.'

echo -e "\n${GREEN}Expected: 400 Bad Request - Webhook URL is required${NC}\n"
echo "---"
echo ""

# Test 2: Invalid webhook URL format
echo -e "${YELLOW}Test 2: Invalid webhookUrl format (should fail)${NC}"
curl -u "$USERNAME:$PASSWORD" \
  -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "webhookUrl": "not-a-valid-url",
    "theme": "corporate",
    "music": {"trackId": "corp-1", "volume": 0.3},
    "quality": "1080p",
    "scenes": [
      {
        "type": "hero-title",
        "duration": 4,
        "content": {
          "title": "Test Video",
          "subtitle": "Invalid webhook URL"
        }
      }
    ]
  }' | jq '.'

echo -e "\n${GREEN}Expected: 400 Bad Request - Invalid webhook URL format${NC}\n"
echo "---"
echo ""

# Test 3: Invalid protocol (ftp://)
echo -e "${YELLOW}Test 3: Invalid protocol (should fail)${NC}"
curl -u "$USERNAME:$PASSWORD" \
  -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "webhookUrl": "ftp://example.com/webhook",
    "theme": "corporate",
    "music": {"trackId": "corp-1", "volume": 0.3},
    "quality": "1080p",
    "scenes": [
      {
        "type": "hero-title",
        "duration": 4,
        "content": {
          "title": "Test Video",
          "subtitle": "FTP protocol"
        }
      }
    ]
  }' | jq '.'

echo -e "\n${GREEN}Expected: 400 Bad Request - Invalid webhook URL protocol${NC}\n"
echo "---"
echo ""

# Test 4: Valid webhook URL (should succeed)
echo -e "${YELLOW}Test 4: Valid webhookUrl (should succeed)${NC}"
curl -u "$USERNAME:$PASSWORD" \
  -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "webhookUrl": "https://webhook.site/unique-url-here",
    "theme": "corporate",
    "music": {"trackId": "corp-1", "volume": 0.3},
    "quality": "1080p",
    "scenes": [
      {
        "type": "hero-title",
        "duration": 4,
        "content": {
          "title": "Test Video",
          "subtitle": "Valid webhook URL"
        }
      }
    ]
  }' | jq '.'

echo -e "\n${GREEN}Expected: 202 Accepted - Job started successfully${NC}\n"
echo "---"
echo ""

echo -e "${GREEN}✅ All tests completed!${NC}"
echo ""
echo "Summary:"
echo "- Test 1: Missing webhookUrl → Should return 400"
echo "- Test 2: Invalid format → Should return 400"
echo "- Test 3: Invalid protocol → Should return 400"
echo "- Test 4: Valid webhookUrl → Should return 202"
