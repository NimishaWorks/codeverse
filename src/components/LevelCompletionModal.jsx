/**
 * @component LevelCompletionModal
 * Celebration pop-up with star shower animation
 * Shows XP earned, stars achieved, and appreciation message
 */

import React, { useEffect, useState } from 'react';
import './LevelCompletionModal.css';

const LevelCompletionModal = ({ 
  isOpen, 
  onClose, 
  levelNumber, 
  xpEarned = 100, 
  starsEarned = 2,
  totalXP = 800 
}) => {
  const [showStars, setShowStars] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowStars(true);
      // Auto-dismiss after 5 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      setShowStars(false);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const messages = [
    "Outstanding work! 🎉",
    "You're crushing it! 💪",
    "Brilliant progress! ⭐",
    "Keep up the momentum! 🚀",
    "Phenomenal achievement! 🏆"
  ];

  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  return (
    <>
      {/* Star Shower Animation */}
      {showStars && (
        <div className="star-shower">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="falling-star"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              ⭐
            </div>
          ))}
        </div>
      )}

      {/* Modal Overlay */}
      <div className="completion-overlay" onClick={onClose}>
        <div className="completion-modal" onClick={(e) => e.stopPropagation()}>
          {/* Success Badge */}
          <div className="success-badge">
            <div className="badge-ring"></div>
            <div className="badge-icon">🎓</div>
          </div>

          {/* Title */}
          <h1 className="completion-title">
            Level {levelNumber} Complete!
          </h1>

          {/* Message */}
          <p className="completion-message">{randomMessage}</p>

          {/* Stars Display */}
          <div className="stars-display">
            {[1, 2, 3].map((star) => (
              <span
                key={star}
                className={`star ${star <= starsEarned ? 'star-filled' : 'star-empty'}`}
                style={{ animationDelay: `${star * 0.2}s` }}
              >
                {star <= starsEarned ? '⭐' : '☆'}
              </span>
            ))}
          </div>

          {/* XP Counter */}
          <div className="xp-counter">
            <div className="xp-badge">
              <span className="xp-label">+{xpEarned} XP</span>
            </div>
            <p className="xp-total">Total XP: {totalXP}</p>
          </div>

          {/* Continue Button */}
          <button className="continue-btn" onClick={onClose}>
            Continue
            <span className="btn-arrow">→</span>
          </button>

          {/* Confetti Burst */}
          <div className="confetti-container">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="confetti"
                style={{
                  left: `${50 + (Math.random() - 0.5) * 60}%`,
                  backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7'][Math.floor(Math.random() * 5)],
                  animationDelay: `${Math.random() * 0.5}s`,
                  animationDuration: `${1 + Math.random()}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LevelCompletionModal;
