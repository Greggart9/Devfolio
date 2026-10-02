import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden dot-grid">
      <div className="blob bg-[#3B82F6]/10 w-[500px] h-[500px] -top-20 -left-20"/>
      <div className="blob bg-[#60A5FA]/10 w-[400px] h-[400px] -bottom-20 -right-10"/>

      <div className="relative z-10 text-center px-6">
        <p className="font-mono text-[10rem] md:text-[14rem] font-bold leading-none g-text opacity-10 select-none">404</p>
        <div className="-mt-8 md:-mt-14">
          <p className="text-[10px] font-mono text-[#3B82F6] uppercase tracking-widest mb-4 font-semibold">// page not found</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Nothing here.
          </h1>
          <p className="text-slate-600 text-base mb-8 max-w-sm mx-auto font-mono">
            Looks like this route doesn&apos;t exist. Let&apos;s get you back home.
          </p>
          <Link href="/" className="btn-shimmer px-8 py-3.5 rounded-full font-mono text-sm inline-block">
            $ cd ~ →
          </Link>
        </div>
      </div>
    </section>
  );
}
