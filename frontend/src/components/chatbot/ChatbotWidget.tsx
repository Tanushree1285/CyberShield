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
              <stop offset="0%" stopColor="#cd7f32" />
              <stop offset="50%" stopColor="#a0522d" />
              <stop offset="100%" stopColor="#8b4513" />
            </linearGradient>
          </defs>
        </svg>
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 rounded-full bg-card border border-border bronze-hue-soft p-4 shadow-[0_8px_30px_rgba(205,127,50,0.2)] hover:shadow-[0_12px_40px_rgba(205,127,50,0.3)] hover:-translate-y-1 transition-all animate-float flex items-center justify-center group"
          aria-label="Open chat"
        >
          <Bot className="h-7 w-7 text-primary/80 transition-transform group-hover:scale-110" style={{ fill: "url(#chatbotGradient)", stroke: "rgba(139, 69, 19, 0.8)", strokeWidth: "1.5" }} />
        </button>
      </>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 rounded-lg border border-border bg-card shadow-2xl flex flex-col max-h-[28rem] animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <span className="font-semibold text-sm">CyberShield Assistant</span>
        <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${m.role === "user"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
                }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg px-3 py-2 text-sm bg-secondary text-secondary-foreground animate-pulse">
              Typing...
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-border px-3 py-2 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Ask anything..."
          className="flex-1 bg-secondary rounded-md px-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <button onClick={send} className="text-primary hover:text-primary/80">
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default ChatbotWidget;
