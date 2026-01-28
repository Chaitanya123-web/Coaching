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
    <div className="w-full bg-white rounded-[1.5rem] sm:rounded-[2.5rem] shadow-2xl shadow-black/10 overflow-hidden border border-[#0b2a4a]/5">

      {/* VIDEO */}
      <div className="aspect-video w-full bg-black relative">
        {type === "url" ? (
          <iframe
            src={getEmbedUrl(videourl)}
            title={title}
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video
            controls
            controlsList="nodownload"
            className="absolute inset-0 w-full h-full"
          >
            <source src={videourl} type="video/mp4" />
          </video>
        )}
      </div>

      {/* DETAILS */}
      <div className="p-6 sm:p-10">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6fa6b2] mb-1 block">
          Currently Playing
        </span>

        <h2 className="text-xl sm:text-2xl font-black text-[#0b2a4a] mb-4">
          {title}
        </h2>

        <p className="text-sm sm:text-base text-[#2f6f7e] leading-relaxed font-medium opacity-80">
          {description || "Follow along carefully with the lesson."}
        </p>
      </div>
    </div>
  );
}
