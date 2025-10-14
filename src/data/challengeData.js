/**
 * @file Challenge Data Pool - Daily Quest Challenges
 * Contains all questions, puzzles, and challenges for the Daily Quest system
 * Each challenge type has 10+ items to ensure variety
 */

// ============================================
// QUIZ MATCH CHALLENGES (Multiple Choice)
// ============================================
export const quizQuestions = [
  // Easy Questions
  { 
    question: 'Time complexity of binary search', 
    answer: 'O(log n)', 
    options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
    difficulty: 'easy',
    category: 'DSA'
  },
  { 
    question: 'TCP stands for', 
    answer: 'Transmission Control Protocol', 
    options: ['Transfer Control Protocol', 'Transmission Control Protocol', 'Transport Control Process', 'Technical Control Protocol'],
    difficulty: 'easy',
    category: 'CN'
  },
  { 
    question: 'SQL is a', 
    answer: 'Query Language', 
    options: ['Programming Language', 'Query Language', 'Markup Language', 'Scripting Language'],
    difficulty: 'easy',
    category: 'DBMS'
  },
  { 
    question: 'RAM is', 
    answer: 'Volatile Memory', 
    options: ['Non-volatile Memory', 'Volatile Memory', 'Secondary Storage', 'Cache Memory'],
    difficulty: 'easy',
    category: 'COA'
  },
  { 
    question: 'HTML stands for', 
    answer: 'HyperText Markup Language', 
    options: ['HighText Machine Language', 'HyperText Markup Language', 'HyperTool Multi Language', 'Home Tool Markup Language'],
    difficulty: 'easy',
    category: 'Web'
  },
  
  // Medium Questions
  { 
    question: 'Which sorting algorithm has best average-case time complexity?', 
    answer: 'Merge Sort', 
    options: ['Bubble Sort', 'Selection Sort', 'Merge Sort', 'Insertion Sort'],
    difficulty: 'medium',
    category: 'DSA'
  },
  { 
    question: 'In OSI model, which layer handles encryption?', 
    answer: 'Presentation Layer', 
    options: ['Application Layer', 'Session Layer', 'Presentation Layer', 'Transport Layer'],
    difficulty: 'medium',
    category: 'CN'
  },
  { 
    question: 'What is ACID in database systems?', 
    answer: 'Atomicity, Consistency, Isolation, Durability', 
    options: ['Access, Control, Isolation, Data', 'Atomicity, Consistency, Isolation, Durability', 'Auto, Create, Insert, Delete', 'Application, Code, Integration, Database'],
    difficulty: 'medium',
    category: 'DBMS'
  },
  { 
    question: 'Virtual memory is managed by', 
    answer: 'Operating System', 
    options: ['CPU', 'Operating System', 'RAM', 'Hard Disk'],
    difficulty: 'medium',
    category: 'OS'
  },
  { 
    question: 'Which data structure uses FIFO?', 
    answer: 'Queue', 
    options: ['Stack', 'Queue', 'Tree', 'Graph'],
    difficulty: 'medium',
    category: 'DSA'
  },
  
  // Hard Questions
  { 
    question: 'What is the space complexity of merge sort?', 
    answer: 'O(n)', 
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
    difficulty: 'hard',
    category: 'DSA'
  },
  { 
    question: 'In TCP, what is the 3-way handshake sequence?', 
    answer: 'SYN, SYN-ACK, ACK', 
    options: ['SYN, ACK, FIN', 'SYN, SYN-ACK, ACK', 'ACK, SYN, FIN', 'CONNECT, ACCEPT, CLOSE'],
    difficulty: 'hard',
    category: 'CN'
  },
  { 
    question: 'Which normal form eliminates transitive dependency?', 
    answer: '3NF', 
    options: ['1NF', '2NF', '3NF', 'BCNF'],
    difficulty: 'hard',
    category: 'DBMS'
  },
];

