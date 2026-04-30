"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/lib/data";
import { Suspense } from "react";

function ShopContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") || "All";
  const saleParam = searchParams.get("sale");

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [showSaleOnly, setShowSaleOnly] = useState(saleParam === "true");

  const allSizes = useMemo(() => {
    const sizes = new Set<string>();
    products.forEach((p) => p.sizes.forEach((s) => sizes.add(s)));
    return Array.from(sizes);
  }, []);

  const allColors = useMemo(() => {
    const colors = new Map<string, string>();
    products.forEach((p) =>
      p.colors.forEach((c) => colors.set(c.name, c.hex))
    );
    return Array.from(colors.entries());
  }, []);

  const filteredProducts = useMemo(() => {
    let result = products;

    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (showSaleOnly) {
      result = result.filter((p) => p.isSale);
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (selectedSizes.length > 0) {
      result = result.filter((p) =>
        p.sizes.some((s) => selectedSizes.includes(s))
      );
    }

    if (selectedColors.length > 0) {
      result = result.filter((p) =>
        p.colors.some((c) => selectedColors.includes(c.name))
      );
    }

    switch (sortBy) {
      case "price-low":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result = [...result].reverse();
        break;
    }

    return result;
  }, [
    selectedCategory,
    showSaleOnly,
    priceRange,
    selectedSizes,
    selectedColors,
    sortBy,
  ]);

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color)
        ? prev.filter((c) => c !== color)
        : [...prev, color]
    );
  };

  const clearFilters = () => {
    setSelectedCategory("All");
    setPriceRange([0, 1000]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setShowSaleOnly(false);
    setSortBy("featured");
  };

  const activeFilterCount =
    (selectedCategory !== "All" ? 1 : 0) +
    (showSaleOnly ? 1 : 0) +
    selectedSizes.length +
    selectedColors.length +
    (priceRange[0] > 0 || priceRange[1] < 1000 ? 1 : 0);

  return (
    <div className="min-h-screen bg-cream">
      {/* Page Header */}
      <div className="bg-navy text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-gold text-sm tracking-[0.3em] uppercase font-medium">
            {showSaleOnly ? "Sale" : "Collections"}
          </span>
          <h1 className="text-3xl md:text-5xl font-light mt-3">
            {showSaleOnly
              ? "Sale Items"
              : selectedCategory !== "All"
              ? selectedCategory
              : "Shop All"}
          </h1>
          <p className="text-cream/60 mt-3 text-sm">
            {filteredProducts.length} products
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-cream-dark rounded-lg text-sm font-medium text-navy hover:border-navy transition-colors"
          >
            <SlidersHorizontal size={16} />
            Filters
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 bg-gold text-white text-xs rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none px-4 py-2.5 pr-10 bg-white border border-cream-dark rounded-lg text-sm text-navy focus:outline-none focus:border-navy cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
            <ChevronDown
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-light pointer-events-none"
            />
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {filtersOpen && (
            <div className="w-64 flex-shrink-0 hidden lg:block">
              <div className="bg-white rounded-2xl p-6 border border-cream-dark sticky top-28">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-medium text-navy">Filters</h3>
                  {activeFilterCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-xs text-gold hover:text-gold-light transition-colors"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                {/* Sale Toggle */}
                <div className="mb-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showSaleOnly}
                      onChange={(e) => setShowSaleOnly(e.target.checked)}
                      className="w-4 h-4 accent-gold"
                    />
                    <span className="text-sm text-navy">Sale items only</span>
                  </label>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <h4 className="text-xs font-semibold text-navy uppercase tracking-wider mb-3">
                    Category
                  </h4>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`block w-full text-left text-sm py-1 transition-colors ${
                          selectedCategory === cat
                            ? "text-gold font-medium"
                            : "text-zinc-light hover:text-navy"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="text-xs font-semibold text-navy uppercase tracking-wider mb-3">
                    Price Range
                  </h4>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([Number(e.target.value), priceRange[1]])
                      }
                      className="w-full px-3 py-2 border border-cream-dark rounded-lg text-sm focus:outline-none focus:border-navy"
                      placeholder="Min"
                    />
                    <span className="text-zinc-light">—</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], Number(e.target.value)])
                      }
                      className="w-full px-3 py-2 border border-cream-dark rounded-lg text-sm focus:outline-none focus:border-navy"
                      placeholder="Max"
                    />
                  </div>
                </div>

                {/* Sizes */}
                <div className="mb-6">
                  <h4 className="text-xs font-semibold text-navy uppercase tracking-wider mb-3">
                    Size
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {allSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                          selectedSizes.includes(size)
                            ? "bg-navy text-white border-navy"
                            : "border-cream-dark text-zinc-light hover:border-navy"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Colors */}
                <div>
                  <h4 className="text-xs font-semibold text-navy uppercase tracking-wider mb-3">
                    Color
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {allColors.map(([name, hex]) => (
                      <button
                        key={name}
                        onClick={() => toggleColor(name)}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          selectedColors.includes(name)
                            ? "border-gold scale-110"
                            : "border-cream-dark hover:border-zinc-light"
                        }`}
                        style={{ backgroundColor: hex }}
                        title={name}
                        aria-label={name}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mobile Filters */}
          {filtersOpen && (
            <div className="fixed inset-0 z-50 lg:hidden bg-navy-dark/60">
              <div className="absolute right-0 top-0 bottom-0 w-80 bg-white overflow-y-auto">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-medium text-navy text-lg">Filters</h3>
                    <button
                      onClick={() => setFiltersOpen(false)}
                      className="text-zinc-light hover:text-navy"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Sale Toggle */}
                  <label className="flex items-center gap-2 cursor-pointer mb-6">
                    <input
                      type="checkbox"
                      checked={showSaleOnly}
                      onChange={(e) => setShowSaleOnly(e.target.checked)}
                      className="w-4 h-4 accent-gold"
                    />
                    <span className="text-sm text-navy">Sale items only</span>
                  </label>

                  {/* Categories */}
                  <div className="mb-6">
                    <h4 className="text-xs font-semibold text-navy uppercase tracking-wider mb-3">
                      Category
                    </h4>
                    <div className="space-y-2">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`block w-full text-left text-sm py-1 ${
                            selectedCategory === cat
                              ? "text-gold font-medium"
                              : "text-zinc-light hover:text-navy"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <h4 className="text-xs font-semibold text-navy uppercase tracking-wider mb-3">
                      Price
                    </h4>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) =>
                          setPriceRange([Number(e.target.value), priceRange[1]])
                        }
                        className="w-full px-3 py-2 border border-cream-dark rounded-lg text-sm focus:outline-none"
                        placeholder="Min"
                      />
                      <span>—</span>
                      <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([priceRange[0], Number(e.target.value)])
                        }
                        className="w-full px-3 py-2 border border-cream-dark rounded-lg text-sm focus:outline-none"
                        placeholder="Max"
                      />
                    </div>
                  </div>

                  {/* Sizes */}
                  <div className="mb-6">
                    <h4 className="text-xs font-semibold text-navy uppercase tracking-wider mb-3">
                      Size
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {allSizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => toggleSize(size)}
                          className={`px-3 py-1.5 text-xs rounded-lg border ${
                            selectedSizes.includes(size)
                              ? "bg-navy text-white border-navy"
                              : "border-cream-dark text-zinc-light"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Colors */}
                  <div className="mb-6">
                    <h4 className="text-xs font-semibold text-navy uppercase tracking-wider mb-3">
                      Color
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {allColors.map(([name, hex]) => (
                        <button
                          key={name}
                          onClick={() => toggleColor(name)}
                          className={`w-8 h-8 rounded-full border-2 ${
                            selectedColors.includes(name)
                              ? "border-gold scale-110"
                              : "border-cream-dark"
                          }`}
                          style={{ backgroundColor: hex }}
                          title={name}
                          aria-label={name}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 mt-8">
                    <button
                      onClick={clearFilters}
                      className="flex-1 py-2.5 border border-cream-dark rounded-lg text-sm text-navy"
                    >
                      Clear
                    </button>
                    <button
                      onClick={() => setFiltersOpen(false)}
                      className="flex-1 py-2.5 bg-navy text-white rounded-lg text-sm"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-zinc-light text-lg mb-2">
                  No products found
                </p>
                <p className="text-sm text-zinc-light/60 mb-6">
                  Try adjusting your filters
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2.5 bg-navy text-white text-sm rounded-lg"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    showSaleBadge={!!product.isSale}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-cream flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-navy border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
