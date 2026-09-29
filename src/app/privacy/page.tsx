import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { buildPageMetadata, CONTACT_EMAIL } from "@/lib/seo";

const LAST_UPDATED = "September 29, 2026";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "How TurnLab uses analytics, advertising cookies, affiliate links, deal-alert emails, and on-device storage — and the choices you have.",
  path: "/privacy",
});

const sectionClass = "mt-10";
const headingClass = "text-xl font-bold text-gray-900 mb-3";
const bodyClass = "text-gray-700 leading-7 space-y-3";
const linkClass = "text-[#b35816] underline underline-offset-4 hover:text-[#8f4511]";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white font-[family-name:var(--font-inter)]">
      <Navbar />
      <Breadcrumbs crumbs={[{ label: "Privacy Policy" }]} />

      <main id="main-content" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Privacy Policy</h1>
        <p className="text-sm text-gray-500">Last updated {LAST_UPDATED}</p>
        <p className="mt-6 text-gray-700 leading-7">
          TurnLab (turnlab.co) is a free ski and snowboard technique library. You can use every
          page without an account. This page explains what data is collected when you visit, who
          collects it, and what you can do about it.
        </p>

        <section className={sectionClass} aria-labelledby="analytics">
          <h2 id="analytics" className={headingClass}>Analytics</h2>
          <div className={bodyClass}>
            <p>We use analytics to learn which guides are useful and where the site is slow or confusing:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Vercel Web Analytics and Speed Insights</strong> count page views and measure
                page performance. They do not use cookies.
              </li>
              <li>
                <strong>Google Analytics</strong> uses cookies to record pages viewed, how you arrived,
                device and browser type, and approximate location. See{" "}
                <a className={linkClass} href="https://policies.google.com/technologies/partner-sites" rel="noopener noreferrer" target="_blank">
                  how Google uses information from sites that use its services
                </a>
                .
              </li>
              <li>
                <strong>PostHog</strong> records interactions such as clicks, quiz answers, and
                &ldquo;mark as practiced&rdquo; taps, and may record anonymized session replays with
                typed text masked.
              </li>
            </ul>
          </div>
        </section>

        <section className={sectionClass} aria-labelledby="advertising">
          <h2 id="advertising" className={headingClass}>Advertising</h2>
          <div className={bodyClass}>
            <p>
              TurnLab may show ads served by Google AdSense. Google and its partners use cookies to
              serve ads based on your visits to this and other websites. You can turn off
              personalized ads in{" "}
              <a className={linkClass} href="https://adssettings.google.com" rel="noopener noreferrer" target="_blank">
                Google Ads Settings
              </a>{" "}
              or opt out of many third-party vendors at{" "}
              <a className={linkClass} href="https://www.aboutads.info/choices/" rel="noopener noreferrer" target="_blank">
                aboutads.info
              </a>
              . Visitors in the European Economic Area, the UK, and Switzerland are asked for consent
              before personalized ads are shown.
            </p>
          </div>
        </section>

        <section className={sectionClass} aria-labelledby="affiliates">
          <h2 id="affiliates" className={headingClass}>Affiliate links</h2>
          <div className={bodyClass}>
            <p>
              Some links to retailers are affiliate links. As an Amazon Associate I earn from
              qualifying purchases. When you follow an affiliate link, the retailer may set a cookie
              to credit TurnLab with a commission. It costs you nothing extra, and retailers do not
              share your purchase details with us.
            </p>
          </div>
        </section>

        <section className={sectionClass} aria-labelledby="email">
          <h2 id="email" className={headingClass}>Deal-alert emails</h2>
          <div className={bodyClass}>
            <p>
              If you sign up for deal alerts, we store your email address, the gear interest you
              chose, the time you signed up, the page you came from, and your browser&apos;s user-agent
              string. We use them only to send deal alerts, through our email service provider. Every
              alert includes an unsubscribe link, or you can email us to be removed.
            </p>
          </div>
        </section>

        <section className={sectionClass} aria-labelledby="device">
          <h2 id="device" className={headingClass}>Data stored on your device</h2>
          <div className={bodyClass}>
            <p>
              Your practice progress, streak, preferred discipline (ski or snowboard), and light or
              dark theme are saved in your browser&apos;s local storage so the site remembers them. They
              stay on your device; clearing this site&apos;s data in your browser removes them.
            </p>
          </div>
        </section>

        <section className={sectionClass} aria-labelledby="videos">
          <h2 id="videos" className={headingClass}>Embedded videos</h2>
          <div className={bodyClass}>
            <p>
              Technique videos are embedded from YouTube in its privacy-enhanced mode. YouTube may set
              cookies once a video loads or plays, under{" "}
              <a className={linkClass} href="https://policies.google.com/privacy" rel="noopener noreferrer" target="_blank">
                Google&apos;s privacy policy
              </a>
              .
            </p>
          </div>
        </section>

        <section className={sectionClass} aria-labelledby="choices">
          <h2 id="choices" className={headingClass}>Your choices</h2>
          <div className={bodyClass}>
            <ul className="list-disc pl-6 space-y-2">
              <li>Block or delete cookies in your browser settings; the guides work without them.</li>
              <li>
                Install the{" "}
                <a className={linkClass} href="https://tools.google.com/dlpage/gaoptout" rel="noopener noreferrer" target="_blank">
                  Google Analytics opt-out add-on
                </a>
                .
              </li>
              <li>Email us to ask what we hold about you or to have your email address deleted.</li>
            </ul>
            <p>We do not sell your personal information.</p>
          </div>
        </section>

        <section className={sectionClass} aria-labelledby="children">
          <h2 id="children" className={headingClass}>Children</h2>
          <div className={bodyClass}>
            <p>TurnLab is not directed at children under 13 and does not knowingly collect their data.</p>
          </div>
        </section>

        <section className={sectionClass} aria-labelledby="contact">
          <h2 id="contact" className={headingClass}>Contact</h2>
          <div className={bodyClass}>
            <p>
              Questions or requests:{" "}
              <a className={linkClass} href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
              . If this policy changes, the date at the top of the page changes with it. See also the{" "}
              <Link className={linkClass} href="/terms">
                Terms of Use
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
