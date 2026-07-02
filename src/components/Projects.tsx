import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <section id="projects" className="py-28 md:py-36">
      <div className="max-w-[1380px] mx-auto px-6 md:px-10">

        <div className="reveal flex flex-col md:flex-row md:items-end justify-between gap-5 mb-14">
          <div>
            <p className="text-[10px] font-mono text-[#7C5CFC] uppercase tracking-widest mb-3">Selected Work</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold">SELECTED <span className="g-text">PROJECTS</span></h2>
          </div>
          <p className="text-[#555] text-sm max-w-xs leading-relaxed">I&apos;ve developed web apps, web sites, and digital experiences for clients. Here are some standout examples.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((p, i) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className={`reveal d${(i%2)+1} group relative rounded-2xl overflow-hidden zoom lift block`}
              style={{ minHeight: i === 0 ? "380px" : "380px" }}
            >
              <Image src={p.cover} alt={p.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105"/>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-70 group-hover:opacity-95 transition-opacity duration-400"/>

              {/* Top tags */}
              <div className="absolute top-5 left-5 flex gap-2">
                <span className="glass border border-white/10 text-white/80 text-[10px] font-mono px-3 py-1 rounded-full">{p.category}</span>
                <span className="glass border border-white/10 text-white/50 text-[10px] font-mono px-3 py-1 rounded-full">{p.year}</span>
              </div>

              {/* Bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-7 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-[#C084FC] text-xs font-mono mb-2">{p.tagline}</p>
                <h3 className="font-display text-3xl font-bold text-white mb-3">{p.title}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.tags.slice(0,3).map(t => (
                    <span key={t} className="text-[10px] font-mono border border-white/10 text-white/50 px-2 py-0.5 rounded-full">{t}</span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-[#C084FC] text-sm font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>View project</span>
                  <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
