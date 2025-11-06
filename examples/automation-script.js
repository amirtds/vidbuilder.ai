#!/usr/bin/env node

/**
 * Automation Script for AI Video Generator
 * 
 * This script demonstrates how to programmatically generate videos
 * using the flexible video API with custom configurations.
 */

const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const fetch = require('node-fetch');

const API_URL = process.env.API_URL || 'http://localhost:3000';

// Video configuration
const videoConfig = {
  title: "Automated Product Video",
  type: "promotional",
  colorScheme: {
    primary: "#6B46EA",
    secondary: "#E91E63",
    accent: "#00BCD4",
    text: "#FFFFFF",
    textLight: "#E0E0E0",
    background: "#121212",
    backgroundGradient: "linear-gradient(135deg, #6B46EA 0%, #E91E63 100%)",
    borderRadius: 16
  },
  scenes: []
};

/**
 * Generate promotional video configuration
 */
function generatePromoConfig(productData) {
  return {
    ...videoConfig,
    title: productData.name,
    scenes: [
      {
        type: "hero-title",
        duration: 2.5,
        content: {
          title: productData.name,
          subtitle: productData.tagline
        }
      },
      {
        type: "product-showcase",
        duration: 5,
        content: {
          title: "Product Gallery",
          images: [], // Will be filled with uploaded images
          fitMode: "cover"
        }
      },
      {
        type: "feature-list",
        duration: 4,
        content: {
          title: "Key Features",
          features: productData.features.map((f, i) => ({
            icon: ["⚡", "🔒", "🚀", "💎"][i % 4],
            title: f.title,
            text: f.description
          }))
        }
      },
      {
        type: "cta",
        duration: 2.5,
        content: {
          title: productData.ctaTitle || "Get Started",
          buttonText: productData.ctaButton || "Buy Now",
          urgency: productData.urgency || "Limited Time Offer"
        }
      }
    ]
  };
}

/**
 * Generate educational video configuration
 */
function generateEducationalConfig(courseData) {
  return {
    ...videoConfig,
    title: courseData.title,
    type: "educational",
    colorScheme: {
      ...videoConfig.colorScheme,
      primary: "#4CAF50",
      secondary: "#2196F3",
      background: "#FFFFFF",
      text: "#212121",
      backgroundGradient: "linear-gradient(135deg, #E8F5E9 0%, #E3F2FD 100%)"
    },
    scenes: [
      {
        type: "lesson-title",
        duration: 3,
        content: {
          lessonNumber: courseData.lessonNumber,
          title: courseData.title,
          objectives: courseData.objectives
        }
      },
      ...courseData.steps.map((step, index) => ({
        type: "step-by-step",
        duration: 3,
        content: {
          title: `Step ${index + 1}`,
          steps: [{
            title: step.title,
            description: step.description
          }]
        }
      })),
      {
        type: "key-takeaways",
        duration: 4,
        content: {
          title: "Summary",
          takeaways: courseData.keyPoints.map(point => ({
            icon: "✅",
            text: point
          }))
        }
      }
    ]
  };
}

/**
 * Generate video via API
 */
