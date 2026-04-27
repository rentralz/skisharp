"use client";

import Link from "next/link";

export interface NavLink {
  href: string;
  label: string;
  onClick?: () => void;
}

interface Props {
  links: NavLink[];
  activeHref: string | null;
  onClick?: () => void;
  mobile?: boolean;
}

export default function NavLinks({ links, activeHref, onClick, mobile }: Props) {
  return (
    <>
      {links.map(({ href, label, onClick: linkOnClick }) => {
        const active = href === activeHref;
        const cls = mobile
          ? `block px-3 py-2.5 rounded-lg text-sm transition-colors ${
              active
                ? "text-[#222] bg-gray-50 font-medium"
                : "text-[#646464] hover:text-[#222] hover:bg-gray-50"
            }`
          : `transition-colors ${
              active ? "text-[#222] font-medium" : "text-[#aaa] hover:text-[#222]"
            }`;

        return (
          <Link
            key={href}
            href={href}
            onClick={() => {
              linkOnClick?.();
              onClick?.();
            }}
            className={cls}
          >
            {label}
          </Link>
        );
      })}
    </>
  );
}