// Resume Builder Component - Exact React Replica
import { toastManager } from '../utils/toast-manager.js';
import { animationEngine } from '../utils/animation-engine.js';

export class ResumeBuilder {
    constructor() {
        this.formData = {
            fullName: '',
            email: '',
            phone: '',
            location: '',
            github: '',
            linkedin: '',
            website: '',
            objective: '',
            education: [{ degree: '', institution: '', year: '', gpa: '' }],
            experience: [{ company: '', role: '', duration: '', description: '' }],
            projects: [{ name: '', tech: '', description: '', link: '' }],
            achievements: [{ title: '', description: '' }],
            skills: [],
            certifications: [],
            languages: []
        };

        this.skillInput = '';
        this.certInput = '';
        this.langInput = '';
        
        this.selectedTemplate = 'modern';
        this.selectedTheme = 'blue';
        this.selectedFont = 'sans';
        this.isGenerating = false;
        this.showATSPanel = false;
        this.atsScore = null;

        this.templates = [
            { id: 'classic', name: 'Classic', icon: '📋' },
            { id: 'modern', name: 'Modern', icon: '🎨' },
            { id: 'creative', name: 'Creative', icon: '✨' },
            { id: 'minimal', name: 'Minimal', icon: '⚡' }
        ];

        this.themes = {
            blue: { primary: '#3b82f6', secondary: '#1d4ed8', accent: '#60a5fa' },
            green: { primary: '#10b981', secondary: '#047857', accent: '#34d399' },
            purple: { primary: '#8b5cf6', secondary: '#6d28d9', accent: '#a78bfa' },
            pink: { primary: '#ec4899', secondary: '#db2777', accent: '#f472b6' },
            gradient: { primary: '#7c3aed', secondary: '#2dd4bf', accent: '#f59e0b' }
        };

        this.fonts = [
            { id: 'sans', name: 'Sans Serif', family: 'system-ui, -apple-system, sans-serif' },
            { id: 'serif', name: 'Serif', family: 'Georgia, serif' },
            { id: 'mono', name: 'Monospace', family: 'monospace' }
        ];
    }

