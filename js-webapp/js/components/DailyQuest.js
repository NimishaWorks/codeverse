// Daily Quest System - Exact React Replica
import { toastManager } from '../utils/toast-manager.js';
import { animationEngine } from '../utils/animation-engine.js';

export class DailyQuest {
    constructor() {
        this.selectedQuest = null;
        this.selectedChallengeIndex = null;
        this.completedChallenges = [];
        this.streak = 7;
        this.totalXP = 2450;
        this.coins = 180;
        this.todayEarnedXP = 0;
        this.todayEarnedCoins = 0;
        this.showTreasureBox = false;

        this.dailyChallenges = [
            {
                id: 'quiz-match',
                title: 'Quiz Match Challenge',
                description: 'Match questions with correct answers',
                difficulty: 'easy',
                icon: '🎯',
                reward: { xp: 50, coins: 10 },
                type: 'quiz',
                questions: [
                    { id: 1, question: 'What is React?', answer: 'A JavaScript library for building UIs' },
                    { id: 2, question: 'What is JSX?', answer: 'JavaScript XML syntax extension' },
                    { id: 3, question: 'What is a Hook?', answer: 'A special function to use state in functional components' }
                ]
            },
            {
                id: 'code-puzzle',
                title: 'Code Puzzle',
                description: 'Solve the coding challenge',
                difficulty: 'medium',
                icon: '🧩',
                reward: { xp: 75, coins: 15 },
                type: 'code',
                puzzle: {
                    question: 'Write a function to reverse a string',
                    hint: 'Use split(), reverse(), join()',
                    answer: 'reverse'
                }
            },
            {
                id: 'logic-puzzle',
                title: 'Logic Puzzle',
                description: 'Solve the logical riddle',
                difficulty: 'hard',
                icon: '🧠',
                reward: { xp: 100, coins: 20 },
                type: 'logic',
                riddle: {
                    question: 'I am taken from a mine, and shut up in a wooden case. Yet I am used by almost every person. What am I?',
                    answer: 'pencil lead',
                    hints: ['Used for writing', 'Comes from graphite']
                }
            }
        ];

        this.loadProgress();
    }

    loadProgress() {
        const savedProgress = localStorage.getItem('dailyQuestProgress');
        if (savedProgress) {
            const progress = JSON.parse(savedProgress);
            this.streak = progress.streak || 7;
            this.totalXP = progress.totalXP || 2450;
            this.coins = progress.coins || 180;

            const today = new Date().toDateString();
            if (progress.lastCompletedDate === today) {
                this.completedChallenges = progress.completedToday || [];
            }
        }
    }

    saveProgress() {
        const progress = {
            streak: this.streak,
            totalXP: this.totalXP,
            coins: this.coins,
            completedToday: this.completedChallenges,
            lastCompletedDate: new Date().toDateString()
        };
        localStorage.setItem('dailyQuestProgress', JSON.stringify(progress));
    }

