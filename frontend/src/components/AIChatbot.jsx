import React, { useState, useEffect, useRef } from 'react';
import { Bot, User, Mic, Send, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getGeminiResponse } from '../utils/geminiService'; // ✅ Gemini 2.0 Flash

const AIChatbot = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', content: '🤖 Do you have any problems? I am here to assist you!' },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  const allowedPaths = ['/dashboard', '/reading', '/assessment'];

  // Auto-close if outside allowed route
  useEffect(() => {
    if (!allowedPaths.includes(location.pathname)) {
      setIsOpen(false);
    }
  }, [location.pathname]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    try {
      const response = await getGeminiResponse(input); // ✅ Using chat mode with memory
      setMessages([...newMessages, { role: 'ai', content: response }]);
    } catch (error) {
      console.error('Gemini error:', error);
      setMessages([
        ...newMessages,
        { role: 'ai', content: '⚠️ Something went wrong. Please try again.' },
      ]);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-glow"
          >
            <Bot />
          </button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-[350px] max-h-[500px] bg-glass border border-borderGlass shadow-glow rounded-2xl backdrop-blur-xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b border-borderGlass">
              <div className="flex items-center gap-2 text-white font-semibold">
                <Bot size={20} /> SkillPath Assistant
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-red-400">
                <X size={18} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-3 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900/20 text-sm space-y-2 text-white">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-lg ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-800 text-gray-100'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {msg.role === 'ai' && <Bot size={14} className="mt-1" />}
                      {msg.role === 'user' && <User size={14} className="mt-1" />}
                      <span>{msg.content}</span>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input Box */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2 p-3 border-t border-borderGlass bg-glass"
            >
              <Mic size={18} className="text-gray-400" />
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
              />
              <button type="submit" className="text-blue-500 hover:text-blue-600">
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default AIChatbot;
