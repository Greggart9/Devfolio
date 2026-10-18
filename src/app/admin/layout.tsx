"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  LayoutDashboard,
  FolderGit2,
  Layers,
  Sparkles,
  UserCheck,
  HelpCircle,
  ExternalLink,
  LogOut,
  Menu,
  X,
  Database,
  CloudUpload,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const supabase = createClient();

  // If on login page or reset password page, don't wrap in admin sidebar
  if (pathname === "/admin/login" || pathname === "/admin/reset-password") {
    return <>{children}</>;
  }

  const navLinks = [
    { href: "/admin", label: "Overview", icon: LayoutDashboard },
    { href: "/admin/projects", label: "Projects", icon: FolderGit2 },
    { href: "/admin/services", label: "Services", icon: Layers },
    { href: "/admin/skills", label: "Falling Skills", icon: Sparkles },
    { href: "/admin/about", label: "About Profile", icon: UserCheck },
    { href: "/admin/faq", label: "FAQs", icon: HelpCircle },
  ];

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#080C14] text-slate-100 flex flex-col md:flex-row font-sans">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#0F172A] border-b border-slate-800 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-xs">
            DEV
          </div>
          <span className="font-display font-extrabold text-sm tracking-tight">Admin CMS</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-30 h-screen w-64 bg-[#0B111E] border-r border-slate-800/80 flex flex-col justify-between p-5 transition-transform duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div>
          {/* Brand header */}
          <div className="flex items-center gap-3 px-2 py-3 mb-6 border-b border-slate-800/60 pb-5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-black text-white text-sm shadow-md shadow-blue-500/20">
              D
            </div>
            <div>
              <h2 className="font-display font-bold text-sm tracking-tight text-white leading-none">
                Devfolio CMS
              </h2>
              <span className="text-[10px] font-mono text-blue-400 font-medium">Postgres & Cloudinary</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25 font-semibold"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer actions */}
        <div className="pt-4 border-t border-slate-800/60 space-y-2">
          {/* Live site link */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono text-slate-400 hover:text-white hover:bg-slate-800/40 transition-colors"
          >
            <span className="flex items-center gap-2.5">
              <ExternalLink className="w-4 h-4 text-blue-400" />
              <span>Live Portfolio</span>
            </span>
            <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">View</span>
          </a>

          {/* Admin badge */}
          <div className="px-3.5 py-2 rounded-xl bg-slate-900/60 border border-slate-800/60">
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Signed In As</p>
            <p className="text-xs text-slate-300 font-mono truncate" title="oluwadamilare.greggart9@gmail.com">
              oluwadamilare.greggart9@gmail.com
            </p>
          </div>

          {/* Logout button */}
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors font-medium"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-6 md:p-10 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
