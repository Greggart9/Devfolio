"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { fireConfetti } from "@/lib/utils";
import HeroCodeCard from "./HeroCodeCard";

const roles = [
  "Frontend Developer",
  "Wordpress Developer",
  "Illustrator"
];

const techStackItems = [
  {
    name: "Next.js",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 180 180" fill="currentColor">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M90 180c49.706 0 90-40.294 90-90S139.706 0 90 0 0 40.294 0 90s40.294 90 90 90zm39.117-124.965h15.918v69.93h-15.918v-69.93zm-51.696 46.22l34.823 48.067c2.617-.99 5.14-2.14 7.558-3.443L79.625 90.627v-35.592H63.707v69.93h13.714v-23.71z"
        />
      </svg>
    ),
  },
  {
    name: "React",
    icon: (
      <svg className="w-4 h-4 text-[#00d8ff]" viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor">
        <circle cx="0" cy="0" r="2.05" fill="#00d8ff" />
        <g stroke="#00d8ff" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
  },
  {
    name: "TypeScript",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="4" fill="#3178C6" />
        <path
          d="M19.98 19.38c.45.8 1.13 1.34 2.05 1.34 1.05 0 1.63-.56 1.63-1.63v-9.09h2.89v9.09c0 2.66-1.57 3.91-4.43 3.91-2.02 0-3.64-.98-4.32-2.61l2.18-1.01zm-9.06-6.49h7.4v2.53h-2.18v9.47h-3.03v-9.47H10.92v-2.53z"
          fill="#fff"
        />
      </svg>
    ),
  },
  {
    name: "Tailwind CSS",
    icon: (
      <svg className="w-4 h-4 text-[#38bdf8]" viewBox="0 0 32 32" fill="currentColor">
        <path d="M16 7.5c-4.418 0-7.23 2.209-8.438 6.627 1.657-1.657 3.59-2.21 5.802-1.657 1.264.316 2.168 1.233 3.168 2.247C18.163 16.377 20.086 18.333 24.438 18.333c4.418 0 7.23-2.209 8.438-6.627-1.657 1.657-3.59 2.21-5.802 1.657-1.264-.316-2.168-1.233-3.168-2.247C22.274 9.456 20.351 7.5 16 7.5zm-8.438 9.166C3.144 16.666.332 18.875-.876 23.293c1.657-1.657 3.59-2.21 5.802-1.657 1.264.316 2.168 1.233 3.168 2.247 1.631 1.657 3.554 3.613 7.906 3.613 4.418 0 7.23-2.209 8.438-6.627-1.657 1.657-3.59 2.21-5.802 1.657-1.264-.316-2.168-1.233-3.168-2.247-1.631-1.657-3.554-3.613-7.906-3.613z" />
      </svg>
    ),
  },
  {
    name: "Framer Motion",
    icon: (
      <svg className="w-4 h-4 text-slate-800" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
      </svg>
    ),
  },
  {
    name: "GSAP",
    icon: <span className="font-extrabold text-[12px] tracking-tight text-[#0ae448]">GSAP</span>,
  },
  {
    name: "Supabase",
    icon: (
      <svg className="w-4 h-4 text-[#3ecf8e]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.44 2.59a1.05 1.05 0 0 0-1.78.74v8.28H3.34a1.05 1.05 0 0 0-.82 1.7l8.04 10.1c.64.81 1.94.36 1.94-.67v-8.28h8.32a1.05 1.05 0 0 0 .82-1.7L13.44 2.59z" />
      </svg>
    ),
  },
  {
    name: "Vercel",
    icon: (
      <svg className="w-4 h-4 text-black" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1L24 22H0L12 1Z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    icon: (
      <svg className="w-4 h-4 text-slate-900" viewBox="0 0 24 24" fill="currentColor">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        />
      </svg>
    ),
  },
];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Authentic character-by-character typewriter effect
  useEffect(() => {
    const fullText = roles[roleIdx];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      // Typing out characters one by one
      if (currentText.length < fullText.length) {
        timer = setTimeout(() => {
          setCurrentText(fullText.slice(0, currentText.length + 1));
        }, 75);
      } else {
        // Full role typed -> pause before backspacing
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 1600);
      }
    } else {
      // Deleting characters one by one
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText(fullText.slice(0, currentText.length - 1));
        }, 35);
      } else {
        // Deletion complete -> transition to next role
        setIsDeleting(false);
        setRoleIdx((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIdx]);

  return (
    /* ── Outer 100% Viewport Container with Generous Edge Spacing on all 4 sides (top, bottom, left, right) ── */
    <section
      id="hero"
      className="relative min-h-screen  bg-blue-400 w-full p-4 sm:p-6 md:p-7 lg:p-8 flex flex-col justify-center overflow-hidden dot-grid"
    >

      {/* ── Frosted Glass Background Card (fills viewport space with clean border margins & generous inner padding) ── */}
      <div className="relative mx-auto w-full max-w-[1600px] min-h-[calc(100vh-2rem)] sm:min-h-[calc(100vh-3rem)] md:min-h-[calc(100vh-3.5rem)] lg:min-h-[calc(100vh-4rem)] rounded-[26px] bg-white/75 backdrop-blur-xl border border-slate-200/80 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.06)] overflow-hidden flex flex-col pt-28 pb-8 px-6 sm:px-10 md:px-14 lg:px-16">
        {/* Subtle top edge specular highlight line */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

        {/* ── Main Layout: Left & Right Columns (Turns to flex-col on large screens and below so text won't squeeze) ── */}
        <div className="w-full flex-1 flex flex-col xl:flex-row items-stretch justify-between gap-8 xl:gap-12 min-h-0">
          
          {/* ── LEFT COLUMN: Full width on large & below, aligned to the left, 2 Separate Divs ── */}
          <div className="w-full flex-1 flex flex-col justify-center items-start text-left min-w-0">
            {/* Div 1: Availability Badge, Main Headline, Typewriter Role, Buttons */}
            <div className="w-full">
              {/* Availability Badge */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
              >
                <div className="inline-flex items-center gap-2 border border-blue-500/25 bg-blue-500/10 backdrop-blur-md rounded-full px-3.5 py-1 mb-3.5 sm:mb-4 shadow-xs">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3B82F6] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3B82F6]" />
                  </span>
                  <span className="text-[#3B82F6] text-xs font-mono font-medium tracking-wide">
                    Available for Full-Time
                  </span>
                </div>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="font-display uppercase text-[clamp(2.2rem,3.8vw,4.1rem)] font-extrabold tracking-tight text-slate-900 leading-[1.12] mb-3 sm:mb-3.5 md:max-w-4xl"
              >
                Crafting <span className="md:inline">high-performance</span>{" "}
                <span className="text-[#3B82F6] block">digital experiences.</span>
              </motion.h1>

              {/* Subhead / Typewriter Role */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.22 }}
              >
                <div className="flex items-center gap-2 mb-4 sm:mb-5 h-7 sm:h-8">
                  <span className="text-[#3B82F6] font-mono text-xs sm:text-sm font-bold">//</span>
                  <span className="text-slate-800 text-xs sm:text-sm md:text-base font-mono font-semibold whitespace-nowrap min-w-[2px]">
                    {currentText}
                  </span>
                  <span className="w-1.5 h-3.5 sm:h-4 bg-[#3B82F6] animate-pulse rounded-xs inline-block" />
                </div>
              </motion.div>

              {/* CTAs: Stacked vertically taking full width on small screen, row beside each other on sm+ */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.28 }}
              >
                <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 w-full lg:w-auto"> 
                  {/* Primary Blue Button with live status dot */}
                  <a
                    href="#contact"
                    onClick={fireConfetti}
                    data-cursor-text="CONNECT"
                    className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#3B82F6] hover:bg-blue-600 text-white font-medium text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-blue-500/25 active:scale-95 transition-all text-center"
                  >
                    <span>$ Let's connect</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse ml-0.5" />
                  </a>

                  {/* Secondary Clean Button */}
                  <a
                    href="#projects"
                    data-cursor-text="PROJECTS"
                    className="w-full md:w-auto px-4 md:px-5 py-2.5 md:py-3 rounded-full text-slate-800 hover:text-slate-950 font-medium text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 bg-slate-100/70 hover:bg-slate-200/70 active:scale-95 transition-all text-center border border-slate-200/90"
                  >
                    <span>View Projects</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-70" />
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Div 2: Tech Stack Brand Marquee (Seamless Infinite Loop, Centered on md and smaller screens) */}
            <div className="w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-xl pt-8 lg:pt-30 pb-2 mx-auto xl:mx-0 flex flex-col items-center xl:items-start">
              <div className="w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent_0%,black_10%,black_90%,transparent_100%)]">
                <div className="flex w-max">
                  {/* Track 1 */}
                  <motion.div
                    animate={{ x: ["0%", "-100%"] }}
                    transition={{ duration: 15, ease: "linear", repeat: Infinity }}
                    className="flex items-center gap-6 shrink-0 pr-6 py-1"
                  >
                    {techStackItems.map((tech, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-slate-600 hover:text-slate-950 text-xs sm:text-sm font-semibold tracking-tight shrink-0 transition-colors select-none"
                      >
                        {tech.icon}
                        <span>{tech.name}</span>
                      </div>
                    ))}
                  </motion.div>

                  {/* Track 2: Identical twin for flawless infinite looping without restart glitch */}
                  <motion.div
                    animate={{ x: ["0%", "-100%"] }}
                    transition={{ duration: 15, ease: "linear", repeat: Infinity }}
                    className="flex items-center gap-6 shrink-0 pr-6 py-1"
                  >
                    {techStackItems.map((tech, i) => (
                      <div
                        key={`clone-${i}`}
                        className="flex items-center gap-2 text-slate-600 hover:text-slate-950 text-xs sm:text-sm font-semibold tracking-tight shrink-0 transition-colors select-none"
                      >
                        {tech.icon}
                        <span>{tech.name}</span>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN: Code Card centered vertically at the middle on desktop, centered horizontally when stacked below ── */}
          <div className="w-full xl:flex-1 flex flex-col items-center xl:items-end justify-center self-center my-auto pt-8 xl:pt-0">
            <HeroCodeCard />
          </div>

        </div>

      </div>
    </section>
  );
}
