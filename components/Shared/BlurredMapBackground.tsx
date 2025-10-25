'use client';

import { motion } from 'framer-motion';

export default function BlurredMapBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base map background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-blue-50 to-white">
        {/* Simulated map elements */}
        <div className="absolute inset-0 opacity-20">
          {/* Roads */}
          <svg className="w-full h-full" viewBox="0 0 400 800">
            {/* Main roads */}
            <path
              d="M50 200 L350 200 M200 50 L200 750 M100 400 L300 400"
              stroke="#87BED7"
              strokeWidth="2"
              fill="none"
              opacity="0.4"
            />
            {/* Side roads */}
            <path
              d="M150 100 L150 300 M250 100 L250 300 M80 500 L320 500"
              stroke="#87BED7"
              strokeWidth="1"
              fill="none"
              opacity="0.3"
            />
            {/* Buildings */}
            <rect x="180" y="180" width="40" height="40" fill="#87BED7" opacity="0.2" />
            <rect x="120" y="220" width="30" height="30" fill="#87BED7" opacity="0.2" />
            <rect x="250" y="200" width="35" height="35" fill="#87BED7" opacity="0.2" />
          </svg>
        </div>
        
        {/* Animated overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-200/30 via-blue-100/30 to-white/30"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(135, 190, 215, 0.3), rgba(135, 190, 215, 0.2), rgba(255, 255, 255, 0.3))",
              "linear-gradient(225deg, rgba(135, 190, 215, 0.3), rgba(135, 190, 215, 0.2), rgba(255, 255, 255, 0.3))",
              "linear-gradient(45deg, rgba(135, 190, 215, 0.3), rgba(135, 190, 215, 0.2), rgba(255, 255, 255, 0.3))"
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
            background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(135,190,215,0.1) 2px, rgba(135,190,215,0.1) 4px)"
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
