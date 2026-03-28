export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = {
    LinkedIn: "https://linkedin.com/in/yourprofile",
    Instagram: "https://www.instagram.com/sanant____raikwar?igsh=cHlvZm9ldTF6d2Vp",
    YouTube: "https://www.youtube.com/@Theindofrenchias",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=DM+Sans:wght@400;500;600&display=swap');

        .ft-root {
          background: #1a3a5c;
          color: #f5f3ee;
          border-top: 1px solid rgba(255,255,255,0.05);
          font-family: 'DM Sans', sans-serif;
        }

        .ft-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 4rem 1.5rem 2.5rem;
        }

        /* ── MAIN GRID ── */
        .ft-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.8fr;
          gap: 3rem;
          margin-bottom: 3rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        @media (max-width: 900px) {
          .ft-grid { grid-template-columns: 1fr 1fr; gap: 2.5rem; }
        }

        @media (max-width: 580px) {
          .ft-grid { grid-template-columns: 1fr; gap: 2rem; }
        }

        /* Brand */
        .ft-brand { display: flex; flex-direction: column; gap: 1.25rem; }

        .ft-brand-row { display: flex; align-items: center; gap: 0.75rem; }

        .ft-brand-icon {
          width: 40px;
          height: 40px;
          background: #c8a96e;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: 1.1rem;
          color: #1a3a5c;
          flex-shrink: 0;
        }

        .ft-brand-name {
          font-family: 'Playfair Display', serif;
          font-size: 1rem;
          font-weight: 700;
          color: #f5f3ee;
          line-height: 1.15;
          letter-spacing: -0.01em;
        }

        .ft-brand-sub {
          font-size: 0.58rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #c8a96e;
          margin-top: 0.1rem;
        }

        .ft-brand-desc {
          font-size: 0.82rem;
          color: rgba(245,243,238,0.45);
          line-height: 1.75;
          max-width: 320px;
        }

        /* Nav columns */
        .ft-col-label {
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          margin-bottom: 1.25rem;
          display: block;
        }

        .ft-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .ft-links a {
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 500;
          color: rgba(245,243,238,0.55);
          transition: color 0.18s;
          letter-spacing: 0.02em;
        }

        .ft-links a:hover { color: #f5f3ee; }

        .ft-links a.special {
          color: #c8a96e;
          font-weight: 600;
        }

        .ft-links a.special:hover { color: #dbb97e; }

        /* Contact col */
        .ft-contact { display: flex; flex-direction: column; gap: 1.5rem; }

        .ft-contact-label {
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          margin-bottom: 0.35rem;
        }

        .ft-email {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: 0.88rem;
          color: #f5f3ee;
          text-decoration: none;
          border-bottom: 1px solid rgba(245,243,238,0.15);
          padding-bottom: 0.2rem;
          display: inline-block;
          transition: border-color 0.2s, color 0.2s;
        }

        .ft-email:hover { color: #c8a96e; border-color: #c8a96e; }

        .ft-socials {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .ft-social-btn {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(245,243,238,0.55);
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 0.45rem 0.9rem;
          border-radius: 0.55rem;
          text-decoration: none;
          transition: background 0.18s, color 0.18s, border-color 0.18s;
        }

        .ft-social-btn:hover {
          background: rgba(200,169,110,0.12);
          border-color: rgba(200,169,110,0.3);
          color: #c8a96e;
        }

        /* ── BOTTOM BAR ── */
        .ft-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .ft-copy {
          font-size: 0.72rem;
          color: rgba(245,243,238,0.25);
          line-height: 1.7;
        }

        .ft-copy strong { color: rgba(245,243,238,0.45); font-weight: 600; }

        .ft-legal {
          display: flex;
          gap: 1.5rem;
        }

        .ft-legal a {
          font-size: 0.7rem;
          font-weight: 500;
          color: rgba(245,243,238,0.3);
          text-decoration: none;
          letter-spacing: 0.06em;
          transition: color 0.18s;
        }

        .ft-legal a:hover { color: rgba(245,243,238,0.7); }
      `}</style>

      <footer className="ft-root">
        <div className="ft-inner">

          {/* GRID */}
          <div className="ft-grid">

            {/* Brand */}
            <div className="ft-brand">
              <div className="ft-brand-row">
                <div className="ft-brand-icon">I</div>
                <div>
                  <div className="ft-brand-name">The Indofrench IAS</div>
                  <div className="ft-brand-sub">Elite Civil Services Academy</div>
                </div>
              </div>
              <p className="ft-brand-desc">
                A premier strategic e-learning environment for serious aspirants mastering
                Civil Services through expert-led pedagogical modules.
              </p>
            </div>

            {/* Platform links */}
            <div>
              <span className="ft-col-label">Platform</span>
              <ul className="ft-links">
                {[["Home", "/"], ["Curriculum", "/course"], ["Dashboard", "/dashboard"], ["Doubt Box", "/chat"]].map(([name, href]) => (
                  <li key={name}><a href={href}>{name}</a></li>
                ))}
              </ul>
            </div>

            {/* Access links */}
            <div>
              <span className="ft-col-label">Access</span>
              <ul className="ft-links">
                <li><a href="/profile">My Profile</a></li>
                <li><a href="/login">Student Login</a></li>
                <li><a href="/shop">Book Shop</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="ft-contact">
              <div>
                <span className="ft-col-label">Contact</span>
                <p style={{ fontSize:"0.72rem", color:"rgba(245,243,238,0.3)", marginBottom:"0.4rem", fontWeight:500 }}>Academic Support</p>
                <a href="mailto:teachcoach123@gmail.com" className="ft-email">
                  teachcoach123@gmail.com
                </a>
              </div>
              <div>
                <p style={{ fontSize:"0.72rem", color:"rgba(245,243,238,0.3)", marginBottom:"0.65rem", fontWeight:500 }}>Follow Us</p>
                <div className="ft-socials">
                  {Object.entries(socialLinks).map(([name, url]) => (
                    <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="ft-social-btn">
                      {name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* BOTTOM */}
          <div className="ft-bottom">
            <div className="ft-copy">
              <strong>© {currentYear} The Indofrench IAS.</strong> All rights reserved.<br />
              Built for Excellence. Designed for Results.<br />
              <div style={{ opacity: 0.7, fontSize: "0.8rem", marginTop: "8px" }}>
                Designed & Developed by Chaitanya Bishnoi (+91-9118643901)
                <div style={{ marginTop: "4px", display: "flex", alignItems: "center", gap: "5px" }}>
                  <span>LinkedIn:</span>
                  <a 
                    href="https://linkedin.com/in/chaitanya-bishnoi" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{ color: "#c8a96e", textDecoration: "none", fontWeight: "600" }}
                  >
                    linkedin.com/in/chaitanya-bishnoi
                  </a>
                </div>
              </div>
            </div>
            <div className="ft-legal">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Security</a>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}