import { stateManager } from '../utils/state-manager.js';
import { animationEngine } from '../utils/animation-engine.js';
import { toastManager } from '../utils/toast-manager.js';
import { CameraOverlay } from './CameraOverlay.js';
import { TimerOverlay } from './TimerOverlay.js';
import { SettingsPanel } from './SettingsPanel.js';
import { FloatingSettingsButton } from './FloatingSettingsButton.js';

export class AptitudeTests {
    constructor() {
        this.selectedCategory = null;
        this.isTestActive = false;
        this.currentQuestionIndex = 0;
        this.selectedAnswer = null;
        this.score = 0;
        this.timeLeft = 600; // 10 minutes
        this.answeredQuestions = [];
        this.timerInterval = null;
        
        // Camera and Timer components
        this.camera = new CameraOverlay();
        this.timer = new TimerOverlay(600); // 10 minutes
        this.settingsPanel = new SettingsPanel();
        this.settingsButton = new FloatingSettingsButton(() => this.settingsPanel.open());
        
        // Load settings
        this.settingsPanel.loadSettings();
        this.settingsPanel.setOnChange((settings) => this.handleSettingsChange(settings));
        
        this.settings = {
            camera: false,
            timer: true,
            tutorials: true
        };

        this.categories = [
            {
                id: 'logical',
                name: 'Logical Reasoning',
                icon: '🧩',
                color: 'from-blue-500 to-cyan-500',
                duration: 10,
                description: 'Test your logical thinking and pattern recognition skills',
                totalQuestions: 10,
                questions: [
                    {
                        question: 'If all Bloops are Razzies and all Razzies are Lazzies, are all Bloops definitely Lazzies?',
                        options: ['Yes', 'No', 'Cannot be determined', 'Sometimes'],
                        correct: 0,
                        explanation: 'Since all Bloops are Razzies, and all Razzies are Lazzies, it follows that all Bloops must be Lazzies.'
                    },
                    {
                        question: 'Complete the series: 2, 6, 12, 20, 30, ?',
                        options: ['40', '42', '44', '46'],
                        correct: 1,
                        explanation: 'The differences are 4, 6, 8, 10... (increasing by 2). Next difference should be 12, so 30 + 12 = 42.'
                    },
                    {
                        question: 'Which word does not belong? Apple, Banana, Carrot, Orange',
                        options: ['Apple', 'Banana', 'Carrot', 'Orange'],
                        correct: 2,
                        explanation: 'Carrot is a vegetable while the others are fruits.'
                    },
                    {
                        question: 'If it takes 5 machines 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?',
                        options: ['5 minutes', '20 minutes', '100 minutes', '500 minutes'],
                        correct: 0,
                        explanation: 'Each machine makes 1 widget in 5 minutes. 100 machines can make 100 widgets in 5 minutes.'
                    },
                    {
                        question: 'What comes next in the pattern: J, F, M, A, M, J, ?',
                        options: ['J', 'A', 'S', 'O'],
                        correct: 1,
                        explanation: 'These are the first letters of months: Jan, Feb, Mar, Apr, May, Jun, Jul (A for August).'
                    },
                    {
                        question: 'A clock shows 3:15. What is the angle between the hour and minute hands?',
                        options: ['0°', '7.5°', '15°', '90°'],
                        correct: 1,
                        explanation: 'At 3:15, the minute hand is at 90° and the hour hand is at 97.5°. The angle is 7.5°.'
                    },
                    {
                        question: 'Which number should replace the question mark? 3, 7, 15, 31, 63, ?',
                        options: ['95', '127', '159', '191'],
                        correct: 1,
                        explanation: 'Each number is double the previous plus 1: 3×2+1=7, 7×2+1=15, etc. 63×2+1=127.'
                    },
                    {
                        question: 'If some Smurfs are blue and all blue things are cold, then:',
                        options: ['All Smurfs are cold', 'Some Smurfs are cold', 'No Smurfs are cold', 'Cannot be determined'],
                        correct: 1,
                        explanation: 'Since some Smurfs are blue and all blue things are cold, some Smurfs must be cold.'
                    },
                    {
                        question: 'What is the next letter in this sequence: B, D, G, K, P, ?',
                        options: ['T', 'U', 'V', 'W'],
                        correct: 2,
                        explanation: 'The gaps are +2, +3, +4, +5, so next is +6. P+6=V.'
                    },
                    {
                        question: 'A man is looking at a photograph. He says "Brothers and sisters I have none, but that mans father is my fathers son." Who is in the photograph?',
                        options: ['His son', 'His father', 'Himself', 'His brother'],
                        correct: 0,
                        explanation: 'My fathers son (with no brothers) = me. So "that mans father" = me. The photograph shows his son.'
                    }
                ]
            },
            {
                id: 'quantitative',
                name: 'Quantitative Aptitude',
                icon: '🔢',
                color: 'from-green-500 to-emerald-500',
                duration: 15,
                description: 'Test your mathematical and numerical reasoning abilities',
                totalQuestions: 12,
                questions: [
                    {
                        question: 'What is 15% of 240?',
                        options: ['36', '30', '42', '45'],
                        correct: 0,
                        explanation: '15% of 240 = (15/100) × 240 = 36'
                    },
                    {
                        question: 'If a car travels 300 km in 4 hours, what is its average speed?',
                        options: ['70 km/h', '75 km/h', '80 km/h', '85 km/h'],
                        correct: 1,
                        explanation: 'Speed = Distance/Time = 300/4 = 75 km/h'
                    },
                    {
                        question: 'The ratio of boys to girls in a class is 3:2. If there are 30 students total, how many boys are there?',
                        options: ['12', '15', '18', '20'],
                        correct: 2,
                        explanation: 'Total ratio parts = 3+2 = 5. Boys = (3/5) × 30 = 18'
                    },
                    {
                        question: 'What is the compound interest on $1000 at 10% per annum for 2 years?',
                        options: ['$200', '$210', '$220', '$230'],
                        correct: 1,
                        explanation: 'Amount = 1000(1.10)² = $1210. CI = 1210 - 1000 = $210'
                    },
                    {
                        question: 'If x + y = 10 and x - y = 4, what is the value of x?',
                        options: ['6', '7', '8', '9'],
                        correct: 1,
                        explanation: 'Adding the equations: 2x = 14, so x = 7'
                    },
                    {
                        question: 'A rectangle has length 12 cm and width 8 cm. What is its area?',
                        options: ['88 cm²', '92 cm²', '96 cm²', '100 cm²'],
                        correct: 2,
                        explanation: 'Area = length × width = 12 × 8 = 96 cm²'
                    },
                    {
                        question: 'What is the value of 2⁴ × 3²?',
                        options: ['144', '154', '164', '174'],
                        correct: 0,
                        explanation: '2⁴ = 16, 3² = 9, so 16 × 9 = 144'
                    },
                    {
                        question: 'If 5 books cost $25, how much do 8 books cost?',
                        options: ['$35', '$40', '$45', '$50'],
                        correct: 1,
                        explanation: 'Cost per book = 25/5 = $5. So 8 books = 8 × 5 = $40'
                    },
                    {
                        question: 'What is 20% of 25% of 400?',
                        options: ['15', '20', '25', '30'],
                        correct: 1,
                        explanation: '25% of 400 = 100, then 20% of 100 = 20'
                    },
                    {
                        question: 'A circular garden has radius 7 meters. What is its circumference? (π ≈ 3.14)',
                        options: ['42 m', '44 m', '46 m', '48 m'],
                        correct: 1,
                        explanation: 'Circumference = 2πr = 2 × 3.14 × 7 = 43.96 ≈ 44 m'
                    },
                    {
                        question: 'If a train travels at 60 km/h for 2.5 hours, how far does it travel?',
                        options: ['120 km', '130 km', '140 km', '150 km'],
                        correct: 3,
                        explanation: 'Distance = Speed × Time = 60 × 2.5 = 150 km'
                    },
                    {
                        question: 'What is the average of 12, 18, 24, 30, and 36?',
                        options: ['22', '24', '26', '28'],
                        correct: 1,
                        explanation: 'Average = (12+18+24+30+36)/5 = 120/5 = 24'
                    }
                ]
            },
            {
                id: 'verbal',
                name: 'Verbal Ability',
                icon: '📚',
                color: 'from-purple-500 to-pink-500',
                duration: 12,
                description: 'Test your English language and comprehension skills',
                totalQuestions: 10,
                questions: [
                    {
                        question: 'Choose the synonym for "Abundant":',
                        options: ['Scarce', 'Plentiful', 'Meager', 'Limited'],
                        correct: 1,
                        explanation: 'Abundant means existing in large quantities; plentiful.'
                    },
                    {
                        question: 'Choose the antonym for "Transparent":',
                        options: ['Clear', 'Opaque', 'Visible', 'Obvious'],
                        correct: 1,
                        explanation: 'Transparent means clear/see-through, so the opposite is opaque.'
                    },
                    {
                        question: 'Complete the analogy: Book is to Reading as Fork is to ___',
                        options: ['Kitchen', 'Eating', 'Spoon', 'Food'],
                        correct: 1,
                        explanation: 'A book is used for reading, similarly a fork is used for eating.'
                    },
                    {
                        question: 'Which sentence is grammatically correct?',
                        options: ['Neither of the students were present', 'Neither of the students was present', 'Neither students were present', 'Neither student were present'],
                        correct: 1,
                        explanation: '"Neither" is singular, so it takes a singular verb "was".'
                    },
                    {
                        question: 'Choose the correctly spelled word:',
                        options: ['Occassion', 'Occasion', 'Ocasion', 'Occassion'],
                        correct: 1,
                        explanation: 'The correct spelling is "Occasion" with double-c, single-s.'
                    },
                    {
                        question: 'What does "To beat around the bush" mean?',
                        options: ['To be direct', 'To avoid the topic', 'To be violent', 'To work hard'],
                        correct: 1,
                        explanation: 'This idiom means to avoid talking about the main point or to speak evasively.'
                    },
                    {
                        question: 'Choose the word that best completes: "The evidence was _____ enough to convict the criminal."',
                        options: ['Insufficient', 'Sufficient', 'Indifferent', 'Deficient'],
                        correct: 1,
                        explanation: 'Sufficient evidence means adequate evidence to support the conviction.'
                    },
                    {
                        question: 'Identify the figure of speech: "The classroom was a zoo."',
                        options: ['Simile', 'Metaphor', 'Personification', 'Alliteration'],
                        correct: 1,
                        explanation: 'This is a metaphor - directly comparing the classroom to a zoo without using "like" or "as".'
                    },
                    {
                        question: 'Choose the passive voice of: "She writes a letter."',
                        options: ['A letter is written by her', 'A letter was written by her', 'A letter is being written by her', 'A letter has been written by her'],
                        correct: 0,
                        explanation: 'Present tense passive voice: "A letter is written by her."'
                    },
                    {
                        question: 'Which prefix means "before"?',
                        options: ['Post-', 'Pre-', 'Anti-', 'Sub-'],
                        correct: 1,
                        explanation: 'The prefix "pre-" means before (like in preview, prehistoric).'
                    }
                ]
            }
        ];
    }

