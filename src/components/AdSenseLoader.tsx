"use client";

import { useEffect } from "react";
import { ADSENSE_PUB_ID } from "@/lib/adsense";

const ADSENSE_SRC = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";

// Adds the AdSense tag (about 250 KB of scripts) once the page has finished
// loading and the browser is idle, so ads never compete with the page itself.
// It is a plain <script> as AdSense documents it: next/script would add a
// data-nscript attribute, which AdSense's head-tag check warns about.
// AdUnit's adsbygoogle.push() calls queue up until the script arrives.
export default function AdSenseLoader() {
  useEffect(() => {
    if (!ADSENSE_PUB_ID) return;

    const addTag = () => {
      if (document.querySelector(`script[src^="${ADSENSE_SRC}"]`)) return;
      const script = document.createElement("script");
      script.async = true;
      script.src = `${ADSENSE_SRC}?client=${ADSENSE_PUB_ID}`;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    };
    const addWhenIdle = () => {
      // Older Safari has no requestIdleCallback.
      if (typeof window.requestIdleCallback === "function") {
        window.requestIdleCallback(addTag, { timeout: 3000 });
      } else {
        window.setTimeout(addTag, 1);
      }
    };

    if (document.readyState === "complete") {
      addWhenIdle();
      return;
    }
    window.addEventListener("load", addWhenIdle, { once: true });
    return () => window.removeEventListener("load", addWhenIdle);
  }, []);

  return null;
}
