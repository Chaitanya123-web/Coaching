import { useEffect, useState, useRef } from "react";
import api from "../services/api";

export default function Chatbox() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    api.get("/chat/student").then((data) => {
      setMessages(Array.isArray(data.messages) ? data.messages : []);
    });

  }, []);

  useEffect(scrollToBottom, [messages]);

  const sendmessage = async () => {
    if (!message.trim()) return;
    try {
      const data = await api.post("/chat/send", {message });
      setMessages((prev) => [...prev, data]);
      setMessage("");
    } catch (err) {
      console.error("Send error:", err);
    }
  };

  return (
    <div className="w-full max-w-xl flex flex-col h-[85vh] sm:h-[600px] bg-white rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-[#0b2a4a]/8 overflow-hidden mx-auto">
      
      {/* ================= HEADER ================= */}
      <div className="bg-[#0b2a4a] px-5 sm:px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative">
            <div className="w-9 h-9 sm:w-11 sm:h-11 bg-[#1f4f5a] rounded-xl sm:rounded-2xl flex items-center justify-center text-[#f2f1d5] font-bold text-lg sm:text-xl border border-white/15">
              ?
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 border-2 sm:border-4 border-[#0b2a4a] rounded-full shadow-sm" />
          </div>
          <div className="space-y-0.5 sm:space-y-1">
            <h2 className="text-[#f2f1d5] font-semibold text-sm sm:text-base tracking-tight leading-none">
              Doubt Support
            </h2>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-[#6fa6b2] rounded-full animate-pulse" />
              <p className="text-[#6fa6b2] text-[9px] sm:text-[11px] font-medium uppercase tracking-widest">
                Always Online
              </p>
            </div>
          </div>
        </div>

        <div className="hidden xs:flex flex-col items-end gap-0.5 opacity-80">
          <span className="text-[9px] text-[#6fa6b2] uppercase font-bold tracking-widest">
            Support
          </span>
          <span className="text-[10px] text-[#f2f1d5]/80">Verified</span>
        </div>
      </div>

      {/* ================= MESSAGES AREA ================= */}
      <div className="flex-1 px-4 sm:px-5 py-5 overflow-y-auto bg-[#f8f7eb]/60 space-y-4 scrollbar-hide">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center opacity-60 text-center gap-2">
            <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center border border-[#0b2a4a]/5">
              <span className="text-2xl">💬</span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-[#0b2a4a]">
              Start your learning journey.
            </p>
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
                px-4 py-2.5
                text-[13px] sm:text-[14px]
                max-w-[85%] sm:max-w-[80%]
                shadow-sm border
                ${
                  msg.sender === "student"
                    ? "bg-[#1f4f5a] text-[#f2f1d5] rounded-2xl rounded-tr-none border-[#1f4f5a]"
                    : "bg-white text-[#0b2a4a] rounded-2xl rounded-tl-none border-[#0b2a4a]/8"
                }
              `}
            >
              {msg.message}
            </div>
            <span className="text-[9px] uppercase font-bold mt-1 px-1 tracking-widest text-[#6fa6b2]/80">
              {msg.sender === "student" ? "You" : "Instructor"}
            </span>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* ================= INPUT SECTION ================= */}
      <div className="px-4 sm:px-5 py-4 bg-white border-t border-[#0b2a4a]/8 shrink-0">
        <div className="relative flex items-center">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendmessage()}
            placeholder="Type your doubt..."
            className="
              w-full
              pl-4 pr-20 sm:pr-24 py-3 sm:py-3.5
              bg-[#f8f7eb]
              rounded-xl sm:rounded-2xl
              border border-[#0b2a4a]/10
              focus:border-[#1f4f5a]
              focus:bg-white
              transition-all
              outline-none
              text-sm
              text-[#0b2a4a]
              font-medium
            "
          />

          <button
            onClick={sendmessage}
            className="
              absolute right-1 sm:right-1.5
              bg-[#0b2a4a]
              text-[#f2f1d5]
              px-4 sm:px-5 py-2 sm:py-2.5
              rounded-lg sm:rounded-xl
              text-[10px] font-bold
              uppercase tracking-widest
              active:scale-95
              transition-all
            "
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}