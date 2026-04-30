"use client";

import { useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/store/useStore";
import { products } from "@/lib/data";

export default function SearchModal() {
  const { searchQuery, setSearchQuery, setSearchOpen } = useStore();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const filteredProducts = products.filter(
    (p) =>
      searchQuery.length >= 2 &&
      (p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        ))
  );

  return (
    <div className="fixed inset-0 z-[60] bg-navy-dark/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl mx-auto mt-20 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 p-4 border-b border-cream-dark">
          <Search size={20} className="text-zinc-light" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 text-lg outline-none bg-transparent text-navy placeholder:text-zinc-light"
          />
          <button
            onClick={() => {
              setSearchOpen(false);
              setSearchQuery("");
            }}
            className="text-zinc-light hover:text-navy transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {searchQuery.length >= 2 && (
          <div className="max-h-96 overflow-y-auto p-4">
            {filteredProducts.length === 0 ? (
              <p className="text-center text-zinc-light py-8">
                No products found for &ldquo;{searchQuery}&rdquo;
              </p>
            ) : (
              <div className="space-y-3">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-cream transition-colors"
                  >
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-cream flex-shrink-0">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-navy truncate">
                        {product.name}
                      </p>
                      <p className="text-sm text-zinc-light">
                        {product.category}
                      </p>
                    </div>
                    <p className="font-semibold text-navy">
                      ${product.price}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {searchQuery.length < 2 && (
          <div className="p-8 text-center text-zinc-light">
            <p>Start typing to search products...</p>
          </div>
        )}
      </div>
    </div>
  );
}
