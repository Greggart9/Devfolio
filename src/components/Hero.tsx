"use client";
import { useEffect, useState } from "react";

const roles = ["Frontend Engineer","React Developer","Wordpress Developer","Open Source Contributor"];

const codeSnippet = `const Olúwadámiláre = {
  role: "Frontend Engineer",
  stack: ["Next.js","TypeScript","React"],
  passion: "building fast products",
  available: true,
};`;

export default function Hero() {
  const [idx, setIdx]     = useState(0);
  const [show, setShow]   = useState(false);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    setTimeout(() => setShow(true), 80);
    const t = setInterval(() => setIdx(i => (i+1)%roles.length), 2800);
    return () => clearInterval(t);
  }, []);

  // Typewriter for code snippet
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i++;
      setTyped(codeSnippet.slice(0, i));
      if (i >= codeSnippet.length) clearInterval(t);
    }, 18);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-16 overflow-hidden dot-grid">
      {/* Blobs */}
      <div className="blob bg-[var(--accent)]/10  w-[500px] h-[500px] -top-40 -left-40"/>
      <div className="blob bg-[var(--accent2)]/10  w-[400px] h-[400px] -bottom-20 -right-20"/>

      {/* Decorative rings */}
      <div className="absolute top-28 right-16 md:right-28 w-28 h-28 rounded-full border border-[var(--accent)]/40 animate-spin-slow"/>
      <div className="absolute top-32 right-20 md:right-32 w-16 h-16 rounded-full border border-[var(--accent2)]/40 animate-spin-slow" style={{animationDirection:"reverse",animationDuration:"13s"}}/>

      <div className="relative z-10 max-w-[1380px] mx-auto px-6 md:px-10 w-full py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left */}
          <div className="pt-10">
            {/* Status badge */}
            <div className={`inline-flex items-center gap-2 border border-[var(--accent)]/25 bg-[var(--accent)]/5 rounded-full px-4 py-1.5 mb-7 transition-all duration-700 ${show?"opacity-100 translate-y-0":"opacity-0 translate-y-4"}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-glow"/>
              <span className="text-[var(--accent)] text-xs font-mono">Available for Full-Time Roles</span>
            </div>

            <h1 className={`font-display text-[clamp(2rem,4.2vw,4.5rem)] font-bold leading-[1.1] tracking-tight mb-5 transition-all duration-700 delay-100 ${show?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`}>
              CRAFTING <span className="g-text">HIGH-PERFORMANCE</span><br/>
              WEB EXPERIENCES
            </h1>

            <div className={`flex items-center gap-2 mb-7 transition-all duration-700 delay-200 ${show?"opacity-100":"opacity-0"}`}>
              <span className="text-[var(--color-text-muted)] text-sm font-mono">//</span>
              <span key={idx} className="text-[var(--accent2)] text-sm font-mono animate-fade-in">{roles[idx]}</span>
            </div>

            {/* <p className={`text-[#666] text-base md:text-lg leading-relaxed max-w-xl mb-9 transition-all duration-700 delay-300 ${show?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`}>
              I'm Olúwadámiláre, a frontend engineer with 3+ years of experience building fast, scalable web applications. I bridge the gap between design and robust architecture, using my knowledge of backend systems to build cleaner, more integrated, and maintainable user interfaces.
            </p> */}

            <div className={`flex flex-wrap gap-4 mb-12 transition-all duration-700 delay-400 ${show?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`}>
              <a href="/#contact" className="btn-shimmer px-7 py-3.5 rounded-full text-sm font-mono transition-all duration-100 active:scale-95 hover:shadow-lg hover:shadow-[var(--accent)]/20">$ Let's connect</a>
              <a href="/#projects" className="btn-outline px-7 py-3.5 rounded-full text-sm font-mono transition-all duration-200 active:scale-95 hover:shadow-lg hover:shadow-[var(--accent)]/10">view projects</a>
            </div>

            {/* Stats */}
            <div className={`flex gap-10 transition-all duration-700 delay-500 ${show?"opacity-100":"opacity-0"}`}>
              {[["3+","Years"],["6+","Projects"],["99%","Delivery"]].map(([v,l])=>(
                <div key={l}>
                  <div className="font-display text-2xl font-bold g-text">{v}</div>
                  <div className="text-[var(--color-text-muted)] text-xs mt-0.5 font-mono">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — code card */}
          <div className={`transition-all duration-1000 pt-20 delay-300 ${show?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}>
            <div className="code-card relative overflow-hidden rounded-2xl p-0 scanline">
              {/* Window chrome */}
              <div className="flex items-center gap-2 px-5 py-4 border-b border-[var(--color-border)]">
                <span className="w-3 h-3 rounded-full bg-[#ff5f57]"/>
                <span className="w-3 h-3 rounded-full bg-[#febc2e]"/>
                <span className="w-3 h-3 rounded-full bg-[#28c840]"/>
                <span className="ml-3 text-[var(--color-text-muted)] text-xs font-mono">Olúwadámiláre.tsx</span>
              </div>

              {/* Code */}
              <pre className="p-6 text-sm font-mono leading-loose overflow-x-auto min-h-[220px]">
                <code>
                  {typed.split("\n").map((line, i) => (
                    <div key={i} className="flex">
                      <span className="text-[var(--color-fade-text)] w-6 flex-shrink-0 select-none text-right mr-4 text-xs">{i+1}</span>
                      <span dangerouslySetInnerHTML={{ __html: line
                        .replace(/(".*?")/g, '<span style="color:var(--accent)">$1</span>')
                        .replace(/\b(const|true|false)\b/g, '<span style="color:var(--accent2)">$1</span>')
                        .replace(/\b(role|stack|passion|available)\b/g, '<span style="color:var(--color-purple-accent)">$1</span>')
                      }}/>
                    </div>
                  ))}
                  {typed.length < codeSnippet.length && <span className="animate-blink text-[var(--accent)]">▌</span>}
                </code>
              </pre>

              {/* Floating tech chips */}
              <div className="px-5 pb-5 flex flex-wrap gap-2">
                {["React","Next.js","TypeScript","Tailwind","Framer Motion","PostgreSQL"].map(t=>(
                  <span key={t} className="text-[10px] font-mono border border-[var(--color-border)] text-[var(--color-fade-text)] px-2.5 py-1 rounded-full hover:border-[var(--accent)]/30 hover:text-[var(--accent)] transition-colors">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Floating badges */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="glass border border-[var(--color-border)] rounded-xl p-4 hover:border-[var(--accent)]/20 transition-colors">
                <p className="text-[10px] font-mono text-[var(--color-text-muted)] mb-1">LATEST COMMIT</p>
                <p className="text-white text-sm font-mono">feat: add WebSocket layer</p>
                <p className="text-[var(--accent)] text-[10px] font-mono mt-0.5">2 hours ago</p>
              </div>
              <div className="glass border border-[var(--color-border)] rounded-xl p-4 hover:border-[var(--accent2)]/20 transition-colors">
                <p className="text-[10px] font-mono text-[var(--color-text-muted)] mb-1">CURRENT STACK</p>
                <p className="text-white text-sm font-mono">Next.js 16 + tRPC</p>
                <p className="text-[var(--accent2)] text-[10px] font-mono mt-0.5">App Router ✓</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--color-fade-text)] text-xs font-mono animate-fade-in">
        
        <div className="w-px h-10 bg-gradient-to-b from-[var(--accent)] to-transparent"/>
      </div>
    </section>
  );
}
