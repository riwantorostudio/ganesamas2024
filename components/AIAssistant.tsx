
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, Sparkles, ShoppingBag } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { Book } from '../types';

interface AIAssistantProps {
  books: Book[];
}

const AIAssistant: React.FC<AIAssistantProps> = ({ books }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: 'Halo! Saya Ganesa AI. Ada yang bisa saya bantu cari di katalog buku kami hari ini?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      // Fix: Follow guidelines for initialization with named parameter and direct env access
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const context = books.map(b => `${b.title} oleh ${b.author} (Kategori: ${b.category}, Harga: Rp${b.price})`).join(', ');
      
      // Fix: Use systemInstruction in config instead of embedding in the prompt
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Pertanyaan user: ${userMessage}`,
        config: {
          systemInstruction: `Kamu adalah asisten toko buku Ganesa Mas. 
          Data katalog kami: [${context}]. 
          Jawab pertanyaan pembeli dengan ramah dalam Bahasa Indonesia. 
          Jika mereka mencari rekomendasi, sebutkan buku yang ada di katalog kami.`,
        },
      });

      // Fix: Use .text property directly (not a method) as per SDK guidelines
      setMessages(prev => [...prev, { role: 'bot', text: response.text || 'Maaf, saya sedang mengalami kendala teknis. Coba lagi nanti ya!' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: 'Maaf, kuota permintaan saya sedang penuh. Silakan coba beberapa saat lagi.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-[100]">
      {isOpen ? (
        <div className="bg-white w-[350px] sm:w-[400px] h-[500px] rounded-[2.5rem] shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-500">
          {/* Header */}
          <div className="bg-[#2D5A27] p-6 text-white flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Sparkles size={20} className="text-[#F58220]" />
              </div>
              <div>
                <h4 className="font-black text-sm uppercase tracking-widest">Ganesa AI</h4>
                <div className="flex items-center space-x-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-[10px] font-bold text-emerald-200">Online Sekarang</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-all">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-4 bg-slate-50 custom-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl text-sm font-medium ${
                  msg.role === 'user' 
                    ? 'bg-[#2D5A27] text-white rounded-tr-none' 
                    : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 rounded-tl-none flex space-x-1">
                  <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleChat} className="p-4 bg-white border-t border-slate-100 flex items-center space-x-3">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tanya Ganesa AI..." 
              className="flex-grow bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-[#2D5A27]"
            />
            <button type="submit" className="p-3 bg-[#2D5A27] text-white rounded-xl hover:bg-emerald-900 transition-all shadow-lg shadow-emerald-100">
              <Send size={18} />
            </button>
          </form>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-[#2D5A27] text-white rounded-2xl shadow-2xl flex items-center justify-center hover:bg-[#F58220] transition-all duration-500 hover:scale-110 group relative"
        >
          <div className="absolute -top-2 -right-2 bg-red-500 text-[10px] font-black px-2 py-0.5 rounded-full border-2 border-white animate-bounce">NEW</div>
          <Bot size={28} className="group-hover:rotate-12 transition-transform" />
        </button>
      )}
    </div>
  );
};

export default AIAssistant;
