import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import CodingTerminal from './CodingTerminal';
import AIInterviewer from './AIInterviewer';
import AptitudeTests from './AptitudeTests';
import TutorialModal from './TutorialModal';
import ResumeBuilder from './ResumeBuilder';

/**
 * Interview Hub with 6 tabs:
 * 1. Interview Preparation (with Coding Terminal, AI Interviewer, Aptitude Tests)
 * 2. Resume / Portfolio / LinkedIn Builder
 * 3. ATS Score Checker
 * 4. Editor Knowledge
 * 5. Hackathon Awareness
 * 6. Internships
 */

const InterviewHub = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialType, setTutorialType] = useState(null);

  // Debug log
  console.log('InterviewHub rendering, activeTab:', activeTab);

  const tabs = [
    { id: 0, name: 'Interview Prep', icon: '💼' },
    { id: 1, name: 'Resume Builder', icon: '📄' },
    { id: 2, name: 'ATS Checker', icon: '✅' },
    { id: 3, name: 'Editor Skills', icon: '⚙️' },
    { id: 4, name: 'Hackathons', icon: '🏆' },
    { id: 5, name: 'Internships', icon: '🎯' }
  ];

  const openTutorial = (type) => {
    setTutorialType(type);
    setShowTutorial(true);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return <InterviewPrep />;
      case 1:
        return <ResumeBuilder />;
      case 2:
        return <ATSChecker />;
      case 3:
        return <EditorKnowledge onOpenTutorial={openTutorial} />;
      case 4:
        return <HackathonAwareness />;
      case 5:
        return <Internships />;
      default:
        return <InterviewPrep />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1020] via-[#101325] to-[#14182b] text-white">
      {/* Tutorial Modal */}
      {tutorialType && (
        <TutorialModal
          isOpen={showTutorial}
          onClose={() => setShowTutorial(false)}
          type={tutorialType}
        />
      )}
      
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-gray-400 hover:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </button>
          <h1 className="text-2xl font-bold">Interview & Career Hub 💼</h1>
          <div className="w-24"></div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                  : 'bg-gray-800/40 text-gray-400 hover:text-white border border-gray-700/50'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  );
};

// Tab Components
const InterviewPrep = () => {
  const [activeSubTab, setActiveSubTab] = useState('coding');

  const subTabs = [
    { id: 'coding', name: 'Coding Terminal', icon: '💻', component: <CodingTerminal /> },
    { id: 'interview', name: 'AI Mock Interview', icon: '🎤', component: <AIInterviewer /> },
    { id: 'aptitude', name: 'Aptitude Tests', icon: '🧮', component: <AptitudeTests /> }
  ];

  return (
    <div className="space-y-6">
      {/* Sub-tab Navigation */}
      <div className="flex gap-4 mb-6">
        {subTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeSubTab === tab.id
                ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                : 'bg-gray-800/40 text-gray-400 hover:text-white border border-gray-700/50'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.name}
          </button>
        ))}
      </div>

      {/* Sub-tab Content */}
      <motion.div
        key={activeSubTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {subTabs.find(tab => tab.id === activeSubTab)?.component}
      </motion.div>
    </div>
  );
};

// ResumeBuilder is now imported from separate component file

const ATSChecker = () => (
  <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8">
    <h2 className="text-3xl font-bold mb-4">ATS Score Checker ✅</h2>
    <p className="text-gray-400 mb-6">Upload your resume and get instant ATS feedback</p>
    
    <div className="border-2 border-dashed border-gray-600 rounded-2xl p-12 text-center mb-6 hover:border-primary transition-all cursor-pointer">
      <div className="text-6xl mb-4">📄</div>
      <p className="text-xl font-semibold mb-2">Drop your resume here</p>
      <p className="text-gray-400">or click to browse (PDF, DOCX)</p>
    </div>

    <div className="bg-gray-900/50 rounded-2xl p-6">
      <h3 className="text-xl font-bold mb-4">ATS Tips 💡</h3>
      <ul className="space-y-2 text-gray-400">
        <li>✓ Use standard section headings (Experience, Education, Skills)</li>
        <li>✓ Include relevant keywords from job description</li>
        <li>✓ Avoid tables, graphics, and fancy formatting</li>
        <li>✓ Use standard fonts (Arial, Calibri, Times New Roman)</li>
        <li>✓ Save as .docx or .pdf format</li>
      </ul>
    </div>
  </div>
);

