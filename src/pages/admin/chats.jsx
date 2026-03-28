import { useEffect, useState, useRef } from "react";
import api from "../../services/api";

export default function AdminChats() {
  const [students, setStudents] = useState([]);
  const [activeStudent, setActiveStudent] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    api.get("/auth/me")
      .then((u) => { if (u.role !== "admin") window.location.href = "/"; })
      .catch(() => (window.location.href = "/login"));

    api.get("/chat/admin/students")
      .then((data) => setStudents(Array.isArray(data) ? data : (data?.students || [])))
      .catch(() => setStudents([]));
  }, []);

  useEffect(scrollToBottom, [messages]);

  const openChat = async (student) => {
    setActiveStudent(student);
    setMessages([]);
    try {
      const data = await api.get(`/chat/admin/${student._id}`);
      setMessages(Array.isArray(data) ? data : (data?.messages || []));
    } catch {
      setMessages([]);
    }
  };

  const send = async () => {
    if (!message.trim() || sending) return;
    setSending(true);
    try {
      const data = await api.post(`/chat/admin/send/${activeStudent._id}`, { message });
      setMessages((p) => [...p, data.message || data]);
      setMessage("");
    } catch {
      /* silent */
    } finally {
      setSending(false);
    }
  };

  const initials = (name) => name?.charAt(0).toUpperCase() ?? "?";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600&display=swap');

        .ac-root {
          display: flex;
          height: calc(100vh - 70px);
          background: #f5f3ee;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
          border-radius: 1.25rem;
          border: 1px solid rgba(26,58,92,0.08);
          box-shadow: 0 4px 24px rgba(26,58,92,0.06);
          overflow: hidden;
        }

        /* ── STUDENT LIST ── */
        .ac-list {
          width: 280px;
          flex-shrink: 0;
          background: #1a3a5c;
          display: flex;
          flex-direction: column;
          border-right: 1px solid rgba(255,255,255,0.06);
        }

        .ac-list-header {
          padding: 1.5rem 1.25rem 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          flex-shrink: 0;
        }

        .ac-list-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: #f5f3ee;
          margin: 0 0 0.75rem;
          letter-spacing: -0.01em;
        }

        .ac-list-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .ac-list-count {
          font-size: 0.68rem;
          font-weight: 600;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .ac-live-badge {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.62rem;
          font-weight: 600;
          color: #4caf86;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .ac-live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #4caf86;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .ac-list-scroll {
          flex: 1;
          overflow-y: auto;
        }

        .ac-list-scroll::-webkit-scrollbar { width: 4px; }
        .ac-list-scroll::-webkit-scrollbar-track { background: transparent; }
        .ac-list-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }

        .ac-student-btn {
          width: 100%;
          padding: 0.85rem 1.25rem;
          border: none;
          background: transparent;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.85rem;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          transition: background 0.18s;
          text-align: left;
          position: relative;
        }

        .ac-student-btn:hover { background: rgba(255,255,255,0.05); }

        .ac-student-btn.active {
          background: rgba(200,169,110,0.12);
        }

        .ac-student-btn.active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 15%;
          height: 70%;
          width: 3px;
          background: #c8a96e;
          border-radius: 0 2px 2px 0;
        }

        .ac-avatar {
          width: 38px;
          height: 38px;
          border-radius: 0.65rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.95rem;
          flex-shrink: 0;
        }

        .ac-avatar-list {
          background: rgba(255,255,255,0.1);
          color: #f5f3ee;
        }

        .ac-avatar-active {
          background: #c8a96e;
          color: #1a3a5c;
        }

        .ac-student-info { flex: 1; overflow: hidden; }

        .ac-student-name {
          font-weight: 600;
          font-size: 0.85rem;
          color: #f5f3ee;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 1.2;
          margin-bottom: 0.2rem;
        }

        .ac-student-email {
          font-size: 0.7rem;
          color: rgba(255,255,255,0.3);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .ac-list-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex: 1;
          padding: 2rem;
          color: rgba(255,255,255,0.2);
          text-align: center;
          gap: 0.5rem;
        }

        .ac-list-empty p {
          font-size: 0.78rem;
          font-weight: 500;
          margin: 0;
        }

        /* ── CHAT AREA ── */
        .ac-chat {
          flex: 1;
          display: flex;
          flex-direction: column;
          background: #f5f3ee;
          min-width: 0;
        }

        /* Chat header */
        .ac-chat-header {
          background: #fff;
          padding: 1rem 1.5rem;
          border-bottom: 1px solid rgba(26,58,92,0.07);
          display: flex;
          align-items: center;
          gap: 0.85rem;
          flex-shrink: 0;
          box-shadow: 0 1px 8px rgba(26,58,92,0.04);
        }

        .ac-back-btn {
          display: none;
          width: 34px;
          height: 34px;
          border: none;
          background: #f5f3ee;
          border-radius: 0.6rem;
          cursor: pointer;
          align-items: center;
          justify-content: center;
          color: #1a3a5c;
          flex-shrink: 0;
        }

        @media (max-width: 767px) {
          .ac-back-btn { display: flex; }
          .ac-list { width: 100%; }
          .ac-list.hidden { display: none; }
          .ac-chat.hidden { display: none; }
        }

        .ac-avatar-chat {
          background: #1a3a5c;
          color: #f5f3ee;
        }

        .ac-chat-name {
          font-weight: 700;
          font-size: 0.92rem;
          color: #1a3a5c;
          line-height: 1.2;
        }

        .ac-chat-status {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.65rem;
          color: #4caf86;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .ac-chat-status-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #4caf86;
        }

        /* Messages */
        .ac-messages {
          flex: 1;
          overflow-y: auto;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .ac-messages::-webkit-scrollbar { width: 4px; }
        .ac-messages::-webkit-scrollbar-track { background: transparent; }
        .ac-messages::-webkit-scrollbar-thumb { background: rgba(26,58,92,0.12); border-radius: 10px; }

        .ac-msg-row {
          display: flex;
          flex-direction: column;
        }

        .ac-msg-row.admin { align-items: flex-end; }
        .ac-msg-row.student { align-items: flex-start; }

        .ac-bubble {
          max-width: 72%;
          padding: 0.75rem 1.1rem;
          font-size: 0.87rem;
          line-height: 1.6;
          font-weight: 400;
        }

        .ac-bubble.admin {
          background: #1a3a5c;
          color: #f5f3ee;
          border-radius: 1.1rem 1.1rem 0.25rem 1.1rem;
        }

        .ac-bubble.student {
          background: #fff;
          color: #1a3a5c;
          border: 1px solid rgba(26,58,92,0.08);
          border-radius: 1.1rem 1.1rem 1.1rem 0.25rem;
          box-shadow: 0 1px 4px rgba(26,58,92,0.05);
        }

        .ac-msg-label {
          font-size: 0.62rem;
          font-weight: 600;
          color: #9aabb8;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-top: 0.3rem;
          padding: 0 0.2rem;
        }

        /* Input */
        .ac-input-bar {
          background: #fff;
          border-top: 1px solid rgba(26,58,92,0.07);
          padding: 1rem 1.5rem;
          flex-shrink: 0;
        }

        .ac-input-inner {
          display: flex;
          gap: 0.75rem;
          align-items: center;
        }

        .ac-input {
          flex: 1;
          background: #f5f3ee;
          border: 1.5px solid transparent;
          border-radius: 0.9rem;
          padding: 0.8rem 1.1rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem;
          color: #1a3a5c;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
        }

        .ac-input::placeholder { color: #aab8c4; }
        .ac-input:focus { border-color: #1a3a5c; background: #fff; }

        .ac-send-btn {
          background: #1a3a5c;
          color: #f5f3ee;
          border: none;
          border-radius: 0.9rem;
          padding: 0.8rem 1.5rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          display: flex;
          align-items: center;
          gap: 0.45rem;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .ac-send-btn:hover:not(:disabled) { background: #2a5a7c; }
        .ac-send-btn:active:not(:disabled) { transform: scale(0.97); }
        .ac-send-btn:disabled { opacity: 0.55; cursor: not-allowed; }

        /* Empty chat state */
        .ac-empty-chat {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          opacity: 0.3;
          user-select: none;
        }

        .ac-empty-icon {
          width: 52px;
          height: 52px;
          background: #1a3a5c;
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ac-empty-text {
          font-family: 'Playfair Display', serif;
          font-size: 0.95rem;
          font-weight: 700;
          color: #1a3a5c;
          letter-spacing: -0.01em;
        }
      `}</style>

      <div className="ac-root">

        {/* STUDENT LIST */}
        <div className={`ac-list${activeStudent ? " hidden md:flex" : ""}`}
             style={{ display: activeStudent ? undefined : "flex", flexDirection: "column" }}>

          <div className="ac-list-header">
            <h2 className="ac-list-title">Conversations</h2>
            <div className="ac-list-meta">
              <span className="ac-list-count">{students.length} student{students.length !== 1 ? "s" : ""}</span>
              <span className="ac-live-badge">
                <span className="ac-live-dot" />
                Live
              </span>
            </div>
          </div>

          <div className="ac-list-scroll">
            {students.length === 0 ? (
              <div className="ac-list-empty">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                <p>No students yet</p>
              </div>
            ) : (
              students.map((s) => (
                <button
                  key={s._id}
                  onClick={() => openChat(s)}
                  className={`ac-student-btn${activeStudent?._id === s._id ? " active" : ""}`}
                >
                  <div className={`ac-avatar ${activeStudent?._id === s._id ? "ac-avatar-active" : "ac-avatar-list"}`}>
                    {initials(s.name)}
                  </div>
                  <div className="ac-student-info">
                    <div className="ac-student-name">{s.name}</div>
                    <div className="ac-student-email">{s.email}</div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* CHAT AREA */}
        <div className={`ac-chat${!activeStudent ? " hidden md:flex" : ""}`}
             style={{ display: activeStudent ? "flex" : undefined, flexDirection: "column" }}>

          {activeStudent ? (
            <>
              {/* Header */}
              <div className="ac-chat-header">
                <button className="ac-back-btn" onClick={() => setActiveStudent(null)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"/>
                  </svg>
                </button>
                <div className={`ac-avatar ac-avatar-chat`} style={{ width:38, height:38, borderRadius:"0.65rem", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:"0.95rem", flexShrink:0 }}>
                  {initials(activeStudent.name)}
                </div>
                <div>
                  <div className="ac-chat-name">{activeStudent.name}</div>
                  <div className="ac-chat-status">
                    <span className="ac-chat-status-dot" />
                    Active session
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="ac-messages">
                {messages.length === 0 && (
                  <div style={{ textAlign:"center", padding:"2rem", color:"#9aabb8", fontSize:"0.8rem" }}>
                    No messages yet. Start the conversation.
                  </div>
                )}
                {messages.map((m) => (
                  <div key={m._id} className={`ac-msg-row ${m.sender === "admin" ? "admin" : "student"}`}>
                    <div className={`ac-bubble ${m.sender === "admin" ? "admin" : "student"}`}>
                      {m.message}
                    </div>
                    <span className="ac-msg-label">
                      {m.sender === "admin" ? "You (Instructor)" : activeStudent.name}
                    </span>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              {/* Input */}
              <div className="ac-input-bar">
                <div className="ac-input-inner">
                  <input
                    className="ac-input"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && send()}
                    placeholder="Write a response…"
                  />
                  <button className="ac-send-btn" onClick={send} disabled={sending || !message.trim()}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="ac-empty-chat">
              <div className="ac-empty-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f5f3ee" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <p className="ac-empty-text">Select a conversation</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}