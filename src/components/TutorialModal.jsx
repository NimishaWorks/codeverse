import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, CheckCircle, Book } from 'lucide-react';

export default function TutorialModal({ isOpen, onClose, type }) {
  const [currentStep, setCurrentStep] = useState(0);

  // Early return if no type specified
  if (!type) return null;

  const githubTutorial = {
    title: '🐙 GitHub Essentials',
    color: 'from-orange-500 to-red-500',
    steps: [
      {
        title: 'Git Basics & Workflow',
        content: (
          <div className="space-y-4">
            <p className="text-gray-300">Master the fundamental Git commands for version control:</p>
            <div className="bg-gray-950 rounded-lg p-4 font-mono text-sm space-y-2">
              <div><span className="text-green-400">git init</span> <span className="text-gray-500"># Initialize a repository</span></div>
              <div><span className="text-green-400">git clone [url]</span> <span className="text-gray-500"># Clone a repository</span></div>
              <div><span className="text-green-400">git add .</span> <span className="text-gray-500"># Stage all changes</span></div>
              <div><span className="text-green-400">git commit -m "message"</span> <span className="text-gray-500"># Commit changes</span></div>
              <div><span className="text-green-400">git push origin main</span> <span className="text-gray-500"># Push to remote</span></div>
              <div><span className="text-green-400">git pull</span> <span className="text-gray-500"># Pull latest changes</span></div>
            </div>
            <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <p className="text-xs text-blue-300">💡 Tip: Always pull before you push to avoid merge conflicts!</p>
            </div>
          </div>
        )
      },
      {
        title: 'Branching & Merging',
        content: (
          <div className="space-y-4">
            <p className="text-gray-300">Work on features without affecting the main codebase:</p>
            <div className="bg-gray-950 rounded-lg p-4 font-mono text-sm space-y-2">
              <div><span className="text-green-400">git branch</span> <span className="text-gray-500"># List all branches</span></div>
              <div><span className="text-green-400">git branch feature-name</span> <span className="text-gray-500"># Create branch</span></div>
              <div><span className="text-green-400">git checkout feature-name</span> <span className="text-gray-500"># Switch branch</span></div>
              <div><span className="text-green-400">git checkout -b new-branch</span> <span className="text-gray-500"># Create & switch</span></div>
              <div><span className="text-green-400">git merge feature-name</span> <span className="text-gray-500"># Merge branch</span></div>
              <div><span className="text-green-400">git branch -d feature-name</span> <span className="text-gray-500"># Delete branch</span></div>
            </div>
            <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
              <p className="text-xs text-purple-300">✨ Best Practice: Name branches descriptively (e.g., feature/user-auth, fix/login-bug)</p>
            </div>
          </div>
        )
      },
      {
        title: 'Pull Requests & Code Review',
        content: (
          <div className="space-y-4">
            <p className="text-gray-300">Collaborate effectively with pull requests:</p>
            <ol className="space-y-3 text-gray-300 list-decimal list-inside">
              <li><strong className="text-white">Fork the repository</strong> - Create your own copy</li>
              <li><strong className="text-white">Create a branch</strong> - Work on your changes</li>
              <li><strong className="text-white">Make commits</strong> - Keep them small and focused</li>
              <li><strong className="text-white">Push to your fork</strong> - Upload your changes</li>
              <li><strong className="text-white">Open a PR</strong> - Request to merge your changes</li>
              <li><strong className="text-white">Address feedback</strong> - Make requested changes</li>
            </ol>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">PR Best Practices:</h4>
              <ul className="space-y-1 text-sm text-gray-400">
                <li>✓ Write clear, descriptive titles</li>
                <li>✓ Add detailed description of changes</li>
                <li>✓ Link related issues</li>
                <li>✓ Add screenshots if UI changes</li>
                <li>✓ Request specific reviewers</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        title: 'GitHub Actions & CI/CD',
        content: (
          <div className="space-y-4">
            <p className="text-gray-300">Automate testing and deployment with GitHub Actions:</p>
            <div className="bg-gray-950 rounded-lg p-4 font-mono text-xs space-y-2">
              <div className="text-gray-500"># .github/workflows/ci.yml</div>
              <div><span className="text-blue-400">name:</span> CI Pipeline</div>
              <div><span className="text-blue-400">on:</span> [push, pull_request]</div>
              <div><span className="text-blue-400">jobs:</span></div>
              <div className="pl-4"><span className="text-blue-400">build:</span></div>
              <div className="pl-8"><span className="text-blue-400">runs-on:</span> ubuntu-latest</div>
              <div className="pl-8"><span className="text-blue-400">steps:</span></div>
              <div className="pl-12">- <span className="text-blue-400">uses:</span> actions/checkout@v2</div>
              <div className="pl-12">- <span className="text-blue-400">name:</span> Run tests</div>
              <div className="pl-14"><span className="text-blue-400">run:</span> npm test</div>
            </div>
            <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
              <p className="text-xs text-green-300">🚀 Actions run automatically on push, ensuring code quality!</p>
            </div>
          </div>
        )
      },
      {
        title: 'Open Source Contribution',
        content: (
          <div className="space-y-4">
            <p className="text-gray-300">Start contributing to open source projects:</p>
            <div className="space-y-3">
              <div className="bg-gray-900/50 rounded-lg p-4">
                <h4 className="font-semibold text-orange-400 mb-2">1. Find Good First Issues</h4>
                <p className="text-sm text-gray-400">Look for labels like "good first issue", "beginner-friendly", "help wanted"</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <h4 className="font-semibold text-orange-400 mb-2">2. Read Contributing Guidelines</h4>
                <p className="text-sm text-gray-400">Check CONTRIBUTING.md and CODE_OF_CONDUCT.md files</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <h4 className="font-semibold text-orange-400 mb-2">3. Set Up Development Environment</h4>
                <p className="text-sm text-gray-400">Follow the project's setup instructions carefully</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <h4 className="font-semibold text-orange-400 mb-2">4. Submit Your First PR</h4>
                <p className="text-sm text-gray-400">Start small - fix typos, improve docs, add tests</p>
              </div>
            </div>
            <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <p className="text-xs text-yellow-300">⭐ Tip: Star repos you like and follow active contributors!</p>
            </div>
          </div>
        )
      }
    ]
  };

  const vscodeTutorial = {
    title: '💻 VS Code Mastery',
    color: 'from-blue-500 to-cyan-500',
    steps: [
      {
        title: 'Essential Keyboard Shortcuts',
        content: (
          <div className="space-y-4">
            <p className="text-gray-300">Boost productivity with these shortcuts:</p>
            <div className="grid grid-cols-1 gap-2">
              <div className="flex justify-between items-center bg-gray-900/50 rounded-lg p-3">
                <span className="text-gray-300">Command Palette</span>
                <kbd className="px-2 py-1 bg-gray-800 rounded text-xs font-mono text-blue-400">Ctrl+Shift+P</kbd>
              </div>
              <div className="flex justify-between items-center bg-gray-900/50 rounded-lg p-3">
                <span className="text-gray-300">Quick Open File</span>
                <kbd className="px-2 py-1 bg-gray-800 rounded text-xs font-mono text-blue-400">Ctrl+P</kbd>
              </div>
              <div className="flex justify-between items-center bg-gray-900/50 rounded-lg p-3">
                <span className="text-gray-300">Toggle Terminal</span>
                <kbd className="px-2 py-1 bg-gray-800 rounded text-xs font-mono text-blue-400">Ctrl+`</kbd>
              </div>
              <div className="flex justify-between items-center bg-gray-900/50 rounded-lg p-3">
                <span className="text-gray-300">Multi-Cursor</span>
                <kbd className="px-2 py-1 bg-gray-800 rounded text-xs font-mono text-blue-400">Ctrl+Alt+↓/↑</kbd>
              </div>
              <div className="flex justify-between items-center bg-gray-900/50 rounded-lg p-3">
                <span className="text-gray-300">Find & Replace</span>
                <kbd className="px-2 py-1 bg-gray-800 rounded text-xs font-mono text-blue-400">Ctrl+H</kbd>
              </div>
              <div className="flex justify-between items-center bg-gray-900/50 rounded-lg p-3">
                <span className="text-gray-300">Go to Line</span>
                <kbd className="px-2 py-1 bg-gray-800 rounded text-xs font-mono text-blue-400">Ctrl+G</kbd>
              </div>
            </div>
          </div>
        )
      },
      {
        title: 'Must-Have Extensions',
        content: (
          <div className="space-y-4">
            <p className="text-gray-300">Top extensions for every developer:</p>
            <div className="space-y-3">
              <div className="bg-gray-900/50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-400 mb-1">🎨 Prettier</h4>
                <p className="text-sm text-gray-400">Code formatter for consistent style</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-400 mb-1">🔍 ESLint</h4>
                <p className="text-sm text-gray-400">JavaScript linter for code quality</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-400 mb-1">🎯 Live Server</h4>
                <p className="text-sm text-gray-400">Launch local dev server with live reload</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-400 mb-1">🐙 GitLens</h4>
                <p className="text-sm text-gray-400">Supercharge Git capabilities</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-400 mb-1">🤖 GitHub Copilot</h4>
                <p className="text-sm text-gray-400">AI pair programmer</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-400 mb-1">📦 Path Intellisense</h4>
                <p className="text-sm text-gray-400">Autocomplete file paths</p>
              </div>
            </div>
          </div>
        )
      },
      {
        title: 'Debugging Like a Pro',
        content: (
          <div className="space-y-4">
            <p className="text-gray-300">Master the VS Code debugger:</p>
            <ol className="space-y-3 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold">1.</span>
                <div>
                  <strong className="text-white">Set Breakpoints</strong>
                  <p className="text-sm text-gray-400">Click left of line number (red dot appears)</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold">2.</span>
                <div>
                  <strong className="text-white">Start Debugging</strong>
                  <p className="text-sm text-gray-400">Press F5 or click Run → Start Debugging</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold">3.</span>
                <div>
                  <strong className="text-white">Step Through Code</strong>
                  <p className="text-sm text-gray-400">F10 (step over), F11 (step into), Shift+F11 (step out)</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold">4.</span>
                <div>
                  <strong className="text-white">Inspect Variables</strong>
                  <p className="text-sm text-gray-400">Hover over variables or check Variables panel</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold">5.</span>
                <div>
                  <strong className="text-white">Watch Expressions</strong>
                  <p className="text-sm text-gray-400">Add expressions to Watch panel to monitor values</p>
                </div>
              </li>
            </ol>
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-xs text-red-300">🐛 Pro Tip: Use console.log() sparingly - debugger is more powerful!</p>
            </div>
          </div>
        )
      },
      {
        title: 'Integrated Terminal Power',
        content: (
          <div className="space-y-4">
            <p className="text-gray-300">Maximize terminal efficiency:</p>
            <div className="space-y-3">
              <div className="bg-gray-900/50 rounded-lg p-4">
                <h4 className="font-semibold text-cyan-400 mb-2">Multiple Terminals</h4>
                <p className="text-sm text-gray-400 mb-2">Run multiple shells simultaneously</p>
                <kbd className="px-2 py-1 bg-gray-800 rounded text-xs font-mono text-cyan-400">Ctrl+Shift+`</kbd>
                <span className="text-gray-500 text-xs ml-2">New Terminal</span>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <h4 className="font-semibold text-cyan-400 mb-2">Split Terminals</h4>
                <p className="text-sm text-gray-400">View multiple terminals side-by-side</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <h4 className="font-semibold text-cyan-400 mb-2">Terminal Profiles</h4>
                <p className="text-sm text-gray-400">Customize shells (bash, PowerShell, Git Bash, etc.)</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <h4 className="font-semibold text-cyan-400 mb-2">Task Runner</h4>
                <p className="text-sm text-gray-400">Automate build and test commands via tasks.json</p>
              </div>
            </div>
            <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
              <p className="text-xs text-cyan-300">💡 Tip: Right-click terminal tab for rename and color options!</p>
            </div>
          </div>
        )
      },
      {
        title: 'Productivity Hacks',
        content: (
          <div className="space-y-4">
            <p className="text-gray-300">Advanced tips for maximum efficiency:</p>
            <div className="space-y-3">
              <div className="bg-gray-900/50 rounded-lg p-3">
                <h4 className="font-semibold text-green-400 mb-1">⚡ Zen Mode</h4>
                <p className="text-xs text-gray-400">Distraction-free coding: <kbd className="px-1 py-0.5 bg-gray-800 rounded text-xs">Ctrl+K Z</kbd></p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-3">
                <h4 className="font-semibold text-green-400 mb-1">📋 Snippets</h4>
                <p className="text-xs text-gray-400">Create custom code snippets for repetitive code</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-3">
                <h4 className="font-semibold text-green-400 mb-1">🔄 Emmet</h4>
                <p className="text-xs text-gray-400">HTML abbreviations: <code className="text-blue-400">div.container*3</code> → 3 divs!</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-3">
                <h4 className="font-semibold text-green-400 mb-1">🎨 Theme Switcher</h4>
                <p className="text-xs text-gray-400">Toggle between light/dark: <kbd className="px-1 py-0.5 bg-gray-800 rounded text-xs">Ctrl+K Ctrl+T</kbd></p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-3">
                <h4 className="font-semibold text-green-400 mb-1">🔍 IntelliSense</h4>
                <p className="text-xs text-gray-400">Smart autocomplete: <kbd className="px-1 py-0.5 bg-gray-800 rounded text-xs">Ctrl+Space</kbd></p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-3">
                <h4 className="font-semibold text-green-400 mb-1">📝 Settings Sync</h4>
                <p className="text-xs text-gray-400">Sync settings across devices with GitHub account</p>
              </div>
            </div>
          </div>
        )
      }
    ]
  };

  const tutorial = type === 'github' ? githubTutorial : vscodeTutorial;

  const nextStep = () => {
    if (currentStep < tutorial.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    setCurrentStep(0);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-gray-900/95 backdrop-blur-xl border-2 border-purple-500/50 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className={`bg-gradient-to-r ${tutorial.color} p-6 relative`}>
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-3xl font-bold text-white mb-2">{tutorial.title}</h2>
            <div className="flex items-center gap-2 text-white/90">
              <Book className="w-5 h-5" />
              <span className="text-sm">Interactive Tutorial • {tutorial.steps.length} Steps</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-gray-800 h-2">
            <motion.div
              className={`h-full bg-gradient-to-r ${tutorial.color}`}
              initial={{ width: '0%' }}
              animate={{ width: `${((currentStep + 1) / tutorial.steps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Content */}
          <div className="p-8 overflow-y-auto max-h-[calc(90vh-250px)]">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className={`w-8 h-8 rounded-full bg-gradient-to-r ${tutorial.color} flex items-center justify-center text-sm font-bold`}>
                  {currentStep + 1}
                </span>
                {tutorial.steps[currentStep].title}
              </h3>
              <div className="text-gray-300">
                {tutorial.steps[currentStep].content}
              </div>
            </motion.div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-800 p-6 bg-gray-900/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {tutorial.steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentStep
                        ? 'bg-purple-500 w-6'
                        : index < currentStep
                        ? 'bg-green-500'
                        : 'bg-gray-700'
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-3">
                <motion.button
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg font-medium disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
                  whileHover={{ scale: currentStep === 0 ? 1 : 1.05 }}
                  whileTap={{ scale: currentStep === 0 ? 1 : 0.95 }}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </motion.button>
                {currentStep < tutorial.steps.length - 1 ? (
                  <motion.button
                    onClick={nextStep}
                    className={`px-4 py-2 bg-gradient-to-r ${tutorial.color} text-white rounded-lg font-medium flex items-center gap-2`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={handleClose}
                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <CheckCircle className="w-4 h-4" />
                    Complete
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
}
