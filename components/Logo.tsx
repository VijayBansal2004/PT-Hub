import React from "react";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className = "", showText = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Sleek SVG monogram: Diamond + Tech Circuit (representing Jewellery & Useful Gadgets) */}
      <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 via-indigo-600 to-indigo-800 text-white shadow-md shadow-indigo-500/20 active:scale-95 transition-transform duration-200">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
        >
          {/* Diamond Cut Outline */}
          <path
            d="M6 9 L12 3 L18 9 L12 21 Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Horizontal and vertical facets */}
          <path
            d="M6 9 H18"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 3 V21"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Tech Circuit Node */}
          <circle cx="12" cy="9" r="1.5" fill="currentColor" />
          <path
            d="M9 13.5 L12 16 L15 13.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
      </div>
      
      {showText && (
        <span className="font-extrabold tracking-tight text-xl bg-gradient-to-r from-zinc-900 to-zinc-700 bg-clip-text text-transparent font-sans">
          PT <span className="text-indigo-600 font-semibold">Hub</span>
        </span>
      )}
    </div>
  );
}
