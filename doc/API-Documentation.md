# Image Caption Generator API Documentation

## 📋 Table of Contents

- [Overview](#overview)
- [Authentication](#authentication)
- [Base URL](#base-url)
- [API Endpoints](#api-endpoints)
- [Request/Response Examples](#request-response-examples)
- [Error Handling](#error-handling)
- [Status Codes](#status-codes)
- [Rate Limiting](#rate-limiting)
- [SDKs and Libraries](#sdks-and-libraries)

## Overview

The Image Caption Generator API allows users to upload images and automatically generate descriptive captions using AI technology. The API provides user authentication, image upload, and caption generation functionality.

### Features

- 🔐 **User Authentication** - Secure registration and login
- 📁 **Image Upload** - Support for multiple image formats
- 🤖 **AI Caption Generation** - Powered by Google's Gemini AI
- ☁️ **Cloud Storage** - Images stored on ImageKit CDN
- 📊 **User Management** - Track uploaded images per user

### Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **AI Service**: Google Gemini API
- **Image Storage**: ImageKit
- **Authentication**: JWT with HTTP-only cookies

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Tokens are stored in HTTP-only cookies for security.

### Authentication Flow

1. Register a new account or login with existing credentials
2. Receive JWT token in HTTP-only cookie
3. Include cookie in subsequent requests
4. Token is automatically validated by middleware

### Security Features

- Password hashing with bcrypt
- HTTP-only cookies prevent XSS attacks
- JWT tokens with configurable expiration
- Protected routes require authentication

## Base URL

```
http://localhost:3000/api
```

**Note**: Update the base URL according to your deployment environment.

## API Endpoints

### 🔐 Authentication Endpoints

#### Register User

Creates a new user account.

```http
POST /auth/register
```

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Response (201 Created):**

```json
{
  "message": "User registered successfully.",
  "user": {
    "_id": "64f7b1234567890abcdef123",
    "email": "user@example.com",
    "uploadedImage": [],
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### Login User

Authenticates an existing user.

```http
POST /auth/login
```

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Response (200 OK):**

```json
{
  "message": "User logged in successfully.",
  "user": {
    "_id": "64f7b1234567890abcdef123",
    "email": "user@example.com",
    "uploadedImage": [
      {
        "_id": "64f7b1234567890abcdef124",
        "imageUrl": "https://ik.imagekit.io/example/image.jpg",
        "caption": "A beautiful sunset over the mountains"
      }
    ],
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T12:45:00.000Z"
  }
}
```

### 📁 Image Management Endpoints

#### Upload Image and Generate Caption

Uploads an image file and generates an AI-powered caption.

```http
POST /user/upload-image
```

**Authentication Required**: Yes

**Request Type**: `multipart/form-data`

**Form Data:**

- `imageFile` (File): Image file to upload (JPEG, PNG, WebP, etc.)

**Response (200 OK):**

```json
{
  "message": "Image uploaded and caption generated successfully.",
  "imageUrl": "https://ik.imagekit.io/example/userImage_1640995200000_image.jpg",
  "caption": "A golden retriever playing in a sunny park with green grass and trees in the background"
}
```

#### Get All Uploaded Images

Retrieves all uploaded images and their captions for the authenticated user.

```http
GET /user/all-uploaded-img
```

**Authentication Required**: Yes

**Response (200 OK):**

```json
{
  "message": "Uploaded images retrieved successfully.",
  "images": [
    {
      "_id": "64f7b1234567890abcdef124",
      "imageUrl": "https://ik.imagekit.io/example/userImage_1640995200000_image1.jpg",
      "caption": "A golden retriever playing in a sunny park"
    },
    {
      "_id": "64f7b1234567890abcdef125",
      "imageUrl": "https://ik.imagekit.io/example/userImage_1640995300000_image2.jpg",
      "caption": "A beautiful sunset over the ocean with waves"
    }
  ]
}
```

## Request/Response Examples

### cURL Examples

#### Register User

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123!"
  }'
```

#### Login User

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123!"
  }'
```

#### Upload Image

```bash
curl -X POST http://localhost:3000/api/user/upload-image \
  -b cookies.txt \
  -F "imageFile=@/path/to/your/image.jpg"
```

#### Get All Images

```bash
curl -X GET http://localhost:3000/api/user/all-uploaded-img \
  -b cookies.txt
```

### JavaScript Examples

#### Using Fetch API

```javascript
// Register User
const registerUser = async () => {
  const response = await fetch("http://localhost:3000/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "test@example.com",
      password: "TestPassword123!",
    }),
    credentials: "include", // Include cookies
  });

  const data = await response.json();
  console.log(data);
};

// Upload Image
const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("imageFile", file);

  const response = await fetch("http://localhost:3000/api/user/upload-image", {
    method: "POST",
    body: formData,
    credentials: "include", // Include cookies for authentication
  });

  const data = await response.json();
  console.log(data);
};

// Get All Images
const getAllImages = async () => {
  const response = await fetch(
    "http://localhost:3000/api/user/all-uploaded-img",
    {
      method: "GET",
      credentials: "include", // Include cookies for authentication
    }
  );

  const data = await response.json();
  console.log(data);
};
```

#### Using Axios

```javascript
import axios from "axios";

// Configure axios to include cookies
axios.defaults.withCredentials = true;
const baseURL = "http://localhost:3000/api";

// Register User
const registerUser = async () => {
  try {
    const response = await axios.post(`${baseURL}/auth/register`, {
      email: "test@example.com",
      password: "TestPassword123!",
    });
    console.log(response.data);
  } catch (error) {
    console.error(error.response.data);
  }
};

// Upload Image
const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("imageFile", file);

  try {
    const response = await axios.post(
      `${baseURL}/user/upload-image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response.data);
  } catch (error) {
    console.error(error.response.data);
  }
};
```

## Error Handling

### Error Response Format

All error responses follow a consistent format:

```json
{
  "message": "Error description",
  "error": "Detailed error information (optional)"
}
```

### Common Error Scenarios

#### Authentication Errors

```json
// Missing or invalid token
{
    "message": "Unauthorized access: No token provided."
}

// Invalid credentials
{
    "message": "Invalid email or password."
}
```

#### Validation Errors

```json
// User already exists
{
    "message": "A user is already registered with this email address."
}

// Missing required fields
{
    "message": "Email and password are required."
}
```

#### Server Errors

```json
// General server error
{
    "message": "An error occurred while processing your request.",
    "error": "Detailed error message"
}

// Image processing error
{
    "message": "An error occurred while uploading image and generating caption.",
    "error": "Failed to generate caption"
}
```

## Status Codes

| Status Code | Description           | Usage                                                    |
| ----------- | --------------------- | -------------------------------------------------------- |
| 200         | OK                    | Successful GET requests, successful operations           |
| 201         | Created               | Successful user registration                             |
| 400         | Bad Request           | Invalid request data or validation errors                |
| 401         | Unauthorized          | Missing, invalid, or expired authentication              |
| 409         | Conflict              | Resource already exists (e.g., email already registered) |
| 500         | Internal Server Error | Server-side errors, external service failures            |

## Rate Limiting

Currently, there are no explicit rate limits implemented. However, consider implementing rate limiting for production use:

### Recommended Limits

- **Authentication endpoints**: 5 requests per minute per IP
- **Image upload**: 10 uploads per hour per user
- **Image retrieval**: 100 requests per minute per user

### Implementation Suggestion

```javascript
// Using express-rate-limit
const rateLimit = require("express-rate-limit");

const authLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // 5 requests per minute
  message: "Too many authentication attempts, please try again later.",
});

const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // 10 uploads per hour
  message: "Upload limit exceeded, please try again later.",
});
```

## Data Models

### User Model

```javascript
{
  _id: ObjectId,
  email: String (unique, required),
  password: String (hashed, required),
  uploadedImage: [
    {
      _id: ObjectId,
      imageUrl: String,
      caption: String
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

### Image Object

```javascript
{
  _id: ObjectId,
  imageUrl: String, // ImageKit CDN URL
  caption: String   // AI-generated description
}
```

## Environment Variables

Required environment variables for the API:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/image-caption-generator

# JWT Secret
JWT_SECRET_KEY=your-super-secret-jwt-key

# Google Gemini AI
GEMINI_API_KEY=your-gemini-api-key

# ImageKit Configuration
IMAGEKIT_PUBLIC_KEY=your-imagekit-public-key
IMAGEKIT_PRIVATE_KEY=your-imagekit-private-key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your-imagekit-id

# Server Configuration
PORT=3000
NODE_ENV=development
```

## SDKs and Libraries

### Dependencies

```json
{
  "express": "^4.18.0",
  "mongoose": "^7.0.0",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.0",
  "multer": "^1.4.5",
  "cookie-parser": "^1.4.6",
  "@google/genai": "^0.1.0",
  "imagekit": "^4.1.0"
}
```

### Client Libraries

For frontend integration, consider these libraries:

- **React**: axios, fetch API
- **Vue.js**: axios, Vue Resource
- **Angular**: HttpClient
- **Node.js**: axios, node-fetch

## Testing

### Unit Testing

```bash
npm test
```

### Integration Testing

Use the provided Postman collection for comprehensive API testing.

### Test Coverage

- Authentication flow
- Image upload and processing
- Error handling
- Edge cases

## Performance Considerations

### Optimization Tips

1. **Image Processing**: Consider image compression before upload
2. **Caching**: Implement Redis for frequently accessed data
3. **Database Indexing**: Add indexes on frequently queried fields
4. **Load Balancing**: Use multiple server instances for high traffic

### Monitoring

- Response times
- Error rates
- Upload success rates
- AI service performance

## Support and Contact

For API support, please contact:

- **Developer**: gauravsingh1281
- **Repository**: https://github.com/gauravsingh1281/Image-Caption-Generator
- **Issues**: Submit issues on GitHub

## Changelog

### Version 1.0.0

- Initial API release
- User authentication
- Image upload and caption generation
- Basic CRUD operations

---

**Last Updated**: August 23, 2025  
**API Version**: 1.0.0  
**Documentation Version**: 1.0.0
