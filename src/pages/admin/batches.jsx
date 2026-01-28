import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AdminBatches() {
  const [courses, setCourses] = useState([]);

  // create course states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  // add video states
  const [videotitle, setVideotitle] = useState("");
  const [videourl, setVideourl] = useState("");
  const [courseid, setCourseid] = useState("");
  const [videofile, setVideofile] = useState(null);

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);

  // fetch courses
  useEffect(() => {
    const fetchcourses = async () => {
      try {
        const data = await api.get("/course");
        setCourses(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchcourses();
  }, []);

  const showAlert = (msg, success = true) => {
    setMessage(msg);
    setIsSuccess(success);
    setTimeout(() => setMessage(""), 5000);
  };

  // create course
  const createcourse = async (e) => {
    e.preventDefault();
    try {
      await api.post("/course/create", { title, description, price });
      showAlert("Course created successfully!");
      setTitle(""); setDescription(""); setPrice("");
      const updated = await api.get("/course");
      setCourses(updated);
    } catch (err) {
      showAlert("Failed to create course", false);
    }
  };


const addvideo = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();
    formData.append("title", videotitle);
    formData.append("course", courseid);

    if (videofile) {
      formData.append("video", videofile); 
    } else {
      formData.append("videourl", videourl); 
    }

    await api.post("/video/add", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    showAlert("Video added successfully!");
    setVideotitle("");
    setVideourl("");
    setVideofile(null);
    setCourseid("");
  } catch (err) {
    showAlert("Failed to add video", false);
  }
};


  return (
    <div className="min-h-screen bg-[#f8f7eb] text-[#0b2a4a]">
      
      {/* ================= TOP NAVIGATION ================= */}
      <nav className="bg-[#0b2a4a] text-[#f2f1d5] py-4 md:py-6 px-4 md:px-8 shadow-xl flex justify-between items-center sticky top-0 z-50">
        <div>
          <h1 className="text-xl md:text-2xl font-black tracking-tight uppercase">
            Academy <span className="text-[#6fa6b2]">Admin</span>
          </h1>
        </div>
        <div className="flex gap-4 items-center">
          <span className="hidden sm:block text-xs font-medium opacity-70">Control Panel v2.0</span>
          <div className="h-8 w-8 md:h-10 md:w-10 rounded-xl bg-[#1f4f5a] border border-white/20 flex items-center justify-center font-bold text-xs">A</div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {/* ================= STATS SUMMARY ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          <div className="bg-white p-5 md:p-6 rounded-2xl md:rounded-3xl shadow-sm border border-[#0b2a4a]/5">
            <p className="text-[#2f6f7e] text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1">Total Batches</p>
            <h3 className="text-3xl md:text-4xl font-black">{courses.length}</h3>
          </div>
          <div className="bg-[#1f4f5a] p-5 md:p-6 rounded-2xl md:rounded-3xl shadow-lg text-[#f2f1d5]">
            <p className="opacity-70 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1">Status</p>
            <h3 className="text-xl md:text-2xl font-bold">System Online</h3>
          </div>
          <div className="bg-white p-5 md:p-6 rounded-2xl md:rounded-3xl shadow-sm border border-[#0b2a4a]/5">
            <p className="text-[#2f6f7e] text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1">Active Videos</p>
            <h3 className="text-3xl md:text-4xl font-black">—</h3>
          </div>
        </div>

        {/* ================= NOTIFICATION ================= */}
        {message && (
          <div className={`mb-8 p-4 rounded-xl md:rounded-2xl text-center text-xs md:text-sm font-bold animate-in fade-in zoom-in duration-300 ${isSuccess ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">

          {/* CREATE COURSE FORM */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-[#0b2a4a] rounded-lg md:rounded-xl flex items-center justify-center text-white font-bold italic text-sm">C</div>
              <h2 className="text-xl md:text-2xl font-black tracking-tight text-[#0b2a4a]">Launch New Batch</h2>
            </div>
            
            <form onSubmit={createcourse} className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] shadow-xl shadow-black/5 p-6 md:p-10 border border-[#0b2a4a]/5 space-y-5">
              <div>
                <label className="text-[10px] font-bold uppercase text-[#2f6f7e] ml-1 mb-2 block tracking-widest">Batch Title</label>
                <input
                  className="w-full px-4 md:px-5 py-3 md:py-4 bg-[#f8f7eb]/50 border-2 border-transparent focus:border-[#1f4f5a] focus:bg-white rounded-xl md:rounded-2xl outline-none transition-all text-sm md:text-base"
                  placeholder="e.g. Web Dev 2026"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase text-[#2f6f7e] ml-1 mb-2 block tracking-widest">Description</label>
                <textarea
                  className="w-full px-4 md:px-5 py-3 md:py-4 bg-[#f8f7eb]/50 border-2 border-transparent focus:border-[#1f4f5a] focus:bg-white rounded-xl md:rounded-2xl outline-none transition-all h-24 md:h-32 resize-none text-sm md:text-base"
                  placeholder="Batch details..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase text-[#2f6f7e] ml-1 mb-2 block tracking-widest">Pricing (₹)</label>
                <input
                  type="number"
                  className="w-full px-4 md:px-5 py-3 md:py-4 bg-[#f8f7eb]/50 border-2 border-transparent focus:border-[#1f4f5a] focus:bg-white rounded-xl md:rounded-2xl outline-none transition-all font-bold text-base md:text-xl"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>

              <button className="w-full bg-[#0b2a4a] text-[#f2f1d5] py-4 md:py-5 rounded-xl md:rounded-2xl font-bold text-sm md:text-lg hover:bg-[#1f4f5a] transition-all active:scale-95 shadow-lg">
                Publish Batch
              </button>
            </form>
          </section>

          {/* ADD VIDEO FORM */}
          <section className="mt-8 lg:mt-0">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-[#1f4f5a] rounded-lg md:rounded-xl flex items-center justify-center text-white font-bold italic text-sm">V</div>
              <h2 className="text-xl md:text-2xl font-black tracking-tight text-[#0b2a4a]">Upload Content</h2>
            </div>

            <form onSubmit={addvideo} className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] shadow-xl shadow-black/5 p-6 md:p-10 border border-[#0b2a4a]/5 space-y-5">
              <div>
                <label className="text-[10px] font-bold uppercase text-[#2f6f7e] ml-1 mb-2 block tracking-widest">Video Title</label>
                <input
                  className="w-full px-4 md:px-5 py-3 md:py-4 bg-[#f8f7eb]/50 border-2 border-transparent focus:border-[#1f4f5a] focus:bg-white rounded-xl md:rounded-2xl outline-none transition-all text-sm md:text-base"
                  placeholder="Lesson name..."
                  value={videotitle}
                  onChange={(e) => setVideotitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase text-[#2f6f7e] ml-1 mb-2 block tracking-widest">
                  OR Upload Video File
                </label>

                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setVideofile(e.target.files[0])}
                  className="w-full text-sm"
                />
              </div>

              <input
                className="w-full px-4 md:px-5 py-3 md:py-4 bg-[#f8f7eb]/50 border-2 border-transparent focus:border-[#1f4f5a] focus:bg-white rounded-xl md:rounded-2xl outline-none transition-all text-sm md:text-base"
                placeholder="https://..."
                value={videourl}
                onChange={(e) => setVideourl(e.target.value)}
                disabled={!!videofile}   
              />


              <div>
                <label className="text-[10px] font-bold uppercase text-[#2f6f7e] ml-1 mb-2 block tracking-widest">Select Batch</label>
                <select
                  className="w-full px-4 md:px-5 py-3 md:py-4 bg-[#f8f7eb]/50 border-2 border-transparent focus:border-[#1f4f5a] focus:bg-white rounded-xl md:rounded-2xl outline-none transition-all font-semibold appearance-none cursor-pointer text-sm md:text-base"
                  value={courseid}
                  onChange={(e) => setCourseid(e.target.value)}
                  required
                >
                  <option value="">Select batch...</option>
                  {courses.map((course) => (
                    <option key={course._id} value={course._id}>{course.title}</option>
                  ))}
                </select>
              </div>

              <div className="pt-2">
                <button className="w-full border-2 border-[#0b2a4a] text-[#0b2a4a] py-4 md:py-5 rounded-xl md:rounded-2xl font-bold text-sm md:text-lg hover:bg-[#0b2a4a] hover:text-[#f2f1d5] transition-all active:scale-95">
                  Add to Curriculum
                </button>
              </div>
            </form>
          </section>

        </div>
      </div>
    </div>
  );
}