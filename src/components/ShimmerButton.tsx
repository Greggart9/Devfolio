// components/ShimmerButton.tsx

import React from "react";

interface ShimmerButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function ShimmerButton({
  href,
  onClick,
  children,
  className = "",
}: ShimmerButtonProps) {
  const baseStyles = `
    relative inline-flex items-center justify-center gap-2.5 
    px-5 py-1.5 rounded-full text-[15px] 
    cursor-pointer overflow-hidden transition-all duration-300 
    ease-in-out hover:scale-105 hover:border-white/60 
    active:scale-[0.97] group btn-shimmer ${className}
  `;

  const inlineStyles = {
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
    border: "3px solid rgba(255, 255, 255, 0.3)",
  };

  const content = (
    <>
      {/* Shine sweep effect */}
      <span
        className="absolute top-0 left-[-100px] w-[100px] h-full opacity-60 group-hover:animate-shine"
        style={{
          backgroundImage:
            "linear-gradient(120deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.8), rgba(255,255,255,0) 70%)",
        }}
      />

      {children}

      {/* Arrow icon */}
      <svg
        fill="currentColor"
        viewBox="0 0 24 24"
        className="w-6 h-6 transition-transform duration-300 ease-in-out group-hover:translate-x-1"
      >
        <path
          clipRule="evenodd"
          fillRule="evenodd"
          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
        />
      </svg>
    </>
  );

  if (href) {
    return (
      <a href={href} className={baseStyles} style={inlineStyles}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={baseStyles} style={inlineStyles}>
      {content}
    </button>
  );
}