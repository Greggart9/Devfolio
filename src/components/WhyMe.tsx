import { whyMe } from "@/lib/data";

export default function WhyMe() {
  return (
    <section id="why" className="py-28 md:py-36 relative">
      <div className="blob bg-[#00c4ff]/5 w-[450px] h-[450px] top-0 right-0"/>
      <div className="max-w-[1380px] mx-auto px-6 md:px-10 relative z-10">

        <div className="reveal mb-14">
          <p className="text-[10px] font-mono text-[#00ff88] uppercase tracking-widest mb-3">// differentiators</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">WHY CHOOSE <span className="g-text">ME?</span></h2>
          <p className="text-[#444] text-sm mt-3 max-w-md font-mono">There are a lot of developers out there. Here&apos;s what sets my work apart.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#111] rounded-3xl overflow-hidden">
          {whyMe.map((item, i) => (
            <div
              key={item.num}
              className={`reveal d${(i % 3) + 1} bg-[#060608] p-8 hover:bg-[#0a0a0e] transition-colors group`}
            >
              <div className="font-mono text-4xl font-bold text-[#111] group-hover:text-[#00ff88]/10 transition-colors mb-5 select-none">
                {item.num}
              </div>
              <h3 className="font-display text-base font-bold text-white mb-3 group-hover:text-[#00ff88] transition-colors">
                {item.title}
              </h3>
              <p className="text-[#444] text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
