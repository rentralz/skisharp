"use client";

import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";
import type { AnalyticsParams } from "@/lib/analytics";
import { withLinkTracking } from "@/lib/analytics";

type TrackedLinkProps = {
  href: string;
  eventName: string;
  eventParams?: AnalyticsParams;
  className?: string;
  children: ReactNode;
  target?: string;
  rel?: string;
  linkKind?: "anchor" | "next";
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  ariaLabel?: string;
};

export default function TrackedLink({
  href,
  eventName,
  eventParams,
  className,
  children,
  target,
  rel,
  linkKind = "anchor",
  onClick,
  ariaLabel,
}: TrackedLinkProps) {
  const handleClick = withLinkTracking(eventName, href, eventParams, onClick);

  if (linkKind === "next") {
    return (
      <Link href={href} className={className} onClick={handleClick} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} target={target} rel={rel} className={className} onClick={handleClick} aria-label={ariaLabel}>
      {children}
    </a>
  );
}
