import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const navigate = useNavigate();
  const [chatOpen, setChatOpen] = useState(false);
  const userName = localStorage.getItem('userName') || 'Guest';

  const courses = [
    { id: 'dsa', name: 'DSA / DAA', icon: '📊', color: 'from-purple-500 to-pink-500', progress: 25 },
    { id: 'os', name: 'Operating Systems', icon: '💻', color: 'from-blue-500 to-cyan-500', progress: 0 },
    { id: 'cn', name: 'Computer Networks', icon: '🌐', color: 'from-green-500 to-emerald-500', progress: 0 },
    { id: 'coa', name: 'Computer Organization', icon: '🔧', color: 'from-orange-500 to-red-500', progress: 0 },
    { id: 'dbms', name: 'Database Management', icon: '🗄️', color: 'from-indigo-500 to-purple-500', progress: 0 },
    { id: 'oops', name: 'OOPs Concepts', icon: '🎯', color: 'from-yellow-500 to-orange-500', progress: 0 },
    { id: 'web', name: 'HTML / CSS / JS', icon: '🌈', color: 'from-pink-500 to-rose-500', progress: 0 },
    { id: 'python', name: 'Python', icon: '🐍', color: 'from-cyan-500 to-blue-500', progress: 0 },
    { id: 'java', name: 'Java', icon: '☕', color: 'from-red-500 to-orange-500', progress: 0 },
    { id: 'cyber', name: 'Cybersecurity', icon: '🔒', color: 'from-gray-500 to-slate-500', progress: 0 },
    { id: 'cloud', name: 'Cloud Computing', icon: '☁️', color: 'from-sky-500 to-blue-500', progress: 0 },
    { id: 'ai', name: 'AI / ML', icon: '🤖', color: 'from-violet-500 to-purple-500', progress: 0 }
  ];

  const quickActions = [
    { name: 'Game Simulations', icon: '🎮', path: '/games', bg: 'from-purple-500/20 to-pink-500/20' },
    { name: 'PPT Converter', icon: '📊', path: '/ppt-converter', bg: 'from-blue-500/20 to-cyan-500/20' },
    { name: 'Interview Hub', icon: '💼', path: '/interview-hub', bg: 'from-green-500/20 to-emerald-500/20' },
    { name: 'Daily Quest', icon: '🎁', path: '/daily-quest', bg: 'from-yellow-500/20 to-orange-500/20' },
    { name: 'Leaderboard', icon: '🏆', path: '/leaderboard', bg: 'from-red-500/20 to-pink-500/20' },
    { name: 'Profile', icon: '👤', path: '/profile', bg: 'from-indigo-500/20 to-purple-500/20' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1020] via-[#101325] to-[#14182b] text-white">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-lg"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            CodeVerse
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/profile')}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-full hover:bg-gray-700/50 transition-all"
            >
              <span className="text-2xl">👤</span>
              <span className="font-medium">{userName}</span>
            </button>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Banner */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12 relative overflow-hidden rounded-3xl p-8 bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30"
        >
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-2">
              Welcome back to CodeVerse, {userName}! 🚀
            </h2>
            <p className="text-xl text-gray-300">
              where learning meets adventure!
            </p>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
        </motion.div>

        {/* Tuto AI Mentor */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12 bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-6 shadow-2xl"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-3xl">
              🤖
            </div>
            <div>
              <h3 className="text-2xl font-bold">Tuto - Your AI Mentor</h3>
              <p className="text-gray-400">Ask me anything about your learning journey!</p>
            </div>
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Type your question here..."
              className="flex-1 px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg transition-all">
              Ask Tuto
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">💡 Try: "What should I learn next?" or "Explain Big-O notation"</p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickActions.map((action) => (
              <motion.button
                key={action.name}
                onClick={() => navigate(action.path)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-6 bg-gradient-to-br ${action.bg} backdrop-blur-lg border border-gray-700/50 rounded-2xl text-center hover:border-primary/50 transition-all`}
              >
                <div className="text-4xl mb-2">{action.icon}</div>
                <div className="text-sm font-medium">{action.name}</div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Courses Grid */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold mb-6">Your Learning Paths</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses.map((course) => (
              <motion.div
                key={course.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/courses/${course.id}`)}
                className="cursor-pointer bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-primary/50 transition-all"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${course.color} rounded-2xl flex items-center justify-center text-3xl mb-4`}>
                  {course.icon}
                </div>
                <h4 className="text-lg font-semibold mb-2">{course.name}</h4>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${course.color}`}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <span>{course.progress}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
