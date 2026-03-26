import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About TurnLab",
  description: "TurnLab is a curated skiing technique knowledge hub — expert-selected videos, organized into learning paths, and free for everyone.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white font-[family-name:var(--font-inter)]">
      <Navbar />
      <Breadcrumbs crumbs={[{ label: "About" }]} />

      <div id="main-content" className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-extrabold text-[#222] mb-6">About TurnLab</h1>

        <div className="space-y-6 text-[#646464] text-base leading-relaxed">
          <p>
            TurnLab is a curated skiing technique library. We find the best
            skiing instruction videos on YouTube, organize them into structured
            learning paths, and add written analysis — timestamps, feel cues,
            common mistakes, and drills.
          </p>

          <p>
            The idea is simple: YouTube has incredible skiing instruction, but
            it&apos;s scattered across hundreds of channels with no structure.
            TurnLab brings order to the chaos.
          </p>

          <h2 className="text-xl font-bold text-[#222] pt-4">What we add</h2>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-[#B4835A] mt-1">→</span>
              <span><strong className="text-[#222]">Curation</strong> — we watch dozens of videos and pick the clearest, most technically accurate ones</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#B4835A] mt-1">→</span>
              <span><strong className="text-[#222]">Structure</strong> — techniques organized by difficulty with prerequisites and next steps</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#B4835A] mt-1">→</span>
              <span><strong className="text-[#222]">Analysis</strong> — timestamped key moments, feel cues, mistake-and-fix cards, practice drills</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#B4835A] mt-1">→</span>
              <span><strong className="text-[#222]">Attribution</strong> — full credit to original creators with channel links</span>
            </li>
          </ul>

          <h2 className="text-xl font-bold text-[#222] pt-4">Always free</h2>
          <p>
            No accounts, no subscriptions, no paywalls. TurnLab is free and
            always will be. We sustain the site through minimal advertising
            and affiliate partnerships.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