    render() {
        const container = document.createElement('div');
        container.innerHTML = `
            <div class="max-w-7xl mx-auto p-6">
                <!-- Header -->
                <div class="mb-8 animate-fade-in">
                    <h2 class="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Resume & Portfolio Builder 🎯
                    </h2>
                    <p class="text-gray-400">Create professional ATS-friendly resumes with AI assistance</p>
                </div>

                <!-- Action Buttons -->
                <div class="flex flex-wrap gap-3 mb-6">
                    <button id="autoFillBtn" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                        Auto-Fill Profile
                    </button>
                    <button id="generateAIBtn" class="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-all flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                        AI Summary
                    </button>
                    <button id="atsCheckBtn" class="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-all flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        Check ATS Score
                    </button>
                    <button id="exportPDFBtn" class="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-all flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                        Export PDF
                    </button>
                    <button id="linkedinBtn" class="px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded-lg font-semibold transition-all flex items-center gap-2">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                        LinkedIn Template
                    </button>
                </div>

                <!-- Template & Theme Selector -->
                <div class="mb-6 bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
                    <h3 class="text-lg font-semibold mb-4">🎨 Customize Your Resume</h3>
                    
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <!-- Templates -->
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-3">Template</label>
                            <div class="grid grid-cols-2 gap-2" id="templateSelector">
                                ${this.templates.map(t => `
                                    <button data-template="${t.id}" class="template-btn p-3 rounded-lg border-2 transition-all ${
                                        this.selectedTemplate === t.id 
                                            ? 'border-blue-500 bg-blue-500/10' 
                                            : 'border-gray-700 hover:border-gray-600'
                                    }">
                                        <div class="text-2xl mb-1">${t.icon}</div>
                                        <div class="text-xs font-medium">${t.name}</div>
                                    </button>
                                `).join('')}
                            </div>
                        </div>

                        <!-- Themes -->
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-3">Color Theme</label>
                            <div class="flex flex-wrap gap-2" id="themeSelector">
                                ${Object.keys(this.themes).map(theme => `
                                    <button data-theme="${theme}" class="theme-btn w-12 h-12 rounded-lg border-2 transition-all ${
                                        this.selectedTheme === theme 
                                            ? 'border-white scale-110' 
                                            : 'border-gray-700 hover:scale-105'
                                    }" style="background: ${this.themes[theme].primary}">
                                    </button>
                                `).join('')}
                            </div>
                        </div>

                        <!-- Fonts -->
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-3">Font Style</label>
                            <div class="space-y-2" id="fontSelector">
                                ${this.fonts.map(font => `
                                    <button data-font="${font.id}" class="font-btn w-full p-2 rounded-lg border transition-all text-left ${
                                        this.selectedFont === font.id 
                                            ? 'border-blue-500 bg-blue-500/10' 
                                            : 'border-gray-700 hover:border-gray-600'
                                    }" style="font-family: ${font.family}">
                                        ${font.name}
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Main Content - Form & Preview -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <!-- Left - Form -->
                    <div class="space-y-6">
                        ${this.renderPersonalInfoSection()}
                        ${this.renderExperienceSection()}
                        ${this.renderEducationSection()}
                        ${this.renderProjectsSection()}
                        ${this.renderSkillsSection()}
                        ${this.renderAchievementsSection()}
                    </div>

                    <!-- Right - Live Preview -->
                    <div class="sticky top-6 h-fit">
                        <div class="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
                            <div class="flex items-center justify-between mb-4">
                                <h3 class="text-lg font-semibold">📄 Live Preview</h3>
                                <button id="refreshPreview" class="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                                </button>
                            </div>
                            <div id="resumePreview" class="bg-white text-black p-8 rounded-lg overflow-y-auto max-h-[800px] shadow-2xl">
                                ${this.renderResumePreview()}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ATS Score Panel -->
                ${this.showATSPanel ? this.renderATSPanel() : ''}
            </div>
        `;
        
        const element = container.firstElementChild;
        setTimeout(() => this.attachEventListeners(), 0);
        return element;
    }

    renderPersonalInfoSection() {
        return `
            <div class="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
                <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                    Personal Information
                </h3>
                <div class="space-y-4">
                    <input type="text" id="fullName" placeholder="Full Name *" value="${this.formData.fullName}" class="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500">
                    <input type="email" id="email" placeholder="Email Address *" value="${this.formData.email}" class="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500">
                    <input type="tel" id="phone" placeholder="Phone Number" value="${this.formData.phone}" class="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500">
                    <input type="text" id="location" placeholder="Location (City, Country)" value="${this.formData.location}" class="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500">
                    <input type="url" id="github" placeholder="GitHub Profile URL" value="${this.formData.github}" class="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500">
                    <input type="url" id="linkedin" placeholder="LinkedIn Profile URL" value="${this.formData.linkedin}" class="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500">
                    <textarea id="objective" rows="4" placeholder="Professional Summary / Objective" class="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500">${this.formData.objective}</textarea>
                </div>
            </div>
        `;
    }

    renderExperienceSection() {
        return `
            <div class="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-semibold flex items-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                        Work Experience
                    </h3>
                    <button id="addExperience" class="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-semibold">+ Add</button>
                </div>
                <div id="experienceList" class="space-y-4">
                    ${this.formData.experience.map((exp, idx) => this.renderExperienceItem(exp, idx)).join('')}
                </div>
            </div>
        `;
    }

    renderExperienceItem(exp, idx) {
        return `
            <div class="experience-item p-4 bg-gray-700/30 rounded-lg border border-gray-600/50 space-y-3" data-index="${idx}">
                <input type="text" data-field="company" placeholder="Company Name" value="${exp.company}" class="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white">
                <input type="text" data-field="role" placeholder="Job Title / Role" value="${exp.role}" class="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white">
                <input type="text" data-field="duration" placeholder="Duration (e.g., Jan 2023 - Present)" value="${exp.duration}" class="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white">
                <textarea data-field="description" rows="3" placeholder="Key responsibilities and achievements..." class="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white">${exp.description}</textarea>
                <button data-remove-experience="${idx}" class="text-red-400 hover:text-red-300 text-sm">Remove</button>
            </div>
        `;
    }

    renderEducationSection() {
        return `
            <div class="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-semibold flex items-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5z"/><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"/></svg>
                        Education
                    </h3>
                    <button id="addEducation" class="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-semibold">+ Add</button>
                </div>
                <div id="educationList" class="space-y-4">
                    ${this.formData.education.map((edu, idx) => this.renderEducationItem(edu, idx)).join('')}
                </div>
            </div>
        `;
    }

    renderEducationItem(edu, idx) {
        return `
            <div class="education-item p-4 bg-gray-700/30 rounded-lg border border-gray-600/50 space-y-3" data-index="${idx}">
                <input type="text" data-field="degree" placeholder="Degree / Certificate" value="${edu.degree}" class="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white">
                <input type="text" data-field="institution" placeholder="Institution Name" value="${edu.institution}" class="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white">
                <div class="grid grid-cols-2 gap-3">
                    <input type="text" data-field="year" placeholder="Year (e.g., 2020-2024)" value="${edu.year}" class="bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white">
                    <input type="text" data-field="gpa" placeholder="GPA / Percentage" value="${edu.gpa}" class="bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white">
                </div>
                <button data-remove-education="${idx}" class="text-red-400 hover:text-red-300 text-sm">Remove</button>
            </div>
        `;
    }

    renderProjectsSection() {
        return `
            <div class="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-semibold flex items-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
                        Projects
                    </h3>
                    <button id="addProject" class="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-semibold">+ Add</button>
                </div>
                <div id="projectsList" class="space-y-4">
                    ${this.formData.projects.map((proj, idx) => this.renderProjectItem(proj, idx)).join('')}
                </div>
            </div>
        `;
    }

    renderProjectItem(proj, idx) {
        return `
            <div class="project-item p-4 bg-gray-700/30 rounded-lg border border-gray-600/50 space-y-3" data-index="${idx}">
                <input type="text" data-field="name" placeholder="Project Name" value="${proj.name}" class="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white">
                <input type="text" data-field="tech" placeholder="Technologies Used (e.g., React, Node.js)" value="${proj.tech}" class="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white">
                <textarea data-field="description" rows="2" placeholder="Project description..." class="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white">${proj.description}</textarea>
                <input type="url" data-field="link" placeholder="Project Link (GitHub/Live Demo)" value="${proj.link}" class="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white">
                <button data-remove-project="${idx}" class="text-red-400 hover:text-red-300 text-sm">Remove</button>
            </div>
        `;
    }

    renderSkillsSection() {
        return `
            <div class="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
                <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>
                    Skills
                </h3>
                <div class="flex gap-2 mb-3">
                    <input type="text" id="skillInput" placeholder="Add a skill (e.g., JavaScript)" class="flex-1 bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white">
                    <button id="addSkill" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold">Add</button>
                </div>
                <div id="skillsList" class="flex flex-wrap gap-2">
                    ${this.formData.skills.map((skill, idx) => `
                        <span class="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm border border-blue-500/30 flex items-center gap-2">
                            ${skill}
                            <button data-remove-skill="${idx}" class="hover:text-red-400">×</button>
                        </span>
                    `).join('')}
                    ${this.formData.skills.length === 0 ? '<span class="text-gray-500 text-sm">No skills added yet</span>' : ''}
                </div>
            </div>
        `;
    }

    renderAchievementsSection() {
        return `
            <div class="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-semibold flex items-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>
                        Achievements & Certifications
                    </h3>
                    <button id="addAchievement" class="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-semibold">+ Add</button>
                </div>
                <div id="achievementsList" class="space-y-4">
                    ${this.formData.achievements.map((ach, idx) => this.renderAchievementItem(ach, idx)).join('')}
                </div>
            </div>
        `;
    }

    renderAchievementItem(ach, idx) {
        return `
            <div class="achievement-item p-4 bg-gray-700/30 rounded-lg border border-gray-600/50 space-y-3" data-index="${idx}">
                <input type="text" data-field="title" placeholder="Achievement / Certification Title" value="${ach.title}" class="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white">
                <textarea data-field="description" rows="2" placeholder="Description..." class="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white">${ach.description}</textarea>
                <button data-remove-achievement="${idx}" class="text-red-400 hover:text-red-300 text-sm">Remove</button>
            </div>
        `;
    }

    renderResumePreview() {
        const theme = this.themes[this.selectedTheme];
        const font = this.fonts.find(f => f.id === this.selectedFont);
        
        return `
            <div style="font-family: ${font.family}; color: #000;">
                <!-- Header -->
                <div style="text-align: center; margin-bottom: 20px; border-bottom: 3px solid ${theme.primary}; padding-bottom: 15px;">
                    <h1 style="font-size: 32px; font-weight: bold; margin: 0; color: ${theme.primary};">${this.formData.fullName || 'Your Name'}</h1>
                    <div style="font-size: 12px; color: #666; margin-top: 8px;">
                        ${this.formData.email ? `📧 ${this.formData.email}` : ''} 
                        ${this.formData.phone ? `| 📱 ${this.formData.phone}` : ''} 
                        ${this.formData.location ? `| 📍 ${this.formData.location}` : ''}
                    </div>
                    <div style="font-size: 12px; color: #666; margin-top: 4px;">
                        ${this.formData.github ? `<a href="${this.formData.github}" style="color: ${theme.primary};">GitHub</a>` : ''}
                        ${this.formData.linkedin ? `| <a href="${this.formData.linkedin}" style="color: ${theme.primary};">LinkedIn</a>` : ''}
                    </div>
                </div>

                <!-- Objective -->
                ${this.formData.objective ? `
                    <div style="margin-bottom: 20px;">
                        <h2 style="font-size: 18px; font-weight: bold; color: ${theme.primary}; margin-bottom: 8px;">PROFESSIONAL SUMMARY</h2>
                        <p style="font-size: 12px; line-height: 1.6;">${this.formData.objective}</p>
                    </div>
                ` : ''}

                <!-- Experience -->
                ${this.formData.experience.filter(e => e.company).length > 0 ? `
                    <div style="margin-bottom: 20px;">
                        <h2 style="font-size: 18px; font-weight: bold; color: ${theme.primary}; margin-bottom: 8px;">WORK EXPERIENCE</h2>
                        ${this.formData.experience.filter(e => e.company).map(exp => `
                            <div style="margin-bottom: 12px;">
                                <div style="display: flex; justify-content: space-between; align-items: baseline;">
                                    <strong style="font-size: 14px;">${exp.role}</strong>
                                    <span style="font-size: 11px; color: #666;">${exp.duration}</span>
                                </div>
                                <div style="font-size: 12px; color: #666; margin-bottom: 4px;">${exp.company}</div>
                                <p style="font-size: 11px; line-height: 1.5;">${exp.description}</p>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}

                <!-- Education -->
                ${this.formData.education.filter(e => e.degree).length > 0 ? `
                    <div style="margin-bottom: 20px;">
                        <h2 style="font-size: 18px; font-weight: bold; color: ${theme.primary}; margin-bottom: 8px;">EDUCATION</h2>
                        ${this.formData.education.filter(e => e.degree).map(edu => `
                            <div style="margin-bottom: 10px;">
                                <div style="display: flex; justify-content: space-between; align-items: baseline;">
                                    <strong style="font-size: 14px;">${edu.degree}</strong>
                                    <span style="font-size: 11px; color: #666;">${edu.year}</span>
                                </div>
                                <div style="font-size: 12px; color: #666;">${edu.institution}</div>
                                ${edu.gpa ? `<div style="font-size: 11px; color: #666;">GPA: ${edu.gpa}</div>` : ''}
                            </div>
                        `).join('')}
                    </div>
                ` : ''}

                <!-- Projects -->
                ${this.formData.projects.filter(p => p.name).length > 0 ? `
                    <div style="margin-bottom: 20px;">
                        <h2 style="font-size: 18px; font-weight: bold; color: ${theme.primary}; margin-bottom: 8px;">PROJECTS</h2>
                        ${this.formData.projects.filter(p => p.name).map(proj => `
                            <div style="margin-bottom: 12px;">
                                <strong style="font-size: 14px;">${proj.name}</strong>
                                ${proj.tech ? `<span style="font-size: 11px; color: #666;"> | ${proj.tech}</span>` : ''}
                                <p style="font-size: 11px; line-height: 1.5; margin-top: 4px;">${proj.description}</p>
                                ${proj.link ? `<a href="${proj.link}" style="font-size: 11px; color: ${theme.primary};">View Project</a>` : ''}
                            </div>
                        `).join('')}
                    </div>
                ` : ''}

                <!-- Skills -->
                ${this.formData.skills.length > 0 ? `
                    <div style="margin-bottom: 20px;">
                        <h2 style="font-size: 18px; font-weight: bold; color: ${theme.primary}; margin-bottom: 8px;">SKILLS</h2>
                        <div style="font-size: 12px;">${this.formData.skills.join(' • ')}</div>
                    </div>
                ` : ''}

                <!-- Achievements -->
                ${this.formData.achievements.filter(a => a.title).length > 0 ? `
                    <div style="margin-bottom: 20px;">
                        <h2 style="font-size: 18px; font-weight: bold; color: ${theme.primary}; margin-bottom: 8px;">ACHIEVEMENTS</h2>
                        ${this.formData.achievements.filter(a => a.title).map(ach => `
                            <div style="margin-bottom: 8px;">
                                <strong style="font-size: 13px;">• ${ach.title}</strong>
                                ${ach.description ? `<p style="font-size: 11px; margin-left: 12px; margin-top: 2px;">${ach.description}</p>` : ''}
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `;
    }

    renderATSPanel() {
        return `
            <div class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-6" id="atsPanel">
                <div class="bg-gray-800 border border-gray-700 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-2xl font-bold">📊 ATS Score Analysis</h3>
                        <button id="closeATS" class="p-2 hover:bg-gray-700 rounded-lg">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                        </button>
                    </div>

                    <!-- Score Display -->
                    <div class="text-center mb-8">
                        <div class="inline-block">
                            <div class="relative w-40 h-40">
                                <svg class="transform -rotate-90" viewBox="0 0 160 160">
                                    <circle cx="80" cy="80" r="70" fill="none" stroke="#374151" stroke-width="12"/>
                                    <circle cx="80" cy="80" r="70" fill="none" stroke="#10b981" stroke-width="12" 
                                            stroke-dasharray="${this.atsScore * 4.4} 440" stroke-linecap="round"/>
                                </svg>
                                <div class="absolute inset-0 flex items-center justify-center">
                                    <div class="text-4xl font-bold text-green-400">${this.atsScore}%</div>
                                </div>
                            </div>
                        </div>
                        <p class="text-gray-400 mt-4">Your resume is ${this.atsScore >= 80 ? 'excellent' : this.atsScore >= 60 ? 'good' : 'needs improvement'} for ATS systems!</p>
                    </div>

                    <!-- Recommendations -->
                    <div class="space-y-4">
                        <h4 class="font-semibold text-lg">💡 Recommendations:</h4>
                        <div class="space-y-3">
                            ${this.atsScore < 100 ? `
                                <div class="flex gap-3 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                                    <span class="text-yellow-400">⚠️</span>
                                    <div>
                                        <div class="font-semibold text-yellow-400">Add More Keywords</div>
                                        <div class="text-sm text-gray-400">Include industry-specific keywords from job descriptions</div>
                                    </div>
                                </div>
                            ` : ''}
                            <div class="flex gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                                <span class="text-green-400">✓</span>
                                <div>
                                    <div class="font-semibold text-green-400">Good Structure</div>
                                    <div class="text-sm text-gray-400">Your resume has clear sections and formatting</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button id="downloadReport" class="w-full mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold">
                        Download Full Report
                    </button>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        // Personal info inputs
        ['fullName', 'email', 'phone', 'location', 'github', 'linkedin', 'objective'].forEach(field => {
            const input = document.getElementById(field);
            if (input) {
                input.addEventListener('input', (e) => {
                    this.formData[field] = e.target.value;
                    this.updatePreview();
                });
            }
        });

        // Template selection
        document.querySelectorAll('.template-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectedTemplate = e.currentTarget.dataset.template;
                this.rerender();
            });
        });

        // Theme selection
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectedTheme = e.currentTarget.dataset.theme;
                this.updatePreview();
            });
        });

        // Font selection
        document.querySelectorAll('.font-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectedFont = e.currentTarget.dataset.font;
                this.updatePreview();
            });
        });

        // Experience
        document.querySelectorAll('.experience-item input, .experience-item textarea').forEach(input => {
            input.addEventListener('input', (e) => {
                const item = e.target.closest('.experience-item');
                const idx = parseInt(item.dataset.index);
                const field = e.target.dataset.field;
                this.formData.experience[idx][field] = e.target.value;
                this.updatePreview();
            });
        });

        document.getElementById('addExperience')?.addEventListener('click', () => {
            this.formData.experience.push({ company: '', role: '', duration: '', description: '' });
            this.rerender();
        });

        document.querySelectorAll('[data-remove-experience]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.target.dataset.removeExperience);
                this.formData.experience.splice(idx, 1);
                this.rerender();
            });
        });

        // Education
        document.querySelectorAll('.education-item input').forEach(input => {
            input.addEventListener('input', (e) => {
                const item = e.target.closest('.education-item');
                const idx = parseInt(item.dataset.index);
                const field = e.target.dataset.field;
                this.formData.education[idx][field] = e.target.value;
                this.updatePreview();
            });
        });

        document.getElementById('addEducation')?.addEventListener('click', () => {
            this.formData.education.push({ degree: '', institution: '', year: '', gpa: '' });
            this.rerender();
        });

        document.querySelectorAll('[data-remove-education]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.target.dataset.removeEducation);
                this.formData.education.splice(idx, 1);
                this.rerender();
            });
        });

        // Projects
        document.querySelectorAll('.project-item input, .project-item textarea').forEach(input => {
            input.addEventListener('input', (e) => {
                const item = e.target.closest('.project-item');
                const idx = parseInt(item.dataset.index);
                const field = e.target.dataset.field;
                this.formData.projects[idx][field] = e.target.value;
                this.updatePreview();
            });
        });

        document.getElementById('addProject')?.addEventListener('click', () => {
            this.formData.projects.push({ name: '', tech: '', description: '', link: '' });
            this.rerender();
        });

        document.querySelectorAll('[data-remove-project]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.target.dataset.removeProject);
                this.formData.projects.splice(idx, 1);
                this.rerender();
            });
        });

        // Skills
        document.getElementById('addSkill')?.addEventListener('click', () => this.addSkill());
        document.getElementById('skillInput')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addSkill();
        });

        document.querySelectorAll('[data-remove-skill]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.target.dataset.removeSkill);
                this.formData.skills.splice(idx, 1);
                this.rerender();
            });
        });

        // Achievements
        document.querySelectorAll('.achievement-item input, .achievement-item textarea').forEach(input => {
            input.addEventListener('input', (e) => {
                const item = e.target.closest('.achievement-item');
                const idx = parseInt(item.dataset.index);
                const field = e.target.dataset.field;
                this.formData.achievements[idx][field] = e.target.value;
                this.updatePreview();
            });
        });

        document.getElementById('addAchievement')?.addEventListener('click', () => {
            this.formData.achievements.push({ title: '', description: '' });
            this.rerender();
        });

        document.querySelectorAll('[data-remove-achievement]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.target.dataset.removeAchievement);
                this.formData.achievements.splice(idx, 1);
                this.rerender();
            });
        });

        // Action buttons
        document.getElementById('autoFillBtn')?.addEventListener('click', () => this.autoFill());
        document.getElementById('generateAIBtn')?.addEventListener('click', () => this.generateAISummary());
        document.getElementById('atsCheckBtn')?.addEventListener('click', () => this.checkATS());
        document.getElementById('exportPDFBtn')?.addEventListener('click', () => this.exportPDF());
        document.getElementById('linkedinBtn')?.addEventListener('click', () => this.exportLinkedIn());
        document.getElementById('refreshPreview')?.addEventListener('click', () => this.updatePreview());
        document.getElementById('closeATS')?.addEventListener('click', () => {
            this.showATSPanel = false;
            this.rerender();
        });
    }

    addSkill() {
        const input = document.getElementById('skillInput');
        if (input && input.value.trim()) {
            this.formData.skills.push(input.value.trim());
            input.value = '';
            this.rerender();
        }
    }

    autoFill() {
        this.formData = {
            fullName: 'John Doe',
            email: 'john.doe@example.com',
            phone: '+1 234 567 8900',
            location: 'San Francisco, CA',
            github: 'github.com/johndoe',
            linkedin: 'linkedin.com/in/johndoe',
            objective: 'Passionate software developer with 3+ years of experience building scalable web applications.',
            education: [{ degree: 'B.Tech Computer Science', institution: 'MIT', year: '2020-2024', gpa: '8.5' }],
            experience: [{ company: 'Tech Corp', role: 'Software Engineer', duration: 'Jan 2023 - Present', description: 'Developed and maintained web applications using React and Node.js' }],
            projects: [{ name: 'E-commerce Platform', tech: 'React, Node.js, MongoDB', description: 'Built a full-stack e-commerce platform with payment integration', link: 'github.com/johndoe/ecommerce' }],
            achievements: [{ title: 'Hackathon Winner', description: 'Won first place at TechFest 2023' }],
            skills: ['JavaScript', 'React', 'Node.js', 'Python', 'MongoDB', 'Git'],
            certifications: [],
            languages: []
        };
        toastManager.show('Profile data auto-filled!', 'success');
        this.rerender();
    }

    generateAISummary() {
        toastManager.show('Generating AI summary...', 'info');
        // Simulate AI generation
        setTimeout(() => {
            this.formData.objective = 'Highly motivated software engineer with expertise in full-stack development. Proven track record of delivering high-quality solutions and collaborating with cross-functional teams to achieve project goals.';
            toastManager.show('✨ AI summary generated! +5 XP', 'success');
            this.updatePreview();
        }, 2000);
    }

    checkATS() {
        toastManager.show('Analyzing resume...', 'info');
        setTimeout(() => {
            this.atsScore = Math.floor(Math.random() * 20) + 75; // 75-95
            this.showATSPanel = true;
            this.rerender();
            toastManager.show(`ATS Score: ${this.atsScore}%`, 'success');
        }, 1500);
    }

    exportPDF() {
        toastManager.show('Generating PDF...', 'info');
        // Simulate PDF export
        setTimeout(() => {
            toastManager.show('✓ PDF exported successfully! +10 XP', 'success');
        }, 2000);
    }

    exportLinkedIn() {
        const linkedInText = `
${this.formData.objective}

EXPERIENCE:
${this.formData.experience.map(exp => `${exp.role} at ${exp.company} (${exp.duration})\n${exp.description}`).join('\n\n')}

SKILLS:
${this.formData.skills.join(' • ')}

PROJECTS:
${this.formData.projects.map(proj => `${proj.name}: ${proj.description}`).join('\n\n')}
        `.trim();

        navigator.clipboard.writeText(linkedInText);
        toastManager.show('💼 LinkedIn template copied to clipboard!', 'success');
    }

    updatePreview() {
        const preview = document.getElementById('resumePreview');
        if (preview) {
            preview.innerHTML = this.renderResumePreview();
        }
    }

    rerender() {
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.innerHTML = this.render();
            this.attachEventListeners();
        }
    }
}
