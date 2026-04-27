"use client";

import { useSyncExternalStore } from "react";

interface NavLink {
  href: string;
  label: string;
}

let historyPatched = false;

function ensureHistoryEvents() {
  if (historyPatched || typeof window === "undefined") {
    return;
  }

  const dispatchLocationChange = () => {
    window.dispatchEvent(new Event("locationchange"));
  };

  const originalPushState = window.history.pushState.bind(window.history);
  const originalReplaceState = window.history.replaceState.bind(window.history);

  window.history.pushState = function (...args) {
    const result = originalPushState(...args);
    dispatchLocationChange();
    return result;
  };

  window.history.replaceState = function (...args) {
    const result = originalReplaceState(...args);
    dispatchLocationChange();
    return result;
  };

  window.addEventListener("popstate", dispatchLocationChange);
  historyPatched = true;
}

function subscribe(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  ensureHistoryEvents();
  window.addEventListener("locationchange", onStoreChange);

  return () => {
    window.removeEventListener("locationchange", onStoreChange);
  };
}

function getLocationSnapshot() {
  if (typeof window === "undefined") {
    return "";
  }

  return `${window.location.pathname}${window.location.search}`;
}

/**
 * Returns the href of the currently active link.
 * Supports exact match and prefix matching, including discipline-aware techniques links.
 */
export function useActiveLink(links: NavLink[]): string | null {
  const location = useSyncExternalStore(subscribe, getLocationSnapshot, () => "");
  const [pathname, search = ""] = location.split("?");
  const activeDiscipline = new URLSearchParams(search).get("discipline");

  for (const link of links) {
    if (link.href.startsWith("/techniques?discipline=")) {
      const linkDiscipline = link.href.split("discipline=")[1];
      if ((pathname === "/techniques" || pathname.startsWith("/techniques/")) && activeDiscipline === linkDiscipline) {
        return link.href;
      }
      continue;
    }

    if (link.href === "/techniques") {
      if (pathname === "/techniques" || pathname.startsWith("/techniques/")) {
        return link.href;
      }
    } else if (pathname.startsWith(link.href)) {
      return link.href;
    }
  }

  return null;
}
