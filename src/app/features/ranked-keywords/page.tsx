import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HomeHeader from "@/components/HomeHeader";
import {
  BadgeDollarSignIcon,
  BinocularsIcon,
  CheckCircle2Icon,
  CircleQuestionMarkIcon,
  DatabaseZapIcon,
  DownloadIcon,
  FilterIcon,
  GaugeIcon,
  GlobeIcon,
  InfinityIcon,
  LockIcon,
  PercentIcon,
  ScaleIcon,
  SparklesIcon,
  TextSearchIcon,
  WalletIcon,
} from "lucide-react";
import { HomeFooter } from "@/components/HomeFooter";

export const metadata: Metadata = {
  title: "Ranked Keywords | SEOToolSuite",
  description:
    "The Ranked Keywords tool shows the keywords a domain or page ranks for in search results. It provides insights such as rankings, search volume, estimated traffic, CPC, competition, and keyword difficulty - helping you analyze competitor SEO performance and discover ranking opportunities.",
  openGraph: {
    type: "website",
    title: "Ranked Keywords | SEOToolSuite",
    description:
      "The Ranked Keywords tool shows the keywords a domain or page ranks for in search results. It provides insights such as rankings, search volume, estimated traffic, CPC, competition, and keyword difficulty - helping you analyze competitor SEO performance and discover ranking opportunities.",
    images: [
      {
        url: "/assets/images/ranked-keywords-screenshot.png",
      },
    ],
  },
};

