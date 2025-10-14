# PPT Converter Backend API

Backend server for the PPT to Interactive Story converter using Node.js, Express, and Gemini AI.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Set Up Environment Variables
```bash
# Copy the example env file
copy .env.example .env

# Edit .env and add your Gemini API key
# Get your API key from: https://makersuite.google.com/app/apikey
```

### 3. Start the Server
```bash
# Production mode
npm start

# Development mode (auto-restart on changes)
npm run dev
```

Server will run on: `http://localhost:5000`

## 📡 API Endpoints

### POST `/api/convert-ppt`
Upload and convert a PowerPoint file.

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body:
  - `file`: PPT file (.ppt or .pptx)
  - `fileName`: Name of the file (optional)

**Response:**
```json
{
  "title": "Presentation Title",
  "summary": "AI-generated summary...",
  "story": [
    {
      "chapter": "Chapter 1",
      "content": "Chapter description...",
      "quest": "Quest objective",
      "points": 100
    }
  ],
  "notes": ["📝 Note 1", "🎯 Note 2"],
  "stats": {
    "slides": 15,
    "chapters": 3,
    "quests": 8,
    "estimatedTime": "30-45 minutes"
  }
}
```

### GET `/api/health`
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "message": "PPT Converter API is running",
  "timestamp": "2025-10-14T..."
}
```

## 🔑 Getting Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the key
4. Add to your `.env` file:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

## 📦 Dependencies

- **express** - Web framework
- **multer** - File upload handling
- **cors** - Cross-origin resource sharing
- **@google/generative-ai** - Gemini AI SDK

## 🛠️ Development

```bash
# Install nodemon for auto-restart
npm install --save-dev nodemon

# Run in development mode
npm run dev
```

## 📝 Notes

- Maximum file size: 50MB
- Supported formats: .ppt, .pptx
- Files are automatically deleted after processing
- CORS is enabled for all origins (configure for production)

## 🐛 Troubleshooting

**Port already in use:**
```bash
# Change PORT in .env file
PORT=5001
```

**Gemini API errors:**
- Check API key is correct
- Verify API quota is not exceeded
- Check internet connection

**File upload fails:**
- Check file size (max 50MB)
- Verify file type (.ppt or .pptx)
- Ensure 'uploads' folder has write permissions

## 🚀 Production Deployment

### Deploy to Render
1. Push code to GitHub
2. Connect repository on Render
3. Add environment variables
4. Deploy!

### Deploy to Railway
1. Install Railway CLI
2. Run `railway init`
3. Add environment variables
4. Run `railway up`

Remember to update the API endpoint in your frontend:
```javascript
const API_ENDPOINT = 'https://your-backend-url.com/api/convert-ppt';
```

## 📄 License

ISC
