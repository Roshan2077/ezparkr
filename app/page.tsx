'use client';

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your parking assistant. I can help you find parking spots, check availability, and provide directions. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [speechRecognition, setSpeechRecognition] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const speechSynthesis = useRef<SpeechSynthesis | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize speech recognition
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
          setIsListening(true);
        };

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInputValue(transcript);
          setIsListening(false);
        };

        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        setSpeechRecognition(recognition);
        setVoiceSupported(true);
      }

      // Initialize speech synthesis
      if ('speechSynthesis' in window) {
        speechSynthesis.current = window.speechSynthesis;
      }
    }
  }, []);

  const startVoiceInput = () => {
    if (speechRecognition && !isListening) {
      speechRecognition.start();
    }
  };

  const stopVoiceInput = () => {
    if (speechRecognition && isListening) {
      speechRecognition.stop();
    }
  };

  const speakText = (text: string) => {
    if (speechSynthesis.current && 'speechSynthesis' in window) {
      // Cancel any ongoing speech
      speechSynthesis.current.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;

      utterance.onstart = () => {
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
      };

      speechSynthesis.current.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (speechSynthesis.current) {
      speechSynthesis.current.cancel();
      setIsSpeaking(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue);
      const botMessage: Message = {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);

      // Speak the bot response if voice is supported
      if (voiceSupported) {
        setTimeout(() => {
          speakText(botResponse);
        }, 500);
      }
    }, 1000 + Math.random() * 1000);
  };

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    if (input.includes('parking') || input.includes('spot')) {
      return "I can see several available parking spots on the map. The closest ones are in zones A and B. Zone A has 5 available spots and Zone B has 3 spots. Would you like directions to either zone?";
    } else if (input.includes('available') || input.includes('free')) {
      return "Currently showing 12 available parking spots across different zones. The green markers on the map indicate free spaces. Hourly rate is $2.50. Would you like me to reserve a spot for you?";
    } else if (input.includes('price') || input.includes('cost') || input.includes('rate')) {
      return "Parking rates are: $2.50/hour for regular spots, $3.00/hour for premium spots near entrances. Daily maximum is $15. Premium spots are marked in blue on the map.";
    } else if (input.includes('reserve') || input.includes('book')) {
      return "I can help you reserve a parking spot! Please let me know which zone you prefer and for how long you'll need it. Reservations can be made up to 24 hours in advance.";
    } else if (input.includes('directions') || input.includes('navigate')) {
      return "I can provide turn-by-turn directions to any available parking spot. Which zone would you like directions to? You can also click on any green marker on the map for quick directions.";
    } else {
      return "I'm here to help with all your parking needs! You can ask me about available spots, pricing, reservations, or directions. What would you like to know?";
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Sidebar with Map */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-2/5 bg-white dark:bg-gray-800 shadow-xl">
        <div className="flex flex-col w-full">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              🅿️ Parking Map
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Live parking availability
            </p>
          </div>

          <div className="flex-1 p-6">
            <div className="relative w-full h-96 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-green-200 to-blue-300 dark:from-green-800 dark:to-blue-800">
                {/* Simulated map with parking spots */}
                <div className="absolute top-4 left-4 w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
                <div className="absolute top-8 left-12 w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
                <div className="absolute top-16 left-8 w-3 h-3 bg-red-500 rounded-full shadow-lg"></div>
                <div className="absolute top-24 left-16 w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
                <div className="absolute top-32 left-6 w-3 h-3 bg-blue-500 rounded-full shadow-lg"></div>

                <div className="absolute top-12 right-8 w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
                <div className="absolute top-20 right-16 w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
                <div className="absolute top-28 right-12 w-3 h-3 bg-red-500 rounded-full shadow-lg"></div>
                <div className="absolute top-36 right-20 w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg"></div>

                <div className="absolute bottom-8 left-8 w-3 h-3 bg-blue-500 rounded-full shadow-lg"></div>
                <div className="absolute bottom-16 left-16 w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
                <div className="absolute bottom-12 right-12 w-3 h-3 bg-red-500 rounded-full shadow-lg"></div>

                {/* Zone labels */}
                <div className="absolute top-6 left-20 bg-white dark:bg-gray-800 px-2 py-1 rounded text-xs font-medium text-gray-700 dark:text-gray-300 shadow">
                  Zone A
                </div>
                <div className="absolute top-14 right-24 bg-white dark:bg-gray-800 px-2 py-1 rounded text-xs font-medium text-gray-700 dark:text-gray-300 shadow">
                  Zone B
                </div>
                <div className="absolute bottom-20 left-20 bg-white dark:bg-gray-800 px-2 py-1 rounded text-xs font-medium text-gray-700 dark:text-gray-300 shadow">
                  Zone C
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-400">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-400">Occupied</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-400">Premium</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
              🅿️
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                ParkBot Assistant
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Your smart parking companion
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white rounded-br-md'
                    : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-bl-md border border-gray-200 dark:border-gray-600'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p className={`text-xs mt-2 ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
          {/* Voice status indicator */}
          {(isListening || isSpeaking) && (
            <div className="mb-3 flex items-center justify-center gap-2 py-2">
              {isListening && (
                <div className="flex items-center gap-2 text-red-500">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Listening...</span>
                  <div className="flex gap-1">
                    <div className="w-1 h-4 bg-red-400 rounded-full animate-pulse"></div>
                    <div className="w-1 h-6 bg-red-500 rounded-full animate-pulse" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-1 h-3 bg-red-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-1 h-5 bg-red-500 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
                  </div>
                </div>
              )}
              {isSpeaking && (
                <div className="flex items-center gap-2 text-green-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Speaking...</span>
                  <button
                    onClick={stopSpeaking}
                    className="ml-2 px-2 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full text-xs transition-colors"
                  >
                    Stop
                  </button>
                </div>
              )}
            </div>
          )}

          <form onSubmit={handleSendMessage} className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about parking availability, rates, or directions..."
                className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                disabled={isTyping || isListening}
              />
              {voiceSupported && (
                <button
                  type="button"
                  onClick={isListening ? stopVoiceInput : startVoiceInput}
                  disabled={isTyping}
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                    isListening 
                      ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
                      : 'bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-600 dark:text-gray-300'
                  }`}
                  title={isListening ? 'Stop listening' : 'Start voice input'}
                >
                  {isListening ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 6h12v12H6z"/>
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
                    </svg>
                  )}
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={isTyping || !inputValue.trim() || isListening}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white px-6 py-3 rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Send
            </button>
          </form>

          {/* Quick actions */}
          <div className="flex gap-2 mt-3 flex-wrap justify-between">
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setInputValue("Show me available parking spots")}
                disabled={isListening}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 text-gray-700 dark:text-gray-300 rounded-full text-sm transition-colors"
              >
                🚗 Find Parking
              </button>
              <button
                onClick={() => setInputValue("What are the parking rates?")}
                disabled={isListening}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 text-gray-700 dark:text-gray-300 rounded-full text-sm transition-colors"
              >
                💰 Check Rates
              </button>
              <button
                onClick={() => setInputValue("I need directions to the nearest spot")}
                disabled={isListening}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 text-gray-700 dark:text-gray-300 rounded-full text-sm transition-colors"
              >
                📍 Get Directions
              </button>
            </div>

            {/* Voice toggle info */}
            {voiceSupported && (
              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
                </svg>
                Voice enabled
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