    render() {
        const container = document.createElement('div');
        
        if (this.showTreasureBox) {
            container.innerHTML = this.renderTreasureBox();
            const element = container.firstElementChild;
            setTimeout(() => this.attachEventListeners(), 0);
            return element;
        }

        if (this.selectedQuest !== null) {
            container.innerHTML = this.renderChallengeInterface();
            const element = container.firstElementChild;
            setTimeout(() => this.attachEventListeners(), 0);
            return element;
        }

        container.innerHTML = `
            <div class="max-w-7xl mx-auto p-6">
                <!-- Header -->
                <div class="mb-8 text-center animate-fade-in">
                    <h1 class="text-5xl font-bold mb-3 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                        ⚔️ Daily Quest Arena ⚔️
                    </h1>
                    <p class="text-gray-400 text-lg">Complete challenges to earn XP & coins!</p>
                </div>

                <!-- Stats Dashboard -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div class="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-2xl p-6 text-center">
                        <div class="text-4xl mb-2">🔥</div>
                        <div class="text-3xl font-bold text-blue-400">${this.streak}</div>
                        <div class="text-sm text-gray-400">Day Streak</div>
                    </div>
                    <div class="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl p-6 text-center">
                        <div class="text-4xl mb-2">⭐</div>
                        <div class="text-3xl font-bold text-purple-400">${this.totalXP}</div>
                        <div class="text-sm text-gray-400">Total XP</div>
                    </div>
                    <div class="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 border border-yellow-500/30 rounded-2xl p-6 text-center">
                        <div class="text-4xl mb-2">💰</div>
                        <div class="text-3xl font-bold text-yellow-400">${this.coins}</div>
                        <div class="text-sm text-gray-400">Coins</div>
                    </div>
                    <div class="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-2xl p-6 text-center">
                        <div class="text-4xl mb-2">✅</div>
                        <div class="text-3xl font-bold text-green-400">${this.completedChallenges.length}/${this.dailyChallenges.length}</div>
                        <div class="text-sm text-gray-400">Today's Progress</div>
                    </div>
                </div>

                <!-- Today's Earnings -->
                ${this.todayEarnedXP > 0 ? `
                    <div class="mb-6 bg-gradient-to-r from-green-600/20 to-blue-600/20 border border-green-500/30 rounded-2xl p-4 flex items-center justify-between">
                        <div class="flex items-center gap-4">
                            <div class="text-4xl">🎉</div>
                            <div>
                                <div class="font-bold text-green-400">Today's Earnings</div>
                                <div class="text-sm text-gray-400">Keep up the great work!</div>
                            </div>
                        </div>
                        <div class="flex gap-6">
                            <div class="text-center">
                                <div class="text-2xl font-bold text-purple-400">+${this.todayEarnedXP}</div>
                                <div class="text-xs text-gray-400">XP</div>
                            </div>
                            <div class="text-center">
                                <div class="text-2xl font-bold text-yellow-400">+${this.todayEarnedCoins}</div>
                                <div class="text-xs text-gray-400">Coins</div>
                            </div>
                        </div>
                    </div>
                ` : ''}

                <!-- Daily Challenges Grid -->
                <div class="mb-6">
                    <h2 class="text-2xl font-bold mb-4 flex items-center gap-2">
                        <span>🎯</span> Today's Challenges
                    </h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        ${this.dailyChallenges.map((challenge, idx) => this.renderChallengeCard(challenge, idx)).join('')}
                    </div>
                </div>

                <!-- Tips Section -->
                <div class="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
                    <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
                        <span>💡</span> Pro Tips
                    </h3>
                    <ul class="space-y-2 text-gray-400">
                        <li class="flex items-start gap-2">
                            <span class="text-green-400">✓</span>
                            <span>Complete all daily challenges to unlock a treasure box!</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-green-400">✓</span>
                            <span>Maintain your streak for bonus rewards</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-green-400">✓</span>
                            <span>Harder challenges give more XP and coins</span>
                        </li>
                    </ul>
                </div>
            </div>
        `;
        
        setTimeout(() => this.attachEventListeners(), 0);
        return container;
    }

    renderChallengeCard(challenge, idx) {
        const isCompleted = this.completedChallenges.includes(idx);
        const difficultyColors = {
            easy: 'from-green-500 to-emerald-500',
            medium: 'from-yellow-500 to-orange-500',
            hard: 'from-red-500 to-pink-500'
        };
        const difficultyStars = {
            easy: '⭐',
            medium: '⭐⭐',
            hard: '⭐⭐⭐'
        };

        return `
            <div class="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-blue-500/50 transition-all ${isCompleted ? 'opacity-60' : 'cursor-pointer hover:scale-105'}" 
                 data-challenge-card="${idx}">
                <div class="flex items-start justify-between mb-4">
                    <div class="text-5xl">${challenge.icon}</div>
                    ${isCompleted ? 
                        '<div class="text-green-400 text-2xl">✅</div>' : 
                        `<div class="px-3 py-1 bg-gradient-to-r ${difficultyColors[challenge.difficulty]} rounded-full text-xs font-bold text-white">${challenge.difficulty.toUpperCase()}</div>`
                    }
                </div>
                
                <h3 class="text-xl font-bold mb-2">${challenge.title}</h3>
                <p class="text-gray-400 text-sm mb-4">${challenge.description}</p>
                
                <div class="flex items-center justify-between">
                    <div class="flex gap-4">
                        <div class="flex items-center gap-1 text-purple-400">
                            <span>⭐</span>
                            <span class="font-semibold">${challenge.reward.xp}</span>
                        </div>
                        <div class="flex items-center gap-1 text-yellow-400">
                            <span>💰</span>
                            <span class="font-semibold">${challenge.reward.coins}</span>
                        </div>
                    </div>
                    <div class="text-xl">${difficultyStars[challenge.difficulty]}</div>
                </div>
                
                ${isCompleted ? 
                    '<div class="mt-4 text-center text-green-400 font-semibold">Completed! 🎉</div>' :
                    '<button class="mt-4 w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all">Start Challenge</button>'
                }
            </div>
        `;
    }

