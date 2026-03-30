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

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  const crumbs = segments.map((seg, i) => {
    const href = "/" + segments.slice(0, i + 1).join("/");
    const label = BREADCRUMB_LABELS[seg] || seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return { href, label, isLast: i === segments.length - 1 };
  });

  return (
    <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 text-sm text-[#aaa]">
      <ol className="flex items-center gap-2">
        <li>
          <Link href="/" className="hover:text-[#222] transition-colors">Home</Link>
        </li>
        {crumbs.map((crumb) => (
          <li key={crumb.href} className="flex items-center gap-2">
            <span className="text-[#ccc]">/</span>
            {crumb.isLast ? (
              <span className="text-[#222] font-medium">{crumb.label}</span>
            ) : (
              <Link href={crumb.href} className="hover:text-[#222] transition-colors">
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
