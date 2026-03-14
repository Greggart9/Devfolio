"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(()=>{ const fn=()=>setScrolled(window.scrollY>30); window.addEventListener("scroll",fn); return()=>window.removeEventListener("scroll",fn); },[]);

  const links = [["Home","/#hero"],["About","/#about"],["Projects","/#projects"],["Services","/#services"],["FAQ","/#faq"]];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled?"bg-[#060608]/92 backdrop-blur-xl border-b border-[#1c1c24]":""}`}>
      <div className="max-w-6xl mx-auto px-6 md:px-10 flex items-center justify-between h-16">

        {/* Logo — terminal style */}
        <a href="/" className="flex items-center gap-2 group">
          <span className="font-mono text-[#00ff88] text-sm font-medium">
            <span className="text-[#555]">~/</span> Olúwadámiláre
            <span className="animate-blink text-[#00ff88] ml-0.5">▌</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {links.map(([l,h])=>(
            <a key={h} href={h} className="px-4 py-2 text-sm text-[#555] hover:text-white rounded-full hover:bg-white/4 transition-all font-mono">{l}</a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a href="/#contact" className="btn-shimmer px-5 py-2.5 rounded-full text-sm font-mono">$ hire me</a>
        </div>

        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={()=>setOpen(!open)}>
          <span className={`w-5 h-px bg-white transition-all ${open?"rotate-45 translate-y-[6px]":""}`}/>
          <span className={`w-5 h-px bg-white transition-all ${open?"opacity-0":""}`}/>
          <span className={`w-5 h-px bg-white transition-all ${open?"-rotate-45 -translate-y-[6px]":""}`}/>
        </button>
      </div>

      <div className={`md:hidden overflow-hidden transition-all duration-300 border-b border-[#1c1c24] bg-[#060608] ${open?"max-h-80":"max-h-0"}`}>
        <nav className="flex flex-col gap-1 px-6 py-4">
          {links.map(([l,h])=>(
            <a key={h} href={h} onClick={()=>setOpen(false)} className="py-3 text-[#666] hover:text-white text-sm border-b border-[#111] transition-colors font-mono">{l}</a>
          ))}
          <a href="/#contact" onClick={()=>setOpen(false)} className="mt-3 btn-shimmer py-3 rounded-full text-center text-sm font-mono">$ hire me</a>
        </nav>
      </div>
    </header>
  );
}
