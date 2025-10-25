'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, RotateCcw } from 'lucide-react';

export interface ParkingPreferences {
  // Cost preferences
  maxCost: number;
  preferFree: boolean;
  costTolerance: 'low' | 'medium' | 'high';
  
  // Distance preferences
  maxWalkingDistance: number; // in minutes
  preferCloser: boolean;
  
  // Coverage preferences
  preferCovered: boolean;
  requireCovered: boolean;
  
  // Availability preferences
  minAvailability: number; // minimum spots required
  avoidFull: boolean;
  
  // Time preferences
  maxWaitTime: number; // in minutes
  preferQuickExit: boolean;
  
  // Safety preferences
  preferWellLit: boolean;
  preferSecurity: boolean;
  
  // Accessibility preferences
  requireAccessible: boolean;
  requireEVCharging: boolean;
  
  // Event preferences
  avoidEventTraffic: boolean;
  preferEventParking: boolean;
  
  // Advanced preferences
  prioritizeScore: boolean;
  avoidConstruction: boolean;
  preferReserved: boolean;
}

const defaultPreferences: ParkingPreferences = {
  maxCost: 15,
  preferFree: false,
  costTolerance: 'medium',
  maxWalkingDistance: 10,
  preferCloser: true,
  preferCovered: false,
  requireCovered: false,
  minAvailability: 5,
  avoidFull: true,
  maxWaitTime: 5,
  preferQuickExit: false,
  preferWellLit: false,
  preferSecurity: false,
  requireAccessible: false,
  requireEVCharging: false,
  avoidEventTraffic: true,
  preferEventParking: false,
  prioritizeScore: true,
  avoidConstruction: true,
  preferReserved: false,
};

interface PreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  preferences: ParkingPreferences;
  onSave: (preferences: ParkingPreferences) => void;
}

