// Dashboard Component - Vanilla JS Version (Original UI/UX)
import { signOut } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js';
import { auth } from '../firebase-config.js';
import { navigate } from '../utils/router.js';
import { toast } from '../utils/toast-manager.js';
import { animationEngine } from '../utils/animation-engine.js';
import { stateManager, useAuth } from '../utils/state-manager.js';

class Dashboard {
    constructor(params = {}) {
        this.params = params;
        this.element = null;
        this.chatOpen = false;
    }

    async render() {
        const { user } = useAuth();
        const userName = localStorage.getItem('userName') || user?.displayName || 'Guest';
        
        this.element = document.createElement('div');
        this.element.className = 'min-h-screen bg-gradient-to-br from-[#0b1020] via-[#101325] to-[#14182b] text-white';
        
        this.element.innerHTML = `
            <!-- Header -->
            <header class="border-b border-gray-800 bg-gray-900/50 backdrop-blur-lg opacity-0 translate-y-5" id="header">
                <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                        CodeVerse
                    </h1>
                    <div class="flex items-center gap-4">
                        <button id="profile-btn" class="flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-full hover:bg-gray-700/50 transition-all">
                            <span class="text-2xl">👤</span>
                            <span class="font-medium">${userName}</span>
                        </button>
                    </div>
                </div>
            </header>

            <div class="max-w-7xl mx-auto px-6 py-12">
                <!-- Welcome Banner -->
                <div id="welcome-banner" class="mb-12 relative overflow-hidden rounded-3xl p-8 bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-blue-500/30 opacity-0 scale-95">
                    <div class="relative z-10">
                        <h2 class="text-4xl font-bold mb-2">
                            Welcome back to CodeVerse, ${userName}! �
                        </h2>
                        <p class="text-xl text-gray-300">
                            where learning meets adventure!
                        </p>
                    </div>
                    <div class="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
                </div>

                <!-- Tuto AI Mentor -->
                <div id="tuto-mentor" class="mb-12 bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-6 shadow-2xl opacity-0 translate-y-5">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-3xl">
                            🤖
                        </div>
                        <div>
                            <h3 class="text-2xl font-bold">Tuto - Your AI Mentor</h3>
                            <p class="text-gray-400">Ask me anything about your learning journey!</p>
                        </div>
                    </div>
                    <div class="flex gap-3">
                        <input
                            type="text"
                            id="tuto-input"
                            placeholder="Type your question here..."
                            class="flex-1 px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                        <button id="ask-tuto-btn" class="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
                            Ask Tuto
                        </button>
                    </div>
                    <p class="text-xs text-gray-500 mt-2">💡 Try: "What should I learn next?" or "Explain Big-O notation"</p>
                </div>

                <!-- Quick Actions -->
                <div id="quick-actions" class="mb-12 opacity-0 translate-y-5">
                    <h3 class="text-2xl font-bold mb-6">Quick Actions</h3>
                    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        ${this.renderQuickActions()}
                    </div>
                </div>

                <!-- Courses Grid -->
                <div id="courses-grid" class="opacity-0 translate-y-5">
                    <h3 class="text-2xl font-bold mb-6">Your Learning Paths</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        ${this.renderCourses()}
                    </div>
                </div>
            </div>
        `;

        return this.element;
    }

    renderQuickActions() {
        const quickActions = [
            { name: 'Interview Hub', icon: '💼', path: '/interview-hub', bg: 'from-green-500/20 to-emerald-500/20' },
            { name: 'Resume Builder', icon: '📄', path: '/resume-builder', bg: 'from-blue-500/20 to-cyan-500/20' },
            { name: 'Hackathons', icon: '🏆', path: '/hackathons', bg: 'from-purple-500/20 to-pink-500/20' },
            { name: 'Internships', icon: '💼', path: '/internships', bg: 'from-cyan-500/20 to-teal-500/20' },
            { name: 'Daily Quest', icon: '🎁', path: '/daily-quest', bg: 'from-yellow-500/20 to-orange-500/20' },
            { name: 'Game Simulations', icon: '🎮', path: '/games', bg: 'from-red-500/20 to-pink-500/20' },
            { name: 'PPT Converter', icon: '📊', path: '/ppt-converter', bg: 'from-indigo-500/20 to-purple-500/20' },
            { name: 'Leaderboard', icon: '�', path: '/leaderboard', bg: 'from-orange-500/20 to-red-500/20' },
            { name: 'Profile', icon: '👤', path: '/profile', bg: 'from-pink-500/20 to-rose-500/20' }
        ];

        return quickActions.map(action => `
            <button data-path="${action.path}" class="quick-action-btn p-6 bg-gradient-to-br ${action.bg} backdrop-blur-lg border border-gray-700/50 rounded-2xl text-center hover:border-blue-500/50 transition-all transform hover:scale-105">
                <div class="text-4xl mb-2">${action.icon}</div>
                <div class="text-sm font-medium">${action.name}</div>
            </button>
        `).join('');
    }

