import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * 5-question personalized learning quiz
 * Questions about: Skill Gap, Learning Pace, Motivation, Learning Medium, Coding Comfort
 */

const OnboardingQuiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  const questions = [
    {
      id: 1,
      question: 'What is your biggest course skill gap?',
      options: [
        { value: 'coding', label: '💻 Coding', desc: 'Writing and understanding code' },
        { value: 'explaining', label: '🗣️ Explaining', desc: 'Articulating concepts clearly' },
        { value: 'designing', label: '🎨 Designing', desc: 'System design and architecture' },
        { value: 'all', label: '🌟 All of them', desc: 'I need help with everything' }
      ]
    },
    {
      id: 2,
      question: 'What is your preferred learning pace?',
      options: [
        { value: 'fast', label: '🚀 Fast', desc: 'Quick, intensive learning' },
        { value: 'steady', label: '🎯 Steady', desc: 'Balanced, consistent progress' },
        { value: 'slow', label: '🐢 Slow', desc: 'Thorough, deep understanding' },
        { value: 'game-first', label: '🎮 Game-first', desc: 'Learn through playing' }
      ]
    },
    {
      id: 3,
      question: 'What motivates you the most?',
      options: [
        { value: 'grades', label: '📊 Grades', desc: 'Academic excellence' },
        { value: 'interviews', label: '💼 Interviews', desc: 'Landing dream job' },
        { value: 'portfolio', label: '🎨 Portfolio', desc: 'Building projects' },
        { value: 'language', label: '🌐 Language', desc: 'Mastering programming' }
      ]
    },
    {
      id: 4,
      question: 'Which learning medium suits you best?',
      options: [
        { value: 'text', label: '📖 Text', desc: 'Reading documentation' },
        { value: 'video', label: '🎥 Video', desc: 'Watching tutorials' },
        { value: 'audio', label: '🎧 Audio', desc: 'Listening to podcasts' },
        { value: 'quiz', label: '❓ Quizzes', desc: 'Interactive challenges' }
      ]
    },
    {
      id: 5,
      question: 'How comfortable are you with coding?',
      options: [
        { value: 'beginner', label: '🌱 Beginner', desc: 'Just starting out' },
        { value: 'intermediate', label: '🌿 Intermediate', desc: 'Have some experience' },
        { value: 'pro', label: '🌳 Advanced', desc: 'Confident and skilled' },
        { value: 'theory', label: '📚 Theory-focused', desc: 'Know concepts, need practice' }
      ]
    }
  ];

  const handleAnswer = (value) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // All questions answered - store and redirect
      console.log('Quiz completed:', newAnswers);
      // TODO: Store in Firestore and call Tuto AI for recommendations
      navigate('/dashboard');
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1020] via-[#101325] to-[#14182b] flex items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl"
      >
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-secondary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Question Card */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
          className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            {questions[currentQuestion].question}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {questions[currentQuestion].options.map((option) => (
              <motion.button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className="relative group text-left p-6 bg-gray-900/50 border-2 border-gray-700 rounded-2xl hover:border-primary transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-4xl mb-3">{option.label.split(' ')[0]}</div>
                <div className="text-xl font-semibold text-white mb-1">
                  {option.label.split(' ').slice(1).join(' ')}
                </div>
                <div className="text-sm text-gray-400">{option.desc}</div>
                
                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-xl" />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Back button */}
        {currentQuestion > 0 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
            className="mt-6 px-6 py-3 text-gray-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default OnboardingQuiz;
