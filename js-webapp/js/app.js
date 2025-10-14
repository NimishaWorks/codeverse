// Main App Entry Point - CodeVerse Vanilla JS Version
import { auth } from './firebase-config.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js';
import { router } from './utils/router.js';
import { stateManager, useAuth } from './utils/state-manager.js';
import { toastManager } from './utils/toast-manager.js';

// Import components
import HomePage from './components/HomePage.js';
import Login from './components/auth/Login.js';
import Register from './components/auth/Register.js';
import Dashboard from './components/Dashboard.js';
import CourseRoadmap from './components/CourseRoadmap.js';
import { InterviewHub } from './components/InterviewHub.js';
import { ResumeBuilder } from './components/ResumeBuilder.js';
import { DailyQuest } from './components/DailyQuest.js';
import { Hackathons } from './components/Hackathons.js';
import { Internships } from './components/Internships.js';
import { EnhancedDashboard } from './components/EnhancedDashboard.js';
import { GameHub } from './components/GameHub.js';
import { UserProfile } from './components/UserProfile.js';
import {
    OnboardingQuiz,
    LevelModule,
    PPTConverter,
    Leaderboard
} from './components/PlaceholderComponents.js';

class CodeVerseApp {
    constructor() {
        this.isInitialized = false;
        this.authStateLoaded = false;
        this.init();
    }

    async init() {
        try {
            console.log('🚀 Starting CodeVerse initialization...');
            
            // Show loading screen
            this.showLoadingScreen();
            
            // Initialize authentication state listener with error handling
            try {
                console.log('📝 Initializing Firebase auth...');
                this.initAuthStateListener();
                
                // Wait for auth state to load (with timeout)
                await this.waitForAuthState();
                console.log('✅ Firebase auth initialized');
            } catch (authError) {
                console.warn('⚠️ Firebase auth initialization failed, continuing in offline mode:', authError);
                // Set a default user state for demo purposes
                const { setUser } = useAuth();
                setUser(null);
                this.authStateLoaded = true;
            }
            
            // Setup routes
            this.setupRoutes();
            
            // Initialize navigation listeners
            this.initNavigationListeners();
            
            // Initialize global event listeners
            this.initGlobalListeners();
            
            // Navigate to initial route
            // For http-server, use hash or default to home
            const currentPath = window.location.hash 
                ? window.location.hash.substring(1) 
                : (window.location.pathname === '/' || window.location.pathname === '/index.html') 
                    ? '/' 
                    : window.location.pathname;
            
            await router.navigate(currentPath, false);
            
            // Hide loading screen and show app
            this.hideLoadingScreen();
            
            this.isInitialized = true;
            
            console.log('CodeVerse App initialized successfully');
            
        } catch (error) {
            console.error('App initialization failed:', error);
            this.handleInitError(error);
        }
    }

    // Initialize authentication state listener
    initAuthStateListener() {
        onAuthStateChanged(auth, (user) => {
            const { setUser } = useAuth();
            setUser(user);
            this.authStateLoaded = true;
            
            if (user) {
                console.log('User signed in:', user.email);
                toastManager.success(`Welcome back, ${user.displayName || user.email}!`);
            } else {
                console.log('User signed out');
            }
        });
    }

    // Wait for authentication state to be determined (with timeout)
    waitForAuthState() {
        return new Promise((resolve, reject) => {
            if (this.authStateLoaded) {
                resolve();
                return;
            }
            
            let attempts = 0;
            const maxAttempts = 50; // 5 seconds timeout
            
            const checkAuth = () => {
                attempts++;
                
                if (this.authStateLoaded) {
                    resolve();
                } else if (attempts >= maxAttempts) {
                    reject(new Error('Firebase auth initialization timeout'));
                } else {
                    setTimeout(checkAuth, 100);
                }
            };
            
            checkAuth();
        });
    }

    // Setup application routes
    setupRoutes() {
        const routes = {
            '/': { 
                component: HomePage, 
                title: 'CodeVerse - Multi-Subject Gamified Learning Platform' 
            },
            '/login': { 
                component: Login, 
                title: 'Login - CodeVerse' 
            },
            '/register': { 
                component: Register, 
                title: 'Register - CodeVerse' 
            },
            '/onboarding': { 
                component: OnboardingQuiz, 
                title: 'Onboarding - CodeVerse',
                requiresAuth: true 
            },
            '/dashboard': { 
                component: Dashboard, 
                title: 'Dashboard - CodeVerse',
                requiresAuth: true 
            },
            '/courses/:subject': { 
                component: CourseRoadmap, 
                title: 'Course Roadmap - CodeVerse',
                requiresAuth: true 
            },
            '/courses/:subject/level/:levelId': { 
                component: LevelModule, 
                title: 'Level Module - CodeVerse',
                requiresAuth: true 
            },
            '/enhanced-dashboard': { 
                component: EnhancedDashboard, 
                title: 'Enhanced Dashboard - CodeVerse',
                requiresAuth: true 
            },
            '/game-hub': { 
                component: GameHub, 
                title: 'Game Hub - CodeVerse',
                requiresAuth: true 
            },
            '/games': { 
                component: GameHub, 
                title: 'Game Hub - CodeVerse',
                requiresAuth: true 
            },
            '/interview-hub': { 
                component: InterviewHub, 
                title: 'Interview Hub - CodeVerse',
                requiresAuth: true 
            },
            '/resume-builder': { 
                component: ResumeBuilder, 
                title: 'Resume Builder - CodeVerse',
                requiresAuth: true 
            },
            '/hackathons': { 
                component: Hackathons, 
                title: 'Hackathons - CodeVerse',
                requiresAuth: true 
            },
            '/internships': { 
                component: Internships, 
                title: 'Internships - CodeVerse',
                requiresAuth: true 
            },
            '/ppt-converter': { 
                component: PPTConverter, 
                title: 'PPT Converter - CodeVerse',
                requiresAuth: true 
            },
            '/profile': { 
                component: UserProfile, 
                title: 'User Profile - CodeVerse',
                requiresAuth: true 
            },
            '/daily-quest': { 
                component: DailyQuest, 
                title: 'Daily Quest - CodeVerse',
                requiresAuth: true 
            },
            '/leaderboard': { 
                component: Leaderboard, 
                title: 'Leaderboard - CodeVerse',
                requiresAuth: true 
            }
        };

        router.addRoutes(routes);
    }

