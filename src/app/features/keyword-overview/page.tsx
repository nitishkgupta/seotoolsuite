import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HomeHeader from "@/components/HomeHeader";
import {
  BadgeDollarSignIcon,
  BadgeQuestionMarkIcon,
  ChartNoAxesCombinedIcon,
  CheckCircle2Icon,
  DatabaseZapIcon,
  GaugeIcon,
  InfinityIcon,
  LinkIcon,
  LockIcon,
  ScaleIcon,
  SparklesIcon,
  TargetIcon,
  TelescopeIcon,
  TrendingUpIcon,
  UsersIcon,
  WalletIcon,
} from "lucide-react";
import { HomeFooter } from "@/components/HomeFooter";

export const metadata: Metadata = {
  title: "Keyword Overview | SEOToolSuite",
  description:
    "The Keyword Overview tool gives a quick snapshot of a keyword’s performance, including search volume, intent, CPC, competition, trends, and audience insights - helping you evaluate keyword potential and plan your SEO strategy faster.",
  openGraph: {
    type: "website",
    title: "Keyword Overview | SEOToolSuite",
    description:
      "The Keyword Overview tool gives a quick snapshot of a keyword’s performance, including search volume, intent, CPC, competition, trends, and audience insights - helping you evaluate keyword potential and plan your SEO strategy faster.",
    images: [
      {
        url: "/assets/images/keyword-overview-screenshot.png",
      },
    ],
  },
};

