import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function Video() {
  const { videoid } = useParams();
  const [video, setVideo] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false); 
  
  // Doubt Section States
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  
  const playerRef = useRef(null);
  const chatEndRef = useRef(null);

  // ... (previous imports remain same)

useEffect(() => {
  const fetchData = async () => {
    setLoading(true); // Fetch shuru hote hi loading start karein
    try {
      // Dono requests ko parallel bhejein taaki time bache
      const [videoRes, userRes] = await Promise.all([
        api.get(`/video/single/${videoid}`),
        api.get("/auth/me"),
      ]);
      
      // Axios usually data ko .data property mein deta hai
      setVideo(videoRes.data || videoRes); 
      setUser(userRes.data || userRes);

      // Chat history alag se fetch karein taaki video pehle load ho jaye
      api.get(`/chat/${videoid}`)
        .then(res => setMessages(res.data || res))
        .catch(err => console.error("Chat fetch error:", err));

    } catch (err) { 
      console.error("Fetch Error Details:", err);
      // Agar error aaye toh loading band karke error dikhayein
    } finally { 
      setLoading(false); 
    }
  };

  if (videoid) fetchData();
}, [videoid]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    try {
      const sentMsg = await api.post(`/chat/send`, { videoid, message: newMessage });
      setMessages([...messages, sentMsg]);
      setNewMessage("");
    } catch (err) { 
      console.error("Chat Error:", err); 
    }
  };

  const sendCommand = (func, args = []) => {
    if (playerRef.current?.contentWindow) {
      playerRef.current.contentWindow.postMessage(
        JSON.stringify({ event: "command", func, args }),
        "*"
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

  if (loading || !video) return <div className="min-h-screen bg-[#f8f7eb] flex items-center justify-center font-black text-[#0b2a4a]">Loading Material...</div>;

  return (
    <div className="min-h-screen bg-[#f8f7eb] pt-32 px-4 select-none" onContextMenu={(e) => e.preventDefault()}>
      <div className="max-w-5xl mx-auto pb-20">
        
        {/* VIDEO CONTAINER */}
        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-black border-4 border-[#0b2a4a] aspect-video group">
          
          {/* HIJACKER BUTTON (Only for YouTube) */}
          {!isPaused && video.videourl.includes("youtube") && (
            <div onClick={handleCustomPause} className="absolute bottom-0 left-0 w-[12%] h-[15%] z-[60] cursor-pointer bg-transparent"></div>
          )}

          {/* TRANSPARENT BLOCKER (Pause Mode) */}
          {isPaused && (
            <div onClick={handleCustomPause} className="absolute inset-0 z-50 bg-transparent flex items-start justify-center cursor-pointer">
              <div className="mt-6 bg-[#0b2a4a]/90 text-white px-6 py-2 rounded-full text-[10px] font-black tracking-widest uppercase">
                Paused - Click to Resume
              </div>
            </div>
          )}

          {/* PERMANENT PROTECTION (Play Mode) */}
          {!isPaused && (
            <div className="absolute top-0 bottom-[10%] inset-x-0 bg-transparent z-40 pointer-events-auto cursor-default"></div>
          )}

          {/* WATERMARK */}
          {user && (
            <div className="absolute inset-0 pointer-events-none z-[70] overflow-hidden opacity-10">
              <div className="absolute top-[15%] left-[10%] text-white text-[10px] font-black uppercase tracking-[0.4em] animate-pulse">
                {user.email} | {user.name}
              </div>
            </div>
          )}

          <iframe
            ref={playerRef}
            src={getEmbedUrl(video.videourl)}
            className="w-full h-full border-none"
            allow="autoplay; encrypted-media; fullscreen"
          ></iframe>
        </div>

        {/* INFO SECTION */}
        <div className="mt-8 px-4">
          <h1 className="text-3xl font-black text-[#0b2a4a] tracking-tight">{video.title}</h1>
          <p className="mt-4 text-[#2f6f7e] font-medium opacity-80 leading-relaxed italic border-l-4 border-[#0b2a4a]/20 pl-6">
            {video.description}
          </p>
        </div>

        <hr className="my-10 border-[#0b2a4a]/10" />

        {/* DOUBT / CHAT SECTION */}
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-[#0b2a4a]/5 overflow-hidden">
          <div className="bg-[#0b2a4a] p-6 flex items-center gap-3">
            <span className="text-xl">💬</span>
            <h2 className="text-white font-black uppercase tracking-widest text-sm">Ask Your Doubts</h2>
          </div>

          <div className="h-[400px] overflow-y-auto p-8 flex flex-col gap-4 bg-[#f8f7eb]/20">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex flex-col ${msg.role === 'admin' ? 'items-start' : 'items-end'}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl text-sm shadow-sm ${
                  msg.role === 'admin' 
                    ? 'bg-white text-[#0b2a4a] rounded-tl-none border border-[#0b2a4a]/10 font-medium' 
                    : 'bg-[#0b2a4a] text-white rounded-tr-none font-bold'
                }`}>
                  {msg.message}
                </div>
                <span className="text-[10px] mt-1 opacity-40 font-bold uppercase tracking-tighter mx-2">
                  {msg.role === 'admin' ? 'Instructor' : 'You'}
                </span>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-6 bg-white border-t border-[#0b2a4a]/5 flex gap-4">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your question here..."
              className="flex-1 bg-[#f8f7eb] border-2 border-transparent focus:border-[#0b2a4a]/20 outline-none px-6 py-4 rounded-2xl font-bold text-[#0b2a4a] placeholder:opacity-30 transition-all"
            />
            <button type="submit" className="bg-[#0b2a4a] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all shadow-lg">
              Send
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}