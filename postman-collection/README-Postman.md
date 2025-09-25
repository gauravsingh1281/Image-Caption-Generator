# Image Caption Generator API - Postman Collection

This repository contains a comprehensive Postman collection for testing the Image Caption Generator API.

## Files Included

1. **Image-Caption-Generator-API.postman_collection.json** - Main collection file
2. **Image-Caption-Generator.postman_environment.json** - Environment variables
3. **README-Postman.md** - This instruction file

## Setup Instructions

### 1. Import Collection and Environment

1. Open Postman
2. Click "Import" button
3. Upload both JSON files:
   - `Image-Caption-Generator-API.postman_collection.json`
   - `Image-Caption-Generator.postman_environment.json`

### 2. Configure Environment

1. Select "Image Caption Generator Environment" from the environment dropdown
2. Update the `base_url` if your server runs on a different port (default: http://localhost:3000)
3. Optionally update test credentials if needed

### 3. Test Data Requirements

For image upload tests, you'll need to:

1. Prepare test images (JPEG, PNG, etc.)
2. Have a valid Gemini API key configured in your server
3. Ensure ImageKit is properly configured

## API Endpoints Covered

### Authentication

- **POST** `/api/auth/register` - Register new user
- **POST** `/api/auth/login` - Login user
- **POST** `/api/auth/register` (Invalid Email) - Test validation
- **POST** `/api/auth/login` (Wrong Credentials) - Test error handling

### Image Management

- **POST** `/api/user/upload-image` - Upload image and generate caption
- **GET** `/api/user/all-uploaded-img` - Get all uploaded images
- **POST** `/api/user/upload-image` (No Auth) - Test authentication
- **GET** `/api/user/all-uploaded-img` (No Auth) - Test authentication

## Testing Workflow

### 1. Authentication Flow

1. Run "Register User" to create a test account
2. Run "Login User" to authenticate
3. Cookies will be automatically managed for subsequent requests

### 2. Image Upload Flow

1. Ensure you're authenticated (run login first)
2. Select an image file in "Upload Image and Generate Caption"
3. Run the request to upload and generate caption
4. Run "Get All Uploaded Images" to verify storage

### 3. Error Testing

1. Test invalid email registration
2. Test wrong login credentials
3. Test endpoints without authentication

## Test Assertions

Each request includes comprehensive test assertions:

- Status code validation
- Response structure validation
- Authentication token verification
- Response time validation
- Data type validation

## Environment Variables

- `base_url`: Server base URL (default: http://localhost:3000)
- `base_url_no_auth`: Same as base_url but for unauthenticated requests
- `test_email`: Test user email
- `test_password`: Test user password
- `auth_token`: Auto-managed authentication token

## Sample Test Data

### User Registration/Login

```json
{
  "email": "testuser@example.com",
  "password": "TestPassword123!"
}
```

### Image Upload

- Use any JPEG, PNG, or supported image format
- File size should be reasonable (under 10MB recommended)
- Images with clear subjects work best for caption generation

## Prerequisites

Before running tests, ensure:

1. **Server is running** on the specified port
2. **Database is connected** (MongoDB)
3. **Environment variables are set**:
   - `JWT_SECRET_KEY`
   - `GEMINI_API_KEY`
   - ImageKit configuration
4. **All dependencies are installed**

## Expected Response Examples

### Successful Registration

```json
{
  "message": "User registered successfully.",
  "user": {
    "email": "testuser@example.com",
    "_id": "...",
    "uploadedImage": []
  }
}
```

### Successful Image Upload

```json
{
  "message": "Image uploaded and caption generated successfully.",
  "imageUrl": "https://ik.imagekit.io/...",
  "caption": "A descriptive caption of the image"
}
```

### Get All Images

```json
{
  "message": "Uploaded images retrieved successfully.",
  "images": [
    {
      "imageUrl": "https://ik.imagekit.io/...",
      "caption": "Generated caption",
      "_id": "..."
    }
  ]
}
```

## Troubleshooting

### Common Issues

1. **401 Unauthorized**: Ensure you're logged in and cookies are enabled
2. **500 Server Error**: Check server logs and environment variables
3. **Gemini API Errors**: Verify API key and image format
4. **ImageKit Errors**: Check ImageKit configuration

### Debug Tips

1. Check Postman Console for detailed request/response data
2. Verify environment variables are set correctly
3. Ensure server is running and accessible
4. Check that all required services (MongoDB, ImageKit, Gemini) are working

## Collection Features

- **Automated Testing**: Pre/post-request scripts for validation
- **Cookie Management**: Automatic handling of authentication cookies
- **Error Handling**: Comprehensive error scenario testing
- **Performance Testing**: Response time validation
- **Data Validation**: Schema and type checking

## Running the Collection

### Manual Testing

1. Run requests individually in the order listed
2. Check test results in the "Test Results" tab
3. View response data and verify expected behavior

### Automated Testing

1. Use Postman's Collection Runner
2. Select the entire collection or specific folders
3. Configure iterations and delay if needed
4. Review the test report

This collection provides a complete testing suite for your Image Caption Generator API, covering all major functionality and edge cases.
