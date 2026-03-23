import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/techniques", label: "Techniques" },
  { href: "/slope-ratings", label: "Slope Ratings" },
  { href: "/snow-conditions", label: "Snow Conditions" },
  { href: "/equipment-guide", label: "Equipment Guide" },
  { href: "/clothing-guide", label: "Clothing Guide" },
  { href: "/resorts", label: "Resorts" },
];

const LEVEL_LINKS = [
  { href: "/techniques?rating=green", label: "Beginner (Green)" },
  { href: "/techniques?rating=blue", label: "Intermediate (Blue)" },
  { href: "/techniques?rating=black", label: "Advanced (Black)" },
  { href: "/techniques?rating=double-black", label: "Expert (Double Black)" },
];

export default function Footer() {
  return (
    <footer className="bg-[#080f18] border-t border-white/5 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="text-xl font-bold text-white mb-2">
              Turn<span className="text-[#e8722a]">Lab</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              The internet&apos;s best ski instruction — curated, organized, and free.
            </p>
          </div>

          {/* Pages */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
              Explore
            </h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-gray-500 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Levels */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
              By Level
            </h3>
            <ul className="space-y-2">
              {LEVEL_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-gray-500 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 text-center">
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} TurnLab. All video content belongs to
            their respective creators.
          </p>
        </div>
      </div>
    </footer>
  );
}
