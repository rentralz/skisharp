"use client";

import { useEffect, useRef } from "react";

interface AdUnitProps {
  slot: string;
  format?: "auto" | "horizontal" | "vertical" | "rectangle";
  className?: string;
}

// Replace with your actual AdSense publisher ID
const ADSENSE_PUB_ID = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID || "";

// data-ad-slot must be the numeric ad-unit ID from the AdSense console. A
// named placeholder makes Google answer 400 and leaves an empty box behind.
function isAdUnitId(slot: string) {
  return /^\d+$/.test(slot);
}

export default function AdUnit({ slot, format = "auto", className = "" }: AdUnitProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const pushed = useRef(false);
  const canRender = Boolean(ADSENSE_PUB_ID) && isAdUnitId(slot);

  useEffect(() => {
    if (!canRender || pushed.current) return;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // AdSense not loaded or blocked
    }
  }, [canRender]);

  if (!canRender) return null; // No publisher ID or no real ad-unit ID: render nothing

  return (
    <div className={`ad-container my-6 ${className}`} ref={adRef}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_PUB_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
