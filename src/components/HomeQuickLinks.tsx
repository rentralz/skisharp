"use client";

import Link from "next/link";
import { useDisciplinePreference } from "@/hooks/useDisciplinePreference";

const SIZE_LINKS = {
  ski: { href: "/ski-size-calculator", label: "What size skis do I need?" },
  snowboard: { href: "/snowboard-size-calculator", label: "What size snowboard do I need?" },
} as const;

const LINK_CLASS =
  "inline-flex items-center gap-1.5 text-[#7d5431] underline decoration-[#d9c6b5] underline-offset-4 transition-colors hover:decoration-[#7d5431]";

interface Props {
  // Matches the snow band's own visibility rule, so the link never points at
  // a section that is not on the page.
  showSnowLink: boolean;
}

// Shortcuts to the two things visitors most often come for besides lessons:
// gear sizing and today's snow. The size link follows the chosen discipline.
export default function HomeQuickLinks({ showSnowLink }: Props) {
  const { discipline } = useDisciplinePreference();
  const sizeLink = SIZE_LINKS[discipline];

  return (
    <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold" aria-label="Quick links">
      <li>
        <Link href={sizeLink.href} className={LINK_CLASS}>
          <span aria-hidden="true">📏</span>
          {sizeLink.label}
        </Link>
      </li>
      {showSnowLink && (
        <li>
          <a href="#snow-forecast" className={LINK_CLASS}>
            <span aria-hidden="true">❄️</span>
            Snow forecast
          </a>
        </li>
      )}
    </ul>
  );
}
