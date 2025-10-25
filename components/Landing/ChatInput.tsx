'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Send, X } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  isListening?: boolean;
  onStartListening?: () => void;
  onStopListening?: () => void;
}

export default function ChatInput({ 
  onSend, 
  isListening = false, 
  onStartListening, 
  onStopListening 
}: ChatInputProps) {
  const [input, setInput] = useState('');
  const [showExamples, setShowExamples] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input.trim());
      setInput('');
      setShowExamples(false);
    }
  };

  const handleExampleClick = (example: string) => {
    setInput(example);
    setShowExamples(false);
  };

  const examples = [
    "I need parking at Tech Square",
    "Find me a spot near ATDC", 
    "GT campus, avoiding game traffic"
  ];

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Example prompts */}
      <AnimatePresence>
        {showExamples && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6 space-y-2"
          >
            {examples.map((example, index) => (
              <motion.button
                key={example}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleExampleClick(example)}
                className="block w-full text-left px-4 py-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white/90 hover:bg-white/20 transition-all duration-200 text-sm"
              >
                {example}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input form */}
      <motion.form
        onSubmit={handleSubmit}
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Where do you need to park?"
            className="w-full bg-transparent text-white placeholder-white/60 text-lg outline-none pr-20"
            autoComplete="off"
          />
          
          {/* Action buttons */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {/* Microphone button */}
            <motion.button
              type="button"
              onClick={isListening ? onStopListening : onStartListening}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                isListening 
                  ? 'bg-red-500 text-white shadow-lg shadow-red-500/50' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
              whileTap={{ scale: 0.95 }}
              animate={isListening ? { scale: [1, 1.1, 1] } : {}}
              transition={isListening ? { duration: 1, repeat: Infinity } : {}}
            >
              <Mic size={20} />
            </motion.button>

            {/* Send button */}
            <AnimatePresence>
              {input.trim() && (
                <motion.button
                  type="submit"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="w-12 h-12 rounded-full bg-cyan-500 text-white flex items-center justify-center hover:bg-cyan-600 transition-colors duration-200 shadow-lg shadow-cyan-500/50"
                  whileTap={{ scale: 0.95 }}
                >
                  <Send size={20} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.form>
    </div>
  );
}
