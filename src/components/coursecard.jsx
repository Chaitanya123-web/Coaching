import { useNavigate } from "react-router-dom";

export default function Coursecard({ id, title, description, price, thumbnail }) {
  const navigate = useNavigate();
  const isEnrolled = price === "enrolled";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@400;500;600&display=swap');

        .cc-card {
          background: #fff;
          border-radius: 1.25rem;
          border: 1px solid rgba(26,58,92,0.08);
          overflow: hidden;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          height: 100%;
          font-family: 'DM Sans', sans-serif;
          transition: box-shadow 0.3s ease, transform 0.3s ease;
          box-shadow: 0 2px 12px rgba(26,58,92,0.05);
        }

        .cc-card:hover {
          box-shadow: 0 12px 40px rgba(26,58,92,0.12);
          transform: translateY(-4px);
        }

        .cc-img-wrap {
          position: relative;
          height: 200px;
          background: linear-gradient(145deg, #1a3a5c, #2a5a7c);
          overflow: hidden;
          flex-shrink: 0;
        }

        .cc-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .cc-card:hover .cc-img { transform: scale(1.05); }

        .cc-img-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cc-img-placeholder-text {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-weight: 900;
          font-size: 1.6rem;
          color: rgba(255,255,255,0.12);
          letter-spacing: -0.02em;
          text-transform: uppercase;
        }

        .cc-price-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(8px);
          border-radius: 100px;
          padding: 0.35rem 0.9rem;
          font-size: 0.78rem;
          font-weight: 700;
          color: #1a3a5c;
          border: 1px solid rgba(26,58,92,0.08);
          box-shadow: 0 2px 8px rgba(26,58,92,0.12);
        }

        .cc-price-badge.enrolled {
          background: rgba(76,175,134,0.12);
          color: #2d8a66;
          border-color: rgba(76,175,134,0.3);
        }

        .cc-body {
          padding: 1.4rem 1.5rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .cc-category {
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #c8a96e;
          margin-bottom: 0.55rem;
        }

        .cc-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.15rem;
          font-weight: 700;
          color: #1a3a5c;
          line-height: 1.25;
          letter-spacing: -0.01em;
          margin-bottom: 0.75rem;
          transition: color 0.2s;
        }

        .cc-card:hover .cc-title { color: #2a5a7c; }

        .cc-desc {
          font-size: 0.82rem;
          color: #5a7a8a;
          line-height: 1.7;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          flex: 1;
          border-left: 2px solid #f0ede4;
          padding-left: 0.75rem;
        }

        .cc-footer {
          margin-top: 1.25rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(26,58,92,0.07);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
        }

        .cc-syllabus-link {
          font-size: 0.68rem;
          font-weight: 600;
          color: #9aabb8;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          transition: color 0.2s;
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }

        .cc-card:hover .cc-syllabus-link { color: #1a3a5c; }

        .cc-btn {
          background: #1a3a5c;
          color: #f5f3ee;
          border: none;
          border-radius: 100px;
          padding: 0.55rem 1.2rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.2s, box-shadow 0.2s;
          box-shadow: 0 3px 10px rgba(26,58,92,0.2);
          white-space: nowrap;
        }

        .cc-btn:hover { background: #2a5a7c; box-shadow: 0 5px 16px rgba(26,58,92,0.28); }

        .cc-btn.enrolled-btn {
          background: rgba(76,175,134,0.1);
          color: #2d8a66;
          box-shadow: none;
          border: 1px solid rgba(76,175,134,0.25);
        }

        .cc-btn.enrolled-btn:hover {
          background: rgba(76,175,134,0.18);
          box-shadow: none;
        }
      `}</style>

      <div className="cc-card" onClick={() => navigate(`/course/${id}`)}>

        {/* IMAGE */}
        <div className="cc-img-wrap">
          {thumbnail && thumbnail.startsWith("http") ? (
            <img src={thumbnail} alt={title} className="cc-img" />
          ) : (
            <div className="cc-img-placeholder">
              <span className="cc-img-placeholder-text">Indofrench</span>
            </div>
          )}
          <div className={`cc-price-badge${isEnrolled ? " enrolled" : ""}`}>
            {isEnrolled ? "✓ Enrolled" : `₹${Number(price).toLocaleString("en-IN")}`}
          </div>
        </div>

        {/* BODY */}
        <div className="cc-body">
          <p className="cc-category">IAS Preparation</p>
          <h3 className="cc-title">{title}</h3>
          <p className="cc-desc">{description}</p>

          <div className="cc-footer">
            <span className="cc-syllabus-link">
              View syllabus
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </span>
            <button className={`cc-btn${isEnrolled ? " enrolled-btn" : ""}`}
              onClick={e => { e.stopPropagation(); navigate(`/course/${id}`); }}>
              {isEnrolled ? "Continue" : "Enroll Now"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}