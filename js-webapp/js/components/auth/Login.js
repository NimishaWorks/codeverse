// Login Component - Vanilla JS Version
import { signInWithEmailAndPassword, signInWithPopup } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js';
import { auth, googleProvider } from '../../firebase-config.js';
import { navigate } from '../../utils/router.js';
import { toast } from '../../utils/toast-manager.js';
import { animationEngine } from '../../utils/animation-engine.js';

class Login {
    constructor(params = {}) {
        this.params = params;
        this.element = null;
        this.loading = false;
    }

    async render() {
        this.element = document.createElement('div');
        this.element.className = 'min-h-screen bg-gradient-to-br from-[#0b1020] via-[#101325] to-[#14182b] flex items-center justify-center px-6';
        
        this.element.innerHTML = `
            <div class="w-full max-w-md opacity-0 translate-y-5">
                <div class="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl">
                    <!-- Header -->
                    <h2 class="text-4xl font-bold text-white mb-2 text-center">Welcome Back</h2>
                    <p class="text-gray-400 text-center mb-8">Sign in to continue your learning journey</p>

                    <!-- Error Message -->
                    <div id="error-message" class="hidden mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm"></div>

                    <!-- Login Form -->
                    <form id="login-form" class="space-y-6">
                        <!-- Email Input -->
                        <div class="space-y-2">
                            <label for="email" class="block text-sm font-medium text-gray-300">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                required
                                class="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Enter your email"
                            >
                        </div>

                        <!-- Password Input -->
                        <div class="space-y-2">
                            <label for="password" class="block text-sm font-medium text-gray-300">Password</label>
                            <div class="relative">
                                <input
                                    type="password"
                                    id="password"
                                    required
                                    class="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-12"
                                    placeholder="Enter your password"
                                >
                                <button
                                    type="button"
                                    id="toggle-password"
                                    class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                >
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <!-- Remember Me & Forgot Password -->
                        <div class="flex items-center justify-between">
                            <label class="flex items-center">
                                <input type="checkbox" id="remember-me" class="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2">
                                <span class="ml-2 text-sm text-gray-300">Remember me</span>
                            </label>
                            <a href="#" class="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                                Forgot password?
                            </a>
                        </div>

                        <!-- Submit Button -->
                        <button
                            type="submit"
                            id="login-submit"
                            class="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            <span id="submit-text">Sign In</span>
                            <div id="submit-loader" class="hidden items-center">
                                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Signing In...
                            </div>
                        </button>
                    </form>

                    <!-- Divider -->
                    <div class="relative my-6">
                        <div class="absolute inset-0 flex items-center">
                            <div class="w-full border-t border-gray-600"></div>
                        </div>
                        <div class="relative flex justify-center text-sm">
                            <span class="px-2 bg-gray-800/40 text-gray-400">Or continue with</span>
                        </div>
                    </div>

                    <!-- Google Sign In -->
                    <button
                        id="google-signin"
                        class="w-full py-3 px-4 bg-white text-gray-900 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-3"
                    >
                        <svg class="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        <span>Continue with Google</span>
                    </button>

                    <!-- Sign Up Link -->
                    <p class="text-center text-gray-400 text-sm mt-6">
                        Don't have an account? 
                        <a href="/register" class="text-blue-400 hover:text-blue-300 transition-colors font-medium">
                            Sign up
                        </a>
                    </p>

                    <!-- Back to Home -->
                    <div class="text-center mt-4">
                        <a href="/" class="text-gray-500 hover:text-gray-300 transition-colors text-sm">
                            ← Back to Home
                        </a>
                    </div>
                </div>
            </div>
        `;

        return this.element;
    }

    onMount() {
        this.initAnimations();
        this.initEventListeners();
    }

    async initAnimations() {
        // Fade in the form container
        const container = this.element.querySelector('div > div');
        await animationEngine.animate(container, { opacity: 1, y: 0 }, { duration: 0.6 });
    }

