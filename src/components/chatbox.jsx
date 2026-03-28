import { useEffect, useState, useRef } from "react";
import api from "../services/api";

export default function Chatbox() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [sending, setSending] = useState(false);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    api.get("/chat/student")
      .then((data) => setMessages(Array.isArray(data) ? data : (data?.messages || [])))
      .catch(() => setMessages([]));
  }, []);

  useEffect(scrollToBottom, [messages]);

  const sendmessage = async () => {
    if (!message.trim() || sending) return;
    setSending(true);
    try {
      const data = await api.post("/chat/send", { message });
      setMessages((prev) => [...prev, data?.message || data]);
      setMessage("");
      inputRef.current?.focus();
    } catch {
      /* silent */
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');

        .cb-root {
          width: 100%;
          max-width: 480px;
          display: flex;
          flex-direction: column;
          height: 85vh;
          max-height: 620px;
          background: #fff;
          border-radius: 1.5rem;
          border: 1px solid rgba(26,58,92,0.09);
          box-shadow: 0 20px 60px rgba(26,58,92,0.12), 0 4px 16px rgba(26,58,92,0.06);
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
        }

        /* ── HEADER ── */
        .cb-header {
          background: #1a3a5c;
          padding: 1.1rem 1.4rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
        }

        .cb-header-left {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .cb-avatar-wrap {
          position: relative;
          flex-shrink: 0;
        }

        .cb-avatar {
          width: 42px;
          height: 42px;
          background: #c8a96e;
          border-radius: 0.85rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          font-size: 1rem;
          color: #1a3a5c;
        }

        .cb-online-dot {
          position: absolute;
          bottom: -2px;
          right: -2px;
          width: 11px;
          height: 11px;
          background: #4caf86;
          border: 2.5px solid #1a3a5c;
          border-radius: 50%;
        }

        .cb-header-title {
          font-family: 'Playfair Display', serif;
          font-size: 0.95rem;
          font-weight: 700;
          color: #f5f3ee;
          line-height: 1.15;
          letter-spacing: -0.01em;
        }

        .cb-header-sub {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          margin-top: 0.15rem;
        }

        .cb-header-sub-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #4caf86;
          animation: cbpulse 2s infinite;
        }

        @keyframes cbpulse {
          0%, 100% { opacity:1; }
          50% { opacity:0.35; }
        }

        .cb-header-sub-text {
          font-size: 0.63rem;
          font-weight: 600;
          color: #6fa6b2;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .cb-header-badge {
          font-size: 0.58rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.2);
          text-align: right;
        }

        /* ── MESSAGES ── */
        .cb-messages {
          flex: 1;
          overflow-y: auto;
          padding: 1.25rem 1.25rem 0.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          background: #f9f8f4;
        }

        .cb-messages::-webkit-scrollbar { width: 4px; }
        .cb-messages::-webkit-scrollbar-track { background: transparent; }
        .cb-messages::-webkit-scrollbar-thumb { background: rgba(26,58,92,0.1); border-radius: 10px; }

        /* Empty */
        .cb-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex: 1;
          gap: 0.75rem;
          opacity: 0.45;
          text-align: center;
          padding: 2rem;
          user-select: none;
        }

        .cb-empty-icon {
          width: 52px;
          height: 52px;
          background: rgba(26,58,92,0.07);
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cb-empty-title {
          font-family: 'Playfair Display', serif;
          font-size: 0.88rem;
          font-weight: 700;
          color: #1a3a5c;
        }

        .cb-empty-sub {
          font-size: 0.73rem;
          color: #7a8a9a;
          max-width: 180px;
          line-height: 1.5;
        }

        /* Bubbles */
        .cb-msg-row {
          display: flex;
          flex-direction: column;
        }
        .cb-msg-row.student { align-items: flex-end; }
        .cb-msg-row.admin   { align-items: flex-start; }

        .cb-bubble {
          max-width: 78%;
          padding: 0.7rem 1rem;
          font-size: 0.86rem;
          line-height: 1.6;
        }

        .cb-bubble.student {
          background: #1a3a5c;
          color: #f5f3ee;
          border-radius: 1rem 1rem 0.2rem 1rem;
        }

        .cb-bubble.admin {
          background: #fff;
          color: #1a3a5c;
          border: 1px solid rgba(26,58,92,0.09);
          border-radius: 1rem 1rem 1rem 0.2rem;
          box-shadow: 0 1px 4px rgba(26,58,92,0.05);
        }

        .cb-msg-label {
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #aab8c4;
          margin-top: 0.25rem;
          padding: 0 0.15rem;
        }

        /* ── INPUT ── */
        .cb-input-bar {
          background: #fff;
          border-top: 1px solid rgba(26,58,92,0.07);
          padding: 0.9rem 1.1rem;
          flex-shrink: 0;
        }

        .cb-input-inner {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: #f5f3ee;
          border: 1.5px solid transparent;
          border-radius: 0.9rem;
          padding: 0.35rem 0.35rem 0.35rem 1rem;
          transition: border-color 0.2s, background 0.2s;
        }

        .cb-input-inner:focus-within {
          border-color: #1a3a5c;
          background: #fff;
        }

        .cb-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.87rem;
          color: #1a3a5c;
        }

        .cb-input::placeholder { color: #aab8c4; }

        .cb-send {
          background: #1a3a5c;
          color: #f5f3ee;
          border: none;
          border-radius: 0.65rem;
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          transition: background 0.18s, transform 0.15s;
        }

        .cb-send:hover:not(:disabled) { background: #2a5a7c; }
        .cb-send:active:not(:disabled) { transform: scale(0.93); }
        .cb-send:disabled { opacity: 0.4; cursor: not-allowed; }
      `}</style>

      <div className="cb-root">

        {/* HEADER */}
        <div className="cb-header">
          <div className="cb-header-left">
            <div className="cb-avatar-wrap">
              <div className="cb-avatar">I</div>
              <div className="cb-online-dot" />
            </div>
            <div>
              <div className="cb-header-title">Indofrench Support</div>
              <div className="cb-header-sub">
                <span className="cb-header-sub-dot" />
                <span className="cb-header-sub-text">Online · Ready to help</span>
              </div>
            </div>
          </div>
          <div className="cb-header-badge">
            Verified<br />Session
          </div>
        </div>

        {/* MESSAGES */}
        <div className="cb-messages">
          {messages.length === 0 ? (
            <div className="cb-empty">
              <div className="cb-empty-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a3a5c" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <div>
                <div className="cb-empty-title">Ask anything</div>
                <div className="cb-empty-sub">Curriculum doubts, batch info — our faculty responds promptly.</div>
              </div>
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg._id} className={`cb-msg-row ${msg.sender === "student" ? "student" : "admin"}`}>
                <div className={`cb-bubble ${msg.sender === "student" ? "student" : "admin"}`}>
                  {msg.message}
                </div>
                <span className="cb-msg-label">
                  {msg.sender === "student" ? "You" : "Faculty"}
                </span>
              </div>
            ))
          )}
          <div ref={chatEndRef} />
        </div>

        {/* INPUT */}
        <div className="cb-input-bar">
          <div className="cb-input-inner">
            <input
              ref={inputRef}
              className="cb-input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendmessage()}
              placeholder="Type your question…"
            />
            <button className="cb-send" onClick={sendmessage} disabled={sending || !message.trim()}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}