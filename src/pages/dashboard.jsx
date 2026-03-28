import { useEffect, useState } from "react";
import api from "../services/api";
import Coursecard from "../components/coursecard";

const TABS = ["My Courses", "Completed", "Support"];

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const fetchmycourses = async () => {
      try {
        const response = await api.get("/enroll/my-courses");
        const actual = Array.isArray(response) ? response : (response?.courses || []);
        setCourses(actual);
      } catch {
        setError("Unable to load your enrolled courses.");
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchmycourses();
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background:"#f5f3ee", fontFamily:"'DM Sans',sans-serif", gap:"1rem" }}>
        <div style={{ width:38, height:38, border:"3px solid #1a3a5c", borderTopColor:"transparent", borderRadius:"50%", animation:"spin 0.8s linear infinite" }} />
        <p style={{ color:"#5a7a8a", fontSize:"0.88rem", fontWeight:500 }}>Opening your classroom…</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error && courses.length === 0) {
    return (
      <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#f5f3ee", color:"#b91c1c", fontFamily:"'DM Sans',sans-serif", fontSize:"0.9rem", padding:"2rem", textAlign:"center" }}>
        {error}
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@400;500;600&display=swap');

        .db-root {
          min-height: 100vh;
          background: #f5f3ee;
          font-family: 'DM Sans', sans-serif;
          display: flex;
          flex-direction: column;
        }

        /* ── HEADER ── */
        .db-header {
          background: #1a3a5c;
          padding: 5.5rem 1.5rem 3.5rem;
          position: relative;
          overflow: hidden;
        }

        .db-header-glow {
          position: absolute;
          top: -80px;
          right: -60px;
          width: 360px;
          height: 360px;
          background: radial-gradient(circle, rgba(100,160,180,0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        .db-header-inner {
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .db-header-eyebrow {
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #c8a96e;
          margin-bottom: 0.6rem;
        }

        .db-header-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          font-weight: 900;
          color: #f5f3ee;
          letter-spacing: -0.02em;
          margin: 0 0 0.75rem;
        }

        .db-header-sub {
          color: rgba(245,243,238,0.5);
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .db-count-chip {
          background: rgba(200,169,110,0.15);
          border: 1px solid rgba(200,169,110,0.3);
          color: #c8a96e;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 0.2rem 0.7rem;
          border-radius: 100px;
          letter-spacing: 0.05em;
        }

        /* ── TABS ── */
        .db-tabs-wrap {
          background: #fff;
          border-bottom: 1px solid rgba(26,58,92,0.07);
          position: sticky;
          top: 64px;
          z-index: 20;
          box-shadow: 0 2px 8px rgba(26,58,92,0.04);
        }

        .db-tabs {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 1.5rem;
          display: flex;
          gap: 0;
          overflow-x: auto;
        }

        .db-tabs::-webkit-scrollbar { display: none; }

        .db-tab {
          padding: 1rem 1.5rem;
          border: none;
          background: transparent;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          font-weight: 500;
          color: #9aabb8;
          letter-spacing: 0.04em;
          position: relative;
          white-space: nowrap;
          transition: color 0.2s;
          flex-shrink: 0;
        }

        .db-tab:hover { color: #1a3a5c; }

        .db-tab.active {
          color: #1a3a5c;
          font-weight: 700;
        }

        .db-tab.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 1rem;
          right: 1rem;
          height: 2px;
          background: #c8a96e;
          border-radius: 2px 2px 0 0;
        }

        /* ── MAIN ── */
        .db-main {
          flex: 1;
          max-width: 1100px;
          width: 100%;
          margin: 0 auto;
          padding: 2.5rem 1.5rem;
        }

        .db-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        /* Enrolled badge overlay */
        .db-card-wrap {
          position: relative;
        }

        .db-enrolled-tag {
          position: absolute;
          top: 1rem;
          left: 1rem;
          z-index: 10;
          background: rgba(76,175,134,0.9);
          color: #fff;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 0.28rem 0.7rem;
          border-radius: 100px;
          backdrop-filter: blur(4px);
          pointer-events: none;
        }

        /* Empty state */
        .db-empty {
          background: #fff;
          border: 2px dashed rgba(26,58,92,0.1);
          border-radius: 1.25rem;
          padding: 4rem 2rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .db-empty-icon {
          width: 56px;
          height: 56px;
          background: #f5f3ee;
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .db-empty-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.2rem;
          font-weight: 700;
          color: #1a3a5c;
          margin: 0;
        }

        .db-empty-sub {
          color: #7a8a9a;
          font-size: 0.85rem;
          max-width: 280px;
          line-height: 1.6;
          margin: 0;
        }

        .db-browse-btn {
          background: #1a3a5c;
          color: #f5f3ee;
          border: none;
          border-radius: 100px;
          padding: 0.8rem 2rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          transition: background 0.2s;
        }

        .db-browse-btn:hover { background: #2a5a7c; }

        /* Footer */
        .db-footer {
          border-top: 1px solid rgba(26,58,92,0.07);
          padding: 1.5rem;
          text-align: center;
          background: #fff;
        }

        .db-footer p {
          font-size: 0.78rem;
          color: #9aabb8;
          margin: 0;
        }

        .db-footer a {
          color: #1a3a5c;
          font-weight: 600;
          text-decoration: none;
          border-bottom: 1px solid rgba(26,58,92,0.2);
        }
      `}</style>

      <div className="db-root">

        {/* HEADER */}
        <header className="db-header">
          <div className="db-header-glow" />
          <div className="db-header-inner">
            <p className="db-header-eyebrow">Student Dashboard</p>
            <h1 className="db-header-title">Welcome back</h1>
            <div className="db-header-sub">
              <span>You have</span>
              <span className="db-count-chip">{courses.length} active</span>
              <span>{courses.length === 1 ? "batch" : "batches"} enrolled</span>
            </div>
          </div>
        </header>

        {/* TABS */}
        <div className="db-tabs-wrap">
          <div className="db-tabs">
            {TABS.map((tab, i) => (
              <button
                key={tab}
                className={`db-tab${activeTab === i ? " active" : ""}`}
                onClick={() => setActiveTab(i)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* MAIN */}
        <main className="db-main">
          {activeTab === 0 && (
            courses.length === 0 ? (
              <div className="db-empty">
                <div className="db-empty-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9aabb8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                  </svg>
                </div>
                <p className="db-empty-title">Your shelf is empty</p>
                <p className="db-empty-sub">Explore our expert-led batches and start building your skills today.</p>
                <a href="/" className="db-browse-btn">Browse Catalog</a>
              </div>
            ) : (
              <div className="db-grid">
                {courses.map((course) => (
                  <div key={course._id} className="db-card-wrap">
                    <span className="db-enrolled-tag">✓ Enrolled</span>
                    <Coursecard
                      id={course._id}
                      title={course.title}
                      description={course.description}
                      price="enrolled"
                      thumbnail={course.image}
                    />
                  </div>
                ))}
              </div>
            )
          )}

          {activeTab === 1 && (
            <div className="db-empty">
              <div className="db-empty-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9aabb8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <p className="db-empty-title">No completed courses yet</p>
              <p className="db-empty-sub">Keep going — your completed courses will appear here.</p>
            </div>
          )}

          {activeTab === 2 && (
            <div className="db-empty">
              <div className="db-empty-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9aabb8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <p className="db-empty-title">Need help?</p>
              <p className="db-empty-sub">Reach out to our team and we'll get back to you promptly.</p>
              <a href="/chat" className="db-browse-btn">Open Chat</a>
            </div>
          )}
        </main>

        {/* FOOTER */}
        <footer className="db-footer">
          <p>
            Having trouble? <a href="mailto:support@indofrenchias.com">Contact support</a>
          </p>
        </footer>

      </div>
    </>
  );
}