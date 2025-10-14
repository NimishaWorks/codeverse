import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CameraOverlay from './CameraOverlay';
import TimerOverlay from './TimerOverlay';
import FloatingSettingsButton from './FloatingSettingsButton';
import SettingsPanel from './SettingsPanel';

export default function AptitudeTests() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isTestActive, setIsTestActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  // Settings state
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
      id: 'logical',
      name: 'Logical Reasoning',
      icon: '🧩',
      color: 'from-blue-500 to-cyan-500',
      duration: 10,
      questions: [
        {
          question: 'If all Bloops are Razzies and all Razzies are Lazzies, are all Bloops definitely Lazzies?',
          options: ['Yes', 'No', 'Cannot be determined', 'Sometimes'],
          correct: 0
        },
        {
          question: 'Complete the series: 2, 6, 12, 20, 30, ?',
          options: ['40', '42', '44', '46'],
          correct: 1
        },
        {
          question: 'If CODING is written as DPEJOH, how is PYTHON written?',
          options: ['QZUIPO', 'QYUIPO', 'QZUIPN', 'QZUIPM'],
          correct: 2
        },
        {
          question: 'A clock shows 3:15. What is the angle between hour and minute hands?',
          options: ['0°', '7.5°', '15°', '22.5°'],
          correct: 1
        },
        {
          question: 'In a certain code, COMPUTER is 85. What is PROGRAM?',
          options: ['75', '77', '80', '82'],
          correct: 1
        }
      ]
    },
    {
      id: 'quantitative',
      name: 'Quantitative Aptitude',
      icon: '📊',
      color: 'from-purple-500 to-pink-500',
      duration: 15,
      questions: [
        {
          question: 'What is 15% of 680?',
          options: ['98', '100', '102', '104'],
          correct: 2
        },
        {
          question: 'If a train travels 120 km in 2 hours, what is its speed in m/s?',
          options: ['16.67', '33.33', '60', '120'],
          correct: 0
        },
        {
          question: 'The average of 5 numbers is 27. If one number is excluded, average becomes 25. The excluded number is:',
          options: ['30', '32', '35', '40'],
          correct: 2
        },
        {
          question: 'A shopkeeper marks his goods 40% above cost price but allows 20% discount. His profit percentage is:',
          options: ['10%', '12%', '15%', '20%'],
          correct: 1
        },
        {
          question: 'If 2^x = 32, then x equals:',
          options: ['3', '4', '5', '6'],
          correct: 2
        }
      ]
    },
    {
      id: 'verbal',
      name: 'Verbal Ability',
      icon: '📝',
      color: 'from-green-500 to-emerald-500',
      duration: 12,
      questions: [
        {
          question: 'Choose the correct spelling:',
          options: ['Accommodation', 'Accomodation', 'Acommodation', 'Acomodation'],
          correct: 0
        },
        {
          question: 'Synonym of "ABUNDANT":',
          options: ['Scarce', 'Plentiful', 'Limited', 'Rare'],
          correct: 1
        },
        {
          question: 'Antonym of "OPTIMISTIC":',
          options: ['Hopeful', 'Positive', 'Pessimistic', 'Confident'],
          correct: 2
        },
        {
          question: 'Fill in the blank: She has been working here _____ five years.',
          options: ['since', 'for', 'from', 'until'],
          correct: 1
        },
        {
          question: 'Identify the correctly punctuated sentence:',
          options: [
            'Its a beautiful day.',
            'It\'s a beautiful day.',
            'Its\' a beautiful day.',
            'Its a beautiful day!'
          ],
          correct: 1
        }
      ]
    },
    {
      id: 'technical',
      name: 'Technical MCQs',
      icon: '💻',
      color: 'from-orange-500 to-red-500',
      duration: 20,
      questions: [
        {
          question: 'Which data structure uses LIFO principle?',
          options: ['Queue', 'Stack', 'Tree', 'Graph'],
          correct: 1
        },
        {
          question: 'Time complexity of binary search is:',
          options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(n²)'],
          correct: 1
        },
        {
          question: 'Which is NOT a programming paradigm?',
          options: ['Object-Oriented', 'Functional', 'Procedural', 'Sequential'],
          correct: 3
        },
        {
          question: 'What does SQL stand for?',
          options: [
            'Structured Query Language',
            'Simple Query Language',
            'Standard Query Language',
            'System Query Language'
          ],
          correct: 0
        },
        {
          question: 'Which protocol is used for secure web browsing?',
          options: ['HTTP', 'FTP', 'HTTPS', 'SMTP'],
          correct: 2
        }
      ]
    }
  ];

  useEffect(() => {
    let timer;
    if (isTestActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      endTest();
    }
    return () => clearInterval(timer);
  }, [isTestActive, timeLeft]);

  const startTest = (category) => {
    setSelectedCategory(category);
    setIsTestActive(true);
    setTimeLeft(category.duration * 60);
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnsweredQuestions([]);
    setSelectedAnswer(null);
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const submitAnswer = () => {
    const currentQuestion = selectedCategory.questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correct;

    setAnsweredQuestions([...answeredQuestions, {
      question: currentQuestion.question,
      selectedAnswer: selectedAnswer,
      correctAnswer: currentQuestion.correct,
      isCorrect
    }]);

    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < selectedCategory.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      endTest();
    }
  };

  const endTest = () => {
    setIsTestActive(false);
    // Turn off camera and timer when test ends
    setSettings(prev => ({
      ...prev,
      camera: false,
      timer: false
    }));
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Results Screen
  if (!isTestActive && answeredQuestions.length > 0 && selectedCategory) {
    const percentage = (score / selectedCategory.questions.length) * 100;
    return (
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-purple-500/30"
        >
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">
              {percentage >= 80 ? '🏆' : percentage >= 60 ? '🎉' : percentage >= 40 ? '👍' : '📚'}
            </div>
            <h2 className="text-4xl font-bold text-white mb-2">Test Completed!</h2>
            <p className="text-gray-400">{selectedCategory.name}</p>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-500/20 rounded-xl p-4 border border-blue-500/30 text-center">
              <div className="text-3xl font-bold text-blue-400">{score}/{selectedCategory.questions.length}</div>
              <div className="text-sm text-gray-300">Score</div>
            </div>
            <div className="bg-green-500/20 rounded-xl p-4 border border-green-500/30 text-center">
              <div className="text-3xl font-bold text-green-400">{percentage.toFixed(0)}%</div>
              <div className="text-sm text-gray-300">Accuracy</div>
            </div>
            <div className="bg-purple-500/20 rounded-xl p-4 border border-purple-500/30 text-center">
              <div className="text-3xl font-bold text-purple-400">{formatTime(selectedCategory.duration * 60 - timeLeft)}</div>
              <div className="text-sm text-gray-300">Time Taken</div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-4">Answer Review</h3>
            <div className="space-y-4">
              {answeredQuestions.map((item, index) => (
                <div key={index} className={`bg-black/30 rounded-lg p-4 border ${
                  item.isCorrect ? 'border-green-500/30' : 'border-red-500/30'
                }`}>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{item.isCorrect ? '✅' : '❌'}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-white mb-2">Q{index + 1}: {item.question}</p>
                      <div className="text-sm">
                        <p className="text-gray-400">Your answer: {selectedCategory.questions[index].options[item.selectedAnswer]}</p>
                        {!item.isCorrect && (
                          <p className="text-green-400">Correct answer: {selectedCategory.questions[index].options[item.correctAnswer]}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => startTest(selectedCategory)}
              className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-lg font-bold"
            >
              Retry Test
            </button>
            <button
              onClick={() => {
                setSelectedCategory(null);
                setAnsweredQuestions([]);
              }}
              className="flex-1 bg-gray-700 text-white py-3 rounded-lg font-bold hover:bg-gray-600 transition-all"
            >
              Back to Categories
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Active Test Screen
  if (isTestActive && selectedCategory) {
    const currentQuestion = selectedCategory.questions[currentQuestionIndex];

    return (
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-purple-500/30"
        >
          {/* Test Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">{selectedCategory.name}</h2>
              <p className="text-gray-400">Question {currentQuestionIndex + 1} of {selectedCategory.questions.length}</p>
            </div>
            <div className="text-right">
              <div className={`text-3xl font-bold ${timeLeft < 60 ? 'text-red-400 animate-pulse' : 'text-green-400'}`}>
                ⏱️ {formatTime(timeLeft)}
              </div>
              <p className="text-xs text-gray-400">Time Remaining</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-700 rounded-full h-2 mb-8">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
              style={{ width: `${((currentQuestionIndex + 1) / selectedCategory.questions.length) * 100}%` }}
            ></div>
          </div>

          {/* Question */}
          <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl p-6 mb-6 border border-purple-500/30">
            <h3 className="text-xl font-semibold text-white">{currentQuestion.question}</h3>
          </div>

          {/* Options */}
          <div className="space-y-4 mb-8">
            {currentQuestion.options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  selectedAnswer === index
                    ? 'bg-purple-500/30 border-purple-500'
                    : 'bg-gray-900/50 border-gray-700 hover:border-gray-600'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswer === index ? 'border-purple-500 bg-purple-500' : 'border-gray-600'
                  }`}>
                    {selectedAnswer === index && <div className="w-3 h-3 bg-white rounded-full"></div>}
                  </div>
                  <span className="text-white font-medium">{option}</span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Submit Button */}
          <motion.button
            onClick={submitAnswer}
            disabled={selectedAnswer === null}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-lg font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {currentQuestionIndex === selectedCategory.questions.length - 1 ? 'Finish Test' : 'Next Question →'}
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // Category Selection Screen
  return (
    <div className="max-w-6xl mx-auto">
      <h3 className="text-2xl font-bold text-white mb-6">Choose Test Category</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className={`bg-gradient-to-r ${category.color} p-1 rounded-xl cursor-pointer`}
            onClick={() => startTest(category)}
          >
            <div className="bg-gray-900 rounded-lg p-6 h-full">
              <div className="text-5xl mb-4">{category.icon}</div>
              <h4 className="text-2xl font-bold text-white mb-3">{category.name}</h4>
              <div className="flex items-center gap-4 text-sm text-gray-300 mb-4">
                <span>📝 {category.questions.length} Questions</span>
                <span>⏱️ {category.duration} Minutes</span>
              </div>
              <button className="w-full bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg font-medium transition-all">
                Start Test →
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-500/30"
      >
        <h4 className="font-bold text-lg mb-4 text-blue-300">📋 Test Guidelines</h4>
        <ul className="text-sm text-gray-300 space-y-2">
          <li>• Each test is timed - manage your time wisely</li>
          <li>• You can't go back once you submit an answer</li>
          <li>• Passing score is 60% or above</li>
          <li>• Review your answers at the end of the test</li>
          <li>• Practice regularly to improve your scores</li>
        </ul>
      </motion.div>

      {/* Camera and Timer Overlays */}
      {isTestActive && (
        <>
          <CameraOverlay 
            isVisible={settings.camera} 
            onClose={() => toggleSetting('camera')} 
          />
          <TimerOverlay 
            isVisible={settings.timer}
            duration={timeLeft}
          />
        </>
      )}

      {/* Settings Panel */}
      <FloatingSettingsButton onClick={() => setShowSettings(true)} />
      <SettingsPanel
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        settings={settings}
        onToggle={toggleSetting}
      />
    </div>
  );
}