// ============================================
// CODE PUZZLE CHALLENGES (Fill in the Blank)
// ============================================
export const codePuzzles = [
  {
    id: 'puzzle-1',
    question: 'Complete the function to reverse a string:',
    language: 'python',
    code: `def reverse_string(s):
    return s[___]`,
    correctAnswer: '::-1',
    hint: 'Use Python slicing with step -1',
    difficulty: 'easy',
  },
  {
    id: 'puzzle-2',
    question: 'Complete the list comprehension to get even numbers:',
    language: 'python',
    code: `nums = [1, 2, 3, 4, 5, 6]
result = [x for x in nums if ___]`,
    correctAnswer: 'x % 2 == 0',
    hint: 'Use modulo operator to check divisibility',
    difficulty: 'easy',
  },
  {
    id: 'puzzle-3',
    question: 'Complete the function to find factorial:',
    language: 'python',
    code: `def factorial(n):
    if n == 0:
        return ___
    return n * factorial(n - 1)`,
    correctAnswer: '1',
    hint: 'What is 0! equal to?',
    difficulty: 'easy',
  },
  {
    id: 'puzzle-4',
    question: 'Complete the binary search implementation:',
    language: 'python',
    code: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = ___
        else:
            right = mid - 1`,
    correctAnswer: 'mid + 1',
    hint: 'Move the left pointer to the right of mid',
    difficulty: 'medium',
  },
  {
    id: 'puzzle-5',
    question: 'Complete the function to swap two variables:',
    language: 'python',
    code: `def swap(a, b):
    a, b = ___
    return a, b`,
    correctAnswer: 'b, a',
    hint: 'Python tuple unpacking makes this easy',
    difficulty: 'easy',
  },
  {
    id: 'puzzle-6',
    question: 'Complete the string formatting:',
    language: 'python',
    code: `name = "Alice"
age = 25
message = f"Hello, ___! You are {age} years old."`,
    correctAnswer: '{name}',
    hint: 'Use curly braces for f-string interpolation',
    difficulty: 'easy',
  },
  {
    id: 'puzzle-7',
    question: 'Complete the lambda function to square numbers:',
    language: 'python',
    code: `square = lambda x: ___
result = square(5)  # Should return 25`,
    correctAnswer: 'x ** 2',
    hint: 'Use exponentiation operator',
    difficulty: 'easy',
  },
  {
    id: 'puzzle-8',
    question: 'Complete the dictionary comprehension:',
    language: 'python',
    code: `numbers = [1, 2, 3, 4]
squared = {x: ___ for x in numbers}`,
    correctAnswer: 'x ** 2',
    hint: 'The value should be the square of the key',
    difficulty: 'medium',
  },
  {
    id: 'puzzle-9',
    question: 'Complete the class initialization:',
    language: 'python',
    code: `class Person:
    def __init__(self, name):
        ___ = name`,
    correctAnswer: 'self.name',
    hint: 'Use self to reference instance variable',
    difficulty: 'easy',
  },
  {
    id: 'puzzle-10',
    question: 'Complete the set operation to find common elements:',
    language: 'python',
    code: `set1 = {1, 2, 3, 4}
set2 = {3, 4, 5, 6}
common = set1 ___ set2`,
    correctAnswer: '&',
    hint: 'Use the intersection operator',
    difficulty: 'medium',
  },
];

