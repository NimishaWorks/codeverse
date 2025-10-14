// Components converted from React to vanilla JS

// OnboardingQuiz Component
export class OnboardingQuiz {
    constructor(params = {}) {
        this.params = params;
    }

    render() {
        const container = document.createElement('div');
        container.innerHTML = `
            <div class="min-h-screen bg-gradient-to-br from-[#0b1020] via-[#101325] to-[#14182b] text-white flex items-center justify-center">
                <div class="text-center">
                    <h1 class="text-4xl font-bold mb-4">Welcome to CodeVerse!</h1>
                    <p class="text-gray-300 mb-8">Let's customize your learning experience</p>
                    <button data-navigate="/dashboard" 
                            class="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
                        Continue to Dashboard
                    </button>
                </div>
            </div>
        `;
        
        const element = container.firstElementChild;
        setTimeout(() => this.attachEventListeners(element), 0);
        return element;
    }

    attachEventListeners(element) {
        const navBtn = element.querySelector('[data-navigate]');
        if (navBtn) {
            navBtn.addEventListener('click', () => {
                window.router?.navigate('/dashboard');
            });
        }
    }
}

// CourseRoadmap Component
export class CourseRoadmap {
    constructor(params = {}) {
        this.params = params;
        this.element = null;
    }

    async render() {
        this.element = document.createElement('div');
        this.element.className = 'min-h-screen bg-gradient-to-br from-[#0b1020] via-[#101325] to-[#14182b] text-white';
        
        this.element.innerHTML = `
            <div class="max-w-7xl mx-auto px-6 py-8">
                <h1 class="text-4xl font-bold mb-4">Course Roadmap</h1>
                <p class="text-gray-300 mb-8">Subject: ${this.params.subject || 'Unknown'}</p>
                <div class="text-center">
                    <p class="text-gray-400 mb-4">Course content coming soon...</p>
                    <button onclick="window.location.href='/dashboard'" 
                            class="px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-500 transition-colors">
                        Back to Dashboard
                    </button>
                </div>
            </div>
        `;
        
        return this.element;
    }

    onMount() {}
    onDestroy() {}
}

// Additional placeholder components
export class LevelModule {
    constructor(params = {}) { this.params = params; this.element = null; }
    async render() {
        this.element = document.createElement('div');
        this.element.innerHTML = '<div class="min-h-screen bg-gray-900 text-white p-8"><h1>Level Module (Coming Soon)</h1></div>';
        return this.element;
    }
    onMount() {}
    onDestroy() {}
}

export class InterviewHub {
    constructor(params = {}) { this.params = params; this.element = null; }
    async render() {
        this.element = document.createElement('div');
        this.element.innerHTML = '<div class="min-h-screen bg-gray-900 text-white p-8"><h1>Interview Hub (Coming Soon)</h1></div>';
        return this.element;
    }
    onMount() {}
    onDestroy() {}
}

export class PPTConverter {
    constructor(params = {}) {
        this.params = params;
        this.selectedFile = null;
    }

