import { Product, Review } from "@/types";

export const products: Product[] = [
  {
    id: "1",
    name: "Royal Navy Silk Blazer",
    description:
      "Impeccably tailored silk-blend blazer in deep navy. Features a structured silhouette, satin-lined interior, and hand-finished buttonholes. Perfect for formal events and upscale occasions.",
    price: 389,
    originalPrice: 520,
    discount: 25,
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    ],
    category: "Blazers",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Navy", hex: "#1B2A4A" },
      { name: "Charcoal", hex: "#36454F" },
    ],
    unitType: "piece",
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    isSale: true,
    saleEndsAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ["formal", "blazer", "silk"],
  },
  {
    id: "2",
    name: "Cashmere Overcoat",
    description:
      "Luxurious full-length cashmere overcoat in a timeless dark blue. Double-breasted design with peak lapels, deep pockets, and a smooth satin lining for ultimate comfort and warmth.",
    price: 749,
    images: [
      "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=800&q=80",
      "https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=800&q=80",
    ],
    category: "Outerwear",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Dark Blue", hex: "#0D1B2A" },
      { name: "Camel", hex: "#C19A6B" },
    ],
    unitType: "piece",
    rating: 4.9,
    reviewCount: 89,
    inStock: true,
    tags: ["outerwear", "cashmere", "winter"],
  },
  {
    id: "3",
    name: "Premium Italian Cotton Shirt",
    description:
      "Crafted from the finest Italian cotton, this dress shirt features a slim fit, mother-of-pearl buttons, and French cuffs. An essential piece for the discerning gentleman.",
    price: 189,
    originalPrice: 250,
    discount: 24,
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
    ],
    category: "Shirts",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "White", hex: "#FAFAF5" },
      { name: "Sky Blue", hex: "#87CEEB" },
      { name: "Cream", hex: "#FFFDD0" },
    ],
    unitType: "piece",
    rating: 4.7,
    reviewCount: 256,
    inStock: true,
    isSale: true,
    saleEndsAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ["shirt", "cotton", "formal"],
  },
  {
    id: "4",
    name: "Tailored Wool Trousers",
    description:
      "Precision-cut wool trousers with a modern tapered leg. Features a concealed clasp, side adjusters, and a luxuriously soft wool blend that drapes elegantly.",
    price: 245,
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80",
    ],
    category: "Trousers",
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: [
      { name: "Charcoal", hex: "#36454F" },
      { name: "Navy", hex: "#1B2A4A" },
      { name: "Slate", hex: "#708090" },
    ],
    unitType: "piece",
    rating: 4.6,
    reviewCount: 178,
    inStock: true,
    tags: ["trousers", "wool", "formal"],
  },
  {
    id: "5",
    name: "Luxury Merino Polo",
    description:
      "Ultra-soft merino wool polo in a relaxed yet refined fit. Features ribbed collar and cuffs, three-button placket, and a subtle logo embroidery. Perfect for smart-casual occasions.",
    price: 165,
    originalPrice: 220,
    discount: 25,
    images: [
      "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800&q=80",
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&q=80",
    ],
    category: "Polos",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Cream", hex: "#FFFDD0" },
      { name: "Navy", hex: "#1B2A4A" },
      { name: "Sage", hex: "#B2AC88" },
    ],
    unitType: "piece",
    rating: 4.5,
    reviewCount: 92,
    inStock: true,
    isSale: true,
    saleEndsAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ["polo", "merino", "casual"],
  },
  {
    id: "6",
    name: "Hand-Stitched Leather Belt",
    description:
      "Premium full-grain leather belt with hand-stitched edges and a polished brass buckle. Each belt is individually crafted by artisans for a unique, distinguished look.",
    price: 125,
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    ],
    category: "Accessories",
    sizes: ["30", "32", "34", "36", "38", "40"],
    colors: [
      { name: "Dark Brown", hex: "#3E2723" },
      { name: "Black", hex: "#1A1A1A" },
      { name: "Tan", hex: "#D2B48C" },
    ],
    unitType: "piece",
    rating: 4.8,
    reviewCount: 67,
    inStock: true,
    tags: ["accessories", "leather", "belt"],
  },
  {
    id: "7",
    name: "Velvet Dinner Jacket",
    description:
      "Sumptuous velvet dinner jacket with satin peak lapels. A statement piece for black-tie events and gala evenings. Features a single-button closure and jetted pockets.",
    price: 595,
    originalPrice: 795,
    discount: 25,
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",
    ],
    category: "Blazers",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Midnight Blue", hex: "#191970" },
      { name: "Burgundy", hex: "#800020" },
    ],
    unitType: "piece",
    rating: 4.9,
    reviewCount: 45,
    inStock: true,
    isSale: true,
    saleEndsAt: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ["formal", "blazer", "velvet"],
  },
  {
    id: "8",
    name: "Premium Linen Fabric",
    description:
      "Finest Belgian linen fabric in a natural off-white tone. Ideal for bespoke summer suits, trousers, and shirts. Soft hand-feel with a beautiful drape.",
    price: 45,
    images: [
      "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80",
    ],
    category: "Fabrics",
    sizes: [],
    colors: [
      { name: "Off White", hex: "#FAF9F6" },
      { name: "Natural", hex: "#E8DCC8" },
      { name: "Sky", hex: "#87CEEB" },
    ],
    unitType: "meter",
    rating: 4.7,
    reviewCount: 134,
    inStock: true,
    tags: ["fabric", "linen", "summer"],
  },
  {
    id: "9",
    name: "Silk Pocket Square Set",
    description:
      "Set of three hand-rolled silk pocket squares in complementary tones. Each square features intricate patterns inspired by classic European design traditions.",
    price: 85,
    originalPrice: 120,
    discount: 29,
    images: [
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80",
    ],
    category: "Accessories",
    sizes: [],
    colors: [
      { name: "Multi", hex: "#1B2A4A" },
    ],
    unitType: "piece",
    rating: 4.6,
    reviewCount: 56,
    inStock: true,
    isSale: true,
    saleEndsAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ["accessories", "silk", "pocket-square"],
  },
  {
    id: "10",
    name: "Tweed Herringbone Vest",
    description:
      "Classic herringbone tweed vest handcrafted in England. Features a five-button front, adjustable back strap, and two welt pockets. Perfect layering piece for autumn and winter.",
    price: 195,
    images: [
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80",
    ],
    category: "Vests",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Brown Herringbone", hex: "#6B4226" },
      { name: "Grey Herringbone", hex: "#808080" },
    ],
    unitType: "piece",
    rating: 4.7,
    reviewCount: 38,
    inStock: true,
    tags: ["vest", "tweed", "classic"],
  },
  {
    id: "11",
    name: "Japanese Selvedge Denim",
    description:
      "Premium Japanese selvedge denim fabric in a deep indigo wash. Raw, unwashed with characteristic white selvedge line. Perfect for bespoke jeans and jackets.",
    price: 55,
    images: [
      "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=800&q=80",
    ],
    category: "Fabrics",
    sizes: [],
    colors: [
      { name: "Indigo", hex: "#1B2A4A" },
      { name: "Raw Black", hex: "#1A1A1A" },
    ],
    unitType: "yard",
    rating: 4.8,
    reviewCount: 89,
    inStock: true,
    tags: ["fabric", "denim", "japanese"],
  },
  {
    id: "12",
    name: "Suede Chelsea Boots",
    description:
      "Italian suede Chelsea boots with a sleek silhouette. Features elastic side panels, pull tab, leather sole, and cushioned insole for all-day comfort.",
    price: 425,
    originalPrice: 565,
    discount: 25,
    images: [
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&q=80",
    ],
    category: "Footwear",
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: [
      { name: "Tan", hex: "#D2B48C" },
      { name: "Dark Brown", hex: "#3E2723" },
      { name: "Black", hex: "#1A1A1A" },
    ],
    unitType: "piece",
    rating: 4.9,
    reviewCount: 72,
    inStock: true,
    isSale: true,
    saleEndsAt: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ["footwear", "suede", "boots"],
  },
];

