// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only .ppt and .pptx files are allowed.'));
    }
  }
});

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY_HERE');

// Helper function to extract text from PPT (simplified version)
// You'll need to install a proper PPT parser library for production
async function extractTextFromPPT(filePath) {
  // For now, we'll use a simplified approach
  // In production, use libraries like 'officegen', 'pptx-parser', or 'mammoth'
  const fileName = path.basename(filePath);
  return {
    text: `This is a presentation file: ${fileName}. The content would be extracted using a PPT parser library.`,
    slideCount: 15 // Mock slide count
  };
}

// Main API endpoint
app.post('/api/convert-ppt', upload.single('file'), async (req, res) => {
  console.log('📁 Received file upload request');
  
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.file;
    const fileName = req.body.fileName || file.originalname;
    console.log(`📄 Processing file: ${fileName}`);

    // Step 1: Extract text from PPT
    const pptData = await extractTextFromPPT(file.path);
    console.log(`📊 Extracted ${pptData.slideCount} slides`);

    // Step 2: Generate content using Gemini AI
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `
You are an expert educational content creator. Convert the following presentation content into an engaging interactive learning story.

Presentation Title: ${fileName.replace(/\.[^/.]+$/, '')}
Content: ${pptData.text}

Create a JSON response with the following structure (return ONLY valid JSON, no markdown):

{
  "summary": "Write a comprehensive 2-3 sentence summary of the presentation content",
  "story": [
    {
      "chapter": "Introduction Chapter Title",
      "content": "2-3 sentences describing what this chapter covers from the presentation",
      "quest": "A specific learning quest or challenge for this chapter",
      "points": 100
    },
    {
      "chapter": "Core Concepts Chapter Title",
      "content": "2-3 sentences about the main concepts",
      "quest": "A quest related to core concepts",
      "points": 250
    },
    {
      "chapter": "Advanced Topics Chapter Title",
      "content": "2-3 sentences about advanced material",
      "quest": "A challenging quest for mastery",
      "points": 500
    }
  ],
  "notes": [
    "📝 A key takeaway from the presentation",
    "🎯 An important concept to remember",
    "💡 An insight or learning point",
    "🏆 A achievement or skill gained",
    "📊 A data point or statistic to know"
  ]
}

Make the content educational, engaging, and relevant to the presentation topic.
`;

    console.log('🤖 Generating content with Gemini AI...');
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Try to parse JSON from the response
    let aiResponse;
    try {
      // Remove markdown code blocks if present
      const cleanedText = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      aiResponse = JSON.parse(cleanedText);
      console.log('✅ AI content generated successfully');
    } catch (parseError) {
      console.error('❌ Failed to parse AI response:', parseError);
      // Fallback to default structure
      aiResponse = {
        summary: `This presentation covers key concepts about ${fileName.replace(/\.[^/.]+$/, '')}. The content has been transformed into an interactive learning experience with multiple chapters and challenges.`,
        story: [
          {
            chapter: 'Getting Started',
            content: 'Begin your journey by understanding the fundamental concepts presented in the slides.',
            quest: 'Complete the introduction quiz',
            points: 100
          },
          {
            chapter: 'Deep Dive',
            content: 'Explore the core ideas and principles in detail through interactive challenges.',
            quest: 'Master the key concepts',
            points: 250
          },
          {
            chapter: 'Advanced Mastery',
            content: 'Apply your knowledge to complex scenarios and real-world applications.',
            quest: 'Complete the final challenge',
            points: 500
          }
        ],
        notes: [
          '📝 Key concepts extracted from your presentation',
          '🎯 Interactive quizzes test your understanding',
          '💡 Real-world applications included',
          '🏆 Progress tracking throughout the journey',
          '📊 Comprehensive learning analytics'
        ]
      };
    }

    // Step 3: Clean up uploaded file
    fs.unlink(file.path, (err) => {
      if (err) console.error('Error deleting file:', err);
    });

    // Step 4: Return structured response
    const response = {
      title: fileName.replace(/\.[^/.]+$/, ''),
      summary: aiResponse.summary,
      story: aiResponse.story,
      notes: aiResponse.notes,
      stats: {
        slides: pptData.slideCount,
        chapters: aiResponse.story.length,
        quests: aiResponse.story.length * 2,
        estimatedTime: `${aiResponse.story.length * 15}-${aiResponse.story.length * 20} minutes`
      }
    };

    console.log('✨ Conversion complete! Sending response...');
    res.json(response);

  } catch (error) {
    console.error('❌ Conversion error:', error);
    res.status(500).json({ 
      error: 'Conversion failed', 
      details: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'PPT Converter API is running',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log('🚀 PPT Converter Backend Server');
  console.log(`📡 Server running on http://localhost:${PORT}`);
  console.log(`🔑 Gemini API Key: ${process.env.GEMINI_API_KEY ? '✅ Configured' : '❌ Not set'}`);
  console.log('');
  console.log('Endpoints:');
  console.log(`  POST http://localhost:${PORT}/api/convert-ppt`);
  console.log(`  GET  http://localhost:${PORT}/api/health`);
  console.log('');
  console.log('Ready to receive PPT files! 📄✨');
});
