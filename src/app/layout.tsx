import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import SkipNav from "@/components/SkipNav";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SkiSharp — Master Every Turn",
    template: "%s | SkiSharp",
  },
  description:
    "SkiSharp is a curated skiing technique knowledge hub. Learn parallel turns, mogul absorption, powder floating, and more — step by step with expert video guides.",
  keywords: ["skiing", "ski technique", "ski lessons", "moguls", "powder skiing", "parallel turns"],
  openGraph: {
    title: "SkiSharp — Master Every Turn",
    description: "The internet's best ski instruction videos — curated, organized, and structured into learning paths that actually work.",
    url: "https://skisharp.vercel.app",
    siteName: "SkiSharp",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SkiSharp — Master Every Turn",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SkiSharp — Master Every Turn",
    description: "Curated skiing technique guides with step-by-step video breakdowns, feel cues, and common mistake fixes.",
    images: ["/og-image.png"],
  },
  metadataBase: new URL("https://skisharp.vercel.app"),
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
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#0d1b2a] text-[#f8f9fa]">
        <SkipNav />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
