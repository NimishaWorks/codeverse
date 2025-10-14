import { stateManager } from '../utils/state-manager.js';
import { animationEngine } from '../utils/animation-engine.js';
import { router } from '../utils/router.js';
import { AptitudeTests } from './AptitudeTests.js';
import { CodingTerminal } from './CodingTerminal.js';
import { CameraOverlay } from './CameraOverlay.js';
import { TimerOverlay } from './TimerOverlay.js';

export class InterviewHub {
    constructor(params = {}) {
        this.params = params;
        this.element = null;
        this.activeTab = 0;
        this.activeSubTab = 'coding';
        this.showTutorial = false;
        this.tutorialType = null;
        
        // Camera and Timer components for coding rounds
        this.camera = new CameraOverlay();
        this.timer = new TimerOverlay(1800); // 30 minutes default
        this.codingSessionActive = false;
        
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

    render() {
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
            <!-- Session Control Bar -->
            <div class="bg-gradient-to-r from-gray-900/95 to-gray-800/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-4 mb-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <div class="flex items-center gap-2">
                            <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            <span class="text-gray-300 font-semibold">Coding Session</span>
                        </div>
                        <div id="sessionStatus" class="px-3 py-1 bg-gray-700/50 text-gray-400 rounded-lg text-sm font-medium">
                            Not Started
                        </div>
                    </div>
                    
                    <div class="flex items-center gap-3">
                        <!-- Camera Toggle -->
                        <button id="toggleCameraSession" class="px-4 py-2 bg-gray-700/60 hover:bg-gray-600/60 text-gray-300 rounded-lg text-sm font-medium transition-all flex items-center gap-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                            </svg>
                            <span id="cameraStatusText">Enable Camera</span>
                        </button>
                        
                        <!-- Timer Display -->
                        <div id="codingTimerDisplay" class="px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg text-sm font-bold border border-blue-500/30">
                            ⏱️ 30:00
                        </div>
                        
                        <!-- Start/End Session Button -->
                        <button id="toggleSessionBtn" class="px-6 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg text-sm font-bold transition-all shadow-lg">
                            Start Session
                        </button>
                    </div>
                </div>
            </div>

            <div class="flex gap-4 h-[85vh]" id="leetcode-container">
                <!-- Left Panel - Problem Description (40% width) -->
                <div class="w-[40%] bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl overflow-hidden flex flex-col">
                    <!-- Problem Tabs -->
                    <div class="flex border-b border-gray-700/50 bg-gray-900/60">
                        <button class="problem-tab-btn px-6 py-3 text-sm font-semibold border-b-2 border-blue-500 text-blue-400 bg-gray-800/40" data-tab="description">
                            📝 Description
                        </button>
                        <button class="problem-tab-btn px-6 py-3 text-sm font-semibold border-b-2 border-transparent text-gray-400 hover:text-white hover:bg-gray-800/20 transition-all" data-tab="solutions">
                            💡 Solutions
                        </button>
                        <button class="problem-tab-btn px-6 py-3 text-sm font-semibold border-b-2 border-transparent text-gray-400 hover:text-white hover:bg-gray-800/20 transition-all" data-tab="submissions">
                            📊 Submissions
                        </button>
                    </div>

                    <!-- Problem Content Area -->
                    <div id="problemContent" class="flex-1 overflow-y-auto p-6 custom-scrollbar">
                        ${this.renderProblemDescription()}
                    </div>
                </div>

                <!-- Right Panel - Code Editor + Console (60% width) -->
                <div class="flex-1 flex flex-col gap-4">
                    <!-- Top: Code Editor (65% height) -->
                    <div class="h-[65%] bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl overflow-hidden flex flex-col">
                        <!-- Editor Header -->
                        <div class="flex items-center justify-between px-4 py-3 bg-gray-900/60 border-b border-gray-700/50">
                            <div class="flex items-center gap-3">
                                <span class="text-sm font-semibold text-gray-400">Language:</span>
                                <select id="languageSelect" class="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white font-medium focus:outline-none focus:border-blue-500 cursor-pointer transition-all">
                                    <option value="python">🐍 Python</option>
                                    <option value="javascript">⚡ JavaScript</option>
                                    <option value="java">☕ Java</option>
                                    <option value="cpp">⚙️ C++</option>
                                    <option value="go">🔵 Go</option>
                                    <option value="rust">🦀 Rust</option>
                                </select>
                                <button id="resetCodeBtn" class="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg text-sm font-medium transition-all flex items-center gap-2">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                                    </svg>
                                    Reset
                                </button>
                            </div>
                            <div class="flex items-center gap-2">
                                <button id="runCodeBtn" class="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg text-sm font-bold transition-all flex items-center gap-2 shadow-lg hover:shadow-green-500/25">
                                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z"/>
                                    </svg>
                                    Run Code
                                </button>
                                <button id="submitCodeBtn" class="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg text-sm font-bold transition-all flex items-center gap-2 shadow-lg hover:shadow-blue-500/25">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                                    </svg>
                                    Submit
                                </button>
                            </div>
                        </div>

                        <!-- Code Editor Area -->
                        <div class="flex-1 relative">
                            <textarea 
                                id="codeEditor" 
                                class="w-full h-full bg-gray-950 text-gray-100 font-mono text-sm p-4 resize-none focus:outline-none custom-scrollbar leading-relaxed"
                                spellcheck="false"
                                placeholder="// Write your code here..."
                            >${this.currentCode || this.getDefaultCode('python')}</textarea>
                            <div class="absolute top-2 right-2 flex gap-2">
                                <button id="copyCodeBtn" class="px-3 py-1.5 bg-gray-800/80 hover:bg-gray-700 text-gray-300 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5">
                                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                                    </svg>
                                    Copy
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Bottom: Test Cases + Console (35% height) -->
                    <div class="flex-1 bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl overflow-hidden flex flex-col">
                        <!-- Console Tabs -->
                        <div class="flex border-b border-gray-700/50 bg-gray-900/60">
                            <button class="console-tab-btn px-4 py-2.5 text-sm font-semibold border-b-2 border-green-500 text-green-400 bg-gray-800/40" data-console-tab="testcases">
                                🧪 Test Cases
                            </button>
                            <button class="console-tab-btn px-4 py-2.5 text-sm font-semibold border-b-2 border-transparent text-gray-400 hover:text-white hover:bg-gray-800/20 transition-all" data-console-tab="results">
                                ✅ Results
                            </button>
                            <button class="console-tab-btn px-4 py-2.5 text-sm font-semibold border-b-2 border-transparent text-gray-400 hover:text-white hover:bg-gray-800/20 transition-all" data-console-tab="console">
                                💻 Console
                            </button>
                        </div>

                        <!-- Console Content -->
                        <div class="flex-1 overflow-y-auto custom-scrollbar">
                            <!-- Test Cases View -->
                            <div id="testCasesView" class="p-4 space-y-3">
                                ${this.renderTestCases()}
                            </div>

                            <!-- Results View -->
                            <div id="resultsView" class="p-4 hidden">
                                <div class="text-center text-gray-400 py-8">
                                    <svg class="w-16 h-16 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                                    </svg>
                                    <p class="text-sm">Run your code to see results here</p>
                                </div>
                            </div>

                            <!-- Console Output View -->
                            <div id="consoleView" class="p-4 hidden">
                                <div id="consoleOutput" class="font-mono text-sm text-green-400 space-y-1">
                                    <div class="text-gray-500">// Console ready...</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                    height: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(17, 24, 39, 0.3);
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(75, 85, 99, 0.5);
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(107, 114, 128, 0.7);
                }
                #codeEditor {
                    tab-size: 4;
                    -moz-tab-size: 4;
                }
            </style>
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

    renderTestCases() {
        const testCases = this.problemData.testCases || [
            { input: '[2,7,11,15], target = 9', output: '[0,1]', explanation: 'nums[0] + nums[1] = 2 + 7 = 9' },
            { input: '[3,2,4], target = 6', output: '[1,2]', explanation: 'nums[1] + nums[2] = 2 + 4 = 6' },
            { input: '[3,3], target = 6', output: '[0,1]', explanation: 'nums[0] + nums[1] = 3 + 3 = 6' }
        ];

        return testCases.map((testCase, index) => `
            <div class="bg-gray-800/40 rounded-lg p-4 border border-gray-700/30 hover:border-gray-600/50 transition-all">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-sm font-bold text-gray-400">Case ${index + 1}</span>
                    <button class="test-case-run-btn px-3 py-1 bg-green-600/20 hover:bg-green-600/30 text-green-400 rounded text-xs font-semibold transition-all" data-case="${index}">
                        Run
                    </button>
                </div>
                <div class="space-y-2 text-sm font-mono">
                    <div class="flex gap-2">
                        <span class="text-gray-500">Input:</span>
                        <span class="text-gray-300">${testCase.input}</span>
                    </div>
                    <div class="flex gap-2">
                        <span class="text-gray-500">Expected:</span>
                        <span class="text-blue-400">${testCase.output}</span>
                    </div>
                    ${testCase.explanation ? `
                    <div class="flex gap-2">
                        <span class="text-gray-500">Note:</span>
                        <span class="text-gray-400 text-xs">${testCase.explanation}</span>
                    </div>
                    ` : ''}
                </div>
            </div>
        `).join('');
    }

