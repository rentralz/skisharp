import type { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";
import TechniquesPageClient from "@/components/TechniquesPageClient";
import TechniqueIndex from "@/components/TechniqueIndex";
import Footer from "@/components/Footer";
import { techniques } from "@/data/techniques";
import { buildAbsoluteUrl, buildBreadcrumbSchema, buildPageMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";

function TechniquesResultsFallback() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center text-gray-500">
      Loading technique filters...
    </div>
  );
}

const TECHNIQUES_TITLE = "Ski & Snowboard Techniques";
const TECHNIQUES_DESCRIPTION =
  "Browse TurnLab's curated ski and snowboard technique library. Filter by discipline, difficulty, and terrain to find the right next skill to practice.";

export const metadata: Metadata = buildPageMetadata({
  title: TECHNIQUES_TITLE,
  description: TECHNIQUES_DESCRIPTION,
  path: "/techniques",
  keywords: ["ski techniques", "snowboard techniques", "ski drills", "snowboard drills", "technique library"],
});

// Listing-page schema lives on this page only. It used to sit in a
// techniques/layout.tsx that also wrapped every /techniques/<slug> page,
// giving each guide a second, conflicting BreadcrumbList.
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

export default function TechniquesPage() {
  const skiTechniqueCount = techniques.filter((technique) => technique.discipline === "ski").length;
  const snowboardTechniqueCount = techniques.filter((technique) => technique.discipline === "snowboard").length;

  return (
    <div className="min-h-screen bg-white font-[family-name:var(--font-inter)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(techniquesSchema) }} />
      <Navbar />
      <Breadcrumbs crumbs={[{ label: "Techniques" }]} />

      <main id="main-content">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-[#e8722a] text-sm font-medium uppercase tracking-[0.2em] mb-4">
            Curated technique library
          </p>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Ski &amp; Snowboard Techniques</h1>
          <p className="text-gray-500 text-lg mb-2">
            Browse TurnLab&apos;s curated ski and snowboard technique library. Filter by discipline,
            difficulty, and terrain to find the right next skill to practice.
          </p>
          <p className="text-gray-500 text-lg">
            {techniques.length} technique pages live across {skiTechniqueCount} ski and {snowboardTechniqueCount} snowboard skills.
          </p>
        </div>
      </div>

      <Suspense fallback={<TechniquesResultsFallback />}>
        <TechniquesPageClient />
      </Suspense>

      <TechniqueIndex />
      </main>
      <Footer />
    </div>
  );
}
