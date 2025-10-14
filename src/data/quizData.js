export const quizData = {
  dsa: {
    1: [
      {
        question: 'What is the time complexity of accessing an element in an array by index?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
        correct: 0,
        explanation: 'Array access by index is constant time O(1) because memory addresses are calculated directly.'
      },
      {
        question: 'Which notation describes the worst-case scenario of an algorithm?',
        options: ['Theta (Θ)', 'Omega (Ω)', 'Big-O (O)', 'Little-o (o)'],
        correct: 2,
        explanation: 'Big-O notation represents the upper bound or worst-case time complexity.'
      },
      {
        question: 'What does space complexity measure?',
        options: ['Execution time', 'Memory usage', 'Input size', 'Number of operations'],
        correct: 1,
        explanation: 'Space complexity measures the amount of memory an algorithm uses relative to input size.'
      }
    ],
    5: [
      {
        question: 'What is the time complexity of searching in a linked list?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correct: 2,
        explanation: 'Searching requires traversing the list, so it takes O(n) time in the worst case.'
      },
      {
        question: 'How do you detect a cycle in a linked list?',
        options: ['Hash table', 'Two pointers (fast & slow)', 'Recursion', 'Both A and B'],
        correct: 3,
        explanation: 'Both hash tables and Floyd\'s cycle detection (two pointers) can detect cycles.'
      }
    ]
  }
};

export const getQuizByLevel = (courseId, levelId) => {
  return quizData[courseId]?.[levelId] || [];
};
