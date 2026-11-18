"use client";

import Script from "next/script";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

// Client-side navigations are counted by GA4's enhanced measurement ("page
// changes based on browser history events"). Sending a manual page_view on
// top of that recorded every in-site navigation twice.
//
// The tiny inline setup runs straight away, so gtag() calls and events queue
// in dataLayer from the start; the gtag.js library (about 180 KB) loads after
// the page has finished loading and then sends what was queued. A visitor who
// leaves before that point is not counted.
export default function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="lazyOnload"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            send_page_view: true
          });
        `}
      </Script>
    </>
  );
}
