export default function Videoplayer({ videourl, type, title, description }) {

  const getEmbedUrl = (url) => {
    if (!url) return "";
    if (url.includes("youtube.com/watch")) {
      const id = url.split("v=")[1]?.split("&")[0];
      return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`;
    }
    if (url.includes("youtu.be")) {
      const id = url.split("youtu.be/")[1];
      return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`;
    }
    if (url.includes("vimeo.com")) {
      const id = url.split("vimeo.com/")[1];
      return `https://player.vimeo.com/video/${id}`;
    }
    return url;
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600&display=swap');

        .vp-root {
          width: 100%;
          background: #fff;
          border-radius: 1.25rem;
          border: 1px solid rgba(26,58,92,0.08);
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(26,58,92,0.08);
          font-family: 'DM Sans', sans-serif;
        }

        /* Video frame */
        .vp-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 16/9;
          background: #0a1a2e;
        }

        .vp-frame iframe,
        .vp-frame video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: none;
        }

        /* Details */
        .vp-details {
          padding: 1.5rem 1.75rem;
          border-top: 1px solid rgba(26,58,92,0.06);
        }

        .vp-eyebrow {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.65rem;
        }

        .vp-eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #4caf86;
          animation: vppulse 2s infinite;
          flex-shrink: 0;
        }

        @keyframes vppulse {
          0%, 100% { opacity:1; }
          50% { opacity:0.35; }
        }

        .vp-eyebrow-text {
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #4caf86;
        }

        .vp-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.1rem, 2.5vw, 1.5rem);
          font-weight: 700;
          color: #1a3a5c;
          line-height: 1.25;
          letter-spacing: -0.01em;
          margin: 0 0 0.65rem;
        }

        .vp-desc {
          font-size: 0.85rem;
          color: #7a8a9a;
          line-height: 1.7;
          margin: 0;
          border-left: 2px solid #f0ede4;
          padding-left: 0.85rem;
        }
      `}</style>

      <div className="vp-root">

        {/* VIDEO */}
        <div className="vp-frame">
          {type === "url" ? (
            <iframe
              src={getEmbedUrl(videourl)}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video controls controlsList="nodownload">
              <source src={videourl} type="video/mp4" />
            </video>
          )}
        </div>

        {/* DETAILS */}
        <div className="vp-details">
          <div className="vp-eyebrow">
            <span className="vp-eyebrow-dot" />
            <span className="vp-eyebrow-text">Now Playing</span>
          </div>
          <h2 className="vp-title">{title}</h2>
          <p className="vp-desc">{description || "Follow along carefully with the lesson."}</p>
        </div>

      </div>
    </>
  );
}