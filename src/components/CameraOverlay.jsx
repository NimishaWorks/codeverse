import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, CameraOff, Video, VideoOff } from 'lucide-react';

export default function CameraOverlay({ isVisible, onClose }) {
  const [stream, setStream] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [error, setError] = useState('');
  const videoRef = useRef(null);

  const startCamera = async () => {
    try {
      setError('');
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 320 },
          height: { ideal: 240 },
          facingMode: 'user'
        },
        audio: false 
      });
      setStream(mediaStream);
      setIsCameraOn(true);
    } catch (err) {
      setError('Camera access denied or not available');
      console.error('Camera error:', err);
      setIsCameraOn(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsCameraOn(false);
    }
  };

  // Set video stream when it changes
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  // Auto-start camera when overlay becomes visible
  useEffect(() => {
    if (isVisible && !isCameraOn) {
      startCamera();
    }
  }, [isVisible, isCameraOn]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const toggleCamera = () => {
    if (isCameraOn) {
      stopCamera();
    } else {
      startCamera();
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 50, y: 50 }}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, x: 50, y: 50 }}
        className="fixed bottom-20 right-6 z-50"
        drag
        dragConstraints={{
          top: -window.innerHeight + 300,
          left: -window.innerWidth + 350,
          right: 0,
          bottom: 0
        }}
        dragElastic={0.1}
      >
        <div className="bg-gray-900/95 backdrop-blur-xl border-2 border-purple-500/50 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-purple-600/30 to-blue-600/30 border-b border-purple-500/30">
            <div className="flex items-center gap-2">
              <Video className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-semibold text-white">Camera</span>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Video Feed */}
          <div className="relative w-80 h-60 bg-gray-950">
            {isCameraOn ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <CameraOff className="w-12 h-12 text-gray-600 mb-2" />
                <p className="text-sm text-gray-500">Camera is off</p>
              </div>
            )}
            
            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                <p className="text-xs text-red-400 px-4 text-center">{error}</p>
              </div>
            )}

            {/* Status Indicator */}
            {isCameraOn && (
              <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 bg-red-500/90 rounded-full">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="text-xs font-semibold text-white">LIVE</span>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-3 px-4 py-3 bg-gray-900/50">
            <motion.button
              onClick={toggleCamera}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                isCameraOn
                  ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                  : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isCameraOn ? (
                <>
                  <VideoOff className="w-4 h-4" />
                  <span className="text-sm">Turn Off</span>
                </>
              ) : (
                <>
                  <Video className="w-4 h-4" />
                  <span className="text-sm">Turn On</span>
                </>
              )}
            </motion.button>
          </div>

          {/* Drag Hint */}
          <div className="px-4 py-1.5 bg-gray-950/50 border-t border-gray-800">
          <p className="text-xs text-gray-600 text-center">📌 Drag to reposition</p>
        </div>
      </div>
    </motion.div>
      )}
    </AnimatePresence>
  );
}