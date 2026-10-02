"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Check, Zap, Layers, ShieldCheck, Clock } from "lucide-react";
import { fireConfetti } from "@/lib/utils";
import { RevealLine, FadeUp } from "./KineticText";

const ENGAGEMENT_OPTIONS = [
  "Full-Time Role",
  "Contract / Project",
  "Codebase Audit",
  "Consultation",
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [selectedEngagement, setSelectedEngagement] = useState<string | null>(null);
  const [agreed, setAgreed] = useState(true);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  });

  const isNameValid = form.name.trim().length >= 5;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(form.email.trim());
  const isMessageValid = form.message.trim().length >= 5;
  const isEngagementValid = selectedEngagement !== null;

  const isFormValid =
    isNameValid &&
    isEmailValid &&
    isMessageValid &&
    isEngagementValid &&
    agreed;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || loading) return;
    setLoading(true);

    try {
      const detailedMessage = `
Engagement Type: ${selectedEngagement}

Message:
${form.message}
      `.trim();

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: detailedMessage,
        }),
      });

      if (!res.ok) throw new Error("Failed to send message");

      setSent(true);
      fireConfetti();
    } catch {
      alert("Something went wrong sending your message. Please reach out directly to oluwadamilare.greggart9@gmail.com");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-10 md:py-14 relative">
      <div className="mx-auto px-4 md:px-8">

        {/* ── Main Hero Card with Macro Background Image (Compact Proportion) ── */}
        <div className="relative rounded-[2rem] md:rounded-[2.5rem] mx-auto max-w-[1600px] overflow-hidden border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.7)] p-6 md:p-10 lg:p-12">

          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/image/contact-bg.webp"
              alt="Architectural studio background"
              fill
              loading="lazy"
              sizes="(max-width: 1600px) 100vw, 1600px"
              className="object-cover object-center"
            />
            {/* Dark atmospheric gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#090b14]/90 via-[#090b14]/75 to-[#090b14]/55" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090b14]/80 via-transparent to-transparent" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* ── Left Column: Editorial Headline & Capability Highlights ── */}
            <div className="lg:col-span-6 flex flex-col justify-between h-full">
              <div>
                <h2 className="font-display text-[clamp(2.2rem,4.5vw,3.75rem)] font-extrabold text-white leading-[1.05] tracking-tight mb-6">
                  <RevealLine duration={0.6}>Let&apos;s build your</RevealLine>
                  <RevealLine delay={0.08} duration={0.6}>next digital</RevealLine>
                  <RevealLine delay={0.16} duration={0.6}>
                    <span className="text-[var(--accent)]">benchmark.</span>
                  </RevealLine>
                </h2>

                {/* Capability Bullet Badges */}
                <div className="flex flex-col gap-2.5 max-w-md mb-8">
                  {[
                    { icon: Zap, label: "Sub-100ms fluid motion & microinteractions" },
                    { icon: Layers, label: "Production-ready React & Next.js architecture" },
                    { icon: ShieldCheck, label: "100% Core Web Vitals & accessibility verified" },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: 0.25 + i * 0.08 }}
                      className="inline-flex items-center gap-3 px-3.5 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-xs font-mono text-white/90 shadow-sm w-fit"
                    >
                      <item.icon className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                      <span>{item.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Bottom Micro Stats */}
              <div className="flex items-center gap-8 pt-5 border-t border-white/15">
                <div>
                  <span className="font-display text-2xl md:text-3xl font-extrabold text-white">
                    0%
                  </span>
                  <p className="font-mono text-[10px] text-[var(--color-text-secondary)] mt-0.5">
                    Disappointment
                  </p>
                </div>

                <div>
                  <span className="font-display text-2xl md:text-3xl font-extrabold text-[var(--accent)]">
                    99%
                  </span>
                  <p className="font-mono text-[10px] text-[var(--color-text-secondary)] mt-0.5">
                    Satisfaction rate
                  </p>
                </div>
              </div>
            </div>

            {/* ── Right Column: Compact Frosted Glass Form Card ── */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-6 w-full"
            >
              <div className="relative rounded-3xl bg-[#121422]/80 backdrop-blur-2xl border border-white/15 p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">

                {/* Clean Header Badge */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] animate-pulse shadow-[0_0_8px_var(--accent)]" />
                    <span className="font-mono text-xs font-bold text-white tracking-tight">
                      <span className="text-[var(--color-text-muted)]">~/</span> Olúwadámiláre
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[var(--accent)] bg-[var(--accent)]/10 px-2 py-0.5 rounded-full">
                    Open for roles
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="py-10 text-center space-y-3"
                    >
                      <div className="w-12 h-12 rounded-full bg-[var(--accent)]/15 border border-[var(--accent)]/40 flex items-center justify-center mx-auto text-[var(--accent)]">
                        <Check className="w-6 h-6" />
                      </div>
                      <h4 className="font-display text-xl font-bold text-white">Message Sent!</h4>
                      <p className="text-[var(--color-text-secondary)] text-xs font-mono max-w-xs mx-auto">
                        Thank you for reaching out. I will review your inquiry and get back to you within 24 hours.
                      </p>
                      <button
                        onClick={() => setSent(false)}
                        className="mt-3 px-5 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-xs font-mono text-white transition-colors"
                      >
                        Send another message
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={submit} className="space-y-4">

                      {/* Name & Email Row - Borderless with Bold Active/Focus State */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="text-[11px] font-mono text-white/90">
                              Name
                            </label>
                            {touched.name && form.name.trim().length > 0 && !isNameValid && (
                              <span className="text-[10px] font-mono text-amber-300">Min 5 characters</span>
                            )}
                          </div>
                          <input
                            type="text"
                            required
                            placeholder="Your full name"
                            value={form.name}
                            onBlur={() => setTouched((p) => ({ ...p, name: true }))}
                            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                            className={`w-full rounded-full px-4 py-2.5 text-xs font-mono outline-none border-none transition-all duration-200 ${form.name
                                ? "bg-white text-neutral-900 placeholder-neutral-400 shadow-inner"
                                : "bg-white/[0.12] text-white placeholder-white/40 focus:bg-white focus:text-neutral-900 focus:placeholder-neutral-400"
                              }`}
                          />
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="text-[11px] font-mono text-white/90">
                              Email
                            </label>
                            {touched.email && form.email.trim().length > 0 && !isEmailValid && (
                              <span className="text-[10px] font-mono text-amber-300">Valid email required</span>
                            )}
                          </div>
                          <input
                            type="email"
                            required
                            placeholder="name@company.com"
                            value={form.email}
                            onBlur={() => setTouched((p) => ({ ...p, email: true }))}
                            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                            className={`w-full rounded-full px-4 py-2.5 text-xs font-mono outline-none border-none transition-all duration-200 ${form.email
                                ? "bg-white text-neutral-900 placeholder-neutral-400 shadow-inner"
                                : "bg-white/[0.12] text-white placeholder-white/40 focus:bg-white focus:text-neutral-900 focus:placeholder-neutral-400"
                              }`}
                          />
                        </div>
                      </div>

                      {/* Engagement Type Selector with Checkboxes */}
                      <div>
                        <label className="block text-[11px] font-mono text-white/90 mb-2">
                          Engagement Type
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {ENGAGEMENT_OPTIONS.map((eng) => {
                            const isSelected = selectedEngagement === eng;
                            return (
                              <button
                                key={eng}
                                type="button"
                                onClick={() => setSelectedEngagement((prev) => (prev === eng ? null : eng))}
                                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-2 active:scale-95 ${isSelected
                                    ? "bg-white/[0.24] text-white shadow-sm"
                                    : "bg-white/[0.08] hover:bg-white/[0.14] text-white/80"
                                  }`}
                              >
                                {isSelected ? (
                                  <span className="w-4 h-4 rounded-full bg-white text-black flex items-center justify-center shrink-0 shadow-sm">
                                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                                  </span>
                                ) : (
                                  <span className="w-4 h-4 rounded-full bg-white/25 shrink-0" />
                                )}
                                <span>{eng}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Message Textarea - Borderless with Bold Active/Focus State */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-[11px] font-mono text-white/90">
                            Project details or message
                          </label>
                          {touched.message && form.message.trim().length > 0 && !isMessageValid && (
                            <span className="text-[10px] font-mono text-amber-300">Min 5 characters</span>
                          )}
                        </div>
                        <textarea
                          rows={3}
                          required
                          placeholder="Tell me about your project scope, requirements, or role timeline..."
                          value={form.message}
                          onBlur={() => setTouched((p) => ({ ...p, message: true }))}
                          onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                          className={`w-full rounded-2xl p-3.5 text-xs font-mono outline-none border-none transition-all duration-200 resize-none ${form.message
                              ? "bg-white text-neutral-900 placeholder-neutral-400 shadow-inner"
                              : "bg-white/[0.12] text-white placeholder-white/40 focus:bg-white focus:text-neutral-900 focus:placeholder-neutral-400"
                            }`}
                        />
                      </div>

                      {/* Agreement policy row with checkbox toggle */}
                      <div
                        onClick={() => setAgreed(!agreed)}
                        className="flex items-center gap-2.5 cursor-pointer pt-0.5 select-none"
                      >
                        {agreed ? (
                          <span className="w-4 h-4 rounded-full bg-white text-black flex items-center justify-center shrink-0 shadow-sm">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </span>
                        ) : (
                          <span className="w-4 h-4 rounded-full bg-white/25 shrink-0" />
                        )}
                        <span className="text-[11px] font-mono text-white/70">
                          By submitting, you agree to our direct response policy (&lt; 24 hours).
                        </span>
                      </div>

                      {/* Submission Row */}
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                        <div className="flex items-center gap-1.5 text-[11px] font-mono text-[var(--color-text-muted)]">
                          <Clock className="w-3.5 h-3.5 text-[var(--accent)]" />
                          <span>Guaranteed response: &lt; 24h</span>
                        </div>

                        <button
                          type="submit"
                          disabled={!isFormValid || loading}
                          data-cursor-text={isFormValid ? "SEND" : undefined}
                          className={`w-full sm:w-auto px-6 py-2.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${isFormValid && !loading
                              ? "bg-[var(--accent)] hover:bg-[#1a75ff] text-white active:scale-95 shadow-lg shadow-[var(--accent)]/30 cursor-pointer"
                              : "bg-white/10 text-white/30 cursor-not-allowed opacity-50 shadow-none"
                            }`}
                        >
                          {loading ? (
                            <span>Sending...</span>
                          ) : (
                            <>
                              <span>Send Message</span>
                              <Send className="w-3.5 h-3.5" />
                            </>
                          )}
                        </button>
                      </div>

                    </form>
                  )}
                </AnimatePresence>

              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}