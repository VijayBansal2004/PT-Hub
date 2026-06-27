"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Heart, ShoppingBag, Moon, Sun } from "lucide-react";
import { Toaster, toast } from "sonner";
import { PRODUCTS, Product } from "../data";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import Footer from "@/components/Footer";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(true);

  // Initialize client-side favorites and theme preferences
  useEffect(() => {
    const savedFavs = localStorage.getItem("aura-favorites");
    if (savedFavs) {
      try {
        const parsed = JSON.parse(savedFavs);
        if (parsed && Array.isArray(parsed)) {
          setTimeout(() => {
            setFavorites(parsed);
          }, 0);
        }
      } catch (e) {
        console.error("Error loading favorites", e);
      }
    }
    const savedTheme = localStorage.getItem("aura-theme");
    if (savedTheme === "light") {
      setTimeout(() => {
        setDarkMode(false);
      }, 0);
    }
  }, []);

  // Synchronize darkMode class on document.documentElement
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleFavorite = (productId: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    let updated: string[];
    if (favorites.includes(productId)) {
      updated = favorites.filter((id) => id !== productId);
      toast("Removed from Favourites", {
        icon: "💔"
      });
      // Close modal if the currently selected product is removed
      if (selectedProduct?.id === productId) {
        setSelectedProduct(null);
      }
    } else {
      updated = [...favorites, productId];
      toast.success("Added to Favourites!", {
        icon: "💖"
      });
    }
    setFavorites(updated);
    localStorage.setItem("aura-favorites", JSON.stringify(updated));
  };

  const toggleTheme = () => {
    const nextMode = !darkMode;
    setDarkMode(nextMode);
    localStorage.setItem("aura-theme", nextMode ? "dark" : "light");
  };

  // Filter products that are in the favorites list
  const favoriteProducts = useMemo(() => {
    return PRODUCTS.filter((product) => favorites.includes(product.id));
  }, [favorites]);

  return (
    <div className={`${darkMode ? "dark animate-fade-in" : "animate-fade-in"}`}>
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300 font-sans">
        
        {/* Navigation Header */}
        <header className="sticky top-0 z-40 w-full border-b border-zinc-200/50 dark:border-zinc-800/50 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl transition-colors duration-300">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200/50 dark:border-zinc-800/50 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                title="Back to Shop"
              >
                <ArrowLeft className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
              </Link>
              <span className="bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 bg-clip-text text-lg font-bold tracking-tight text-transparent">
                Favourites Collection
              </span>
            </div>

            <div className="flex items-center gap-4">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200/50 dark:border-zinc-800/50 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                {darkMode ? (
                  <Sun className="h-5 w-5 text-amber-400" />
                ) : (
                  <Moon className="h-5 w-5 text-indigo-600" />
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Hero Title */}
        <section className="relative overflow-hidden pt-12 pb-6 sm:pt-16 sm:pb-8">
          <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-25 dark:opacity-15 blur-3xl">
            <div className="h-72 w-72 rounded-full bg-pink-500 animate-pulse" />
            <div className="h-96 w-96 rounded-full bg-indigo-600 ml-12 animate-bounce duration-10000" />
          </div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center sm:text-left">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-gradient-to-r from-zinc-900 via-indigo-950 to-pink-900 dark:from-white dark:via-zinc-100 dark:to-zinc-500 bg-clip-text text-transparent">
              Your Loved Items
            </h1>
            <p className="mt-2 max-w-xl text-lg text-zinc-500 dark:text-zinc-400">
              Manage your personal favorites collection here. Click any card to explore further options or proceed to purchase.
            </p>
          </div>
        </section>

        {/* Favorite Products Listing */}
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {favoriteProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-zinc-200 dark:border-zinc-800/80 rounded-3xl p-12 bg-white/30 dark:bg-zinc-900/10 backdrop-blur-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-100/50 dark:bg-pink-950/20 text-pink-500 mb-6 relative">
                <Heart className="h-8 w-8 fill-pink-500/20 animate-pulse" />
                <div className="absolute inset-0 rounded-full border border-pink-500/30 animate-ping" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Your list is looking empty</h3>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 max-w-sm">
                Add items to your favorites while shopping and they will appear here.
              </p>
              <Link
                href="/"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-bold text-white hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/30 cursor-pointer"
              >
                <ShoppingBag className="h-4.5 w-4.5" />
                Explore Shop
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {favoriteProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavorite={true}
                  onToggleFavorite={toggleFavorite}
                  onClick={() => setSelectedProduct(product)}
                />
              ))}
            </div>
          )}
        </main>

        {/* Media-rich layout-animated details popup modal component */}
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          isFavorite={selectedProduct ? favorites.includes(selectedProduct.id) : false}
          onToggleFavorite={() => selectedProduct && toggleFavorite(selectedProduct.id)}
          onBuyNow={() => {
            if (selectedProduct) {
              toast.success(`Purchase initiated for ${selectedProduct.name}!`, {
                description: "We are preparing your checkout details.",
                icon: "🛍️"
              });
              setSelectedProduct(null);
            }
          }}
        />

        {/* Footer component */}
        <Footer />

        {/* Shadcn Sonner Toaster */}
        <Toaster richColors position="bottom-right" theme={darkMode ? "dark" : "light"} />

      </div>
    </div>
  );
}
