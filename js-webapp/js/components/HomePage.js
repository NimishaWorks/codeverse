// HomePage Component - Vanilla JS Version
import { animationEngine, typeText, addHoverTilt } from '../utils/animation-engine.js';
import { navigate } from '../utils/router.js';

class HomePage {
    constructor(params = {}) {
        this.params = params;
        this.element = null;
    }

    async render() {
        this.element = document.createElement('div');
        this.element.className = 'min-h-screen bg-gradient-to-b from-[#070912] via-[#101325] to-[#1a1f3a] text-white overflow-hidden relative';
        
        this.element.innerHTML = `
            <!-- Grid background -->
            <div class="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.03)_1px,transparent_0)] bg-[size:28px_28px] opacity-40"></div>
            <div class="absolute inset-0">
                <div class="absolute -top-32 -left-24 w-[420px] h-[420px] bg-blue-500/30 blur-3xl rounded-full"></div>
                <div class="absolute top-1/3 -right-24 w-[360px] h-[360px] bg-purple-500/25 blur-3xl rounded-full"></div>
            </div>

            <main class="relative z-10 max-w-7xl mx-auto px-6 py-20 flex flex-col gap-20">
                <div class="grid lg:grid-cols-2 gap-12 items-center">
                    <div class="space-y-6">
                        <!-- Typing Effect Tagline -->
                        <span id="tagline" class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 text-sm uppercase tracking-[0.4em] text-slate-200/80 opacity-0">
                            <span id="typed-text"></span>
                            <span class="cursor inline-block w-0.5 h-4 bg-purple-400 ml-1 animate-pulse"></span>
                        </span>

                        <!-- Title with Animation -->
                        <div class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
                            <span id="title-part-1" class="text-white opacity-0 translate-y-5">Welcome to </span>
                            <span id="title-part-2" class="bg-gradient-to-br from-white via-purple-400 to-blue-500 bg-clip-text text-transparent opacity-0 translate-y-5">CodeVerse</span>
                            <span id="title-part-3" class="text-white opacity-0 translate-y-5"> — The Adventure-first CS Academy</span>
                        </div>

                        <!-- Description -->
                        <p id="description" class="text-base sm:text-lg text-slate-200/80 leading-relaxed max-w-2xl opacity-0 translate-y-5">
                            Master algorithms, core CS, and interview prep with cinematic story arcs, adaptive quests, and your AI
                            mentor Tuto guiding every step. Progress across immersive roadmaps, unlock outfits, and turn your skills
                            into a world-class portfolio.
                        </p>

                        <!-- Action Buttons -->
                        <div id="action-buttons" class="flex flex-wrap gap-4 opacity-0 translate-y-5">
                            <button id="start-journey-btn" class="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full shadow-lg shadow-purple-500/30 hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95">
                                Start Your Journey
                            </button>
                            <button id="login-btn" class="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-full hover:bg-white/15 transition-all transform hover:scale-105 active:scale-95">
                                I already play
                            </button>
                        </div>

                        <!-- Stats -->
                        <div id="stats" class="flex flex-wrap items-center gap-6 pt-6 border-t border-white/10 opacity-0 translate-y-5">
                            <div class="flex items-center gap-3 text-sm text-slate-200/70">
                                <span class="text-xl">⭐</span>
                                12+ master tracks
                            </div>
                            <div class="flex items-center gap-3 text-sm text-slate-200/70">
                                <span class="text-xl">🎮</span>
                                Candy Crush inspired roadmaps
                            </div>
                            <div class="flex items-center gap-3 text-sm text-slate-200/70">
                                <span class="text-xl">🚀</span>
                                AI-powered mentoring
                            </div>
                        </div>
                    </div>

                    <!-- Right side - Features or Hero Image -->
                    <div id="hero-section" class="relative opacity-0 translate-y-10">
                        <div class="relative bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
                            <div class="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-3xl blur-xl"></div>
                            <div class="relative z-10 text-center space-y-6">
                                <div class="text-6xl mb-4">🚀</div>
                                <h3 class="text-2xl font-bold">Ready to Level Up?</h3>
                                <p class="text-slate-300">Join thousands of developers mastering CS fundamentals through gamified learning.</p>
                                <div class="grid grid-cols-2 gap-4 mt-8">
                                    <div class="text-center p-4 bg-white/5 rounded-xl">
                                        <div class="text-2xl font-bold text-blue-400">50K+</div>
                                        <div class="text-sm text-slate-400">Active Learners</div>
                                    </div>
                                    <div class="text-center p-4 bg-white/5 rounded-xl">
                                        <div class="text-2xl font-bold text-purple-400">95%</div>
                                        <div class="text-sm text-slate-400">Success Rate</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Features Section -->
                <section id="features" class="space-y-12 opacity-0 translate-y-10">
                    <div class="text-center space-y-4">
                        <h2 class="text-3xl sm:text-4xl font-bold">Why Choose CodeVerse?</h2>
                        <p class="text-slate-300 max-w-2xl mx-auto">
                            Experience the future of CS education with our innovative approach to learning
                        </p>
                    </div>
                    
                    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        ${this.getFeatures().map(feature => `
                            <div class="feature-card bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl">
                                <div class="text-4xl mb-4">${feature.icon}</div>
                                <h3 class="text-xl font-semibold mb-2 text-white">${feature.title}</h3>
                                <p class="text-slate-300">${feature.desc}</p>
                            </div>
                        `).join('')}
                    </div>
                </section>

                <!-- CTA Section -->
                <section id="cta-section" class="text-center space-y-8 py-20 opacity-0 translate-y-10">
                    <h2 class="text-3xl sm:text-5xl font-bold">Start Your Adventure Today</h2>
                    <p class="text-xl text-slate-300 max-w-3xl mx-auto">
                        Join the revolution in CS education. Master algorithms, build projects, and land your dream job.
                    </p>
                    <button id="cta-button" class="px-12 py-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xl font-bold rounded-full shadow-lg shadow-purple-500/30 hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95">
                        Begin Your Quest
                    </button>
                </section>
            </main>
        `;

        return this.element;
    }

