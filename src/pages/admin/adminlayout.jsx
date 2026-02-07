import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";

export default function AdminLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Batches", href: "/admin/batches", icon: "📚" },
    { name: "Chats", href: "/admin/chats", icon: "💬" },
    { name: "Messages", href: "/admin/contact", icon: "📩" }, 
    { name: "Inventory", href: "/admin/books", icon: "📖" },
  ];

  return (
    // mt-[70px] to sit below the navbar. 
    // h-[calc(100vh-70px)] ensures the sidebar and content fill the remaining height exactly.
    <div className="flex h-[calc(100vh-70px)] mt-[70px] bg-[#f8f7eb] overflow-hidden relative font-sans">
      
      {/* MOBILE TRIGGER - Floating Action Button for better ergonomics */}
      <button 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed bottom-6 right-6 z-[110] w-14 h-14 bg-[#0b2a4a] text-[#f2f1d5] rounded-2xl shadow-2xl flex items-center justify-center text-2xl border border-white/10 active:scale-95 transition-transform"
      >
        {isMobileMenuOpen ? "✕" : "☰"}
      </button>

      {/* SIDEBAR */}
      <aside className={`
        fixed inset-y-0 left-0 z-[100] w-72 bg-[#0b2a4a] text-[#f2f1d5] p-8 
        transform transition-transform duration-500 ease-in-out border-r border-white/5
        md:relative md:translate-x-0
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        {/* BRANDING SECTION */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
             <div className="w-8 h-8 rounded-lg bg-[#f2f1d5] text-[#0b2a4a] flex items-center justify-center font-black text-sm">I</div>
             <h2 className="text-lg font-black uppercase tracking-tighter text-[#f2f1d5]">
               Admin Panel
             </h2>
          </div>
          <p className="text-[9px] font-black text-[#6fa6b2] uppercase tracking-[0.3em] opacity-80">
            The Indofrench IAS
          </p>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="flex flex-col gap-3">
          {Array.isArray(navigation) && navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `group flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
                  isActive 
                  ? "bg-[#f2f1d5] text-[#0b2a4a] shadow-xl shadow-black/20 scale-[1.02]" 
                  : "text-[#6fa6b2] hover:bg-[#1f4f5a] hover:text-[#f2f1d5]"
                }`
              }
            >
              <span className="text-lg group-hover:scale-110 transition-transform">{item.icon}</span>
              <span className="text-[11px] font-black uppercase tracking-widest">
                {item.name}
              </span>
            </NavLink>
          ))}
        </nav>

        {/* FOOTER METADATA */}
        <div className="absolute bottom-8 left-8 border-l border-white/10 pl-4">
           <p className="text-[8px] font-bold text-[#6fa6b2] uppercase tracking-[0.2em] mb-1">Status</p>
           <p className="text-[10px] font-black text-[#f2f1d5] uppercase tracking-widest">
             System v2.4.0
           </p>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 relative overflow-y-auto custom-scrollbar bg-[#f8f7eb]">
        {/* Subtle Decorative Gradient Background */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#0b2a4a] opacity-[0.02] blur-[120px] pointer-events-none rounded-full" />
        
        <div className="p-4 sm:p-8 lg:p-12 max-w-7xl mx-auto relative z-10">
          <Outlet />
        </div>
      </main>

      {/* MOBILE OVERLAY */}
      {isMobileMenuOpen && (
        <div 
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-[#0b2a4a]/40 backdrop-blur-sm z-[90] md:hidden animate-in fade-in duration-300"
        />
      )}
    </div>
  );
}