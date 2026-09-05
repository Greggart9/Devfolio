"use client";
import { useState } from "react";

const socials = [
  { label:"GitHub",      href:"https://github.com/Greggart9",      icon:"⌥" },
  { label:"Twitter / X", href:"https://x.com/Oluwad_amilare",           icon:"𝕏" },
  { label:"LinkedIn",    href:"https://www.linkedin.com/in/oluwadamilaree",     icon:"in" },
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
      <div className="blob bg-[var(--accent)]/10 w-[500px] h-[500px] -top-20 -left-20"/>
      <div className="blob bg-[var(--accent2)]/6  w-[400px] h-[400px] -bottom-20 -right-10"/>

      <div className="max-w-[1380px] mx-auto px-6 md:px-10 relative z-10">

        <div className="reveal text-center mb-16">
          <p className="text-[10px] font-mono text-[var(--accent)] uppercase tracking-widest mb-5">// let&apos;s talk</p>
          <h2 className="font-display text-[clamp(2.8rem,7vw,6.5rem)] font-bold leading-none mb-5">
            READY TO<br/><span className="g-text">BUILD TOGETHER?</span>
          </h2>
          <p className="text-[var(--color-text-muted)] text-base max-w-md mx-auto font-mono">
            Have a project in mind or want to talk code? My inbox is always open.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left info */}
          <div className="reveal space-y-8">
            <div>
              <p className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase tracking-widest mb-3">For work enquiries</p>
              <a href="mailto:oluwadamilare.greggart9@gmail.com"
                className="font-display text-xl md:text-2xl font-bold text-[var(--color-text-primary)] hover:text-[var(--accent)] transition-colors u-line">
                oluwadamilare.greggart9@gmail.com
              </a>
            </div>

            <div>
              <p className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase tracking-widest mb-4">Find me online</p>
              <div className="grid grid-cols-2 gap-3">
                {socials.map(s => (
                  <a key={s.href} href={s.href} target="_blank" rel="noreferrer"
                    className="code-card rounded-xl p-4 flex items-center gap-3 hover:border-[var(--accent)]/25 lift transition-all duration-200 group cursor-pointer active:scale-95">
                    <span className="w-9 h-9 rounded-lg bg-[var(--color-bg-primary)] group-hover:bg-[var(--accent)]/8 flex items-center justify-center text-[var(--accent)] font-bold text-sm font-mono transition-all duration-200">
                      {s.icon}
                    </span>
                    <span className="text-[var(--color-text-muted)] group-hover:text-[var(--color-text-primary)] text-sm transition-colors duration-200 font-mono">{s.label}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="code-card rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-glow"/>
                <span className="text-[10px] font-mono text-[var(--accent)] uppercase tracking-widest">Currently Available</span>
              </div>
              <p className="text-[var(--color-text-primary)] font-medium text-sm">Open to freelance &amp; full-time</p>
              <p className="text-[var(--color-text-muted)] text-xs mt-1 font-mono">Response time: &lt; 24 hours</p>
            </div>
          </div>

          {/* Right form */}
          <div className="reveal d2">
            {sent ? (
              <div className="code-card border border-[var(--accent)]/20 rounded-3xl p-12 flex flex-col items-center justify-center min-h-[380px] text-center animate-pop-in">
                <div className="w-14 h-14 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/25 flex items-center justify-center mb-5 text-2xl text-[var(--accent)] font-mono animate-scale-in" style={{animationDelay: '0.15s'}}>✓</div>
                <h3 className="font-display text-2xl font-bold text-[var(--color-text-primary)] mb-2 animate-scale-in" style={{animationDelay: '0.25s'}}>Message sent!</h3>
                <p className="text-[var(--color-text-muted)] text-sm font-mono animate-scale-in" style={{animationDelay: '0.35s'}}>I&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <>
                <p className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase tracking-widest mb-6">// send a message</p>
                <form onSubmit={submit} className="space-y-4">
                  {[
                    { key:"name",  label:"name",  type:"text",  ph:"your_name" },
                    { key:"email", label:"email", type:"email", ph:"you@example.com" },
                  ].map((f, i) => (
                    <div key={f.key} className="group">
                      <label className="block text-[10px] font-mono text-[var(--color-text-muted)] uppercase tracking-widest mb-2 transition-colors duration-150 group-focus-within:text-[var(--accent)]">
                        <span className="text-[var(--accent)]">const </span>{f.label} <span className="text-[var(--color-text-muted)]">= </span>
                      </label>
                      <input
                        type={f.type} placeholder={f.ph} required
                        value={form[f.key as keyof typeof form]}
                        onChange={e => setForm(p => ({...p, [f.key]: e.target.value}))}
                        className="w-full bg-[var(--color-code-bg)] border border-[var(--color-border)] rounded-xl px-5 py-3.5 text-[var(--color-text-primary)] placeholder-[var(--color-fade-text)] focus:outline-none focus:border-[var(--accent)]/40 focus:shadow-[0_0_0_3px_rgba(0,255,136,0.1)] transition-all duration-150 text-sm font-mono"
                      />
                    </div>
                  ))}
                  <div className="group">
                    <label className="block text-[10px] font-mono text-[var(--color-text-muted)] uppercase tracking-widest mb-2 transition-colors duration-150 group-focus-within:text-[var(--accent)]">
                      <span className="text-[var(--accent)]">const </span>message <span className="text-[var(--color-text-muted)]">= </span>
                    </label>
                    <textarea
                      rows={5} placeholder="Tell me about your project..." required
                      value={form.message}
                      onChange={e => setForm(p => ({...p, message: e.target.value}))}
                      className="w-full bg-[var(--color-code-bg)] border border-[var(--color-border)] rounded-xl px-5 py-3.5 text-[var(--color-text-primary)] placeholder-[var(--color-fade-text)] focus:outline-none focus:border-[var(--accent)]/40 focus:shadow-[0_0_0_3px_rgba(0,255,136,0.1)] transition-all duration-150 resize-none text-sm font-mono"
                    />
                  </div>
                  <button
                    type="submit" disabled={loading}
                    className="w-full btn-shimmer py-4 rounded-full font-mono text-sm disabled:opacity-60 mt-1 transition-all duration-100 active:scale-97"
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