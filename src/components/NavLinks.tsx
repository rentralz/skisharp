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
          ? `block rounded-lg px-3 py-2.5 text-sm transition-colors ${
              active
                ? "bg-gray-50 font-medium text-[#222]"
                : "text-[#646464] hover:bg-gray-50 hover:text-[#222]"
            }`
          : `inline-flex h-14 items-center border-b-2 transition-colors ${
              active
                ? "border-[#B4835A] font-medium text-[#222]"
                : "border-transparent text-[#8b8178] hover:border-[#dfcfbf] hover:text-[#222]"
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
            aria-current={active ? "page" : undefined}
          >
            {label}
          </Link>
        );
      })}
    </>
  );
}