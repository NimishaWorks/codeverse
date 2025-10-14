import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CameraOverlay from './CameraOverlay';
import TimerOverlay from './TimerOverlay';
import FloatingSettingsButton from './FloatingSettingsButton';
import SettingsPanel from './SettingsPanel';

export default function AIInterviewer() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sessionDuration, setSessionDuration] = useState(30);
  const [isInterviewActive, setIsInterviewActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [questionHistory, setQuestionHistory] = useState([]);
  
  // New state for settings
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    camera: false,
    timer: false,
    tutorials: true
  });

  // Toggle setting function
  const toggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const categories = [
    {
      id: 'technical',
      name: 'Technical Interview',
      icon: '💻',
      color: 'from-blue-500 to-cyan-500',
      questions: [
        'Explain the difference between HTTP and HTTPS',
        'What is the time complexity of binary search?',
        'How does garbage collection work in Java?',
        'Explain REST API principles',
        'What are the SOLID principles in OOP?'
      ]
    },
    {
      id: 'behavioral',
      name: 'Behavioral Interview',
      icon: '🗣️',
      color: 'from-purple-500 to-pink-500',
      questions: [
        'Tell me about a challenging project you worked on',
        'How do you handle conflicts in a team?',
        'Describe a time when you failed and what you learned',
        'Where do you see yourself in 5 years?',
        'Why should we hire you?'
      ]
    },
    {
      id: 'system-design',
      name: 'System Design',
      icon: '🏗️',
      color: 'from-orange-500 to-red-500',
      questions: [
        'Design a URL shortening service like bit.ly',
        'How would you design Instagram?',
        'Design a rate limiter',
        'Design a distributed cache system',
        'How would you design a notification service?'
      ]
    },
    {
      id: 'hr',
      name: 'HR Round',
      icon: '👔',
      color: 'from-green-500 to-emerald-500',
      questions: [
        'Tell me about yourself',
        'What are your salary expectations?',
        'Why do you want to join our company?',
        'What are your strengths and weaknesses?',
        'Do you have any questions for us?'
      ]
    }
  ];

  const startInterview = (category) => {
    setSelectedCategory(category);
    setIsInterviewActive(true);
    const randomQuestion = category.questions[Math.floor(Math.random() * category.questions.length)];
    setCurrentQuestion(randomQuestion);
    setQuestionHistory([]);
  };

  const submitAnswer = () => {
    if (!userAnswer.trim()) return;

    // Add to history
    setQuestionHistory([...questionHistory, {
      question: currentQuestion,
      answer: userAnswer,
      feedback: 'Good response! Consider adding more specific examples.',
      score: Math.floor(Math.random() * 3) + 3 // Random score 3-5
    }]);

    // Get next question
    const category = categories.find(c => c.id === selectedCategory.id);
    const nextQuestion = category.questions[Math.floor(Math.random() * category.questions.length)];
    setCurrentQuestion(nextQuestion);
    setUserAnswer('');
  };

  const endInterview = () => {
    setIsInterviewActive(false);
    setCurrentQuestion(null);
    setUserAnswer('');
    setSettings(prev => ({ ...prev, camera: false, timer: false })); // Turn off camera and timer
  };

  if (isInterviewActive && selectedCategory) {
    return (
      <div className="max-w-4xl mx-auto">
        {/* Camera Overlay */}
        <CameraOverlay 
          isVisible={settings.camera} 
          onClose={() => toggleSetting('camera')} 
        />
        
        {/* Timer Overlay */}
        <TimerOverlay 
          isVisible={settings.timer} 
          duration={sessionDuration} 
        />
        
        {/* Settings Button */}
        <FloatingSettingsButton onClick={() => setShowSettings(true)} />
        
        {/* Settings Panel */}
        <SettingsPanel
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
          settings={settings}
          onToggle={toggleSetting}
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-purple-500/30"
        >
          {/* Interview Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                <span>{selectedCategory.icon}</span>
                {selectedCategory.name}
              </h2>
              <p className="text-gray-400 mt-2">Question {questionHistory.length + 1} • {sessionDuration} min session</p>
            </div>
            <button
              onClick={endInterview}
              className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all"
            >
              End Interview
            </button>
          </div>

          {/* Current Question */}
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-6 mb-6 border border-blue-500/30">
            <h3 className="text-xl font-semibold text-blue-400 mb-4">Question:</h3>
            <p className="text-lg text-white">{currentQuestion}</p>
          </div>

          {/* Answer Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">Your Answer:</label>
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type your answer here... Be specific and use examples."
              className="w-full h-40 bg-gray-900/50 border border-gray-700 rounded-lg p-4 text-white resize-none focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
            <p className="text-xs text-gray-500 mt-2">💡 Tip: Use the STAR method (Situation, Task, Action, Result) for behavioral questions</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <motion.button
              onClick={submitAnswer}
              disabled={!userAnswer.trim()}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Submit & Next Question →
            </motion.button>
            <button
              onClick={() => {
                const category = categories.find(c => c.id === selectedCategory.id);
                const newQuestion = category.questions[Math.floor(Math.random() * category.questions.length)];
                setCurrentQuestion(newQuestion);
              }}
              className="px-6 py-3 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 transition-all"
            >
              🔄 Skip
            </button>
          </div>

          {/* Question History */}
          {questionHistory.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-bold text-purple-400 mb-4">Previous Questions</h3>
              <div className="space-y-4">
                {questionHistory.map((item, index) => (
                  <div key={index} className="bg-black/30 rounded-lg p-4 border border-gray-700">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-semibold text-sm text-blue-300">Q{index + 1}: {item.question}</p>
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">
                        {item.score}/5 ⭐
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">Your answer: {item.answer.substring(0, 100)}...</p>
                    <p className="text-xs text-purple-300">💬 AI Feedback: {item.feedback}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Session Duration Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-purple-500/30"
      >
        <h3 className="text-xl font-bold text-white mb-4">Session Duration</h3>
        <div className="flex gap-4">
          {[15, 30, 45, 60].map((duration) => (
            <button
              key={duration}
              onClick={() => setSessionDuration(duration)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                sessionDuration === duration
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {duration} min
            </button>
          ))}
        </div>
      </motion.div>

      {/* Interview Categories */}
      <h3 className="text-2xl font-bold text-white mb-6">Choose Interview Type</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className={`bg-gradient-to-r ${category.color} p-1 rounded-xl cursor-pointer`}
            onClick={() => startInterview(category)}
          >
            <div className="bg-gray-900 rounded-lg p-6 h-full">
              <div className="text-5xl mb-4">{category.icon}</div>
              <h4 className="text-2xl font-bold text-white mb-3">{category.name}</h4>
              <p className="text-gray-300 text-sm mb-4">{category.questions.length} practice questions</p>
              <ul className="text-xs text-gray-400 space-y-1">
                {category.questions.slice(0, 3).map((q, i) => (
                  <li key={i}>• {q.substring(0, 40)}...</li>
                ))}
              </ul>
              <button className="mt-4 w-full bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg font-medium transition-all">
                Start Interview →
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl p-6 border border-purple-500/30"
      >
        <h4 className="font-bold text-lg mb-4 text-purple-300">🌟 Features</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-300">
          <div>✅ AI-powered feedback</div>
          <div>✅ Real-time scoring</div>
          <div>✅ Performance analytics</div>
          <div>✅ Question history</div>
          <div>✅ Camera support</div>
          <div>✅ Session timer</div>
          <div>✅ Custom duration</div>
          <div>✅ Interactive settings</div>
        </div>
      </motion.div>
      
      {/* Settings Button for Selection Screen */}
      <FloatingSettingsButton onClick={() => setShowSettings(true)} />
      
      {/* Settings Panel */}
      <SettingsPanel
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        settings={settings}
        onToggle={toggleSetting}
      />
    </div>
  );
}
