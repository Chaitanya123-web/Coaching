import { useNavigate } from "react-router-dom";

export default function Coursecard({ id, title, description, price, thumbnail }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/course/${id}`)}
      className="group bg-white rounded-[2.5rem] shadow-2xl shadow-black/5 overflow-hidden cursor-pointer border border-[#0b2a4a]/5 hover:-translate-y-2 transition-all duration-500 flex flex-col h-full"
    >
      {/* PROFESSIONAL IMAGE SECTION */}
      <div className="relative h-56 overflow-hidden bg-[#f8f7eb]">
      {/* Inside Coursecard.jsx */}
      {thumbnail && thumbnail.startsWith('http') ? (
          <img 
            src={thumbnail} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0b2a4a] to-[#1f4f5a]">
            <span className="text-[#f2f1d5] font-black text-4xl opacity-20 italic uppercase tracking-tighter">Indofrench</span>
          </div>
        )}
        
        {/* PRICE BADGE */}
        <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-md px-5 py-2 rounded-2xl shadow-xl border border-white/20">
           <span className="text-sm font-black text-[#0b2a4a]">
              {price === "enrolled" ? "Access Granted" : `₹${price}`}
           </span>
        </div>
      </div>

      <div className="p-8 flex flex-col flex-1">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#1f4f5a] animate-pulse"></span>
            <span className="text-[10px] font-black text-[#6fa6b2] uppercase tracking-[0.2em]">Live Interactive Batch</span>
          </div>
          
          <h3 className="text-2xl font-black text-[#0b2a4a] leading-tight mb-4 tracking-tighter uppercase italic group-hover:text-[#1f4f5a] transition-colors">
            {title}
          </h3>
          
          <p className="text-xs text-[#6fa6b2] leading-relaxed line-clamp-3 font-medium border-l-2 border-[#f2f1d5] pl-4">
            {description}
          </p>
        </div>

        {/* CLEAN FOOTER SECTION */}
        <div className="mt-auto pt-6 border-t border-[#f8f7eb] flex items-center justify-between">
          <div className="text-[10px] font-black uppercase tracking-widest text-[#6fa6b2] group-hover:text-[#0b2a4a] transition-colors">
            Course Syllabus →
          </div>
          
          <button className="px-6 py-3 bg-[#0b2a4a] text-[#f2f1d5] rounded-xl text-[10px] font-black uppercase tracking-widest group-hover:bg-[#1f4f5a] transition-all shadow-lg shadow-[#0b2a4a]/20">
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
}