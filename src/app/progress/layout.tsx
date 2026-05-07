import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Track Your Ski & Snowboard Progress",
  description:
    "Track practiced and saved ski or snowboard techniques, monitor your learning streak, and keep your progression organized on one page.",
  path: "/progress",
  keywords: ["track ski progress", "snowboard practice tracker", "ski technique progress", "ski learning tracker"],
});

export default function ProgressLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