    renderCourses() {
        const courses = [
            { id: 'dsa', name: 'DSA / DAA', icon: '📊', color: 'from-purple-500 to-pink-500', progress: 25 },
            { id: 'os', name: 'Operating Systems', icon: '💻', color: 'from-blue-500 to-cyan-500', progress: 0 },
            { id: 'cn', name: 'Computer Networks', icon: '🌐', color: 'from-green-500 to-emerald-500', progress: 0 },
            { id: 'coa', name: 'Computer Organization', icon: '🔧', color: 'from-orange-500 to-red-500', progress: 0 },
            { id: 'dbms', name: 'Database Management', icon: '🗄️', color: 'from-indigo-500 to-purple-500', progress: 0 },
            { id: 'oops', name: 'OOPs Concepts', icon: '🎯', color: 'from-yellow-500 to-orange-500', progress: 0 },
            { id: 'web', name: 'HTML / CSS / JS', icon: '🌈', color: 'from-pink-500 to-rose-500', progress: 0 },
            { id: 'python', name: 'Python', icon: '🐍', color: 'from-cyan-500 to-blue-500', progress: 0 },
            { id: 'java', name: 'Java', icon: '☕', color: 'from-red-500 to-orange-500', progress: 0 },
            { id: 'cyber', name: 'Cybersecurity', icon: '🔒', color: 'from-gray-500 to-slate-500', progress: 0 },
            { id: 'cloud', name: 'Cloud Computing', icon: '☁️', color: 'from-sky-500 to-blue-500', progress: 0 },
            { id: 'ai', name: 'AI / ML', icon: '🤖', color: 'from-violet-500 to-purple-500', progress: 0 }
        ];

        return courses.map(course => `
            <div data-course-id="${course.id}" class="course-card cursor-pointer bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-blue-500/50 transition-all transform hover:scale-103">
                <div class="w-16 h-16 bg-gradient-to-br ${course.color} rounded-2xl flex items-center justify-center text-3xl mb-4">
                    ${course.icon}
                </div>
                <h4 class="text-lg font-semibold mb-2">${course.name}</h4>
                <div class="flex items-center gap-2 text-sm text-gray-400">
                    <div class="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div class="h-full bg-gradient-to-r ${course.color}" style="width: ${course.progress}%"></div>
                    </div>
                    <span>${course.progress}%</span>
                </div>
            </div>
        `).join('');
    }

    renderCourseCards() {
        return courses.map(course => `
            <div class="course-card bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:bg-gray-800/60 transition-all cursor-pointer transform hover:-translate-y-2" 
                 data-course-id="${course.id}">
                <div class="flex items-start justify-between mb-4">
                    <div class="flex items-center space-x-3">
                        <div class="w-12 h-12 bg-gradient-to-r ${course.color} rounded-xl flex items-center justify-center text-white text-xl">
                            ${course.icon}
                        </div>
                        <div>
                            <h4 class="font-semibold text-white">${course.name}</h4>
                            <p class="text-sm text-gray-400">${course.totalLevels} levels</p>
                        </div>
                    </div>
                </div>
                
                <p class="text-gray-300 text-sm mb-4">${course.description}</p>
                
                <div class="flex items-center justify-between">
                    <span class="text-xs text-gray-400">Click to explore</span>
                    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </div>
            </div>
        `).join('');
    }

    onMount() {
        this.initAnimations();
        this.initEventListeners();
    }

