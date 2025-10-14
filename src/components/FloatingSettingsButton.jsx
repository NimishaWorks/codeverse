import React from 'react';
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';

export default function FloatingSettingsButton({ onClick }) {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 p-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all"
      whileHover={{ scale: 1.1, rotate: 90 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      title="Settings"
    >
      <Settings className="w-6 h-6 text-white" />
    </motion.button>
  );
}
