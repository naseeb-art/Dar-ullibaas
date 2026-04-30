"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  MapPin,
  Phone,
  ArrowRight,
} from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop All" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

const shopLinks = [
  { href: "/shop?category=Blazers", label: "Blazers" },
  { href: "/shop?category=Outerwear", label: "Outerwear" },
  { href: "/shop?category=Shirts", label: "Shirts" },
  { href: "/shop?category=Accessories", label: "Accessories" },
  { href: "/shop?sale=true", label: "Sale" },
];

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
function TwitterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function YoutubeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

const socialLinks = [
  { icon: FacebookIcon, href: "#", label: "Facebook" },
  { icon: InstagramIcon, href: "#", label: "Instagram" },
  { icon: TwitterIcon, href: "#", label: "Twitter" },
  { icon: YoutubeIcon, href: "#", label: "Youtube" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-navy text-cream/90">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-light tracking-wide mb-3">
              Join the LUXE Circle
            </h3>
            <p className="text-cream/60 text-sm mb-6">
              Subscribe for exclusive access to new collections, private sales,
              and style inspiration.
            </p>
            {subscribed ? (
              <p className="text-gold font-medium">
                Thank you for subscribing!
              </p>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex gap-2 max-w-md mx-auto"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold transition-colors text-sm"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-gold hover:bg-gold-light text-white rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
                >
                  Subscribe
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-bold tracking-tight">LUXE</span>
              <span className="text-xs font-light tracking-[0.3em] text-cream/60 ml-2 uppercase">
                Clothing
              </span>
            </Link>
            <p className="text-cream/60 text-sm leading-relaxed mb-6">
              Premium clothing for the modern individual. Crafted with the
              finest materials and timeless design philosophy.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-gold flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/60 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase mb-4">
              Shop
            </h4>
            <ul className="space-y-2.5">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/60 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-cream/60">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                <span>123 Fashion Avenue, New York, NY 10001</span>
              </li>
              <li>
                <a
                  href="tel:+12125551234"
                  className="flex items-center gap-3 text-sm text-cream/60 hover:text-gold transition-colors"
                >
                  <Phone size={16} className="flex-shrink-0" />
                  +1 (212) 555-1234
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@luxeclothing.com"
                  className="flex items-center gap-3 text-sm text-cream/60 hover:text-gold transition-colors"
                >
                  <Mail size={16} className="flex-shrink-0" />
                  hello@luxeclothing.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-cream/40">
            <p>&copy; {new Date().getFullYear()} LUXE Clothing. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-cream transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-cream transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-cream transition-colors">
                Shipping Info
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
