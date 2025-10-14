# CodingTerminal UI/UX Quick Reference 🎨

## Layout Overview

```
┌────────────────────────────────────────────────────────────────────┐
│                        CODINGTERMINAL                              │
├───────────────────────┬────────────────────────────────────────────┤
│  LEFT PANEL (40%)     │  RIGHT PANEL (60%)                         │
│  ═══════════════════  │  ══════════════════════════════════════    │
│                       │                                            │
│  ┌─────────────────┐  │  ┌──────────────────────────────────────┐ │
│  │ [Description]   │  │  │  🐍 Python  ⚡ JS  ☕ Java  ⚙️ C++    │ │
│  │  Solutions      │  │  │  🔄 Reset  ▶️ Run  🚀 Submit         │ │
│  │  Submissions    │  │  ├──────────────────────────────────────┤ │
│  └─────────────────┘  │  │                                       │ │
│                       │  │  MONACO EDITOR (65%)                  │ │
│  📋 Two Sum           │  │  • Line numbers                       │ │
│  🟢 Easy              │  │  • Syntax highlighting                │ │
│                       │  │  • Auto-save                          │ │
│  ─────────────────    │  │  • Word wrap                          │ │
│                       │  │                                       │ │
│  📝 Description       │  └──────────────────────────────────────┘ │
│  Given an array...    │  ═══════════════════════════════════════  │
│                       │  ┌──────────────────────────────────────┐ │
│  ━━━ Example 1 ━━━    │  │ [Test Cases]  Console                │ │
│  Input: [2,7,11,15]   │  ├──────────────────────────────────────┤ │
│  Output: [0,1]        │  │                                       │ │
│                       │  │  CONSOLE & TEST CASES (35%)           │ │
│  ━━━ Example 2 ━━━    │  │  ✅ Test Case 1: Passed              │ │
│  Input: [3,2,4]       │  │  ❌ Test Case 2: Failed              │ │
│  Output: [1,2]        │  │  ⏸️ Test Case 3: Pending             │ │
│                       │  │                                       │ │
│  📌 Constraints       │  │  Runtime: 45ms                        │ │
│  • 2 ≤ nums.length    │  │  Memory: 8.2MB                        │ │
│  • -10⁹ ≤ nums[i]     │  │                                       │ │
│                       │  └──────────────────────────────────────┘ │
│  💡 Show Hint         │                                            │
│  ✨ Ask Tuto AI       │                                            │
│                       │                                            │
└───────────────────────┴────────────────────────────────────────────┘
```

---

## Color Palette (CodeVerse Theme)

### Primary Colors
- **Background**: `#0f172a` (gray-900) with 50% opacity
- **Cards**: `#1e293b` (gray-800) with 50% opacity
- **Borders**: Purple/Blue with 30% opacity

### Accent Gradients
```css
/* Primary Gradient */
from-purple-500 to-blue-500 (#a855f7 → #3b82f6)

/* Success Gradient */
from-green-500 to-emerald-600 (#10b981 → #059669)

/* Danger */
Red-500/400 (#ef4444 / #f87171)

/* Warning */
Yellow-400 (#facc15)
```

### Status Colors
- **Passed**: Green-400 `#4ade80` on Green-500/20 background
- **Failed**: Red-400 `#f87171` on Red-500/20 background
- **Pending**: Gray-400 `#9ca3af` on Gray-500/20 background

---

## Interactive Elements

### Tabs
```
┌─────────────┬────────────┬──────────────┐
│ Description │ Solutions  │ Submissions  │
└─────────────┴────────────┴──────────────┘
      ▔▔▔▔▔▔▔  ← Active tab (purple-blue underline)
```

**Behavior**:
- Active: Purple-400 text + gradient underline
- Inactive: Gray-400 text
- Hover: Gray-200 text
- Smooth underline animation (layoutId)

### Buttons

#### Language Selector
```
┌──────────┬──────────┬──────────┬──────────┐
│ 🐍 Python│ ⚡ JS    │ ☕ Java  │ ⚙️ C++   │
└──────────┴──────────┴──────────┴──────────┘
```
- Active: Gradient background (purple→blue)
- Inactive: Gray-700/50 background
- Shadow: Glow effect on active

#### Action Buttons
```
┌────────────┐  ┌────────────┐  ┌────────────┐
│ 🔄 Reset   │  │ ▶️ Run     │  │ 🚀 Submit  │
└────────────┘  └────────────┘  └────────────┘
     Gray          Green          Purple-Blue
   (utility)     (primary)        (submit)
```

### Status Badges
```
┌──────────┐  ┌──────────┐  ┌──────────┐
│ ✅ Passed│  │ ❌ Failed│  │ ⏸️ Pending│
└──────────┘  └──────────┘  └──────────┘
   Green         Red          Gray
```

---

## Resize Handles

