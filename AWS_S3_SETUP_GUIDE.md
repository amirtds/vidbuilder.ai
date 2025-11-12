# AWS S3 Setup Guide for Video Upload

## Step-by-Step S3 Bucket Creation

### Step 1: Sign in to AWS Console
1. Go to [https://aws.amazon.com/console/](https://aws.amazon.com/console/)
2. Sign in with your AWS account credentials
3. Make sure you're in your preferred region (e.g., `us-east-1`)

### Step 2: Navigate to S3
1. In the AWS Console search bar, type **"S3"**
2. Click on **"S3"** under Services
3. You'll see the S3 dashboard

### Step 3: Create the Bucket
1. Click the **"Create bucket"** button (orange button, top right)
2. **Bucket name**: `vidbuilder`
   - ⚠️ Bucket names must be globally unique across all AWS accounts
   - If `vidbuilder` is taken, try: `vidbuilder-yourname` or `vidbuilder-2025`
   - Use only lowercase letters, numbers, and hyphens
3. **AWS Region**: Choose your preferred region (e.g., `US East (N. Virginia) us-east-1`)
   - 💡 Choose a region close to your users for faster access

### Step 4: Configure Bucket Settings

#### Object Ownership
- Select **"ACLs disabled (recommended)"**
- This is the modern, secure approach

#### Block Public Access Settings
- **Uncheck** "Block all public access" if you want videos to be publicly accessible
- OR keep it checked if you'll use signed URLs (more secure)
- For this project, we'll use **signed URLs** (keep public access blocked)
- Acknowledge the warning if you unblock public access

#### Bucket Versioning
- **Enable** versioning (optional but recommended)
- This allows you to recover deleted videos

#### Tags (Optional)
- Add tags if needed for organization:
  - Key: `Project`, Value: `VideoGenerator`
  - Key: `Environment`, Value: `Production`

#### Default Encryption
- **Enable** Server-side encryption
- Choose **"Amazon S3 managed keys (SSE-S3)"** (free and automatic)

#### Advanced Settings
- Leave as default

5. Click **"Create bucket"** at the bottom

### Step 5: Configure CORS (Cross-Origin Resource Sharing)
This allows your web app to upload directly to S3.

1. Click on your newly created bucket (`vidbuilder`)
2. Go to the **"Permissions"** tab
3. Scroll down to **"Cross-origin resource sharing (CORS)"**
4. Click **"Edit"**
5. Paste this CORS configuration:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
    "AllowedOrigins": ["http://localhost:3000", "http://localhost:3001"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3000
  }
]
```

6. Click **"Save changes"**

### Step 6: Create IAM User for Programmatic Access

#### 6.1 Navigate to IAM
1. In AWS Console search bar, type **"IAM"**
2. Click on **"IAM"** under Services

#### 6.2 Create New User
1. Click **"Users"** in the left sidebar
2. Click **"Create user"** (or "Add users")
3. **User name**: `vidbuilder-uploader`
4. Click **"Next"**

#### 6.3 Set Permissions
1. Select **"Attach policies directly"**
2. Click **"Create policy"** (opens in new tab)

#### 6.4 Create Custom Policy
In the new tab:
1. Click the **"JSON"** tab
2. Paste this policy (replace `vidbuilder` with your actual bucket name):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "VideoBuilderS3Access",
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

3. Click **"Next"**
4. **Policy name**: `VideoBuilderS3Policy`
5. **Description**: "Allows video upload, download, and deletion from vidbuilder bucket"
6. Click **"Create policy"**

#### 6.5 Attach Policy to User
1. Go back to the user creation tab
2. Refresh the policy list (click the refresh icon)
3. Search for `VideoBuilderS3Policy`
4. Check the box next to it
5. Click **"Next"**
6. Review and click **"Create user"**

#### 6.6 Create Access Keys
1. Click on the newly created user (`vidbuilder-uploader`)
2. Go to **"Security credentials"** tab
3. Scroll down to **"Access keys"**
4. Click **"Create access key"**
5. Select **"Application running outside AWS"**
6. Click **"Next"**
7. Add description tag (optional): "Video Generator App"
8. Click **"Create access key"**
9. **⚠️ IMPORTANT**: Copy both:
   - **Access key ID** (starts with `AKIA...`)
   - **Secret access key** (only shown once!)
10. Click **"Download .csv file"** for backup
11. Click **"Done"**

### Step 7: Save Credentials Securely

**Never commit these to Git!**

Create a `.env` file in your project root:

```bash
# AWS S3 Configuration
AWS_ACCESS_KEY_ID=AKIA...your-access-key...
AWS_SECRET_ACCESS_KEY=your-secret-access-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=vidbuilder
```

Add `.env` to your `.gitignore`:
```
.env
.env.local
```

---

## Verification Checklist

✅ Bucket `vidbuilder` created  
✅ CORS configured for localhost  
✅ IAM user `vidbuilder-uploader` created  
✅ Custom policy `VideoBuilderS3Policy` attached  
✅ Access keys generated and saved  
✅ `.env` file created with credentials  
✅ `.env` added to `.gitignore`  

---

## Cost Estimate

### S3 Pricing (us-east-1)
- **Storage**: $0.023 per GB/month
- **PUT requests**: $0.005 per 1,000 requests
- **GET requests**: $0.0004 per 1,000 requests
- **Data transfer OUT**: First 100 GB/month free, then $0.09/GB

### Example Monthly Cost
- 100 videos × 150MB = 15GB storage = **$0.35/month**
- 100 uploads = **$0.0005**
- 1,000 downloads = **$0.0004**
- **Total: ~$0.35/month** for 100 videos

---

## Security Best Practices

1. ✅ **Never expose access keys** in client-side code
2. ✅ **Use environment variables** for credentials
3. ✅ **Enable bucket versioning** for recovery
4. ✅ **Use signed URLs** for temporary access
5. ✅ **Rotate access keys** every 90 days
6. ✅ **Enable CloudTrail** for audit logging (optional)
7. ✅ **Set lifecycle policies** to auto-delete old videos (optional)

---

## Troubleshooting

### Error: "Bucket name already exists"
- Bucket names are globally unique
- Try: `vidbuilder-yourname` or `vidbuilder-2025`

### Error: "Access Denied"
- Check IAM policy has correct bucket name
- Verify access keys are correct in `.env`
- Ensure policy is attached to user

### Error: "CORS policy error"
- Add your domain to CORS AllowedOrigins
- Check CORS configuration is saved

### Videos not accessible
- Use signed URLs (implemented in our code)
- Or make bucket public (less secure)

---

## Next Steps

1. ✅ Complete AWS setup above
2. ✅ Install AWS SDK: `npm install @aws-sdk/client-s3`
3. ✅ Configure environment variables
4. ✅ Test upload functionality
5. ✅ Update UI to show S3 URLs

**Ready to proceed with code implementation!** 🚀
