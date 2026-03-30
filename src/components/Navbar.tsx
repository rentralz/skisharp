"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/techniques", label: "Skiing Techniques" },
  { href: "/slope-ratings", label: "Learning Paths" },
  { href: "/about", label: "About" },
  { href: "/deals", label: "Deals" },
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
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="text-lg font-bold tracking-tight text-[#222]">
            Turn<span className="text-[#B4835A]">Lab</span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8 text-sm">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`transition-colors ${
                  isActive(href)
                    ? "text-[#222] font-medium"
                    : "text-[#aaa] hover:text-[#222]"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden p-2 text-[#aaa] hover:text-[#222] transition-colors rounded-lg"
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

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-1"
        >
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`block px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive(href)
                  ? "text-[#222] bg-gray-50 font-medium"
                  : "text-[#646464] hover:text-[#222] hover:bg-gray-50"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    
          <button
            onClick={() => document.documentElement.classList.toggle("dark")}
            className="p-2 text-[#aaa] hover:text-[#222] transition-colors rounded-lg"
            aria-label="Toggle dark mode"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
        </nav>
  );
}
