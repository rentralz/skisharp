import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Snow Conditions Technique Matcher",
  description:
    "Pick today's snow conditions and get matched with ski techniques that fit groomers, powder, moguls, ice, trees, steeps, and mixed terrain.",
  path: "/conditions-match",
  keywords: ["snow conditions ski technique", "what to practice skiing today", "powder ski techniques", "mogul ski techniques"],
});

export default function ConditionsMatchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
