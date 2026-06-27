import React from "react";
import { LuGem } from "react-icons/lu";
import { cn } from "@/app/utils/cn";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className = "", showText = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3 select-none", className)}>
      {/* Sleek SVG monogram replaced by React Icon: LuGem */}
      <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-400 via-blue-600 to-blue-800 text-white shadow-md shadow-blue-500/20 active:scale-95 transition-transform duration-200">
        <LuGem className="h-6 w-6" />
        <div className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
      </div>

      {showText && (
        <span className="font-extrabold tracking-tight text-xl bg-gradient-to-r from-zinc-900 to-zinc-700 bg-clip-text text-transparent font-sans">
          PT <span className="text-blue-600 font-semibold">Hub</span>
        </span>
      )}
    </div>
  );
}
