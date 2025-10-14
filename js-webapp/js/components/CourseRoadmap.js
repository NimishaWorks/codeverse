import { stateManager } from '../utils/state-manager.js';
import { animationEngine } from '../utils/animation-engine.js';

class CourseRoadmap {
    constructor(courseId) {
        this.courseId = courseId;
        this.element = null;
        this.selectedNode = null;
        this.course = null;
        this.nodes = [];
        
        // Get course data
        import('../data/courses.js').then(module => {
            this.course = module.courses.find(course => course.id === courseId);
            if (this.course) {
                this.generateNodes();
                this.render();
            }
        });
    }

    generateNodes() {
        // Generate Candy Crush style winding path with 20 nodes
        const pathPositions = [
            { x: 20, y: 85 },   // Start bottom left
            { x: 35, y: 75 },
            { x: 50, y: 80 },
            { x: 65, y: 70 },
            { x: 80, y: 75 },   // Row 1 end
            { x: 75, y: 60 },
            { x: 60, y: 55 },
            { x: 45, y: 60 },
            { x: 30, y: 50 },
            { x: 15, y: 55 },   // Row 2 end
            { x: 25, y: 40 },
            { x: 40, y: 35 },
            { x: 55, y: 40 },
            { x: 70, y: 30 },
            { x: 85, y: 35 },   // Row 3 end
            { x: 80, y: 20 },
            { x: 65, y: 15 },
            { x: 50, y: 20 },
            { x: 35, y: 10 },
            { x: 20, y: 15 }    // Final node
        ];

        const nodeData = [
            { name: 'Introduction', icon: '🏁', lessons: 3, xp: 50, coins: 10, game: false },
            { name: 'Basic Concepts', icon: '📚', lessons: 5, xp: 100, coins: 20, game: false },
            { name: 'First Challenge', icon: '⚔️', lessons: 4, xp: 150, coins: 30, game: true },
            { name: 'Arrays Basics', icon: '📊', lessons: 6, xp: 200, coins: 40, game: false },
            { name: 'Array Operations', icon: '🔧', lessons: 7, xp: 250, coins: 50, game: false },
            { name: 'Array Games', icon: '🎮', lessons: 5, xp: 300, coins: 60, game: true },
            { name: 'Linked Lists', icon: '🔗', lessons: 8, xp: 350, coins: 70, game: false },
            { name: 'List Operations', icon: '⚙️', lessons: 6, xp: 400, coins: 80, game: false },
            { name: 'List Challenge', icon: '🏆', lessons: 4, xp: 450, coins: 90, game: true },
            { name: 'Stacks & Queues', icon: '📚', lessons: 7, xp: 500, coins: 100, game: false },
            { name: 'Stack Operations', icon: '🥞', lessons: 5, xp: 550, coins: 110, game: false },
            { name: 'Queue Challenge', icon: '🚶', lessons: 6, xp: 600, coins: 120, game: true },
            { name: 'Trees Intro', icon: '🌳', lessons: 8, xp: 650, coins: 130, game: false },
            { name: 'Tree Traversal', icon: '🚶‍♂️', lessons: 7, xp: 700, coins: 140, game: false },
            { name: 'Tree Games', icon: '🎯', lessons: 5, xp: 750, coins: 150, game: true },
            { name: 'Graphs Basics', icon: '🕸️', lessons: 9, xp: 800, coins: 160, game: false },
            { name: 'Graph Algorithms', icon: '🧩', lessons: 10, xp: 850, coins: 170, game: false },
            { name: 'Graph Challenge', icon: '🎪', lessons: 6, xp: 900, coins: 180, game: true },
            { name: 'Advanced Topics', icon: '🚀', lessons: 8, xp: 950, coins: 190, game: false },
            { name: 'Final Boss', icon: '👑', lessons: 5, xp: 1000, coins: 200, game: true }
        ];

        this.nodes = pathPositions.map((pos, idx) => {
            const nodeInfo = nodeData[idx] || nodeData[nodeData.length - 1];
            const userProgress = this.getUserProgress();
            
            let status = 'locked';
            let stars = 0;
            
            if (idx === 0 || (userProgress && userProgress > idx - 1)) {
                status = idx === userProgress ? 'active' : 'completed';
                stars = status === 'completed' ? Math.floor(Math.random() * 3) + 1 : 0;
            }

            return {
                id: idx + 1,
                x: pos.x,
                y: pos.y,
                status,
                stars,
                ...nodeInfo
            };
        });
    }

