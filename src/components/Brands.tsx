import { brands } from "@/lib/data";
export default function Brands() {
  const loop = [...brands,...brands,...brands,...brands];
  return (
    <section className="py-12 border-y border-[var(--color-border)] overflow-hidden" style={{maskImage:"linear-gradient(90deg,transparent,black 8%,black 92%,transparent)"}}>
      <p className="text-center text-[10px] font-mono text-[var(--color-fade-text)] uppercase tracking-widest mb-7">Tools & platforms I build with</p>
      <div className="flex gap-14 animate-marquee w-max">
        {loop.map((b,i)=>(
          <span key={i} className="flex-shrink-0 font-mono text-[var(--color-border)] text-base font-semibold tracking-widest hover:text-[var(--accent)]/40 transition-colors select-none uppercase">{b}</span>
        ))}
      </div>
    </section>
  );
}
