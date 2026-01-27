import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";

export default function AdminLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Batches", href: "/admin/batches", icon: "📚" },
    { name: "Chats", href: "/admin/chats", icon: "💬" },
  ];

  return (
    // mt-[80px] to sit below the navbar. 
    // h-[calc(100vh-80px)] ensures the sidebar and content fill the remaining height exactly.
    <div className="flex h-[calc(100vh-80px)] mt-[80px] bg-[#f8f7eb] overflow-hidden relative">
      
      {/* MOBILE TRIGGER */}
      <button 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed bottom-6 right-6 z-[110] w-14 h-14 bg-[#0b2a4a] text-white rounded-full shadow-2xl flex items-center justify-center text-2xl border border-white/10"
      >
        {isMobileMenuOpen ? "✕" : "☰"}
      </button>

      {/* SIDEBAR */}
      <aside className={`
        fixed inset-y-0 left-0 z-[100] w-72 bg-[#0b2a4a] text-[#f2f1d5] p-8 
        transform transition-transform duration-300 ease-in-out border-r border-white/5
        md:relative md:translate-x-0
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="mb-12">
          <h2 className="text-xl font-black uppercase tracking-tighter text-[#f2f1d5]">
            Admin Panel
          </h2>
          <p className="text-[10px] font-bold text-[#6fa6b2] uppercase tracking-[0.2em] mt-1">
            Academy Management
          </p>
        </div>

        <nav className="flex flex-col gap-3">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `group flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
                  isActive 
                  ? "bg-[#f2f1d5] text-[#0b2a4a] shadow-xl shadow-black/20" 
                  : "text-[#6fa6b2] hover:bg-[#1f4f5a] hover:text-[#f2f1d5]"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-[11px] font-black uppercase tracking-widest">
                {item.name}
              </span>
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-8 left-8">
           <p className="text-[9px] font-bold text-[#6fa6b2]/40 uppercase tracking-widest">
             System v2.4.0
           </p>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 relative overflow-y-auto custom-scrollbar">
        <div className="p-4 sm:p-8 lg:p-12 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* MOBILE OVERLAY */}
      {isMobileMenuOpen && (
        <div 
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90] md:hidden"
        />
      )}
    </div>
  );
}