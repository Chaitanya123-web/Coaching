import { useEffect, useState } from "react";
import api from "../services/api";

export default function Navbar() {
  // Move localStorage into state/useEffect to prevent Vercel build crashes
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Initializing token on mount ensures window/localStorage is defined
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

    if (storedToken) {
      api
        .get("/auth/me")
        .then((data) => {
          setUser(data);
          const saved = localStorage.getItem(`avatar_${data.email}`);
          if (saved) setAvatar(saved);
        })
        .catch(() => {
          // If token is invalid, clear it to prevent infinite loop
          localStorage.removeItem("token");
          setToken(null);
          setUser(null);
        });
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Courses", href: "/course" },
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-[100] px-4 sm:px-6 pt-4 sm:pt-6">
      <nav className="mx-auto flex items-center justify-between w-full max-w-6xl px-5 sm:px-8 py-3 rounded-2xl bg-[#0b2a4a]/95 backdrop-blur-md border border-white/10 shadow-2xl relative">

        {/* LOGO */}
        <div
          onClick={() => (window.location.href = "/")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#f2f1d5] text-[#0b2a4a] flex items-center justify-center font-black group-hover:scale-105 transition-transform shrink-0">
            I
          </div>
          <span className="hidden xs:block text-[#f2f1d5] font-black text-sm sm:text-base uppercase">
            The Indofrench IAS
          </span>
        </div>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-8 text-[10px] uppercase tracking-[0.2em] font-bold text-[#f2f1d5]/70">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-[#6fa6b2] transition-colors"
            >
              {link.name}
            </a>
          ))}

          {user?.role === "student" && (
            <a href="/chat" className="hover:text-[#6fa6b2]">
              Doubts
            </a>
          )}

          {user?.role === "admin" && (
            <a
              href="/admin/chats"
              className="text-[#6fa6b2] border border-[#6fa6b2]/30 px-2 py-1 rounded-md"
            >
              Admin
            </a>
          )}
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-4">
          {!token ? (
            <a
              href="/login"
              className="bg-[#f2f1d5] px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest text-[#0b2a4a]"
            >
              Login
            </a>
          ) : (
            <div className="flex items-center gap-4">
              <button
                onClick={logout}
                className="hidden sm:block text-xs uppercase tracking-widest text-red-400 font-bold"
              >
                Logout
              </button>

              <a href="/profile">
                <div className="w-9 h-9 rounded-xl overflow-hidden border-2 border-[#f2f1d5]/20">
                  {avatar ? (
                    <img
                      src={avatar}
                      className="w-full h-full object-cover"
                      alt="Profile"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#1f4f5a] flex items-center justify-center text-[#f2f1d5] font-bold">
                      {user?.name?.[0]?.toUpperCase()}
                    </div>
                  )}
                </div>
              </a>
            </div>
          )}

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#f2f1d5] text-2xl focus:outline-none"
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="absolute top-[calc(100%+12px)] left-0 w-full bg-[#0b2a4a] border border-white/10 rounded-2xl p-6 flex flex-col gap-4 md:hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs uppercase font-black tracking-widest text-[#f2f1d5]"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}

            {user?.role === "student" && (
              <a
                href="/chat"
                className="text-xs uppercase font-black tracking-widest text-[#f2f1d5]"
                onClick={() => setIsOpen(false)}
              >
                Doubts
              </a>
            )}

            {user?.role === "admin" && (
              <a
                href="/admin/chats"
                className="text-xs uppercase font-black tracking-widest text-[#6fa6b2]"
                onClick={() => setIsOpen(false)}
              >
                Admin Panel
              </a>
            )}

            {token && (
              <button
                onClick={logout}
                className="text-left text-xs uppercase font-black tracking-widest text-red-400 mt-2"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </nav>
    </div>
  );
}