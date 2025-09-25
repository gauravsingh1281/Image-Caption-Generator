# Setup Guide for Image Caption Generator

## 🚀 Quick Setup Guide

This guide will help you set up the Image Caption Generator API in under 10 minutes.

### Prerequisites Checklist

Before starting, make sure you have:

- [ ] Node.js (v14 or higher) - [Download here](https://nodejs.org/)
- [ ] MongoDB (local or cloud) - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (recommended)
- [ ] Google Gemini API key - [Get it here](https://makersuite.google.com/app/apikey)
- [ ] ImageKit account - [Sign up here](https://imagekit.io/)

## 🔧 Step-by-Step Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/gauravsingh1281/Image-Caption-Generator.git
cd Image-Caption-Generator/server
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Get Required API Keys

#### Google Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the generated key

#### ImageKit Configuration

1. Sign up at [ImageKit.io](https://imagekit.io/)
2. Go to Developer → API Keys
3. Copy:
   - Public Key
   - Private Key
   - URL Endpoint

#### MongoDB URI

**Option A: MongoDB Atlas (Recommended)**

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get connection string

**Option B: Local MongoDB**

```bash
# Install MongoDB locally
# Windows: Download from https://www.mongodb.com/try/download/community
# macOS: brew install mongodb/brew/mongodb-community
# Ubuntu: sudo apt install mongodb

# Start MongoDB
mongod
```

### Step 4: Configure Environment Variables

Create a `.env` file in the server directory:

```env
# Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/image-caption-generator

# JWT Secret (generate a random string)
JWT_SECRET_KEY=your-super-secret-jwt-key-minimum-32-characters

# Google Gemini AI
GEMINI_API_KEY=AIzaSyD_your_gemini_api_key_here

# ImageKit Configuration
IMAGEKIT_PUBLIC_KEY=public_your_public_key_here
IMAGEKIT_PRIVATE_KEY=private_your_private_key_here
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id

# Server Configuration
PORT=3000
NODE_ENV=development
```

### Step 5: Start the Server

```bash
# Development mode (with auto-restart)
npm run dev

# Or production mode
npm start
```

You should see:

```
Server is running on port 3000
MongoDB Connected: cluster0-abc123.mongodb.net
```

### Step 6: Test the API

```bash
# Test health endpoint
curl http://localhost:3000/api/auth/register

# Should return an error about missing email/password
```

## 🧪 Verify Installation

### 1. Test User Registration

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123!"
  }'
```

**Expected Response:**

```json
{
  "message": "User registered successfully.",
  "user": {
    "_id": "...",
    "email": "test@example.com",
    "uploadedImage": []
  }
}
```

### 2. Test User Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123!"
  }'
```

### 3. Test Image Upload

```bash
curl -X POST http://localhost:3000/api/user/upload-image \
  -b cookies.txt \
  -F "imageFile=@./path/to/test-image.jpg"
```

## 🐛 Troubleshooting

### Common Issues and Solutions

#### Issue: "MongoDB connection failed"

```bash
# Check your MONGODB_URI
# Ensure IP is whitelisted in MongoDB Atlas
# Verify username/password
```

#### Issue: "Gemini API Error"

```bash
# Verify your GEMINI_API_KEY
# Check API quotas in Google AI Studio
# Ensure image format is supported
```

#### Issue: "ImageKit upload failed"

```bash
# Verify ImageKit credentials
# Check network connectivity
# Ensure file size is within limits
```

#### Issue: "JWT Secret Key Error"

```bash
# Ensure JWT_SECRET_KEY is at least 32 characters
# Use a random, secure string
```

### Debug Mode

Enable detailed logging:

```bash
DEBUG=* npm start
```

## 📱 Testing with Postman

1. Import the provided Postman collection:

   - `Image-Caption-Generator-API.postman_collection.json`
   - `Image-Caption-Generator.postman_environment.json`

2. Update environment variables in Postman:

   - Set `base_url` to `http://localhost:3000`

3. Run the collection to test all endpoints

## 🔧 Development Setup

### Recommended VS Code Extensions

```json
{
  "recommendations": [
    "ms-vscode.vscode-json",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.thunder-client"
  ]
}
```

### Git Hooks Setup

```bash
# Install husky for git hooks
npm install --save-dev husky
npx husky install

# Add pre-commit hook
npx husky add .husky/pre-commit "npm test"
```

## 📊 Performance Optimization

### Recommended Settings

```javascript
// In server.js - Add these middleware for production
const compression = require("compression");
const helmet = require("helmet");

app.use(compression());
app.use(helmet());
```

### MongoDB Indexes

```javascript
// Add these indexes for better performance
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ "uploadedImage.imageUrl": 1 });
```

## 🚀 Deployment Options

### Option 1: Heroku (Easiest)

```bash
# Install Heroku CLI
npm install -g heroku

# Login and create app
heroku login
heroku create your-app-name

# Set environment variables
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET_KEY=your_jwt_secret
heroku config:set GEMINI_API_KEY=your_gemini_key
heroku config:set IMAGEKIT_PUBLIC_KEY=your_public_key
heroku config:set IMAGEKIT_PRIVATE_KEY=your_private_key
heroku config:set IMAGEKIT_URL_ENDPOINT=your_endpoint

# Deploy
git push heroku main
```

### Option 2: DigitalOcean/AWS

```bash
# SSH to your server
ssh user@your-server-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
npm install -g pm2

# Clone and setup
git clone https://github.com/gauravsingh1281/Image-Caption-Generator.git
cd Image-Caption-Generator/server
npm install

# Set environment variables
nano .env  # Add your configuration

# Start with PM2
pm2 start server.js --name "image-caption-api"
pm2 startup
pm2 save
```

### Option 3: Docker

```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
# Build and run
docker build -t image-caption-generator .
docker run -p 3000:3000 --env-file .env image-caption-generator
```

## 📋 Security Checklist

- [ ] Environment variables are properly set
- [ ] JWT secret is strong and unique
- [ ] MongoDB connection uses authentication
- [ ] API keys are kept secret
- [ ] File upload restrictions are in place
- [ ] CORS is properly configured
- [ ] Rate limiting is implemented (for production)

## 📞 Support

If you encounter any issues:

1. **Check the logs** for detailed error messages
2. **Review this setup guide** step by step
3. **Check GitHub Issues** for similar problems
4. **Create a new issue** with detailed error information

## 🎉 Next Steps

After successful setup:

1. **Explore the API** using Postman collection
2. **Build a frontend** using React, Vue, or your preferred framework
3. **Add custom features** like image filters or advanced search
4. **Deploy to production** using one of the deployment options
5. **Monitor performance** and optimize as needed

## 📚 Additional Resources

- [API Documentation](./API-Documentation.md)
- [Postman Guide](./README-Postman.md)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Google Gemini API](https://ai.google.dev/docs)
- [ImageKit Documentation](https://docs.imagekit.io/)

---

**Congratulations! 🎉 Your Image Caption Generator API is now ready to use!**

For any questions or issues, please refer to the [main README](./README.md) or create an issue on GitHub.
