"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  id: string;
  title: string;
  content: string;
}

const FAQ_QUESTIONS: FAQItem[] = [
  {
    id: "item-1",
    title: "What is PT Hub?",
    content: "PT Hub is a curated lifestyle boutique offering premium essentials, accessories, kids items, and home utilities. We focus on clean minimalism, high-end materials, and functional design."
  },
  {
    id: "item-2",
    title: "How long does shipping take?",
    content: "We process all orders within 24 hours. Standard shipping takes 3-5 business days, while express lookbook shipping takes 1-2 business days. Tracking details are sent automatically upon dispatch."
  },
  {
    id: "item-3",
    title: "What is your return policy?",
    content: "We support 30-day hassle-free returns. If you are not completely satisfied with your purchase, you can return any unworn, unused items in their original packaging for a full refund."
  },
  {
    id: "item-4",
    title: "Are PT Hub products sustainably sourced?",
    content: "Yes, sustainability is at our core. Our leather goods are vegetable-tanned, apparel items are crafted from organic mulberry silk and cotton, and utility items are constructed from genuine wood and aluminum."
  },
  {
    id: "item-5",
    title: "How do I register a warranty for my charger/watch?",
    content: "All electronics (chargers, chronograph watches) automatically come with a 2-year warranty from the date of purchase. You do not need to register separately; your order receipt acts as proof."
  }
];

export default function Faqs() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleQuestion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="mx-auto w-full max-w-3xl space-y-7 px-4 sm:px-6 lg:px-8 py-12 border-t border-zinc-200/30 dark:border-zinc-800/30 font-sans">
      <div className="space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 border border-indigo-200/20">
          <HelpCircle className="h-3.5 w-3.5" /> Support Center
        </div>
        <h2 className="font-extrabold text-3xl md:text-4xl text-zinc-900 dark:text-white tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="max-w-2xl text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
          Here are some common queries and responses from our customers. If you don&apos;t find the answer you&apos;re looking for, feel free to reach out to our team.
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-200/60 dark:border-zinc-800/80 bg-white/50 dark:bg-zinc-900/30 divide-y divide-zinc-200/50 dark:divide-zinc-800/60 overflow-hidden shadow-sm backdrop-blur-sm">
        {FAQ_QUESTIONS.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div key={item.id} className="transition-colors duration-200">
              <button
                onClick={() => toggleQuestion(item.id)}
                className="flex w-full items-center justify-between px-6 py-4.5 text-left text-sm sm:text-base font-bold text-zinc-800 dark:text-zinc-200 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none transition-colors cursor-pointer"
              >
                <span>{item.title}</span>
                <ChevronDown
                  className={`h-4.5 w-4.5 text-zinc-400 transition-transform duration-250 ${
                    isOpen ? "rotate-180 text-indigo-500" : ""
                  }`}
                />
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: isOpen ? "auto" : 0,
                  opacity: isOpen ? 1 : 0
                }}
                transition={{ duration: 0.25, ease: [0.04, 0.62, 0.23, 0.98] }}
                className="overflow-hidden px-6"
              >
                <div className="pb-4.5 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {item.content}
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      <p className="text-center sm:text-left text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-medium">
        Can&apos;t find what you&apos;re looking for? Contact our{" "}
        <a className="text-indigo-600 dark:text-indigo-400 hover:underline font-bold" href="#support">
          customer support team
        </a>
      </p>
    </section>
  );
}