// ============================================
// CS RIDDLES (Short Answer)
// ============================================
export const riddles = [
  {
    id: 'riddle-1',
    question: "I'm a data structure that follows LIFO principle. Push me, pop me, but don't overflow me. What am I?",
    correctAnswer: 'stack',
    hint: 'Think about function call management',
    difficulty: 'easy',
  },
  {
    id: 'riddle-2',
    question: "I connect millions of networks worldwide. I have no owner, yet everyone uses me. What am I?",
    correctAnswer: 'internet',
    hint: 'The global network of networks',
    difficulty: 'easy',
  },
  {
    id: 'riddle-3',
    question: "I'm a tree but have no leaves. I have a root but grow upside down. What data structure am I?",
    correctAnswer: 'tree',
    hint: 'A hierarchical data structure',
    difficulty: 'easy',
  },
  {
    id: 'riddle-4',
    question: "I can search through millions of records in seconds. I use keys and values. Hash me if you can! What am I?",
    correctAnswer: 'hashtable',
    hint: 'O(1) average lookup time',
    difficulty: 'medium',
    alternateAnswers: ['hash table', 'hash map', 'hashmap', 'dictionary']
  },
  {
    id: 'riddle-5',
    question: "I'm circular but have no end. I connect tail to head. In scheduling, I'm quite fair. What data structure am I?",
    correctAnswer: 'circular queue',
    hint: 'Used in round-robin scheduling',
    difficulty: 'medium',
    alternateAnswers: ['circular buffer', 'ring buffer']
  },
  {
    id: 'riddle-6',
    question: "I'm a number system with only two digits. Computers speak my language. What am I?",
    correctAnswer: 'binary',
    hint: '0 and 1 are my only friends',
    difficulty: 'easy',
  },
  {
    id: 'riddle-7',
    question: "I prevent database anomalies and redundancy. The higher my number, the better your schema. What am I?",
    correctAnswer: 'normalization',
    hint: '1NF, 2NF, 3NF...',
    difficulty: 'hard',
    alternateAnswers: ['normal form']
  },
  {
    id: 'riddle-8',
    question: "I'm not a thread but I run concurrently. Node.js loves me. I never block. What am I?",
    correctAnswer: 'async',
    hint: 'I use callbacks, promises, or await',
    difficulty: 'medium',
    alternateAnswers: ['asynchronous', 'async function']
  },
  {
    id: 'riddle-9',
    question: "I'm a special function that calls myself. Base case stops me from running forever. What am I?",
    correctAnswer: 'recursion',
    hint: 'Factorial and Fibonacci use me',
    difficulty: 'easy',
    alternateAnswers: ['recursive function']
  },
  {
    id: 'riddle-10',
    question: "I'm a sorting algorithm named after something you blow. I'm simple but slow. What am I?",
    correctAnswer: 'bubble sort',
    hint: 'Adjacent elements swap like bubbles rising',
    difficulty: 'easy',
    alternateAnswers: ['bubble']
  },
];

