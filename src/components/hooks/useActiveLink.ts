"use client";

import { usePathname } from "next/navigation";

interface NavLink {
  href: string;
  label: string;
}

/**
 * Returns the href of the currently active link.
 * Supports exact match and prefix matching.
 */
export function useActiveLink(links: NavLink[]): string | null {
  const pathname = usePathname();

  for (const link of links) {
    if (link.href === "/techniques") {
      if (pathname === "/techniques" || pathname.startsWith("/techniques/")) {
        return link.href;
      }
    } else if (pathname.startsWith(link.href)) {
      return link.href;
    }
  }
  return null;
}
