/**
 * AWS S3 Service for Video Upload
 * Handles uploading generated videos to S3 bucket
 */

const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();

// Validate environment variables
const requiredEnvVars = ['AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'AWS_REGION', 'AWS_S3_BUCKET'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.warn('⚠️  Missing AWS environment variables:', missingVars.join(', '));
  console.warn('💡 S3 upload will be disabled. See AWS_S3_SETUP_GUIDE.md for setup instructions.');
}

// Initialize S3 Client
const s3Client = missingVars.length === 0 ? new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
}) : null;

const BUCKET_NAME = process.env.AWS_S3_BUCKET || 'vidbuilder';

/**
 * Upload a video file to S3
 * @param {string} filePath - Local path to the video file
 * @param {string} jobId - Unique job ID for the video
 * @param {string} videoType - 'standard' or 'reels'
 * @returns {Promise<Object>} - Upload result with S3 key and URL
 */
async function uploadVideoToS3(filePath, jobId, videoType = 'standard') {
  if (!s3Client) {
    throw new Error('S3 client not initialized. Check AWS environment variables.');
  }

  try {
    // Read the file
    const fileContent = await fs.readFile(filePath);
    const fileName = path.basename(filePath);
    
    // Generate S3 key with organized structure
    const timestamp = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const s3Key = `videos/${timestamp}/${videoType}/${jobId}.mp4`;
    
    // Upload parameters
    const uploadParams = {
      Bucket: BUCKET_NAME,
      Key: s3Key,
      Body: fileContent,
      ContentType: 'video/mp4',
      Metadata: {
        jobId: jobId,
        videoType: videoType,
        uploadedAt: new Date().toISOString(),
      },
    };
    
    console.log(`📤 Uploading ${videoType} video to S3: ${s3Key}`);
    
    // Upload to S3
    const command = new PutObjectCommand(uploadParams);
    await s3Client.send(command);
    
    console.log(`✅ Successfully uploaded to S3: ${s3Key}`);
    
    // Generate signed URL (valid for 7 days)
    const signedUrl = await getSignedUrl(s3Client, new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: s3Key,
    }), { expiresIn: 604800 }); // 7 days
    
    return {
      success: true,
      s3Key: s3Key,
      bucket: BUCKET_NAME,
      signedUrl: signedUrl,
      publicUrl: `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${s3Key}`,
      expiresIn: '7 days',
    };
    
  } catch (error) {
    console.error('❌ S3 upload error:', error);
    throw new Error(`Failed to upload to S3: ${error.message}`);
  }
}

/**
 * Upload both standard and reels videos to S3
 * @param {string} standardPath - Path to standard video
 * @param {string} reelsPath - Path to reels video (optional)
 * @param {string} jobId - Unique job ID
 * @returns {Promise<Object>} - Upload results for both videos
 */
async function uploadVideosToS3(standardPath, reelsPath, jobId) {
  if (!s3Client) {
    console.warn('⚠️  S3 upload skipped - AWS not configured');
    return {
      success: false,
      message: 'S3 not configured. Videos saved locally only.',
    };
  }

  const results = {
    standard: null,
    reels: null,
  };

  try {
    // Upload standard video
    if (standardPath) {
      results.standard = await uploadVideoToS3(standardPath, jobId, 'standard');
    }

    // Upload reels video if provided
    if (reelsPath) {
      results.reels = await uploadVideoToS3(reelsPath, `${jobId}_reels`, 'reels');
    }

    return {
      success: true,
      ...results,
    };

  } catch (error) {
    console.error('❌ Error uploading videos to S3:', error);
    return {
      success: false,
      error: error.message,
      ...results, // Return any successful uploads
    };
  }
}

/**
 * Delete a video from S3
 * @param {string} s3Key - S3 object key
 * @returns {Promise<boolean>} - Success status
 */
async function deleteVideoFromS3(s3Key) {
  if (!s3Client) {
    throw new Error('S3 client not initialized');
  }

  try {
    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: s3Key,
    });

    await s3Client.send(command);
    console.log(`🗑️  Deleted from S3: ${s3Key}`);
    return true;

  } catch (error) {
    console.error('❌ S3 delete error:', error);
    throw error;
  }
}

/**
 * Generate a new signed URL for an existing S3 object
 * @param {string} s3Key - S3 object key
 * @param {number} expiresIn - Expiration time in seconds (default: 7 days)
 * @returns {Promise<string>} - Signed URL
 */
async function getVideoSignedUrl(s3Key, expiresIn = 604800) {
  if (!s3Client) {
    throw new Error('S3 client not initialized');
  }

  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: s3Key,
    });

    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn });
    return signedUrl;

  } catch (error) {
    console.error('❌ Error generating signed URL:', error);
    throw error;
  }
}

/**
 * Check if S3 is properly configured
 * @returns {boolean} - Configuration status
 */
function isS3Configured() {
  return s3Client !== null && missingVars.length === 0;
}

module.exports = {
  uploadVideoToS3,
  uploadVideosToS3,
  deleteVideoFromS3,
  getVideoSignedUrl,
  isS3Configured,
  BUCKET_NAME,
};