// ============================================
// LOGIC PUZZLES (Multiple Choice Riddles)
// ============================================
export const logicPuzzles = [
  {
    id: 'logic-1',
    question: 'If it takes 5 machines 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?',
    options: ['5 minutes', '20 minutes', '100 minutes', '1 minute'],
    correctAnswer: '5 minutes',
    explanation: 'Each machine makes 1 widget in 5 minutes, so 100 machines can make 100 widgets in the same 5 minutes.',
    difficulty: 'medium',
  },
  {
    id: 'logic-2',
    question: 'A programmer had 10 apples. They ate all but 3. How many apples are left?',
    options: ['7 apples', '3 apples', '0 apples', '10 apples'],
    correctAnswer: '3 apples',
    explanation: '"All but 3" means 3 apples remain.',
    difficulty: 'easy',
  },
  {
    id: 'logic-3',
    question: 'What is the next number in the sequence: 1, 1, 2, 3, 5, 8, ?',
    options: ['11', '13', '15', '10'],
    correctAnswer: '13',
    explanation: 'This is the Fibonacci sequence where each number is the sum of the previous two: 5 + 8 = 13',
    difficulty: 'easy',
  },
  {
    id: 'logic-4',
    question: 'A server crashes every 3 days. Another crashes every 4 days. If both crashed today, when will they crash together again?',
    options: ['12 days', '7 days', '24 days', '6 days'],
    correctAnswer: '12 days',
    explanation: 'The LCM (Least Common Multiple) of 3 and 4 is 12.',
    difficulty: 'medium',
  },
  {
    id: 'logic-5',
    question: 'You have 8 balls. One is slightly heavier. Using a balance scale only twice, can you find the heavy ball?',
    options: ['Yes, always', 'No, impossible', 'Only sometimes', 'Need 3 weighings'],
    correctAnswer: 'Yes, always',
    explanation: 'Divide into groups of 3, 3, and 2. First weighing narrows to 3 balls, second weighing finds the heavy one.',
    difficulty: 'hard',
  },
  {
    id: 'logic-6',
    question: 'A binary tree has 15 nodes. What is the minimum possible height?',
    options: ['3', '4', '5', '2'],
    correctAnswer: '3',
    explanation: 'A complete binary tree with height h has at most 2^(h+1) - 1 nodes. For 15 nodes: 2^4 - 1 = 15, so minimum height is 3.',
    difficulty: 'hard',
  },
  {
    id: 'logic-7',
    question: 'If DEBUG is coded as VECTOR, what is ERROR coded as?',
    options: ['FSQPS', 'DSSNQ', 'FSSPS', 'ERROS'],
    correctAnswer: 'FSSNQ',
    explanation: 'Each letter shifts by +1 in the alphabet, but this is a trick question - the actual pattern needs analysis.',
    difficulty: 'hard',
  },
  {
    id: 'logic-8',
    question: 'A clock shows 3:15. What is the angle between hour and minute hands?',
    options: ['0°', '7.5°', '90°', '82.5°'],
    correctAnswer: '7.5°',
    explanation: 'At 3:15, minute hand is at 90° (pointing at 3), hour hand is at 97.5° (3 + 15/60 * 30°), difference is 7.5°.',
    difficulty: 'hard',
  },
  {
    id: 'logic-9',
    question: 'In binary, what is 1010 + 1011?',
    options: ['10101', '10001', '11111', '10100'],
    correctAnswer: '10101',
    explanation: '1010 (10) + 1011 (11) = 10101 (21 in decimal)',
    difficulty: 'medium',
  },
  {
    id: 'logic-10',
    question: 'How many times does the digit 1 appear in numbers from 1 to 100?',
    options: ['20', '11', '21', '19'],
    correctAnswer: '21',
    explanation: '11 times in units place (1,11,21,...,91) + 10 times in tens place (10-19) = 21 total (11 is counted twice)',
    difficulty: 'medium',
  },
];

