import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Star, CheckCircle, Lock, Zap, Trophy, Book } from 'lucide-react';

export default function RoadmapOS() {
  const navigate = useNavigate();
  const [selectedNode, setSelectedNode] = useState(null);
  
  const [nodes, setNodes] = useState([
    { id: 1, name: 'OS Basics', icon: '💻', status: 'completed', xp: 100, coins: 10, x: 50, y: 4, lessons: 10, stars: 3 },
    { id: 2, name: 'Processes', icon: '⚙️', status: 'completed', xp: 120, coins: 12, x: 30, y: 10, lessons: 12, stars: 2 },
    { id: 3, name: 'Threads', icon: '🧵', status: 'active', xp: 120, coins: 12, x: 70, y: 16, lessons: 11, stars: 0 },
    { id: 4, name: 'CPU Scheduling', icon: '⏱️', status: 'locked', xp: 150, coins: 15, x: 45, y: 22, lessons: 15, stars: 0 },
    { id: 5, name: 'Synchronization', icon: '🔄', status: 'locked', xp: 140, coins: 14, x: 25, y: 28, lessons: 14, stars: 0, game: true },
    { id: 6, name: 'Deadlocks', icon: '🔒', status: 'locked', xp: 140, coins: 14, x: 65, y: 34, lessons: 13, stars: 0 },
    { id: 7, name: 'Memory Management', icon: '💾', status: 'locked', xp: 180, coins: 18, x: 40, y: 40, lessons: 18, stars: 0 },
    { id: 8, name: 'Virtual Memory', icon: '🗂️', status: 'locked', xp: 200, coins: 20, x: 70, y: 46, lessons: 20, stars: 0 },
    { id: 9, name: 'File Systems', icon: '📁', status: 'locked', xp: 180, coins: 18, x: 50, y: 52, lessons: 17, stars: 0 },
    { id: 10, name: 'Disk Scheduling', icon: '💿', status: 'locked', xp: 160, coins: 16, x: 28, y: 58, lessons: 15, stars: 0, game: true },
    { id: 11, name: 'I/O Systems', icon: '🖱️', status: 'locked', xp: 160, coins: 16, x: 68, y: 64, lessons: 14, stars: 0 },
    { id: 12, name: 'Security', icon: '🛡️', status: 'locked', xp: 180, coins: 18, x: 42, y: 70, lessons: 16, stars: 0 },
    { id: 13, name: 'Linux Basics', icon: '🐧', status: 'locked', xp: 160, coins: 16, x: 72, y: 76, lessons: 20, stars: 0 },
    { id: 14, name: 'Windows Internals', icon: '🪟', status: 'locked', xp: 150, coins: 15, x: 38, y: 82, lessons: 18, stars: 0 },
    { id: 15, name: 'Virtualization', icon: '☁️', status: 'locked', xp: 200, coins: 20, x: 65, y: 88, lessons: 22, stars: 0, game: true },
    { id: 16, name: 'Distributed OS', icon: '🌐', status: 'locked', xp: 220, coins: 22, x: 35, y: 94, lessons: 24, stars: 0 },
    { id: 17, name: 'Real-Time OS', icon: '⏰', status: 'locked', xp: 200, coins: 20, x: 68, y: 100, lessons: 20, stars: 0 },
    { id: 18, name: 'System Performance', icon: '📊', status: 'locked', xp: 180, coins: 18, x: 45, y: 106, lessons: 19, stars: 0 },
    { id: 19, name: 'OS Lab Challenge', icon: '🔬', status: 'locked', xp: 250, coins: 25, x: 70, y: 112, lessons: 25, stars: 0 },
    { id: 20, name: 'Final Project', icon: '🏆', status: 'locked', xp: 300, coins: 30, x: 50, y: 120, lessons: 30, stars: 0 }
  ]);

  const handleNodeClick = (node) => {
    if (node.status !== 'locked') {
      setSelectedNode(node);
      if (node.status === 'active') {
        setNodes(prevNodes =>
          prevNodes.map((n, idx) => {
            if (n.id === node.id) return { ...n, status: 'completed', stars: 3 };
            if (n.id === node.id + 1) return { ...n, status: 'active' };
            return n;
          })
        );
      }
    }
  };

  const stats = {
    level: nodes.findIndex(n => n.status === 'active') + 1,
    completed: nodes.filter(n => n.status === 'completed').length,
    total: nodes.length,
    stars: nodes.reduce((sum, n) => sum + (n.stars || 0), 0),
    xp: nodes.filter(n => n.status === 'completed').reduce((sum, n) => sum + n.xp, 0)
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#0b1020] via-[#1a1f3a] to-[#0f1729]">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Floating decorative elements */}
      <motion.div 
        className="absolute top-20 left-10 text-6xl opacity-20"
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        💻
      </motion.div>
      <motion.div 
        className="absolute top-40 right-20 text-5xl opacity-20"
        animate={{ y: [0, -15, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      >
        ⚙️
      </motion.div>
      <motion.div 
        className="absolute bottom-40 left-1/4 text-5xl opacity-20"
        animate={{ y: [0, -25, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, delay: 0.5 }}
      >
        💾
      </motion.div>

      <div className="max-w-2xl mx-auto relative z-10 px-4 py-6">
        {/* Top Stats Bar */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-between mb-6 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 rounded-3xl px-6 py-4 shadow-2xl border-4 border-blue-400/30"
        >
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl text-white font-semibold hover:bg-white/30 transition-all flex items-center gap-2 border-2 border-white/30"
          >
            ← Back
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full border-4 border-white flex items-center justify-center text-3xl shadow-xl">
              💻
            </div>
            <div className="text-left">
              <div className="text-white font-bold text-lg">Level {stats.level}</div>
              <div className="text-white/90 text-sm">{stats.completed}/{stats.total} Complete</div>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border-2 border-white/40 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-300 fill-yellow-300" />
              <span className="text-white font-bold">{stats.stars}</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border-2 border-white/40 flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-300" />
              <span className="text-white font-bold">{stats.xp}</span>
            </div>
          </div>
        </motion.div>

        {/* Roadmap Container */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative bg-gradient-to-b from-gray-900/40 via-blue-900/20 to-gray-900/40 rounded-3xl p-8 backdrop-blur-xl border-4 border-blue-500/30 shadow-2xl"
          style={{ minHeight: '1600px' }}
        >
          {/* SVG Path Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.6 }} />
                <stop offset="50%" style={{ stopColor: '#06b6d4', stopOpacity: 0.6 }} />
                <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 0.6 }} />
              </linearGradient>
              
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {nodes.slice(0, -1).map((node, idx) => {
              const next = nodes[idx + 1];
              return (
                <line
                  key={`line-${node.id}`}
                  x1={`${node.x}%`}
                  y1={`${node.y}%`}
                  x2={`${next.x}%`}
                  y2={`${next.y}%`}
                  stroke="url(#pathGradient)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  opacity={node.status === 'completed' ? 1 : 0.3}
                  strokeDasharray={node.status === 'locked' ? "8,4" : "0"}
                  filter={node.status === 'completed' ? "url(#glow)" : "none"}
                />
              );
            })}
          </svg>

          {/* Course Nodes */}
          <div className="relative" style={{ minHeight: '1500px', zIndex: 2 }}>
            {nodes.map((node) => {
              const isCompleted = node.status === 'completed';
              const isActive = node.status === 'active';
              const isLocked = node.status === 'locked';

              return (
                <motion.div
                  key={node.id}
                  className="absolute cursor-pointer"
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: isActive ? 20 : 10
                  }}
                  whileHover={{ scale: !isLocked ? 1.1 : 1 }}
                  whileTap={{ scale: !isLocked ? 0.95 : 1 }}
                  onClick={() => handleNodeClick(node)}
                  animate={isActive ? { y: [0, -10, 0] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="relative flex flex-col items-center gap-2">
                    {/* Level Number Badge */}
                    <div className={`
                      absolute -top-3 -left-3 w-8 h-8 rounded-full font-bold text-sm
                      flex items-center justify-center z-20 shadow-lg border-3
                      ${isCompleted ? 'bg-gradient-to-br from-green-400 to-emerald-600 text-white border-white' :
                        isActive ? 'bg-gradient-to-br from-orange-400 to-red-500 text-white border-white animate-pulse' :
                        'bg-gray-600 text-gray-300 border-gray-500'}
                    `}>
                      {node.id}
                    </div>

                    {/* Main Node Circle */}
                    <div className={`
                      w-24 h-24 rounded-full flex items-center justify-center text-5xl
                      border-4 shadow-2xl relative overflow-hidden transition-all duration-300
                      ${isCompleted ? 'bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 border-green-300' :
                        isActive ? 'bg-gradient-to-br from-orange-400 via-pink-500 to-purple-500 border-pink-300' :
                        'bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 border-gray-600'}
                    `}
                    style={{
                      boxShadow: isCompleted ? '0 8px 32px rgba(34, 197, 94, 0.6), inset 0 -4px 12px rgba(0,0,0,0.3)' :
                                 isActive ? '0 8px 40px rgba(251, 146, 60, 0.8), inset 0 -4px 12px rgba(0,0,0,0.3)' :
                                 '0 4px 16px rgba(0,0,0,0.6), inset 0 -4px 12px rgba(0,0,0,0.5)'
                    }}>
                      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent rounded-full" />
                      <span className="relative z-10 drop-shadow-2xl filter" style={{
                        filter: isLocked ? 'grayscale(100%) brightness(0.5)' : 'none'
                      }}>
                        {isLocked ? '🔒' : node.icon}
                      </span>
                      {isActive && (
                        <motion.div
                          className="absolute inset-0"
                          animate={{
                            boxShadow: [
                              '0 0 20px rgba(251, 146, 60, 0.5)',
                              '0 0 40px rgba(251, 146, 60, 0.8)',
                              '0 0 20px rgba(251, 146, 60, 0.5)'
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </div>

                    {isCompleted && node.stars > 0 && (
                      <div className="flex gap-1 absolute -bottom-7 bg-gray-900/90 px-3 py-1 rounded-full shadow-xl border-2 border-yellow-400">
                        {[...Array(3)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < node.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
                          />
                        ))}
                      </div>
                    )}

                    {isActive && (
                      <motion.div 
                        className="absolute -top-16"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full border-4 border-white shadow-2xl flex items-center justify-center text-2xl">
                          💻
                        </div>
                      </motion.div>
                    )}

                    {isCompleted && (
                      <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-lg border-2 border-green-500">
                        <CheckCircle className="w-6 h-6 text-green-500 fill-green-500" />
                      </div>
                    )}

                    {node.game && !isLocked && (
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full p-1.5 shadow-lg border-2 border-white">
                        <Trophy className="w-4 h-4 text-white" />
                      </div>
                    )}

                    <motion.div 
                      className={`
                        mt-4 px-4 py-2 rounded-xl text-center max-w-[140px] text-sm font-bold
                        shadow-xl border-3 backdrop-blur-sm
                        ${isCompleted ? 'bg-green-500/20 text-green-300 border-green-400/50' :
                          isActive ? 'bg-orange-500/20 text-orange-300 border-orange-400/50' :
                          'bg-gray-800/50 text-gray-400 border-gray-600/50'}
                      `}
                      whileHover={{ scale: 1.05 }}
                    >
                      {node.name}
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Bottom Info Panel */}
        <AnimatePresence>
          {selectedNode && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="mt-6 bg-gradient-to-br from-blue-600 via-cyan-600 to-blue-700 rounded-3xl p-6 shadow-2xl border-4 border-blue-400/40"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-white flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-5xl">{selectedNode.icon}</span>
                    <div>
                      <h3 className="text-2xl font-bold drop-shadow-lg">{selectedNode.name}</h3>
                      <div className="flex gap-4 text-sm font-semibold mt-1">
                        <span className="flex items-center gap-1">
                          <Book className="w-4 h-4" /> {selectedNode.lessons} Lessons
                        </span>
                        <span className="flex items-center gap-1">
                          <Zap className="w-4 h-4" /> +{selectedNode.xp} XP
                        </span>
                        <span>🪙 +{selectedNode.coins} Coins</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-white/90 font-medium text-sm">
                    {selectedNode.status === 'completed' ? 
                      '✅ Excellent work! You can replay for better stars.' :
                      selectedNode.status === 'active' ?
                      '🎯 Complete all lessons to unlock the next level!' :
                      '🔒 Complete previous levels to unlock this.'}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedNode(null)}
                    className="px-6 py-3 bg-white/20 text-white font-bold rounded-full shadow-xl hover:bg-white/30 transition-all border-2 border-white/30"
                  >
                    Close
                  </button>
                  {selectedNode.status !== 'locked' && (
                    <button
                      className="px-6 py-3 bg-white text-blue-600 font-bold rounded-full shadow-xl hover:scale-105 transition-transform border-2 border-white flex items-center gap-2"
                    >
                      Play ▶
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
