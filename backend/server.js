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

// Validate environment variables
if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
  console.error('⚠️  WARNING: GEMINI_API_KEY is not set in .env file!');
  console.error('📝 Please create a .env file in the backend directory with:');
  console.error('   GEMINI_API_KEY=your_actual_api_key');
  console.error('');
  console.error('🔑 Get your API key from: https://aistudio.google.com/app/apikey');
  console.error('');
}

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
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
let genAI;
try {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
} catch (error) {
  console.error('❌ Failed to initialize Gemini AI:', error.message);
}

// Populate available models at startup to avoid probing models on every request
let availableModelNames = [];
async function populateAvailableModels() {
  if (!process.env.GEMINI_API_KEY) return;
  const endpoints = [
    `https://generativelanguage.googleapis.com/v1/models?key=${process.env.GEMINI_API_KEY}`,
    `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`,
  ];
  for (const url of endpoints) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data && data.models && Array.isArray(data.models)) {
        availableModelNames = data.models.map((m) => m.name || m.displayName || '').filter(Boolean);
        console.log('🧭 Available models discovered at startup:', availableModelNames.slice(0, 10));
        return;
      }
    } catch (err) {
      // ignore and try next
    }
  }
  console.log('🧭 No available models discovered at startup. AI calls will be skipped until models are available.');
}

// Start population but don't block server startup
populateAvailableModels().catch((e) => console.warn('Failed to populate models at startup:', e && e.message));

// Helper function to extract text from PPT (simplified version)
async function extractTextFromPPT(filePath) {
  const fileName = path.basename(filePath);
  return {
    text: `This is a presentation file: ${fileName}. The content would be extracted using a PPT parser library.`,
    slideCount: 15 // Mock slide count
  };
}

// Very small keyword extractor: count word frequency and return top N words
function extractKeywordsFromText(text, topN = 6) {
  if (!text || typeof text !== 'string') return [];
  const cleaned = text
    .replace(/[\W_]+/g, ' ')
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w && w.length > 3 && !['this','that','their','there','which','about'].includes(w));
  const freq = {};
  for (const w of cleaned) freq[w] = (freq[w] || 0) + 1;
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map((e) => e[0]);
}

