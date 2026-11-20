import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HomeHeader from "@/components/HomeHeader";
import {
  BinocularsIcon,
  CheckCircle2Icon,
  DatabaseZapIcon,
  DownloadIcon,
  FilterIcon,
  GlobeIcon,
  InfinityIcon,
  Link2Icon,
  Link2OffIcon,
  LinkIcon,
  LockIcon,
  ScaleIcon,
  ShieldCheckIcon,
  SparklesIcon,
  StarIcon,
  WalletIcon,
} from "lucide-react";
import { HomeFooter } from "@/components/HomeFooter";

export const metadata: Metadata = {
  title: "Backlink Checker | SEOToolSuite",
  description:
    "The Backlink Checker tool reveals every inbound link pointing to any domain or URL. It provides insights into source domain strength, page strength, spam score, follow type, backlink type, and link status to help you audit link profiles and uncover link building opportunities.",
  openGraph: {
    type: "website",
    title: "Backlink Checker | SEOToolSuite",
    description:
      "The Backlink Checker tool reveals every inbound link pointing to any domain or URL. It provides insights into source domain strength, page strength, spam score, follow type, backlink type, and link status to help you audit link profiles and uncover link building opportunities.",
    images: [
      {
        url: "/assets/images/backlink-checker-screenshot.png",
      },
    ],
  },
};

