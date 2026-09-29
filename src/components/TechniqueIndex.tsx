import Link from "next/link";
import { DISCIPLINES, type Discipline } from "@/data/disciplines";
import { techniques, type DifficultyRating } from "@/data/techniques";

const DISCIPLINE_ORDER: Discipline[] = ["ski", "snowboard"];

const RATING_GROUPS: { rating: DifficultyRating; label: string; dot: string }[] = [
  { rating: "green", label: "Green · Beginner", dot: "bg-emerald-500" },
  { rating: "blue", label: "Blue · Intermediate", dot: "bg-blue-500" },
  { rating: "black", label: "Black · Advanced", dot: "bg-gray-800" },
  { rating: "double-black", label: "Double black · Expert", dot: "bg-purple-600" },
];

// Server-rendered on purpose: the filterable grid above it renders on the
// client (useSearchParams), so this list is what puts every guide link in the
// initial HTML for crawlers and no-JS visitors.
export default function TechniqueIndex() {
  return (
    <section aria-labelledby="technique-index-heading" className="border-t border-gray-200 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h2 id="technique-index-heading" className="text-2xl font-bold text-gray-900 mb-2">
          All technique guides
        </h2>
        <p className="text-gray-500">Every TurnLab guide in one list, grouped by discipline and trail rating.</p>

        <div className="mt-8 grid gap-10 md:grid-cols-2">
          {DISCIPLINE_ORDER.map((discipline) => (
            <div key={discipline}>
              <h3 className="text-lg font-semibold text-gray-900">{DISCIPLINES[discipline].pluralLabel}</h3>
              {RATING_GROUPS.map(({ rating, label, dot }) => {
                const entries = techniques.filter(
                  (technique) => technique.discipline === discipline && technique.rating === rating,
                );

                if (entries.length === 0) {
                  return null;
                }

                return (
                  <div key={rating} className="mt-5">
                    <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                      <span className={`h-2 w-2 rounded-full ${dot}`} aria-hidden="true" />
                      {label}
                    </h4>
                    <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5">
                      {entries.map((technique) => (
                        <li key={technique.slug}>
                          <Link
                            href={`/techniques/${technique.slug}`}
                            className="text-sm text-gray-700 underline-offset-4 hover:text-[#b35816] hover:underline focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8722a]"
                          >
                            {technique.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
