import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

/**
 * @feature Onboarding Quiz - 5-question personalization flow
 * Determines learning style, pace, motivation, preferred medium, and skill level
 * Generates personalized course recommendations and routes to Dashboard
 */

const OnboardingQuiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 'skillGap',
      question: "What's your primary learning goal?",
      icon: '🎯',
      options: [
        { value: 'coding', label: 'Focus on Coding Practice', emoji: '💻' },
        { value: 'quiz', label: 'Test Knowledge with Quizzes', emoji: '📝' },
        { value: 'games', label: 'Learn Through Games', emoji: '🎮' },
        { value: 'balanced', label: 'Balanced Mix of All', emoji: '⚖️' },
      ],
    },
    {
      id: 'pace',
      question: 'How do you prefer to learn?',
      icon: '⚡',
      options: [
        { value: 'fast', label: 'Quick Theory, Rapid Practice', emoji: '🚀' },
        { value: 'blended', label: 'Mix of Theory & Practice', emoji: '🌟' },
        { value: 'deep', label: 'Deep Dive with AI Tutor', emoji: '🧠' },
        { value: 'trial', label: 'Trial & Error Exploration', emoji: '🔬' },
      ],
    },
    {
      id: 'motivation',
      question: 'What drives your learning?',
      icon: '🎓',
      options: [
        { value: 'exams', label: 'College Exams & Grades', emoji: '📚' },
        { value: 'interviews', label: 'Job Interviews & Offers', emoji: '💼' },
        { value: 'projects', label: 'Building Real Projects', emoji: '🛠️' },
        { value: 'language', label: 'Learning New Languages', emoji: '🌐' },
      ],
    },
    {
      id: 'medium',
      question: 'Which learning medium suits you best?',
      icon: '📱',
      options: [
        { value: 'text', label: 'Text & Documentation', emoji: '📄' },
        { value: 'video', label: 'Video Tutorials', emoji: '🎥' },
        { value: 'audio', label: 'Audio Lectures & Podcasts', emoji: '🎧' },
        { value: 'interactive', label: 'Interactive Quizzes & Games', emoji: '🎯' },
      ],
    },
    {
      id: 'level',
      question: "What's your programming comfort level?",
      icon: '💡',
      options: [
        { value: 'beginner', label: 'Complete Beginner', emoji: '🌱' },
        { value: 'basics', label: 'Know Basic Syntax', emoji: '🔰' },
        { value: 'proficient', label: 'Proficient Coder', emoji: '⚔️' },
        { value: 'theory', label: 'Strong in Theory Only', emoji: '📖' },
      ],
    },
  ];

  const handleAnswer = (value) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateRecommendations = () => {
    const recommendations = [];
    
    // Always recommend DSA as foundation
    recommendations.push('DSA');

    // Based on motivation
    if (answers.motivation === 'exams' || answers.motivation === 'interviews') {
      recommendations.push('Operating Systems', 'DBMS', 'Computer Networks');
    }
    if (answers.motivation === 'projects') {
      recommendations.push('Web Development', 'Python', 'Java');
    }
    if (answers.motivation === 'language') {
      recommendations.push('Python', 'Java', 'OOPs');
    }

    // Based on skill level
    if (answers.level === 'beginner' || answers.level === 'basics') {
      recommendations.push('Python', 'OOPs');
    } else if (answers.level === 'proficient') {
      recommendations.push('Design & Analysis of Algorithms', 'AI/ML', 'Cyber Security');
    }

    // Based on learning goal
    if (answers.skillGap === 'coding') {
      recommendations.push('Design & Analysis of Algorithms', 'Web Development');
    }
    if (answers.skillGap === 'games') {
      recommendations.push('Computer Organization & Architecture', 'Operating Systems');
    }

    // Deduplicate and return top 6
    return [...new Set(recommendations)].slice(0, 6);
  };

  const getPersonalityProfile = () => {
    const profiles = {
      'fast-coding': { title: 'Speed Coder', desc: 'Fast learner who loves challenges', avatar: '⚡' },
      'deep-theory': { title: 'Theory Master', desc: 'Prefers deep conceptual understanding', avatar: '🧠' },
      'game-explorer': { title: 'Game Explorer', desc: 'Learns best through interactive play', avatar: '🎮' },
      'balanced-learner': { title: 'Balanced Learner', desc: 'Versatile learning approach', avatar: '⚖️' },
    };

    const key = `${answers.pace}-${answers.skillGap}`;
    return profiles[key] || profiles['balanced-learner'];
  };

  if (showResults) {
    const recommendations = calculateRecommendations();
    const profile = getPersonalityProfile();

    return (
      <div className="min-h-screen bg-gradient-to-b from-[#070912] via-[#101325] to-[#1a1f3a] text-white flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-3xl w-full bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl"
        >
          {/* Confetti Effect */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  background: ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b'][i % 4],
                  left: `${Math.random() * 100}%`,
                  top: '-20px',
                }}
                animate={{
                  y: [0, 800],
                  rotate: [0, 360],
                  opacity: [1, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  delay: Math.random() * 0.5,
                  ease: 'easeOut',
                }}
              />
            ))}
          </div>

          <div className="text-center space-y-6 relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary text-5xl shadow-lg"
            >
              {profile.avatar}
            </motion.div>

            <div>
              <h2 className="text-4xl font-bold mb-2">Welcome, {profile.title}!</h2>
              <p className="text-slate-300 text-lg">{profile.desc}</p>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold mb-4 flex items-center justify-center gap-2">
                <span>🎯</span> Your Personalized Learning Path
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {recommendations.map((course, index) => (
                  <motion.div
                    key={course}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl p-4 border border-white/20 text-center"
                  >
                    <p className="font-semibold text-sm">{course}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/dashboard')}
                className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full shadow-lg"
              >
                Start Learning Journey
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowResults(false);
                  setCurrentQuestion(0);
                  setAnswers({});
                }}
                className="px-8 py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-full"
              >
                Retake Quiz
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#070912] via-[#101325] to-[#1a1f3a] text-white flex items-center justify-center p-6">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.03)_1px,transparent_0)] bg-[size:28px_28px] opacity-40" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full relative z-10"
      >
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Question {currentQuestion + 1} of {questions.length}</span>
            <span className="text-sm text-slate-400">{Math.round(progress)}% Complete</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-secondary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl"
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: 'spring' }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary text-4xl mb-4 shadow-lg"
              >
                {currentQ.icon}
              </motion.div>
              <h2 className="text-3xl font-bold">{currentQ.question}</h2>
            </div>

            <div className="space-y-4">
              {currentQ.options.map((option, index) => (
                <motion.button
                  key={option.value}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(option.value)}
                  className="w-full flex items-center gap-4 p-5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/50 rounded-2xl transition-all group"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-2xl group-hover:scale-110 transition-transform">
                    {option.emoji}
                  </div>
                  <span className="text-lg font-semibold text-left flex-1">{option.label}</span>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="text-primary text-2xl"
                  >
                    →
                  </motion.div>
                </motion.button>
              ))}
            </div>

            {/* Back Button */}
            {currentQuestion > 0 && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={goBack}
                className="mt-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
              >
                <span>←</span> Back
              </motion.button>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default OnboardingQuiz;
