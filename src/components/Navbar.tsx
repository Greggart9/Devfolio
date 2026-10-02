"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { fireConfetti } from "@/lib/utils";
import AlienLogo from "./AlienLogo";

const links: { label: string; href: string; external?: boolean }[] = [
  { label: "Home", href: "/#hero" },
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Services", href: "/#skills" },
  {
    label: "Resume",
    href: "https://docs.google.com/document/d/1-ueGgt97JmLLSbXA332Heyxcb5Q2HGiqcsIMSbmqOhg/edit?usp=sharing",
    external: true,
  },
];

export default function Navbar() {
  const [activeHash, setActiveHash] = useState("/#hero");
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [entryDirection, setEntryDirection] = useState<"bottom" | "top" | "left" | "right">("bottom");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "projects", "skills", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveHash(`/#${section}`);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnterLink = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (!hovered) {
      // Determine the direction the mouse came from when first entering the navbar
      const rect = e.currentTarget.getBoundingClientRect();
      const topDiff = Math.abs(e.clientY - rect.top);
      const bottomDiff = Math.abs(rect.bottom - e.clientY);
      const leftDiff = Math.abs(e.clientX - rect.left);
      const rightDiff = Math.abs(rect.right - e.clientX);
      const min = Math.min(topDiff, bottomDiff, leftDiff, rightDiff);

      if (min === bottomDiff) setEntryDirection("bottom");
      else if (min === topDiff) setEntryDirection("top");
      else if (min === leftDiff) setEntryDirection("left");
      else setEntryDirection("right");
    }
    setHovered(href);
  };

  const getInitialAnimation = () => {
    switch (entryDirection) {
      case "top":
        return { y: -8, x: 0, opacity: 0, scale: 0.94 };
      case "left":
        return { x: -12, y: 0, opacity: 0, scale: 0.94 };
      case "right":
        return { x: 12, y: 0, opacity: 0, scale: 0.94 };
      case "bottom":
      default:
        return { y: 10, x: 0, opacity: 0, scale: 0.94 };
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4 sm:p-6 md:p-7 lg:p-8 pointer-events-none transition-all">
      <div className="w-full mx-auto max-w-[1600px] flex items-center justify-between gap-4 pt-3 sm:pt-4 md:pt-5 lg:pt-6 px-3 sm:px-6 md:px-8">
        
        {/* ── Left Floating Pill: Logo + Nav Links (media_1790812939002.png & mobile/tablet media_1790821077488.png) ── */}
        <div className="pointer-events-auto w-full lg:w-auto rounded-full bg-white text-neutral-900 px-3.5 sm:px-5 py-1.5 sm:py-2 shadow-lg flex items-center justify-between lg:justify-start gap-3 sm:gap-5 border border-white/30 backdrop-blur-md">
          {/* Logo Mark + Name */}
          <a
            href="/#hero"
            data-cursor-text="HOME"
            className="flex items-center gap-2 group flex-shrink-0 px-2 py-1"
          >
            {/* 8-Bit Alien Monster (👾) Blue Brand Mark */}
            <div className="w-6 h-6 rounded-md bg-[#3b82f6]/15 border border-[#3b82f6]/35 flex items-center justify-center text-[#3B82F6] shadow-2xs group-hover:scale-105 group-hover:border-[#3B82F6] group-hover:bg-[#3B82F6]/20 transition-all duration-200">
              <AlienLogo className="w-3.5 h-3.5" />
            </div>

            <span className="font-sans text-xs sm:text-sm font-extrabold tracking-tight text-neutral-900 group-hover:text-[#3b82f6] transition-colors">
              Olúwadámiláre
            </span>
          </a>

          {/* Desktop Nav Links inside same pill with direction-aware fluid hover (Starts at lg) */}
          <nav
            onMouseLeave={() => setHovered(null)}
            className="hidden lg:flex items-center gap-1 sm:gap-1.5 relative"
          >
            {links.map((link) => {
              const isHovered = hovered === link.href;
              const isActive = activeHash === link.href;

              return (
                <a
                  key={link.href}
                  href={link.href}
                  {...(link.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  onMouseEnter={(e) => handleMouseEnterLink(e, link.href)}
                  onClick={() => !link.external && setActiveHash(link.href)}
                  className="relative px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-[13px] font-medium transition-colors select-none flex items-center justify-center"
                >
                  {/* Fluid Blue Pill Background (matching blue tone) */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.span
                        layoutId="navbar-fluid-pill"
                        initial={getInitialAnimation()}
                        animate={{ y: 0, x: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 8, opacity: 0, scale: 0.94 }}
                        transition={{
                          type: "spring",
                          stiffness: 440,
                          damping: 32,
                          mass: 0.6,
                        }}
                        className="absolute inset-0 bg-[#3B82F6] rounded-full shadow-[0_2px_12px_rgba(59,130,246,0.38)] -z-0 pointer-events-none transform-gpu will-change-transform"
                      />
                    )}
                  </AnimatePresence>

                  {/* Nav Label Text + External Arrow */}
                  <span
                    className={`relative z-10 flex items-center gap-1 transition-colors duration-200 ${
                      isHovered
                        ? "text-white font-semibold"
                        : isActive
                        ? "text-neutral-900 font-bold"
                        : "text-neutral-600 hover:text-black font-medium"
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.external && (
                      <ArrowUpRight
                        className={`w-3 h-3 transition-colors ${
                          isHovered ? "text-white" : "opacity-60 text-neutral-600"
                        }`}
                      />
                    )}
                  </span>
                </a>
              );
            })}
          </nav>

          {/* Mobile & Tablet circular hamburger button */}
          <button
            type="button"
            className="lg:hidden w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-900 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
          >
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* ── Right Floating Pill: Separate Contact / Book a call + Avatar (Hidden on mobile & tablet, visible on desktop lg+) ── */}
        <div className="pointer-events-auto hidden lg:flex items-center">
          <a
            href="/#contact"
            onClick={fireConfetti}
            data-cursor-text="CONTACT"
            className="group rounded-full bg-[#14161f]/95 hover:bg-[#1c1f2b] text-white border border-white/15 pl-4 sm:pl-5 pr-1.5 py-1.5 flex items-center gap-2.5 sm:gap-3 shadow-[0_12px_35px_rgba(0,0,0,0.5)] hover:border-white/30 transition-all active:scale-95"
          >
            <span className="font-sans text-xs sm:text-sm font-semibold tracking-wide text-white">
              Book a call
            </span>
            <span className="w-2.5 h-[1.5px] bg-white/40 group-hover:bg-white transition-colors" />
            <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
              <Image
                src="https://res.cloudinary.com/degearesj/image/upload/v1787267525/Pfp_grnrga.png"
                alt="Olúwadámiláre Ogundare"
                fill
                sizes="32px"
                className="object-cover"
              />
            </div>
          </a>
        </div>

      </div>

      {/* Mobile & Tablet Menu Dropdown Drawer with Falling Gravity Drop Exit Effect (Right-aligned under hamburger) */}
      <div className="w-full max-w-[1600px] mx-auto px-3 sm:px-6 md:px-8 flex justify-end pointer-events-none">
        <AnimatePresence>
          {open && (
            <motion.div
              key="mobile-nav-dropdown"
              initial={{ opacity: 0, y: -16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{
                y: "85vh", // Drops all the way down to the bottom of the screen
                opacity: [1, 1, 1, 0], // Stays fully visible throughout the fall, only fades out when touching the bottom
                scale: [1, 1, 0.98, 0.92],
                rotate: [0, 1, 2.5], // Subtle natural physics tilt as it falls
                transition: {
                  y: { duration: 0.52, ease: [0.55, 0.055, 0.675, 0.19] }, // Natural gravity acceleration
                  opacity: { duration: 0.52, times: [0, 0.75, 0.88, 1], ease: "linear" },
                  scale: { duration: 0.52, times: [0, 0.75, 0.88, 1] },
                  rotate: { duration: 0.52, ease: "easeIn" },
                },
              }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto lg:hidden w-full max-w-[340px] sm:max-w-[380px] mt-2.5 rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-2xl shadow-[0_20px_60px_rgba(15,23,42,0.18)] p-5 overflow-hidden"
            >
            {/* Header row with Close button */}
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-neutral-100">
              <span className="font-mono text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
                Navigation
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close navigation"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors active:scale-90"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col gap-1 py-1">
              {links.map((link) => {
                const isActive = activeHash === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => {
                      setOpen(false);
                      if (!link.external) setActiveHash(link.href);
                    }}
                    {...(link.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className={`py-2.5 px-3.5 rounded-xl text-sm font-semibold flex items-center justify-between transition-colors ${
                      isActive
                        ? "bg-[#3B82F6]/10 text-[#3B82F6]"
                        : "text-neutral-800 hover:bg-neutral-50 hover:text-black"
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.external ? (
                      <ArrowUpRight className="w-4 h-4 text-neutral-400" />
                    ) : (
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isActive ? "bg-[#3B82F6]" : "bg-neutral-300"
                        }`}
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Contact Card Inside Mobile Menu */}
            <div className="pt-3.5 mt-2 border-t border-neutral-100">
              <a
                href="/#contact"
                onClick={() => {
                  setOpen(false);
                  fireConfetti();
                }}
                data-cursor-text="CONTACT"
                className="w-full rounded-2xl bg-neutral-900 hover:bg-black text-white p-3 flex items-center justify-between shadow-lg active:scale-95 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white/40 flex-shrink-0">
                    <Image
                      src="https://res.cloudinary.com/degearesj/image/upload/v1787267525/Pfp_grnrga.png"
                      alt="Olúwadámiláre Ogundare"
                      fill
                      sizes="32px"
                      className="object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-xs text-white">Book a call</p>
                    <p className="font-mono text-[10px] text-neutral-400">Let's talk projects</p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </header>
  );
}
