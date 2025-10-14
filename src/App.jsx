import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import OnboardingQuiz from './components/OnboardingQuiz';
import Dashboard from './components/Dashboard';
import CourseRoadmap from './components/CourseRoadmap';
import LevelModule from './components/LevelModule';
import InterviewHub from './components/InterviewHub';
import PPTConverter from './components/PPTConverter';
import UserProfile from './components/UserProfile';
import DailyQuest from './components/DailyQuest';
import Leaderboard from './components/Leaderboard';
import GameHub from './components/GameHub';

// OS Games
import ProcessSchedulingGame from './components/games/OS/ProcessSchedulingGame';
import MemoryGame from './components/games/OS/MemoryGame';

/**
 * @project CodeVerse - Multi-Subject Gamified Learning Platform
 * Goal: Create AI-powered gamified learning platform with subject-specific roadmaps and games.
 * Subjects: DSA, OS, CN, COA, DBMS, OOPs, AI/ML, Cyber, Cloud
 * Features: Dynamic roadmaps, interactive games, AI mentor, adaptive learning
 */

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/onboarding" element={<OnboardingQuiz />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Dynamic Subject Roadmaps */}
        <Route path="/courses/:subject" element={<CourseRoadmap />} />
        <Route path="/courses/:subject/level/:levelId" element={<LevelModule />} />
        
        {/* Game Hub - Central Access Point */}
        <Route path="/games" element={<GameHub />} />
        
        {/* OS Games */}
        <Route path="/games/os/process-scheduling" element={<ProcessSchedulingGame />} />
        <Route path="/games/os/memory" element={<MemoryGame />} />
        
        {/* Other Routes */}
        <Route path="/interview-hub" element={<InterviewHub />} />
        <Route path="/ppt-converter" element={<PPTConverter />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/daily-quest" element={<DailyQuest />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
}

export default App;