// ============================================
// OUTPUT PREDICTOR (Guess the Output)
// ============================================
export const outputPredictors = [
  {
    id: 'output-1',
    question: 'What will this Python code output?',
    code: `x = [1, 2, 3]
y = x
y.append(4)
print(len(x))`,
    options: ['3', '4', 'Error', 'None'],
    correctAnswer: '4',
    explanation: 'Lists are mutable and y references the same list as x. When y.append(4) is called, x also has 4 elements.',
    difficulty: 'medium',
    language: 'python',
  },
  {
    id: 'output-2',
    question: 'What is the output of this code?',
    code: `print(type(5/2))`,
    options: ['<class "int">', '<class "float">', '<class "double">', 'Error'],
    correctAnswer: '<class "float">',
    explanation: 'In Python 3, division (/) always returns a float, even for whole number results.',
    difficulty: 'easy',
    language: 'python',
  },
  {
    id: 'output-3',
    question: 'What will be printed?',
    code: `def func(a, b=[]):
    b.append(a)
    return b

print(func(1))
print(func(2))`,
    options: ['[1]\\n[2]', '[1]\\n[1, 2]', '[1, 2]\\n[1, 2]', 'Error'],
    correctAnswer: '[1]\\n[1, 2]',
    explanation: 'Default mutable arguments are evaluated once at function definition, not each call. The list persists across calls.',
    difficulty: 'hard',
    language: 'python',
  },
  {
    id: 'output-4',
    question: 'What is the result?',
    code: `x = "123"
y = "456"
print(x + y)`,
    options: ['579', '123456', 'Error', '9'],
    correctAnswer: '123456',
    explanation: 'String concatenation joins the strings, not arithmetic addition.',
    difficulty: 'easy',
    language: 'python',
  },
  {
    id: 'output-5',
    question: 'What will this output?',
    code: `dict1 = {'a': 1, 'b': 2}
dict2 = dict1
dict2['c'] = 3
print(len(dict1))`,
    options: ['2', '3', '1', 'Error'],
    correctAnswer: '3',
    explanation: 'dict2 is a reference to dict1, not a copy. Modifications to dict2 affect dict1.',
    difficulty: 'medium',
    language: 'python',
  },
  {
    id: 'output-6',
    question: 'What is printed?',
    code: `for i in range(3):
    print(i, end=' ')`,
    options: ['0 1 2', '1 2 3', '0 1 2 3', '1 2'],
    correctAnswer: '0 1 2',
    explanation: 'range(3) generates 0, 1, 2 (excludes the stop value). end=" " prints on same line with spaces.',
    difficulty: 'easy',
    language: 'python',
  },
  {
    id: 'output-7',
    question: 'What will be the output?',
    code: `a = [1, 2, 3]
b = a[:]
b.append(4)
print(a)`,
    options: ['[1, 2, 3]', '[1, 2, 3, 4]', '[]', 'Error'],
    correctAnswer: '[1, 2, 3]',
    explanation: 'a[:] creates a shallow copy of the list. Changes to b do not affect a.',
    difficulty: 'medium',
    language: 'python',
  },
  {
    id: 'output-8',
    question: 'What is the result?',
    code: `print(bool(''))
print(bool('False'))`,
    options: ['False\\nFalse', 'True\\nTrue', 'False\\nTrue', 'True\\nFalse'],
    correctAnswer: 'False\\nTrue',
    explanation: 'Empty string is falsy, but any non-empty string (including "False") is truthy.',
    difficulty: 'medium',
    language: 'python',
  },
  {
    id: 'output-9',
    question: 'What will this print?',
    code: `x = {1, 2, 3}
y = {3, 4, 5}
print(x & y)`,
    options: ['{3}', '{1, 2, 4, 5}', '{1, 2, 3, 4, 5}', 'Error'],
    correctAnswer: '{3}',
    explanation: '& operator finds the intersection of two sets (common elements).',
    difficulty: 'medium',
    language: 'python',
  },
  {
    id: 'output-10',
    question: 'What is the output?',
    code: `def mystery(n):
    if n <= 1:
        return n
    return mystery(n-1) + mystery(n-2)

print(mystery(5))`,
    options: ['5', '8', '13', '3'],
    correctAnswer: '5',
    explanation: 'This is the Fibonacci function. mystery(5) = fib(5) = 5 (sequence: 0,1,1,2,3,5)',
    difficulty: 'hard',
    language: 'python',
  },
];

