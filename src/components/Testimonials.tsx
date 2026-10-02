"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "@/lib/data";
import { Sparkles, Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { fireConfetti } from "@/lib/utils";

export default function Testimonials() {
  const [active, setActive] = useState(0);

  const next = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-28 md:py-36 relative">
      <div className="blob bg-[var(--accent)]/10 w-[450px] h-[450px] bottom-0 left-0 pointer-events-none" />

      <div className="max-w-[1380px] mx-auto px-6 md:px-10 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[var(--accent)] font-mono text-xs mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SOCIAL PROOF</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight">
              WHAT CLIENTS <span className="g-text">SAY</span>
            </h2>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              className="p-3 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)] hover:text-white hover:border-[var(--accent)] transition-all active:scale-90"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              className="p-3 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)] hover:text-white hover:border-[var(--accent)] transition-all active:scale-90"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Featured Testimonial Card */}
        <div className="p-8 md:p-12 rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] backdrop-blur-xl shadow-2xl relative overflow-hidden mb-8">
          <Quote className="absolute top-6 right-8 w-24 h-24 text-[var(--accent)]/10 pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
              className="space-y-6"
            >
              {/* Stars */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[var(--accent)] fill-[var(--accent)]" />
                ))}
              </div>

              <blockquote className="font-mono text-lg md:text-xl text-white leading-relaxed font-medium">
                "{testimonials[active].quote}"
              </blockquote>

              <div className="flex items-center gap-4 pt-4 border-t border-[var(--color-border)]">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[var(--accent)]/40 shadow-md">
                  <Image
                    src={testimonials[active].avatar}
                    alt={testimonials[active].name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-white font-bold text-base">{testimonials[active].name}</h4>
                  <p className="text-[var(--accent2)] text-xs font-mono">
                    {testimonials[active].role} · {testimonials[active].company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Testimonial Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t, i) => {
            const isActive = active === i;
            return (
              <button
                key={i}
                onClick={() => {
                  setActive(i);
                  fireConfetti();
                }}
                className={`p-5 rounded-2xl border text-left transition-all ${
                  isActive
                    ? "border-[var(--accent)] bg-[var(--accent)]/10 shadow-[0_0_20px_rgba(0,255,136,0.15)]"
                    : "border-[var(--color-border)] bg-[var(--color-bg-surface)] hover:border-[var(--color-border)]/80"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20">
                    <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="text-white text-xs font-bold">{t.name}</p>
                    <p className="text-[var(--color-text-muted)] text-[10px] font-mono">{t.company}</p>
                  </div>
                </div>
                <p className="text-[var(--color-text-secondary)] text-xs font-mono line-clamp-2">
                  "{t.quote}"
                </p>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
