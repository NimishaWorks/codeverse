# ✅ Setup Checklist

## Pre-Setup
- [ ] Node.js installed (check: run `node --version` in terminal)
- [ ] NPM installed (check: run `npm --version` in terminal)

## Setup Steps
- [ ] 1. Double-click `setup-backend.bat` (installs dependencies)
- [ ] 2. Go to https://makersuite.google.com/app/apikey
- [ ] 3. Create and copy API key
- [ ] 4. Open `backend\.env` in Notepad
- [ ] 5. Paste API key after `GEMINI_API_KEY=`
- [ ] 6. Save and close `.env` file

## Start Server
- [ ] 7. Double-click `start-backend.bat`
- [ ] 8. Verify you see "🚀 Server running on http://localhost:5000"
- [ ] 9. Verify you see "🔑 Gemini API Key: ✅ Configured"

## Test Backend
- [ ] 10. Open browser
- [ ] 11. Go to http://localhost:5000/api/health
- [ ] 12. Should see `{"status":"ok",...}`

## Test Frontend Integration
- [ ] 13. Keep backend running
- [ ] 14. Open new terminal
- [ ] 15. Run `npm run dev` (start React app)
- [ ] 16. Go to PPT Converter page
- [ ] 17. Upload a PPT file
- [ ] 18. Click "Start Magic Conversion"
- [ ] 19. After conversion, click "View Story & Notes"
- [ ] 20. See real AI-generated content! 🎉

## Success Indicators
✅ Backend console shows: "📁 Received file upload request"
✅ Backend console shows: "🤖 Generating content with Gemini AI..."
✅ Backend console shows: "✨ Conversion complete!"
✅ Frontend shows story chapters, summary, and notes
✅ Content is unique for each PPT (not same every time)

## If Something Fails
1. Read the error message carefully
2. Check QUICK_START.txt
3. Check SETUP_GUIDE.md
4. Verify API key is correct
5. Restart both frontend and backend

---

Created: October 14, 2025
Last Updated: October 14, 2025
