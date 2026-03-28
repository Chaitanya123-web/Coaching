const steps = [
  { step: "01", title: "Atomic Foundations", desc: "We deconstruct the syllabus into atomic concepts. We don't move to complex current affairs until your static foundation is unshakable." },
  { step: "02", title: "Guided Interlinking", desc: "IAS preparation is about connecting the dots. Our video modules teach you how to link Economy with History and Geography with Governance." },
  { step: "03", title: "Zero-Doubt Ecosystem", desc: "An ignored doubt is a failed attempt. Our community chat system ensures every query is addressed by specialists in real-time." },
  { step: "04", title: "The Retrieval Method", desc: "We utilize active recall and cognitive reinforcement modules to ensure that what you learn today stays with you until the final interview." },
];

const pillars = ["IAS Specific Pedagogy", "Neuro-Scientific Retention", "Logic-Driven Analysis"];

const journey = [
  "Selection of your specialized batch",
  "Daily Concept-Driven Visual Learning",
  "Real-time MCQ and Answer Writing Drills",
  "1-on-1 Mentorship & Doubt Resolution",
  "Advanced Retrieval & Revision Drills",
  "Final Mastery & Confidence for the Prelims",
];

export default function Methodology() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&family=DM+Sans:wght@400;500;600&display=swap');

        .mt-root {
          background: #f5f3ee;
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
        }

        /* ── HERO ── */
        .mt-hero {
          background: #1a3a5c;
          padding: 5.5rem 1.5rem 5rem;
          position: relative;
          overflow: hidden;
          text-align: center;
        }

        .mt-hero-glow1 {
          position: absolute;
          top: -100px; right: -100px;
          width: 450px; height: 450px;
          background: radial-gradient(circle, rgba(100,160,180,0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        .mt-hero-glow2 {
          position: absolute;
          bottom: -80px; left: -80px;
          width: 320px; height: 320px;
          background: radial-gradient(circle, rgba(200,169,110,0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .mt-hero-inner { position: relative; z-index: 1; max-width: 780px; margin: 0 auto; }

        .mt-hero-eyebrow {
          display: inline-block;
          background: rgba(200,169,110,0.1);
          border: 1px solid rgba(200,169,110,0.25);
          color: #c8a96e;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          padding: 0.45rem 1.25rem;
          border-radius: 100px;
          margin-bottom: 2rem;
        }

        .mt-hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.8rem, 7vw, 5.5rem);
          font-weight: 900;
          color: #f5f3ee;
          line-height: 1.05;
          letter-spacing: -0.03em;
          margin: 0 0 1.5rem;
        }

        .mt-hero-title em { font-style: italic; color: #c8a96e; }

        .mt-hero-sub {
          font-size: clamp(0.9rem, 2vw, 1.1rem);
          color: rgba(245,243,238,0.55);
          line-height: 1.75;
          max-width: 560px;
          margin: 0 auto;
        }

        /* ── SECTION SHARED ── */
        .mt-section {
          padding: 5rem 1.5rem;
          max-width: 1100px;
          margin: 0 auto;
        }

        .mt-section-label {
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #c8a96e;
          margin-bottom: 0.6rem;
          display: block;
          text-align: center;
        }

        .mt-section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          font-weight: 900;
          color: #1a3a5c;
          letter-spacing: -0.02em;
          text-align: center;
          margin: 0 0 0.75rem;
        }

        .mt-section-rule {
          width: 40px;
          height: 2px;
          background: #c8a96e;
          border-radius: 2px;
          margin: 0 auto 3.5rem;
        }

        /* ── 4 STEPS GRID ── */
        .mt-steps-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }

        @media (max-width: 680px) { .mt-steps-grid { grid-template-columns: 1fr; } }

        .mt-step-card {
          background: #fff;
          border-radius: 1.25rem;
          border: 1px solid rgba(26,58,92,0.08);
          padding: 2rem;
          transition: box-shadow 0.3s, transform 0.3s;
          box-shadow: 0 2px 12px rgba(26,58,92,0.05);
        }

        .mt-step-card:hover {
          box-shadow: 0 12px 40px rgba(26,58,92,0.1);
          transform: translateY(-3px);
        }

        .mt-step-num {
          font-family: 'Playfair Display', serif;
          font-size: 2.8rem;
          font-weight: 900;
          color: rgba(26,58,92,0.08);
          line-height: 1;
          margin-bottom: 1rem;
          letter-spacing: -0.03em;
          transition: color 0.3s;
        }

        .mt-step-card:hover .mt-step-num { color: rgba(200,169,110,0.3); }

        .mt-step-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.2rem;
          font-weight: 700;
          color: #1a3a5c;
          letter-spacing: -0.01em;
          margin-bottom: 0.75rem;
        }

        .mt-step-desc {
          font-size: 0.85rem;
          color: #5a7a8a;
          line-height: 1.75;
          border-left: 2px solid #f0ede4;
          padding-left: 0.85rem;
        }

        /* ── WHY SECTION ── */
        .mt-why {
          background: #fff;
          border-top: 1px solid rgba(26,58,92,0.06);
          border-bottom: 1px solid rgba(26,58,92,0.06);
          padding: 5rem 1.5rem;
        }

        .mt-pillars {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          max-width: 780px;
          margin: 0 auto;
        }

        @media (max-width: 580px) { .mt-pillars { grid-template-columns: 1fr; } }

        .mt-pillar {
          background: #f5f3ee;
          border: 1px solid rgba(26,58,92,0.08);
          border-radius: 1rem;
          padding: 1.75rem 1.25rem;
          text-align: center;
          transition: border-color 0.2s, background 0.2s;
          cursor: default;
        }

        .mt-pillar:hover {
          border-color: #c8a96e;
          background: rgba(200,169,110,0.04);
        }

        .mt-pillar-text {
          font-size: 0.72rem;
          font-weight: 700;
          color: #1a3a5c;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        /* ── JOURNEY ── */
        .mt-journey-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          max-width: 680px;
          margin: 0 auto;
        }

        .mt-journey-item {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          background: #fff;
          border: 1px solid rgba(26,58,92,0.07);
          border-radius: 1rem;
          padding: 1.1rem 1.5rem;
          box-shadow: 0 1px 6px rgba(26,58,92,0.04);
          transition: box-shadow 0.25s, border-color 0.25s, transform 0.25s;
        }

        .mt-journey-item:hover {
          box-shadow: 0 6px 24px rgba(26,58,92,0.09);
          border-color: rgba(200,169,110,0.35);
          transform: translateX(4px);
        }

        .mt-journey-num {
          width: 38px;
          height: 38px;
          border-radius: 0.65rem;
          background: #1a3a5c;
          color: #f5f3ee;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Playfair Display', serif;
          font-size: 1rem;
          font-weight: 700;
          flex-shrink: 0;
          transition: background 0.2s;
        }

        .mt-journey-item:hover .mt-journey-num { background: #c8a96e; color: #1a3a5c; }

        .mt-journey-text {
          font-size: 0.9rem;
          font-weight: 600;
          color: #1a3a5c;
          letter-spacing: -0.01em;
        }

        /* ── FINAL CTA ── */
        .mt-cta-wrap {
          padding: 0 1.5rem 5rem;
          max-width: 1100px;
          margin: 0 auto;
        }

        .mt-cta {
          background: #1a3a5c;
          border-radius: 1.5rem;
          padding: 4rem 2rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .mt-cta-glow {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(42,90,124,0.6) 0%, transparent 60%);
          pointer-events: none;
        }

        .mt-cta-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.8rem, 5vw, 3.5rem);
          font-weight: 900;
          color: #f5f3ee;
          letter-spacing: -0.02em;
          margin: 0 0 1rem;
          position: relative;
          z-index: 1;
        }

        .mt-cta-title em { font-style: italic; color: #c8a96e; }

        .mt-cta-sub {
          font-size: 0.85rem;
          font-weight: 600;
          color: rgba(245,243,238,0.4);
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin: 0 0 2.5rem;
          position: relative;
          z-index: 1;
        }

        .mt-cta-btn {
          display: inline-block;
          background: #c8a96e;
          color: #1a3a5c;
          padding: 0.9rem 2.5rem;
          border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 20px rgba(200,169,110,0.3);
          position: relative;
          z-index: 1;
        }

        .mt-cta-btn:hover {
          background: #dbb97e;
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(200,169,110,0.4);
        }
      `}</style>

      <div className="mt-root">

        {/* HERO */}
        <section className="mt-hero">
          <div className="mt-hero-glow1" />
          <div className="mt-hero-glow2" />
          <div className="mt-hero-inner">
            <span className="mt-hero-eyebrow">The Indofrench IAS Pedagogy</span>
            <h1 className="mt-hero-title">
              Precision in<br />
              <em>Preparation.</em>
            </h1>
            <p className="mt-hero-sub">
              Cracking the civil services requires more than hard work — it demands a
              psychological approach to data retention and conceptual interlinking.
            </p>
          </div>
        </section>

        {/* 4 STEPS */}
        <div className="mt-section">
          <span className="mt-section-label">Our Scientific Approach</span>
          <h2 className="mt-section-title">The 4-Step Framework</h2>
          <div className="mt-section-rule" />
          <div className="mt-steps-grid">
            {steps.map((s) => (
              <div key={s.step} className="mt-step-card">
                <div className="mt-step-num">{s.step}</div>
                <div className="mt-step-title">{s.title}</div>
                <p className="mt-step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* WHY INDOFRENCH */}
        <div className="mt-why">
          <div style={{ maxWidth:1100, margin:"0 auto" }}>
            <span className="mt-section-label">Why Choose Us</span>
            <h2 className="mt-section-title">Why Indofrench?</h2>
            <div className="mt-section-rule" />
            <div className="mt-pillars">
              {pillars.map((p) => (
                <div key={p} className="mt-pillar">
                  <span className="mt-pillar-text">{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* JOURNEY */}
        <div className="mt-section">
          <h2 className="mt-section-title">The Aspirant's Path</h2>
          <div className="mt-section-rule" />
          <div className="mt-journey-list">
            {journey.map((step, i) => (
              <div key={i} className="mt-journey-item">
                <div className="mt-journey-num">{i + 1}</div>
                <span className="mt-journey-text">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-cta-wrap">
          <div className="mt-cta">
            <div className="mt-cta-glow" />
            <h3 className="mt-cta-title">Experience the <em>Difference.</em></h3>
            <p className="mt-cta-sub">Join The Indofrench IAS community today.</p>
            <a href="/#courses" className="mt-cta-btn">Secure Your Batch</a>
          </div>
        </div>

      </div>
    </>
  );
}