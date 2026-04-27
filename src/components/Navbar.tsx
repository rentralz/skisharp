"use client";

import { useState } from "react";
import Link from "next/link";
import { DISCIPLINES } from "@/data/disciplines";
import { useDisciplinePreference } from "@/hooks/useDisciplinePreference";
import NavLinks, { type NavLink } from "./NavLinks";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "./ThemeToggle";
import DisciplineToggle from "./DisciplineToggle";
import StreakBadge from "@/components/StreakBadge";
import { useActiveLink } from "./hooks/useActiveLink";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { setDiscipline } = useDisciplinePreference();

  const navLinks: NavLink[] = [
    {
      href: DISCIPLINES.ski.libraryHref,
      label: "Ski",
      onClick: () => setDiscipline("ski"),
    },
    {
      href: DISCIPLINES.snowboard.libraryHref,
      label: "Snowboard",
      onClick: () => setDiscipline("snowboard"),
    },
    { href: "/quiz", label: "Quiz" },
    { href: "/about", label: "About" },
    { href: "/deals", label: "Deals" },
  ];

  const activeHref = useActiveLink(navLinks);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between gap-4">
          <Link href="/" className="text-lg font-bold tracking-tight text-[#222]">
            Turn<span className="text-[#B4835A]">Lab</span><StreakBadge />
          </Link>

          <div className="hidden items-center gap-8 text-sm md:flex">
            <NavLinks links={navLinks} activeHref={activeHref} />
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <DisciplineToggle compact />
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen((open) => !open)}
              className="rounded-lg p-2 text-[#aaa] transition-colors hover:text-[#222]"
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <MobileMenu
        open={menuOpen}
        links={navLinks}
        activeHref={activeHref}
        onClose={() => setMenuOpen(false)}
      />
    </nav>
  );
}