    async initAnimations() {
        // Animate sections sequentially with original timing
        await animationEngine.animate(
            this.element.querySelector('#header'), 
            { opacity: 1, y: 0 }, 
            { duration: 0.5 }
        );

        await animationEngine.animate(
            this.element.querySelector('#welcome-banner'), 
            { opacity: 1, scale: 1 }, 
            { duration: 0.5, delay: 0.2 }
        );

        await animationEngine.animate(
            this.element.querySelector('#tuto-mentor'), 
            { opacity: 1, y: 0 }, 
            { duration: 0.5, delay: 0.3 }
        );

        await animationEngine.animate(
            this.element.querySelector('#quick-actions'), 
            { opacity: 1, y: 0 }, 
            { duration: 0.5, delay: 0.4 }
        );

        await animationEngine.animate(
            this.element.querySelector('#courses-grid'), 
            { opacity: 1, y: 0 }, 
            { duration: 0.5, delay: 0.5 }
        );

        // Add hover effects to interactive elements
        setTimeout(() => {
            const courseCards = this.element.querySelectorAll('.course-card');
            const quickActionBtns = this.element.querySelectorAll('.quick-action-btn');
            
            courseCards.forEach(card => {
                animationEngine.addHoverTilt(card, { maxTilt: 3 });
            });
            
            quickActionBtns.forEach(btn => {
                animationEngine.addHoverTilt(btn, { maxTilt: 5 });
            });
        }, 1000);
    }

    initEventListeners() {
        // Profile button
        const profileBtn = this.element.querySelector('#profile-btn');
        profileBtn?.addEventListener('click', () => navigate('/profile'));

        // Tuto AI interaction
        const askTutoBtn = this.element.querySelector('#ask-tuto-btn');
        const tutoInput = this.element.querySelector('#tuto-input');
        
        askTutoBtn?.addEventListener('click', () => this.handleTutoQuestion());
        tutoInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleTutoQuestion();
            }
        });

        // Quick action buttons
        const quickActionBtns = this.element.querySelectorAll('.quick-action-btn');
        quickActionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const path = btn.dataset.path;
                this.animateButtonClick(btn);
                setTimeout(() => navigate(path), 150);
            });
        });

        // Course cards
        const courseCards = this.element.querySelectorAll('.course-card');
        courseCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const courseId = card.dataset.courseId;
                this.animateButtonClick(card);
                setTimeout(() => navigate(`/courses/${courseId}`), 150);
            });
        });
    }

    handleTutoQuestion() {
        const input = this.element.querySelector('#tuto-input');
        const question = input.value.trim();
        
        if (!question) {
            toast.warning('Please ask Tuto a question!');
            return;
        }

        // Simulate AI response
        input.value = '';
        input.disabled = true;
        
        const responses = {
            'what should i learn next': 'Based on your progress, I recommend diving deeper into Linked Lists! You\'re doing great with DSA fundamentals. 🚀',
            'explain big-o notation': 'Big-O notation describes algorithm efficiency! O(1) is constant, O(n) is linear, O(n²) is quadratic. Think of it as measuring how your code scales! 📈',
            'how to improve': 'Practice daily, solve problems step by step, and don\'t rush. Consistency beats intensity! 💪',
            'default': 'Great question! I\'d love to help you learn more about that topic. Try exploring our interactive courses! 🎓'
        };

        const response = responses[question.toLowerCase()] || responses['default'];
        
        setTimeout(() => {
            toast.success('Tuto says: ' + response);
            input.disabled = false;
            input.focus();
        }, 1000);
    }

    animateButtonClick(element) {
        animationEngine.animate(element, { scale: 0.95 }, { duration: 0.15 })
            .then(() => animationEngine.animate(element, { scale: 1 }, { duration: 0.15 }));
    }

    async handleLogout() {
        try {
            await signOut(auth);
            localStorage.clear();
            toast.success('Logged out successfully');
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
            toast.error('Failed to logout. Please try again.');
        }
    }

    getUserInitials(user) {
        if (user?.displayName) {
            return user.displayName.split(' ')
                .map(name => name[0])
                .slice(0, 2)
                .join('')
                .toUpperCase();
        }
        if (user?.email) {
            return user.email[0].toUpperCase();
        }
        return 'U';
    }

    getUserGreeting() {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 17) return 'Good Afternoon';
        return 'Good Evening';
    }

    getOverallProgress(courses) {
        if (!courses || courses.length === 0) return 0;
        
        const totalProgress = courses.reduce((sum, course) => sum + (course.progress || 0), 0);
        return Math.round(totalProgress / courses.length);
    }

    getCompletedCourses(courses) {
        if (!courses) return 0;
        return courses.filter(course => (course.progress || 0) >= 100).length;
    }

    formatTime(minutes) {
        if (minutes < 60) {
            return `${minutes}min`;
        }
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
    }

    onDestroy() {
        if (this.element) {
            this.element.innerHTML = '';
        }
    }
}

export default Dashboard;