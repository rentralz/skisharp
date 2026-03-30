import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import SkipNav from "@/components/SkipNav";
import PostHogProvider from "@/components/PostHogProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

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
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark h-full antialiased`}>
      {process.env.NEXT_PUBLIC_ADSENSE_PUB_ID && (
        <head>
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_PUB_ID}`}
            crossOrigin="anonymous"
          />
        </head>
      )}
      <body className="min-h-full flex flex-col bg-white text-[#1a1a2e]">
        <SkipNav />
        <PostHogProvider>
          {children}
        </PostHogProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
