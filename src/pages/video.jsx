import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function Video() {
  const { videoid } = useParams();
  const [video, setVideo] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const playerRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchvideo = async () => {
      try {
        const [videoData, userData] = await Promise.all([
          api.get(`/video/single/${videoid}`),
          api.get("/auth/me"),
        ]);
        setVideo(videoData);
        setUser(userData);
      } catch (err) { console.error(err); } finally { setLoading(false); }
    };
    fetchvideo();
  }, [videoid]);

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds) || seconds < 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const sendCommand = (func, args = []) => {
    if (playerRef.current?.contentWindow) {
      playerRef.current.contentWindow.postMessage(
        JSON.stringify({ event: "command", func, args }),
        "*"
      );
    }
  };

  // SYNC LOGIC - Force YouTube to talk to us
  useEffect(() => {
    const handleMessage = (event) => {
      // Netlify origin security
      if (!event.origin.includes("youtube.com")) return;

      try {
        const data = JSON.parse(event.data);
        if (data.event === "infoDelivery" && data.info) {
          if (data.info.currentTime !== undefined) setCurrentTime(data.info.currentTime);
          if (data.info.duration !== undefined && data.info.duration > 0) setDuration(data.info.duration);
        }
      } catch (e) {}
    };

    window.addEventListener("message", handleMessage);

    // Initial trigger to wake up the API
    const initialTrigger = setTimeout(() => {
      sendCommand("addEventListener", ["onStateChange"]);
    }, 2000);

    const timer = setInterval(() => {
      sendCommand("getCurrentTime");
      sendCommand("getDuration");
    }, 1000);

    return () => {
      window.removeEventListener("message", handleMessage);
      clearInterval(timer);
      clearTimeout(initialTrigger);
    };
  }, []);

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    const videoId = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=))([\w\-]{11})/)?.[1];
    // Dynamic origin for Netlify
    const origin = window.location.origin;
    return `https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=${origin}&rel=0&modestbranding=1&controls=0&showinfo=0&autoplay=1&iv_load_policy=3`;
  };

  const handleSkip = (seconds) => {
    const newTime = currentTime + seconds;
    const clampedTime = Math.max(0, duration > 0 ? Math.min(newTime, duration) : newTime);
    sendCommand("seekTo", [clampedTime, true]);
    setCurrentTime(clampedTime);
  };

  const togglePlay = () => {
    sendCommand(isPlaying ? "pauseVideo" : "playVideo");
    setIsPlaying(!isPlaying);
  };

  const handleFullScreen = () => {
    if (!document.fullscreenElement) containerRef.current.requestFullscreen();
    else document.exitFullscreen();
  };

  if (loading || !video) return <div className="min-h-screen bg-[#f8f7eb] flex items-center justify-center font-black">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#f8f7eb] pt-32 px-4 select-none">
      <div className="max-w-5xl mx-auto" ref={containerRef}>
        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-black border-4 border-[#0b2a4a] aspect-video group">
          <div className="absolute inset-0 z-40 bg-transparent pointer-events-auto"></div>
          
          <div className="absolute inset-0 z-0 scale-[1.12]">
            <iframe
              ref={playerRef}
              src={getYouTubeEmbedUrl(video.videourl)}
              className="w-full h-full pointer-events-none"
              allow="autoplay; encrypted-media"
            ></iframe>
          </div>

          {/* TRANSPARENT CONTROLS - LEFT ALIGNED */}
          <div className="absolute bottom-6 left-0 right-0 z-[60] px-8 transition-all duration-500 ease-out translate-y-2 group-hover:translate-y-0">
            <div className="relative flex items-center justify-between bg-black/20 border border-white/5 p-6 rounded-[2.5rem] backdrop-blur-sm">
              <div className="flex flex-col gap-4">
                {/* ACCURATE TIME LABEL */}
                <div className="text-white/80 font-black text-[10px] tracking-[0.2em] ml-2">
                  {formatTime(currentTime)} <span className="text-white/20 mx-1">/</span> {formatTime(duration)}
                </div>

                <div className="flex items-center gap-10">
                  <button onClick={() => handleSkip(-10)} className="flex flex-col items-center gap-1 text-white/40 hover:text-white transition-all">
                    <span className="text-xl">⏪</span>
                    <span className="text-[9px] font-bold">-10s</span>
                  </button>
                  <button onClick={togglePlay} className="w-14 h-14 flex items-center justify-center bg-[#f2f1d5]/90 text-[#0b2a4a] rounded-2xl shadow-xl">
                    {isPlaying ? "||" : "▶"}
                  </button>
                  <button onClick={() => handleSkip(10)} className="flex flex-col items-center gap-1 text-white/40 hover:text-white transition-all">
                    <span className="text-xl">⏩</span>
                    <span className="text-[9px] font-bold">+10s</span>
                  </button>
                </div>
              </div>
              <button onClick={handleFullScreen} className="px-6 py-3 bg-white/5 text-white/30 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/10 hover:bg-[#f2f1d5] hover:text-[#0b2a4a] transition-all">Full Screen</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}