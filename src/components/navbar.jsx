import { useEffect, useState } from "react";
import api from "../services/api";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Courses", href: "/course" },
  { name: "Contact", href: "/contact" },
  { name: "Shop", href: "/shop" },
];

export default function Navbar() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    if (storedToken) {
      api.get("/auth/me")
        .then((data) => {
          setUser(data);
          const saved = localStorage.getItem(`avatar_${data.email}`);
          if (saved) setAvatar(saved);
        })
        .catch(() => {
          localStorage.removeItem("token");
          setToken(null);
          setUser(null);
        });
    }

    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600&display=swap');

        .nb-wrap {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 100;
          padding: 0.5rem 1.25rem;
          transition: padding 0.3s;
        }

        .nb-wrap.scrolled { padding: 0.35rem 1.25rem; }

        .nb-nav {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(26,58,92,0.96);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 1rem;
          padding: 0.6rem 0.75rem 0.6rem 1rem;
          box-shadow: 0 8px 32px rgba(10,25,45,0.25);
          transition: box-shadow 0.3s;
          font-family: 'DM Sans', sans-serif;
          position: relative;
        }

        .nb-wrap.scrolled .nb-nav {
          box-shadow: 0 12px 48px rgba(10,25,45,0.35);
        }

        /* Logo */
        .nb-logo {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          cursor: pointer;
          text-decoration: none;
          flex-shrink: 0;
        }

        .nb-logo-icon {
          width: 36px;
          height: 36px;
          background: #c8a96e;
          border-radius: 0.65rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: 1rem;
          color: #1a3a5c;
          flex-shrink: 0;
          transition: transform 0.2s;
        }

        .nb-logo:hover .nb-logo-icon { transform: scale(1.06); }

        .nb-logo-text {
          font-family: 'Playfair Display', serif;
          font-size: 0.9rem;
          font-weight: 700;
          color: #f5f3ee;
          letter-spacing: -0.01em;
          white-space: nowrap;
        }

        @media (max-width: 480px) { .nb-logo-text { display: none; } }

        /* Desktop links */
        .nb-links {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        @media (max-width: 767px) { .nb-links { display: none; } }

        .nb-link {
          font-size: 0.78rem;
          font-weight: 500;
          color: rgba(245,243,238,0.55);
          text-decoration: none;
          padding: 0.45rem 0.75rem;
          border-radius: 0.6rem;
          transition: background 0.18s, color 0.18s;
          letter-spacing: 0.02em;
          white-space: nowrap;
        }

        .nb-link:hover { background: rgba(255,255,255,0.06); color: #f5f3ee; }

        .nb-link.active-link { color: #f5f3ee; background: rgba(255,255,255,0.06); }

        .nb-link.admin-link {
          color: #c8a96e;
          border: 1px solid rgba(200,169,110,0.25);
          background: rgba(200,169,110,0.07);
        }

        .nb-link.admin-link:hover { background: rgba(200,169,110,0.14); }

        /* Right actions */
        .nb-actions {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          flex-shrink: 0;
        }

        .nb-logout-btn {
          background: none;
          border: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem;
          font-weight: 600;
          color: rgba(239,68,68,0.7);
          cursor: pointer;
          letter-spacing: 0.06em;
          padding: 0.4rem 0.6rem;
          border-radius: 0.5rem;
          transition: color 0.18s, background 0.18s;
          display: none;
        }

        @media (min-width: 640px) { .nb-logout-btn { display: block; } }
        .nb-logout-btn:hover { color: #ef4444; background: rgba(239,68,68,0.08); }

        .nb-login-btn {
          background: #f5f3ee;
          color: #1a3a5c;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.55rem 1.2rem;
          border-radius: 100px;
          text-decoration: none;
          transition: background 0.18s, box-shadow 0.18s;
          white-space: nowrap;
        }

        .nb-login-btn:hover { background: #fff; box-shadow: 0 2px 12px rgba(245,243,238,0.2); }

        .nb-avatar-link { text-decoration: none; }

        .nb-avatar {
          width: 34px;
          height: 34px;
          border-radius: 0.6rem;
          overflow: hidden;
          border: 1.5px solid rgba(245,243,238,0.15);
          background: #2a5a7c;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          font-weight: 700;
          color: #f5f3ee;
          transition: border-color 0.18s;
        }

        .nb-avatar:hover { border-color: #c8a96e; }
        .nb-avatar img { width: 100%; height: 100%; object-fit: cover; }

        /* Mobile toggle */
        .nb-toggle {
          display: none;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 0.55rem;
          width: 34px;
          height: 34px;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #f5f3ee;
          transition: background 0.18s;
        }

        .nb-toggle:hover { background: rgba(255,255,255,0.1); }

        @media (max-width: 767px) { .nb-toggle { display: flex; } }

        /* Mobile menu */
        .nb-mobile {
          position: absolute;
          top: calc(100% + 0.6rem);
          left: 0;
          right: 0;
          background: rgba(26,58,92,0.98);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 1rem;
          padding: 1.25rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          box-shadow: 0 12px 40px rgba(10,25,45,0.3);
          animation: nbSlideIn 0.2s ease;
        }

        @keyframes nbSlideIn {
          from { opacity:0; transform:translateY(-8px); }
          to { opacity:1; transform:translateY(0); }
        }

        .nb-mobile-link {
          font-size: 0.88rem;
          font-weight: 500;
          color: rgba(245,243,238,0.7);
          text-decoration: none;
          padding: 0.7rem 0.85rem;
          border-radius: 0.65rem;
          transition: background 0.15s, color 0.15s;
          letter-spacing: 0.02em;
        }

        .nb-mobile-link:hover { background: rgba(255,255,255,0.06); color: #f5f3ee; }

        .nb-mobile-link.admin { color: #c8a96e; }

        .nb-mobile-divider {
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin: 0.4rem 0;
        }

        .nb-mobile-logout {
          background: none;
          border: none;
          text-align: left;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem;
          font-weight: 500;
          color: rgba(239,68,68,0.7);
          cursor: pointer;
          padding: 0.7rem 0.85rem;
          border-radius: 0.65rem;
          width: 100%;
          transition: background 0.15s, color 0.15s;
        }

        .nb-mobile-logout:hover { background: rgba(239,68,68,0.07); color: #ef4444; }
      `}</style>

      <div className={`nb-wrap${scrolled ? " scrolled" : ""}`}>
        <nav className="nb-nav">

          {/* LOGO */}
          <a href="/" className="nb-logo">
            <div className="nb-logo-icon">I</div>
            <span className="nb-logo-text">The Indofrench IAS</span>
          </a>

          {/* DESKTOP LINKS */}
          <div className="nb-links">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="nb-link">{link.name}</a>
            ))}
            {user?.role === "student" && (
              <a href="/chat" className="nb-link">Doubts</a>
            )}
            {user?.role === "admin" && (
              <a href="/admin/chats" className="nb-link admin-link">Admin</a>
            )}
          </div>

          {/* RIGHT ACTIONS */}
          <div className="nb-actions">
            {!token ? (
              <a href="/login" className="nb-login-btn">Login</a>
            ) : (
              <>
                <button className="nb-logout-btn" onClick={logout}>Logout</button>
                <a href="/profile" className="nb-avatar-link">
                  <div className="nb-avatar">
                    {avatar
                      ? <img src={avatar} alt="Profile" />
                      : user?.name?.[0]?.toUpperCase() ?? "?"}
                  </div>
                </a>
              </>
            )}
            <button className="nb-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
              {isOpen
                ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></svg>
              }
            </button>
          </div>

          {/* MOBILE MENU */}
          {isOpen && (
            <div className="nb-mobile">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="nb-mobile-link" onClick={() => setIsOpen(false)}>
                  {link.name}
                </a>
              ))}
              {user?.role === "student" && (
                <a href="/chat" className="nb-mobile-link" onClick={() => setIsOpen(false)}>Doubts</a>
              )}
              {user?.role === "admin" && (
                <a href="/admin/chats" className="nb-mobile-link admin" onClick={() => setIsOpen(false)}>Admin Panel</a>
              )}
              {token && (
                <>
                  <div className="nb-mobile-divider" />
                  <button className="nb-mobile-logout" onClick={logout}>Log out</button>
                </>
              )}
            </div>
          )}
        </nav>
      </div>
    </>
  );
}