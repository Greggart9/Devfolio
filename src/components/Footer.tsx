export default function Footer() {
  return (
    <footer className="border-t border-[#1c1c24] pt-14 pb-8 bg-[#060608]">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <h3 className="font-mono text-base font-semibold text-white mb-3">
              <span className="text-[#444]">~/</span>Olúwadámiláre
            </h3>
            <p className="text-[#444] text-sm leading-relaxed max-w-xs">Frontend engineer building fast, accessible products with the modern web stack.</p>
            <a href="mailto:oluwadamilare.greggart9@gmail.com" className="text-sm text-[#00ff88] mt-3 block u-line">oluwadamilare.greggart9@gmail.com</a>
          </div>
          <div>
            <p className="text-[10px] font-mono text-[#333] uppercase tracking-widest mb-4">Navigate</p>
            <div className="flex flex-col gap-2.5">
              {[["Home","/#hero"],["About","/#about"],["Projects","/#projects"],["Services","/#services"],["Contact","/#contact"]].map(([l,h])=>(
                <a key={h} href={h} className="text-[#555] hover:text-white text-sm transition-colors u-line font-mono">{l}</a>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] font-mono text-[#333] uppercase tracking-widest mb-4">Online</p>
            <div className="flex flex-col gap-2.5">
              {[["GitHub","https://github.com/Greggart9"],["Twitter / X","https://x.com/Oluwad_amilare"],["LinkedIn","https://www.linkedin.com/in/oluwadamilaregreggart9/"],["Upwork","https://www.upwork.com/fl/greggart9"]].map(([l,h])=>(
                <a key={h} href={h} target="_blank" rel="noreferrer" className="text-[#555] hover:text-white text-sm transition-colors u-line font-mono">{l}</a>
              ))}
            </div>
          </div>
        </div>
        <div className="divider mb-6"/>
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-[#2a2a2a] text-xs font-mono">
          <span>© {new Date().getFullYear()} Olúwadámiláre Ogundare. Built with Next.js + Tailwind.</span>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-glow"/>
            <span>Open to work</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
