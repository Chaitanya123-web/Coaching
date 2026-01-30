import { useEffect, useState } from "react";
import api from "../services/api";
import Coursecard from "../components/coursecard";

export default function Dashboard() {
  const [courses, setCourses] = useState([]); // Initialized as empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchmycourses = async () => {
      try {
        const response = await api.get("/course");
        
        /**
         * PRODUCTION FIX: Strict Unwrapping
         * Forces the result into an array format even if backend sends { courses: [...] }
         * or a single object error message.
         */
        const actualCourses = Array.isArray(response) 
          ? response 
          : (response?.courses || []);
          
        setCourses(actualCourses);
      } catch (err) {
        console.error("Dashboard Load Error:", err);
        setError("Unable to load your dashboard. Please try again.");
        setCourses([]); // Fallback to empty array to prevent .map crash
      } finally {
        setLoading(false);
      }
    };

    fetchmycourses();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f7eb]">
        <div className="w-10 h-10 border-4 border-[#1f4f5a] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-[#1f4f5a] font-medium tracking-wide">Opening your classroom...</p>
      </div>
    );
  }

  if (error && courses.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f7eb] text-red-600 font-medium px-6 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f7eb] flex flex-col">
      
      {/* ================= DASHBOARD HEADER ================= */}
      <header className="bg-[#0b2a4a] pt-32 pb-16 md:pt-40 md:pb-24 px-4 sm:px-6 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-[#1f4f5a] rounded-full blur-[80px] md:blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#f2f1d5] mb-3 tracking-tighter">
            Welcome back! 👋
          </h1>
          <p className="text-[#6fa6b2] text-sm sm:text-lg font-medium">
            You have <span className="text-[#f2f1d5] px-2 py-0.5 bg-[#1f4f5a] rounded-md mx-1">{courses.length}</span> active batches in your account.
          </p>
        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 -mt-8 md:-mt-10 mb-20 relative z-20">
        
        {/* Navigation Tabs - Swipeable on mobile */}
        <div className="flex gap-6 md:gap-8 mb-8 md:mb-12 border-b border-[#0b2a4a]/10 overflow-x-auto pb-1 no-scrollbar">
          <button className="text-[#0b2a4a] font-black border-b-4 border-[#1f4f5a] pb-3 md:pb-4 whitespace-nowrap text-sm md:text-lg transition-all shrink-0">
            My Enrolled Courses
          </button>
          <button className="text-[#2f6f7e] font-bold pb-3 md:pb-4 hover:text-[#0b2a4a] transition whitespace-nowrap text-sm md:text-lg shrink-0">
            Completed
          </button>
          <button className="text-[#2f6f7e] font-bold pb-3 md:pb-4 hover:text-[#0b2a4a] transition whitespace-nowrap text-sm md:text-lg shrink-0">
            Support
          </button>
        </div>

        {/* PRODUCTION FIX: Array.isArray check before calling .map */}
        {Array.isArray(courses) && courses.length === 0 ? (
          <div className="bg-white rounded-[2rem] p-10 md:p-20 text-center shadow-xl shadow-black/5 border border-[#0b2a4a]/5">
            <div className="mb-6 text-5xl md:text-6xl animate-bounce">📚</div>
            <h2 className="text-2xl md:text-3xl font-black text-[#0b2a4a] mb-3 tracking-tight">Your shelf is empty</h2>
            <p className="text-[#2f6f7e] text-sm md:text-lg mb-8 md:mb-10 max-w-md mx-auto leading-relaxed">
              Explore our expert-led batches and start building your skills today.
            </p>
            <a 
              href="/" 
              className="inline-block bg-[#1f4f5a] text-white px-8 py-3.5 md:px-10 md:py-4 rounded-xl md:rounded-2xl font-black uppercase text-xs md:text-sm tracking-widest hover:bg-[#0b2a4a] transition-all shadow-lg active:scale-95"
            >
              Browse Catalog
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {Array.isArray(courses) && courses.map((course) => (
              <div key={course._id} className="relative group">
                {/* Premium "Batch" Badge */}
                <div className="absolute top-3 right-3 md:top-4 md:right-4 z-20 bg-[#1f4f5a] text-[#f2f1d5] text-[9px] md:text-[11px] font-black px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg uppercase tracking-widest shadow-lg border border-white/10">
                  Enrolled
                </div>
                
                <div className="hover:scale-[1.02] md:hover:-translate-y-3 transition-all duration-500 ease-out h-full">
                  <Coursecard
                    id={course._id}
                    title={course.title}
                    description={course.description}
                    price="enrolled"
                  />
                </div>

                {/* Status hint */}
                <div className="hidden md:flex mt-4 items-center gap-3 px-3 text-[#1f4f5a] text-xs font-black opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 uppercase tracking-tighter">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1f4f5a] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1f4f5a]"></span>
                  </span>
                  Resume Learning
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ================= DASHBOARD FOOTER ================= */}
      <footer className="mt-auto py-8 md:py-12 border-t border-[#0b2a4a]/5 text-center bg-white/30 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-[#2f6f7e] text-xs md:text-sm font-bold uppercase tracking-widest leading-loose">
            Trouble with a course? Contact 
            <span className="text-[#0b2a4a] ml-1 cursor-pointer border-b border-[#0b2a4a]/20">support@academy.com</span>
          </p>
        </div>
      </footer>

    </div>
  );
}