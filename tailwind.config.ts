import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)"],
        sans:    ["var(--font-sans)"],
        mono:    ["var(--font-mono)"],
      },
      colors: {
        bg:      "#060608",
        surface: "#0e0e12",
        border:  "#1c1c24",
        accent:  "#00ff88",
        accent2: "#00c4ff",
        muted:   "#555566",
      },
      keyframes: {
        "fade-up":    { "0%":{ opacity:"0", transform:"translateY(28px)" }, "100%":{ opacity:"1", transform:"translateY(0)" } },
        "fade-in":    { "0%":{ opacity:"0" }, "100%":{ opacity:"1" } },
        marquee:      { "0%":{ transform:"translateX(0)" }, "100%":{ transform:"translateX(-50%)" } },
        float:        { "0%,100%":{ transform:"translateY(0)" }, "50%":{ transform:"translateY(-10px)" } },
        "spin-slow":  { "0%":{ transform:"rotate(0deg)" }, "100%":{ transform:"rotate(360deg)" } },
        shimmer:      { "0%":{ backgroundPosition:"-200% center" }, "100%":{ backgroundPosition:"200% center" } },
        blink:        { "0%,100%":{ opacity:"1" }, "50%":{ opacity:"0" } },
        "scan":       { "0%":{ transform:"translateY(-100%)" }, "100%":{ transform:"translateY(400%)" } },
        glow:         { "0%,100%":{ opacity:"0.4" }, "50%":{ opacity:"1" } },
      },
      animation: {
        "fade-up":   "fade-up 0.7s ease forwards",
        "fade-in":   "fade-in 0.5s ease forwards",
        marquee:     "marquee 32s linear infinite",
        float:       "float 4s ease-in-out infinite",
        "spin-slow": "spin-slow 20s linear infinite",
        shimmer:     "shimmer 3s linear infinite",
        blink:       "blink 1s step-end infinite",
        scan:        "scan 3s linear infinite",
        glow:        "glow 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
