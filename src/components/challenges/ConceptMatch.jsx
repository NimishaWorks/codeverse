import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * @component ConceptMatch
 * Drag and drop matching between concepts and definitions
 */
const ConceptMatch = ({ challenge, onComplete, onSkip }) => {
  const [matches, setMatches] = useState({});
  const [selectedConcept, setSelectedConcept] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [shuffledDefinitions, setShuffledDefinitions] = useState([]);

  // Shuffle definitions on mount
  useEffect(() => {
    const definitions = challenge.pairs.map(p => p.definition);
    const shuffled = [...definitions].sort(() => Math.random() - 0.5);
    setShuffledDefinitions(shuffled);
  }, [challenge]);

  const handleConceptClick = (concept) => {
    if (showResult) return;
    setSelectedConcept(selectedConcept === concept ? null : concept);
  };

  const handleDefinitionClick = (definition) => {
    if (showResult || !selectedConcept) return;
    
    // Remove any existing match for this definition
    const newMatches = { ...matches };
    Object.keys(newMatches).forEach(key => {
      if (newMatches[key] === definition) {
        delete newMatches[key];
      }
    });
    
    // Add new match
    newMatches[selectedConcept] = definition;
    setMatches(newMatches);
    setSelectedConcept(null);
  };

  const handleSubmit = () => {
    // Check if all concepts are matched
    if (Object.keys(matches).length !== challenge.pairs.length) {
      alert('Please match all concepts before submitting!');
      return;
    }

    setShowResult(true);
    
    // Check if all matches are correct
    const allCorrect = challenge.pairs.every(
      pair => matches[pair.concept] === pair.definition
    );
    
    setTimeout(() => {
      if (allCorrect && onComplete) {
        onComplete(true);
      }
    }, 2000);
  };

  const getCorrectDefinition = (concept) => {
    return challenge.pairs.find(p => p.concept === concept)?.definition;
  };

  const isMatchCorrect = (concept) => {
    if (!showResult) return null;
    return matches[concept] === getCorrectDefinition(concept);
  };

  const correctCount = showResult
    ? challenge.pairs.filter(p => matches[p.concept] === p.definition).length
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="px-4 py-2 bg-gradient-to-r from-teal-500 to-green-500 rounded-full text-sm font-semibold">
            {challenge.difficulty === 'easy' && '⭐ Easy'}
            {challenge.difficulty === 'medium' && '⭐⭐ Medium'}
            {challenge.difficulty === 'hard' && '⭐⭐⭐ Hard'}
          </span>
          <span className="px-3 py-1 bg-gray-700 rounded-full text-xs">
            {challenge.category}
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
        <div className="flex items-center gap-4 mb-2">
          <div className="text-4xl">🔗</div>
          <h3 className="text-xl font-bold">{challenge.title}</h3>
        </div>
        <p className="text-slate-400">Click a concept, then click its matching definition</p>
      </div>

      {/* Matching Interface */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Concepts Column */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-3">
            Concepts
          </h4>
          {challenge.pairs.map((pair, index) => {
            const isSelected = selectedConcept === pair.concept;
            const hasMatch = matches[pair.concept];
            const matchCorrect = isMatchCorrect(pair.concept);

            return (
              <motion.button
                key={index}
                onClick={() => handleConceptClick(pair.concept)}
                disabled={showResult}
                whileHover={!showResult ? { scale: 1.02, x: 5 } : {}}
                whileTap={!showResult ? { scale: 0.98 } : {}}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                  showResult
                    ? matchCorrect
                      ? 'border-green-500 bg-green-500/20'
                      : 'border-red-500 bg-red-500/20'
                    : isSelected
                    ? 'border-teal-500 bg-teal-500/20 shadow-lg shadow-teal-500/30'
                    : hasMatch
                    ? 'border-teal-400 bg-teal-400/10'
                    : 'border-white/20 hover:border-white/40 bg-white/5'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{pair.concept}</span>
                  {hasMatch && !showResult && (
                    <span className="text-teal-400">✓</span>
                  )}
                  {showResult && matchCorrect && (
                    <span className="text-green-400 text-xl">✓</span>
                  )}
                  {showResult && !matchCorrect && (
                    <span className="text-red-400 text-xl">✗</span>
                  )}
                </div>
                {hasMatch && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="mt-2 pt-2 border-t border-white/10"
                  >
                    <p className="text-sm text-slate-300">{matches[pair.concept]}</p>
                  </motion.div>
                )}
                {showResult && !matchCorrect && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="mt-2 pt-2 border-t border-white/10"
                  >
                    <p className="text-xs text-red-400">Your match: {matches[pair.concept]}</p>
                    <p className="text-xs text-green-400">Correct: {getCorrectDefinition(pair.concept)}</p>
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Definitions Column */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-3">
            Definitions
          </h4>
          {shuffledDefinitions.map((definition, index) => {
            const isMatched = Object.values(matches).includes(definition);
            const matchedConcept = Object.keys(matches).find(
              key => matches[key] === definition
            );

            return (
              <motion.button
                key={index}
                onClick={() => handleDefinitionClick(definition)}
                disabled={showResult || !selectedConcept}
                whileHover={!showResult && selectedConcept ? { scale: 1.02, x: -5 } : {}}
                whileTap={!showResult && selectedConcept ? { scale: 0.98 } : {}}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                  isMatched
                    ? 'border-white/10 bg-white/5 opacity-50'
                    : selectedConcept
                    ? 'border-white/40 hover:border-teal-500 bg-white/5 hover:bg-teal-500/10'
                    : 'border-white/10 bg-white/5 opacity-30'
                }`}
              >
                <p className="text-sm text-slate-300">{definition}</p>
                {isMatched && matchedConcept && (
                  <p className="text-xs text-teal-400 mt-1">← {matchedConcept}</p>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Progress Indicator */}
      {!showResult && (
        <div className="text-center text-sm text-slate-400">
          {Object.keys(matches).length} / {challenge.pairs.length} matched
        </div>
      )}

      {/* Submit Button */}
      {!showResult && (
        <motion.button
          onClick={handleSubmit}
          disabled={Object.keys(matches).length !== challenge.pairs.length}
          whileHover={
            Object.keys(matches).length === challenge.pairs.length
              ? { scale: 1.02 }
              : {}
          }
          whileTap={
            Object.keys(matches).length === challenge.pairs.length
              ? { scale: 0.98 }
              : {}
          }
          className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${
            Object.keys(matches).length === challenge.pairs.length
              ? 'bg-gradient-to-r from-teal-500 to-green-500 hover:shadow-2xl hover:shadow-teal-500/50'
              : 'bg-white/10 cursor-not-allowed opacity-50'
          }`}
        >
          Submit Matches
        </motion.button>
      )}

      {/* Result */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`p-6 rounded-2xl text-center ${
              correctCount === challenge.pairs.length
                ? 'bg-green-500/20 border-2 border-green-500'
                : 'bg-orange-500/20 border-2 border-orange-500'
            }`}
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 10 }}
              className="text-6xl mb-3"
            >
              {correctCount === challenge.pairs.length ? '🎉' : '📚'}
            </motion.div>
            <h3 className="text-2xl font-bold mb-2">
              {correctCount === challenge.pairs.length
                ? 'Perfect Match!'
                : 'Good Effort!'}
            </h3>
            <p className="text-lg">
              You matched {correctCount} / {challenge.pairs.length} correctly
            </p>
            {correctCount === challenge.pairs.length && (
              <p className="text-sm text-green-400 mt-2">
                You've mastered {challenge.category} concepts!
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ConceptMatch;
