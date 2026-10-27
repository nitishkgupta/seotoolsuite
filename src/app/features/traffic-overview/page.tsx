import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HomeHeader from "@/components/HomeHeader";
import {
  BarChart3Icon,
  BinocularsIcon,
  CheckCircle2Icon,
  CoinsIcon,
  DatabaseZapIcon,
  GlobeIcon,
  InfinityIcon,
  LineChartIcon,
  LockIcon,
  ScaleIcon,
  SparklesIcon,
  TrendingUpIcon,
  UsersIcon,
  WalletIcon,
} from "lucide-react";
import { HomeFooter } from "@/components/HomeFooter";

export const metadata: Metadata = {
  title: "Traffic Overview | SEOToolSuite",
  description:
    "The Traffic Overview tool analyzes a website’s organic and paid search performance. It provides insights such as estimated traffic, ranked keywords, traffic cost, ranking changes, and historical trends - helping you understand competitor performance and identify SEO opportunities.",
  openGraph: {
    type: "website",
    title: "Traffic Overview | SEOToolSuite",
    description:
      "The Traffic Overview tool analyzes a website’s organic and paid search performance. It provides insights such as estimated traffic, ranked keywords, traffic cost, ranking changes, and historical trends - helping you understand competitor performance and identify SEO opportunities.",
    images: [
      {
        url: "/assets/images/traffic-overview-screenshot.png",
      },
    ],
  },
};

