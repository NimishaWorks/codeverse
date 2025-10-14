// Toast Manager - Replaces react-hot-toast functionality
class ToastManager {
    constructor() {
        this.toasts = new Map();
        this.toastId = 0;
        this.container = null;
        this.init();
    }

    init() {
        // Create or get toast container
        this.container = document.getElementById('toast-container');
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.id = 'toast-container';
            this.container.className = 'fixed top-4 right-4 z-50 space-y-2';
            document.body.appendChild(this.container);
        }
    }

    // Show success toast
    success(message, options = {}) {
        return this.show(message, 'success', options);
    }

    // Show error toast
    error(message, options = {}) {
        return this.show(message, 'error', options);
    }

    // Show info toast
    info(message, options = {}) {
        return this.show(message, 'info', options);
    }

    // Show warning toast
    warning(message, options = {}) {
        return this.show(message, 'warning', options);
    }

    // Show loading toast
    loading(message, options = {}) {
        return this.show(message, 'loading', { ...options, duration: 0 });
    }

    // Show custom toast
    show(message, type = 'info', options = {}) {
        const toastId = ++this.toastId;
        const duration = options.duration !== undefined ? options.duration : 4000;
        
        const toast = this.createToast(toastId, message, type, options);
        this.toasts.set(toastId, toast);
        
        // Add to container with animation
        this.container.appendChild(toast.element);
        
        // Trigger enter animation
        setTimeout(() => {
            toast.element.classList.add('toast-enter');
        }, 10);

        // Auto dismiss
        if (duration > 0) {
            toast.timer = setTimeout(() => {
                this.dismiss(toastId);
            }, duration);
        }

        return toastId;
    }

    // Create toast element
    createToast(id, message, type, options) {
        const element = document.createElement('div');
        element.className = `toast toast-${type} transform translate-x-full transition-all duration-300 ease-in-out`;
        
        const config = this.getToastConfig(type);
        
        element.innerHTML = `
            <div class="flex items-start space-x-3 p-4 rounded-lg shadow-lg ${config.bgColor} ${config.textColor} min-w-80 max-w-md">
                <div class="flex-shrink-0 mt-0.5">
                    ${config.icon}
                </div>
                <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium">${message}</p>
                    ${options.description ? `<p class="text-xs opacity-75 mt-1">${options.description}</p>` : ''}
                </div>
                <button class="flex-shrink-0 ml-4 text-current opacity-50 hover:opacity-75 transition-opacity" onclick="toastManager.dismiss(${id})">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        `;

        // Add progress bar for timed toasts
        if (options.duration !== 0) {
            const progressBar = document.createElement('div');
            progressBar.className = `absolute bottom-0 left-0 h-1 ${config.progressColor} transition-all ease-linear`;
            progressBar.style.width = '100%';
            progressBar.style.animationDuration = `${options.duration || 4000}ms`;
            progressBar.style.animation = 'toast-progress 1 linear forwards';
            
            element.querySelector('div').style.position = 'relative';
            element.querySelector('div').appendChild(progressBar);
        }

        return { element, timer: null };
    }

    // Get toast configuration by type
    getToastConfig(type) {
        const configs = {
            success: {
                bgColor: 'bg-green-500',
                textColor: 'text-white',
                progressColor: 'bg-green-300',
                icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>`
            },
            error: {
                bgColor: 'bg-red-500',
                textColor: 'text-white',
                progressColor: 'bg-red-300',
                icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>`
            },
            warning: {
                bgColor: 'bg-yellow-500',
                textColor: 'text-white',
                progressColor: 'bg-yellow-300',
                icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>`
            },
            info: {
                bgColor: 'bg-blue-500',
                textColor: 'text-white',
                progressColor: 'bg-blue-300',
                icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>`
            },
            loading: {
                bgColor: 'bg-gray-800',
                textColor: 'text-white',
                progressColor: 'bg-gray-600',
                icon: `<svg class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>`
            }
        };

        return configs[type] || configs.info;
    }

    // Dismiss toast
    dismiss(toastId) {
        const toast = this.toasts.get(toastId);
        if (!toast) return;

        // Clear timer
        if (toast.timer) {
            clearTimeout(toast.timer);
        }

        // Exit animation
        toast.element.classList.remove('toast-enter');
        toast.element.classList.add('toast-exit');

        // Remove after animation
        setTimeout(() => {
            if (toast.element.parentNode) {
                toast.element.parentNode.removeChild(toast.element);
            }
            this.toasts.delete(toastId);
        }, 300);
    }

    // Update existing toast
    update(toastId, message, type, options = {}) {
        const toast = this.toasts.get(toastId);
        if (!toast) return;

        // Update content
        const messageElement = toast.element.querySelector('p');
        if (messageElement) {
            messageElement.textContent = message;
        }

        // Update type classes if changed
        if (type) {
            const config = this.getToastConfig(type);
            const container = toast.element.querySelector('div');
            
            // Remove old type classes and add new ones
            container.className = container.className.replace(/bg-\w+-\d+|text-\w+/, '');
            container.classList.add(config.bgColor, config.textColor);
        }
    }

    // Dismiss all toasts
    dismissAll() {
        this.toasts.forEach((toast, id) => {
            this.dismiss(id);
        });
    }

    // Promise-based toast for async operations
    promise(promise, messages) {
        const loadingId = this.loading(messages.loading || 'Loading...');
        
        return promise
            .then((result) => {
                this.dismiss(loadingId);
                this.success(messages.success || 'Success!');
                return result;
            })
            .catch((error) => {
                this.dismiss(loadingId);
                this.error(messages.error || 'Something went wrong!');
                throw error;
            });
    }
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .toast-enter {
        transform: translateX(0) !important;
    }
    
    .toast-exit {
        transform: translateX(100%) !important;
        opacity: 0 !important;
    }
    
    @keyframes toast-progress {
        from { width: 100%; }
        to { width: 0%; }
    }
`;
document.head.appendChild(style);

// Create global toast manager
export const toastManager = new ToastManager();

// Make it available globally for onclick handlers
window.toastManager = toastManager;

// Export individual functions
export const toast = {
    success: (message, options) => toastManager.success(message, options),
    error: (message, options) => toastManager.error(message, options),
    info: (message, options) => toastManager.info(message, options),
    warning: (message, options) => toastManager.warning(message, options),
    loading: (message, options) => toastManager.loading(message, options),
    dismiss: (id) => toastManager.dismiss(id),
    promise: (promise, messages) => toastManager.promise(promise, messages)
};

export default toastManager;