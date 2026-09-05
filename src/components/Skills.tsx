import { services } from "@/lib/data";
export default function Services() {
  return (
    <section id="skills" className="py-28 md:py-36 relative">
      <div className="blob bg-[var(--accent)]/5 w-[500px] h-[500px] bottom-0 -left-40"/>
      <div className="max-w-[1380px] mx-auto px-6 md:px-10 relative z-10">
        <div className="reveal mb-14">
          <p className="text-[10px] font-mono text-[var(--accent)] uppercase tracking-widest mb-3">// what I build</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">MY <span className="g-text">SKILLS</span></h2>
          <p className="text-[var(--color-fade-text)] text-sm mt-3 max-w-md font-mono">End-to-end development for teams who care about quality and speed.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {services.map((s,i)=>(
            <div key={s.title} className={`reveal d${(i%3)+1} code-card p-7 lift  transition-all duration-200 group cursor-default`}>
              <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/5  flex items-center justify-center mb-5 group-hover:bg-[var(--accent)]/10 group-hover:border-[var(--accent)]/30 transition-all duration-200">
                <span className="text-[var(--accent)] text-lg transition-transform duration-200 group-hover:scale-110">{s.icon}</span>
              </div>
              <h3 className="font-display text-base font-bold text-[var(--color-text-primary)] mb-3 group-hover:text-[var(--accent)] transition-colors duration-200">{s.title}</h3>
              <p className="text-[var(--color-fade-text)] text-sm leading-relaxed mb-5">{s.desc}</p>
              <div className="flex flex-wrap gap-2">
                {s.tools.map(t=>(
                  <span key={t} className="text-[10px] font-mono border border-[var(--color-border)] text-[var(--color-subtle)] px-2.5 py-1 rounded-full group-hover:border-[var(--accent)]/15 transition-colors duration-200">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
