# S3 Integration Quick Start

Get your videos automatically uploaded to AWS S3 in 5 minutes!

## 🚀 Quick Setup (5 Steps)

### 1. Install Dependencies
```bash
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner dotenv
```

### 2. Create S3 Bucket
1. Go to [AWS S3 Console](https://s3.console.aws.amazon.com/)
2. Click **"Create bucket"**
3. Bucket name: `vidbuilder` (or `vidbuilder-yourname` if taken)
4. Region: `us-east-1` (or your preferred region)
5. **Block Public Access**: Keep enabled (we'll use signed URLs)
6. **Encryption**: Enable SSE-S3
7. Click **"Create bucket"**

### 3. Configure CORS
1. Click on your bucket
2. Go to **Permissions** tab
3. Scroll to **CORS** section
4. Click **Edit** and paste:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedOrigins": ["http://localhost:3000"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3000
  }
]
```

### 4. Create IAM User & Get Keys
1. Go to [IAM Console](https://console.aws.amazon.com/iam/)
2. Click **Users** → **Create user**
3. Username: `vidbuilder-uploader`
4. Click **Next** → **Attach policies directly**
5. Click **Create policy** → **JSON** tab
6. Paste this policy (replace `vidbuilder` with your bucket name):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::vidbuilder",
        "arn:aws:s3:::vidbuilder/*"
      ]
    }
  ]
}
```

7. Name: `VideoBuilderS3Policy` → **Create policy**
8. Go back, refresh, select your policy → **Next** → **Create user**
9. Click on user → **Security credentials** → **Create access key**
10. Select **"Application running outside AWS"** → **Create**
11. **⚠️ COPY BOTH KEYS NOW** (secret key only shown once!)

### 5. Configure Environment Variables
Create `.env` file in project root:

```bash
# Copy from .env.example
cp .env.example .env
```

Edit `.env` and add your credentials:

```env
PORT=3000
NODE_ENV=development

# AWS S3 Configuration
AWS_ACCESS_KEY_ID=AKIA...your-key-here
AWS_SECRET_ACCESS_KEY=your-secret-key-here
AWS_REGION=us-east-1
AWS_S3_BUCKET=vidbuilder
```

**⚠️ IMPORTANT**: Never commit `.env` to Git!

---

## ✅ Test It

1. **Restart server**:
```bash
npm run dev
```

2. **Check startup message**:
```
☁️  AWS S3: Enabled (vidbuilder)
📍 Region: us-east-1
```

3. **Generate a video**:
   - Open `http://localhost:3000/advanced-client.html`
   - Create a simple video
   - Click **Generate Video**

4. **Verify S3 upload**:
   - Check server logs for: `✅ Videos uploaded to S3 successfully`
   - Look for **"☁️ Cloud Storage (S3)"** section in UI
   - Click S3 links to verify videos are accessible

---

## 📋 What Happens Now

### Automatic S3 Upload
Every generated video is automatically:
1. ✅ Rendered locally
2. ✅ Uploaded to S3 (organized by date and type)
3. ✅ Signed URL generated (valid 7 days)
4. ✅ Displayed in UI with cloud links

### File Organization
Videos are organized in S3:
```
videos/
  └── 2025-01-12/
      ├── standard/
      │   └── abc-123.mp4
      └── reels/
          └── abc-123_reels.mp4
```

### Response Format
```json
{
  "success": true,
  "jobId": "abc-123",
  "videoUrl": "/api/download/abc-123",
  "s3Upload": {
    "enabled": true,
    "standard": {
      "s3Key": "videos/2025-01-12/standard/abc-123.mp4",
      "signedUrl": "https://vidbuilder.s3.amazonaws.com/...",
      "expiresIn": "7 days"
    },
    "reels": {
      "s3Key": "videos/2025-01-12/reels/abc-123_reels.mp4",
      "signedUrl": "https://vidbuilder.s3.amazonaws.com/...",
      "expiresIn": "7 days"
    }
  }
}
```

---

## 💰 Cost Estimate

### S3 Pricing (us-east-1)
- Storage: $0.023/GB/month
- PUT requests: $0.005 per 1,000
- GET requests: $0.0004 per 1,000

### Example: 100 Videos/Month
- Storage: 15GB × $0.023 = **$0.35**
- Uploads: 100 × $0.000005 = **$0.0005**
- Downloads: 1,000 × $0.0000004 = **$0.0004**
- **Total: ~$0.35/month**

---

## 🔒 Security Features

✅ **Signed URLs** - Temporary access (7 days)  
✅ **Private bucket** - No public access  
✅ **IAM permissions** - Least privilege access  
✅ **Environment variables** - Credentials never in code  
✅ **CORS protection** - Only your domain allowed  

---

## 🛠️ Troubleshooting

### "S3 not configured" message
- Check `.env` file exists and has all 4 AWS variables
- Restart server after adding credentials
- Verify no typos in variable names

### "Access Denied" error
- Check IAM policy has correct bucket name
- Verify access keys are correct
- Ensure policy is attached to user

### "Bucket does not exist"
- Check bucket name in `.env` matches AWS
- Verify you're in the correct AWS region
- Bucket names are case-sensitive

### CORS errors
- Add your domain to CORS AllowedOrigins
- Check CORS configuration is saved
- Try clearing browser cache

### Videos not uploading
- Check server logs for error details
- Verify IAM user has PutObject permission
- Test AWS credentials with AWS CLI

---

## 📚 Full Documentation

- **Complete Setup**: `AWS_S3_SETUP_GUIDE.md`
- **Code Reference**: `s3-service.js`
- **Dependencies**: `INSTALL_S3_DEPENDENCIES.md`

---

## 🎯 Next Steps

1. ✅ Generate test video and verify S3 upload
2. ✅ Share S3 URLs with team/clients
3. ✅ Set up lifecycle policies (optional - auto-delete old videos)
4. ✅ Configure CloudFront CDN (optional - faster delivery)
5. ✅ Add custom domain (optional - branded URLs)

**You're all set! Videos will now automatically upload to S3.** ☁️✨
