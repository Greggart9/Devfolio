import Image from "next/image";
import { skills } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="py-28 md:py-36 relative">
      <div className="blob bg-[var(--accent)]/6 w-[450px] h-[450px] top-0 right-0"/>
      <div className="max-w-[1380px] mx-auto px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Portrait */}
          <div className="reveal relative max-w-sm mx-auto lg:mx-0">
            <div className="rounded-2xl overflow-hidden zoom aspect-[3/4] border border-[var(--color-border)]">
              <Image src="https://res.cloudinary.com/degearesj/image/upload/v1787267525/Pfp_grnrga.png" alt="Olúwadámiláre Ogundare" fill className="object-cover"/>
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)]/60 to-transparent"/>
            </div>
            {/* Corner decoration */}
            <div className="absolute -top-3 -left-3 w-16 h-16 rounded-xl border border-[var(--accent)]/15 bg-[var(--accent)]/3"/>
            <div className="absolute -bottom-3 -right-3 w-10 h-10 rounded-full border border-[var(--accent2)]/15"/>
            {/* Floating card */}
            <div className="absolute -bottom-4 left-4 glass border border-[var(--color-border)] rounded-xl p-4">
              <p className="text-[10px] font-mono text-[var(--accent)] mb-0.5">EXPERIENCE</p>
              <p className="text-xl font-display font-bold text-[var(--color-text-primary)]">3+ <span className="text-sm font-normal text-[var(--color-text-primary)]">years</span></p>
            </div>
          </div>

          {/* Text */}
          <div className="reveal d2 space-y-6">
            <div>
              <p className="text-[10px] font-mono text-[var(--accent)] uppercase tracking-widest mb-3">// about me</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
                Code that&apos;s clean,<br/><span className="g-text">fast & readable.</span>
              </h2>
            </div>

            <p className="text-[var(--color-text-tertiary)] leading-relaxed">
              I&apos;m Olúwadámiláre Ogundare — a Frontend Engineer who believes the best code is the code you never have to explain. I care about performance, accessibility, and developer experience in equal measure.
            </p>
            <p className="text-[var(--color-fade-text)] text-sm leading-relaxed">
              I've architected and built a range of complex applications - from fintech-style dashboards to Web3 interfaces and experimental tools. I write in TypeScript, think in systems, and ship on Fridays.
            </p>

            {/* Skill bars */}
            <div className="space-y-3.5 pt-1">
              {skills.map(s=>(
                <div key={s.label}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-[var(--color-text-tertiary)] font-mono">{s.label}</span>
                    <span className="text-[var(--color-subtle)] font-mono">{s.pct}%</span>
                  </div>
                  <div className="h-px bg-[var(--color-border)] rounded-full overflow-hidden">
                    <div className="pbar h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)]" style={{"--w":`${s.pct}%`} as React.CSSProperties}/>
                  </div>
                </div>
              ))}
            </div>

            <a href="https://docs.google.com/document/d/15r1EynvQedLbK33Ajb6rcDsY7rWMPZUH" className="inline-flex items-center gap-2 btn-shimmer px-7 py-3.5 rounded-full text-sm font-mono mt-2 transition-all duration-100 active:scale-95 hover:shadow-lg hover:shadow-[var(--accent)]/20">$ View resume</a>
          </div>
        </div>
      </div>
    </section>
  );
}
