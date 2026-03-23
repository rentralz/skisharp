"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/techniques", label: "Techniques", mobileLabel: "All Techniques" },
  { href: "/slope-ratings", label: "Slopes", mobileLabel: "Slope Ratings" },
  { href: "/snow-conditions", label: "Conditions", mobileLabel: "Snow Conditions" },
  { href: "/equipment-guide", label: "Equipment", mobileLabel: "Equipment Guide" },
  { href: "/clothing-guide", label: "Clothing", mobileLabel: "Clothing Guide" },
  { href: "/budget-gear", label: "Budget Gear", mobileLabel: "Budget Gear ($250)" },
  { href: "/deals", label: "Deals", mobileLabel: "Ski Deals & Sales" },
  { href: "/resorts", label: "Resorts", mobileLabel: "Resorts Worldwide" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/techniques") {
      return pathname === "/techniques" || pathname.startsWith("/techniques/");
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#0d1b2a]/90 backdrop-blur border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold tracking-tight text-white">
            Turn<span className="text-[#e8722a]">Lab</span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden sm:flex items-center gap-1 text-sm">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  isActive(href)
                    ? "text-[#e8722a] bg-[#e8722a]/10 font-semibold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA + mobile hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="sm:hidden p-2 text-gray-400 hover:text-white transition-colors rounded-lg"
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="sm:hidden border-t border-white/5 bg-[#0d1b2a] px-4 py-4 space-y-1"
        >
          {NAV_LINKS.map(({ href, mobileLabel }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`block px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive(href)
                  ? "text-[#e8722a] bg-[#e8722a]/10 font-semibold"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
            >
              {mobileLabel}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              href="/techniques"
              onClick={() => setMenuOpen(false)}
              className="block bg-[#e8722a] hover:bg-[#d4621a] text-white text-sm font-semibold px-4 py-2.5 rounded-lg text-center transition-colors"
            >
              Browse All Techniques
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