### Horizontal (Left ↔ Right)
```
║ ← Drag to resize →
║
║  Purple-blue gradient
║  1px width
║  Hover: Brighter glow
║
```

### Vertical (Editor ↕ Console)
```
═════════════════════════
↑ Drag to resize ↓

Purple-blue gradient
1px height
Hover: Brighter glow
```

---

## Keyboard Shortcuts

| Keys | Action | Visual Feedback |
|------|--------|-----------------|
| `Ctrl + Enter` | Run Code | Green button pulse |
| `Ctrl + S` | Submit Code | Purple button pulse |
| `Ctrl + Space` | Autocomplete | Monaco popup |
| `Ctrl + /` | Comment | Monaco action |

---

## Animations

### Panel Entry
```javascript
initial={{ opacity: 0, x: -20 }}  // Left panel
initial={{ opacity: 0, x: 20 }}   // Right panel
animate={{ opacity: 1, x: 0 }}
transition={{ duration: 0.3 }}
```

### Tab Transitions
```javascript
<AnimatePresence mode="wait">
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -10 }}
</AnimatePresence>
```

### Button Interactions
```javascript
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
```

### Active Tab Indicator
```javascript
<motion.div layoutId="activeTab" />
// Smooth underline follows active tab
```

---

## Scrollbar Styling

```css
/* Custom gradient scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(31, 41, 55, 0.5);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, 
    rgba(147, 51, 234, 0.5),  /* purple-500 */
    rgba(59, 130, 246, 0.5)   /* blue-500 */
  );
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, 
    rgba(147, 51, 234, 0.7), 
    rgba(59, 130, 246, 0.7)
  );
}
```

---

## Responsive Behavior

### Panel Constraints
- **Left Panel**: 30% min, 60% max (default 40%)
- **Right Panel**: 40% min, 70% max (default 60%)
- **Editor**: 40% min, 75% max (default 65%)
- **Console**: 25% min, 60% max (default 35%)

### Breakpoints
- Desktop: Full resizable layout
- Tablet: Maintain panels (touch-friendly handles)
- Mobile: Consider stacking (future enhancement)

---

## Card Anatomy

### Problem Card
```
┌────────────────────────────────────┐
│ bg-gray-800/50                     │
│ border border-gray-700/50          │
│ rounded-xl                         │
│ p-5                                │
│ hover:border-purple-500/30         │
│                                    │
│  [Content with proper spacing]    │
│                                    │
└────────────────────────────────────┘
```

### Test Case Card
```
┌────────────────────────────────────┐
│ Test Case 1              [✅ Passed]│
│                                    │
│ Input: nums = [2,7,11,15]          │
│ ┌────────────────────────────────┐ │
│ │ bg-black/50, rounded, p-2      │ │
│ │ text-blue-400, font-mono       │ │
│ └────────────────────────────────┘ │
│                                    │
│ Expected: [0,1]                    │
│ ┌────────────────────────────────┐ │
│ │ bg-black/50, rounded, p-2      │ │
│ │ text-green-400, font-mono      │ │
│ └────────────────────────────────┘ │
│                                    │
│ Runtime: 45ms  Memory: 8.2MB       │
└────────────────────────────────────┘
```

---

## Monaco Editor Configuration

```javascript
{
  minimap: { enabled: false },
  fontSize: 14,
  lineNumbers: 'on',
  scrollBeyondLastLine: false,
  automaticLayout: true,
  tabSize: 4,
  wordWrap: 'on',
  fontFamily: "'Fira Code', 'Consolas', 'Monaco', monospace",
  padding: { top: 16, bottom: 16 }
}
```

---

## Icon Reference (Lucide)

| Icon | Component | Usage |
|------|-----------|-------|
| `Play` | Run button | Execute code |
| `Send` | Submit button | Submit solution |
| `RotateCcw` | Reset button | Restore starter |
| `X` | Clear button | Clear console |
| `Sparkles` | AI button | Tuto AI help |
| `Lightbulb` | Hint button | Show hints |
| `Check` | Status | Test passed |
| `XCircle` | Status | Test failed |
| `Clock` | Status | Test pending |
| `ChevronRight` | List | Constraints |

---

## Empty States

### Solutions Tab (Locked)
```
        🔒
   Solutions Locked
Submit your solution first
  to unlock community
      solutions!
```

### Submissions Tab
```
        📝
   No Submissions Yet
Your submission history
   will appear here
```

### Console (Initial)
```
> Run your code to see output...
> Keyboard shortcuts:
  • Ctrl+Enter - Run Code
  • Ctrl+S - Submit Code
```

---

## Hover Effects Summary

| Element | Base | Hover | Active |
|---------|------|-------|--------|
| Tab | Gray-400 | Gray-200 | Purple-400 + underline |
| Language Button | Gray-700/50 | Gray-600/50 | Gradient + shadow |
| Action Button | Static | Scale 1.05 | Scale 0.95 |
| Test Case Card | Border gray-700/50 | Border purple-500/30 | - |
| Resize Handle | Opacity 20% | Opacity 40% | - |

