import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

/**
 * @project CodeVerse
 * HomePage with staggered animation, typing effect for tagline, and feature cards with hover tilt
 */

const HomePage = () => {
  const navigate = useNavigate();
  const [typedText, setTypedText] = useState('');
  const fullText = 'Play • Learn • Code';

  // Typing effect
  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const features = [
    { icon: '🧩', title: 'Gamified Learning', desc: 'Learn by playing story-based simulations' },
    { icon: '🎯', title: 'Profile Building', desc: 'Auto-generated resume & portfolio' },
    { icon: '💬', title: 'Core Concepts', desc: 'DSA, OS, CN, COA, OOPs & more' },
    { icon: '🌐', title: 'Multimodal Learning', desc: 'Video, audio, quizzes, and games' },
    { icon: '🤖', title: 'AI Mentor "Tuto"', desc: 'Personalized guidance' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#070912] via-[#101325] to-[#1a1f3a] text-white overflow-hidden relative">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.03)_1px,transparent_0)] bg-[size:28px_28px] opacity-40" />
      <div className="absolute inset-0">
        <div className="absolute -top-32 -left-24 w-[420px] h-[420px] bg-primary/30 blur-3xl rounded-full" />
        <div className="absolute top-1/3 -right-24 w-[360px] h-[360px] bg-secondary/25 blur-3xl rounded-full" />
      </div>

      <motion.main
        className="relative z-10 max-w-7xl mx-auto px-6 py-20 flex flex-col gap-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Typing Effect Tagline */}
            <motion.span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 text-sm uppercase tracking-[0.4em] text-slate-200/80"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {typedText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
                className="inline-block w-0.5 h-4 bg-secondary ml-1"
              />
            </motion.span>

            {/* Staggered Letter Animation for Title */}
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
              {['Welcome to ', 'CodeVerse', ' — The Adventure-first CS Academy'].map((word, wordIndex) => (
                <motion.span
                  key={wordIndex}
                  className={wordIndex === 1 ? "bg-gradient-to-br from-white via-secondary to-primary bg-clip-text text-transparent" : "text-white"}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.3 + wordIndex * 0.2, 
                    duration: 0.8, 
                    ease: [0.22, 1, 0.36, 1] 
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
            <motion.p
              className="text-base sm:text-lg text-slate-200/80 leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Master algorithms, core CS, and interview prep with cinematic story arcs, adaptive quests, and your AI
              mentor Tuto guiding every step. Progress across immersive roadmaps, unlock outfits, and turn your skills
              into a world-class portfolio.
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-4"
              variants={itemVariants}
            >
              <motion.button
                onClick={() => navigate('/register')}
                className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full shadow-lg shadow-secondary/30 hover:shadow-2xl transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Journey
              </motion.button>
              <motion.button
                onClick={() => navigate('/login')}
                className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-full hover:bg-white/15 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                I already play
              </motion.button>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/10"
            >
              <div className="flex items-center gap-3 text-sm text-slate-200/70">
                <span className="text-xl">⭐</span>
                12+ master tracks
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-200/70">
                <span className="text-xl">🎮</span>
                Candy Crush inspired roadmaps
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-200/70">
                <span className="text-xl">🤖</span>
                Gemini powered mentorship
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-primary/30 via-transparent to-secondary/20 blur-3xl" />
            <div className="relative rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-2xl p-6 shadow-[0_40px_120px_-20px_rgba(23,35,84,0.8)]">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-secondary">Current Quest</p>
                  <h3 className="text-2xl font-semibold">DSA Adventure Map</h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-semibold">Level 5</span>
              </div>
              <div className="space-y-4">
                {["Arrays", "Recursion", "Linked Lists", "Trees"].map((topic, idx) => (
                  <div key={topic} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-2xl">
                      {idx === 0 ? '🧠' : idx === 1 ? '🌀' : idx === 2 ? '🔗' : '🌳'}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-200/80">Module {idx + 1}</p>
                      <p className="text-lg font-semibold">{topic}</p>
                    </div>
                    <div className="text-sm text-secondary font-semibold">{idx < 2 ? 'Completed' : 'Next'}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.section
          variants={itemVariants}
          className="relative"
        >
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-70" />
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Why learners love CodeVerse</h2>
            <p className="text-slate-200/70 text-base md:text-lg">
              Every module is crafted as a playable story. Unlock achievements, gain XP, and build a job-ready profile
              while you explore CS concepts with guided quests.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 1.2 + index * 0.15, 
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1]
                }}
                whileHover={{ 
                  translateY: -8,
                  scale: 1.02,
                  rotateX: 5,
                  rotateY: 5,
                }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={false}
                />
                <div className="relative flex flex-col gap-4">
                  <motion.div 
                    className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-3xl shadow-lg shadow-primary/30"
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-slate-200/70 leading-relaxed">{feature.desc}</p>
                  </div>
                  <motion.div 
                    className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-secondary"
                    initial={{ x: -10, opacity: 0 }}
                    whileHover={{ x: 0, opacity: 1 }}
                  >
                    <span>Explore</span>
                    <motion.span 
                      className="text-base"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </motion.main>
    </div>
  );
};

export default HomePage;