    getDefaultCode(language) {
        const templates = {
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
        
    }
}`,
            cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your solution here
        
    }
};`,
            go: `func twoSum(nums []int, target int) []int {
    // Write your solution here
    
}`,
            rust: `impl Solution {
    pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
        // Write your solution here
        
    }
}`
        };
        return templates[language] || templates.python;
    }

    renderAIInterviewer() {
        return `
            <div class="max-w-7xl mx-auto">
                <!-- Header -->
                <div class="mb-8">
                    <h1 class="text-4xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent flex items-center gap-3">
                        <span>🎤</span> AI Mock Interview
                    </h1>
                    <p class="text-gray-400 text-lg">Practice with AI-powered interview questions and get real-time feedback</p>
                </div>

                <!-- Setup/Active Interview Container -->
                <div id="interviewContainer">
                    <!-- Setup View -->
                    <div id="interviewSetup" class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <!-- Left: Configuration -->
                        <div class="bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8">
                            <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
                                <span>⚙️</span> Interview Configuration
                            </h2>
                            
                            <div class="space-y-5">
                                <!-- Interview Type -->
                                <div>
                                    <label class="block text-sm font-bold text-gray-400 mb-3">Interview Type</label>
                                    <div class="grid grid-cols-2 gap-3">
                                        <button class="interview-type-btn px-4 py-3 bg-blue-600/20 hover:bg-blue-600/30 border-2 border-blue-500 text-blue-400 rounded-lg font-semibold transition-all" data-type="technical">
                                            💻 Technical
                                        </button>
                                        <button class="interview-type-btn px-4 py-3 bg-gray-700/40 hover:bg-gray-600/40 border-2 border-gray-600 text-gray-300 rounded-lg font-semibold transition-all" data-type="behavioral">
                                            🧠 Behavioral
                                        </button>
                                        <button class="interview-type-btn px-4 py-3 bg-gray-700/40 hover:bg-gray-600/40 border-2 border-gray-600 text-gray-300 rounded-lg font-semibold transition-all" data-type="system-design">
                                            🏗️ System Design
                                        </button>
                                        <button class="interview-type-btn px-4 py-3 bg-gray-700/40 hover:bg-gray-600/40 border-2 border-gray-600 text-gray-300 rounded-lg font-semibold transition-all" data-type="hr">
                                            👔 HR Round
                                        </button>
                                    </div>
                                </div>

                                <!-- Experience Level -->
                                <div>
                                    <label class="block text-sm font-bold text-gray-400 mb-3">Experience Level</label>
                                    <select id="experienceLevel" class="w-full bg-gray-800 border-2 border-gray-600 rounded-lg px-4 py-3 text-white font-medium focus:outline-none focus:border-blue-500 transition-all">
                                        <option value="entry">Entry Level (0-2 years)</option>
                                        <option value="mid">Mid Level (2-5 years)</option>
                                        <option value="senior">Senior Level (5+ years)</option>
                                    </select>
                                </div>

                                <!-- Duration -->
                                <div>
                                    <label class="block text-sm font-bold text-gray-400 mb-3">Interview Duration</label>
                                    <div class="grid grid-cols-4 gap-2">
                                        <button class="duration-btn px-4 py-2 bg-green-600/20 hover:bg-green-600/30 border-2 border-green-500 text-green-400 rounded-lg font-bold transition-all" data-duration="15">
                                            15m
                                        </button>
                                        <button class="duration-btn px-4 py-2 bg-gray-700/40 hover:bg-gray-600/40 border-2 border-gray-600 text-gray-300 rounded-lg font-bold transition-all" data-duration="30">
                                            30m
                                        </button>
                                        <button class="duration-btn px-4 py-2 bg-gray-700/40 hover:bg-gray-600/40 border-2 border-gray-600 text-gray-300 rounded-lg font-bold transition-all" data-duration="45">
                                            45m
                                        </button>
                                        <button class="duration-btn px-4 py-2 bg-gray-700/40 hover:bg-gray-600/40 border-2 border-gray-600 text-gray-300 rounded-lg font-bold transition-all" data-duration="60">
                                            60m
                                        </button>
                                    </div>
                                </div>

                                <!-- Camera Permission Status -->
                                <div id="cameraStatus" class="bg-gray-800/60 rounded-lg p-4 border border-gray-700">
                                    <div class="flex items-center gap-3">
                                        <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                                        </svg>
                                        <div>
                                            <p class="font-semibold text-gray-300">Camera Access</p>
                                            <p class="text-sm text-gray-500">Not connected</p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Start Button -->
                                <button id="startInterviewBtn" class="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-3">
                                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z"/>
                                    </svg>
                                    Start Interview
                                </button>
                            </div>
                        </div>

                        <!-- Right: What to Expect -->
                        <div class="space-y-6">
                            <!-- Info Cards -->
                            <div class="bg-gradient-to-br from-blue-900/40 to-blue-800/20 backdrop-blur-xl border border-blue-700/30 rounded-2xl p-6">
                                <div class="flex items-start gap-4">
                                    <div class="bg-blue-500/20 p-3 rounded-xl">
                                        <svg class="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                                        </svg>
                                    </div>
                                    <div class="flex-1">
                                        <h3 class="text-xl font-bold text-white mb-2">Video Interview</h3>
                                        <p class="text-gray-300 leading-relaxed">Practice with your camera and microphone enabled. Get comfortable with video interviews in a safe environment.</p>
                                    </div>
                                </div>
                            </div>

                            <div class="bg-gradient-to-br from-purple-900/40 to-purple-800/20 backdrop-blur-xl border border-purple-700/30 rounded-2xl p-6">
                                <div class="flex items-start gap-4">
                                    <div class="bg-purple-500/20 p-3 rounded-xl">
                                        <svg class="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                                        </svg>
                                    </div>
                                    <div class="flex-1">
                                        <h3 class="text-xl font-bold text-white mb-2">AI-Powered Questions</h3>
                                        <p class="text-gray-300 leading-relaxed">Get personalized interview questions based on your selected type and experience level.</p>
                                    </div>
                                </div>
                            </div>

                            <div class="bg-gradient-to-br from-green-900/40 to-green-800/20 backdrop-blur-xl border border-green-700/30 rounded-2xl p-6">
                                <div class="flex items-start gap-4">
                                    <div class="bg-green-500/20 p-3 rounded-xl">
                                        <svg class="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                                        </svg>
                                    </div>
                                    <div class="flex-1">
                                        <h3 class="text-xl font-bold text-white mb-2">Instant Feedback</h3>
                                        <p class="text-gray-300 leading-relaxed">Receive detailed analysis of your responses, body language, and speaking pace after the interview.</p>
                                    </div>
                                </div>
                            </div>

                            <!-- Tips -->
                            <div class="bg-gray-800/60 rounded-2xl p-6 border border-gray-700/50">
                                <h3 class="text-lg font-bold mb-4 flex items-center gap-2">
                                    <span>💡</span> Pro Tips
                                </h3>
                                <ul class="space-y-3 text-sm text-gray-300">
                                    <li class="flex items-start gap-2">
                                        <span class="text-green-400 mt-1">✓</span>
                                        <span>Find a quiet, well-lit space with minimal background noise</span>
                                    </li>
                                    <li class="flex items-start gap-2">
                                        <span class="text-green-400 mt-1">✓</span>
                                        <span>Position your camera at eye level and maintain good posture</span>
                                    </li>
                                    <li class="flex items-start gap-2">
                                        <span class="text-green-400 mt-1">✓</span>
                                        <span>Speak clearly and maintain eye contact with the camera</span>
                                    </li>
                                    <li class="flex items-start gap-2">
                                        <span class="text-green-400 mt-1">✓</span>
                                        <span>Take a moment to think before answering complex questions</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Active Interview View (Hidden by default) -->
                    <div id="activeInterview" class="hidden">
                        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <!-- Left: Video Feed (2/3 width) -->
                            <div class="lg:col-span-2 space-y-6">
                                <!-- Camera Feed -->
                                <div class="bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl overflow-hidden">
                                    <div class="relative aspect-video bg-gray-950">
                                        <video id="webcamVideo" class="w-full h-full object-cover" autoplay muted></video>
                                        <div class="absolute top-4 left-4 flex gap-2">
                                            <div class="bg-red-500/80 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-2">
                                                <div class="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                                <span class="text-white text-sm font-bold">Recording</span>
                                            </div>
                                            <div id="interviewTimer" class="bg-gray-900/80 backdrop-blur px-3 py-1.5 rounded-full text-white text-sm font-bold">
                                                00:00
                                            </div>
                                        </div>
                                        <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3">
                                            <button id="toggleCameraBtn" class="bg-gray-800/80 hover:bg-gray-700 backdrop-blur p-3 rounded-full transition-all">
                                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                                                </svg>
                                            </button>
                                            <button id="toggleMicBtn" class="bg-gray-800/80 hover:bg-gray-700 backdrop-blur p-3 rounded-full transition-all">
                                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/>
                                                </svg>
                                            </button>
                                            <button id="endInterviewBtn" class="bg-red-600 hover:bg-red-700 backdrop-blur px-6 py-3 rounded-full text-white font-bold transition-all flex items-center gap-2">
                                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <rect x="6" y="6" width="12" height="12"/>
                                                </svg>
                                                End Interview
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <!-- Current Question Card -->
                                <div class="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-xl border border-blue-700/30 rounded-2xl p-6">
                                    <div class="flex items-start justify-between mb-4">
                                        <h3 class="text-lg font-bold text-blue-400">Question <span id="questionNumber">1</span> of <span id="totalQuestions">5</span></h3>
                                        <span class="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-sm font-semibold">Technical</span>
                                    </div>
                                    <p id="currentQuestion" class="text-xl text-white leading-relaxed mb-4">
                                        Tell me about a challenging project you worked on recently. What was your approach?
                                    </p>
                                    <div class="flex justify-between items-center">
                                        <button id="prevQuestionBtn" class="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg font-semibold transition-all flex items-center gap-2">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                                            </svg>
                                            Previous
                                        </button>
                                        <button id="nextQuestionBtn" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all flex items-center gap-2">
                                            Next
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <!-- Right: Notes & Tips (1/3 width) -->
                            <div class="space-y-6">
                                <!-- Interview Progress -->
                                <div class="bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
                                    <h3 class="text-lg font-bold mb-4">Interview Progress</h3>
                                    <div class="space-y-3">
                                        <div class="flex justify-between text-sm">
                                            <span class="text-gray-400">Questions</span>
                                            <span class="text-white font-bold">1/5</span>
                                        </div>
                                        <div class="w-full bg-gray-700 rounded-full h-2">
                                            <div id="progressBar" class="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all" style="width: 20%"></div>
                                        </div>
                                        <div class="flex justify-between text-sm">
                                            <span class="text-gray-400">Time Elapsed</span>
                                            <span id="timeElapsed" class="text-white font-bold">00:00</span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Quick Tips -->
                                <div class="bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
                                    <h3 class="text-lg font-bold mb-4 flex items-center gap-2">
                                        <span>💡</span> Quick Tips
                                    </h3>
                                    <div class="space-y-3 text-sm text-gray-300">
                                        <div class="bg-gray-900/40 rounded-lg p-3">
                                            <p class="font-semibold text-blue-400 mb-1">Take Your Time</p>
                                            <p>It's okay to pause and think before answering</p>
                                        </div>
                                        <div class="bg-gray-900/40 rounded-lg p-3">
                                            <p class="font-semibold text-green-400 mb-1">Be Specific</p>
                                            <p>Use concrete examples from your experience</p>
                                        </div>
                                        <div class="bg-gray-900/40 rounded-lg p-3">
                                            <p class="font-semibold text-purple-400 mb-1">Stay Confident</p>
                                            <p>Maintain eye contact and speak clearly</p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Personal Notes -->
                                <div class="bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
                                    <h3 class="text-lg font-bold mb-4">Personal Notes</h3>
                                    <textarea id="interviewNotes" class="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white text-sm resize-none focus:outline-none focus:border-blue-500" rows="6" placeholder="Jot down key points or reminders..."></textarea>
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
            <div class="max-w-7xl mx-auto p-6">
                <!-- Header with Action Buttons -->
                <div class="mb-8">
                    <h1 class="text-4xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent flex items-center gap-3">
                        <span>📄</span> Resume & Portfolio Builder
                    </h1>
                    <p class="text-gray-400 text-lg">Create professional ATS-friendly resumes with AI assistance</p>
                </div>

                <!-- Quick Action Buttons -->
                <div class="flex flex-wrap gap-4 mb-8">
                    <button class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center gap-2 transition-all transform hover:scale-105">
                        <span>👤</span> Auto-Fill Profile
                    </button>
                    <button class="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold flex items-center gap-2 transition-all transform hover:scale-105">
                        <span>✨</span> AI Summary
                    </button>
                    <button class="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold flex items-center gap-2 transition-all transform hover:scale-105">
                        <span>✅</span> Check ATS Score
                    </button>
                    <button id="exportPDFBtn" class="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold flex items-center gap-2 transition-all transform hover:scale-105">
                        <span>📥</span> Export PDF
                    </button>
                    <button class="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-semibold flex items-center gap-2 transition-all transform hover:scale-105">
                        <span>💼</span> LinkedIn Template
                    </button>
                </div>

                <!-- Customize Section -->
                <div class="bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 mb-8">
                    <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
                        <span>🎨</span> Customize Your Resume
                    </h2>
                    
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <!-- Template Selection -->
                        <div>
                            <h3 class="text-lg font-semibold text-gray-300 mb-4">Template</h3>
                            <div class="grid grid-cols-2 gap-4">
                                <button class="resume-template bg-gray-700/50 border-2 border-blue-500 rounded-xl p-4 hover:bg-gray-700 transition-all" data-template="classic">
                                    <div class="text-4xl mb-2">📋</div>
                                    <p class="text-sm font-semibold">Classic</p>
                                </button>
                                <button class="resume-template bg-gray-700/50 border border-gray-600 rounded-xl p-4 hover:bg-gray-700 hover:border-blue-400 transition-all" data-template="modern">
                                    <div class="text-4xl mb-2">🎨</div>
                                    <p class="text-sm font-semibold">Modern</p>
                                </button>
                                <button class="resume-template bg-gray-700/50 border border-gray-600 rounded-xl p-4 hover:bg-gray-700 hover:border-blue-400 transition-all" data-template="creative">
                                    <div class="text-4xl mb-2">✨</div>
                                    <p class="text-sm font-semibold">Creative</p>
                                </button>
                                <button class="resume-template bg-gray-700/50 border border-gray-600 rounded-xl p-4 hover:bg-gray-700 hover:border-blue-400 transition-all" data-template="minimal">
                                    <div class="text-4xl mb-2">📄</div>
                                    <p class="text-sm font-semibold">Minimal</p>
                                </button>
                            </div>
                        </div>

                        <!-- Color Theme -->
                        <div>
                            <h3 class="text-lg font-semibold text-gray-300 mb-4">Color Theme</h3>
                            <div class="flex gap-3 flex-wrap">
                                <button class="w-12 h-12 rounded-lg bg-blue-500 border-2 border-white shadow-lg transform hover:scale-110 transition-all" data-color="blue"></button>
                                <button class="w-12 h-12 rounded-lg bg-green-500 border border-gray-600 shadow-lg transform hover:scale-110 transition-all" data-color="green"></button>
                                <button class="w-12 h-12 rounded-lg bg-purple-500 border border-gray-600 shadow-lg transform hover:scale-110 transition-all" data-color="purple"></button>
                                <button class="w-12 h-12 rounded-lg bg-pink-500 border border-gray-600 shadow-lg transform hover:scale-110 transition-all" data-color="pink"></button>
                                <button class="w-12 h-12 rounded-lg bg-indigo-600 border border-gray-600 shadow-lg transform hover:scale-110 transition-all" data-color="indigo"></button>
                            </div>
                        </div>

                        <!-- Font Style -->
                        <div>
                            <h3 class="text-lg font-semibold text-gray-300 mb-4">Font Style</h3>
                            <div class="space-y-2">
                                <button class="w-full px-4 py-3 bg-blue-700/50 border border-blue-500 rounded-lg text-left font-sans hover:bg-blue-700 transition-all">Sans Serif</button>
                                <button class="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-left font-serif hover:bg-gray-700 hover:border-gray-500 transition-all">Serif</button>
                                <button class="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-left font-mono hover:bg-gray-700 hover:border-gray-500 transition-all">Monospace</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Main Content: Form + Preview -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <!-- Left: Form -->
                    <div class="space-y-6">
                        <!-- Personal Information -->
                        <div class="bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
                            <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
                                <span>👤</span> Personal Information
                            </h3>
                            <div class="space-y-4">
                                <input type="text" id="resumeName" class="w-full bg-gray-700/70 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-all" placeholder="Full Name *">
                                <input type="email" id="resumeEmail" class="w-full bg-gray-700/70 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-all" placeholder="Email Address *">
                                <input type="tel" id="resumePhone" class="w-full bg-gray-700/70 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-all" placeholder="Phone Number">
                                <input type="text" id="resumeLocation" class="w-full bg-gray-700/70 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-all" placeholder="Location (City, State)">
                                <input type="url" id="resumeWebsite" class="w-full bg-gray-700/70 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-all" placeholder="Website/Portfolio URL">
                                <input type="text" id="resumeLinkedIn" class="w-full bg-gray-700/70 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-all" placeholder="LinkedIn Profile">
                                <input type="text" id="resumeGitHub" class="w-full bg-gray-700/70 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-all" placeholder="GitHub Profile">
                            </div>
                        </div>

                        <!-- Professional Summary -->
                        <div class="bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
                            <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
                                <span>📝</span> Professional Summary
                            </h3>
                            <textarea id="resumeSummary" class="w-full bg-gray-700/70 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-all h-32 resize-none" placeholder="Write a brief summary of your professional experience and goals..."></textarea>
                            <button class="mt-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg font-semibold transition-all">
                                ✨ AI Generate Summary
                            </button>
                        </div>

                        <!-- Skills -->
                        <div class="bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
                            <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
                                <span>💪</span> Skills
                            </h3>
                            <div class="flex gap-2 mb-3 flex-wrap" id="skillsContainer">
                                <span class="px-3 py-1 bg-blue-600 rounded-full text-sm">JavaScript</span>
                                <span class="px-3 py-1 bg-green-600 rounded-full text-sm">React</span>
                                <span class="px-3 py-1 bg-purple-600 rounded-full text-sm">Node.js</span>
                            </div>
                            <div class="flex gap-2">
                                <input type="text" id="newSkill" class="flex-1 bg-gray-700/70 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-all" placeholder="Add a skill...">
                                <button id="addSkillBtn" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all">Add</button>
                            </div>
                        </div>

                        <!-- Experience -->
                        <div class="bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
                            <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
                                <span>💼</span> Work Experience
                            </h3>
                            <div id="experienceContainer" class="space-y-4 mb-4"></div>
                            <button id="addExperienceBtn" class="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all">
                                + Add Experience
                            </button>
                        </div>

                        <!-- Education -->
                        <div class="bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
                            <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
                                <span>🎓</span> Education
                            </h3>
                            <div id="educationContainer" class="space-y-4 mb-4"></div>
                            <button id="addEducationBtn" class="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all">
                                + Add Education
                            </button>
                        </div>
                    </div>

                    <!-- Right: Live Preview -->
                    <div class="lg:sticky lg:top-6 h-fit">
                        <div class="bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
                            <div class="flex items-center justify-between mb-4">
                                <h3 class="text-xl font-bold flex items-center gap-2">
                                    <span>📄</span> Live Preview
                                </h3>
                                <button class="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
                                </button>
                            </div>
                            
                            <!-- Resume Preview (White Paper) -->
                            <div id="resumePreview" class="bg-white rounded-lg shadow-2xl p-8 text-black min-h-[800px] overflow-auto" style="max-height: 1000px;">
                                <div class="text-center border-b-2 border-blue-600 pb-4 mb-6">
                                    <h1 class="text-3xl font-bold text-blue-600 mb-2">Your Name</h1>
                                    <p class="text-sm text-gray-600">email@example.com | (555) 123-4567 | City, State</p>
                                    <p class="text-sm text-gray-600">linkedin.com/in/yourprofile | github.com/yourname</p>
                                </div>

                                <div class="mb-6">
                                    <h2 class="text-lg font-bold text-blue-600 border-b border-gray-300 pb-1 mb-3">PROFESSIONAL SUMMARY</h2>
                                    <p class="text-sm text-gray-700 leading-relaxed">
                                        Passionate software developer with expertise in full-stack web development. Experienced in building scalable applications using modern frameworks and best practices.
                                    </p>
                                </div>

                                <div class="mb-6">
                                    <h2 class="text-lg font-bold text-blue-600 border-b border-gray-300 pb-1 mb-3">SKILLS</h2>
                                    <div class="flex flex-wrap gap-2">
                                        <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">JavaScript</span>
                                        <span class="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">React</span>
                                        <span class="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded">Node.js</span>
                                    </div>
                                </div>

                                <div class="mb-6">
                                    <h2 class="text-lg font-bold text-blue-600 border-b border-gray-300 pb-1 mb-3">WORK EXPERIENCE</h2>
                                    <div class="mb-4">
                                        <p class="font-bold text-gray-800">Software Developer</p>
                                        <p class="text-sm text-gray-600">Company Name • 2022 - Present</p>
                                        <ul class="list-disc list-inside text-sm text-gray-700 mt-2 space-y-1">
                                            <li>Developed and maintained web applications using React and Node.js</li>
                                            <li>Collaborated with cross-functional teams to deliver high-quality software</li>
                                        </ul>
                                    </div>
                                </div>

                                <div>
                                    <h2 class="text-lg font-bold text-blue-600 border-b border-gray-300 pb-1 mb-3">EDUCATION</h2>
                                    <div>
                                        <p class="font-bold text-gray-800">Bachelor of Computer Science</p>
                                        <p class="text-sm text-gray-600">University Name • 2018 - 2022</p>
                                        <p class="text-sm text-gray-700 mt-1">GPA: 3.8/4.0</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderATSChecker() {
        return `
            <div class="max-w-6xl mx-auto p-6">
                <!-- Header -->
                <div class="mb-8">
                    <h1 class="text-4xl font-bold mb-3 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent flex items-center gap-3">
                        <span>✅</span> ATS Score Checker
                    </h1>
                    <p class="text-gray-400 text-lg">Analyze your resume for ATS compatibility and get instant feedback</p>
                </div>

                <!-- Main Content Grid -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <!-- Left: Input Section -->
                    <div class="space-y-6">
                        <!-- File Upload -->
                        <div class="bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8">
                            <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
                                <span>📤</span> Upload Resume
                            </h3>
                            
                            <input type="file" id="atsFileInput" accept=".pdf,.doc,.docx,.txt" class="hidden">
                            <div id="atsDropZone" class="border-2 border-dashed border-gray-600 rounded-xl p-12 text-center hover:border-green-500 hover:bg-gray-700/30 transition-all cursor-pointer">
                                <div class="text-6xl mb-4">📄</div>
                                <p class="text-xl font-semibold mb-2">Drop your resume here</p>
                                <p class="text-gray-400 mb-4">or click to browse</p>
                                <p class="text-sm text-gray-500">(PDF, DOCX, TXT supported)</p>
                            </div>
                            
                            <div id="atsFileName" class="mt-4 hidden">
                                <div class="flex items-center gap-3 p-4 bg-gray-700/50 rounded-lg">
                                    <span class="text-2xl">📎</span>
                                    <div class="flex-1">
                                        <p class="font-semibold" id="atsFileNameText"></p>
                                        <p class="text-sm text-gray-400" id="atsFileSizeText"></p>
                                    </div>
                                    <button id="atsRemoveFile" class="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-all">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- OR Divider -->
                        <div class="flex items-center gap-4">
                            <div class="flex-1 h-px bg-gray-700"></div>
                            <span class="text-gray-500 font-semibold">OR</span>
                            <div class="flex-1 h-px bg-gray-700"></div>
                        </div>

                        <!-- Paste Text -->
                        <div class="bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
                            <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
                                <span>📝</span> Paste Resume Text
                            </h3>
                            <textarea id="atsResumeText" class="w-full bg-gray-700/70 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none transition-all resize-none" rows="12" placeholder="Paste your resume content here..."></textarea>
                        </div>

                        <!-- Job Description (Optional) -->
                        <div class="bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
                            <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
                                <span>🎯</span> Job Description (Optional)
                            </h3>
                            <textarea id="atsJobDescription" class="w-full bg-gray-700/70 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-all resize-none" rows="6" placeholder="Paste the job description to check keyword match..."></textarea>
                        </div>

                        <!-- Analyze Button -->
                        <button id="atsAnalyzeBtn" class="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg">
                            🔍 Analyze Resume
                        </button>
                    </div>

                    <!-- Right: Results Section -->
                    <div class="space-y-6">
                        <!-- Score Display -->
                        <div id="atsResults" class="bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 text-center hidden">
                            <h3 class="text-2xl font-bold mb-6">ATS Compatibility Score</h3>
                            
                            <!-- Circular Progress -->
                            <div class="relative inline-flex items-center justify-center mb-6">
                                <svg class="w-48 h-48 transform -rotate-90">
                                    <circle cx="96" cy="96" r="88" stroke="currentColor" stroke-width="12" fill="none" class="text-gray-700"/>
                                    <circle id="atsScoreCircle" cx="96" cy="96" r="88" stroke="currentColor" stroke-width="12" fill="none" class="text-green-500" stroke-dasharray="552.92" stroke-dashoffset="552.92" stroke-linecap="round" style="transition: stroke-dashoffset 1s ease-in-out"/>
                                </svg>
                                <div class="absolute">
                                    <div id="atsScoreValue" class="text-5xl font-bold">0</div>
                                    <div class="text-gray-400 text-sm">out of 100</div>
                                </div>
                            </div>
                            
                            <div id="atsScoreLabel" class="text-2xl font-bold mb-2">Analyzing...</div>
                            <p id="atsScoreDesc" class="text-gray-400"></p>
                        </div>

                        <!-- Keyword Analysis -->
                        <div id="atsKeywords" class="bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hidden">
                            <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
                                <span>🔑</span> Keyword Analysis
                            </h3>
                            
                            <div class="space-y-4">
                                <div>
                                    <div class="flex items-center justify-between mb-2">
                                        <span class="text-green-400 font-semibold">✓ Found Keywords</span>
                                        <span id="atsFoundCount" class="text-green-400 font-bold">0</span>
                                    </div>
                                    <div id="atsFoundKeywords" class="flex flex-wrap gap-2"></div>
                                </div>
                                
                                <div>
                                    <div class="flex items-center justify-between mb-2">
                                        <span class="text-red-400 font-semibold">✗ Missing Keywords</span>
                                        <span id="atsMissingCount" class="text-red-400 font-bold">0</span>
                                    </div>
                                    <div id="atsMissingKeywords" class="flex flex-wrap gap-2"></div>
                                </div>
                            </div>
                        </div>

                        <!-- Suggestions -->
                        <div id="atsSuggestions" class="bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hidden">
                            <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
                                <span>💡</span> Improvement Suggestions
                            </h3>
                            <ul id="atsSuggestionsList" class="space-y-3"></ul>
                        </div>

                        <!-- ATS Tips (Always Visible) -->
                        <div class="bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
                            <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
                                <span>�</span> ATS Best Practices
                            </h3>
                            <ul class="space-y-3 text-gray-300">
                                <li class="flex items-start gap-2">
                                    <span class="text-green-400">✓</span>
                                    <span>Use standard section headings (Experience, Education, Skills)</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <span class="text-green-400">✓</span>
                                    <span>Include relevant keywords from job description</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <span class="text-green-400">✓</span>
                                    <span>Avoid tables, graphics, and fancy formatting</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <span class="text-green-400">✓</span>
                                    <span>Use standard fonts (Arial, Calibri, Times New Roman)</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <span class="text-green-400">✓</span>
                                    <span>Save as .docx or .pdf format</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <span class="text-green-400">✓</span>
                                    <span>Include contact information at the top</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <span class="text-green-400">✓</span>
                                    <span>Use bullet points for achievements</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <span class="text-green-400">✓</span>
                                    <span>Quantify accomplishments with numbers</span>
                                </li>
                            </ul>
                        </div>
                    </div>
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
            <div class="max-w-6xl mx-auto p-6">
                <!-- Header -->
                <div class="mb-8">
                    <h1 class="text-4xl font-bold mb-3 bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent flex items-center gap-3">
                        <span>🏆</span> Hackathons
                    </h1>
                    <p class="text-gray-400 text-lg">Discover hackathons and learn how to win them!</p>
                </div>

                <!-- 4-Step Guide -->
                <div class="bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 mb-8">
                    <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
                        <span>📚</span> How to Participate in Hackathons
                    </h2>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <!-- Step 1 -->
                        <div class="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-6 hover:border-purple-500/60 transition-all">
                            <div class="text-5xl mb-4">🔍</div>
                            <div class="text-3xl font-bold text-purple-400 mb-2">1</div>
                            <h3 class="text-xl font-bold mb-2">Find Hackathons</h3>
                            <p class="text-gray-400 text-sm">Browse Devfolio, Unstop, and MLH for upcoming events</p>
                        </div>

                        <!-- Step 2 -->
                        <div class="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-xl p-6 hover:border-blue-500/60 transition-all">
                            <div class="text-5xl mb-4">👥</div>
                            <div class="text-3xl font-bold text-blue-400 mb-2">2</div>
                            <h3 class="text-xl font-bold mb-2">Form Your Team</h3>
                            <p class="text-gray-400 text-sm">2-4 members with diverse skills (dev, design, PM)</p>
                        </div>

                        <!-- Step 3 -->
                        <div class="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-xl p-6 hover:border-green-500/60 transition-all">
                            <div class="text-5xl mb-4">💡</div>
                            <div class="text-3xl font-bold text-green-400 mb-2">3</div>
                            <h3 class="text-xl font-bold mb-2">Brainstorm Ideas</h3>
                            <p class="text-gray-400 text-sm">Solve real problems with innovative solutions</p>
                        </div>

                        <!-- Step 4 -->
                        <div class="bg-gradient-to-br from-orange-600/20 to-red-600/20 border border-orange-500/30 rounded-xl p-6 hover:border-orange-500/60 transition-all">
                            <div class="text-5xl mb-4">🚀</div>
                            <div class="text-3xl font-bold text-orange-400 mb-2">4</div>
                            <h3 class="text-xl font-bold mb-2">Build & Demo</h3>
                            <p class="text-gray-400 text-sm">Create MVP and present your pitch effectively</p>
                        </div>
                    </div>
                </div>

                <!-- Platform Cards -->
                <div class="bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 mb-8">
                    <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
                        <span>🌐</span> Top Hackathon Platforms
                    </h2>
                    
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <!-- Devfolio -->
                        <a href="https://devfolio.co" target="_blank" rel="noopener noreferrer" class="bg-gradient-to-br from-purple-600/20 to-indigo-600/20 border border-purple-500/30 rounded-xl p-6 hover:border-purple-500 hover:scale-105 transition-all group">
                            <div class="text-5xl mb-4 group-hover:scale-110 transition-transform">🟣</div>
                            <h3 class="text-2xl font-bold mb-2">Devfolio</h3>
                            <p class="text-gray-400 mb-4">India's largest hackathon platform with 100,000+ developers</p>
                            <div class="flex items-center gap-2 text-purple-400 font-semibold">
                                <span>Browse Events</span>
                                <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                            </div>
                        </a>

                        <!-- Unstop -->
                        <a href="https://unstop.com" target="_blank" rel="noopener noreferrer" class="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-xl p-6 hover:border-blue-500 hover:scale-105 transition-all group">
                            <div class="text-5xl mb-4 group-hover:scale-110 transition-transform">🔵</div>
                            <h3 class="text-2xl font-bold mb-2">Unstop</h3>
                            <p class="text-gray-400 mb-4">Compete in challenges and win exciting prizes</p>
                            <div class="flex items-center gap-2 text-blue-400 font-semibold">
                                <span>Explore Competitions</span>
                                <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                            </div>
                        </a>

                        <!-- MLH -->
                        <a href="https://mlh.io" target="_blank" rel="noopener noreferrer" class="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 border border-yellow-500/30 rounded-xl p-6 hover:border-yellow-500 hover:scale-105 transition-all group">
                            <div class="text-5xl mb-4 group-hover:scale-110 transition-transform">🟡</div>
                            <h3 class="text-2xl font-bold mb-2">Major League Hacking</h3>
                            <p class="text-gray-400 mb-4">Global community of 200,000+ student hackers</p>
                            <div class="flex items-center gap-2 text-yellow-400 font-semibold">
                                <span>Join MLH</span>
                                <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                            </div>
                        </a>
                    </div>
                </div>

                <!-- Pro Tips -->
                <div class="bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8">
                    <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
                        <span>💡</span> Pro Tips to Win
                    </h2>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="flex items-start gap-3 p-4 bg-gray-700/30 rounded-lg">
                            <span class="text-green-400 text-xl">✓</span>
                            <div>
                                <h4 class="font-semibold mb-1">Focus on Problem Statement</h4>
                                <p class="text-sm text-gray-400">Solve the actual problem, don't over-engineer</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-3 p-4 bg-gray-700/30 rounded-lg">
                            <span class="text-green-400 text-xl">✓</span>
                            <div>
                                <h4 class="font-semibold mb-1">Build a Working MVP</h4>
                                <p class="text-sm text-gray-400">Demo-ready product beats perfect code</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-3 p-4 bg-gray-700/30 rounded-lg">
                            <span class="text-green-400 text-xl">✓</span>
                            <div>
                                <h4 class="font-semibold mb-1">Practice Your Pitch</h4>
                                <p class="text-sm text-gray-400">Clear presentation can win you prizes</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-3 p-4 bg-gray-700/30 rounded-lg">
                            <span class="text-green-400 text-xl">✓</span>
                            <div>
                                <h4 class="font-semibold mb-1">Network with Judges</h4>
                                <p class="text-sm text-gray-400">Talk to mentors and sponsors during the event</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-3 p-4 bg-gray-700/30 rounded-lg">
                            <span class="text-green-400 text-xl">✓</span>
                            <div>
                                <h4 class="font-semibold mb-1">Use Existing APIs</h4>
                                <p class="text-sm text-gray-400">Leverage sponsor APIs for bonus points</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-3 p-4 bg-gray-700/30 rounded-lg">
                            <span class="text-green-400 text-xl">✓</span>
                            <div>
                                <h4 class="font-semibold mb-1">Document Everything</h4>
                                <p class="text-sm text-gray-400">Good README and demo video are essential</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderInternships() {
        return `
            <div class="max-w-6xl mx-auto p-6">
                <!-- Header -->
                <div class="mb-8">
                    <h1 class="text-4xl font-bold mb-3 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-3">
                        <span>🎯</span> Internships
                    </h1>
                    <p class="text-gray-400 text-lg">Find and land your dream internship opportunity</p>
                </div>

                <!-- Top Platforms -->
                <div class="bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 mb-8">
                    <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
                        <span>🌐</span> Top Internship Platforms
                    </h2>
                    
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <!-- Internshala -->
                        <a href="https://internshala.com" target="_blank" rel="noopener noreferrer" class="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-xl p-6 hover:border-blue-500 hover:scale-105 transition-all group">
                            <div class="text-5xl mb-4 group-hover:scale-110 transition-transform">🇮🇳</div>
                            <h3 class="text-2xl font-bold mb-2">Internshala</h3>
                            <p class="text-gray-400 mb-4">India's #1 internship platform with 300,000+ opportunities</p>
                            <div class="flex items-center gap-2 text-blue-400 font-semibold">
                                <span>Browse Internships</span>
                                <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                            </div>
                        </a>

                        <!-- LinkedIn -->
                        <a href="https://linkedin.com/jobs" target="_blank" rel="noopener noreferrer" class="bg-gradient-to-br from-blue-700/20 to-blue-900/20 border border-blue-600/30 rounded-xl p-6 hover:border-blue-600 hover:scale-105 transition-all group">
                            <div class="text-5xl mb-4 group-hover:scale-110 transition-transform">💼</div>
                            <h3 class="text-2xl font-bold mb-2">LinkedIn</h3>
                            <p class="text-gray-400 mb-4">Professional network with global opportunities</p>
                            <div class="flex items-center gap-2 text-blue-400 font-semibold">
                                <span>Search Jobs</span>
                                <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                            </div>
                        </a>

                        <!-- Wellfound -->
                        <a href="https://wellfound.com" target="_blank" rel="noopener noreferrer" class="bg-gradient-to-br from-orange-600/20 to-red-600/20 border border-orange-500/30 rounded-xl p-6 hover:border-orange-500 hover:scale-105 transition-all group">
                            <div class="text-5xl mb-4 group-hover:scale-110 transition-transform">🚀</div>
                            <h3 class="text-2xl font-bold mb-2">Wellfound</h3>
                            <p class="text-gray-400 mb-4">Startup internships and early-stage roles</p>
                            <div class="flex items-center gap-2 text-orange-400 font-semibold">
                                <span>Explore Startups</span>
                                <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                            </div>
                        </a>
                    </div>
                </div>

                <!-- Pro Tips -->
                <div class="bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8">
                    <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
                        <span>💡</span> Pro Tips to Land Internships
                    </h2>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="flex items-start gap-3 p-4 bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-500/20 rounded-lg">
                            <span class="text-purple-400 text-xl">📅</span>
                            <div>
                                <h4 class="font-semibold mb-1 text-purple-300">Apply Early</h4>
                                <p class="text-sm text-gray-400">Internship deadlines fill up fast. Start applying 2-3 months in advance</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-500/20 rounded-lg">
                            <span class="text-blue-400 text-xl">📝</span>
                            <div>
                                <h4 class="font-semibold mb-1 text-blue-300">Customize Resume</h4>
                                <p class="text-sm text-gray-400">Tailor your resume for each application matching job requirements</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-3 p-4 bg-gradient-to-r from-green-600/10 to-emerald-600/10 border border-green-500/20 rounded-lg">
                            <span class="text-green-400 text-xl">🐙</span>
                            <div>
                                <h4 class="font-semibold mb-1 text-green-300">Build GitHub Profile</h4>
                                <p class="text-sm text-gray-400">Strong portfolio with projects shows practical skills</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-3 p-4 bg-gradient-to-r from-orange-600/10 to-red-600/10 border border-orange-500/20 rounded-lg">
                            <span class="text-orange-400 text-xl">👥</span>
                            <div>
                                <h4 class="font-semibold mb-1 text-orange-300">Network Actively</h4>
                                <p class="text-sm text-gray-400">Connect with alumni and professionals on LinkedIn</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-3 p-4 bg-gradient-to-r from-pink-600/10 to-rose-600/10 border border-pink-500/20 rounded-lg">
                            <span class="text-pink-400 text-xl">💻</span>
                            <div>
                                <h4 class="font-semibold mb-1 text-pink-300">Ace Technical Tests</h4>
                                <p class="text-sm text-gray-400">Practice DSA, coding, and aptitude tests regularly</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-3 p-4 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 border border-indigo-500/20 rounded-lg">
                            <span class="text-indigo-400 text-xl">📧</span>
                            <div>
                                <h4 class="font-semibold mb-1 text-indigo-300">Follow Up</h4>
                                <p class="text-sm text-gray-400">Send thank you emails after interviews to show interest</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
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

        // Resume Builder Event Listeners
        this.initializeResumeBuilder();

        // ATS Checker Event Listeners
        this.initializeATSChecker();

        // Initialize based on active sub-tab (only for Interview Prep tab)
        if (this.activeTab === 0) {
            // Coding Terminal Event Listeners
            if (this.activeSubTab === 'coding') {
                this.initializeCodingTerminal();
            }

            // AI Mock Interview Event Listeners
            if (this.activeSubTab === 'interview') {
                this.initializeAIInterviewer();
            }

            // Aptitude tests event listeners
            if (this.aptitudeTestsInstance && this.activeSubTab === 'aptitude') {
                this.aptitudeTestsInstance.attachEventListeners();
            }
        }
    }

    initializeResumeBuilder() {
        // Export PDF Button
        const exportPDFBtn = document.getElementById('exportPDFBtn');
        if (exportPDFBtn) {
            exportPDFBtn.addEventListener('click', () => this.exportResumeToPDF());
        }

        // Template Selection
        document.querySelectorAll('.resume-template').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.resume-template').forEach(b => {
                    b.classList.remove('border-blue-500', 'border-2');
                    b.classList.add('border-gray-600', 'border');
                });
                e.currentTarget.classList.remove('border-gray-600', 'border');
                e.currentTarget.classList.add('border-blue-500', 'border-2');
            });
        });

        // Color Theme Selection
        document.querySelectorAll('[data-color]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('[data-color]').forEach(b => {
                    b.classList.remove('border-white', 'border-2');
                    b.classList.add('border-gray-600', 'border');
                });
                e.currentTarget.classList.remove('border-gray-600', 'border');
                e.currentTarget.classList.add('border-white', 'border-2');
            });
        });

        // Add Skill
        const addSkillBtn = document.getElementById('addSkillBtn');
        const newSkillInput = document.getElementById('newSkill');
        if (addSkillBtn && newSkillInput) {
            addSkillBtn.addEventListener('click', () => {
                const skill = newSkillInput.value.trim();
                if (skill) {
                    const skillsContainer = document.getElementById('skillsContainer');
                    const skillBadge = document.createElement('span');
                    skillBadge.className = 'px-3 py-1 bg-blue-600 rounded-full text-sm cursor-pointer hover:bg-red-600 transition-all';
                    skillBadge.textContent = skill;
                    skillBadge.title = 'Click to remove';
                    skillBadge.addEventListener('click', () => skillBadge.remove());
                    skillsContainer.appendChild(skillBadge);
                    newSkillInput.value = '';
                    this.updateResumePreview();
                }
            });
            
            newSkillInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    addSkillBtn.click();
                }
            });
        }

        // Add Experience
        const addExperienceBtn = document.getElementById('addExperienceBtn');
        if (addExperienceBtn) {
            addExperienceBtn.addEventListener('click', () => this.addExperienceField());
        }

        // Add Education
        const addEducationBtn = document.getElementById('addEducationBtn');
        if (addEducationBtn) {
            addEducationBtn.addEventListener('click', () => this.addEducationField());
        }

        // Real-time Preview Update
        ['resumeName', 'resumeEmail', 'resumePhone', 'resumeLocation', 'resumeWebsite', 'resumeLinkedIn', 'resumeGitHub', 'resumeSummary'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('input', () => this.updateResumePreview());
            }
        });
    }

    addExperienceField() {
        const container = document.getElementById('experienceContainer');
        if (!container) return;

        const expDiv = document.createElement('div');
        expDiv.className = 'bg-gray-700/50 rounded-lg p-4 space-y-3';
        expDiv.innerHTML = `
            <input type="text" class="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400" placeholder="Job Title">
            <input type="text" class="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400" placeholder="Company Name">
            <div class="grid grid-cols-2 gap-2">
                <input type="text" class="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400" placeholder="Start Date">
                <input type="text" class="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400" placeholder="End Date">
            </div>
            <textarea class="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 resize-none" rows="3" placeholder="Key achievements and responsibilities..."></textarea>
            <button class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-all" onclick="this.parentElement.remove()">Remove</button>
        `;
        container.appendChild(expDiv);
    }

    addEducationField() {
        const container = document.getElementById('educationContainer');
        if (!container) return;

        const eduDiv = document.createElement('div');
        eduDiv.className = 'bg-gray-700/50 rounded-lg p-4 space-y-3';
        eduDiv.innerHTML = `
            <input type="text" class="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400" placeholder="Degree">
            <input type="text" class="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400" placeholder="Institution Name">
            <div class="grid grid-cols-2 gap-2">
                <input type="text" class="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400" placeholder="Start Year">
                <input type="text" class="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400" placeholder="End Year">
            </div>
            <input type="text" class="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400" placeholder="GPA (optional)">
            <button class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-all" onclick="this.parentElement.remove()">Remove</button>
        `;
        container.appendChild(eduDiv);
    }

    updateResumePreview() {
        const preview = document.getElementById('resumePreview');
        if (!preview) return;

        const name = document.getElementById('resumeName')?.value || 'Your Name';
        const email = document.getElementById('resumeEmail')?.value || 'email@example.com';
        const phone = document.getElementById('resumePhone')?.value || '(555) 123-4567';
        const location = document.getElementById('resumeLocation')?.value || 'City, State';
        const linkedin = document.getElementById('resumeLinkedIn')?.value || 'linkedin.com/in/yourprofile';
        const github = document.getElementById('resumeGitHub')?.value || 'github.com/yourname';
        const summary = document.getElementById('resumeSummary')?.value || 'Passionate software developer with expertise in full-stack web development.';

        // Get skills
        const skills = Array.from(document.getElementById('skillsContainer')?.children || [])
            .map(skill => `<span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">${skill.textContent}</span>`)
            .join('');

        preview.innerHTML = `
            <div class="text-center border-b-2 border-blue-600 pb-4 mb-6">
                <h1 class="text-3xl font-bold text-blue-600 mb-2">${name}</h1>
                <p class="text-sm text-gray-600">${email} | ${phone} | ${location}</p>
                <p class="text-sm text-gray-600">${linkedin} | ${github}</p>
            </div>

            <div class="mb-6">
                <h2 class="text-lg font-bold text-blue-600 border-b border-gray-300 pb-1 mb-3">PROFESSIONAL SUMMARY</h2>
                <p class="text-sm text-gray-700 leading-relaxed">${summary}</p>
            </div>

            <div class="mb-6">
                <h2 class="text-lg font-bold text-blue-600 border-b border-gray-300 pb-1 mb-3">SKILLS</h2>
                <div class="flex flex-wrap gap-2">${skills || '<span class="text-gray-500 text-sm">Add your skills...</span>'}</div>
            </div>

            <div class="mb-6">
                <h2 class="text-lg font-bold text-blue-600 border-b border-gray-300 pb-1 mb-3">WORK EXPERIENCE</h2>
                <p class="text-gray-500 text-sm">Add your work experience...</p>
            </div>

            <div>
                <h2 class="text-lg font-bold text-blue-600 border-b border-gray-300 pb-1 mb-3">EDUCATION</h2>
                <p class="text-gray-500 text-sm">Add your education...</p>
            </div>
        `;
    }

    async exportResumeToPDF() {
        const preview = document.getElementById('resumePreview');
        if (!preview || typeof window.jspdf === 'undefined') {
            alert('PDF export library not loaded. Please refresh the page.');
            return;
        }

        try {
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF('p', 'mm', 'a4');
            
            // Use html2canvas to convert the preview to image
            if (typeof html2canvas !== 'undefined') {
                const canvas = await html2canvas(preview, {
                    scale: 2,
                    useCORS: true,
                    logging: false
                });
                
                const imgData = canvas.toDataURL('image/png');
                const imgWidth = 210; // A4 width in mm
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                
                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
                pdf.save('Resume.pdf');
                
                // Show success message
                const toast = document.createElement('div');
                toast.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
                toast.textContent = '✅ Resume exported successfully!';
                document.body.appendChild(toast);
                setTimeout(() => toast.remove(), 3000);
            } else {
                alert('Please refresh the page to enable PDF export.');
            }
        } catch (error) {
            console.error('PDF export error:', error);
            alert('Failed to export PDF. Please try again.');
        }
    }

    initializeCodingTerminal() {
        // Session Control Handlers
        const toggleSessionBtn = document.getElementById('toggleSessionBtn');
        if (toggleSessionBtn) {
            toggleSessionBtn.addEventListener('click', () => this.toggleCodingSession());
        }

        const toggleCameraSession = document.getElementById('toggleCameraSession');
        if (toggleCameraSession) {
            toggleCameraSession.addEventListener('click', () => this.toggleCameraForSession());
        }

        // Problem Tab Switching
        const problemTabs = document.querySelectorAll('.problem-tab-btn');
        problemTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabName = e.target.dataset.tab;
                problemTabs.forEach(t => {
                    t.classList.remove('border-blue-500', 'text-blue-400', 'bg-gray-800/40');
                    t.classList.add('border-transparent', 'text-gray-400');
                });
                e.target.classList.add('border-blue-500', 'text-blue-400', 'bg-gray-800/40');
                e.target.classList.remove('border-transparent', 'text-gray-400');
                this.switchProblemTab(tabName);
            });
        });

        // Console Tab Switching
        const consoleTabs = document.querySelectorAll('.console-tab-btn');
        consoleTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabName = e.target.dataset.consoleTab;
                consoleTabs.forEach(t => {
                    t.classList.remove('border-green-500', 'text-green-400', 'bg-gray-800/40');
                    t.classList.remove('border-blue-500', 'text-blue-400');
                    t.classList.add('border-transparent', 'text-gray-400');
                });
                
                if (tabName === 'testcases') {
                    e.target.classList.add('border-green-500', 'text-green-400', 'bg-gray-800/40');
                } else {
                    e.target.classList.add('border-blue-500', 'text-blue-400', 'bg-gray-800/40');
                }
                e.target.classList.remove('border-transparent', 'text-gray-400');
                this.switchConsoleTab(tabName);
            });
        });

        // Language Selection
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.addEventListener('change', (e) => {
                const editor = document.getElementById('codeEditor');
                if (editor && !this.currentCode) {
                    editor.value = this.getDefaultCode(e.target.value);
                }
            });
        }

        // Run Code Button
        const runCodeBtn = document.getElementById('runCodeBtn');
        if (runCodeBtn) {
            runCodeBtn.addEventListener('click', () => this.runCode());
        }

        // Submit Code Button
        const submitCodeBtn = document.getElementById('submitCodeBtn');
        if (submitCodeBtn) {
            submitCodeBtn.addEventListener('click', () => this.submitCode());
        }

        // Reset Code Button
        const resetCodeBtn = document.getElementById('resetCodeBtn');
        if (resetCodeBtn) {
            resetCodeBtn.addEventListener('click', () => {
                const languageSelect = document.getElementById('languageSelect');
                const editor = document.getElementById('codeEditor');
                if (editor && languageSelect) {
                    editor.value = this.getDefaultCode(languageSelect.value);
                    this.currentCode = editor.value;
                }
            });
        }

        // Copy Code Button
        const copyCodeBtn = document.getElementById('copyCodeBtn');
        if (copyCodeBtn) {
            copyCodeBtn.addEventListener('click', () => {
                const editor = document.getElementById('codeEditor');
                if (editor) {
                    navigator.clipboard.writeText(editor.value).then(() => {
                        copyCodeBtn.innerHTML = `
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                            </svg>
                            Copied!
                        `;
                        setTimeout(() => {
                            copyCodeBtn.innerHTML = `
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                                </svg>
                                Copy
                            `;
                        }, 2000);
                    });
                }
            });
        }

        // Code Editor Updates
        const codeEditor = document.getElementById('codeEditor');
        if (codeEditor) {
            codeEditor.addEventListener('input', (e) => {
                this.currentCode = e.target.value;
            });
        }

        // Individual Test Case Run Buttons
        document.querySelectorAll('.test-case-run-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const caseIndex = e.target.dataset.case;
                this.runTestCase(caseIndex);
            });
        });
    }

    switchProblemTab(tabName) {
        const problemContent = document.getElementById('problemContent');
        if (!problemContent) return;

        if (tabName === 'description') {
            problemContent.innerHTML = this.renderProblemDescription();
        } else if (tabName === 'solutions') {
            problemContent.innerHTML = `
                <div class="text-center py-12">
                    <svg class="w-20 h-20 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                    </svg>
                    <h3 class="text-xl font-bold text-gray-300 mb-2">Solutions Coming Soon</h3>
                    <p class="text-gray-500">Try solving it yourself first!</p>
                </div>
            `;
        } else if (tabName === 'submissions') {
            problemContent.innerHTML = `
                <div class="text-center py-12">
                    <svg class="w-20 h-20 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                    <h3 class="text-xl font-bold text-gray-300 mb-2">No Submissions Yet</h3>
                    <p class="text-gray-500">Submit your code to see history</p>
                </div>
            `;
        }
    }

    switchConsoleTab(tabName) {
        const testCasesView = document.getElementById('testCasesView');
        const resultsView = document.getElementById('resultsView');
        const consoleView = document.getElementById('consoleView');

        if (testCasesView) testCasesView.classList.add('hidden');
        if (resultsView) resultsView.classList.add('hidden');
        if (consoleView) consoleView.classList.add('hidden');

        if (tabName === 'testcases' && testCasesView) {
            testCasesView.classList.remove('hidden');
        } else if (tabName === 'results' && resultsView) {
            resultsView.classList.remove('hidden');
        } else if (tabName === 'console' && consoleView) {
            consoleView.classList.remove('hidden');
        }
    }

    runCode() {
        const codeEditor = document.getElementById('codeEditor');
        const consoleOutput = document.getElementById('consoleOutput');
        const resultsView = document.getElementById('resultsView');
        
        if (!codeEditor || !consoleOutput) return;

        // Switch to results tab
        this.switchConsoleTab('results');
        document.querySelectorAll('.console-tab-btn').forEach(t => {
            t.classList.remove('border-green-500', 'text-green-400', 'bg-gray-800/40');
            t.classList.remove('border-blue-500', 'text-blue-400');
            t.classList.add('border-transparent', 'text-gray-400');
        });
        const resultsTab = document.querySelector('[data-console-tab="results"]');
        if (resultsTab) {
            resultsTab.classList.add('border-blue-500', 'text-blue-400', 'bg-gray-800/40');
            resultsTab.classList.remove('border-transparent');
        }

        // Show loading
        if (resultsView) {
            resultsView.innerHTML = `
                <div class="text-center py-12">
                    <div class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mb-4"></div>
                    <p class="text-gray-400">Running test cases...</p>
                </div>
            `;
        }

        // Simulate running code
        setTimeout(() => {
            const testCases = this.problemData.testCases || [];
            const passed = Math.floor(Math.random() * testCases.length) + 1;
            const total = testCases.length;
            
            if (resultsView) {
                resultsView.innerHTML = `
                    <div class="space-y-4">
                        <div class="flex items-center justify-between bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-lg p-4 border border-green-500/30">
                            <div>
                                <h3 class="text-xl font-bold text-green-400">${passed === total ? 'All Test Cases Passed! ✅' : 'Some Test Cases Failed'}</h3>
                                <p class="text-gray-400 text-sm mt-1">${passed} / ${total} test cases passed</p>
                            </div>
                            <div class="text-3xl font-bold ${passed === total ? 'text-green-400' : 'text-yellow-400'}">
                                ${Math.round((passed/total) * 100)}%
                            </div>
                        </div>

                        ${testCases.map((tc, i) => {
                            const isPassed = i < passed;
                            return `
                                <div class="bg-gray-800/40 rounded-lg p-4 border ${isPassed ? 'border-green-500/30' : 'border-red-500/30'}">
                                    <div class="flex items-center justify-between mb-2">
                                        <span class="font-bold ${isPassed ? 'text-green-400' : 'text-red-400'}">
                                            ${isPassed ? '✓' : '✗'} Test Case ${i + 1}
                                        </span>
                                        <span class="text-xs ${isPassed ? 'text-green-400' : 'text-red-400'}">${isPassed ? 'Passed' : 'Failed'}</span>
                                    </div>
                                    <div class="space-y-1 text-sm font-mono">
                                        <div class="text-gray-400">Input: <span class="text-gray-300">${tc.input}</span></div>
                                        <div class="text-gray-400">Expected: <span class="text-blue-400">${tc.output}</span></div>
                                        ${!isPassed ? `<div class="text-gray-400">Got: <span class="text-red-400">[error]</span></div>` : ''}
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                `;
            }
        }, 1500);
    }

    submitCode() {
        const codeEditor = document.getElementById('codeEditor');
        if (!codeEditor || !codeEditor.value.trim()) {
            alert('Please write some code before submitting!');
            return;
        }

        // Show success message
        alert('✅ Code submitted successfully!\n\nYour solution has been evaluated.\nCheck the Results tab for details.');
        
        // Run the code to show results
        this.runCode();
    }

    runTestCase(caseIndex) {
        alert(`Running test case ${parseInt(caseIndex) + 1}...`);
        this.runCode();
    }

    async toggleCodingSession() {
        const toggleBtn = document.getElementById('toggleSessionBtn');
        const sessionStatus = document.getElementById('sessionStatus');
        const timerDisplay = document.getElementById('codingTimerDisplay');

        if (!this.codingSessionActive) {
            // Start session
            this.codingSessionActive = true;
            
            if (toggleBtn) {
                toggleBtn.textContent = 'End Session';
                toggleBtn.className = 'px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg text-sm font-bold transition-all shadow-lg';
            }
            
            if (sessionStatus) {
                sessionStatus.textContent = 'Active';
                sessionStatus.className = 'px-3 py-1 bg-green-600/20 text-green-400 rounded-lg text-sm font-medium border border-green-500/30';
            }

            // Start timer (30 minutes)
            this.timer.start(1800, () => {
                alert('⏰ Time is up! Your coding session has ended.');
                this.toggleCodingSession();
            });

            // Update timer display every second
            this.codingTimerInterval = setInterval(() => {
                const timeLeft = this.timer.getTimeLeft();
                const minutes = Math.floor(timeLeft / 60);
                const seconds = timeLeft % 60;
                if (timerDisplay) {
                    timerDisplay.textContent = `⏱️ ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
                }
            }, 1000);

        } else {
            // End session
            this.codingSessionActive = false;
            
            if (toggleBtn) {
                toggleBtn.textContent = 'Start Session';
                toggleBtn.className = 'px-6 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg text-sm font-bold transition-all shadow-lg';
            }
            
            if (sessionStatus) {
                sessionStatus.textContent = 'Not Started';
                sessionStatus.className = 'px-3 py-1 bg-gray-700/50 text-gray-400 rounded-lg text-sm font-medium';
            }

            // Stop timer
            this.timer.stop();
            if (this.codingTimerInterval) {
                clearInterval(this.codingTimerInterval);
            }

            // Stop camera if it was enabled
            if (this.camera) {
                this.camera.stop();
                const cameraBtn = document.getElementById('toggleCameraSession');
                const cameraText = document.getElementById('cameraStatusText');
                if (cameraBtn) {
                    cameraBtn.className = 'px-4 py-2 bg-gray-700/60 hover:bg-gray-600/60 text-gray-300 rounded-lg text-sm font-medium transition-all flex items-center gap-2';
                }
                if (cameraText) {
                    cameraText.textContent = 'Enable Camera';
                }
            }

            // Reset timer display
            if (timerDisplay) {
                timerDisplay.textContent = '⏱️ 30:00';
            }
        }
    }

    async toggleCameraForSession() {
        if (!this.codingSessionActive) {
            alert('⚠️ Please start a coding session first!');
            return;
        }

        const cameraBtn = document.getElementById('toggleCameraSession');
        const cameraText = document.getElementById('cameraStatusText');

        try {
            if (!this.camera.isActive) {
                // Enable camera
                await this.camera.start();
                if (cameraBtn) {
                    cameraBtn.className = 'px-4 py-2 bg-green-600/60 hover:bg-green-700/60 text-white rounded-lg text-sm font-medium transition-all flex items-center gap-2 border border-green-500/30';
                }
                if (cameraText) {
                    cameraText.textContent = 'Camera Active';
                }
            } else {
                // Disable camera
                this.camera.stop();
                if (cameraBtn) {
                    cameraBtn.className = 'px-4 py-2 bg-gray-700/60 hover:bg-gray-600/60 text-gray-300 rounded-lg text-sm font-medium transition-all flex items-center gap-2';
                }
                if (cameraText) {
                    cameraText.textContent = 'Enable Camera';
                }
            }
        } catch (error) {
            console.error('Camera toggle error:', error);
            alert('❌ Unable to access camera. Please check your permissions.');
        }
    }

    initializeAIInterviewer() {
        this.selectedInterviewType = 'technical';
        this.selectedDuration = 15;
        this.currentQuestionIndex = 0;
        this.interviewStartTime = null;
        this.webcamStream = null;
        this.interviewQuestions = [];

        // Interview Type Selection
        document.querySelectorAll('.interview-type-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.interview-type-btn').forEach(b => {
                    b.classList.remove('bg-blue-600/20', 'border-blue-500', 'text-blue-400');
                    b.classList.remove('bg-purple-600/20', 'border-purple-500', 'text-purple-400');
                    b.classList.add('bg-gray-700/40', 'border-gray-600', 'text-gray-300');
                });
                e.target.classList.remove('bg-gray-700/40', 'border-gray-600', 'text-gray-300');
                
                const type = e.target.dataset.type;
                this.selectedInterviewType = type;
                
                if (type === 'technical') {
                    e.target.classList.add('bg-blue-600/20', 'border-blue-500', 'text-blue-400');
                } else {
                    e.target.classList.add('bg-purple-600/20', 'border-purple-500', 'text-purple-400');
                }
            });
        });

        // Duration Selection
        document.querySelectorAll('.duration-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.duration-btn').forEach(b => {
                    b.classList.remove('bg-green-600/20', 'border-green-500', 'text-green-400');
                    b.classList.add('bg-gray-700/40', 'border-gray-600', 'text-gray-300');
                });
                e.target.classList.remove('bg-gray-700/40', 'border-gray-600', 'text-gray-300');
                e.target.classList.add('bg-green-600/20', 'border-green-500', 'text-green-400');
                this.selectedDuration = parseInt(e.target.dataset.duration);
            });
        });

        // Start Interview Button
        const startInterviewBtn = document.getElementById('startInterviewBtn');
        if (startInterviewBtn) {
            startInterviewBtn.addEventListener('click', () => this.startInterview());
        }

        // End Interview Button
        const endInterviewBtn = document.getElementById('endInterviewBtn');
        if (endInterviewBtn) {
            endInterviewBtn.addEventListener('click', () => this.endInterview());
        }

        // Question Navigation
        const nextQuestionBtn = document.getElementById('nextQuestionBtn');
        if (nextQuestionBtn) {
            nextQuestionBtn.addEventListener('click', () => this.nextQuestion());
        }

        const prevQuestionBtn = document.getElementById('prevQuestionBtn');
        if (prevQuestionBtn) {
            prevQuestionBtn.addEventListener('click', () => this.previousQuestion());
        }

        // Camera/Mic Toggle
        const toggleCameraBtn = document.getElementById('toggleCameraBtn');
        if (toggleCameraBtn) {
            toggleCameraBtn.addEventListener('click', () => this.toggleCamera());
        }

        const toggleMicBtn = document.getElementById('toggleMicBtn');
        if (toggleMicBtn) {
            toggleMicBtn.addEventListener('click', () => this.toggleMicrophone());
        }
    }

    async startInterview() {
        try {
            // Request camera and microphone access
            this.webcamStream = await navigator.mediaDevices.getUserMedia({ 
                video: true, 
                audio: true 
            });

            // Update camera status
            const cameraStatus = document.getElementById('cameraStatus');
            if (cameraStatus) {
                cameraStatus.innerHTML = `
                    <div class="flex items-center gap-3">
                        <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                        </svg>
                        <div>
                            <p class="font-semibold text-green-400">Camera Active</p>
                            <p class="text-sm text-gray-400">Connected and ready</p>
                        </div>
                    </div>
                `;
            }

            // Hide setup, show active interview
            const interviewSetup = document.getElementById('interviewSetup');
            const activeInterview = document.getElementById('activeInterview');
            
            if (interviewSetup) interviewSetup.classList.add('hidden');
            if (activeInterview) activeInterview.classList.remove('hidden');

            // Connect webcam stream to video element
            const webcamVideo = document.getElementById('webcamVideo');
            if (webcamVideo) {
                webcamVideo.srcObject = this.webcamStream;
            }

            // Load questions
            this.interviewQuestions = this.getInterviewQuestions(this.selectedInterviewType);
            this.currentQuestionIndex = 0;
            this.displayQuestion();

            // Start timer
            this.interviewStartTime = Date.now();
            this.startInterviewTimer();

        } catch (error) {
            console.error('Error accessing camera/microphone:', error);
            alert('Unable to access camera or microphone. Please check your permissions and try again.');
        }
    }

    endInterview() {
        // Stop webcam
        if (this.webcamStream) {
            this.webcamStream.getTracks().forEach(track => track.stop());
            this.webcamStream = null;
        }

        // Clear timer
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }

        // Show results
        alert(`✅ Interview Completed!\n\nGreat job! Your interview has been saved.\n\nDuration: ${this.getElapsedTime()}\nQuestions Answered: ${this.currentQuestionIndex + 1}/${this.interviewQuestions.length}\n\nCheck your dashboard for detailed feedback and analysis.`);

        // Go back to setup
        const interviewSetup = document.getElementById('interviewSetup');
        const activeInterview = document.getElementById('activeInterview');
        
        if (interviewSetup) interviewSetup.classList.remove('hidden');
        if (activeInterview) activeInterview.classList.add('hidden');

        // Reset camera status
        const cameraStatus = document.getElementById('cameraStatus');
        if (cameraStatus) {
            cameraStatus.innerHTML = `
                <div class="flex items-center gap-3">
                    <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                    </svg>
                    <div>
                        <p class="font-semibold text-gray-300">Camera Access</p>
                        <p class="text-sm text-gray-500">Not connected</p>
                    </div>
                </div>
            `;
        }
    }

    displayQuestion() {
        if (this.interviewQuestions.length === 0) return;

        const question = this.interviewQuestions[this.currentQuestionIndex];
        const questionNumber = document.getElementById('questionNumber');
        const totalQuestions = document.getElementById('totalQuestions');
        const currentQuestion = document.getElementById('currentQuestion');
        const progressBar = document.getElementById('progressBar');

        if (questionNumber) questionNumber.textContent = this.currentQuestionIndex + 1;
        if (totalQuestions) totalQuestions.textContent = this.interviewQuestions.length;
        if (currentQuestion) currentQuestion.textContent = question;
        if (progressBar) {
            const progress = ((this.currentQuestionIndex + 1) / this.interviewQuestions.length) * 100;
            progressBar.style.width = `${progress}%`;
        }

        // Update prev/next button states
        const prevBtn = document.getElementById('prevQuestionBtn');
        const nextBtn = document.getElementById('nextQuestionBtn');
        
        if (prevBtn) {
            prevBtn.disabled = this.currentQuestionIndex === 0;
            prevBtn.classList.toggle('opacity-50', this.currentQuestionIndex === 0);
            prevBtn.classList.toggle('cursor-not-allowed', this.currentQuestionIndex === 0);
        }
        
        if (nextBtn) {
            const isLast = this.currentQuestionIndex === this.interviewQuestions.length - 1;
            nextBtn.textContent = isLast ? 'Finish' : 'Next';
        }
    }

    nextQuestion() {
        if (this.currentQuestionIndex < this.interviewQuestions.length - 1) {
            this.currentQuestionIndex++;
            this.displayQuestion();
        } else {
            // Last question - end interview
            this.endInterview();
        }
    }

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.displayQuestion();
        }
    }

    toggleCamera() {
        if (this.webcamStream) {
            const videoTrack = this.webcamStream.getVideoTracks()[0];
            videoTrack.enabled = !videoTrack.enabled;
            
            const toggleCameraBtn = document.getElementById('toggleCameraBtn');
            if (toggleCameraBtn) {
                toggleCameraBtn.classList.toggle('bg-red-600/80', !videoTrack.enabled);
                toggleCameraBtn.classList.toggle('bg-gray-800/80', videoTrack.enabled);
            }
        }
    }

    toggleMicrophone() {
        if (this.webcamStream) {
            const audioTrack = this.webcamStream.getAudioTracks()[0];
            audioTrack.enabled = !audioTrack.enabled;
            
            const toggleMicBtn = document.getElementById('toggleMicBtn');
            if (toggleMicBtn) {
                toggleMicBtn.classList.toggle('bg-red-600/80', !audioTrack.enabled);
                toggleMicBtn.classList.toggle('bg-gray-800/80', audioTrack.enabled);
            }
        }
    }

    startInterviewTimer() {
        this.timerInterval = setInterval(() => {
            const elapsed = this.getElapsedTime();
            const timerDisplay = document.getElementById('interviewTimer');
            const timeElapsed = document.getElementById('timeElapsed');
            
            if (timerDisplay) timerDisplay.textContent = elapsed;
            if (timeElapsed) timeElapsed.textContent = elapsed;
        }, 1000);
    }

    getElapsedTime() {
        if (!this.interviewStartTime) return '00:00';
        const elapsed = Math.floor((Date.now() - this.interviewStartTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    getInterviewQuestions(type) {
        const questions = {
            technical: [
                "Explain the difference between var, let, and const in JavaScript.",
                "What is your experience with RESTful API design? Can you walk me through an API you've built?",
                "Tell me about a time you optimized code for better performance. What was your approach?",
                "How do you handle state management in complex applications?",
                "Explain the concept of promises and async/await in JavaScript."
            ],
            behavioral: [
                "Tell me about a time you faced a significant challenge at work. How did you handle it?",
                "Describe a situation where you had to work with a difficult team member.",
                "Give me an example of when you showed leadership in a project.",
                "Tell me about a time you failed. What did you learn from it?",
                "How do you prioritize your work when you have multiple deadlines?"
            ],
            'system-design': [
                "Design a URL shortening service like bit.ly. What are the key components?",
                "How would you design a scalable chat application like WhatsApp?",
                "Explain how you would architect a ride-sharing system like Uber.",
                "Design a notification service that can handle millions of users.",
                "How would you design a distributed cache system?"
            ],
            hr: [
                "Tell me about yourself and your background.",
                "Why are you interested in this position?",
                "Where do you see yourself in 5 years?",
                "What are your salary expectations?",
                "Why should we hire you?"
            ]
        };
        return questions[type] || questions.technical;
    }

    initializeATSChecker() {
        const dropZone = document.getElementById('atsDropZone');
        const fileInput = document.getElementById('atsFileInput');
        const fileName = document.getElementById('atsFileName');
        const fileNameText = document.getElementById('atsFileNameText');
        const fileSizeText = document.getElementById('atsFileSizeText');
        const removeFileBtn = document.getElementById('atsRemoveFile');
        const analyzeBtn = document.getElementById('atsAnalyzeBtn');

        if (!dropZone || !fileInput) return;

        // Click to upload
        dropZone.addEventListener('click', () => fileInput.click());

        // Drag and drop
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('border-green-500', 'bg-gray-700/30');
        });

        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('border-green-500', 'bg-gray-700/30');
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('border-green-500', 'bg-gray-700/30');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleFile(files[0]);
            }
        });

        // File input change
        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                handleFile(e.target.files[0]);
            }
        });

        // Remove file
        if (removeFileBtn) {
            removeFileBtn.addEventListener('click', () => {
                fileInput.value = '';
                fileName.classList.add('hidden');
            });
        }

        // Analyze button
        if (analyzeBtn) {
            analyzeBtn.addEventListener('click', () => this.analyzeResume());
        }

        function handleFile(file) {
            const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
            if (!validTypes.includes(file.type)) {
                alert('Please upload a valid file (PDF, DOCX, or TXT)');
                return;
            }

            fileNameText.textContent = file.name;
            fileSizeText.textContent = `${(file.size / 1024).toFixed(2)} KB`;
            fileName.classList.remove('hidden');

            // Read file content
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target.result;
                document.getElementById('atsResumeText').value = text;
            };
            reader.readAsText(file);
        }
    }

    analyzeResume() {
        const resumeText = document.getElementById('atsResumeText')?.value || '';
        const jobDescription = document.getElementById('atsJobDescription')?.value || '';

        if (!resumeText.trim()) {
            alert('Please upload a resume or paste resume text!');
            return;
        }

        // Common ATS keywords to check
        const technicalKeywords = [
            'JavaScript', 'Python', 'Java', 'C++', 'React', 'Node.js', 'Angular', 'Vue',
            'SQL', 'MongoDB', 'AWS', 'Azure', 'Docker', 'Kubernetes', 'Git', 'REST API',
            'Machine Learning', 'Data Science', 'Artificial Intelligence', 'DevOps',
            'Agile', 'Scrum', 'CI/CD', 'TypeScript', 'Redux', 'Express', 'Django', 'Flask'
        ];

        const softSkills = [
            'Leadership', 'Communication', 'Problem Solving', 'Team Collaboration',
            'Project Management', 'Critical Thinking', 'Adaptability', 'Time Management'
        ];

        const allKeywords = [...technicalKeywords, ...softSkills];
        
        // If job description provided, extract keywords from it
        let jobKeywords = [];
        if (jobDescription.trim()) {
            jobKeywords = jobDescription.toLowerCase()
                .split(/\W+/)
                .filter(word => word.length > 3);
        }

        // Analyze resume
        const resumeLower = resumeText.toLowerCase();
        const foundKeywords = [];
        const missingKeywords = [];

        allKeywords.forEach(keyword => {
            if (resumeLower.includes(keyword.toLowerCase())) {
                foundKeywords.push(keyword);
            } else {
                missingKeywords.push(keyword);
            }
        });

        // Calculate score
        const score = Math.min(100, Math.round(
            (foundKeywords.length / allKeywords.length) * 100 +
            (resumeText.length > 500 ? 10 : 0) + // Length bonus
            (resumeText.includes('@') ? 5 : 0) + // Email present
            (resumeText.match(/\d{3}[-.]?\d{3}[-.]?\d{4}/) ? 5 : 0) // Phone present
        ));

        // Show results
        this.displayATSResults(score, foundKeywords, missingKeywords.slice(0, 10), resumeText);
    }

    displayATSResults(score, foundKeywords, missingKeywords, resumeText) {
        // Show results section
        const resultsDiv = document.getElementById('atsResults');
        const keywordsDiv = document.getElementById('atsKeywords');
        const suggestionsDiv = document.getElementById('atsSuggestions');

        if (!resultsDiv) return;

        resultsDiv.classList.remove('hidden');
        keywordsDiv.classList.remove('hidden');
        suggestionsDiv.classList.remove('hidden');

        // Animate score
        const scoreValue = document.getElementById('atsScoreValue');
        const scoreCircle = document.getElementById('atsScoreCircle');
        const scoreLabel = document.getElementById('atsScoreLabel');
        const scoreDesc = document.getElementById('atsScoreDesc');

        let currentScore = 0;
        const interval = setInterval(() => {
            currentScore += 2;
            if (currentScore >= score) {
                currentScore = score;
                clearInterval(interval);
            }
            scoreValue.textContent = currentScore;

            // Update circle progress
            const circumference = 552.92;
            const offset = circumference - (currentScore / 100) * circumference;
            scoreCircle.style.strokeDashoffset = offset;

            // Update color based on score
            if (currentScore < 50) {
                scoreCircle.classList.remove('text-green-500', 'text-yellow-500');
                scoreCircle.classList.add('text-red-500');
            } else if (currentScore < 75) {
                scoreCircle.classList.remove('text-green-500', 'text-red-500');
                scoreCircle.classList.add('text-yellow-500');
            } else {
                scoreCircle.classList.remove('text-red-500', 'text-yellow-500');
                scoreCircle.classList.add('text-green-500');
            }
        }, 20);

        // Update label
        if (score >= 80) {
            scoreLabel.textContent = 'Excellent! 🎉';
            scoreLabel.className = 'text-2xl font-bold mb-2 text-green-400';
            scoreDesc.textContent = 'Your resume is highly ATS-friendly';
        } else if (score >= 60) {
            scoreLabel.textContent = 'Good 👍';
            scoreLabel.className = 'text-2xl font-bold mb-2 text-yellow-400';
            scoreDesc.textContent = 'Your resume has room for improvement';
        } else {
            scoreLabel.textContent = 'Needs Work 📝';
            scoreLabel.className = 'text-2xl font-bold mb-2 text-red-400';
            scoreDesc.textContent = 'Your resume needs significant improvements';
        }

        // Display keywords
        const foundContainer = document.getElementById('atsFoundKeywords');
        const missingContainer = document.getElementById('atsMissingKeywords');
        document.getElementById('atsFoundCount').textContent = foundKeywords.length;
        document.getElementById('atsMissingCount').textContent = missingKeywords.length;

        foundContainer.innerHTML = foundKeywords.slice(0, 15).map(kw => 
            `<span class="px-3 py-1 bg-green-600 rounded-full text-sm">${kw}</span>`
        ).join('');

        missingContainer.innerHTML = missingKeywords.map(kw => 
            `<span class="px-3 py-1 bg-red-600/50 rounded-full text-sm">${kw}</span>`
        ).join('');

        // Generate suggestions
        const suggestions = [];
        if (!resumeText.includes('@')) suggestions.push('Add your email address');
        if (!resumeText.match(/\d{3}[-.]?\d{3}[-.]?\d{4}/)) suggestions.push('Include your phone number');
        if (missingKeywords.length > 0) suggestions.push(`Add missing keywords: ${missingKeywords.slice(0, 5).join(', ')}`);
        if (resumeText.length < 500) suggestions.push('Expand your resume with more details about your experience');
        if (!resumeText.toLowerCase().includes('experience')) suggestions.push('Add a work experience section');
        if (!resumeText.toLowerCase().includes('education')) suggestions.push('Add an education section');
        if (!resumeText.toLowerCase().includes('skill')) suggestions.push('Add a skills section');
        if (foundKeywords.length < 10) suggestions.push('Include more relevant technical skills');

        const suggestionsList = document.getElementById('atsSuggestionsList');
        suggestionsList.innerHTML = suggestions.map((suggestion, index) => `
            <li class="flex items-start gap-3 p-3 bg-gray-700/50 rounded-lg">
                <span class="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold">${index + 1}</span>
                <span class="text-gray-300">${suggestion}</span>
            </li>
        `).join('');

        // Scroll to results
        resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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
        
        // Re-render the entire Interview Prep tab content
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.innerHTML = this.render();
            this.attachEventListeners();
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