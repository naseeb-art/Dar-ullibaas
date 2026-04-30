"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ShoppingBag,
  Minus,
  Plus,
  Star,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { products, reviews } from "@/lib/data";
import { useStore } from "@/store/useStore";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types";

export default function ProductPageClient({ id }: { id: string }) {
  const product = products.find((p) => p.id === id);

  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    addToRecentlyViewed,
    recentlyViewed,
  } = useStore();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(
    product?.sizes[0] ?? ""
  );
  const [selectedColor, setSelectedColor] = useState(
    product?.colors[0]?.name ?? ""
  );
  const [selectedUnit, setSelectedUnit] = useState<"piece" | "meter" | "yard">(
    product?.unitType ?? "piece"
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<
    "description" | "reviews" | "shipping"
  >("description");

  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product.id);
    }
  }, [product, addToRecentlyViewed]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center">
          <h1 className="text-2xl font-light text-navy mb-4">
            Product Not Found
          </h1>
          <Link
            href="/shop"
            className="text-gold hover:text-gold-light transition-colors"
          >
            ← Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const recentProducts = recentlyViewed
    .filter((rid) => rid !== product.id)
    .slice(0, 4)
    .map((rid) => products.find((p) => p.id === rid))
    .filter(Boolean) as Product[];

  const handleAddToCart = () => {
    addToCart({
      product,
      quantity,
      selectedSize,
      selectedColor,
      selectedUnit,
    });
  };

  const unitLabels: Record<string, string> = {
    piece: "Per Piece",
    meter: "Per Meter",
    yard: "Per Yard",
  };

  return (
    <div className="bg-cream min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <nav className="flex items-center gap-2 text-sm text-zinc-light">
          <Link href="/" className="hover:text-navy transition-colors">
            Home
          </Link>
          <ChevronRight size={14} />
          <Link href="/shop" className="hover:text-navy transition-colors">
            Shop
          </Link>
          <ChevronRight size={14} />
          <Link
            href={`/shop?category=${product.category}`}
            className="hover:text-navy transition-colors"
          >
            {product.category}
          </Link>
          <ChevronRight size={14} />
          <span className="text-navy">{product.name}</span>
        </nav>
      </div>

      {/* Product Main */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Images */}
          <div>
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white mb-4">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {product.discount && (
                <div className="absolute top-4 left-4 bg-red-600 text-white text-sm font-bold px-4 py-2 rounded-full">
                  {product.discount}% OFF
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === i
                        ? "border-gold"
                        : "border-cream-dark hover:border-zinc-light"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="py-2">
            <p className="text-sm text-zinc-light uppercase tracking-wider mb-2">
              {product.category}
            </p>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-light text-navy mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < Math.floor(product.rating)
                        ? "text-gold fill-gold"
                        : "text-cream-dark"
                    }
                  />
                ))}
              </div>
              <span className="text-sm text-zinc-light">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl font-semibold text-navy">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-zinc-light line-through">
                  ${product.originalPrice}
                </span>
              )}
              {product.discount && (
                <span className="text-sm bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium">
                  Save {product.discount}%
                </span>
              )}
            </div>
            <p className="text-sm text-zinc-light mb-6">
              {unitLabels[product.unitType]}
            </p>

            {/* Unit Type */}
            {product.unitType !== "piece" && (
              <div className="mb-6">
                <p className="text-sm font-medium text-navy mb-2">
                  Unit Type
                </p>
                <div className="flex gap-2">
                  {(["piece", "meter", "yard"] as const).map((unit) => (
                    <button
                      key={unit}
                      onClick={() => setSelectedUnit(unit)}
                      className={`px-4 py-2 text-sm rounded-lg border transition-colors capitalize ${
                        selectedUnit === unit
                          ? "bg-navy text-white border-navy"
                          : "border-cream-dark text-zinc-light hover:border-navy"
                      }`}
                    >
                      Per {unit}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colors */}
            {product.colors.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-medium text-navy mb-2">
                  Color:{" "}
                  <span className="font-normal text-zinc-light">
                    {selectedColor}
                  </span>
                </p>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor === color.name
                          ? "border-gold scale-110 shadow-md"
                          : "border-cream-dark hover:border-zinc-light"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                      aria-label={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-medium text-navy mb-2">Size</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[44px] px-4 py-2.5 text-sm rounded-lg border transition-colors ${
                        selectedSize === size
                          ? "bg-navy text-white border-navy"
                          : "border-cream-dark text-zinc-light hover:border-navy"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <p className="text-sm font-medium text-navy mb-2">Quantity</p>
              <div className="flex items-center gap-1 bg-white border border-cream-dark rounded-lg w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-zinc-light hover:text-navy transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center font-medium text-navy">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-zinc-light hover:text-navy transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 bg-navy hover:bg-navy-light text-white font-medium tracking-wider uppercase text-sm rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag size={18} />
                Add to Cart
              </button>
              <Link
                href="/checkout"
                onClick={handleAddToCart}
                className="flex-1 py-3.5 bg-gold hover:bg-gold-light text-white font-medium tracking-wider uppercase text-sm rounded-lg transition-colors text-center"
              >
                Buy Now
              </Link>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-14 h-14 border rounded-lg flex items-center justify-center transition-colors flex-shrink-0 ${
                  wishlisted
                    ? "bg-red-50 border-red-200 text-red-500"
                    : "border-cream-dark text-zinc-light hover:border-navy hover:text-navy"
                }`}
                aria-label="Add to wishlist"
              >
                <Heart
                  size={20}
                  fill={wishlisted ? "currentColor" : "none"}
                />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-white rounded-xl border border-cream-dark">
              <div className="flex items-center gap-2 text-xs text-zinc-light">
                <Truck size={16} className="text-navy flex-shrink-0" />
                Free Shipping
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-light">
                <RotateCcw size={16} className="text-navy flex-shrink-0" />
                30-Day Returns
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-light">
                <ShieldCheck size={16} className="text-navy flex-shrink-0" />
                Secure Checkout
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16">
          <div className="flex border-b border-cream-dark">
            {(
              [
                { key: "description", label: "Description" },
                { key: "reviews", label: `Reviews (${reviews.length})` },
                { key: "shipping", label: "Shipping & Returns" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === tab.key
                    ? "border-gold text-navy"
                    : "border-transparent text-zinc-light hover:text-navy"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="py-8">
            {activeTab === "description" && (
              <div className="max-w-3xl">
                <p className="text-zinc-custom leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="max-w-3xl space-y-6">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-white p-6 rounded-xl border border-cream-dark"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-navy text-white flex items-center justify-center text-sm font-medium">
                          {review.author.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-navy text-sm">
                            {review.author}
                          </p>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={12}
                                className={
                                  i < review.rating
                                    ? "text-gold fill-gold"
                                    : "text-cream-dark"
                                }
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-zinc-light">
                          {review.date}
                        </p>
                        {review.verified && (
                          <span className="text-xs text-green-600 font-medium">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-zinc-custom leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="max-w-3xl space-y-6">
                <div>
                  <h3 className="font-medium text-navy mb-2">Shipping</h3>
                  <ul className="space-y-2 text-sm text-zinc-custom">
                    <li>• Free standard shipping on orders over $250</li>
                    <li>• Standard shipping: 5-7 business days ($9.95)</li>
                    <li>• Express shipping: 2-3 business days ($19.95)</li>
                    <li>• Overnight shipping: Next business day ($29.95)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-navy mb-2">Returns</h3>
                  <ul className="space-y-2 text-sm text-zinc-custom">
                    <li>• 30-day hassle-free return policy</li>
                    <li>• Items must be unworn with original tags</li>
                    <li>• Free return shipping on all orders</li>
                    <li>• Refund processed within 5-7 business days</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-light text-navy mb-8">
              Related Products
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* Recently Viewed */}
        {recentProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-light text-navy mb-8">
              Recently Viewed
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {recentProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
