"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUp, ArrowUpRight, Copy, Check, Mail } from "lucide-react";
import { fireConfetti } from "@/lib/utils";
import AlienLogo from "./AlienLogo";

// Subtle rolling text on hover for navigation links
function RollingLink({
  href,
  label,
  external = false,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group inline-flex items-center gap-1.5 py-1.5 transition-colors w-fit"
    >
      <div className="relative overflow-hidden h-[1.35em] font-mono text-xs md:text-sm text-[var(--color-text-secondary)] group-hover:text-white transition-colors">
        <span className="block transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-full">
          {label}
        </span>
        <span className="absolute left-0 top-full block transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-full text-[var(--accent)] font-semibold">
          {label}
        </span>
      </div>
      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 text-[var(--accent)] transition-all" />
    </a>
  );
}

// Social Icons SVGs for circular glass pills
function GithubIcon() {
  return (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const email = "oluwadamilare.greggart9@gmail.com";

  // Track scroll progress of the footer to drive width expansion/squeeze
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  // Footer card expands from 86% to 98% with slim margins on left/right
  const cardWidth = useTransform(scrollYProgress, [0, 0.85], ["86%", "98%"]);
  // Maintains elegant extra-large rounded corners on all four edges
  const cardBorderRadius = useTransform(scrollYProgress, [0, 0.85], ["2.25rem", "1.75rem"]);
  const cardScale = useTransform(scrollYProgress, [0, 0.85], [0.97, 1]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    fireConfetti();
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={containerRef}
      className="relative w-full overflow-hidden pt-14 pb-8 px-2 md:px-4 flex flex-col items-center justify-center bg-[var(--color-bg-primary)]"
    >
      {/* Scroll-Triggered Floating Crystal Glassmorphism Card */}
      <motion.div
        style={{
          width: cardWidth,
          borderRadius: cardBorderRadius,
          scale: cardScale,
        }}
        className="mx-auto relative max-w-[1600px] w-full overflow-hidden border border-slate-200/90 bg-slate-50/90 backdrop-blur-2xl shadow-[0_10px_35px_rgba(0,0,0,0.04)] px-6 md:px-12 py-10 md:py-12 transition-all"
      >
        {/* Subtle Ambient Liquid Lighting Reflection */}
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-[var(--accent)]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-[var(--accent2)]/10 rounded-full blur-3xl pointer-events-none" />

        {/* ── Main Content Grid: Left Bio & Right Nav Columns ── */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-12 items-start">
          
          {/* Left Column: Brand, Bio text & Direct Email */}
          <div className="lg:col-span-5 max-w-md">
            {/* Brand Logo Capsule */}
            <div className="flex items-center gap-2.5 mb-4 group">
              <div className="w-8 h-8 rounded-lg bg-white border border-slate-200/90 flex items-center justify-center backdrop-blur-md shadow-xs group-hover:scale-105 group-hover:border-[#3B82F6]/50 transition-all">
                <AlienLogo className="w-4 h-4 text-[#3B82F6]" />
              </div>
              <h3 className="font-mono text-base md:text-lg font-bold text-slate-900 tracking-tight">
                <span className="text-[var(--accent)]">~/</span> Olúwadámiláre
              </h3>
            </div>

            {/* Bio Description (from previous footer) */}
            <p className="text-[var(--color-text-secondary)] text-xs md:text-sm font-mono leading-relaxed mb-6">
              Frontend Developer specialising in React, Next.js, and high-performance microinteractions.
            </p>

            {/* Email Pill with Confetti Copy Button */}
            <div className="flex items-center gap-2">
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-xs font-mono text-slate-800 transition-all active:scale-95 shadow-sm"
              >
                <Mail className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>{email}</span>
              </a>

              <button
                onClick={handleCopyEmail}
                data-cursor-text="COPY"
                className="p-2 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-all active:scale-90 shadow-sm"
                title="Copy Email"
              >
                {copiedEmail ? (
                  <Check className="w-3.5 h-3.5 text-[var(--accent)]" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* Right Columns: Nav Links shifted to the right */}
          <div className="lg:col-span-7 flex flex-wrap justify-start lg:justify-end gap-12 sm:gap-20">
            
            {/* Column 01: Explore / Navigation */}
            <div className="min-w-[130px]">
              <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] font-bold mb-4">
                Explore
              </p>
              <div className="flex flex-col gap-1.5">
                {[
                  { label: "Home", href: "/#hero" },
                  { label: "About", href: "/#about" },
                  { label: "Projects", href: "/#projects" },
                  { label: "Services", href: "/#skills" },
                  { label: "Contact", href: "/#contact" },
                ].map((link) => (
                  <RollingLink key={link.label} href={link.href} label={link.label} />
                ))}
              </div>
            </div>

            {/* Column 02: Social / Elsewhere */}
            <div className="min-w-[130px]">
              <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] font-bold mb-4">
                Connect
              </p>
              <div className="flex flex-col gap-1.5">
                {[
                  { label: "GitHub", href: "https://github.com/Greggart9" },
                  { label: "Twitter / X", href: "https://x.com/Oluwad_amilare" },
                  { label: "LinkedIn", href: "https://www.linkedin.com/in/oluwadamilaree/" },
                  { label: "Upwork", href: "https://www.upwork.com/freelancers/~01f4206c2db39023fa" },
                ].map((link) => (
                  <RollingLink key={link.label} href={link.href} label={link.label} external />
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* ── Bottom Bar: Copyright & Circular Glass Social Pills ── */}
        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-slate-200 text-xs font-mono text-[var(--color-text-muted)]">
          <p>© {new Date().getFullYear()} Olúwadámiláre Ogundare. Built with Next.js 14 & Tailwind CSS.</p>

          <div className="flex items-center gap-3">
            {/* Circular Glass Social Buttons */}
            <a
              href="https://github.com/Greggart9"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-white border border-slate-200 hover:border-[var(--accent)] hover:bg-blue-50 hover:text-[var(--accent)] flex items-center justify-center text-slate-600 hover:scale-110 active:scale-95 transition-all shadow-sm"
              title="GitHub"
            >
              <GithubIcon />
            </a>

            <a
              href="https://x.com/Oluwad_amilare"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-white border border-slate-200 hover:border-[var(--accent)] hover:bg-blue-50 hover:text-[var(--accent)] flex items-center justify-center text-slate-600 hover:scale-110 active:scale-95 transition-all shadow-sm"
              title="Twitter / X"
            >
              <TwitterIcon />
            </a>

            <a
              href="https://www.linkedin.com/in/oluwadamilaree/"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-white border border-slate-200 hover:border-[var(--accent)] hover:bg-blue-50 hover:text-[var(--accent)] flex items-center justify-center text-slate-600 hover:scale-110 active:scale-95 transition-all shadow-sm"
              title="LinkedIn"
            >
              <LinkedInIcon />
            </a>
            

            {/* Scroll-to-Top Glass Button */}
            <button
              onClick={scrollToTop}
              data-cursor-text="TOP"
              className="w-8 h-8 rounded-full bg-white border border-slate-200 hover:border-[var(--accent)] text-slate-700 hover:text-[var(--accent)] flex items-center justify-center hover:scale-110 active:scale-90 transition-all shadow-sm ml-2"
              title="Scroll to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </motion.div>
    </footer>
  );
}
