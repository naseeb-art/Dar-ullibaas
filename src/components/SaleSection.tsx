"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Heart } from "lucide-react";
import { products } from "@/lib/data";
import { useStore } from "@/store/useStore";
import CountdownTimer from "./CountdownTimer";

export default function SaleSection() {
  const saleProducts = products.filter((p) => p.isSale && p.saleEndsAt);
  const { addToCart, toggleWishlist, isInWishlist } = useStore();

  if (saleProducts.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-navy-dark to-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-gold text-sm tracking-[0.3em] uppercase font-medium">
            Limited Time
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mt-3 mb-4">
            Exclusive Sale
          </h2>
          <p className="text-cream/60 max-w-md mx-auto text-sm">
            Premium pieces at exceptional prices. Each item has its own
            countdown — don&apos;t miss out.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {saleProducts.slice(0, 6).map((product) => {
            const wishlisted = isInWishlist(product.id);
            return (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-gold/30 transition-all duration-500"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/60 to-transparent" />
                  <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    {product.discount}% OFF
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                      wishlisted
                        ? "bg-red-500 text-white"
                        : "bg-white/20 text-white hover:bg-white/30"
                    }`}
                  >
                    <Heart
                      size={16}
                      fill={wishlisted ? "currentColor" : "none"}
                    />
                  </button>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <p className="text-xs text-cream/40 uppercase tracking-wider mb-1">
                        {product.category}
                      </p>
                      <h3 className="font-medium text-white text-sm line-clamp-1">
                        {product.name}
                      </h3>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-lg font-semibold text-gold">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-cream/40 line-through block">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <CountdownTimer targetDate={product.saleEndsAt!} />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToCart({
                          product,
                          quantity: 1,
                          selectedSize: product.sizes[0] || "",
                          selectedColor: product.colors[0]?.name || "",
                          selectedUnit: product.unitType,
                        });
                      }}
                      className="w-10 h-10 bg-gold hover:bg-gold-light text-white rounded-full flex items-center justify-center transition-colors flex-shrink-0"
                      aria-label="Add to cart"
                    >
                      <ShoppingBag size={16} />
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/shop?sale=true"
            className="inline-block px-8 py-3.5 border border-gold text-gold hover:bg-gold hover:text-white font-medium tracking-wider uppercase text-sm rounded-lg transition-all"
          >
            View All Sale Items
          </Link>
        </div>
      </div>
    </section>
  );
}
