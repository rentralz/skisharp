import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";
import TechniquesPageClient from "@/components/TechniquesPageClient";
import { techniques } from "@/data/techniques";

function TechniquesResultsFallback() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center text-gray-500">
      Loading technique filters...
    </div>
  );
}

export default function TechniquesPage() {
  const skiTechniqueCount = techniques.filter((technique) => technique.discipline === "ski").length;
  const snowboardTechniqueCount = techniques.filter((technique) => technique.discipline === "snowboard").length;

  return (
    <div className="min-h-screen bg-white font-[family-name:var(--font-inter)]">
      <Navbar />
      <Breadcrumbs crumbs={[{ label: "Techniques" }]} />

      <div id="main-content" className="bg-white border-b border-gray-200">
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
    </div>
  );
}
