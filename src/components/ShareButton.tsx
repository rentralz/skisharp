"use client";

import { useState } from "react";

export default function ShareButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleCopy}
      className="text-xs text-[#aaa] hover:text-[#B4835A] transition-colors"
      aria-label={copied ? "Link copied" : "Copy link"}
    >
      {copied ? "✓ Copied" : "Share"}
    </button>
  );
}
