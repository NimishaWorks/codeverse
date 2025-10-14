# Backend API Guide for PPT Converter

## 📌 Overview
Your frontend is now ready to connect to a backend API. You need to create a backend server that:
1. Receives the PPT file
2. Extracts text/content from the file
3. Uses Gemini AI (or another AI) to generate story, summary, and notes
4. Returns the structured data to the frontend

---

## 🔌 API Endpoint Required

### **POST** `/api/convert-ppt`

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body:
  - `file`: The uploaded PPT file (.ppt or .pptx)
  - `fileName`: Name of the file (string)

**Response Format (JSON):**
```json
{
  "title": "Presentation Title",
  "summary": "A comprehensive summary of the presentation...",
  "story": [
    {
      "chapter": "Chapter Title",
      "content": "Description of this chapter's content...",
      "quest": "Quest objective for this chapter",
      "points": 100
    }
  ],
  "notes": [
    "📝 Key takeaway 1",
    "🎯 Important concept 2",
    "💡 Learning point 3"
  ],
  "stats": {
    "slides": 15,
    "chapters": 3,
    "quests": 8,
    "estimatedTime": "30-45 minutes"
  }
}
```

---

## 🛠️ Backend Implementation Options

### **Option 1: Node.js + Express**

```javascript
// server.js
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const pptxParser = require('pptx-parser'); // or another PPT parser

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/convert-ppt', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    
    // 1. Extract text from PPT
    const pptText = await extractTextFromPPT(file.path);
    
    // 2. Generate content using Gemini AI
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `
      Convert this presentation content into an interactive learning story format:
      
      ${pptText}
      
      Generate:
      1. A compelling summary
      2. 3 story chapters with content, quests, and point values
      3. 5 key learning notes
      
      Return as JSON with this structure:
      {
        "summary": "...",
        "story": [{"chapter": "...", "content": "...", "quest": "...", "points": 100}],
        "notes": ["...", "..."]
      }
    `;
    
    const result = await model.generateContent(prompt);
    const aiResponse = JSON.parse(result.response.text());
    
    // 3. Return structured data
    res.json({
      title: req.body.fileName.replace(/\.[^/.]+$/, ''),
      summary: aiResponse.summary,
      story: aiResponse.story,
      notes: aiResponse.notes,
      stats: {
        slides: pptText.slideCount || 0,
        chapters: aiResponse.story.length,
        quests: aiResponse.story.length * 2,
        estimatedTime: `${aiResponse.story.length * 15}-${aiResponse.story.length * 20} minutes`
      }
    });
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Conversion failed' });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
```

**Install dependencies:**
```bash
npm install express multer cors @google/generative-ai pptx-parser
```

---

### **Option 2: Python + Flask**

```python
# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from pptx import Presentation
import google.generativeai as genai
import json

app = Flask(__name__)
CORS(app)

genai.configure(api_key='YOUR_GEMINI_API_KEY')

@app.route('/api/convert-ppt', methods=['POST'])
def convert_ppt():
    try:
        file = request.files['file']
        file_name = request.form['fileName']
        
        # 1. Extract text from PPT
        prs = Presentation(file)
        slide_text = []
        for slide in prs.slides:
            for shape in slide.shapes:
                if hasattr(shape, "text"):
                    slide_text.append(shape.text)
        
        ppt_content = "\n".join(slide_text)
        
        # 2. Generate with Gemini
        model = genai.GenerativeModel('gemini-pro')
        prompt = f"""
        Convert this presentation into an interactive learning story:
        
        {ppt_content}
        
        Generate JSON with:
        - summary: comprehensive summary
        - story: array of 3 chapters with chapter, content, quest, points
        - notes: array of 5 key learning points with emojis
        """
        
        response = model.generate_content(prompt)
        ai_data = json.loads(response.text)
        
        # 3. Return structured response
        return jsonify({
            'title': file_name.rsplit('.', 1)[0],
            'summary': ai_data['summary'],
            'story': ai_data['story'],
            'notes': ai_data['notes'],
            'stats': {
                'slides': len(prs.slides),
                'chapters': len(ai_data['story']),
                'quests': len(ai_data['story']) * 2,
                'estimatedTime': f"{len(ai_data['story']) * 15}-{len(ai_data['story']) * 20} minutes"
            }
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
```

**Install dependencies:**
```bash
pip install flask flask-cors python-pptx google-generativeai
```

---

## 🔧 Configuration Steps

1. **Update API Endpoint in Frontend:**
   - Open `PPTConverter.jsx`
   - Find line: `const API_ENDPOINT = 'http://localhost:5000/api/convert-ppt';`
   - Change to your backend URL (localhost for development, production URL later)

2. **Get Gemini API Key:**
   - Go to: https://makersuite.google.com/app/apikey
   - Create new API key
   - Add to your backend environment variables

3. **Start Backend Server:**
   ```bash
   # Node.js
   node server.js
   
   # Python
   python app.py
   ```

4. **Test the Integration:**
   - Upload a PPT file
   - Check browser console for any errors
   - Verify backend receives the file and returns proper JSON

---

## 🎯 Response Structure Details

### **story** Array:
Each chapter should have:
- `chapter`: String - Chapter title
- `content`: String - Description (2-3 sentences)
- `quest`: String - Quest objective
- `points`: Number - Point value (100, 250, 500, etc.)

### **notes** Array:
5 strings with key learnings, use emojis like:
- 📝 (notes)
- 🎯 (objectives)
- 💡 (insights)
- 🏆 (achievements)
- 📊 (data)

### **stats** Object:
- `slides`: Number - Actual slide count
- `chapters`: Number - Number of story chapters
- `quests`: Number - Total quests
- `estimatedTime`: String - e.g., "30-45 minutes"

---

## 🐛 Troubleshooting

**CORS Error:**
- Add CORS middleware to backend
- Node: `app.use(cors())`
- Python: `CORS(app)`

**File Upload Error:**
- Check multer/file handling configuration
- Verify file size limits (default 50MB in frontend)

**AI Generation Error:**
- Verify Gemini API key is valid
- Check API quota/limits
- Handle rate limiting with retries

**Network Error:**
- Ensure backend is running on correct port
- Update API_ENDPOINT if port changed
- Check firewall/antivirus settings

---

## 📝 Next Steps

1. ✅ Choose backend framework (Node.js or Python recommended)
2. ✅ Set up backend server with file upload
3. ✅ Integrate PPT text extraction library
4. ✅ Connect to Gemini AI API
5. ✅ Test with sample PPT files
6. ✅ Deploy backend (Render, Railway, Vercel, etc.)
7. ✅ Update frontend API_ENDPOINT to production URL

---

## 🚀 Production Deployment

**Backend Options:**
- **Node.js**: Render, Railway, Heroku
- **Python**: Render, PythonAnywhere, Heroku

**Environment Variables:**
- `GEMINI_API_KEY`: Your API key
- `PORT`: Server port (usually auto-assigned)
- `ALLOWED_ORIGINS`: Frontend URL for CORS

**Frontend Update:**
After deploying backend, update in `PPTConverter.jsx`:
```javascript
const API_ENDPOINT = 'https://your-backend.onrender.com/api/convert-ppt';
```

---

## 💡 Tips

- Start with Node.js if you're comfortable with JavaScript
- Python might be easier for PPT parsing (python-pptx is robust)
- Test locally first before deploying
- Add proper error handling and validation
- Consider adding progress callbacks for long conversions
- Cache results to avoid re-processing same files

Good luck! 🎉
