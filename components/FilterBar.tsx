"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, SlidersHorizontal, ChevronDown, Check } from "lucide-react";

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: string[];
  sortBy: string;
  setSortBy: (sort: string) => void;
  sortLabels: Record<string, string>;
}

export default function FilterBar({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories,
  sortBy,
  setSortBy,
  sortLabels,
}: FilterBarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-y border-zinc-200/50 dark:border-zinc-800/50 py-5">
        {/* Category selection (Mobile only) */}
        <div className="flex md:hidden items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`flex-shrink-0 px-4 py-2 text-xs font-semibold rounded-full border transition-all cursor-pointer ${
                selectedCategory === category
                  ? "bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-zinc-950 dark:border-white shadow-sm"
                  : "bg-white text-zinc-600 border-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800"
              }`}>
              {category}
            </button>
          ))}
        </div>

        {/* Search Input field */}
        <div className="relative flex-1 max-w-md">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4.5 w-4.5 text-zinc-400" />
          </div>
          <input
            type="text"
            value={searchQuery.trim() === "" ? "" : searchQuery}
            onChange={(e) => setSearchQuery(e.target.value || " ")}
            placeholder="Search premium products..."
            className="block w-full rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 py-2.5 pl-10 pr-4 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all shadow-sm"
          />
          {searchQuery.trim() !== "" && (
            <button
              onClick={() => setSearchQuery(" ")}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-400 hover:text-zinc-600 cursor-pointer">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Sorting Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-zinc-700 dark:text-zinc-300 shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all w-full sm:w-auto justify-between cursor-pointer">
            <span className="flex items-center gap-1.5">
              <SlidersHorizontal className="h-4 w-4 text-indigo-500" />
              Sort:{" "}
              <span className="text-zinc-900 dark:text-white">
                {sortLabels[sortBy] || "Featured"}
              </span>
            </span>
            <ChevronDown
              className={`h-4 w-4 text-zinc-500 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsDropdownOpen(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-56 origin-top-right rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-2 shadow-xl ring-1 ring-black/5 z-50 focus:outline-none">
                  {Object.entries(sortLabels).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setSortBy(key);
                        setIsDropdownOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${
                        sortBy === key
                          ? "bg-indigo-500 text-white"
                          : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      }`}>
                      {label}
                      {sortBy === key && <Check className="h-4 w-4" />}
                    </button>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
