import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Send, Bot, User as UserIcon, MessageSquare } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

export function GeminiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'ai', text: 'Hi! I\'m your CampusOps AI assistant. How can I help you today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputValue
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      let aiResponse = "I can help you with that. Please verify the details in the dashboard.";
      if (userMsg.text.toLowerCase().includes('water')) {
        aiResponse = "For water related issues, please select 'Drinking Water Issue' or 'Water Related Issue' from the service menu. Would you like me to guide you to the request form?";
      } else if (userMsg.text.toLowerCase().includes('id card')) {
        aiResponse = "ID Card issues are handled by the Admin block. You can submit a request here and track the status.";
      } else if (userMsg.text.toLowerCase().includes('ragging')) {
        aiResponse = "We take ragging very seriously. Please submit a 'Ragging / Harassment' report immediately. It will be prioritized.";
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiResponse
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 1000);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-blue-100 overflow-hidden z-50 flex flex-col"
            style={{ maxHeight: '600px', height: '500px' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-white/20 rounded-lg">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">AI Assistant</h3>
                  <p className="text-xs text-blue-100">Powered by Gemini</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={clsx(
                    "flex gap-3 max-w-[85%]",
                    msg.sender === 'user' ? "ml-auto flex-row-reverse" : ""
                  )}
                >
                  <div className={clsx(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                    msg.sender === 'user' ? "bg-blue-600 text-white" : "bg-purple-100 text-purple-600"
                  )}>
                    {msg.sender === 'user' ? <UserIcon size={14} /> : <Bot size={16} />}
                  </div>
                  <div className={clsx(
                    "p-3 rounded-2xl text-sm shadow-sm",
                    msg.sender === 'user' 
                      ? "bg-blue-600 text-white rounded-tr-none" 
                      : "bg-white text-slate-700 border border-slate-100 rounded-tl-none"
                  )}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 bg-white border-t border-slate-100">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask for help..."
                  className="flex-1 px-4 py-2 bg-slate-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-700 placeholder:text-slate-400"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 h-14 w-14 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg shadow-blue-600/30 flex items-center justify-center z-50 hover:shadow-xl transition-shadow"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>
    </>
  );
}
