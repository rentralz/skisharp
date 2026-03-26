import Link from "next/link";

interface NextStepsProps {
  heading?: string;
  links: { href: string; label: string; description: string }[];
}

export default function NextSteps({
  heading = "What's Next?",
  links,
}: NextStepsProps) {
  return (
    <section className="mt-16 mb-4">
      <h2 className="text-xl font-bold text-gray-900 mb-4">{heading}</h2>
      <div className="grid sm:grid-cols-3 gap-3">
        {links.map(({ href, label, description }) => (
          <Link
            key={href}
            href={href}
            className="block p-4 rounded-xl bg-white border border-gray-200 hover:border-[#e8722a]/40 hover:shadow-md transition-all group"
          >
            <span className="text-sm font-semibold text-[#e8722a] group-hover:text-[#d4621a] transition-colors">
              {label}
            </span>
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