    render() {
        if (this.isTestActive) {
            return this.renderTestInterface();
        } else {
            return this.renderCategorySelection();
        }
    }

    renderCategorySelection() {
        return `
            <div class="min-h-screen bg-gradient-to-br from-[#0b1020] via-[#101325] to-[#14182b] text-white p-6">
                <div class="max-w-6xl mx-auto">
                    <!-- Header -->
                    <div class="text-center mb-12">
                        <h1 class="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                            Aptitude Tests 🧮
                        </h1>
                        <p class="text-xl text-gray-300">Test your cognitive abilities and improve your problem-solving skills</p>
                    </div>

                    <!-- Category Cards -->
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        ${this.categories.map(category => `
                            <div data-category="${category.id}" class="category-card bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 hover:border-blue-500/50 transition-all transform hover:scale-105 cursor-pointer">
                                <div class="text-center">
                                    <!-- Icon and Gradient -->
                                    <div class="w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center text-4xl">
                                        ${category.icon}
                                    </div>
                                    
                                    <!-- Title -->
                                    <h3 class="text-2xl font-bold mb-3">${category.name}</h3>
                                    
                                    <!-- Description -->
                                    <p class="text-gray-400 mb-6 text-sm leading-relaxed">${category.description}</p>
                                    
                                    <!-- Test Info -->
                                    <div class="space-y-2 text-sm text-gray-300 mb-6">
                                        <div class="flex justify-between">
                                            <span>Questions:</span>
                                            <span class="font-semibold">${category.totalQuestions}</span>
                                        </div>
                                        <div class="flex justify-between">
                                            <span>Duration:</span>
                                            <span class="font-semibold">${category.duration} minutes</span>
                                        </div>
                                        <div class="flex justify-between">
                                            <span>Difficulty:</span>
                                            <span class="font-semibold text-yellow-400">Medium</span>
                                        </div>
                                    </div>
                                    
                                    <!-- Start Button -->
                                    <button class="w-full px-6 py-3 bg-gradient-to-r ${category.color} text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                                        Start Test
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <!-- Recent Results -->
                    <div class="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8">
                        <h2 class="text-2xl font-bold mb-6 flex items-center gap-3">
                            <span class="text-3xl">📊</span>
                            Recent Test Results
                        </h2>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div class="bg-gray-900/50 rounded-2xl p-6">
                                <div class="flex items-center justify-between mb-3">
                                    <span class="text-lg font-semibold">Logical Reasoning</span>
                                    <span class="text-2xl">🧩</span>
                                </div>
                                <div class="text-3xl font-bold text-green-400 mb-2">85%</div>
                                <div class="text-sm text-gray-400">8/10 correct • 2 days ago</div>
                                <div class="mt-4 bg-gray-800/50 rounded-lg p-3">
                                    <div class="text-xs text-gray-400 mb-1">Performance</div>
                                    <div class="w-full bg-gray-700 rounded-full h-2">
                                        <div class="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full" style="width: 85%"></div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="bg-gray-900/50 rounded-2xl p-6">
                                <div class="flex items-center justify-between mb-3">
                                    <span class="text-lg font-semibold">Quantitative Aptitude</span>
                                    <span class="text-2xl">🔢</span>
                                </div>
                                <div class="text-3xl font-bold text-blue-400 mb-2">78%</div>
                                <div class="text-sm text-gray-400">9/12 correct • 1 week ago</div>
                                <div class="mt-4 bg-gray-800/50 rounded-lg p-3">
                                    <div class="text-xs text-gray-400 mb-1">Performance</div>
                                    <div class="w-full bg-gray-700 rounded-full h-2">
                                        <div class="bg-gradient-to-r from-blue-400 to-blue-500 h-2 rounded-full" style="width: 78%"></div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="bg-gray-900/50 rounded-2xl p-6">
                                <div class="flex items-center justify-between mb-3">
                                    <span class="text-lg font-semibold">Verbal Ability</span>
                                    <span class="text-2xl">📚</span>
                                </div>
                                <div class="text-3xl font-bold text-purple-400 mb-2">92%</div>
                                <div class="text-sm text-gray-400">9/10 correct • 3 days ago</div>
                                <div class="mt-4 bg-gray-800/50 rounded-lg p-3">
                                    <div class="text-xs text-gray-400 mb-1">Performance</div>
                                    <div class="w-full bg-gray-700 rounded-full h-2">
                                        <div class="bg-gradient-to-r from-purple-400 to-purple-500 h-2 rounded-full" style="width: 92%"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderTestInterface() {
        const category = this.categories.find(cat => cat.id === this.selectedCategory);
        const currentQuestion = category.questions[this.currentQuestionIndex];
        const progress = ((this.currentQuestionIndex + 1) / category.questions.length) * 100;

        return `
            <div class="min-h-screen bg-gradient-to-br from-[#0b1020] via-[#101325] to-[#14182b] text-white">
                <!-- Header with Timer -->
                <div class="border-b border-gray-800 bg-gray-900/50 backdrop-blur-lg">
                    <div class="max-w-4xl mx-auto px-6 py-4">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-4">
                                <button id="exitTestButton" class="text-gray-400 hover:text-white transition-all">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                <h1 class="text-xl font-bold">${category.name} Test</h1>
                            </div>
                            
                            <div class="flex items-center gap-6">
                                <div class="text-center">
                                    <div class="text-2xl font-bold">${Math.floor(this.timeLeft / 60)}:${(this.timeLeft % 60).toString().padStart(2, '0')}</div>
                                    <div class="text-xs text-gray-400">Time Left</div>
                                </div>
                                <div class="text-center">
                                    <div class="text-2xl font-bold">${this.currentQuestionIndex + 1}/${category.questions.length}</div>
                                    <div class="text-xs text-gray-400">Question</div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Progress Bar -->
                        <div class="mt-4">
                            <div class="w-full bg-gray-700 rounded-full h-2">
                                <div class="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300" style="width: ${progress}%"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Question Interface -->
                <div class="max-w-4xl mx-auto px-6 py-12">
                    <div class="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8">
                        <!-- Question -->
                        <div class="mb-8">
                            <h2 class="text-2xl font-bold mb-6">${currentQuestion.question}</h2>
                        </div>

                        <!-- Options -->
                        <div class="space-y-4 mb-8">
                            ${currentQuestion.options.map((option, index) => `
                                <button data-option="${index}" class="option-button w-full p-4 text-left bg-gray-700/40 border border-gray-600/50 rounded-xl hover:border-blue-500/50 hover:bg-blue-500/10 transition-all ${
                                    this.selectedAnswer === index ? 'border-blue-500 bg-blue-500/20' : ''
                                }">
                                    <div class="flex items-center gap-4">
                                        <div class="w-8 h-8 rounded-full border-2 ${
                                            this.selectedAnswer === index ? 'border-blue-500 bg-blue-500' : 'border-gray-400'
                                        } flex items-center justify-center">
                                            <span class="text-sm font-bold">${String.fromCharCode(65 + index)}</span>
                                        </div>
                                        <span class="text-lg">${option}</span>
                                    </div>
                                </button>
                            `).join('')}
                        </div>

                        <!-- Navigation -->
                        <div class="flex items-center justify-between">
                            <button id="previousButton" class="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-semibold transition-all ${
                                this.currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
                            }">
                                Previous
                            </button>
                            
                            <div class="text-gray-400">
                                Question ${this.currentQuestionIndex + 1} of ${category.questions.length}
                            </div>
                            
                            <button id="nextButton" class="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all ${
                                this.selectedAnswer === null ? 'opacity-50 cursor-not-allowed' : ''
                            }">
                                ${this.currentQuestionIndex === category.questions.length - 1 ? 'Finish Test' : 'Next'}
                            </button>
                        </div>
                    </div>

                    <!-- Question Navigator -->
                    <div class="mt-8 bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-6">
                        <h3 class="text-lg font-bold mb-4">Question Navigator</h3>
                        <div class="grid grid-cols-10 gap-2">
                            ${category.questions.map((_, index) => `
                                <button data-question-nav="${index}" class="question-nav-button w-10 h-10 rounded-lg text-sm font-bold transition-all ${
                                    index === this.currentQuestionIndex ? 'bg-blue-600 text-white' :
                                    this.answeredQuestions.includes(index) ? 'bg-green-600 text-white' :
                                    'bg-gray-700 text-gray-400 hover:bg-gray-600'
                                }">
                                    ${index + 1}
                                </button>
                            `).join('')}
                        </div>
                        <div class="flex items-center gap-6 mt-4 text-sm text-gray-400">
                            <div class="flex items-center gap-2">
                                <div class="w-4 h-4 bg-blue-600 rounded"></div>
                                <span>Current</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <div class="w-4 h-4 bg-green-600 rounded"></div>
                                <span>Answered</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <div class="w-4 h-4 bg-gray-700 rounded"></div>
                                <span>Not Visited</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderResultScreen(results) {
        const category = this.categories.find(cat => cat.id === this.selectedCategory);
        const percentage = Math.round((results.correctAnswers / results.totalQuestions) * 100);
        const grade = this.getGrade(percentage);

        return `
            <div class="min-h-screen bg-gradient-to-br from-[#0b1020] via-[#101325] to-[#14182b] text-white p-6">
                <div class="max-w-4xl mx-auto">
                    <!-- Results Header -->
                    <div class="text-center mb-12">
                        <div class="w-24 h-24 mx-auto mb-6 bg-gradient-to-br ${category.color} rounded-full flex items-center justify-center text-4xl">
                            ${grade.emoji}
                        </div>
                        <h1 class="text-4xl font-bold mb-4">${category.name} Test Complete!</h1>
                        <p class="text-xl text-gray-300">${grade.message}</p>
                    </div>

                    <!-- Score Card -->
                    <div class="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 mb-8">
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                            <div>
                                <div class="text-4xl font-bold ${grade.color} mb-2">${percentage}%</div>
                                <div class="text-gray-400">Overall Score</div>
                            </div>
                            <div>
                                <div class="text-4xl font-bold text-green-400 mb-2">${results.correctAnswers}</div>
                                <div class="text-gray-400">Correct Answers</div>
                            </div>
                            <div>
                                <div class="text-4xl font-bold text-red-400 mb-2">${results.incorrectAnswers}</div>
                                <div class="text-gray-400">Incorrect Answers</div>
                            </div>
                        </div>
                    </div>

                    <!-- Detailed Results -->
                    <div class="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 mb-8">
                        <h2 class="text-2xl font-bold mb-6">Question Review</h2>
                        <div class="space-y-4">
                            ${category.questions.map((question, index) => {
                                const userAnswer = results.answers[index];
                                const isCorrect = userAnswer === question.correct;
                                return `
                                    <div class="border border-gray-700/50 rounded-xl p-6 ${isCorrect ? 'bg-green-500/10' : 'bg-red-500/10'}">
                                        <div class="flex items-start justify-between mb-3">
                                            <h3 class="font-semibold text-lg">Question ${index + 1}</h3>
                                            <div class="flex items-center gap-2">
                                                <span class="${isCorrect ? 'text-green-400' : 'text-red-400'} text-xl">
                                                    ${isCorrect ? '✓' : '✗'}
                                                </span>
                                            </div>
                                        </div>
                                        <p class="text-gray-300 mb-4">${question.question}</p>
                                        <div class="space-y-2 text-sm">
                                            <div>
                                                <span class="text-gray-400">Your Answer:</span>
                                                <span class="${isCorrect ? 'text-green-400' : 'text-red-400'} font-semibold ml-2">
                                                    ${userAnswer !== null ? question.options[userAnswer] : 'Not Answered'}
                                                </span>
                                            </div>
                                            ${!isCorrect ? `
                                                <div>
                                                    <span class="text-gray-400">Correct Answer:</span>
                                                    <span class="text-green-400 font-semibold ml-2">
                                                        ${question.options[question.correct]}
                                                    </span>
                                                </div>
                                            ` : ''}
                                            <div class="text-gray-400 mt-3">
                                                <strong>Explanation:</strong> ${question.explanation}
                                            </div>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex justify-center gap-4">
                        <button id="retakeTestButton" class="px-8 py-4 bg-gradient-to-r ${category.color} text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                            Retake Test
                        </button>
                        <button id="backToTestsButton" class="px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-semibold transition-all">
                            Back to Tests
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    getGrade(percentage) {
        if (percentage >= 90) {
            return { emoji: '🏆', message: 'Outstanding Performance!', color: 'text-yellow-400' };
        } else if (percentage >= 80) {
            return { emoji: '🎉', message: 'Excellent Work!', color: 'text-green-400' };
        } else if (percentage >= 70) {
            return { emoji: '👍', message: 'Good Job!', color: 'text-blue-400' };
        } else if (percentage >= 60) {
            return { emoji: '👌', message: 'Not Bad!', color: 'text-orange-400' };
        } else {
            return { emoji: '📚', message: 'Keep Practicing!', color: 'text-red-400' };
        }
    }

    attachEventListeners() {
        // Category selection
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const categoryId = e.currentTarget.dataset.category;
                this.startTest(categoryId);
            });
        });

        // Option selection
        document.querySelectorAll('.option-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const optionIndex = parseInt(e.currentTarget.dataset.option);
                this.selectAnswer(optionIndex);
            });
        });

        // Navigation buttons
        const prevButton = document.getElementById('previousButton');
        const nextButton = document.getElementById('nextButton');
        
        if (prevButton) {
            prevButton.addEventListener('click', () => this.previousQuestion());
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', () => this.nextQuestion());
        }

        // Exit test
        const exitButton = document.getElementById('exitTestButton');
        if (exitButton) {
            exitButton.addEventListener('click', () => this.exitTest());
        }

        // Question navigator
        document.querySelectorAll('.question-nav-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const questionIndex = parseInt(e.currentTarget.dataset.questionNav);
                this.goToQuestion(questionIndex);
            });
        });

        // Result screen buttons
        const retakeButton = document.getElementById('retakeTestButton');
        const backButton = document.getElementById('backToTestsButton');
        
        if (retakeButton) {
            retakeButton.addEventListener('click', () => this.retakeTest());
        }
        
        if (backButton) {
            backButton.addEventListener('click', () => this.backToTests());
        }
    }

    async startTest(categoryId) {
        this.selectedCategory = categoryId;
        this.isTestActive = true;
        this.currentQuestionIndex = 0;
        this.selectedAnswer = null;
        this.score = 0;
        this.answeredQuestions = [];
        
        const category = this.categories.find(cat => cat.id === categoryId);
        this.timeLeft = category.duration * 60;
        
        // Re-render first to show the test interface
        this.rerender();
        
        // Start camera if enabled
        if (this.settings.camera) {
            try {
                await this.camera.start();
                toastManager.success('Camera enabled for proctoring');
            } catch (error) {
                console.error('Camera start error:', error);
                toastManager.warning('Camera could not be started. Continuing without camera.');
            }
        }
        
        // Start timer if enabled
        if (this.settings.timer) {
            this.timer.start(category.duration * 60, () => {
                // Time's up callback
                toastManager.warning('Time is up!');
                this.finishTest();
            });
        }
        
        toastManager.show(`Started ${category.name} test. Good luck!`, 'info');
    }

    selectAnswer(optionIndex) {
        this.selectedAnswer = optionIndex;
        
        // Update UI
        document.querySelectorAll('.option-button').forEach((button, index) => {
            if (index === optionIndex) {
                button.classList.add('border-blue-500', 'bg-blue-500/20');
                button.classList.remove('border-gray-600/50');
            } else {
                button.classList.remove('border-blue-500', 'bg-blue-500/20');
                button.classList.add('border-gray-600/50');
            }
        });
        
        // Enable next button
        const nextButton = document.getElementById('nextButton');
        if (nextButton) {
            nextButton.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    }

    nextQuestion() {
        if (this.selectedAnswer === null) return;
        
        // Record answer
        const category = this.categories.find(cat => cat.id === this.selectedCategory);
        
        if (!this.answeredQuestions.includes(this.currentQuestionIndex)) {
            this.answeredQuestions.push(this.currentQuestionIndex);
        }
        
        if (this.currentQuestionIndex === category.questions.length - 1) {
            // Finish test
            this.finishTest();
        } else {
            // Next question
            this.currentQuestionIndex++;
            this.selectedAnswer = null;
            this.rerender();
        }
    }

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.selectedAnswer = null;
            this.rerender();
        }
    }

    goToQuestion(questionIndex) {
        this.currentQuestionIndex = questionIndex;
        this.selectedAnswer = null;
        this.rerender();
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            
            // Update timer display
            const timerElement = document.querySelector('.text-2xl.font-bold');
            if (timerElement && this.timeLeft >= 0) {
                timerElement.textContent = `${Math.floor(this.timeLeft / 60)}:${(this.timeLeft % 60).toString().padStart(2, '0')}`;
            }
            
            if (this.timeLeft <= 0) {
                this.finishTest();
            }
        }, 1000);
    }

    finishTest() {
        clearInterval(this.timerInterval);
        
        // Stop camera and timer
        if (this.camera) {
            this.camera.stop();
        }
        if (this.timer) {
            this.timer.stop();
        }
        
        const category = this.categories.find(cat => cat.id === this.selectedCategory);
        const answers = new Array(category.questions.length).fill(null);
        
        // Calculate results (simplified for demo)
        let correctAnswers = 0;
        category.questions.forEach((question, index) => {
            // Simulate answered questions for demo
            const randomAnswer = Math.floor(Math.random() * question.options.length);
            answers[index] = randomAnswer;
            if (randomAnswer === question.correct) {
                correctAnswers++;
            }
        });
        
        const results = {
            totalQuestions: category.questions.length,
            correctAnswers: correctAnswers,
            incorrectAnswers: category.questions.length - correctAnswers,
            answers: answers,
            timeSpent: (category.duration * 60) - this.timeLeft
        };
        
        this.showResults(results);
    }

    showResults(results) {
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.innerHTML = this.renderResultScreen(results);
            this.attachEventListeners();
        }
    }

    exitTest() {
        if (confirm('Are you sure you want to exit the test? Your progress will be lost.')) {
            clearInterval(this.timerInterval);
            this.isTestActive = false;
            this.rerender();
        }
    }

    retakeTest() {
        this.startTest(this.selectedCategory);
    }

    backToTests() {
        this.isTestActive = false;
        this.selectedCategory = null;
        this.rerender();
    }

    handleSettingsChange(settings) {
        // Handle camera
        if (settings.camera && this.isTestActive) {
            this.camera.activate().then(() => {
                const overlaysContainer = document.getElementById('testOverlaysContainer');
                if (overlaysContainer) {
                    overlaysContainer.innerHTML += this.camera.render();
                    this.camera.attachEventListeners();
                }
            });
        } else {
            this.camera.deactivate();
        }

        // Handle timer (already integrated)
        // Timer functionality handled separately
    }

    mountOverlays() {
        const mainContent = document.getElementById('main-content');
        if (!mainContent) return;

        // Add overlays container if not exists
        let overlaysContainer = document.getElementById('testOverlaysContainer');
        if (!overlaysContainer) {
            overlaysContainer = document.createElement('div');
            overlaysContainer.id = 'testOverlaysContainer';
            overlaysContainer.className = 'fixed inset-0 pointer-events-none';
            overlaysContainer.style.zIndex = '1000';
            mainContent.appendChild(overlaysContainer);
        }

        // Mount settings button
        this.settingsButton.mount(overlaysContainer);

        // Mount camera if enabled
        const settings = this.settingsPanel.getSettings();
        if (settings.camera && this.isTestActive) {
            this.camera.activate().then(() => {
                overlaysContainer.innerHTML += this.camera.render();
                this.camera.attachEventListeners();
            });
        }
    }

    rerender() {
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.innerHTML = this.render();
            this.attachEventListeners();
            if (this.isTestActive) {
                this.mountOverlays();
            }
        }
    }
}