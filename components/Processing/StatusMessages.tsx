'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const statusMessages = [
  { text: "Understanding your request...", duration: 500 },
  { text: "Checking 47 parking facilities...", duration: 800 },
  { text: "Analyzing GT vs. Clemson game impact...", duration: 800 },
  { text: "Evaluating traffic patterns...", duration: 700 },
  { text: "Calculating walking routes...", duration: 600 },
  { text: "Finding your best options...", duration: 500 }
];

export default function StatusMessages() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < statusMessages.length) {
      const timer = setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, statusMessages[currentIndex].duration);

      return () => clearTimeout(timer);
    } else {
      setIsComplete(true);
    }
  }, [currentIndex]);

  return (
    <div className="text-center">
      <AnimatePresence mode="wait">
        {!isComplete && (
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-white/90 text-lg font-medium"
          >
            {statusMessages[currentIndex]?.text}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Progress dots */}
      <div className="flex justify-center mt-6 space-x-2">
        {statusMessages.map((_, index) => (
          <motion.div
            key={index}
            className={`w-2 h-2 rounded-full ${
              index <= currentIndex ? 'bg-cyan-400' : 'bg-white/30'
            }`}
            animate={index === currentIndex ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        ))}
      </div>
    </div>
  );
}
