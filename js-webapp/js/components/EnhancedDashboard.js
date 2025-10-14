import { stateManager } from '../utils/stateManager.js';
import { toastManager } from '../utils/toastManager.js';

export class EnhancedDashboard {
    constructor() {
        this.stats = {
            totalXP: 2450,
            level: 12,
            coursesCompleted: 8,
            questsCompleted: 45,
            streak: 7,
            achievements: 23,
            timeSpent: 127 // hours
        };
        
        this.recentActivities = [
            { icon: '🎯', text: 'Completed Daily Quest', time: '2 hours ago', xp: 50 },
            { icon: '📝', text: 'Finished Resume Builder', time: '5 hours ago', xp: 100 },
            { icon: '🏆', text: 'Won Code Competition', time: '1 day ago', xp: 200 },
            { icon: '📚', text: 'Completed React Course', time: '2 days ago', xp: 500 },
            { icon: '🎮', text: 'Achieved 7-day Streak', time: '3 days ago', xp: 150 }
        ];
        
        this.skillsData = [
            { skill: 'JavaScript', level: 85 },
            { skill: 'React', level: 78 },
            { skill: 'Node.js', level: 72 },
            { skill: 'Python', level: 65 },
            { skill: 'DSA', level: 80 },
            { skill: 'SQL', level: 70 }
        ];
        
        this.weeklyProgress = [
            { day: 'Mon', xp: 120 },
            { day: 'Tue', xp: 180 },
            { day: 'Wed', xp: 150 },
            { day: 'Thu', xp: 200 },
            { day: 'Fri', xp: 160 },
            { day: 'Sat', xp: 220 },
            { day: 'Sun', xp: 190 }
        ];
        
        this.achievements = [
            { icon: '🔥', name: '7-Day Streak', desc: 'Complete quests for 7 days', unlocked: true },
            { icon: '⚡', name: 'Speed Coder', desc: 'Solve 10 problems under 10 mins', unlocked: true },
            { icon: '🎓', name: 'Course Master', desc: 'Complete 5 courses', unlocked: true },
            { icon: '🏆', name: 'Champion', desc: 'Win 3 competitions', unlocked: true },
            { icon: '💎', name: 'Treasure Hunter', desc: 'Open 10 treasure boxes', unlocked: false },
            { icon: '🚀', name: 'Rocket Launch', desc: 'Reach level 20', unlocked: false }
        ];
        
        this.loadStats();
    }
    
    loadStats() {
        const saved = localStorage.getItem('userStats');
        if (saved) {
            this.stats = { ...this.stats, ...JSON.parse(saved) };
        }
    }
    
    saveStats() {
        localStorage.setItem('userStats', JSON.stringify(this.stats));
    }
    
