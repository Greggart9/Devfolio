"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/lib/data";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  ArrowUpRight,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

interface ProjectDetailProps {
  project: Project;
  moreProjects: Project[];
}

export default function ProjectDetail({
  project,
  moreProjects,
}: ProjectDetailProps) {
  // Video player state
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Lightbox state for screenshots
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === "Escape") {
        setActiveLightboxIndex(null);
      } else if (e.key === "ArrowRight") {
        setActiveLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % project.screens.length : 0
        );
      } else if (e.key === "ArrowLeft") {
        setActiveLightboxIndex((prev) =>
          prev !== null
            ? (prev - 1 + project.screens.length) % project.screens.length
            : 0
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeLightboxIndex, project.screens.length]);

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-[#3B82F6]/20 selection:text-[#1d4ed8]">
      
      {/* ── 1. Hero Section matching user reference with clear image & subtle frostiness ── */}
      <section className="relative min-h-[75vh] lg:min-h-[82vh] flex items-end overflow-hidden pt-28 md:pt-36 pb-16">
        {/* Background Image with Crisp Cinematic Clarity */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src={project.hero || project.cover}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-right md:object-center"
          />

          {/* Frosted Glass Blur Scrim covering the left text area — gives readability without drowning the image in white */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              maskImage:
                "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0.2) 55%, rgba(0,0,0,0) 75%)",
              WebkitMaskImage:
                "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0.2) 55%, rgba(0,0,0,0) 75%)",
            }}
          />

          {/* Gentle, sheer translucent frost tint under the blur on the left */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.4) 30%, rgba(255,255,255,0.05) 55%, transparent 75%)",
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-[1380px] mx-auto px-6 md:px-10 w-full">
          {/* Back Link: ← cd */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-xs font-mono text-slate-500 hover:text-slate-900 transition-colors mb-8 group"
            >
              <span className="text-slate-400 group-hover:text-slate-900 group-hover:-translate-x-1 transition-transform">
                ←
              </span>
              <span>cd</span>
            </Link>
          </motion.div>

          {/* Badges: [Website] [2026] */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-2.5 mb-5"
          >
            <span className="px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2563eb] text-xs font-mono font-medium shadow-sm">
              {project.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-600 text-xs font-mono shadow-sm">
              {project.year}
            </span>
          </motion.div>

          {/* Headline Title — Reduced Size */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-slate-900 mb-3 leading-tight"
          >
            {project.title}
          </motion.h1>

          {/* Tagline — Reduced Size */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-slate-600 text-xs sm:text-sm md:text-base font-mono tracking-wide mb-8 max-w-xl"
          >
            {project.tagline}
          </motion.p>

          {/* Action Buttons: $ live demo → and ~ GitHub */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4"
          >
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-7 py-3 rounded-full bg-[#3B82F6] hover:bg-[#2563eb] text-white font-mono font-bold text-xs sm:text-sm tracking-wide transition-all shadow-[0_4px_20px_rgba(59,130,246,0.35)] hover:shadow-[0_6px_25px_rgba(59,130,246,0.5)] active:scale-95 inline-flex items-center gap-2 group"
              >
                <span>$ live demo</span>
                <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </a>
            )}

            {project.githubUrl && project.githubUrl !== "YOUR_GITHUB_REPOSITORY_URL" && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-mono text-xs sm:text-sm tracking-wide transition-all active:scale-95 inline-flex items-center gap-2 shadow-sm"
              >
                <span className="text-[#3B82F6] font-mono font-bold">~</span>
                <span>GitHub</span>
              </a>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── 2. Metadata Strip (3 Columns: CLIENT, INDUSTRY, SERVICE) ── */}
      <section className="border-y border-slate-200 bg-slate-50/80 backdrop-blur-xl">
        <div className="max-w-[1380px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200">
            {/* Column 1: CLIENT */}
            <div className="py-6 md:py-8 pr-4">
              <p className="text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-slate-400 mb-1.5 font-semibold">
                CLIENT
              </p>
              <p className="text-slate-900 text-xs sm:text-sm md:text-base font-mono font-bold tracking-wide">
                {project.client}
              </p>
            </div>

            {/* Column 2: INDUSTRY */}
            <div className="py-6 md:py-8 px-4 md:px-6">
              <p className="text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-slate-400 mb-1.5 font-semibold">
                INDUSTRY
              </p>
              <p className="text-slate-900 text-xs sm:text-sm md:text-base font-mono font-bold tracking-wide">
                {project.industry}
              </p>
            </div>

            {/* Column 3: SERVICE */}
            <div className="py-6 md:py-8 px-4 md:px-6">
              <p className="text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-slate-400 mb-1.5 font-semibold">
                SERVICE
              </p>
              <p className="text-slate-900 text-xs sm:text-sm md:text-base font-mono font-bold tracking-wide">
                {project.service}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Main Body Split: Left Scrollable Details & Right Sticky Terminal Card ── */}
      <section className="py-20 md:py-28 relative">
        <div className="max-w-[1380px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* ── Left Column: Scrollable Narrative, Video & Screenshots ── */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-14">
              
              {/* // overview */}
              <div>
                <h2 className="text-[#2563eb] font-mono text-sm sm:text-base font-bold mb-3 tracking-wide flex items-center gap-2">
                  <span>// overview</span>
                </h2>
                <p className="text-slate-600 font-sans md:font-mono text-xs sm:text-sm md:text-[14px] leading-relaxed max-w-3xl">
                  {project.description}
                </p>
              </div>

              {/* // the challenge */}
              <div>
                <h2 className="text-[#2563eb] font-mono text-sm sm:text-base font-bold mb-3 tracking-wide flex items-center gap-2">
                  <span>// the challenge</span>
                </h2>
                <p className="text-slate-600 font-sans md:font-mono text-xs sm:text-sm md:text-[14px] leading-relaxed max-w-3xl">
                  {project.challenge}
                </p>
              </div>

              {/* // the solution */}
              <div>
                <h2 className="text-[#2563eb] font-mono text-sm sm:text-base font-bold mb-3 tracking-wide flex items-center gap-2">
                  <span>// the solution</span>
                </h2>
                <p className="text-slate-600 font-sans md:font-mono text-xs sm:text-sm md:text-[14px] leading-relaxed max-w-3xl">
                  {project.solution}
                </p>
              </div>

              {/* Video Walkthrough (Direct video element) */}
              {project.video && (
                <div className="w-full">
                  <video
                    ref={videoRef}
                    src={project.video}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    controls
                    className="w-full rounded-2xl md:rounded-3xl object-cover shadow-xl border border-slate-200/90 bg-slate-950"
                  />
                </div>
              )}

              {/* // screenshots */}
              {project.screens && project.screens.length > 0 && (
                <div className="space-y-6">
                  <h2 className="text-[#2563eb] font-mono text-sm sm:text-base font-bold tracking-wide flex items-center gap-2">
                    <span>// screenshots</span>
                  </h2>

                  <div className="space-y-6">
                    {project.screens.map((screen, idx) => (
                      <div
                        key={idx}
                        onClick={() => setActiveLightboxIndex(idx)}
                        className="relative aspect-[16/10] w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-xl cursor-pointer border border-slate-200/90 bg-slate-100 hover:opacity-95 transition-opacity"
                      >
                        <Image
                          src={screen}
                          alt={`${project.title} screenshot ${idx + 1}`}
                          fill
                          sizes="(max-width: 1024px) 100vw, 65vw"
                          className="object-cover object-top"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* ── Right Column: Sticky project.json Card ── */}
            <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-28 self-start w-full">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-2xl p-6 sm:p-8 shadow-[0_15px_45px_rgba(0,0,0,0.06)]"
              >
                {/* Traffic Light Header Dots + project.json */}
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  <span className="ml-2 text-slate-400 text-xs font-mono font-medium">
                    project.json
                  </span>
                </div>

                {/* Key-Value Pairs in Monospace */}
                <div className="space-y-4 mb-8 font-mono text-xs sm:text-sm">
                  <div>
                    <span className="text-[#2563eb] font-semibold">&quot;client&quot;:</span>{" "}
                    <span className="text-slate-800">&quot;{project.client}&quot;</span>
                  </div>
                  <div>
                    <span className="text-[#2563eb] font-semibold">&quot;role&quot;:</span>{" "}
                    <span className="text-slate-800">&quot;{project.role}&quot;</span>
                  </div>
                  <div>
                    <span className="text-[#2563eb] font-semibold">&quot;duration&quot;:</span>{" "}
                    <span className="text-slate-800">&quot;{project.duration}&quot;</span>
                  </div>
                  <div>
                    <span className="text-[#2563eb] font-semibold">&quot;year&quot;:</span>{" "}
                    <span className="text-slate-800">&quot;{project.year}&quot;</span>
                  </div>
                </div>

                {/* Tech Stack Badges */}
                <div className="mb-8">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-3 font-semibold">
                    TECH STACK
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-700 text-xs font-mono hover:text-slate-900 hover:border-slate-300 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* $ start a project → Button */}
                <a
                  href="/#contact"
                  className="w-full py-3.5 px-6 rounded-full bg-[#3B82F6] hover:bg-[#2563eb] text-white font-mono font-bold text-xs sm:text-sm tracking-wide text-center flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(59,130,246,0.35)] hover:shadow-[0_6px_25px_rgba(59,130,246,0.5)] active:scale-95 transition-all"
                >
                  <span>$ start a project →</span>
                </a>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 4. More Projects Section (showing the next two projects) ── */}
      {moreProjects && moreProjects.length > 0 && (
        <section className="py-20 md:py-28 border-t border-slate-200 bg-slate-50/50">
          <div className="max-w-[1380px] mx-auto px-6 md:px-10">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-[#2563eb] font-mono text-sm sm:text-base font-bold tracking-wide">
                // more projects
              </h2>
              <Link
                href="/#projects"
                className="text-xs font-mono text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-1 font-medium"
              >
                <span>View all</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#2563eb]" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {moreProjects.map((p) => (
                <Link
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  prefetch={true}
                  className="group relative rounded-3xl overflow-hidden border border-slate-200/90 bg-slate-900 hover:border-[#3B82F6]/60 transition-all flex flex-col justify-between h-[360px] p-7 md:p-8 shadow-lg hover:shadow-2xl"
                >
                  <Image
                    src={p.cover}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center group-hover:scale-105 transition-all duration-700"
                  />
                  
                  {/* Clear subtle dark gradient so image is vibrant and text is 100% sharp — NO whitish transition */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/15 pointer-events-none" />

                  <div className="relative z-10 flex justify-between items-center">
                    <span className="px-3.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[#38bdf8] text-xs font-mono uppercase tracking-wider font-semibold shadow-sm">
                      {p.category}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-[#3B82F6] group-hover:border-[#3B82F6] transition-all shadow-sm">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="relative z-10">
                    <p className="text-white/80 text-xs font-mono mb-1 font-medium">{p.tagline}</p>
                    <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white group-hover:text-[#38bdf8] transition-colors">
                      {p.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Interactive Lightbox Modal for Screenshots ── */}
      <AnimatePresence>
        {activeLightboxIndex !== null && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveLightboxIndex(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
            />

            {/* Close Button */}
            <button
              onClick={() => setActiveLightboxIndex(null)}
              className="absolute top-6 right-6 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors"
              title="Close (Esc)"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Prev Arrow */}
            {project.screens.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveLightboxIndex(
                    (activeLightboxIndex - 1 + project.screens.length) %
                      project.screens.length
                  );
                }}
                className="absolute left-6 z-20 p-3 rounded-full bg-black/60 hover:bg-white/15 border border-white/20 text-white transition-colors"
                title="Previous"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Right Next Arrow */}
            {project.screens.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveLightboxIndex(
                    (activeLightboxIndex + 1) % project.screens.length
                  );
                }}
                className="absolute right-6 z-20 p-3 rounded-full bg-black/60 hover:bg-white/15 border border-white/20 text-white transition-colors"
                title="Next"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            {/* Lightbox Content Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="relative z-10 w-full max-w-6xl max-h-[85vh] aspect-[16/10] rounded-2xl overflow-hidden border border-white/20 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={project.screens[activeLightboxIndex]}
                alt={`${project.title} screenshot expanded`}
                fill
                sizes="100vw"
                className="object-contain bg-black/90"
              />

              {/* Bottom Caption Pill */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-xs font-mono text-white/80">
                {activeLightboxIndex + 1} / {project.screens.length}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
