import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HomeHeader from "@/components/HomeHeader";
import {
  CheckCircle2Icon,
  DownloadIcon,
  FileSpreadsheetIcon,
  GiftIcon,
  InfinityIcon,
  LayersIcon,
  LinkIcon,
  LockIcon,
  ScaleIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ZapIcon,
} from "lucide-react";
import { HomeFooter } from "@/components/HomeFooter";

export const metadata: Metadata = {
  title: "Bulk Ahrefs DR Checker (Free) | SEOToolSuite",
  description:
    "The Bulk DR Checker tool lets you check the Ahrefs Domain Rating (DR) of multiple domains in a single request. It's ideal for evaluating backlink prospects, analyzing competitors, and assessing domain authority at scale.",
  openGraph: {
    type: "website",
    title: "Bulk Ahrefs DR Checker (Free) | SEOToolSuite",
    description:
      "The Bulk DR Checker tool lets you check the Ahrefs Domain Rating (DR) of multiple domains in a single request. It's ideal for evaluating backlink prospects, analyzing competitors, and assessing domain authority at scale.",
    images: [
      {
        url: "/assets/images/bulk-dr-checker-screenshot.png",
      },
    ],
  },
};

export default function BulkDRCheckerFeaturePage() {
  return (
    <div className="bulk-dr-checker-feature-page relative flex w-full flex-col bg-white">
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
            Bulk Ahrefs DR Checker
          </h1>
          <p className="mt-4 max-w-225 text-center text-base font-medium text-black/60 sm:text-lg lg:text-xl">
            Check{" "}
            <b className="font-semibold text-sky-950">
              Ahrefs Domain Rating (DR)
            </b>{" "}
            for multiple websites simultaneously — completely free with no API
            key or subscription required.
          </p>
        </div>

        {/* Feature Badges */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 px-2 sm:px-4">
          <div className="flex items-center gap-2 overflow-hidden rounded-md border-2 border-b-3 border-slate-200 bg-white pr-3">
            <div className="flex h-10 w-10 items-center justify-center bg-emerald-950/10">
              <GiftIcon size={20} className="text-sky-950" />
            </div>
            <span className="text-xs font-medium text-sky-950 sm:text-sm md:text-base">
              Free to Use (No API Needed)
            </span>
          </div>
          <div className="flex items-center gap-2 overflow-hidden rounded-md border-2 border-b-3 border-slate-200 bg-white pr-3">
            <div className="flex h-10 w-10 items-center justify-center bg-sky-950/10">
              <LayersIcon size={20} className="text-sky-950" />
            </div>
            <span className="text-xs font-medium text-sky-950 sm:text-sm md:text-base">
              Bulk Multi-Domain Batch Queries
            </span>
          </div>
          <div className="flex items-center gap-2 overflow-hidden rounded-md border-2 border-b-3 border-slate-200 bg-white pr-3">
            <div className="flex h-10 w-10 items-center justify-center bg-sky-950/10">
              <ShieldCheckIcon size={20} className="text-sky-950" />
            </div>
            <span className="text-xs font-medium text-sky-950 sm:text-sm md:text-base">
              Ahrefs Domain Rating (DR)
            </span>
          </div>
          <div className="flex items-center gap-2 overflow-hidden rounded-md border-2 border-b-3 border-slate-200 bg-white pr-3">
            <div className="flex h-10 w-10 items-center justify-center bg-sky-950/10">
              <FileSpreadsheetIcon size={20} className="text-sky-950" />
            </div>
            <span className="text-xs font-medium text-sky-950 sm:text-sm md:text-base">
              Interactive DataGrid & Export
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/tool/backlink-research/bulk-dr-checker"
            className="flex items-center gap-2 rounded-md border-2 border-b-3 border-black/80 bg-sky-950 px-5 py-2.5 text-sm font-medium text-white transition hover:scale-105 active:scale-95 lg:text-base"
          >
            Access Bulk DR Checker
          </Link>
        </div>

        {/* Hero Screenshot Frame with Scroll Animation */}
        <div className="group relative order-1 mx-auto mt-8 max-h-70 max-w-300 overflow-hidden rounded-t-md border-t-2 border-r-2 border-l-2 border-slate-200 bg-gray-100 p-2 lg:order-2 lg:max-h-129">
          <Image
            src="/assets/images/bulk-dr-checker-screenshot.png"
            alt="Bulk DR Checker"
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
              Audit Ahrefs Domain Rating at Scale
            </h2>
            <p className="mt-3 max-w-225 text-base font-medium text-black/60 lg:text-lg">
              Qualify link-building prospects and evaluate domain strength in
              batch with Ahrefs DR metrics.
            </p>
          </div>

          <div className="mt-8 grid w-full grid-cols-1 items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {/* Feature 1 */}
            <div className="flex w-full flex-col items-start justify-between rounded-md border-2 border-b-3 border-slate-200 p-5 transition hover:bg-slate-100">
              <div>
                <div className="flex items-center gap-3 text-sky-950">
                  <div className="rounded-md bg-sky-950 p-2.5 text-white">
                    <LayersIcon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold lg:text-xl">
                    Batch Multi-Domain Input
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-black/75 lg:text-base">
                  Paste multiple domain names into a single input field to check
                  Domain Rating in bulk without tedious single-domain searches.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-sky-950">
                <CheckCircle2Icon size={16} /> Batch URL Submission
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex w-full flex-col items-start justify-between rounded-md border-2 border-b-3 border-slate-200 p-5 transition hover:bg-slate-100">
              <div>
                <div className="flex items-center gap-3 text-sky-950">
                  <div className="rounded-md bg-sky-950 p-2.5 text-white">
                    <ShieldCheckIcon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold lg:text-xl">
                    Ahrefs Domain Rating (DR)
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-black/75 lg:text-base">
                  Retrieve official Ahrefs Domain Rating (DR) metrics for all
                  submitted domains to measure link authority accurately.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-sky-950">
                <CheckCircle2Icon size={16} /> Ahrefs DR Scores
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex w-full flex-col items-start justify-between rounded-md border-2 border-b-3 border-slate-200 p-5 transition hover:bg-slate-100">
              <div>
                <div className="flex items-center gap-3 text-sky-950">
                  <div className="rounded-md bg-sky-950 p-2.5 text-white">
                    <GiftIcon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold lg:text-xl">
                    100% Free Forever
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-black/75 lg:text-base">
                  Requires zero DataForSEO API balance, API keys, or
                  registration. Free for everyone to use.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-sky-950">
                <CheckCircle2Icon size={16} /> No API Key Required
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex w-full flex-col items-start justify-between rounded-md border-2 border-b-3 border-slate-200 p-5 transition hover:bg-slate-100">
              <div>
                <div className="flex items-center gap-3 text-sky-950">
                  <div className="rounded-md bg-sky-950 p-2.5 text-white">
                    <FileSpreadsheetIcon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold lg:text-xl">
                    Interactive DataGrid Table
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-black/75 lg:text-base">
                  Sort and filter batch results by DR score or domain name
                  inside a responsive DataGrid table.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-sky-950">
                <CheckCircle2Icon size={16} /> Column Sorting & Filtering
              </div>
            </div>

            {/* Feature 5 */}
            <div className="flex w-full flex-col items-start justify-between rounded-md border-2 border-b-3 border-slate-200 p-5 transition hover:bg-slate-100">
              <div>
                <div className="flex items-center gap-3 text-sky-950">
                  <div className="rounded-md bg-sky-950 p-2.5 text-white">
                    <DownloadIcon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold lg:text-xl">
                    One-Click CSV Export
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-black/75 lg:text-base">
                  Export complete DR result tables into CSV format with one
                  click for link outreach spreadsheets.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-sky-950">
                <CheckCircle2Icon size={16} /> CSV Export Support
              </div>
            </div>

            {/* Feature 6 */}
            <div className="flex w-full flex-col items-start justify-between rounded-md border-2 border-b-3 border-slate-200 p-5 transition hover:bg-slate-100">
              <div>
                <div className="flex items-center gap-3 text-sky-950">
                  <div className="rounded-md bg-sky-950 p-2.5 text-white">
                    <ZapIcon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold lg:text-xl">
                    Fast Batch Execution
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-black/75 lg:text-base">
                  Rapidly evaluates Domain Rating metrics for multiple websites
                  simultaneously.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-sky-950">
                <CheckCircle2Icon size={16} /> Instant Bulk Processing
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Open Source Section */}
      <section className="w-full border-b-2 border-slate-200 bg-slate-50/50 py-10 lg:py-16">
        <div className="mx-auto flex w-full max-w-358 flex-col items-start px-4">
          <h2 className="text-2xl font-semibold text-sky-950 sm:text-3xl lg:text-4xl">
            Why Use SEOToolSuite&apos;s Bulk DR Checker?
          </h2>
          <p className="mt-3 max-w-225 text-base font-medium text-black/60 lg:text-lg">
            Free, lightweight, and completely open source.
          </p>

          <div className="mt-8 grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            <div className="flex flex-col gap-3 rounded-md border-2 border-b-3 border-slate-200 bg-white p-5">
              <div className="flex items-center gap-2.5 text-sky-950">
                <GiftIcon size={28} className="shrink-0 text-sky-950" />
                <h3 className="text-lg font-semibold">100% Free Tool</h3>
              </div>
              <p className="text-sm leading-relaxed text-black/75">
                Zero cost! You do not need to connect an API key or buy credits
                to check Ahrefs DR.
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-md border-2 border-b-3 border-slate-200 bg-white p-5">
              <div className="flex items-center gap-2.5 text-sky-950">
                <ShieldCheckIcon size={28} className="shrink-0" />
                <h3 className="text-lg font-semibold">Ahrefs DR Metrics</h3>
              </div>
              <p className="text-sm leading-relaxed text-black/75">
                Fetches Domain Rating metrics directly from Ahrefs to give you
                standard link authority scores.
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-md border-2 border-b-3 border-slate-200 bg-white p-5">
              <div className="flex items-center gap-2.5 text-sky-950">
                <InfinityIcon size={28} className="shrink-0" />
                <h3 className="text-lg font-semibold">Bulk Querying</h3>
              </div>
              <p className="text-sm leading-relaxed text-black/75">
                Audit lists of domain prospects in batch without paywalls or
                manual one-by-one lookups.
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-md border-2 border-b-3 border-slate-200 bg-white p-5">
              <div className="flex items-center gap-2.5 text-sky-950">
                <ScaleIcon size={28} className="shrink-0" />
                <h3 className="text-lg font-semibold">100% Open Source</h3>
              </div>
              <p className="text-sm leading-relaxed text-black/75">
                MIT-licensed codebase. Fully transparent code ready to customize
                or host yourself.
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-md border-2 border-b-3 border-slate-200 bg-white p-5">
              <div className="flex items-center gap-2.5 text-sky-950">
                <LockIcon size={28} className="shrink-0" />
                <h3 className="text-lg font-semibold">Secured</h3>
              </div>
              <p className="text-sm leading-relaxed text-black/75">
                Queries executed without storing any target domain lists on any
                server.
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-md border-2 border-b-3 border-slate-200 bg-white p-5">
              <div className="flex items-center gap-2.5 text-sky-950">
                <ZapIcon size={28} className="shrink-0" />
                <h3 className="text-lg font-semibold">Blazing Speed</h3>
              </div>
              <p className="text-sm leading-relaxed text-black/75">
                Get batch Domain Rating metrics in seconds to streamline your
                outreach workflow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full border-b-2 border-slate-200 bg-white py-10 lg:py-16">
        <div className="mx-auto flex w-full max-w-358 flex-col items-start px-4">
          <h2 className="text-2xl font-semibold text-sky-950 sm:text-3xl lg:text-4xl">
            How Bulk DR Checker Works
          </h2>
          <p className="mt-3 max-w-225 text-base font-medium text-black/60 lg:text-lg">
            3 simple steps to check Ahrefs DR at scale.
          </p>

          <div className="mt-8 grid w-full grid-cols-1 gap-6 md:grid-cols-3">
            <div className="relative flex flex-col items-start rounded-md border-2 border-b-3 border-slate-200 bg-slate-50/50 p-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-sky-950 text-base font-bold text-white">
                1
              </span>
              <h3 className="mt-4 text-lg font-semibold text-sky-950">
                Paste Domain URLs
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-black/75">
                Paste a list of domain names (one per line) into the bulk input
                box.
              </p>
            </div>

            <div className="relative flex flex-col items-start rounded-md border-2 border-b-3 border-slate-200 bg-slate-50/50 p-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-sky-950 text-base font-bold text-white">
                2
              </span>
              <h3 className="mt-4 text-lg font-semibold text-sky-950">
                Fetch Ahrefs DR
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-black/75">
                The tool retrieves official Ahrefs Domain Rating (DR) metrics
                for all submitted websites.
              </p>
            </div>

            <div className="relative flex flex-col items-start rounded-md border-2 border-b-3 border-slate-200 bg-slate-50/50 p-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-sky-950 text-base font-bold text-white">
                3
              </span>
              <h3 className="mt-4 text-lg font-semibold text-sky-950">
                Filter & Export CSV
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-black/75">
                Sort results by highest DR score or export the list into CSV for
                outreach campaigns.
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
                Is Bulk DR Checker really 100% free?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-black/75">
                Yes! Bulk DR Checker requires no API key, DataForSEO balance, or
                account registration.
              </p>
            </div>

            <div className="rounded-md border-2 border-b-3 border-slate-200 bg-white p-5">
              <h3 className="text-base font-semibold text-sky-950 lg:text-lg">
                Where does the Domain Rating metric come from?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-black/75">
                The Domain Rating (DR) metric is provided from Ahrefs to give
                standard domain authority scores.
              </p>
            </div>

            <div className="rounded-md border-2 border-b-3 border-slate-200 bg-white p-5">
              <h3 className="text-base font-semibold text-sky-950 lg:text-lg">
                How many domains can I check at once?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-black/75">
                You can input multiple domain names per batch submission for
                quick link prospecting.
              </p>
            </div>

            <div className="rounded-md border-2 border-b-3 border-slate-200 bg-white p-5">
              <h3 className="text-base font-semibold text-sky-950 lg:text-lg">
                Can I export the batch DR results to CSV?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-black/75">
                Yes, you can export your batch domain authority table to a CSV
                file with one click.
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
            Start Checking Ahrefs DR in Bulk For Free
          </h2>
          <p className="mt-3 max-w-175 text-base text-balance text-slate-200 sm:text-lg">
            Audit Ahrefs Domain Rating for multiple sites right now — no signup
            or API key required.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/tool/backlink-research/bulk-dr-checker"
              className="flex items-center gap-2 rounded-md border-2 border-white bg-white px-6 py-3 text-base font-semibold text-sky-950 transition hover:scale-105 active:scale-95"
            >
              Access Bulk DR Checker
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
