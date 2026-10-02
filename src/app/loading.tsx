import AlienLogo from "@/components/AlienLogo";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F8FAFC]/90 backdrop-blur-md transition-opacity duration-300">
      <div className="relative flex flex-col items-center select-none">
        {/* Glowing Alien Monster Brand Tile */}
        <div className="relative w-16 h-16 rounded-2xl bg-white/90 border border-blue-500/30 flex items-center justify-center text-[#3B82F6] shadow-[0_10px_25px_rgba(59,130,246,0.18)] mb-5">
          <AlienLogo className="w-8 h-8 animate-pulse text-[#3B82F6]" />
        </div>

        {/* Indeterminate Loading Progress Track */}
        <div className="w-36 h-1 rounded-full bg-slate-200/80 overflow-hidden relative">
          <div className="absolute inset-y-0 w-1/2 bg-[#3B82F6] rounded-full animate-[progress-bar-shimmer_1.4s_infinite_linear] [background-image:linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.4)_50%,transparent_100%)]" />
        </div>

        {/* Minimalist Status Text */}
        <p className="font-mono text-[11px] font-semibold tracking-widest text-slate-500 uppercase mt-3">
          Loading
        </p>
      </div>
    </div>
  );
}
