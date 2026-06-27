"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
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
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Initialize client-side favorites
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

  // Get the latest top 6 products (using isNew and slicing to 6)
  const latestProducts = useMemo(() => {
    return PRODUCTS.filter((product) => product.isNew).slice(0, 6);
  }, []);

  return (
    <div className="animate-fade-in">
      <div className="min-h-screen bg-zinc-50 text-zinc-900 transition-colors duration-300 font-sans">
        {/* Navigation bar component */}
        <Navbar
          favoritesCount={favorites.length}
        />

        {/* Hero marketing banner component */}
        <Hero />

        {/* Latest Arrivals section */}
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 border border-indigo-200/20 mb-3">
                <span>New Arrivals</span>
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
                Latest Arrivals
              </h2>
              <p className="mt-3 text-lg text-zinc-500 max-w-2xl">
                Discover our latest viral smart Chinese gadgets, daily life-saving utilities, and premium handcrafted jewellery.
              </p>
            </div>
            <Link
              href="/products"
              className="mt-6 sm:mt-0 inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-bold text-white hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/20 cursor-pointer self-start"
            >
              <span>Explore All Products</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {latestProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={favorites.includes(product.id)}
                onToggleFavorite={toggleFavorite}
                onClick={() => setSelectedProduct(product)}
              />
            ))}
          </div>

          {/* Centered secondary CTA button */}
          <div className="mt-16 text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white hover:bg-zinc-100 px-8 py-4 text-base font-semibold text-zinc-700 transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-sm"
            >
              <ShoppingBag className="h-5 w-5 text-indigo-600" />
              <span>View Full Catalog ({PRODUCTS.length} items)</span>
            </Link>
          </div>
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
          theme="light"
        />
      </div>
    </div>
  );
}