export default function TrafficOverviewFeaturePage() {
  return (
    <div className="traffic-overview-feature-page relative flex w-full flex-col bg-white">
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
            Traffic Overview
          </h1>
          <p className="mt-4 max-w-225 text-center text-base font-medium text-black/60 sm:text-lg lg:text-xl">
            Analyze any website&apos;s organic and paid search performance. Get
            deep insights into{" "}
            <b className="font-semibold text-sky-950">
              estimated monthly traffic
            </b>
            ,{" "}
            <b className="font-semibold text-sky-950">total ranked keywords</b>,{" "}
            <b className="font-semibold text-sky-950">traffic valuation cost</b>
            , and{" "}
            <b className="font-semibold text-sky-950">
              multi-year growth trends
            </b>{" "}
            — powered by DataForSEO with no recurring subscriptions.
          </p>
        </div>

        {/* Feature Badges */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 px-2 sm:px-4">
          <div className="flex items-center gap-2 overflow-hidden rounded-md border-2 border-b-3 border-slate-200 bg-white pr-3">
            <div className="flex h-10 w-10 items-center justify-center bg-sky-950/10">
              <UsersIcon size={20} className="text-sky-950" />
            </div>
            <span className="text-xs font-medium text-sky-950 sm:text-sm md:text-base">
              Organic & Paid Visitor Estimates
            </span>
          </div>
          <div className="flex items-center gap-2 overflow-hidden rounded-md border-2 border-b-3 border-slate-200 bg-white pr-3">
            <div className="flex h-10 w-10 items-center justify-center bg-sky-950/10">
              <CoinsIcon size={20} className="text-sky-950" />
            </div>
            <span className="text-xs font-medium text-sky-950 sm:text-sm md:text-base">
              Traffic Cost Valuation
            </span>
          </div>
          <div className="flex items-center gap-2 overflow-hidden rounded-md border-2 border-b-3 border-slate-200 bg-white pr-3">
            <div className="flex h-10 w-10 items-center justify-center bg-sky-950/10">
              <BarChart3Icon size={20} className="text-sky-950" />
            </div>
            <span className="text-xs font-medium text-sky-950 sm:text-sm md:text-base">
              Ranked Keywords Count
            </span>
          </div>
          <div className="flex items-center gap-2 overflow-hidden rounded-md border-2 border-b-3 border-slate-200 bg-white pr-3">
            <div className="flex h-10 w-10 items-center justify-center bg-sky-950/10">
              <LineChartIcon size={20} className="text-sky-950" />
            </div>
            <span className="text-xs font-medium text-sky-950 sm:text-sm md:text-base">
              Historical Traffic Velocity
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/tool/competitive-research/overview"
            className="flex items-center gap-2 rounded-md border-2 border-b-3 border-black/80 bg-sky-950 px-5 py-2.5 text-sm font-medium text-white transition hover:scale-105 active:scale-95 lg:text-base"
          >
            Access Traffic Overview
          </Link>
        </div>

        {/* Hero Screenshot Frame with Scroll Animation */}
        <div className="group relative order-1 mx-auto mt-8 max-h-70 max-w-300 overflow-hidden rounded-t-md border-t-2 border-r-2 border-l-2 border-slate-200 bg-gray-100 p-2 lg:order-2 lg:max-h-129">
          <Image
            src="/assets/images/traffic-overview-screenshot.png"
            alt="Traffic Overview"
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
              Reverse-Engineer Competitor Traffic
            </h2>
            <p className="mt-3 max-w-225 text-base font-medium text-black/60 lg:text-lg">
              Benchmark organic performance, track traffic growth, and evaluate
              competitor search visibility.
            </p>
          </div>

          <div className="mt-8 grid w-full grid-cols-1 items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {/* Feature 1 */}
            <div className="flex w-full flex-col items-start justify-between rounded-md border-2 border-b-3 border-slate-200 p-5 transition hover:bg-slate-100">
              <div>
                <div className="flex items-center gap-3 text-sky-950">
                  <div className="rounded-md bg-sky-950 p-2.5 text-white">
                    <UsersIcon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold lg:text-xl">
                    Organic & Paid Traffic Breakdown
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-black/75 lg:text-base">
                  View estimated monthly organic search visitors alongside paid
                  Google Ads traffic metrics to evaluate a domain&apos;s overall
                  search acquisition engine.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-sky-950">
                <CheckCircle2Icon size={16} /> Organic vs Paid Traffic Split
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex w-full flex-col items-start justify-between rounded-md border-2 border-b-3 border-slate-200 p-5 transition hover:bg-slate-100">
              <div>
                <div className="flex items-center gap-3 text-sky-950">
                  <div className="rounded-md bg-sky-950 p-2.5 text-white">
                    <CoinsIcon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold lg:text-xl">
                    Traffic Cost Valuation
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-black/75 lg:text-base">
                  Calculate the estimated monetary value of a domain&apos;s
                  organic traffic based on what it would cost to acquire
                  equivalent clicks via Google PPC.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-sky-950">
                <CheckCircle2Icon size={16} /> Equivalent PPC Value ($)
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex w-full flex-col items-start justify-between rounded-md border-2 border-b-3 border-slate-200 p-5 transition hover:bg-slate-100">
              <div>
                <div className="flex items-center gap-3 text-sky-950">
                  <div className="rounded-md bg-sky-950 p-2.5 text-white">
                    <BarChart3Icon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold lg:text-xl">
                    Ranked Keywords Breakdown
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-black/75 lg:text-base">
                  Track the total count of organic keywords a domain ranks for
                  in Google, categorized into top 1-3, 4-10, 11-20, and 21-50
                  position brackets.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-sky-950">
                <CheckCircle2Icon size={16} /> Ranking Position Tiers
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex w-full flex-col items-start justify-between rounded-md border-2 border-b-3 border-slate-200 p-5 transition hover:bg-slate-100">
              <div>
                <div className="flex items-center gap-3 text-sky-950">
                  <div className="rounded-md bg-sky-950 p-2.5 text-white">
                    <LineChartIcon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold lg:text-xl">
                    Historical Traffic Trends
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-black/75 lg:text-base">
                  Inspect multi-month traffic history to spot core growth
                  trends, seasonal spikes, or traffic drops caused by Google
                  core algorithm updates.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-sky-950">
                <CheckCircle2Icon size={16} /> Multi-Month Trend Charts
              </div>
            </div>

            {/* Feature 5 */}
            <div className="flex w-full flex-col items-start justify-between rounded-md border-2 border-b-3 border-slate-200 p-5 transition hover:bg-slate-100">
              <div>
                <div className="flex items-center gap-3 text-sky-950">
                  <div className="rounded-md bg-sky-950 p-2.5 text-white">
                    <GlobeIcon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold lg:text-xl">
                    Geographic Distribution
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-black/75 lg:text-base">
                  Analyze competitor traffic broken down by target country to
                  see which international markets drive the majority of their
                  visitors.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-sky-950">
                <CheckCircle2Icon size={16} /> Country Traffic Split
              </div>
            </div>

            {/* Feature 6 */}
            <div className="flex w-full flex-col items-start justify-between rounded-md border-2 border-b-3 border-slate-200 p-5 transition hover:bg-slate-100">
              <div>
                <div className="flex items-center gap-3 text-sky-950">
                  <div className="rounded-md bg-sky-950 p-2.5 text-white">
                    <TrendingUpIcon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold lg:text-xl">
                    Ranking Shift Dynamics
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-black/75 lg:text-base">
                  Monitor recent ranking improvements, new keyword entries, and
                  lost keywords to capitalize on competitor ranking
                  vulnerabilities.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-sky-950">
                <CheckCircle2Icon size={16} /> New & Lost Keyword Tracking
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Open Source Section */}
      <section className="w-full border-b-2 border-slate-200 bg-slate-50/50 py-10 lg:py-16">
        <div className="mx-auto flex w-full max-w-358 flex-col items-start px-4">
          <h2 className="text-2xl font-semibold text-sky-950 sm:text-3xl lg:text-4xl">
            Why Use SEOToolSuite&apos;s Traffic Overview?
          </h2>
          <p className="mt-3 max-w-225 text-base font-medium text-black/60 lg:text-lg">
            Unrestricted competitive intelligence at a fraction of standard SaaS
            costs.
          </p>

          <div className="mt-8 grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            <div className="flex flex-col gap-3 rounded-md border-2 border-b-3 border-slate-200 bg-white p-5">
              <div className="flex items-center gap-2.5 text-sky-950">
                <WalletIcon size={28} className="shrink-0" />
                <h3 className="text-lg font-semibold">Pay-Per-Use Pricing</h3>
              </div>
              <p className="text-sm leading-relaxed text-black/75">
                Pay only for the competitive overview queries you execute. No
                mandatory $100+/mo subscription plans.
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-md border-2 border-b-3 border-slate-200 bg-white p-5">
              <div className="flex items-center gap-2.5 text-sky-950">
                <InfinityIcon size={28} className="shrink-0" />
                <h3 className="text-lg font-semibold">Full Domain Data</h3>
              </div>
              <p className="text-sm leading-relaxed text-black/75">
                Get full traffic estimates, keyword counts, and traffic
                valuation metrics without artificial data cutoffs.
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-md border-2 border-b-3 border-slate-200 bg-white p-5">
              <div className="flex items-center gap-2.5 text-sky-950">
                <DatabaseZapIcon size={28} className="shrink-0" />
                <h3 className="text-lg font-semibold">API Caching Support</h3>
              </div>
              <p className="text-sm leading-relaxed text-black/75">
                Store domain analysis results in cache to eliminate duplicate
                API costs during repeated audits.
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-md border-2 border-b-3 border-slate-200 bg-white p-5">
              <div className="flex items-center gap-2.5 text-sky-950">
                <ScaleIcon size={28} className="shrink-0" />
                <h3 className="text-lg font-semibold">100% Open Source</h3>
              </div>
              <p className="text-sm leading-relaxed text-black/75">
                MIT-licensed codebase. Fully transparent React/Next.js code
                ready to customize or extend.
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-md border-2 border-b-3 border-slate-200 bg-white p-5">
              <div className="flex items-center gap-2.5 text-sky-950">
                <LockIcon size={28} className="shrink-0" />
                <h3 className="text-lg font-semibold">Private & Direct</h3>
              </div>
              <p className="text-sm leading-relaxed text-black/75">
                All requests call DataForSEO directly from your browser. Your
                audited domain targets are never stored.
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-md border-2 border-b-3 border-slate-200 bg-white p-5">
              <div className="flex items-center gap-2.5 text-sky-950">
                <GlobeIcon size={28} className="shrink-0" />
                <h3 className="text-lg font-semibold">Global Coverage</h3>
              </div>
              <p className="text-sm leading-relaxed text-black/75">
                Analyze domain traffic across multiple countries and locations
                worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full border-b-2 border-slate-200 bg-white py-10 lg:py-16">
        <div className="mx-auto flex w-full max-w-358 flex-col items-start px-4">
          <h2 className="text-2xl font-semibold text-sky-950 sm:text-3xl lg:text-4xl">
            How Traffic Overview Works
          </h2>
          <p className="mt-3 max-w-225 text-base font-medium text-black/60 lg:text-lg">
            3 steps to analyzing competitor search traffic.
          </p>

          <div className="mt-8 grid w-full grid-cols-1 gap-6 md:grid-cols-3">
            <div className="relative flex flex-col items-start rounded-md border-2 border-b-3 border-slate-200 bg-slate-50/50 p-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-sky-950 text-base font-bold text-white">
                1
              </span>
              <h3 className="mt-4 text-lg font-semibold text-sky-950">
                Enter Target Domain
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-black/75">
                Type in any domain URL and select target country location code.
              </p>
            </div>

            <div className="relative flex flex-col items-start rounded-md border-2 border-b-3 border-slate-200 bg-slate-50/50 p-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-sky-950 text-base font-bold text-white">
                2
              </span>
              <h3 className="mt-4 text-lg font-semibold text-sky-950">
                Fetch Traffic Data
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-black/75">
                Queries DataForSEO&apos;s competitive traffic index to aggregate
                organic and paid search metrics.
              </p>
            </div>

            <div className="relative flex flex-col items-start rounded-md border-2 border-b-3 border-slate-200 bg-slate-50/50 p-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-sky-950 text-base font-bold text-white">
                3
              </span>
              <h3 className="mt-4 text-lg font-semibold text-sky-950">
                Evaluate Strategy
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-black/75">
                Analyze traffic growth trends, ranking tier distributions, and
                estimated traffic valuation.
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
                Do I need a DataForSEO API key for Traffic Overview?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-black/75">
                Yes, Traffic Overview queries DataForSEO&apos;s competitive
                research API. Free trial accounts include $1 in initial credits.
              </p>
            </div>

            <div className="rounded-md border-2 border-b-3 border-slate-200 bg-white p-5">
              <h3 className="text-base font-semibold text-sky-950 lg:text-lg">
                How is traffic cost valuation calculated?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-black/75">
                Traffic cost represents the estimated monthly spend required to
                purchase equivalent organic traffic via Google Pay-Per-Click
                ads.
              </p>
            </div>

            <div className="rounded-md border-2 border-b-3 border-slate-200 bg-white p-5">
              <h3 className="text-base font-semibold text-sky-950 lg:text-lg">
                Can I analyze subdomains or specific subfolders?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-black/75">
                Yes, Traffic Overview supports domain-level, and subdomain-level
                traffic analysis.
              </p>
            </div>

            <div className="rounded-md border-2 border-b-3 border-slate-200 bg-white p-5">
              <h3 className="text-base font-semibold text-sky-950 lg:text-lg">
                Are historical traffic trend charts included?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-black/75">
                Yes, the tool renders multi-month historical traffic trajectory
                charts to visualize long-term growth and seasonal shifts.
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
            Analyze Any Website&apos;s Search Traffic Today
          </h2>
          <p className="mt-3 max-w-175 text-base text-balance text-slate-200 sm:text-lg">
            Get instant competitive traffic intelligence with
            SEOToolSuite&apos;s open-source tool.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/tool/competitive-research/overview"
              className="flex items-center gap-2 rounded-md border-2 border-white bg-white px-6 py-3 text-base font-semibold text-sky-950 transition hover:scale-105 active:scale-95"
            >
              Access Traffic Overview
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
