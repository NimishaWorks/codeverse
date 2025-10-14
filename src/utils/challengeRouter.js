/**
 * @file Challenge Router - Daily Challenge Selection System
 * Determines which 3 challenges to show each day based on date
 * Uses seeded random to ensure same challenges for all users on same date
 */

import {
  quizQuestions,
  codePuzzles,
  riddles,
  logicPuzzles,
  outputPredictors,
  debugQuests,
  conceptMatches,
  challengeTypes,
  calculateReward,
} from '../data/challengeData';

/**
 * Simple seeded random number generator
 * Ensures same random sequence for same seed (date)
 */
class SeededRandom {
  constructor(seed) {
    this.seed = seed;
  }

  next() {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }

  nextInt(min, max) {
    return Math.floor(this.next() * (max - min)) + min;
  }

  shuffle(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = this.nextInt(0, i + 1);
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
}

/**
 * Get seed from current date (YYYYMMDD format)
 */
const getTodaySeed = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return parseInt(`${year}${month}${day}`);
};

/**
 * Select random items from array using seeded random
 */
const selectRandom = (array, count, rng) => {
  const shuffled = rng.shuffle(array);
  return shuffled.slice(0, Math.min(count, array.length));
};

/**
 * Get today's daily challenges (3 different types)
 * @returns {Array} Array of 3 challenge objects
 */
export const getDailyChallenges = () => {
  const seed = getTodaySeed();
  const rng = new SeededRandom(seed);

  // Define challenge pools
  const challengePools = [
    {
      type: 'quiz-match',
      data: quizQuestions,
      meta: challengeTypes.find(t => t.id === 'quiz-match'),
    },
    {
      type: 'code-puzzle',
      data: codePuzzles,
      meta: challengeTypes.find(t => t.id === 'code-puzzle'),
    },
    {
      type: 'cs-riddle',
      data: riddles,
      meta: challengeTypes.find(t => t.id === 'cs-riddle'),
    },
    {
      type: 'logic-puzzle',
      data: logicPuzzles,
      meta: challengeTypes.find(t => t.id === 'logic-puzzle'),
    },
    {
      type: 'output-predictor',
      data: outputPredictors,
      meta: challengeTypes.find(t => t.id === 'output-predictor'),
    },
    {
      type: 'debug-quest',
      data: debugQuests,
      meta: challengeTypes.find(t => t.id === 'debug-quest'),
    },
    {
      type: 'concept-match',
      data: conceptMatches,
      meta: challengeTypes.find(t => t.id === 'concept-match'),
    },
  ];

  // Select 3 different challenge types for today
  const selectedTypes = selectRandom(challengePools, 3, rng);

  // For each type, select 1 challenge (or 4 questions for quiz)
  const dailyChallenges = selectedTypes.map((pool) => {
    const typeRng = new SeededRandom(seed + pool.type.charCodeAt(0));
    
    if (pool.type === 'quiz-match') {
      // Select 4 questions for quiz
      const questions = selectRandom(pool.data, 4, typeRng);
      return {
        ...pool.meta,
        questions,
        reward: calculateReward('medium', pool.type),
      };
    } else if (pool.type === 'concept-match') {
      // Select 1 concept match challenge
      const challenge = selectRandom(pool.data, 1, typeRng)[0];
      return {
        ...pool.meta,
        challenge,
        reward: calculateReward(challenge.difficulty, pool.type),
      };
    } else {
      // Select 1 challenge for other types
      const challenge = selectRandom(pool.data, 1, typeRng)[0];
      return {
        ...pool.meta,
        challenge,
        reward: calculateReward(challenge.difficulty, pool.type),
      };
    }
  });

  return dailyChallenges;
};

/**
 * Check if user has completed today's challenges
 * @param {Object} userProgress - User's progress data from localStorage/Firebase
 */
export const hasTodayCompleted = (userProgress) => {
  if (!userProgress || !userProgress.lastCompletedDate) return false;
  
  const today = new Date().toDateString();
  const lastCompleted = new Date(userProgress.lastCompletedDate).toDateString();
  
  return today === lastCompleted && userProgress.todayCompleted === true;
};

/**
 * Update user progress after completing daily challenges
 * @param {Object} currentProgress - Current user progress
 * @param {number} earnedXP - XP earned today
 * @param {number} earnedCoins - Coins earned today
 */
export const updateDailyProgress = (currentProgress, earnedXP, earnedCoins) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const lastCompleted = currentProgress.lastCompletedDate
    ? new Date(currentProgress.lastCompletedDate)
    : null;

  // Check if streak continues
  let newStreak = currentProgress.streak || 0;
  if (!lastCompleted) {
    newStreak = 1; // First time
  } else if (lastCompleted.toDateString() === yesterday.toDateString()) {
    newStreak += 1; // Continued streak
  } else if (lastCompleted.toDateString() !== today.toDateString()) {
    newStreak = 1; // Streak broken, restart
  }

  return {
    ...currentProgress,
    lastCompletedDate: today.toISOString(),
    todayCompleted: true,
    streak: newStreak,
    totalXP: (currentProgress.totalXP || 0) + earnedXP,
    coins: (currentProgress.coins || 0) + earnedCoins,
    totalChallengesCompleted: (currentProgress.totalChallengesCompleted || 0) + 3,
  };
};

/**
 * Get difficulty stars string
 */
export const getDifficultyStars = (difficulty) => {
  const stars = {
    easy: '⭐',
    medium: '⭐⭐',
    hard: '⭐⭐⭐',
  };
  return stars[difficulty] || '⭐⭐';
};

/**
 * Get challenge completion statistics
 */
export const getChallengeStats = (userProgress) => {
  return {
    totalCompleted: userProgress?.totalChallengesCompleted || 0,
    currentStreak: userProgress?.streak || 0,
    totalXP: userProgress?.totalXP || 0,
    totalCoins: userProgress?.coins || 0,
    longestStreak: userProgress?.longestStreak || userProgress?.streak || 0,
  };
};

/**
 * Format date for display
 */
export const formatDate = (date) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-US', options);
};

export default {
  getDailyChallenges,
  hasTodayCompleted,
  updateDailyProgress,
  getDifficultyStars,
  getChallengeStats,
  formatDate,
};
