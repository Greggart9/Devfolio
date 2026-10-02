"use client";

import { useEffect, useState, useRef } from "react";

/**
 * BottomBlur component
 * Creates an ultra-smooth, multi-layer progressive (gradient) blur at the base of the viewport.
 * As content scrolls up from the bottom of the screen, it emerges smoothly from a soft blur
 * into sharp focus with no perceptible dividing line.
 *
 * UX enhancement:
 * When the user scrolls all the way to the bottom of the page, the blur smoothly disappears
 * so the footer content, copyright, and action buttons are 100% crisp and unobstructed.
 * As soon as the user scrolls back up, the blur smoothly reappears.
 */

const BLUR_LAYERS = [
  { blur: "1px",  maskStop: "30%" },
  { blur: "2px",  maskStop: "45%" },
  { blur: "4px",  maskStop: "60%" },
  { blur: "8px",  maskStop: "72%" },
  { blur: "14px", maskStop: "84%" },
  { blur: "22px", maskStop: "93%" },
  { blur: "32px", maskStop: "100%" },
];

export default function BottomBlur() {
  const [visible, setVisible] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      // Calculate distance remaining to the absolute bottom of the document
      const distanceToBottom = scrollHeight - (scrollTop + clientHeight);

      // Rule 1: Never show at the top of the page (hero view) or at the bottom (footer view)
      if (scrollTop <= 50 || distanceToBottom <= 110) {
        setVisible(false);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        return;
      }

      // Rule 2: User is actively scrolling between top and bottom -> show blur
      setVisible(true);

      // Rule 3: Clear any existing idle timeout, and fade out once scrolling stops
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        setVisible(false);
      }, 900);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`pointer-events-none fixed bottom-0 left-0 right-0 z-40 h-24 md:h-32 select-none transition-opacity duration-700 ease-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {BLUR_LAYERS.map((layer, index) => (
        <div
          key={index}
          className="absolute inset-0"
          style={{
            backdropFilter: `blur(${layer.blur})`,
            WebkitBackdropFilter: `blur(${layer.blur})`,
            maskImage: `linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) ${layer.maskStop})`,
            WebkitMaskImage: `linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) ${layer.maskStop})`,
          }}
        />
      ))}

      {/* Subtle fade tint at the very bottom edge to softly anchor the page transition */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(255, 255, 255, 0.7) 0%, transparent 60%)",
        }}
      />
    </div>
  );
}
