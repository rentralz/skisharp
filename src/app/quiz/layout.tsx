import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Ski & Snowboard Skill Quiz",
  description:
    "Take a quick ski or snowboard skill quiz to estimate your level and get technique recommendations tailored to what you should practice next.",
  path: "/quiz",
  keywords: ["ski skill quiz", "snowboard skill quiz", "what ski level am i", "ski technique recommendations"],
});

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
