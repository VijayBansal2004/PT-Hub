"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import FilterBar from "@/components/FilterBar";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import { Toaster, toast } from "sonner";
import { Product } from "../data";
import { getProducts } from "@/app/utils/products";

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("default");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Initialize selectedCategory from searchParams when it loads
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  // Initialize client-side favorites and combined products
  useEffect(() => {
    getProducts().then(setProducts);

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
  }, []);

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

  const categories = ["All", "Utilities", "Jewellery", "Dresses"];

  const sortLabels: Record<string, string> = {
    default: "Featured",
    "price-asc": "Price: Low to High",
    "price-desc": "Price: High to Low",
    rating: "Highest Rating",
    reviews: "Most Reviewed",
  };

  // Filter & Sort products using memoization and standard array methods
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
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
  }, [selectedCategory, sortBy, searchQuery, products]);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 transition-colors duration-300 font-sans flex flex-col animate-fade-in">
      {/* Navigation bar component */}
      <Navbar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        favoritesCount={favorites.length}
      />

      {/* Hero Header */}
      <section className="relative overflow-hidden pt-12 pb-6 sm:pt-16 sm:pb-8">
        <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-25 blur-3xl">
          <div className="h-72 w-72 rounded-full bg-sky-300 animate-pulse" />
          <div className="h-96 w-96 rounded-full bg-blue-600 ml-12 animate-bounce duration-10000" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-gradient-to-r from-zinc-900 via-blue-950 to-blue-800 bg-clip-text text-transparent">
            Explore All Products
          </h1>
          <p className="mt-2 max-w-xl text-lg text-zinc-500">
            Browse our curated collection of useful smart Chinese imports, innovative daily utilities, and premium handcrafted jewellery.
          </p>
        </div>
      </section>

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
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full">
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-400 mb-4">
              <Search className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900">
              No products found
            </h3>
            <p className="mt-1 text-sm text-zinc-500 max-w-xs">
              We couldn&apos;t find any premium products matching &quot;
              {searchQuery.trim()}&quot; in category {selectedCategory}.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setSortBy("default");
              }}
              className="mt-4 rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500 transition-colors cursor-pointer">
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

      {/* Footer component */}
      <Footer />

      {/* Floating Call & WhatsApp Contact FAB */}
      <FloatingContact />

      {/* Shadcn Sonner Toaster */}
      <Toaster
        richColors
        position="bottom-right"
        theme="light"
      />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
