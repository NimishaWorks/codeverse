import { auth } from '../firebase-config.js';
import { toastManager } from '../utils/toastManager.js';

export class UserProfile {
    constructor() {
        this.user = auth.currentUser;
        this.profile = {
            displayName: this.user?.displayName || 'Anonymous User',
            email: this.user?.email || 'user@example.com',
            photoURL: this.user?.photoURL || 'https://ui-avatars.com/api/?name=User&background=random',
            bio: 'Passionate learner on CodeVerse! 🚀',
            location: 'India',
            website: 'https://github.com/username',
            joined: 'January 2025',
            skills: ['JavaScript', 'React', 'Node.js', 'Python', 'DSA'],
            interests: ['Web Development', 'AI/ML', 'Competitive Programming']
        };
        
        this.stats = {
            level: 12,
            xp: 2450,
            nextLevelXP: 3000,
            coursesCompleted: 8,
            questsCompleted: 45,
            hackathonsParticipated: 3,
            internshipsApplied: 12,
            achievements: 23,
            rank: 145,
            streak: 7
        };
        
        this.achievements = [
            { icon: '🔥', name: '7-Day Streak', date: 'Today', color: 'orange' },
            { icon: '⚡', name: 'Speed Coder', date: '2 days ago', color: 'yellow' },
            { icon: '🎓', name: 'Course Master', date: '1 week ago', color: 'blue' },
            { icon: '🏆', name: 'Champion', date: '2 weeks ago', color: 'purple' },
            { icon: '💎', name: 'Treasure Hunter', date: '3 weeks ago', color: 'pink' },
            { icon: '🚀', name: 'First Launch', date: '1 month ago', color: 'green' }
        ];
        
        this.recentActivity = [
            { type: 'quest', text: 'Completed Daily Quest', time: '2 hours ago', icon: '🎯' },
            { type: 'resume', text: 'Updated Resume', time: '5 hours ago', icon: '📝' },
            { type: 'hackathon', text: 'Registered for Hackathon', time: '1 day ago', icon: '💻' },
            { type: 'course', text: 'Finished React Course', time: '2 days ago', icon: '📚' },
            { type: 'achievement', text: 'Unlocked Speed Coder', time: '3 days ago', icon: '⚡' }
        ];
        
        this.socialLinks = [
            { name: 'GitHub', url: 'https://github.com', icon: '🐙', color: 'gray' },
            { name: 'LinkedIn', url: 'https://linkedin.com', icon: '💼', color: 'blue' },
            { name: 'Twitter', url: 'https://twitter.com', icon: '🐦', color: 'sky' },
            { name: 'Portfolio', url: 'https://portfolio.com', icon: '🌐', color: 'purple' }
        ];
        
        this.loadProfile();
    }
    
