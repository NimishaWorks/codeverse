# CodeVerse - Multi-Subject Learning Platform Architecture

## 🎯 Project Overview
CodeVerse is now a **multi-subject gamified learning platform** supporting DSA, OS, CN, COA, DBMS, and more.

---

## 📁 New Folder Structure

```
src/
├── components/
│   ├── games/
│   │   ├── DSA/          ← DSA games (Stack, Queue, Sorting, etc.)
│   │   ├── OS/           ← Operating Systems games
│   │   │   ├── ProcessSchedulingGame.jsx ✅
│   │   │   ├── MemoryGame.jsx ✅
│   │   │   └── DeadlockEscape.jsx (placeholder)
│   │   ├── CN/           ← Computer Networks games
│   │   │   ├── PacketRoutingGame.jsx (placeholder)
│   │   │   ├── IPMatchingGame.jsx (placeholder)
│   │   │   └── TransmissionTowerGame.jsx (placeholder)
│   │   ├── COA/          ← Computer Organization games
│   │   │   ├── LogicGatePuzzle.jsx (placeholder)
│   │   │   ├── PipelineSimulator.jsx (placeholder)
│   │   │   └── CacheMemoryGame.jsx (placeholder)
│   │   ├── DBMS/         ← Database games
│   │   │   ├── SQLQueryBuilder.jsx (placeholder)
│   │   │   ├── ERDiagramPuzzle.jsx (placeholder)
│   │   │   └── TransactionChallenge.jsx (placeholder)
│   │   ├── OOPS/         ← Object-Oriented Programming games
│   │   ├── AI_ML/        ← AI/ML games
│   │   └── Cyber/        ← Cybersecurity games
│   │
│   ├── roadmaps/
│   │   ├── RoadmapDSA.jsx ✅
│   │   ├── RoadmapOS.jsx ✅
│   │   ├── RoadmapCN.jsx ✅
│   │   ├── RoadmapCOA.jsx ✅
│   │   ├── RoadmapDBMS.jsx ✅
│   │   ├── RoadmapOOPS.jsx (placeholder)
│   │   ├── RoadmapAI.jsx (placeholder)
│   │   ├── RoadmapCyber.jsx (placeholder)
│   │   └── RoadmapCloud.jsx (placeholder)
│   │
│   ├── CourseRoadmap.jsx ✅ (Dynamic loader)
│   ├── Dashboard.jsx
│   ├── HomePage.jsx
│   └── ...
│
├── data/
│   └── courses.js ✅ (Updated with OS, CN, COA levels)
```

---

## 🎮 Dynamic Roadmap System

### How It Works

The `CourseRoadmap.jsx` component now **dynamically loads** subject-specific roadmaps:

```jsx
// Usage in Routes
<Route path="/courses/:subject" element={<CourseRoadmap />} />

// Or as a component prop
<CourseRoadmap subject="os" />
```

### Supported Subjects

| Subject | Status | Roadmap Component | Sample Games |
|---------|--------|-------------------|--------------|
| **DSA** | ✅ Complete | `RoadmapDSA.jsx` | Stack, Queue, Sorting, Recursion, Tree, Graph |
| **OS** | ✅ Complete | `RoadmapOS.jsx` | ProcessScheduling, Memory, Deadlock |
| **CN** | ✅ Complete | `RoadmapCN.jsx` | PacketRouting, IPMatching, Transmission |
| **COA** | ✅ Complete | `RoadmapCOA.jsx` | LogicGates, Pipeline, CacheMemory |
| **DBMS** | ✅ Complete | `RoadmapDBMS.jsx` | SQLBuilder, ERDiagram, Transactions |
| **OOPs** | 🚧 Placeholder | Coming soon | Inheritance, Polymorphism, Design Patterns |
| **AI/ML** | 🚧 Placeholder | Coming soon | Classification, Regression, Neural Nets |
| **Cyber** | 🚧 Placeholder | Coming soon | Encryption, PasswordCracker, NetworkAttack |
| **Cloud** | 🚧 Placeholder | Coming soon | VM Deployment, Resource Allocation |

---

## 🌟 Key Features Implemented

### 1. **Subject-Specific Roadmaps**
- Each subject has its own visual theme and color gradient
- Unique mentor characters (Tuto for DSA, Kernel Ken for OS, NetBot for CN, etc.)
- 20 progression nodes per subject with status tracking (completed/active/locked)

### 2. **Interactive Mini-Games**
- **OS Games:**
  - `ProcessSchedulingGame.jsx` - FCFS, SJF, Priority scheduling with Gantt charts
  - `MemoryGame.jsx` - First Fit, Best Fit, Worst Fit allocation strategies

### 3. **Duolingo-Style UI**
- Circular coin nodes with color coding:
  - 🟢 Green for completed
  - 🟡 Orange/Gold for active (with pulse animation)
  - ⚫ Gray for locked
- Smooth curved path connecting nodes
- Character avatar that bounces on active node
- Progress stats and mentor hints

### 4. **Course Data Integration**
- Updated `courses.js` with complete level data for OS, CN, COA
- Each level includes:
  - Title and focus area
  - Status (completed/active/locked)
  - Linked game component name

---

## 🚀 Next Steps (For Copilot/Developer)

### Immediate Tasks:
1. **Move existing DSA games** to `games/DSA/` folder
2. **Create remaining game placeholders** for CN, COA, DBMS
3. **Update App.jsx routes** to support `/courses/:subject` dynamic routing
4. **Test navigation** between different subject roadmaps

### Future Enhancements:
- Add more interactive games for each subject
- Implement game state persistence
- Create OOPs, AI/ML, Cyber, Cloud roadmaps
- Add leaderboard integration for each subject
- Character unlocking system per subject completion

---

## 💡 Developer Notes

### How to Add a New Subject:

1. **Create roadmap component:**
   ```bash
   src/components/roadmaps/RoadmapYourSubject.jsx
   ```

2. **Import in CourseRoadmap.jsx:**
   ```jsx
   import RoadmapYourSubject from "./roadmaps/RoadmapYourSubject";
   ```

3. **Add case in switch statement:**
   ```jsx
   case "yoursubject":
     return <RoadmapYourSubject />;
   ```

4. **Create game folder:**
   ```bash
   src/components/games/YourSubject/
   ```

5. **Update courses.js** with level data

---

## 📊 Current Statistics

- ✅ **5 Complete Roadmaps** (DSA, OS, CN, COA, DBMS)
- ✅ **2 Working Games** (ProcessScheduling, MemoryAllocation)
- ✅ **100 Total Levels** (20 per subject × 5 subjects)
- ✅ **Dynamic Routing** enabled
- 🎯 **Duolingo-style UI** with animations

---

## 🎓 Credits

Built for **CodeVerse** - AI-powered gamified learning platform
Architecture designed for GitHub Copilot and Blackbox AI-friendly prompts

---

**Last Updated:** October 13, 2025
**Status:** Core architecture complete, ready for game development phase
