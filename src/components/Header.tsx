"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingBag, Heart, Menu, X, User } from "lucide-react";
import { useStore } from "@/store/useStore";
import SearchModal from "./SearchModal";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { searchOpen, setSearchOpen, getCartCount, wishlist } = useStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-18 md:h-20">
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-navy hover:text-navy-light transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl md:text-3xl font-bold tracking-tight text-navy">
                LUXE
              </span>
              <span className="text-xs md:text-sm font-light tracking-[0.3em] text-zinc-light uppercase">
                Clothing
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-navy-light hover:text-navy tracking-wider uppercase transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gold after:transition-all hover:after:w-full"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={() => setSearchOpen(true)}
                className="text-navy-light hover:text-navy transition-colors p-1"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <Link
                href="/shop?wishlist=true"
                className="text-navy-light hover:text-navy transition-colors p-1 relative hidden sm:block"
              >
                <Heart size={20} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                    {wishlist.length}
                  </span>
                )}
              </Link>
              <button className="text-navy-light hover:text-navy transition-colors p-1 hidden sm:block">
                <User size={20} />
              </button>
              <Link
                href="/cart"
                className="text-navy-light hover:text-navy transition-colors p-1 relative"
              >
                <ShoppingBag size={20} />
                {getCartCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                    {getCartCount()}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-cream-dark">
            <nav className="flex flex-col py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-6 py-3 text-sm font-medium text-navy-light hover:text-navy hover:bg-cream tracking-wider uppercase transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/shop?wishlist=true"
                onClick={() => setMobileMenuOpen(false)}
                className="px-6 py-3 text-sm font-medium text-navy-light hover:text-navy hover:bg-cream tracking-wider uppercase transition-colors flex items-center gap-2 sm:hidden"
              >
                <Heart size={16} /> Wishlist ({wishlist.length})
              </Link>
            </nav>
          </div>
        )}
      </header>

      {searchOpen && <SearchModal />}
    </>
  );
}
