"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { Product } from "@/types";
import { useStore } from "@/store/useStore";

interface ProductCardProps {
  product: Product;
  showSaleBadge?: boolean;
}

export default function ProductCard({
  product,
  showSaleBadge = false,
}: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      product,
      quantity: 1,
      selectedSize: product.sizes[0] || "",
      selectedColor: product.colors[0]?.name || "",
      selectedUnit: product.unitType,
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const unitLabels: Record<string, string> = {
    piece: "Per Piece",
    meter: "Per Meter",
    yard: "Per Yard",
  };

  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-cream-dark/50">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-cream">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Badges */}
          {showSaleBadge && product.discount && (
            <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
              {product.discount}% OFF
            </div>
          )}

          {/* Hover Actions */}
          <div className="absolute inset-0 bg-navy-dark/0 group-hover:bg-navy-dark/20 transition-colors duration-300" />
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
            <button
              onClick={handleToggleWishlist}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors shadow-md ${
                wishlisted
                  ? "bg-red-500 text-white"
                  : "bg-white text-navy hover:bg-gold hover:text-white"
              }`}
              aria-label="Add to wishlist"
            >
              <Heart size={16} fill={wishlisted ? "currentColor" : "none"} />
            </button>
            <button
              onClick={handleAddToCart}
              className="w-9 h-9 rounded-full bg-white text-navy hover:bg-gold hover:text-white flex items-center justify-center transition-colors shadow-md"
              aria-label="Add to cart"
            >
              <ShoppingBag size={16} />
            </button>
            <Link
              href={`/product/${product.id}`}
              className="w-9 h-9 rounded-full bg-white text-navy hover:bg-gold hover:text-white flex items-center justify-center transition-colors shadow-md"
              aria-label="Quick view"
            >
              <Eye size={16} />
            </Link>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-xs text-zinc-light uppercase tracking-wider mb-1">
            {product.category}
          </p>
          <h3 className="font-medium text-navy text-sm sm:text-base line-clamp-1 mb-2">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(product.rating)
                    ? "text-gold fill-gold"
                    : "text-cream-dark fill-cream-dark"
                }`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-xs text-zinc-light ml-1">
              ({product.reviewCount})
            </span>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <span className="font-semibold text-navy text-lg">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-zinc-light line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <p className="text-xs text-zinc-light mb-3">
            {unitLabels[product.unitType]}
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              className="flex-1 py-2.5 bg-navy hover:bg-navy-light text-white text-xs font-medium tracking-wider uppercase rounded-lg transition-colors"
            >
              Add to Cart
            </button>
            <Link
              href={`/product/${product.id}`}
              onClick={(e) => e.stopPropagation()}
              className="py-2.5 px-4 border border-navy text-navy hover:bg-navy hover:text-white text-xs font-medium tracking-wider uppercase rounded-lg transition-colors"
            >
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
}
