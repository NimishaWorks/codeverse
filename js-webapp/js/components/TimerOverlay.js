// Timer Overlay Component - Exact React Replica
export class TimerOverlay {
    constructor(duration = 3600) { // Default 1 hour
        this.duration = duration; // in seconds
        this.timeLeft = duration;
        this.isActive = false;
        this.isPaused = false;
        this.interval = null;
        this.startTime = null;
    }

    render() {
        if (!this.isActive) return '';

        const hours = Math.floor(this.timeLeft / 3600);
        const minutes = Math.floor((this.timeLeft % 3600) / 60);
        const seconds = this.timeLeft % 60;

        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        const percentage = ((this.duration - this.timeLeft) / this.duration) * 100;

        // Color based on time left
        let timeColor = 'text-green-400';
        let ringColor = 'stroke-green-500';
        let bgColor = 'from-green-500/20 to-emerald-500/20';
        let borderColor = 'border-green-500/30';

        if (this.timeLeft < this.duration * 0.25) {
            timeColor = 'text-red-400';
            ringColor = 'stroke-red-500';
            bgColor = 'from-red-500/20 to-orange-500/20';
            borderColor = 'border-red-500/30';
        } else if (this.timeLeft < this.duration * 0.5) {
            timeColor = 'text-yellow-400';
            ringColor = 'stroke-yellow-500';
            bgColor = 'from-yellow-500/20 to-orange-500/20';
            borderColor = 'border-yellow-500/30';
        }

        return `
            <div id="timerOverlay" class="fixed top-4 right-4 z-50">
                <div class="relative bg-gradient-to-br ${bgColor} backdrop-blur-xl rounded-2xl border-2 ${borderColor} shadow-2xl p-4">
                    <!-- Timer Display -->
                    <div class="flex flex-col items-center gap-3">
                        <!-- Circular Progress -->
                        <div class="relative w-32 h-32">
                            <!-- Background Circle -->
                            <svg class="w-full h-full transform -rotate-90">
                                <circle
                                    cx="64"
                                    cy="64"
                                    r="60"
                                    stroke="currentColor"
                                    stroke-width="4"
                                    fill="none"
                                    class="text-gray-700/30"
                                />
                                <!-- Progress Circle -->
                                <circle
                                    id="timerProgressCircle"
                                    cx="64"
                                    cy="64"
                                    r="60"
                                    stroke="currentColor"
                                    stroke-width="4"
                                    fill="none"
                                    class="${ringColor}"
                                    stroke-dasharray="377"
                                    stroke-dashoffset="${377 - (377 * percentage / 100)}"
                                    stroke-linecap="round"
                                    style="transition: stroke-dashoffset 1s linear"
                                />
                            </svg>

                            <!-- Time Display -->
                            <div class="absolute inset-0 flex flex-col items-center justify-center">
                                <div class="text-2xl font-bold ${timeColor} font-mono">
                                    ${formattedTime}
                                </div>
                                <div class="text-xs text-gray-400 mt-1">
                                    ${this.isPaused ? 'Paused' : 'Time Left'}
                                </div>
                            </div>
                        </div>

                        <!-- Controls -->
                        <div class="flex items-center gap-2">
                            <button id="pauseTimerButton" class="px-3 py-1.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg text-white text-xs font-semibold transition-all flex items-center gap-1">
                                ${this.isPaused ? `
                                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                    </svg>
                                    Resume
                                ` : `
                                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V4z" />
                                    </svg>
                                    Pause
                                `}
                            </button>
                            <button id="resetTimerButton" class="px-3 py-1.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg text-white text-xs font-semibold transition-all flex items-center gap-1">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Reset
                            </button>
                            <button id="closeTimerButton" class="px-3 py-1.5 bg-red-500/80 hover:bg-red-500 backdrop-blur-sm rounded-lg text-white text-xs font-semibold transition-all">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <!-- Warning Messages -->
                        ${this.timeLeft < 300 && !this.isPaused ? `
                            <div class="text-xs text-center ${timeColor} animate-pulse font-semibold">
                                ⚠️ Less than 5 minutes remaining!
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    activate(duration = null) {
        if (duration) {
            this.duration = duration;
            this.timeLeft = duration;
        }

        this.isActive = true;
        this.startTime = Date.now();
        this.startTimer();
        
        setTimeout(() => {
            this.attachEventListeners();
        }, 100);

        return true;
    }

    deactivate() {
        this.isActive = false;
        this.stopTimer();
        
        const overlay = document.getElementById('timerOverlay');
        if (overlay) {
            overlay.remove();
        }
    }

    startTimer() {
        this.stopTimer(); // Clear any existing interval
        
        this.interval = setInterval(() => {
            if (!this.isPaused && this.timeLeft > 0) {
                this.timeLeft--;
                this.updateDisplay();

                if (this.timeLeft === 0) {
                    this.onTimeUp();
                }
            }
        }, 1000);
    }

    stopTimer() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    pauseTimer() {
        this.isPaused = true;
        this.updateDisplay();
    }

    resumeTimer() {
        this.isPaused = false;
        this.updateDisplay();
    }

    resetTimer() {
        this.timeLeft = this.duration;
        this.isPaused = false;
        this.startTime = Date.now();
        this.updateDisplay();
    }

    updateDisplay() {
        const overlay = document.getElementById('timerOverlay');
        if (overlay) {
            const parent = overlay.parentElement;
            overlay.outerHTML = this.render();
            this.attachEventListeners();
        }
    }

    onTimeUp() {
        this.stopTimer();
        
        // Play alert sound (if available)
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBzbM');
        audio.play().catch(() => {});

        // Show notification
        if (window.anime) {
            anime({
                targets: '#timerOverlay',
                scale: [1, 1.1, 1],
                duration: 500,
                easing: 'easeInOutQuad',
                loop: 3
            });
        }

        // Trigger callback if set
        if (this.onTimeUpCallback) {
            this.onTimeUpCallback();
        }

        alert('⏰ Time\'s up! Your session has ended.');
    }

    attachEventListeners() {
        const pauseButton = document.getElementById('pauseTimerButton');
        const resetButton = document.getElementById('resetTimerButton');
        const closeButton = document.getElementById('closeTimerButton');

        if (pauseButton) {
            pauseButton.addEventListener('click', () => {
                if (this.isPaused) {
                    this.resumeTimer();
                } else {
                    this.pauseTimer();
                }
            });
        }

        if (resetButton) {
            resetButton.addEventListener('click', () => {
                if (confirm('Are you sure you want to reset the timer?')) {
                    this.resetTimer();
                }
            });
        }

        if (closeButton) {
            closeButton.addEventListener('click', () => {
                if (confirm('Are you sure you want to close the timer?')) {
                    this.deactivate();
                }
            });
        }
    }

    setOnTimeUpCallback(callback) {
        this.onTimeUpCallback = callback;
    }

    toggle(duration = null) {
        if (this.isActive) {
            this.deactivate();
        } else {
            this.activate(duration);
        }
    }

    getTimeLeft() {
        return this.timeLeft;
    }

    getFormattedTime() {
        const hours = Math.floor(this.timeLeft / 3600);
        const minutes = Math.floor((this.timeLeft % 3600) / 60);
        const seconds = this.timeLeft % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}
