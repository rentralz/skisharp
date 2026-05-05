import type { MouseEvent } from "react";

export type AnalyticsValue = string | number | boolean;
export type AnalyticsParams = Record<string, AnalyticsValue | null | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

function sanitizeParams(params: AnalyticsParams = {}) {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null),
  ) as Record<string, AnalyticsValue>;
}

export function isGaEnabled() {
  return Boolean(GA_MEASUREMENT_ID);
}

export function trackPageView(url: string, title?: string) {
  if (typeof window === "undefined" || !window.gtag || !GA_MEASUREMENT_ID) {
    return;
  }

  const location = new URL(url);

  window.gtag("event", "page_view", {
    page_title: title,
    page_location: location.toString(),
    page_path: `${location.pathname}${location.search}`,
  });
}

export function trackEvent(name: string, params: AnalyticsParams = {}) {
  if (typeof window === "undefined" || !window.gtag || !GA_MEASUREMENT_ID) {
    return;
  }

  window.gtag("event", name, sanitizeParams(params));
}

export function getLinkTrackingContext(href: string) {
  try {
    const url = new URL(href, typeof window === "undefined" ? "https://turnlab.co" : window.location.origin);
    return {
      destination_host: url.host,
      destination_path: `${url.pathname}${url.search}${url.hash}`,
      destination_hash: url.hash || "",
      is_external: url.origin !== "https://turnlab.co" &&
        (typeof window === "undefined" || url.origin !== window.location.origin),
    };
  } catch {
    return {
      destination_host: "unknown",
      destination_path: href,
      destination_hash: href.startsWith("#") ? href : "",
      is_external: href.startsWith("http"),
    };
  }
}

export function withLinkTracking(
  eventName: string,
  href: string,
  eventParams: AnalyticsParams = {},
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void,
) {
  return (event: MouseEvent<HTMLAnchorElement>) => {
    trackEvent(eventName, {
      link_url: href,
      ...getLinkTrackingContext(href),
      ...eventParams,
    });

    onClick?.(event);
  };
}
