import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function Video() {
  const { videoid } = useParams();
  const [video, setVideo] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const playerRef = useRef(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [videoRes, userRes] = await Promise.all([
          api.get(`/video/single/${videoid}`),
          api.get("/auth/me"),
        ]);
        setVideo(videoRes.data || videoRes);
        setUser(userRes.data || userRes);
        api.get(`/chat/${videoid}`)
          .then(res => setMessages(res.data || res))
          .catch(() => {});
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    if (videoid) fetchData();
  }, [videoid]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendCommand = (func, args = []) => {
    if (playerRef.current?.contentWindow) {
      playerRef.current.contentWindow.postMessage(
        JSON.stringify({ event: "command", func, args }), "*"
      );
    }
  };

  const handleCustomPause = (e) => {
    e.stopPropagation();
    if (!isPaused) {
      if (video.videourl.includes("youtube")) sendCommand("pauseVideo");
      setIsPaused(true);
    } else {
      if (video.videourl.includes("youtube")) sendCommand("playVideo");
      setIsPaused(false);
    }
  };

  const getEmbedUrl = (url) => {
    if (!url) return "";
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const videoId = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=))([\w\-]{11})/)?.[1];
      return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&enablejsapi=1&autoplay=1&iv_load_policy=3`;
    }
    if (url.includes("drive.google.com")) {
      const driveId = url.match(/[-\w]{25,}/);
      return driveId ? `https://drive.google.com/file/d/${driveId[0]}/preview` : "";
    }
    return url;
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;
    setSending(true);
    try {
      const sentMsg = await api.post(`/chat/send`, { videoid, message: newMessage });
      setMessages(prev => [...prev, sentMsg]);
      setNewMessage("");
    } catch (err) {
      console.error("Chat error:", err);
    } finally {
      setSending(false);
    }
  };

  if (loading || !video) return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#f5f3ee", fontFamily:"'DM Sans',sans-serif", color:"#1a3a5c", fontSize:"0.9rem", gap:"0.75rem", flexDirection:"column" }}>
      <div style={{ width:36, height:36, border:"3px solid #1a3a5c", borderTopColor:"transparent", borderRadius:"50%", animation:"spin 0.8s linear infinite" }} />
      Loading material…
      <style>{`@keyframes spin { to { transform:rotate(360deg); } }`}</style>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600&display=swap');

        .vp-page {
          min-height: 100vh;
          background: #f5f3ee;
          padding: 5.5rem 1.25rem 3rem;
          font-family: 'DM Sans', sans-serif;
          user-select: none;
        }

        .vp-page-inner {
          max-width: 860px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        /* ── VIDEO CONTAINER ── */
        .vp-container {
          position: relative;
          border-radius: 1.25rem;
          overflow: hidden;
          aspect-ratio: 16/9;
          background: #000;
          border: 1px solid rgba(26,58,92,0.15);
          box-shadow: 0 8px 40px rgba(26,58,92,0.18);
        }

        .vp-container iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: none;
        }

        /* DRM overlays */
        .vp-blocker-pause {
          position: absolute;
          inset: 0;
          z-index: 50;
          background: transparent;
          cursor: pointer;
          display: flex;
          align-items: flex-start;
          justify-content: center;
        }

        .vp-paused-pill {
          margin-top: 1rem;
          background: rgba(26,58,92,0.88);
          color: #f5f3ee;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 0.45rem 1.1rem;
          border-radius: 100px;
        }

        .vp-blocker-play {
          position: absolute;
          top: 0;
          bottom: 10%;
          left: 0;
          right: 0;
          background: transparent;
          z-index: 40;
          cursor: default;
        }

        .vp-hijack-btn {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 12%;
          height: 15%;
          z-index: 60;
          background: transparent;
          cursor: pointer;
          border: none;
        }

        /* Watermark */
        .vp-watermark {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 70;
          overflow: hidden;
          opacity: 0.08;
          display: flex;
          align-items: flex-start;
          padding: 1.25rem 1.5rem;
        }

        .vp-watermark-text {
          font-size: 0.65rem;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        /* ── INFO ── */
        .vp-info {
          background: #fff;
          border-radius: 1.1rem;
          border: 1px solid rgba(26,58,92,0.08);
          padding: 1.5rem 1.75rem;
          box-shadow: 0 2px 12px rgba(26,58,92,0.05);
        }

        .vp-info-eyebrow {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          margin-bottom: 0.6rem;
        }

        .vp-info-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #4caf86;
          animation: vpdot 2s infinite;
          flex-shrink: 0;
        }

        @keyframes vpdot { 0%,100%{opacity:1} 50%{opacity:0.3} }

        .vp-info-now {
          font-size: 0.6rem;
          font-weight: 700;
          color: #4caf86;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .vp-info-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.1rem, 2.5vw, 1.55rem);
          font-weight: 700;
          color: #1a3a5c;
          letter-spacing: -0.01em;
          margin: 0 0 0.65rem;
        }

        .vp-info-desc {
          font-size: 0.85rem;
          color: #7a8a9a;
          line-height: 1.7;
          border-left: 2px solid #f0ede4;
          padding-left: 0.85rem;
          margin: 0;
        }

        /* ── CHAT ── */
        .vp-chat {
          background: #fff;
          border-radius: 1.1rem;
          border: 1px solid rgba(26,58,92,0.08);
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(26,58,92,0.05);
        }

        .vp-chat-header {
          background: #1a3a5c;
          padding: 1rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .vp-chat-header-title {
          font-size: 0.75rem;
          font-weight: 700;
          color: #f5f3ee;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .vp-chat-messages {
          height: 360px;
          overflow-y: auto;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          background: #f9f8f4;
        }

        .vp-chat-messages::-webkit-scrollbar { width: 4px; }
        .vp-chat-messages::-webkit-scrollbar-track { background: transparent; }
        .vp-chat-messages::-webkit-scrollbar-thumb { background: rgba(26,58,92,0.1); border-radius:10px; }

        .vp-msg-row { display: flex; flex-direction: column; }
        .vp-msg-row.admin { align-items: flex-start; }
        .vp-msg-row.student { align-items: flex-end; }

        .vp-bubble {
          max-width: 75%;
          padding: 0.7rem 1rem;
          font-size: 0.86rem;
          line-height: 1.6;
        }

        .vp-bubble.admin {
          background: #fff;
          color: #1a3a5c;
          border: 1px solid rgba(26,58,92,0.09);
          border-radius: 1rem 1rem 1rem 0.2rem;
          box-shadow: 0 1px 4px rgba(26,58,92,0.05);
        }

        .vp-bubble.student {
          background: #1a3a5c;
          color: #f5f3ee;
          border-radius: 1rem 1rem 0.2rem 1rem;
        }

        .vp-msg-label {
          font-size: 0.6rem;
          font-weight: 600;
          color: #9aabb8;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-top: 0.25rem;
          padding: 0 0.15rem;
        }

        .vp-chat-input-bar {
          background: #fff;
          border-top: 1px solid rgba(26,58,92,0.07);
          padding: 0.9rem 1.25rem;
        }

        .vp-chat-input-inner {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: #f5f3ee;
          border: 1.5px solid transparent;
          border-radius: 0.85rem;
          padding: 0.35rem 0.35rem 0.35rem 1rem;
          transition: border-color 0.2s, background 0.2s;
        }

        .vp-chat-input-inner:focus-within {
          border-color: #1a3a5c;
          background: #fff;
        }

        .vp-chat-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.87rem;
          color: #1a3a5c;
        }

        .vp-chat-input::placeholder { color: #aab8c4; }

        .vp-send-btn {
          background: #1a3a5c;
          color: #f5f3ee;
          border: none;
          border-radius: 0.65rem;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          transition: background 0.18s, transform 0.15s;
        }

        .vp-send-btn:hover:not(:disabled) { background: #2a5a7c; }
        .vp-send-btn:active:not(:disabled) { transform: scale(0.93); }
        .vp-send-btn:disabled { opacity: 0.4; cursor: not-allowed; }

        .vp-chat-empty {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #9aabb8;
          font-size: 0.82rem;
          padding: 2rem;
          text-align: center;
        }
      `}</style>

      <div className="vp-page" onContextMenu={e => e.preventDefault()}>
        <div className="vp-page-inner">

          {/* VIDEO */}
          <div className="vp-container">

            {/* YouTube hijack zone */}
            {!isPaused && video.videourl.includes("youtube") && (
              <button className="vp-hijack-btn" onClick={handleCustomPause} />
            )}

            {/* Pause overlay */}
            {isPaused && (
              <div className="vp-blocker-pause" onClick={handleCustomPause}>
                <div className="vp-paused-pill">Paused — click to resume</div>
              </div>
            )}

            {/* Play protection */}
            {!isPaused && (
              <div className="vp-blocker-play" />
            )}

            {/* Watermark */}
            {user && (
              <div className="vp-watermark">
                <span className="vp-watermark-text">{user.email} · {user.name}</span>
              </div>
            )}

            <iframe
              ref={playerRef}
              src={getEmbedUrl(video.videourl)}
              allow="autoplay; encrypted-media; fullscreen"
            />
          </div>

          {/* INFO */}
          <div className="vp-info">
            <div className="vp-info-eyebrow">
              <span className="vp-info-dot" />
              <span className="vp-info-now">Now Playing</span>
            </div>
            <h1 className="vp-info-title">{video.title}</h1>
            <p className="vp-info-desc">{video.description || "Follow along carefully with the lesson."}</p>
          </div>

          {/* CHAT */}
          <div className="vp-chat">
            <div className="vp-chat-header">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f5f3ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <span className="vp-chat-header-title">Ask Your Doubts</span>
            </div>

            <div className="vp-chat-messages">
              {messages.length === 0 ? (
                <div className="vp-chat-empty">No messages yet. Ask your first question below.</div>
              ) : (
                messages.map((msg, idx) => (
                  <div key={idx} className={`vp-msg-row ${msg.role === "admin" ? "admin" : "student"}`}>
                    <div className={`vp-bubble ${msg.role === "admin" ? "admin" : "student"}`}>
                      {msg.message}
                    </div>
                    <span className="vp-msg-label">
                      {msg.role === "admin" ? "Instructor" : "You"}
                    </span>
                  </div>
                ))
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="vp-chat-input-bar">
              <form onSubmit={handleSendMessage}>
                <div className="vp-chat-input-inner">
                  <input
                    type="text"
                    className="vp-chat-input"
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    placeholder="Type your question…"
                  />
                  <button type="submit" className="vp-send-btn" disabled={sending || !newMessage.trim()}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}