    getUserProgress() {
        // Get user's progress for this course (default to first few levels unlocked)
        const savedProgress = localStorage.getItem(`course_progress_${this.courseId}`);
        return savedProgress ? parseInt(savedProgress) : 2; // Start with 3 levels unlocked
    }

    render() {
        if (!this.course) return '';

        const userStats = this.getUserStats();

        return `
            <div class="roadmap-container min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-x-auto">
                <!-- Background Elements -->
                <div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%234c1d95" fill-opacity="0.1"%3E%3Ccircle cx="7" cy="7" r="2"/%3E%3Ccircle cx="27" cy="7" r="2"/%3E%3Ccircle cx="47" cy="7" r="2"/%3E%3C/g%3E%3C/svg%3E')]"></div>
                
                <!-- Header Stats Bar -->
                <div id="stats-header" class="relative z-10 bg-black/40 backdrop-blur-md border-b-4 border-purple-400/50 p-4 shadow-2xl" style="opacity: 0;">
                    <div class="max-w-6xl mx-auto flex items-center justify-between">
                        <div class="flex items-center gap-6">
                            <button id="back-btn" class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all hover:scale-105 flex items-center gap-2">
                                ← Back
                            </button>
                            <h1 class="text-2xl font-bold text-white flex items-center gap-3">
                                <span class="text-4xl">${this.course.icon}</span>
                                ${this.course.title}
                            </h1>
                        </div>
                        
                        <div class="flex items-center gap-6 text-white">
                            <div class="flex items-center gap-2 bg-yellow-500/20 px-4 py-2 rounded-full border-2 border-yellow-400/50">
                                <span class="text-xl">⭐</span>
                                <span class="font-bold">${userStats.totalStars}/60</span>
                            </div>
                            <div class="flex items-center gap-2 bg-blue-500/20 px-4 py-2 rounded-full border-2 border-blue-400/50">
                                <span class="text-xl">🪙</span>
                                <span class="font-bold">${userStats.coins}</span>
                            </div>
                            <div class="flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-full border-2 border-green-400/50">
                                <span class="text-xl">🔥</span>
                                <span class="font-bold">${userStats.streak}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Main Game Area -->
                <div class="relative z-5 p-8">
                    <div id="game-area" class="max-w-6xl mx-auto relative" style="opacity: 0; transform: translateY(30px);">
                        
                        <!-- Floating Decorative Elements -->
                        <div class="floating-star absolute top-32 left-8 text-4xl animate-bounce">🌟</div>
                        <div class="floating-gem absolute top-96 right-10 text-4xl animate-pulse">💎</div>
                        <div class="floating-fire absolute bottom-64 left-12 text-3xl animate-bounce">🔥</div>
                        <div class="floating-bolt absolute top-2/3 right-8 text-3xl animate-pulse">⚡</div>

                        <!-- SVG Path Lines -->
                        <svg class="absolute inset-0 w-full h-full pointer-events-none" style="z-index: 1;">
                            <defs>
                                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" style="stop-color: #a855f7; stop-opacity: 0.6;" />
                                    <stop offset="50%" style="stop-color: #ec4899; stop-opacity: 0.6;" />
                                    <stop offset="100%" style="stop-color: #8b5cf6; stop-opacity: 0.6;" />
                                </linearGradient>
                                
                                <filter id="glow">
                                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                                    <feMerge>
                                        <feMergeNode in="coloredBlur"/>
                                        <feMergeNode in="SourceGraphic"/>
                                    </feMerge>
                                </filter>
                            </defs>
                            
                            ${this.renderPathLines()}
                        </svg>

                        <!-- Course Nodes -->
                        <div class="relative" style="min-height: 1500px; z-index: 2;">
                            ${this.renderNodes()}
                        </div>
                    </div>

                    <!-- Bottom Info Panel -->
                    <div id="info-panel" class="max-w-6xl mx-auto mt-6" style="opacity: 0; transform: translateY(20px);">
                        <!-- Panel content will be dynamically updated -->
                    </div>
                </div>
            </div>
        `;
    }

