"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

type DealsAnalyticsProps = {
  lastScanned: string;
  featuredCommunityCount: number;
  retailerShortcutCount: number;
  affiliateShortcutCount: number;
  dealAlertsEnabled: boolean;
  scanRecencyBucket: string;
};

const SECTION_LABELS = {
  "community-picks": "community_picks",
  "retailer-shortcuts": "retailer_shortcuts",
  "category-shortcuts": "category_shortcuts",
  "deal-alerts": "deal_alerts",
  "trust-notes": "trust_notes",
} as const;

export default function DealsAnalytics({
  lastScanned,
  featuredCommunityCount,
  retailerShortcutCount,
  affiliateShortcutCount,
  dealAlertsEnabled,
  scanRecencyBucket,
}: DealsAnalyticsProps) {
  useEffect(() => {
    const hoursSinceScan = Math.max(
      0,
      Math.round((Date.now() - new Date(lastScanned).getTime()) / (1000 * 60 * 60)),
    );

    trackEvent("deals_page_impression", {
      featured_community_count: featuredCommunityCount,
      retailer_shortcut_count: retailerShortcutCount,
      affiliate_shortcut_count: affiliateShortcutCount,
      has_featured_community_deals: featuredCommunityCount > 0,
      deal_alerts_enabled: dealAlertsEnabled,
      hours_since_last_scan: hoursSinceScan,
      scan_recency_bucket: scanRecencyBucket,
    });
  }, [
    affiliateShortcutCount,
    dealAlertsEnabled,
    featuredCommunityCount,
    retailerShortcutCount,
    lastScanned,
    scanRecencyBucket,
  ]);

  useEffect(() => {
    const milestones = [25, 50, 75, 100];
    const reached = new Set<number>();

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const maxScrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScrollable <= 0 ? 100 : Math.round((scrollTop / maxScrollable) * 100);

      for (const milestone of milestones) {
        if (progress >= milestone && !reached.has(milestone)) {
          reached.add(milestone);
          trackEvent("deals_scroll_depth", { percent_scrolled: milestone });
        }
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      return;
    }

    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          const id = entry.target.id as keyof typeof SECTION_LABELS;
          if (!id || seen.has(id)) {
            continue;
          }

          seen.add(id);
          trackEvent("deals_section_view", {
            section_id: id,
            section_name: SECTION_LABELS[id],
          });
        }
      },
      { threshold: 0.45 },
    );

    Object.keys(SECTION_LABELS).forEach((id) => {
      const node = document.getElementById(id);
      if (node) {
        observer.observe(node);
      }
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