export const reviews: Review[] = [
  {
    id: "r1",
    author: "James W.",
    rating: 5,
    comment:
      "Exceptional quality. The fabric feels luxurious and the fit is perfect. Worth every penny.",
    date: "2025-03-15",
    verified: true,
  },
  {
    id: "r2",
    author: "Michael R.",
    rating: 4,
    comment:
      "Beautiful piece, well-made with attention to detail. Shipping was fast and packaging was premium.",
    date: "2025-03-10",
    verified: true,
  },
  {
    id: "r3",
    author: "Sarah L.",
    rating: 5,
    comment:
      "Bought this as a gift and it exceeded all expectations. The quality is on par with top luxury brands.",
    date: "2025-02-28",
    verified: true,
  },
  {
    id: "r4",
    author: "David K.",
    rating: 4,
    comment:
      "Great product, runs slightly large so consider sizing down. The material is truly premium.",
    date: "2025-02-20",
    verified: false,
  },
  {
    id: "r5",
    author: "Emma T.",
    rating: 5,
    comment:
      "I'm absolutely in love with this purchase. The craftsmanship is impeccable and it looks even better in person.",
    date: "2025-02-15",
    verified: true,
  },
];

export const heroSlides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80",
    heading: "Timeless Elegance",
    subheading: "Discover our curated collection of premium menswear designed for the modern gentleman",
    cta: "Shop Now",
    ctaLink: "/shop",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=1600&q=80",
    heading: "New Season Arrivals",
    subheading: "Explore the latest in luxury fashion — crafted with the finest fabrics from around the world",
    cta: "Explore Collection",
    ctaLink: "/shop",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1600&q=80",
    heading: "Exclusive Sale",
    subheading: "Up to 30% off on select premium pieces — limited time only",
    cta: "Buy Now",
    ctaLink: "/shop?sale=true",
  },
];

export const categories = [
  "All",
  "Blazers",
  "Outerwear",
  "Shirts",
  "Trousers",
  "Polos",
  "Vests",
  "Accessories",
  "Fabrics",
  "Footwear",
];
