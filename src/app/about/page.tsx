import Image from "next/image";
import Link from "next/link";
import { Award, Heart, Globe, Users } from "lucide-react";

const values = [
  {
    icon: Award,
    title: "Uncompromising Quality",
    description:
      "Every piece is crafted from the finest materials sourced from the world's most renowned textile houses.",
  },
  {
    icon: Heart,
    title: "Artisan Craftsmanship",
    description:
      "Our garments are meticulously constructed by skilled artisans who take pride in every stitch and detail.",
  },
  {
    icon: Globe,
    title: "Sustainable Practice",
    description:
      "We are committed to ethical sourcing and sustainable manufacturing practices for a better future.",
  },
  {
    icon: Users,
    title: "Customer First",
    description:
      "Your satisfaction is our priority. We offer personalized service and a seamless shopping experience.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-cream min-h-screen">
      {/* Hero */}
      <div className="relative h-[50vh] md:h-[60vh]">
        <Image
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&q=80"
          alt="About LUXE Clothing"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy-dark/70 flex items-center justify-center">
          <div className="text-center px-4">
            <span className="text-gold text-sm tracking-[0.3em] uppercase font-medium">
              Our Story
            </span>
            <h1 className="text-4xl md:text-6xl font-light text-white mt-3">
              About LUXE
            </h1>
          </div>
        </div>
      </div>

      {/* Story */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-gold text-sm tracking-[0.3em] uppercase font-medium">
                Since 2010
              </span>
              <h2 className="text-3xl md:text-4xl font-light text-navy mt-3 mb-6">
                A Legacy of Excellence
              </h2>
              <p className="text-zinc-custom leading-relaxed mb-4">
                LUXE Clothing was born from a passion for exceptional
                craftsmanship and timeless design. Founded in New York City,
                we set out to create a brand that embodies sophistication
                without pretension.
              </p>
              <p className="text-zinc-custom leading-relaxed mb-4">
                Our journey began with a simple belief: that everyone
                deserves access to premium quality clothing that makes them
                feel confident and distinguished. Every collection we create
                reflects this philosophy.
              </p>
              <p className="text-zinc-custom leading-relaxed">
                From the finest Italian cottons to luxurious cashmere blends,
                we source only the best materials from trusted suppliers
                around the world. Each garment undergoes rigorous quality
                checks to ensure it meets our exacting standards.
              </p>
            </div>
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=800&q=80"
                alt="LUXE craftsmanship"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-gold text-sm tracking-[0.3em] uppercase font-medium">
              What We Believe
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-navy mt-3">
              Our Values
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="w-16 h-16 bg-cream rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <value.icon size={28} className="text-navy" />
                </div>
                <h3 className="font-medium text-navy mb-2">{value.title}</h3>
                <p className="text-sm text-zinc-light leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 md:py-24 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "15+", label: "Years of Excellence" },
              { number: "50K+", label: "Happy Customers" },
              { number: "200+", label: "Premium Products" },
              { number: "25+", label: "Countries Served" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl md:text-4xl font-light text-gold mb-1">
                  {stat.number}
                </p>
                <p className="text-sm text-cream/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-light text-navy mb-6">
            Experience the LUXE Difference
          </h2>
          <p className="text-zinc-light mb-8">
            Browse our curated collection and discover why discerning
            individuals choose LUXE for their wardrobe essentials.
          </p>
          <Link
            href="/shop"
            className="inline-block px-10 py-4 bg-gold hover:bg-gold-light text-white font-medium tracking-wider uppercase text-sm rounded-lg transition-all"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
}
