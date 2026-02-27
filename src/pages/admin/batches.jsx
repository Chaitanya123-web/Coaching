import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AdminBatches() {
  const [courses, setCourses] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [videotitle, setVideotitle] = useState("");
  const [videourl, setVideourl] = useState("");
  const [courseid, setCourseid] = useState("");
  const [videofile, setVideofile] = useState(null);

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);

  const [selectedBatchVideos, setSelectedBatchVideos] = useState([]);
  const [viewingBatchId, setViewingBatchId] = useState(null);

  const fetchVideosForBatch = async (bid) => {
    try {
      const data = await api.get(`/video/course/${bid}`);
      setSelectedBatchVideos(Array.isArray(data) ? data : (data.videos || []));
      setViewingBatchId(bid);
    } catch (err) {
      console.error("Video fetch failed");
    }
  };

  useEffect(() => {
    const fetchcourses = async () => {
      try {
        const response = await api.get("/course");
        const actualCourses = Array.isArray(response) ? response : (response?.courses || []);
        setCourses(actualCourses);
      } catch (err) {
        console.error("Fetch failed:", err);
      }
    };
    fetchcourses();
  }, []);

  const showAlert = (msg, success = true) => {
    setMessage(msg);
    setIsSuccess(success);
    setTimeout(() => setMessage(""), 5000);
  };

  const createcourse = async (e) => {
    e.preventDefault();
    try {
      await api.post("/course/create", { title, description, price });
      showAlert("New batch has been launched successfully.");
      setTitle(""); setDescription(""); setPrice("");
      const updated = await api.get("/course");
      const actualCourses = Array.isArray(updated) ? updated : (updated?.courses || []);
      setCourses(actualCourses);
    } catch (err) {
      showAlert("Launch failed. Please verify data.", false);
    }
  };

  const addvideo = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", videotitle);
      formData.append("course", courseid);
      if (videofile) formData.append("video", videofile);
      else formData.append("videourl", videourl);

      await api.post("/video/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      showAlert("Curriculum updated successfully.");
      setVideotitle(""); setVideourl(""); setVideofile(null); setCourseid("");
    } catch (err) {
      showAlert("Content upload failed.", false);
    }
  };

  {/* NEW: STANDARD VIDEO DELETION LOGIC */}
  const deleteVideo = async (videoId) => {
    if (window.confirm("Bhai, kya aap sach mein ye video udaana chahte hain?")) {
      try {
        await api.delete(`/video/delete/${videoId}`);
        setSelectedBatchVideos(prev => prev.filter(v => v._id !== videoId));
        showAlert("Video deleted successfully.");
      } catch (err) {
        showAlert("Failed to delete video.", false);
      }
    }
  };

  return (
    <div className="animate-in fade-in duration-700">
      
      {/* HEADER SECTION */}
      <div className="mb-10 sm:mb-14 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-black text-[#0b2a4a] tracking-tight uppercase">
          Batch Management
        </h1>
        <p className="text-[#6fa6b2] text-[10px] font-black uppercase tracking-[0.3em] mt-2">
          The Indofrench IAS Control Center
        </p>
      </div>

      {/* STATS SUMMARY */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-black/[0.02] border border-[#0b2a4a]/5">
          <p className="text-[#6fa6b2] text-[10px] font-black uppercase tracking-widest mb-2">Total Active Batches</p>
          <h3 className="text-4xl font-black text-[#0b2a4a]">{courses.length}</h3>
        </div>
        <div className="bg-[#0b2a4a] p-8 rounded-[2rem] shadow-2xl shadow-[#0b2a4a]/20 text-[#f2f1d5]">
          <p className="opacity-60 text-[10px] font-black uppercase tracking-widest mb-2">System Status</p>
          <h3 className="text-xl font-bold uppercase tracking-tight">Encrypted & Online</h3>
        </div>
        <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-black/[0.02] border border-[#0b2a4a]/5">
          <p className="text-[#6fa6b2] text-[10px] font-black uppercase tracking-widest mb-2">Platform</p>
          <h3 className="text-xl font-bold text-[#0b2a4a] uppercase tracking-tight">Live Console</h3>
        </div>
      </div>

      {/* NOTIFICATION */}
      {message && (
        <div className={`mb-10 p-5 rounded-2xl text-center text-xs font-black uppercase tracking-widest animate-in slide-in-from-top-4 duration-500 ${isSuccess ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

        {/* CREATE COURSE FORM */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 bg-[#0b2a4a] rounded-xl flex items-center justify-center text-[#f2f1d5] font-black italic">B</div>
            <h2 className="text-2xl font-black tracking-tight text-[#0b2a4a] uppercase">Launch Batch</h2>
          </div>
          
          <form onSubmit={createcourse} className="bg-white rounded-[2.5rem] shadow-2xl shadow-black/[0.03] p-8 md:p-12 border border-[#0b2a4a]/5 space-y-6">
            <div>
              <label className="text-[10px] font-black uppercase text-[#6fa6b2] ml-2 mb-3 block tracking-widest">Official Title</label>
              <input
                className="w-full px-6 py-4 bg-[#f8f7eb]/50 border-2 border-transparent focus:border-[#1f4f5a] focus:bg-white rounded-2xl outline-none transition-all text-sm font-bold text-[#0b2a4a]"
                placeholder="e.g. UPSC GS FOUNDATION 2026"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-[10px] font-black uppercase text-[#6fa6b2] ml-2 mb-3 block tracking-widest">Pedagogy Description</label>
              <textarea
                className="w-full px-6 py-4 bg-[#f8f7eb]/50 border-2 border-transparent focus:border-[#1f4f5a] focus:bg-white rounded-2xl outline-none transition-all h-32 resize-none text-sm font-medium"
                placeholder="Detail the roadmap for this batch..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-[10px] font-black uppercase text-[#6fa6b2] ml-2 mb-3 block tracking-widest">Enrollment Fee (₹)</label>
              <input
                type="number"
                className="w-full px-6 py-4 bg-[#f8f7eb]/50 border-2 border-transparent focus:border-[#1f4f5a] focus:bg-white rounded-2xl outline-none transition-all font-black text-xl text-[#0b2a4a]"
                placeholder="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <button className="w-full bg-[#0b2a4a] text-[#f2f1d5] py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-[#1f4f5a] transition-all active:scale-95 shadow-xl shadow-[#0b2a4a]/10">
              Deploy Batch
            </button>
          </form>
        </section>

      {/* VIDEO MANAGEMENT SECTION - INTEGRATED DELETION */}
      <section className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-xl border border-[#0b2a4a]/5 mt-10">
        <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 bg-[#0b2a4a] rounded-xl flex items-center justify-center text-[#f2f1d5] font-black italic">M</div>
            <h2 className="text-2xl font-black text-[#0b2a4a] uppercase">Manage Batch Content</h2>
        </div>
        
        <div className="space-y-4">
          {courses.map((course) => (
            <div key={course._id} className="border-b border-[#0b2a4a]/5 pb-4">
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#0b2a4a]">{course.title}</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => fetchVideosForBatch(course._id)}
                    className="text-[10px] font-black uppercase tracking-widest bg-[#f2f1d5] px-4 py-2 rounded-xl text-[#0b2a4a] hover:bg-[#0b2a4a] hover:text-[#f2f1d5] transition-colors"
                  >
                    {viewingBatchId === course._id ? "Refreshing..." : "View Videos"}
                  </button>
                  <button 
                    onClick={async () => {
                      if(confirm("Delete this entire batch?")) {
                        await api.delete(`/course/delete/${course._id}`);
                        setCourses(courses.filter(c => c._id !== course._id));
                      }
                    }}
                    className="text-[10px] font-black uppercase tracking-widest bg-red-50 px-4 py-2 rounded-xl text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                  >
                    Delete Batch
                  </button>
                </div>
              </div>

              {/* VIDEO LIST WITH STANDARD DELETION ICON */}
              {viewingBatchId === course._id && (
                <div className="mt-4 pl-4 space-y-2 animate-in slide-in-from-top-2 border-l-2 border-[#f2f1d5]">
                  {selectedBatchVideos.length > 0 ? selectedBatchVideos.map((v) => (
                    <div key={v._id} className="flex justify-between items-center bg-[#f8f7eb] p-4 rounded-2xl border border-[#0b2a4a]/5 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">🎥</span>
                        <span className="text-xs font-bold text-[#0b2a4a] uppercase tracking-tight">{v.title}</span>
                      </div>
                      <button 
                        onClick={() => deleteVideo(v._id)}
                        className="w-9 h-9 flex items-center justify-center bg-white text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm active:scale-90"
                        title="Delete Video"
                      >
                        🗑️
                      </button>
                    </div>
                  )) : <p className="text-[10px] text-gray-400 italic font-bold uppercase tracking-widest p-2">No videos in this batch yet.</p>}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

        {/* ADD VIDEO FORM */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 bg-[#1f4f5a] rounded-xl flex items-center justify-center text-[#f2f1d5] font-black italic">V</div>
            <h2 className="text-2xl font-black tracking-tight text-[#0b2a4a] uppercase">Upload Content</h2>
          </div>

          <form onSubmit={addvideo} className="bg-white rounded-[2.5rem] shadow-2xl shadow-black/[0.03] p-8 md:p-12 border border-[#0b2a4a]/5 space-y-6">
            <div>
              <label className="text-[10px] font-black uppercase text-[#6fa6b2] ml-2 mb-3 block tracking-widest">Lesson Nomenclature</label>
              <input
                className="w-full px-6 py-4 bg-[#f8f7eb]/50 border-2 border-transparent focus:border-[#1f4f5a] focus:bg-white rounded-2xl outline-none transition-all text-sm font-bold text-[#0b2a4a]"
                placeholder="e.g. Session 01: Introduction to Polity"
                value={videotitle}
                onChange={(e) => setVideotitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase text-[#6fa6b2] ml-2 block tracking-widest">Resource Link / File</label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setVideofile(e.target.files[0])}
                className="w-full text-[10px] font-black uppercase text-[#0b2a4a] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:bg-[#f2f1d5] file:text-[#0b2a4a] hover:file:bg-[#0b2a4a] hover:file:text-white file:transition-all"
              />
              <input
                className="w-full px-6 py-4 bg-[#f8f7eb]/50 border-2 border-transparent focus:border-[#1f4f5a] focus:bg-white rounded-2xl outline-none transition-all text-sm font-medium"
                placeholder="Cloud URL (YouTube/Vimeo)"
                value={videourl}
                onChange={(e) => setVideourl(e.target.value)}
                disabled={!!videofile}
              />
            </div>

            <div>
              <label className="text-[10px] font-black uppercase text-[#6fa6b2] ml-2 mb-3 block tracking-widest">Assign to Curriculum</label>
              <select
                className="w-full px-6 py-4 bg-[#f8f7eb]/50 border-2 border-transparent focus:border-[#1f4f5a] focus:bg-white rounded-2xl outline-none transition-all font-bold appearance-none cursor-pointer text-sm text-[#0b2a4a]"
                value={courseid}
                onChange={(e) => setCourseid(e.target.value)}
                required
              >
                <option value="">Select Target Batch</option>
                {Array.isArray(courses) && courses.map((course) => (
                  <option key={course._id} value={course._id}>{course.title.toUpperCase()}</option>
                ))}
              </select>
            </div>

            <button className="w-full border-2 border-[#0b2a4a] text-[#0b2a4a] py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-[#0b2a4a] hover:text-[#f2f1d5] transition-all active:scale-95">
              Append to Batch
            </button>
          </form>
        </section>

        {/* MANAGE EXISTING BATCHES SECTION */}
        <section className="lg:col-span-2 mt-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 bg-red-900 rounded-xl flex items-center justify-center text-[#f2f1d5] font-black italic">D</div>
            <h2 className="text-2xl font-black tracking-tight text-[#0b2a4a] uppercase">Manage Existing Batches</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course) => (
              <div key={course._id} className="bg-white p-6 rounded-[2rem] shadow-xl border border-[#0b2a4a]/5 flex justify-between items-center group hover:border-red-200 transition-all">
                <div>
                  <h4 className="font-black text-[#0b2a4a] uppercase text-sm tracking-tight">{course.title}</h4>
                  <p className="text-[10px] text-[#6fa6b2] font-bold uppercase tracking-widest mt-1">₹{course.price} • Active</p>
                </div>
                <button 
                  onClick={async () => {
                    if(window.confirm("Bhai, kya aap sach mein ye batch delete karna chahte hain? Saare videos bhi gayab ho jayenge!")) {
                      try {
                        await api.delete(`/course/delete/${course._id}`);
                        setCourses(courses.filter(c => c._id !== course._id));
                        showAlert("Batch permanently removed.");
                      } catch (err) { showAlert("Deletion failed.", false); }
                    }
                  }}
                  className="w-10 h-10 bg-red-50 text-red-500 rounded-xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}