import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import Editor from '@monaco-editor/react';

/**
 * Level Module with:
 * - Video carousel (3 slides: intro, explanation, summary)
 * - Concept description
 * - Quiz section (3-5 questions)
 * - Coding terminal (Monaco editor)
 * - Game simulation
 * - Notes sidebar
 */

const LevelModule = () => {
  const navigate = useNavigate();
  const { courseId, levelId } = useParams();
  const [activeSection, setActiveSection] = useState('learn');
  const [code, setCode] = useState('// Write your code here\n');
  const [language, setLanguage] = useState('javascript');
  const [notesOpen, setNotesOpen] = useState(false);

  const videoSlides = [
    { title: 'Introduction', desc: 'Overview of the concept' },
    { title: 'Deep Dive', desc: 'Detailed explanation' },
    { title: 'Summary', desc: 'Key takeaways' }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const quizQuestions = [
    {
      question: 'What is the time complexity of binary search?',
      options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
      correct: 1
    },
    {
      question: 'Which data structure uses LIFO principle?',
      options: ['Queue', 'Array', 'Stack', 'Tree'],
      correct: 2
    }
  ];

  const [selectedAnswer, setSelectedAnswer] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1020] via-[#101325] to-[#14182b] text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <button onClick={() => navigate(`/courses/${courseId}`)} className="flex items-center gap-2 text-gray-400 hover:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Roadmap
          </button>
          <h1 className="text-2xl font-bold">Level {levelId}: Binary Search</h1>
          <button
            onClick={() => setNotesOpen(!notesOpen)}
            className="px-4 py-2 bg-gray-800/50 rounded-lg hover:bg-gray-700/50"
          >
            📝 Notes
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-6">
        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Section Tabs */}
          <div className="flex gap-3">
            {['learn', 'quiz', 'code', 'game'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-6 py-3 rounded-xl font-semibold capitalize transition-all ${
                  activeSection === section
                    ? 'bg-gradient-to-r from-primary to-secondary text-white'
                    : 'bg-gray-800/40 text-gray-400 hover:text-white'
                }`}
              >
                {section === 'learn' && '🎥'}
                {section === 'quiz' && '❓'}
                {section === 'code' && '💻'}
                {section === 'game' && '🎮'}
                {' '}{section}
              </button>
            ))}
          </div>

          {/* Learn Section */}
          {activeSection === 'learn' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8"
            >
              {/* Video Carousel */}
              <div className="mb-8">
                <div className="aspect-video bg-gray-900 rounded-2xl mb-4 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-8xl mb-4">▶️</div>
                    <h3 className="text-2xl font-bold mb-2">{videoSlides[currentSlide].title}</h3>
                    <p className="text-gray-400">{videoSlides[currentSlide].desc}</p>
                  </div>
                </div>
                
                {/* Carousel Controls */}
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                    disabled={currentSlide === 0}
                    className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ← Previous
                  </button>
                  <div className="flex gap-2">
                    {videoSlides.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-3 h-3 rounded-full ${idx === currentSlide ? 'bg-primary' : 'bg-gray-600'}`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => setCurrentSlide(Math.min(videoSlides.length - 1, currentSlide + 1))}
                    disabled={currentSlide === videoSlides.length - 1}
                    className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next →
                  </button>
                </div>
              </div>

              {/* Concept Description */}
              <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold mb-4">Concept Overview</h2>
                <p className="text-gray-300 leading-relaxed">
                  Binary search is an efficient algorithm for finding an item from a sorted list of items. 
                  It works by repeatedly dividing in half the portion of the list that could contain the item, 
                  until you've narrowed down the possible locations to just one.
                </p>
                <h3 className="text-xl font-bold mt-6 mb-3">Key Points</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>✓ Requires a sorted array</li>
                  <li>✓ Time complexity: O(log n)</li>
                  <li>✓ Space complexity: O(1) iterative, O(log n) recursive</li>
                  <li>✓ Divide and conquer approach</li>
                </ul>
              </div>
            </motion.div>
          )}

          {/* Quiz Section */}
          {activeSection === 'quiz' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8"
            >
              <h2 className="text-3xl font-bold mb-6">Quick Quiz 📝</h2>
              <div className="space-y-8">
                {quizQuestions.map((q, idx) => (
                  <div key={idx} className="bg-gray-900/50 rounded-2xl p-6">
                    <h3 className="text-xl font-semibold mb-4">{idx + 1}. {q.question}</h3>
                    <div className="space-y-3">
                      {q.options.map((option, optIdx) => (
                        <button
                          key={optIdx}
                          onClick={() => setSelectedAnswer(optIdx)}
                          className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                            selectedAnswer === optIdx
                              ? 'border-primary bg-primary/20'
                              : 'border-gray-700 hover:border-gray-600'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-6 px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg">
                Submit Quiz
              </button>
            </motion.div>
          )}

          {/* Code Section */}
          {activeSection === 'code' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">Coding Terminal 💻</h2>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="cpp">C++</option>
                  <option value="java">Java</option>
                </select>
              </div>
              
              <div className="border border-gray-700 rounded-xl overflow-hidden mb-4">
                <Editor
                  height="400px"
                  language={language}
                  value={code}
                  onChange={(value) => setCode(value || '')}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    scrollBeyondLastLine: false,
                  }}
                />
              </div>

              <div className="flex gap-4">
                <button className="px-6 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-all">
                  ▶️ Run Code
                </button>
                <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-all">
                  ✅ Submit
                </button>
              </div>

              {/* Output Console */}
              <div className="mt-6 bg-gray-900 rounded-xl p-4 font-mono text-sm">
                <div className="text-gray-500 mb-2">Output:</div>
                <div className="text-green-400">
                  {'>'} Ready to execute...
                </div>
              </div>
            </motion.div>
          )}

          {/* Game Section */}
          {activeSection === 'game' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8"
            >
              <h2 className="text-3xl font-bold mb-6">Game Simulation 🎮</h2>
              <div className="aspect-video bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-4">🎯</div>
                  <h3 className="text-2xl font-bold mb-2">Binary Search Challenge</h3>
                  <p className="text-gray-400 mb-6">Find the target number in minimum steps</p>
                  <button className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg">
                    Start Game
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <button className="px-6 py-3 bg-gray-800/50 text-white rounded-xl hover:bg-gray-700/50">
              ← Previous Level
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg">
              Next Level →
            </button>
          </div>
        </div>

        {/* Notes Sidebar */}
        {notesOpen && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="w-80 bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-6 h-fit sticky top-8"
          >
            <h3 className="text-xl font-bold mb-4">Notes 📝</h3>
            <div className="flex gap-2 mb-4">
              <button className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg text-sm">Doubts</button>
              <button className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-lg text-sm">Revise</button>
              <button className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-sm">Unclear</button>
            </div>
            <textarea
              className="w-full h-64 px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              placeholder="Take notes here..."
            />
            <button className="mt-4 w-full py-2 bg-primary text-white rounded-lg hover:bg-primary/80">
              Save Notes
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LevelModule;