    renderPathLines() {
        return this.nodes.slice(0, -1).map((node, idx) => {
            const next = this.nodes[idx + 1];
            const isActive = node.status !== 'locked' || next.status !== 'locked';
            return `
                <line
                    x1="${node.x}%"
                    y1="${node.y}%"
                    x2="${next.x}%"
                    y2="${next.y}%"
                    stroke="url(#pathGradient)"
                    stroke-width="6"
                    stroke-linecap="round"
                    opacity="${node.status === 'completed' ? 1 : 0.3}"
                    stroke-dasharray="${node.status === 'locked' ? '8,4' : '0'}"
                    filter="${node.status === 'completed' ? 'url(#glow)' : 'none'}"
                />
            `;
        }).join('');
    }

    renderNodes() {
        return this.nodes.map(node => {
            const isCompleted = node.status === 'completed';
            const isActive = node.status === 'active';
            const isLocked = node.status === 'locked';

            return `
                <div 
                    class="game-node absolute cursor-pointer"
                    data-node-id="${node.id}"
                    style="left: ${node.x}%; top: ${node.y}%; transform: translate(-50%, -50%); z-index: ${isActive ? 20 : 10};"
                >
                    <div class="relative flex flex-col items-center gap-2">
                        <!-- Level Number Badge -->
                        <div class="level-badge absolute -top-3 -left-3 w-8 h-8 rounded-full font-bold text-sm flex items-center justify-center z-20 shadow-lg border-3
                            ${isCompleted ? 'bg-gradient-to-br from-green-400 to-emerald-600 text-white border-white' :
                              isActive ? 'bg-gradient-to-br from-orange-400 to-red-500 text-white border-white' :
                              'bg-gray-600 text-gray-300 border-gray-500'}">
                            ${node.id}
                        </div>

                        <!-- Main Node Circle -->
                        <div class="node-circle w-24 h-24 rounded-full flex items-center justify-center text-5xl border-4 shadow-2xl relative overflow-hidden transition-all duration-300
                            ${isCompleted ? 'bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 border-green-300' :
                              isActive ? 'bg-gradient-to-br from-orange-400 via-pink-500 to-purple-500 border-pink-300' :
                              'bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 border-gray-600'}"
                            style="box-shadow: ${isCompleted ? '0 8px 32px rgba(34, 197, 94, 0.6), inset 0 -4px 12px rgba(0,0,0,0.3)' :
                                               isActive ? '0 8px 40px rgba(251, 146, 60, 0.8), inset 0 -4px 12px rgba(0,0,0,0.3)' :
                                               '0 4px 16px rgba(0,0,0,0.6), inset 0 -4px 12px rgba(0,0,0,0.5)'};">
                            
                            <!-- Glossy shine effect -->
                            <div class="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent rounded-full"></div>
                            
                            <!-- Icon -->
                            <span class="relative z-10 drop-shadow-2xl" style="filter: ${isLocked ? 'grayscale(100%) brightness(0.5)' : 'none'};">
                                ${isLocked ? '🔒' : node.icon}
                            </span>

                            <!-- Active glow effect -->
                            ${isActive ? '<div class="absolute inset-0 animate-pulse bg-gradient-to-r from-orange-400/20 to-purple-400/20 rounded-full"></div>' : ''}
                        </div>

                        <!-- Stars for completed nodes -->
                        ${isCompleted && node.stars > 0 ? `
                            <div class="flex gap-1 absolute -bottom-7 bg-gray-900/90 px-3 py-1 rounded-full shadow-xl border-2 border-yellow-400">
                                ${Array.from({length: 3}, (_, i) => `
                                    <span class="w-4 h-4 ${i < node.stars ? 'text-yellow-400' : 'text-gray-600'}">
                                        ${i < node.stars ? '⭐' : '☆'}
                                    </span>
                                `).join('')}
                            </div>
                        ` : ''}

                        <!-- Active character indicator -->
                        ${isActive ? `
                            <div class="absolute -top-16 animate-bounce">
                                <div class="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full border-4 border-white shadow-2xl flex items-center justify-center text-2xl">
                                    🚀
                                </div>
                            </div>
                        ` : ''}

                        <!-- Completion checkmark -->
                        ${isCompleted ? `
                            <div class="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-lg border-2 border-green-500">
                                <div class="w-6 h-6 text-green-500 text-lg font-bold flex items-center justify-center">✓</div>
                            </div>
                        ` : ''}

                        <!-- Game badge -->
                        ${node.game && !isLocked ? `
                            <div class="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full p-1.5 shadow-lg border-2 border-white">
                                <div class="w-4 h-4 text-white text-xs flex items-center justify-center font-bold">🏆</div>
                            </div>
                        ` : ''}

                        <!-- Node Label -->
                        <div class="node-label mt-4 px-4 py-2 rounded-xl text-center max-w-[140px] text-sm font-bold shadow-xl border-3 backdrop-blur-sm
                            ${isCompleted ? 'bg-green-500/20 text-green-300 border-green-400/50' :
                              isActive ? 'bg-orange-500/20 text-orange-300 border-orange-400/50' :
                              'bg-gray-800/50 text-gray-400 border-gray-600/50'}">
                            ${node.name}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    getUserStats() {
        const completedNodes = this.nodes.filter(node => node.status === 'completed');
        const totalStars = completedNodes.reduce((sum, node) => sum + node.stars, 0);
        const coins = completedNodes.reduce((sum, node) => sum + node.coins, 0);
        
        return {
            totalStars,
            coins,
            streak: Math.floor(Math.random() * 15) + 1 // Random streak for demo
        };
    }

    onMount() {
        this.initAnimations();
        this.initEventListeners();
    }

    async initAnimations() {
        // Animate header
        await animationEngine.animate(
            this.element.querySelector('#stats-header'), 
            { opacity: 1 }, 
            { duration: 0.5 }
        );

        // Animate game area
        await animationEngine.animate(
            this.element.querySelector('#game-area'), 
            { opacity: 1, y: 0 }, 
            { duration: 0.6, delay: 0.2 }
        );

        // Animate info panel
        await animationEngine.animate(
            this.element.querySelector('#info-panel'), 
            { opacity: 1, y: 0 }, 
            { duration: 0.5, delay: 0.4 }
        );

        // Add hover effects to nodes
        const nodeElements = this.element.querySelectorAll('.game-node');
        nodeElements.forEach(node => {
            const isLocked = node.querySelector('.node-circle').classList.contains('from-gray-700');
            if (!isLocked) {
                animationEngine.addHoverTilt(node, { maxTilt: 8 });
            }
        });

        // Animate floating elements
        this.animateFloatingElements();
    }

    animateFloatingElements() {
        const floatingElements = this.element.querySelectorAll('[class*="floating-"]');
        floatingElements.forEach((element, index) => {
            const duration = 3 + (index * 0.5);
            const delay = index * 0.3;
            
            setInterval(() => {
                animationEngine.animate(element, 
                    { y: [-10, 10, -10], rotate: [-5, 5, -5] }, 
                    { duration, delay }
                );
            }, duration * 1000);
        });
    }

    initEventListeners() {
        // Back button
        const backBtn = this.element.querySelector('#back-btn');
        backBtn?.addEventListener('click', () => {
            import('../utils/router.js').then(module => {
                module.navigate('/dashboard');
            });
        });

        // Node clicks
        const nodeElements = this.element.querySelectorAll('.game-node');
        nodeElements.forEach(node => {
            node.addEventListener('click', () => {
                const nodeId = parseInt(node.dataset.nodeId);
                this.handleNodeClick(nodeId);
            });
        });
    }

    handleNodeClick(nodeId) {
        const node = this.nodes.find(n => n.id === nodeId);
        if (!node || node.status === 'locked') return;

        this.selectedNode = node;
        this.showNodeInfo(node);
        
        // Add click animation
        const nodeElement = this.element.querySelector(`[data-node-id="${nodeId}"]`);
        animationEngine.animate(nodeElement, { scale: 0.9 }, { duration: 0.1 })
            .then(() => animationEngine.animate(nodeElement, { scale: 1 }, { duration: 0.1 }));
    }

    showNodeInfo(node) {
        const infoPanel = this.element.querySelector('#info-panel');
        
        infoPanel.innerHTML = `
            <div class="bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 rounded-3xl p-6 shadow-2xl border-4 border-purple-400/40 animate-slideInUp">
                <div class="flex items-start justify-between mb-4">
                    <div class="text-white flex-1">
                        <div class="flex items-center gap-3 mb-3">
                            <span class="text-5xl">${node.icon}</span>
                            <div>
                                <h3 class="text-2xl font-bold drop-shadow-lg">${node.name}</h3>
                                <div class="flex gap-4 text-sm font-semibold mt-1">
                                    <span class="flex items-center gap-1">
                                        📚 ${node.lessons} Lessons
                                    </span>
                                    <span class="flex items-center gap-1">
                                        ⚡ +${node.xp} XP
                                    </span>
                                    <span>🪙 +${node.coins} Coins</span>
                                </div>
                            </div>
                        </div>
                        <p class="text-white/90 font-medium text-sm">
                            ${node.status === 'completed' ? 
                              '✅ Excellent work! You can replay for better stars.' :
                              node.status === 'active' ?
                              '🎯 Complete all lessons to unlock the next level!' :
                              '🔒 Complete previous levels to unlock this.'}
                        </p>
                    </div>
                    <div class="flex gap-3">
                        <button
                            id="close-info-btn"
                            class="px-6 py-3 bg-white/20 text-white font-bold rounded-full shadow-xl hover:bg-white/30 transition-all border-2 border-white/30"
                        >
                            Close
                        </button>
                        ${node.status !== 'locked' ? `
                            <button
                                id="play-level-btn"
                                class="px-6 py-3 bg-white text-purple-600 font-bold rounded-full shadow-xl hover:scale-105 transition-transform border-2 border-white flex items-center gap-2"
                            >
                                Play ▶
                            </button>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;

        // Add event listeners for the new buttons
        const closeBtn = infoPanel.querySelector('#close-info-btn');
        const playBtn = infoPanel.querySelector('#play-level-btn');
        
        closeBtn?.addEventListener('click', () => {
            animationEngine.animate(infoPanel, { opacity: 0, y: 20 }, { duration: 0.3 })
                .then(() => {
                    infoPanel.innerHTML = '';
                    this.selectedNode = null;
                });
        });

        playBtn?.addEventListener('click', () => {
            // Navigate to level or show coming soon
            import('../utils/toast-manager.js').then(module => {
                module.toast.info('🚀 Level content coming soon!');
            });
        });
    }

    onDestroy() {
        if (this.element) {
            this.element.innerHTML = '';
        }
    }
}

export default CourseRoadmap;