export default function KeywordOverviewFeaturePage() {
  return (
    <div className="keyword-overview-feature-page relative flex w-full flex-col bg-white">
      {/* Header */}
      <HomeHeader />

      {/* Hero Section */}
      <section className="hero w-full border-b-2 border-slate-200 bg-[url('/assets/images/papyrus.png')] bg-repeat px-4 lg:px-0">
        <div className="mx-auto flex w-full max-w-350 flex-col items-center pt-8 lg:pt-14">
          <div className="flex items-center gap-2 rounded-full border-2 border-b-3 border-sky-950/20 bg-white/80 px-4 py-1.5 text-xs font-semibold tracking-wider text-sky-950 uppercase backdrop-blur-xs md:text-sm">
            <TelescopeIcon size={18} className="text-sky-950" />
            Keyword Research
          </div>
          <h1 className="mt-4 text-center text-3xl font-semibold text-sky-950 capitalize sm:text-4xl lg:text-6xl">
            Keyword Overview
          </h1>
          <p className="mt-4 max-w-225 text-center text-base font-medium text-black/60 sm:text-lg lg:text-xl">
            Gain an instant, high-level snapshot of any keyword&apos;s
            performance. Analyze{" "}
            <b className="font-semibold text-sky-950">search volume</b>,{" "}
            <b className="font-semibold text-sky-950">keyword difficulty</b>,{" "}
            <b className="font-semibold text-sky-950">search intent</b>,{" "}
            <b className="font-semibold text-sky-950">CPC bidding ranges</b>,{" "}
            <b className="font-semibold text-sky-950">historical trends</b>, and{" "}
            <b className="font-semibold text-sky-950">audience demographics</b>{" "}
            — powered by DataForSEO with no subscription lock-in.
          </p>
        </div>

        {/* Feature Badges */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 px-2 sm:px-4">
          <div className="flex items-center gap-2 overflow-hidden rounded-md border-2 border-b-3 border-slate-200 bg-white pr-3">
            <div className="flex h-10 w-10 items-center justify-center bg-sky-950/10">
              <TrendingUpIcon size={20} className="text-sky-950" />
            </div>
            <span className="text-xs font-medium text-sky-950 sm:text-sm md:text-base">
              Search Volume & Trends
            </span>
          </div>
          <div className="flex items-center gap-2 overflow-hidden rounded-md border-2 border-b-3 border-slate-200 bg-white pr-3">
            <div className="flex h-10 w-10 items-center justify-center bg-sky-950/10">
              <GaugeIcon size={20} className="text-sky-950" />
            </div>
            <span className="text-xs font-medium text-sky-950 sm:text-sm md:text-base">
              Keyword Difficulty
            </span>
          </div>
          <div className="flex items-center gap-2 overflow-hidden rounded-md border-2 border-b-3 border-slate-200 bg-white pr-3">
            <div className="flex h-10 w-10 items-center justify-center bg-sky-950/10">
              <BadgeQuestionMarkIcon size={20} className="text-sky-950" />
            </div>
            <span className="text-xs font-medium text-sky-950 sm:text-sm md:text-base">
              Intent Classification
            </span>
          </div>
          <div className="flex items-center gap-2 overflow-hidden rounded-md border-2 border-b-3 border-slate-200 bg-white pr-3">
            <div className="flex h-10 w-10 items-center justify-center bg-sky-950/10">
              <BadgeDollarSignIcon size={20} className="text-sky-950" />
            </div>
            <span className="text-xs font-medium text-sky-950 sm:text-sm md:text-base">
              CPC & Bidding Insights
            </span>
          </div>
          <div className="flex items-center gap-2 overflow-hidden rounded-md border-2 border-b-3 border-slate-200 bg-white pr-3">
            <div className="flex h-10 w-10 items-center justify-center bg-sky-950/10">
              <UsersIcon size={20} className="text-sky-950" />
            </div>
            <span className="text-xs font-medium text-sky-950 sm:text-sm md:text-base">
              Audience Demographics
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/tool/keyword-research/overview"
            className="flex items-center gap-2 rounded-md border-2 border-b-3 border-black/80 bg-sky-950 px-5 py-2.5 text-sm font-medium text-white transition hover:scale-105 active:scale-95 lg:text-base"
          >
            Access Keyword Overview
          </Link>
        </div>

        {/* Hero Screenshot Frame */}
        <div className="group r relative order-1 mx-auto mt-8 max-h-70 max-w-300 overflow-hidden rounded-t-md border-t-2 border-r-2 border-l-2 border-slate-200 bg-gray-100 p-2 lg:order-2 lg:max-h-129">
          <Image
            src="/assets/images/keyword-overview-screenshot.png"
            alt="Keyword Overview Tool"
            className="w-full rounded-md border-sky-950/10 transition duration-2500 ease-linear group-hover:translate-y-[calc(-100%+248px)] group-[:has(.tool-card-arrow:focus)]:translate-y-[calc(-100%+248px)] lg:group-hover:translate-y-[calc(-100%+484px)] lg:group-[:has(.tool-card-arrow:focus)]:translate-y-[calc(-100%+484px)]"
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
              Comprehensive Metrics in One Clean Interface
            </h2>
            <p className="mt-3 max-w-225 text-base font-medium text-black/60 lg:text-lg">
              Everything you need to evaluate keyword viability, estimate
              organic traffic, and refine your content positioning.
            </p>
          </div>

          <div className="mt-8 grid w-full grid-cols-1 items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {/* Feature 1 */}
            <div className="flex w-full flex-col items-start justify-between rounded-md border-2 border-b-3 border-slate-200 p-5 transition hover:bg-slate-100">
              <div>
                <div className="flex items-center gap-3 text-sky-950">
                  <div className="rounded-md bg-sky-950 p-2.5 text-white">
                    <TrendingUpIcon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold lg:text-xl">
                    Search Volume & Trends
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-black/75 lg:text-base">
                  Get exact monthly search volume along with historical trend
                  charts, growth, and annual search volume shifts to identify
                  rising keyword trends.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-sky-950">
                <CheckCircle2Icon size={16} /> Historical Charts
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex w-full flex-col items-start justify-between rounded-md border-2 border-b-3 border-slate-200 p-5 transition hover:bg-slate-100">
              <div>
                <div className="flex items-center gap-3 text-sky-950">
                  <div className="rounded-md bg-sky-950 p-2.5 text-white">
                    <GaugeIcon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold lg:text-xl">
                    Keyword Difficulty (KD)
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-black/75 lg:text-base">
                  A color-coded index from 0 to 100 indicating how challenging
                  it will be to rank on page 1 of Google. Quickly judge whether
                  a keyword fits your domain authority level.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-sky-950">
                <CheckCircle2Icon size={16} /> 0-100 Difficulty Rating
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex w-full flex-col items-start justify-between rounded-md border-2 border-b-3 border-slate-200 p-5 transition hover:bg-slate-100">
              <div>
                <div className="flex items-center gap-3 text-sky-950">
                  <div className="rounded-md bg-sky-950 p-2.5 text-white">
                    <TargetIcon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold lg:text-xl">
                    Search Intent Detection
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-black/75 lg:text-base">
                  Automatically categorize queries into Informational,
                  Navigational, Commercial, or Transactional intent so you can
                  align content format with user expectations.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-sky-950">
                <CheckCircle2Icon size={16} /> Automated Intent Badges
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex w-full flex-col items-start justify-between rounded-md border-2 border-b-3 border-slate-200 p-5 transition hover:bg-slate-100">
              <div>
                <div className="flex items-center gap-3 text-sky-950">
                  <div className="rounded-md bg-sky-950 p-2.5 text-white">
                    <BadgeDollarSignIcon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold lg:text-xl">
                    CPC & Bidding Insights
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-black/75 lg:text-base">
                  View average Cost-Per-Click (CPC), advertiser competition
                  levels (PPC), and low/high top-of-page bidding estimates to
                  gauge commercial value and ad potential.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-sky-950">
                <CheckCircle2Icon size={16} /> Low & High Top Bids
              </div>
            </div>

            {/* Feature 5 */}
            <div className="flex w-full flex-col items-start justify-between rounded-md border-2 border-b-3 border-slate-200 p-5 transition hover:bg-slate-100">
              <div>
                <div className="flex items-center gap-3 text-sky-950">
                  <div className="rounded-md bg-sky-950 p-2.5 text-white">
                    <LinkIcon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold lg:text-xl">
                    Backlink Requirements
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-black/75 lg:text-base">
                  Analyze average backlinks, referring domains, referring pages,
                  domain rank, and page rank required for top-ranking organic
                  pages in Google SERPs.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-sky-950">
                <CheckCircle2Icon size={16} /> SERP Backlink Benchmarks
              </div>
            </div>

            {/* Feature 6 */}
            <div className="flex w-full flex-col items-start justify-between rounded-md border-2 border-b-3 border-slate-200 p-5 transition hover:bg-slate-100">
              <div>
                <div className="flex items-center gap-3 text-sky-950">
                  <div className="rounded-md bg-sky-950 p-2.5 text-white">
                    <UsersIcon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold lg:text-xl">
                    Audience Demographics
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-black/75 lg:text-base">
                  Visualize audience breakdown across gender distribution and
                  age categories (18-24, 25-34, 35-44, 45-54, 55-64, 65+) with
                  intuitive bar charts.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-sky-950">
                <CheckCircle2Icon size={16} /> Gender & Age Charts
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Open Source Section */}
      <section className="w-full border-b-2 border-slate-200 bg-slate-50/50 py-10 lg:py-16">
        <div className="mx-auto flex w-full max-w-358 flex-col items-start px-4">
          <h2 className="text-2xl font-semibold text-sky-950 sm:text-3xl lg:text-4xl">
            Why Use SEOToolSuite&apos;s Keyword Overview?
          </h2>
          <p className="mt-3 max-w-225 text-base font-medium text-black/60 lg:text-lg">
            An open-source alternative built for transparency, cost-control, and
            unrestricted SEO research.
          </p>

          <div className="mt-8 grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            <div className="flex flex-col gap-3 rounded-md border-2 border-b-3 border-slate-200 bg-white p-5">
              <div className="flex items-center gap-2.5 text-sky-950">
                <WalletIcon size={28} className="shrink-0" />
                <h3 className="text-lg font-semibold">Pay-Per-Use Model</h3>
              </div>
              <p className="text-sm leading-relaxed text-black/75">
                Pay only for the API credits you consume through DataForSEO. No
                mandatory monthly subscriptions or tier lock-ins. Credits never
                expire.
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-md border-2 border-b-3 border-slate-200 bg-white p-5">
              <div className="flex items-center gap-2.5 text-sky-950">
                <InfinityIcon size={28} className="shrink-0" />
                <h3 className="text-lg font-semibold">Unrestricted Data</h3>
              </div>
              <p className="text-sm leading-relaxed text-black/75">
                Enjoy full access to keyword volume, competition, intent, and
                demographic metrics with no artificial row limits or blurred
                premium data.
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-md border-2 border-b-3 border-slate-200 bg-white p-5">
              <div className="flex items-center gap-2.5 text-sky-950">
                <DatabaseZapIcon size={28} className="shrink-0" />
                <h3 className="text-lg font-semibold">Smart API Caching</h3>
              </div>
              <p className="text-sm leading-relaxed text-black/75">
                Caching minimizes repeated API calls, reducing data costs and
                delivering instant response times for cached keywords.
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-md border-2 border-b-3 border-slate-200 bg-white p-5">
              <div className="flex items-center gap-2.5 text-sky-950">
                <ScaleIcon size={28} className="shrink-0" />
                <h3 className="text-lg font-semibold">100% Open Source</h3>
              </div>
              <p className="text-sm leading-relaxed text-black/75">
                Fully transparent TypeScript/Next.js codebase under the MIT
                license. Inspect, audit, customize, or self-host without
                restrictions.
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-md border-2 border-b-3 border-slate-200 bg-white p-5">
              <div className="flex items-center gap-2.5 text-sky-950">
                <LockIcon size={28} className="shrink-0" />
                <h3 className="text-lg font-semibold">Client-Side Privacy</h3>
              </div>
              <p className="text-sm leading-relaxed text-black/75">
                API credentials are saved locally in your browser. Requests
                communicate directly with DataForSEO without storing keyword
                queries on third-party servers.
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-md border-2 border-b-3 border-slate-200 bg-white p-5">
              <div className="flex items-center gap-2.5 text-sky-950">
                <ChartNoAxesCombinedIcon size={28} className="shrink-0" />
                <h3 className="text-lg font-semibold">
                  Multiple Countries Supported
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-black/75">
                Filter keywords across different locations and languages powered
                by DataForSEO&apos;s index of over 7 billion keywords worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full border-b-2 border-slate-200 bg-white py-10 lg:py-16">
        <div className="mx-auto flex w-full max-w-358 flex-col items-start px-4">
          <h2 className="text-2xl font-semibold text-sky-950 sm:text-3xl lg:text-4xl">
            How Keyword Overview Works
          </h2>
          <p className="mt-3 max-w-225 text-base font-medium text-black/60 lg:text-lg">
            3 simple steps to unlock deep keyword insights.
          </p>

          <div className="mt-8 grid w-full grid-cols-1 gap-6 md:grid-cols-3">
            <div className="relative flex flex-col items-start rounded-md border-2 border-b-3 border-slate-200 bg-slate-50/50 p-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-sky-950 text-base font-bold text-white">
                1
              </span>
              <h3 className="mt-4 text-lg font-semibold text-sky-950">
                Enter Seed Keyword
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-black/75">
                Type in any search term and choose your target location and
                language preferences.
              </p>
            </div>

            <div className="relative flex flex-col items-start rounded-md border-2 border-b-3 border-slate-200 bg-slate-50/50 p-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-sky-950 text-base font-bold text-white">
                2
              </span>
              <h3 className="mt-4 text-lg font-semibold text-sky-950">
                Fetch Live SEO Data
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-black/75">
                Queries DataForSEO&apos;s database of 7B+ keywords in real time
                or pulls instantly from local cache.
              </p>
            </div>

            <div className="relative flex flex-col items-start rounded-md border-2 border-b-3 border-slate-200 bg-slate-50/50 p-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-sky-950 text-base font-bold text-white">
                3
              </span>
              <h3 className="mt-4 text-lg font-semibold text-sky-950">
                Analyze & Take Action
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-black/75">
                Evaluate difficulty, search intent, bidding trends, and
                demographics to guide your content strategy.
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
                Do I need a DataForSEO API key to use Keyword Overview?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-black/75">
                Yes, Keyword Overview retrieves live search metrics via
                DataForSEO. You can sign up for a free DataForSEO account which
                includes $1 in initial trial credits.
              </p>
            </div>

            <div className="rounded-md border-2 border-b-3 border-slate-200 bg-white p-5">
              <h3 className="text-base font-semibold text-sky-950 lg:text-lg">
                How much does a Keyword Overview search cost?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-black/75">
                Each query costs fractions of a cent directly billed to your
                DataForSEO API balance. SEOToolSuite charges zero additional
                platform fees.
              </p>
            </div>

            <div className="rounded-md border-2 border-b-3 border-slate-200 bg-white p-5">
              <h3 className="text-base font-semibold text-sky-950 lg:text-lg">
                How does caching work to save costs?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-black/75">
                When caching is enabled, retrieved keyword metrics are stored in
                the Redis so re-searching the same keyword in the same location
                won&apos;t consume extra API credits.
              </p>
            </div>

            <div className="rounded-md border-2 border-b-3 border-slate-200 bg-white p-5">
              <h3 className="text-base font-semibold text-sky-950 lg:text-lg">
                Can I analyze keywords for specific countries?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-black/75">
                Absoutely! Keyword Overview supports target selection across
                multiple countries and multiple languages to give localized
                search volume and CPC estimates.
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
            Ready to Analyze Your Keywords?
          </h2>
          <p className="mt-3 max-w-175 text-base text-balance text-slate-200 sm:text-lg">
            Start getting comprehensive keyword insights today with
            SEOToolSuite&apos;s open-source Keyword Overview tool.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/tool/keyword-research/overview"
              className="flex items-center gap-2 rounded-md border-2 border-white bg-white px-6 py-3 text-base font-semibold text-sky-950 transition hover:scale-105 active:scale-95"
            >
              Access Keyword Overview
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
