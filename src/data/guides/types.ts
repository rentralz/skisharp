// Long-form written guides for technique pages. Kept out of techniques.ts on
// purpose: techniques.ts is imported by client components and ships to the
// browser, while guides are read only by the server-rendered detail page.
export interface GuideSection {
  heading: string;
  paragraphs: string[];
  steps?: string[];
}

export interface GuideFaq {
  question: string;
  answer: string;
}

export interface TechniqueGuide {
  slug: string;
  intro: string;
  sections: GuideSection[];
  faq: GuideFaq[];
  reviewedAt: string; // "YYYY-MM"
}
