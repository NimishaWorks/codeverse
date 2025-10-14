import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Camera, Clock, Terminal, BookOpen, X } from 'lucide-react';

export default function SettingsPanel({ isOpen, onClose, settings, onToggle }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={onClose}
        >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-gray-900/95 backdrop-blur-xl border-2 border-purple-500/50 rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg">
                <Settings className="w-6 h-6 text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Settings</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Settings Options */}
          <div className="space-y-4">
            {/* Camera Toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-purple-500/30 transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Camera className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Camera</h3>
                  <p className="text-xs text-gray-400">Enable video feed</p>
                </div>
              </div>
              <button
                onClick={() => onToggle('camera')}
                className={`relative w-14 h-7 rounded-full transition-all ${
                  settings.camera ? 'bg-green-500' : 'bg-gray-600'
                }`}
              >
                <motion.div
                  className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-lg"
                  animate={{ x: settings.camera ? 30 : 4 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </button>
            </div>

            {/* Timer Toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-purple-500/30 transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-500/20 rounded-lg">
                  <Clock className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Timer</h3>
                  <p className="text-xs text-gray-400">Show countdown timer</p>
                </div>
              </div>
              <button
                onClick={() => onToggle('timer')}
                className={`relative w-14 h-7 rounded-full transition-all ${
                  settings.timer ? 'bg-green-500' : 'bg-gray-600'
                }`}
              >
                <motion.div
                  className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-lg"
                  animate={{ x: settings.timer ? 30 : 4 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </button>
            </div>

            {/* Terminal Theme (Optional) */}
            <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-purple-500/30 transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Terminal className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Terminal Theme</h3>
                  <p className="text-xs text-gray-400">Dark mode enabled</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-lg text-xs font-semibold">
                Dark
              </span>
            </div>

            {/* Tutorials Toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-purple-500/30 transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <BookOpen className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Tutorials</h3>
                  <p className="text-xs text-gray-400">Show helpful guides</p>
                </div>
              </div>
              <button
                onClick={() => onToggle('tutorials')}
                className={`relative w-14 h-7 rounded-full transition-all ${
                  settings.tutorials ? 'bg-green-500' : 'bg-gray-600'
                }`}
              >
                <motion.div
                  className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-lg"
                  animate={{ x: settings.tutorials ? 30 : 4 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </button>
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl">
            <p className="text-xs text-gray-400 flex items-start gap-2">
              <span>💡</span>
              <span>All settings are saved automatically and will persist across sessions.</span>
            </p>
          </div>

          {/* Close Button */}
          <motion.button
            onClick={onClose}
            className="w-full mt-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Done
          </motion.button>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
}
