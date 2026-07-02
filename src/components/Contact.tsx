"use client";
import { useState } from "react";

const socials = [
  { label:"GitHub",      href:"https://github.com/Greggart9",      icon:"⌥" },
  { label:"Twitter / X", href:"https://x.com/Oluwad_amilare",           icon:"𝕏" },
  { label:"LinkedIn",    href:"https://www.linkedin.com/in/oluwadamilaregreggart9/",     icon:"in" },
  { label:"Upwork",      href:"https://www.upwork.com/freelancers/~01f4206c2db39023fa",           icon:"U/" },
];

export default function Contact() {
  const [form, setForm]       = useState({ name:"", email:"", message:"" });
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Failed');

      setSent(true);
    } catch {
      alert('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-28 md:py-36 relative overflow-hidden">
      <div className="blob bg-[#00ff88]/10 w-[500px] h-[500px] -top-20 -left-20"/>
      <div className="blob bg-[#00c4ff]/6  w-[400px] h-[400px] -bottom-20 -right-10"/>

      <div className="max-w-[1380px] mx-auto px-6 md:px-10 relative z-10">

        <div className="reveal text-center mb-16">
          <p className="text-[10px] font-mono text-[#00ff88] uppercase tracking-widest mb-5">// let&apos;s talk</p>
          <h2 className="font-display text-[clamp(2.8rem,7vw,6.5rem)] font-bold leading-none mb-5">
            READY TO<br/><span className="g-text">BUILD TOGETHER?</span>
          </h2>
          <p className="text-[#444] text-base max-w-md mx-auto font-mono">
            Have a project in mind or want to talk code? My inbox is always open.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left info */}
          <div className="reveal space-y-8">
            <div>
              <p className="text-[10px] font-mono text-[#333] uppercase tracking-widest mb-3">For work enquiries</p>
              <a href="mailto:oluwadamilare.greggart9@gmail.com"
                className="font-display text-xl md:text-2xl font-bold text-white hover:text-[#00ff88] transition-colors u-line">
                oluwadamilare.greggart9@gmail.com
              </a>
            </div>

            <div>
              <p className="text-[10px] font-mono text-[#333] uppercase tracking-widest mb-4">Find me online</p>
              <div className="grid grid-cols-2 gap-3">
                {socials.map(s => (
                  <a key={s.href} href={s.href} target="_blank" rel="noreferrer"
                    className="code-card rounded-xl p-4 flex items-center gap-3 hover:border-[#00ff88]/25 lift transition-colors group">
                    <span className="w-9 h-9 rounded-lg bg-[#111] group-hover:bg-[#00ff88]/8 flex items-center justify-center text-[#00ff88] font-bold text-sm font-mono transition-colors">
                      {s.icon}
                    </span>
                    <span className="text-[#555] group-hover:text-white text-sm transition-colors font-mono">{s.label}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="code-card rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-glow"/>
                <span className="text-[10px] font-mono text-[#00ff88] uppercase tracking-widest">Currently Available</span>
              </div>
              <p className="text-white font-medium text-sm">Open to freelance &amp; full-time</p>
              <p className="text-[#333] text-xs mt-1 font-mono">Response time: &lt; 24 hours</p>
            </div>
          </div>

          {/* Right form */}
          <div className="reveal d2">
            {sent ? (
              <div className="code-card border border-[#00ff88]/20 rounded-3xl p-12 flex flex-col items-center justify-center min-h-[380px] text-center">
                <div className="w-14 h-14 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/25 flex items-center justify-center mb-5 text-2xl text-[#00ff88] font-mono">✓</div>
                <h3 className="font-display text-2xl font-bold text-white mb-2">Message sent!</h3>
                <p className="text-[#444] text-sm font-mono">I&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <>
                <p className="text-[10px] font-mono text-[#333] uppercase tracking-widest mb-6">// send a message</p>
                <form onSubmit={submit} className="space-y-4">
                  {[
                    { key:"name",  label:"name",  type:"text",  ph:"your_name" },
                    { key:"email", label:"email", type:"email", ph:"you@example.com" },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="block text-[10px] font-mono text-[#333] uppercase tracking-widest mb-2">
                        <span className="text-[#00ff88]">const </span>{f.label} <span className="text-[#555]">= </span>
                      </label>
                      <input
                        type={f.type} placeholder={f.ph} required
                        value={form[f.key as keyof typeof form]}
                        onChange={e => setForm(p => ({...p, [f.key]: e.target.value}))}
                        className="w-full bg-[#0a0a0e] border border-[#1c1c24] rounded-xl px-5 py-3.5 text-white placeholder-[#222] focus:outline-none focus:border-[#00ff88]/40 transition-colors text-sm font-mono"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-[10px] font-mono text-[#333] uppercase tracking-widest mb-2">
                      <span className="text-[#00ff88]">const </span>message <span className="text-[#555]">= </span>
                    </label>
                    <textarea
                      rows={5} placeholder="Tell me about your project..." required
                      value={form.message}
                      onChange={e => setForm(p => ({...p, message: e.target.value}))}
                      className="w-full bg-[#0a0a0e] border border-[#1c1c24] rounded-xl px-5 py-3.5 text-white placeholder-[#222] focus:outline-none focus:border-[#00ff88]/40 transition-colors resize-none text-sm font-mono"
                    />
                  </div>
                  <button
                    type="submit" disabled={loading}
                    className="w-full btn-shimmer py-4 rounded-full font-mono text-sm disabled:opacity-60 mt-1"
                  >
                    {loading ? "sending..." : "$ submit →"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}