    initEventListeners() {
        const form = this.element.querySelector('#login-form');
        const googleButton = this.element.querySelector('#google-signin');
        const togglePasswordBtn = this.element.querySelector('#toggle-password');
        const passwordInput = this.element.querySelector('#password');

        // Form submission
        form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Google sign in
        googleButton.addEventListener('click', () => this.handleGoogleLogin());
        
        // Password visibility toggle
        togglePasswordBtn.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Update icon
            const icon = type === 'password' ? 
                `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>` :
                `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>`;
            
            togglePasswordBtn.querySelector('svg').innerHTML = icon;
        });
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        if (this.loading) return;
        
        const email = this.element.querySelector('#email').value;
        const password = this.element.querySelector('#password').value;
        
        this.setLoading(true);
        this.hideError();
        
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            // Store user data in localStorage
            localStorage.setItem('userName', user.displayName || email.split('@')[0]);
            localStorage.setItem('userEmail', user.email);
            localStorage.setItem('userId', user.uid);
            
            toast.success(`Welcome back, ${user.displayName || user.email}!`);
            console.log('✅ User logged in:', user.email);
            
            // Navigate to dashboard
            navigate('/dashboard');
            
        } catch (error) {
            console.error('❌ Login error:', error);
            this.showError(this.getErrorMessage(error.code));
        } finally {
            this.setLoading(false);
        }
    }

    async handleGoogleLogin() {
        if (this.loading) return;
        
        this.setLoading(true);
        this.hideError();
        
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            
            // Store user data in localStorage
            localStorage.setItem('userName', user.displayName || 'User');
            localStorage.setItem('userEmail', user.email);
            localStorage.setItem('userId', user.uid);
            localStorage.setItem('userPhoto', user.photoURL || '');
            
            toast.success(`Welcome ${user.displayName}!`);
            console.log('✅ Google Sign-In successful:', user.email);
            
            // Navigate to dashboard
            navigate('/dashboard');
            
        } catch (error) {
            console.error('❌ Google Sign-In error:', error);
            this.showError(this.getErrorMessage(error.code));
        } finally {
            this.setLoading(false);
        }
    }

    setLoading(loading) {
        this.loading = loading;
        const submitButton = this.element.querySelector('#login-submit');
        const submitText = this.element.querySelector('#submit-text');
        const submitLoader = this.element.querySelector('#submit-loader');
        
        if (loading) {
            submitButton.disabled = true;
            submitText.classList.add('hidden');
            submitLoader.classList.remove('hidden');
        } else {
            submitButton.disabled = false;
            submitText.classList.remove('hidden');
            submitLoader.classList.add('hidden');
        }
    }

    showError(message) {
        const errorElement = this.element.querySelector('#error-message');
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
        
        // Shake animation for error
        animationEngine.animate(errorElement, { x: [-10, 10, -10, 10, 0] }, { duration: 0.5 });
    }

    hideError() {
        const errorElement = this.element.querySelector('#error-message');
        errorElement.classList.add('hidden');
    }

    getErrorMessage(errorCode) {
        switch (errorCode) {
            case 'auth/invalid-email':
                return 'Invalid email address.';
            case 'auth/user-disabled':
                return 'This account has been disabled.';
            case 'auth/user-not-found':
                return 'No account found with this email.';
            case 'auth/wrong-password':
                return 'Incorrect password.';
            case 'auth/popup-closed-by-user':
                return 'Sign-in popup was closed. Please try again.';
            case 'auth/cancelled-popup-request':
                return 'Only one popup request is allowed at a time.';
            case 'auth/popup-blocked':
                return 'Popup was blocked by browser. Please allow popups.';
            case 'auth/network-request-failed':
                return 'Network error. Check your internet connection.';
            default:
                return 'An error occurred. Please try again.';
        }
    }

    onDestroy() {
        if (this.element) {
            this.element.innerHTML = '';
        }
    }
}

export default Login;