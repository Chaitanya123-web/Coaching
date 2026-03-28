import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Course() {
  const { courseid } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [videos, setVideos] = useState([]);
  const [enrolled, setEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const user = await api.get("/auth/me");

        // Fetch course details for price display
        const allCourses = await api.get("/course");
        const courseList = Array.isArray(allCourses) ? allCourses : (allCourses?.courses || []);
        const found = courseList.find(c => c._id === courseid);
        setCourse(found || null);

        if (user.role === "admin") {
          setEnrolled(true);
          const vids = await api.get(`/video/${courseid}`);
          setVideos(Array.isArray(vids) ? vids : (vids?.videos || []));
          return;
        }

        const status = await api.get(`/enroll/check/${courseid}`);
        if (status.enrolled) {
          setEnrolled(true);
          const vids = await api.get(`/video/${courseid}`);
          setVideos(Array.isArray(vids) ? vids : (vids?.videos || []));
        } else {
          setEnrolled(false);
          setVideos([]);
        }
      } catch (err) {
        console.error("Course load failed:", err);
        setEnrolled(false);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [courseid]);

  const handlePayment = async () => {
    if (!course) return;
    setPaying(true);

    try {
      // 1. Create order on backend
      const { orderId, amount, currency } = await api.post("/payment/create-order", {
        type: "course",
        itemId: courseid,
      });

      // 2. Open Razorpay checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount,
        currency,
        name: "The Indofrench IAS",
        description: `Enroll: ${course.title}`,
        order_id: orderId,
        handler: async (response) => {
          try {
            // 3. Verify on backend
            const result = await api.post("/payment/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              type: "course",
              itemId: courseid,
            });

            if (result.success) {
              setEnrolled(true);
              window.location.reload();
            }
          } catch {
            alert("Payment verification failed. Contact support.");
          }
        },
        prefill: { name: "", email: "" },
        theme: { color: "#1a3a5c" },
        modal: {
          ondismiss: () => setPaying(false),
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", () => {
        alert("Payment failed. Please try again.");
        setPaying(false);
      });
      rzp.open();
    } catch (err) {
      console.error("Payment init error:", err);
      alert("Could not initiate payment. Please try again.");
      setPaying(false);
    }
  };

  if (loading) return (
    <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background:"#f5f3ee", fontFamily:"'DM Sans',sans-serif", gap:"1rem" }}>
      <div style={{ width:36, height:36, border:"3px solid #1a3a5c", borderTopColor:"transparent", borderRadius:"50%", animation:"spin 0.8s linear infinite" }} />
      <p style={{ color:"#5a7a8a", fontSize:"0.88rem" }}>Fetching curriculum…</p>
      <style>{`@keyframes spin { to { transform:rotate(360deg); } }`}</style>
    </div>
  );

  /* NOT ENROLLED */
  if (!enrolled) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@400;500;600&display=swap');
          .enroll-page {
            min-height: 100vh;
            background: #f5f3ee;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 6rem 1.5rem 3rem;
            font-family: 'DM Sans', sans-serif;
          }
          .enroll-card {
            background: #fff;
            border-radius: 1.5rem;
            border: 1px solid rgba(26,58,92,0.08);
            box-shadow: 0 8px 40px rgba(26,58,92,0.1);
            padding: 3rem 2.5rem;
            max-width: 480px;
            width: 100%;
            text-align: center;
          }
          .enroll-icon {
            width: 64px; height: 64px;
            background: #f5f3ee;
            border-radius: 1.1rem;
            display: flex; align-items: center; justify-content: center;
            margin: 0 auto 1.5rem;
          }
          .enroll-title {
            font-family: 'Playfair Display', serif;
            font-size: 1.8rem; font-weight: 900;
            color: #1a3a5c; letter-spacing: -0.02em;
            margin: 0 0 0.75rem;
          }
          .enroll-sub {
            font-size: 0.88rem; color: #7a8a9a;
            line-height: 1.7; margin: 0 0 2rem;
          }
          .enroll-price-row {
            display: flex; align-items: center; justify-content: center;
            gap: 0.5rem; margin-bottom: 1.75rem;
          }
          .enroll-price-label {
            font-size: 0.65rem; font-weight: 700;
            color: #9aabb8; letter-spacing: 0.15em; text-transform: uppercase;
          }
          .enroll-price {
            font-family: 'Playfair Display', serif;
            font-size: 2rem; font-weight: 900;
            color: #1a3a5c; letter-spacing: -0.02em;
          }
          .enroll-btn {
            width: 100%;
            background: #1a3a5c; color: #f5f3ee;
            border: none; border-radius: 100px;
            padding: 1rem 2rem;
            font-family: 'DM Sans', sans-serif;
            font-size: 0.82rem; font-weight: 700;
            letter-spacing: 0.1em; text-transform: uppercase;
            cursor: pointer;
            display: flex; align-items: center; justify-content: center; gap: 0.6rem;
            transition: background 0.2s, box-shadow 0.2s;
            box-shadow: 0 4px 16px rgba(26,58,92,0.22);
          }
          .enroll-btn:hover:not(:disabled) { background: #2a5a7c; box-shadow: 0 8px 24px rgba(26,58,92,0.3); }
          .enroll-btn:disabled { opacity: 0.6; cursor: not-allowed; }
          .enroll-secure {
            display: flex; align-items: center; justify-content: center;
            gap: 0.4rem; margin-top: 1rem;
            font-size: 0.65rem; color: #9aabb8; font-weight: 500;
          }
        `}</style>
        <div className="enroll-page">
          <div className="enroll-card">
            <div className="enroll-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1a3a5c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <h2 className="enroll-title">Access Restricted</h2>
            <p className="enroll-sub">
              This curriculum is exclusive to enrolled members. Unlock the full learning experience today.
            </p>

            {course && (
              <div className="enroll-price-row">
                <span className="enroll-price-label">One-time fee</span>
                <span className="enroll-price">
                  ₹{Number(course.price).toLocaleString("en-IN")}
                </span>
              </div>
            )}

            <button className="enroll-btn" onClick={handlePayment} disabled={paying}>
              {paying ? (
                <>
                  <div style={{ width:14, height:14, border:"2px solid rgba(245,243,238,0.4)", borderTopColor:"#f5f3ee", borderRadius:"50%", animation:"spin 0.7s linear infinite" }} />
                  Opening payment…
                </>
              ) : (
                <>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
                  </svg>
                  Pay & Enroll Now
                </>
              )}
            </button>

            <div className="enroll-secure">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              Secured by Razorpay · 256-bit encryption
            </div>
          </div>
        </div>
      </>
    );
  }

  /* ENROLLED / ADMIN VIEW */
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700&family=DM+Sans:wght@400;500;600&display=swap');
        .cp-root {
          min-height: 100vh; background: #f5f3ee;
          padding: 5.5rem 1.25rem 3rem;
          font-family: 'DM Sans', sans-serif;
        }
        .cp-inner { max-width: 860px; margin: 0 auto; }
        .cp-header {
          display: flex; align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;
        }
        .cp-eyebrow {
          font-size: 0.6rem; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: #c8a96e; margin-bottom: 0.4rem;
        }
        .cp-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.6rem, 4vw, 2.4rem);
          font-weight: 700; color: #1a3a5c;
          letter-spacing: -0.02em; margin: 0;
        }
        .cp-count {
          background: #fff; border: 1px solid rgba(26,58,92,0.08);
          border-radius: 100px; padding: 0.45rem 1rem;
          font-size: 0.75rem; font-weight: 600; color: #5a7a8a;
          white-space: nowrap;
          box-shadow: 0 1px 6px rgba(26,58,92,0.05);
        }
        .cp-list { display: flex; flex-direction: column; gap: 0.75rem; }
        .cp-item {
          background: #fff;
          border: 1px solid rgba(26,58,92,0.07);
          border-radius: 1rem;
          padding: 1rem 1.25rem;
          display: flex; align-items: center; gap: 1.1rem;
          cursor: pointer;
          transition: box-shadow 0.25s, border-color 0.25s, transform 0.2s;
          box-shadow: 0 1px 6px rgba(26,58,92,0.04);
        }
        .cp-item:hover {
          box-shadow: 0 6px 24px rgba(26,58,92,0.1);
          border-color: rgba(200,169,110,0.3);
          transform: translateX(4px);
        }
        .cp-thumb {
          width: 80px; height: 52px; flex-shrink: 0;
          background: #1a3a5c; border-radius: 0.65rem;
          display: flex; align-items: center; justify-content: center;
          color: rgba(245,243,238,0.6); font-size: 1.1rem;
          transition: background 0.2s;
        }
        .cp-item:hover .cp-thumb { background: #2a5a7c; color: #c8a96e; }
        .cp-item-info { flex: 1; min-width: 0; }
        .cp-lesson-num {
          font-size: 0.6rem; font-weight: 700;
          letter-spacing: 0.15em; text-transform: uppercase;
          color: #c8a96e; margin-bottom: 0.2rem;
        }
        .cp-lesson-title {
          font-size: 0.92rem; font-weight: 600;
          color: #1a3a5c; white-space: nowrap;
          overflow: hidden; text-overflow: ellipsis;
        }
        .cp-lesson-sub {
          font-size: 0.72rem; color: #9aabb8; margin-top: 0.15rem;
        }
        .cp-play-badge {
          background: #f5f3ee; border: 1px solid rgba(26,58,92,0.08);
          border-radius: 0.55rem; padding: 0.3rem 0.75rem;
          font-size: 0.62rem; font-weight: 700;
          color: #1a3a5c; letter-spacing: 0.1em;
          text-transform: uppercase; flex-shrink: 0;
          display: none;
        }
        @media (min-width: 600px) { .cp-play-badge { display: block; } }
        .cp-empty {
          background: #fff; border: 2px dashed rgba(26,58,92,0.1);
          border-radius: 1rem; padding: 3rem 2rem; text-align: center;
          color: #9aabb8; font-size: 0.85rem; font-style: italic;
        }
      `}</style>

      <div className="cp-root">
        <div className="cp-inner">
          <div className="cp-header">
            <div>
              <p className="cp-eyebrow">Course Modules</p>
              <h1 className="cp-title">Your Curriculum</h1>
            </div>
            <span className="cp-count">{videos.length} lesson{videos.length !== 1 ? "s" : ""} available</span>
          </div>

          {videos.length === 0 ? (
            <div className="cp-empty">Curriculum is being updated. Check back soon.</div>
          ) : (
            <div className="cp-list">
              {videos.map((video, index) => (
                <div key={video._id} className="cp-item" onClick={() => navigate(`/video/${video._id}`)}>
                  <div className="cp-thumb">▶</div>
                  <div className="cp-item-info">
                    <div className="cp-lesson-num">Lesson {index + 1}</div>
                    <div className="cp-lesson-title">{video.title}</div>
                    <div className="cp-lesson-sub">Recorded HD lesson</div>
                  </div>
                  <span className="cp-play-badge">Play</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}