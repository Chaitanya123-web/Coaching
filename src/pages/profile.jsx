import { useEffect, useState } from "react";
import api from "../services/api";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await api.get("/auth/me");
        setUser(data);
        
        // Load saved avatar from local storage if exists
        const savedAvatar = localStorage.getItem(`avatar_${data.email}`);
        if (savedAvatar) setAvatar(savedAvatar);
      } catch (err) {
        setError("Failed to load profile. Please sign in again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setAvatar(base64String);
        localStorage.setItem(`avatar_${user.email}`, base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f7eb]">
        <div className="w-10 h-10 border-4 border-[#1f4f5a] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-[#1f4f5a] font-medium tracking-tight">Securing your data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f7eb] text-red-600 font-semibold px-6 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f7eb] py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-black text-[#0b2a4a] tracking-tight">Account Settings</h1>
          <p className="text-[#2f6f7e] text-xs sm:text-sm font-medium">Manage your personal information and profile picture.</p>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          
          {/* LEFT COLUMN: AVATAR CARD */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] shadow-xl shadow-black/5 p-6 sm:p-8 text-center border border-[#0b2a4a]/5">
              <div className="relative inline-block mb-4 sm:mb-6">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-[1.5rem] sm:rounded-3xl bg-gradient-to-br from-[#1f4f5a] to-[#0b2a4a] text-[#f2f1d5] flex items-center justify-center overflow-hidden shadow-lg border-4 border-white">
                  {avatar ? (
                    <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                <span className="text-3xl sm:text-4xl font-bold">
                  {user?.name ? user.name.charAt(0).toUpperCase() : "I"}
                </span>
                  )}
                </div>
                
                <input 
                  type="file" 
                  id="avatarInput" 
                  hidden 
                  accept="image/*" 
                  onChange={handleAvatarChange} 
                />
                
                <label 
                  htmlFor="avatarInput"
                  className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-8 h-8 sm:w-10 sm:h-10 bg-[#0b2a4a] border-4 border-white rounded-xl sm:rounded-2xl shadow-md flex items-center justify-center cursor-pointer hover:bg-[#1f4f5a] transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </label>
              </div>
              
              <h2 className="text-lg sm:text-xl font-bold text-[#0b2a4a] leading-tight mb-1">{user.name}</h2>
              <p className="text-[#6fa6b2] text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em]">{user.role}</p>
            </div>
          </div>

          {/* RIGHT COLUMN: DETAILS SECTION */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            
            <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] shadow-xl shadow-black/5 p-6 sm:p-10 border border-[#0b2a4a]/5">
              <div className="flex flex-col sm:flex-row items-center justify-between mb-8 sm:mb-10 gap-3 sm:gap-0">
                <h3 className="text-base sm:text-lg font-bold text-[#0b2a4a]">Personal Information</h3>
                <span className="text-[8px] sm:text-[10px] font-black uppercase text-[#1f4f5a] bg-[#f2f1d5] px-3 sm:px-4 py-1 sm:py-1.5 rounded-full tracking-wider">Identity Verified</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 sm:gap-y-10 gap-x-8 sm:gap-x-12">
                <div>
                  <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#6fa6b2] mb-1 sm:mb-2 text-center sm:text-left">Display Name</p>
                  <p className="text-sm sm:text-md font-bold text-[#0b2a4a] border-b border-[#f8f7eb] pb-2 text-center sm:text-left">{user.name}</p>
                </div>

                <div>
                  <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#6fa6b2] mb-1 sm:mb-2 text-center sm:text-left">Email Address</p>
                  <p className="text-sm sm:text-md font-bold text-[#0b2a4a] border-b border-[#f8f7eb] pb-2 text-center sm:text-left">{user.email}</p>
                </div>

                <div>
                  <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#6fa6b2] mb-1 sm:mb-2 text-center sm:text-left">Account Level</p>
                  <p className="text-sm sm:text-md font-bold text-[#0b2a4a] border-b border-[#f8f7eb] pb-2 capitalize text-center sm:text-left">{user.role}</p>
                </div>

                <div>
                  <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#6fa6b2] mb-1 sm:mb-2 text-center sm:text-left">Joining Date</p>
                  <p className="text-sm sm:text-md font-bold text-[#0b2a4a] border-b border-[#f8f7eb] pb-2 text-center sm:text-left">
                    {new Date(user.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>

            {/* ACTION SECTION */}
            <div className="flex flex-col sm:flex-row items-center justify-between px-2 sm:px-4 gap-4 sm:gap-0">
              <button 
                onClick={() => { localStorage.removeItem("token"); window.location.href = "/login"; }}
                className="group flex items-center gap-2 text-red-500 font-bold text-xs sm:text-sm hover:text-red-700 transition-colors"
              >
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </span>
                Terminate Session
              </button>
              
              <p className="text-[8px] sm:text-[10px] text-[#6fa6b2] font-medium italic opacity-70">Privacy Protected Platform</p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}