import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Editor from '@monaco-editor/react';
import CameraOverlay from './CameraOverlay';
import TimerOverlay from './TimerOverlay';
import FloatingSettingsButton from './FloatingSettingsButton';
import SettingsPanel from './SettingsPanel';

export default function CodingTerminal() {
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState('# Write your code here\nprint("Hello, CodeVerse!")');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const editorRef = useRef(null);
  
  // New state for settings
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    camera: false,
    timer: false,
    tutorials: true
  });

  const languages = [
    { id: 'python', name: 'Python', icon: '🐍', starter: '# Write your code here\nprint("Hello, CodeVerse!")' },
    { id: 'javascript', name: 'JavaScript', icon: '⚡', starter: '// Write your code here\nconsole.log("Hello, CodeVerse!");' },
    { id: 'java', name: 'Java', icon: '☕', starter: '// Write your code here\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, CodeVerse!");\n    }\n}' },
    { id: 'cpp', name: 'C++', icon: '⚙️', starter: '// Write your code here\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, CodeVerse!" << endl;\n    return 0;\n}' }
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

  const runCode = () => {
    setIsRunning(true);
    setOutput('⏳ Executing code...\n');

    // Simulate code execution (In production, use a code execution API like Judge0 or Piston)
    setTimeout(() => {
      try {
        // This is a simulation. Real execution requires backend API.
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

  const testCases = [
    { input: 'Test Case 1', expected: 'Expected output...', status: 'pending' },
    { input: 'Test Case 2', expected: 'Expected output...', status: 'pending' },
    { input: 'Test Case 3', expected: 'Expected output...', status: 'pending' }
  ];

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-7xl mx-auto">
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
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Editor Section */}
        <div className="lg:col-span-2 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-blue-400">Code Editor</h2>
            <div className="flex gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => handleLanguageChange(lang.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    language === lang.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <span className="mr-2">{lang.icon}</span>
                  {lang.name}
                </button>
              ))}
            </div>
          </div>

          {/* Monaco Editor */}
          <div className="rounded-lg overflow-hidden border border-gray-700 mb-4">
            <Editor
              height="500px"
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
                wordWrap: 'on'
              }}
            />
          </div>

          {/* Run Button */}
          <motion.button
            onClick={runCode}
            disabled={isRunning}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isRunning ? (
              <>
                <span className="animate-spin">⏳</span>
                Running...
              </>
            ) : (
              <>
                <span>▶️</span>
                Run Code
              </>
            )}
          </motion.button>
        </div>

        {/* Output & Test Cases Section */}
        <div className="space-y-6">
          {/* Output Console */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
            <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
              <span>📊</span> Output Console
            </h3>
            <div className="bg-black/50 rounded-lg p-4 font-mono text-sm min-h-[200px] whitespace-pre-wrap">
              {output || 'Run your code to see output...'}
            </div>
          </div>

          {/* Test Cases */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
            <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
              <span>🧪</span> Test Cases
            </h3>
            <div className="space-y-3">
              {testCases.map((test, index) => (
                <div key={index} className="bg-black/30 rounded-lg p-3 border border-gray-700">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-sm">{test.input}</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      test.status === 'passed' ? 'bg-green-500/20 text-green-400' :
                      test.status === 'failed' ? 'bg-red-500/20 text-red-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {test.status === 'passed' ? '✅ Passed' :
                       test.status === 'failed' ? '❌ Failed' :
                       '⏸️ Pending'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">{test.expected}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Tips */}
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-4 border border-blue-500/30">
            <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
              <span>💡</span> Quick Tips
            </h4>
            <ul className="text-xs text-gray-300 space-y-1">
              <li>• Use Ctrl+Space for autocomplete</li>
              <li>• Press Ctrl+/ to comment/uncomment</li>
              <li>• Test edge cases for robust code</li>
              <li>• Optimize for time complexity</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
