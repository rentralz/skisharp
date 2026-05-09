import Link from "next/link";
import { DISCIPLINES } from "@/data/disciplines";

const FOOTER_LINKS = [
  { href: DISCIPLINES.ski.libraryHref, label: "Ski Techniques" },
  { href: "/slope-ratings", label: "Slope Ratings" },
  { href: "/snow-conditions", label: "Snow Conditions" },
  { href: "/equipment-guide", label: "Equipment Guide" },
  { href: "/clothing-guide", label: "Clothing Guide" },
  { href: "/budget-gear", label: "Budget Gear" },
  { href: "/deals", label: "Deals & Sales" },
  { href: "/resorts", label: "Resorts" },
];

const LEVEL_LINKS = [
  { href: "/techniques?discipline=ski&rating=green", label: "Beginner Ski (Green)" },
  { href: "/techniques?discipline=ski&rating=blue", label: "Intermediate Ski (Blue)" },
  { href: "/techniques?discipline=ski&rating=black", label: "Advanced Ski (Black)" },
  { href: "/techniques?discipline=ski&rating=double-black", label: "Expert Ski (Double Black)" },
];

const START_HERE_LINKS = [
  { href: "/quiz", label: "Take the 1-minute quiz" },
  { href: "/conditions-match", label: "Browse by snow conditions" },
  { href: "/about", label: "How TurnLab works" },
];

const DISCIPLINE_LINKS = [
  { href: DISCIPLINES.ski.libraryHref, label: "Browse ski techniques" },
  { href: DISCIPLINES.snowboard.libraryHref, label: "Browse snowboard techniques" },
  { href: "/techniques?discipline=ski&rating=green", label: "Start ski basics" },
  { href: "/techniques?discipline=snowboard&rating=green", label: "Start snowboard basics" },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[#e8ddd4] bg-[#f5efe9]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.75fr_0.75fr_0.8fr_0.9fr]">
          <div className="max-w-md">
            <div className="text-2xl font-black tracking-tight text-[#1f1b18]">
              Turn<span className="text-[#b4835a]">Lab</span>
            </div>
            <p className="mt-4 text-sm leading-7 text-[#665d55] sm:text-base">
              The internet&apos;s best ski and snowboard instruction — curated, organized,
              and mapped into progressions that make sense when you&apos;re actually standing
              on snow.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/quiz"
                className="inline-flex items-center justify-center rounded-full bg-[#1f1b18] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#312b26]"
              >
                Start with the quiz
              </Link>
              <Link
                href="/techniques"
                className="inline-flex items-center justify-center rounded-full border border-[#d9c6b5] bg-white px-5 py-2.5 text-sm font-semibold text-[#7d5431] transition-colors hover:bg-[#fff7f0]"
              >
                Browse the library
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a8471]">
              Start here
            </h3>
            <ul className="mt-4 space-y-3">
              {START_HERE_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[#5f554d] transition-colors hover:text-[#1f1b18]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a8471]">
              By discipline
            </h3>
            <ul className="mt-4 space-y-3">
              {DISCIPLINE_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[#5f554d] transition-colors hover:text-[#1f1b18]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a8471]">
              Explore
            </h3>
            <ul className="mt-4 space-y-3">
              {FOOTER_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[#5f554d] transition-colors hover:text-[#1f1b18]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a8471]">
              By level
            </h3>
            <ul className="mt-4 space-y-3">
              {LEVEL_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[#5f554d] transition-colors hover:text-[#1f1b18]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-[#e2d4c8] pt-6 text-sm text-[#8b7b6d] sm:flex sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} TurnLab. Curated instruction, full credit to original creators.</p>
          <p className="mt-2 sm:mt-0">Free to use. Built for better ski days.</p>
        </div>
      </div>
    </footer>
  );
}
