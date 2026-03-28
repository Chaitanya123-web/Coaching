import { useEffect, useState } from "react";
import api from "../services/api";
import Coursecard from "../components/coursecard";
import heroimg from "../assets/sanantwebsite.jpeg";

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchcourses = async () => {
      try {
        const response = await api.get("/course");
        let actual = [];
        if (Array.isArray(response)) actual = response;
        else if (Array.isArray(response?.courses)) actual = response.courses;
        else if (Array.isArray(response?.data?.courses)) actual = response.data.courses;
        setCourses(actual);
      } catch {
        setError("Failed to load courses.");
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchcourses();
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background:"#f5f3ee", fontFamily:"'DM Sans',sans-serif", gap:"1rem" }}>
        <div style={{ width:40, height:40, border:"3px solid #1a3a5c", borderTopColor:"transparent", borderRadius:"50%", animation:"spin 0.8s linear infinite" }} />
        <p style={{ color:"#5a7a8a", fontSize:"0.9rem", fontWeight:500 }}>Curating your experience…</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&family=DM+Sans:wght@300;400;500;600&display=swap');

        .home-root {
          background: #f5f3ee;
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
        }

        /* ── HERO ── */
        .home-hero {
          background: #1a3a5c;
          padding: 5.5rem 1.5rem 5rem;
          position: relative;
          overflow: hidden;
        }

        .home-hero-glow {
          position: absolute;
          top: -100px;
          right: -100px;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(100,160,180,0.15) 0%, transparent 70%);
          pointer-events: none;
        }

        .home-hero-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        @media (max-width: 900px) {
          .home-hero-inner { grid-template-columns: 1fr; text-align: center; }
          .home-hero-cta { justify-content: center !important; }
          .home-hero-img-col { order: -1; }
        }

        .home-hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(200,169,110,0.12);
          border: 1px solid rgba(200,169,110,0.3);
          color: #c8a96e;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 0.4rem 1rem;
          border-radius: 100px;
          margin-bottom: 1.5rem;
        }

        .home-hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.4rem, 5vw, 3.8rem);
          font-weight: 900;
          color: #f5f3ee;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin: 0 0 1.25rem;
        }

        .home-hero-title em {
          font-style: italic;
          color: #c8a96e;
        }

        .home-hero-sub {
          color: rgba(245,243,238,0.6);
          font-size: 1rem;
          line-height: 1.75;
          max-width: 440px;
          margin: 0 0 2rem;
          font-weight: 400;
        }

        @media (max-width: 900px) {
          .home-hero-sub { margin: 0 auto 2rem; }
        }

        .home-hero-cta {
          display: flex;
          gap: 0.85rem;
          flex-wrap: wrap;
        }

        .home-btn-primary {
          background: #c8a96e;
          color: #1a3a5c;
          padding: 0.85rem 2rem;
          border-radius: 100px;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-decoration: none;
          transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
          box-shadow: 0 4px 16px rgba(200,169,110,0.3);
          white-space: nowrap;
        }

        .home-btn-primary:hover {
          background: #dbb97e;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(200,169,110,0.35);
        }

        .home-btn-secondary {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.15);
          color: #f5f3ee;
          padding: 0.85rem 2rem;
          border-radius: 100px;
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-decoration: none;
          transition: background 0.2s, transform 0.2s;
          white-space: nowrap;
        }

        .home-btn-secondary:hover {
          background: rgba(255,255,255,0.1);
          transform: translateY(-2px);
        }

        /* Stats row */
        .home-stats {
          display: flex;
          gap: 2rem;
          margin-top: 2.5rem;
          flex-wrap: wrap;
        }

        @media (max-width: 900px) {
          .home-stats { justify-content: center; }
        }

        .home-stat {}
        .home-stat-num {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          font-weight: 900;
          color: #f5f3ee;
          line-height: 1;
        }
        .home-stat-label {
          font-size: 0.65rem;
          font-weight: 500;
          color: rgba(245,243,238,0.4);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-top: 0.2rem;
        }

        /* Hero image */
        .home-hero-img-col {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .home-hero-img-wrap {
          position: relative;
          width: 100%;
          max-width: 420px;
        }

        .home-hero-img-glow {
          position: absolute;
          inset: -20px;
          background: radial-gradient(circle, rgba(100,160,180,0.18) 0%, transparent 65%);
          border-radius: 2rem;
        }

        .home-hero-img {
          width: 100%;
          border-radius: 1.5rem;
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 24px 60px rgba(0,0,0,0.3);
          position: relative;
          z-index: 1;
        }

        /* ── COURSES SECTION ── */
        .home-courses {
          padding: 5rem 1.5rem;
        }

        .home-courses-inner {
          max-width: 1100px;
          margin: 0 auto;
        }

        .home-section-header {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-bottom: 3rem;
          gap: 0.5rem;
        }

        @media (max-width: 640px) {
          .home-section-header { align-items: center; text-align: center; }
        }

        .home-section-eyebrow {
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #c8a96e;
        }

        .home-section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.8rem, 3.5vw, 2.6rem);
          font-weight: 900;
          color: #1a3a5c;
          letter-spacing: -0.02em;
          margin: 0;
        }

        .home-section-sub {
          color: #7a8a9a;
          font-size: 0.92rem;
          margin: 0;
          line-height: 1.6;
        }

        .home-courses-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .home-empty {
          background: #fff;
          border: 2px dashed rgba(26,58,92,0.1);
          border-radius: 1.25rem;
          padding: 4rem 2rem;
          text-align: center;
          color: #7a8a9a;
          font-size: 0.9rem;
        }

        /* ── CTA ── */
        .home-cta {
          background: #1a3a5c;
          padding: 5rem 1.5rem;
        }

        .home-cta-inner {
          max-width: 680px;
          margin: 0 auto;
          text-align: center;
        }

        .home-cta-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.7rem, 3.5vw, 2.4rem);
          font-weight: 700;
          color: #f5f3ee;
          letter-spacing: -0.02em;
          line-height: 1.2;
          margin: 0 0 1rem;
        }

        .home-cta-title em { font-style: italic; color: #c8a96e; }

        .home-cta-sub {
          color: rgba(245,243,238,0.5);
          font-size: 0.95rem;
          line-height: 1.75;
          margin: 0 0 2rem;
        }

        .home-cta-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #c8a96e;
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-decoration: none;
          text-transform: uppercase;
          border-bottom: 1px solid rgba(200,169,110,0.3);
          padding-bottom: 0.2rem;
          transition: border-color 0.2s, color 0.2s;
        }

        .home-cta-link:hover { color: #dbb97e; border-color: #dbb97e; }
      `}</style>

      <div className="home-root">

        {/* HERO */}
        <section className="home-hero">
          <div className="home-hero-glow" />
          <div className="home-hero-inner">

            {/* Left */}
            <div>
              <div className="home-hero-eyebrow">
                <svg width="8" height="8" viewBox="0 0 8 8" fill="#c8a96e"><circle cx="4" cy="4" r="4"/></svg>
                Premium IAS Learning Platform
              </div>
              <h1 className="home-hero-title">
                Learn <em>deeply.</em><br />
                Grow confidently.
              </h1>
              <p className="home-hero-sub">
                Expert-led courses designed to build strong fundamentals, clear doubts,
                and help you master civil services with professional guidance.
              </p>
              <div className="home-hero-cta">
                <a href="#courses" className="home-btn-primary">Explore Courses</a>
                <a href="/dashboard" className="home-btn-secondary">My Dashboard</a>
              </div>
              <div className="home-stats">
                {[["500+", "Students"], ["50+", "Courses"], ["95%", "Success Rate"]].map(([num, label]) => (
                  <div key={label} className="home-stat">
                    <div className="home-stat-num">{num}</div>
                    <div className="home-stat-label">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right */}
            <div className="home-hero-img-col">
              <div className="home-hero-img-wrap">
                <div className="home-hero-img-glow" />
                <img src={heroimg} alt="Learning" className="home-hero-img" />
              </div>
            </div>
          </div>
        </section>

        {/* COURSES */}
        <section id="courses" className="home-courses">
          <div className="home-courses-inner">
            <div className="home-section-header">
              <span className="home-section-eyebrow">Available Now</span>
              <h2 className="home-section-title">Current Batches</h2>
              <p className="home-section-sub">Hand-picked batches starting soon. Join a community of dedicated learners.</p>
            </div>

            {courses.length > 0 ? (
              <div className="home-courses-grid">
                {courses.map((course) => (
                  <Coursecard
                    key={course._id}
                    id={course._id}
                    title={course.title}
                    description={course.description}
                    price={course.price}
                    thumbnail={course.image}
                  />
                ))}
              </div>
            ) : (
              <div className="home-empty">
                {error || "No courses available right now. Check back soon."}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="home-cta">
          <div className="home-cta-inner">
            <h3 className="home-cta-title">
              Learning doesn't end<br /><em>with videos.</em>
            </h3>
            <p className="home-cta-sub">
              Get personalized support, clear your roadblocks, and stay consistent
              with our structured learning path.
            </p>
            <a href="/methodology" className="home-cta-link">
              Our Learning Methodology
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
          </div>
        </section>

      </div>
    </>
  );
}