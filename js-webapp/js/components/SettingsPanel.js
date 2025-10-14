// Settings Panel Component - Exact React Replica
export class SettingsPanel {
    constructor(initialSettings = {}) {
        this.settings = {
            camera: false,
            timer: false,
            tutorials: true,
            ...initialSettings
        };
        this.isOpen = false;
        this.onChange = null;
    }

    render() {
        if (!this.isOpen) return '';

        return `
            <!-- Settings Panel Overlay -->
            <div id="settingsPanel" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                <div class="relative bg-gray-900 rounded-3xl border-2 border-purple-500/30 shadow-2xl w-full max-w-md mx-4 overflow-hidden">
                    <!-- Header -->
                    <div class="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-b border-gray-700/50 p-6">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                                    <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 class="text-xl font-bold text-white">Session Settings</h2>
                                    <p class="text-xs text-gray-400">Configure your coding environment</p>
                                </div>
                            </div>
                            <button id="closeSettingsButton" class="text-gray-400 hover:text-white transition-colors">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <!-- Settings Content -->
                    <div class="p-6 space-y-4">
                        <!-- Camera Setting -->
                        <div class="bg-gray-800/50 rounded-2xl p-4 border border-gray-700/50 hover:border-purple-500/30 transition-all">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                                        <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 class="text-sm font-semibold text-white">Camera Monitoring</h3>
                                        <p class="text-xs text-gray-400">Enable webcam during session</p>
                                    </div>
                                </div>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" id="cameraToggle" class="sr-only peer" ${this.settings.camera ? 'checked' : ''}>
                                    <div class="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                                </label>
                            </div>
                            <div class="mt-3 text-xs text-gray-500 bg-black/20 rounded-lg p-2">
                                💡 <span class="text-gray-400">Your video feed will be visible in the bottom-right corner</span>
                            </div>
                        </div>

                        <!-- Timer Setting -->
                        <div class="bg-gray-800/50 rounded-2xl p-4 border border-gray-700/50 hover:border-purple-500/30 transition-all">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                                        <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 class="text-sm font-semibold text-white">Session Timer</h3>
                                        <p class="text-xs text-gray-400">Track your coding time</p>
                                    </div>
                                </div>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" id="timerToggle" class="sr-only peer" ${this.settings.timer ? 'checked' : ''}>
                                    <div class="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                </label>
                            </div>
                            ${this.settings.timer ? `
                                <div class="mt-3 space-y-2">
                                    <label class="text-xs text-gray-400">Duration (minutes)</label>
                                    <input type="number" id="timerDuration" min="1" max="180" value="60" class="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                                </div>
                            ` : ''}
                            <div class="mt-3 text-xs text-gray-500 bg-black/20 rounded-lg p-2">
                                ⏱️ <span class="text-gray-400">Timer will appear in the top-right corner</span>
                            </div>
                        </div>

                        <!-- Tutorials Setting -->
                        <div class="bg-gray-800/50 rounded-2xl p-4 border border-gray-700/50 hover:border-purple-500/30 transition-all">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                                        <svg class="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 class="text-sm font-semibold text-white">Helpful Tutorials</h3>
                                        <p class="text-xs text-gray-400">Show hints and tips</p>
                                    </div>
                                </div>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" id="tutorialsToggle" class="sr-only peer" ${this.settings.tutorials ? 'checked' : ''}>
                                    <div class="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                                </label>
                            </div>
                            <div class="mt-3 text-xs text-gray-500 bg-black/20 rounded-lg p-2">
                                💡 <span class="text-gray-400">Recommended for beginners learning to code</span>
                            </div>
                        </div>
                    </div>

                    <!-- Footer Actions -->
                    <div class="border-t border-gray-700/50 p-6 flex gap-3">
                        <button id="resetSettingsButton" class="flex-1 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-semibold transition-all text-sm">
                            Reset to Default
                        </button>
                        <button id="saveSettingsButton" class="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl font-semibold transition-all text-sm">
                            Save & Apply
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    open() {
        this.isOpen = true;
        
        // Add to DOM
        const container = document.createElement('div');
        container.innerHTML = this.render();
        document.body.appendChild(container.firstElementChild);
        
        // Animate in
        if (window.anime) {
            anime({
                targets: '#settingsPanel > div',
                scale: [0.9, 1],
                opacity: [0, 1],
                duration: 300,
                easing: 'easeOutCubic'
            });
        }
        
        setTimeout(() => this.attachEventListeners(), 0);
    }

    close() {
        this.isOpen = false;
        
        const panel = document.getElementById('settingsPanel');
        if (panel) {
            if (window.anime) {
                anime({
                    targets: panel,
                    opacity: [1, 0],
                    duration: 200,
                    easing: 'easeOutCubic',
                    complete: () => panel.remove()
                });
            } else {
                panel.remove();
            }
        }
    }

    attachEventListeners() {
        const closeButton = document.getElementById('closeSettingsButton');
        const saveButton = document.getElementById('saveSettingsButton');
        const resetButton = document.getElementById('resetSettingsButton');
        
        const cameraToggle = document.getElementById('cameraToggle');
        const timerToggle = document.getElementById('timerToggle');
        const tutorialsToggle = document.getElementById('tutorialsToggle');

        if (closeButton) {
            closeButton.addEventListener('click', () => this.close());
        }

        if (saveButton) {
            saveButton.addEventListener('click', () => this.save());
        }

        if (resetButton) {
            resetButton.addEventListener('click', () => this.reset());
        }

        if (cameraToggle) {
            cameraToggle.addEventListener('change', (e) => {
                this.settings.camera = e.target.checked;
            });
        }

        if (timerToggle) {
            timerToggle.addEventListener('change', (e) => {
                this.settings.timer = e.target.checked;
                // Rerender to show/hide duration input
                this.rerender();
            });
        }

        if (tutorialsToggle) {
            tutorialsToggle.addEventListener('change', (e) => {
                this.settings.tutorials = e.target.checked;
            });
        }

        // Click outside to close
        const panel = document.getElementById('settingsPanel');
        if (panel) {
            panel.addEventListener('click', (e) => {
                if (e.target === panel) {
                    this.close();
                }
            });
        }
    }

    rerender() {
        const panel = document.getElementById('settingsPanel');
        if (panel) {
            panel.outerHTML = this.render();
            this.attachEventListeners();
        }
    }

    save() {
        // Save to localStorage
        localStorage.setItem('codeverse_settings', JSON.stringify(this.settings));
        
        // Trigger onChange callback
        if (this.onChange) {
            this.onChange(this.settings);
        }

        // Show success message
        const saveButton = document.getElementById('saveSettingsButton');
        if (saveButton) {
            const originalText = saveButton.textContent;
            saveButton.textContent = '✓ Saved!';
            saveButton.classList.add('bg-green-500');
            
            setTimeout(() => {
                saveButton.textContent = originalText;
                saveButton.classList.remove('bg-green-500');
            }, 1500);
        }

        // Close after saving
        setTimeout(() => this.close(), 1000);
    }

    reset() {
        if (confirm('Reset all settings to default values?')) {
            this.settings = {
                camera: false,
                timer: false,
                tutorials: true
            };
            this.rerender();
        }
    }

    loadSettings() {
        const saved = localStorage.getItem('codeverse_settings');
        if (saved) {
            try {
                this.settings = JSON.parse(saved);
            } catch (e) {
                console.error('Failed to load settings:', e);
            }
        }
    }

    getSettings() {
        return { ...this.settings };
    }

    setOnChange(callback) {
        this.onChange = callback;
    }
}
