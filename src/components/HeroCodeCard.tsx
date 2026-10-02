"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";

const codeSnippet = `const Olúwadámiláre = {
  role: "Frontend Developer",
  stack: ["Next.js", "TypeScript", "React"],
  passion: "building fast products",
  available: true,
};`;

const techPills = [
  "React.js",
  "Next.js",
  "TypeScript",
  "Tailwind",
  "Framer Motion",
  "PostgreSQL",
];

export default function HeroCodeCard() {
  const [copied, setCopied] = useState(false);
  const [hoveredLine, setHoveredLine] = useState<number | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full lg:max-w-[560px] xl:max-w-[600px] mx-auto xl:mx-0 group"
    >
      {/* ── Soft Ambient Radial Glow (Matching #3B82F6 Theme) ── */}
      <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/12 via-indigo-500/8 to-cyan-400/10 rounded-[30px] blur-2xl opacity-80 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* ── Main Frosted Glass Editor Card ── */}
      <div className="relative rounded-[22px] sm:rounded-[26px] bg-white/85 backdrop-blur-2xl border border-slate-200/90 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.08),0_1px_3px_rgba(15,23,42,0.04)] overflow-hidden transition-all duration-300 group-hover:border-blue-400/50 group-hover:shadow-[0_25px_60px_-15px_rgba(59,130,246,0.15)]">
        
        {/* Subtle Top Specular Highlight Line */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />

        {/* ── Window Header Bar ── */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-slate-200/80 bg-slate-50/80">
          
          {/* macOS Window Controls */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#EF4444] shadow-xs shadow-red-500/30 hover:opacity-80 transition-opacity cursor-pointer" />
            <span className="w-3 h-3 rounded-full bg-[#F59E0B] shadow-xs shadow-amber-500/30 hover:opacity-80 transition-opacity cursor-pointer" />
            <span className="w-3 h-3 rounded-full bg-[#10B981] shadow-xs shadow-emerald-500/30 hover:opacity-80 transition-opacity cursor-pointer" />
          </div>

          {/* Tab Title */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-2xs">
            <span className="text-[10px] font-mono font-bold text-[#3B82F6] bg-blue-50 px-1.5 py-0.5 rounded">
              TS
            </span>
            <span className="text-xs sm:text-[13px] font-mono font-semibold text-slate-800 tracking-tight">
              Olúwadámiláre.tsx
            </span>
          </div>

          {/* Copy Snippet Button */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-slate-500 hover:text-slate-900 px-2.5 py-1 rounded-md hover:bg-slate-100 text-xs font-mono transition-all"
            title="Copy snippet"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[11px] text-emerald-600 font-semibold">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 opacity-70" />
                <span className="hidden sm:inline text-[11px] opacity-70">Copy</span>
              </>
            )}
          </button>
        </div>

        {/* ── Code Editor Body with Refined Editorial Syntax ── */}
        <div className="p-4 sm:p-6 font-mono text-xs sm:text-[13.5px] md:text-[14.5px] leading-relaxed sm:leading-loose text-slate-800 overflow-x-auto select-text">
          <div className="space-y-1">
            
            {/* Line 1: const Olúwadámiláre = { */}
            <div
              onMouseEnter={() => setHoveredLine(1)}
              onMouseLeave={() => setHoveredLine(null)}
              className={`flex items-baseline gap-3 sm:gap-4 px-2 py-0.5 rounded-md transition-colors ${
                hoveredLine === 1 ? "bg-blue-50/60" : ""
              }`}
            >
              <span className="text-slate-400 select-none text-xs w-4 text-right">1</span>
              <div>
                <span className="text-[#3B82F6] font-semibold">const</span>{" "}
                <span className="text-slate-900 font-bold">Olúwadámiláre</span>{" "}
                <span className="text-slate-500">=</span>{" "}
                <span className="text-slate-600 font-medium">&#123;</span>
              </div>
            </div>

            {/* Line 2: role: "Frontend Engineer", */}
            <div
              onMouseEnter={() => setHoveredLine(2)}
              onMouseLeave={() => setHoveredLine(null)}
              className={`flex items-baseline gap-3 sm:gap-4 px-2 py-0.5 rounded-md transition-colors ${
                hoveredLine === 2 ? "bg-blue-50/60" : ""
              }`}
            >
              <span className="text-slate-400 select-none text-xs w-4 text-right">2</span>
              <div className="pl-4 sm:pl-6">
                <span className="text-indigo-600 font-semibold">role</span>
                <span className="text-slate-500">:</span>{" "}
                <span className="text-emerald-600 font-medium">"Frontend Developer"</span>
                <span className="text-slate-500">,</span>
              </div>
            </div>

            {/* Line 3: stack: ["Next.js","React.js","TypeScript"], */} 
            <div
              onMouseEnter={() => setHoveredLine(3)}
              onMouseLeave={() => setHoveredLine(null)}
              className={`flex items-baseline gap-3 sm:gap-4 px-2 py-0.5 rounded-md transition-colors ${
                hoveredLine === 3 ? "bg-blue-50/60" : ""
              }`}
            >
              <span className="text-slate-400 select-none text-xs w-4 text-right">3</span>
              <div className="pl-4 sm:pl-6">
                <span className="text-indigo-600 font-semibold">stack</span>
                <span className="text-slate-500">:</span>{" "}
                <span className="text-slate-600 font-medium">[</span>
                <span className="text-emerald-600 font-medium">"Next.js"</span>
                <span className="text-slate-500">,</span>{" "}
                <span className="text-emerald-600 font-medium">"React.js"</span>
                <span className="text-slate-500">,</span>{" "}
                <span className="text-emerald-600 font-medium">"TypeScript"</span>
                <span className="text-slate-600 font-medium">]</span>
                <span className="text-slate-500">,</span>
              </div>
            </div>

            {/* Line 4: passion: "building fast products", */}
            <div
              onMouseEnter={() => setHoveredLine(4)}
              onMouseLeave={() => setHoveredLine(null)}
              className={`flex items-baseline gap-3 sm:gap-4 px-2 py-0.5 rounded-md transition-colors ${
                hoveredLine === 4 ? "bg-blue-50/60" : ""
              }`}
            >
              <span className="text-slate-400 select-none text-xs w-4 text-right">4</span>
              <div className="pl-4 sm:pl-6">
                <span className="text-indigo-600 font-semibold">passion</span>
                <span className="text-slate-500">:</span>{" "}
                <span className="text-emerald-600 font-medium">"building fast products"</span>
                <span className="text-slate-500">,</span>
              </div>
            </div>

            {/* Line 5: available: true, */}
            <div
              onMouseEnter={() => setHoveredLine(5)}
              onMouseLeave={() => setHoveredLine(null)}
              className={`flex items-baseline gap-3 sm:gap-4 px-2 py-0.5 rounded-md transition-colors ${
                hoveredLine === 5 ? "bg-blue-50/60" : ""
              }`}
            >
              <span className="text-slate-400 select-none text-xs w-4 text-right">5</span>
              <div className="pl-4 sm:pl-6 flex items-center gap-1.5 flex-wrap">
                <span className="text-indigo-600 font-semibold">available</span>
                <span className="text-slate-500">:</span>{" "}
                <span className="text-[#3B82F6] font-bold">true</span>
                <span className="text-slate-500">,</span>

              </div>
            </div>

            {/* Line 6: }; with Blinking Cursor */}
            <div
              onMouseEnter={() => setHoveredLine(6)}
              onMouseLeave={() => setHoveredLine(null)}
              className={`flex items-baseline gap-3 sm:gap-4 px-2 py-0.5 rounded-md transition-colors ${
                hoveredLine === 6 ? "bg-blue-50/60" : ""
              }`}
            >
              <span className="text-slate-400 select-none text-xs w-4 text-right">6</span>
              <div className="flex items-center">
                <span className="text-slate-600 font-medium">&#125;;</span>
                <span className="w-2 h-4 sm:h-5 bg-[#3B82F6] ml-1.5 animate-pulse rounded-xs" />
              </div>
            </div>

          </div>
        </div>

      </div>
    </motion.div>
  );
}
