export default function Methodology() {
  return (
    <div className="bg-[#f8f7eb] min-h-screen selection:bg-[#1f4f5a] selection:text-white">

      {/* ================= HERO: REFINED DEPTH ================= */}
      <section className="relative bg-[#0b2a4a] text-[#f2f1d5] pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        {/* Decorative Glows - Scaled for mobile */}
        <div className="absolute -top-24 -right-24 w-64 h-64 md:w-[400px] md:h-[400px] bg-[#1f4f5a] rounded-full blur-[80px] md:blur-[120px] opacity-20"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 md:w-[300px] md:h-[300px] bg-[#6fa6b2] rounded-full blur-[70px] md:blur-[100px] opacity-10"></div>

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <span className="inline-block mb-4 md:mb-6 px-4 py-1.5 rounded-lg border border-[#6fa6b2]/30 bg-[#1f4f5a]/40 text-[#6fa6b2] text-[9px] md:text-[10px] font-black tracking-[0.3em] uppercase">
            The Academy Blueprint
          </span>

          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black mb-6 leading-[1.2] md:leading-[1.1] tracking-tighter">
            Learning that builds <br className="hidden sm:block" />
            <span className="text-[#6fa6b2]">real mastery.</span>
          </h1>

          <p className="text-base md:text-xl text-[#b0cdd4] max-w-2xl mx-auto leading-relaxed font-medium">
            We move beyond rote memorization. Our methodology is engineered 
            to transform complex information into long-term intuition.
          </p>
        </div>
      </section>

      {/* ================= 4 STEP FRAMEWORK: MODERN GRID ================= */}
      <section className="py-12 md:py-20 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center mb-10 md:mb-16 text-center">
            <h2 className="text-2xl md:text-4xl font-black text-[#0b2a4a] mb-4 tracking-tight">
              The 4-Step Framework
            </h2>
            <div className="h-1 w-16 md:h-1.5 md:w-20 bg-[#1f4f5a] rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {[
              {
                step: "01",
                title: "Concept First",
                desc: "Every topic starts from the molecular level. No shortcuts. We ensure absolute clarity before introducing complexity.",
              },
              {
                step: "02",
                title: "Guided Application",
                desc: "Theory meets practice immediately. Walkthroughs and live problem-solving happen in real-time alongside your mentor.",
              },
              {
                step: "03",
                title: "Active Doubt Resolution",
                desc: "Questions are the engine of learning. Our integrated doubt system ensures you never hit a wall.",
              },
              {
                step: "04",
                title: "Cognitive Reinforcement",
                desc: "Structured recaps and checkpoints designed to migrate understanding from short-term to permanent memory.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="group bg-white rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-10 shadow-xl shadow-black/5 border border-[#0b2a4a]/5 hover:-translate-y-1 md:hover:-translate-y-2 transition-all duration-500"
              >
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <span className="text-3xl md:text-4xl font-black text-[#f2f1d5] drop-shadow-[0_2px_2px_rgba(31,79,90,0.1)] group-hover:text-[#6fa6b2] transition-colors">
                    {item.step}
                  </span>
                  <div className="w-8 md:w-12 h-0.5 bg-[#f8f7eb]"></div>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-[#0b2a4a] mb-2 md:mb-4">
                  {item.title}
                </h3>

                <p className="text-sm md:text-base text-[#2f6f7e] leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY IT WORKS: BENTO GRID ================= */}
      <section className="bg-white py-12 md:py-20 px-4 md:px-6 border-y border-[#0b2a4a]/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-[#0b2a4a] tracking-tight">Why It Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[
              "Pedagogy over Marketing",
              "Long-term Retention Focus",
              "Data-Driven Feedback Loops",
            ].map((point) => (
              <div
                key={point}
                className="bg-[#f8f7eb] rounded-xl md:rounded-2xl p-4 md:p-6 flex items-center justify-center text-center border border-[#1f4f5a]/10"
              >
                <p className="font-bold text-[#0b2a4a] uppercase text-[10px] md:text-xs tracking-widest">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= JOURNEY: CLEAN TIMELINE ================= */}
      <section className="py-12 md:py-20 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-[#0b2a4a] text-center mb-10 md:mb-12 tracking-tight">
            The Student Journey
          </h2>

          <div className="space-y-3 md:space-y-4">
            {[
              "Enroll in an expert-led batch",
              "Attend concept-driven video sessions",
              "Master practice problems in real-time",
              "Resolve doubts via 1-on-1 support",
              "Reinforce via revision modules",
              "Apply with professional confidence",
            ].map((step, index) => (
              <div
                key={index}
                className="flex items-center gap-4 md:gap-6 bg-white p-4 md:p-6 rounded-xl md:rounded-2xl border border-[#0b2a4a]/5 shadow-sm group hover:border-[#1f4f5a] transition-all"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-lg md:rounded-xl bg-[#0b2a4a] text-[#f2f1d5] flex items-center justify-center font-black text-xs md:text-sm group-hover:bg-[#1f4f5a] transition-colors">
                  {index + 1}
                </div>
                <p className="text-[#0b2a4a] font-bold text-base md:text-lg tracking-tight">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA: PREMIUM BANNER ================= */}
      <section className="px-4 md:px-6 pb-16 md:pb-20">
        <div className="max-w-6xl mx-auto bg-[#0b2a4a] rounded-[2rem] md:rounded-[3rem] py-12 md:py-16 px-6 md:px-8 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-[#1f4f5a] to-transparent opacity-40"></div>
          
          <div className="relative z-10">
            <h3 className="text-2xl md:text-5xl font-black text-white mb-4 md:mb-6 tracking-tight">
              Ready for mastery?
            </h3>
            <p className="text-[#6fa6b2] text-sm md:text-lg mb-8 md:mb-10 max-w-xl mx-auto font-medium">
              Join a community that values quality over quantity.
            </p>
            <a
              href="/#courses"
              className="inline-block bg-[#f2f1d5] text-[#0b2a4a] px-8 py-3 md:px-10 md:py-4 rounded-xl md:rounded-2xl font-black uppercase text-xs md:text-sm tracking-widest hover:bg-white transition-all active:scale-95"
            >
              Explore Batches
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}