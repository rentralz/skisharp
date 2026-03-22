export default function SkipNav() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[#e8722a] focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold focus:outline-none focus:shadow-lg focus:shadow-black/50"
    >
      Skip to main content
    </a>
  );
}
