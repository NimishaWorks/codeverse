// Complete Coding Terminal with Monaco Editor - EXACT React Replica
import { CameraOverlay } from './CameraOverlay.js';
import { TimerOverlay } from './TimerOverlay.js';
import { SettingsPanel } from './SettingsPanel.js';
import { FloatingSettingsButton } from './FloatingSettingsButton.js';

export class CodingTerminal {
    constructor() {
        this.element = null;
        this.editor = null;
        this.activeTab = 'description';
        this.activeBottomTab = 'testcases';
        this.language = 'python';
        this.code = this.getStarterCode('python');
        this.output = '';
        this.isRunning = false;
        this.testResults = [];
        
        // Components
        this.camera = new CameraOverlay();
        this.timer = new TimerOverlay(3600);
        this.settingsPanel = new SettingsPanel();
        this.settingsButton = new FloatingSettingsButton(() => this.settingsPanel.open());
        
        // Load settings
        this.settingsPanel.loadSettings();
        this.settingsPanel.setOnChange((settings) => this.handleSettingsChange(settings));
        
        this.problemData = {
            title: "Two Sum",
            difficulty: "Easy",
            description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
            examples: [
                {
                    input: "nums = [2,7,11,15], target = 9",
                    output: "[0,1]",
                    explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
                },
                {
                    input: "nums = [3,2,4], target = 6",
                    output: "[1,2]"
                }
            ],
            constraints: [
                "2 ≤ nums.length ≤ 10⁴",
                "-10⁹ ≤ nums[i] ≤ 10⁹",
                "-10⁹ ≤ target ≤ 10⁹",
                "Only one valid answer exists"
            ]
        };
        
        this.testCases = [
            { id: 1, input: '[2,7,11,15], 9', expected: '[0,1]', status: 'pending' },
            { id: 2, input: '[3,2,4], 6', expected: '[1,2]', status: 'pending' },
            { id: 3, input: '[3,3], 6', expected: '[0,1]', status: 'pending' }
        ];
    }

