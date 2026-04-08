"use client";

import { useState } from "react";
import Link from "next/link";
import NavLinks, { type NavLink } from "./NavLinks";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "./ThemeToggle";
import StreakBadge from "@/components/StreakBadge";
import { useActiveLink } from "./hooks/useActiveLink";

const NAV_LINKS: NavLink[] = [
  { href: "/techniques", label: "Skiing Techniques" },
  { href: "/slope-ratings", label: "Learning Paths" },
  { href: "/about", label: "About" },
  { href: "/deals", label: "Deals" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeHref = useActiveLink(NAV_LINKS);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="text-lg font-bold tracking-tight text-[#222]">
            Turn<span className="text-[#B4835A]">Lab</span><StreakBadge />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8 text-sm">
            <NavLinks links={NAV_LINKS} activeHref={activeHref} />
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="p-2 text-[#aaa] hover:text-[#222] transition-colors rounded-lg"
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

          {/* Desktop theme toggle */}
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <MobileMenu
        open={menuOpen}
        links={NAV_LINKS}
        activeHref={activeHref}
        onClose={() => setMenuOpen(false)}
      />
    </nav>
  );
}
