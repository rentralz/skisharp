"use client";

import Link from "next/link";
import { DISCIPLINES } from "@/data/disciplines";
import { useDisciplinePreference } from "@/hooks/useDisciplinePreference";

interface Props {
  className: string;
  suffix?: string;
}

export default function HomeDisciplineLibraryCta({ className, suffix = "" }: Props) {
  const { discipline } = useDisciplinePreference();
  const cta = DISCIPLINES[discipline];

  return (
    <Link href={cta.libraryHref} className={className}>
      {cta.ctaLabel}
      {suffix}
    </Link>
  );
}
