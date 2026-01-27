import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Videoplayer from "../components/videoplayer";

export default function Video() {
  const { videoid } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchvideo = async () => {
      try {
        const data = await api.get(`/video/single/${videoid}`);
        setVideo(data);
      } catch (err) {
        setError("Failed to load the lesson. Please refresh.");
      } finally {
        setLoading(false);
      }
    };
    fetchvideo();
  }, [videoid]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f7eb]">
        <div className="w-10 h-10 border-4 border-[#0b2a4a] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-[#0b2a4a] font-black uppercase tracking-widest text-xs">Loading Lesson...</p>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f7eb] p-6 text-center">
        <div className="max-w-md">
           <h2 className="text-2xl font-black text-[#0b2a4a] mb-2">Lesson Not Found</h2>
           <p className="text-[#2f6f7e] mb-6">The video you are looking for might have been moved or deleted.</p>
           <button onClick={() => window.history.back()} className="bg-[#0b2a4a] text-[#f2f1d5] px-8 py-3 rounded-xl font-bold">Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f7eb] pt-24 pb-12 sm:pt-32 sm:pb-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* BREADCRUMB - Tablet/Laptop Only */}
        <div className="hidden sm:flex items-center gap-2 mb-6 text-[10px] font-black uppercase tracking-widest text-[#6fa6b2]">
           <a href="/dashboard" className="hover:text-[#0b2a4a]">Dashboard</a>
           <span>/</span>
           <span className="text-[#0b2a4a]">Video Lesson</span>
        </div>

        {/* PLAYER WRAPPER */}
        <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Videoplayer
            videourl={video.videourl}
            title={video.title}
            description={video.description}
          />
        </div>

        {/* BOTTOM HELP SECTION */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-6 px-4">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0b2a4a] flex items-center justify-center text-[#f2f1d5] font-black shadow-lg">?</div>
              <div>
                 <h4 className="text-[#0b2a4a] font-bold text-sm">Having Doubts?</h4>
                 <p className="text-[#2f6f7e] text-xs">Ask in the community chat for instant help.</p>
              </div>
           </div>
           <button 
             onClick={() => window.location.href='/chat'}
             className="w-full sm:w-auto px-8 py-3 bg-white text-[#0b2a4a] border border-[#0b2a4a]/10 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-[#0b2a4a] hover:text-white transition-all shadow-sm"
           >
              Open Doubt Box
           </button>
        </div>

      </div>
    </div>
  );
}