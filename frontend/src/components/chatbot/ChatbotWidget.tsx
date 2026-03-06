import { useState } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { chatbotApi } from "@/api";

interface Message {
  role: "user" | "bot";
  text: string;
}

/** Floating chatbot widget */
const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hello! I'm the CyberShield assistant. How can I help you stay safe online?" },
  ]);
  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setLoading(true);

    try {
      const res = await chatbotApi.sendMessage(userMessage);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: res.data.data.reply },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Sorry, I'm having trouble connecting to the server. Please check your connection." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!open) {
    return (
      <>
        {/* Hidden SVG array to make the gradient accessible to Bot */}
        <svg width="0" height="0" className="absolute">
          <defs>
            <linearGradient id="chatbotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
          </defs>
        </svg>
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 rounded-full bg-black/30 backdrop-blur-md border border-[rgba(245,158,11,0.15)] bg-gradient-to-br from-[rgba(245,158,11,0.1)] to-[rgba(180,83,9,0.1)] p-4 shadow-[0_8px_30px_rgba(217,119,6,0.2)] hover:shadow-[0_12px_40px_rgba(217,119,6,0.3)] hover:-translate-y-1 transition-all animate-float flex items-center justify-center group"
          aria-label="Open chat"
        >
          <Bot className="h-7 w-7 transition-transform group-hover:scale-110" style={{ fill: "url(#chatbotGradient)", stroke: "rgba(217, 119, 6, 0.7)", strokeWidth: "1.5" }} />
        </button>
      </>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] sm:w-80 rounded-lg border border-[rgba(245,158,11,0.15)] bg-black/40 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] bg-gradient-to-br from-[rgba(245,158,11,0.1)] via-black/40 to-[rgba(180,83,9,0.1)] flex flex-col max-h-[80vh] sm:max-h-[28rem] animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(245,158,11,0.15)] bg-[rgba(245,158,11,0.05)] rounded-t-lg">
        <span className="font-semibold text-sm text-[rgba(253,230,138,0.9)] drop-shadow-sm">CyberShield Assistant</span>
        <button onClick={() => setOpen(false)} className="text-[rgba(253,230,138,0.6)] hover:text-[#fde68a] transition-colors">
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 custom-scrollbar">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-lg px-3 py-2 text-sm shadow-md backdrop-blur-md border ${m.role === "user"
                ? "bg-[rgba(217,119,6,0.6)] text-white border-[rgba(245,158,11,0.3)]"
                : "bg-[rgba(255,255,255,0.05)] text-[rgba(255,255,255,0.9)] border-[rgba(255,255,255,0.05)]"
                }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg px-3 py-2 text-sm bg-[rgba(255,255,255,0.05)] text-[rgba(255,255,255,0.9)] border border-[rgba(255,255,255,0.05)] shadow-md backdrop-blur-md animate-pulse">
              Typing...
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-[rgba(245,158,11,0.15)] px-3 py-2 flex gap-2 bg-black/30 rounded-b-lg">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Ask anything..."
          className="flex-1 bg-[rgba(255,255,255,0.03)] border border-[rgba(245,158,11,0.15)] rounded-md px-3 py-1.5 text-sm text-white placeholder:text-[rgba(255,255,255,0.4)] focus:outline-none focus:ring-1 focus:ring-[rgba(245,158,11,0.4)] focus:bg-[rgba(255,255,255,0.08)] transition-colors"
        />
        <button onClick={send} className="text-[#f59e0b] hover:text-[#fbbf24] hover:bg-[rgba(245,158,11,0.1)] p-1.5 rounded-md transition-colors flex items-center justify-center">
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default ChatbotWidget;
