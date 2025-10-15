require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

process.on('uncaughtException', (err) => {
  console.error('uncaughtException:', err && err.stack ? err.stack : err);
  process.exit(1);
});
process.on('unhandledRejection', (reason) => {
  console.error('unhandledRejection:', reason && reason.stack ? reason.stack : reason);
  process.exit(1);
});

console.log('== test_generative.js started ==');

async function test() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('No GEMINI_API_KEY in env');
    process.exit(1);
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const candidates = [
    'models/text-bison-001',
    'text-bison-001',
    'models/chat-bison-001',
    'chat-bison-001',
    'gemini-1.5-pro',
    'gemini-pro'
  ];

  for (const m of candidates) {
    try {
      console.log('\nTrying model:', m);
      const model = genAI.getGenerativeModel({ model: m });
      console.log(' -> model object created, calling generateContent...');
      const res = await model.generateContent('Say hello and return simple JSON: {"hello": "world"}');
      console.log(' -> generateContent returned, parsing response...');
      try {
        const text = res.response.text();
        console.log('Success for model', m, '\n', text);
        process.exit(0);
      } catch (e) {
        console.error('Response parsing error for', m, e && e.stack ? e.stack : e);
      }
    } catch (err) {
      console.error('Model failed:', m, err && err.stack ? err.stack : err);
    }
  }
  console.error('No models succeeded');
  process.exit(2);
}

test();