---

## Z-Index Layers

```
1000 - Settings Panel
900  - Camera/Timer Overlays
800  - Floating Settings Button
100  - Modal backdrops
10   - Resize handles (active)
5    - Tabs (active indicator)
1    - Base content
```

---

## Accessibility Features

### Keyboard Navigation
- Tab through interactive elements
- Enter to activate buttons
- Escape to close modals
- Arrow keys in editor

### Screen Reader Support
- ARIA labels on buttons
- Role attributes on tabs
- Status announcements
- Semantic HTML structure

### Color Contrast
- All text meets WCAG AA standards
- Status colors distinguishable
- Focus indicators visible
- Error messages clear

---

## Performance Optimizations

### Code Splitting
- Monaco Editor: Lazy load
- Panel components: Memoized
- Test results: Virtualized (future)

### Rendering
- AnimatePresence: Smooth unmount
- useCallback: Handlers memoized
- debounce: Code execution delayed
- requestAnimationFrame: Resize

---

## Testing Scenarios

### Visual Testing
1. Switch between all tabs
2. Resize all panels to extremes
3. Toggle all language buttons
4. Hover over all interactive elements
5. Check scrollbar appearance
6. Verify gradient consistency

### Functional Testing
1. Run code → Check console output
2. Submit code → Check test results
3. Reset code → Verify starter restored
4. Switch language → Confirm code changes
5. Press keyboard shortcuts
6. Clear console → Output removed

### Responsive Testing
1. Minimum panel widths respected
2. Maximum panel widths respected
3. Editor adjusts automatically
4. Scrollbars appear when needed
5. Touch-friendly on tablets

---

## Common Customizations

### Change Default Panel Sizes
```javascript
<Panel defaultSize={40} minSize={30} maxSize={60}>
  // Adjust defaultSize (30-60 range)
</Panel>
```

### Add New Language
```javascript
const languages = [
  // ... existing
  { 
    id: 'rust', 
    name: 'Rust', 
    icon: '🦀', 
    starter: 'fn main() {\n    println!("Hello!");\n}' 
  }
];
```

### Modify Problem Data
```javascript
const problemData = {
  title: "Your Problem",
  difficulty: "Medium", // Easy/Medium/Hard
  description: "...",
  constraints: [...],
  examples: [...]
};
```

### Custom Test Cases
```javascript
const testCases = [
  { 
    id: 1, 
    input: 'your input', 
    expected: 'expected output', 
    status: 'pending' 
  }
];
```

---

## Troubleshooting

### Issue: Panels won't resize
**Solution**: Check min/max constraints, ensure PanelResizeHandle is present

### Issue: Monaco doesn't load
**Solution**: Verify @monaco-editor/react installed, check network tab

### Issue: Animations stuttering
**Solution**: Reduce motion complexity, check GPU acceleration

### Issue: Scrollbar not styled
**Solution**: Apply `.custom-scrollbar` class, check webkit support

---

## Quick Reference: File Structure

```
CodingTerminal.jsx
├── Imports (React, Framer, Monaco, Icons)
├── Component Definition
├── State Management
│   ├── Code & Language
│   ├── Tab States
│   ├── Test Results
│   └── Settings
├── Problem Data
├── Language Definitions
├── Test Cases
├── Event Handlers
│   ├── handleEditorDidMount
│   ├── handleLanguageChange
│   ├── resetCode
│   ├── runCode
│   ├── submitCode
│   └── toggleSetting
├── Keyboard Shortcuts (useEffect)
└── JSX Return
    ├── Overlays (Camera, Timer, Settings)
    ├── Main Layout (PanelGroup)
    │   ├── Left Panel
    │   │   ├── Tab Header
    │   │   └── Tab Content (Description/Solutions/Submissions)
    │   ├── Horizontal Resize Handle
    │   └── Right Panel
    │       ├── Editor Section
    │       │   ├── Language Bar
    │       │   └── Monaco Editor
    │       ├── Vertical Resize Handle
    │       └── Console Section
    │           ├── Tab Header
    │           └── Tab Content (Test Cases/Console)
    └── Custom Styles (Scrollbar CSS)
```

---

## Summary

This CodingTerminal provides a **professional, LeetCode-level coding experience** while maintaining **100% CodeVerse visual identity**. The layout is **resizable, animated, and keyboard-friendly**, making it perfect for competitive programming practice and coding interviews.

**Key Features**:
- ✅ 3-panel resizable layout
- ✅ Monaco VS Code editor
- ✅ Tab-based navigation
- ✅ Test case management
- ✅ Keyboard shortcuts
- ✅ Smooth animations
- ✅ CodeVerse branding intact

**Ready for production!** 🚀✨
