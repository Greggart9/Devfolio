"use client";

import React from "react";

interface AlienLogoProps {
  className?: string;
  eyeColor?: string;
}

/**
 * 8-Bit Alien Monster (👾) Vector Logo
 * Styled in retro pixel-art aesthetic for the site's primary brand identity.
 */
export default function AlienLogo({
  className = "w-4 h-4",
  eyeColor = "#FFFFFF",
}: AlienLogoProps) {
  return (
    <svg
      viewBox="0 0 22 16"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g fill="currentColor">
        {/* Antennae */}
        <rect x="4" y="0" width="2" height="2" rx="0.3" />
        <rect x="16" y="0" width="2" height="2" rx="0.3" />
        <rect x="6" y="2" width="2" height="2" rx="0.3" />
        <rect x="14" y="2" width="2" height="2" rx="0.3" />

        {/* Head / Brow */}
        <rect x="2" y="4" width="18" height="2" rx="0.3" />

        {/* Eye Row Body Segments */}
        <rect x="0" y="6" width="4" height="2" rx="0.3" />
        <rect x="6" y="6" width="10" height="2" rx="0.3" />
        <rect x="18" y="6" width="4" height="2" rx="0.3" />

        {/* Middle Torso */}
        <rect x="0" y="8" width="22" height="2" rx="0.3" />

        {/* Lower Torso Cutouts */}
        <rect x="0" y="10" width="2" height="2" rx="0.3" />
        <rect x="4" y="10" width="14" height="2" rx="0.3" />
        <rect x="20" y="10" width="2" height="2" rx="0.3" />

        {/* Legs */}
        <rect x="0" y="12" width="2" height="2" rx="0.3" />
        <rect x="4" y="12" width="2" height="2" rx="0.3" />
        <rect x="16" y="12" width="2" height="2" rx="0.3" />
        <rect x="20" y="12" width="2" height="2" rx="0.3" />

        {/* Feet */}
        <rect x="6" y="14" width="4" height="2" rx="0.3" />
        <rect x="12" y="14" width="4" height="2" rx="0.3" />
      </g>

      {/* Expressive Pixel Eyes */}
      <g fill={eyeColor}>
        <rect x="4" y="6" width="2" height="2" rx="0.3" />
        <rect x="16" y="6" width="2" height="2" rx="0.3" />
      </g>
    </svg>
  );
}