async function generateVideo(config, imagePaths = []) {
  try {
    console.log('🎬 Starting video generation...');
    console.log(`📋 Configuration: ${config.scenes.length} scenes, ${config.type} type`);
    
    const formData = new FormData();
    formData.append('config', JSON.stringify(config));
    
    // Add images if provided
    for (const imagePath of imagePaths) {
      if (fs.existsSync(imagePath)) {
        formData.append('images', fs.createReadStream(imagePath));
        console.log(`📸 Added image: ${path.basename(imagePath)}`);
      }
    }
    
    console.log(`🚀 Sending request to ${API_URL}/api/generate-flexible-video`);
    
    const response = await fetch(`${API_URL}/api/generate-flexible-video`, {
      method: 'POST',
      body: formData
    });
    
    const result = await response.json();
    
    if (result.success) {
      console.log('✅ Video generated successfully!');
      console.log(`📥 Download URL: ${API_URL}${result.videoUrl}`);
      console.log(`🆔 Job ID: ${result.jobId}`);
      console.log(`⏱️ Duration: ${result.duration} seconds`);
      
      // Download the video
      await downloadVideo(result.videoUrl, result.jobId);
      
      return result;
    } else {
      throw new Error(result.error || 'Video generation failed');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    throw error;
  }
}

/**
 * Download generated video
 */
async function downloadVideo(videoUrl, jobId) {
  try {
    console.log(`📥 Downloading video...`);
    
    const response = await fetch(`${API_URL}${videoUrl}`);
    const buffer = await response.buffer();
    
    const outputPath = path.join(__dirname, `output_${jobId}.mp4`);
    fs.writeFileSync(outputPath, buffer);
    
    console.log(`💾 Video saved to: ${outputPath}`);
    return outputPath;
  } catch (error) {
    console.error('❌ Download failed:', error.message);
    throw error;
  }
}

/**
 * Main function - Example usage
 */
async function main() {
  // Example 1: Generate promotional video
  const productData = {
    name: "SuperProduct Pro",
    tagline: "The Ultimate Solution",
    features: [
      { title: "Fast", description: "10x faster performance" },
      { title: "Secure", description: "Bank-level security" },
      { title: "Easy", description: "No learning curve" }
    ],
    ctaTitle: "Start Your Free Trial",
    ctaButton: "Get Started",
    urgency: "7-Day Free Trial"
  };
  
  const promoConfig = generatePromoConfig(productData);
  
  // Add your product images here
  const imagePaths = [
    // './images/product1.jpg',
    // './images/product2.jpg',
    // './images/product3.jpg'
  ];
  
  try {
    const result = await generateVideo(promoConfig, imagePaths);
    console.log('🎉 Video generation complete!');
  } catch (error) {
    console.error('Failed to generate video:', error);
    process.exit(1);
  }
}

// Command line usage
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.includes('--help')) {
    console.log(`
AI Video Generator - Automation Script

Usage:
  node automation-script.js [options]
  
Options:
  --help          Show this help message
  --config FILE   Load configuration from JSON file
  --images DIR    Directory containing images to use
  --type TYPE     Video type (promotional|educational)
  
Environment Variables:
  API_URL         API endpoint (default: http://localhost:3000)
  
Examples:
  node automation-script.js
  node automation-script.js --config custom.json --images ./product-images
  API_URL=https://api.example.com node automation-script.js
    `);
    process.exit(0);
  }
  
  // Load custom config if provided
  if (args.includes('--config')) {
    const configIndex = args.indexOf('--config');
    const configFile = args[configIndex + 1];
    
    if (fs.existsSync(configFile)) {
      const customConfig = JSON.parse(fs.readFileSync(configFile, 'utf8'));
      console.log(`📄 Loaded config from: ${configFile}`);
      
      // Get images directory if provided
      let imagePaths = [];
      if (args.includes('--images')) {
        const imagesIndex = args.indexOf('--images');
        const imagesDir = args[imagesIndex + 1];
        
        if (fs.existsSync(imagesDir)) {
          imagePaths = fs.readdirSync(imagesDir)
            .filter(f => /\.(jpg|jpeg|png|gif|webp)$/i.test(f))
            .map(f => path.join(imagesDir, f));
          console.log(`📸 Found ${imagePaths.length} images in ${imagesDir}`);
        }
      }
      
      generateVideo(customConfig, imagePaths)
        .then(() => {
          console.log('✨ Done!');
          process.exit(0);
        })
        .catch(error => {
          console.error('💥 Failed:', error.message);
          process.exit(1);
        });
    } else {
      console.error(`❌ Config file not found: ${configFile}`);
      process.exit(1);
    }
  } else {
    // Run with default example
    main();
  }
}

module.exports = {
  generatePromoConfig,
  generateEducationalConfig,
  generateVideo,
  downloadVideo
};
