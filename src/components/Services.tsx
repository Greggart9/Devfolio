import { services } from "@/lib/data";
export default function Services() {
  return (
    <section id="services" className="py-28 md:py-36 relative">
      <div className="blob bg-[#00ff88]/5 w-[500px] h-[500px] bottom-0 -left-40"/>
      <div className="max-w-[1380px] mx-auto px-6 md:px-10 relative z-10">
        <div className="reveal mb-14">
          <p className="text-[10px] font-mono text-[#00ff88] uppercase tracking-widest mb-3">// what I build</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">MY <span className="g-text">SERVICES</span></h2>
          <p className="text-[#444] text-sm mt-3 max-w-md font-mono">End-to-end development for teams who care about quality and speed.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s,i)=>(
            <div key={s.title} className={`reveal d${(i%3)+1} code-card p-7 lift hover:border-[#00ff88]/25 transition-colors group`}>
              <div className="w-12 h-12 rounded-xl bg-[#00ff88]/5 border border-[#00ff88]/15 flex items-center justify-center mb-5 group-hover:bg-[#00ff88]/10 transition-colors">
                <span className="text-[#00ff88] text-lg">{s.icon}</span>
              </div>
              <h3 className="font-display text-base font-bold text-white mb-3 group-hover:text-[#00ff88] transition-colors">{s.title}</h3>
              <p className="text-[#444] text-sm leading-relaxed mb-5">{s.desc}</p>
              <div className="flex flex-wrap gap-2">
                {s.tools.map(t=>(
                  <span key={t} className="text-[10px] font-mono border border-[#1c1c24] text-[#333] px-2.5 py-1 rounded-full group-hover:border-[#00ff88]/15 transition-colors">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
