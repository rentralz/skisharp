import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { buildPageMetadata, CONTACT_EMAIL } from "@/lib/seo";

const LAST_UPDATED = "September 29, 2026";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms of Use",
  description:
    "The terms for using TurnLab's free ski and snowboard technique guides, deals, and third-party video content.",
  path: "/terms",
});

const sectionClass = "mt-10";
const headingClass = "text-xl font-bold text-gray-900 mb-3";
const bodyClass = "text-gray-700 leading-7 space-y-3";
const linkClass = "text-[#b35816] underline underline-offset-4 hover:text-[#8f4511]";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white font-[family-name:var(--font-inter)]">
      <Navbar />
      <Breadcrumbs crumbs={[{ label: "Terms of Use" }]} />

      <main id="main-content" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Terms of Use</h1>
        <p className="text-sm text-gray-500">Last updated {LAST_UPDATED}</p>
        <p className="mt-6 text-gray-700 leading-7">
          By using TurnLab (turnlab.co) you agree to these terms. If you don&apos;t agree, please
          don&apos;t use the site.
        </p>

        <section className={sectionClass} aria-labelledby="safety">
          <h2 id="safety" className={headingClass}>Skiing and snowboarding carry real risk</h2>
          <div className={bodyClass}>
            <p>
              TurnLab&apos;s guides are general educational information, not a substitute for lessons
              from a qualified instructor. Skiing and snowboarding can cause serious injury. Practice
              on terrain within your ability, follow your resort&apos;s rules and the Responsibility
              Code, wear appropriate protective gear, and stop if something hurts. You use the
              techniques and drills on this site at your own risk.
            </p>
          </div>
        </section>

        <section className={sectionClass} aria-labelledby="videos">
          <h2 id="videos" className={headingClass}>Third-party videos</h2>
          <div className={bodyClass}>
            <p>
              The instruction videos embedded on TurnLab belong to their creators and are shown
              through YouTube&apos;s embedded player. TurnLab curates and organizes them and adds its
              own written breakdowns, but does not own the videos. Creators who want a video removed
              can contact us.
            </p>
          </div>
        </section>

        <section className={sectionClass} aria-labelledby="deals">
          <h2 id="deals" className={headingClass}>Deals, prices, and affiliate links</h2>
          <div className={bodyClass}>
            <p>
              Deals and prices come from retailers and community sources and change often. Always
              check the price, availability, and return terms on the retailer&apos;s site before you
              buy; TurnLab is not the seller and is not responsible for third-party offers.
            </p>
            <p>
              Some links are affiliate links, and TurnLab may earn a commission on purchases made
              through them at no extra cost to you. As an Amazon Associate I earn from qualifying
              purchases.
            </p>
          </div>
        </section>

        <section className={sectionClass} aria-labelledby="warranty">
          <h2 id="warranty" className={headingClass}>No warranty</h2>
          <div className={bodyClass}>
            <p>
              The site is provided &ldquo;as is&rdquo; without warranties of any kind. To the extent
              the law allows, TurnLab is not liable for any loss or injury arising from your use of
              the site or reliance on its content.
            </p>
          </div>
        </section>

        <section className={sectionClass} aria-labelledby="changes">
          <h2 id="changes" className={headingClass}>Changes and contact</h2>
          <div className={bodyClass}>
            <p>
              These terms may change; the date at the top shows the latest version. Questions:{" "}
              <a className={linkClass} href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
              . How data is handled is covered in the{" "}
              <Link className={linkClass} href="/privacy">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
