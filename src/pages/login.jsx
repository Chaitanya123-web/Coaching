import { useState } from "react";
import api from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loginuser = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      window.location.href = "/";
    } catch (err) {
      setError("Invalid credentials. Please check your email and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f7eb] px-4 sm:px-6 relative overflow-hidden">
      
      {/* BACKGROUND DECORATION - Scaled down for mobile */}
      <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-[#0b2a4a] rounded-full blur-[80px] sm:blur-[120px] opacity-10 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-[#1f4f5a] rounded-full blur-[100px] sm:blur-[150px] opacity-10 translate-x-1/2 translate-y-1/2"></div>

      <div className="w-full max-w-[400px] sm:max-w-md relative z-10 py-8">
        
        {/* LOGO / BRANDING */}
        <div className="text-center mb-8 sm:mb-10">
          <div 
            onClick={() => (window.location.href = "/")}
            className="w-12 h-12 sm:w-14 sm:h-14 bg-[#0b2a4a] rounded-2xl text-[#f2f1d5] flex items-center justify-center font-black text-xl sm:text-2xl mx-auto mb-4 cursor-pointer shadow-xl shadow-black/10"
          >
            T
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0b2a4a] tracking-tighter">Welcome Back</h2>
          <p className="text-[#2f6f7e] text-xs sm:text-sm font-medium mt-1 uppercase tracking-wider opacity-80">Sign in to your academy account</p>
        </div>

        {/* LOGIN CARD */}
        <div className="bg-white p-6 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl shadow-black/5 border border-[#0b2a4a]/5">
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl sm:rounded-2xl text-red-600 text-[10px] sm:text-xs font-bold text-center animate-shake">
              {error}
            </div>
          )}

          <form onSubmit={loginuser} className="space-y-5 sm:space-y-6">
            <div>
              <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#6fa6b2] ml-2 mb-2 block">Email Address</label>
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
              <div className="flex justify-between items-center ml-2 mb-2">
                <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#6fa6b2]">Password</label>
                <a href="/forgotpassword" class="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#1f4f5a] hover:text-[#0b2a4a]">Forgot?</a>
              </div>
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
              className="w-full bg-[#0b2a4a] text-[#f2f1d5] py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black uppercase tracking-widest text-[10px] sm:text-xs hover:bg-[#1f4f5a] shadow-lg transition-all disabled:opacity-50 active:scale-95"
            >
              {loading ? "Authenticating..." : "Sign In"}
            </button>
          </form>

          {/* FOOTER LINKS */}
          <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-[#f8f7eb] text-center">
            <p className="text-xs sm:text-sm font-medium text-[#2f6f7e]">
              New here?{" "}
              <a
                href="/register"
                className="text-[#0b2a4a] font-black border-b-2 border-[#0b2a4a]/10 hover:border-[#0b2a4a] transition-all"
              >
                Register Now
              </a>
            </p>
          </div>
        </div>

        {/* SYSTEM STATUS */}
        <p className="text-center mt-8 text-[9px] sm:text-[10px] font-bold text-[#6fa6b2] uppercase tracking-[0.2em] opacity-40 px-4">
          Industry standard end-to-end encryption
        </p>
      </div>
    </div>
  );
}