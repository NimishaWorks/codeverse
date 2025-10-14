import { stateManager } from '../utils/state-manager.js';
import { animationEngine } from '../utils/animation-engine.js';
import { router } from '../utils/router.js';
import { AptitudeTests } from './AptitudeTests.js';
import { CodingTerminal } from './CodingTerminal.js';

export class InterviewHub {
    constructor(params = {}) {
        this.params = params;
        this.element = null;
        this.activeTab = 0;
        this.activeSubTab = 'coding';
        this.showTutorial = false;
        this.tutorialType = null;
        
        this.tabs = [
            { id: 0, name: 'Interview Prep', icon: '💼' },
            { id: 1, name: 'Resume Builder', icon: '📄' },
            { id: 2, name: 'ATS Checker', icon: '✅' },
            { id: 3, name: 'Editor Skills', icon: '⚙️' },
            { id: 4, name: 'Hackathons', icon: '🏆' },
            { id: 5, name: 'Internships', icon: '🎯' }
        ];

        this.subTabs = [
            { id: 'coding', name: 'Coding Terminal', icon: '💻' },
            { id: 'interview', name: 'AI Mock Interview', icon: '🎤' },
            { id: 'aptitude', name: 'Aptitude Tests', icon: '🧮' }
        ];

        this.problemData = {
            title: "Two Sum",
            difficulty: "Easy",
            description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
            examples: [
                {
                    input: "nums = [2,7,11,15], target = 9",
                    output: "[0,1]",
                    explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
                },
                {
                    input: "nums = [3,2,4], target = 6", 
                    output: "[1,2]",
                    explanation: ""
                }
            ],
            constraints: [
                "2 ≤ nums.length ≤ 104",
                "-109 ≤ nums[i] ≤ 109", 
                "-109 ≤ target ≤ 109",
                "Only one valid answer exists."
            ]
        };

        this.codeTemplates = {
            python: `def twoSum(nums, target):
    """
    :type nums: List[int]
    :type target: int
    :rtype: List[int]
    """
    # Write your solution here
    pass`,
            javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // Write your solution here
};`,
            java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
        return new int[0];
    }
}`,
            cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your solution here
        return {};
    }
};`
        };

        this.currentLanguage = 'python';
        this.currentCode = this.codeTemplates.python;
    }

    async render() {
        this.element = document.createElement('div');
        this.element.className = 'min-h-screen bg-gradient-to-br from-[#0b1020] via-[#101325] to-[#14182b] text-white';
        
        this.element.innerHTML = `
                <!-- Header -->
                <header class="border-b border-gray-800 bg-gray-900/50 backdrop-blur-lg">
                    <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                        <button id="backButton" class="flex items-center gap-2 text-gray-400 hover:text-white transition-all">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Dashboard
                        </button>
                        <h1 class="text-2xl font-bold">Interview & Career Hub 💼</h1>
                        <div class="w-24"></div>
                    </div>
                </header>

                <div class="max-w-7xl mx-auto px-6 py-12">
                    <!-- Main Tabs -->
                    <div class="flex flex-wrap gap-3 mb-8">
                        ${this.tabs.map(tab => `
                            <button data-tab="${tab.id}" class="tab-button px-6 py-3 rounded-xl font-semibold transition-all ${
                                this.activeTab === tab.id
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                                    : 'bg-gray-800/40 text-gray-400 hover:text-white border border-gray-700/50'
                            }">
                                <span class="mr-2">${tab.icon}</span>
                                ${tab.name}
                            </button>
                        `).join('')}
                    </div>

                    <!-- Content -->
                    <div id="tabContent" class="opacity-100 transform translate-y-0 transition-all duration-300">
                        ${this.renderTabContent()}
                    </div>
                </div>
        `;
        
        // Attach event listeners after rendering
        setTimeout(() => this.attachEventListeners(), 0);
        
        return this.element;
    }
    
    onMount() {
        // Called by router after component is mounted
        this.attachEventListeners();
    }

    renderTabContent() {
        switch (this.activeTab) {
            case 0:
                return this.renderInterviewPrep();
            case 1:
                return this.renderResumeBuilder();
            case 2:
                return this.renderATSChecker();
            case 3:
                return this.renderEditorKnowledge();
            case 4:
                return this.renderHackathonAwareness();
            case 5:
                return this.renderInternships();
            default:
                return this.renderInterviewPrep();
        }
    }

    renderInterviewPrep() {
        return `
            <div class="space-y-6">
                <!-- Sub-tab Navigation -->
                <div class="flex gap-4 mb-6">
                    ${this.subTabs.map(tab => `
                        <button data-subtab="${tab.id}" class="subtab-button px-6 py-3 rounded-xl font-semibold transition-all ${
                            this.activeSubTab === tab.id
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                                : 'bg-gray-800/40 text-gray-400 hover:text-white border border-gray-700/50'
                        }">
                            <span class="mr-2">${tab.icon}</span>
                            ${tab.name}
                        </button>
                    `).join('')}
                </div>

                <!-- Sub-tab Content -->
                <div id="subTabContent" class="opacity-100 transform translate-x-0 transition-all duration-300">
                    ${this.renderSubTabContent()}
                </div>
            </div>
        `;
    }

    renderSubTabContent() {
        switch (this.activeSubTab) {
            case 'coding':
                return this.renderCodingTerminal();
            case 'interview':
                return this.renderAIInterviewer();
            case 'aptitude':
                return this.renderAptitudeTests();
            default:
                return this.renderCodingTerminal();
        }
    }

    renderCodingTerminal() {
        return `
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[80vh]">
                <!-- Left Panel - Problem Statement -->
                <div class="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-6 overflow-hidden flex flex-col">
                    <!-- Problem Tabs -->
                    <div class="flex gap-2 mb-6">
                        <button class="problem-tab-button px-4 py-2 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-600/30" data-problem-tab="description">
                            Description
                        </button>
                        <button class="problem-tab-button px-4 py-2 rounded-lg bg-gray-700/40 text-gray-400 hover:text-white transition-all" data-problem-tab="solutions">
                            Solutions
                        </button>
                        <button class="problem-tab-button px-4 py-2 rounded-lg bg-gray-700/40 text-gray-400 hover:text-white transition-all" data-problem-tab="submissions">
                            Submissions
                        </button>
                    </div>

                    <!-- Problem Content -->
                    <div id="problemContent" class="flex-1 overflow-y-auto">
                        ${this.renderProblemDescription()}
                    </div>
                </div>

                <!-- Right Panel - Code Editor -->
                <div class="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-6 flex flex-col">
                    <!-- Editor Header -->
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-4">
                            <select id="languageSelect" class="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white">
                                <option value="python">Python</option>
                                <option value="javascript">JavaScript</option>
                                <option value="java">Java</option>
                                <option value="cpp">C++</option>
                            </select>
                        </div>
                        <div class="flex items-center gap-2">
                            <button id="runButton" class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all flex items-center gap-2">
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z"/>
                                </svg>
                                Run
                            </button>
                            <button id="submitButton" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all flex items-center gap-2">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                                </svg>
                                Submit
                            </button>
                        </div>
                    </div>

                    <!-- Code Editor -->
                    <div class="flex-1 mb-4">
                        <textarea id="codeEditor" class="w-full h-full bg-gray-900 border border-gray-600 rounded-lg p-4 text-white font-mono text-sm resize-none focus:outline-none focus:border-blue-500" spellcheck="false">${this.currentCode}</textarea>
                    </div>

                    <!-- Console/Output -->
                    <div class="bg-gray-900/50 rounded-lg p-4 h-32 overflow-y-auto">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="text-sm font-semibold text-gray-400">Console</span>
                        </div>
                        <div id="consoleOutput" class="text-sm text-green-400 font-mono">
                            Ready to run your code...
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderProblemDescription() {
        return `
            <div class="space-y-6">
                <!-- Title and Difficulty -->
                <div class="flex items-center justify-between">
                    <h3 class="text-2xl font-bold">${this.problemData.title}</h3>
                    <span class="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold">
                        ${this.problemData.difficulty}
                    </span>
                </div>

                <!-- Description -->
                <div class="text-gray-300 leading-relaxed">
                    <p>${this.problemData.description}</p>
                </div>

                <!-- Examples -->
                <div class="space-y-4">
                    <h4 class="text-lg font-semibold text-white">Examples:</h4>
                    ${this.problemData.examples.map((example, index) => `
                        <div class="bg-gray-900/50 rounded-lg p-4 space-y-2">
                            <div class="font-semibold text-blue-400">Example ${index + 1}:</div>
                            <div class="font-mono text-sm">
                                <div><span class="text-gray-400">Input:</span> ${example.input}</div>
                                <div><span class="text-gray-400">Output:</span> ${example.output}</div>
                                ${example.explanation ? `<div><span class="text-gray-400">Explanation:</span> ${example.explanation}</div>` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>

                <!-- Constraints -->
                <div class="space-y-2">
                    <h4 class="text-lg font-semibold text-white">Constraints:</h4>
                    <ul class="space-y-1 text-gray-300 text-sm">
                        ${this.problemData.constraints.map(constraint => `
                            <li class="font-mono">• ${constraint}</li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        `;
    }

    renderAIInterviewer() {
        return `
            <div class="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8">
                <h2 class="text-3xl font-bold mb-4">AI Mock Interview 🎤</h2>
                <p class="text-gray-400 mb-8">Practice with our AI interviewer for technical interviews</p>
                
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <!-- Interview Settings -->
                    <div class="space-y-6">
                        <h3 class="text-xl font-bold">Interview Configuration</h3>
                        
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-400 mb-2">Interview Type</label>
                                <select class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white">
                                    <option>Technical Interview</option>
                                    <option>Behavioral Interview</option>
                                    <option>System Design</option>
                                    <option>Full Stack Developer</option>
                                </select>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-semibold text-gray-400 mb-2">Experience Level</label>
                                <select class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white">
                                    <option>Entry Level (0-2 years)</option>
                                    <option>Mid Level (2-5 years)</option>
                                    <option>Senior Level (5+ years)</option>
                                </select>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-semibold text-gray-400 mb-2">Duration</label>
                                <select class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white">
                                    <option>15 minutes</option>
                                    <option>30 minutes</option>
                                    <option>45 minutes</option>
                                    <option>1 hour</option>
                                </select>
                            </div>
                        </div>
                        
                        <button class="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all">
                            Start Mock Interview
                        </button>
                    </div>
                    
                    <!-- Interview Preview -->
                    <div class="bg-gray-900/50 rounded-2xl p-6">
                        <h3 class="text-xl font-bold mb-4">What to Expect</h3>
                        <div class="space-y-4 text-gray-300">
                            <div class="flex items-start gap-3">
                                <span class="text-blue-400">📹</span>
                                <div>
                                    <p class="font-semibold">Video Interview</p>
                                    <p class="text-sm text-gray-400">Practice with camera and microphone</p>
                                </div>
                            </div>
                            <div class="flex items-start gap-3">
                                <span class="text-green-400">🧠</span>
                                <div>
                                    <p class="font-semibold">AI-Powered Questions</p>
                                    <p class="text-sm text-gray-400">Personalized questions based on your profile</p>
                                </div>
                            </div>
                            <div class="flex items-start gap-3">
                                <span class="text-purple-400">📊</span>
                                <div>
                                    <p class="font-semibold">Instant Feedback</p>
                                    <p class="text-sm text-gray-400">Get detailed analysis and improvement tips</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderAptitudeTests() {
        if (!this.aptitudeTestsInstance) {
            this.aptitudeTestsInstance = new AptitudeTests();
        }
        return this.aptitudeTestsInstance.render();
    }

    renderResumeBuilder() {
        return `
            <div class="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8">
                <h2 class="text-3xl font-bold mb-4">Resume Builder 📄</h2>
                <p class="text-gray-400 mb-8">Create a professional resume with our AI-powered builder</p>
                
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <!-- Template Selection -->
                    <div class="lg:col-span-1">
                        <h3 class="text-xl font-bold mb-4">Choose Template</h3>
                        <div class="space-y-4">
                            <div class="bg-gray-900/50 rounded-lg p-4 border-2 border-blue-500 cursor-pointer">
                                <div class="aspect-[3/4] bg-gradient-to-b from-gray-700 to-gray-800 rounded mb-2 flex items-center justify-center">
                                    <span class="text-4xl">📄</span>
                                </div>
                                <p class="text-center font-semibold">Modern</p>
                            </div>
                            <div class="bg-gray-900/50 rounded-lg p-4 border border-gray-600 hover:border-gray-500 cursor-pointer">
                                <div class="aspect-[3/4] bg-gradient-to-b from-gray-700 to-gray-800 rounded mb-2 flex items-center justify-center">
                                    <span class="text-4xl">📋</span>
                                </div>
                                <p class="text-center font-semibold">Classic</p>
                            </div>
                            <div class="bg-gray-900/50 rounded-lg p-4 border border-gray-600 hover:border-gray-500 cursor-pointer">
                                <div class="aspect-[3/4] bg-gradient-to-b from-gray-700 to-gray-800 rounded mb-2 flex items-center justify-center">
                                    <span class="text-4xl">✨</span>
                                </div>
                                <p class="text-center font-semibold">Creative</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Form Fields -->
                    <div class="lg:col-span-1">
                        <h3 class="text-xl font-bold mb-4">Your Information</h3>
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-400 mb-2">Full Name</label>
                                <input type="text" class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white" placeholder="John Doe">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-400 mb-2">Email</label>
                                <input type="email" class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white" placeholder="john@example.com">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-400 mb-2">Phone</label>
                                <input type="tel" class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white" placeholder="+1 (555) 123-4567">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-400 mb-2">Professional Summary</label>
                                <textarea class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white h-24" placeholder="Brief summary of your experience and skills..."></textarea>
                            </div>
                            <button class="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all">
                                Add Work Experience
                            </button>
                            <button class="w-full px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-all">
                                Add Education
                            </button>
                        </div>
                    </div>
                    
                    <!-- Preview -->
                    <div class="lg:col-span-1">
                        <h3 class="text-xl font-bold mb-4">Preview</h3>
                        <div class="bg-white rounded-lg p-6 text-black min-h-[600px]">
                            <div class="text-center border-b border-gray-300 pb-4 mb-4">
                                <h2 class="text-2xl font-bold">John Doe</h2>
                                <p class="text-gray-600">Software Developer</p>
                                <p class="text-sm text-gray-500">john@example.com | +1 (555) 123-4567</p>
                            </div>
                            <div class="space-y-4">
                                <div>
                                    <h3 class="text-lg font-bold border-b border-gray-300 pb-1 mb-2">PROFESSIONAL SUMMARY</h3>
                                    <p class="text-sm text-gray-700">Experienced software developer with expertise in full-stack development...</p>
                                </div>
                                <div>
                                    <h3 class="text-lg font-bold border-b border-gray-300 pb-1 mb-2">EXPERIENCE</h3>
                                    <div class="text-sm">
                                        <p class="font-semibold">Software Developer</p>
                                        <p class="text-gray-600">Company Name • 2022 - Present</p>
                                        <p class="text-gray-700 mt-1">• Developed web applications using React and Node.js</p>
                                    </div>
                                </div>
                                <div>
                                    <h3 class="text-lg font-bold border-b border-gray-300 pb-1 mb-2">EDUCATION</h3>
                                    <div class="text-sm">
                                        <p class="font-semibold">Bachelor of Computer Science</p>
                                        <p class="text-gray-600">University Name • 2018 - 2022</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button class="w-full mt-4 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all">
                            Download PDF
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    renderATSChecker() {
        return `
            <div class="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8">
                <h2 class="text-3xl font-bold mb-4">ATS Score Checker ✅</h2>
                <p class="text-gray-400 mb-6">Upload your resume and get instant ATS feedback</p>
                
                <div class="border-2 border-dashed border-gray-600 rounded-2xl p-12 text-center mb-6 hover:border-blue-500 transition-all cursor-pointer">
                    <div class="text-6xl mb-4">📄</div>
                    <p class="text-xl font-semibold mb-2">Drop your resume here</p>
                    <p class="text-gray-400">or click to browse (PDF, DOCX)</p>
                </div>

                <div class="bg-gray-900/50 rounded-2xl p-6">
                    <h3 class="text-xl font-bold mb-4">ATS Tips 💡</h3>
                    <ul class="space-y-2 text-gray-400">
                        <li>✓ Use standard section headings (Experience, Education, Skills)</li>
                        <li>✓ Include relevant keywords from job description</li>
                        <li>✓ Avoid tables, graphics, and fancy formatting</li>
                        <li>✓ Use standard fonts (Arial, Calibri, Times New Roman)</li>
                        <li>✓ Save as .docx or .pdf format</li>
                    </ul>
                </div>
            </div>
        `;
    }

    renderEditorKnowledge() {
        return `
            <div class="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8">
                <h2 class="text-3xl font-bold mb-4">Editor Knowledge ⚙️</h2>
                <p class="text-gray-400 mb-6">Master development tools and version control</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-2xl p-6 hover:border-orange-500/50 transition-all cursor-pointer">
                        <h3 class="text-2xl font-bold mb-4">🐙 GitHub Essentials</h3>
                        <ul class="space-y-3 text-gray-300">
                            <li>• Git commands & workflow</li>
                            <li>• Pull requests & code review</li>
                            <li>• GitHub Actions & CI/CD</li>
                            <li>• Open source contribution</li>
                        </ul>
                        <button class="mt-6 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all flex items-center gap-2">
                            Start Learning →
                        </button>
                    </div>
                    <div class="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-2xl p-6 hover:border-blue-500/50 transition-all cursor-pointer">
                        <h3 class="text-2xl font-bold mb-4">💻 VS Code Mastery</h3>
                        <ul class="space-y-3 text-gray-300">
                            <li>• Keyboard shortcuts</li>
                            <li>• Extensions & themes</li>
                            <li>• Debugging techniques</li>
                            <li>• Productivity hacks</li>
                        </ul>
                        <button class="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all flex items-center gap-2">
                            Explore Tutorials →
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    renderHackathonAwareness() {
        return `
            <div class="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8">
                <h2 class="text-3xl font-bold mb-4">Hackathon Awareness 🏆</h2>
                <p class="text-gray-400 mb-6">Discover and prepare for hackathons</p>
                
                <div class="bg-gray-900/50 rounded-2xl p-6 mb-6">
                    <h3 class="text-xl font-bold mb-4">📚 Complete Guide</h3>
                    <p class="text-gray-400 mb-4">Everything you need to know about participating in hackathons</p>
                    <div class="space-y-3 text-gray-300">
                        <div class="flex items-start gap-3">
                            <span class="text-2xl">1️⃣</span>
                            <div>
                                <h4 class="font-semibold">Find Hackathons</h4>
                                <p class="text-sm text-gray-400">Explore Devfolio, Unstop, MLH</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-3">
                            <span class="text-2xl">2️⃣</span>
                            <div>
                                <h4 class="font-semibold">Form Your Team</h4>
                                <p class="text-sm text-gray-400">2-4 members with diverse skills</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-3">
                            <span class="text-2xl">3️⃣</span>
                            <div>
                                <h4 class="font-semibold">Brainstorm Ideas</h4>
                                <p class="text-sm text-gray-400">Solve real problems creatively</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-3">
                            <span class="text-2xl">4️⃣</span>
                            <div>
                                <h4 class="font-semibold">Build & Demo</h4>
                                <p class="text-sm text-gray-400">Focus on MVP and presentation</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex gap-4">
                    <a href="https://devfolio.co" target="_blank" rel="noopener noreferrer" class="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
                        Browse Devfolio
                    </a>
                    <a href="https://unstop.com" target="_blank" rel="noopener noreferrer" class="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
                        Visit Unstop
                    </a>
                </div>
            </div>
        `;
    }

    renderInternships() {
        return `
    renderInternships() {
        return `
            <div class="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8">
                <h2 class="text-3xl font-bold mb-4">Internship Guide 🎯</h2>
                <p class="text-gray-400 mb-6">Tips and tricks to land your dream internship</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-gray-900/50 rounded-2xl p-6">
                        <h3 class="text-xl font-bold mb-4">📍 Top Platforms</h3>
                        <div class="space-y-3">
                            <a href="https://internshala.com" target="_blank" rel="noopener noreferrer" class="block p-4 bg-gray-800/50 rounded-xl hover:bg-gray-700/50 transition-all">
                                <h4 class="font-semibold mb-1">Internshala</h4>
                                <p class="text-sm text-gray-400">India's #1 internship platform</p>
                            </a>
                            <a href="https://linkedin.com/jobs" target="_blank" rel="noopener noreferrer" class="block p-4 bg-gray-800/50 rounded-xl hover:bg-gray-700/50 transition-all">
                                <h4 class="font-semibold mb-1">LinkedIn</h4>
                                <p class="text-sm text-gray-400">Professional networking</p>
                            </a>
                            <a href="https://wellfound.com" target="_blank" rel="noopener noreferrer" class="block p-4 bg-gray-800/50 rounded-xl hover:bg-gray-700/50 transition-all">
                                <h4 class="font-semibold mb-1">Wellfound (AngelList)</h4>
                                <p class="text-sm text-gray-400">Startup internships</p>
                            </a>
                        </div>
                    </div>

                    <div class="bg-gray-900/50 rounded-2xl p-6">
                        <h3 class="text-xl font-bold mb-4">💡 Pro Tips</h3>
                        <ul class="space-y-3 text-gray-300">
                            <li class="flex items-start gap-2">
                                <span>✓</span>
                                <span>Apply early - deadlines fill up fast</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <span>✓</span>
                                <span>Customize your resume for each application</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <span>✓</span>
                                <span>Build a strong GitHub profile</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <span>✓</span>
                                <span>Network with alumni and professionals</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <span>✓</span>
                                <span>Prepare for technical assessments</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <span>✓</span>
                                <span>Follow up after interviews</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }ttachEventListeners() {
        // Back button
        const backButton = document.getElementById('backButton');
        if (backButton) {
            backButton.addEventListener('click', () => {
                router.navigate('/dashboard');
            });
        }

        // Main tab buttons
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const tabId = parseInt(e.target.closest('button').dataset.tab);
                this.switchTab(tabId);
            });
        });

        // Sub-tab buttons
        document.querySelectorAll('.subtab-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const subTabId = e.target.closest('button').dataset.subtab;
                this.switchSubTab(subTabId);
            });
        });

        // Language selector
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.addEventListener('change', (e) => {
                this.switchLanguage(e.target.value);
            });
        }

        // Run button
        const runButton = document.getElementById('runButton');
        if (runButton) {
            runButton.addEventListener('click', () => {
                this.runCode();
            });
        }

        // Submit button
        const submitButton = document.getElementById('submitButton');
        if (submitButton) {
            submitButton.addEventListener('click', () => {
                this.submitCode();
            });
        }

        // Code editor
        const codeEditor = document.getElementById('codeEditor');
        if (codeEditor) {
            codeEditor.addEventListener('input', (e) => {
                this.currentCode = e.target.value;
            });
        }

        // Aptitude tests event listeners
        if (this.aptitudeTestsInstance && this.activeSubTab === 'aptitude') {
            this.aptitudeTestsInstance.attachEventListeners();
        }
    }

    switchTab(tabId) {
        this.activeTab = tabId;
        
        // Animate content change
        const tabContent = document.getElementById('tabContent');
        if (tabContent) {
            animationEngine.fadeOut(tabContent, 150).then(() => {
                tabContent.innerHTML = this.renderTabContent();
                this.attachEventListeners();
                animationEngine.fadeIn(tabContent, 150);
            });
        }
    }

    switchSubTab(subTabId) {
        this.activeSubTab = subTabId;
        
        // Animate content change
        const subTabContent = document.getElementById('subTabContent');
        if (subTabContent) {
            animationEngine.slideOut(subTabContent, 'left', 200).then(() => {
                subTabContent.innerHTML = this.renderSubTabContent();
                this.attachEventListeners();
                animationEngine.slideIn(subTabContent, 'right', 200);
            });
        }
    }

    switchLanguage(language) {
        this.currentLanguage = language;
        this.currentCode = this.codeTemplates[language];
        
        const codeEditor = document.getElementById('codeEditor');
        if (codeEditor) {
            codeEditor.value = this.currentCode;
        }
    }

    runCode() {
        const consoleOutput = document.getElementById('consoleOutput');
        const runButton = document.getElementById('runButton');
        
        if (consoleOutput && runButton) {
            // Simulate code execution
            runButton.innerHTML = `
                <svg class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke-width="4" stroke-opacity="0.25"/>
                    <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Running...
            `;
            
            setTimeout(() => {
                consoleOutput.innerHTML = `
                    <div class="text-green-400">✓ Code executed successfully</div>
                    <div class="text-gray-300">Output: [0, 1]</div>
                    <div class="text-gray-400">Execution time: 0.002s</div>
                `;
                
                runButton.innerHTML = `
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                    </svg>
                    Run
                `;
            }, 1500);
        }
    }

    submitCode() {
        const consoleOutput = document.getElementById('consoleOutput');
        const submitButton = document.getElementById('submitButton');
        
        if (consoleOutput && submitButton) {
            // Simulate code submission
            submitButton.innerHTML = `
                <svg class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke-width="4" stroke-opacity="0.25"/>
                    <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Submitting...
            `;
            
            setTimeout(() => {
                consoleOutput.innerHTML = `
                    <div class="text-green-400">🎉 Accepted!</div>
                    <div class="text-gray-300">Runtime: 52ms (Beats 95% of submissions)</div>
                    <div class="text-gray-300">Memory: 14.2MB (Beats 85% of submissions)</div>
                    <div class="text-gray-400">All test cases passed ✓</div>
                `;
                
                submitButton.innerHTML = `
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                    </svg>
                    Submit
                `;
            }, 2000);
        }
    }
}