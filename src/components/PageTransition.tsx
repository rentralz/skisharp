"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export default function PageTransition({ children }: Props) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Small delay to trigger animation on route change
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div
      className={`page-transition ${isVisible ? "page-transition-visible" : "page-transition-hidden"}`}
    >
      {children}
    </div>
  );
}
