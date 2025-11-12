# Install S3 Dependencies

Run this command to install the required AWS SDK packages:

```bash
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner dotenv
```

## What Gets Installed

- **@aws-sdk/client-s3** - AWS SDK v3 for S3 operations (upload, download, delete)
- **@aws-sdk/s3-request-presigner** - Generate signed URLs for secure temporary access
- **dotenv** - Load environment variables from .env file

## After Installation

1. Create your `.env` file (copy from `.env.example`)
2. Follow the AWS setup guide in `AWS_S3_SETUP_GUIDE.md`
3. Add your AWS credentials to `.env`
4. Restart the server

The server will automatically detect S3 configuration and enable cloud uploads!