const EditorKnowledge = ({ onOpenTutorial }) => (
  <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8">
    <h2 className="text-3xl font-bold mb-4">Editor Knowledge ⚙️</h2>
    <p className="text-gray-400 mb-6">Master development tools and version control</p>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <motion.div 
        className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-2xl p-6 hover:border-orange-500/50 transition-all"
        whileHover={{ scale: 1.02 }}
      >
        <h3 className="text-2xl font-bold mb-4">🐙 GitHub Essentials</h3>
        <ul className="space-y-3 text-gray-300">
          <li>• Git commands & workflow</li>
          <li>• Pull requests & code review</li>
          <li>• GitHub Actions & CI/CD</li>
          <li>• Open source contribution</li>
        </ul>
        <motion.button 
          onClick={() => onOpenTutorial('github')}
          className="mt-6 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Learning →
        </motion.button>
      </motion.div>
      <motion.div 
        className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-2xl p-6 hover:border-blue-500/50 transition-all"
        whileHover={{ scale: 1.02 }}
      >
        <h3 className="text-2xl font-bold mb-4">💻 VS Code Mastery</h3>
        <ul className="space-y-3 text-gray-300">
          <li>• Keyboard shortcuts</li>
          <li>• Extensions & themes</li>
          <li>• Debugging techniques</li>
          <li>• Productivity hacks</li>
        </ul>
        <motion.button 
          onClick={() => onOpenTutorial('vscode')}
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Explore Tutorials →
        </motion.button>
      </motion.div>
    </div>
  </div>
);

const HackathonAwareness = () => (
  <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8">
    <h2 className="text-3xl font-bold mb-4">Hackathon Awareness 🏆</h2>
    <p className="text-gray-400 mb-6">Discover and prepare for hackathons</p>
    
    <div className="bg-gray-900/50 rounded-2xl p-6 mb-6">
      <h3 className="text-xl font-bold mb-4">📚 Complete Guide</h3>
      <p className="text-gray-400 mb-4">Everything you need to know about participating in hackathons</p>
      <div className="space-y-3 text-gray-300">
        <div className="flex items-start gap-3">
          <span className="text-2xl">1️⃣</span>
          <div>
            <h4 className="font-semibold">Find Hackathons</h4>
            <p className="text-sm text-gray-400">Explore Devfolio, Unstop, MLH</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-2xl">2️⃣</span>
          <div>
            <h4 className="font-semibold">Form Your Team</h4>
            <p className="text-sm text-gray-400">2-4 members with diverse skills</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-2xl">3️⃣</span>
          <div>
            <h4 className="font-semibold">Brainstorm Ideas</h4>
            <p className="text-sm text-gray-400">Solve real problems creatively</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-2xl">4️⃣</span>
          <div>
            <h4 className="font-semibold">Build & Demo</h4>
            <p className="text-sm text-gray-400">Focus on MVP and presentation</p>
          </div>
        </div>
      </div>
    </div>

    <div className="flex gap-4">
      <a
        href="https://devfolio.co"
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
      >
        Browse Devfolio
      </a>
      <a
        href="https://unstop.com"
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
      >
        Visit Unstop
      </a>
    </div>
  </div>
);

const Internships = () => (
  <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8">
    <h2 className="text-3xl font-bold mb-4">Internship Guide 🎯</h2>
    <p className="text-gray-400 mb-6">Tips and tricks to land your dream internship</p>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gray-900/50 rounded-2xl p-6">
        <h3 className="text-xl font-bold mb-4">📍 Top Platforms</h3>
        <div className="space-y-3">
          <a href="https://internshala.com" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-800/50 rounded-xl hover:bg-gray-700/50 transition-all">
            <h4 className="font-semibold mb-1">Internshala</h4>
            <p className="text-sm text-gray-400">India's #1 internship platform</p>
          </a>
          <a href="https://linkedin.com/jobs" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-800/50 rounded-xl hover:bg-gray-700/50 transition-all">
            <h4 className="font-semibold mb-1">LinkedIn</h4>
            <p className="text-sm text-gray-400">Professional networking</p>
          </a>
          <a href="https://wellfound.com" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-800/50 rounded-xl hover:bg-gray-700/50 transition-all">
            <h4 className="font-semibold mb-1">Wellfound (AngelList)</h4>
            <p className="text-sm text-gray-400">Startup internships</p>
          </a>
        </div>
      </div>

      <div className="bg-gray-900/50 rounded-2xl p-6">
        <h3 className="text-xl font-bold mb-4">💡 Pro Tips</h3>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-2">
            <span>✓</span>
            <span>Apply early - deadlines fill up fast</span>
          </li>
          <li className="flex items-start gap-2">
            <span>✓</span>
            <span>Customize your resume for each application</span>
          </li>
          <li className="flex items-start gap-2">
            <span>✓</span>
            <span>Build a strong GitHub profile</span>
          </li>
          <li className="flex items-start gap-2">
            <span>✓</span>
            <span>Network with alumni and professionals</span>
          </li>
          <li className="flex items-start gap-2">
            <span>✓</span>
            <span>Prepare for technical assessments</span>
          </li>
          <li className="flex items-start gap-2">
            <span>✓</span>
            <span>Follow up after interviews</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default InterviewHub;
