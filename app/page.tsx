"use client";

import { useState, useMemo, useEffect } from "react";
import { Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FilterBar from "@/components/FilterBar";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import Footer from "@/components/Footer";
import Faqs from "@/components/Faqs";
import Cta from "@/components/Cta";
import Testimonials from "@/components/Testimonials";
import FloatingContact from "@/components/FloatingContact";
import { Toaster, toast } from "sonner";
import { PRODUCTS, Product } from "./data";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("default");
  const [searchQuery, setSearchQuery] = useState<string>(" ");
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
        icon: "💔",
      });
    } else {
      updated = [...favorites, productId];
      toast.success("Added to Favourites!", {
        icon: "💖",
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

  const categories = ["All", "Utilities", "Jewellery", "Dresses"];

  const sortLabels: Record<string, string> = {
    default: "Featured",
    "price-asc": "Price: Low to High",
    "price-desc": "Price: High to Low",
    rating: "Highest Rating",
    reviews: "Most Reviewed",
  };

  // Filter & Sort products using memoization and standard array methods (map and filter)
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
        product.description
          .toLowerCase()
          .includes(searchQuery.trim().toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "reviews") return b.reviewsCount - a.reviewsCount;
      return 0;
    });
  }, [selectedCategory, sortBy, searchQuery]);

  return (
    <div className={`${darkMode ? "dark animate-fade-in" : "animate-fade-in"}`}>
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300 font-sans">
        {/* Navigation bar component */}
        <Navbar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
          favoritesCount={favorites.length}
          darkMode={darkMode}
          toggleTheme={toggleTheme}
        />

        {/* Hero marketing banner component */}
        <Hero />

        {/* Filter and sorting control bar component */}
        <FilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortLabels={sortLabels}
        />

        {/* Product Grid listing */}
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-600 mb-4">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                No products found
              </h3>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 max-w-xs">
                We couldn&apos;t find any premium products matching &quot;
                {searchQuery.trim()}&quot; in category {selectedCategory}.
              </p>
              <button
                onClick={() => {
                  setSearchQuery(" ");
                  setSelectedCategory("All");
                  setSortBy("default");
                }}
                className="mt-4 rounded-full bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors cursor-pointer">
                Reset all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavorite={favorites.includes(product.id)}
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
          isFavorite={
            selectedProduct ? favorites.includes(selectedProduct.id) : false
          }
          onToggleFavorite={() =>
            selectedProduct && toggleFavorite(selectedProduct.id)
          }
          onBuyNow={() => {
            if (selectedProduct) {
              const message = `Hello! I would like to purchase the *${selectedProduct.name}* (${selectedProduct.category}) for *$${selectedProduct.price.toFixed(2)}*.`;
              const whatsappUrl = `https://wa.me/15550199?text=${encodeURIComponent(message)}`;
              toast.success("Redirecting to WhatsApp Checkout...", {
                description: `Opening chat to buy ${selectedProduct.name}.`,
                icon: "🛍️",
              });
              setTimeout(() => {
                window.open(whatsappUrl, "_blank", "noopener,noreferrer");
              }, 600);
              setSelectedProduct(null);
            }
          }}
        />

        {/* Testimonials section */}
        <Testimonials />

        {/* FAQs section */}
        <Faqs />

        {/* Call to Action section */}
        <Cta />

        {/* Footer component */}
        <Footer />

        {/* Floating Call & WhatsApp Contact FAB */}
        <FloatingContact />

        {/* Shadcn Sonner Toaster */}
        <Toaster
          richColors
          position="bottom-right"
          theme={darkMode ? "dark" : "light"}
        />
      </div>
    </div>
  );
}
