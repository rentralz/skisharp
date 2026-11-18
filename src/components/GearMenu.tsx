"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import type { NavLink } from "./NavLinks";

export interface GearLink extends NavLink {
  blurb: string;
}

// Sizing is the question visitors ask most, so the calculators lead the list.
export const GEAR_LINKS: GearLink[] = [
  {
    href: "/ski-size-calculator",
    label: "Ski size calculator",
    blurb: "Ski length for your height, weight and level",
  },
  {
    href: "/snowboard-size-calculator",
    label: "Snowboard size calculator",
    blurb: "Board length and width for your weight and boots",
  },
  {
    href: "/equipment-guide",
    label: "Equipment guide",
    blurb: "How to choose skis, boots, helmets and goggles",
  },
  {
    href: "/clothing-guide",
    label: "Clothing guide",
    blurb: "Layering for cold, windy, powder and spring days",
  },
  {
    href: "/budget-gear",
    label: "Budget gear",
    blurb: "A first-timer's clothing setup for under $250",
  },
];

interface Props {
  activeHref: string | null;
}

// Desktop "Gear" disclosure menu (WAI-ARIA disclosure pattern, not role=menu):
// a button that shows a list of ordinary links. Escape, a click outside or
// tabbing away closes it.

// Hover and current-page fills. These hex classes are not in the html.dark
// overrides in globals.css (which catch bg-white / bg-gray-50 and repaint them
// the panel's own colour), so the dark: variants below take effect.
const ITEM_FILL = "bg-[#f6efe8] dark:bg-[#2a221c]";
const ITEM_HOVER = "hover:bg-[#f6efe8] dark:hover:bg-[#2a221c]";
export default function GearMenu({ activeHref }: Props) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const active = GEAR_LINKS.some((link) => link.href === activeHref);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onBlur={(event) => {
        // Close only when focus moves to something else outside (Tab away).
        // A null relatedTarget means focus went nowhere, e.g. Safari and Firefox
        // not focusing a clicked link: closing then would remove the link before
        // its click lands. Outside clicks are handled by the pointerdown listener.
        const next = event.relatedTarget as Node | null;
        if (next && !wrapperRef.current?.contains(next)) {
          setOpen(false);
        }
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((isOpen) => !isOpen)}
        aria-expanded={open}
        aria-controls={panelId}
        className={`inline-flex h-14 items-center gap-1 border-b-2 transition-colors ${
          active
            ? "border-[#B4835A] font-medium text-[#222]"
            : "border-transparent text-[#6b635b] hover:border-[#dfcfbf] hover:text-[#222]"
        }`}
      >
        Gear
        <svg
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div
          id={panelId}
          className="absolute left-1/2 top-full z-50 w-80 -translate-x-1/2 rounded-2xl border border-[#eadfd6] bg-white p-2 shadow-[0_18px_50px_rgba(43,30,18,0.14)]"
        >
          <ul>
            {GEAR_LINKS.map(({ href, label, blurb }) => {
              const current = href === activeHref;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    aria-current={current ? "page" : undefined}
                    className={`block rounded-xl px-3 py-2.5 transition-colors ${current ? ITEM_FILL : ITEM_HOVER}`}
                  >
                    <span className="block text-sm font-semibold text-[#222]">{label}</span>
                    <span className="mt-0.5 block text-xs leading-5 text-[#6b635b]">{blurb}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
