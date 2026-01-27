import { useState } from "react";
import api from "../services/api";

export default function Forgotpassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      await api.post("/auth/forgotpassword", { email });
      setMessage("A password reset link has been dispatched to your email.");
      setEmail("");
    } catch (err) {
      setError("We couldn't find an account with that email address.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f7eb] px-4 sm:px-6 relative overflow-hidden">
      
      {/* BACKGROUND DECORATION - Responsive scaling */}
      <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-[#0b2a4a] rounded-full blur-[80px] sm:blur-[120px] opacity-10 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-[#1f4f5a] rounded-full blur-[100px] sm:blur-[150px] opacity-10 translate-x-1/2 translate-y-1/2"></div>

      <div className="w-full max-w-[400px] sm:max-w-md relative z-10 py-6 sm:py-8">
        
        {/* BRANDING */}
        <div className="text-center mb-8 sm:mb-10">
          <div 
            onClick={() => (window.location.href = "/login")}
            className="w-12 h-12 sm:w-14 sm:h-14 bg-[#0b2a4a] rounded-2xl text-[#f2f1d5] flex items-center justify-center font-black text-xl sm:text-2xl mx-auto mb-4 cursor-pointer shadow-xl shadow-black/10 transition-transform active:scale-90"
          >
            T
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0b2a4a] tracking-tighter">Reset Password</h2>
          <p className="text-[#2f6f7e] text-xs sm:text-sm font-medium mt-1 px-4 leading-relaxed opacity-80 uppercase tracking-wider">
            Instructions will be sent to your email
          </p>
        </div>

        {/* FORGOT PASSWORD CARD */}
        <div className="bg-white p-6 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl shadow-black/5 border border-[#0b2a4a]/5">
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl sm:rounded-2xl text-red-600 text-[10px] sm:text-xs font-bold text-center">
              {error}
            </div>
          )}

          {message && (
            <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-xl sm:rounded-2xl text-green-700 text-[10px] sm:text-xs font-bold text-center">
              {message}
            </div>
          )}

          <form onSubmit={handlesubmit} className="space-y-5 sm:space-y-6">
            <div>
              <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#6fa6b2] ml-2 mb-2 block">Registered Email</label>
              <input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#f8f7eb]/50 border-2 border-transparent px-4 sm:px-5 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl focus:outline-none focus:border-[#1f4f5a] focus:bg-white transition-all text-[#0b2a4a] text-sm sm:text-base font-medium"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0b2a4a] text-[#f2f1d5] py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black uppercase tracking-widest text-[10px] sm:text-xs hover:bg-[#1f4f5a] shadow-lg transition-all disabled:opacity-50 active:scale-95"
            >
              {loading ? "Sending..." : "Send Instructions"}
            </button>
          </form>

          {/* RETURN TO LOGIN */}
          <div className="mt-8 text-center">
            <a 
              href="/login" 
              className="group inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-[#0b2a4a] hover:text-[#1f4f5a] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Sign In
            </a>
          </div>
        </div>

        {/* HELP TEXT */}
        <p className="text-center mt-8 text-[9px] sm:text-[10px] font-bold text-[#6fa6b2] uppercase tracking-[0.1em] opacity-40 px-4 leading-relaxed">
          Check your spam folder if you don't see the email within a few minutes.
        </p>
      </div>
    </div>
  );
}