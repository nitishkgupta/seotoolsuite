import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HomeHeader from "@/components/HomeHeader";
import {
  CheckCircle2Icon,
  CopyIcon,
  DownloadIcon,
  GiftIcon,
  InfinityIcon,
  LightbulbIcon,
  LoaderPinwheelIcon,
  LockIcon,
  ScaleIcon,
  SearchIcon,
  SparklesIcon,
  TelescopeIcon,
  ZapIcon,
} from "lucide-react";
import { HomeFooter } from "@/components/HomeFooter";

export const metadata: Metadata = {
  title: "Keyword Autocomplete (Free) | SEOToolSuite",
  description:
    "The Keyword Autocomplete tool generates long-tail keyword ideas using Google autocomplete data. It helps you discover real search queries, identify content opportunities, and expand your keyword research quickly.",
  openGraph: {
    type: "website",
    title: "Keyword Autocomplete (Free) | SEOToolSuite",
    description:
      "The Keyword Autocomplete tool generates long-tail keyword ideas using Google autocomplete data. It helps you discover real search queries, identify content opportunities, and expand your keyword research quickly.",
    images: [
      {
        url: "/assets/images/keyword-autocomplete-screenshot.png",
      },
    ],
  },
};

export default function KeywordAutocompleteFeaturePage() {
  return (
    <div className="keyword-autocomplete-feature-page relative flex w-full flex-col bg-white">
      {/* Header */}
      <HomeHeader />

      {/* Hero Section */}
      <section className="hero w-full border-b-2 border-slate-200 bg-[url('/assets/images/papyrus.png')] bg-repeat px-4 lg:px-0">
        <div className="mx-auto flex w-full max-w-350 flex-col items-center pt-8 lg:pt-14">
          <div className="flex items-center gap-2 rounded-full border-2 border-b-3 border-sky-950/20 bg-white/80 px-4 py-1.5 text-xs font-semibold tracking-wider text-sky-950 uppercase backdrop-blur-xs md:text-sm">
            <TelescopeIcon size={18} className="text-sky-950" />
            KEYWORD RESEARCH
          </div>
          <h1 className="mt-4 text-center text-3xl font-semibold text-sky-950 capitalize sm:text-4xl lg:text-6xl">
            Keyword Autocomplete
          </h1>
          <p className="mt-4 max-w-225 text-center text-base font-medium text-black/60 sm:text-lg lg:text-xl">
            Uncover hundreds of real-time{" "}
            <b className="font-semibold text-sky-950">
              long-tail search queries
            </b>{" "}
            straight from Google Autocomplete. Explore{" "}
            <b className="font-semibold text-sky-950">alphabetical modifiers</b>
            , <b className="font-semibold text-sky-950">questions</b>, and{" "}
            <b className="font-semibold text-sky-950">prepositions</b> —
            completely free for all users with zero API cost.
          </p>
        </div>

        {/* Feature Badges */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 px-2 sm:px-4">
          <div className="flex items-center gap-2 overflow-hidden rounded-md border-2 border-b-3 border-slate-200 bg-white pr-3">
            <div className="flex h-10 w-10 items-center justify-center bg-emerald-950/10">
              <GiftIcon size={20} className="text-sky-950" />
            </div>
            <span className="text-xs font-medium text-sky-950 sm:text-sm md:text-base">
              Free To Use (No API Needed)
            </span>
          </div>
          <div className="flex items-center gap-2 overflow-hidden rounded-md border-2 border-b-3 border-slate-200 bg-white pr-3">
            <div className="flex h-10 w-10 items-center justify-center bg-sky-950/10">
              <SearchIcon size={20} className="text-sky-950" />
            </div>
            <span className="text-xs font-medium text-sky-950 sm:text-sm md:text-base">
              Real-Time Google Autocomplete
            </span>
          </div>
          <div className="flex items-center gap-2 overflow-hidden rounded-md border-2 border-b-3 border-slate-200 bg-white pr-3">
            <div className="flex h-10 w-10 items-center justify-center bg-sky-950/10">
              <LightbulbIcon size={20} className="text-sky-950" />
            </div>
            <span className="text-xs font-medium text-sky-950 sm:text-sm md:text-base">
              Alphabetical & Question Expansion
            </span>
          </div>
          <div className="flex items-center gap-2 overflow-hidden rounded-md border-2 border-b-3 border-slate-200 bg-white pr-3">
            <div className="flex h-10 w-10 items-center justify-center bg-sky-950/10">
              <ZapIcon size={20} className="text-sky-950" />
            </div>
            <span className="text-xs font-medium text-sky-950 sm:text-sm md:text-base">
              Instant Client-Side Extraction
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/tool/keyword-research/autocomplete"
            className="flex items-center gap-2 rounded-md border-2 border-b-3 border-black/80 bg-sky-950 px-5 py-2.5 text-sm font-medium text-white transition hover:scale-105 active:scale-95 lg:text-base"
          >
            Access Keyword Autocomplete
          </Link>
        </div>

        {/* Hero Screenshot Frame with Scroll Animation */}
        <div className="group relative order-1 mx-auto mt-8 max-h-70 max-w-300 overflow-hidden rounded-t-md border-t-2 border-r-2 border-l-2 border-slate-200 bg-gray-100 p-2 lg:order-2 lg:max-h-129">
          <Image
            src="/assets/images/keyword-autocomplete-screenshot.png"
            alt="Keyword Autocomplete"
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
              Unlock Real Search Intent with Autocomplete
            </h2>
            <p className="mt-3 max-w-225 text-base font-medium text-black/60 lg:text-lg">
              Discover long-tail questions and search patterns directly from
              Google&apos;s real-time prediction algorithms.
            </p>
          </div>

          <div className="mt-8 grid w-full grid-cols-1 items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {/* Feature 1 */}
            <div className="flex w-full flex-col items-start justify-between rounded-md border-2 border-b-3 border-slate-200 p-5 transition hover:bg-slate-100">
              <div>
                <div className="flex items-center gap-3 text-sky-950">
                  <div className="rounded-md bg-sky-950 p-2.5 text-white">
                    <SearchIcon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold lg:text-xl">
                    Live Google Suggestions
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-black/75 lg:text-base">
                  Query Google&apos;s autocomplete API in real-time to find
                  exact search strings real users type when looking for
                  solutions in your niche.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-sky-950">
                <CheckCircle2Icon size={16} /> Real-Time Google Data
              </div>
            </div>

            {/* Feature 2 */}
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
                  Requires zero DataForSEO API balance or registration. Use it
                  as often as you want with unlimited query extractions.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-sky-950">
                <CheckCircle2Icon size={16} /> No API Key Required
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex w-full flex-col items-start justify-between rounded-md border-2 border-b-3 border-slate-200 p-5 transition hover:bg-slate-100">
              <div>
                <div className="flex items-center gap-3 text-sky-950">
                  <div className="rounded-md bg-sky-950 p-2.5 text-white">
                    <LoaderPinwheelIcon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold lg:text-xl">
                    A-Z & Question Modifiers
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-black/75 lg:text-base">
                  Automatically appends alphabetical prefixes (a, b, c...),
                  question words (how, why, what, can), and prepositions (for,
                  with, vs) to your seed term.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-sky-950">
                <CheckCircle2Icon size={16} /> Automated Multi-Pattern Expansion
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex w-full flex-col items-start justify-between rounded-md border-2 border-b-3 border-slate-200 p-5 transition hover:bg-slate-100">
              <div>
                <div className="flex items-center gap-3 text-sky-950">
                  <div className="rounded-md bg-sky-950 p-2.5 text-white">
                    <LightbulbIcon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold lg:text-xl">
                    Long-Tail Query Mining
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-black/75 lg:text-base">
                  Discover low-competition, highly specific search phrases that
                  standard SEO tools overlook, perfect for FAQ sections and blog
                  topics.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-sky-950">
                <CheckCircle2Icon size={16} /> FAQ & Blog Topic Mining
              </div>
            </div>

            {/* Feature 5 */}
            <div className="flex w-full flex-col items-start justify-between rounded-md border-2 border-b-3 border-slate-200 p-5 transition hover:bg-slate-100">
              <div>
                <div className="flex items-center gap-3 text-sky-950">
                  <div className="rounded-md bg-sky-950 p-2.5 text-white">
                    <CopyIcon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold lg:text-xl">
                    Instant Copy & Filter
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-black/75 lg:text-base">
                  Filter suggestions instantly in the UI and copy keywords
                  straight to your clipboard with one click.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-sky-950">
                <CheckCircle2Icon size={16} /> One-Click Clipboard Copy
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
                    Export List Options
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-black/75 lg:text-base">
                  Download complete autocomplete lists into CSV format to
                  quickly import into content planners.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-sky-950">
                <CheckCircle2Icon size={16} /> Clean Export Formats
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Open Source Section */}
      <section className="w-full border-b-2 border-slate-200 bg-slate-50/50 py-10 lg:py-16">
        <div className="mx-auto flex w-full max-w-358 flex-col items-start px-4">
          <h2 className="text-2xl font-semibold text-sky-950 sm:text-3xl lg:text-4xl">
            Why Use SEOToolSuite&apos;s Keyword Autocomplete?
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
                Zero cost! You do not need to connect an API account or buy
                credits to use Keyword Autocomplete.
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-md border-2 border-b-3 border-slate-200 bg-white p-5">
              <div className="flex items-center gap-2.5 text-sky-950">
                <InfinityIcon size={28} className="shrink-0" />
                <h3 className="text-lg font-semibold">Unlimited Queries</h3>
              </div>
              <p className="text-sm leading-relaxed text-black/75">
                Search as many seed words as you want with no rate limits or
                artificial daily quotas.
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-md border-2 border-b-3 border-slate-200 bg-white p-5">
              <div className="flex items-center gap-2.5 text-sky-950">
                <ZapIcon size={28} className="shrink-0" />
                <h3 className="text-lg font-semibold">Blazing Speed</h3>
              </div>
              <p className="text-sm leading-relaxed text-black/75">
                Executes instantly in your browser to fetch real-time
                suggestions in fractions of a second.
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-md border-2 border-b-3 border-slate-200 bg-white p-5">
              <div className="flex items-center gap-2.5 text-sky-950">
                <ScaleIcon size={28} className="shrink-0" />
                <h3 className="text-lg font-semibold">100% Open Source</h3>
              </div>
              <p className="text-sm leading-relaxed text-black/75">
                MIT licensed open-source code. Audit, adapt, or host on your own
                infrastructure.
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-md border-2 border-b-3 border-slate-200 bg-white p-5">
              <div className="flex items-center gap-2.5 text-sky-950">
                <LockIcon size={28} className="shrink-0" />
                <h3 className="text-lg font-semibold">Private & Secure</h3>
              </div>
              <p className="text-sm leading-relaxed text-black/75">
                Searches run directly from your browser. No query data is logged
                or stored on our servers.
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-md border-2 border-b-3 border-slate-200 bg-white p-5">
              <div className="flex items-center gap-2.5 text-sky-950">
                <SearchIcon size={28} className="shrink-0" />
                <h3 className="text-lg font-semibold">Real Search Intent</h3>
              </div>
              <p className="text-sm leading-relaxed text-black/75">
                Autocomplete suggestions reflect actual live queries real Google
                users are typing right now.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full border-b-2 border-slate-200 bg-white py-10 lg:py-16">
        <div className="mx-auto flex w-full max-w-358 flex-col items-start px-4">
          <h2 className="text-2xl font-semibold text-sky-950 sm:text-3xl lg:text-4xl">
            How Keyword Autocomplete Works
          </h2>
          <p className="mt-3 max-w-225 text-base font-medium text-black/60 lg:text-lg">
            3 simple steps to find real user search queries.
          </p>

          <div className="mt-8 grid w-full grid-cols-1 gap-6 md:grid-cols-3">
            <div className="relative flex flex-col items-start rounded-md border-2 border-b-3 border-slate-200 bg-slate-50/50 p-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-sky-950 text-base font-bold text-white">
                1
              </span>
              <h3 className="mt-4 text-lg font-semibold text-sky-950">
                Enter Seed Term
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-black/75">
                Type any core keyword or topic into the autocomplete search bar.
              </p>
            </div>

            <div className="relative flex flex-col items-start rounded-md border-2 border-b-3 border-slate-200 bg-slate-50/50 p-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-sky-950 text-base font-bold text-white">
                2
              </span>
              <h3 className="mt-4 text-lg font-semibold text-sky-950">
                Stream Google Suggestions
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-black/75">
                The tool automatically queries Google search suggestions across
                multiple letter and modifier variations.
              </p>
            </div>

            <div className="relative flex flex-col items-start rounded-md border-2 border-b-3 border-slate-200 bg-slate-50/50 p-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-sky-950 text-base font-bold text-white">
                3
              </span>
              <h3 className="mt-4 text-lg font-semibold text-sky-950">
                Copy or Export Queries
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-black/75">
                Copy long-tail phrases to your clipboard or download them into
                your content planning sheet.
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
                Is Keyword Autocomplete really 100% free?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-black/75">
                Yes! Keyword Autocomplete does not require a DataForSEO API
                account or any credit balance. It is completely free for
                everyone.
              </p>
            </div>

            <div className="rounded-md border-2 border-b-3 border-slate-200 bg-white p-5">
              <h3 className="text-base font-semibold text-sky-950 lg:text-lg">
                Where do these search suggestions come from?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-black/75">
                Suggestions are retrieved directly from Google&apos;s live
                autocomplete prediction algorithm in real time.
              </p>
            </div>

            <div className="rounded-md border-2 border-b-3 border-slate-200 bg-white p-5">
              <h3 className="text-base font-semibold text-sky-950 lg:text-lg">
                Why are long-tail keywords important for SEO?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-black/75">
                Long-tail keywords have lower competition and higher search
                intent, making it easier to rank fast and convert visitors into
                customers.
              </p>
            </div>

            <div className="rounded-md border-2 border-b-3 border-slate-200 bg-white p-5">
              <h3 className="text-base font-semibold text-sky-950 lg:text-lg">
                Can I export the results to CSV?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-black/75">
                Yes, you can copy all suggestions directly to your clipboard or
                download them as a CSV file with one click.
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
            Start Finding Long-Tail Keywords For Free
          </h2>
          <p className="mt-3 max-w-175 text-base text-balance text-slate-200 sm:text-lg">
            Mine real-time Google search queries right now — no signup or API
            key needed.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/tool/keyword-research/autocomplete"
              className="flex items-center gap-2 rounded-md border-2 border-white bg-white px-6 py-3 text-base font-semibold text-sky-950 transition hover:scale-105 active:scale-95"
            >
              Access Keyword Autocomplete
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
