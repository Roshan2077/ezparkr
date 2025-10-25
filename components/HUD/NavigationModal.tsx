'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Navigation, Phone, Share2, MapPin } from 'lucide-react';
import { useState } from 'react';

interface NavigationModalProps {
  isOpen: boolean;
  onClose: () => void;
  parkingData: {
    name: string;
    address: string;
    distance: string;
    eta: string;
    directions: Array<{
      instruction: string;
      distance: string;
      type: 'straight' | 'left' | 'right' | 'destination';
    }>;
  };
}

export default function NavigationModal({ isOpen, onClose, parkingData }: NavigationModalProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const getDirectionIcon = (type: string) => {
    switch (type) {
      case 'left': return '⬅️';
      case 'right': return '➡️';
      case 'destination': return '🅿️';
      default: return '⬆️';
    }
  };

  const nextDirection = () => {
    if (currentStep < parkingData.directions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevDirection = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-white to-blue-50 rounded-t-3xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#87BED7]/20">
              <div>
                <h2 className="text-gray-800 text-xl font-semibold">{parkingData.name}</h2>
                <p className="text-gray-600 text-sm">{parkingData.address}</p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-[#87BED7]/10 flex items-center justify-center text-[#87BED7] hover:bg-[#87BED7]/20 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* HUD Map Area */}
            <div className="relative h-64 bg-gradient-to-br from-blue-100 to-blue-200 overflow-hidden">
              {/* Simulated map with route */}
              <div className="absolute inset-0">
                <svg className="w-full h-full" viewBox="0 0 400 200">
                  {/* Route line */}
                  <motion.path
                    d="M50 100 Q200 50 350 100"
                    stroke="#87BED7"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray="10,5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                  
                  {/* Current location */}
                  <motion.circle
                    cx="50"
                    cy="100"
                    r="8"
                    fill="#87BED7"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  
                  {/* Destination */}
                  <motion.circle
                    cx="350"
                    cy="100"
                    r="8"
                    fill="#C93135"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                  />
                </svg>
              </div>

              {/* HUD Overlay Elements */}
              <div className="absolute top-4 left-4 right-4 flex justify-between">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/80 backdrop-blur-md rounded-lg px-3 py-2 text-gray-800"
                >
                  <div className="text-[#87BED7] text-sm font-mono">{parkingData.distance}</div>
                  <div className="text-xs text-gray-600">away</div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white/80 backdrop-blur-md rounded-lg px-3 py-2 text-gray-800"
                >
                  <div className="text-green-600 text-sm font-mono">{parkingData.eta}</div>
                  <div className="text-xs text-gray-600">arrival</div>
                </motion.div>
              </div>

              {/* Next turn indicator */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 text-center">
                  <div className="text-4xl mb-2">
                    {getDirectionIcon(parkingData.directions[currentStep]?.type)}
                  </div>
                  <div className="text-gray-800 font-semibold text-sm">
                    {parkingData.directions[currentStep]?.instruction}
                  </div>
                  <div className="text-[#87BED7] text-xs font-mono">
                    {parkingData.directions[currentStep]?.distance}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Turn-by-turn instructions */}
            <div className="p-6">
              <h3 className="text-gray-800 font-semibold mb-4">Turn-by-Turn Directions</h3>
              
              <div className="space-y-3">
                {parkingData.directions.map((direction, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center space-x-3 p-3 rounded-lg ${
                      index === currentStep 
                        ? 'bg-[#87BED7]/20 border border-[#87BED7]/50' 
                        : 'bg-gray-50'
                    }`}
                  >
                    <div className="text-2xl">
                      {getDirectionIcon(direction.type)}
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-800 text-sm font-medium">
                        {direction.instruction}
                      </div>
                      <div className="text-gray-600 text-xs font-mono">
                        {direction.distance}
                      </div>
                    </div>
                    {index === currentStep && (
                      <div className="w-2 h-2 bg-[#87BED7] rounded-full animate-pulse" />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Navigation controls */}
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={prevDirection}
                  disabled={currentStep === 0}
                  className="flex-1 py-3 bg-[#87BED7]/10 rounded-xl text-[#87BED7] font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#87BED7]/20 transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={nextDirection}
                  disabled={currentStep === parkingData.directions.length - 1}
                  className="flex-1 py-3 bg-[#87BED7]/10 rounded-xl text-[#87BED7] font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#87BED7]/20 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="p-6 border-t border-[#87BED7]/20">
              <div className="flex space-x-3">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-[#87BED7] text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-[#87BED7]/80 transition-colors"
                >
                  <Navigation size={20} />
                  <span>Start Navigation</span>
                </motion.button>
              </div>
              
              <div className="flex space-x-3 mt-3">
                <button className="flex-1 py-3 bg-[#87BED7]/10 rounded-xl text-[#87BED7] font-medium flex items-center justify-center space-x-2 hover:bg-[#87BED7]/20 transition-colors">
                  <Phone size={16} />
                  <span>Call Facility</span>
                </button>
                <button className="flex-1 py-3 bg-[#87BED7]/10 rounded-xl text-[#87BED7] font-medium flex items-center justify-center space-x-2 hover:bg-[#87BED7]/20 transition-colors">
                  <Share2 size={16} />
                  <span>Share</span>
                </button>
                <button className="flex-1 py-3 bg-[#87BED7]/10 rounded-xl text-[#87BED7] font-medium flex items-center justify-center space-x-2 hover:bg-[#87BED7]/20 transition-colors">
                  <MapPin size={16} />
                  <span>Details</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
