import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/data";

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = projects.find(p => p.slug === params.slug);
  return { title: p ? `${p.title} — Olúwadámiláre` : "Not Found" };
}

export default function ProjectPage({ params }: Props) {
  const project = projects.find(p => p.slug === params.slug);
  if (!project) notFound();

  const others = projects.filter(p => p.slug !== project.slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-[#060608]">

      {/* ── Hero ── */}
      <section className="relative min-h-[75vh] flex items-end overflow-hidden">
        {/* Image background */}
        <div className="absolute inset-0 z-0">
          <Image src={project.hero} alt={project.title} fill className="object-cover" priority/>
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/60 to-[#080808]/20"/>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-[#060608]/65 to-[#060608]/25"/>
        {/* Scan line */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00ff88]/15 to-transparent animate-scan"/>
        </div>

        <div className="relative z-10 max-w-[1380px] mx-auto px-6 md:px-10 pb-16 pt-28 w-full">
          <Link href="/" className="inline-flex items-center gap-2 text-[#444] hover:text-[#00ff88] text-sm font-mono transition-colors mb-10">
            ← cd ..
          </Link>

          <div className="flex flex-wrap gap-2 mb-5">
            <span className="glass border border-[#00ff88]/25 text-[#00ff88] text-[10px] font-mono px-3 py-1 rounded-full">
              {project.category}
            </span>
            <span className="glass border border-white/8 text-white/40 text-[10px] font-mono px-3 py-1 rounded-full">
              {project.year}
            </span>
          </div>

          <h1 className="font-display text-[clamp(3rem,8vw,7rem)] font-bold leading-none text-white mb-4">
            {project.title}
          </h1>
          <p className="text-[#666] text-lg max-w-xl font-mono">{project.tagline}</p>

          {/* Links */}
          <div className="flex gap-4 mt-6">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer"
                className="btn-shimmer px-5 py-2.5 rounded-full text-sm font-mono">
                $ live demo →
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer"
                className="btn-outline px-5 py-2.5 rounded-full text-sm font-mono">
                ⌥ GitHub
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ── Meta strip ── */}
      <section className="border-y border-[#1c1c24]">
        <div className="max-w-[1380px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-3 divide-x divide-[#1c1c24]">
            {[
              { label:"Client",   value: project.client   },
              { label:"Industry", value: project.industry },
              { label:"Service",  value: project.service  },
            ].map(m => (
              <div key={m.label} className="px-6 py-6 first:pl-0">
                <p className="text-[10px] font-mono text-[#333] uppercase tracking-widest mb-1">{m.label}</p>
                <p className="text-white text-sm font-medium">{m.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Body ── */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1380px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

            {/* Content */}
            <div className="lg:col-span-2 space-y-14">
              {[
                { heading:"// overview",     body: project.description },
                { heading:"// the challenge", body: project.challenge   },
                { heading:"// the solution",  body: project.solution    },
              ].map(s => (
                <div key={s.heading}>
                  <h2 className="font-mono text-lg font-semibold text-[#00ff88] mb-4">{s.heading}</h2>
                  <p className="text-[#777] leading-relaxed">{s.body}</p>
                </div>
              ))}

              {/* Screenshots */}
              <div>
                <h2 className="font-mono text-lg font-semibold text-[#00ff88] mb-5">// screenshots</h2>
                <div className="space-y-5">
                  <div className="relative rounded-2xl overflow-hidden zoom aspect-video bg-[#0e0e12] border border-[#1c1c24]">
                    <video
                      src={project.video}
                      muted
                      loop
                      autoPlay
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {project.screens.slice(1).map((img, i) => (
                    <div key={i} className="relative rounded-2xl overflow-hidden zoom aspect-video bg-[#0e0e12] border border-[#1c1c24]">
                      <Image src={img} alt={`${project.title} screen ${i+2}`} fill className="object-cover"/>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="code-card rounded-2xl p-6 sticky top-24">
                {/* Terminal header */}
                <div className="flex items-center gap-1.5 mb-5 pb-4 border-b border-[#1c1c24]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]"/>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]"/>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]"/>
                  <span className="ml-2 text-[#333] text-[10px] font-mono">project.json</span>
                </div>

                <div className="space-y-4 mb-6 font-mono text-sm">
                  {[
                    { k:"client",   v: project.client   },
                    { k:"role",     v: project.role     },
                    { k:"duration", v: project.duration },
                    { k:"year",     v: project.year     },
                  ].map(d => (
                    <div key={d.k} className="border-b border-[#111] pb-3">
                      <span className="text-[#00c4ff]">&quot;{d.k}&quot;</span>
                      <span className="text-[#555]">: </span>
                      <span className="text-[#00ff88]">&quot;{d.v}&quot;</span>
                    </div>
                  ))}
                </div>

                <div className="mb-6">
                  <p className="text-[10px] font-mono text-[#333] uppercase tracking-widest mb-3">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(t => (
                      <span key={t} className="border border-[#1c1c24] text-[#444] text-[10px] font-mono px-2.5 py-1 rounded-full hover:border-[#00ff88]/20 hover:text-[#00ff88] transition-colors">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <Link href="/#contact" className="w-full btn-shimmer py-3 rounded-full text-sm font-mono text-center block">
                  $ start a project →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── More projects ── */}
      {others.length > 0 && (
        <section className="py-16 border-t border-[#1c1c24]">
          <div className="max-w-[1380px] mx-auto px-6 md:px-10">
            <h2 className="font-mono text-lg font-semibold text-[#00ff88] mb-8">// more projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {others.map(p => (
                <Link key={p.slug} href={`/projects/${p.slug}`}
                  className="group relative rounded-2xl overflow-hidden bg-[#0e0e12] border border-[#1c1c24] hover:border-[#00ff88]/20 transition-colors lift block video-card"
                  style={{ minHeight:"400px" }}
                >
                  <Image src={p.hero} alt={p.title} fill className="object-cover opacity-50 group-hover:opacity-80 transition-opacity duration-500" priority/>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060608]/90 to-transparent"/>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-[#00c4ff] text-xs font-mono mb-1">{p.category}</p>
                    <h3 className="font-display text-2xl font-bold text-white">{p.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
