import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Ski & Snowboard Techniques",
  description:
    "Browse TurnLab's curated ski and snowboard technique library. Filter by discipline, difficulty, and terrain to find the right next skill to practice.",
  path: "/techniques",
  keywords: ["ski techniques", "snowboard techniques", "ski drills", "snowboard drills", "technique library"],
});

export default function TechniquesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
