import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * @feature Note Sidebar - Collapsible note-taking system
 * Three tabs: Doubts, Need to Revise, Not Understood
 * Text formatting: Bold, Underline, Sticky Notes, Highlighters (colors)
 * Stores notes in localStorage by level/subject
 */

const NoteSidebar = ({ levelId, subject, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('doubts');
  const [notes, setNotes] = useState({ doubts: [], revise: [], notUnderstood: [] });
  const [currentNote, setCurrentNote] = useState('');
  const [selectedColor, setSelectedColor] = useState('yellow');
  const [formatting, setFormatting] = useState({ bold: false, underline: false, highlight: false });

  const tabs = [
    { id: 'doubts', label: 'Doubts', icon: '❓', color: 'from-red-500 to-orange-500' },
    { id: 'revise', label: 'Need to Revise', icon: '📝', color: 'from-blue-500 to-cyan-500' },
    { id: 'notUnderstood', label: 'Not Understood', icon: '🤔', color: 'from-purple-500 to-pink-500' },
  ];

  const colors = [
    { name: 'yellow', bg: 'bg-yellow-200', text: 'text-yellow-900', border: 'border-yellow-400' },
    { name: 'green', bg: 'bg-green-200', text: 'text-green-900', border: 'border-green-400' },
    { name: 'blue', bg: 'bg-blue-200', text: 'text-blue-900', border: 'border-blue-400' },
    { name: 'pink', bg: 'bg-pink-200', text: 'text-pink-900', border: 'border-pink-400' },
    { name: 'purple', bg: 'bg-purple-200', text: 'text-purple-900', border: 'border-purple-400' },
  ];

  // Load notes from localStorage on mount
  useEffect(() => {
    const storageKey = `notes_${subject}_${levelId}`;
    const savedNotes = localStorage.getItem(storageKey);
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, [subject, levelId]);

  // Save notes to localStorage
  const saveNotes = (updatedNotes) => {
    const storageKey = `notes_${subject}_${levelId}`;
    localStorage.setItem(storageKey, JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
  };

  const addNote = () => {
    if (!currentNote.trim()) return;

    const newNote = {
      id: Date.now(),
      content: currentNote,
      color: selectedColor,
      formatting: { ...formatting },
      timestamp: new Date().toISOString(),
    };

    const updatedNotes = {
      ...notes,
      [activeTab]: [...notes[activeTab], newNote],
    };

    saveNotes(updatedNotes);
    setCurrentNote('');
    setFormatting({ bold: false, underline: false, highlight: false });
  };

  const deleteNote = (noteId) => {
    const updatedNotes = {
      ...notes,
      [activeTab]: notes[activeTab].filter((note) => note.id !== noteId),
    };
    saveNotes(updatedNotes);
  };

  const toggleFormatting = (type) => {
    setFormatting({ ...formatting, [type]: !formatting[type] });
  };

  const getNoteStyle = (note) => {
    const color = colors.find((c) => c.name === note.color) || colors[0];
    let style = `${color.bg} ${color.text} ${color.border} border-2 rounded-lg p-4 shadow-md`;
    
    if (note.formatting.bold) style += ' font-bold';
    if (note.formatting.underline) style += ' underline';
    if (note.formatting.highlight) style += ' bg-opacity-70';
    
    return style;
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
      />

      {/* Sidebar */}
      <motion.div
        initial={{ x: 400 }}
        animate={{ x: 0 }}
        exit={{ x: 400 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed right-0 top-0 h-full w-full sm:w-[480px] bg-gradient-to-b from-[#0a0e27] to-[#151a35] border-l border-white/10 shadow-2xl z-50 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl">
              📝
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">My Notes</h2>
              <p className="text-xs text-slate-400">{subject} - Level {levelId}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 p-4 border-b border-white/10 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? `bg-gradient-to-r ${tab.color} text-white shadow-lg`
                  : 'bg-white/5 text-slate-400 hover:bg-white/10'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              {tab.label}
              <span className="ml-1 px-2 py-0.5 rounded-full bg-black/20 text-xs">
                {notes[tab.id].length}
              </span>
            </button>
          ))}
        </div>

        {/* Notes Display */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {notes[activeTab].length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <div className="text-6xl mb-4">{tabs.find((t) => t.id === activeTab)?.icon}</div>
                <p className="text-slate-400">No notes yet. Add your first note below!</p>
              </motion.div>
            ) : (
              notes[activeTab].map((note, index) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ delay: index * 0.05 }}
                  className={getNoteStyle(note) + ' relative group'}
                >
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  >
                    ✕
                  </button>
                  <p className="text-sm leading-relaxed pr-4">{note.content}</p>
                  <p className="text-xs opacity-60 mt-2">
                    {new Date(note.timestamp).toLocaleString()}
                  </p>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Note Input Area */}
        <div className="p-4 border-t border-white/10 bg-[#0a0e27] space-y-3">
          {/* Formatting Toolbar */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => toggleFormatting('bold')}
              className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold transition-all ${
                formatting.bold ? 'bg-primary text-white' : 'bg-white/10 text-slate-400 hover:bg-white/20'
              }`}
              title="Bold"
            >
              B
            </button>
            <button
              onClick={() => toggleFormatting('underline')}
              className={`w-9 h-9 rounded-lg flex items-center justify-center underline transition-all ${
                formatting.underline ? 'bg-primary text-white' : 'bg-white/10 text-slate-400 hover:bg-white/20'
              }`}
              title="Underline"
            >
              U
            </button>
            <button
              onClick={() => toggleFormatting('highlight')}
              className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                formatting.highlight ? 'bg-primary text-white' : 'bg-white/10 text-slate-400 hover:bg-white/20'
              }`}
              title="Highlight"
            >
              🖍️
            </button>
            
            <div className="w-px h-6 bg-white/20 mx-1" />
            
            {/* Color Picker */}
            {colors.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color.name)}
                className={`w-9 h-9 rounded-lg ${color.bg} border-2 transition-all ${
                  selectedColor === color.name ? color.border + ' scale-110 shadow-lg' : 'border-transparent opacity-50 hover:opacity-100'
                }`}
                title={color.name}
              />
            ))}
          </div>

          {/* Textarea */}
          <textarea
            value={currentNote}
            onChange={(e) => setCurrentNote(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.ctrlKey) {
                addNote();
              }
            }}
            placeholder="Type your note... (Ctrl+Enter to save)"
            className="w-full h-24 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-primary resize-none"
          />

          {/* Add Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={addNote}
            className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            Add Note
          </motion.button>
        </div>
      </motion.div>
    </>
  );
};

export default NoteSidebar;
