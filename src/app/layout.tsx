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
