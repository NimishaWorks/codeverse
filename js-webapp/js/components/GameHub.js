import { toastManager } from '../utils/toastManager.js';

export class GameHub {
    constructor() {
        this.currentGame = null;
        this.score = 0;
        this.timeLeft = 60;
        this.timer = null;
        
        this.games = [
            {
                id: 'code-quiz',
                title: 'Code Quiz Challenge',
                icon: '🧠',
                description: 'Test your coding knowledge with rapid-fire questions',
                difficulty: 'Medium',
                xpReward: 100,
                color: 'from-blue-500 to-blue-700'
            },
            {
                id: 'typing-speed',
                title: 'Typing Speed Test',
                icon: '⌨️',
                description: 'Improve your typing speed with coding snippets',
                difficulty: 'Easy',
                xpReward: 50,
                color: 'from-green-500 to-green-700'
            },
            {
                id: 'algorithm-viz',
                title: 'Algorithm Visualizer',
                icon: '🔄',
                description: 'Interactive sorting and searching algorithms',
                difficulty: 'Hard',
                xpReward: 150,
                color: 'from-purple-500 to-purple-700'
            },
            {
                id: 'memory-match',
                title: 'Memory Match',
                icon: '🎴',
                description: 'Match programming concepts and syntax',
                difficulty: 'Easy',
                xpReward: 75,
                color: 'from-pink-500 to-pink-700'
            },
            {
                id: 'drag-drop',
                title: 'Code Sequencer',
                icon: '🎯',
                description: 'Arrange code blocks in the correct order',
                difficulty: 'Medium',
                xpReward: 100,
                color: 'from-orange-500 to-orange-700'
            },
            {
                id: 'bug-hunt',
                title: 'Bug Hunter',
                icon: '🐛',
                description: 'Find and fix bugs in the code',
                difficulty: 'Hard',
                xpReward: 150,
                color: 'from-red-500 to-red-700'
            }
        ];
        
        this.quizQuestions = [
            { q: 'What does HTML stand for?', a: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlinks Text Mark Language'], correct: 0 },
            { q: 'Which is not a JavaScript data type?', a: ['String', 'Boolean', 'Float', 'Undefined'], correct: 2 },
            { q: 'What does CSS stand for?', a: ['Cascading Style Sheets', 'Creative Style System', 'Computer Style Sheets', 'Colorful Style Sheets'], correct: 0 },
            { q: 'Which operator is used for strict equality?', a: ['==', '===', '=', '!='], correct: 1 },
            { q: 'What is the time complexity of binary search?', a: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], correct: 1 }
        ];
        
        this.typingTexts = [
            'function calculateSum(a, b) { return a + b; }',
            'const array = [1, 2, 3, 4, 5].map(x => x * 2);',
            'for (let i = 0; i < arr.length; i++) { console.log(arr[i]); }',
            'const promise = new Promise((resolve, reject) => { });',
            'class Person { constructor(name) { this.name = name; } }'
        ];
        
        this.memoryCards = [
            '🎯', '🚀', '💎', '⚡', '🔥', '🌟', '💻', '🎮',
            '🎯', '🚀', '💎', '⚡', '🔥', '🌟', '💻', '🎮'
        ];
    }
    
    render() {
        const container = document.createElement('div');
        
        if (this.currentGame) {
            container.innerHTML = this.renderGame();
        } else {
            container.innerHTML = this.renderGameSelection();
        }
        
        const element = container.firstElementChild;
        setTimeout(() => this.attachEventListeners(), 0);
        return element;
    }
    
