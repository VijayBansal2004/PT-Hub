"use client";

import { Sparkles } from "lucide-react";

interface HeroStat {
  value: string;
  label: string;
}

interface HeroProps {
  tag?: string;
  title?: string;
  description?: string;
  stats?: HeroStat[];
}

const DEFAULT_STATS: HeroStat[] = [
  { value: "150+", label: "Smart Products" },
  { value: "4.9★", label: "Avg Rating" },
  { value: "2-Day", label: "Fast Dispatch" },
];

export default function Hero({
  tag = "Smart Gadgets & Luxury Jewellery",
  title = "Innovative Living, Timeless Elegance",
  description = "Discover incredibly useful smart Chinese gadgets, life-saving household utilities, and stunning handcrafted premium jewellery. Curated import quality delivered to your doorstep.",
  stats = DEFAULT_STATS,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-12 pb-6 sm:pt-16 sm:pb-8">
      {/* Background glowing decorations */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-30 dark:opacity-20 blur-3xl">
        <div className="h-72 w-72 rounded-full bg-pink-500 animate-pulse" />
        <div className="h-96 w-96 rounded-full bg-indigo-600 ml-12 animate-bounce duration-10000" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          {/* Main Info */}
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 border border-indigo-200/20">
              <Sparkles className="h-3 w-3" /> {tag}
            </div>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl bg-gradient-to-r from-zinc-900 via-indigo-950 to-pink-900 dark:from-white dark:via-zinc-100 dark:to-zinc-500 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="mt-2 max-w-xl text-lg text-zinc-500 dark:text-zinc-400">
              {description}
            </p>
          </div>

          {/* Dynamic Stats Box */}
          {stats && stats.length > 0 && (
            <div className="hidden sm:flex gap-8 bg-white/40 dark:bg-zinc-900/40 border border-zinc-200/30 dark:border-zinc-800/30 p-6 rounded-2xl backdrop-blur-md">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex gap-8 items-center">
                  {idx > 0 && (
                    <div className="border-r border-zinc-200 dark:border-zinc-800 h-8" />
                  )}
                  <div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
