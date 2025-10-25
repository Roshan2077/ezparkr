'use client';

import { motion } from 'framer-motion';

export default function BlurredMapBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base map background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        {/* Simulated map elements */}
        <div className="absolute inset-0 opacity-20">
          {/* Roads */}
          <svg className="w-full h-full" viewBox="0 0 400 800">
            {/* Main roads */}
            <path
              d="M50 200 L350 200 M200 50 L200 750 M100 400 L300 400"
              stroke="white"
              strokeWidth="2"
              fill="none"
              opacity="0.3"
            />
            {/* Side roads */}
            <path
              d="M150 100 L150 300 M250 100 L250 300 M80 500 L320 500"
              stroke="white"
              strokeWidth="1"
              fill="none"
              opacity="0.2"
            />
            {/* Buildings */}
            <rect x="180" y="180" width="40" height="40" fill="white" opacity="0.1" />
            <rect x="120" y="220" width="30" height="30" fill="white" opacity="0.1" />
            <rect x="250" y="200" width="35" height="35" fill="white" opacity="0.1" />
          </svg>
        </div>
        
        {/* Animated overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-indigo-500/20"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(147, 51, 234, 0.2), rgba(59, 130, 246, 0.2), rgba(99, 102, 241, 0.2))",
              "linear-gradient(225deg, rgba(147, 51, 234, 0.2), rgba(59, 130, 246, 0.2), rgba(99, 102, 241, 0.2))",
              "linear-gradient(45deg, rgba(147, 51, 234, 0.2), rgba(59, 130, 246, 0.2), rgba(99, 102, 241, 0.2))"
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Subtle scan lines */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)"
          }}
          animate={{
            y: [0, 4, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
    </div>
  );
}
