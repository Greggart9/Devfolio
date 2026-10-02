"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqs, faqCategories, FaqCategory } from "@/lib/data";
import { Plus, Minus, Copy, Check } from "lucide-react";
import { fireConfetti } from "@/lib/utils";
import { RevealLine, FadeUp } from "./KineticText";

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState<FaqCategory>("General");
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const currentFaqs = faqs.filter((f) => f.category === activeCategory);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("oluwadamilare.greggart9@gmail.com");
    setCopied(true);
    fireConfetti();
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCategoryChange = (cat: FaqCategory) => {
    setActiveCategory(cat);
    setOpenQuestion(null);
  };

  return (
    <section id="faq" className="py-20 md:py-25 lg:py-34 relative">
      <div className="max-w-[660px] mx-auto px-4">
        
        {/* Centered Headline */}
        <div className="text-center mb-6 md:mb-8">
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-none">
            <RevealLine>FAQ</RevealLine>
          </h2>
          <FadeUp delay={0.12} y={12}>
            <p className="font-mono text-xs sm:text-sm text-slate-500 mt-2">
              Common questions answered with complete clarity.
            </p>
          </FadeUp>
        </div>

        {/* ── Main Compact Rounded FAQ Container Card ── */}
        <div className="rounded-3xl bg-white/95 backdrop-blur-2xl border border-slate-200/90 p-4 sm:p-6 shadow-[0_10px_35px_rgba(0,0,0,0.06)]">
          
          {/* Categories Pill Navigation Tabs */}
          <div className="flex items-center justify-center gap-1.5 mb-4 flex-wrap">
            {faqCategories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`relative px-3.5 py-1.5 rounded-full font-mono text-[11px] transition-all active:scale-95 ${
                    isActive
                      ? "text-white font-semibold shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFaqTabPill"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                      className="absolute inset-0 rounded-full bg-[var(--accent)] shadow-md shadow-[var(--accent)]/30"
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>

          {/* ── Staircase Cascading Drop Question List ── */}
          <div className="space-y-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-2"
              >
                {currentFaqs.map((faq, index) => {
                  const isOpen = openQuestion === faq.q;

                  return (
                    <motion.div
                      key={faq.q}
                      variants={{
                        hidden: {
                          opacity: 0,
                          y: -16, // Snappy staircase drop
                        },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: 0.3,
                            delay: index * 0.07, // Snappy cascade: 0s, 0.07s, 0.14s, 0.21s
                            ease: [0.22, 1, 0.36, 1],
                          },
                        },
                        exit: {
                          opacity: 0,
                          y: 8,
                          transition: {
                            duration: 0.12,
                            delay: index * 0.015,
                          },
                        },
                      }}
                      className="rounded-2xl bg-slate-50/80 hover:bg-slate-100/90 border border-slate-200/80 transition-colors overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenQuestion(isOpen ? null : faq.q)}
                        className="w-full flex items-center justify-between p-3.5 sm:p-4 text-left group"
                      >
                        <span className={`text-xs sm:text-sm font-mono transition-colors pr-3 ${
                          isOpen ? "text-slate-900 font-bold" : "text-slate-800 font-medium group-hover:text-slate-950"
                        }`}>
                          {faq.q}
                        </span>

                        <div className="w-5 h-5 rounded-full bg-slate-200/70 group-hover:bg-slate-300/80 flex items-center justify-center shrink-0 text-slate-700 transition-all">
                          {isOpen ? (
                            <Minus className="w-3 h-3" />
                          ) : (
                            <Plus className="w-3 h-3" />
                          )}
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                          >
                            <div className="px-3.5 sm:px-4 pb-3.5 pt-0 text-[11px] sm:text-xs font-mono text-slate-700 leading-relaxed border-t border-slate-200/60 pt-2.5">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Bottom Sub-Card: Avatar Stack & Direct Reachout ── */}
          <div className="mt-4 rounded-2xl bg-slate-50 border border-slate-200 p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {/* Overlapping Avatar Stack */}
              <div className="flex -space-x-2 overflow-hidden">
                <img
                  className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80&fit=crop&crop=face"
                  alt="Team member"
                />
                <img
                  className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80&fit=crop&crop=face"
                  alt="Team member"
                />
                <img
                  className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&q=80&fit=crop&crop=face"
                  alt="Team member"
                />
              </div>
              <div>
                <p className="text-[11px] font-mono text-slate-600">
                  More questions? Reach out anytime.
                </p>
              </div>
            </div>

            {/* Email Copy Pill */}
            <button
              onClick={handleCopyEmail}
              data-cursor-text="COPY"
              className="px-3 py-1.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-[11px] font-mono text-slate-800 flex items-center gap-2 transition-all active:scale-95 shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-[var(--accent)]" />
                  <span>oluwadamilare.greggart9@gmail.com</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
