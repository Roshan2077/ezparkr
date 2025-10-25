'use client';

import { motion } from 'framer-motion';
import { Star, MapPin, Clock, DollarSign, Car, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface ParkingCardProps {
  id: number;
  name: string;
  address: string;
  walkTime: string;
  cost: string;
  availableSpots: number;
  totalSpots: number;
  score: number;
  recommended: boolean;
  insights: string[];
  warning?: string | null;
  onSelect: () => void;
  index: number;
}

export default function ParkingCard({
  id,
  name,
  address,
  walkTime,
  cost,
  availableSpots,
  totalSpots,
  score,
  recommended,
  insights,
  warning,
  onSelect,
  index
}: ParkingCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-[#C93135]';
  };

  const isSoldOut = availableSpots === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={`relative bg-white/90 backdrop-blur-md rounded-2xl border border-[#87BED7]/30 p-4 cursor-pointer transition-all duration-200 hover:bg-[#87BED7]/10 ${
        recommended ? 'ring-2 ring-[#87BED7]/50' : ''
      }`}
    >
      {/* Recommended badge */}
      {recommended && (
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: index * 0.08 + 0.3, type: "spring", stiffness: 200 }}
          className="absolute -top-2 -right-2 bg-[#87BED7] text-white rounded-full p-1"
        >
          <Star size={16} fill="currentColor" />
        </motion.div>
      )}

      {/* Top row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-gray-800 font-semibold text-lg">{name}</h3>
          <p className="text-gray-600 text-sm">{address}</p>
        </div>
        
        {/* Score badge */}
        <motion.div
          className={`w-10 h-10 rounded-full ${getScoreColor(score)} flex items-center justify-center text-white font-bold text-sm`}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ delay: index * 0.08 + 0.5, duration: 0.3 }}
        >
          {score}
        </motion.div>
      </div>

      {/* Middle row - stats */}
      <div className="flex items-center space-x-4 mb-3 text-gray-700">
        <div className="flex items-center space-x-1">
          <Clock size={16} />
          <span className="text-sm">{walkTime}</span>
        </div>
        <div className="flex items-center space-x-1">
          <DollarSign size={16} />
          <span className="text-sm">{cost}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Car size={16} />
          <span className="text-sm">
            {isSoldOut ? 'SOLD OUT' : `${availableSpots} spots`}
          </span>
        </div>
      </div>

      {/* Bottom row - insights and warnings */}
      <div className="flex flex-wrap gap-2">
        {insights.map((insight, insightIndex) => (
          <motion.span
            key={insight}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.08 + 0.6 + insightIndex * 0.1 }}
            className="px-3 py-1 bg-green-500/20 text-green-700 text-xs rounded-full border border-green-500/30 flex items-center space-x-1"
          >
            <CheckCircle2 size={14} className="text-green-600 mr-1" />
            {insight}
          </motion.span>
        ))}
        
        {warning && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.08 + 0.8 }}
            className="px-3 py-1 bg-[#C93135]/20 text-[#C93135] text-xs rounded-full border border-[#C93135]/30 flex items-center space-x-1"
          >
            <AlertTriangle size={12} />
            <span>{warning}</span>
          </motion.span>
        )}
      </div>
    </motion.div>
  );
}
