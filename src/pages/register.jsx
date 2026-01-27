import { useState } from "react";
import api from "../services/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const registeruser = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await api.post("/auth/register", { name, email, password });
      setSuccess("Account created successfully! You can now login.");
      setName(""); setEmail(""); setPassword("");
    } catch (err) {
      setError("Registration failed. Email might already be in use.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f7eb] px-4 sm:px-6 relative overflow-hidden">
      
      {/* BACKGROUND DECORATION - Responsive scaling */}
      <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-[#0b2a4a] rounded-full blur-[80px] sm:blur-[120px] opacity-10 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-[#1f4f5a] rounded-full blur-[100px] sm:blur-[150px] opacity-10 -translate-x-1/2 translate-y-1/2"></div>

      <div className="w-full max-w-[400px] sm:max-w-md relative z-10 py-6 sm:py-8">
        
        {/* LOGO / BRANDING */}
        <div className="text-center mb-6 sm:mb-8">
          <div 
            onClick={() => (window.location.href = "/")}
            className="w-12 h-12 sm:w-14 sm:h-14 bg-[#0b2a4a] rounded-2xl text-[#f2f1d5] flex items-center justify-center font-black text-xl sm:text-2xl mx-auto mb-4 cursor-pointer shadow-xl shadow-black/10 transition-transform active:scale-90"
          >
            T
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0b2a4a] tracking-tighter">Join the Academy</h2>
          <p className="text-[#2f6f7e] text-xs sm:text-sm font-medium mt-1">Start your journey toward mastery today.</p>
        </div>

        {/* REGISTER CARD */}
        <div className="bg-white p-6 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl shadow-black/5 border border-[#0b2a4a]/5">
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl sm:rounded-2xl text-red-600 text-[10px] sm:text-xs font-bold text-center animate-shake">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-xl sm:rounded-2xl text-green-700 text-[10px] sm:text-xs font-bold text-center">
              {success}
            </div>
          )}

          <form onSubmit={registeruser} className="space-y-4 sm:space-y-5">
            <div>
              <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#6fa6b2] ml-2 mb-1.5 sm:mb-2 block">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-[#f8f7eb]/50 border-2 border-transparent px-4 sm:px-5 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl focus:outline-none focus:border-[#1f4f5a] focus:bg-white transition-all text-[#0b2a4a] text-sm sm:text-base font-medium"
              />
            </div>

            <div>
              <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#6fa6b2] ml-2 mb-1.5 sm:mb-2 block">Email Address</label>
              <input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#f8f7eb]/50 border-2 border-transparent px-4 sm:px-5 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl focus:outline-none focus:border-[#1f4f5a] focus:bg-white transition-all text-[#0b2a4a] text-sm sm:text-base font-medium"
              />
            </div>

            <div>
              <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#6fa6b2] ml-2 mb-1.5 sm:mb-2 block">Create Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#f8f7eb]/50 border-2 border-transparent px-4 sm:px-5 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl focus:outline-none focus:border-[#1f4f5a] focus:bg-white transition-all text-[#0b2a4a] text-sm sm:text-base font-medium"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0b2a4a] text-[#f2f1d5] py-4 sm:py-5 mt-2 rounded-xl sm:rounded-2xl font-black uppercase tracking-widest text-[10px] sm:text-xs hover:bg-[#1f4f5a] hover:shadow-xl transition-all disabled:opacity-50 active:scale-95"
            >
              {loading ? "Creating Account..." : "Create My Account"}
            </button>
          </form>

          {/* FOOTER LINKS */}
          <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-[#f8f7eb] text-center">
            <p className="text-xs sm:text-sm font-medium text-[#2f6f7e]">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-[#0b2a4a] font-black border-b-2 border-[#0b2a4a]/10 hover:border-[#0b2a4a] transition-all"
              >
                Sign In
              </a>
            </p>
          </div>
        </div>

        {/* LEGAL HINT */}
        <p className="text-center mt-6 sm:mt-8 text-[9px] sm:text-[10px] font-bold text-[#6fa6b2] uppercase tracking-[0.1em] max-w-[280px] mx-auto leading-relaxed opacity-60 px-4">
          By registering, you agree to our <span className="text-[#0b2a4a] cursor-pointer">Terms</span> and <span className="text-[#0b2a4a] cursor-pointer">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
}