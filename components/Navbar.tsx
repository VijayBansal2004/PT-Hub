"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Heart, Sun, Moon } from "lucide-react";
import Link from "next/link";

interface NavbarProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: string[];
  favoritesCount: number;
  darkMode: boolean;
  toggleTheme: () => void;
}

export default function Navbar({
  selectedCategory,
  setSelectedCategory,
  categories,
  favoritesCount,
  darkMode,
  toggleTheme,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200/50 dark:border-zinc-800/50 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl transition-colors duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-2">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-pink-500 to-indigo-600 text-white shadow-md shadow-indigo-500/20">
            <ShoppingBag className="h-5 w-5" />
            <div className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-pink-400 animate-ping" />
          </div>
          <span className="bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 bg-clip-text text-xl font-bold tracking-tight text-transparent">
            AURA
          </span>
        </div>

        {/* Category Navigation (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 bg-zinc-100/80 dark:bg-zinc-800/50 p-1 rounded-full border border-zinc-200/30 dark:border-zinc-700/30">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className="relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-200 cursor-pointer">
              {selectedCategory === category && (
                <motion.span
                  layoutId="active-pill-header"
                  className="absolute inset-0 bg-white dark:bg-zinc-700 shadow-sm rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span
                className={`relative z-10 ${selectedCategory === category ? "text-indigo-600 dark:text-indigo-300 font-semibold" : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"}`}>
                {category}
              </span>
            </button>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          {/* Favorites Button */}
          <Link
            href="/favorites"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200/50 dark:border-zinc-800/50 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            title="View Favorites">
            <Heart
              className={`h-5 w-5 ${favoritesCount > 0 ? "fill-red-500 text-red-500" : "text-zinc-500 dark:text-zinc-400"}`}
            />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white shadow-sm shadow-indigo-600/30 animate-pulse">
                {favoritesCount}
              </span>
            )}
          </Link>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200/50 dark:border-zinc-800/50 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer">
            {darkMode ? (
              <Sun className="h-5 w-5 text-amber-400" />
            ) : (
              <Moon className="h-5 w-5 text-indigo-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
