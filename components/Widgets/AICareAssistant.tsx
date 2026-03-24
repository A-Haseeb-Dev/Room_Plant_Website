
import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../../services/geminiService';
import { MessageCircle, Send, X, Bot } from 'lucide-react';

const AICareAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: "Hello! I'm your Room Plant AI Care Assistant. How can I help your green friends today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await geminiService.getPlantCareAdvice("any plant", userMsg);
      setMessages(prev => [...prev, { role: 'bot', text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: "I'm a bit parched! Please try again in a moment." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 bg-primary text-white p-4 rounded-full shadow-2xl hover:bg-primary/90 hover:scale-110 transition-all group flex items-center space-x-2 active:scale-95 mb-[env(safe-area-inset-bottom)] ml-[env(safe-area-inset-left)]"
        aria-label="Open Plant Care AI Assistant"
      >
        <MessageCircle size={28} />
        <span className="hidden sm:inline-block font-medium">Care AI Assistant</span>
      </button>

      {isOpen && (
        <div className="fixed bottom-0 left-0 right-0 sm:bottom-24 sm:left-6 sm:right-auto z-50 w-full sm:w-[400px] h-full sm:h-[550px] sm:max-h-[70vh] bg-white sm:rounded-lg shadow-2xl border-t sm:border border-gray-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-primary p-4 text-white flex justify-between items-center pt-[max(1rem,env(safe-area-inset-top))] sm:pt-4">
            <div className="flex items-center space-x-2">
              <Bot size={24} />
              <span className="font-bold">Plant Expert AI</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-transform active:rotate-90">
              <X size={24} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-grow p-4 overflow-y-auto space-y-4 bg-gray-50 scroll-touch">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 md:p-4 rounded-lg text-sm md:text-base ${
                  msg.role === 'user' 
                    ? 'bg-primary text-white rounded-tr-none' 
                    : 'bg-white text-dark shadow-sm border border-gray-100 rounded-tl-none'
                }`}>
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 rounded-tl-none flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-100"></div>
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-gray-100 pb-[max(1rem,env(safe-area-inset-bottom))] sm:pb-4">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="relative">
              <input 
                type="text"
                placeholder="Ask about watering, light, etc."
                className="w-full pl-4 pr-12 py-3 bg-gray-100 rounded-md focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none text-base"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button 
                type="submit"
                disabled={!input.trim() || isTyping}
                className="absolute right-2 top-1.5 p-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors disabled:bg-gray-300 active:scale-90"
              >
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AICareAssistant;
