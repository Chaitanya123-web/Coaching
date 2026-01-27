import { useNavigate } from "react-router-dom";

export default function Coursecard({ id, title, description, price }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/course/${id}`)}
      className="group bg-white rounded-[2rem] shadow-xl shadow-black/5 p-8 cursor-pointer border border-[#0b2a4a]/5 hover:-translate-y-2 transition-all duration-500 flex flex-col h-full"
    >
      <div className="mb-4">
        <div className="w-12 h-12 rounded-2xl bg-[#f8f7eb] flex items-center justify-center text-[#0b2a4a] mb-6 group-hover:bg-[#0b2a4a] group-hover:text-white transition-colors duration-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h3 className="text-2xl font-black text-[#0b2a4a] leading-tight mb-3 tracking-tight">{title}</h3>
        <p className="text-sm text-[#2f6f7e] leading-relaxed line-clamp-3 mb-6 font-medium">
          {description}
        </p>
      </div>

      <div className="mt-auto flex items-center justify-between">
        <span className="text-lg font-black text-[#1f4f5a]">
          {price === "enrolled" ? (
            <span className="text-green-600 text-xs uppercase tracking-widest">Enrolled</span>
          ) : (
            `₹${price}`
          )}
        </span>
        <div className="text-[10px] font-black uppercase tracking-widest text-[#6fa6b2] group-hover:text-[#0b2a4a] transition-colors">
          View Details →
        </div>
      </div>
    </div>
  );
}