export default function BacklinkCheckerFeaturePage() {
  return (
    <div className="backlink-checker-feature-page relative flex w-full flex-col bg-white">
      {/* Header */}
      <HomeHeader />

      {/* Hero Section */}
      <section className="hero w-full border-b-2 border-slate-200 bg-[url('/assets/images/papyrus.png')] bg-repeat px-4 lg:px-0">
        <div className="mx-auto flex w-full max-w-350 flex-col items-center pt-8 lg:pt-14">
          <div className="flex items-center gap-2 rounded-full border-2 border-b-3 border-sky-950/20 bg-white/80 px-4 py-1.5 text-xs font-semibold tracking-wider text-sky-950 uppercase backdrop-blur-xs md:text-sm">
            <LinkIcon size={18} className="text-sky-950" />
            BACKLINK RESEARCH
          </div>
          <h1 className="mt-4 text-center text-3xl font-semibold text-sky-950 capitalize sm:text-4xl lg:text-6xl">
            Backlink Checker
          </h1>
          <p className="mt-4 max-w-225 text-center text-base font-medium text-balance text-black/60 sm:text-lg lg:text-xl">
            Reveal every inbound link pointing to any domain or URL. Audit full
            link profiles with{" "}
            <b className="font-semibold text-sky-950">
              source domain &amp; page strength
            </b>
            , <b className="font-semibold text-sky-950">spam scores</b>,{" "}
            <b className="font-semibold text-sky-950">
              dofollow / nofollow status
            </b>
            , and{" "}
            <b className="font-semibold text-sky-950">broken link detection</b>{" "}
            — powered by DataForSEO with no subscription lock-in.
          </p>
        </div>

        {/* Feature Badges */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 px-2 sm:px-4">
          <div className="flex w-full items-center gap-2 overflow-hidden rounded-md border-2 border-b-3 border-slate-200 bg-white pr-3 md:w-fit">
            <div className="flex h-10 w-10 items-center justify-center bg-sky-950/10">
              <Link2Icon size={20} className="text-sky-950" />
            </div>
            <span className="text-xs font-medium text-sky-950 sm:text-sm md:text-base">
              Full Link Profiles
            </span>
          </div>
          <div className="flex w-full items-center gap-2 overflow-hidden rounded-md border-2 border-b-3 border-slate-200 bg-white pr-3 md:w-fit">
            <div className="flex h-10 w-10 items-center justify-center bg-sky-950/10">
              <StarIcon size={20} className="text-sky-950" />
            </div>
            <span className="text-xs font-medium text-sky-950 sm:text-sm md:text-base">
              Domain &amp; Page Strength
            </span>
          </div>
          <div className="flex w-full items-center gap-2 overflow-hidden rounded-md border-2 border-b-3 border-slate-200 bg-white pr-3 md:w-fit">
            <div className="flex h-10 w-10 items-center justify-center bg-sky-950/10">
              <ShieldCheckIcon size={20} className="text-sky-950" />
            </div>
            <span className="text-xs font-medium text-sky-950 sm:text-sm md:text-base">
              Spam Score
            </span>
          </div>
          <div className="flex w-full items-center gap-2 overflow-hidden rounded-md border-2 border-b-3 border-slate-200 bg-white pr-3 md:w-fit">
            <div className="flex h-10 w-10 items-center justify-center bg-sky-950/10">
              <FilterIcon size={20} className="text-sky-950" />
            </div>
            <span className="text-xs font-medium text-sky-950 sm:text-sm md:text-base">
              Advanced Filters
            </span>
          </div>
          <div className="flex w-full items-center gap-2 overflow-hidden rounded-md border-2 border-b-3 border-slate-200 bg-white pr-3 md:w-fit">
            <div className="flex h-10 w-10 items-center justify-center bg-sky-950/10">
              <Link2OffIcon size={20} className="text-sky-950" />
            </div>
            <span className="text-xs font-medium text-sky-950 sm:text-sm md:text-base">
              Broken Link Detection
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/tool/backlink-research/backlinks"
            className="flex items-center gap-2 rounded-md border-2 border-b-3 border-black/80 bg-sky-950 px-5 py-2.5 text-sm font-medium text-white transition hover:scale-105 active:scale-95 lg:text-base"
          >
            Access Backlink Checker
          </Link>
        </div>

        {/* Hero Screenshot Frame with Scroll Animation */}
        <div className="group relative order-1 mx-auto mt-8 max-h-70 max-w-300 overflow-hidden rounded-t-md border-t-2 border-r-2 border-l-2 border-slate-200 bg-gray-100 p-2 lg:order-2 lg:max-h-129">
          <Image
            src="/assets/images/backlink-checker-screenshot.png"
            alt="Backlink Checker"
            className="w-full rounded-md border-sky-950/10 transition duration-4500 ease-linear group-hover:translate-y-[calc(-100%+248px)] group-[:has(.tool-card-arrow:focus)]:translate-y-[calc(-100%+248px)] lg:group-hover:translate-y-[calc(-100%+484px)] lg:group-[:has(.tool-card-arrow:focus)]:translate-y-[calc(-100%+484px)]"
            width={1200}
            height={1164}
            quality={100}
          />
          <div className="absolute bottom-0 left-0 z-20 flex h-12.5 w-full items-end justify-center bg-linear-to-t from-black/20 to-transparent pb-1 text-black transition-all duration-300 group-hover:opacity-0 has-[.tool-card-arrow:focus]:opacity-0 lg:pb-2">
            <button className="tool-card-arrow flex h-8 w-8 scale-80 animate-bounce items-center justify-center rounded-full bg-white text-black md:scale-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-down-icon lucide-chevron-down"
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Feature Breakdown Grid Section */}
      <section className="w-full border-b-2 border-slate-200 bg-white py-10 lg:py-16">
        <div className="mx-auto flex w-full max-w-358 flex-col items-start px-4">
          <div className="flex w-full flex-col items-start">
            <h2 className="text-2xl font-semibold text-sky-950 sm:text-3xl lg:text-4xl">
              Audit Any Domain&apos;s Entire Link Profile
            </h2>
            <p className="mt-3 max-w-225 text-base font-medium text-black/60 lg:text-lg">
              Uncover every backlink pointing to a target domain or URL with
              full authority, quality, and status metrics for each link.
            </p>
          </div>

          <div className="mt-8 grid w-full grid-cols-1 items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {/* Feature 1 */}
            <div className="flex w-full flex-col items-start justify-between rounded-md border-2 border-b-3 border-slate-200 p-5 transition hover:bg-slate-100">
              <div>
                <div className="flex items-center gap-3 text-sky-950">
                  <div className="rounded-md bg-sky-950 p-2.5 text-white">
                    <Link2Icon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold lg:text-xl">
                    Full Backlink Index
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-black/75 lg:text-base">
                  Retrieve all inbound links to any domain or URL, with options
                  to include subdomains or limit to one link per referring
                  domain.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-sky-950">
                <CheckCircle2Icon size={16} /> Live &amp; Lost Backlink Coverage
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex w-full flex-col items-start justify-between rounded-md border-2 border-b-3 border-slate-200 p-5 transition hover:bg-slate-100">
              <div>
                <div className="flex items-center gap-3 text-sky-950">
                  <div className="rounded-md bg-sky-950 p-2.5 text-white">
                    <StarIcon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold lg:text-xl">
                    Domain &amp; Page Strength
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-black/75 lg:text-base">
                  Evaluate the authority of each referring source with Domain
                  Strength (DS) and Page Strength (PS) scores displayed per
                  backlink row.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-sky-950">
                <CheckCircle2Icon size={16} /> Source Authority at a Glance
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex w-full flex-col items-start justify-between rounded-md border-2 border-b-3 border-slate-200 p-5 transition hover:bg-slate-100">
              <div>
                <div className="flex items-center gap-3 text-sky-950">
                  <div className="rounded-md bg-sky-950 p-2.5 text-white">
                    <ShieldCheckIcon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold lg:text-xl">
                    Spam Score
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-black/75 lg:text-base">
                  Identify risky or toxic links with a colour-coded spam score
                  indicator, so you can quickly prioritise disavow candidates.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-sky-950">
                <CheckCircle2Icon size={16} /> Low / Medium / High Risk
                Classification
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex w-full flex-col items-start justify-between rounded-md border-2 border-b-3 border-slate-200 p-5 transition hover:bg-slate-100">
              <div>
                <div className="flex items-center gap-3 text-sky-950">
                  <div className="rounded-md bg-sky-950 p-2.5 text-white">
                    <BinocularsIcon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold lg:text-xl">
                    DoFollow / NoFollow
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-black/75 lg:text-base">
                  Instantly see whether each backlink passes link equity with
                  clear DoFollow and NoFollow badges on every row.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-sky-950">
                <CheckCircle2Icon size={16} /> Filter to DoFollow-Only Links
              </div>
            </div>

            {/* Feature 5 */}
            <div className="flex w-full flex-col items-start justify-between rounded-md border-2 border-b-3 border-slate-200 p-5 transition hover:bg-slate-100">
              <div>
                <div className="flex items-center gap-3 text-sky-950">
                  <div className="rounded-md bg-sky-950 p-2.5 text-white">
                    <FilterIcon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold lg:text-xl">
                    Advanced Filters
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-black/75 lg:text-base">
                  Narrow results by source or target URL substring, DS and PS
                  ranges, backlink type (anchor, image, redirect, meta,
                  canonical, alternate), and broken status.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-sky-950">
                <CheckCircle2Icon size={16} /> URL, Authority &amp; Type
                Filtering
              </div>
            </div>

            {/* Feature 6 */}
            <div className="flex w-full flex-col items-start justify-between rounded-md border-2 border-b-3 border-slate-200 p-5 transition hover:bg-slate-100">
              <div>
                <div className="flex items-center gap-3 text-sky-950">
                  <div className="rounded-md bg-sky-950 p-2.5 text-white">
                    <DownloadIcon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold lg:text-xl">
                    Full CSV Export
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-black/75 lg:text-base">
                  Export the complete or filtered backlink dataset to CSV with
                  one click for link audits, disavow file building, or reporting
                  decks.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-sky-950">
                <CheckCircle2Icon size={16} /> One-Click Export to CSV
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="w-full border-b-2 border-slate-200 bg-slate-50/50 py-10 lg:py-16">
        <div className="mx-auto flex w-full max-w-358 flex-col items-start px-4">
          <h2 className="text-2xl font-semibold text-sky-950 sm:text-3xl lg:text-4xl">
            Why Use SEOToolSuite&apos;s Backlink Checker?
          </h2>
          <p className="mt-3 max-w-225 text-base font-medium text-black/60 lg:text-lg">
            Complete backlink transparency with zero artificial restrictions.
          </p>

          <div className="mt-8 grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            <div className="flex flex-col gap-3 rounded-md border-2 border-b-3 border-slate-200 bg-white p-5">
              <div className="flex items-center gap-2.5 text-sky-950">
                <WalletIcon size={28} className="shrink-0" />
                <h3 className="text-lg font-semibold">Pay-Per-Use Model</h3>
              </div>
              <p className="text-sm leading-relaxed text-black/75">
                Pay only for the backlink lookups you run. No recurring monthly
                plans or hidden fees.
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-md border-2 border-b-3 border-slate-200 bg-white p-5">
              <div className="flex items-center gap-2.5 text-sky-950">
                <InfinityIcon size={28} className="shrink-0" />
                <h3 className="text-lg font-semibold">No Row Cutoffs</h3>
              </div>
              <p className="text-sm leading-relaxed text-black/75">
                Inspect all backlinks for a target domain without paywalled or
                blurred rows limiting your view.
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-md border-2 border-b-3 border-slate-200 bg-white p-5">
              <div className="flex items-center gap-2.5 text-sky-950">
                <DatabaseZapIcon size={28} className="shrink-0" />
                <h3 className="text-lg font-semibold">Caching Included</h3>
              </div>
              <p className="text-sm leading-relaxed text-black/75">
                Cache backlink results to save API credits when re-analysing the
                same target.
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-md border-2 border-b-3 border-slate-200 bg-white p-5">
              <div className="flex items-center gap-2.5 text-sky-950">
                <ScaleIcon size={28} className="shrink-0" />
                <h3 className="text-lg font-semibold">100% Open-Source</h3>
              </div>
              <p className="text-sm leading-relaxed text-black/75">
                Open MIT license. Audit, inspect, or integrate into your own SEO
                infrastructure.
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-md border-2 border-b-3 border-slate-200 bg-white p-5">
              <div className="flex items-center gap-2.5 text-sky-950">
                <LockIcon size={28} className="shrink-0" />
                <h3 className="text-lg font-semibold">Client-Side Security</h3>
              </div>
              <p className="text-sm leading-relaxed text-black/75">
                API credentials stay in your local browser storage and connect
                directly to DataForSEO.
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-md border-2 border-b-3 border-slate-200 bg-white p-5">
              <div className="flex items-center gap-2.5 text-sky-950">
                <GlobeIcon size={28} className="shrink-0" />
                <h3 className="text-lg font-semibold">Any Domain or URL</h3>
              </div>
              <p className="text-sm leading-relaxed text-black/75">
                Check backlinks for any root domain, subdomain, or specific URL
                — your own site or a competitor&apos;s.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full border-b-2 border-slate-200 bg-white py-10 lg:py-16">
        <div className="mx-auto flex w-full max-w-358 flex-col items-start px-4">
          <h2 className="text-2xl font-semibold text-sky-950 sm:text-3xl lg:text-4xl">
            How Backlink Checker Works
          </h2>
          <p className="mt-3 max-w-225 text-base font-medium text-black/60 lg:text-lg">
            3 steps to a complete inbound link audit.
          </p>

          <div className="mt-8 grid w-full grid-cols-1 gap-6 md:grid-cols-3">
            <div className="relative flex flex-col items-start rounded-md border-2 border-b-3 border-slate-200 bg-slate-50/50 p-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-sky-950 text-base font-bold text-white">
                1
              </span>
              <h3 className="mt-4 text-lg font-semibold text-sky-950">
                Enter Target Domain or URL
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-black/75">
                Type any domain, subdomain, or specific URL and choose whether
                to include subdomains in the lookup.
              </p>
            </div>

            <div className="relative flex flex-col items-start rounded-md border-2 border-b-3 border-slate-200 bg-slate-50/50 p-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-sky-950 text-base font-bold text-white">
                2
              </span>
              <h3 className="mt-4 text-lg font-semibold text-sky-950">
                Fetch Backlink Data
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-black/75">
                Queries DataForSEO&apos;s index to pull all inbound links with
                DS, PS, spam scores, follow type, and anchor text.
              </p>
            </div>

            <div className="relative flex flex-col items-start rounded-md border-2 border-b-3 border-slate-200 bg-slate-50/50 p-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-sky-950 text-base font-bold text-white">
                3
              </span>
              <h3 className="mt-4 text-lg font-semibold text-sky-950">
                Filter, Audit &amp; Export
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-black/75">
                Apply filters by authority, follow type, backlink type, or URL,
                then export the results to CSV for further analysis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full border-b-2 border-slate-200 bg-slate-50/50 py-10 lg:py-16">
        <div className="mx-auto flex w-full max-w-358 flex-col items-start px-4">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-semibold text-sky-950 sm:text-3xl lg:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="mt-8 grid w-full grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-md border-2 border-b-3 border-slate-200 bg-white p-5">
              <h3 className="text-base font-semibold text-sky-950 lg:text-lg">
                Do I need a DataForSEO API key to check backlinks?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-black/75">
                Yes, Backlink Checker fetches live link data via DataForSEO.
                Sign up for a free DataForSEO account to get $1 in initial
                credits.
              </p>
            </div>

            <div className="rounded-md border-2 border-b-3 border-slate-200 bg-white p-5">
              <h3 className="text-base font-semibold text-sky-950 lg:text-lg">
                What is the difference between live and lost backlinks?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-black/75">
                Live backlinks are currently active links pointing to the
                target. Lost backlinks were previously detected but are no
                longer present on the source page.
              </p>
            </div>

            <div className="rounded-md border-2 border-b-3 border-slate-200 bg-white p-5">
              <h3 className="text-base font-semibold text-sky-950 lg:text-lg">
                Can I check backlinks for a specific page rather than a whole
                domain?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-black/75">
                Yes, you can enter a full URL (e.g.
                https://example.com/blog-post) to retrieve only backlinks
                pointing to that specific page.
              </p>
            </div>

            <div className="rounded-md border-2 border-b-3 border-slate-200 bg-white p-5">
              <h3 className="text-base font-semibold text-sky-950 lg:text-lg">
                What does &quot;one link per domain&quot; mode do?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-black/75">
                When enabled, only the highest-authority backlink from each
                referring domain is shown, giving you a deduplicated view of
                unique linking root domains.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full border-b-2 border-slate-200 bg-sky-950 py-12 text-white lg:py-16">
        <div className="mx-auto flex w-full max-w-358 flex-col items-center px-4 text-center">
          <SparklesIcon size={40} className="text-sky-300" />
          <h2 className="mt-4 text-2xl font-semibold sm:text-3xl lg:text-4xl">
            Audit Your Backlink Profile Today
          </h2>
          <p className="mt-3 max-w-175 text-base text-balance text-slate-200 sm:text-lg">
            Reveal every inbound link to any domain or URL with
            SEOToolSuite&apos;s open-source tool.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/tool/backlink-research/backlinks"
              className="flex items-center gap-2 rounded-md border-2 border-white bg-white px-6 py-3 text-base font-semibold text-sky-950 transition hover:scale-105 active:scale-95"
            >
              Access Backlink Checker
            </Link>
            <Link
              href="/tools"
              className="flex items-center gap-2 rounded-md border-2 border-b-3 border-slate-300 bg-transparent px-6 py-3 text-base font-semibold text-white transition hover:scale-105 hover:bg-white/10 active:scale-95"
            >
              Explore All Tools
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <HomeFooter />
    </div>
  );
}
