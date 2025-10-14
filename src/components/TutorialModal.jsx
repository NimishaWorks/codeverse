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
        title: 'Welcome to the Game World! 🎮',
        content: (
          <div className="space-y-4">
            <p className="text-lg font-semibold text-orange-400">Think of GitHub like a multiplayer video game for coding projects!</p>
            
            <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-5">
              <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-2xl">🌍</span> The Game World (Repository)
              </h4>
              <p className="text-gray-300 mb-2">
                A <strong className="text-orange-400">repository</strong> (or "repo") is like the main project folder - it's the entire game world where your project lives!
              </p>
              <p className="text-gray-400 text-sm">
                Just like a game has maps, characters, and items all stored in one place, your repository has all your code files, images, and documentation in one central location.
              </p>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4">
              <p className="text-sm text-gray-300">
                🎯 <strong className="text-white">Example:</strong> When you create a website project, your GitHub repository holds all the HTML, CSS, JavaScript files, and images - everything needed to make the website work!
              </p>
            </div>

            <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <p className="text-xs text-blue-300">💡 No more project_final.docx, project_final_v2.docx, project_FINAL_FINAL.docx chaos!</p>
            </div>
          </div>
        )
      },
      {
        title: 'Saving Your Progress 💾',
        content: (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-5">
              <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-2xl">📸</span> Commits = Save Points
              </h4>
              <p className="text-gray-300 mb-3">
                A <strong className="text-orange-400">commit</strong> is like taking a snapshot or saving your game progress at a specific point!
              </p>
              <p className="text-gray-400 text-sm mb-3">
                Just like in video games where you save before a boss fight (so you can try again if you lose), commits let you save your code at working points.
              </p>
              <p className="text-green-400 text-sm font-medium">
                ✨ Made a mistake later? No problem! You can always go back to a previous save point (commit) and try a different approach!
              </p>
            </div>

            <div className="bg-gray-950 rounded-lg p-4 space-y-3">
              <div className="font-semibold text-white mb-2">How to Save Your Progress:</div>
              <div className="font-mono text-sm space-y-2">
                <div><span className="text-green-400">git add .</span> <span className="text-gray-500"># Select what to save</span></div>
                <div><span className="text-green-400">git commit -m "Added login feature"</span> <span className="text-gray-500"># Save with a note</span></div>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                The message after -m is like writing "Saved before fighting dragon" - it helps you remember what you did at this save point!
              </p>
            </div>

            <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
              <p className="text-xs text-purple-300">🎮 Pro tip: Save (commit) often! It's better to have many save points than to lose hours of work.</p>
            </div>
          </div>
        )
      },
      {
        title: 'Playing with Friends 👥',
        content: (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-5">
              <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-2xl">🤝</span> Multiplayer Collaboration
              </h4>
              <p className="text-gray-300 mb-3">
                GitHub lets you and your friends work on the same project from your own computers - like a multiplayer game where everyone plays together!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 rounded-lg p-4">
                <div className="text-2xl mb-2">⬆️</div>
                <h5 className="font-semibold text-orange-400 mb-2">Pushing (Upload)</h5>
                <p className="text-sm text-gray-300">
                  <strong className="text-white">Push</strong> = uploading your saved progress to the main game server (GitHub)
                </p>
                <div className="mt-2 font-mono text-xs bg-gray-950 p-2 rounded">
                  <span className="text-green-400">git push origin main</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Now everyone can see your changes!
                </p>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-4">
                <div className="text-2xl mb-2">⬇️</div>
                <h5 className="font-semibold text-blue-400 mb-2">Pulling (Download)</h5>
                <p className="text-sm text-gray-300">
                  <strong className="text-white">Pull</strong> = downloading your friends' latest progress from the server
                </p>
                <div className="mt-2 font-mono text-xs bg-gray-950 p-2 rounded">
                  <span className="text-green-400">git pull</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Stay updated with everyone's work!
                </p>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4">
              <p className="text-sm text-gray-300">
                <span className="text-2xl mr-2">💡</span>
                <strong className="text-white">The Flow:</strong> You work on your computer → Save your progress (commit) → Upload it (push) → Friends download it (pull) → They make their changes → Upload theirs → You download their updates!
              </p>
            </div>

            <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
              <p className="text-xs text-green-300">✨ Everyone stays in sync without emailing files back and forth or creating confusing copies!</p>
            </div>
          </div>
        )
      },
      {
        title: 'The Main Goal 🎯',
        content: (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-5">
              <h4 className="font-bold text-white mb-3 text-xl">Why GitHub is Amazing</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📝</span>
                  <div>
                    <p className="font-semibold text-orange-400">Track Every Change</p>
                    <p className="text-sm text-gray-300">See who changed what, when, and why. Like a time machine for your code!</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-2xl">↩️</span>
                  <div>
                    <p className="font-semibold text-blue-400">Fix Mistakes Easily</p>
                    <p className="text-sm text-gray-300">Broke something? Go back to any previous save point. No stress!</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-2xl">👥</span>
                  <div>
                    <p className="font-semibold text-green-400">Work Together Smoothly</p>
                    <p className="text-sm text-gray-300">Multiple people can work on the same project without creating a confusing mess.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-2xl">🚫</span>
                  <div>
                    <p className="font-semibold text-red-400">No More File Chaos</p>
                    <p className="text-sm text-gray-300">Say goodbye to project_final.docx, project_final_v2.docx, project_REAL_final.docx!</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4">
              <p className="text-sm text-gray-300 mb-3">
                <strong className="text-white text-lg">⚡ Real-World Example:</strong>
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Imagine you and 3 friends are building a website. Without GitHub, you'd email files back and forth, someone would overwrite someone else's work, and you'd have 10 different versions with no idea which is the latest. 
              </p>
              <p className="text-green-400 text-sm mt-2 leading-relaxed">
                With GitHub, everyone works on their own copy, saves their progress, and uploads it. The "game server" (GitHub) keeps everything organized, and you can see exactly what changed. It's magical! ✨
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-4">
              <p className="font-semibold text-white mb-2">🎓 You're Ready to Start!</p>
              <p className="text-sm text-gray-300">
                GitHub might seem complicated at first, but remember: it's just a save system for your code that lets you collaborate with friends. Start with simple projects, practice saving (committing) and uploading (pushing), and you'll be a pro in no time!
              </p>
            </div>

            <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <p className="text-xs text-yellow-300">🌟 Fun fact: Over 100 million developers use GitHub! You're joining the world's largest coding community!</p>
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
        title: 'Your Superhero Suit 🦸‍♂️',
        content: (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-5">
              <h4 className="font-bold text-white mb-3 text-xl flex items-center gap-2">
                <span className="text-3xl">🦸</span>
                Think of VS Code as Your Coding Suit!
              </h4>
              <p className="text-gray-300 leading-relaxed">
                Just like a superhero needs a powerful suit to fight crime, you need <strong className="text-blue-400">VS Code</strong> to write amazing code! 
                This isn't just a text editor – it's your personal coding headquarters with superpowers built-in.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 rounded-lg p-4">
                <div className="text-3xl mb-2">⚡</div>
                <h5 className="font-semibold text-blue-400 mb-2">Lightning-Fast Reflexes</h5>
                <p className="text-sm text-gray-300">
                  <strong className="text-white">Keyboard shortcuts</strong> = instant reactions. Why click around with your mouse when you can press a button combo and instantly deploy your command?
                </p>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-4">
                <div className="text-3xl mb-2">🎨</div>
                <h5 className="font-semibold text-cyan-400 mb-2">Customize Your Look</h5>
                <p className="text-sm text-gray-300">
                  <strong className="text-white">Themes</strong> = suit color schemes! Want a dark, sleek look? Or bright and colorful? Your choice! Make your coding space feel like home.
                </p>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-4">
                <div className="text-3xl mb-2">🔧</div>
                <h5 className="font-semibold text-green-400 mb-2">Modular Upgrades</h5>
                <p className="text-sm text-gray-300">
                  <strong className="text-white">Extensions</strong> = gadgets and tools you can attach to your suit! Need Python support? Snap it on! Want prettier code? Add that gadget!
                </p>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-4">
                <div className="text-3xl mb-2">🔍</div>
                <h5 className="font-semibold text-purple-400 mb-2">X-Ray Vision</h5>
                <p className="text-sm text-gray-300">
                  <strong className="text-white">Debugging</strong> = your diagnostic scanner! See exactly what's wrong with your code and fix it instantly. No guessing!
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-4">
              <p className="font-semibold text-white mb-2">🎯 The Mission</p>
              <p className="text-sm text-gray-300">
                Your job is to master this suit! The better you know your tools, the faster you can code, the fewer bugs you'll have, and the more fun you'll have building awesome projects. Let's unlock these superpowers! 💪
              </p>
            </div>
          </div>
        )
      },
      {
        title: 'Built-In Reflexes ⚡',
        content: (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-5">
              <h4 className="font-bold text-white mb-3 text-xl">Keyboard Shortcuts = Your Quick-Fire Commands</h4>
              <p className="text-gray-300 mb-2">
                Imagine pressing a button on your suit and <span className="text-blue-400 font-semibold">BOOM</span> – instant action! 
                That's what keyboard shortcuts do. No more hunting through menus!
              </p>
            </div>

            <div className="space-y-3">
              <div className="bg-gray-900/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🎯</span>
                    <h5 className="font-semibold text-white">Command Palette</h5>
                  </div>
                  <kbd className="px-3 py-1.5 bg-gray-800 rounded text-sm font-mono text-blue-400 border border-blue-500/30">Ctrl+Shift+P</kbd>
                </div>
                <p className="text-sm text-gray-400">
                  Opens your <strong className="text-blue-400">control center</strong>! Every command VS Code has, right at your fingertips. Type what you want, hit Enter. Done! 🚀
                </p>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">📂</span>
                    <h5 className="font-semibold text-white">Quick File Finder</h5>
                  </div>
                  <kbd className="px-3 py-1.5 bg-gray-800 rounded text-sm font-mono text-blue-400 border border-blue-500/30">Ctrl+P</kbd>
                </div>
                <p className="text-sm text-gray-400">
                  Jump to any file instantly! Type the filename and <strong className="text-green-400">teleport</strong> there. No clicking through folders!
                </p>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">💻</span>
                    <h5 className="font-semibold text-white">Toggle Terminal</h5>
                  </div>
                  <kbd className="px-3 py-1.5 bg-gray-800 rounded text-sm font-mono text-blue-400 border border-blue-500/30">Ctrl+`</kbd>
                </div>
                <p className="text-sm text-gray-400">
                  Show/hide the <strong className="text-cyan-400">command terminal</strong>. Run your code without leaving VS Code!
                </p>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">✍️</span>
                    <h5 className="font-semibold text-white">Multi-Cursor Magic</h5>
                  </div>
                  <kbd className="px-3 py-1.5 bg-gray-800 rounded text-sm font-mono text-blue-400 border border-blue-500/30">Ctrl+Alt+↓/↑</kbd>
                </div>
                <p className="text-sm text-gray-400">
                  Edit <strong className="text-purple-400">multiple lines at once</strong>! Like having multiple hands typing simultaneously. Mind = blown! 🤯
                </p>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🔍</span>
                    <h5 className="font-semibold text-white">Find & Replace</h5>
                  </div>
                  <kbd className="px-3 py-1.5 bg-gray-800 rounded text-sm font-mono text-blue-400 border border-blue-500/30">Ctrl+H</kbd>
                </div>
                <p className="text-sm text-gray-400">
                  Find any word and replace it everywhere in seconds. Change "oldName" to "newName" in 100 places? Easy! ✨
                </p>
              </div>
            </div>

            <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <p className="text-xs text-yellow-300">💡 <strong>Pro Tip:</strong> Spend 5 minutes learning shortcuts = save 5 hours later! Your future self will thank you!</p>
            </div>
          </div>
        )
      },
      {
        title: 'Modular Upgrades 🔧',
        content: (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-5">
              <h4 className="font-bold text-white mb-3 text-xl">Extensions & Themes = Your Gadget Collection</h4>
              <p className="text-gray-300">
                Your suit comes <strong className="text-blue-400">basic</strong>, but you can add <strong className="text-cyan-400">powerful gadgets</strong> to make it way cooler! 
                Extensions are like snap-on tools that give you superpowers for specific tasks.
              </p>
            </div>

            <div className="space-y-3">
              <div className="bg-gray-900/50 rounded-lg p-4">
                <h5 className="font-semibold text-purple-400 mb-2 flex items-center gap-2">
                  <span className="text-2xl">🎨</span>
                  Themes: Customize Your HUD
                </h5>
                <p className="text-sm text-gray-300 mb-3">
                  Change the look and feel of VS Code! Dark mode? Light mode? Cyberpunk neon? Your code, your style! 😎
                </p>
                <div className="bg-gray-950 rounded p-2 text-xs">
                  <p className="text-gray-400">Popular themes:</p>
                  <ul className="mt-1 space-y-1">
                    <li className="text-blue-400">• Dracula Official - Dark & elegant</li>
                    <li className="text-cyan-400">• One Dark Pro - Clean & popular</li>
                    <li className="text-purple-400">• Tokyo Night - Vibrant & modern</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-4">
                <h5 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                  <span className="text-2xl">🐍</span>
                  Python Extension: Universal Translator
                </h5>
                <p className="text-sm text-gray-300">
                  Writing Python? This gadget understands Python language! It highlights syntax, suggests code, and catches errors before you even run it. Like having a Python expert watching your back! 🐍✨
                </p>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-4">
                <h5 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                  <span className="text-2xl">✨</span>
                  Prettier: Auto-Formatter
                </h5>
                <p className="text-sm text-gray-300">
                  Makes your code <strong className="text-white">beautiful automatically</strong>! Press save and watch messy code transform into perfectly formatted, clean code. No more worrying about spacing or indentation! 🪄
                </p>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-4">
                <h5 className="font-semibold text-orange-400 mb-2 flex items-center gap-2">
                  <span className="text-2xl">🎯</span>
                  Live Server: Instant Preview
                </h5>
                <p className="text-sm text-gray-300">
                  Building a website? This gadget launches a <strong className="text-orange-400">live preview</strong> that updates <em>instantly</em> as you code! See changes in real-time without refreshing. Magic! ⚡
                </p>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-4">
                <h5 className="font-semibold text-pink-400 mb-2 flex items-center gap-2">
                  <span className="text-2xl">🤖</span>
                  GitHub Copilot: AI Co-Pilot
                </h5>
                <p className="text-sm text-gray-300">
                  This is your <strong className="text-pink-400">AI sidekick</strong>! Start typing code and Copilot suggests entire lines or functions. It's like having an experienced programmer helping you! (Requires subscription, but worth it!) 🚀
                </p>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-4">
                <h5 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
                  <span className="text-2xl">🔍</span>
                  Linters: Deep-Scan Module
                </h5>
                <p className="text-sm text-gray-300">
                  Scans your code for mistakes, bad practices, and potential bugs <strong className="text-red-400">before you run it</strong>! Like a spell-checker, but for code. Saves so much debugging time! 🛡️
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg p-4">
              <p className="font-semibold text-white mb-2">🎁 How to Install Extensions</p>
              <div className="space-y-2 text-sm text-gray-300">
                <p><strong>1.</strong> Click the <strong className="text-cyan-400">Extensions icon</strong> (looks like 4 squares) on the left sidebar</p>
                <p><strong>2.</strong> Search for the extension you want (e.g., "Python")</p>
                <p><strong>3.</strong> Click <strong className="text-green-400">Install</strong></p>
                <p><strong>4.</strong> <span className="text-yellow-400">BOOM!</span> You just upgraded your suit! 🚀</p>
              </div>
            </div>

            <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
              <p className="text-xs text-purple-300">🎨 <strong>Fun Fact:</strong> There are over 30,000 extensions available! You can customize VS Code for ANY programming language or task!</p>
            </div>
          </div>
        )
      },
      {
        title: 'Diagnostic Mode 🩺',
        content: (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-5">
              <h4 className="font-bold text-white mb-3 text-xl">Debugging = Your Suit's Medical Scanner</h4>
              <p className="text-gray-300">
                Something's broken? Don't panic! Your suit has a <strong className="text-red-400">diagnostic mode</strong> that lets you scan your code line-by-line, 
                see exactly where the problem is, and fix it instantly. No more guessing with <code className="bg-gray-800 px-2 py-1 rounded text-sm">console.log()</code> everywhere!
              </p>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4">
              <h5 className="font-semibold text-red-400 mb-3 flex items-center gap-2">
                <span className="text-2xl">🔴</span>
                Step 1: Set Breakpoints (Pause Points)
              </h5>
              <p className="text-sm text-gray-300 mb-2">
                Click the <strong className="text-white">left side</strong> of any line number – a red dot appears! This is your <strong className="text-red-400">pause button</strong>. 
                When your code reaches this line, it'll freeze so you can inspect everything.
              </p>
              <div className="bg-gray-950 rounded p-2 text-xs text-gray-400">
                <p>💡 Think of it like saying: "Hey VS Code, pause here so I can see what's happening!"</p>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4">
              <h5 className="font-semibold text-blue-400 mb-3 flex items-center gap-2">
                <span className="text-2xl">▶️</span>
                Step 2: Start Debugging
              </h5>
              <p className="text-sm text-gray-300 mb-2">
                Press <kbd className="px-2 py-1 bg-gray-800 rounded text-xs font-mono text-blue-400">F5</kbd> or click the <strong className="text-blue-400">Run & Debug</strong> button. 
                Your code runs until it hits your red dot, then <strong className="text-yellow-400">FREEZE!</strong> ⏸️
              </p>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4">
              <h5 className="font-semibold text-green-400 mb-3 flex items-center gap-2">
                <span className="text-2xl">👣</span>
                Step 3: Walk Through Your Code (Step Controls)
              </h5>
              <div className="space-y-2">
                <div className="flex items-center justify-between bg-gray-950 rounded p-2">
                  <span className="text-sm text-gray-300"><strong className="text-white">Step Over</strong> - Next line (skip functions)</span>
                  <kbd className="px-2 py-1 bg-gray-800 rounded text-xs font-mono text-green-400">F10</kbd>
                </div>
                <div className="flex items-center justify-between bg-gray-950 rounded p-2">
                  <span className="text-sm text-gray-300"><strong className="text-white">Step Into</strong> - Go inside functions</span>
                  <kbd className="px-2 py-1 bg-gray-800 rounded text-xs font-mono text-green-400">F11</kbd>
                </div>
                <div className="flex items-center justify-between bg-gray-950 rounded p-2">
                  <span className="text-sm text-gray-300"><strong className="text-white">Step Out</strong> - Exit current function</span>
                  <kbd className="px-2 py-1 bg-gray-800 rounded text-xs font-mono text-green-400">Shift+F11</kbd>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                ✨ You're literally walking through your code like a detective, seeing every variable change in real-time!
              </p>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4">
              <h5 className="font-semibold text-purple-400 mb-3 flex items-center gap-2">
                <span className="text-2xl">🔍</span>
                Step 4: Inspect Everything!
              </h5>
              <p className="text-sm text-gray-300 mb-3">
                While paused, you can:
              </p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400">•</span>
                  <div>
                    <strong className="text-white">Hover over variables</strong> to see their current value
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400">•</span>
                  <div>
                    <strong className="text-white">Check the Variables panel</strong> to see ALL variables at once
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400">•</span>
                  <div>
                    <strong className="text-white">Add Watch expressions</strong> to monitor specific values
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400">•</span>
                  <div>
                    <strong className="text-white">See the Call Stack</strong> - how you got to this point
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-lg p-4">
              <p className="font-semibold text-white mb-2">🎯 Why This is AMAZING:</p>
              <p className="text-sm text-gray-300">
                Instead of adding 50 <code className="bg-gray-800 px-1.5 py-0.5 rounded text-xs">console.log()</code> statements and guessing where the bug is, 
                you <strong className="text-red-400">see exactly</strong> what's happening at every step. It's like having X-ray vision for your code! 👀✨
              </p>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4">
              <p className="text-sm text-gray-300">
                <strong className="text-yellow-400">⚡ Real Example:</strong>
              </p>
              <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                Your program crashes and you don't know why. Set a breakpoint before the crash, run the debugger, 
                step through line by line, and <strong className="text-green-400">AHA!</strong> You see that a variable is <code className="bg-gray-800 px-1 rounded text-xs">undefined</code> when it shouldn't be. 
                Bug found and fixed in 2 minutes! 🎉
              </p>
            </div>

            <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
              <p className="text-xs text-green-300">🔥 <strong>Master Tip:</strong> Professional developers use debuggers ALL THE TIME. It's the difference between struggling for hours and fixing bugs in minutes!</p>
            </div>
          </div>
        )
      },
      {
        title: 'Advanced Strategies 🚀',
        content: (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-5">
              <h4 className="font-bold text-white mb-3 text-xl">Productivity Hacks = Secret Powers Only Masters Know</h4>
              <p className="text-gray-300">
                You've got the basics down – now let's unlock the <strong className="text-cyan-400">hidden features</strong> that'll make you code <em>ridiculously</em> fast! 
                These are the tricks that separate beginners from pros. 🎯
              </p>
            </div>

            <div className="space-y-3">
              <div className="bg-gray-900/50 rounded-lg p-4">
                <h5 className="font-semibold text-purple-400 mb-2 flex items-center gap-2">
                  <span className="text-2xl">📝</span>
                  Emmet: Type Less, Create More
                </h5>
                <p className="text-sm text-gray-300 mb-3">
                  Emmet is <strong className="text-purple-400">built into VS Code</strong>! Type shortcuts and press Tab to expand them into full code. It's like magic spells for HTML/CSS! ✨
                </p>
                <div className="bg-gray-950 rounded p-3 space-y-2">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Type this:</p>
                    <code className="text-green-400 text-sm">{'div.container>ul>li*3'}</code>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Press Tab, get this:</p>
                    <pre className="text-xs text-blue-400 overflow-x-auto whitespace-pre-wrap">
                      {`<div class="container">\n  <ul>\n    <li></li>\n    <li></li>\n    <li></li>\n  </ul>\n</div>`}
                    </pre>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-2">🤯 You just wrote 6 lines in 5 seconds!</p>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-4">
                <h5 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                  <span className="text-2xl">📚</span>
                  Snippets: Custom Code Templates
                </h5>
                <p className="text-sm text-gray-300 mb-2">
                  Create your own shortcuts! Type a few letters, get entire code blocks instantly. Perfect for stuff you type over and over.
                </p>
                <div className="bg-gray-950 rounded p-2">
                  <p className="text-xs text-gray-400">Example: Type <code className="text-green-400">forloop</code> + Tab = instant for loop structure! 🔄</p>
                </div>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-4">
                <h5 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                  <span className="text-2xl">🎯</span>
                  Multi-File Search: Find Anything Instantly
                </h5>
                <div className="space-y-2">
                  <p className="text-sm text-gray-300">
                    Press <kbd className="px-2 py-1 bg-gray-800 rounded text-xs font-mono text-green-400">Ctrl+Shift+F</kbd> to search across <strong className="text-white">your entire project</strong>! 
                    Find where a function is used, locate all TODOs, replace text in 50 files at once. Insanely powerful! 🔍⚡
                  </p>
                </div>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-4">
                <h5 className="font-semibold text-orange-400 mb-2 flex items-center gap-2">
                  <span className="text-2xl">🔀</span>
                  Split Editor: See Multiple Files
                </h5>
                <p className="text-sm text-gray-300 mb-2">
                  Right-click a file tab → <strong className="text-orange-400">Split Right/Down</strong>. Now you can see your HTML and CSS side-by-side! 
                  Edit one, instantly see changes in the other. Game-changer for web dev! 🖥️✨
                </p>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-4">
                <h5 className="font-semibold text-pink-400 mb-2 flex items-center gap-2">
                  <span className="text-2xl">⚡</span>
                  IntelliSense: Smart Auto-Complete
                </h5>
                <p className="text-sm text-gray-300">
                  As you type, VS Code <strong className="text-pink-400">predicts what you're writing</strong> and suggests completions. 
                  See function names, parameters, and even documentation <em>as you code</em>! Accept with Tab or Enter. It's like autocorrect, but actually helpful! 😄
                </p>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-4">
                <h5 className="font-semibold text-cyan-400 mb-2 flex items-center gap-2">
                  <span className="text-2xl">🌐</span>
                  Integrated Terminal: Never Leave VS Code
                </h5>
                <p className="text-sm text-gray-300 mb-2">
                  Run commands, start servers, test code – all <strong className="text-cyan-400">without leaving VS Code</strong>! 
                  Press <kbd className="px-2 py-1 bg-gray-800 rounded text-xs font-mono text-cyan-400">Ctrl+`</kbd> and you've got a full terminal right there. 
                  No more switching between windows! 🖥️
                </p>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-4">
                <h5 className="font-semibold text-yellow-400 mb-2 flex items-center gap-2">
                  <span className="text-2xl">📌</span>
                  Zen Mode: Pure Focus
                </h5>
                <p className="text-sm text-gray-300 mb-2">
                  Press <kbd className="px-2 py-1 bg-gray-800 rounded text-xs font-mono text-yellow-400">Ctrl+K Z</kbd> for <strong className="text-yellow-400">Zen Mode</strong> – 
                  everything disappears except your code. Full-screen, distraction-free coding. Perfect for deep focus! 🧘‍♂️✨
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-4">
              <p className="font-semibold text-white mb-2">🎓 You're Now a VS Code Master!</p>
              <p className="text-sm text-gray-300">
                You've unlocked the secrets! Remember: even pros don't know EVERY feature – they just master the ones that make <em>them</em> fast. 
                Pick your favorite tricks, practice them, and soon you'll be coding at superhero speed! 🦸‍♂️💨
              </p>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4">
              <p className="text-sm text-gray-300">
                <strong className="text-cyan-400">⚡ Final Challenge:</strong>
              </p>
              <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                Try coding for one week using <strong className="text-white">only keyboard shortcuts</strong> – no mouse! 
                It'll feel weird at first, but by day 7, you'll be flying through code like a pro. Trust the process! 🚀✨
              </p>
            </div>

            <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
              <p className="text-xs text-green-300">🌟 <strong>Remember:</strong> Your coding suit (VS Code) is only as powerful as YOU make it. Customize it, master it, and make it yours! Happy coding! 🎉</p>
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
