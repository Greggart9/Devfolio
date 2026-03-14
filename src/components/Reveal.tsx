"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const run = () => {
      const io = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("visible");
              io.unobserve(e.target);
            }
          }),
        { threshold: 0.08 }
      );

      const bio = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) {
              (e.target as HTMLElement).classList.add("go");
              bio.unobserve(e.target);
            }
          }),
        { threshold: 0.25 }
      );

      document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
      document.querySelectorAll(".pbar").forEach((el) => bio.observe(el));

      return () => { io.disconnect(); bio.disconnect(); };
    };

    // Small delay so Next.js finishes painting before we observe
    const t = setTimeout(run, 100);
    return () => clearTimeout(t);
  }, [pathname]);

  return null;
}