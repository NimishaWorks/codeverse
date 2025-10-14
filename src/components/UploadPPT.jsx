import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const UploadPPT = () => {
  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    console.log('Files uploaded:', files);
    // TODO: Process PPT files
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1020] via-[#101325] to-[#14182b] text-white">
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-gray-400 hover:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <h1 className="text-2xl font-bold">PPT to Interactive Story 📊</h1>
          <div className="w-24"></div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8"
        >
          <h2 className="text-3xl font-bold mb-4">Turn Your Presentations into Playable Stories!</h2>
          <p className="text-gray-400 mb-8">Upload PPT/PPTX files and convert them to interactive learning experiences</p>

          {/* Upload Zone */}
          <div className="border-2 border-dashed border-gray-600 rounded-2xl p-16 text-center mb-8 hover:border-primary transition-all cursor-pointer">
            <input
              type="file"
              accept=".ppt,.pptx"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
              multiple
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="text-7xl mb-4">📁</div>
              <h3 className="text-2xl font-bold mb-2">Drop PPT files here</h3>
              <p className="text-gray-400">or click to browse</p>
            </label>
          </div>

          {/* Conversion Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-6">
              <div className="text-5xl mb-4">🎬</div>
              <h3 className="text-xl font-bold mb-2">Video Story</h3>
              <p className="text-sm text-gray-400">Convert to animated video narrative</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-2xl p-6">
              <div className="text-5xl mb-4">🎮</div>
              <h3 className="text-xl font-bold mb-2">Game Scenario</h3>
              <p className="text-sm text-gray-400">Transform into interactive game</p>
            </div>
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl p-6">
              <div className="text-5xl mb-4">📚</div>
              <h3 className="text-xl font-bold mb-2">Text Narrative</h3>
              <p className="text-sm text-gray-400">Convert to story format</p>
            </div>
          </div>
        </motion.div>

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8"
          >
            <h3 className="text-2xl font-bold mb-6">Your Stories</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Placeholder for uploaded files */}
              <div className="bg-gray-900/50 rounded-2xl p-6">
                <h4 className="font-bold mb-2">Sample Story</h4>
                <p className="text-sm text-gray-400 mb-4">Created from presentation.pptx</p>
                <button className="px-4 py-2 bg-primary rounded-lg hover:bg-primary/80">View Story</button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default UploadPPT;