    render() {
        const container = document.createElement('div');
        container.innerHTML = `
            <div class="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-8">
                <header class="mb-8">
                    <button data-back class="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Dashboard
                    </button>
                    <h1 class="text-4xl font-bold mb-2">📊 PPT to PDF Converter</h1>
                    <p class="text-gray-400">Convert your presentations to PDF format</p>
                </header>

                <div class="max-w-4xl mx-auto">
                    <!-- Upload Area -->
                    <div class="bg-gray-800/40 backdrop-blur-xl border-2 border-dashed border-gray-600 rounded-3xl p-12 text-center mb-8 hover:border-purple-500 transition-all"
                         data-drop-zone>
                        <div class="mb-6">
                            <svg class="w-24 h-24 mx-auto text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                        </div>
                        <h3 class="text-2xl font-bold mb-2">Drop your PPT file here</h3>
                        <p class="text-gray-400 mb-6">or click to browse</p>
                        <input type="file" accept=".ppt,.pptx" class="hidden" data-file-input>
                        <button data-browse class="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-lg transition-all">
                            Browse Files
                        </button>
                        <p class="text-sm text-gray-500 mt-4">Supported formats: .ppt, .pptx</p>
                    </div>

                    <!-- File Preview -->
                    <div data-file-preview class="hidden bg-gray-800/40 backdrop-blur-xl border border-gray-700 rounded-3xl p-6">
                        <div class="flex items-center justify-between mb-4">
                            <div class="flex items-center gap-4">
                                <div class="w-16 h-16 bg-orange-500/20 rounded-xl flex items-center justify-center text-3xl">
                                    📄
                                </div>
                                <div>
                                    <h4 class="font-bold text-lg" data-filename>presentation.pptx</h4>
                                    <p class="text-sm text-gray-400" data-filesize>2.5 MB</p>
                                </div>
                            </div>
                            <button data-remove class="text-red-400 hover:text-red-300 transition-colors">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        <!-- Conversion Options -->
                        <div class="mb-6">
                            <h5 class="font-bold mb-3">Conversion Options</h5>
                            <div class="space-y-2">
                                <label class="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
                                    <input type="checkbox" checked class="w-5 h-5 text-purple-600 rounded">
                                    <span>Maintain original formatting</span>
                                </label>
                                <label class="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
                                    <input type="checkbox" class="w-5 h-5 text-purple-600 rounded">
                                    <span>Include slide notes</span>
                                </label>
                                <label class="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
                                    <input type="checkbox" class="w-5 h-5 text-purple-600 rounded">
                                    <span>High quality images</span>
                                </label>
                            </div>
                        </div>

                        <!-- Convert Button -->
                        <button data-convert class="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-lg transition-all">
                            Convert to PDF
                        </button>
                    </div>

                    <!-- Features -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        <div class="bg-gray-800/40 backdrop-blur-xl border border-gray-700 rounded-2xl p-6 text-center">
                            <div class="text-4xl mb-3">⚡</div>
                            <h4 class="font-bold mb-2">Fast Conversion</h4>
                            <p class="text-sm text-gray-400">Convert files in seconds</p>
                        </div>
                        <div class="bg-gray-800/40 backdrop-blur-xl border border-gray-700 rounded-2xl p-6 text-center">
                            <div class="text-4xl mb-3">🔒</div>
                            <h4 class="font-bold mb-2">Secure</h4>
                            <p class="text-sm text-gray-400">Your files are private</p>
                        </div>
                        <div class="bg-gray-800/40 backdrop-blur-xl border border-gray-700 rounded-2xl p-6 text-center">
                            <div class="text-4xl mb-3">💎</div>
                            <h4 class="font-bold mb-2">High Quality</h4>
                            <p class="text-sm text-gray-400">Maintains formatting</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        const element = container.firstElementChild;
        setTimeout(() => this.attachEventListeners(element), 0);
        return element;
    }

    attachEventListeners(element) {
        const backBtn = element.querySelector('[data-back]');
        const browseBtn = element.querySelector('[data-browse]');
        const fileInput = element.querySelector('[data-file-input]');
        const dropZone = element.querySelector('[data-drop-zone]');
        const filePreview = element.querySelector('[data-file-preview]');
        const removeBtn = element.querySelector('[data-remove]');
        const convertBtn = element.querySelector('[data-convert]');

        if (backBtn) {
            backBtn.addEventListener('click', () => {
                window.router?.navigate('/dashboard');
            });
        }

        if (browseBtn && fileInput) {
            browseBtn.addEventListener('click', () => fileInput.click());
            fileInput.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                    this.handleFileSelect(e.target.files[0], element);
                }
            });
        }

        if (dropZone) {
            dropZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropZone.classList.add('border-purple-500', 'bg-purple-500/10');
            });
            
            dropZone.addEventListener('dragleave', () => {
                dropZone.classList.remove('border-purple-500', 'bg-purple-500/10');
            });
            
            dropZone.addEventListener('drop', (e) => {
                e.preventDefault();
                dropZone.classList.remove('border-purple-500', 'bg-purple-500/10');
                if (e.dataTransfer.files.length > 0) {
                    this.handleFileSelect(e.dataTransfer.files[0], element);
                }
            });
        }

        if (removeBtn) {
            removeBtn.addEventListener('click', () => {
                this.selectedFile = null;
                filePreview.classList.add('hidden');
            });
        }

        if (convertBtn) {
            convertBtn.addEventListener('click', () => {
                this.convertFile(element);
            });
        }
    }

    handleFileSelect(file, element) {
        if (!file.name.match(/\.(ppt|pptx)$/i)) {
            alert('Please select a valid PPT file');
            return;
        }

        this.selectedFile = file;
        const filePreview = element.querySelector('[data-file-preview]');
        const filename = element.querySelector('[data-filename]');
        const filesize = element.querySelector('[data-filesize]');

        if (filename) filename.textContent = file.name;
        if (filesize) filesize.textContent = this.formatFileSize(file.size);
        if (filePreview) filePreview.classList.remove('hidden');
    }

    formatFileSize(bytes) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    }

    convertFile(element) {
        const convertBtn = element.querySelector('[data-convert]');
        if (convertBtn) {
            convertBtn.textContent = 'Converting...';
            convertBtn.disabled = true;
            
            setTimeout(() => {
                alert('✅ File converted successfully! PDF download will start...');
                convertBtn.textContent = 'Convert to PDF';
                convertBtn.disabled = false;
            }, 2000);
        }
    }
}

export class UserProfile {
    constructor(params = {}) { this.params = params; this.element = null; }
    async render() {
        this.element = document.createElement('div');
        this.element.innerHTML = '<div class="min-h-screen bg-gray-900 text-white p-8"><h1>User Profile (Coming Soon)</h1></div>';
        return this.element;
    }
    onMount() {}
    onDestroy() {}
}

export class DailyQuest {
    constructor(params = {}) { this.params = params; this.element = null; }
    async render() {
        this.element = document.createElement('div');
        this.element.innerHTML = '<div class="min-h-screen bg-gray-900 text-white p-8"><h1>Daily Quest (Coming Soon)</h1></div>';
        return this.element;
    }
    onMount() {}
    onDestroy() {}
}

export class Leaderboard {
    constructor(params = {}) {
        this.params = params;
        this.topUsers = [
            { rank: 1, name: 'CodeMaster', xp: 5420, avatar: '👑', streak: 45 },
            { rank: 2, name: 'AlgoNinja', xp: 4890, avatar: '🥷', streak: 38 },
            { rank: 3, name: 'DataWizard', xp: 4560, avatar: '🧙', streak: 32 },
            { rank: 4, name: 'ByteWarrior', xp: 4120, avatar: '⚔️', streak: 28 },
            { rank: 5, name: 'LogicQueen', xp: 3850, avatar: '👸', streak: 25 },
            { rank: 6, name: 'StackGuru', xp: 3640, avatar: '🎯', streak: 22 },
            { rank: 7, name: 'LoopLegend', xp: 3420, avatar: '🔁', streak: 20 },
            { rank: 8, name: 'Anisha', xp: 2450, avatar: '👩‍💻', streak: 12, isCurrentUser: true },
            { rank: 9, name: 'CodeCrusher', xp: 2180, avatar: '💪', streak: 15 },
            { rank: 10, name: 'DevDynamo', xp: 1950, avatar: '⚡', streak: 10 }
        ];
    }

    render() {
        const container = document.createElement('div');
        container.innerHTML = `
            <div class="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
                <header class="border-b border-gray-800 bg-gray-900/50 backdrop-blur-lg">
                    <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                        <button data-back class="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                            </svg>
                            Back
                        </button>
                        <h1 class="text-2xl font-bold">Leaderboard 🏆</h1>
                        <div class="w-24"></div>
                    </div>
                </header>

                <div class="max-w-5xl mx-auto px-6 py-12">
                    <!-- Top 3 Podium -->
                    <div class="grid grid-cols-3 gap-6 mb-12">
                        <!-- 2nd Place -->
                        <div class="flex flex-col items-center">
                            <div class="relative mb-4">
                                <div class="w-24 h-24 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-4xl border-4 border-gray-500">
                                    ${this.topUsers[1].avatar}
                                </div>
                                <div class="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gray-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                                    2
                                </div>
                            </div>
                            <h3 class="text-lg font-bold mb-1">${this.topUsers[1].name}</h3>
                            <p class="text-2xl font-bold text-gray-300">${this.topUsers[1].xp} XP</p>
                            <div class="h-32 w-full bg-gradient-to-t from-gray-600 to-gray-500 rounded-t-2xl mt-4"></div>
                        </div>

                        <!-- 1st Place -->
                        <div class="flex flex-col items-center -mt-8">
                            <div class="relative mb-4">
                                <div class="w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-5xl border-4 border-yellow-400 animate-pulse">
                                    ${this.topUsers[0].avatar}
                                </div>
                                <div class="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
                                    1
                                </div>
                            </div>
                            <h3 class="text-xl font-bold mb-1">${this.topUsers[0].name}</h3>
                            <p class="text-3xl font-bold text-yellow-400">${this.topUsers[0].xp} XP</p>
                            <div class="h-40 w-full bg-gradient-to-t from-yellow-600 to-yellow-400 rounded-t-2xl mt-4"></div>
                        </div>

                        <!-- 3rd Place -->
                        <div class="flex flex-col items-center">
                            <div class="relative mb-4">
                                <div class="w-24 h-24 bg-gradient-to-br from-orange-600 to-orange-800 rounded-full flex items-center justify-center text-4xl border-4 border-orange-600">
                                    ${this.topUsers[2].avatar}
                                </div>
                                <div class="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-orange-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                                    3
                                </div>
                            </div>
                            <h3 class="text-lg font-bold mb-1">${this.topUsers[2].name}</h3>
                            <p class="text-2xl font-bold text-orange-400">${this.topUsers[2].xp} XP</p>
                            <div class="h-24 w-full bg-gradient-to-t from-orange-700 to-orange-600 rounded-t-2xl mt-4"></div>
                        </div>
                    </div>

                    <!-- Rest of Leaderboard -->
                    <div class="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-6">
                        <div class="space-y-3">
                            ${this.topUsers.slice(3).map(user => `
                                <div class="flex items-center justify-between p-4 rounded-xl transition-all hover:scale-105 ${
                                    user.isCurrentUser
                                        ? 'bg-purple-500/20 border-2 border-purple-500'
                                        : 'bg-gray-900/50 hover:bg-gray-800/50'
                                }">
                                    <div class="flex items-center gap-4">
                                        <div class="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center font-bold">
                                            ${user.rank}
                                        </div>
                                        <div class="text-3xl">${user.avatar}</div>
                                        <div>
                                            <h4 class="font-bold">
                                                ${user.name}
                                                ${user.isCurrentUser ? '<span class="ml-2 text-purple-400">(You)</span>' : ''}
                                            </h4>
                                            <p class="text-sm text-gray-400">
                                                🔥 ${user.streak} day streak
                                            </p>
                                        </div>
                                    </div>
                                    <div class="text-right">
                                        <div class="text-2xl font-bold text-purple-400">${user.xp}</div>
                                        <div class="text-sm text-gray-400">XP</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Stats Card -->
                    <div class="mt-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-3xl p-6">
                        <h3 class="text-xl font-bold mb-4">💡 Climb the ranks!</h3>
                        <p class="text-gray-300">
                            Complete daily quests, finish courses, and maintain your streak to earn more XP and rise in the leaderboard!
                        </p>
                    </div>
                </div>
            </div>
        `;
        
        const element = container.firstElementChild;
        setTimeout(() => this.attachEventListeners(element), 0);
        return element;
    }

    attachEventListeners(element) {
        const backBtn = element.querySelector('[data-back]');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                window.router?.navigate('/dashboard');
            });
        }
    }
}

export class GameHub {
    constructor(params = {}) { this.params = params; this.element = null; }
    async render() {
        this.element = document.createElement('div');
        this.element.innerHTML = '<div class="min-h-screen bg-gray-900 text-white p-8"><h1>Game Hub (Coming Soon)</h1></div>';
        return this.element;
    }
    onMount() {}
    onDestroy() {}
}

// Export individual components as default for easy importing
export default {
    OnboardingQuiz,
    CourseRoadmap,
    LevelModule,
    InterviewHub,
    PPTConverter,
    UserProfile,
    DailyQuest,
    Leaderboard,
    GameHub
};