import { useEffect, useState, useRef } from "react";
import api from "../../services/api";

export default function AdminChats() {
  const [students, setStudents] = useState([]);
  const [activeStudent, setActiveStudent] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    api.get("/chat/admin/students").then((data) => {
      setStudents(Array.isArray(data.students) ? data.students : []);
    });
  }, []);


  useEffect(scrollToBottom, [messages]);

  const openChat = async (student) => {
    setActiveStudent(student);
    const data = await api.get(`/chat/admin/${student._id}`);
    setMessages(Array.isArray(data.messages) ? data.messages : []);
  };


  const send = async () => {
    if (!message.trim()) return;

    const data = await api.post(
      `/chat/admin/send/${activeStudent._id}`,
      { message }
    );

    setMessages((p) => [...p, data.message]);
    setMessage("");
  };


  return (
    <div className="flex h-[calc(100vh-80px)] mt-[80px] bg-[#f8f7eb] overflow-hidden font-sans">
      
      {/* LEFT: STUDENT LIST - Hidden on mobile if chat is active */}
      <div className={`
        ${activeStudent ? "hidden md:flex" : "flex"} 
        w-full md:w-80 lg:w-96 bg-[#0b2a4a] flex-col shrink-0 border-r border-white/10
      `}>
        <div className="p-6 border-b border-white/5 bg-[#0b2a4a] sticky top-0 z-10">
          <h2 className="text-xl font-black uppercase tracking-tighter text-[#f2f1d5]">Admin Panel</h2>
          <div className="mt-4 flex gap-4 text-[10px] font-black uppercase tracking-widest text-[#6fa6b2]">
            <span>Recent Inquiries</span>
            <span className="ml-auto text-green-500 animate-pulse">Live</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar">
          {students.map((s) => (
            <button
              key={s._id}
              onClick={() => openChat(s)}
              className={`w-full p-6 text-left transition-all border-b border-white/5 flex items-center gap-4
                ${activeStudent?._id === s._id ? "bg-[#1f4f5a] border-l-4 border-l-[#f2f1d5]" : "hover:bg-white/5"}
              `}
            >
              <div className="w-10 h-10 rounded-xl bg-[#f2f1d5] text-[#0b2a4a] flex items-center justify-center font-black">
                {s.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="font-bold text-[#f2f1d5] truncate uppercase tracking-tight text-sm">{s.name}</div>
                <div className="text-[10px] text-[#6fa6b2] truncate font-medium">{s.email}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT: CHAT AREA - Full screen on mobile if chat is active */}
      <div className={`
        ${activeStudent ? "flex" : "hidden md:flex"} 
        flex-1 flex-col bg-[#f8f7eb] relative
      `}>
        
        {activeStudent ? (
          <>
            {/* Header */}
            <div className="bg-white px-6 py-4 border-b border-[#0b2a4a]/5 flex items-center gap-4 shadow-sm relative z-20">
              <button 
                onClick={() => setActiveStudent(null)} 
                className="md:hidden p-2 bg-[#f8f7eb] rounded-xl text-[#0b2a4a]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="w-10 h-10 rounded-xl bg-[#0b2a4a] text-[#f2f1d5] flex items-center justify-center font-black">
                {activeStudent.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-black text-[#0b2a4a] uppercase tracking-tight leading-none">{activeStudent.name}</h3>
                <span className="text-[9px] font-bold text-[#6fa6b2] uppercase tracking-widest">Active Session</span>
              </div>
            </div>

            {/* Messages Thread */}
            <div className="flex-1 p-6 md:p-10 overflow-y-auto space-y-6 scrollbar-hide">
              {messages.map((m) => (
                <div key={m._id} className={`flex flex-col ${m.sender === "admin" ? "items-end" : "items-start"}`}>
                  <div className={`
                    max-w-[85%] md:max-w-[70%] px-5 py-3 rounded-2xl text-sm font-medium shadow-sm
                    ${m.sender === "admin" 
                      ? "bg-[#0b2a4a] text-[#f2f1d5] rounded-tr-none" 
                      : "bg-white text-[#0b2a4a] border border-[#0b2a4a]/5 rounded-tl-none"}
                  `}>
                    {m.message}
                  </div>
                  <span className="text-[8px] font-black uppercase mt-2 tracking-widest text-[#6fa6b2] px-1">
                    {m.sender === "admin" ? "You (Admin)" : "Student"}
                  </span>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-5 md:p-8 bg-white border-t border-[#0b2a4a]/5">
              <div className="max-w-4xl mx-auto flex gap-4">
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="Draft your response..."
                  className="flex-1 bg-[#f8f7eb] border-2 border-transparent focus:border-[#1f4f5a] rounded-2xl px-6 py-4 outline-none transition-all text-sm font-medium"
                />
                <button 
                  onClick={send} 
                  className="bg-[#0b2a4a] text-[#f2f1d5] px-8 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-[#1f4f5a] transition-all shadow-xl shadow-black/10 active:scale-95"
                >
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center opacity-20">
            <div className="w-20 h-20 bg-[#0b2a4a] rounded-[2.5rem] flex items-center justify-center mb-4">
              <span className="text-3xl">💬</span>
            </div>
            <p className="font-black uppercase tracking-[0.3em] text-[#0b2a4a]">Select a conversation</p>
          </div>
        )}
      </div>
    </div>
  );
}