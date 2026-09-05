"use client";

import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="relative w-12 h-7 rounded-full bg-[var(--color-border)] border border-[var(--color-subtle)] transition-all duration-300 flex items-center px-1 active:scale-95 group"
      aria-label="Toggle dark/light mode"
      aria-pressed={theme === "light"}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {/* Background indicator */}
      <div
        className={`pointer-events-none absolute inset-0 rounded-full bg-[var(--accent)] opacity-20 transition-opacity duration-300 ${
          theme === "light" ? "opacity-30" : "opacity-0"
        }`}
      />

      {/* Toggle circle */}
      <div
        className={`pointer-events-none relative w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300 flex items-center justify-center ${
          theme === "light" ? "translate-x-5" : "translate-x-0"
        }`}
      >
        {theme === "dark" ? (
          <span className="text-[10px]">🌙</span>
        ) : (
          <span className="text-[10px]">☀️</span>
        )}
      </div>
    </button>
  );
}
