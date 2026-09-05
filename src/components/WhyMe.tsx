import { whyMe } from "@/lib/data";

export default function WhyMe() {
  return (
    <section id="why" className="py-28 md:py-36 relative">
      <div className="blob bg-[var(--accent2)]/5 w-[450px] h-[450px] top-0 right-0"/>
      <div className="max-w-[1380px] mx-auto px-6 md:px-10 relative z-10">

        <div className="reveal mb-14">
          <p className="text-[10px] font-mono text-[var(--accent)] uppercase tracking-widest mb-3">// differentiators</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">WHY CHOOSE <span className="g-text">ME?</span></h2>
          <p className="text-[var(--color-fade-text)] text-sm mt-3 max-w-md font-mono">There are a lot of developers out there. Here&apos;s what sets my work apart.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--color-border)] rounded-3xl overflow-hidden">
          {whyMe.map((item, i) => (
            <div
              key={item.num}
              className={`reveal d${(i % 3) + 1} bg-[var(--color-bg-primary)] p-8 hover:bg-[var(--color-code-bg)] transition-all duration-200 group cursor-default`}
            >
              <div className="font-mono text-4xl font-bold text-[var(--color-border)] group-hover:text-[var(--accent)]/10 transition-colors duration-200 mb-5 select-none">
                {item.num}
              </div>
              <h3 className="font-display text-base font-bold text-[var(--color-text-primary)] mb-3 group-hover:text-[var(--accent)] transition-colors duration-200">
                {item.title}
              </h3>
              <p className="text-[var(--color-fade-text)] text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
