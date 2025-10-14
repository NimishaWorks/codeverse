import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Play, Pause, RotateCcw } from 'lucide-react';

export default function TimerOverlay({ isVisible, duration = 30 }) {
  const [timeLeft, setTimeLeft] = useState(duration * 60); // Convert minutes to seconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      // Optional: Play alert sound
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const toggleTimer = () => setIsRunning(!isRunning);
  
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(duration * 60);
  };

  const getTimerColor = () => {
    const percentage = (timeLeft / (duration * 60)) * 100;
    if (percentage > 50) return 'from-green-500 to-emerald-500';
    if (percentage > 20) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-24 right-6 z-40"
      drag
      dragConstraints={{
        top: 0,
        left: -window.innerWidth + 250,
        right: 0,
        bottom: window.innerHeight - 200
      }}
      dragElastic={0.1}
    >
      <div className="bg-gray-900/95 backdrop-blur-xl border-2 border-blue-500/50 rounded-2xl shadow-2xl p-4 min-w-[200px]">
        {/* Timer Display */}
        <div className="text-center mb-3">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-semibold text-gray-400">TIMER</span>
          </div>
          <div className={`text-4xl font-mono font-bold bg-gradient-to-r ${getTimerColor()} bg-clip-text text-transparent`}>
            {formatTime(timeLeft)}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden mb-3">
          <motion.div
            className={`h-full bg-gradient-to-r ${getTimerColor()}`}
            initial={{ width: '100%' }}
            animate={{ width: `${(timeLeft / (duration * 60)) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Controls */}
        <div className="flex gap-2 justify-center">
          <motion.button
            onClick={toggleTimer}
            className="p-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={isRunning ? 'Pause' : 'Start'}
          >
            {isRunning ? (
              <Pause className="w-4 h-4 text-blue-400" />
            ) : (
              <Play className="w-4 h-4 text-blue-400" />
            )}
          </motion.button>
          <motion.button
            onClick={resetTimer}
            className="p-2 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Reset"
          >
            <RotateCcw className="w-4 h-4 text-purple-400" />
          </motion.button>
        </div>

        <p className="text-xs text-gray-600 text-center mt-2">Drag to move</p>
      </div>
    </motion.div>
  );
}
