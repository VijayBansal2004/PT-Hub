"use client";

import React from "react";
import { Star, MessageSquare } from "lucide-react";
import Image from "next/image";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  content: string;
  itemBought: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Sarah Jenkins",
    role: "Jewellery Collector",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5,
    content: "The Aura Gold Bangle is stunning. The craftsmanship is highly detailed, and it has an incredible luxury weight. It adds the perfect elegance to my outfits.",
    itemBought: "Aura Gold Bangle"
  },
  {
    id: "t2",
    name: "David Chen",
    role: "Tech Enthusiast",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5,
    content: "Minimalism and utility combined. The Mag-Charge Desk Base is walnut and aluminum, heavy, and charges rapidly. It makes my smart workspace look futuristic.",
    itemBought: "Mag-Charge Desk Base"
  },
  {
    id: "t3",
    name: "Elena Rostova",
    role: "Lifestyle Blogger",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5,
    content: "I am absolutely obsessed with the Jade Pendant Necklace. The stone quality is pristine and it has a beautiful premium finish. Highly recommend PT Hub imports!",
    itemBought: "Imperial Jade Pendant"
  },
  {
    id: "t4",
    name: "Marcus Miller",
    role: "Smart Home Enthusiast",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5,
    content: "This Automatic Rice Dispenser with a digital scaling cup is a game changer for my kitchen. Super functional Chinese smart kitchen utility. Sturdy and precise.",
    itemBought: "Smart Culinary Rice Dispenser"
  },
  {
    id: "t5",
    name: "Sophia Martinez",
    role: "Product Reviewer",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5,
    content: "The Ultra-Sonic Jewellery Cleaner from PT Hub works like a charm. Cleans my premium rings and watches in minutes. A must-have gadget for any jewellery lover.",
    itemBought: "Sonic-Wash Jewellery Cleaner"
  },
  {
    id: "t6",
    name: "Lucas Vance",
    role: "Gadget Collector",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5,
    content: "I bought the Folding Desk Fan with built-in power bank. Extremely useful, portable, and runs silent. PT Hub sources the best high-quality useful Chinese gadgets.",
    itemBought: "3-in-1 Smart Folding Fan"
  }
];

export default function Testimonials() {
  // Split testimonials into two groups to run in opposite directions
  const row1 = [...TESTIMONIALS];
  const row2 = [...TESTIMONIALS].reverse();

  // Duplicate arrays to create a seamless scrolling loop
  const doubleRow1 = [...row1, ...row1];
  const doubleRow2 = [...row2, ...row2];

  return (
    <section className="w-full py-16 bg-zinc-50/50 dark:bg-zinc-950/20 border-t border-zinc-200/30 dark:border-zinc-800/30 overflow-hidden font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 border border-indigo-200/20">
          <MessageSquare className="h-3.5 w-3.5" /> Customer Stories
        </div>
        <h2 className="mt-3 font-extrabold text-3xl md:text-4xl text-zinc-900 dark:text-white tracking-tight">
          Loved by Tastemakers
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
          See how our community of designers, architects, and creatives styling their spaces and wardrobes with PT Hub premium goods.
        </p>
      </div>

      {/* Marquee Rows Container */}
      <div className="flex flex-col gap-6 w-full relative">
        {/* Row 1: Left to Right */}
        <div className="flex overflow-hidden w-full select-none [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
          <div className="flex gap-4 w-max shrink-0 animate-marquee hover:[animation-play-state:paused] py-1">
            {doubleRow1.map((testimonial, idx) => (
              <TestimonialCard key={`${testimonial.id}-row1-${idx}`} testimonial={testimonial} />
            ))}
          </div>
        </div>

        {/* Row 2: Right to Left (Reverse) */}
        <div className="flex overflow-hidden w-full select-none [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
          <div className="flex gap-4 w-max shrink-0 animate-marquee-reverse hover:[animation-play-state:paused] py-1">
            {doubleRow2.map((testimonial, idx) => (
              <TestimonialCard key={`${testimonial.id}-row2-${idx}`} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="w-[340px] sm:w-[380px] shrink-0 p-6 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 backdrop-blur-sm">
      <div>
        {/* Stars and Bought Tag */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-0.5">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/10">
            {testimonial.itemBought}
          </span>
        </div>

        {/* Content */}
        <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed italic mb-6">
          &ldquo;{testimonial.content}&rdquo;
        </p>
      </div>

      {/* Author Profile */}
      <div className="flex items-center gap-3 border-t border-zinc-100 dark:border-zinc-800/60 pt-4">
        <div className="relative h-10 w-10 overflow-hidden rounded-full ring-1 ring-zinc-200 dark:ring-zinc-800">
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            fill
            className="object-cover"
            sizes="40px"
          />
        </div>
        <div>
          <h4 className="text-sm font-bold text-zinc-900 dark:text-white leading-none">
            {testimonial.name}
          </h4>
          <span className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500 mt-1 block">
            {testimonial.role}
          </span>
        </div>
      </div>
    </div>
  );
}
