"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const BREADCRUMB_LABELS: Record<string, string> = {
  "": "Home",
  "techniques": "Techniques",
  "slope-ratings": "Learning Paths",
  "about": "About",
  "deals": "Deals",
  "equipment-guide": "Equipment",
  "clothing-guide": "Clothing",
  "conditions-match": "Conditions",
  "resorts": "Resorts",
  "snow-conditions": "Snow",
  "budget-gear": "Budget Gear",
  "quiz": "Quiz",
  "progress": "Progress",
};

export interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  crumbs?: Crumb[];
}

export default function Breadcrumbs({ crumbs }: BreadcrumbsProps) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  let items: Crumb[];

  if (crumbs && crumbs.length > 0) {
    // Use explicit crumbs from page
    items = crumbs;
  } else {
    // Auto-generate from pathname
    items = segments.map((seg, i) => ({
      href: "/" + segments.slice(0, i + 1).join("/"),
      label: BREADCRUMB_LABELS[seg] || seg.replace(/-/g, " ").replace(/\\b\\w/g, (c: string) => c.toUpperCase()),
    }));
  }

  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 text-sm text-[#aaa]">
      <ol className="flex items-center gap-2">
        <li>
          <Link href="/" className="hover:text-[#222] transition-colors">Home</Link>
        </li>
        {items.map((crumb, i) => (
          <li key={crumb.href || i} className="flex items-center gap-2">
            <span className="text-[#ccc]">/</span>
            {i === items.length - 1 ? (
              <span className="text-[#222] font-medium">{crumb.label}</span>
            ) : (
              <Link href={crumb.href || "/"} className="hover:text-[#222] transition-colors">
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
