"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Star, ArrowRight } from "lucide-react";
import { Product } from "@/app/data";

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onClick: () => void;
}

export default function ProductCard({
  product,
  isFavorite,
  onToggleFavorite,
  onClick,
}: ProductCardProps) {
  return (
    <motion.div
      layoutId={`card-${product.id}`}
      onClick={onClick}
      className="group inflected-card flex flex-col justify-between border border-zinc-200/50 bg-white p-3 hover:shadow-xl hover:shadow-blue-950/5 cursor-pointer transition-all duration-300"
      style={{ contentVisibility: "auto", ["--card-rounding" as any]: "24px" }}>
      {/* Badges indicators */}
      <div className="absolute top-6 left-6 z-10 flex flex-col gap-1.5 font-sans">
        {product.isNew && (
          <span className="inline-flex items-center rounded-full bg-sky-500/10 px-2.5 py-1 text-xs font-bold text-sky-600 border border-sky-500/25 backdrop-blur-md">
            NEW
          </span>
        )}
        {product.isPopular && (
          <span className="inline-flex items-center rounded-full bg-blue-500/10 px-2.5 py-1 text-xs font-bold text-blue-600 border border-blue-500/25 backdrop-blur-md">
            BESTSELLER
          </span>
        )}
      </div>

      {/* Heart Favourites Toggle */}
      <button
        onClick={(e) => onToggleFavorite(product.id, e)}
        className="absolute top-5 right-5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 border border-zinc-200/50 text-zinc-500 hover:text-zinc-900 shadow-sm hover:scale-110 active:scale-95 transition-all backdrop-blur-md cursor-pointer">
        <Heart
          className={`h-4.5 w-4.5 transition-colors ${isFavorite ? "fill-red-500 text-red-500" : "text-zinc-500"}`}
        />
      </button>

      {/* Thumbnail Area - Inflected style */}
      <div className="inflected-card-inner aspect-square w-full">
        <div className="inflected-box">
          <div className="inflected-img-box">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              priority={product.isPopular || product.isNew}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          
          {/* Inflected icon cutout button */}
          <div className="inflected-icon">
            <div className="inflected-icon-box">
              <span className="inflected-icon-inner text-white">
                <ArrowRight className="h-5 w-5" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="mt-4 flex flex-1 flex-col px-1 pb-1 justify-between font-sans">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-500">
            {product.category}
          </span>
          <h3 className="mt-1 text-base font-bold text-zinc-900 group-hover:text-blue-600 transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Review Stats */}
          <div className="mt-1.5 flex items-center gap-1">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-xs font-bold text-zinc-700">
              {product.rating}
            </span>
            <span className="text-xs text-zinc-400">
              ({product.reviewsCount} reviews)
            </span>
          </div>
        </div>

        {/* Footer Area with Price */}
        <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-3">
          <span className="text-lg font-extrabold text-zinc-900">
            ${product.price.toFixed(2)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
