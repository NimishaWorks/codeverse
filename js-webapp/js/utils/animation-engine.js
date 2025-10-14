// Animation Engine - Replaces Framer Motion functionality
class AnimationEngine {
    constructor() {
        this.animations = new Map();
        this.animationId = 0;
    }

    // Create animation with variants (similar to framer-motion)
    animate(element, variants, options = {}) {
        const animId = ++this.animationId;
        
        const config = {
            duration: options.duration || 0.6,
            delay: options.delay || 0,
            ease: options.ease || 'ease-out',
            stagger: options.stagger || 0,
            delayChildren: options.delayChildren || 0,
            ...options
        };

        // Apply animation
        return new Promise((resolve) => {
            setTimeout(() => {
                this.applyVariant(element, variants, config);
                
                // Resolve after animation completes
                setTimeout(resolve, config.duration * 1000);
            }, config.delay * 1000);
        });
    }

    // Apply variant styles to element
    applyVariant(element, variant, config) {
        if (!element || !variant) return;

        // Set transition
        element.style.transition = `all ${config.duration}s ${config.ease}`;

        // Apply styles
        Object.entries(variant).forEach(([property, value]) => {
            switch (property) {
                case 'opacity':
                    element.style.opacity = value;
                    break;
                case 'x':
                    this.setTransform(element, 'translateX', `${value}px`);
                    break;
                case 'y':
                    this.setTransform(element, 'translateY', `${value}px`);
                    break;
                case 'scale':
                    this.setTransform(element, 'scale', value);
                    break;
                case 'rotate':
                    this.setTransform(element, 'rotate', `${value}deg`);
                    break;
                default:
                    // Handle CSS properties directly
                    const cssProperty = this.toCSSProperty(property);
                    element.style[cssProperty] = value;
            }
        });
    }

    // Set transform property
    setTransform(element, property, value) {
        const currentTransform = element.style.transform || '';
        const transformRegex = new RegExp(`${property}\\([^)]*\\)`, 'g');
        
        let newTransform;
        if (transformRegex.test(currentTransform)) {
            newTransform = currentTransform.replace(transformRegex, `${property}(${value})`);
        } else {
            newTransform = `${currentTransform} ${property}(${value})`.trim();
        }
        
        element.style.transform = newTransform;
    }

    // Convert camelCase to CSS property
    toCSSProperty(property) {
        return property.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
    }

    // Stagger animation for multiple elements
    staggerAnimate(elements, variants, options = {}) {
        const staggerDelay = options.stagger || 0.1;
        
        return Promise.all(
            Array.from(elements).map((element, index) => {
                return this.animate(element, variants, {
                    ...options,
                    delay: (options.delay || 0) + (index * staggerDelay)
                });
            })
        );
    }

    // Typing effect animation
    typeText(element, text, options = {}) {
        const speed = options.speed || 100;
        const cursor = options.cursor !== false;
        
        return new Promise((resolve) => {
            let index = 0;
            element.textContent = cursor ? '|' : '';
            
            const type = () => {
                if (index <= text.length) {
                    element.textContent = text.slice(0, index) + (cursor ? '|' : '');
                    index++;
                    setTimeout(type, speed);
                } else {
                    if (cursor) {
                        // Remove cursor after typing
                        element.textContent = text;
                    }
                    resolve();
                }
            };
            
            type();
        });
    }

    // Hover tilt effect
    addHoverTilt(element, options = {}) {
        const maxTilt = options.maxTilt || 10;
        const perspective = options.perspective || 1000;
        
        element.style.transformStyle = 'preserve-3d';
        element.style.perspective = `${perspective}px`;
        
        const handleMouseMove = (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * maxTilt;
            const rotateY = ((centerX - x) / centerX) * maxTilt;
            
            element.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        };
        
        const handleMouseLeave = () => {
            element.style.transform = 'rotateX(0deg) rotateY(0deg)';
        };
        
        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);
        
        // Return cleanup function
        return () => {
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }

    // Fade in animation
    fadeIn(element, options = {}) {
        return this.animate(element, { opacity: 1 }, {
            duration: 0.5,
            ...options
        });
    }

    // Fade out animation
    fadeOut(element, options = {}) {
        return this.animate(element, { opacity: 0 }, {
            duration: 0.5,
            ...options
        });
    }

    // Slide in from direction
    slideIn(element, direction = 'up', options = {}) {
        const variants = {
            up: { y: 0, opacity: 1 },
            down: { y: 0, opacity: 1 },
            left: { x: 0, opacity: 1 },
            right: { x: 0, opacity: 1 }
        };
        
        return this.animate(element, variants[direction], {
            duration: 0.6,
            ...options
        });
    }

    // Scale in animation
    scaleIn(element, options = {}) {
        return this.animate(element, { scale: 1, opacity: 1 }, {
            duration: 0.4,
            ease: 'ease-out',
            ...options
        });
    }

    // Pulse animation
    pulse(element, options = {}) {
        const pulseAnimation = () => {
            this.animate(element, { scale: 1.05 }, { duration: 0.2 })
                .then(() => this.animate(element, { scale: 1 }, { duration: 0.2 }));
        };
        
        pulseAnimation();
        
        if (options.repeat) {
            const interval = setInterval(pulseAnimation, (options.interval || 1) * 1000);
            setTimeout(() => clearInterval(interval), (options.repeat * options.interval || 5) * 1000);
        }
    }

    // Loading spinner animation
    spin(element, options = {}) {
        const duration = options.duration || 1;
        const iterations = options.iterations || 'infinite';
        
        element.style.animation = `spin ${duration}s linear ${iterations}`;
        
        // Add keyframes if not exists
        if (!document.getElementById('spin-keyframes')) {
            const style = document.createElement('style');
            style.id = 'spin-keyframes';
            style.textContent = `
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Create global animation engine
export const animationEngine = new AnimationEngine();

// Utility functions for common animations
export const fadeIn = (element, options) => animationEngine.fadeIn(element, options);
export const fadeOut = (element, options) => animationEngine.fadeOut(element, options);
export const slideIn = (element, direction, options) => animationEngine.slideIn(element, direction, options);
export const scaleIn = (element, options) => animationEngine.scaleIn(element, options);
export const typeText = (element, text, options) => animationEngine.typeText(element, text, options);
export const addHoverTilt = (element, options) => animationEngine.addHoverTilt(element, options);

export default animationEngine;