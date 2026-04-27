"use client";

import { useState } from "react";
import Link from "next/link";
import { techniques } from "@/data/techniques";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CONDITIONS = [
  { id: "groomed", label: "Groomed / Corduroy", emoji: "🟦", desc: "Fresh corduroy, packed runs" },
  { id: "powder", label: "Powder Day", emoji: "❄️", desc: "Fresh deep snow" },
  { id: "ice", label: "Ice / Hardpack", emoji: "🧊", desc: "Firm, icy surface" },
  { id: "moguls", label: "Moguls", emoji: "⛰️", desc: "Bumpy terrain" },
  { id: "trees", label: "Trees / Glades", emoji: "🌲", desc: "Tight tree skiing" },
  { id: "steep", label: "Steep", emoji: "⬛", desc: "35°+ steeps" },
  { id: "slush", label: "Spring / Slush", emoji: "☀️", desc: "Warm, soft snow" },
  { id: "all", label: "Variable / Mixed", emoji: "🎲", desc: "A bit of everything" },
];

const CONDITION_TO_TERRAIN: Record<string, string[]> = {
  groomed: ["Groomed"],
  powder: ["Powder"],
  ice: ["Ice"],
  moguls: ["Moguls"],
  trees: ["Trees"],
  steep: ["Steep"],
  slush: ["All"],
  all: ["Groomed", "All"],
};

export default function ConditionsMatchPage() {
  const [selected, setSelected] = useState<string | null>(null);

  const matchedTechniques = selected
    ? techniques.filter((t) => {
        const terrains = CONDITION_TO_TERRAIN[selected] || [];
        return t.terrain.some((ter) => terrains.includes(ter)) || (selected === "all");
      }).slice(0, 8)
    : [];

  return (
    <div className="min-h-screen bg-white font-[family-name:var(--font-inter)]">
      <Navbar />

      <main id="main-content" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <p className="text-[#B4835A] text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            ⛷️ Ski smarter today
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#222] mb-3">
            What Are Conditions Like Today?
          </h1>
          <p className="text-[#646464] max-w-md mx-auto">
            Pick today&apos;s snow conditions and we&apos;ll match you with the right techniques to practice.
          </p>
        </div>

        {/* Condition selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
          {CONDITIONS.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelected(selected === c.id ? null : c.id)}
              className={`p-4 rounded-xl border text-center transition-all ${
                selected === c.id
                  ? "border-[#B4835A] bg-[#F5F2EF] shadow-sm"
                  : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
              }`}
              aria-pressed={selected === c.id}
            >
              <span className="text-2xl block mb-1">{c.emoji}</span>
              <span className="text-sm font-medium text-[#222] block">{c.label}</span>
              <span className="text-[10px] text-[#aaa]">{c.desc}</span>
            </button>
          ))}
        </div>

        {/* Results */}
        {selected && (
          <div>
            <h2 className="text-xl font-bold text-[#222] mb-4">
              Techniques for {CONDITIONS.find((c) => c.id === selected)?.label}
            </h2>
            {matchedTechniques.length > 0 ? (
              <div className="space-y-3">
                {matchedTechniques.map((t) => {
                  const vid = t.youtubeVideos.find((v: { isPrimary?: boolean }) => v.isPrimary) ?? t.youtubeVideos[0];
                  return (
                    <Link
                      key={t.id}
                      href={`/techniques/${t.slug}?discipline=${t.discipline}`}
                      className="group flex items-center gap-4 p-3 rounded-xl border border-gray-200 hover:border-[#B4835A] hover:shadow-sm transition-all"
                    >
                      {vid && (
                        <div className="w-20 h-14 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={`https://img.youtube.com/vi/${vid.videoId}/mqdefault.jpg`}
                            alt=""
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-[#222] group-hover:text-[#B4835A] transition-colors">
                          {t.title}
                        </p>
                        <p className="text-xs text-[#888] truncate">{t.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            t.rating === "green" ? "bg-emerald-500" :
                            t.rating === "blue" ? "bg-blue-500" :
                            t.rating === "black" ? "bg-gray-800" : "bg-purple-600"
                          }`} />
                          <span className="text-[10px] text-[#aaa]">Level {t.difficulty}</span>
                        </div>
                      </div>
                      <span className="text-[#aaa] group-hover:text-[#B4835A] transition-colors">→</span>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <p className="text-[#888] text-sm py-8 text-center">
                No specific techniques matched. <Link href="/techniques" className="text-[#B4835A] underline">Browse all techniques →</Link>
              </p>
            )}
          </div>
        )}

        {!selected && (
          <div className="text-center py-8 text-[#aaa]">
            <p className="text-4xl mb-3">👆</p>
            <p className="text-sm">Pick a condition above to see matching techniques</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
