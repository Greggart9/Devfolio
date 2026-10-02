"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { services } from "@/lib/data";
import { Sparkles } from "lucide-react";
import FallingSkills from "@/components/FallingSkills";
import { RevealLine, FadeUp } from "./KineticText";

export default function Services() {
  return (
    <section id="skills" className="py-20 md:py-25 lg:py-34  relative">
      {/* Background ambient glow */}
      <div className="blob bg-[var(--accent)]/10 w-[500px] h-[500px] bottom-0 -left-40 pointer-events-none" />

      <div className="max-w-[1380px] mx-auto px-6 md:px-10 relative z-10">

        {/* Section Header */}
        <div className="mb-10 md:mb-12">
          <FadeUp delay={0.05} y={12}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[var(--accent)] font-mono text-xs mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>TECHNICAL CAPABILITIES</span>
            </div>
          </FadeUp>

          <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight">
            <RevealLine delay={0.12} duration={0.65}>
              <span>SKILLS & <span className="g-text">SERVICES</span></span>
            </RevealLine>
          </h2>

          <FadeUp delay={0.2} y={15}>
            <p className="text-slate-600 text-sm md:text-base mt-2 max-w-xl font-mono">
              Interactive skill stack and modern digital engineering capabilities.
            </p>
          </FadeUp>
        </div>

        {/* ── Interactive Physics Falling Skill Tags ── */}
        <FallingSkills />

        {/* ── Section Subheader for Services ── */}
        <div className="mb-8 pt-4">
          <h3 className="font-display text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            <RevealLine delay={0.1} duration={0.65}>
              <span>CORE <span className="g-text">SERVICES</span></span>
            </RevealLine>
          </h3>

          <FadeUp delay={0.18} y={12}>
            <p className="text-slate-600 text-xs md:text-sm mt-1 font-mono">
              Production-ready services engineered for high velocity and scalability.
            </p>
          </FadeUp>
        </div>

        {/* ── Core Services Cards Grid (Upper Image + Lower Description) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 35, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.55,
                delay: i * 0.09,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              whileHover={{ y: -6 }}
              className="group relative rounded-2xl md:rounded-3xl border border-slate-200/90 bg-white shadow-[0_4px_25px_rgba(0,0,0,0.04)] hover:border-[#3b82f6]/40 hover:shadow-[0_20px_45px_rgba(59,130,246,0.12)] transition-all duration-300 flex flex-col justify-between cursor-default overflow-hidden"
            >
              {/* ── Upper Part: AI Generated Visual ── */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                
          
              </div>

              {/* ── Lower Part: Title, Description & Tech Pills ── */}
              <div className="p-5 md:p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-display text-lg md:text-xl font-bold text-slate-900 group-hover:text-[var(--accent)] transition-colors tracking-tight mb-2">
                    {s.title}
                  </h3>
                  
                  <p className="text-slate-600 text-xs sm:text-[13px] font-mono leading-relaxed mb-5">
                    {s.desc}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3.5 border-t border-slate-200/70">
                  {s.tools.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-slate-100/70 border border-slate-200/90 text-slate-700 group-hover:border-slate-300 group-hover:text-slate-950 transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
