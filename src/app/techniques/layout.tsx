import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Techniques",
  description:
    "Browse 30+ expert-curated skiing techniques — from beginner wedge turns to expert mogul absorption. Filter by difficulty, watch video breakdowns, and master every turn.",
};

export default function TechniquesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
