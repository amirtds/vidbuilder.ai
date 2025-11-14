#!/usr/bin/env node

/**
 * Test script to verify concurrency limits
 * 
 * Usage: node test-concurrency.js [number_of_jobs]
 * Example: node test-concurrency.js 4
 */

const https = require('https');
const http = require('http');

const API_URL = process.env.API_URL || 'http://localhost:3000';
const USERNAME = process.env.API_USERNAME || 'admin';
const PASSWORD = process.env.API_PASSWORD || 'changeme';
const NUM_JOBS = parseInt(process.argv[2]) || 4;

// Simple test video config
const testVideoConfig = {
  theme: "winter",
  music: {
    enabled: true,
    volume: 0.3,
    trackId: "cyberpunk-futuristic-city-music-323171"
  },
  quality: "1080p",
  generateReels: false,
  scenes: [
    {
      type: "hero-title",
      duration: 3,
      content: {
        title: "Test Video",
        subtitle: "Concurrency Test"
      }
    },
    {
      type: "cta",
      duration: 3,
      content: {
        title: "Testing",
        buttonText: "Click Here"
      }
    }
  ]
};

function makeRequest(jobNumber) {
  return new Promise((resolve, reject) => {
    const url = new URL(`${API_URL}/api/generate-video-async`);
    const auth = Buffer.from(`${USERNAME}:${PASSWORD}`).toString('base64');
    
    const payload = JSON.stringify({
      ...testVideoConfig,
      webhookUrl: `https://webhook.site/test-${jobNumber}`
    });
    
    const options = {
      hostname: url.hostname,
      port: url.port || (url.protocol === 'https:' ? 443 : 80),
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
        'Authorization': `Basic ${auth}`
      }
    };
    
    const protocol = url.protocol === 'https:' ? https : http;
    
    const req = protocol.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          resolve({
            jobNumber,
            status: res.statusCode,
            response
          });
        } catch (e) {
          reject(new Error(`Failed to parse response: ${data}`));
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.write(payload);
    req.end();
  });
}

async function runTest() {
  console.log(`\n🧪 Testing Concurrency Limit`);
  console.log(`📍 API URL: ${API_URL}`);
  console.log(`📊 Submitting ${NUM_JOBS} jobs simultaneously...\n`);
  
  const startTime = Date.now();
  
  // Submit all jobs at once
  const promises = [];
  for (let i = 1; i <= NUM_JOBS; i++) {
    promises.push(makeRequest(i));
  }
  
  try {
    const results = await Promise.all(promises);
    const endTime = Date.now();
    
    console.log(`\n✅ All requests completed in ${endTime - startTime}ms\n`);
    console.log(`📋 Results:\n`);
    
    // Analyze results
    const queuedJobs = [];
    const processingJobs = [];
    
    results.forEach(({ jobNumber, status, response }) => {
      const queueInfo = response.queue || {};
      const isQueued = queueInfo.queueLength > 0 || queueInfo.position > queueInfo.maxConcurrent;
      
      console.log(`Job ${jobNumber}:`);
      console.log(`  Job ID: ${response.jobId}`);
      console.log(`  Status: ${response.status}`);
      console.log(`  Queue Position: ${queueInfo.position || 'N/A'}`);
      console.log(`  Active Renders: ${queueInfo.activeRenders}/${queueInfo.maxConcurrent}`);
      console.log(`  Queue Length: ${queueInfo.queueLength}`);
      console.log('');
      
      if (isQueued) {
        queuedJobs.push(jobNumber);
      } else {
        processingJobs.push(jobNumber);
      }
    });
    
    // Summary
    console.log(`\n📊 Summary:`);
    console.log(`  Total jobs submitted: ${NUM_JOBS}`);
    console.log(`  Jobs started immediately: ${processingJobs.length}`);
    console.log(`  Jobs queued: ${queuedJobs.length}`);
    
    const maxConcurrent = results[0]?.response?.queue?.maxConcurrent || 'unknown';
    console.log(`  Max concurrent limit: ${maxConcurrent}`);
    
    // Validation
    console.log(`\n✅ Validation:`);
    if (processingJobs.length <= maxConcurrent) {
      console.log(`  ✓ Jobs started (${processingJobs.length}) <= Max concurrent (${maxConcurrent})`);
    } else {
      console.log(`  ✗ ERROR: Too many jobs started! ${processingJobs.length} > ${maxConcurrent}`);
    }
    
    if (NUM_JOBS > maxConcurrent && queuedJobs.length > 0) {
      console.log(`  ✓ Excess jobs were queued (${queuedJobs.length} queued)`);
    } else if (NUM_JOBS > maxConcurrent && queuedJobs.length === 0) {
      console.log(`  ✗ ERROR: No jobs were queued when they should have been!`);
    }
    
  } catch (error) {
    console.error(`\n❌ Test failed:`, error.message);
    process.exit(1);
  }
}

runTest();