    render() {
        const container = document.createElement('div');
        container.innerHTML = `
            <div class="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
                <!-- Header -->
                <div class="mb-8">
                    <h1 class="text-4xl font-bold text-white mb-2">👤 User Profile</h1>
                    <p class="text-gray-400">Manage your profile and view your achievements</p>
                </div>
                
                <!-- Profile Card -->
                <div class="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-6">
                    <div class="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                        <!-- Avatar -->
                        <div class="relative group">
                            <img src="${this.profile.photoURL}" 
                                 alt="Profile" 
                                 class="w-32 h-32 rounded-full border-4 border-purple-500 shadow-lg">
                            <button class="absolute bottom-0 right-0 p-2 bg-purple-600 rounded-full text-white hover:bg-purple-700 transition-all" 
                                    data-upload-avatar>
                                📷
                            </button>
                        </div>
                        
                        <!-- Profile Info -->
                        <div class="flex-1 text-center md:text-left">
                            <h2 class="text-3xl font-bold text-white mb-2">${this.profile.displayName}</h2>
                            <p class="text-gray-400 mb-4">${this.profile.email}</p>
                            <p class="text-gray-300 mb-4">${this.profile.bio}</p>
                            
                            <div class="flex flex-wrap gap-3 justify-center md:justify-start mb-4">
                                <span class="px-3 py-1 bg-purple-600 rounded-full text-white text-sm">
                                    📍 ${this.profile.location}
                                </span>
                                <span class="px-3 py-1 bg-blue-600 rounded-full text-white text-sm">
                                    🗓️ Joined ${this.profile.joined}
                                </span>
                                <span class="px-3 py-1 bg-green-600 rounded-full text-white text-sm">
                                    🏆 Rank #${this.stats.rank}
                                </span>
                            </div>
                            
                            <button class="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-bold hover:from-purple-700 hover:to-pink-700 transition-all" 
                                    data-edit-profile>
                                ✏️ Edit Profile
                            </button>
                        </div>
                        
                        <!-- Level Progress -->
                        <div class="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-6 text-center min-w-[200px]">
                            <div class="text-5xl mb-2">⭐</div>
                            <div class="text-4xl font-bold text-white mb-1">Level ${this.stats.level}</div>
                            <div class="text-sm text-purple-200 mb-3">${this.stats.xp} / ${this.stats.nextLevelXP} XP</div>
                            <div class="w-full bg-purple-800 rounded-full h-2">
                                <div class="bg-white h-full rounded-full transition-all" 
                                     style="width: ${(this.stats.xp / this.stats.nextLevelXP) * 100}%"></div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Stats Grid -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div class="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-center">
                        <div class="text-3xl mb-2">📚</div>
                        <div class="text-3xl font-bold text-white">${this.stats.coursesCompleted}</div>
                        <div class="text-blue-200 text-sm">Courses</div>
                    </div>
                    
                    <div class="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-center">
                        <div class="text-3xl mb-2">🎯</div>
                        <div class="text-3xl font-bold text-white">${this.stats.questsCompleted}</div>
                        <div class="text-green-200 text-sm">Quests</div>
                    </div>
                    
                    <div class="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-center">
                        <div class="text-3xl mb-2">💻</div>
                        <div class="text-3xl font-bold text-white">${this.stats.hackathonsParticipated}</div>
                        <div class="text-purple-200 text-sm">Hackathons</div>
                    </div>
                    
                    <div class="bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl p-6 text-center">
                        <div class="text-3xl mb-2">🏆</div>
                        <div class="text-3xl font-bold text-white">${this.stats.achievements}</div>
                        <div class="text-orange-200 text-sm">Achievements</div>
                    </div>
                </div>
                
                <!-- Main Content Grid -->
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <!-- Skills & Interests -->
                    <div class="space-y-6">
                        <div class="bg-gray-800 rounded-xl p-6 border border-gray-700">
                            <h3 class="text-xl font-bold text-white mb-4">💪 Skills</h3>
                            <div class="flex flex-wrap gap-2">
                                ${this.profile.skills.map(skill => `
                                    <span class="px-3 py-1 bg-purple-600 rounded-full text-white text-sm">
                                        ${skill}
                                    </span>
                                `).join('')}
                                <button class="px-3 py-1 bg-gray-700 rounded-full text-white text-sm hover:bg-gray-600" data-add-skill>
                                    + Add Skill
                                </button>
                            </div>
                        </div>
                        
                        <div class="bg-gray-800 rounded-xl p-6 border border-gray-700">
                            <h3 class="text-xl font-bold text-white mb-4">❤️ Interests</h3>
                            <div class="flex flex-wrap gap-2">
                                ${this.profile.interests.map(interest => `
                                    <span class="px-3 py-1 bg-pink-600 rounded-full text-white text-sm">
                                        ${interest}
                                    </span>
                                `).join('')}
                            </div>
                        </div>
                        
                        <div class="bg-gray-800 rounded-xl p-6 border border-gray-700">
                            <h3 class="text-xl font-bold text-white mb-4">🔗 Social Links</h3>
                            <div class="space-y-3">
                                ${this.socialLinks.map(link => `
                                    <a href="${link.url}" 
                                       target="_blank" 
                                       class="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all">
                                        <div class="flex items-center space-x-3">
                                            <span class="text-2xl">${link.icon}</span>
                                            <span class="text-white">${link.name}</span>
                                        </div>
                                        <span class="text-gray-400">→</span>
                                    </a>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                    
                    <!-- Recent Activity & Achievements -->
                    <div class="lg:col-span-2 space-y-6">
                        <div class="bg-gray-800 rounded-xl p-6 border border-gray-700">
                            <h3 class="text-xl font-bold text-white mb-4">🏆 Achievements</h3>
                            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                                ${this.achievements.map(achievement => `
                                    <div class="bg-gradient-to-br from-${achievement.color}-500 to-${achievement.color}-700 rounded-xl p-4 text-center transform hover:scale-105 transition-all cursor-pointer">
                                        <div class="text-4xl mb-2">${achievement.icon}</div>
                                        <div class="text-white font-bold mb-1">${achievement.name}</div>
                                        <div class="text-${achievement.color}-200 text-xs">${achievement.date}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <div class="bg-gray-800 rounded-xl p-6 border border-gray-700">
                            <h3 class="text-xl font-bold text-white mb-4">📊 Recent Activity</h3>
                            <div class="space-y-3">
                                ${this.recentActivity.map(activity => `
                                    <div class="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all">
                                        <div class="flex items-center space-x-3">
                                            <span class="text-2xl">${activity.icon}</span>
                                            <div>
                                                <div class="text-white font-medium">${activity.text}</div>
                                                <div class="text-gray-400 text-sm">${activity.time}</div>
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <!-- Streak Calendar -->
                        <div class="bg-gray-800 rounded-xl p-6 border border-gray-700">
                            <h3 class="text-xl font-bold text-white mb-4">🔥 Activity Streak</h3>
                            <div class="flex items-center justify-center space-x-2 mb-4">
                                <span class="text-4xl">🔥</span>
                                <div>
                                    <div class="text-3xl font-bold text-orange-400">${this.stats.streak} Days</div>
                                    <div class="text-gray-400 text-sm">Current Streak</div>
                                </div>
                            </div>
                            <div class="grid grid-cols-7 gap-2">
                                ${Array.from({length: 35}, (_, i) => {
                                    const isActive = i >= 35 - this.stats.streak;
                                    return `
                                        <div class="aspect-square ${isActive ? 'bg-green-500' : 'bg-gray-700'} rounded hover:scale-110 transition-all cursor-pointer" 
                                             title="${isActive ? 'Active' : 'Inactive'}"></div>
                                    `;
                                }).join('')}
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
    
    attachEventListeners() {
        // Edit profile
        document.querySelector('[data-edit-profile]')?.addEventListener('click', () => {
            toastManager.info('Profile editing feature coming soon!');
        });
        
        // Upload avatar
        document.querySelector('[data-upload-avatar]')?.addEventListener('click', () => {
            toastManager.info('Avatar upload feature coming soon!');
        });
        
        // Add skill
        document.querySelector('[data-add-skill]')?.addEventListener('click', () => {
            const skill = prompt('Enter a new skill:');
            if (skill) {
                this.profile.skills.push(skill);
                this.saveProfile();
                window.router?.navigate('/profile');
            }
        });
    }
}