    renderChallengeInterface() {
        const challenge = this.dailyChallenges[this.selectedQuest];
        
        return `
            <div class="max-w-4xl mx-auto p-6">
                <!-- Header -->
                <div class="mb-6 flex items-center justify-between">
                    <button id="backToQuests" class="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold flex items-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
                        Back
                    </button>
                    <div class="text-center">
                        <h2 class="text-2xl font-bold">${challenge.title}</h2>
                        <p class="text-gray-400 text-sm">${challenge.description}</p>
                    </div>
                    <div class="w-24"></div>
                </div>

                <!-- Challenge Content -->
                <div class="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8">
                    ${this.renderChallengeContent(challenge)}
                </div>

                <!-- Reward Preview -->
                <div class="mt-6 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-2xl p-4 text-center">
                    <div class="text-sm text-gray-400 mb-2">Complete to earn:</div>
                    <div class="flex items-center justify-center gap-6">
                        <div class="flex items-center gap-2 text-purple-400">
                            <span class="text-2xl">⭐</span>
                            <span class="text-xl font-bold">+${challenge.reward.xp} XP</span>
                        </div>
                        <div class="flex items-center gap-2 text-yellow-400">
                            <span class="text-2xl">💰</span>
                            <span class="text-xl font-bold">+${challenge.reward.coins} Coins</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderChallengeContent(challenge) {
        if (challenge.type === 'quiz') {
            return `
                <div class="space-y-6">
                    <h3 class="text-xl font-bold mb-4">Match the questions with correct answers:</h3>
                    ${challenge.questions.map((q, idx) => `
                        <div class="bg-gray-700/30 rounded-lg p-4">
                            <div class="font-semibold mb-3">${idx + 1}. ${q.question}</div>
                            <input type="text" 
                                   id="answer-${idx}" 
                                   placeholder="Your answer..." 
                                   class="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white">
                        </div>
                    `).join('')}
                    <button id="submitQuiz" class="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg font-bold text-lg hover:shadow-lg transition-all">
                        Submit Answers
                    </button>
                </div>
            `;
        } else if (challenge.type === 'code') {
            return `
                <div class="space-y-4">
                    <h3 class="text-xl font-bold">${challenge.puzzle.question}</h3>
                    <div class="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                        <div class="text-sm text-blue-400">💡 Hint: ${challenge.puzzle.hint}</div>
                    </div>
                    <textarea id="codeAnswer" 
                              rows="6" 
                              placeholder="Write your code here..." 
                              class="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white font-mono"></textarea>
                    <button id="submitCode" class="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg font-bold text-lg hover:shadow-lg transition-all">
                        Submit Solution
                    </button>
                </div>
            `;
        } else if (challenge.type === 'logic') {
            return `
                <div class="space-y-4">
                    <div class="text-center mb-6">
                        <div class="text-6xl mb-4">🧠</div>
                        <h3 class="text-xl font-bold">${challenge.riddle.question}</h3>
                    </div>
                    <div class="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 space-y-2">
                        <div class="text-sm font-semibold text-yellow-400">💡 Hints:</div>
                        ${challenge.riddle.hints.map(hint => `<div class="text-sm text-gray-400">• ${hint}</div>`).join('')}
                    </div>
                    <input type="text" 
                           id="riddleAnswer" 
                           placeholder="Your answer..." 
                           class="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white">
                    <button id="submitRiddle" class="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg font-bold text-lg hover:shadow-lg transition-all">
                        Submit Answer
                    </button>
                </div>
            `;
        }
    }

    renderTreasureBox() {
        return `
            <div class="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-6">
                <div class="text-center animate-bounce-in">
                    <div class="text-9xl mb-6 animate-pulse">🎁</div>
                    <h2 class="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                        All Challenges Complete!
                    </h2>
                    <p class="text-2xl text-gray-300 mb-8">You've earned a treasure box!</p>
                    
                    <div class="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-2 border-yellow-500 rounded-2xl p-8 mb-6">
                        <div class="text-6xl mb-4">✨ Bonus Rewards ✨</div>
                        <div class="grid grid-cols-2 gap-6 text-2xl font-bold">
                            <div class="flex items-center justify-center gap-3 text-purple-400">
                                <span>⭐</span>
                                <span>+150 XP</span>
                            </div>
                            <div class="flex items-center justify-center gap-3 text-yellow-400">
                                <span>💰</span>
                                <span>+50 Coins</span>
                            </div>
                        </div>
                    </div>
                    
                    <button id="claimRewards" class="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl font-bold text-xl hover:shadow-2xl hover:shadow-yellow-500/50 transition-all">
                        🎉 Claim Rewards 🎉
                    </button>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        // Challenge card clicks
        document.querySelectorAll('[data-challenge-card]').forEach(card => {
            card.addEventListener('click', (e) => {
                const idx = parseInt(e.currentTarget.dataset.challengeCard);
                if (!this.completedChallenges.includes(idx)) {
                    this.selectedQuest = idx;
                    this.rerender();
                }
            });
        });

        // Back button
        document.getElementById('backToQuests')?.addEventListener('click', () => {
            this.selectedQuest = null;
            this.rerender();
        });

        // Submit buttons
        document.getElementById('submitQuiz')?.addEventListener('click', () => this.handleQuizSubmit());
        document.getElementById('submitCode')?.addEventListener('click', () => this.handleCodeSubmit());
        document.getElementById('submitRiddle')?.addEventListener('click', () => this.handleRiddleSubmit());

        // Claim rewards
        document.getElementById('claimRewards')?.addEventListener('click', () => {
            this.totalXP += 150;
            this.coins += 50;
            this.todayEarnedXP += 150;
            this.todayEarnedCoins += 50;
            this.showTreasureBox = false;
            this.saveProgress();
            toastManager.show('🎉 Rewards claimed! Amazing work!', 'success');
            this.rerender();
        });
    }

