export default function Videoplayer({ videourl, title, description }) {
  const getEmbedUrl = (url) => {
    if (!url) return "";
    if (url.includes("embed")) return url;
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
      {/* VIDEO CONTAINER - Responsive Aspect Ratio */}
      <div className="aspect-video w-full bg-black relative group">
        <iframe
          src={getEmbedUrl(videourl)}
          title={title}
          className="absolute inset-0 w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* LESSON DETAILS */}
      <div className="p-6 sm:p-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6fa6b2] mb-1 block">
              Currently Playing
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#0b2a4a] leading-tight tracking-tight">
              {title}
            </h2>
          </div>
          <div className="flex items-center gap-2 bg-[#f8f7eb] px-4 py-2 rounded-xl border border-[#0b2a4a]/5">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
             <span className="text-[10px] font-black uppercase tracking-widest text-[#0b2a4a]">High Definition</span>
          </div>
        </div>

        <div className="h-px w-full bg-[#f8f7eb] mb-6"></div>

        <p className="text-sm sm:text-base text-[#2f6f7e] leading-relaxed font-medium opacity-80">
          {description || "In this session, we dive deep into the core concepts of this module. Ensure you have your notes ready and follow along with the practical exercises."}
        </p>
      </div>
    </div>
  );
}