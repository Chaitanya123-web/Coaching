import { useEffect, useState } from "react";
import api from "../services/api";
import Coursecard from "../components/coursecard";
import heroimg from "../assets/hero.png";

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchcourses = async () => {
      try {
        const data = await api.get("/course");
        setCourses(data);
      } catch (err) {
        setError("Failed to load courses. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchcourses();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f2f1d5]">
        <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-[#1f4f5a] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-base sm:text-lg font-medium text-[#1f4f5a] animate-pulse">
          Curating your experience...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f2f1d5] px-6 text-center text-red-600 font-medium">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-[#f8f7eb] min-h-screen font-sans selection:bg-[#1f4f5a] selection:text-white">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-[#0b2a4a] text-[#f2f1d5] pt-32 pb-20 md:pt-40 md:pb-32 px-4 sm:px-6">
        {/* Background Decorative Element - Scaled for mobile */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-72 h-72 md:w-[520px] md:h-[520px] bg-[#1f4f5a] rounded-full blur-[80px] md:blur-[120px] opacity-30 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
            
            {/* LEFT: TEXT CONTENT */}
            <div className="space-y-6 sm:space-y-8 text-center lg:text-left order-2 lg:order-1">
              <div className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border border-[#6fa6b2]/30 bg-[#1f4f5a]/20 text-[#6fa6b2] text-[10px] sm:text-xs font-semibold tracking-[0.15em] uppercase">
                Premium E-Learning Platform
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
                Learn <span className="text-[#6fa6b2]">deeply.</span>
                <br className="hidden lg:block" />
                <span className="lg:ml-1"> Grow confidently.</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-[#b0cdd4] max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Expert-led courses designed to build strong fundamentals, clear doubts, 
                and help you master your craft with professional guidance.
              </p>

              <div className="flex flex-col xs:flex-row gap-4 sm:gap-5 justify-center lg:justify-start pt-2">
                <a
                  href="#courses"
                  className="bg-[#f2f1d5] text-[#0b2a4a] px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-xl hover:bg-white hover:-translate-y-1 transition-all duration-300"
                >
                  Explore Courses
                </a>
                <a
                  href="/dashboard"
                  className="backdrop-blur-md bg-white/5 border border-white/20 text-[#f2f1d5] px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
                >
                  My Dashboard
                </a>
              </div>
            </div>

            {/* RIGHT: IMAGE WITH GLOW - Appears first on mobile */}
            <div className="relative group order-1 lg:order-2">
              <div className="absolute inset-0 bg-[#6fa6b2] rounded-[2rem] blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
              <img
                src={heroimg}
                alt="Learning illustration"
                className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto rounded-[2rem] shadow-2xl border border-white/10 transform transition-transform duration-700 hover:scale-[1.01]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= COURSES SECTION ================= */}
      <section id="courses" className="px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 md:mb-16 gap-6 text-center md:text-left">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0b2a4a] mb-3">
                Available Courses
              </h2>
              <p className="text-base sm:text-lg text-[#2f6f7e]">
                Hand-picked batches starting soon. Join a community of dedicated learners.
              </p>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <span className="h-px w-16 bg-[#1f4f5a] rounded-full" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#2f6f7e]/80 font-bold">
                Batch 2026
              </span>
            </div>
          </div>

          {courses.length === 0 ? (
            <div className="py-20 text-center bg-white/40 rounded-[2rem] border-2 border-dashed border-[#1f4f5a]/10">
              <p className="text-lg text-[#2f6f7e] font-medium">No courses available right now.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
              {courses.map((course) => (
                <div key={course._id} className="h-full">
                  <Coursecard
                    id={course._id}
                    title={course.title}
                    description={course.description}
                    price={course.price}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="bg-[#1f4f5a] py-20 md:py-28 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center text-[#f2f1d5]">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 tracking-tight">
            Learning doesn’t end with videos.
          </h3>
          <p className="text-base sm:text-lg md:text-xl text-[#6fa6b2] mb-10 leading-relaxed max-w-2xl mx-auto">
            Get personalized support, clear your roadblocks, and stay consistent with our structured learning path.
          </p>
          <a
            href="/methodology"
            className="inline-block text-sm sm:text-base text-[#f2f1d5] border-b-2 border-[#6fa6b2] pb-1 font-semibold hover:text-white hover:border-[#f2f1d5] transition-all"
          >
            Our Learning Methodology →
          </a>
        </div>
      </section>
    </div>
  );
}