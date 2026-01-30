export default function Methodology() {
  return (
    <div className="bg-[#f8f7eb] min-h-screen selection:bg-[#1f4f5a] selection:text-white">

      {/* ================= HERO: STRATEGIC DEPTH ================= */}
      <section className="relative bg-[#0b2a4a] text-[#f2f1d5] pt-32 pb-16 md:pt-44 md:pb-32 overflow-hidden">
        {/* Signature Decorative Glows */}
        <div className="absolute -top-24 -right-24 w-64 h-64 md:w-[500px] md:h-[500px] bg-[#1f4f5a] rounded-full blur-[100px] md:blur-[150px] opacity-20"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 md:w-[350px] md:h-[350px] bg-[#6fa6b2] rounded-full blur-[80px] md:blur-[120px] opacity-10"></div>

        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <span className="inline-block mb-4 md:mb-8 px-5 py-2 rounded-full border border-[#6fa6b2]/30 bg-[#1f4f5a]/40 text-[#6fa6b2] text-[10px] md:text-xs font-black tracking-[0.4em] uppercase">
            The Indofrench IAS Pedagogy
          </span>

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tighter italic">
            Precision in <br className="hidden sm:block" />
            <span className="text-[#6fa6b2] not-italic">Preparation.</span>
          </h1>

          <p className="text-base md:text-xl text-[#b0cdd4] max-w-3xl mx-auto leading-relaxed font-medium opacity-90">
            Cracking the civil services requires more than just hard work; it demands a psychological 
            approach to data retention and conceptual interlinking.
          </p>
        </div>
      </section>

      {/* ================= 4 STEP FRAMEWORK: CORE PILLARS ================= */}
      <section className="py-16 md:py-28 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-16 md:mb-24 text-center">
            <h2 className="text-[10px] md:text-xs font-black text-[#6fa6b2] uppercase tracking-[0.5em] mb-4">Our Scientific Approach</h2>
            <h3 className="text-3xl md:text-5xl font-black text-[#0b2a4a] tracking-tight">The 4-Step Framework</h3>
            <div className="h-1.5 w-24 bg-[#1f4f5a] rounded-full mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {Array.isArray([
              {
                step: "01",
                title: "Atomic Foundations",
                desc: "We deconstruct the syllabus into atomic concepts. We don't move to complex 'current affairs' until your static foundation is unshakable.",
              },
              {
                step: "02",
                title: "Guided Interlinking",
                desc: "IAS preparation is about connecting the dots. Our video modules teach you how to link Economy with History and Geography with Governance.",
              },
              {
                step: "03",
                title: "Zero-Doubt Ecosystem",
                desc: "An ignored doubt is a failed attempt. Our community chat system ensures every query is addressed by specialists in real-time.",
              },
              {
                step: "04",
                title: "The Retrieval Method",
                desc: "We utilize active recall and cognitive reinforcement modules to ensure that what you learn today stays with you until the final interview.",
              },
            ]) && [
              {
                step: "01",
                title: "Atomic Foundations",
                desc: "We deconstruct the syllabus into atomic concepts. We don't move to complex 'current affairs' until your static foundation is unshakable.",
              },
              {
                step: "02",
                title: "Guided Interlinking",
                desc: "IAS preparation is about connecting the dots. Our video modules teach you how to link Economy with History and Geography with Governance.",
              },
              {
                step: "03",
                title: "Zero-Doubt Ecosystem",
                desc: "An ignored doubt is a failed attempt. Our community chat system ensures every query is addressed by specialists in real-time.",
              },
              {
                step: "04",
                title: "The Retrieval Method",
                desc: "We utilize active recall and cognitive reinforcement modules to ensure that what you learn today stays with you until the final interview.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="group bg-white rounded-[2.5rem] p-8 md:p-14 shadow-2xl shadow-black/[0.03] border border-[#0b2a4a]/5 hover:-translate-y-2 transition-all duration-700"
              >
                <div className="flex items-center gap-6 mb-8">
                  <span className="text-4xl md:text-5xl font-black text-[#f2f1d5] group-hover:text-[#1f4f5a] transition-colors duration-500">
                    {item.step}
                  </span>
                  <div className="h-px flex-1 bg-[#f8f7eb] group-hover:bg-[#1f4f5a]/20 transition-colors"></div>
                </div>

                <h3 className="text-2xl md:text-3xl font-black text-[#0b2a4a] mb-6 tracking-tight">
                  {item.title}
                </h3>

                <p className="text-sm md:text-lg text-[#2f6f7e] leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BENTO GRID: WHY IT WORKS ================= */}
      <section className="bg-white py-16 md:py-24 px-4 md:px-6 border-y border-[#0b2a4a]/5 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-black text-[#0b2a4a] tracking-tight uppercase">Why Indofrench?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              "IAS Specific Pedagogy",
              "Neuro-Scientific Retention",
              "Logic-Driven Analysis",
            ].map((point) => (
              <div
                key={point}
                className="bg-[#f8f7eb] rounded-3xl p-8 flex items-center justify-center text-center border border-[#1f4f5a]/10 hover:border-[#1f4f5a] transition-all cursor-default"
              >
                <p className="font-black text-[#0b2a4a] uppercase text-xs md:text-sm tracking-[0.3em]">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TIMELINE: THE JOURNEY ================= */}
      <section className="py-20 md:py-32 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-[#0b2a4a] text-center mb-16 md:mb-24 tracking-tight">
            The Aspirant’s Path
          </h2>

          <div className="space-y-6">
            {[
              "Selection of your specialized batch",
              "Daily Concept-Driven Visual Learning",
              "Real-time MCQ and Answer Writing Drills",
              "1-on-1 Mentorship & Doubt Resolution",
              "Advanced Retrieval & Revision Drills",
              "Final Mastery & Confidence for the Prelims",
            ].map((step, index) => (
              <div
                key={index}
                className="flex items-center gap-6 md:gap-10 bg-white p-6 md:p-10 rounded-3xl border border-[#0b2a4a]/5 shadow-sm group hover:shadow-xl hover:border-[#1f4f5a] transition-all duration-500"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 shrink-0 rounded-2xl bg-[#0b2a4a] text-[#f2f1d5] flex items-center justify-center font-black text-lg md:text-2xl group-hover:bg-[#1f4f5a] transition-all group-hover:scale-110">
                  {index + 1}
                </div>
                <p className="text-[#0b2a4a] font-black text-lg md:text-2xl tracking-tight">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA: REDEFINED ================= */}
      <section className="px-4 md:px-8 pb-20 md:pb-32">
        <div className="max-w-7xl mx-auto bg-[#0b2a4a] rounded-[3rem] md:rounded-[5rem] py-20 md:py-32 px-8 text-center relative overflow-hidden shadow-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1f4f5a] via-transparent to-transparent opacity-60"></div>
          
          <div className="relative z-10">
            <h3 className="text-3xl md:text-7xl font-black text-white mb-8 tracking-tighter italic">
              Experience the <span className="text-[#6fa6b2]">Difference.</span>
            </h3>
            <p className="text-[#6fa6b2] text-sm md:text-xl mb-12 max-w-2xl mx-auto font-bold uppercase tracking-[0.2em]">
              Join The Indofrench IAS community today.
            </p>
            <a
              href="/#courses"
              className="inline-block bg-[#f2f1d5] text-[#0b2a4a] px-12 py-5 rounded-[2rem] font-black uppercase text-xs md:text-sm tracking-[0.4em] hover:bg-white hover:scale-105 transition-all shadow-2xl active:scale-95"
            >
              Secure Your Batch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}