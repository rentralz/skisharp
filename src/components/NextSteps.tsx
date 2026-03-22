import Link from "next/link";

interface NextStepsProps {
  heading?: string;
  links: { href: string; label: string; description: string }[];
}

const DEFAULT_LINKS = [
  {
    href: "/techniques",
    label: "Browse All Techniques →",
    description: "30+ expert-curated technique guides with video breakdowns",
  },
  {
    href: "/techniques?rating=green",
    label: "Start as a Beginner →",
    description: "Begin with the fundamentals — wedge turns, stopping, chairlift basics",
  },
  {
    href: "/equipment-guide",
    label: "Equipment Guide →",
    description: "Choose the right skis, boots, and gear for your level",
  },
];

export default function NextSteps({
  heading = "What's Next?",
  links = DEFAULT_LINKS,
}: NextStepsProps) {
  return (
    <section className="mt-16 mb-4">
      <h2 className="text-xl font-bold text-white mb-4">{heading}</h2>
      <div className="grid sm:grid-cols-3 gap-3">
        {links.map(({ href, label, description }) => (
          <Link
            key={href}
            href={href}
            className="block p-4 rounded-xl bg-white/3 border border-white/5 hover:border-[#e8722a]/30 transition-colors group"
          >
            <span className="text-sm font-semibold text-[#e8722a] group-hover:text-white transition-colors">
              {label}
            </span>
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
