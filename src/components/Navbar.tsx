"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(()=>{ const fn=()=>setScrolled(window.scrollY>30); window.addEventListener("scroll",fn); return()=>window.removeEventListener("scroll",fn); },[]);

  const links: [string, string, boolean?][] = [["Home","/#hero"],["About","/#about"],["Projects","/#projects"],["Skills","/#skills"],["Resume","https://docs.google.com/document/d/15r1EynvQedLbK33Ajb6rcDsY7rWMPZUH",true],["FAQ","/#faq"]];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled?"bg-[var(--color-bg-primary)]/92 backdrop-blur-xl border-b border-[var(--color-border)]":""}`}>
      <div className="max-w-[1380px] mx-auto px-6 md:px-10 flex items-center justify-between h-16">

        {/* Logo — terminal style */}
        <a href="/" className="flex items-center gap-2 group">
          <span className="font-mono text-[var(--accent)] text-sm font-medium">
            <span className="text-[var(--color-text-muted)]">~/</span> Olúwadámiláre
            <span className="animate-blink text-[var(--accent)] ml-0.5">▌</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {links.map(([l,h,blank])=>(
            <a key={h} href={h} {...(blank?{target:"_blank",rel:"noopener noreferrer"}:{})} className="px-4 py-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] rounded-full hover:bg-[var(--color-hover-bg)] transition-all duration-200 font-mono">{l}</a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <a href="/#contact" className="btn-shimmer px-5 py-2.5 rounded-full text-sm font-mono">$ Let's connect</a>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            type="button"
            className="flex flex-col gap-1.5 p-2 text-[var(--color-text-primary)]"
            onClick={()=>setOpen(!open)}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
          >
            <span className={`w-5 h-px bg-current transition-all duration-300 ${open?"rotate-45 translate-y-[6px]":""}`}/>
            <span className={`w-5 h-px bg-current transition-all duration-300 ${open?"opacity-0":""}`}/>
            <span className={`w-5 h-px bg-current transition-all duration-300 ${open?"-rotate-45 -translate-y-[6px]":""}`}/>
          </button>
        </div>
      </div>

      <div className={`md:hidden overflow-hidden transition-all duration-300 border-b border-[var(--color-border)] bg-[var(--color-bg-primary)] ${open?"max-h-80":"max-h-0"}`}>
        <nav className="flex flex-col gap-1 px-6 py-4">
          {links.map(([l,h,blank], i)=>(
            <a key={h} href={h} onClick={()=>setOpen(false)} {...(blank?{target:"_blank",rel:"noopener noreferrer"}:{})} className="py-3 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] text-sm border-b border-[var(--color-border)] transition-all duration-200 font-mono opacity-0 animate-slide-up" style={{animationDelay: `${i * 50}ms`, animationFillMode: 'forwards'}}>{l}</a>
          ))}
          <a href="https://docs.google.com/document/d/15r1EynvQedLbK33Ajb6rcDsY7rWMPZUH" target="_blank" rel="noopener noreferrer" onClick={()=>setOpen(false)} className="mt-3 btn-shimmer py-3 rounded-full text-center text-sm font-mono opacity-0 animate-slide-up" style={{animationDelay: `${links.length * 50}ms`, animationFillMode: 'forwards'}}>$ View resume</a>
        </nav>
      </div>
    </header>
  );
}
