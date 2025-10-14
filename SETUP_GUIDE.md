# 🚀 Complete Setup Guide - PPT Converter Backend

## 📋 What I Created For You

I've set up a complete Node.js backend with:
- ✅ Express server with file upload
- ✅ Gemini AI integration
- ✅ CORS enabled for your frontend
- ✅ Automatic file cleanup
- ✅ Error handling
- ✅ Easy setup scripts

## 📁 File Structure

```
codeverse/
├── backend/
│   ├── server.js          # Main server file
│   ├── package.json       # Dependencies
│   ├── .env.example       # Environment template
│   ├── .gitignore        # Git ignore file
│   └── README.md         # Documentation
├── setup-backend.bat     # One-click setup script
└── start-backend.bat     # Start server script
```

## 🎯 Step-by-Step Setup

### Step 1: Run Setup Script
Double-click `setup-backend.bat` or run in terminal:
```bash
setup-backend.bat
```

This will:
- Install all npm packages
- Create .env file
- Create uploads folder

### Step 2: Get Gemini API Key

1. **Go to Google AI Studio:**
   👉 https://makersuite.google.com/app/apikey

2. **Click "Create API Key"**

3. **Copy the key** (looks like: `AIzaSyD...`)

4. **Edit `backend\.env` file:**
   ```
   GEMINI_API_KEY=paste_your_key_here
   PORT=5000
   ```

### Step 3: Start Backend Server

**Option A - Use start script (easiest):**
Double-click `start-backend.bat`

**Option B - Manual start:**
```bash
cd backend
npm start
```

You should see:
```
🚀 PPT Converter Backend Server
📡 Server running on http://localhost:5000
🔑 Gemini API Key: ✅ Configured
```

### Step 4: Test the Backend

Open browser and go to:
👉 http://localhost:5000/api/health

You should see:
```json
{
  "status": "ok",
  "message": "PPT Converter API is running"
}
```

### Step 5: Test Upload from Frontend

1. Keep backend server running
2. Go to your React app (http://localhost:5173)
3. Navigate to PPT Converter page
4. Upload a PPT file
5. Watch the magic happen! ✨

## ⚙️ Configuration

### Change Server Port
Edit `backend\.env`:
```
PORT=5001  # Change to any available port
```

Then update frontend `PPTConverter.jsx`:
```javascript
const API_ENDPOINT = 'http://localhost:5001/api/convert-ppt';
```

### CORS Settings
Current: Allows all origins (good for development)
Production: Edit `server.js` line 15:
```javascript
app.use(cors({
  origin: 'https://your-frontend-domain.com'
}));
```

## 🐛 Troubleshooting

### Problem: "npm is not recognized"
**Solution:** Install Node.js from https://nodejs.org/

### Problem: "Port 5000 already in use"
**Solution:** 
1. Change PORT in `.env` to 5001
2. Update frontend API_ENDPOINT

### Problem: "GEMINI_API_KEY not set"
**Solution:** 
1. Check `.env` file exists in `backend/` folder
2. Verify API key is correct (no spaces)
3. Restart server after changing .env

### Problem: "Failed to convert PPT"
**Check:**
- ✅ Backend server is running
- ✅ Gemini API key is valid
- ✅ Internet connection is working
- ✅ API quota not exceeded

### Problem: CORS error in browser
**Solution:**
1. Verify backend is running on port 5000
2. Check browser console for exact error
3. Restart both frontend and backend

## 📊 How It Works

1. **Frontend** sends PPT file → **Backend** (port 5000)
2. **Backend** receives file via multer
3. **Backend** extracts text from PPT (simplified version)
4. **Backend** sends to Gemini AI with prompt
5. **Gemini AI** generates story, summary, notes
6. **Backend** returns JSON to frontend
7. **Frontend** displays beautiful results page

## 🎨 What Backend Generates

For each PPT upload, Gemini AI creates:
- **Summary**: 2-3 sentence overview
- **3 Story Chapters**: Each with:
  - Chapter title
  - Content description
  - Quest objective
  - Points (100, 250, 500)
- **5 Key Notes**: With emojis
- **Stats**: Slides count, chapters, quests, estimated time

## 🚀 Production Deployment

### Option 1: Deploy to Render (Recommended)
1. Create account on https://render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repo
4. Select `backend` folder
5. Add environment variable: `GEMINI_API_KEY`
6. Deploy!
7. Copy your backend URL
8. Update frontend API_ENDPOINT

### Option 2: Deploy to Railway
1. Install Railway CLI: `npm i -g @railway/cli`
2. Run `railway login`
3. Run `railway init` in backend folder
4. Add GEMINI_API_KEY via Railway dashboard
5. Run `railway up`

### After Deployment
Update `src/components/PPTConverter.jsx`:
```javascript
const API_ENDPOINT = 'https://your-backend-url.onrender.com/api/convert-ppt';
```

## 💡 Tips & Best Practices

### For Development:
- ✅ Keep backend running in one terminal
- ✅ Keep frontend (npm run dev) in another terminal
- ✅ Check both consoles for errors

### For Better PPT Parsing:
Install a proper PPT parser (optional):
```bash
cd backend
npm install officegen-pptx pptx-parser
```

Then update `extractTextFromPPT` function in `server.js`

### For Better AI Responses:
- Use more detailed prompts
- Add examples to the prompt
- Increase temperature parameter for creativity
- Use `gemini-pro-vision` for image analysis

## 📞 Need Help?

Common commands:
```bash
# Install dependencies
cd backend
npm install

# Start server
npm start

# Start with auto-reload (development)
npm run dev

# Check if server is running
curl http://localhost:5000/api/health

# Stop server
Ctrl + C
```

## ✅ Checklist

Before uploading your first PPT:
- [ ] Node.js installed
- [ ] Backend dependencies installed (`npm install`)
- [ ] `.env` file created with Gemini API key
- [ ] Backend server running (http://localhost:5000)
- [ ] Frontend running (http://localhost:5173)
- [ ] Health check passes (http://localhost:5000/api/health)

## 🎉 You're All Set!

Your complete workflow:
1. Start backend: `start-backend.bat`
2. Start frontend: `npm run dev`
3. Go to PPT Converter page
4. Upload PPT → Get AI-generated story!

Enjoy your PPT to Interactive Story converter! 🚀✨
