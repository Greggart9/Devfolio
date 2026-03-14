"use client";
import { useState } from "react";
import { faqs } from "@/lib/data";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-28 md:py-36">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left sticky */}
          <div className="reveal lg:sticky lg:top-28">
            <p className="text-[10px] font-mono text-[#00ff88] uppercase tracking-widest mb-3">// got questions?</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-5">
              FREQUENTLY<br/><span className="g-text">ASKED</span>
            </h2>
            <p className="text-[#444] text-sm leading-relaxed max-w-sm mb-7 font-mono">
              Things people ask before hiring me. Still have questions?
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 btn-shimmer px-6 py-3 rounded-full text-sm font-mono"
            >
              $ ask me directly →
            </a>
          </div>

          {/* Right accordion */}
          <div className="reveal d2">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-[#111]">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between py-5 text-left group"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-mono text-[#00ff88] w-6 flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={`text-sm md:text-base font-medium transition-colors font-mono ${
                      open === i ? "text-[#00ff88]" : "text-white group-hover:text-[#00ff88]"
                    }`}>
                      {faq.q}
                    </span>
                  </div>
                  <span className={`text-xl text-[#333] flex-shrink-0 ml-4 transition-transform duration-300 font-mono ${
                    open === i ? "rotate-45 text-[#00ff88]" : ""
                  }`}>
                    +
                  </span>
                </button>
                <div className={`faq-body ${open === i ? "open" : ""}`}>
                  <p className="text-[#444] text-sm leading-relaxed pb-5 pl-10 font-mono">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
