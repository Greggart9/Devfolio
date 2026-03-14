"use client";
import Image from "next/image";
import { useState } from "react";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section id="testimonials" className="py-28 md:py-36 relative">
      <div className="blob bg-[#00ff88]/5 w-[400px] h-[400px] bottom-0 left-0"/>
      <div className="max-w-6xl mx-auto px-6 md:px-10 relative z-10">

        <div className="reveal mb-14">
          <p className="text-[10px] font-mono text-[#00ff88] uppercase tracking-widest mb-3">// social proof</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">WHAT CLIENTS <span className="g-text">SAY</span></h2>
        </div>

        {/* Active quote */}
        <div className="reveal code-card p-8 md:p-12 mb-6 min-h-[200px] flex flex-col justify-between">
          {/* Terminal header */}
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[#1c1c24]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]"/>
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]"/>
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]"/>
            <span className="ml-2 text-[#333] text-xs font-mono">testimonial.log</span>
          </div>

          <p className="font-mono text-base md:text-lg text-[#aaa] leading-relaxed mb-8 italic">
            <span className="text-[#00ff88]">&gt; </span>&ldquo;{testimonials[active].quote}&rdquo;
          </p>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-[#00ff88]/20 flex-shrink-0">
              <Image
                src={testimonials[active].avatar}
                alt={testimonials[active].name}
                width={40} height={40}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <p className="text-white font-medium text-sm">{testimonials[active].name}</p>
              <p className="text-[#444] text-xs font-mono">{testimonials[active].role} · {testimonials[active].company}</p>
            </div>
            <div className="ml-auto flex gap-1">
              {[...Array(5)].map((_,i) => (
                <span key={i} className="text-[#00ff88] text-xs">★</span>
              ))}
            </div>
          </div>
        </div>

        {/* Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`reveal d${i+1} text-left code-card rounded-2xl p-5 transition-all duration-300 lift ${
                active === i
                  ? "border-[#00ff88]/30 bg-[#00ff88]/3"
                  : "hover:border-[#1c1c24]"
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-[#00ff88]/15 flex-shrink-0">
                  <Image src={t.avatar} alt={t.name} width={32} height={32} className="object-cover w-full h-full"/>
                </div>
                <div>
                  <p className="text-white text-xs font-medium leading-tight">{t.name}</p>
                  <p className="text-[#333] text-[10px] font-mono">{t.company}</p>
                </div>
              </div>
              <p className="text-[#444] text-xs leading-relaxed line-clamp-2 font-mono">&ldquo;{t.quote}&rdquo;</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
