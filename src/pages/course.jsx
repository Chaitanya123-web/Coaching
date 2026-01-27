import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Course() {
  const { courseid } = useParams();
  const navigate = useNavigate();

  const [videos, setVideos] = useState([]);
  const [enrolled, setEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const user = await api.get("/auth/me");
        if (user.role === "admin") {
          setEnrolled(true);
          const vids = await api.get(`/video/${courseid}`);
          setVideos(vids);
          return;
        }
        const status = await api.get(`/enroll/check/${courseid}`);
        if (status.enrolled) {
          setEnrolled(true);
          const vids = await api.get(`/video/${courseid}`);
          setVideos(vids);
        } else {
          setEnrolled(false);
        }
      } catch (err) {
        setEnrolled(false);
      } finally {
        setLoading(false);
      }
    };
    loadCourse();
  }, [courseid]);

  const enroll = async () => {
    try {
      await api.post(`/enroll/enroll/${courseid}`);
      window.location.reload(); 
    } catch (err) {
      alert("Enrollment failed. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f7eb]">
        <div className="w-10 h-10 border-4 border-[#1f4f5a] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-[#1f4f5a] font-bold tracking-tight">Fetching curriculum...</p>
      </div>
    );
  }

  if (!enrolled) {
    return (
      <div className="min-h-screen bg-[#f8f7eb] pt-40 px-6">
        <div className="max-w-2xl mx-auto bg-white rounded-[2.5rem] shadow-2xl shadow-black/5 p-10 md:p-16 text-center border border-[#0b2a4a]/5">
          <div className="w-20 h-20 bg-[#f2f1d5] rounded-3xl flex items-center justify-center mx-auto mb-8 text-[#0b2a4a]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-[#0b2a4a] mb-4 tracking-tight">Access Restricted</h2>
          <p className="text-[#2f6f7e] mb-10 text-lg font-medium">This curriculum is exclusive to enrolled members. Unlock the full learning experience today.</p>
          <button
            onClick={enroll}
            className="w-full sm:w-auto bg-[#0b2a4a] text-[#f2f1d5] px-12 py-4 rounded-2xl font-black uppercase text-sm tracking-[0.2em] hover:bg-[#1f4f5a] transition-all shadow-xl active:scale-95"
          >
            Enroll in Batch
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f7eb] pt-32 md:pt-40 pb-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#6fa6b2] mb-2 block">Course Modules</span>
            <h1 className="text-4xl md:text-5xl font-black text-[#0b2a4a] tracking-tighter">Your Curriculum</h1>
          </div>
          <p className="text-[#2f6f7e] font-bold text-sm bg-white px-4 py-2 rounded-full border border-[#0b2a4a]/5 shadow-sm">
            {videos.length} Lessons Available
          </p>
        </div>

        {videos.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-[#1f4f5a]/30">
            <p className="text-[#2f6f7e] font-bold italic">Curriculum is being updated. Check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {videos.map((video, index) => (
              <div
                key={video._id}
                onClick={() => navigate(`/video/${video._id}`)}
                className="group flex flex-col sm:flex-row gap-5 items-center bg-white rounded-3xl p-4 sm:p-5 border border-[#0b2a4a]/5 cursor-pointer hover:shadow-xl hover:border-[#1f4f5a]/20 transition-all duration-300"
              >
                {/* VIDEO THUMBNAIL (LEFT) */}
                <div className="w-full sm:w-40 aspect-video bg-[#0b2a4a] rounded-2xl flex items-center justify-center text-[#f2f1d5] text-2xl relative overflow-hidden shrink-0">
                  <span className="relative z-10 group-hover:scale-125 transition-transform duration-500">▶</span>
                  <div className="absolute inset-0 bg-[#1f4f5a] opacity-0 group-hover:opacity-40 transition-opacity"></div>
                </div>

                {/* CONTENT (RIGHT) */}
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                    <span className="text-[10px] font-black text-[#6fa6b2] uppercase tracking-widest">Lesson {index + 1}</span>
                    <h3 className="text-xl font-bold text-[#0b2a4a] group-hover:text-[#1f4f5a] transition-colors line-clamp-1 italic sm:not-italic">
                      {video.title}
                    </h3>
                  </div>
                  <p className="text-sm text-[#2f6f7e] font-medium opacity-70">
                    Recorded high-definition lesson with deep conceptual clarity.
                  </p>
                </div>

                {/* STATUS TAG */}
                <div className="hidden md:block pr-4">
                   <div className="text-[10px] font-black uppercase tracking-widest text-[#0b2a4a] bg-[#f8f7eb] px-3 py-1 rounded-lg border border-[#0b2a4a]/5">
                     Play
                   </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}