export default function RankedKeywordsFeaturePage() {
  return (
    <div className="ranked-keywords-feature-page relative flex w-full flex-col bg-white">
      {/* Header */}
      <HomeHeader />

      {/* Hero Section */}
      <section className="hero w-full border-b-2 border-slate-200 bg-[url('/assets/images/papyrus.png')] bg-repeat px-4 lg:px-0">
        <div className="mx-auto flex w-full max-w-350 flex-col items-center pt-8 lg:pt-14">
          <div className="flex items-center gap-2 rounded-full border-2 border-b-3 border-sky-950/20 bg-white/80 px-4 py-1.5 text-xs font-semibold tracking-wider text-sky-950 uppercase backdrop-blur-xs md:text-sm">
            <BinocularsIcon size={18} className="text-sky-950" />
            COMPETITIVE RESEARCH
          </div>
          <h1 className="mt-4 text-center text-3xl font-semibold text-sky-950 capitalize sm:text-4xl lg:text-6xl">
            Ranked Keywords
          </h1>
          <p className="mt-4 max-w-225 text-center text-base font-medium text-black/60 sm:text-lg lg:text-xl">
            Reverse-engineer competitor SEO strategies. Uncover every exact
            keyword any domain or URL ranks for, complete with{" "}
            <b className="font-semibold text-sky-950">SERP ranking positions</b>
            , <b className="font-semibold text-sky-950">search volume</b>,{" "}
            <b className="font-semibold text-sky-950">
              traffic share percentage
            </b>
            , <b className="font-semibold text-sky-950">CPC rates</b>, and{" "}
            <b className="font-semibold text-sky-950">search intent badges</b> —
            powered by DataForSEO with no subscription lock-in.
          </p>
        </div>

        {/* Feature Badges */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 px-2 sm:px-4">
          <div className="flex items-center gap-2 overflow-hidden rounded-md border-2 border-b-3 border-slate-200 bg-white pr-3">
            <div className="flex h-10 w-10 items-center justify-center bg-sky-950/10">
              <TextSearchIcon size={20} className="text-sky-950" />
            </div>
            <span className="text-xs font-medium text-sky-950 sm:text-sm md:text-base">
              Exact Competitor Rankings
            </span>
          </div>
          <div className="flex items-center gap-2 overflow-hidden rounded-md border-2 border-b-3 border-slate-200 bg-white pr-3">
            <div className="flex h-10 w-10 items-center justify-center bg-sky-950/10">
              <PercentIcon size={20} className="text-sky-950" />
            </div>
            <span className="text-xs font-medium text-sky-950 sm:text-sm md:text-base">
              Traffic Share % Breakdown
            </span>
          </div>
          <div className="flex items-center gap-2 overflow-hidden rounded-md border-2 border-b-3 border-slate-200 bg-white pr-3">
            <div className="flex h-10 w-10 items-center justify-center bg-sky-950/10">
              <FilterIcon size={20} className="text-sky-950" />
            </div>
            <span className="text-xs font-medium text-sky-950 sm:text-sm md:text-base">
              Multi-Filter DataGrid
            </span>
          </div>
          <div className="flex items-center gap-2 overflow-hidden rounded-md border-2 border-b-3 border-slate-200 bg-white pr-3">
            <div className="flex h-10 w-10 items-center justify-center bg-sky-950/10">
              <CircleQuestionMarkIcon size={20} className="text-sky-950" />
            </div>
            <span className="text-xs font-medium text-sky-950 sm:text-sm md:text-base">
              Search Intent Analysis
            </span>
          </div>
          <div className="flex items-center gap-2 overflow-hidden rounded-md border-2 border-b-3 border-slate-200 bg-white pr-3">
            <div className="flex h-10 w-10 items-center justify-center bg-sky-950/10">
              <GaugeIcon size={20} className="text-sky-950" />
            </div>
            <span className="text-xs font-medium text-sky-950 sm:text-sm md:text-base">
              Keyword Difficulty Scores
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/tool/competitive-research/keywords"
            className="flex items-center gap-2 rounded-md border-2 border-b-3 border-black/80 bg-sky-950 px-5 py-2.5 text-sm font-medium text-white transition hover:scale-105 active:scale-95 lg:text-base"
          >
            Access Ranked Keywords
          </Link>
        </div>

        {/* Hero Screenshot Frame with Scroll Animation */}
        <div className="group relative order-1 mx-auto mt-8 max-h-70 max-w-300 overflow-hidden rounded-t-md border-t-2 border-r-2 border-l-2 border-slate-200 bg-gray-100 p-2 lg:order-2 lg:max-h-129">
          <Image
            src="/assets/images/ranked-keywords-screenshot.png"
            alt="Ranked Keywords"
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
              Inspect Every Ranking URL & Keyword
            </h2>
            <p className="mt-3 max-w-225 text-base font-medium text-black/60 lg:text-lg">
              Steal competitor keyword strategies and discover content
              opportunities driving organic traffic to rival sites.
            </p>
          </div>

          <div className="mt-8 grid w-full grid-cols-1 items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {/* Feature 1 */}
            <div className="flex w-full flex-col items-start justify-between rounded-md border-2 border-b-3 border-slate-200 p-5 transition hover:bg-slate-100">
              <div>
                <div className="flex items-center gap-3 text-sky-950">
                  <div className="rounded-md bg-sky-950 p-2.5 text-white">
                    <TextSearchIcon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold lg:text-xl">
                    Exact SERP Positions
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-black/75 lg:text-base">
                  View precise organic Google ranking positions for thousands of
                  keywords indexed for any competitor domain or specific landing
                  page URL.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-sky-950">
                <CheckCircle2Icon size={16} /> Live SERP Positions 1-100
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex w-full flex-col items-start justify-between rounded-md border-2 border-b-3 border-slate-200 p-5 transition hover:bg-slate-100">
              <div>
                <div className="flex items-center gap-3 text-sky-950">
                  <div className="rounded-md bg-sky-950 p-2.5 text-white">
                    <PercentIcon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold lg:text-xl">
                    Traffic Share Percentage
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-black/75 lg:text-base">
                  Identify which individual keywords generate the highest
                  proportion of estimated traffic to the competitor&apos;s site.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-sky-950">
                <CheckCircle2Icon size={16} /> Keyword Traffic Contribution %
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex w-full flex-col items-start justify-between rounded-md border-2 border-b-3 border-slate-200 p-5 transition hover:bg-slate-100">
              <div>
                <div className="flex items-center gap-3 text-sky-950">
                  <div className="rounded-md bg-sky-950 p-2.5 text-white">
                    <FilterIcon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold lg:text-xl">
                    Multi-Filter DataGrid
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-black/75 lg:text-base">
                  Filter by position range (e.g. positions 4-10 for quick
                  striking-distance wins), minimum volume, CPC, or specific
                  keywords.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-sky-950">
                <CheckCircle2Icon size={16} /> Position Range Filtering
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex w-full flex-col items-start justify-between rounded-md border-2 border-b-3 border-slate-200 p-5 transition hover:bg-slate-100">
              <div>
                <div className="flex items-center gap-3 text-sky-950">
                  <div className="rounded-md bg-sky-950 p-2.5 text-white">
                    <CircleQuestionMarkIcon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold lg:text-xl">
                    Search Intent Categorization
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-black/75 lg:text-base">
                  Spot transactional and commercial competitor keywords to focus
                  on intent-aligned content that drives sales.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-sky-950">
                <CheckCircle2Icon size={16} /> Intent Classification Badges
              </div>
            </div>

            {/* Feature 5 */}
            <div className="flex w-full flex-col items-start justify-between rounded-md border-2 border-b-3 border-slate-200 p-5 transition hover:bg-slate-100">
              <div>
                <div className="flex items-center gap-3 text-sky-950">
                  <div className="rounded-md bg-sky-950 p-2.5 text-white">
                    <BadgeDollarSignIcon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold lg:text-xl">
                    CPC & Advertiser Value
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-black/75 lg:text-base">
                  Evaluate commercial keyword value with exact Cost-Per-Click
                  numbers and advertiser competition levels.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-sky-950">
                <CheckCircle2Icon size={16} /> Commercial CPC Benchmarks
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
                  Export complete competitor keyword lists directly to CSV
                  format with a single click for offline content gap analysis.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-sky-950">
                <CheckCircle2Icon size={16} /> One-Click Export to CSV
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Open Source Section */}
      <section className="w-full border-b-2 border-slate-200 bg-slate-50/50 py-10 lg:py-16">
        <div className="mx-auto flex w-full max-w-358 flex-col items-start px-4">
          <h2 className="text-2xl font-semibold text-sky-950 sm:text-3xl lg:text-4xl">
            Why Use SEOToolSuite&apos;s Ranked Keywords?
          </h2>
          <p className="mt-3 max-w-225 text-base font-medium text-black/60 lg:text-lg">
            Complete competitor keyword transparency with zero artificial
            restrictions.
          </p>

          <div className="mt-8 grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            <div className="flex flex-col gap-3 rounded-md border-2 border-b-3 border-slate-200 bg-white p-5">
              <div className="flex items-center gap-2.5 text-sky-950">
                <WalletIcon size={28} className="shrink-0" />
                <h3 className="text-lg font-semibold">Pay-Per-Use Model</h3>
              </div>
              <p className="text-sm leading-relaxed text-black/75">
                Pay only for the competitor keyword requests you make. No
                recurring monthly plans.
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-md border-2 border-b-3 border-slate-200 bg-white p-5">
              <div className="flex items-center gap-2.5 text-sky-950">
                <InfinityIcon size={28} className="shrink-0" />
                <h3 className="text-lg font-semibold">No Row Cutoffs</h3>
              </div>
              <p className="text-sm leading-relaxed text-black/75">
                View all ranked keywords for a target domain without paywalled
                blurred rows.
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-md border-2 border-b-3 border-slate-200 bg-white p-5">
              <div className="flex items-center gap-2.5 text-sky-950">
                <DatabaseZapIcon size={28} className="shrink-0" />
                <h3 className="text-lg font-semibold">Caching Included</h3>
              </div>
              <p className="text-sm leading-relaxed text-black/75">
                Cache competitor keyword results to save API balance on repeated
                analyses.
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-md border-2 border-b-3 border-slate-200 bg-white p-5">
              <div className="flex items-center gap-2.5 text-sky-950">
                <ScaleIcon size={28} className="shrink-0" />
                <h3 className="text-lg font-semibold">100% Open Source</h3>
              </div>
              <p className="text-sm leading-relaxed text-black/75">
                Open MIT license. Audit, inspect, or integrate into your own SEO
                stack.
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
                <h3 className="text-lg font-semibold">Global Locations</h3>
              </div>
              <p className="text-sm leading-relaxed text-black/75">
                Check rankings across multiple countries and localized Google
                search indexes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full border-b-2 border-slate-200 bg-white py-10 lg:py-16">
        <div className="mx-auto flex w-full max-w-358 flex-col items-start px-4">
          <h2 className="text-2xl font-semibold text-sky-950 sm:text-3xl lg:text-4xl">
            How Ranked Keywords Works
          </h2>
          <p className="mt-3 max-w-225 text-base font-medium text-black/60 lg:text-lg">
            3 steps to reverse-engineer competitor rankings.
          </p>

          <div className="mt-8 grid w-full grid-cols-1 gap-6 md:grid-cols-3">
            <div className="relative flex flex-col items-start rounded-md border-2 border-b-3 border-slate-200 bg-slate-50/50 p-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-sky-950 text-base font-bold text-white">
                1
              </span>
              <h3 className="mt-4 text-lg font-semibold text-sky-950">
                Enter Target Domain/URL
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-black/75">
                Type any competitor website domain or specific URL into the
                input field.
              </p>
            </div>

            <div className="relative flex flex-col items-start rounded-md border-2 border-b-3 border-slate-200 bg-slate-50/50 p-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-sky-950 text-base font-bold text-white">
                2
              </span>
              <h3 className="mt-4 text-lg font-semibold text-sky-950">
                Fetch Indexed Keywords
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-black/75">
                Queries DataForSEO&apos;s index to pull all active Google
                organic search rankings.
              </p>
            </div>

            <div className="relative flex flex-col items-start rounded-md border-2 border-b-3 border-slate-200 bg-slate-50/50 p-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-sky-950 text-base font-bold text-white">
                3
              </span>
              <h3 className="mt-4 text-lg font-semibold text-sky-950">
                Filter Striking Distance
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-black/75">
                Filter for positions 4-10 or low-difficulty keywords to identify
                immediate content opportunities.
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
                Do I need a DataForSEO API key to check ranked keywords?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-black/75">
                Yes, Ranked Keywords fetches live rankings via DataForSEO. Sign
                up for a free DataForSEO account to get $1 in initial credits.
              </p>
            </div>

            <div className="rounded-md border-2 border-b-3 border-slate-200 bg-white p-5">
              <h3 className="text-base font-semibold text-sky-950 lg:text-lg">
                Can I analyze specific landing pages instead of an entire
                domain?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-black/75">
                Yes, you can enter exact URL paths to analyze keywords for a
                single blog post or product page.
              </p>
            </div>

            <div className="rounded-md border-2 border-b-3 border-slate-200 bg-white p-5">
              <h3 className="text-base font-semibold text-sky-950 lg:text-lg">
                What does traffic share percentage mean?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-black/75">
                Traffic share indicates the proportion of a domain&apos;s total
                estimated search traffic brought in by that single keyword.
              </p>
            </div>

            <div className="rounded-md border-2 border-b-3 border-slate-200 bg-white p-5">
              <h3 className="text-base font-semibold text-sky-950 lg:text-lg">
                Is data exportable to CSV/Excel?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-black/75">
                Yes, you can export your full or filtered competitor keyword
                table directly to a CSV file with one click.
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
            Uncover Competitor Keywords Today
          </h2>
          <p className="mt-3 max-w-175 text-base text-balance text-slate-200 sm:text-lg">
            See every keyword your competitors rank for with SEOToolSuite&apos;s
            open-source tool.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/tool/competitive-research/keywords"
              className="flex items-center gap-2 rounded-md border-2 border-white bg-white px-6 py-3 text-base font-semibold text-sky-950 transition hover:scale-105 active:scale-95"
            >
              Access Ranked Keywords
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
