import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getDailyChallenges, updateDailyProgress, getDifficultyStars } from '../utils/challengeRouter';
import LogicPuzzle from './challenges/LogicPuzzle';
import OutputPredictor from './challenges/OutputPredictor';
import DebugQuest from './challenges/DebugQuest';
import ConceptMatch from './challenges/ConceptMatch';
import TreasureBoxModal from './TreasureBoxModal';

/**
 * @feature Enhanced Daily Quest System - Multiple Challenge Types
 * 7 Challenge Types: Quiz Match, Code Puzzle, CS Riddles, Logic Puzzles,
 * Output Predictor, Debug Quest, Concept Match
 * Features: Daily rotation (3 random challenges), XP/coins rewards, streak tracking,
 * animated treasure box modal, leaderboard integration
 */

const DailyQuest = () => {
  const navigate = useNavigate();
  const [selectedQuest, setSelectedQuest] = useState(null);
  const [selectedChallengeIndex, setSelectedChallengeIndex] = useState(null);
  const [dailyChallenges, setDailyChallenges] = useState([]);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [streak, setStreak] = useState(7);
  const [totalXP, setTotalXP] = useState(2450);
  const [coins, setCoins] = useState(180);
  const [todayEarnedXP, setTodayEarnedXP] = useState(0);
  const [todayEarnedCoins, setTodayEarnedCoins] = useState(0);
  const [showTreasureBox, setShowTreasureBox] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  // Load daily challenges on mount
  useEffect(() => {
    const challenges = getDailyChallenges();
    setDailyChallenges(challenges);
    
    // Load progress from localStorage
    const savedProgress = localStorage.getItem('dailyQuestProgress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setStreak(progress.streak || 7);
      setTotalXP(progress.totalXP || 2450);
      setCoins(progress.coins || 180);
      
      // Check if today's challenges are completed
      const today = new Date().toDateString();
      if (progress.lastCompletedDate === today) {
        setCompletedChallenges(progress.completedToday || []);
      }
    }
  }, []);

  // Quiz Match Game State
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizScore, setQuizScore] = useState(null);

  // Code Puzzle State
  const [puzzleAnswer, setPuzzleAnswer] = useState('');
  const [puzzleResult, setPuzzleResult] = useState(null);

  // Riddle State
  const [riddleAnswer, setRiddleAnswer] = useState('');
  const [riddleResult, setRiddleResult] = useState(null);

  // Handle challenge completion
  const handleChallengeComplete = (challengeIndex, isCorrect) => {
    if (!isCorrect || completedChallenges.includes(challengeIndex)) return;

    const challenge = dailyChallenges[challengeIndex];
    const earnedXP = challenge.reward.xp;
    const earnedCoins = challenge.reward.coins;

    // Update stats
    setTotalXP(prev => prev + earnedXP);
    setCoins(prev => prev + earnedCoins);
    setTodayEarnedXP(prev => prev + earnedXP);
    setTodayEarnedCoins(prev => prev + earnedCoins);

    // Mark as completed
    const newCompleted = [...completedChallenges, challengeIndex];
    setCompletedChallenges(newCompleted);

    // Check if all challenges completed
    if (newCompleted.length === dailyChallenges.length) {
      setTimeout(() => {
        setShowTreasureBox(true);
        saveProgress(newCompleted);
      }, 1500);
    } else {
      // Go back to challenge selection
      setTimeout(() => {
        resetQuest();
      }, 2000);
    }
  };

  const saveProgress = (completed) => {
    const progress = {
      streak,
      totalXP,
      coins,
      lastCompletedDate: new Date().toDateString(),
      completedToday: completed,
    };
    localStorage.setItem('dailyQuestProgress', JSON.stringify(progress));
  };

  const quizQuestions = [
    { question: 'Time complexity of binary search', answer: 'O(log n)', options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'] },
    { question: 'TCP stands for', answer: 'Transmission Control Protocol', options: ['Transfer Control Protocol', 'Transmission Control Protocol', 'Transport Control Process', 'Technical Control Protocol'] },
    { question: 'SQL is a', answer: 'Query Language', options: ['Programming Language', 'Query Language', 'Markup Language', 'Scripting Language'] },
    { question: 'RAM is', answer: 'Volatile Memory', options: ['Non-volatile Memory', 'Volatile Memory', 'Secondary Storage', 'Cache Memory'] },
  ];

  const codePuzzle = {
    question: 'Complete the function to reverse a string:',
    code: `def reverse_string(s):
    return s[___]`,
    correctAnswer: '::-1',
    hint: 'Use Python slicing with step -1',
  };

  const riddle = {
    question: "I'm a data structure that follows LIFO principle. Push me, pop me, but don't overflow me. What am I?",
    correctAnswer: 'stack',
    hint: 'Think about function call management',
  };

  const handleQuizSubmit = () => {
    let correct = 0;
    quizQuestions.forEach((q, idx) => {
      if (quizAnswers[idx] === q.answer) correct++;
    });
    const score = (correct / quizQuestions.length) * 100;
    setQuizScore(score);
    if (score >= 75) {
      setTotalXP(totalXP + 50);
      setCoins(coins + 10);
    }
  };

  const handlePuzzleSubmit = () => {
    if (puzzleAnswer.trim() === codePuzzle.correctAnswer) {
      setPuzzleResult('correct');
      setTotalXP(totalXP + 100);
      setCoins(coins + 20);
    } else {
      setPuzzleResult('wrong');
    }
  };

  const handleRiddleSubmit = () => {
    if (riddleAnswer.trim().toLowerCase() === riddle.correctAnswer) {
      setRiddleResult('correct');
      setTotalXP(totalXP + 75);
      setCoins(coins + 15);
    } else {
      setRiddleResult('wrong');
    }
  };

  const resetQuest = () => {
    setSelectedQuest(null);
    setSelectedChallengeIndex(null);
    setQuizAnswers({});
    setQuizScore(null);
    setPuzzleAnswer('');
    setPuzzleResult(null);
    setRiddleAnswer('');
    setRiddleResult(null);
  };

  const handleQuestSelect = (challenge, index) => {
    if (completedChallenges.includes(index)) return;
    setSelectedQuest(challenge);
    setSelectedChallengeIndex(index);
  };

  const handleTreasureBoxClose = () => {
    setShowTreasureBox(false);
    setShowSummary(true);
  };

  const isAllCompleted = completedChallenges.length === dailyChallenges.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#070912] via-[#101325] to-[#1a1f3a] text-white">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.03)_1px,transparent_0)] bg-[size:28px_28px] opacity-40" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-2 mb-6 text-slate-400 hover:text-white transition-colors"
          >
            <span>←</span> Back to Dashboard
          </button>
          <div className="text-center">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block text-8xl mb-4"
            >
              🎁
            </motion.div>
            <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Daily Quest Treasure Box
            </h1>
            <p className="text-lg text-slate-300">Complete daily challenges to earn XP, coins, and maintain your streak!</p>
          </div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
        >
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 text-center">
            <div className="text-4xl mb-2">🔥</div>
            <div className="text-3xl font-bold text-orange-400">{streak} Days</div>
            <div className="text-sm text-slate-400">Current Streak</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 text-center">
            <div className="text-4xl mb-2">⭐</div>
            <div className="text-3xl font-bold text-yellow-400">{totalXP} XP</div>
            <div className="text-sm text-slate-400">Total Experience</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 text-center">
            <div className="text-4xl mb-2">🪙</div>
            <div className="text-3xl font-bold text-amber-400">{coins} Coins</div>
            <div className="text-sm text-slate-400">Currency Balance</div>
          </div>
        </motion.div>

        {!selectedQuest ? (
          /* Quest Selection */
          <>
            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">Daily Progress</h3>
                <span className="text-sm text-slate-400">
                  {completedChallenges.length} / {dailyChallenges.length} Completed
                </span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(completedChallenges.length / Math.max(dailyChallenges.length, 1)) * 100}%`,
                  }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500"
                />
              </div>
            </motion.div>

            {/* Challenge Cards */}
            {isAllCompleted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <div className="text-8xl mb-6">🎉</div>
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  All Challenges Complete!
                </h2>
                <p className="text-xl text-slate-300 mb-6">
                  You've earned +{todayEarnedXP} XP and +{todayEarnedCoins} coins today!
                </p>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl font-bold hover:shadow-2xl transition-all"
                >
                  Return to Dashboard
                </button>
              </motion.div>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                {dailyChallenges.map((quest, index) => {
                  const isCompleted = completedChallenges.includes(index);
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      whileHover={!isCompleted ? { scale: 1.05, y: -10 } : {}}
                      onClick={() => handleQuestSelect(quest, index)}
                      className={`bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 relative overflow-hidden ${
                        isCompleted
                          ? 'opacity-60 cursor-default'
                          : 'cursor-pointer group'
                      }`}
                    >
                      {/* Completed Badge */}
                      {isCompleted && (
                        <div className="absolute top-4 right-4 bg-green-500 rounded-full p-2">
                          <span className="text-2xl">✓</span>
                        </div>
                      )}

                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${quest.color} opacity-0 group-hover:opacity-20 transition-opacity`}
                      />
                      <div className="relative z-10">
                        <div className="text-6xl mb-4">{quest.icon}</div>
                        <h3 className="text-2xl font-bold mb-2">{quest.name}</h3>
                        <p className="text-slate-400 text-sm mb-4">{quest.description}</p>
                        <div className="flex items-center justify-between">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${quest.color}`}
                          >
                            {getDifficultyStars(quest.challenge?.difficulty || 'medium')}
                          </span>
                          <div className="text-sm text-slate-300">
                            +{quest.reward.xp} XP • +{quest.reward.coins} 🪙
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </>
        ) : (
          /* Quest Content */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="text-5xl">{selectedQuest.icon}</div>
                <div>
                  <h2 className="text-3xl font-bold">{selectedQuest.name}</h2>
                  <p className="text-slate-400">{selectedQuest.description}</p>
                </div>
              </div>
              <button
                onClick={resetQuest}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                ← Back
              </button>
            </div>

            {/* Render appropriate challenge component */}
            {selectedQuest.id === 'logic-puzzle' && (
              <LogicPuzzle
                challenge={selectedQuest.challenge}
                onComplete={(success) => handleChallengeComplete(selectedChallengeIndex, success)}
                onSkip={resetQuest}
              />
            )}

            {selectedQuest.id === 'output-predictor' && (
              <OutputPredictor
                challenge={selectedQuest.challenge}
                onComplete={(success) => handleChallengeComplete(selectedChallengeIndex, success)}
                onSkip={resetQuest}
              />
            )}

            {selectedQuest.id === 'debug-quest' && (
              <DebugQuest
                challenge={selectedQuest.challenge}
                onComplete={(success) => handleChallengeComplete(selectedChallengeIndex, success)}
                onSkip={resetQuest}
              />
            )}

            {selectedQuest.id === 'concept-match' && (
              <ConceptMatch
                challenge={selectedQuest.challenge}
                onComplete={(success) => handleChallengeComplete(selectedChallengeIndex, success)}
                onSkip={resetQuest}
              />
            )}

            {/* Quiz Match Content */}
            {selectedQuest.id === 'quiz-match' && (
              <div className="space-y-6">
                {quizQuestions.map((q, idx) => (
                  <div key={idx} className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <h3 className="text-xl font-semibold mb-4">{q.question}</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {q.options.map((option) => (
                        <button
                          key={option}
                          onClick={() => setQuizAnswers({ ...quizAnswers, [idx]: option })}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            quizAnswers[idx] === option
                              ? 'border-primary bg-primary/20'
                              : 'border-white/20 hover:border-white/40 bg-white/5'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                {quizScore === null ? (
                  <button
                    onClick={handleQuizSubmit}
                    className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-2xl hover:shadow-2xl transition-shadow"
                  >
                    Submit Answers
                  </button>
                ) : (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`p-6 rounded-2xl text-center ${
                      quizScore >= 75 ? 'bg-green-500/20 border-2 border-green-500' : 'bg-red-500/20 border-2 border-red-500'
                    }`}
                  >
                    <div className="text-5xl mb-3">{quizScore >= 75 ? '🎉' : '😔'}</div>
                    <h3 className="text-2xl font-bold mb-2">
                      {quizScore >= 75 ? 'Quest Complete!' : 'Try Again Tomorrow!'}
                    </h3>
                    <p className="text-lg">Score: {quizScore}%</p>
                    {quizScore >= 75 && <p className="text-sm text-green-400 mt-2">+50 XP • +10 Coins</p>}
                  </motion.div>
                )}
              </div>
            )}

            {/* Code Puzzle Content */}
            {selectedQuest.id === 'code-puzzle' && (
              <div className="space-y-6">
                <div className="bg-gray-900 rounded-2xl p-6 border border-gray-700">
                  <h3 className="text-xl font-semibold mb-4">{codePuzzle.question}</h3>
                  <pre className="bg-black/50 p-4 rounded-lg text-green-400 font-mono text-sm overflow-x-auto">
                    {codePuzzle.code}
                  </pre>
                  <p className="text-sm text-slate-400 mt-3">💡 Hint: {codePuzzle.hint}</p>
                </div>
                <input
                  type="text"
                  value={puzzleAnswer}
                  onChange={(e) => setPuzzleAnswer(e.target.value)}
                  placeholder="Enter your answer..."
                  className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-primary"
                />
                {puzzleResult === null ? (
                  <button
                    onClick={handlePuzzleSubmit}
                    className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-2xl hover:shadow-2xl transition-shadow"
                  >
                    Submit Solution
                  </button>
                ) : (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`p-6 rounded-2xl text-center ${
                      puzzleResult === 'correct' ? 'bg-green-500/20 border-2 border-green-500' : 'bg-red-500/20 border-2 border-red-500'
                    }`}
                  >
                    <div className="text-5xl mb-3">{puzzleResult === 'correct' ? '🎉' : '❌'}</div>
                    <h3 className="text-2xl font-bold mb-2">
                      {puzzleResult === 'correct' ? 'Puzzle Solved!' : 'Incorrect Answer'}
                    </h3>
                    {puzzleResult === 'correct' ? (
                      <p className="text-sm text-green-400 mt-2">+100 XP • +20 Coins</p>
                    ) : (
                      <p className="text-sm text-slate-400">Correct answer: {codePuzzle.correctAnswer}</p>
                    )}
                  </motion.div>
                )}
              </div>
            )}

            {/* CS Riddle Content */}
            {selectedQuest.id === 'cs-riddle' && (
              <div className="space-y-6">
                <div className="bg-white/5 rounded-2xl p-8 border border-white/10 text-center">
                  <div className="text-6xl mb-6">🤔</div>
                  <p className="text-2xl font-medium leading-relaxed mb-4">{riddle.question}</p>
                  <p className="text-sm text-slate-400">💡 Hint: {riddle.hint}</p>
                </div>
                <input
                  type="text"
                  value={riddleAnswer}
                  onChange={(e) => setRiddleAnswer(e.target.value)}
                  placeholder="Type your answer..."
                  className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-primary"
                />
                {riddleResult === null ? (
                  <button
                    onClick={handleRiddleSubmit}
                    className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-2xl hover:shadow-2xl transition-shadow"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`p-6 rounded-2xl text-center ${
                      riddleResult === 'correct' ? 'bg-green-500/20 border-2 border-green-500' : 'bg-red-500/20 border-2 border-red-500'
                    }`}
                  >
                    <div className="text-5xl mb-3">{riddleResult === 'correct' ? '🎉' : '❌'}</div>
                    <h3 className="text-2xl font-bold mb-2">
                      {riddleResult === 'correct' ? 'Riddle Solved!' : 'Not Quite Right'}
                    </h3>
                    {riddleResult === 'correct' ? (
                      <p className="text-sm text-green-400 mt-2">+75 XP • +15 Coins</p>
                    ) : (
                      <p className="text-sm text-slate-400">The answer is: {riddle.correctAnswer}</p>
                    )}
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        )}

        {/* Treasure Box Reward Modal */}
        <TreasureBoxModal
          isOpen={showTreasureBox}
          onClose={handleTreasureBoxClose}
          rewards={{ xp: todayEarnedXP, coins: todayEarnedCoins }}
          streak={streak}
        />

        {/* End of Day Summary Modal */}
        <AnimatePresence>
          {showSummary && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm"
              onClick={() => setShowSummary(false)}
            >
              <motion.div
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-gradient-to-br from-gray-900 to-gray-800 border border-white/20 rounded-3xl p-8 max-w-md mx-4"
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">📊</div>
                  <h3 className="text-3xl font-bold mb-4">Today's Summary</h3>
                  
                  <div className="space-y-4 mb-8">
                    <div className="bg-white/5 rounded-2xl p-4">
                      <p className="text-slate-400 text-sm">Challenges Completed</p>
                      <p className="text-3xl font-bold text-green-400">{completedChallenges.length}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 rounded-2xl p-4">
                        <p className="text-slate-400 text-sm">XP Earned</p>
                        <p className="text-2xl font-bold text-yellow-400">+{todayEarnedXP}</p>
                      </div>
                      <div className="bg-white/5 rounded-2xl p-4">
                        <p className="text-slate-400 text-sm">Coins Earned</p>
                        <p className="text-2xl font-bold text-amber-400">+{todayEarnedCoins}</p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-2xl p-4">
                      <p className="text-sm text-slate-300">🔥 Current Streak</p>
                      <p className="text-2xl font-bold">{streak} Days</p>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate('/dashboard')}
                    className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl font-bold hover:shadow-2xl transition-all"
                  >
                    Back to Dashboard
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DailyQuest;
