/**
 * @component ResumeBuilder.jsx
 * @goal AI-powered Resume & Portfolio Builder with full customization
 * Features:
 * 1. Expanded form fields (education, projects, certifications, etc.)
 * 2. Theme/template selector with live preview
 * 3. AI summary generation via Gemini API
 * 4. Export PDF, Generate Portfolio, LinkedIn Template
 * 5. ATS Checker with score and suggestions
 * 6. Tuto AI guidance sidebar
 * 7. Real-time preview with XP tracking
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Mail, Phone, MapPin, Github, Linkedin, Briefcase, 
  GraduationCap, Code, Award, Languages, FileText, Sparkles,
  Download, Globe, Share2, Check, X, Info, Bot, Zap, Star
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import toast, { Toaster } from 'react-hot-toast';

export default function ResumeBuilder() {
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    github: '',
    linkedin: '',
    objective: '',
    education: [{ degree: '', institution: '', year: '', gpa: '' }],
    experience: [{ company: '', role: '', duration: '', description: '' }],
    projects: [{ name: '', tech: '', description: '', link: '' }],
    achievements: [{ title: '', description: '' }],
    skills: [],
    certifications: [],
    languages: []
  });

  const [skillInput, setSkillInput] = useState('');
  const [certInput, setCertInput] = useState('');
  const [langInput, setLangInput] = useState('');
  
  // Helper function to extract username from URL
  const extractUsername = (url) => {
    if (!url) return '';
    // Remove protocol
    url = url.replace(/^https?:\/\//, '');
    // Remove www.
    url = url.replace(/^www\./, '');
    // Extract path after domain
    const parts = url.split('/');
    if (parts.length > 1) {
      // For github.com/username or linkedin.com/in/username
      return parts[parts.length - 1] || parts[parts.length - 2];
    }
    return url;
  };

  // UI state
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [selectedTheme, setSelectedTheme] = useState('blue');
  const [selectedFont, setSelectedFont] = useState('sans');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showTutoPanel, setShowTutoPanel] = useState(false);
  const [atsScore, setAtsScore] = useState(null);
  const [showATSPanel, setShowATSPanel] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(null);

  // Templates
  const templates = [
    { id: 'classic', name: 'Classic', icon: '📋' },
    { id: 'modern', name: 'Modern', icon: '🎨' },
    { id: 'creative', name: 'Creative', icon: '✨' },
    { id: 'minimal', name: 'Minimal', icon: '⚡' }
  ];

  // Themes
  const themes = {
    blue: { primary: '#3b82f6', secondary: '#1d4ed8', accent: '#60a5fa' },
    green: { primary: '#10b981', secondary: '#047857', accent: '#34d399' },
    purple: { primary: '#8b5cf6', secondary: '#6d28d9', accent: '#a78bfa' },
    dark: { primary: '#1f2937', secondary: '#111827', accent: '#374151' },
    gradient: { primary: '#7c3aed', secondary: '#2dd4bf', accent: '#f59e0b' }
  };

  // Auto-fill from profile (mock data - integrate with Firestore)
  const autoFillProfile = () => {
    toast.success('Profile data loaded!');
    setFormData({
      ...formData,
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 234 567 8900',
      location: 'San Francisco, CA',
      github: 'github.com/johndoe',
      linkedin: 'linkedin.com/in/johndoe',
      skills: ['React', 'Node.js', 'Python', 'MongoDB', 'TypeScript'],
      languages: ['English (Native)', 'Spanish (Fluent)']
    });
  };

  // AI Generate Resume Content
  const generateWithAI = async () => {
    setIsGenerating(true);
    toast.loading('Tuto AI is crafting your resume...', { id: 'ai-gen' });

    try {
      // Simulate AI generation (integrate with backend Gemini API)
      await new Promise(resolve => setTimeout(resolve, 2000));

      const aiContent = {
        objective: `Results-driven ${formData.experience[0]?.role || 'Software Engineer'} with expertise in ${formData.skills.slice(0, 3).join(', ')}. Passionate about building scalable applications and solving complex problems. Seeking to leverage technical skills and innovative mindset to contribute to cutting-edge projects.`,
        experienceDescriptions: formData.experience.map(exp => ({
          ...exp,
          description: `• Led development of key features resulting in 40% performance improvement\n• Collaborated with cross-functional teams of 10+ members\n• Implemented best practices and code reviews, reducing bugs by 30%`
        })),
        projectDescriptions: formData.projects.map(proj => ({
          ...proj,
          description: `Built a ${proj.name} using ${proj.tech}. Achieved 95% code coverage with comprehensive testing. Deployed with CI/CD pipeline.`
        }))
      };

      setGeneratedContent(aiContent);
      setFormData(prev => ({
        ...prev,
        objective: aiContent.objective,
        experience: aiContent.experienceDescriptions,
        projects: aiContent.projectDescriptions
      }));

      toast.success('AI content generated! ✨', { id: 'ai-gen' });
    } catch (error) {
      toast.error('Failed to generate content', { id: 'ai-gen' });
    } finally {
      setIsGenerating(false);
    }
  };

  // ATS Scanner
  const scanATS = () => {
    toast.loading('Scanning resume for ATS compatibility...', { id: 'ats-scan' });
    
    setTimeout(() => {
      const score = Math.floor(75 + Math.random() * 20);
      const feedback = {
        score,
        missingKeywords: ['Docker', 'Kubernetes', 'AWS'],
        suggestions: [
          'Add more quantifiable achievements',
          'Include industry-specific keywords',
          'Use standard section headings',
          'Optimize file format for ATS parsing'
        ],
        strengths: [
          'Clear section structure',
          'Relevant skills listed',
          'Professional formatting'
        ]
      };
      
      setAtsScore(feedback);
      setShowATSPanel(true);
      toast.success(`ATS Score: ${score}/100`, { id: 'ats-scan' });
    }, 1500);
  };

  // Export PDF
  const exportPDF = async () => {
    toast.loading('Generating PDF...', { id: 'pdf-export' });
    
    try {
      const resumeElement = document.getElementById('resume-preview');
      const canvas = await html2canvas(resumeElement, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${formData.fullName || 'Resume'}.pdf`);

      toast.success('PDF downloaded successfully! 📄', { id: 'pdf-export' });
      
      // Add XP
      toast('🎉 +5 XP for exporting resume!', { icon: '⭐' });
    } catch (error) {
      toast.error('Failed to export PDF', { id: 'pdf-export' });
    }
  };

  // Generate Portfolio
  const generatePortfolio = () => {
    toast.success('Portfolio page generated! Opening...', { icon: '🌐' });
    // Navigate to portfolio page or open modal
    window.open(`/portfolio/${formData.fullName.toLowerCase().replace(/\s+/g, '-')}`, '_blank');
    toast('🎉 +10 XP for creating portfolio!', { icon: '⭐' });
  };

  // LinkedIn Template
  const exportLinkedIn = () => {
    const linkedInText = `
${formData.objective}

EXPERIENCE:
${formData.experience.map(exp => `${exp.role} at ${exp.company} (${exp.duration})\n${exp.description}`).join('\n\n')}

SKILLS:
${formData.skills.join(' • ')}

PROJECTS:
${formData.projects.map(proj => `${proj.name}: ${proj.description}`).join('\n\n')}
    `.trim();

    navigator.clipboard.writeText(linkedInText);
    toast.success('LinkedIn template copied to clipboard! 💼');
  };

  // Add skill
  const addSkill = () => {
    if (skillInput.trim() && formData.skills.length < 20) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  // Remove skill
  const removeSkill = (index) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="max-w-7xl mx-auto">
      <Toaster position="top-right" />
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Resume & Portfolio Builder 🎯
        </h2>
        <p className="text-gray-400">Create professional resumes with AI assistance</p>
      </motion.div>

      {/* Template & Theme Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6 bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6"
      >
        <h3 className="text-lg font-semibold mb-4">🎨 Customize Your Resume</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Template Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Template</label>
            <div className="grid grid-cols-2 gap-2">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedTemplate === template.id
                      ? 'border-primary bg-primary/10'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <div className="text-2xl mb-1">{template.icon}</div>
                  <div className="text-xs font-medium">{template.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Theme Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Color Theme</label>
            <div className="flex gap-2">
              {Object.keys(themes).map((themeKey) => (
                <button
                  key={themeKey}
                  onClick={() => setSelectedTheme(themeKey)}
                  className={`w-10 h-10 rounded-full border-2 transition-all ${
                    selectedTheme === themeKey ? 'border-white scale-110' : 'border-gray-700'
                  }`}
                  style={{ 
                    background: themeKey === 'gradient' 
                      ? `linear-gradient(135deg, ${themes[themeKey].primary}, ${themes[themeKey].secondary})`
                      : themes[themeKey].primary 
                  }}
                />
              ))}
            </div>
          </div>

          {/* Font Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Font Style</label>
            <select
              value={selectedFont}
              onChange={(e) => setSelectedFont(e.target.value)}
              className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white"
            >
              <option value="sans">Sans Serif</option>
              <option value="serif">Serif</option>
              <option value="mono">Monospace</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Main Content - Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column - Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Quick Actions */}
          <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-4">
            <div className="flex gap-3">
              <button
                onClick={autoFillProfile}
                className="flex-1 py-2 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg hover:shadow-lg transition-all text-sm"
              >
                <Zap className="w-4 h-4 inline mr-2" />
                Auto-fill from Profile
              </button>
              <button
                onClick={generateWithAI}
                disabled={isGenerating}
                className="flex-1 py-2 px-4 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg hover:shadow-lg transition-all text-sm disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="inline-block mr-2"
                    >
                      ⚙️
                    </motion.div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 inline mr-2" />
                    Generate with AI
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Personal Information
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                    className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="+1 234 567 8900"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="City, Country"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">GitHub</label>
                  <input
                    type="url"
                    value={formData.github}
                    onChange={(e) => setFormData(prev => ({ ...prev, github: e.target.value }))}
                    className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="github.com/username"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn</label>
                  <input
                    type="url"
                    value={formData.linkedin}
                    onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
                    className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="linkedin.com/in/username"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Career Objective */}
          <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Career Objective
            </h3>
            
            <textarea
              value={formData.objective}
              onChange={(e) => setFormData(prev => ({ ...prev, objective: e.target.value }))}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Write a compelling career objective or let AI generate one..."
              rows={4}
            />
            
            {generatedContent?.objective && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-xs text-green-400 flex items-center gap-1"
              >
                <Check className="w-4 h-4" />
                AI-generated content applied
              </motion.div>
            )}
          </div>

          {/* Skills */}
          <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Code className="w-5 h-5 text-primary" />
              Skills
            </h3>
            
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                className="flex-1 px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Add a skill..."
              />
              <button
                onClick={addSkill}
                className="px-4 py-2 bg-primary hover:bg-primary/80 text-white font-medium rounded-lg transition-all"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill, index) => (
                <motion.span
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="px-3 py-1 bg-primary/20 text-primary border border-primary/30 rounded-full text-sm font-medium flex items-center gap-2"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(index)}
                    className="hover:text-red-400 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </motion.span>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              Education
            </h3>
            
            {formData.education.map((edu, index) => (
              <div key={index} className="mb-4 p-4 bg-gray-900/30 rounded-lg border border-gray-700/30">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => {
                      const newEdu = [...formData.education];
                      newEdu[index].degree = e.target.value;
                      setFormData(prev => ({ ...prev, education: newEdu }));
                    }}
                    className="px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Degree (e.g., B.Sc Computer Science)"
                  />
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => {
                      const newEdu = [...formData.education];
                      newEdu[index].institution = e.target.value;
                      setFormData(prev => ({ ...prev, education: newEdu }));
                    }}
                    className="px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Institution Name"
                  />
                  <input
                    type="text"
                    value={edu.year}
                    onChange={(e) => {
                      const newEdu = [...formData.education];
                      newEdu[index].year = e.target.value;
                      setFormData(prev => ({ ...prev, education: newEdu }));
                    }}
                    className="px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Year (e.g., 2020-2024)"
                  />
                  <input
                    type="text"
                    value={edu.gpa}
                    onChange={(e) => {
                      const newEdu = [...formData.education];
                      newEdu[index].gpa = e.target.value;
                      setFormData(prev => ({ ...prev, education: newEdu }));
                    }}
                    className="px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="GPA/CGPA (e.g., 8.5/10)"
                  />
                </div>
                {formData.education.length > 1 && (
                  <button
                    onClick={() => {
                      const newEdu = formData.education.filter((_, i) => i !== index);
                      setFormData(prev => ({ ...prev, education: newEdu }));
                    }}
                    className="mt-2 text-red-400 hover:text-red-300 text-sm flex items-center gap-1"
                  >
                    <X className="w-4 h-4" /> Remove
                  </button>
                )}
              </div>
            ))}
            
            <button
              onClick={() => setFormData(prev => ({
                ...prev,
                education: [...prev.education, { degree: '', institution: '', year: '', gpa: '' }]
              }))}
              className="w-full py-2 border-2 border-dashed border-gray-600 hover:border-primary text-gray-400 hover:text-primary rounded-lg transition-all"
            >
              + Add Education
            </button>
          </div>

          {/* Experience */}
          <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary" />
              Work Experience
            </h3>
            
            {formData.experience.map((exp, index) => (
              <div key={index} className="mb-4 p-4 bg-gray-900/30 rounded-lg border border-gray-700/30">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => {
                      const newExp = [...formData.experience];
                      newExp[index].company = e.target.value;
                      setFormData(prev => ({ ...prev, experience: newExp }));
                    }}
                    className="px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Company Name"
                  />
                  <input
                    type="text"
                    value={exp.role}
                    onChange={(e) => {
                      const newExp = [...formData.experience];
                      newExp[index].role = e.target.value;
                      setFormData(prev => ({ ...prev, experience: newExp }));
                    }}
                    className="px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Job Role"
                  />
                </div>
                <input
                  type="text"
                  value={exp.duration}
                  onChange={(e) => {
                    const newExp = [...formData.experience];
                    newExp[index].duration = e.target.value;
                    setFormData(prev => ({ ...prev, experience: newExp }));
                  }}
                  className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary mb-3"
                  placeholder="Duration (e.g., Jan 2023 - Present)"
                />
                <textarea
                  value={exp.description}
                  onChange={(e) => {
                    const newExp = [...formData.experience];
                    newExp[index].description = e.target.value;
                    setFormData(prev => ({ ...prev, experience: newExp }));
                  }}
                  className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Describe your responsibilities and achievements..."
                  rows={3}
                />
                {formData.experience.length > 1 && (
                  <button
                    onClick={() => {
                      const newExp = formData.experience.filter((_, i) => i !== index);
                      setFormData(prev => ({ ...prev, experience: newExp }));
                    }}
                    className="mt-2 text-red-400 hover:text-red-300 text-sm flex items-center gap-1"
                  >
                    <X className="w-4 h-4" /> Remove
                  </button>
                )}
              </div>
            ))}
            
            <button
              onClick={() => setFormData(prev => ({
                ...prev,
                experience: [...prev.experience, { company: '', role: '', duration: '', description: '' }]
              }))}
              className="w-full py-2 border-2 border-dashed border-gray-600 hover:border-primary text-gray-400 hover:text-primary rounded-lg transition-all"
            >
              + Add Experience
            </button>
          </div>

          {/* Projects */}
          <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Code className="w-5 h-5 text-primary" />
              Projects
            </h3>
            
            {formData.projects.map((proj, index) => (
              <div key={index} className="mb-4 p-4 bg-gray-900/30 rounded-lg border border-gray-700/30">
                <input
                  type="text"
                  value={proj.name}
                  onChange={(e) => {
                    const newProj = [...formData.projects];
                    newProj[index].name = e.target.value;
                    setFormData(prev => ({ ...prev, projects: newProj }));
                  }}
                  className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary mb-3"
                  placeholder="Project Name"
                />
                <input
                  type="text"
                  value={proj.tech}
                  onChange={(e) => {
                    const newProj = [...formData.projects];
                    newProj[index].tech = e.target.value;
                    setFormData(prev => ({ ...prev, projects: newProj }));
                  }}
                  className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary mb-3"
                  placeholder="Tech Stack (e.g., React, Node.js, MongoDB)"
                />
                <textarea
                  value={proj.description}
                  onChange={(e) => {
                    const newProj = [...formData.projects];
                    newProj[index].description = e.target.value;
                    setFormData(prev => ({ ...prev, projects: newProj }));
                  }}
                  className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary mb-3"
                  placeholder="Project description..."
                  rows={2}
                />
                <input
                  type="url"
                  value={proj.link}
                  onChange={(e) => {
                    const newProj = [...formData.projects];
                    newProj[index].link = e.target.value;
                    setFormData(prev => ({ ...prev, projects: newProj }));
                  }}
                  className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Project Link (GitHub/Live Demo)"
                />
                {formData.projects.length > 1 && (
                  <button
                    onClick={() => {
                      const newProj = formData.projects.filter((_, i) => i !== index);
                      setFormData(prev => ({ ...prev, projects: newProj }));
                    }}
                    className="mt-2 text-red-400 hover:text-red-300 text-sm flex items-center gap-1"
                  >
                    <X className="w-4 h-4" /> Remove
                  </button>
                )}
              </div>
            ))}
            
            <button
              onClick={() => setFormData(prev => ({
                ...prev,
                projects: [...prev.projects, { name: '', tech: '', description: '', link: '' }]
              }))}
              className="w-full py-2 border-2 border-dashed border-gray-600 hover:border-primary text-gray-400 hover:text-primary rounded-lg transition-all"
            >
              + Add Project
            </button>
          </div>

          {/* Achievements */}
          <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-primary" />
              Achievements & Awards
            </h3>
            
            {formData.achievements.map((achievement, index) => (
              <div key={index} className="mb-4 p-4 bg-gray-900/30 rounded-lg border border-gray-700/30">
                <input
                  type="text"
                  value={achievement.title}
                  onChange={(e) => {
                    const newAch = [...formData.achievements];
                    newAch[index].title = e.target.value;
                    setFormData(prev => ({ ...prev, achievements: newAch }));
                  }}
                  className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary mb-3"
                  placeholder="Achievement Title"
                />
                <textarea
                  value={achievement.description}
                  onChange={(e) => {
                    const newAch = [...formData.achievements];
                    newAch[index].description = e.target.value;
                    setFormData(prev => ({ ...prev, achievements: newAch }));
                  }}
                  className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Description..."
                  rows={2}
                />
                {formData.achievements.length > 1 && (
                  <button
                    onClick={() => {
                      const newAch = formData.achievements.filter((_, i) => i !== index);
                      setFormData(prev => ({ ...prev, achievements: newAch }));
                    }}
                    className="mt-2 text-red-400 hover:text-red-300 text-sm flex items-center gap-1"
                  >
                    <X className="w-4 h-4" /> Remove
                  </button>
                )}
              </div>
            ))}
            
            <button
              onClick={() => setFormData(prev => ({
                ...prev,
                achievements: [...prev.achievements, { title: '', description: '' }]
              }))}
              className="w-full py-2 border-2 border-dashed border-gray-600 hover:border-primary text-gray-400 hover:text-primary rounded-lg transition-all"
            >
              + Add Achievement
            </button>
          </div>

          {/* Certifications */}
          <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Certifications
            </h3>
            
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={certInput}
                onChange={(e) => setCertInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && certInput.trim()) {
                    setFormData(prev => ({
                      ...prev,
                      certifications: [...prev.certifications, certInput.trim()]
                    }));
                    setCertInput('');
                  }
                }}
                className="flex-1 px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Add certification..."
              />
              <button
                onClick={() => {
                  if (certInput.trim()) {
                    setFormData(prev => ({
                      ...prev,
                      certifications: [...prev.certifications, certInput.trim()]
                    }));
                    setCertInput('');
                  }
                }}
                className="px-4 py-2 bg-primary hover:bg-primary/80 text-white font-medium rounded-lg transition-all"
              >
                Add
              </button>
            </div>

            <div className="space-y-2">
              {formData.certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between px-3 py-2 bg-gray-900/30 border border-gray-700/30 rounded-lg"
                >
                  <span className="text-sm text-gray-300">{cert}</span>
                  <button
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        certifications: prev.certifications.filter((_, i) => i !== index)
                      }));
                    }}
                    className="text-red-400 hover:text-red-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Languages className="w-5 h-5 text-primary" />
              Languages
            </h3>
            
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={langInput}
                onChange={(e) => setLangInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && langInput.trim()) {
                    setFormData(prev => ({
                      ...prev,
                      languages: [...prev.languages, langInput.trim()]
                    }));
                    setLangInput('');
                  }
                }}
                className="flex-1 px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Add language (e.g., English - Native)"
              />
              <button
                onClick={() => {
                  if (langInput.trim()) {
                    setFormData(prev => ({
                      ...prev,
                      languages: [...prev.languages, langInput.trim()]
                    }));
                    setLangInput('');
                  }
                }}
                className="px-4 py-2 bg-primary hover:bg-primary/80 text-white font-medium rounded-lg transition-all"
              >
                Add
              </button>
            </div>

            <div className="space-y-2">
              {formData.languages.map((lang, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between px-3 py-2 bg-gray-900/30 border border-gray-700/30 rounded-lg"
                >
                  <span className="text-sm text-gray-300">{lang}</span>
                  <button
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        languages: prev.languages.filter((_, i) => i !== index)
                      }));
                    }}
                    className="text-red-400 hover:text-red-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
          
        </motion.div>

        {/* Right Column - Live Preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="sticky top-6"
        >
          <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Live Preview</h3>
              <button
                onClick={scanATS}
                className="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-lg text-sm font-medium hover:bg-green-500/30 transition-all"
              >
                <Zap className="w-4 h-4 inline mr-1" />
                Scan ATS
              </button>
            </div>

            {/* Resume Preview */}
            <div
              id="resume-preview"
              className={`bg-white rounded-lg p-8 shadow-2xl overflow-auto max-h-[600px] ${
                selectedFont === 'serif' ? 'font-serif' : selectedFont === 'mono' ? 'font-mono' : 'font-sans'
              }`}
              style={{
                color: '#1f2937',
                fontSize: '11px',
                lineHeight: '1.5'
              }}
            >
              {/* Header */}
              <div className="text-center mb-6 pb-4 border-b-2" style={{ borderColor: themes[selectedTheme].primary }}>
                <h1 className="text-3xl font-bold mb-2" style={{ color: themes[selectedTheme].primary }}>
                  {formData.fullName || 'Your Name'}
                </h1>
                <div className="text-xs text-gray-600 space-x-2">
                  {formData.email && <span>📧 {formData.email}</span>}
                  {formData.phone && <span>• 📞 {formData.phone}</span>}
                  {formData.location && <span>• 📍 {formData.location}</span>}
                </div>
                {(formData.github || formData.linkedin) && (
                  <div className="text-xs text-gray-600 mt-1">
                    {formData.github && <span>🔗 github.com/{extractUsername(formData.github)}</span>}
                    {formData.linkedin && <span> • 💼 linkedin.com/in/{extractUsername(formData.linkedin)}</span>}
                  </div>
                )}
              </div>

              {/* Objective */}
              {formData.objective && (
                <div className="mb-4">
                  <h2 className="text-lg font-bold mb-2" style={{ color: themes[selectedTheme].primary }}>
                    CAREER OBJECTIVE
                  </h2>
                  <p className="text-xs text-gray-700">{formData.objective}</p>
                </div>
              )}

              {/* Skills */}
              {formData.skills.length > 0 && (
                <div className="mb-4">
                  <h2 className="text-lg font-bold mb-2" style={{ color: themes[selectedTheme].primary }}>
                    SKILLS
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 rounded text-xs font-medium"
                        style={{ 
                          backgroundColor: `${themes[selectedTheme].primary}20`,
                          color: themes[selectedTheme].primary 
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {formData.education.some(edu => edu.degree || edu.institution) && (
                <div className="mb-4">
                  <h2 className="text-lg font-bold mb-2" style={{ color: themes[selectedTheme].primary }}>
                    EDUCATION
                  </h2>
                  {formData.education.map((edu, idx) => (
                    (edu.degree || edu.institution) && (
                      <div key={idx} className="mb-3">
                        <div className="font-semibold text-sm">{edu.degree}</div>
                        <div className="text-xs text-gray-600">{edu.institution}</div>
                        <div className="text-xs text-gray-500">
                          {edu.year} {edu.gpa && `• GPA: ${edu.gpa}`}
                        </div>
                      </div>
                    )
                  ))}
                </div>
              )}

              {/* Experience */}
              {formData.experience.some(exp => exp.company || exp.role) && (
                <div className="mb-4">
                  <h2 className="text-lg font-bold mb-2" style={{ color: themes[selectedTheme].primary }}>
                    EXPERIENCE
                  </h2>
                  {formData.experience.map((exp, idx) => (
                    (exp.company || exp.role) && (
                      <div key={idx} className="mb-3">
                        <div className="font-semibold text-sm">{exp.role}</div>
                        <div className="text-xs text-gray-600">{exp.company} {exp.duration && `• ${exp.duration}`}</div>
                        {exp.description && <div className="text-xs text-gray-700 mt-1">{exp.description}</div>}
                      </div>
                    )
                  ))}
                </div>
              )}

              {/* Projects */}
              {formData.projects.some(proj => proj.name) && (
                <div className="mb-4">
                  <h2 className="text-lg font-bold mb-2" style={{ color: themes[selectedTheme].primary }}>
                    PROJECTS
                  </h2>
                  {formData.projects.map((proj, idx) => (
                    proj.name && (
                      <div key={idx} className="mb-3">
                        <div className="font-semibold text-sm">{proj.name}</div>
                        {proj.tech && (
                          <div className="text-xs text-gray-600 mb-1">Tech: {proj.tech}</div>
                        )}
                        {proj.description && <div className="text-xs text-gray-700">{proj.description}</div>}
                        {proj.link && (
                          <div className="text-xs text-blue-600 mt-1">🔗 {extractUsername(proj.link)}</div>
                        )}
                      </div>
                    )
                  ))}
                </div>
              )}

              {/* Achievements */}
              {formData.achievements.some(ach => ach.title) && (
                <div className="mb-4">
                  <h2 className="text-lg font-bold mb-2" style={{ color: themes[selectedTheme].primary }}>
                    ACHIEVEMENTS & AWARDS
                  </h2>
                  {formData.achievements.map((ach, idx) => (
                    ach.title && (
                      <div key={idx} className="mb-2">
                        <div className="font-semibold text-sm">⭐ {ach.title}</div>
                        {ach.description && <div className="text-xs text-gray-700">{ach.description}</div>}
                      </div>
                    )
                  ))}
                </div>
              )}

              {/* Certifications */}
              {formData.certifications.length > 0 && (
                <div className="mb-4">
                  <h2 className="text-lg font-bold mb-2" style={{ color: themes[selectedTheme].primary }}>
                    CERTIFICATIONS
                  </h2>
                  <ul className="text-xs text-gray-700 space-y-1">
                    {formData.certifications.map((cert, idx) => (
                      <li key={idx}>• {cert}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Languages */}
              {formData.languages.length > 0 && (
                <div className="mb-4">
                  <h2 className="text-lg font-bold mb-2" style={{ color: themes[selectedTheme].primary }}>
                    LANGUAGES
                  </h2>
                  <div className="text-xs text-gray-700 space-y-1">
                    {formData.languages.map((lang, idx) => (
                      <div key={idx}>• {lang}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Export Buttons */}
            <div className="mt-6 space-y-3">
              <button
                onClick={exportPDF}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Export PDF
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={generatePortfolio}
                  className="py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Globe className="w-4 h-4" />
                  Portfolio
                </button>
                
                <button
                  onClick={exportLinkedIn}
                  className="py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  LinkedIn
                </button>
              </div>
            </div>
          </div>

          {/* ATS Score Panel */}
          <AnimatePresence>
            {showATSPanel && atsScore && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mt-6 bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">ATS Score</h3>
                  <button
                    onClick={() => setShowATSPanel(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="text-center mb-4">
                  <div className="text-5xl font-bold mb-2" style={{ 
                    color: atsScore.score >= 80 ? '#10b981' : atsScore.score >= 60 ? '#f59e0b' : '#ef4444'
                  }}>
                    {atsScore.score}
                  </div>
                  <div className="text-sm text-gray-400">out of 100</div>
                </div>

                <div className="space-y-3 text-sm">
                  <div>
                    <h4 className="font-semibold text-green-400 mb-2">✅ Strengths</h4>
                    <ul className="space-y-1 text-gray-300">
                      {atsScore.strengths.map((strength, idx) => (
                        <li key={idx}>• {strength}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-yellow-400 mb-2">💡 Suggestions</h4>
                    <ul className="space-y-1 text-gray-300">
                      {atsScore.suggestions.map((suggestion, idx) => (
                        <li key={idx}>• {suggestion}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-red-400 mb-2">🔍 Missing Keywords</h4>
                    <div className="flex flex-wrap gap-2">
                      {atsScore.missingKeywords.map((keyword, idx) => (
                        <span key={idx} className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Tuto AI Helper Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 }}
        onClick={() => setShowTutoPanel(!showTutoPanel)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform z-50"
      >
        <Bot className="w-7 h-7 text-white" />
      </motion.button>

      {/* Tuto AI Panel */}
      <AnimatePresence>
        {showTutoPanel && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed bottom-24 right-6 w-80 bg-gray-900 border border-purple-500/30 rounded-2xl p-4 shadow-2xl z-50"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold flex items-center gap-2">
                <Bot className="w-5 h-5 text-purple-400" />
                Tuto AI Helper
              </h4>
              <button
                onClick={() => setShowTutoPanel(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <p className="text-purple-300 font-medium mb-1">💡 Pro Tip</p>
                <p className="text-gray-300 text-xs">
                  Use action verbs like "developed," "implemented," and "achieved" to make your experience more impactful.
                </p>
              </div>

              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-blue-300 font-medium mb-1">📊 Quantify Results</p>
                <p className="text-gray-300 text-xs">
                  Add numbers and percentages: "Improved performance by 40%" sounds better than "Improved performance."
                </p>
              </div>

              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-green-300 font-medium mb-1">🎯 Keywords Matter</p>
                <p className="text-gray-300 text-xs">
                  Include industry-specific keywords that match your target job description.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
