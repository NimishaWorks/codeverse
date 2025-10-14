/**
 * @component CodingTerminal.jsx
 * @goal Redesign current CodeVerse coding terminal UI into LeetCode-style functional layout
 * while preserving CodeVerse theme and branding.
 * Keep dark theme, gradient buttons, rounded corners, and smooth transitions.
 * 
 * Layout:
 * - Left Panel (~40%): Problem statement with tabs (Description, Solutions, Submissions)
 * - Right Panel (~60%): Top - Monaco Editor (Run/Submit/Language bar), Bottom - Console/Test Cases
 * - Resizable panels (react-resizable-panels)
 * 
 * Maintain existing CodeVerse navbar, footer, and dark futuristic style.
 * No color scheme change — only structure and layout update.
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Editor from '@monaco-editor/react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { Play, Send, RotateCcw, X, Sparkles, Lightbulb, Check, XCircle, Clock, ChevronRight } from 'lucide-react';
import CameraOverlay from './CameraOverlay';
import TimerOverlay from './TimerOverlay';
import FloatingSettingsButton from './FloatingSettingsButton';
import SettingsPanel from './SettingsPanel';

export default function CodingTerminal() {
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState('# Write your code here\nprint("Hello, CodeVerse!")');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const editorRef = useRef(null);
  
  // Left panel tabs
  const [activeTab, setActiveTab] = useState('description');
  
  // Bottom panel tabs
  const [activeBottomTab, setActiveBottomTab] = useState('testcases');
  
  // New state for settings
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    camera: false,
    timer: false,
    tutorials: true
  });
  
  // Test results state
  const [testResults, setTestResults] = useState([]);

  // Problem data
  const problemData = {
    title: "Two Sum",
    difficulty: "Easy",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
      "-10⁹ ≤ target ≤ 10⁹",
      "Only one valid answer exists"
    ],
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
      }
    ]
  };

  const languages = [
    { id: 'python', name: 'Python', icon: '🐍', starter: '# Write your code here\nprint("Hello, CodeVerse!")' },
    { id: 'javascript', name: 'JavaScript', icon: '⚡', starter: '// Write your code here\nconsole.log("Hello, CodeVerse!");' },
    { id: 'java', name: 'Java', icon: '☕', starter: '// Write your code here\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, CodeVerse!");\n    }\n}' },
    { id: 'cpp', name: 'C++', icon: '⚙️', starter: '// Write your code here\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, CodeVerse!" << endl;\n    return 0;\n}' }
  ];

  const testCases = [
    { id: 1, input: 'nums = [2,7,11,15], target = 9', expected: '[0,1]', status: 'pending' },
    { id: 2, input: 'nums = [3,2,4], target = 6', expected: '[1,2]', status: 'pending' },
    { id: 3, input: 'nums = [3,3], target = 6', expected: '[0,1]', status: 'pending' }
  ];

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  const handleLanguageChange = (langId) => {
    setLanguage(langId);
    const lang = languages.find(l => l.id === langId);
    setCode(lang.starter);
    setOutput('');
  };

  const resetCode = () => {
    const lang = languages.find(l => l.id === language);
    setCode(lang.starter);
    setOutput('');
    setTestResults([]);
  };

  const runCode = () => {
    setIsRunning(true);
    setActiveBottomTab('console');
    setOutput('⏳ Executing code...\n');

    // Simulate code execution
    setTimeout(() => {
      try {
        if (language === 'python') {
          if (code.includes('print')) {
            const match = code.match(/print\((.*?)\)/);
            setOutput(`✅ Execution successful!\n\nOutput:\n${match ? eval(match[1]) : 'Hello, CodeVerse!'}`);
          } else {
            setOutput('✅ Code executed successfully!\n\nNo output to display.');
          }
        } else if (language === 'javascript') {
          if (code.includes('console.log')) {
            const match = code.match(/console\.log\((.*?)\)/);
            setOutput(`✅ Execution successful!\n\nOutput:\n${match ? eval(match[1]) : 'Hello, CodeVerse!'}`);
          } else {
            setOutput('✅ Code executed successfully!\n\nNo output to display.');
          }
        } else {
          setOutput('✅ Code compiled and executed successfully!\n\nOutput:\nHello, CodeVerse!');
        }
      } catch (error) {
        setOutput(`❌ Runtime Error:\n${error.message}`);
      }
      setIsRunning(false);
    }, 1500);
  };

  const submitCode = () => {
    setIsSubmitting(true);
    setActiveBottomTab('testcases');
    
    // Simulate running all test cases
    setTimeout(() => {
      const results = testCases.map((tc, index) => ({
        ...tc,
        status: Math.random() > 0.3 ? 'passed' : 'failed',
        runtime: `${Math.floor(Math.random() * 100)}ms`,
        memory: `${(Math.random() * 10 + 5).toFixed(1)}MB`
      }));
      setTestResults(results);
      setIsSubmitting(false);
    }, 2000);
  };

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        runCode();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        submitCode();
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [code, language]);

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      {/* Camera Overlay */}
      <CameraOverlay 
        isVisible={settings.camera} 
        onClose={() => toggleSetting('camera')} 
      />
      
      {/* Timer Overlay */}
      <TimerOverlay 
        isVisible={settings.timer} 
        duration={30} 
      />
      
      {/* Settings Button */}
      <FloatingSettingsButton onClick={() => setShowSettings(true)} />
      
      {/* Settings Panel */}
      <SettingsPanel
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        settings={settings}
        onToggle={toggleSetting}
      />

      {/* Main LeetCode-style Layout */}
      <div className="flex-1 overflow-hidden">
        <PanelGroup direction="horizontal" className="h-full">
          {/* LEFT PANEL - Problem Statement */}
          <Panel defaultSize={40} minSize={30} maxSize={60}>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="h-full bg-gray-900/50 backdrop-blur-sm border-r border-purple-500/30"
            >
              {/* Tab Header */}
              <div className="flex border-b border-gray-700/50 bg-gray-800/30">
                {['description', 'solutions', 'submissions'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 text-sm font-medium capitalize transition-all relative ${
                      activeTab === tab
                        ? 'text-purple-400'
                        : 'text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Scrollable Content */}
              <div className="h-[calc(100%-3rem)] overflow-y-auto p-6 space-y-6 custom-scrollbar">
                <AnimatePresence mode="wait">
                  {activeTab === 'description' && (
                    <motion.div
                      key="description"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6"
                    >
                      {/* Problem Title */}
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h1 className="text-2xl font-bold text-white">{problemData.title}</h1>
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400 border border-green-500/30">
                            {problemData.difficulty}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700/50">
                        <p className="text-gray-300 leading-relaxed">{problemData.description}</p>
                      </div>

                      {/* Examples */}
                      {problemData.examples.map((example, index) => (
                        <div key={index} className="bg-gray-800/50 rounded-xl p-5 border border-gray-700/50">
                          <h3 className="text-sm font-semibold text-purple-400 mb-3">Example {index + 1}:</h3>
                          <div className="space-y-2 font-mono text-sm">
                            <div>
                              <span className="text-gray-400">Input:</span>
                              <div className="bg-black/50 rounded p-2 mt-1 text-blue-400">{example.input}</div>
                            </div>
                            <div>
                              <span className="text-gray-400">Output:</span>
                              <div className="bg-black/50 rounded p-2 mt-1 text-green-400">{example.output}</div>
                            </div>
                            <div>
                              <span className="text-gray-400">Explanation:</span>
                              <p className="text-gray-300 mt-1">{example.explanation}</p>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Constraints */}
                      <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700/50">
                        <h3 className="text-sm font-semibold text-purple-400 mb-3">Constraints:</h3>
                        <ul className="space-y-1 text-sm text-gray-300">
                          {problemData.constraints.map((constraint, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <ChevronRight size={14} className="text-purple-400" />
                              <code className="font-mono">{constraint}</code>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 px-4 py-2.5 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-400 font-medium text-sm hover:from-blue-500/30 hover:to-purple-500/30 transition-all flex items-center justify-center gap-2"
                        >
                          <Lightbulb size={16} />
                          Show Hint
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 px-4 py-2.5 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-400 font-medium text-sm hover:from-purple-500/30 hover:to-pink-500/30 transition-all flex items-center justify-center gap-2"
                        >
                          <Sparkles size={16} />
                          Ask Tuto AI
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'solutions' && (
                    <motion.div
                      key="solutions"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-center py-12"
                    >
                      <div className="text-6xl mb-4">🔒</div>
                      <h3 className="text-xl font-bold text-gray-300 mb-2">Solutions Locked</h3>
                      <p className="text-gray-400 text-sm">Submit your solution first to unlock community solutions!</p>
                    </motion.div>
                  )}

                  {activeTab === 'submissions' && (
                    <motion.div
                      key="submissions"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-center py-12"
                    >
                      <div className="text-6xl mb-4">📝</div>
                      <h3 className="text-xl font-bold text-gray-300 mb-2">No Submissions Yet</h3>
                      <p className="text-gray-400 text-sm">Your submission history will appear here</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </Panel>

          {/* RESIZE HANDLE */}
          <PanelResizeHandle className="w-1 bg-gradient-to-b from-purple-500/20 via-blue-500/20 to-purple-500/20 hover:from-purple-500/40 hover:via-blue-500/40 hover:to-purple-500/40 transition-all cursor-col-resize" />

          {/* RIGHT PANEL - Editor & Console */}
          <Panel defaultSize={60} minSize={40}>
            <PanelGroup direction="vertical">
              {/* TOP SECTION - Code Editor */}
              <Panel defaultSize={65} minSize={40}>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="h-full bg-gray-900/50 backdrop-blur-sm flex flex-col"
                >
                  {/* Editor Header */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700/50 bg-gray-800/30">
                    {/* Language Selector */}
                    <div className="flex items-center gap-2">
                      {languages.map((lang) => (
                        <button
                          key={lang.id}
                          onClick={() => handleLanguageChange(lang.id)}
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                            language === lang.id
                              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/20'
                              : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                          }`}
                        >
                          <span>{lang.icon}</span>
                          <span>{lang.name}</span>
                        </button>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={resetCode}
                        className="p-2 rounded-lg bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 transition-all"
                        title="Reset Code"
                      >
                        <RotateCcw size={18} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={runCode}
                        disabled={isRunning}
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-500/20"
                      >
                        <Play size={16} />
                        {isRunning ? 'Running...' : 'Run'}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={submitCode}
                        disabled={isSubmitting}
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/20"
                      >
                        <Send size={16} />
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                      </motion.button>
                    </div>
                  </div>

                  {/* Monaco Editor */}
                  <div className="flex-1 overflow-hidden">
                    <Editor
                      height="100%"
                      defaultLanguage={language}
                      language={language}
                      value={code}
                      onChange={(value) => setCode(value || '')}
                      onMount={handleEditorDidMount}
                      theme="vs-dark"
                      options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        lineNumbers: 'on',
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        tabSize: 4,
                        wordWrap: 'on',
                        fontFamily: "'Fira Code', 'Consolas', 'Monaco', monospace",
                        padding: { top: 16, bottom: 16 }
                      }}
                    />
                  </div>
                </motion.div>
              </Panel>

              {/* RESIZE HANDLE */}
              <PanelResizeHandle className="h-1 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 hover:from-purple-500/40 hover:via-blue-500/40 hover:to-purple-500/40 transition-all cursor-row-resize" />

              {/* BOTTOM SECTION - Console & Test Cases */}
              <Panel defaultSize={35} minSize={25}>
                <div className="h-full bg-gray-900/50 backdrop-blur-sm flex flex-col border-t border-gray-700/50">
                  {/* Bottom Tab Header */}
                  <div className="flex items-center justify-between border-b border-gray-700/50 bg-gray-800/30">
                    <div className="flex">
                      {['testcases', 'console'].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveBottomTab(tab)}
                          className={`px-6 py-3 text-sm font-medium capitalize transition-all relative ${
                            activeBottomTab === tab
                              ? 'text-purple-400'
                              : 'text-gray-400 hover:text-gray-200'
                          }`}
                        >
                          {tab === 'testcases' ? 'Test Cases' : 'Console'}
                          {activeBottomTab === tab && (
                            <motion.div
                              layoutId="activeBottomTab"
                              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"
                            />
                          )}
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 px-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setOutput('')}
                        className="p-1.5 rounded hover:bg-gray-700/50 text-gray-400 hover:text-gray-200 transition-all"
                        title="Clear Console"
                      >
                        <X size={16} />
                      </motion.button>
                    </div>
                  </div>

                  {/* Bottom Content */}
                  <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                    <AnimatePresence mode="wait">
                      {activeBottomTab === 'testcases' && (
                        <motion.div
                          key="testcases"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="space-y-3"
                        >
                          {(testResults.length > 0 ? testResults : testCases).map((test, index) => (
                            <div
                              key={test.id || index}
                              className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50 hover:border-purple-500/30 transition-all"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold text-sm text-white">Test Case {test.id || index + 1}</span>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
                                  test.status === 'passed' 
                                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                                    : test.status === 'failed'
                                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                    : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                                }`}>
                                  {test.status === 'passed' && <Check size={12} />}
                                  {test.status === 'failed' && <XCircle size={12} />}
                                  {test.status === 'pending' && <Clock size={12} />}
                                  {test.status === 'passed' ? 'Passed' : test.status === 'failed' ? 'Failed' : 'Pending'}
                                </span>
                              </div>
                              <div className="space-y-2 text-xs">
                                <div>
                                  <span className="text-gray-400">Input:</span>
                                  <div className="bg-black/50 rounded p-2 mt-1 text-blue-400 font-mono">{test.input}</div>
                                </div>
                                <div>
                                  <span className="text-gray-400">Expected:</span>
                                  <div className="bg-black/50 rounded p-2 mt-1 text-green-400 font-mono">{test.expected}</div>
                                </div>
                                {test.runtime && (
                                  <div className="flex gap-4 text-gray-400">
                                    <span>Runtime: {test.runtime}</span>
                                    <span>Memory: {test.memory}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )}

                      {activeBottomTab === 'console' && (
                        <motion.div
                          key="console"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="h-full"
                        >
                          <div className="bg-black/50 rounded-lg p-4 font-mono text-sm min-h-[200px] whitespace-pre-wrap text-gray-300">
                            {output || '> Run your code to see output...\n> Keyboard shortcuts:\n  • Ctrl+Enter - Run Code\n  • Ctrl+S - Submit Code'}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, rgba(147, 51, 234, 0.5), rgba(59, 130, 246, 0.5));
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, rgba(147, 51, 234, 0.7), rgba(59, 130, 246, 0.7));
        }
      `}</style>
    </div>
  );
}
