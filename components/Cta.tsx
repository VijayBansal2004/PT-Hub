"use client";

import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface CtaProps {
  title?: string;
  description?: string;
  primaryBtnText?: string;
  secondaryBtnText?: string;
}

const PlusIcon = ({ position }: { position: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) => {
  const classes = {
    "top-left": "absolute -top-2.5 -left-2.5",
    "top-right": "absolute -top-2.5 -right-2.5",
    "bottom-left": "absolute -bottom-2.5 -left-2.5",
    "bottom-right": "absolute -bottom-2.5 -right-2.5"
  };
  return (
    <span className={`text-zinc-300 dark:text-zinc-800 text-base font-semibold select-none pointer-events-none z-10 ${classes[position]}`}>
      +
    </span>
  );
};

export default function Cta({
  title = "Get Smarter Gadgets & Exquisite Jewellery First",
  description = "Subscribe to the PT Hub club to receive 15% off your first import order, weekly drops of viral smart utilities, and early access to handcrafted jewellery collections.",
  primaryBtnText = "Join PT Hub Club",
  secondaryBtnText = "Browse Catalog"
}: CtaProps) {

  const handleSubscribe = () => {
    toast.success("Welcome to PT Hub Club!", {
      description: "We have sent your 15% discount code to your inbox.",
      icon: "🎁"
    });
  };

  return (
    <section className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-12 font-sans">
      <div className="relative mx-auto flex w-full flex-col justify-between gap-y-5 border-y border-zinc-200 dark:border-zinc-800 px-8 py-10 bg-white/40 dark:bg-zinc-950/20 backdrop-blur-sm dark:bg-[radial-gradient(35%_80%_at_25%_0%,rgba(99,102,241,0.06),transparent)]">
        
        {/* Corner Plus Grid Accents */}
        <PlusIcon position="top-left" />
        <PlusIcon position="top-right" />
        <PlusIcon position="bottom-left" />
        <PlusIcon position="bottom-right" />

        {/* Layout Border Accents */}
        <div className="pointer-events-none absolute -inset-y-6 -left-px w-px border-l border-zinc-200 dark:border-zinc-800/80" />
        <div className="pointer-events-none absolute -inset-y-6 -right-px w-px border-r border-zinc-200 dark:border-zinc-800/80" />
        <div className="absolute top-0 left-1/2 -z-10 h-full border-l border-dashed border-zinc-200/50 dark:border-zinc-800/25" />

        <div className="flex flex-col items-center gap-1">
          <div className="inline-flex items-center gap-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-0.5 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 border border-indigo-200/10">
            <Sparkles className="h-3 w-3" /> PT HUB PRIVILEGES
          </div>
          <h2 className="text-center font-extrabold text-2xl md:text-3xl text-zinc-900 dark:text-white tracking-tight mt-3">
            {title}
          </h2>
        </div>

        <p className="text-balance text-center text-sm md:text-base text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
          {description}
        </p>

        <div className="flex items-center justify-center gap-3">
          {/* Secondary Link button */}
          <button
            onClick={() => toast("PT Hub Membership brochure requested.")}
            className="px-5 py-2.5 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold text-xs hover:bg-zinc-50 dark:hover:bg-zinc-850 active:scale-95 transition-all cursor-pointer bg-white/60 dark:bg-zinc-900/50"
          >
            {secondaryBtnText}
          </button>

          {/* Primary Action button */}
          <button
            onClick={handleSubscribe}
            className="px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/30 hover:shadow-indigo-600/50 flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer"
          >
            {primaryBtnText}
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
