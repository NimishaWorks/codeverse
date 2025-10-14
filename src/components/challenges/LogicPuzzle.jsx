import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * @component LogicPuzzle
 * Multiple choice logic and math puzzles
 */
const LogicPuzzle = ({ challenge, onComplete, onSkip }) => {
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
      {/* Difficulty Badge */}
      <div className="flex items-center justify-between">
        <span className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-sm font-semibold">
          {challenge.difficulty === 'easy' && '⭐ Easy'}
          {challenge.difficulty === 'medium' && '⭐⭐ Medium'}
          {challenge.difficulty === 'hard' && '⭐⭐⭐ Hard'}
        </span>
        {onSkip && !showResult && (
          <button
            onClick={onSkip}
            className="text-sm text-slate-400 hover:text-white transition-colors"
          >
            Skip Challenge →
          </button>
        )}
      </div>

      {/* Question Card */}
      <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
        <div className="flex items-center gap-4 mb-6">
          <div className="text-5xl">🧠</div>
          <h3 className="text-2xl font-bold">Think Logically</h3>
        </div>
        <p className="text-xl leading-relaxed mb-6">{challenge.question}</p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {challenge.options.map((option, index) => (
          <motion.button
            key={index}
            onClick={() => !showResult && setSelectedAnswer(option)}
            disabled={showResult}
            whileHover={!showResult ? { scale: 1.02 } : {}}
            whileTap={!showResult ? { scale: 0.98 } : {}}
            className={`p-6 rounded-xl border-2 transition-all text-left ${
              showResult
                ? option === challenge.correctAnswer
                  ? 'border-green-500 bg-green-500/20'
                  : option === selectedAnswer
                  ? 'border-red-500 bg-red-500/20'
                  : 'border-white/10 bg-white/5 opacity-50'
                : selectedAnswer === option
                ? 'border-orange-500 bg-orange-500/20'
                : 'border-white/20 hover:border-white/40 bg-white/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                  selectedAnswer === option && !showResult
                    ? 'bg-orange-500'
                    : showResult && option === challenge.correctAnswer
                    ? 'bg-green-500'
                    : 'bg-white/10'
                }`}
              >
                {String.fromCharCode(65 + index)}
              </div>
              <span className="flex-1 text-lg">{option}</span>
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

      {/* Submit Button */}
      {!showResult && (
        <motion.button
          onClick={handleSubmit}
          disabled={!selectedAnswer}
          whileHover={selectedAnswer ? { scale: 1.02 } : {}}
          whileTap={selectedAnswer ? { scale: 0.98 } : {}}
          className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${
            selectedAnswer
              ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:shadow-2xl hover:shadow-orange-500/50'
              : 'bg-white/10 cursor-not-allowed opacity-50'
          }`}
        >
          Submit Answer
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
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 10 }}
              className="text-6xl mb-3"
            >
              {isCorrect ? '🎉' : '🤔'}
            </motion.div>
            <h3 className="text-2xl font-bold mb-2">
              {isCorrect ? 'Brilliant!' : 'Not Quite Right'}
            </h3>
            <p className="text-lg mb-4">
              {isCorrect ? 'Your logic is on point!' : `Correct answer: ${challenge.correctAnswer}`}
            </p>
            
            {/* Explanation Toggle */}
            {challenge.explanation && (
              <button
                onClick={() => setShowExplanation(!showExplanation)}
                className="text-sm text-blue-400 hover:text-blue-300 underline"
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
                  <p className="text-sm text-slate-300">{challenge.explanation}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LogicPuzzle;
