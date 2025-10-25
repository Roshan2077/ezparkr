'use client';

import { motion } from 'framer-motion';
import StatusMessages from './StatusMessages';

export default function AIThinking() {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white w-full h-full to-blue-100">
      {/* Animated AI orb */}
      <motion.div
        className="relative mb-8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Outer glow ring */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-[#87BED7] to-[#C93135] opacity-30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Main orb */}
        <motion.div
          className="w-24 h-24 rounded-full bg-gradient-to-r from-[#87BED7] via-[#87BED7] to-[#C93135] flex items-center justify-center relative overflow-hidden"
          animate={{
            background: [
              "linear-gradient(45deg, #87BED7, #87BED7, #C93135)",
              "linear-gradient(135deg, #87BED7, #C93135, #87BED7)",
              "linear-gradient(225deg, #C93135, #87BED7, #87BED7)",
              "linear-gradient(315deg, #87BED7, #87BED7, #C93135)"
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {/* Inner particles */}
          <div className="absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                  transformOrigin: '0 0'
                }}
                animate={{
                  rotate: [0, 360],
                  x: [0, Math.cos(i * 60 * Math.PI / 180) * 20],
                  y: [0, Math.sin(i * 60 * Math.PI / 180) * 20],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* Route-finding animation - scanning lines */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`scan-${i}`}
                className="absolute w-full h-0.5 bg-white/60"
                style={{
                  top: '50%',
                  left: 0
                }}
                animate={{
                  x: ['-100%', '100%'],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* Route-finding animation - connection dots */}
          <div className="absolute inset-0">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`connection-${i}`}
                className="absolute w-1.5 h-1.5 bg-white rounded-full"
                style={{
                  left: `${20 + (i * 20)}%`,
                  top: `${30 + (i % 2) * 40}%`
                }}
                animate={{
                  scale: [0.5, 1.2, 0.5],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Route analysis visualization */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Scanning radar effect */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-16 h-16 border border-[#87BED7]/30 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Route path simulation */}
        <motion.div
          className="absolute top-1/3 right-1/4 w-20 h-0.5 bg-gradient-to-r from-[#87BED7] to-transparent"
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            delay: 0.5,
            ease: "easeInOut"
          }}
        />
        
        {/* Data flow indicators */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`data-flow-${i}`}
            className="absolute w-2 h-2 bg-[#C93135] rounded-full"
            style={{
              top: `${40 + i * 15}%`,
              right: `${20 + i * 10}%`
            }}
            animate={{
              x: [-20, 20, -20],
              y: [0, -10, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.7,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Status messages */}
      <div className="mt-8">
        <StatusMessages />
      </div>
    </div>
  );
}