import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  Bus, 
  MapPin, 
  Bell, 
  Navigation, 
  ChevronLeft, 
  MoreVertical, 
  User, 
  Smartphone,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { sendMessage } from './lib/gemini';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  navigationAction?: any;
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      text: 'Muraho! Ndi TwagiyeNow Smart Assistant. Ngufashe iki uyu munsi? (Hello! I am TwagiyeNow Smart Assistant. How can I help you today?)',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastAction, setLastAction] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const parseNavigation = (text: string) => {
    try {
      const lines = text.split('\n');
      const lastLine = lines[lines.length - 1].trim();
      if (lastLine.startsWith('{') && lastLine.endsWith('}')) {
        const action = JSON.parse(lastLine);
        return {
          cleanText: lines.slice(0, -1).join('\n'),
          action
        };
      }
    } catch (e) {
      console.error('Failed to parse navigation JSON:', e);
    }
    return { cleanText: text, action: null };
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const responseText = await sendMessage(input, history);
      const { cleanText, action } = parseNavigation(responseText);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: cleanText,
        timestamp: new Date(),
        navigationAction: action
      };

      setMessages(prev => [...prev, aiMessage]);
      if (action) {
        setLastAction(action);
        // Reset action after 5 seconds
        setTimeout(() => setLastAction(null), 5000);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, {
        id: 'error',
        role: 'model',
        text: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F4] flex items-center justify-center p-4 font-sans text-[#1C1917]">
      {/* Main Container */}
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Info & Context */}
        <div className="lg:col-span-4 space-y-6 hidden lg:block">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-[#0C0A09]">TwagiyeNow</h1>
            <p className="text-[#57534E] text-lg">Smart Bus Assistant for Rwanda</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#E7E5E4] shadow-sm space-y-4">
            <h2 className="font-semibold text-[#292524] flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              App Integration Demo
            </h2>
            <p className="text-sm text-[#78716C] leading-relaxed">
              This assistant is designed to be embedded in the TwagiyeNow mobile app. 
              It detects travel intents and triggers native app navigation.
            </p>
            
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-[#44403C]">
                <div className="w-8 h-8 rounded-full bg-[#F5F5F4] flex items-center justify-center">
                  <Bus className="w-4 h-4" />
                </div>
                <span>Search for schedules</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#44403C]">
                <div className="w-8 h-8 rounded-full bg-[#F5F5F4] flex items-center justify-center">
                  <Navigation className="w-4 h-4" />
                </div>
                <span>Track active buses</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#44403C]">
                <div className="w-8 h-8 rounded-full bg-[#F5F5F4] flex items-center justify-center">
                  <Bell className="w-4 h-4" />
                </div>
                <span>View notifications</span>
              </div>
            </div>
          </div>

          {/* Navigation Event Log */}
          <AnimatePresence>
            {lastAction && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#0C0A09] text-white p-6 rounded-3xl shadow-xl space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#A8A29E]">System Event</span>
                  <CheckCircle2 className="w-4 h-4 text-[#4ADE80]" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold">Navigation Triggered</p>
                  <pre className="text-[10px] font-mono bg-white/10 p-2 rounded-lg overflow-x-auto">
                    {JSON.stringify(lastAction, null, 2)}
                  </pre>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side: Mobile Simulator */}
        <div className="lg:col-span-8 flex justify-center">
          <div className="relative w-full max-w-[400px] aspect-[9/19.5] bg-[#0C0A09] rounded-[3rem] p-3 shadow-2xl border-[8px] border-[#292524]">
            {/* Phone Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#0C0A09] rounded-b-3xl z-20" />
            
            {/* Screen Content */}
            <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden flex flex-col relative">
              
              {/* App Header */}
              <header className="pt-10 pb-4 px-6 border-bottom border-[#F5F5F4] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#0C0A09] flex items-center justify-center text-white">
                    <Bus className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0C0A09] leading-tight">TwagiyeNow</h3>
                    <p className="text-[10px] text-[#78716C] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]" />
                      Smart Assistant
                    </p>
                  </div>
                </div>
                <button className="p-2 hover:bg-[#F5F5F4] rounded-full transition-colors">
                  <MoreVertical className="w-5 h-5 text-[#57534E]" />
                </button>
              </header>

              {/* Chat Area */}
              <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth"
              >
                {messages.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                      m.role === 'user' 
                        ? 'bg-[#0C0A09] text-white rounded-tr-none' 
                        : 'bg-[#F5F5F4] text-[#292524] rounded-tl-none'
                    }`}>
                      {m.text}
                      {m.navigationAction && (
                        <div className="mt-3 pt-3 border-t border-black/10 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider opacity-60">
                          <Navigation className="w-3 h-3" />
                          Navigation Triggered
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-[#F5F5F4] p-4 rounded-2xl rounded-tl-none flex gap-1">
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 rounded-full bg-[#A8A29E]" />
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-[#A8A29E]" />
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-[#A8A29E]" />
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-6 pt-2">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ndashaka kujya i Musanze..."
                    className="w-full bg-[#F5F5F4] border-none rounded-2xl py-4 pl-5 pr-14 text-sm focus:ring-2 focus:ring-[#0C0A09] outline-none transition-all"
                  />
                  <button 
                    onClick={handleSend}
                    disabled={isLoading || !input.trim()}
                    className="absolute right-2 p-2 bg-[#0C0A09] text-white rounded-xl disabled:opacity-50 transition-all hover:scale-105 active:scale-95"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-[10px] text-center mt-4 text-[#A8A29E] font-medium uppercase tracking-widest">
                  Kinyarwanda & English Supported
                </p>
              </div>

              {/* Home Indicator */}
              <div className="h-1.5 w-32 bg-[#E7E5E4] rounded-full mx-auto mb-2" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Toast (for small screens) */}
      <AnimatePresence>
        {lastAction && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-8 left-4 right-4 lg:hidden bg-[#0C0A09] text-white p-4 rounded-2xl shadow-2xl flex items-center gap-4 z-50"
          >
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <Navigation className="w-5 h-5 text-[#4ADE80]" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-wider text-[#A8A29E]">App Navigation</p>
              <p className="text-sm">{lastAction.action}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
