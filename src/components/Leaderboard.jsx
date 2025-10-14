import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Leaderboard = () => {
  const navigate = useNavigate();

  const topUsers = [
    { rank: 1, name: 'CodeMaster', xp: 5420, avatar: '👑', streak: 45 },
    { rank: 2, name: 'AlgoNinja', xp: 4890, avatar: '🥷', streak: 38 },
    { rank: 3, name: 'DataWizard', xp: 4560, avatar: '🧙', streak: 32 },
    { rank: 4, name: 'ByteWarrior', xp: 4120, avatar: '⚔️', streak: 28 },
    { rank: 5, name: 'LogicQueen', xp: 3850, avatar: '👸', streak: 25 },
    { rank: 6, name: 'StackGuru', xp: 3640, avatar: '🎯', streak: 22 },
    { rank: 7, name: 'LoopLegend', xp: 3420, avatar: '🔁', streak: 20 },
    { rank: 8, name: 'Anisha', xp: 2450, avatar: '👩‍💻', streak: 12, isCurrentUser: true },
    { rank: 9, name: 'CodeCrusher', xp: 2180, avatar: '💪', streak: 15 },
    { rank: 10, name: 'DevDynamo', xp: 1950, avatar: '⚡', streak: 10 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1020] via-[#101325] to-[#14182b] text-white">
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-gray-400 hover:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <h1 className="text-2xl font-bold">Leaderboard 🏆</h1>
          <div className="w-24"></div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Top 3 Podium */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-3 gap-6 mb-12"
        >
          {/* 2nd Place */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div className="relative mb-4">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-4xl border-4 border-gray-500">
                {topUsers[1].avatar}
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gray-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                2
              </div>
            </div>
            <h3 className="text-lg font-bold mb-1">{topUsers[1].name}</h3>
            <p className="text-2xl font-bold text-gray-300">{topUsers[1].xp} XP</p>
            <div className="h-32 w-full bg-gradient-to-t from-gray-600 to-gray-500 rounded-t-2xl mt-4"></div>
          </motion.div>

          {/* 1st Place */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center -mt-8"
          >
            <div className="relative mb-4">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-5xl border-4 border-yellow-400"
              >
                {topUsers[0].avatar}
              </motion.div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
                1
              </div>
            </div>
            <h3 className="text-xl font-bold mb-1">{topUsers[0].name}</h3>
            <p className="text-3xl font-bold text-yellow-400">{topUsers[0].xp} XP</p>
            <div className="h-40 w-full bg-gradient-to-t from-yellow-600 to-yellow-400 rounded-t-2xl mt-4"></div>
          </motion.div>

          {/* 3rd Place */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center"
          >
            <div className="relative mb-4">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-600 to-orange-800 rounded-full flex items-center justify-center text-4xl border-4 border-orange-600">
                {topUsers[2].avatar}
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-orange-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                3
              </div>
            </div>
            <h3 className="text-lg font-bold mb-1">{topUsers[2].name}</h3>
            <p className="text-2xl font-bold text-orange-400">{topUsers[2].xp} XP</p>
            <div className="h-24 w-full bg-gradient-to-t from-orange-700 to-orange-600 rounded-t-2xl mt-4"></div>
          </motion.div>
        </motion.div>

        {/* Rest of Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-6"
        >
          <div className="space-y-3">
            {topUsers.slice(3).map((user) => (
              <motion.div
                key={user.rank}
                whileHover={{ scale: 1.02 }}
                className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                  user.isCurrentUser
                    ? 'bg-primary/20 border-2 border-primary'
                    : 'bg-gray-900/50 hover:bg-gray-800/50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center font-bold">
                    {user.rank}
                  </div>
                  <div className="text-3xl">{user.avatar}</div>
                  <div>
                    <h4 className="font-bold">
                      {user.name}
                      {user.isCurrentUser && <span className="ml-2 text-primary">(You)</span>}
                    </h4>
                    <p className="text-sm text-gray-400">
                      🔥 {user.streak} day streak
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{user.xp}</div>
                  <div className="text-sm text-gray-400">XP</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 rounded-3xl p-6"
        >
          <h3 className="text-xl font-bold mb-4">💡 Climb the ranks!</h3>
          <p className="text-gray-300">
            Complete daily quests, finish courses, and maintain your streak to earn more XP and rise in the leaderboard!
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Leaderboard;
