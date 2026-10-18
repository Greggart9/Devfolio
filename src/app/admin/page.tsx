import Link from "next/link";
import {
  getProjects,
  getServices,
  getSkills,
  getFaqs,
  getAboutProfile,
} from "@/lib/data-service";
import {
  FolderGit2,
  Layers,
  Sparkles,
  HelpCircle,
  UserCheck,
  Plus,
  ExternalLink,
  ArrowUpRight,
  Database,
  Cloud,
  CheckCircle,
} from "lucide-react";

export const revalidate = 0; // Dynamic server component

export default async function AdminDashboardPage() {
  const [projects, services, skills, faqs, about] = await Promise.all([
    getProjects(),
    getServices(),
    getSkills(),
    getFaqs(),
    getAboutProfile(),
  ]);

  const stats = [
    {
      label: "Total Projects",
      count: projects.length,
      href: "/admin/projects",
      icon: FolderGit2,
      color: "from-blue-600 to-cyan-500",
    },
    {
      label: "Core Services",
      count: services.length,
      href: "/admin/services",
      icon: Layers,
      color: "from-indigo-600 to-purple-500",
    },
    {
      label: "Falling Skill Tags",
      count: skills.length,
      href: "/admin/skills",
      icon: Sparkles,
      color: "from-emerald-600 to-teal-500",
    },
    {
      label: "FAQ Questions",
      count: faqs.length,
      href: "/admin/faq",
      icon: HelpCircle,
      color: "from-amber-600 to-orange-500",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Welcome Banner */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-blue-900/30 via-slate-900/40 to-slate-900 border border-slate-800 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-xs mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>LIVE CMS ACTIVE</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-display font-black text-white tracking-tight">
            Welcome back, Olúwadámiláre
          </h1>
          <p className="text-slate-400 text-sm mt-1 leading-relaxed">
            Your portfolio is dynamically connected to PostgreSQL on Supabase and Cloudinary CDN.
            Any updates made here update your live portfolio instantly.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-5">
            <Link
              href="/admin/projects"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create New Project</span>
            </Link>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all border border-slate-700"
            >
              <span>View Portfolio</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Decorative background shape */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-blue-500/10 to-transparent pointer-events-none" />
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.label}
              href={s.href}
              className="group p-5 rounded-2xl bg-[#0E1524] border border-slate-800 hover:border-slate-700 transition-all hover:translate-y-[-2px] shadow-sm relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${s.color} flex items-center justify-center text-white shadow-md`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
              </div>
              <p className="text-2xl font-display font-extrabold text-white">
                {s.count}
              </p>
              <p className="text-xs font-mono text-slate-400 mt-1 uppercase tracking-wider">
                {s.label}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Two Column Section: Quick Actions & Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Content Management Shortcuts */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-base font-display font-bold text-white tracking-tight">
            Portfolio Content Sections
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/admin/projects"
              className="p-4 rounded-xl bg-[#0E1524] border border-slate-800/80 hover:border-blue-500/40 transition-all group"
            >
              <div className="flex items-center gap-3">
                <FolderGit2 className="w-5 h-5 text-blue-400" />
                <h3 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                  Project Case Studies
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Manage full project details, slugs, tags, challenge, solution, videos, and multi-screenshot galleries.
              </p>
            </Link>

            <Link
              href="/admin/services"
              className="p-4 rounded-xl bg-[#0E1524] border border-slate-800/80 hover:border-blue-500/40 transition-all group"
            >
              <div className="flex items-center gap-3">
                <Layers className="w-5 h-5 text-indigo-400" />
                <h3 className="text-sm font-semibold text-white group-hover:text-indigo-400 transition-colors">
                  Services & Offerings
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Update core frontend, CMS, and optimization services with custom tools and Cloudinary thumbnails.
              </p>
            </Link>

            <Link
              href="/admin/skills"
              className="p-4 rounded-xl bg-[#0E1524] border border-slate-800/80 hover:border-blue-500/40 transition-all group"
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">
                  Interactive Falling Skills
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Add, remove, or modify physics falling tags with custom color themes (white, dark, accent).
              </p>
            </Link>

            <Link
              href="/admin/about"
              className="p-4 rounded-xl bg-[#0E1524] border border-slate-800/80 hover:border-blue-500/40 transition-all group"
            >
              <div className="flex items-center gap-3">
                <UserCheck className="w-5 h-5 text-cyan-400" />
                <h3 className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">
                  About Me & Bio
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Update your bio copy, headline, experience counter, resume link, and profile portrait.
              </p>
            </Link>

            <Link
              href="/admin/faq"
              className="p-4 rounded-xl bg-[#0E1524] border border-slate-800/80 hover:border-blue-500/40 transition-all group sm:col-span-2"
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-semibold text-white group-hover:text-amber-400 transition-colors">
                  Frequently Asked Questions (FAQs)
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Organize questions across categories (General, Pricing, Process, Results) for incoming clients.
              </p>
            </Link>
          </div>
        </div>

        {/* Right 1 Col: System & Infrastructure Status */}
        <div className="space-y-4">
          <h2 className="text-base font-display font-bold text-white tracking-tight">
            Infrastructure Status
          </h2>

          <div className="p-5 rounded-2xl bg-[#0E1524] border border-slate-800 space-y-4">
            <div className="flex items-start gap-3">
              <Database className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-white">PostgreSQL Database</p>
                <p className="text-[11px] text-slate-400">
                  Supabase Project: <span className="font-mono text-slate-300">otgbhcowmpmtoemjzqef</span>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Cloud className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-white">Cloudinary CDN</p>
                <p className="text-[11px] text-slate-400">
                  Cloud Name: <span className="font-mono text-slate-300">degearesj</span>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-white">Instant Cache Revalidation</p>
                <p className="text-[11px] text-slate-400">
                  Changes made here trigger immediate revalidation across all pages.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-500 font-mono">
              Admin: <span className="text-slate-300">oluwadamilare.greggart9@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
