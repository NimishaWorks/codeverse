import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const navigate = useNavigate();
  
  // Mock data
  const userData = {
    name: localStorage.getItem('userName') || 'Guest',
    avatar: '👩‍💻',
    xp: 2450,
    streak: 12,
    level: 8,
    completedCourses: 3,
    achievements: [
      { id: 1, name: 'First Steps', icon: '🎯', desc: 'Complete first level' },
      { id: 2, name: 'Code Warrior', icon: '⚔️', desc: 'Solve 50 problems' },
      { id: 3, name: 'Streak Master', icon: '🔥', desc: '7-day streak' },
      { id: 4, name: 'Quiz Champion', icon: '🏆', desc: 'Perfect quiz score' },
    ],
    certificates: [
      { id: 1, course: 'Data Structures', date: '2025-09-15' },
      { id: 2, course: 'Web Development', date: '2025-10-01' },
    ]
  };

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
          <h1 className="text-2xl font-bold">Your Profile</h1>
          <button className="px-4 py-2 bg-gray-800/50 rounded-lg hover:bg-gray-700/50">⚙️ Settings</button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 rounded-3xl p-8 mb-8"
        >
          <div className="flex items-center gap-6">
            <div className="w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-6xl">
              {userData.avatar}
            </div>
            <div className="flex-1">
              <h2 className="text-4xl font-bold mb-2">{userData.name}</h2>
              <p className="text-xl text-gray-300 mb-4">Level {userData.level} Coder</p>
              <div className="flex gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{userData.xp}</div>
                  <div className="text-sm text-gray-400">XP Earned</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400">{userData.streak}</div>
                  <div className="text-sm text-gray-400">Day Streak 🔥</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">{userData.completedCourses}</div>
                  <div className="text-sm text-gray-400">Courses Done</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8"
          >
            <h3 className="text-2xl font-bold mb-6">Achievements 🏆</h3>
            <div className="grid grid-cols-2 gap-4">
              {userData.achievements.map((achievement) => (
                <div key={achievement.id} className="bg-gray-900/50 rounded-2xl p-4 text-center">
                  <div className="text-4xl mb-2">{achievement.icon}</div>
                  <h4 className="font-semibold mb-1">{achievement.name}</h4>
                  <p className="text-xs text-gray-400">{achievement.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Certificates */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8"
          >
            <h3 className="text-2xl font-bold mb-6">Certificates 📜</h3>
            <div className="space-y-4">
              {userData.certificates.map((cert) => (
                <div key={cert.id} className="bg-gray-900/50 rounded-2xl p-4 flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">{cert.course}</h4>
                    <p className="text-sm text-gray-400">Completed: {cert.date}</p>
                  </div>
                  <button className="px-4 py-2 bg-primary rounded-lg hover:bg-primary/80 text-sm">
                    📥 Download
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Character Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8"
        >
          <h3 className="text-2xl font-bold mb-6">Your Character</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-2xl p-8 flex items-center justify-center">
              <div className="text-9xl">🧙‍♂️</div>
            </div>
            <div className="md:col-span-2">
              <h4 className="text-xl font-bold mb-4">Code Wizard</h4>
              <p className="text-gray-400 mb-6">
                Unlocked after completing 3 courses. Your character evolves as you progress through your learning journey!
              </p>
              <h5 className="font-semibold mb-3">Available Outfits:</h5>
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-gray-900/50 rounded-xl flex items-center justify-center text-4xl cursor-pointer hover:bg-gray-800/50">
                  👕
                </div>
                <div className="w-20 h-20 bg-gray-900/50 rounded-xl flex items-center justify-center text-4xl cursor-pointer hover:bg-gray-800/50">
                  🎩
                </div>
                <div className="w-20 h-20 bg-gray-900/50 rounded-xl flex items-center justify-center text-4xl cursor-pointer hover:bg-gray-800/50 opacity-50">
                  🔒
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Language Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8"
        >
          <h3 className="text-2xl font-bold mb-6">Language Preference 🌐</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['English', 'Hindi', 'Tamil', 'Malayalam', 'Telugu', 'Kannada', 'Bengali', 'Marathi'].map((lang) => (
              <button
                key={lang}
                className="px-4 py-3 bg-gray-900/50 rounded-xl hover:bg-primary/20 hover:border-primary border border-gray-700 transition-all"
              >
                {lang}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserProfile;
