import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import SkipNav from "@/components/SkipNav";
import PostHogProvider from "@/components/PostHogProvider";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import AdSenseLoader from "@/components/AdSenseLoader";
import PageTransition from "@/components/PageTransition";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const ADSENSE_PUB_ID = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID || "";

const GOOGLE_SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || process.env.GOOGLE_SITE_VERIFICATION || undefined;

export const metadata: Metadata = {
  title: {
    default: "TurnLab — Master Every Turn",
    template: "%s | TurnLab",
  },
  description:
    "TurnLab is a curated skiing technique knowledge hub. Learn parallel turns, mogul absorption, powder floating, and more — step by step with expert video guides.",
  keywords: ["skiing", "ski technique", "ski lessons", "moguls", "powder skiing", "parallel turns"],
  openGraph: {
    title: "TurnLab — Master Every Turn",
    description: "The internet's best ski instruction videos — curated, organized, and structured into learning paths that actually work.",
    url: "https://turnlab.co",
    siteName: "TurnLab",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TurnLab — Master Every Turn",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TurnLab — Master Every Turn",
    description: "Curated skiing technique guides with step-by-step video breakdowns, feel cues, and common mistake fixes.",
    images: ["/og-image.png"],
  },
  metadataBase: new URL("https://turnlab.co"),
  applicationName: "TurnLab",
  publisher: "TurnLab",
  verification: GOOGLE_SITE_VERIFICATION
    ? {
        google: GOOGLE_SITE_VERIFICATION,
      }
    : undefined,
  icons: {
    icon: "/icon.svg",
  },
  // AdSense's site-ownership tag. The ad script itself is added after the page
  // has loaded (AdSenseLoader), so this keeps the account link in the HTML.
  other: ADSENSE_PUB_ID ? { "google-adsense-account": ADSENSE_PUB_ID } : undefined,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-screen bg-white dark:bg-[#111] text-[#222] dark:text-gray-100">
        <AdSenseLoader />
        <PostHogProvider>
          <Suspense fallback={null}>
            <GoogleAnalytics />
          </Suspense>
          <SkipNav />
          <PageTransition>{children}</PageTransition>
          <Analytics />
          <SpeedInsights />
        </PostHogProvider>
      </body>
    </html>
  );
}
