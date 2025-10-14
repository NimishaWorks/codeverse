// Hackathons Component - Enhanced Version
import { toastManager } from '../utils/toast-manager.js';

export class Hackathons {
    constructor() {
        this.selectedFilter = 'all';
        this.searchQuery = '';
        this.hackathons = [
            {
                id: 1,
                name: 'Smart India Hackathon 2024',
                organizer: 'Government of India',
                date: '2024-12-15',
                duration: '36 hours',
                prize: '₹1,00,000',
                participants: '5000+',
                mode: 'Hybrid',
                difficulty: 'Medium',
                tags: ['AI/ML', 'IoT', 'Blockchain'],
                logo: '🇮🇳',
                status: 'Open',
                deadline: '2024-11-30'
            },
            {
                id: 2,
                name: 'HackWithIndia 2024',
                organizer: 'Major League Hacking',
                date: '2024-11-20',
                duration: '48 hours',
                prize: '$5,000',
                participants: '2000+',
                mode: 'Online',
                difficulty: 'Hard',
                tags: ['Web Dev', 'Mobile', 'Cloud'],
                logo: '🌐',
                status: 'Open',
                deadline: '2024-11-10'
            },
            {
                id: 3,
                name: 'InOut Hackathon',
                organizer: 'InOut Dev',
                date: '2024-12-01',
                duration: '30 hours',
                prize: '₹75,000',
                participants: '1500+',
                mode: 'Offline',
                difficulty: 'Medium',
                tags: ['Open Innovation', 'Design', 'AI'],
                logo: '💡',
                status: 'Open',
                deadline: '2024-11-25'
            },
            {
                id: 4,
                name: 'Google Solution Challenge',
                organizer: 'Google',
                date: '2025-01-15',
                duration: '3 months',
                prize: '$3,000',
                participants: '10000+',
                mode: 'Online',
                difficulty: 'Hard',
                tags: ['Social Impact', 'Google Cloud', 'Sustainability'],
                logo: '🎯',
                status: 'Coming Soon',
                deadline: '2024-12-31'
            },
            {
                id: 5,
                name: 'Hack36',
                organizer: 'MNNIT Allahabad',
                date: '2024-11-28',
                duration: '36 hours',
                prize: '₹1,50,000',
                participants: '3000+',
                mode: 'Hybrid',
                difficulty: 'Medium',
                tags: ['Full Stack', 'DevOps', 'Security'],
                logo: '🚀',
                status: 'Open',
                deadline: '2024-11-20'
            },
            {
                id: 6,
                name: 'ETHIndia',
                organizer: 'Devfolio',
                date: '2024-12-10',
                duration: '40 hours',
                prize: '$50,000',
                participants: '2500+',
                mode: 'Offline',
                difficulty: 'Hard',
                tags: ['Blockchain', 'Web3', 'DeFi'],
                logo: '⛓️',
                status: 'Open',
                deadline: '2024-11-30'
            }
        ];

        this.filters = ['all', 'open', 'coming-soon', 'online', 'offline', 'hybrid'];
    }

