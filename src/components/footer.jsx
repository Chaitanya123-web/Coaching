export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0b2a4a] text-[#f2f1d5] border-t border-white/5 font-sans">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        
        {/* MAIN FOOTER CONTENT */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-12 md:gap-8">
          
          {/* BRAND COLUMN */}
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#f2f1d5] text-[#0b2a4a] flex items-center justify-center font-black text-xl shrink-0 shadow-lg">
                I
              </div>
              <div>
                <span className="text-xl md:text-2xl font-black tracking-tighter uppercase block leading-none">
                  The Indofrench IAS
                </span>
                <span className="text-[9px] font-bold text-[#6fa6b2] uppercase tracking-[0.3em]">
                  Elite Civil Services Academy
                </span>
              </div>
            </div>
            <p className="text-sm text-[#6fa6b2] leading-relaxed max-w-sm font-medium opacity-90">
              A premier strategic e-learning environment for serious aspirants mastering the complexities of Civil Services through expert-led pedagogical modules.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div className="md:col-span-2">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#6fa6b2] mb-6 md:mb-8">Platform</h3>
            <ul className="space-y-4 text-[13px] font-bold uppercase tracking-wide">
              <li><a href="/" className="hover:text-[#6fa6b2] transition-colors">Home</a></li>
              <li><a href="/course" className="hover:text-[#6fa6b2] transition-colors">Curriculum</a></li>
              <li><a href="/dashboard" className="hover:text-[#6fa6b2] transition-colors">Dashboard</a></li>
              <li><a href="/chat" className="hover:text-[#6fa6b2] transition-colors">Doubt Box</a></li>
            </ul>
          </div>

          {/* ACCOUNT & ADMIN */}
          <div className="md:col-span-2">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#6fa6b2] mb-6 md:mb-8">Access</h3>
            <ul className="space-y-4 text-[13px] font-bold uppercase tracking-wide">
              <li><a href="/profile" className="hover:text-[#6fa6b2] transition-colors">My Profile</a></li>
              <li><a href="/login" className="hover:text-[#6fa6b2] transition-colors">Student Login</a></li>
              <li><a href="/admin" className="text-[#6fa6b2] hover:text-white transition-colors border-b border-white/10 pb-1">Faculty Portal</a></li>
            </ul>
          </div>

          {/* CONTACT INFO */}
          <div className="md:col-span-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#6fa6b2] mb-6 md:mb-8">Inquiries</h3>
            <div className="space-y-8">
              <div>
                <p className="text-[10px] text-[#6fa6b2] uppercase font-black tracking-widest mb-2">Academic Support</p>
                <a href="mailto:support@indofrenchias.com" className="text-base font-black border-b-2 border-[#6fa6b2]/20 pb-1 hover:border-[#f2f1d5] transition-all inline-block italic">
                  support@indofrenchias.com
                </a>
              </div>
              <div className="flex flex-wrap gap-3">
                {["LinkedIn", "Instagram", "YouTube"].map((social) => (
                  <a
                    key={social}
                    href={`#${social.toLowerCase()}`}
                    className="text-[10px] font-black uppercase tracking-widest bg-white/5 hover:bg-[#1f4f5a] px-4 py-2 rounded-xl transition-all border border-white/5"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="mt-16 md:mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
             <p className="text-[10px] font-black text-[#6fa6b2] uppercase tracking-[0.2em]">
               © {currentYear} THE INDOFRENCH IAS.
             </p>
             <p className="text-[8px] font-bold text-[#6fa6b2]/40 uppercase tracking-[0.1em]">
               Built for Excellence. Designed for Results.
             </p>
          </div>
          
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.2em]">
            <a href="#" className="text-[#6fa6b2] hover:text-[#f2f1d5] transition-colors">Privacy</a>
            <a href="#" className="text-[#6fa6b2] hover:text-[#f2f1d5] transition-colors">Terms</a>
            <a href="#" className="text-[#6fa6b2] hover:text-[#f2f1d5] transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}