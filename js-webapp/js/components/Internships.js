// Internships Component - Enhanced Version
import { toastManager } from '../utils/toast-manager.js';

export class Internships {
    constructor() {
        this.selectedFilter = 'all';
        this.searchQuery = '';
        this.savedInternships = [];
        
        this.internships = [
            {
                id: 1,
                company: 'Google',
                role: 'Software Engineering Intern',
                location: 'Bangalore, India',
                duration: '3 months',
                stipend: '₹1,00,000/month',
                type: 'Full-time',
                mode: 'Hybrid',
                skills: ['Python', 'DSA', 'System Design'],
                logo: '🔍',
                posted: '2 days ago',
                deadline: '2024-12-15',
                openings: 15,
                applicants: 2500
            },
            {
                id: 2,
                company: 'Microsoft',
                role: 'Product Manager Intern',
                location: 'Hyderabad, India',
                duration: '6 months',
                stipend: '₹80,000/month',
                type: 'Full-time',
                mode: 'Hybrid',
                skills: ['Product Strategy', 'Analytics', 'Communication'],
                logo: '💻',
                posted: '5 days ago',
                deadline: '2024-12-20',
                openings: 10,
                applicants: 1800
            },
            {
                id: 3,
                company: 'Amazon',
                role: 'SDE Intern',
                location: 'Bangalore, India',
                duration: '2 months',
                stipend: '₹95,000/month',
                type: 'Full-time',
                mode: 'Onsite',
                skills: ['Java', 'AWS', 'Microservices'],
                logo: '📦',
                posted: '1 week ago',
                deadline: '2024-11-30',
                openings: 20,
                applicants: 3200
            },
            {
                id: 4,
                company: 'Flipkart',
                role: 'Data Science Intern',
                location: 'Bangalore, India',
                duration: '4 months',
                stipend: '₹60,000/month',
                type: 'Full-time',
                mode: 'Hybrid',
                skills: ['Python', 'ML', 'SQL'],
                logo: '🛒',
                posted: '3 days ago',
                deadline: '2024-12-10',
                openings: 8,
                applicants: 1500
            },
            {
                id: 5,
                company: 'Zomato',
                role: 'Frontend Developer Intern',
                location: 'Gurugram, India',
                duration: '3 months',
                stipend: '₹40,000/month',
                type: 'Part-time',
                mode: 'Remote',
                skills: ['React', 'JavaScript', 'CSS'],
                logo: '🍔',
                posted: '1 day ago',
                deadline: '2024-12-05',
                openings: 5,
                applicants: 800
            },
            {
                id: 6,
                company: 'Swiggy',
                role: 'Mobile Dev Intern',
                location: 'Bangalore, India',
                duration: '6 months',
                stipend: '₹50,000/month',
                type: 'Full-time',
                mode: 'Hybrid',
                skills: ['React Native', 'Flutter', 'Firebase'],
                logo: '🍕',
                posted: '4 days ago',
                deadline: '2024-12-12',
                openings: 6,
                applicants: 950
            },
            {
                id: 7,
                company: 'Razorpay',
                role: 'Backend Engineer Intern',
                location: 'Bangalore, India',
                duration: '4 months',
                stipend: '₹70,000/month',
                type: 'Full-time',
                mode: 'Hybrid',
                skills: ['Node.js', 'PostgreSQL', 'Redis'],
                logo: '💳',
                posted: '6 days ago',
                deadline: '2024-12-18',
                openings: 7,
                applicants: 1200
            },
            {
                id: 8,
                company: 'Zerodha',
                role: 'Full Stack Intern',
                location: 'Bangalore, India',
                duration: '3 months',
                stipend: '₹55,000/month',
                type: 'Full-time',
                mode: 'Onsite',
                skills: ['Python', 'React', 'Django'],
                logo: '📈',
                posted: '2 weeks ago',
                deadline: '2024-11-28',
                openings: 4,
                applicants: 2100
            }
        ];

        this.filters = ['all', 'remote', 'hybrid', 'onsite', 'full-time', 'part-time'];
        this.loadSavedInternships();
    }

    loadSavedInternships() {
        const saved = localStorage.getItem('savedInternships');
        if (saved) {
            this.savedInternships = JSON.parse(saved);
        }
    }

    saveSavedInternships() {
        localStorage.setItem('savedInternships', JSON.stringify(this.savedInternships));
    }

