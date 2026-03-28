import { useEffect, useState } from "react";
import api from "../services/api";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await api.get("/auth/me");
        setUser(data);
        const savedAvatar = localStorage.getItem(`avatar_${data.email}`);
        if (savedAvatar) setAvatar(savedAvatar);
      } catch {
        setError("Failed to load profile. Please sign in again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const b64 = reader.result;
        setAvatar(b64);
        localStorage.setItem(`avatar_${user.email}`, b64);
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) return (
    <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background:"#f5f3ee", fontFamily:"'DM Sans',sans-serif", gap:"1rem" }}>
      <div style={{ width:38, height:38, border:"3px solid #1a3a5c", borderTopColor:"transparent", borderRadius:"50%", animation:"spin 0.8s linear infinite" }} />
      <p style={{ color:"#5a7a8a", fontSize:"0.88rem" }}>Securing your data…</p>
      <style>{`@keyframes spin { to { transform:rotate(360deg); } }`}</style>
    </div>
  );

  if (error) return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#f5f3ee", color:"#b91c1c", fontFamily:"'DM Sans',sans-serif", fontSize:"0.9rem", padding:"2rem", textAlign:"center" }}>
      {error}
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=DM+Sans:wght@400;500;600&display=swap');

        .pf-root {
          min-height: 100vh;
          background: #f5f3ee;
          font-family: 'DM Sans', sans-serif;
          padding: 5.5rem 1.5rem 3rem;
        }

        .pf-inner {
          max-width: 860px;
          margin: 0 auto;
        }

        /* Page title */
        .pf-page-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          font-weight: 700;
          color: #1a3a5c;
          letter-spacing: -0.02em;
          margin: 0 0 0.3rem;
        }

        .pf-page-sub {
          font-size: 0.82rem;
          color: #7a8a9a;
          margin: 0 0 2.5rem;
        }

        /* Grid */
        .pf-grid {
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 1.5rem;
          align-items: start;
        }

        @media (max-width: 680px) {
          .pf-grid { grid-template-columns: 1fr; }
        }

        /* Card shared */
        .pf-card {
          background: #fff;
          border-radius: 1.25rem;
          border: 1px solid rgba(26,58,92,0.08);
          box-shadow: 0 2px 16px rgba(26,58,92,0.05);
        }

        /* Avatar card */
        .pf-avatar-card {
          padding: 2rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          text-align: center;
        }

        .pf-avatar-wrap {
          position: relative;
          margin-bottom: 1.1rem;
        }

        .pf-avatar {
          width: 88px;
          height: 88px;
          border-radius: 1.1rem;
          background: linear-gradient(145deg, #1a3a5c, #2a5a7c);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          font-weight: 700;
          color: #f5f3ee;
          overflow: hidden;
          border: 3px solid #fff;
          box-shadow: 0 4px 16px rgba(26,58,92,0.15);
        }

        .pf-avatar img { width:100%; height:100%; object-fit:cover; }

        .pf-avatar-edit {
          position: absolute;
          bottom: -6px;
          right: -6px;
          width: 30px;
          height: 30px;
          background: #c8a96e;
          border: 2.5px solid #fff;
          border-radius: 0.55rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.18s;
          box-shadow: 0 2px 8px rgba(26,58,92,0.15);
        }

        .pf-avatar-edit:hover { background: #b8996e; }

        .pf-user-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: #1a3a5c;
          letter-spacing: -0.01em;
          margin-bottom: 0.25rem;
        }

        .pf-role-badge {
          display: inline-block;
          background: rgba(200,169,110,0.12);
          border: 1px solid rgba(200,169,110,0.3);
          color: #c8a96e;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 0.28rem 0.8rem;
          border-radius: 100px;
          margin-bottom: 1.5rem;
        }

        .pf-divider {
          width: 100%;
          height: 1px;
          background: rgba(26,58,92,0.07);
          margin: 0 0 1.25rem;
        }

        .pf-logout-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(239,68,68,0.06);
          border: 1px solid rgba(239,68,68,0.15);
          border-radius: 0.65rem;
          padding: 0.6rem 1rem;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem;
          font-weight: 600;
          color: #ef4444;
          width: 100%;
          justify-content: center;
          transition: background 0.18s;
        }

        .pf-logout-btn:hover { background: rgba(239,68,68,0.1); }

        /* Info card */
        .pf-info-card {
          padding: 2rem;
        }

        .pf-info-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.75rem;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .pf-info-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.05rem;
          font-weight: 700;
          color: #1a3a5c;
          margin: 0;
          letter-spacing: -0.01em;
        }

        .pf-verified {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(76,175,134,0.08);
          border: 1px solid rgba(76,175,134,0.2);
          color: #2d8a66;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 0.3rem 0.8rem;
          border-radius: 100px;
        }

        .pf-verified-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #4caf86;
        }

        /* Fields grid */
        .pf-fields {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        @media (max-width: 480px) {
          .pf-fields { grid-template-columns: 1fr; }
        }

        .pf-field {}

        .pf-field-label {
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #9aabb8;
          margin-bottom: 0.4rem;
        }

        .pf-field-value {
          font-size: 0.9rem;
          font-weight: 600;
          color: #1a3a5c;
          padding-bottom: 0.65rem;
          border-bottom: 1px solid rgba(26,58,92,0.07);
          word-break: break-word;
        }

        .pf-privacy {
          margin-top: 1.5rem;
          padding-top: 1.25rem;
          border-top: 1px solid rgba(26,58,92,0.07);
          font-size: 0.7rem;
          color: #9aabb8;
          font-style: italic;
          text-align: right;
        }
      `}</style>

      <div className="pf-root">
        <div className="pf-inner">
          <h1 className="pf-page-title">Account Settings</h1>
          <p className="pf-page-sub">Manage your personal information and profile picture.</p>

          <div className="pf-grid">

            {/* AVATAR CARD */}
            <div className="pf-card pf-avatar-card">
              <div className="pf-avatar-wrap">
                <div className="pf-avatar">
                  {avatar ? <img src={avatar} alt="Profile" /> : user?.name?.charAt(0).toUpperCase() ?? "I"}
                </div>
                <input type="file" id="avatarInput" hidden accept="image/*" onChange={handleAvatarChange} />
                <label htmlFor="avatarInput" className="pf-avatar-edit" title="Change photo">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                    <circle cx="12" cy="13" r="4"/>
                  </svg>
                </label>
              </div>

              <div className="pf-user-name">{user.name}</div>
              <div className="pf-role-badge">{user.role}</div>

              <div className="pf-divider" />

              <button className="pf-logout-btn"
                onClick={() => { localStorage.removeItem("token"); window.location.href = "/login"; }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Sign Out
              </button>
            </div>

            {/* INFO CARD */}
            <div className="pf-card pf-info-card">
              <div className="pf-info-header">
                <h3 className="pf-info-title">Personal Information</h3>
                <div className="pf-verified">
                  <span className="pf-verified-dot" />
                  Identity Verified
                </div>
              </div>

              <div className="pf-fields">
                {[
                  ["Display Name", user.name],
                  ["Email Address", user.email],
                  ["Account Level", user.role],
                  ["Member Since", new Date(user.createdAt).toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" })],
                ].map(([label, value]) => (
                  <div key={label} className="pf-field">
                    <div className="pf-field-label">{label}</div>
                    <div className="pf-field-value">{value}</div>
                  </div>
                ))}
              </div>

              <p className="pf-privacy">Privacy Protected Platform</p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}