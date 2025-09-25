# Image Caption Generator

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![Google AI](https://img.shields.io/badge/Google%20AI-4285F4?style=for-the-badge&logo=google&logoColor=white)

A powerful REST API that automatically generates descriptive captions for uploaded images using Google's Gemini AI. Built with Node.js, Express, and MongoDB, featuring secure user authentication and cloud-based image storage.

## 🚀 Features

- **🔐 Secure Authentication**: JWT-based user registration and login
- **📁 Image Upload**: Support for multiple image formats (JPEG, PNG, WebP)
- **🤖 AI-Powered Captions**: Automatic caption generation using Google Gemini AI
- **☁️ Cloud Storage**: Images stored on ImageKit CDN for fast delivery
- **👤 User Management**: Personal image galleries for each user
- **🛡️ Security**: Password hashing, HTTP-only cookies, input validation
- **📊 RESTful API**: Clean, documented endpoints following REST principles

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Client App    │───▶│   Express API   │───▶│    MongoDB      │
│  (Frontend)     │    │    (Backend)    │    │   (Database)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              ▼
                    ┌─────────────────┐    ┌─────────────────┐
                    │   ImageKit CDN  │    │  Google Gemini  │
                    │ (Image Storage) │    │   (AI Service)  │
                    └─────────────────┘    └─────────────────┘
```

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Usage Examples](#usage-examples)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)

## ⚡ Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Google Gemini API key
- ImageKit account

### 1. Clone the Repository

```bash
git clone https://github.com/gauravsingh1281/Image-Caption-Generator.git
cd Image-Caption-Generator/server
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Environment Variables

Create a `.env` file in the server directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/image-caption-generator

# JWT Secret
JWT_SECRET_KEY=your-super-secret-jwt-key-here

# Google Gemini AI
GEMINI_API_KEY=your-gemini-api-key-here

# ImageKit Configuration
IMAGEKIT_PUBLIC_KEY=your-imagekit-public-key
IMAGEKIT_PRIVATE_KEY=your-imagekit-private-key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your-imagekit-id

# Server Configuration
PORT=3000
NODE_ENV=development
```

### 4. Start the Server

```bash
npm start
```

The API will be available at `http://localhost:3000`

## 🔧 Installation

### Development Setup

1. **Clone and Install**

   ```bash
   git clone https://github.com/gauravsingh1281/Image-Caption-Generator.git
   cd Image-Caption-Generator/server
   npm install
   ```

2. **Database Setup**

   ```bash
   # Start MongoDB (if running locally)
   mongod

   # Or use MongoDB Atlas (cloud)
   # Update MONGODB_URI in .env file
   ```

3. **Get Required API Keys**

   - **Google Gemini API**: Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - **ImageKit**: Sign up at [ImageKit.io](https://imagekit.io/)

4. **Configure Environment**

   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

5. **Start Development Server**
   ```bash
   npm run dev  # With nodemon for auto-restart
   ```

### Production Setup

1. **Install Production Dependencies**

   ```bash
   npm ci --only=production
   ```

2. **Set Production Environment Variables**

   ```bash
   export NODE_ENV=production
   export MONGODB_URI=your-production-mongodb-uri
   export JWT_SECRET_KEY=your-production-jwt-secret
   # ... other environment variables
   ```

3. **Start Production Server**
   ```bash
   npm start
   ```

## ⚙️ Configuration

### Environment Variables

| Variable                | Required | Description                 | Example                        |
| ----------------------- | -------- | --------------------------- | ------------------------------ |
| `MONGODB_URI`           | Yes      | MongoDB connection string   | `mongodb://localhost:27017/db` |
| `JWT_SECRET_KEY`        | Yes      | Secret key for JWT tokens   | `your-super-secret-key`        |
| `GEMINI_API_KEY`        | Yes      | Google Gemini API key       | `AIzaSyD...`                   |
| `IMAGEKIT_PUBLIC_KEY`   | Yes      | ImageKit public key         | `public_xyz...`                |
| `IMAGEKIT_PRIVATE_KEY`  | Yes      | ImageKit private key        | `private_xyz...`               |
| `IMAGEKIT_URL_ENDPOINT` | Yes      | ImageKit URL endpoint       | `https://ik.imagekit.io/id`    |
| `PORT`                  | No       | Server port (default: 3000) | `3000`                         |
| `NODE_ENV`              | No       | Environment mode            | `development`                  |

### Database Configuration

The application uses MongoDB with Mongoose ODM. The database configuration is in `config/db.config.js`:

```javascript
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
```

## 📖 API Documentation

### Base URL

```
http://localhost:3000/api
```

### Authentication Endpoints

#### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
    "email": "user@example.com",
    "password": "SecurePassword123!"
}
```

#### Login User

```http
POST /api/auth/login
Content-Type: application/json

{
    "email": "user@example.com",
    "password": "SecurePassword123!"
}
```

### Image Management Endpoints

#### Upload Image and Generate Caption

```http
POST /api/user/upload-image
Authorization: Required (Cookie)
Content-Type: multipart/form-data

Form Data:
- imageFile: [Image File]
```

#### Get All User Images

```http
GET /api/user/all-uploaded-img
Authorization: Required (Cookie)
```

For complete API documentation, see [API-Documentation.md](./API-Documentation.md)

## 💡 Usage Examples

### Frontend Integration (React)

```jsx
import React, { useState } from "react";
import axios from "axios";

const ImageUploader = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("imageFile", file);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/upload-image",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      setResult(response.data);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Generating Caption..." : "Upload & Generate Caption"}
      </button>

      {result && (
        <div>
          <img src={result.imageUrl} alt="Uploaded" />
          <p>Caption: {result.caption}</p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
```

### Node.js Client Example

```javascript
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

class ImageCaptionClient {
  constructor(baseURL = "http://localhost:3000/api") {
    this.baseURL = baseURL;
    this.axios = axios.create({
      baseURL,
      withCredentials: true,
    });
  }

  async register(email, password) {
    const response = await this.axios.post("/auth/register", {
      email,
      password,
    });
    return response.data;
  }

  async login(email, password) {
    const response = await this.axios.post("/auth/login", {
      email,
      password,
    });
    return response.data;
  }

  async uploadImage(imagePath) {
    const formData = new FormData();
    formData.append("imageFile", fs.createReadStream(imagePath));

    const response = await this.axios.post("/user/upload-image", formData, {
      headers: formData.getHeaders(),
    });
    return response.data;
  }

  async getAllImages() {
    const response = await this.axios.get("/user/all-uploaded-img");
    return response.data;
  }
}

// Usage
const client = new ImageCaptionClient();

async function example() {
  try {
    // Register or login
    await client.login("user@example.com", "password123");

    // Upload image and get caption
    const result = await client.uploadImage("./path/to/image.jpg");
    console.log("Caption:", result.caption);

    // Get all images
    const allImages = await client.getAllImages();
    console.log("All images:", allImages.images);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
}

example();
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Postman Collection

Import the provided Postman collection for comprehensive API testing:

1. Import `Image-Caption-Generator-API.postman_collection.json`
2. Import `Image-Caption-Generator.postman_environment.json`
3. Run the collection to test all endpoints

### Manual Testing

```bash
# Test registration
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!"}'

# Test login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{"email":"test@example.com","password":"Test123!"}'

# Test image upload
curl -X POST http://localhost:3000/api/user/upload-image \
  -b cookies.txt \
  -F "imageFile=@./test-image.jpg"
```

## 🚀 Deployment

### Docker Deployment

1. **Create Dockerfile**

   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Build and Run**
   ```bash
   docker build -t image-caption-generator .
   docker run -p 3000:3000 --env-file .env image-caption-generator
   ```

### Heroku Deployment

1. **Install Heroku CLI**
2. **Create Heroku App**

   ```bash
   heroku create your-app-name
   ```

3. **Set Environment Variables**

   ```bash
   heroku config:set MONGODB_URI=your-mongodb-uri
   heroku config:set JWT_SECRET_KEY=your-jwt-secret
   heroku config:set GEMINI_API_KEY=your-gemini-key
   # ... other variables
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

### AWS/DigitalOcean Deployment

1. **Set up server (Ubuntu example)**

   ```bash
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # Install PM2
   npm install -g pm2

   # Clone and setup
   git clone https://github.com/gauravsingh1281/Image-Caption-Generator.git
   cd Image-Caption-Generator/server
   npm install

   # Start with PM2
   pm2 start server.js --name "image-caption-api"
   pm2 startup
   pm2 save
   ```

2. **Setup Nginx (optional)**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## 📁 Project Structure

```
Image-Caption-Generator/
├── server/
│   ├── config/
│   │   └── db.config.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── user.controller.js
│   ├── middlewares/
│   │   └── auth.middleware.js
│   ├── models/
│   │   └── user.model.js
│   ├── routes/
│   │   ├── auth.route.js
│   │   └── user.route.js
│   ├── services/
│   │   ├── generateCaption.service.js
│   │   └── imageUpload.service.js
│   ├── src/
│   │   └── app.js
│   ├── package.json
│   └── server.js
├── client/                 (Frontend - separate directory)
├── API-Documentation.md
├── README-Postman.md
├── Image-Caption-Generator-API.postman_collection.json
├── Image-Caption-Generator.postman_environment.json
└── README.md
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the Repository**

   ```bash
   git fork https://github.com/gauravsingh1281/Image-Caption-Generator.git
   ```

2. **Create Feature Branch**

   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make Changes and Test**

   ```bash
   npm test
   npm run lint
   ```

4. **Commit Changes**

   ```bash
   git commit -m "Add amazing feature"
   ```

5. **Push and Create PR**
   ```bash
   git push origin feature/amazing-feature
   ```

### Development Guidelines

- Follow ESLint configuration
- Write tests for new features
- Update documentation
- Use conventional commit messages
- Ensure backward compatibility

## 📊 Performance & Monitoring

### Performance Metrics

- **Image Upload**: ~2-5 seconds (depending on file size)
- **Caption Generation**: ~3-8 seconds (Gemini AI processing)
- **Database Queries**: <100ms (with proper indexing)

### Monitoring Recommendations

```javascript
// Add request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Monitor response times
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `${req.method} ${req.path} - ${res.statusCode} - ${duration}ms`
    );
  });
  next();
});
```

## 🔒 Security Considerations

- **Input Validation**: All inputs are validated and sanitized
- **Authentication**: JWT tokens with HTTP-only cookies
- **Password Security**: Bcrypt hashing with salt rounds
- **File Upload**: File type and size restrictions
- **Rate Limiting**: Consider implementing for production
- **CORS**: Configure appropriately for your domain

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**

   ```
   Solution: Check MONGODB_URI and ensure MongoDB is running
   ```

2. **Gemini API Errors**

   ```
   Solution: Verify GEMINI_API_KEY and check API quotas
   ```

3. **ImageKit Upload Failed**

   ```
   Solution: Check ImageKit credentials and network connectivity
   ```

4. **Authentication Issues**
   ```
   Solution: Ensure cookies are enabled and JWT_SECRET_KEY is set
   ```

### Debug Mode

```bash
# Enable debug logging
DEBUG=* npm start

# Or for specific modules
DEBUG=express:* npm start
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Gaurav Singh**

- GitHub: [@gauravsingh1281](https://github.com/gauravsingh1281)
- LinkedIn: [Connect with me](https://linkedin.com/in/gauravsingh1281)

## 🙏 Acknowledgments

- Google Gemini AI for powerful image recognition
- ImageKit for reliable image CDN services
- MongoDB for flexible document storage
- Express.js community for excellent middleware
- All contributors and users of this project

## 📈 Roadmap

### Upcoming Features

- [ ] Batch image processing
- [ ] Custom caption templates
- [ ] Image tags and categories
- [ ] Advanced search functionality
- [ ] User preferences and settings
- [ ] API rate limiting
- [ ] Redis caching
- [ ] WebSocket real-time updates
- [ ] Mobile app support
- [ ] Multi-language caption support

---

**⭐ Star this repository if you find it helpful!**

For questions, issues, or contributions, please visit the [GitHub repository](https://github.com/gauravsingh1281/Image-Caption-Generator).
