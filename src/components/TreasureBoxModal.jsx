import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * @component TreasureBoxModal
 * Animated reward modal with confetti effect
 */
const TreasureBoxModal = ({ isOpen, onClose, rewards, streak }) => {
  useEffect(() => {
    if (isOpen) {
      // Create confetti effect
      createConfetti();
    }
  }, [isOpen]);

  const createConfetti = () => {
    const confettiContainer = document.getElementById('confetti-container');
    if (!confettiContainer) return;

    const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE'];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti-piece';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = Math.random() * 3 + 's';
      confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
      confettiContainer.appendChild(confetti);

      // Remove after animation
      setTimeout(() => confetti.remove(), 5000);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      >
        {/* Confetti Container */}
        <div id="confetti-container" className="fixed inset-0 pointer-events-none overflow-hidden" />

        {/* Modal Content */}
        <motion.div
          initial={{ scale: 0.5, y: 100, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.5, y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-md w-full mx-4"
        >
          {/* Treasure Box */}
          <div className="bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 rounded-3xl p-1">
            <div className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-3xl p-8 text-center">
              {/* Animated Treasure Box */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
                className="mb-6"
              >
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="text-9xl"
                >
                  🎁
                </motion.div>
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-4xl font-black mb-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent"
              >
                Treasure Unlocked!
              </motion.h2>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-slate-300 mb-8"
              >
                You've completed all daily challenges!
              </motion.p>

              {/* Rewards */}
              <div className="space-y-4 mb-8">
                {/* XP Reward */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-2xl p-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">⭐</span>
                      <div className="text-left">
                        <p className="text-sm text-slate-400">Experience Points</p>
                        <p className="text-3xl font-bold text-yellow-400">+{rewards.xp} XP</p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
                    >
                      ✨
                    </motion.div>
                  </div>
                </motion.div>

                {/* Coins Reward */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-2xl p-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">🪙</span>
                      <div className="text-left">
                        <p className="text-sm text-slate-400">CodeVerse Coins</p>
                        <p className="text-3xl font-bold text-amber-400">+{rewards.coins} Coins</p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    >
                      💰
                    </motion.div>
                  </div>
                </motion.div>

                {/* Streak Bonus */}
                {streak > 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-2xl p-4"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-2xl">🔥</span>
                      <p className="text-lg font-semibold">
                        {streak} Day Streak Bonus!
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Motivational Message */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10"
              >
                <p className="text-sm text-slate-300">
                  {streak >= 7 && "🎉 Amazing! You're on a roll!"}
                  {streak >= 3 && streak < 7 && "💪 Keep up the great work!"}
                  {streak < 3 && "🌟 Great start! Come back tomorrow!"}
                </p>
              </motion.div>

              {/* Close Button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-2xl"
              >
                Claim Rewards
              </motion.button>

              {/* Next Challenge Info */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="mt-4 text-xs text-slate-500"
              >
                New challenges available tomorrow!
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* CSS for Confetti */}
        <style>{`
          .confetti-piece {
            position: absolute;
            width: 10px;
            height: 10px;
            top: -10px;
            opacity: 0;
            animation: confetti-fall linear forwards;
          }

          @keyframes confetti-fall {
            0% {
              opacity: 1;
              transform: translateY(0) rotate(0deg);
            }
            100% {
              opacity: 0;
              transform: translateY(100vh) rotate(720deg);
            }
          }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
};

export default TreasureBoxModal;
