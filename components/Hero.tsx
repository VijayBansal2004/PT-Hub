"use client";

import { Sparkles } from "lucide-react";

interface HeroProps {
  tag?: string;
  title?: string;
  description?: string;
}

export default function Hero({
  tag = "Smart Gadgets & Luxury Jewellery",
  title = "Innovative Living, Timeless Elegance",
  description = "Discover incredibly useful smart Chinese gadgets, daily life-saving utilities, and stunning handcrafted premium jewellery. Curated import quality delivered to your doorstep.",
}: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-12 pb-6 sm:pt-16 sm:pb-8">
      {/* Background glowing decorations */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-30 blur-3xl">
        <div className="h-72 w-72 rounded-full bg-sky-300 animate-pulse" />
        <div className="h-96 w-96 rounded-full bg-blue-600 ml-12 animate-bounce duration-10000" />
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 border border-blue-200/20 mb-3">
          <Sparkles className="h-3 w-3" /> {tag}
        </div>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl bg-gradient-to-r from-zinc-900 via-blue-950 to-blue-800 bg-clip-text text-transparent">
          {title}
        </h1>
        <p className="mt-4 max-w-xl text-lg text-zinc-500 mx-auto leading-relaxed">
          {description}
        </p>
      </div>
    </section>
  );
}
