import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * @component OutputPredictor
 * Show code snippet and ask user to predict output
 */
const OutputPredictor = ({ challenge, onComplete, onSkip }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSubmit = () => {
    setShowResult(true);
    const isCorrect = selectedAnswer === challenge.correctAnswer;
    
    setTimeout(() => {
      if (isCorrect && onComplete) {
        onComplete(true);
      }
    }, 2000);
  };

  const isCorrect = selectedAnswer === challenge.correctAnswer;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full text-sm font-semibold">
            {challenge.difficulty === 'easy' && '⭐ Easy'}
            {challenge.difficulty === 'medium' && '⭐⭐ Medium'}
            {challenge.difficulty === 'hard' && '⭐⭐⭐ Hard'}
          </span>
          <span className="px-3 py-1 bg-gray-700 rounded-full text-xs font-mono">
            {challenge.language}
          </span>
        </div>
        {onSkip && !showResult && (
          <button
            onClick={onSkip}
            className="text-sm text-slate-400 hover:text-white transition-colors"
          >
            Skip Challenge →
          </button>
        )}
      </div>

      {/* Question */}
      <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
        <div className="flex items-center gap-4 mb-4">
          <div className="text-4xl">🔮</div>
          <h3 className="text-xl font-bold">{challenge.question}</h3>
        </div>
      </div>

      {/* Code Block */}
      <div className="bg-gray-900 rounded-2xl border border-gray-700 overflow-hidden">
        <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-xs text-gray-400 font-mono">{challenge.language}.py</span>
        </div>
        <pre className="p-6 text-green-400 font-mono text-sm overflow-x-auto leading-relaxed">
          {challenge.code}
        </pre>
      </div>

      {/* Output Options */}
      <div>
        <h4 className="text-lg font-semibold mb-3">What will be the output?</h4>
        <div className="grid grid-cols-1 gap-3">
          {challenge.options.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => !showResult && setSelectedAnswer(option)}
              disabled={showResult}
              whileHover={!showResult ? { scale: 1.01, x: 5 } : {}}
              whileTap={!showResult ? { scale: 0.99 } : {}}
              className={`p-4 rounded-xl border-2 transition-all text-left font-mono ${
                showResult
                  ? option === challenge.correctAnswer
                    ? 'border-green-500 bg-green-500/20'
                    : option === selectedAnswer
                    ? 'border-red-500 bg-red-500/20'
                    : 'border-white/10 bg-white/5 opacity-50'
                  : selectedAnswer === option
                  ? 'border-indigo-500 bg-indigo-500/20'
                  : 'border-white/20 hover:border-white/40 bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`min-w-[32px] h-8 rounded-lg flex items-center justify-center font-bold ${
                    selectedAnswer === option && !showResult
                      ? 'bg-indigo-500'
                      : showResult && option === challenge.correctAnswer
                      ? 'bg-green-500'
                      : 'bg-white/10'
                  }`}
                >
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="flex-1 whitespace-pre-wrap break-all">{option}</span>
                {showResult && option === challenge.correctAnswer && (
                  <span className="text-2xl">✓</span>
                )}
                {showResult && option === selectedAnswer && option !== challenge.correctAnswer && (
                  <span className="text-2xl">✗</span>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      {!showResult && (
        <motion.button
          onClick={handleSubmit}
          disabled={!selectedAnswer}
          whileHover={selectedAnswer ? { scale: 1.02 } : {}}
          whileTap={selectedAnswer ? { scale: 0.98 } : {}}
          className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${
            selectedAnswer
              ? 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:shadow-2xl hover:shadow-indigo-500/50'
              : 'bg-white/10 cursor-not-allowed opacity-50'
          }`}
        >
          Run & Check Output
        </motion.button>
      )}

      {/* Result */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`p-6 rounded-2xl text-center ${
              isCorrect
                ? 'bg-green-500/20 border-2 border-green-500'
                : 'bg-red-500/20 border-2 border-red-500'
            }`}
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 10 }}
              className="text-6xl mb-3"
            >
              {isCorrect ? '🎯' : '❌'}
            </motion.div>
            <h3 className="text-2xl font-bold mb-2">
              {isCorrect ? 'Perfect Prediction!' : 'Incorrect Output'}
            </h3>
            <p className="text-lg mb-4">
              {isCorrect 
                ? 'You understand this code perfectly!' 
                : (
                  <span>
                    Correct output: <code className="font-mono bg-black/30 px-2 py-1 rounded">{challenge.correctAnswer}</code>
                  </span>
                )}
            </p>
            
            {/* Explanation Toggle */}
            {challenge.explanation && (
              <button
                onClick={() => setShowExplanation(!showExplanation)}
                className="text-sm text-blue-400 hover:text-blue-300 underline mb-2"
              >
                {showExplanation ? 'Hide' : 'Show'} Explanation
              </button>
            )}
            
            {/* Explanation */}
            <AnimatePresence>
              {showExplanation && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-4 p-4 bg-white/10 rounded-lg text-left"
                >
                  <p className="text-sm text-slate-300 leading-relaxed">{challenge.explanation}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OutputPredictor;
