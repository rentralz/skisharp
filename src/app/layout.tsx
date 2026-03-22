import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
  },
  twitter: {
    card: "summary_large_image",
    title: "SkiSharp — Master Every Turn",
    description: "Curated skiing technique guides with step-by-step video breakdowns, feel cues, and common mistake fixes.",
  },
  metadataBase: new URL("https://skisharp.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#0d1b2a] text-[#f8f9fa]">
        {children}
      </body>
    </html>
  );
}
