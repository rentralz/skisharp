import type { Metadata } from "next";
import { techniques } from "@/data/techniques";
import { buildAbsoluteUrl, buildBreadcrumbSchema, buildPageMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";

const TECHNIQUES_TITLE = "Ski & Snowboard Techniques";
const TECHNIQUES_DESCRIPTION =
  "Browse TurnLab's curated ski and snowboard technique library. Filter by discipline, difficulty, and terrain to find the right next skill to practice.";

export const metadata: Metadata = buildPageMetadata({
  title: TECHNIQUES_TITLE,
  description: TECHNIQUES_DESCRIPTION,
  path: "/techniques",
  keywords: ["ski techniques", "snowboard techniques", "ski drills", "snowboard drills", "technique library"],
});

const techniquesSchema = [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: TECHNIQUES_TITLE,
    description: TECHNIQUES_DESCRIPTION,
    url: buildAbsoluteUrl("/techniques"),
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntity: {
      "@type": "ItemList",
      name: "TurnLab technique library",
      numberOfItems: techniques.length,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      itemListElement: techniques.map((technique, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: buildAbsoluteUrl(`/techniques/${technique.slug}`),
        name: technique.title,
      })),
    },
  },
  buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Techniques", path: "/techniques" },
  ]),
];

export default function TechniquesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(techniquesSchema) }} />
      {children}
    </>
  );
}
