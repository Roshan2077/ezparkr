'use client';

import { motion } from 'framer-motion';

export default function AIThinking() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
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
        </motion.div>
      </motion.div>

      {/* Status messages */}
      <div className="text-center space-y-4">
        <motion.div
          className="text-gray-700 text-lg font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Understanding your request...
        </motion.div>
      </div>
    </div>
  );
}