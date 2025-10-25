'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BlurredMapBackground from '../components/Shared/BlurredMapBackground';
import ChatInput from '../components/Landing/ChatInput';
import AIThinking from '../components/Processing/AIThinking';
import StatusMessages from '../components/Processing/StatusMessages';
import ParkingCard from '../components/Results/ParkingCard';
import NavigationModal from '../components/HUD/NavigationModal';

type AppState = 'landing' | 'processing' | 'results' | 'navigation';

// Mock data for parking options
const parkingOptions = [
  {
    id: 1,
    name: "Technology Square Deck",
    address: "760 Spring St NW",
    walkTime: "4 min",
    cost: "$8",
    availableSpots: 47,
    totalSpots: 500,
    score: 94,
    recommended: true,
    insights: ["No traffic", "Covered"],
    warning: null,
    navigation: {
      distance: "0.2 mi",
      eta: "4 min",
      directions: [
        { instruction: "Head north on Peachtree St", distance: "300 ft", type: "straight" },
        { instruction: "Turn right on Spring St", distance: "0.1 mi", type: "right" },
        { instruction: "Turn left into Tech Square Deck", distance: "0.2 mi", type: "left" },
        { instruction: "Parking entrance on right", distance: "50 ft", type: "destination" }
      ]
    }
  },
  {
    id: 2,
    name: "Centergy Parking",
    address: "75 5th St NW",
    walkTime: "6 min",
    cost: "$10",
    availableSpots: 28,
    totalSpots: 200,
    score: 87,
    recommended: false,
    insights: ["Good availability"],
    warning: null,
    navigation: {
      distance: "0.3 mi",
      eta: "6 min",
      directions: [
        { instruction: "Head south on Peachtree St", distance: "200 ft", type: "straight" },
        { instruction: "Turn left on 5th St", distance: "0.2 mi", type: "left" },
        { instruction: "Parking entrance on left", distance: "100 ft", type: "destination" }
      ]
    }
  },
  {
    id: 3,
    name: "MARTA Midtown",
    address: "10th St & Peachtree St",
    walkTime: "16 min",
    cost: "$2",
    availableSpots: 156,
    totalSpots: 300,
    score: 78,
    recommended: false,
    insights: [],
    warning: "Longer walk",
    navigation: {
      distance: "0.8 mi",
      eta: "16 min",
      directions: [
        { instruction: "Head north on Peachtree St", distance: "0.5 mi", type: "straight" },
        { instruction: "Turn right on 10th St", distance: "0.3 mi", type: "right" },
        { instruction: "MARTA station on right", distance: "50 ft", type: "destination" }
      ]
    }
  },
  {
    id: 4,
    name: "North Avenue Deck",
    address: "North Ave & Techwood Dr",
    walkTime: "10 min",
    cost: "$5",
    availableSpots: 3,
    totalSpots: 400,
    score: 52,
    recommended: false,
    insights: [],
    warning: "Stadium traffic",
    navigation: {
      distance: "0.5 mi",
      eta: "10 min",
      directions: [
        { instruction: "Head north on Peachtree St", distance: "0.3 mi", type: "straight" },
        { instruction: "Turn left on North Ave", distance: "0.2 mi", type: "left" },
        { instruction: "Parking deck on right", distance: "100 ft", type: "destination" }
      ]
    }
  },
  {
    id: 5,
    name: "Bobby Dodd Stadium",
    address: "150 Bobby Dodd Way",
    walkTime: "8 min",
    cost: "$25",
    availableSpots: 0,
    totalSpots: 200,
    score: 28,
    recommended: false,
    insights: [],
    warning: "Game day full",
    navigation: {
      distance: "0.4 mi",
      eta: "8 min",
      directions: [
        { instruction: "Head north on Peachtree St", distance: "0.2 mi", type: "straight" },
        { instruction: "Turn right on Bobby Dodd Way", distance: "0.2 mi", type: "right" },
        { instruction: "Stadium parking on left", distance: "50 ft", type: "destination" }
      ]
    }
  }
];

export default function Home() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [userMessage, setUserMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [selectedParking, setSelectedParking] = useState<any>(null);

  const handleSendMessage = (message: string) => {
    setUserMessage(message);
    setAppState('processing');
    
    // Simulate processing time
    setTimeout(() => {
      setAppState('results');
    }, 4000);
  };

  const handleStartListening = () => {
    setIsListening(true);
    // Simulate listening for 2 seconds
    setTimeout(() => {
      setIsListening(false);
      handleSendMessage("I need parking at ATDC around 2pm on Saturday");
    }, 2000);
  };

  const handleStopListening = () => {
    setIsListening(false);
  };

  const handleParkingSelect = (parking: any) => {
    setSelectedParking(parking);
    setAppState('navigation');
  };

  const handleCloseNavigation = () => {
    setSelectedParking(null);
    setAppState('results');
  };

  const handleBackToLanding = () => {
    setAppState('landing');
    setUserMessage('');
  };

  return (
    <div className="min-h-screen overflow-hidden">
      <BlurredMapBackground />
      
      <AnimatePresence mode="wait">
        {appState === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6"
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl font-bold text-gray-800 mb-2 tracking-tight">
                EZParkr
              </h1>
              <p className="text-gray-600 text-lg">
                AI-powered parking assistant
              </p>
            </motion.div>

            {/* Chat Input */}
            <ChatInput
              onSend={handleSendMessage}
              isListening={isListening}
              onStartListening={handleStartListening}
              onStopListening={handleStopListening}
            />
          </motion.div>
        )}

        {appState === 'processing' && (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 min-h-screen flex flex-col items-center justify-center"
          >
            <AIThinking />
            <StatusMessages />
          </motion.div>
        )}

        {appState === 'results' && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 min-h-screen"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-[#87BED7]/20 p-6">
              <div className="flex items-center justify-between">
                <button
                  onClick={handleBackToLanding}
                  className="text-[#87BED7] hover:text-[#87BED7]/80 transition-colors"
                >
                  ← Back
                </button>
                <div className="text-center">
                  <h2 className="text-gray-800 font-semibold">ATDC • Saturday 2:00 PM</h2>
                  <p className="text-gray-600 text-sm">5 parking options found</p>
                </div>
                <div className="w-8" /> {/* Spacer */}
              </div>
            </div>

            {/* Results List */}
            <div className="p-6 space-y-4">
              {parkingOptions.map((parking, index) => (
                <ParkingCard
                  key={parking.id}
                  {...parking}
                  onSelect={() => handleParkingSelect(parking)}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        )}

        {appState === 'navigation' && selectedParking && (
          <NavigationModal
            isOpen={true}
            onClose={handleCloseNavigation}
            parkingData={selectedParking.navigation}
          />
        )}
      </AnimatePresence>
    </div>
  );
}