import type { Metadata } from "next";
import { buildBreadcrumbSchema, buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const CONDITIONS_TITLE = "Snow Conditions Technique Matcher";
const CONDITIONS_DESCRIPTION =
  "Pick today's snow conditions and get matched with ski techniques that fit groomers, powder, moguls, ice, trees, steeps, and mixed terrain.";

export const metadata: Metadata = buildPageMetadata({
  title: CONDITIONS_TITLE,
  description: CONDITIONS_DESCRIPTION,
  path: "/conditions-match",
  keywords: ["snow conditions ski technique", "what to practice skiing today", "powder ski techniques", "mogul ski techniques"],
});

const conditionsSchema = [
  buildWebPageSchema({
    name: CONDITIONS_TITLE,
    description: CONDITIONS_DESCRIPTION,
    path: "/conditions-match",
  }),
  buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Conditions match", path: "/conditions-match" },
  ]),
];

export default function ConditionsMatchLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(conditionsSchema) }} />
      {children}
    </>
  );
}
