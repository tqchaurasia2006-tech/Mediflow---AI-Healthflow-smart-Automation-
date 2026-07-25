import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  ShieldAlert, 
  Building2, 
  Calendar, 
  Clock, 
  Activity,
  ChevronRight,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { ChatMessage } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface AIChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToTriage: () => void;
}

export const AIChatbot: React.FC<AIChatbotProps> = ({
  isOpen,
  onClose,
  onNavigateToTriage,
}) => {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: language === 'hi' 
        ? 'नमस्ते! मैं मेडीबॉट हूँ, आपका एआई स्वास्थ्य सहायक। आज मैं अस्पताल सेवाओं या लक्षणों के बारे में आपकी क्या सहायता कर सकता हूँ?' 
        : language === 'dual'
        ? 'Hello! नमस्ते! I am MediBot, your AI Healthcare Assistant (एआई स्वास्थ्य सहायक). How can I assist you with hospital services or symptoms?'
        : 'Hello! I am MediBot, your AI Healthcare Assistant for MediFlow. How can I assist you today with hospital services or symptom questions?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      highlights: [
        'Visiting Hours: 8:00 AM - 8:00 PM Daily',
        'Emergency Intake: 24/7 Floor 1 East Wing',
        'AI Care Assessment: Automated priority evaluation available'
      ]
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputMessage;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query })
      });

      const data = await response.json();

      const aiMsg: ChatMessage = {
        id: 'ai-' + Date.now(),
        sender: 'ai',
        text: data.reply || 'I am here to guide you with hospital inquiries or department routing.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        departmentRecommendation: data.departmentRecommendation,
        highlights: data.highlights || []
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages(prev => [
        ...prev,
        {
          id: 'err-' + Date.now(),
          sender: 'ai',
          text: 'I am temporarily operating in offline mode. For urgent chest pain or respiratory distress, please visit Emergency Bay 01 immediately.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          highlights: ['Emergency Desk: Dial 911 / 112', 'Cardiology: Room 302']
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 w-full max-w-sm sm:max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col h-[520px] animate-in slide-in-from-bottom-5 duration-200">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-bold text-sm">MediBot Assistant</span>
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
            </div>
            <p className="text-[10px] text-teal-100">Gemini-Powered Hospital Assistant</p>
          </div>
        </div>

        <button 
          onClick={onClose}
          aria-label="Close AI Assistant chat"
          className="p-1 hover:bg-white/20 rounded-lg transition-colors text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Quick Prompts Chip Bar */}
      <div className="px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center space-x-1.5 overflow-x-auto text-[11px]">
        <button
          onClick={() => handleSendMessage("Which department handles chest pain?")}
          className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 whitespace-nowrap hover:border-teal-500 transition-colors"
        >
          ❤️ Chest Pain Dept
        </button>
        <button
          onClick={() => handleSendMessage("What are the visiting hours and ICU rules?")}
          className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 whitespace-nowrap hover:border-teal-500 transition-colors"
        >
          🕒 Visiting Hours
        </button>
        <button
          onClick={() => handleSendMessage("How do I book an appointment?")}
          className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 whitespace-nowrap hover:border-teal-500 transition-colors"
        >
          📅 Booking Help
        </button>
      </div>

      {/* Message List */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-3 text-xs space-y-2 shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-teal-600 text-white rounded-br-none'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none border border-slate-200/50 dark:border-slate-700/50'
              }`}
            >
              <p className="leading-relaxed">{msg.text}</p>

              {/* Highlighted Points / Key Takeaways */}
              {msg.highlights && msg.highlights.length > 0 && (
                <div className="pt-1.5 border-t border-slate-200/50 dark:border-slate-700/50 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 block">
                    Key Highlights:
                  </span>
                  <ul className="space-y-1 text-[11px]">
                    {msg.highlights.map((h, i) => (
                      <li key={i} className="flex items-start space-x-1.5">
                        <span className="text-teal-500 font-bold">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Department Recommendation Trigger */}
              {msg.departmentRecommendation && (
                <div className="p-2 bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 rounded-xl flex items-center justify-between text-[11px] text-teal-900 dark:text-teal-200">
                  <span>Recommended: <strong>{msg.departmentRecommendation}</strong></span>
                  <button
                    onClick={() => {
                      onClose();
                      onNavigateToTriage();
                    }}
                    className="px-2 py-0.5 bg-teal-600 text-white rounded font-semibold text-[10px]"
                  >
                    Assess Symptoms Now
                  </button>
                </div>
              )}
            </div>
            <span className="text-[9px] text-slate-400 mt-0.5 px-1">{msg.timestamp}</span>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center space-x-2 text-slate-400 text-xs italic p-2">
            <Bot className="w-4 h-4 text-teal-500 animate-bounce" />
            <span>MediBot is generating answer...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={t('chat.placeholder', 'Ask medical question or hospital info...')}
            className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isTyping}
            className="p-2 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-400 text-white rounded-xl shadow-md transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
};
