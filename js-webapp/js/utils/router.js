// Client-side Router for CodeVerse
import { stateManager } from './state-manager.js';

class Router {
    constructor() {
        this.routes = new Map();
        this.currentRoute = null;
        this.isNavigating = false;
        
        // Initialize router
        this.init();
    }

    init() {
        // Listen for browser navigation
        window.addEventListener('popstate', (event) => {
            const path = window.location.pathname === '/index.html' ? '/' : window.location.pathname;
            this.navigate(path, false);
        });
        
        // Handle initial route - don't navigate yet, let app.js handle it
        // This prevents double navigation
        
        // Listen for state changes
        stateManager.subscribe('currentRoute', (route) => {
            if (route !== this.currentRoute) {
                this.navigate(route, true);
            }
        });
    }

    // Register a route
    addRoute(path, component, options = {}) {
        this.routes.set(path, {
            component,
            requiresAuth: options.requiresAuth || false,
            title: options.title || 'CodeVerse'
        });
    }

    // Add multiple routes
    addRoutes(routeConfig) {
        Object.entries(routeConfig).forEach(([path, config]) => {
            this.addRoute(path, config.component, config);
        });
    }

    // Navigate to a route
    async navigate(path, pushState = true) {
        if (this.isNavigating) return;
        this.isNavigating = true;
        
        try {
            // Find matching route
            const route = this.findRoute(path);
            
            if (!route) {
                // Handle 404
                await this.handle404();
                return;
            }

            // Check authentication if required
            if (route.requiresAuth && !stateManager.getState('isAuthenticated')) {
                this.navigate('/login', true);
                return;
            }

            // Update browser history
            if (pushState && path !== window.location.pathname) {
                window.history.pushState({ path }, '', path);
            }

            // Update page title
            document.title = route.title;

            // Update current route
            this.currentRoute = path;
            stateManager.setState('currentRoute', path);

            // Show loading
            this.showLoading();

            // Load and render component
            await this.renderComponent(route, path);

        } catch (error) {
            console.error('Navigation error:', error);
            this.showError('Navigation failed. Please try again.');
        } finally {
            this.isNavigating = false;
            this.hideLoading();
        }
    }

    // Find matching route (supports dynamic segments)
    findRoute(path) {
        // Exact match first
        if (this.routes.has(path)) {
            return { ...this.routes.get(path), params: {} };
        }

        // Dynamic route matching
        for (const [routePath, routeConfig] of this.routes) {
            const params = this.matchRoute(routePath, path);
            if (params) {
                return { ...routeConfig, params };
            }
        }

        return null;
    }

    // Match dynamic routes
    matchRoute(routePath, actualPath) {
        const routeParts = routePath.split('/');
        const actualParts = actualPath.split('/');

        if (routeParts.length !== actualParts.length) {
            return null;
        }

        const params = {};
        
        for (let i = 0; i < routeParts.length; i++) {
            const routePart = routeParts[i];
            const actualPart = actualParts[i];

            if (routePart.startsWith(':')) {
                // Dynamic segment
                const paramName = routePart.slice(1);
                params[paramName] = actualPart;
            } else if (routePart !== actualPart) {
                // Static segment mismatch
                return null;
            }
        }

        return params;
    }

    // Render component
    async renderComponent(route, path) {
        const mainContent = document.getElementById('main-content');
        
        console.log('🎨 Rendering component for path:', path);
        console.log('Main content element:', mainContent);
        console.log('Route component:', route.component.name);
        
        try {
            // Clear current content
            mainContent.innerHTML = '';
            
            // Create component instance
            const componentInstance = new route.component(route.params || {});
            console.log('✅ Component instance created:', componentInstance);
            
            // Render component
            const element = await componentInstance.render();
            console.log('✅ Component rendered, element:', element);
            
            mainContent.appendChild(element);
            console.log('✅ Element appended to main content');
            
            // Call component lifecycle methods
            if (componentInstance.onMount) {
                componentInstance.onMount();
                console.log('✅ onMount called');
            }
            
        } catch (error) {
            console.error('❌ Component render error:', error);
            mainContent.innerHTML = `
                <div class="flex items-center justify-center min-h-screen">
                    <div class="text-center">
                        <h1 class="text-2xl font-bold text-red-600 mb-4">Error Loading Page</h1>
                        <p class="text-gray-600 mb-4">${error.message}</p>
                        <button onclick="window.location.reload()" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            Reload Page
                        </button>
                    </div>
                </div>
            `;
        }
    }

    // Handle 404
    async handle404() {
        console.log('⚠️ 404 - Page not found, redirecting to home...');
        // Auto-redirect to home instead of showing 404
        setTimeout(() => {
            this.navigate('/', true);
        }, 100);
    }

    // Show loading state
    showLoading() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.remove('hidden');
        }
    }

    // Hide loading state
    hideLoading() {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
            }
        }, 500);
    }

    // Show error message
    showError(message) {
        // You can integrate with toast manager here
        console.error(message);
    }

    // Get current route
    getCurrentRoute() {
        return this.currentRoute;
    }

    // Check if route is active
    isActiveRoute(path) {
        return this.currentRoute === path;
    }
}

// Create global router instance
export const router = new Router();

// Helper function for navigation
export const navigate = (path) => {
    router.navigate(path);
};

// Helper function for link handling
export const handleLinkClick = (event) => {
    event.preventDefault();
    const href = event.currentTarget.getAttribute('href');
    if (href) {
        navigate(href);
    }
};

export default router;