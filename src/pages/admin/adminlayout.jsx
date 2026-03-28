import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";

const navigation = [
  {
    name: "Batches",
    href: "/admin/batches",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
      </svg>
    ),
  },
  {
    name: "Orders",
    href: "/admin/orders",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle>
      </svg>
    ),
  },
  {
    name: "Chats",
    href: "/admin/chats",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
  {
    name: "Messages",
    href: "/admin/contact",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
  {
    name: "Inventory",
    href: "/admin/books",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
      </svg>
    ),
  },
];

export default function AdminLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');

        .al-root {
          display: flex;
          height: calc(100vh - 64px);
          margin-top: 64px;
          background: #f5f3ee;
          overflow: hidden;
          position: relative;
          font-family: 'DM Sans', sans-serif;
        }

        /* ── SIDEBAR ── */
        .al-sidebar {
          width: 260px;
          flex-shrink: 0;
          background: #1a3a5c;
          display: flex;
          flex-direction: column;
          padding: 2rem 1.25rem;
          border-right: 1px solid rgba(255,255,255,0.06);
          position: relative;
          z-index: 10;
          /* subtle noise texture via box-shadow layering */
          box-shadow: inset -1px 0 0 rgba(255,255,255,0.04);
          transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
        }

        @media (max-width: 767px) {
          .al-sidebar {
            position: fixed;
            inset-y: 0;
            left: 0;
            height: 100%;
            z-index: 100;
            transform: translateX(-100%);
          }
          .al-sidebar.open {
            transform: translateX(0);
          }
        }

        /* Brand */
        .al-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0 0.5rem;
          margin-bottom: 2.5rem;
        }

        .al-brand-icon {
          width: 36px;
          height: 36px;
          background: #c8a96e;
          border-radius: 0.65rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          font-size: 1rem;
          color: #1a3a5c;
        }

        .al-brand-text {}
        .al-brand-title {
          font-family: 'Playfair Display', serif;
          font-size: 0.95rem;
          font-weight: 700;
          color: #f5f3ee;
          line-height: 1.1;
          letter-spacing: -0.01em;
        }
        .al-brand-sub {
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #c8a96e;
          margin-top: 0.1rem;
        }

        /* Section label */
        .al-nav-label {
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          padding: 0 0.75rem;
          margin-bottom: 0.5rem;
        }

        /* Nav links */
        .al-nav {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          flex: 1;
        }

        .al-navlink {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          text-decoration: none;
          color: rgba(255,255,255,0.45);
          font-size: 0.82rem;
          font-weight: 500;
          letter-spacing: 0.02em;
          transition: background 0.18s, color 0.18s;
          position: relative;
        }

        .al-navlink:hover {
          background: rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.85);
        }

        .al-navlink.active {
          background: rgba(200,169,110,0.15);
          color: #c8a96e;
          font-weight: 600;
        }

        .al-navlink.active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 20%;
          height: 60%;
          width: 3px;
          background: #c8a96e;
          border-radius: 0 2px 2px 0;
        }

        .al-navlink-icon {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 0.5rem;
          background: rgba(255,255,255,0.05);
          flex-shrink: 0;
          transition: background 0.18s;
        }

        .al-navlink.active .al-navlink-icon {
          background: rgba(200,169,110,0.18);
        }

        /* Sidebar footer */
        .al-sidebar-footer {
          padding: 1.25rem 0.75rem 0;
          border-top: 1px solid rgba(255,255,255,0.06);
          margin-top: auto;
        }

        .al-status-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .al-status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #4caf86;
          box-shadow: 0 0 0 2px rgba(76,175,134,0.2);
          flex-shrink: 0;
        }

        .al-status-text {
          font-size: 0.72rem;
          font-weight: 500;
          color: rgba(255,255,255,0.4);
        }

        .al-version {
          font-size: 0.6rem;
          color: rgba(255,255,255,0.2);
          margin-top: 0.25rem;
          letter-spacing: 0.1em;
        }

        /* ── MAIN ── */
        .al-main {
          flex: 1;
          overflow-y: auto;
          position: relative;
          scroll-behavior: smooth;
        }

        .al-main::-webkit-scrollbar { width: 5px; }
        .al-main::-webkit-scrollbar-track { background: transparent; }
        .al-main::-webkit-scrollbar-thumb { background: rgba(26,58,92,0.15); border-radius: 10px; }

        .al-content {
          padding: 2.5rem 2rem;
          max-width: 1100px;
          margin: 0 auto;
        }

        @media (max-width: 640px) {
          .al-content { padding: 1.5rem 1rem; }
        }

        /* ── MOBILE FAB ── */
        .al-fab {
          display: none;
          position: fixed;
          bottom: 1.5rem;
          right: 1.5rem;
          z-index: 110;
          width: 50px;
          height: 50px;
          background: #1a3a5c;
          color: #f5f3ee;
          border: none;
          border-radius: 1rem;
          cursor: pointer;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 24px rgba(26,58,92,0.35);
          transition: transform 0.15s, background 0.15s;
        }

        .al-fab:active { transform: scale(0.95); }

        @media (max-width: 767px) {
          .al-fab { display: flex; }
        }

        /* ── OVERLAY ── */
        .al-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(10,25,45,0.5);
          backdrop-filter: blur(3px);
          z-index: 90;
        }

        @media (max-width: 767px) {
          .al-overlay.open { display: block; }
        }
      `}</style>

      <div className="al-root">

        {/* SIDEBAR */}
        <aside className={`al-sidebar${isMobileMenuOpen ? " open" : ""}`}>

          {/* Brand */}
          <div className="al-brand">
            <div className="al-brand-icon">I</div>
            <div className="al-brand-text">
              <div className="al-brand-title">Admin Panel</div>
              <div className="al-brand-sub">Indofrench IAS</div>
            </div>
          </div>

          {/* Nav */}
          <p className="al-nav-label">Navigation</p>
          <nav className="al-nav">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) => `al-navlink${isActive ? " active" : ""}`}
              >
                <span className="al-navlink-icon">{item.icon}</span>
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Footer */}
          <div className="al-sidebar-footer">
            <div className="al-status-row">
              <span className="al-status-dot" />
              <span className="al-status-text">All systems operational</span>
            </div>
            <div className="al-version">v2.4.0 · The Indofrench IAS</div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="al-main">
          <div className="al-content">
            <Outlet />
          </div>
        </main>

        {/* MOBILE FAB */}
        <button className="al-fab" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
          {isMobileMenuOpen
            ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          }
        </button>

        {/* OVERLAY */}
        <div className={`al-overlay${isMobileMenuOpen ? " open" : ""}`} onClick={() => setIsMobileMenuOpen(false)} />
      </div>
    </>
  );
}