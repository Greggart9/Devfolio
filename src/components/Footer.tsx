export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] pt-14 pb-8 bg-[var(--color-bg-primary)]">
      <div className="max-w-[1380px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <h3 className="font-mono text-base font-semibold text-white mb-3">
              <span className="text-[var(--color-fade-text)]">~/</span>Olúwadámiláre
            </h3>
            <p className="text-[var(--color-fade-text)] text-sm leading-relaxed max-w-xs">Frontend engineer building fast, accessible products with the modern web stack.</p>
            <a href="mailto:oluwadamilare.greggart9@gmail.com" className="text-sm text-[var(--accent)] mt-3 block u-line">oluwadamilare.greggart9@gmail.com</a>
          </div>
          <div>
            <p className="text-[10px] font-mono text-[var(--color-subtle)] uppercase tracking-widest mb-4">Navigate</p>
            <div className="flex flex-col gap-2.5">
              {[["Home","/#hero"],["About","/#about"],["Projects","/#projects"],["Skills","/#skills"],["Contact","/#contact"]].map(([l,h])=>(
                <a key={h} href={h} className="text-[var(--color-text-muted)] hover:text-[var(--accent)] text-sm transition-all duration-200 u-line font-mono">{l}</a>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] font-mono text-[var(--color-subtle)] uppercase tracking-widest mb-4">Online</p>
            <div className="flex flex-col gap-2.5">
              {[["GitHub","https://github.com/Greggart9"],["Twitter / X","https://x.com/Oluwad_amilare"],["LinkedIn","https://www.linkedin.com/in/oluwadamilaree/"],["Upwork","https://www.upwork.com/freelancers/~01f4206c2db39023fa"],["Resume","https://docs.google.com/document/d/15r1EynvQedLbK33Ajb6rcDsY7rWMPZUH"]].map(([l,h])=>(
                <a key={h} href={h} target="_blank" rel="noreferrer" className="text-[var(--color-text-muted)] hover:text-[var(--accent)] text-sm transition-all duration-200 u-line font-mono">{l}</a>
              ))}
            </div>
          </div>
        </div>
        <div className="divider mb-6"/>
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-[var(--color-fade-text)] text-xs font-mono">
          <span>© {new Date().getFullYear()} Olúwadámiláre Ogundare. Built with Next.js + Tailwind.</span>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-glow"/>
            <span>Open to work</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
