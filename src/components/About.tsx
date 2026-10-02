"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, FileText, CheckCircle2, Award } from "lucide-react";
import { fireConfetti } from "@/lib/utils";
import { RevealLine, FadeUp } from "./KineticText";

export default function About() {
  return (
    <section id="about" className="py-20 md:py-25 lg:py-34 relative overflow-hidden">
      {/* Ambient background blur */}
      <div className="blob bg-[var(--accent)]/10 w-[450px] h-[450px] top-0 right-0 pointer-events-none" />

      <div className="max-w-[1380px] mx-auto px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* Portrait Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="lg:col-span-5 relative max-w-md mx-auto lg:mx-0 w-full"
          >
            <div className="relative rounded-2xl overflow-hidden border border-[var(--color-border)] shadow-[0_20px_50px_rgba(0,0,0,0.08)] aspect-[3/4] group">
              <Image
                src="https://res.cloudinary.com/degearesj/image/upload/v1787267525/Pfp_grnrga.png"
                alt="Olúwadámiláre Ogundare"
                fill
                sizes="(max-width: 768px) 100vw, 420px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] via-transparent to-transparent opacity-80" />
            </div>

            {/* Corner Accent Orbs */}
            <div className="absolute -top-4 -left-4 w-20 h-20 rounded-2xl border border-[var(--accent)]/30 bg-[var(--accent)]/10 backdrop-blur-md pointer-events-none -z-10" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full border border-[var(--accent2)]/30 bg-[var(--accent2)]/10 backdrop-blur-md pointer-events-none -z-10" />

            {/* Floating Experience Card */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="absolute -bottom-6 left-6 glass border border-[var(--color-border)] rounded-2xl p-4 shadow-xl backdrop-blur-xl bg-[var(--color-bg-surface)]/90"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/15 border border-[var(--accent)]/30 flex items-center justify-center text-[var(--accent)] font-bold">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-[var(--accent)] uppercase font-semibold">EXPERIENCE</p>
                  <p className="text-xl font-display font-extrabold text-[var(--color-text-primary)]">
                    3+ <span className="text-xs font-normal text-[var(--color-text-secondary)]">years</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Text Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            <div>
              <FadeUp delay={0.05} y={12}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[var(--accent)] font-mono text-xs mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>ABOUT ME</span>
                </div>
              </FadeUp>

              <h2 className="font-display text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
                <RevealLine delay={0.12} duration={0.65}>
                  <span>Code that's clean,</span>
                </RevealLine>
                <RevealLine delay={0.22} duration={0.65}>
                  <span className="g-text">fast & production-ready.</span>
                </RevealLine>
              </h2>
            </div>

            <FadeUp delay={0.28} y={15}>
              <p className="text-slate-800 text-base md:text-lg leading-relaxed font-medium">
                I'm Olúwadámiláre Ogundare — a Frontend Engineer dedicated to building interfaces that look incredible and load instantly. I bridge design aesthetics with scalable engineering.
              </p>
            </FadeUp>

            <FadeUp delay={0.34} y={15}>
              <p className="text-slate-600 text-sm md:text-[15px] leading-relaxed">
                Over the last 3+ years, I've engineered full-stack SaaS applications, e-commerce storefronts, AI resume platforms, and creative agency sites. I build with Next.js, write strictly typed TypeScript, and optimize for Core Web Vitals.
              </p>
            </FadeUp>

            {/* Highlights */}
            <FadeUp delay={0.4} y={15}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-2">
                {[
                  "Pixel-Perfect UI Execution",
                  "App Router & Server Actions",
                  "Sub-300ms Fluid Animations",
                  "100% Responsive & Accessible",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/80 border border-slate-200/90 shadow-2xs text-xs sm:text-[13px] font-mono font-medium text-slate-800"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#3B82F6] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </FadeUp>

            {/* Resume CTA */}
            <FadeUp delay={0.46} y={15}>
              <div className="pt-4">
                <a
                  href="https://docs.google.com/document/d/1-ueGgt97JmLLSbXA332Heyxcb5Q2HGiqcsIMSbmqOhg/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={fireConfetti}
                  data-cursor-text="RESUME"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#3B82F6] hover:bg-blue-600 text-white text-xs font-mono font-bold tracking-wider uppercase shadow-md shadow-blue-500/25 active:scale-95 transition-all"
                >
                  <FileText className="w-4 h-4" />
                  <span>$ View Full Resume</span>
                </a>
              </div>
            </FadeUp>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