    renderGameSelection() {
        return `
            <div class="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-6">
                <!-- Header -->
                <div class="mb-8">
                    <h1 class="text-4xl font-bold text-white mb-2">🎮 Game Hub</h1>
                    <p class="text-gray-400">Fun games to sharpen your coding skills</p>
                </div>
                
                <!-- Games Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${this.games.map(game => `
                        <div class="bg-gradient-to-br ${game.color} rounded-xl p-6 transform hover:scale-105 transition-all cursor-pointer border-2 border-transparent hover:border-white" 
                             data-game="${game.id}">
                            <div class="text-5xl mb-4">${game.icon}</div>
                            <h3 class="text-2xl font-bold text-white mb-2">${game.title}</h3>
                            <p class="text-gray-200 mb-4">${game.description}</p>
                            <div class="flex justify-between items-center">
                                <span class="px-3 py-1 bg-white bg-opacity-20 rounded-full text-white text-sm">
                                    ${game.difficulty}
                                </span>
                                <span class="text-yellow-300 font-bold">+${game.xpReward} XP</span>
                            </div>
                            <button class="w-full mt-4 px-6 py-3 bg-white text-gray-900 rounded-lg font-bold hover:bg-gray-100 transition-all">
                                Play Now
                            </button>
                        </div>
                    `).join('')}
                </div>
                
                <!-- Leaderboard -->
                <div class="mt-8 bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h3 class="text-2xl font-bold text-white mb-4">🏆 Today's Leaderboard</h3>
                    <div class="space-y-3">
                        ${[
                            { rank: 1, name: 'CodeMaster', score: 2450, icon: '👑' },
                            { rank: 2, name: 'DevNinja', score: 2180, icon: '🥈' },
                            { rank: 3, name: 'AlgoWizard', score: 1950, icon: '🥉' },
                            { rank: 4, name: 'BugSlayer', score: 1720, icon: '⚔️' },
                            { rank: 5, name: 'You', score: 1500, icon: '⭐' }
                        ].map(player => `
                            <div class="flex items-center justify-between p-4 bg-gray-700 rounded-lg ${player.rank === 5 ? 'border-2 border-purple-500' : ''}">
                                <div class="flex items-center space-x-4">
                                    <span class="text-2xl font-bold ${player.rank <= 3 ? 'text-yellow-400' : 'text-gray-400'}">#${player.rank}</span>
                                    <span class="text-2xl">${player.icon}</span>
                                    <span class="text-white font-medium">${player.name}</span>
                                </div>
                                <span class="text-purple-400 font-bold">${player.score} pts</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }
    
    renderGame() {
        const game = this.games.find(g => g.id === this.currentGame);
        
        return `
            <div class="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-6">
                <!-- Game Header -->
                <div class="flex justify-between items-center mb-6">
                    <div>
                        <button class="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all" data-back>
                            ← Back to Games
                        </button>
                    </div>
                    <div class="flex items-center space-x-6">
                        <div class="text-center">
                            <div class="text-gray-400 text-sm">Score</div>
                            <div class="text-2xl font-bold text-white">${this.score}</div>
                        </div>
                        <div class="text-center">
                            <div class="text-gray-400 text-sm">Time</div>
                            <div class="text-2xl font-bold text-yellow-400">${this.timeLeft}s</div>
                        </div>
                    </div>
                </div>
                
                <!-- Game Content -->
                <div class="bg-gray-800 rounded-xl p-8 border border-gray-700">
                    <div class="text-center mb-6">
                        <span class="text-6xl">${game.icon}</span>
                        <h2 class="text-3xl font-bold text-white mt-4">${game.title}</h2>
                    </div>
                    
                    ${this.renderGameContent()}
                </div>
            </div>
        `;
    }
    
    renderGameContent() {
        switch (this.currentGame) {
            case 'code-quiz':
                return this.renderCodeQuiz();
            case 'typing-speed':
                return this.renderTypingTest();
            case 'memory-match':
                return this.renderMemoryMatch();
            case 'algorithm-viz':
                return this.renderAlgorithmViz();
            case 'drag-drop':
                return this.renderCodeSequencer();
            case 'bug-hunt':
                return this.renderBugHunt();
            default:
                return '<div class="text-white text-center">Game loading...</div>';
        }
    }
    
