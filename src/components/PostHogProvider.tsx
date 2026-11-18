"use client";

import posthog from "posthog-js";
import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY || "";
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";
// Session replay is kept but sampled: roughly 1 in 4 sessions is recorded.
// Set here, it overrides the sample rate in the PostHog project settings.
const SESSION_RECORDING_SAMPLE_RATE = 0.25;
// Page views waiting for PostHog to start; a cap so a blocked or failed
// start can never grow the queue without bound.
const MAX_PENDING = 20;
// Search-box typing rewrites ?q= in the URL; that is not a new page.
const NON_PAGE_PARAMS = ["q"];

// PostHog's own add-ons (session replay and others, about 140 KB from
// PostHog's servers) are fetched when it starts, so it starts only once the
// page has finished loading and the browser is idle. Calls made before then
// wait here, keeping the time they happened.
let posthogReady = false;
let startScheduled = false;
const pendingCalls: Array<() => void> = [];

function whenPostHogReady(call: () => void) {
  if (posthogReady) {
    call();
  } else if (pendingCalls.length < MAX_PENDING) {
    pendingCalls.push(call);
  }
}

function startPostHog() {
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    person_profiles: "identified_only",
    capture_pageview: false, // We capture manually below for SPA nav
    capture_pageleave: true,
    autocapture: true,
    session_recording: { sampleRate: SESSION_RECORDING_SAMPLE_RATE },
    loaded: () => {
      posthogReady = true;
      pendingCalls.splice(0).forEach((call) => call());
    },
  });
}

function schedulePostHogStart() {
  if (startScheduled) return;
  startScheduled = true;

  const startWhenIdle = () => {
    // Older Safari has no requestIdleCallback.
    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(startPostHog, { timeout: 3000 });
    } else {
      window.setTimeout(startPostHog, 1);
    }
  };

  if (document.readyState === "complete") {
    startWhenIdle();
  } else {
    window.addEventListener("load", startWhenIdle, { once: true });
  }
}

if (typeof window !== "undefined" && POSTHOG_KEY) {
  schedulePostHogStart();
}

function pageQuery(searchParams: URLSearchParams) {
  const params = new URLSearchParams(searchParams.toString());
  NON_PAGE_PARAMS.forEach((name) => params.delete(name));
  return params.toString();
}

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = pageQuery(searchParams);

  useEffect(() => {
    if (!pathname) return;

    const url = window.origin + pathname + (query ? `?${query}` : "");
    const timestamp = new Date();
    whenPostHogReady(() => {
      posthog.capture("$pageview", { $current_url: url }, { timestamp });
    });
  }, [pathname, query]);

  return null;
}

export default function PostHogProvider({ children }: { children: React.ReactNode }) {
  if (!POSTHOG_KEY) return <>{children}</>;

  return (
    <>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
    </>
  );
}
