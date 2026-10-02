"use client";

import { motion } from "framer-motion";
import { whyMe } from "@/lib/data";
import { Sparkles, ShieldCheck } from "lucide-react";

export default function WhyMe() {
  return (
    <section id="why" className="py-28 md:py-36 relative">
      <div className="blob bg-[var(--accent2)]/10 w-[450px] h-[450px] top-0 right-0 pointer-events-none" />

      <div className="max-w-[1380px] mx-auto px-6 md:px-10 relative z-10">

        {/* Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[var(--accent)] font-mono text-xs mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DIFFERENTIATORS</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight">
            WHY WORK WITH <span className="g-text">ME?</span>
          </h2>
          <p className="text-[var(--color-text-secondary)] text-sm md:text-base mt-3 max-w-md font-mono">
            Here's what sets my execution and engineering standards apart.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyMe.map((item, i) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              whileHover={{ y: -6 }}
              className="p-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] backdrop-blur-md hover:border-[var(--accent)]/40 hover:shadow-[0_15px_35px_rgba(0,255,136,0.08)] transition-all group relative overflow-hidden"
            >
              {/* Card Number */}
              <div className="font-mono text-4xl font-extrabold text-[var(--color-border)] group-hover:text-[var(--accent)]/30 transition-colors mb-4">
                {item.num}
              </div>

              <h3 className="font-display text-lg font-bold text-white mb-3 group-hover:text-[var(--accent)] transition-colors">
                {item.title}
              </h3>

              <p className="text-[var(--color-text-secondary)] text-xs leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