    renderCodeQuiz() {
        const question = this.quizQuestions[0];
        return `
            <div class="max-w-2xl mx-auto">
                <h3 class="text-xl text-white mb-6">${question.q}</h3>
                <div class="space-y-3">
                    ${question.a.map((answer, idx) => `
                        <button class="w-full p-4 bg-gray-700 text-white rounded-lg hover:bg-purple-600 transition-all text-left" 
                                data-answer="${idx}">
                            ${String.fromCharCode(65 + idx)}. ${answer}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    renderTypingTest() {
        const text = this.typingTexts[0];
        return `
            <div class="max-w-3xl mx-auto">
                <div class="bg-gray-900 p-6 rounded-lg mb-4 font-mono text-lg text-gray-400">
                    ${text}
                </div>
                <textarea class="w-full p-4 bg-gray-700 text-white rounded-lg font-mono text-lg" 
                          rows="3" 
                          placeholder="Start typing..."
                          data-typing-input></textarea>
                <div class="mt-4 flex justify-between text-sm">
                    <span class="text-gray-400">WPM: <span class="text-white font-bold">0</span></span>
                    <span class="text-gray-400">Accuracy: <span class="text-white font-bold">0%</span></span>
                </div>
            </div>
        `;
    }
    
    renderMemoryMatch() {
        return `
            <div class="max-w-4xl mx-auto">
                <div class="grid grid-cols-4 gap-4">
                    ${this.memoryCards.sort(() => Math.random() - 0.5).map((card, idx) => `
                        <button class="aspect-square bg-gray-700 rounded-xl text-5xl hover:bg-gray-600 transition-all transform hover:scale-105" 
                                data-card="${idx}">
                            ?
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    renderAlgorithmViz() {
        return `
            <div class="max-w-4xl mx-auto">
                <div class="flex justify-center mb-6 space-x-4">
                    <button class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all" data-algo="bubble">
                        Bubble Sort
                    </button>
                    <button class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all" data-algo="quick">
                        Quick Sort
                    </button>
                    <button class="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all" data-algo="merge">
                        Merge Sort
                    </button>
                </div>
                <div class="flex items-end justify-center h-64 space-x-2">
                    ${Array.from({length: 20}, (_, i) => {
                        const height = Math.random() * 80 + 20;
                        return `<div class="flex-1 bg-gradient-to-t from-purple-500 to-pink-500 rounded-t transition-all" style="height: ${height}%"></div>`;
                    }).join('')}
                </div>
            </div>
        `;
    }
    
    renderCodeSequencer() {
        const codeBlocks = [
            'function factorial(n) {',
            '  if (n === 0) return 1;',
            '  return n * factorial(n - 1);',
            '}'
        ];
        return `
            <div class="max-w-2xl mx-auto">
                <p class="text-gray-400 mb-4 text-center">Drag the code blocks to arrange them in correct order</p>
                <div class="space-y-3">
                    ${codeBlocks.sort(() => Math.random() - 0.5).map((block, idx) => `
                        <div class="p-4 bg-gray-700 text-white rounded-lg font-mono cursor-move hover:bg-gray-600 transition-all" 
                             draggable="true" 
                             data-block="${idx}">
                            ${block}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    renderBugHunt() {
        return `
            <div class="max-w-3xl mx-auto">
                <p class="text-gray-400 mb-4 text-center">Find and click on the bugs in the code</p>
                <div class="bg-gray-900 p-6 rounded-lg font-mono text-lg">
                    <div class="text-gray-500">1</div>
                    <div class="text-white">function calculateSum(a, b) {</div>
                    <div class="text-gray-500">2</div>
                    <div class="text-white">  <span class="cursor-pointer hover:bg-red-600 px-1" data-bug="1">let sum = a - b;</span> <span class="text-red-400">// Bug!</span></div>
                    <div class="text-gray-500">3</div>
                    <div class="text-white">  return sum;</div>
                    <div class="text-gray-500">4</div>
                    <div class="text-white">}</div>
                </div>
            </div>
        `;
    }
    
    attachEventListeners() {
        // Game selection
        document.querySelectorAll('[data-game]')?.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const gameId = e.currentTarget.getAttribute('data-game');
                this.startGame(gameId);
            });
        });
        
        // Back button
        document.querySelector('[data-back]')?.addEventListener('click', () => {
            this.currentGame = null;
            this.score = 0;
            window.router?.navigate('/game-hub');
        });
        
        // Quiz answers
        document.querySelectorAll('[data-answer]')?.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const answer = parseInt(e.currentTarget.getAttribute('data-answer'));
                if (answer === this.quizQuestions[0].correct) {
                    this.score += 100;
                    toastManager.success('Correct! +100 points');
                } else {
                    toastManager.error('Wrong answer!');
                }
            });
        });
        
        // Memory cards
        document.querySelectorAll('[data-card]')?.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const card = e.currentTarget;
                const idx = parseInt(card.getAttribute('data-card'));
                card.textContent = this.memoryCards[idx];
                card.classList.add('bg-purple-600');
            });
        });
        
        // Bug hunt
        document.querySelectorAll('[data-bug]')?.forEach(bug => {
            bug.addEventListener('click', () => {
                this.score += 150;
                toastManager.success('Bug found! +150 points');
                bug.classList.remove('text-white');
                bug.classList.add('text-green-400', 'line-through');
            });
        });
    }
    
    startGame(gameId) {
        this.currentGame = gameId;
        this.score = 0;
        this.timeLeft = 60;
        window.router?.navigate('/game-hub');
        toastManager.success('Game started! Good luck!');
    }
}