// ============================================
// DEBUG QUEST (Find the Bug)
// ============================================
export const debugQuests = [
  {
    id: 'debug-1',
    question: 'Find the bug in this code that should print even numbers:',
    code: `for i in range(10):
    if i % 2 = 0:
        print(i)`,
    options: [
      'Use == instead of =',
      'range should be range(11)',
      'Need colon after print',
      'No bug'
    ],
    correctAnswer: 'Use == instead of =',
    explanation: '= is assignment, == is comparison. Should be: if i % 2 == 0:',
    bugLine: 2,
    difficulty: 'easy',
    language: 'python',
  },
  {
    id: 'debug-2',
    question: 'What is wrong with this function?',
    code: `def calculate_average(numbers):
    total = 0
    for num in numbers:
        total += num
    return total / len(numbers)

result = calculate_average([])`,
    options: [
      'Division by zero error',
      'total not initialized',
      'Wrong indentation',
      'No bug'
    ],
    correctAnswer: 'Division by zero error',
    explanation: 'Empty list has length 0, causing ZeroDivisionError. Need to check if list is empty first.',
    bugLine: 5,
    difficulty: 'medium',
    language: 'python',
  },
  {
    id: 'debug-3',
    question: 'Find the issue in this string reversal:',
    code: `def reverse_string(s):
    s[0], s[-1] = s[-1], s[0]
    return s

print(reverse_string("hello"))`,
    options: [
      'Strings are immutable',
      'Wrong indexing',
      'Missing return statement',
      'No bug'
    ],
    correctAnswer: 'Strings are immutable',
    explanation: 'Cannot modify string characters in-place. Strings are immutable in Python.',
    bugLine: 2,
    difficulty: 'medium',
    language: 'python',
  },
  {
    id: 'debug-4',
    question: 'What\'s wrong with this factorial function?',
    code: `def factorial(n):
    if n == 0:
        return 1
    return n * factorial(n)`,
    options: [
      'Infinite recursion - should be factorial(n-1)',
      'Wrong base case',
      'Missing else statement',
      'No bug'
    ],
    correctAnswer: 'Infinite recursion - should be factorial(n-1)',
    explanation: 'factorial(n) calls itself with same value, causing infinite recursion. Should be factorial(n-1).',
    bugLine: 4,
    difficulty: 'easy',
    language: 'python',
  },
  {
    id: 'debug-5',
    question: 'Identify the problem in this list comprehension:',
    code: `numbers = [1, 2, 3, 4, 5]
squared = [x^2 for x in numbers]
print(squared)`,
    options: [
      'Use ** for exponentiation, not ^',
      'Wrong syntax for list comprehension',
      'Missing parentheses',
      'No bug'
    ],
    correctAnswer: 'Use ** for exponentiation, not ^',
    explanation: '^ is XOR operator in Python, not exponentiation. Use x**2 for squaring.',
    bugLine: 2,
    difficulty: 'medium',
    language: 'python',
  },
  {
    id: 'debug-6',
    question: 'Find the bug in this dictionary code:',
    code: `student = {'name': 'Alice', 'age': 20}
print(student['grade'])`,
    options: [
      'KeyError - grade does not exist',
      'Wrong syntax for dictionary access',
      'Need to use .get() method',
      'No bug'
    ],
    correctAnswer: 'KeyError - grade does not exist',
    explanation: 'Accessing non-existent key raises KeyError. Use .get() or check key existence first.',
    bugLine: 2,
    difficulty: 'easy',
    language: 'python',
  },
  {
    id: 'debug-7',
    question: 'What is the issue here?',
    code: `def add_to_list(item, my_list=[]):
    my_list.append(item)
    return my_list

print(add_to_list(1))
print(add_to_list(2))`,
    options: [
      'Mutable default argument - list persists',
      'Wrong function signature',
      'append() returns None',
      'No bug'
    ],
    correctAnswer: 'Mutable default argument - list persists',
    explanation: 'Default mutable arguments are shared across function calls. Use None as default and create new list inside.',
    bugLine: 1,
    difficulty: 'hard',
    language: 'python',
  },
  {
    id: 'debug-8',
    question: 'Spot the error in this loop:',
    code: `i = 0
while i < 5
    print(i)
    i += 1`,
    options: [
      'Missing colon after while condition',
      'Wrong loop syntax',
      'i not incremented',
      'No bug'
    ],
    correctAnswer: 'Missing colon after while condition',
    explanation: 'Python requires colon after while condition: while i < 5:',
    bugLine: 2,
    difficulty: 'easy',
    language: 'python',
  },
  {
    id: 'debug-9',
    question: 'Find the problem in this code:',
    code: `numbers = [1, 2, 3, 4, 5]
for i in range(len(numbers)):
    if numbers[i] % 2 == 0:
        numbers.remove(numbers[i])
print(numbers)`,
    options: [
      'Modifying list while iterating causes skipping',
      'Wrong range syntax',
      'Incorrect modulo check',
      'No bug'
    ],
    correctAnswer: 'Modifying list while iterating causes skipping',
    explanation: 'Removing items shifts indices, causing elements to be skipped. Create new list or iterate backwards.',
    bugLine: 4,
    difficulty: 'hard',
    language: 'python',
  },
  {
    id: 'debug-10',
    question: 'What is wrong with this try-except?',
    code: `try:
    x = 10 / 0
except:
    print("Error occurred")
finally
    print("Done")`,
    options: [
      'Missing colon after finally',
      'Wrong exception handling',
      'try block is empty',
      'No bug'
    ],
    correctAnswer: 'Missing colon after finally',
    explanation: 'Python requires colon after finally: finally:',
    bugLine: 5,
    difficulty: 'easy',
    language: 'python',
  },
];

