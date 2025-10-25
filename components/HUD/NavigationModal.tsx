'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Navigation, Phone, Share2, MapPin, ArrowUp, ArrowRight, ArrowLeft, MapPin as DestinationPin, ExternalLink } from 'lucide-react';
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
      case 'left': return <ArrowLeft size={24} className="text-[#87BED7]" />;
      case 'right': return <ArrowRight size={24} className="text-[#87BED7]" />;
      case 'destination': return <DestinationPin size={24} className="text-[#C93135]" />;
      default: return <ArrowUp size={24} className="text-[#87BED7]" />;
    }
  };

  const openInGoogleMaps = () => {
    const address = encodeURIComponent(parkingData.address);
    const url = `https://www.google.com/maps/search/?api=1&query=${address}`;
    window.open(url, '_blank');
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
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-white to-blue-50 rounded-t-3xl max-h-[95vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#87BED7]/20">
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-[#87BED7]/10 flex items-center justify-center text-[#87BED7] hover:bg-[#87BED7]/20 transition-colors"
              >
                <X size={16} />
              </button>
              
              <div className="flex-1 text-center">
                <h2 className="text-gray-800 text-xl font-semibold">{parkingData.name}</h2>
                <p className="text-gray-600 text-sm">{parkingData.address}</p>
              </div>
              
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={openInGoogleMaps}
                className="bg-[#87BED7] text-white px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 hover:bg-[#87BED7]/80 transition-colors"
              >
                <ExternalLink size={16} />
                <span>Open in Maps</span>
              </motion.button>
            </div>

            {/* HUD Map Area */}
            <div className="relative h-80 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
              {/* HUD Grid Pattern */}
              <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <defs>
                    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#87BED7" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill="url(#grid)" />
                </svg>
              </div>

              {/* HUD Scan Lines */}
              <motion.div
                className="absolute inset-0 opacity-30"
                style={{
                  background: "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(135,190,215,0.3) 2px, rgba(135,190,215,0.3) 4px)"
                }}
                animate={{
                  x: [0, 4, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />

              {/* Enhanced Map with Roads */}
              <div className="absolute inset-0">
                <svg className="w-full h-full" viewBox="0 0 400 300">
                  {/* Major Roads */}
                  <path
                    d="M50 150 L350 150 M200 50 L200 250 M100 100 L300 100 M100 200 L300 200"
                    stroke="#87BED7"
                    strokeWidth="3"
                    fill="none"
                    opacity="0.6"
                  />
                  
                  {/* Side Roads */}
                  <path
                    d="M150 100 L150 200 M250 100 L250 200 M80 150 L120 150 M280 150 L320 150"
                    stroke="#87BED7"
                    strokeWidth="2"
                    fill="none"
                    opacity="0.4"
                  />
                  
                  {/* Buildings */}
                  <rect x="180" y="120" width="40" height="30" fill="#87BED7" opacity="0.3" />
                  <rect x="120" y="140" width="30" height="20" fill="#87BED7" opacity="0.3" />
                  <rect x="250" y="130" width="35" height="25" fill="#87BED7" opacity="0.3" />
                  <rect x="80" y="160" width="25" height="20" fill="#87BED7" opacity="0.3" />
                  <rect x="300" y="155" width="30" height="25" fill="#87BED7" opacity="0.3" />
                  
                  {/* Animated Route Line */}
                  <motion.path
                    d="M50 150 Q200 100 350 150"
                    stroke="#87BED7"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray="15,10"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 3, ease: "easeInOut" }}
                  />
                  
                  {/* Route Dots */}
                  <motion.circle
                    cx="100"
                    cy="150"
                    r="3"
                    fill="#87BED7"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <motion.circle
                    cx="200"
                    cy="100"
                    r="3"
                    fill="#87BED7"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                  />
                  <motion.circle
                    cx="300"
                    cy="150"
                    r="3"
                    fill="#87BED7"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 1 }}
                  />
                  
                  {/* Current Location with Pulse */}
                  <motion.g
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <circle cx="50" cy="150" r="12" fill="#87BED7" opacity="0.3" />
                    <circle cx="50" cy="150" r="8" fill="#87BED7" />
                    <circle cx="50" cy="150" r="4" fill="white" />
                  </motion.g>
                  
                  {/* Destination with Pulse */}
                  <motion.g
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                  >
                    <circle cx="350" cy="150" r="12" fill="#C93135" opacity="0.3" />
                    <circle cx="350" cy="150" r="8" fill="#C93135" />
                    <DestinationPin size={16} x="342" y="142" className="text-white" />
                  </motion.g>
                </svg>
              </div>

              {/* HUD Overlay Elements */}
              <div className="absolute top-4 left-4 right-4 flex justify-between">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-black/70 backdrop-blur-md rounded-lg px-3 py-2 text-white border border-[#87BED7]/30"
                >
                  <div className="text-[#87BED7] text-sm font-mono font-bold">{parkingData.distance}</div>
                  <div className="text-xs text-white/70">DISTANCE</div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-black/70 backdrop-blur-md rounded-lg px-3 py-2 text-white border border-green-500/30"
                >
                  <div className="text-green-400 text-sm font-mono font-bold">{parkingData.eta}</div>
                  <div className="text-xs text-white/70">ETA</div>
                </motion.div>
              </div>

              {/* Speed and Direction Indicator */}
              <div className="absolute bottom-4 right-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="bg-black/70 backdrop-blur-md rounded-full p-3 text-white border border-[#87BED7]/30"
                >
                  <div className="text-center">
                    <div className="text-[#87BED7] text-xs font-mono">HEADING</div>
                    <div className="text-white text-lg font-bold">N</div>
                  </div>
                </motion.div>
              </div>

              {/* Next turn indicator */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                <div className="bg-black/80 backdrop-blur-md rounded-2xl p-6 text-center border border-[#87BED7]/30">
                  <div className="mb-3">
                    {getDirectionIcon(parkingData.directions[currentStep]?.type)}
                  </div>
                  <div className="text-white font-semibold text-sm mb-1">
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
                    <div className="flex items-center justify-center w-8 h-8">
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
            </div>

            {/* Action buttons */}
            <div className="p-6 border-t border-[#87BED7]/20">
              <div className="flex space-x-3">
                <button className="w-3/4 py-3 bg-[#87BED7]/10 rounded-xl text-[#87BED7] font-medium flex items-center justify-center space-x-2 hover:bg-[#87BED7]/20 transition-colors">
                  <Navigation size={16} />
                  <span>Start Navigation</span>
                </button>
                <button className="w-1/4 py-3 bg-[#87BED7]/10 rounded-xl text-[#87BED7] font-medium flex items-center justify-center space-x-2 hover:bg-[#87BED7]/20 transition-colors">
                  <Share2 size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
