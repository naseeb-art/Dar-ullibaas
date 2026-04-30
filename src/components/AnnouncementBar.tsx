"use client";

import { useState } from "react";
import { X } from "lucide-react";

const announcements = [
  "Free Shipping on Orders Over $250 | Use Code: LUXE25",
  "New Season Collection — Now Available",
  "Exclusive Members: Extra 10% Off All Sale Items",
];

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!visible) return null;

  return (
    <div className="bg-navy text-cream text-sm py-2.5 relative">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-center">
        <button
          onClick={() =>
            setCurrentIndex(
              (currentIndex - 1 + announcements.length) % announcements.length
            )
          }
          className="absolute left-4 text-cream/70 hover:text-cream transition-colors"
          aria-label="Previous announcement"
        >
          ‹
        </button>
        <p className="text-center tracking-wider font-light">
          {announcements[currentIndex]}
        </p>
        <button
          onClick={() =>
            setCurrentIndex((currentIndex + 1) % announcements.length)
          }
          className="absolute right-12 text-cream/70 hover:text-cream transition-colors"
          aria-label="Next announcement"
        >
          ›
        </button>
        <button
          onClick={() => setVisible(false)}
          className="absolute right-4 text-cream/70 hover:text-cream transition-colors"
          aria-label="Close announcement"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