    getStarterCode(lang) {
        const starters = {
            python: '# Write your code here\ndef twoSum(nums, target):\n    pass\n\nprint("Hello, CodeVerse!")',
            javascript: '// Write your code here\nfunction twoSum(nums, target) {\n    // Your code\n}\n\nconsole.log("Hello, CodeVerse!");',
            java: 'class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Your code\n        return new int[0];\n    }\n}',
            cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nvector<int> twoSum(vector<int>& nums, int target) {\n    // Your code\n    return {};\n}'
        };
        return starters[lang] || starters.python;
    }

    async render() {
        this.element = document.createElement('div');
        this.element.className = 'h-screen bg-gradient-to-br from-[#0b1020] via-[#101325] to-[#14182b] text-white flex flex-col';
        
        this.element.innerHTML = `
            <!-- Header -->
            <div class="border-b border-purple-500/30 bg-gray-900/50 backdrop-blur-lg px-6 py-3 flex items-center justify-between">
                <h1 class="text-xl font-bold">Coding Terminal</h1>
                <div class="flex items-center gap-3">
                    <button id="resetCodeBtn" class="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm">
                        Reset Code
                    </button>
                </div>
            </div>

            <!-- Main Content with Split Panels -->
            <div class="flex-1 flex overflow-hidden" id="splitContainer">
                <!-- LEFT PANEL - Problem Statement -->
                <div id="leftPanel" class="h-full bg-gray-900/50 border-r border-purple-500/30 overflow-hidden flex flex-col" style="width: 40%">
                    <!-- Tabs -->
                    <div class="flex border-b border-gray-700/50 bg-gray-800/30">
                        <button data-tab="description" class="problem-tab px-6 py-3 text-sm font-medium transition-all relative ${this.activeTab === 'description' ? 'text-purple-400' : 'text-gray-400'}">
                            Description
                            ${this.activeTab === 'description' ? '<div class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"></div>' : ''}
                        </button>
                        <button data-tab="solutions" class="problem-tab px-6 py-3 text-sm font-medium transition-all relative ${this.activeTab === 'solutions' ? 'text-purple-400' : 'text-gray-400'}">
                            Solutions
                            ${this.activeTab === 'solutions' ? '<div class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"></div>' : ''}
                        </button>
                        <button data-tab="submissions" class="problem-tab px-6 py-3 text-sm font-medium transition-all relative ${this.activeTab === 'submissions' ? 'text-purple-400' : 'text-gray-400'}">
                            Submissions
                            ${this.activeTab === 'submissions' ? '<div class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"></div>' : ''}
                        </button>
                    </div>

                    <!-- Content -->
                    <div class="flex-1 overflow-y-auto p-6 space-y-6" id="problemContent">
                        ${this.renderProblemContent()}
                    </div>
                </div>

                <!-- RIGHT PANEL - Code Editor -->
                <div id="rightPanel" class="h-full flex flex-col overflow-hidden" style="width: 60%">
                    <!-- Editor Header -->
                    <div class="bg-gray-900/50 border-b border-gray-700/50 px-4 py-2 flex items-center justify-between">
                        <select id="languageSelect" class="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm">
                            <option value="python">🐍 Python</option>
                            <option value="javascript">⚡ JavaScript</option>
                            <option value="java">☕ Java</option>
                            <option value="cpp">⚙️ C++</option>
                        </select>
                        <div class="flex gap-2">
                            <button id="runBtn" class="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-semibold flex items-center gap-2">
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" /></svg>
                                Run
                            </button>
                            <button id="submitBtn" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-semibold flex items-center gap-2">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                                Submit
                            </button>
                        </div>
                    </div>

                    <!-- Monaco Editor Container -->
                    <div id="monacoEditor" class="flex-1 bg-[#1e1e1e]"></div>

                    <!-- Bottom Panel - Console/Test Cases -->
                    <div class="h-48 bg-gray-900/70 border-t border-gray-700/50 flex flex-col">
                        <!-- Bottom Tabs -->
                        <div class="flex border-b border-gray-700/50 bg-gray-800/30">
                            <button data-bottom-tab="testcases" class="bottom-tab px-4 py-2 text-sm font-medium ${this.activeBottomTab === 'testcases' ? 'text-purple-400 border-b-2 border-purple-500' : 'text-gray-400'}">
                                Test Cases
                            </button>
                            <button data-bottom-tab="console" class="bottom-tab px-4 py-2 text-sm font-medium ${this.activeBottomTab === 'console' ? 'text-purple-400 border-b-2 border-purple-500' : 'text-gray-400'}">
                                Console
                            </button>
                        </div>

                        <!-- Bottom Content -->
                        <div id="bottomContent" class="flex-1 overflow-y-auto p-4">
                            ${this.renderBottomContent()}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Overlays Container -->
            <div id="overlaysContainer"></div>
        `;

        // Initialize Monaco Editor
        setTimeout(() => this.initMonacoEditor(), 100);
        setTimeout(() => this.attachEventListeners(), 100);
        setTimeout(() => this.initResizablePanels(), 200);
        
        return this.element;
    }

    renderProblemContent() {
        if (this.activeTab === 'description') {
            return `
                <div class="space-y-6">
                    <div class="flex items-center justify-between">
                        <h1 class="text-2xl font-bold">${this.problemData.title}</h1>
                        <span class="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold border border-green-500/30">
                            ${this.problemData.difficulty}
                        </span>
                    </div>

                    <div class="bg-gray-800/50 rounded-xl p-5 border border-gray-700/50">
                        <p class="text-gray-300 leading-relaxed">${this.problemData.description}</p>
                    </div>

                    ${this.problemData.examples.map((ex, i) => `
                        <div class="bg-gray-800/50 rounded-xl p-5 border border-gray-700/50">
                            <h3 class="text-sm font-semibold text-purple-400 mb-3">Example ${i + 1}:</h3>
                            <div class="space-y-2 font-mono text-sm">
                                <div><span class="text-gray-400">Input:</span>
                                    <div class="bg-black/50 rounded p-2 mt-1 text-blue-400">${ex.input}</div>
                                </div>
                                <div><span class="text-gray-400">Output:</span>
                                    <div class="bg-black/50 rounded p-2 mt-1 text-green-400">${ex.output}</div>
                                </div>
                                ${ex.explanation ? `<div><span class="text-gray-400">Explanation:</span><p class="text-gray-300 mt-1">${ex.explanation}</p></div>` : ''}
                            </div>
                        </div>
                    `).join('')}

                    <div class="bg-gray-800/50 rounded-xl p-5 border border-gray-700/50">
                        <h3 class="text-sm font-semibold text-purple-400 mb-3">Constraints:</h3>
                        <ul class="space-y-1 text-sm text-gray-300">
                            ${this.problemData.constraints.map(c => `<li class="flex items-center gap-2"><span class="text-purple-400">›</span><code class="font-mono">${c}</code></li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
        } else if (this.activeTab === 'solutions') {
            return `<div class="text-center py-12 text-gray-400">Solutions coming soon...</div>`;
        } else {
            return `<div class="text-center py-12 text-gray-400">No submissions yet</div>`;
        }
    }

    renderBottomContent() {
        if (this.activeBottomTab === 'testcases') {
            return `
                <div class="space-y-2">
                    ${this.testCases.map(tc => `
                        <div class="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50 ${tc.status === 'passed' ? 'border-green-500/50' : tc.status === 'failed' ? 'border-red-500/50' : ''}">
                            <div class="flex items-center justify-between mb-2">
                                <span class="text-sm font-semibold">Test Case ${tc.id}</span>
                                ${tc.status === 'passed' ? '<span class="text-green-400 text-xs">✓ Passed</span>' : tc.status === 'failed' ? '<span class="text-red-400 text-xs">✗ Failed</span>' : '<span class="text-gray-500 text-xs">Pending</span>'}
                            </div>
                            <div class="text-xs font-mono">
                                <div class="text-gray-400">Input: <span class="text-blue-400">${tc.input}</span></div>
                                <div class="text-gray-400">Expected: <span class="text-green-400">${tc.expected}</span></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        } else {
            return `
                <div class="font-mono text-sm text-gray-300" id="consoleOutput">
                    ${this.output || '<span class="text-green-400">Ready to run your code...</span>'}
                </div>
            `;
        }
    }

    initMonacoEditor() {
        if (typeof monaco === 'undefined') {
            console.error('Monaco Editor not loaded');
            return;
        }

        const container = document.getElementById('monacoEditor');
        if (!container) return;

        require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs' }});
        
        require(['vs/editor/editor.main'], () => {
            this.editor = monaco.editor.create(container, {
                value: this.code,
                language: this.language,
                theme: 'vs-dark',
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                roundedSelection: false,
                scrollBeyondLastLine: false,
                automaticLayout: true
            });

            this.editor.onDidChangeModelContent(() => {
                this.code = this.editor.getValue();
            });
        });
    }

    initResizablePanels() {
        if (typeof Split === 'undefined') {
            console.warn('Split.js not loaded');
            return;
        }

        Split(['#leftPanel', '#rightPanel'], {
            sizes: [40, 60],
            minSize: [300, 400],
            gutterSize: 4,
            cursor: 'col-resize'
        });
    }

    attachEventListeners() {
        // Problem tabs
        document.querySelectorAll('.problem-tab').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.activeTab = e.target.dataset.tab;
                this.updateProblemContent();
            });
        });

        // Bottom tabs
        document.querySelectorAll('.bottom-tab').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.activeBottomTab = e.target.dataset.bottomTab;
                this.updateBottomContent();
            });
        });

        // Language selector
        const langSelect = document.getElementById('languageSelect');
        if (langSelect) {
            langSelect.addEventListener('change', (e) => {
                this.language = e.target.value;
                this.code = this.getStarterCode(this.language);
                if (this.editor) {
                    monaco.editor.setModelLanguage(this.editor.getModel(), this.language);
                    this.editor.setValue(this.code);
                }
            });
        }

        // Run button
        const runBtn = document.getElementById('runBtn');
        if (runBtn) {
            runBtn.addEventListener('click', () => this.runCode());
        }

        // Submit button
        const submitBtn = document.getElementById('submitBtn');
        if (submitBtn) {
            submitBtn.addEventListener('click', () => this.submitCode());
        }

        // Reset button
        const resetBtn = document.getElementById('resetCodeBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                if (confirm('Reset code to starter template?')) {
                    this.code = this.getStarterCode(this.language);
                    if (this.editor) this.editor.setValue(this.code);
                }
            });
        }

        // Settings button
        const overlaysContainer = document.getElementById('overlaysContainer');
        if (overlaysContainer) {
            this.settingsButton.mount(overlaysContainer);
        }
    }

    updateProblemContent() {
        const content = document.getElementById('problemContent');
        if (content) {
            content.innerHTML = this.renderProblemContent();
        }
    }

    updateBottomContent() {
        const content = document.getElementById('bottomContent');
        if (content) {
            content.innerHTML = this.renderBottomContent();
        }
    }

    async runCode() {
        this.isRunning = true;
        this.activeBottomTab = 'console';
        this.output = '<span class="text-yellow-400">Running...</span>';
        this.updateBottomContent();

        // Simulate code execution
        setTimeout(() => {
            try {
                this.output = `<span class="text-green-400">✓ Code executed successfully</span>\n<span class="text-gray-300">Output: [0, 1]</span>\n<span class="text-gray-400">Execution time: 0.002s</span>`;
            } catch (e) {
                this.output = `<span class="text-red-400">✗ Error: ${e.message}</span>`;
            }
            this.isRunning = false;
            this.updateBottomContent();
        }, 1000);
    }

    async submitCode() {
        this.activeBottomTab = 'testcases';
        this.output = '<span class="text-yellow-400">Submitting...</span>';
        this.updateBottomContent();

        // Simulate test execution
        setTimeout(() => {
            this.testCases.forEach(tc => {
                tc.status = Math.random() > 0.3 ? 'passed' : 'failed';
            });
            this.updateBottomContent();
            
            const passed = this.testCases.filter(tc => tc.status === 'passed').length;
            alert(`${passed}/${this.testCases.length} test cases passed!`);
        }, 2000);
    }

    handleSettingsChange(settings) {
        const overlaysContainer = document.getElementById('overlaysContainer');
        if (!overlaysContainer) return;

        // Handle camera
        if (settings.camera) {
            this.camera.activate().then(() => {
                overlaysContainer.innerHTML += this.camera.render();
                this.camera.attachEventListeners();
            });
        } else {
            this.camera.deactivate();
        }

        // Handle timer
        if (settings.timer) {
            const duration = document.getElementById('timerDuration')?.value || 60;
            this.timer.activate(duration * 60);
            overlaysContainer.innerHTML += this.timer.render();
            this.timer.attachEventListeners();
        } else {
            this.timer.deactivate();
        }
    }

    onMount() {
        this.attachEventListeners();
    }
}