    render() {
        const filteredInternships = this.getFilteredInternships();
        
        const container = document.createElement('div');
        container.innerHTML = `
            <div class="max-w-7xl mx-auto p-6">
                <!-- Header -->
                <div class="mb-8 text-center animate-fade-in">
                    <h1 class="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                        💼 Internship Opportunities 💼
                    </h1>
                    <p class="text-gray-400 text-lg">Find your dream internship at top companies</p>
                </div>

                <!-- Search & Filter Bar -->
                <div class="mb-6 bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <!-- Search -->
                        <div class="relative">
                            <input type="text" 
                                   id="internshipSearch" 
                                   placeholder="Search by company, role, or skills..." 
                                   value="${this.searchQuery}"
                                   class="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 pl-12 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500">
                            <svg class="absolute left-4 top-4 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                        </div>

                        <!-- Sort -->
                        <select id="internshipSort" class="bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white">
                            <option value="recent">Most Recent</option>
                            <option value="stipend">Highest Stipend</option>
                            <option value="openings">Most Openings</option>
                            <option value="deadline">Deadline Soon</option>
                        </select>
                    </div>

                    <!-- Filter Pills -->
                    <div class="flex flex-wrap gap-2" id="filterPills">
                        ${this.filters.map(filter => `
                            <button data-filter="${filter}" class="filter-pill px-4 py-2 rounded-lg font-semibold transition-all ${
                                this.selectedFilter === filter 
                                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white' 
                                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                            }">
                                ${filter.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                            </button>
                        `).join('')}
                    </div>

                    <!-- View Saved -->
                    ${this.savedInternships.length > 0 ? `
                        <button id="viewSaved" class="mt-4 px-4 py-2 bg-yellow-600/20 border border-yellow-500/30 rounded-lg font-semibold text-yellow-400 hover:bg-yellow-600/30 transition-all">
                            ⭐ View ${this.savedInternships.length} Saved Internship${this.savedInternships.length > 1 ? 's' : ''}
                        </button>
                    ` : ''}
                </div>

                <!-- Stats Overview -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div class="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-2xl p-6 text-center">
                        <div class="text-4xl mb-2">💼</div>
                        <div class="text-3xl font-bold text-blue-400">${this.internships.length}</div>
                        <div class="text-sm text-gray-400">Total Opportunities</div>
                    </div>
                    <div class="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-2xl p-6 text-center">
                        <div class="text-4xl mb-2">🏢</div>
                        <div class="text-3xl font-bold text-green-400">${new Set(this.internships.map(i => i.company)).size}</div>
                        <div class="text-sm text-gray-400">Companies Hiring</div>
                    </div>
                    <div class="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl p-6 text-center">
                        <div class="text-4xl mb-2">🌐</div>
                        <div class="text-3xl font-bold text-purple-400">${this.internships.filter(i => i.mode === 'Remote').length}</div>
                        <div class="text-sm text-gray-400">Remote Positions</div>
                    </div>
                    <div class="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 border border-yellow-500/30 rounded-2xl p-6 text-center">
                        <div class="text-4xl mb-2">⭐</div>
                        <div class="text-3xl font-bold text-yellow-400">${this.savedInternships.length}</div>
                        <div class="text-sm text-gray-400">Saved</div>
                    </div>
                </div>

                <!-- Results Count -->
                <div class="mb-4 text-gray-400">
                    Showing <span class="text-white font-semibold">${filteredInternships.length}</span> internship${filteredInternships.length !== 1 ? 's' : ''}
                </div>

                <!-- Internships List -->
                <div class="space-y-4 mb-8">
                    ${filteredInternships.map(internship => this.renderInternshipCard(internship)).join('')}
                </div>

                <!-- Resources Section -->
                <div class="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8">
                    <h2 class="text-2xl font-bold mb-6">📚 Internship Hunt Resources</h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <!-- Platforms -->
                        <div class="bg-gray-700/30 rounded-xl p-6">
                            <h3 class="text-lg font-bold mb-4 flex items-center gap-2">
                                <span>🔗</span> Top Platforms
                            </h3>
                            <div class="space-y-3">
                                <a href="https://internshala.com" target="_blank" class="block p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg hover:bg-blue-500/20 transition-all">
                                    <div class="font-semibold text-blue-400">Internshala</div>
                                    <div class="text-xs text-gray-400">India's #1 internship platform</div>
                                </a>
                                <a href="https://linkedin.com/jobs" target="_blank" class="block p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/20 transition-all">
                                    <div class="font-semibold text-cyan-400">LinkedIn</div>
                                    <div class="text-xs text-gray-400">Professional networking</div>
                                </a>
                                <a href="https://wellfound.com" target="_blank" class="block p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg hover:bg-purple-500/20 transition-all">
                                    <div class="font-semibold text-purple-400">Wellfound</div>
                                    <div class="text-xs text-gray-400">Startup internships</div>
                                </a>
                            </div>
                        </div>

                        <!-- Application Tips -->
                        <div class="bg-gray-700/30 rounded-xl p-6">
                            <h3 class="text-lg font-bold mb-4 flex items-center gap-2">
                                <span>💡</span> Application Tips
                            </h3>
                            <ul class="space-y-2 text-sm text-gray-300">
                                <li class="flex items-start gap-2"><span class="text-green-400">✓</span><span>Apply within 24hrs of posting</span></li>
                                <li class="flex items-start gap-2"><span class="text-green-400">✓</span><span>Customize resume for each role</span></li>
                                <li class="flex items-start gap-2"><span class="text-green-400">✓</span><span>Write compelling cover letters</span></li>
                                <li class="flex items-start gap-2"><span class="text-green-400">✓</span><span>Showcase relevant projects</span></li>
                                <li class="flex items-start gap-2"><span class="text-green-400">✓</span><span>Follow up after 1 week</span></li>
                                <li class="flex items-start gap-2"><span class="text-green-400">✓</span><span>Prepare for technical tests</span></li>
                            </ul>
                        </div>

                        <!-- Interview Prep -->
                        <div class="bg-gray-700/30 rounded-xl p-6">
                            <h3 class="text-lg font-bold mb-4 flex items-center gap-2">
                                <span>🎯</span> Interview Prep
                            </h3>
                            <div class="space-y-2 text-sm text-gray-300">
                                <div class="p-2 bg-gray-800/50 rounded">📝 Research the company</div>
                                <div class="p-2 bg-gray-800/50 rounded">💻 Practice coding problems</div>
                                <div class="p-2 bg-gray-800/50 rounded">🗣️ Prepare STAR stories</div>
                                <div class="p-2 bg-gray-800/50 rounded">❓ Ask smart questions</div>
                                <div class="p-2 bg-gray-800/50 rounded">👔 Dress professionally</div>
                                <div class="p-2 bg-gray-800/50 rounded">📧 Send thank you emails</div>
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

    renderInternshipCard(internship) {
        const isSaved = this.savedInternships.includes(internship.id);
        const modeColors = {
            'Remote': 'text-green-400 bg-green-500/10 border-green-500/30',
            'Hybrid': 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
            'Onsite': 'text-blue-400 bg-blue-500/10 border-blue-500/30'
        };

        return `
            <div class="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-blue-500/50 transition-all">
                <div class="flex items-start justify-between mb-4">
                    <!-- Company Info -->
                    <div class="flex items-start gap-4">
                        <div class="text-5xl">${internship.logo}</div>
                        <div>
                            <h3 class="text-xl font-bold mb-1">${internship.role}</h3>
                            <p class="text-gray-400">${internship.company}</p>
                            <div class="flex items-center gap-3 mt-2 text-sm text-gray-500">
                                <span>📍 ${internship.location}</span>
                                <span>•</span>
                                <span>🕒 ${internship.posted}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Save Button -->
                    <button data-save="${internship.id}" class="p-2 rounded-lg transition-all ${isSaved ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-400'}">
                        <svg class="w-6 h-6" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                        </svg>
                    </button>
                </div>

                <!-- Details Grid -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div class="bg-gray-700/30 rounded-lg p-3">
                        <div class="text-xs text-gray-400 mb-1">💰 Stipend</div>
                        <div class="font-bold text-green-400">${internship.stipend}</div>
                    </div>
                    <div class="bg-gray-700/30 rounded-lg p-3">
                        <div class="text-xs text-gray-400 mb-1">⏱️ Duration</div>
                        <div class="font-bold">${internship.duration}</div>
                    </div>
                    <div class="bg-gray-700/30 rounded-lg p-3">
                        <div class="text-xs text-gray-400 mb-1">📌 Type</div>
                        <div class="font-bold">${internship.type}</div>
                    </div>
                    <div class="bg-gray-700/30 rounded-lg p-3">
                        <div class="text-xs text-gray-400 mb-1">🌐 Mode</div>
                        <div class="px-2 py-1 ${modeColors[internship.mode]} border rounded text-xs font-bold">${internship.mode}</div>
                    </div>
                </div>

                <!-- Skills Required -->
                <div class="mb-4">
                    <div class="text-sm text-gray-400 mb-2">Required Skills:</div>
                    <div class="flex flex-wrap gap-2">
                        ${internship.skills.map(skill => `
                            <span class="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm border border-blue-500/30">${skill}</span>
                        `).join('')}
                    </div>
                </div>

                <!-- Stats -->
                <div class="flex items-center gap-6 mb-4 text-sm text-gray-400">
                    <div class="flex items-center gap-2">
                        <span>🎯</span>
                        <span>${internship.openings} openings</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <span>👥</span>
                        <span>${internship.applicants} applicants</span>
                    </div>
                    <div class="flex items-center gap-2 text-red-400">
                        <span>⏰</span>
                        <span>Deadline: ${new Date(internship.deadline).toLocaleDateString()}</span>
                    </div>
                </div>

                <!-- Actions -->
                <div class="flex gap-3">
                    <button data-apply="${internship.id}" class="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg font-bold hover:shadow-lg hover:shadow-blue-500/50 transition-all">
                        🚀 Apply Now
                    </button>
                    <button data-details="${internship.id}" class="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-all">
                        View Details
                    </button>
                </div>
            </div>
        `;
    }

    getFilteredInternships() {
        let filtered = [...this.internships];

        // Apply filter
        if (this.selectedFilter !== 'all') {
            if (this.selectedFilter === 'remote' || this.selectedFilter === 'hybrid' || this.selectedFilter === 'onsite') {
                const mode = this.selectedFilter.charAt(0).toUpperCase() + this.selectedFilter.slice(1);
                filtered = filtered.filter(i => i.mode === mode);
            } else if (this.selectedFilter === 'full-time' || this.selectedFilter === 'part-time') {
                const type = this.selectedFilter.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('-');
                filtered = filtered.filter(i => i.type === type);
            }
        }

        // Apply search
        if (this.searchQuery) {
            const query = this.searchQuery.toLowerCase();
            filtered = filtered.filter(i => 
                i.company.toLowerCase().includes(query) || 
                i.role.toLowerCase().includes(query) ||
                i.skills.some(skill => skill.toLowerCase().includes(query)) ||
                i.location.toLowerCase().includes(query)
            );
        }

        return filtered;
    }

    attachEventListeners() {
        // Search
        document.getElementById('internshipSearch')?.addEventListener('input', (e) => {
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

        // Save internship
        document.querySelectorAll('[data-save]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = parseInt(e.currentTarget.dataset.save);
                if (this.savedInternships.includes(id)) {
                    this.savedInternships = this.savedInternships.filter(i => i !== id);
                    toastManager.show('Removed from saved', 'info');
                } else {
                    this.savedInternships.push(id);
                    toastManager.show('⭐ Saved for later!', 'success');
                }
                this.saveSavedInternships();
                this.rerender();
            });
        });

        // Apply button
        document.querySelectorAll('[data-apply]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.dataset.apply);
                const internship = this.internships.find(i => i.id === id);
                toastManager.show(`Opening ${internship.company} application on Internshala...`, 'info');
                setTimeout(() => window.open('https://internshala.com/internships', '_blank'), 500);
            });
        });

        // Direct platform links
        document.querySelectorAll('a[href="https://internshala.com"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                toastManager.show('Opening Internshala...', 'info');
                window.open('https://internshala.com/internships', '_blank');
            });
        });

        document.querySelectorAll('a[href="https://linkedin.com/jobs"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                toastManager.show('Opening LinkedIn Jobs...', 'info');
                window.open('https://www.linkedin.com/jobs/internship-jobs/', '_blank');
            });
        });

        document.querySelectorAll('a[href="https://wellfound.com"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                toastManager.show('Opening Wellfound...', 'info');
                window.open('https://wellfound.com/role/r/software-engineer-intern', '_blank');
            });
        });

        // Details button
        document.querySelectorAll('[data-details]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.dataset.details);
                const internship = this.internships.find(i => i.id === id);
                toastManager.show(`Viewing details for ${internship.role}...`, 'info');
            });
        });

        // Sort
        document.getElementById('internshipSort')?.addEventListener('change', (e) => {
            const sortBy = e.target.value;
            if (sortBy === 'recent') {
                // Already sorted by recent
            } else if (sortBy === 'stipend') {
                this.internships.sort((a, b) => {
                    const aStipend = parseInt(a.stipend.replace(/[^0-9]/g, ''));
                    const bStipend = parseInt(b.stipend.replace(/[^0-9]/g, ''));
                    return bStipend - aStipend;
                });
            } else if (sortBy === 'openings') {
                this.internships.sort((a, b) => b.openings - a.openings);
            } else if (sortBy === 'deadline') {
                this.internships.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
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
