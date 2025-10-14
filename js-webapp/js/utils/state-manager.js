// Simple State Manager for CodeVerse
class StateManager {
    constructor() {
        this.state = {
            user: null,
            currentRoute: '/',
            isAuthenticated: false,
            loading: false,
            courses: [],
            userProgress: {},
            currentCourse: null,
            gameScore: 0,
            leaderboard: [],
            dailyQuests: [],
            notifications: []
        };
        this.listeners = new Map();
    }

    // Subscribe to state changes
    subscribe(key, callback) {
        if (!this.listeners.has(key)) {
            this.listeners.set(key, []);
        }
        this.listeners.get(key).push(callback);
        
        // Return unsubscribe function
        return () => {
            const callbacks = this.listeners.get(key);
            if (callbacks) {
                const index = callbacks.indexOf(callback);
                if (index > -1) {
                    callbacks.splice(index, 1);
                }
            }
        };
    }

    // Update state and notify listeners
    setState(key, value) {
        const oldValue = this.state[key];
        this.state[key] = value;
        
        // Notify listeners
        const callbacks = this.listeners.get(key);
        if (callbacks) {
            callbacks.forEach(callback => {
                callback(value, oldValue);
            });
        }
        
        // Also notify global state listeners
        const globalCallbacks = this.listeners.get('*');
        if (globalCallbacks) {
            globalCallbacks.forEach(callback => {
                callback(this.state, key, value, oldValue);
            });
        }
    }

    // Get state value
    getState(key) {
        return key ? this.state[key] : this.state;
    }

    // Update multiple state values
    updateState(updates) {
        Object.keys(updates).forEach(key => {
            this.setState(key, updates[key]);
        });
    }

    // Clear state (logout)
    clearState() {
        this.updateState({
            user: null,
            isAuthenticated: false,
            userProgress: {},
            currentCourse: null,
            gameScore: 0,
            notifications: []
        });
    }
}

// Create global state manager instance
export const stateManager = new StateManager();

// Helper functions for common state operations
export const useAuth = () => ({
    user: stateManager.getState('user'),
    isAuthenticated: stateManager.getState('isAuthenticated'),
    setUser: (user) => {
        stateManager.setState('user', user);
        stateManager.setState('isAuthenticated', !!user);
    },
    logout: () => stateManager.clearState()
});

export const useNavigation = () => ({
    currentRoute: stateManager.getState('currentRoute'),
    navigate: (route) => stateManager.setState('currentRoute', route)
});

export const useCourses = () => ({
    courses: stateManager.getState('courses'),
    currentCourse: stateManager.getState('currentCourse'),
    setCourses: (courses) => stateManager.setState('courses', courses),
    setCurrentCourse: (course) => stateManager.setState('currentCourse', course)
});

export const useProgress = () => ({
    userProgress: stateManager.getState('userProgress'),
    setProgress: (progress) => stateManager.setState('userProgress', progress),
    updateProgress: (courseId, levelId, progress) => {
        const currentProgress = stateManager.getState('userProgress');
        const updatedProgress = {
            ...currentProgress,
            [courseId]: {
                ...currentProgress[courseId],
                [levelId]: progress
            }
        };
        stateManager.setState('userProgress', updatedProgress);
    }
});

export default stateManager;