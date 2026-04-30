import HeroSlider from "@/components/HeroSlider";
import ProductCard from "@/components/ProductCard";
import SaleSection from "@/components/SaleSection";
import { products, categories } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import {
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
} from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over $250",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    description: "100% secure checkout",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day return policy",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Dedicated assistance",
  },
];

export default function Home() {
  const featuredProducts = products.slice(0, 8);
  const featuredCategories = categories.filter((c) => c !== "All").slice(0, 4);

  return (
    <>
      <HeroSlider />

      {/* Features Strip */}
      <section className="bg-white border-b border-cream-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center flex-shrink-0">
                  <feature.icon size={18} className="text-navy" />
                </div>
                <div>
                  <p className="text-sm font-medium text-navy">
                    {feature.title}
                  </p>
                  <p className="text-xs text-zinc-light">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-gold text-sm tracking-[0.3em] uppercase font-medium">
              Explore
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-navy mt-3">
              Shop by Category
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredCategories.map((category, index) => {
              const categoryProduct = products.find(
                (p) => p.category === category
              );
              return (
                <Link
                  key={category}
                  href={`/shop?category=${category}`}
                  className="group relative aspect-[3/4] rounded-2xl overflow-hidden"
                >
                  {categoryProduct && (
                    <Image
                      src={categoryProduct.images[0]}
                      alt={category}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 640px) 50vw, 25vw"
                      priority={index < 2}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-navy-dark/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white text-lg font-medium">
                      {category}
                    </h3>
                    <p className="text-white/60 text-sm mt-1">
                      Shop Collection →
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
            <div>
              <span className="text-gold text-sm tracking-[0.3em] uppercase font-medium">
                Curated Selection
              </span>
              <h2 className="text-3xl md:text-4xl font-light text-navy mt-3">
                Featured Products
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-sm font-medium text-navy hover:text-gold tracking-wider uppercase transition-colors"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                showSaleBadge={!!product.isSale}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Sale Section */}
      <SaleSection />

      {/* CTA Banner */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="relative rounded-3xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&q=80"
              alt="Premium collection"
              width={1600}
              height={600}
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-navy-dark/70 flex items-center justify-center">
              <div className="text-center px-4">
                <h2 className="text-3xl md:text-5xl font-light text-white mb-4">
                  The Art of Dressing Well
                </h2>
                <p className="text-cream/70 text-sm md:text-base mb-8 max-w-lg mx-auto">
                  Explore our complete collection of premium clothing, crafted
                  with care and designed to last.
                </p>
                <Link
                  href="/shop"
                  className="inline-block px-10 py-4 bg-gold hover:bg-gold-light text-white font-medium tracking-wider uppercase text-sm rounded-lg transition-all hover:shadow-lg"
                >
                  Explore Collection
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