    onMount() {
        // Initialize animations and interactions
        this.initAnimations();
        this.initEventListeners();
    }

    async initAnimations() {
        // Typing effect for tagline
        await typeText(
            this.element.querySelector('#typed-text'), 
            'Play • Learn • Code',
            { speed: 100, cursor: false }
        );

        // Fade in tagline
        await animationEngine.animate(
            this.element.querySelector('#tagline'),
            { opacity: 1, y: 0 },
            { duration: 0.6, delay: 0.5 }
        );

        // Animate title parts sequentially
        const titleParts = ['#title-part-1', '#title-part-2', '#title-part-3'];
        for (let i = 0; i < titleParts.length; i++) {
            animationEngine.animate(
                this.element.querySelector(titleParts[i]),
                { opacity: 1, y: 0 },
                { duration: 0.8, delay: i * 0.2, ease: 'cubic-bezier(0.22, 1, 0.36, 1)' }
            );
        }

        // Animate other sections with stagger
        const sections = ['#description', '#action-buttons', '#stats', '#hero-section', '#features', '#cta-section'];
        sections.forEach((selector, index) => {
            animationEngine.animate(
                this.element.querySelector(selector),
                { opacity: 1, y: 0 },
                { duration: 0.8, delay: 0.8 + (index * 0.15) }
            );
        });

        // Add hover effects to feature cards
        const featureCards = this.element.querySelectorAll('.feature-card');
        featureCards.forEach(card => {
            addHoverTilt(card, { maxTilt: 8 });
        });
    }

    initEventListeners() {
        // Navigation buttons
        const startJourneyBtn = this.element.querySelector('#start-journey-btn');
        const loginBtn = this.element.querySelector('#login-btn');
        const ctaButton = this.element.querySelector('#cta-button');

        startJourneyBtn.addEventListener('click', () => navigate('/register'));
        loginBtn.addEventListener('click', () => navigate('/login'));
        ctaButton.addEventListener('click', () => navigate('/register'));

        // Add pulse animation on hover for buttons
        [startJourneyBtn, loginBtn, ctaButton].forEach(button => {
            button.addEventListener('mouseenter', () => {
                animationEngine.pulse(button);
            });
        });
    }

    getFeatures() {
        return [
            { icon: '🧩', title: 'Gamified Learning', desc: 'Learn by playing story-based simulations' },
            { icon: '🎯', title: 'Profile Building', desc: 'Auto-generated resume & portfolio' },
            { icon: '💬', title: 'Core Concepts', desc: 'DSA, OS, CN, COA, OOPs & more' },
            { icon: '🌐', title: 'Multimodal Learning', desc: 'Video, audio, quizzes, and games' },
            { icon: '🤖', title: 'AI Mentor "Tuto"', desc: 'Personalized guidance' },
            { icon: '🏆', title: 'Achievement System', desc: 'Unlock badges and rewards' }
        ];
    }

    onDestroy() {
        // Cleanup if needed
        if (this.element) {
            this.element.innerHTML = '';
        }
    }
}

export default HomePage;