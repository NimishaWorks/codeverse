// Course data for CodeVerse
export const courses = [
  {
    id: 'dsa',
    name: 'Data Structures & Algorithms',
    icon: '📊',
    color: 'from-purple-500 to-pink-500',
    description: 'Master DSA with 20 curated levels from basics to advanced',
    totalLevels: 20,
    levels: [
      { id: 1, title: 'Foundations', focus: 'Big-O, Complexity', status: 'completed' },
      { id: 2, title: 'Arrays', focus: 'Two Pointers, Sliding Window', status: 'completed' },
      { id: 3, title: 'Strings', focus: 'Pattern Matching', status: 'completed' },
      { id: 4, title: 'Recursion', focus: 'Backtracking', status: 'completed' },
      { id: 5, title: 'Linked Lists', focus: 'Fast & Slow Pointers', status: 'active' },
      { id: 6, title: 'Stacks & Queues', focus: 'Monotonic Structures', status: 'locked' },
      { id: 7, title: 'Trees', focus: 'DFS, BFS', status: 'locked' },
      { id: 8, title: 'Binary Search Trees', focus: 'Traversals', status: 'locked' },
      { id: 9, title: 'Heaps', focus: 'Priority Queues', status: 'locked' },
      { id: 10, title: 'Graphs', focus: 'Traversal, Shortest Path', status: 'locked' },
      { id: 11, title: 'Dynamic Programming I', focus: 'Memoization', status: 'locked' },
      { id: 12, title: 'Dynamic Programming II', focus: 'Tabulation', status: 'locked' },
      { id: 13, title: 'Greedy', focus: 'Exchange Arguments', status: 'locked' },
      { id: 14, title: 'Divide & Conquer', focus: 'Master Theorem', status: 'locked' },
      { id: 15, title: 'Bit Manipulation', focus: 'Trick Patterns', status: 'locked' },
      { id: 16, title: 'Advanced Graphs', focus: 'Union-Find, MST', status: 'locked' },
      { id: 17, title: 'Tries', focus: 'String Search', status: 'locked' },
      { id: 18, title: 'Segment Trees', focus: 'Range Queries', status: 'locked' },
      { id: 19, title: 'Practice Arena', focus: 'Timed Quests', status: 'locked' },
      { id: 20, title: 'Capstone Raid', focus: 'Systems Challenge', status: 'locked' }
    ]
  },
  {
    id: 'os',
    name: 'Operating Systems',
    icon: '💻',
    color: 'from-blue-500 to-cyan-500',
    description: 'Learn process scheduling, memory management, and deadlock',
    totalLevels: 20,
    levels: [
      { id: 1, title: 'OS Basics', focus: 'Kernel, Shell, System Calls', status: 'completed' },
      { id: 2, title: 'Processes', focus: 'PCB, States, Context Switch', status: 'completed' },
      { id: 3, title: 'Threads', focus: 'Multithreading Models', status: 'active' },
      { id: 4, title: 'CPU Scheduling', focus: 'FCFS, SJF, RR', status: 'locked' },
      { id: 5, title: 'Synchronization', focus: 'Mutex, Semaphores', status: 'locked' },
      { id: 6, title: 'Deadlocks', focus: 'Prevention, Avoidance', status: 'locked' },
      { id: 7, title: 'Memory Management', focus: 'Paging, Segmentation', status: 'locked' },
      { id: 8, title: 'Virtual Memory', focus: 'Page Replacement', status: 'locked' },
      { id: 9, title: 'File Systems', focus: 'FAT, NTFS, ext4', status: 'locked' },
      { id: 10, title: 'Disk Scheduling', focus: 'FCFS, SSTF, SCAN', status: 'locked' },
      { id: 11, title: 'I/O Systems', focus: 'Buffers, Spooling', status: 'locked' },
      { id: 12, title: 'Security', focus: 'Authentication, Access Control', status: 'locked' },
      { id: 13, title: 'Linux Basics', focus: 'Commands, Shell Scripts', status: 'locked' },
      { id: 14, title: 'Windows Internals', focus: 'Registry, Services', status: 'locked' },
      { id: 15, title: 'Virtualization', focus: 'Hypervisors, VMs', status: 'locked' },
      { id: 16, title: 'Distributed OS', focus: 'Clustering, Load Balancing', status: 'locked' },
      { id: 17, title: 'Real-Time OS', focus: 'Scheduling, Priorities', status: 'locked' },
      { id: 18, title: 'System Performance', focus: 'Profiling, Tuning', status: 'locked' },
      { id: 19, title: 'OS Lab Challenge', focus: 'Build Mini OS', status: 'locked' },
      { id: 20, title: 'Final Project', focus: 'Custom Scheduler', status: 'locked' }
    ]
  },
  {
    id: 'cn',
    name: 'Computer Networks',
    icon: '🌐',
    color: 'from-green-500 to-emerald-500',
    description: 'Master TCP/IP, DNS, routing protocols through interactive simulations',
    totalLevels: 20,
    levels: [
      { id: 1, title: 'Network Basics', focus: 'LAN, WAN, Topologies', status: 'completed' },
      { id: 2, title: 'OSI Model', focus: '7 Layers Explained', status: 'active' },
      { id: 3, title: 'TCP/IP Suite', focus: 'Protocols Overview', status: 'locked' },
      { id: 4, title: 'Physical Layer', focus: 'Cables, Signals', status: 'locked' },
      { id: 5, title: 'Data Link Layer', focus: 'MAC, Ethernet', status: 'locked' },
      { id: 6, title: 'Network Layer', focus: 'IP Addressing, Subnetting', status: 'locked' },
      { id: 7, title: 'Routing Protocols', focus: 'RIP, OSPF, BGP', status: 'locked' },
      { id: 8, title: 'Transport Layer', focus: 'TCP vs UDP', status: 'locked' },
      { id: 9, title: 'Application Layer', focus: 'HTTP, FTP, DNS', status: 'locked' },
      { id: 10, title: 'Network Security', focus: 'Firewalls, VPN', status: 'locked' },
      { id: 11, title: 'Cryptography', focus: 'SSL/TLS, Encryption', status: 'locked' },
      { id: 12, title: 'Wireless Networks', focus: 'WiFi, Bluetooth', status: 'locked' },
      { id: 13, title: 'Network Devices', focus: 'Routers, Switches, Hubs', status: 'locked' },
      { id: 14, title: 'IPv6', focus: 'Next Generation IP', status: 'locked' },
      { id: 15, title: 'Network Management', focus: 'SNMP, Monitoring', status: 'locked' },
      { id: 16, title: 'Cloud Networking', focus: 'SDN, Virtual Networks', status: 'locked' },
      { id: 17, title: 'IoT Networks', focus: 'MQTT, CoAP', status: 'locked' },
      { id: 18, title: 'Network Troubleshooting', focus: 'Ping, Traceroute', status: 'locked' },
      { id: 19, title: 'Packet Analysis', focus: 'Wireshark Labs', status: 'locked' },
      { id: 20, title: 'Network Capstone', focus: 'Design Enterprise Network', status: 'locked' }
    ]
  },
  {
    id: 'coa',
    name: 'Computer Organization & Architecture',
    icon: '🔧',
    color: 'from-orange-500 to-red-500',
    description: 'Understand CPU, memory hierarchy, and instruction sets',
    totalLevels: 20,
    levels: [
      { id: 1, title: 'Digital Logic', focus: 'Gates, Circuits', status: 'completed' },
      { id: 2, title: 'Number Systems', focus: 'Binary, Hex, Conversions', status: 'active' },
      { id: 3, title: 'Boolean Algebra', focus: 'Logic Simplification', status: 'locked' },
      { id: 4, title: 'Combinational Circuits', focus: 'Adders, Multiplexers', status: 'locked' },
      { id: 5, title: 'Sequential Circuits', focus: 'Flip-Flops, Counters', status: 'locked' },
      { id: 6, title: 'CPU Architecture', focus: 'ALU, Registers, Control Unit', status: 'locked' },
      { id: 7, title: 'Instruction Set', focus: 'RISC vs CISC', status: 'locked' },
      { id: 8, title: 'Assembly Language', focus: 'x86, ARM Basics', status: 'locked' },
      { id: 9, title: 'Pipelining', focus: 'Hazards, Stalls', status: 'locked' },
      { id: 10, title: 'Memory Hierarchy', focus: 'Cache, RAM, ROM', status: 'locked' },
      { id: 11, title: 'Cache Memory', focus: 'Mapping, Replacement', status: 'locked' },
      { id: 12, title: 'Virtual Memory', focus: 'TLB, Page Tables', status: 'locked' },
      { id: 13, title: 'I/O Organization', focus: 'Interrupts, DMA', status: 'locked' },
      { id: 14, title: 'Bus Architecture', focus: 'System Bus, Data Transfer', status: 'locked' },
      { id: 15, title: 'Parallel Processing', focus: 'Multi-core, GPU', status: 'locked' },
      { id: 16, title: 'Performance Metrics', focus: 'CPI, Throughput', status: 'locked' },
      { id: 17, title: 'Computer Arithmetic', focus: 'Floating Point, ALU Design', status: 'locked' },
      { id: 18, title: 'Advanced Topics', focus: 'Superscalar, VLIW', status: 'locked' },
      { id: 19, title: 'Embedded Systems', focus: 'Microcontrollers', status: 'locked' },
      { id: 20, title: 'CPU Design Project', focus: 'Build Simple Processor', status: 'locked' }
    ]
  },
  {
    id: 'dbms',
    name: 'Database Management Systems',
    icon: '🗄️',
    color: 'from-indigo-500 to-purple-500',
    description: 'SQL, normalization, indexing, and transaction management',
    totalLevels: 20,
    levels: [
      { id: 1, title: 'Database Basics', focus: 'DBMS vs File System', status: 'completed' },
      { id: 2, title: 'Relational Model', focus: 'Tables, Keys, Constraints', status: 'active' },
      { id: 3, title: 'SQL Basics', focus: 'SELECT, INSERT, UPDATE', status: 'locked' },
      { id: 4, title: 'Advanced SQL', focus: 'Joins, Subqueries', status: 'locked' },
      { id: 5, title: 'Normalization', focus: '1NF, 2NF, 3NF, BCNF', status: 'locked' }
    ]
  },
  {
    id: 'oops',
    name: 'Object-Oriented Programming',
    icon: '🎯',
    color: 'from-yellow-500 to-orange-500',
    description: 'Master OOP concepts with real-world examples',
    totalLevels: 20,
    levels: [
      { id: 1, title: 'OOP Basics', focus: 'Classes, Objects', status: 'completed' },
      { id: 2, title: 'Encapsulation', focus: 'Access Modifiers', status: 'active' },
      { id: 3, title: 'Inheritance', focus: 'Extends, Super', status: 'locked' },
      { id: 4, title: 'Polymorphism', focus: 'Overriding, Overloading', status: 'locked' },
      { id: 5, title: 'Abstraction', focus: 'Abstract Classes, Interfaces', status: 'locked' }
    ]
  },
  {
    id: 'web',
    name: 'HTML / CSS / JavaScript',
    icon: '🌈',
    color: 'from-pink-500 to-rose-500',
    description: 'Build modern responsive websites from scratch',
    totalLevels: 20,
    levels: [
      { id: 1, title: 'HTML Basics', focus: 'Elements, Attributes', status: 'completed' },
      { id: 2, title: 'CSS Styling', focus: 'Selectors, Properties', status: 'active' },
      { id: 3, title: 'JavaScript Basics', focus: 'Variables, Functions', status: 'locked' }
    ]
  },
  {
    id: 'python',
    name: 'Python Programming',
    icon: '🐍',
    color: 'from-cyan-500 to-blue-500',
    description: 'From basics to advanced Python concepts',
    totalLevels: 20,
    levels: [
      { id: 1, title: 'Python Basics', focus: 'Variables, Data Types', status: 'completed' },
      { id: 2, title: 'Control Flow', focus: 'If, Loops, Functions', status: 'active' },
      { id: 3, title: 'Data Structures', focus: 'Lists, Dicts, Sets', status: 'locked' }
    ]
  },
  {
    id: 'java',
    name: 'Java Programming',
    icon: '☕',
    color: 'from-red-500 to-orange-500',
    description: 'Object-oriented programming with Java',
    totalLevels: 20,
    levels: [
      { id: 1, title: 'Java Basics', focus: 'Syntax, Variables', status: 'completed' },
      { id: 2, title: 'OOP in Java', focus: 'Classes, Objects', status: 'active' },
      { id: 3, title: 'Collections', focus: 'ArrayList, HashMap', status: 'locked' }
    ]
  },
  {
    id: 'cyber',
    name: 'Cybersecurity',
    icon: '🔒',
    color: 'from-gray-500 to-slate-500',
    description: 'Explore encryption, SQL injection, and security best practices',
    totalLevels: 20,
    levels: [
      { id: 1, title: 'Security Basics', focus: 'CIA Triad, Threats', status: 'completed' },
      { id: 2, title: 'Cryptography', focus: 'Encryption, Hashing', status: 'active' },
      { id: 3, title: 'Network Security', focus: 'Firewalls, IDS', status: 'locked' }
    ]
  },
  {
    id: 'cloud',
    name: 'Cloud Computing',
    icon: '☁️',
    color: 'from-sky-500 to-blue-500',
    description: 'AWS, Azure, GCP fundamentals and deployment',
    totalLevels: 20,
    levels: [
      { id: 1, title: 'Cloud Basics', focus: 'IaaS, PaaS, SaaS', status: 'completed' },
      { id: 2, title: 'AWS Fundamentals', focus: 'EC2, S3, RDS', status: 'active' },
      { id: 3, title: 'Azure Basics', focus: 'VMs, Storage', status: 'locked' }
    ]
  },
  {
    id: 'ai',
    name: 'AI / Machine Learning',
    icon: '🤖',
    color: 'from-violet-500 to-purple-500',
    description: 'Neural networks, ML algorithms, and practical AI',
    totalLevels: 20,
    levels: [
      { id: 1, title: 'AI Basics', focus: 'Types of AI, Applications', status: 'completed' },
      { id: 2, title: 'Machine Learning', focus: 'Supervised, Unsupervised', status: 'active' },
      { id: 3, title: 'Neural Networks', focus: 'Perceptron, Backprop', status: 'locked' }
    ]
  }
];

export const getCourseById = (id) => courses.find(course => course.id === id);

export const getCoursesWithProgress = (userProgress = {}) => {
  return courses.map(course => ({
    ...course,
    progress: calculateCourseProgress(course, userProgress[course.id] || {}),
    completedLevels: getCompletedLevels(course, userProgress[course.id] || {}),
    nextLevel: getNextLevel(course, userProgress[course.id] || {})
  }));
};

export const calculateCourseProgress = (course, courseProgress) => {
  if (!course.levels) return 0;
  
  const completedLevels = course.levels.filter(level => 
    courseProgress[level.id]?.completed || level.status === 'completed'
  ).length;
  
  return Math.round((completedLevels / course.levels.length) * 100);
};

export const getCompletedLevels = (course, courseProgress) => {
  if (!course.levels) return 0;
  
  return course.levels.filter(level => 
    courseProgress[level.id]?.completed || level.status === 'completed'
  ).length;
};

export const getNextLevel = (course, courseProgress) => {
  if (!course.levels) return null;
  
  return course.levels.find(level => 
    !courseProgress[level.id]?.completed && level.status !== 'completed'
  ) || null;
};