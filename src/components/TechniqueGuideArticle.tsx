import type { TechniqueGuide } from "@/data/guides/types";

interface Props {
  guide: TechniqueGuide;
  title: string;
}

function formatReviewedAt(value: string) {
  const [year, month] = value.split("-").map(Number);

  if (!year || !month) {
    return value;
  }

  return new Intl.DateTimeFormat("en", {
    month: "long",
    timeZone: "UTC",
    year: "numeric",
  }).format(new Date(Date.UTC(year, month - 1, 1)));
}

// Server component: guide text is rendered into the HTML and never shipped
// as client JS.
export default function TechniqueGuideArticle({ guide, title }: Props) {
  return (
    <section aria-labelledby="full-guide-heading" className="border-t border-gray-200 pt-10">
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b35816]">The full guide</p>
        <p className="rounded-full border border-[#e8ddd4] bg-[#fcfaf8] px-3 py-1 text-xs font-semibold text-[#6f665e]">
          Reviewed {formatReviewedAt(guide.reviewedAt)}
        </p>
      </div>
      <h2 id="full-guide-heading" className="text-2xl font-bold text-gray-900 mb-4">
        How to learn {title}
      </h2>
      <p className="text-gray-700 leading-8">{guide.intro}</p>

      <div className="mt-8 space-y-9">
        {guide.sections.map((section) => (
          <div key={section.heading}>
            <h3 className="text-lg font-bold text-gray-900 mb-3">{section.heading}</h3>
            <div className="space-y-4">
              {section.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-gray-700 leading-8">
                  {paragraph}
                </p>
              ))}
            </div>
            {section.steps && section.steps.length > 0 && (
              <ol className="mt-4 space-y-3 list-decimal pl-6 marker:font-semibold marker:text-[#b35816]">
                {section.steps.map((step, index) => (
                  <li key={index} className="text-gray-700 leading-7 pl-1">
                    {step}
                  </li>
                ))}
              </ol>
            )}
          </div>
        ))}
      </div>

      {guide.faq.length > 0 && (
        <div className="mt-10">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Common questions</h3>
          <div className="divide-y divide-gray-200 rounded-xl border border-gray-200">
            {guide.faq.map((item) => (
              <div key={item.question} className="p-5">
                <h4 className="font-semibold text-gray-900">{item.question}</h4>
                <p className="mt-2 text-gray-700 leading-7">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
