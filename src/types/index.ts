export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: string[];
  category: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  unitType: "piece" | "meter" | "yard";
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isSale?: boolean;
  saleEndsAt?: string;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
  selectedUnit: "piece" | "meter" | "yard";
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface WishlistItem {
  productId: string;
}