// Test endpoint to list available models
app.get('/api/list-models', async (req, res) => {
  try {
    // Try both v1 and v1beta endpoints to maximize compatibility across
    // different API access levels. Return whichever responds first with
    // useful model information.
    const endpoints = [
      `https://generativelanguage.googleapis.com/v1/models?key=${process.env.GEMINI_API_KEY}`,
      `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`,
    ];

    let lastError = null;
    for (const url of endpoints) {
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data && data.models) {
          const modelNames = data.models.map((m) => ({
            name: m.name,
            displayName: m.displayName || m.name,
            supportedMethods: m.supportedGenerationMethods || []
          }));
          return res.json({ available: true, models: modelNames, count: modelNames.length, source: url });
        }
        // If data is returned but no models array, return raw data for debugging
        return res.json({ available: false, raw: data, source: url });
      } catch (err) {
        lastError = err;
        // try next endpoint
      }
    }
    // If neither endpoint succeeded
    res.status(500).json({ error: 'Failed to fetch models', details: lastError && lastError.message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Main API endpoint
app.post('/api/convert-ppt', upload.single('file'), async (req, res) => {
  console.log('📁 Received file upload request');

  // hoist these so catch{} can reference them safely
  let file;
  let fileName;
  let pptData;

  try {
    // Check if Gemini API is configured
    if (!genAI) {
      return res.status(500).json({
        error: 'Gemini API not configured',
        details: 'Please set GEMINI_API_KEY in your .env file'
      });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    file = req.file;
    fileName = req.body.fileName || file.originalname;
    console.log(`📄 Processing file: ${fileName}`);

    // Step 1: Extract text from PPT
    pptData = await extractTextFromPPT(file.path);
    console.log(`📊 Extracted ${pptData.slideCount} slides`);

    // Step 2: Generate content using Gemini AI. Only attempt to call the
    // model if we discovered available models at startup or via /api/list-models.
    let model;
    let modelUsed = null;
    if (availableModelNames && availableModelNames.length > 0) {
      // Prefer canonical names returned by model listing, otherwise use reasonable defaults
      const candidate = availableModelNames[0] || 'models/text-bison-001';
      try {
        model = genAI.getGenerativeModel({ model: candidate });
        modelUsed = candidate;
        console.log(`🔧 Using discovered model: ${candidate}`);
      } catch (err) {
        console.warn('Discovered model could not be used:', err && err.message);
      }
    } else {
      console.warn('No models discovered - skipping AI call and using fallback.');
    }
    
    const prompt = `
You are an expert educational content creator. Convert the following presentation content into an elaborate, gamified interactive learning story with a flow chart structure.

Presentation Title: ${fileName.replace(/\.[^/.]+$/, '')}
Content: ${pptData.text}

Create a JSON response with the following structure (return ONLY valid JSON, no markdown):
{
  "summary": "A comprehensive, engaging summary of the presentation content",
  "story": [
    {
      "chapter": "Introduction Chapter Title",
      "content": "Elaborate description of what this chapter covers, with gamified elements and story flow.",
      "quest": "A specific learning quest or challenge for this chapter",
      "points": 100
    },
    {
      "chapter": "Core Concepts Chapter Title",
      "content": "Elaborate description of the main concepts, with interactive/gamified flow.",
      "quest": "A quest related to core concepts",
      "points": 250
    },
    {
      "chapter": "Advanced Topics Chapter Title",
      "content": "Elaborate description of advanced material, with mastery challenges and story progression.",
      "quest": "A challenging quest for mastery",
      "points": 500
    }
  ],
  "notes": [
    "📝 A key takeaway from the presentation",
    "🎯 An important concept to remember",
    "💡 An insight or learning point",
    "🏆 An achievement or skill gained",
    "📊 A data point or statistic to know"
  ],
  "flowChart": [
    {
      "step": "Start",
      "description": "Begin the journey with an introduction and onboarding quest.",
      "next": ["Core Concepts"],
      "gamification": "Unlock badge for onboarding"
    },
    {
      "step": "Core Concepts",
      "description": "Explore main ideas through interactive challenges and branching quests.",
      "next": ["Advanced Topics"],
      "gamification": "Earn XP for each completed quest"
    },
    {
      "step": "Advanced Topics",
      "description": "Master advanced material and complete the final challenge.",
      "next": ["End"],
      "gamification": "Unlock mastery trophy"
    },
    {
      "step": "End",
      "description": "Finish the story, review achievements and key notes.",
      "next": [],
      "gamification": "View leaderboard and share progress"
    }
  ]
}

Make the content educational, visually engaging, and relevant to the presentation topic. Ensure the flowChart array describes the story progression and gamification elements for each step.
`;

    console.log('🤖 Attempting to generate/simplify content with Gemini AI...');

    // We'll try to find a working model dynamically. If none works, we'll
    // perform a safe local simplification fallback rather than throwing.
    let aiResponse = null;
    let lastErr = null;

    // Build candidate list: discovered models first, then known fallbacks
    const fallbackCandidates = [
      'models/gemini-2.5-flash',
      'models/gemini-2.5-pro',
      'models/gemini-2.0-flash',
      'models/text-bison-001',
      'text-bison-001',
      'models/chat-bison-001',
      'chat-bison-001'
    ];

    let candidates = [];
    if (availableModelNames && availableModelNames.length > 0) {
      candidates = candidates.concat(availableModelNames);
    }
    candidates = candidates.concat(fallbackCandidates);
    // dedupe while preserving order
    const seen = new Set();
    candidates = candidates.filter((c) => {
      if (!c) return false;
      if (seen.has(c)) return false;
      seen.add(c);
      return true;
    });

    // Try each candidate until one returns valid JSON
    for (const cand of candidates) {
      try {
        let gm;
        try {
          gm = genAI.getGenerativeModel({ model: cand });
        } catch (gerr) {
          console.warn('getGenerativeModel failed for', cand, gerr && gerr.message ? gerr.message : gerr);
          lastErr = gerr;
          continue;
        }
        console.log('Trying model candidate:', cand);
        try {
          const candidateResult = await gm.generateContent(prompt);
          const candidateText = candidateResult.response.text();
          // attempt to parse
          const cleaned = candidateText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
          aiResponse = JSON.parse(cleaned);
          console.log('✅ AI content generated successfully with', cand);
          break;
        } catch (genErr) {
          console.warn('generateContent failed for', cand, genErr && genErr.message ? genErr.message : genErr);
          lastErr = genErr;
          // try next candidate
          continue;
        }
      } catch (err) {
        lastErr = err;
      }
    }

    // If no AI result, use a local simplification fallback
    if (!aiResponse) {
      console.warn('No AI model returned a valid response. Falling back to local simplification. Last error:', lastErr && lastErr.message ? lastErr.message : lastErr);

      // Simple local summarization/simplification heuristic:
      // - Split ppt text into sentences and take top N sentences as summary
      // - Create simple story chapters from chunks
      const text = (pptData && pptData.text) ? pptData.text : (file && file.originalname ? file.originalname : '');
      const sentences = (text || '')
        .replace(/\n+/g, '. ')
        .split(/(?<=[.!?])\s+/)
        .filter(Boolean);
      const summary = sentences.slice(0, 3).join(' ').trim() || `Key concepts from ${fileName.replace(/\.[^/.]+$/, '')}`;

      aiResponse = {
        summary,
        story: [
          {
            chapter: 'Introduction',
            content: sentences.slice(0, Math.min(2, sentences.length)).join(' '),
            quest: 'Intro quiz',
            points: 100
          },
          {
            chapter: 'Core Concepts',
            content: sentences.slice(2, 6).join(' ') || 'Core concepts summarized.',
            quest: 'Concept challenges',
            points: 250
          },
          {
            chapter: 'Advanced Topics',
            content: sentences.slice(6, 12).join(' ') || 'Advanced topics for mastery.',
            quest: 'Final challenge',
            points: 500
          }
        ],
        notes: sentences.slice(0, 5).map((s) => (s.length > 140 ? s.slice(0, 137) + '...' : s)),
        flowChart: [
          { step: 'Start', description: 'Intro and onboarding', next: ['Core Concepts'], gamification: 'Badge' },
          { step: 'Core Concepts', description: 'Main ideas and practice', next: ['Advanced Topics'], gamification: 'XP' },
          { step: 'Advanced Topics', description: 'Mastery', next: ['End'], gamification: 'Trophy' },
          { step: 'End', description: 'Review', next: [], gamification: 'Leaderboard' }
        ]
      };
    }

    // Step 3: Clean up uploaded file
    fs.unlink(file.path, (err) => {
      if (err) console.error('Error deleting file:', err);
    });

    // Step 4: Return structured response including extracted features
    const features = extractKeywordsFromText(pptData.text, 6);
    const response = {
      title: fileName.replace(/\.[^/.]+$/, ''),
      summary: aiResponse.summary,
      story: aiResponse.story,
      notes: aiResponse.notes,
      flowChart: aiResponse.flowChart || [],
      features,
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

    // Better error handling and graceful fallback: return a deterministic
    // mock conversion so the frontend remains functional while the AI
    // issue is being debugged. Include error info and aiUnavailable flag.
    let errorMessage = 'Conversion failed';
    let errorDetails = error && error.message ? error.message : String(error);

    if (errorDetails && errorDetails.includes('API key')) {
      errorMessage = 'Invalid Gemini API Key';
      errorDetails = 'Please check your GEMINI_API_KEY in the .env file';
    } else if (errorDetails && (errorDetails.includes('not found') || errorDetails.includes('404'))) {
      errorMessage = 'Model not available';
      errorDetails = 'Check available models at /api/list-models';
    }

    // Create a safe fallback AI response structure used elsewhere in the file
    const fallbackAiResponse = {
      summary: `This presentation covers key concepts about ${((typeof fileName !== 'undefined' && fileName) ? fileName.replace(/\.[^/.]+$/, '') : (req && req.file && req.file.originalname ? req.file.originalname.replace(/\.[^/.]+$/, '') : 'the presentation'))}. The content has been transformed into an interactive learning experience with multiple chapters and challenges.`,
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

    const safeTitle = (typeof fileName !== 'undefined' && fileName) ? fileName.replace(/\.[^/.]+$/, '') : (req && req.file && req.file.originalname ? req.file.originalname.replace(/\.[^/.]+$/, '') : 'presentation');
    const slideCount = (typeof pptData !== 'undefined' && pptData && pptData.slideCount) ? pptData.slideCount : 0;

    const pptTextForFeatures = (typeof pptData !== 'undefined' && pptData && pptData.text) ? pptData.text : (file && file.originalname ? file.originalname : '');
    const features = extractKeywordsFromText(pptTextForFeatures, 6);

    const response = {
      title: safeTitle,
      summary: fallbackAiResponse.summary,
      story: fallbackAiResponse.story,
      notes: fallbackAiResponse.notes,
      features,
      stats: {
        slides: slideCount,
        chapters: fallbackAiResponse.story.length,
        quests: fallbackAiResponse.story.length * 2,
        estimatedTime: `${fallbackAiResponse.story.length * 15}-${fallbackAiResponse.story.length * 20} minutes`
      },
      aiUnavailable: true,
      error: errorMessage,
      details: errorDetails
    };

    res.json(response);
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  const hasApiKey = !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'YOUR_GEMINI_API_KEY_HERE';
  
  res.json({ 
    status: 'ok', 
    message: 'PPT Converter API is running',
    timestamp: new Date().toISOString(),
    config: {
      port: PORT,
      geminiApiConfigured: hasApiKey
    }
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'PPT Converter Backend API',
    version: '1.0.0',
    endpoints: {
      health: 'GET /api/health',
      convert: 'POST /api/convert-ppt',
      listModels: 'GET /api/list-models'
    }
  });
});

// Start server with error handling for common issues (EADDRINUSE)
const server = app.listen(PORT, () => {
  console.log('');
  console.log('🚀 ================================');
  console.log('   PPT CONVERTER BACKEND SERVER');
  console.log('   ================================');
  console.log('');
  console.log(`📡 Server running on http://localhost:${PORT}`);
  console.log(`🔑 Gemini API Key: ${process.env.GEMINI_API_KEY ? '✅ Configured' : '❌ Not set'}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('');
  console.log('📚 Available Endpoints:');
  console.log(`   GET  http://localhost:${PORT}/`);
  console.log(`   GET  http://localhost:${PORT}/api/health`);
  console.log(`   GET  http://localhost:${PORT}/api/list-models`);
  console.log(`   POST http://localhost:${PORT}/api/convert-ppt`);
  console.log('');
  console.log('✅ Ready to receive PPT files! 📄✨');
  console.log('');
});

server.on('error', (err) => {
  if (err && err.code === 'EADDRINUSE') {
    console.error(`\n❌ Port ${PORT} is already in use.`);
    console.error('Possible causes: another server is already running, or the port is held by a zombie process.');
    console.error('\nQuick fixes:');
    console.error(`  - Stop the process using the port (Windows): run \`netstat -ano | findstr :${PORT}\` to find PID, then \`taskkill /PID <pid> /F\``);
    console.error('  - Or start the backend on a different port: set env PORT=5001 and restart the server.');
    console.error(`  - On PowerShell: use \`Get-NetTCPConnection -LocalPort ${PORT}\` to inspect connections.`);
    process.exit(1);
  } else {
    console.error('Server error:', err);
    process.exit(1);
  }
});