export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0b2a4a] text-[#f2f1d5] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-10 sm:py-12">
        
        {/* MAIN FOOTER CONTENT */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10 md:gap-8">
          
          {/* BRAND COLUMN */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#f2f1d5] text-[#0b2a4a] flex items-center justify-center font-black text-lg shrink-0">
                I
              </div>
              <span className="text-xl font-black tracking-tighter uppercase">
                The Indofrench IAS
              </span>
            </div>
            <p className="text-sm text-[#6fa6b2] leading-relaxed max-w-xs">
              A premium space for dedicated students to master complex concepts through structured, expert-led video batches.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div className="md:col-span-2">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6fa6b2] mb-4 sm:mb-5">Platform</h3>
            <ul className="space-y-3 text-[13px] font-semibold">
              <li><a href="/" className="hover:text-[#6fa6b2] transition-colors">Home</a></li>
              <li><a href="/course" className="hover:text-[#6fa6b2] transition-colors">All Courses</a></li>
              <li><a href="/dashboard" className="hover:text-[#6fa6b2] transition-colors">Dashboard</a></li>
              <li><a href="/chat" className="hover:text-[#6fa6b2] transition-colors">Doubt Support</a></li>
            </ul>
          </div>

          {/* ACCOUNT & ADMIN */}
          <div className="md:col-span-2">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6fa6b2] mb-4 sm:mb-5">Account</h3>
            <ul className="space-y-3 text-[13px] font-semibold">
              <li><a href="/profile" className="hover:text-[#6fa6b2] transition-colors">My Profile</a></li>
              <li><a href="/login" className="hover:text-[#6fa6b2] transition-colors">Sign In</a></li>
              <li><a href="/admin" className="text-[#6fa6b2] hover:text-white transition-colors">Instructor Portal</a></li>
            </ul>
          </div>

          {/* CONTACT INFO */}
          <div className="md:col-span-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6fa6b2] mb-4 sm:mb-5">Connect</h3>
            <div className="space-y-5">
              <div>
                <p className="text-[11px] text-[#6fa6b2] uppercase font-bold tracking-widest mb-1">Direct Support</p>
                <a href="mailto:support@teaching.com" className="text-sm font-bold border-b border-[#6fa6b2]/30 pb-0.5 hover:border-[#f2f1d5] transition-all inline-block">
                  support@teaching.com
                </a>
              </div>
              <div className="flex flex-wrap gap-2">
                {["LinkedIn", "Instagram", "YouTube"].map((social) => (
                  <a
                    key={social}
                    href={`#${social.toLowerCase()}`}
                    className="text-[10px] font-black uppercase tracking-tighter bg-white/5 hover:bg-[#1f4f5a] px-3 py-1.5 rounded-md transition-all border border-white/5"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="mt-10 sm:mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] sm:text-[10px] font-bold text-[#6fa6b2] uppercase tracking-[0.1em] text-center md:text-left">
            © {currentYear} THE INDOFRENCH IAS. BUILT FOR EXCELLENCE.
          </p>
          
          <div className="flex gap-6 text-[9px] sm:text-[10px] font-bold text-[#6fa6b2] uppercase tracking-[0.1em]">
            <a href="#" className="hover:text-[#f2f1d5]">Privacy Policy</a>
            <a href="#" className="hover:text-[#f2f1d5]">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}