    render() {
        const container = document.createElement('div');
        container.innerHTML = `
            <div class="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-6">
                <!-- Header -->
                <div class="mb-8">
                    <h1 class="text-4xl font-bold text-white mb-2">Enhanced Dashboard</h1>
                    <p class="text-gray-400">Your complete learning analytics and progress</p>
                </div>
                
                <!-- Stats Grid -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div class="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-6 transform hover:scale-105 transition-all">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-2xl">⭐</span>
                            <span class="text-blue-200 text-sm">Total</span>
                        </div>
                        <div class="text-3xl font-bold text-white mb-1">${this.stats.totalXP.toLocaleString()}</div>
                        <div class="text-blue-200 text-sm">Experience Points</div>
                    </div>
                    
                    <div class="bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl p-6 transform hover:scale-105 transition-all">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-2xl">🎯</span>
                            <span class="text-purple-200 text-sm">Level</span>
                        </div>
                        <div class="text-3xl font-bold text-white mb-1">${this.stats.level}</div>
                        <div class="text-purple-200 text-sm">Current Level</div>
                    </div>
                    
                    <div class="bg-gradient-to-br from-green-500 to-green-700 rounded-xl p-6 transform hover:scale-105 transition-all">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-2xl">🔥</span>
                            <span class="text-green-200 text-sm">Days</span>
                        </div>
                        <div class="text-3xl font-bold text-white mb-1">${this.stats.streak}</div>
                        <div class="text-green-200 text-sm">Day Streak</div>
                    </div>
                    
                    <div class="bg-gradient-to-br from-orange-500 to-orange-700 rounded-xl p-6 transform hover:scale-105 transition-all">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-2xl">🏆</span>
                            <span class="text-orange-200 text-sm">Total</span>
                        </div>
                        <div class="text-3xl font-bold text-white mb-1">${this.stats.achievements}</div>
                        <div class="text-orange-200 text-sm">Achievements</div>
                    </div>
                </div>
                
                <!-- Main Content Grid -->
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <!-- Weekly Progress Chart -->
                    <div class="lg:col-span-2 bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <h3 class="text-xl font-bold text-white mb-4">📊 Weekly Progress</h3>
                        <div class="flex items-end justify-between h-64 space-x-2">
                            ${this.weeklyProgress.map(day => {
                                const height = (day.xp / 250) * 100;
                                return `
                                    <div class="flex-1 flex flex-col items-center">
                                        <div class="w-full bg-gradient-to-t from-purple-500 to-purple-300 rounded-t-lg relative group cursor-pointer hover:from-purple-400 hover:to-purple-200 transition-all" 
                                             style="height: ${height}%">
                                            <div class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                                ${day.xp} XP
                                            </div>
                                        </div>
                                        <div class="text-gray-400 text-sm mt-2">${day.day}</div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                    
                    <!-- Skills Radar -->
                    <div class="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <h3 class="text-xl font-bold text-white mb-4">💪 Skill Levels</h3>
                        <div class="space-y-4">
                            ${this.skillsData.map(skill => `
                                <div>
                                    <div class="flex justify-between text-sm mb-1">
                                        <span class="text-gray-300">${skill.skill}</span>
                                        <span class="text-purple-400 font-bold">${skill.level}%</span>
                                    </div>
                                    <div class="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                                        <div class="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-1000" 
                                             style="width: ${skill.level}%"></div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                
                <!-- Recent Activities & Achievements -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <!-- Recent Activities -->
                    <div class="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <h3 class="text-xl font-bold text-white mb-4">📌 Recent Activities</h3>
                        <div class="space-y-3">
                            ${this.recentActivities.map(activity => `
                                <div class="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all cursor-pointer">
                                    <div class="flex items-center space-x-3">
                                        <span class="text-2xl">${activity.icon}</span>
                                        <div>
                                            <div class="text-white font-medium">${activity.text}</div>
                                            <div class="text-gray-400 text-sm">${activity.time}</div>
                                        </div>
                                    </div>
                                    <div class="text-green-400 font-bold">+${activity.xp} XP</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <!-- Achievements -->
                    <div class="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <h3 class="text-xl font-bold text-white mb-4">🏆 Achievements</h3>
                        <div class="grid grid-cols-3 gap-3">
                            ${this.achievements.map(achievement => `
                                <div class="flex flex-col items-center p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all cursor-pointer ${achievement.unlocked ? '' : 'opacity-50'} group">
                                    <span class="text-3xl mb-2 ${achievement.unlocked ? 'animate-bounce' : 'grayscale'}">${achievement.icon}</span>
                                    <div class="text-xs text-center text-white font-medium mb-1">${achievement.name}</div>
                                    <div class="text-xs text-center text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">${achievement.desc}</div>
                                    ${achievement.unlocked ? '<div class="text-xs text-green-400 mt-1">✓ Unlocked</div>' : '<div class="text-xs text-gray-500 mt-1">🔒 Locked</div>'}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                
                <!-- Additional Stats -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div class="bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-xl p-6">
                        <div class="text-4xl mb-3">📚</div>
                        <div class="text-3xl font-bold text-white mb-1">${this.stats.coursesCompleted}</div>
                        <div class="text-indigo-200">Courses Completed</div>
                    </div>
                    
                    <div class="bg-gradient-to-br from-pink-500 to-pink-700 rounded-xl p-6">
                        <div class="text-4xl mb-3">🎯</div>
                        <div class="text-3xl font-bold text-white mb-1">${this.stats.questsCompleted}</div>
                        <div class="text-pink-200">Quests Completed</div>
                    </div>
                    
                    <div class="bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl p-6">
                        <div class="text-4xl mb-3">⏱️</div>
                        <div class="text-3xl font-bold text-white mb-1">${this.stats.timeSpent}h</div>
                        <div class="text-teal-200">Time Spent Learning</div>
                    </div>
                </div>
            </div>
        `;
        
        const element = container.firstElementChild;
        setTimeout(() => this.attachEventListeners(), 0);
        return element;
    }
    
    attachEventListeners() {
        // Add hover animations
        document.querySelectorAll('[data-animate]')?.forEach(el => {
            el.addEventListener('mouseenter', () => {
                el.style.transform = 'scale(1.05)';
            });
            el.addEventListener('mouseleave', () => {
                el.style.transform = 'scale(1)';
            });
        });
    }
}