    render() {
        const filteredHackathons = this.getFilteredHackathons();
        
        const container = document.createElement('div');
        container.innerHTML = `
            <div class="max-w-7xl mx-auto p-6">
                <!-- Header -->
                <div class="mb-8 text-center animate-fade-in">
                    <h1 class="text-4xl font-bold mb-3 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                        🏆 Hackathon Arena 🏆
                    </h1>
                    <p class="text-gray-400 text-lg">Discover and participate in amazing hackathons</p>
                </div>

                <!-- Search & Filter Bar -->
                <div class="mb-6 bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <!-- Search -->
                        <div class="relative">
                            <input type="text" 
                                   id="hackathonSearch" 
                                   placeholder="Search hackathons..." 
                                   value="${this.searchQuery}"
                                   class="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 pl-12 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500">
                            <svg class="absolute left-4 top-4 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                        </div>

                        <!-- Sort -->
                        <select id="hackathonSort" class="bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white">
                            <option value="date">Sort by Date</option>
                            <option value="prize">Sort by Prize</option>
                            <option value="participants">Sort by Participants</option>
                        </select>
                    </div>

                    <!-- Filter Pills -->
                    <div class="flex flex-wrap gap-2" id="filterPills">
                        ${this.filters.map(filter => `
                            <button data-filter="${filter}" class="filter-pill px-4 py-2 rounded-lg font-semibold transition-all ${
                                this.selectedFilter === filter 
                                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                            }">
                                ${filter.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                            </button>
                        `).join('')}
                    </div>
                </div>

                <!-- Stats Overview -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div class="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl p-6 text-center">
                        <div class="text-4xl mb-2">🎯</div>
                        <div class="text-3xl font-bold text-purple-400">${this.hackathons.length}</div>
                        <div class="text-sm text-gray-400">Total Hackathons</div>
                    </div>
                    <div class="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-2xl p-6 text-center">
                        <div class="text-4xl mb-2">✅</div>
                        <div class="text-3xl font-bold text-green-400">${this.hackathons.filter(h => h.status === 'Open').length}</div>
                        <div class="text-sm text-gray-400">Open Now</div>
                    </div>
                    <div class="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 border border-yellow-500/30 rounded-2xl p-6 text-center">
                        <div class="text-4xl mb-2">💰</div>
                        <div class="text-2xl font-bold text-yellow-400">₹5L+</div>
                        <div class="text-sm text-gray-400">Total Prizes</div>
                    </div>
                    <div class="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-2xl p-6 text-center">
                        <div class="text-4xl mb-2">👥</div>
                        <div class="text-2xl font-bold text-blue-400">25K+</div>
                        <div class="text-sm text-gray-400">Participants</div>
                    </div>
                </div>

                <!-- Hackathon Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    ${filteredHackathons.map(hack => this.renderHackathonCard(hack)).join('')}
                </div>

                <!-- Resources Section -->
                <div class="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8">
                    <h2 class="text-2xl font-bold mb-6">📚 Hackathon Resources</h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="bg-gray-700/30 rounded-xl p-6">
                            <h3 class="text-lg font-bold mb-4 flex items-center gap-2">
                                <span>🔍</span> Top Platforms
                            </h3>
                            <div class="space-y-3">
                                <a href="https://devfolio.co" target="_blank" class="block p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg hover:bg-purple-500/20 transition-all">
                                    <div class="font-semibold text-purple-400">Devfolio</div>
                                    <div class="text-xs text-gray-400">India's largest hackathon platform</div>
                                </a>
                                <a href="https://unstop.com" target="_blank" class="block p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg hover:bg-blue-500/20 transition-all">
                                    <div class="font-semibold text-blue-400">Unstop</div>
                                    <div class="text-xs text-gray-400">Competitions & hackathons</div>
                                </a>
                                <a href="https://mlh.io" target="_blank" class="block p-3 bg-green-500/10 border border-green-500/30 rounded-lg hover:bg-green-500/20 transition-all">
                                    <div class="font-semibold text-green-400">MLH</div>
                                    <div class="text-xs text-gray-400">Major League Hacking</div>
                                </a>
                            </div>
                        </div>

                        <div class="bg-gray-700/30 rounded-xl p-6">
                            <h3 class="text-lg font-bold mb-4 flex items-center gap-2">
                                <span>💡</span> Success Tips
                            </h3>
                            <ul class="space-y-2 text-sm text-gray-300">
                                <li class="flex items-start gap-2"><span class="text-green-400">✓</span><span>Form a balanced team (2-4 members)</span></li>
                                <li class="flex items-start gap-2"><span class="text-green-400">✓</span><span>Focus on solving real problems</span></li>
                                <li class="flex items-start gap-2"><span class="text-green-400">✓</span><span>Build a working MVP first</span></li>
                                <li class="flex items-start gap-2"><span class="text-green-400">✓</span><span>Practice your pitch presentation</span></li>
                                <li class="flex items-start gap-2"><span class="text-green-400">✓</span><span>Network with other participants</span></li>
                                <li class="flex items-start gap-2"><span class="text-green-400">✓</span><span>Document your process</span></li>
                            </ul>
                        </div>

                        <div class="bg-gray-700/30 rounded-xl p-6">
                            <h3 class="text-lg font-bold mb-4 flex items-center gap-2">
                                <span>🛠️</span> Must-Have Tools
                            </h3>
                            <div class="space-y-2 text-sm text-gray-300">
                                <div class="p-2 bg-gray-800/50 rounded">📝 Notion/Miro - Planning</div>
                                <div class="p-2 bg-gray-800/50 rounded">🎨 Figma - Design</div>
                                <div class="p-2 bg-gray-800/50 rounded">💻 GitHub - Version Control</div>
                                <div class="p-2 bg-gray-800/50 rounded">☁️ Vercel/Netlify - Deploy</div>
                                <div class="p-2 bg-gray-800/50 rounded">🔥 Firebase - Backend</div>
                                <div class="p-2 bg-gray-800/50 rounded">📊 Canva - Presentation</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        const element = container.firstElementChild;
        setTimeout(() => this.attachEventListeners(), 0);
        return element;
    }

    renderHackathonCard(hack) {
        const statusColors = {
            'Open': 'from-green-500 to-emerald-500',
            'Coming Soon': 'from-yellow-500 to-orange-500',
            'Closed': 'from-red-500 to-pink-500'
        };

        const modeIcons = {
            'Online': '🌐',
            'Offline': '📍',
            'Hybrid': '🔄'
        };

        const difficultyColors = {
            'Easy': 'text-green-400',
            'Medium': 'text-yellow-400',
            'Hard': 'text-red-400'
        };

        return `
            <div class="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-purple-500/50 hover:scale-105 transition-all cursor-pointer" data-hackathon="${hack.id}">
                <!-- Header -->
                <div class="flex items-start justify-between mb-4">
                    <div class="text-5xl">${hack.logo}</div>
                    <div class="px-3 py-1 bg-gradient-to-r ${statusColors[hack.status]} rounded-full text-xs font-bold text-white">
                        ${hack.status}
                    </div>
                </div>

                <!-- Title & Organizer -->
                <h3 class="text-xl font-bold mb-2">${hack.name}</h3>
                <p class="text-sm text-gray-400 mb-4">by ${hack.organizer}</p>

                <!-- Details Grid -->
                <div class="space-y-2 mb-4 text-sm">
                    <div class="flex items-center justify-between">
                        <span class="text-gray-400">📅 Date:</span>
                        <span class="font-semibold">${new Date(hack.date).toLocaleDateString()}</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-gray-400">⏱️ Duration:</span>
                        <span class="font-semibold">${hack.duration}</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-gray-400">💰 Prize:</span>
                        <span class="font-semibold text-yellow-400">${hack.prize}</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-gray-400">👥 Participants:</span>
                        <span class="font-semibold">${hack.participants}</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-gray-400">${modeIcons[hack.mode]} Mode:</span>
                        <span class="font-semibold">${hack.mode}</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-gray-400">⚡ Difficulty:</span>
                        <span class="font-semibold ${difficultyColors[hack.difficulty]}">${hack.difficulty}</span>
                    </div>
                </div>

                <!-- Tags -->
                <div class="flex flex-wrap gap-2 mb-4">
                    ${hack.tags.map(tag => `
                        <span class="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs border border-purple-500/30">${tag}</span>
                    `).join('')}
                </div>

                <!-- Deadline Warning -->
                ${hack.status === 'Open' ? `
                    <div class="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4">
                        <div class="text-xs text-red-400 font-semibold">⏰ Deadline: ${new Date(hack.deadline).toLocaleDateString()}</div>
                    </div>
                ` : ''}

                <!-- Action Button -->
                <button class="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all ${hack.status !== 'Open' ? 'opacity-50 cursor-not-allowed' : ''}">
                    ${hack.status === 'Open' ? '🚀 Register Now' : hack.status === 'Coming Soon' ? '🔔 Notify Me' : '❌ Registration Closed'}
                </button>
            </div>
        `;
    }

    getFilteredHackathons() {
        let filtered = [...this.hackathons];

        // Apply filter
        if (this.selectedFilter !== 'all') {
            if (this.selectedFilter === 'open') {
                filtered = filtered.filter(h => h.status === 'Open');
            } else if (this.selectedFilter === 'coming-soon') {
                filtered = filtered.filter(h => h.status === 'Coming Soon');
            } else {
                const mode = this.selectedFilter.charAt(0).toUpperCase() + this.selectedFilter.slice(1);
                filtered = filtered.filter(h => h.mode === mode);
            }
        }

        // Apply search
        if (this.searchQuery) {
            const query = this.searchQuery.toLowerCase();
            filtered = filtered.filter(h => 
                h.name.toLowerCase().includes(query) || 
                h.organizer.toLowerCase().includes(query) ||
                h.tags.some(tag => tag.toLowerCase().includes(query))
            );
        }

        return filtered;
    }

    attachEventListeners() {
        // Search
        document.getElementById('hackathonSearch')?.addEventListener('input', (e) => {
            this.searchQuery = e.target.value;
            this.rerender();
        });

        // Filter pills
        document.querySelectorAll('.filter-pill').forEach(pill => {
            pill.addEventListener('click', (e) => {
                this.selectedFilter = e.target.dataset.filter;
                this.rerender();
            });
        });

        // Hackathon cards
        document.querySelectorAll('[data-hackathon]').forEach(card => {
            card.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.dataset.hackathon);
                const hack = this.hackathons.find(h => h.id === id);
                if (hack.status === 'Open') {
                    toastManager.show(`🚀 Opening ${hack.name} on Devfolio...`, 'info');
                    // Open Devfolio for most hackathons
                    setTimeout(() => window.open('https://devfolio.co/hackathons', '_blank'), 500);
                } else if (hack.status === 'Coming Soon') {
                    toastManager.show(`🔔 You'll be notified when ${hack.name} opens!`, 'success');
                } else {
                    toastManager.show('Registration closed for this hackathon', 'error');
                }
            });
        });

        // Direct platform links
        document.querySelectorAll('a[href="https://devfolio.co"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                toastManager.show('Opening Devfolio...', 'info');
                window.open('https://devfolio.co/hackathons', '_blank');
            });
        });

        document.querySelectorAll('a[href="https://unstop.com"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                toastManager.show('Opening Unstop...', 'info');
                window.open('https://unstop.com/hackathons', '_blank');
            });
        });

        document.querySelectorAll('a[href="https://mlh.io"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                toastManager.show('Opening MLH...', 'info');
                window.open('https://mlh.io/seasons/2025/events', '_blank');
            });
        });

        // Sort
        document.getElementById('hackathonSort')?.addEventListener('change', (e) => {
            const sortBy = e.target.value;
            if (sortBy === 'date') {
                this.hackathons.sort((a, b) => new Date(a.date) - new Date(b.date));
            } else if (sortBy === 'prize') {
                // Simple sort by prize (would need better parsing in production)
                this.hackathons.sort((a, b) => b.prize.localeCompare(a.prize));
            }
            this.rerender();
        });
    }

    rerender() {
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.innerHTML = this.render();
            this.attachEventListeners();
        }
    }
}
