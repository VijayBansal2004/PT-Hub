"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Heart } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Logo from "./Logo";

interface NavbarProps {
  selectedCategory?: string;
  setSelectedCategory?: (category: string) => void;
  categories?: string[];
  favoritesCount: number;
}

const DEFAULT_CATEGORIES = ["All", "Utilities", "Jewellery", "Dresses"];

export default function Navbar({
  selectedCategory = "All",
  setSelectedCategory,
  categories = DEFAULT_CATEGORIES,
  favoritesCount,
}: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleCategoryClick = (category: string) => {
    if (pathname === "/products") {
      if (setSelectedCategory) {
        setSelectedCategory(category);
      }
    } else {
      router.push(`/products?category=${encodeURIComponent(category)}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200/50 bg-white/70 backdrop-blur-xl transition-colors duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/">
          <Logo />
        </Link>

        {/* Category Navigation (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 bg-zinc-100/80 p-1 rounded-full border border-zinc-200/30">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className="relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-200 cursor-pointer">
              {selectedCategory === category && (
                <motion.span
                  layoutId="active-pill-header"
                  className="absolute inset-0 bg-white shadow-sm rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span
                className={`relative z-10 ${selectedCategory === category ? "text-indigo-600 font-semibold" : "text-zinc-600 hover:text-zinc-900"}`}>
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
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200/50 bg-white hover:bg-zinc-100 transition-colors cursor-pointer"
            title="View Favorites">
            <Heart
              className={`h-5 w-5 ${favoritesCount > 0 ? "fill-red-500 text-red-500" : "text-zinc-500"}`}
            />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white shadow-sm shadow-indigo-600/30 animate-pulse">
                {favoritesCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