    handleQuizSubmit() {
        const challenge = this.dailyChallenges[this.selectedQuest];
        let correct = 0;
        
        challenge.questions.forEach((q, idx) => {
            const answer = document.getElementById(`answer-${idx}`)?.value.trim().toLowerCase();
            if (answer && q.answer.toLowerCase().includes(answer)) {
                correct++;
            }
        });

        if (correct === challenge.questions.length) {
            this.completeChallenge();
        } else {
            toastManager.show(`Only ${correct}/${challenge.questions.length} correct. Try again!`, 'error');
        }
    }

    handleCodeSubmit() {
        const answer = document.getElementById('codeAnswer')?.value.trim().toLowerCase();
        const challenge = this.dailyChallenges[this.selectedQuest];
        
        if (answer.includes(challenge.puzzle.answer)) {
            this.completeChallenge();
        } else {
            toastManager.show('Not quite right. Check the hint!', 'error');
        }
    }

    handleRiddleSubmit() {
        const answer = document.getElementById('riddleAnswer')?.value.trim().toLowerCase();
        const challenge = this.dailyChallenges[this.selectedQuest];
        
        if (answer.includes(challenge.riddle.answer.toLowerCase())) {
            this.completeChallenge();
        } else {
            toastManager.show('Incorrect! Use the hints to help you.', 'error');
        }
    }

    completeChallenge() {
        const challenge = this.dailyChallenges[this.selectedQuest];
        this.totalXP += challenge.reward.xp;
        this.coins += challenge.reward.coins;
        this.todayEarnedXP += challenge.reward.xp;
        this.todayEarnedCoins += challenge.reward.coins;
        this.completedChallenges.push(this.selectedQuest);

        toastManager.show(`🎉 +${challenge.reward.xp} XP, +${challenge.reward.coins} Coins!`, 'success');

        // Check if all challenges completed
        if (this.completedChallenges.length === this.dailyChallenges.length) {
            setTimeout(() => {
                this.showTreasureBox = true;
                this.saveProgress();
                this.rerender();
            }, 1500);
        } else {
            setTimeout(() => {
                this.selectedQuest = null;
                this.saveProgress();
                this.rerender();
            }, 2000);
        }
    }

    rerender() {
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.innerHTML = this.render();
            this.attachEventListeners();
        }
    }
}