    // Initialize navigation listeners
    initNavigationListeners() {
        // Handle navigation links
        document.addEventListener('click', (event) => {
            const link = event.target.closest('a[href]');
            if (link && this.isInternalLink(link)) {
                event.preventDefault();
                const href = link.getAttribute('href');
                router.navigate(href);
            }
        });

        // Handle back/forward browser buttons
        window.addEventListener('popstate', (event) => {
            router.navigate(window.location.pathname, false);
        });
    }

    // Check if link is internal
    isInternalLink(link) {
        const href = link.getAttribute('href');
        return href && 
               !href.startsWith('http') && 
               !href.startsWith('mailto:') && 
               !href.startsWith('tel:') &&
               !href.startsWith('#');
    }

    // Initialize global event listeners
    initGlobalListeners() {
        // Handle keyboard shortcuts
        document.addEventListener('keydown', (event) => {
            // Ctrl/Cmd + K for search (if implemented)
            if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
                event.preventDefault();
                // Implement global search functionality
                console.log('Global search shortcut triggered');
            }
            
            // Escape key to close modals
            if (event.key === 'Escape') {
                this.closeAllModals();
            }
        });

        // Handle online/offline status
        window.addEventListener('online', () => {
            toastManager.success('Connection restored!');
        });

        window.addEventListener('offline', () => {
            toastManager.warning('You are now offline. Some features may not work.');
        });

        // Handle visibility change (tab focus)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                console.log('App hidden');
            } else {
                console.log('App visible');
                // Refresh data if needed
                this.refreshAppData();
            }
        });
    }

    // Show loading screen
    showLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        const app = document.getElementById('app');
        
        if (loadingScreen) {
            loadingScreen.classList.remove('hidden');
        }
        if (app) {
            app.classList.add('hidden');
        }
    }

    // Hide loading screen and show app
    hideLoadingScreen() {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            const app = document.getElementById('app');
            
            console.log('🎯 Hiding loading screen...');
            console.log('Loading screen element:', loadingScreen);
            console.log('App element:', app);
            
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
                console.log('✅ Loading screen hidden');
            }
            if (app) {
                app.classList.remove('hidden');
                console.log('✅ App shown');
                console.log('App innerHTML length:', app.innerHTML.length);
            }
        }, 500);
    }

    // Handle initialization error
    handleInitError(error) {
        const app = document.getElementById('app');
        const loadingScreen = document.getElementById('loading-screen');
        
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
        
        if (app) {
            app.classList.remove('hidden');
            app.innerHTML = `
                <div class="flex items-center justify-center min-h-screen bg-red-50">
                    <div class="text-center p-8">
                        <div class="text-red-600 text-6xl mb-4">⚠️</div>
                        <h1 class="text-2xl font-bold text-red-800 mb-4">Failed to Initialize App</h1>
                        <p class="text-red-600 mb-6">${error.message}</p>
                        <button onclick="window.location.reload()" 
                                class="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors">
                            Retry
                        </button>
                    </div>
                </div>
            `;
        }
    }

    // Close all open modals
    closeAllModals() {
        const modalContainer = document.getElementById('modal-container');
        if (modalContainer) {
            modalContainer.classList.add('hidden');
            modalContainer.innerHTML = '';
        }
    }

    // Refresh app data when returning to tab
    refreshAppData() {
        if (!this.isInitialized) return;
        
        const { isAuthenticated } = useAuth();
        if (isAuthenticated) {
            // Refresh user data, notifications, etc.
            console.log('Refreshing app data...');
        }
    }

    // Get app instance (singleton pattern)
    static getInstance() {
        if (!CodeVerseApp.instance) {
            CodeVerseApp.instance = new CodeVerseApp();
        }
        return CodeVerseApp.instance;
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing CodeVerse...');
    CodeVerseApp.getInstance();
});

// Export for potential external use
export default CodeVerseApp;