// ============================================
// CONCEPT MATCH (Drag and Drop Matching)
// ============================================
export const conceptMatches = [
  {
    id: 'match-1',
    title: 'Data Structure Characteristics',
    pairs: [
      { concept: 'Stack', definition: 'LIFO - Last In First Out' },
      { concept: 'Queue', definition: 'FIFO - First In First Out' },
      { concept: 'Hash Table', definition: 'O(1) average lookup time' },
      { concept: 'Linked List', definition: 'Dynamic size with pointers' },
    ],
    difficulty: 'easy',
    category: 'DSA',
  },
  {
    id: 'match-2',
    title: 'Programming Paradigms',
    pairs: [
      { concept: 'OOP', definition: 'Objects and Classes' },
      { concept: 'Functional', definition: 'Pure functions, immutability' },
      { concept: 'Procedural', definition: 'Step-by-step instructions' },
      { concept: 'Declarative', definition: 'What to do, not how' },
    ],
    difficulty: 'medium',
    category: 'Programming',
  },
  {
    id: 'match-3',
    title: 'Network Protocols',
    pairs: [
      { concept: 'HTTP', definition: 'Web page transfer' },
      { concept: 'FTP', definition: 'File transfer' },
      { concept: 'SMTP', definition: 'Email sending' },
      { concept: 'DNS', definition: 'Domain name resolution' },
    ],
    difficulty: 'medium',
    category: 'CN',
  },
  {
    id: 'match-4',
    title: 'Database Operations',
    pairs: [
      { concept: 'SELECT', definition: 'Retrieve data from table' },
      { concept: 'INSERT', definition: 'Add new records' },
      { concept: 'UPDATE', definition: 'Modify existing records' },
      { concept: 'DELETE', definition: 'Remove records' },
    ],
    difficulty: 'easy',
    category: 'DBMS',
  },
  {
    id: 'match-5',
    title: 'Time Complexities',
    pairs: [
      { concept: 'O(1)', definition: 'Constant time' },
      { concept: 'O(log n)', definition: 'Logarithmic time' },
      { concept: 'O(n)', definition: 'Linear time' },
      { concept: 'O(n²)', definition: 'Quadratic time' },
    ],
    difficulty: 'medium',
    category: 'DSA',
  },
  {
    id: 'match-6',
    title: 'OS Concepts',
    pairs: [
      { concept: 'Process', definition: 'Program in execution' },
      { concept: 'Thread', definition: 'Lightweight process unit' },
      { concept: 'Deadlock', definition: 'Circular wait for resources' },
      { concept: 'Semaphore', definition: 'Synchronization primitive' },
    ],
    difficulty: 'hard',
    category: 'OS',
  },
  {
    id: 'match-7',
    title: 'Web Technologies',
    pairs: [
      { concept: 'HTML', definition: 'Structure and content' },
      { concept: 'CSS', definition: 'Styling and layout' },
      { concept: 'JavaScript', definition: 'Interactivity and logic' },
      { concept: 'React', definition: 'Component-based UI library' },
    ],
    difficulty: 'easy',
    category: 'Web',
  },
  {
    id: 'match-8',
    title: 'Sorting Algorithms',
    pairs: [
      { concept: 'Bubble Sort', definition: 'O(n²) - Adjacent swaps' },
      { concept: 'Quick Sort', definition: 'O(n log n) - Divide and conquer' },
      { concept: 'Merge Sort', definition: 'O(n log n) - Stable sort' },
      { concept: 'Heap Sort', definition: 'O(n log n) - Heap data structure' },
    ],
    difficulty: 'hard',
    category: 'DSA',
  },
  {
    id: 'match-9',
    title: 'Python Data Types',
    pairs: [
      { concept: 'list', definition: 'Mutable ordered sequence' },
      { concept: 'tuple', definition: 'Immutable ordered sequence' },
      { concept: 'dict', definition: 'Key-value pairs' },
      { concept: 'set', definition: 'Unordered unique elements' },
    ],
    difficulty: 'easy',
    category: 'Python',
  },
  {
    id: 'match-10',
    title: 'Computer Architecture',
    pairs: [
      { concept: 'ALU', definition: 'Arithmetic Logic Unit' },
      { concept: 'CU', definition: 'Control Unit' },
      { concept: 'Register', definition: 'Fastest memory in CPU' },
      { concept: 'Cache', definition: 'Fast intermediate memory' },
    ],
    difficulty: 'medium',
    category: 'COA',
  },
];

