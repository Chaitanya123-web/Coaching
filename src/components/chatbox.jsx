import { useEffect, useState, useRef } from "react";
import api from "../services/api";

export default function Chatbox() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]); // Initialized as empty array
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    api.get("/chat/student")
      .then((data) => {
        /**
         * PRODUCTION FIX: Strict Unwrapping
         * Ensures messages state is always an array to prevent .map() crashes.
         */
        const actualMessages = Array.isArray(data) ? data : (data?.messages || []);
        setMessages(actualMessages);
      })
      .catch((err) => {
        console.error("Chat Fetch Error:", err);
        setMessages([]); // Fallback to empty array
      });
  }, []);

  useEffect(scrollToBottom, [messages]);

  const sendmessage = async () => {
    if (!message.trim()) return;
    try {
      const data = await api.post("/chat/send", { message });
      // Depending on backend, data might be the msg object or { message: {} }
      const newMsg = data?.message || data;
      setMessages((prev) => [...prev, newMsg]);
      setMessage("");
    } catch (err) {
      console.error("Send error:", err);
    }
  };

  return (
    <div className="w-full max-w-xl flex flex-col h-[85vh] sm:h-[600px] bg-white rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-[#0b2a4a]/8 overflow-hidden mx-auto font-sans">
      
      {/* ================= HEADER ================= */}
      <div className="bg-[#0b2a4a] px-5 sm:px-8 py-5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#f2f1d5] rounded-xl sm:rounded-2xl flex items-center justify-center text-[#0b2a4a] font-black text-lg sm:text-xl shadow-lg shadow-black/20">
              I
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-4 border-[#0b2a4a] rounded-full shadow-sm" />
          </div>
          <div className="space-y-0.5">
            <h2 className="text-[#f2f1d5] font-black text-sm sm:text-base uppercase tracking-tight leading-none">
              Indofrench Support
            </h2>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#6fa6b2] rounded-full animate-pulse" />
              <p className="text-[#6fa6b2] text-[9px] sm:text-[10px] font-black uppercase tracking-widest">
                Strategic Guidance
              </p>
            </div>
          </div>
        </div>

        <div className="hidden xs:flex flex-col items-end opacity-60">
          <span className="text-[8px] text-[#6fa6b2] uppercase font-black tracking-[0.2em]">
            Verified Session
          </span>
          <span className="text-[10px] text-[#f2f1d5]/80 font-bold uppercase tracking-tighter">System v2.4</span>
        </div>
      </div>

      {/* ================= MESSAGES AREA ================= */}
      <div className="flex-1 px-4 sm:px-6 py-6 overflow-y-auto bg-[#f8f7eb]/40 space-y-5 scrollbar-hide no-scrollbar">
        {/* Check if array is empty or not an array */}
        {(!Array.isArray(messages) || messages.length === 0) && (
          <div className="h-full flex flex-col items-center justify-center opacity-40 text-center gap-4">
            <div className="w-16 h-16 rounded-[2rem] bg-white shadow-sm flex items-center justify-center border border-[#0b2a4a]/5">
              <span className="text-3xl text-[#0b2a4a]">💬</span>
            </div>
            <div className="space-y-1">
              <p className="text-xs sm:text-sm font-black uppercase tracking-widest text-[#0b2a4a]">
                Zero Doubts, Full Clarity
              </p>
              <p className="text-[10px] font-bold text-[#6fa6b2] max-w-[180px]">Ask any question related to your batch curriculum.</p>
            </div>
          </div>
        )}

        {Array.isArray(messages) && messages.map((msg) => (
          <div
            key={msg._id}
            className={`flex flex-col ${
              msg.sender === "student" ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`
                px-5 py-3
                text-sm font-medium
                max-w-[85%] sm:max-w-[75%]
                shadow-sm
                ${
                  msg.sender === "student"
                    ? "bg-[#0b2a4a] text-[#f2f1d5] rounded-[1.5rem] rounded-tr-none"
                    : "bg-white text-[#0b2a4a] rounded-[1.5rem] rounded-tl-none border border-[#0b2a4a]/5"
                }
              `}
            >
              {msg.message}
            </div>
            <span className="text-[8px] uppercase font-black mt-2 px-1 tracking-[0.15em] text-[#6fa6b2]">
              {msg.sender === "student" ? "Your Inquiry" : "Faculty Response"}
            </span>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* ================= INPUT SECTION ================= */}
      <div className="px-5 py-6 bg-white border-t border-[#0b2a4a]/5 shrink-0">
        <div className="relative flex items-center max-w-lg mx-auto">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendmessage()}
            placeholder="Draft your query here..."
            className="
              w-full
              pl-6 pr-24 py-4
              bg-[#f8f7eb]
              rounded-2xl
              border-2 border-transparent
              focus:border-[#1f4f5a]
              focus:bg-white
              transition-all
              outline-none
              text-sm
              text-[#0b2a4a]
              font-bold
            "
          />

          <button
            onClick={sendmessage}
            className="
              absolute right-2
              bg-[#0b2a4a]
              text-[#f2f1d5]
              px-6 py-2.5
              rounded-xl
              text-[10px] font-black
              uppercase tracking-widest
              hover:bg-[#1f4f5a]
              active:scale-95
              transition-all
              shadow-xl shadow-[#0b2a4a]/10
            "
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}