export default function PreferencesModal({ 
  isOpen, 
  onClose, 
  preferences, 
  onSave 
}: PreferencesModalProps) {
  const [localPreferences, setLocalPreferences] = useState<ParkingPreferences>(preferences);
  const [activeSection, setActiveSection] = useState<string>('cost');

  const handleSave = () => {
    onSave(localPreferences);
    onClose();
  };

  const handleReset = () => {
    setLocalPreferences(defaultPreferences);
  };

  const updatePreference = (key: keyof ParkingPreferences, value: any) => {
    setLocalPreferences(prev => ({ ...prev, [key]: value }));
  };

  const sections = [
    { id: 'cost', label: 'Cost', icon: '💰' },
    { id: 'distance', label: 'Distance', icon: '🚶' },
    { id: 'coverage', label: 'Coverage', icon: '🏢' },
    { id: 'availability', label: 'Availability', icon: '📊' },
    { id: 'safety', label: 'Safety', icon: '🔒' },
    { id: 'accessibility', label: 'Accessibility', icon: '♿' },
    { id: 'advanced', label: 'Advanced', icon: '⚙️' },
  ];

  const renderCostSection = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Maximum Cost ($)
        </label>
        <input
          type="range"
          min="0"
          max="50"
          value={localPreferences.maxCost}
          onChange={(e) => updatePreference('maxCost', parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>$0</span>
          <span className="font-medium">${localPreferences.maxCost}</span>
          <span>$50+</span>
        </div>
      </div>

      <div className="space-y-3">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={localPreferences.preferFree}
            onChange={(e) => updatePreference('preferFree', e.target.checked)}
            className="w-4 h-4 text-[#87BED7] bg-gray-100 border-gray-300 rounded focus:ring-[#87BED7]"
          />
          <span className="text-sm text-gray-700">Prefer free parking when available</span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Cost Tolerance
        </label>
        <div className="space-y-2">
          {[
            { value: 'low', label: 'Low - Stick to budget strictly' },
            { value: 'medium', label: 'Medium - Some flexibility' },
            { value: 'high', label: 'High - Cost is not a major factor' }
          ].map((option) => (
            <label key={option.value} className="flex items-center space-x-3">
              <input
                type="radio"
                name="costTolerance"
                value={option.value}
                checked={localPreferences.costTolerance === option.value}
                onChange={(e) => updatePreference('costTolerance', e.target.value)}
                className="w-4 h-4 text-[#87BED7]"
              />
              <span className="text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDistanceSection = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Maximum Walking Distance (minutes)
        </label>
        <input
          type="range"
          min="1"
          max="30"
          value={localPreferences.maxWalkingDistance}
          onChange={(e) => updatePreference('maxWalkingDistance', parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>1 min</span>
          <span className="font-medium">{localPreferences.maxWalkingDistance} min</span>
          <span>30+ min</span>
        </div>
      </div>

      <div className="space-y-3">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={localPreferences.preferCloser}
            onChange={(e) => updatePreference('preferCloser', e.target.checked)}
            className="w-4 h-4 text-[#87BED7] bg-gray-100 border-gray-300 rounded focus:ring-[#87BED7]"
          />
          <span className="text-sm text-gray-700">Prioritize closer parking options</span>
        </label>
      </div>
    </div>
  );

  const renderCoverageSection = () => (
    <div className="space-y-6">
      <div className="space-y-3">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={localPreferences.preferCovered}
            onChange={(e) => updatePreference('preferCovered', e.target.checked)}
            className="w-4 h-4 text-[#87BED7] bg-gray-100 border-gray-300 rounded focus:ring-[#87BED7]"
          />
          <span className="text-sm text-gray-700">Prefer covered parking</span>
        </label>

        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={localPreferences.requireCovered}
            onChange={(e) => updatePreference('requireCovered', e.target.checked)}
            className="w-4 h-4 text-[#87BED7] bg-gray-100 border-gray-300 rounded focus:ring-[#87BED7]"
          />
          <span className="text-sm text-gray-700">Require covered parking</span>
        </label>
      </div>
    </div>
  );

  const renderAvailabilitySection = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Minimum Available Spots
        </label>
        <input
          type="range"
          min="1"
          max="50"
          value={localPreferences.minAvailability}
          onChange={(e) => updatePreference('minAvailability', parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>1 spot</span>
          <span className="font-medium">{localPreferences.minAvailability} spots</span>
          <span>50+ spots</span>
        </div>
      </div>

      <div className="space-y-3">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={localPreferences.avoidFull}
            onChange={(e) => updatePreference('avoidFull', e.target.checked)}
            className="w-4 h-4 text-[#87BED7] bg-gray-100 border-gray-300 rounded focus:ring-[#87BED7]"
          />
          <span className="text-sm text-gray-700">Avoid parking that's likely to be full</span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Maximum Wait Time (minutes)
        </label>
        <input
          type="range"
          min="0"
          max="30"
          value={localPreferences.maxWaitTime}
          onChange={(e) => updatePreference('maxWaitTime', parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>No wait</span>
          <span className="font-medium">{localPreferences.maxWaitTime} min</span>
          <span>30+ min</span>
        </div>
      </div>
    </div>
  );

  const renderSafetySection = () => (
    <div className="space-y-6">
      <div className="space-y-3">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={localPreferences.preferWellLit}
            onChange={(e) => updatePreference('preferWellLit', e.target.checked)}
            className="w-4 h-4 text-[#87BED7] bg-gray-100 border-gray-300 rounded focus:ring-[#87BED7]"
          />
          <span className="text-sm text-gray-700">Prefer well-lit parking areas</span>
        </label>

        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={localPreferences.preferSecurity}
            onChange={(e) => updatePreference('preferSecurity', e.target.checked)}
            className="w-4 h-4 text-[#87BED7] bg-gray-100 border-gray-300 rounded focus:ring-[#87BED7]"
          />
          <span className="text-sm text-gray-700">Prefer areas with security presence</span>
        </label>
      </div>
    </div>
  );

  const renderAccessibilitySection = () => (
    <div className="space-y-6">
      <div className="space-y-3">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={localPreferences.requireAccessible}
            onChange={(e) => updatePreference('requireAccessible', e.target.checked)}
            className="w-4 h-4 text-[#87BED7] bg-gray-100 border-gray-300 rounded focus:ring-[#87BED7]"
          />
          <span className="text-sm text-gray-700">Require accessible parking</span>
        </label>

        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={localPreferences.requireEVCharging}
            onChange={(e) => updatePreference('requireEVCharging', e.target.checked)}
            className="w-4 h-4 text-[#87BED7] bg-gray-100 border-gray-300 rounded focus:ring-[#87BED7]"
          />
          <span className="text-sm text-gray-700">Require EV charging stations</span>
        </label>
      </div>
    </div>
  );

  const renderAdvancedSection = () => (
    <div className="space-y-6">
      <div className="space-y-3">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={localPreferences.avoidEventTraffic}
            onChange={(e) => updatePreference('avoidEventTraffic', e.target.checked)}
            className="w-4 h-4 text-[#87BED7] bg-gray-100 border-gray-300 rounded focus:ring-[#87BED7]"
          />
          <span className="text-sm text-gray-700">Avoid areas with event traffic</span>
        </label>

        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={localPreferences.avoidConstruction}
            onChange={(e) => updatePreference('avoidConstruction', e.target.checked)}
            className="w-4 h-4 text-[#87BED7] bg-gray-100 border-gray-300 rounded focus:ring-[#87BED7]"
          />
          <span className="text-sm text-gray-700">Avoid construction zones</span>
        </label>

        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={localPreferences.prioritizeScore}
            onChange={(e) => updatePreference('prioritizeScore', e.target.checked)}
            className="w-4 h-4 text-[#87BED7] bg-gray-100 border-gray-300 rounded focus:ring-[#87BED7]"
          />
          <span className="text-sm text-gray-700">Prioritize high-scoring options</span>
        </label>

        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={localPreferences.preferQuickExit}
            onChange={(e) => updatePreference('preferQuickExit', e.target.checked)}
            className="w-4 h-4 text-[#87BED7] bg-gray-100 border-gray-300 rounded focus:ring-[#87BED7]"
          />
          <span className="text-sm text-gray-700">Prefer parking with quick exit routes</span>
        </label>
      </div>
    </div>
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'cost': return renderCostSection();
      case 'distance': return renderDistanceSection();
      case 'coverage': return renderCoverageSection();
      case 'availability': return renderAvailabilitySection();
      case 'safety': return renderSafetySection();
      case 'accessibility': return renderAccessibilitySection();
      case 'advanced': return renderAdvancedSection();
      default: return renderCostSection();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#87BED7] to-[#87BED7]/80 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Parking Preferences</h2>
                <p className="text-white/80 text-sm mt-1">Customize your parking search criteria</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          <div className="flex h-[600px]">
            {/* Sidebar */}
            <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
              <div className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeSection === section.id
                        ? 'bg-[#87BED7] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-lg">{section.icon}</span>
                    <span className="font-medium">{section.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="max-w-2xl">
                {renderSectionContent()}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="flex items-center justify-between">
              <button
                onClick={handleReset}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <RotateCcw size={16} />
                <span>Reset to Defaults</span>
              </button>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 px-6 py-2 bg-[#87BED7] text-white rounded-lg hover:bg-[#87BED7]/80 transition-colors"
                >
                  <Save size={16} />
                  <span>Save Preferences</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