// ============================================
// CHALLENGE TYPE METADATA
// ============================================
export const challengeTypes = [
  {
    id: 'quiz-match',
    name: 'Quiz Match',
    icon: '🎯',
    description: 'Match CS concepts with their definitions',
    color: 'from-purple-500 to-pink-500',
    component: 'QuizMatch',
  },
  {
    id: 'code-puzzle',
    name: 'Code Puzzle',
    icon: '🧩',
    description: 'Fill in the missing code',
    color: 'from-blue-500 to-cyan-500',
    component: 'CodePuzzle',
  },
  {
    id: 'cs-riddle',
    name: 'CS Riddle',
    icon: '🤔',
    description: 'Solve computer science brain teasers',
    color: 'from-green-500 to-emerald-500',
    component: 'CSRiddle',
  },
  {
    id: 'logic-puzzle',
    name: 'Logic Puzzle',
    icon: '🧠',
    description: 'Solve logical and mathematical puzzles',
    color: 'from-orange-500 to-red-500',
    component: 'LogicPuzzle',
  },
  {
    id: 'output-predictor',
    name: 'Output Predictor',
    icon: '🔮',
    description: 'Guess the output of code snippets',
    color: 'from-indigo-500 to-purple-500',
    component: 'OutputPredictor',
  },
  {
    id: 'debug-quest',
    name: 'Debug Quest',
    icon: '🐛',
    description: 'Find and fix bugs in code',
    color: 'from-red-500 to-pink-500',
    component: 'DebugQuest',
  },
  {
    id: 'concept-match',
    name: 'Concept Match',
    icon: '🔗',
    description: 'Match concepts with examples',
    color: 'from-teal-500 to-green-500',
    component: 'ConceptMatch',
  },
];

// ============================================
// REWARD CALCULATION
// ============================================
export const calculateReward = (difficulty, challengeType) => {
  const baseRewards = {
    easy: { xp: 50, coins: 10 },
    medium: { xp: 100, coins: 20 },
    hard: { xp: 150, coins: 30 },
  };

  const typeMultiplier = {
    'quiz-match': 1.0,
    'code-puzzle': 1.2,
    'cs-riddle': 1.1,
    'logic-puzzle': 1.3,
    'output-predictor': 1.2,
    'debug-quest': 1.4,
    'concept-match': 1.1,
  };

  const base = baseRewards[difficulty] || baseRewards.medium;
  const multiplier = typeMultiplier[challengeType] || 1.0;

  return {
    xp: Math.round(base.xp * multiplier),
    coins: Math.round(base.coins * multiplier),
  };
};
