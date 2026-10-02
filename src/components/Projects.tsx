"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { projects, Project } from "@/lib/data";
import { ExternalLink, ArrowUpRight, Sparkles, Filter } from "lucide-react";
import { RevealLine, FadeUp } from "./KineticText";

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

const categories = ["All", "Web App", "Website", "AI Web App", "Portfolio", "Backend Development"];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section id="projects" className="py-10 md:py-36 relative">
      <div className="max-w-[1380px] mx-auto px-6 md:px-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <FadeUp delay={0.05} y={12}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[var(--accent)] font-mono text-xs mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>SELECTED WORK</span>
              </div>
            </FadeUp>

            <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight">
              <RevealLine delay={0.12} duration={0.65}>
                <span>FEATURED <span className="g-text">PROJECTS</span></span>
              </RevealLine>
            </h2>
          </div>

          <FadeUp delay={0.22} y={15}>
            <p className="text-slate-700 text-sm md:text-base max-w-md leading-relaxed font-normal">
              Exploration of production web applications, SaaS tools, and creative editorial platforms built with precision & speed.
            </p>
          </FadeUp>
        </div>

        {/* Category Filter Pills */}
        <div className="hidden md:flex flex-wrap items-center gap-2 mb-12 border-b border-[var(--color-border)] pb-6">
          <div className="flex items-center gap-1 text-[var(--color-text-muted)] text-xs font-mono mr-3">
            <Filter className="w-3.5 h-3.5" />
            <span>FILTER:</span>
          </div>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-4 py-2 text-xs font-mono rounded-full transition-colors ${
                  isActive
                    ? "text-white font-bold bg-[var(--accent)] shadow-[0_0_15px_rgba(0,102,255,0.4)]"
                    : "text-[var(--color-text-muted)] hover:text-white hover:bg-[var(--color-hover-bg)]"
                }`}
              >
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Horizontal Split Project Cards Matching Reference Context */}
        <motion.div layout className="space-y-8 md:space-y-10">
          <AnimatePresence>
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-2xl p-3 sm:p-6  shadow-[0_10px_35px_rgba(15,23,42,0.06)] hover:border-[#3b82f6]/40 hover:shadow-[0_20px_45px_rgba(59,130,246,0.12)] transition-all duration-500 overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center"> 
                  
                  {/* Left Column: Framed Image Showcase */}
                  <Link
                    href={`/projects/${project.slug}`}
                    prefetch={true}
                    data-cursor-text="OPEN"
                    className="lg:col-span-6 xl:col-span-6 relative w-full aspect-[16/10] sm:aspect-[4/3] lg:aspect-auto lg:h-[400px] rounded-2xl overflow-hidden bg-slate-100 block cursor-pointer group/img border border-slate-200/80"
                  >
                    <Image
                      src={project.cover}
                      alt={project.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-center group-hover/img:scale-105 transition-transform duration-700 ease-out"
                    />
                    
                    {/* Subtle soft gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />

                    {/* Top Badges over image */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                      <span className="px-3 py-1 rounded-full bg-white/85 backdrop-blur-md border border-slate-200/80 text-slate-800 text-[11px] font-mono uppercase tracking-wider font-semibold shadow-sm">
                        {project.category}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-white/85 backdrop-blur-md border border-slate-200/80 text-[#2563eb] text-[11px] font-mono font-bold shadow-sm">
                        {project.year}
                      </span>
                    </div>

                    <div
                      className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/85 backdrop-blur-md border border-slate-200/80 flex items-center justify-center text-slate-800 opacity-90 group-hover/img:opacity-100 group-hover/img:scale-110 transition-all z-10 shadow-sm"
                    >
                      <ArrowUpRight className="w-4 h-4 text-[#2563eb]" />
                    </div>
                  </Link>

                  {/* Right Column: Title, Description, Tags, and Action */}
                  <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-between h-full py-2">
                    <div>
                      {/* Tagline */}
                      <p className="text-[var(--accent)] text-xs font-mono font-bold uppercase tracking-wider mb-2">
                        {project.tagline}
                      </p>

                      {/* Headline Title Link */}
                      <Link href={`/projects/${project.slug}`}>
                        <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight hover:text-[var(--accent)] transition-colors mb-4">
                          {project.title}
                        </h3>
                      </Link>

                      {/* Description */}
                      <p className="text-slate-700 text-xs sm:text-sm font-sans font-normal leading-relaxed mb-6 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Tech Stack Chips */}
                      <div className="hidden md:flex flex-wrap gap-2 mb-8">
                        {project.tags.map((t) => (
                          <span
                            key={t}
                            className="text-[11px] font-mono font-medium border border-slate-200/90 bg-slate-100/70 text-slate-800 px-3 py-1 rounded-full group-hover:border-slate-300 transition-colors"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions Row */}
                    <div className="flex flex-col md:flex-row gap-4 md:gap-0 md:items-center justify-between pt-5 border-t border-slate-200">
                      <Link
                        href={`/projects/${project.slug}`}
                        prefetch={true}
                        data-cursor-text="VIEW"
                        className="px-6 py-2.5 rounded-lg md:rounded-full bg-slate-900 hover:bg-[var(--accent)] hover:text-white border border-slate-800 text-white font-mono text-xs font-bold transition-all active:scale-95 shadow-sm inline-flex items-center gap-1.5 group/btn"
                      >
                        <span>View details</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-blue-400 group-hover/btn:text-white group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </Link>

                      <div className="flex justify-between  md:items-center gap-3">
                        <Link
                          href={`/projects/${project.slug}`}
                          prefetch={true}
                          className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-600 hover:text-slate-900 transition-colors font-medium"
                        >
                          <span>Case Study</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-[var(--accent)]" />
                        </Link>
                        
                        <div className="flex gap-3">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-[var(--accent)] transition-all"
                            title="Live Demo"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}

                        {project.githubUrl && project.githubUrl !== "YOUR_GITHUB_REPOSITORY_URL" && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-black transition-all"
                            title="GitHub Repo"
                          >
                            <GithubIcon className="w-3.5 h-3.5" />
                          </a>
                        )}
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
