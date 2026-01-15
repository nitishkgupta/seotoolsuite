import {
  BookOpenTextIcon,
  CalendarSyncIcon,
  DatabaseZapIcon,
  FilterIcon,
  GiftIcon,
  LightbulbIcon,
  PackageIcon,
  ScaleIcon,
  SmilePlusIcon,
  SparklesIcon,
  TelescopeIcon,
  TextSearchIcon,
  TypeOutlineIcon,
  WalletIcon,
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import logoImage from "@/assets/images/logo.png";
import keywordResearchScreenshot from "@/assets/images/keyword-research-screenshot.png";
import keywordCompleteScreenshot from "@/assets/images/keyword-complete-screenshot.png";
import dfsLogoImage from "@/assets/images/dataforseo-logo.png";
import githubIcon from "@/assets/images/github-icon.svg";

export const metadata: Metadata = {
  title: "SEOToolSuite | Free & Open Source SEO Tools For Everyone",
  description:
    "Free and open source SEO tools for everyone. Keyword research and more, powered by DataForSEO.",
};

export default function HomePage() {
  return (
    <div className="homepage relative flex w-full flex-col">
      <div className="header-container sticky top-0 z-50 border-b border-slate-200 bg-white/10 backdrop-blur-lg">
        <header className="header mx-auto flex w-full max-w-[1432px] flex-row items-center justify-between px-4 py-4">
          <div className="header-left flex items-center">
            <Link href="/">
              <Image
                src={logoImage}
                alt="SEOToolSuite"
                className="w-38 lg:w-54"
              />
            </Link>
          </div>
          <div className="header-right h-fit">
            <Link
              href="/tools"
              className="block rounded-md bg-sky-950 px-4 py-2 text-sm font-medium text-white transition hover:scale-105 active:scale-95 lg:text-lg"
            >
              Get Started
            </Link>
          </div>
        </header>
      </div>
      <section className="hero w-full border-b-2 border-slate-200 bg-white px-4 lg:px-0">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center pt-8 lg:pt-14">
          <h1 className="bg-linear-to-r from-sky-950 to-sky-700 bg-clip-text text-center text-4xl font-semibold text-pretty text-transparent capitalize lg:text-6xl">
            SEO Tools For Everyone
          </h1>
          <p className="mt-4 max-w-[800px] text-center text-base font-medium text-balance text-black/60 lg:text-xl">
            SEOToolSuite provides free and open source SEO tools for everyone.
            <span className="mt-1 hidden lg:block"></span>
            <span className="ml-1 lg:ml-0">
              Keyword research and more, powered by DataForSEO.
            </span>
          </p>
        </div>
        <div className="mt-5 flex items-center justify-center gap-3">
          <Link
            href="/tools"
            className="flex items-center gap-1 rounded-md border-2 border-sky-950 bg-sky-950 px-4 py-2 text-sm font-medium text-white transition hover:scale-105 active:scale-95 lg:text-base"
          >
            Get Started
          </Link>
          <Link
            href="https://github.com/nitishkgupta/seotoolsuite"
            target="_blank"
            className="flex items-center gap-1 rounded-md border-2 border-sky-950 px-4 py-2 text-sm font-medium text-sky-950 transition hover:scale-105 active:scale-95 lg:text-base"
          >
            <Image src={githubIcon} alt="GitHub" className="w-5" />
            GitHub
          </Link>
        </div>
        <div className="relative mt-8 max-h-[300px] overflow-hidden px-4 lg:max-h-[700px]">
          <Image
            src={keywordResearchScreenshot}
            alt="SEOToolSuite"
            className="mx-auto w-full max-w-[1200px] rounded-t-md border-t-2 border-r-2 border-l-2 border-slate-200 shadow-lg"
          />
          <div className="absolute right-0 bottom-0 left-0 z-10 mx-auto h-14 max-w-[1200px] bg-linear-to-b from-white/5 to-white"></div>
        </div>
      </section>
      <section className="w-full border-b-2 border-slate-200 bg-white py-8">
        <div className="mx-auto flex w-full max-w-[1432px] flex-col items-start px-4">
          <h2 className="text-3xl font-semibold text-sky-950 lg:text-4xl">
            Powered by DataForSEO
          </h2>
          <p className="mt-3 max-w-[900px] text-base font-medium text-pretty text-black/60 lg:text-lg">
            DataForSEO is the leading provider of SEO data and APIs. With over{" "}
            <b className="font-semibold">7 billion</b> keywords in the database,
            it is one of the best openly available SEO data provider.
          </p>
          <div className="mt-6 grid w-full grid-cols-1 gap-2 lg:grid-cols-4 lg:gap-3">
            <div className="flex flex-col rounded-md border-2 border-slate-200">
              <div className="w-full border-b-2 border-slate-200 px-4 py-2 text-lg">
                Google Keywords
              </div>
              <div className="p-4 text-lg font-semibold lg:text-2xl">
                7,694,038,302
              </div>
            </div>
            <div className="flex flex-col rounded-md border-2 border-slate-200">
              <div className="w-full border-b-2 border-slate-200 px-4 py-2 text-lg">
                Bing Keywords
              </div>
              <div className="p-4 text-lg font-semibold lg:text-2xl">
                4,229,969,701
              </div>
            </div>
            <div className="flex flex-col rounded-md border-2 border-slate-200">
              <div className="w-full border-b-2 border-slate-200 px-4 py-2 text-lg">
                Google SERPs
              </div>
              <div className="p-4 text-lg font-semibold lg:text-2xl">
                592,764,792
              </div>
            </div>
            <div className="flex flex-col rounded-md border-2 border-slate-200">
              <div className="w-full border-b-2 border-slate-200 px-4 py-2 text-lg">
                Bing SERPs
              </div>
              <div className="p-4 text-lg font-semibold lg:text-2xl">
                51,266,713
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full border-b-2 border-slate-200 bg-white py-8">
        <div className="mx-auto flex w-full max-w-[1432px] flex-col items-start px-4">
          <h2 className="text-3xl font-semibold text-sky-950 lg:text-4xl">
            Free & Open Source
          </h2>
          <p className="mt-3 max-w-[900px] text-base font-medium text-pretty text-black/60 lg:text-lg">
            All SEO tools are free and open source. You just need DataForSEO API
            and that&apos;s it! Get started with your DataForSEO account with
            free credits to start with.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-start gap-2 lg:gap-3">
            <div className="flex w-full items-center gap-2 rounded-md border-2 border-slate-200 p-3 text-black/80 lg:w-fit lg:p-5">
              <ScaleIcon size={32} className="shrink-0 scale-80 lg:scale-100" />
              <span className="text-base font-semibold lg:text-xl">
                MIT License
              </span>
            </div>
            <div className="flex w-full items-center gap-2 rounded-md border-2 border-slate-200 p-3 text-black/80 lg:w-fit lg:p-5">
              <PackageIcon
                size={32}
                className="shrink-0 scale-80 lg:scale-100"
              />
              <span className="text-base font-semibold lg:text-xl">
                Built with Next.js
              </span>
            </div>
            <div className="flex w-full items-center gap-2 rounded-md border-2 border-slate-200 p-3 text-black/80 lg:w-fit lg:p-5">
              <WalletIcon
                size={32}
                className="shrink-0 scale-80 lg:scale-100"
              />
              <span className="text-base font-semibold lg:text-xl">
                Credits Based
              </span>
            </div>
            <div className="flex w-full items-center gap-2 rounded-md border-2 border-slate-200 p-3 text-black/80 lg:w-fit lg:p-5">
              <SmilePlusIcon
                size={32}
                className="shrink-0 scale-80 lg:scale-100"
              />
              <span className="text-base font-semibold lg:text-xl">
                Clean UI/UX
              </span>
            </div>
            <div className="flex w-full items-center gap-2 rounded-md border-2 border-slate-200 p-3 text-black/80 lg:w-fit lg:p-5">
              <SparklesIcon
                size={32}
                className="shrink-0 scale-80 lg:scale-100"
              />
              <span className="text-base font-semibold lg:text-xl">
                AI Ready
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full border-b-2 border-slate-200 bg-white py-10">
        <div className="mx-auto flex w-full max-w-[1432px] flex-col items-start px-4">
          <div className="flex w-full flex-col items-start justify-between gap-8 lg:flex-row lg:gap-0">
            <div className="order-2 lg:order-1 lg:pt-8">
              <h2 className="flex items-center gap-3 text-xl font-semibold text-sky-950 lg:text-4xl">
                <TelescopeIcon
                  size={52}
                  className="rounded-md bg-sky-950 p-3 text-white"
                />
                Keyword Research
              </h2>
              <p className="mt-4 block max-w-[500px] p-2 text-lg text-black/80">
                Find thousands of keyword suggestions with multiple metrics like
                search volume, trend, search intent, seo difficulty, and more.
              </p>
              <div className="mt-4 flex flex-col">
                <div className="flex w-fit items-center gap-2 p-2">
                  <TextSearchIcon size={24} className="shrink-0" />
                  <span className="text-base font-semibold lg:text-lg">
                    Access billions of keywords, no limit.
                  </span>
                </div>
                <div className="flex w-fit items-center gap-2 p-2">
                  <FilterIcon size={24} className="shrink-0" />
                  <span className="text-base font-semibold lg:text-lg">
                    Filter & sort data.
                  </span>
                </div>
                <div className="flex w-fit items-center gap-2 p-2">
                  <WalletIcon size={24} className="shrink-0" />
                  <span className="text-base font-semibold lg:text-lg">
                    Pay only for what you use.
                  </span>
                </div>
                <div className="flex w-fit items-center gap-2 p-2">
                  <BookOpenTextIcon size={24} className="shrink-0" />
                  <span className="text-base font-semibold lg:text-lg">
                    Keyword overview with clickstream data.
                  </span>
                </div>
                <div className="flex w-fit items-center gap-2 p-2">
                  <CalendarSyncIcon size={24} className="shrink-0" />
                  <span className="text-base font-semibold lg:text-lg">
                    Data updated regularly.
                  </span>
                </div>
                <div className="flex w-fit items-center gap-2 p-2">
                  <DatabaseZapIcon size={24} className="shrink-0" />
                  <span className="text-base font-semibold lg:text-lg">
                    Caching support (Upstash Redis)
                  </span>
                </div>
              </div>
              <div className="mt-6 p-2">
                <Link
                  href="/tool/keyword-research"
                  className="block w-fit rounded-md bg-sky-950 px-4 py-2 text-sm font-medium text-white transition hover:scale-105 active:scale-95 lg:text-lg"
                >
                  Access Tool
                </Link>
              </div>
            </div>
            <div className="group relative order-1 mt-4 max-h-[200px] max-w-[800px] overflow-hidden rounded-md border-2 border-sky-950/10 bg-sky-950/5 p-4 lg:order-2 lg:max-h-[400px]">
              <Image
                src={keywordResearchScreenshot}
                alt="Keyword Research"
                className="w-full rounded-md transition duration-1500 ease-linear group-hover:translate-y-[calc(-100%+168px)] group-[:has(.tool-card-arrow:focus)]:translate-y-[calc(-100%+168px)] lg:group-hover:translate-y-[calc(-100%+368px)] lg:group-[:has(.tool-card-arrow:focus)]:translate-y-[calc(-100%+368px)]"
              />
              <div className="absolute bottom-0 left-0 z-20 flex h-[50px] w-full items-end justify-center bg-linear-to-t from-black/20 to-transparent pb-1 text-black transition-all duration-300 group-hover:opacity-0 has-[.tool-card-arrow:focus]:opacity-0 lg:pb-2">
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
          </div>
        </div>
      </section>
      <section className="w-full border-b-2 border-slate-200 bg-white py-10">
        <div className="mx-auto flex w-full max-w-[1432px] flex-col items-start px-4">
          <div className="flex w-full flex-col items-start justify-between gap-8 lg:flex-row lg:gap-0">
            <div className="order-2 lg:order-1 lg:pt-8">
              <h2 className="flex items-center gap-3 text-xl font-semibold text-sky-950 lg:text-4xl">
                <LightbulbIcon
                  size={52}
                  className="rounded-md bg-sky-950 p-3 text-white"
                />
                Keyword Complete
              </h2>
              <p className="mt-4 block max-w-[500px] p-2 text-lg text-black/80">
                Generate hundreds (or even thousands!) of long-tail keywords for
                free using Google autocomplete. No API needed!
              </p>
              <div className="mt-4 flex flex-col">
                <div className="flex w-fit items-center gap-2 p-2">
                  <TextSearchIcon size={24} className="shrink-0" />
                  <span className="text-base font-semibold lg:text-lg">
                    Relevant long-tail keywords.
                  </span>
                </div>

                <div className="flex w-fit items-center gap-2 p-2">
                  <GiftIcon size={24} className="shrink-0" />
                  <span className="text-base font-semibold lg:text-lg">
                    Completely free to use, no limits.
                  </span>
                </div>
                <div className="flex w-fit items-center gap-2 p-2">
                  <FilterIcon size={24} className="shrink-0" />
                  <span className="text-base font-semibold lg:text-lg">
                    Filter & sort data.
                  </span>
                </div>
                <div className="flex w-fit items-center gap-2 p-2">
                  <TypeOutlineIcon size={24} className="shrink-0" />
                  <span className="text-base font-semibold lg:text-lg">
                    Uses multiple prefixes and suffixes.
                  </span>
                </div>
              </div>
              <div className="mt-6 p-2">
                <Link
                  href="/tool/keyword-complete"
                  className="block w-fit rounded-md bg-sky-950 px-4 py-2 text-sm font-medium text-white transition hover:scale-105 active:scale-95 lg:text-lg"
                >
                  Access Tool
                </Link>
              </div>
            </div>
            <div className="group relative order-1 mt-4 max-h-[200px] max-w-[800px] overflow-hidden rounded-md border-2 border-sky-950/10 bg-sky-950/5 p-4 lg:order-2 lg:max-h-[400px]">
              <Image
                src={keywordCompleteScreenshot}
                alt="Keyword Complete"
                className="w-full rounded-md transition duration-1500 ease-linear group-hover:translate-y-[calc(-100%+168px)] group-[:has(.tool-card-arrow:focus)]:translate-y-[calc(-100%+168px)] lg:group-hover:translate-y-[calc(-100%+368px)] lg:group-[:has(.tool-card-arrow:focus)]:translate-y-[calc(-100%+368px)]"
              />
              <div className="absolute bottom-0 left-0 z-20 flex h-[50px] w-full items-end justify-center bg-linear-to-t from-black/20 to-transparent pb-1 text-black transition-all duration-300 group-hover:opacity-0 has-[.tool-card-arrow:focus]:opacity-0 lg:pb-2">
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
          </div>
        </div>
      </section>
      <footer className="flex flex-col items-center bg-slate-50 pt-4 text-base lg:text-lg">
        <span>© 2026 SEOToolSuite.</span>
        <div className="mt-1 text-center">
          Made with ❤️ in{" "}
          <Image
            src="https://flagcdn.com/in.svg"
            className="mx-0.5 inline-block -translate-y-0.5"
            width={22}
            height={22}
            alt="India"
          ></Image>{" "}
          by{" "}
          <Link
            href="https://github.com/nitishkgupta"
            target="_blank"
            className="underline"
          >
            nitishkgupta
          </Link>
          .
        </div>
        <div className="mt-4 w-full border-t-2 border-slate-200 py-3 text-center text-base">
          Powered by{" "}
          <Link
            href="https://dataforseo.com/?aff=44560"
            rel="nofollow"
            target="_blank"
            className="underline"
          >
            <Image
              src={dfsLogoImage}
              alt="DataForSEO"
              className="inline-block w-28 -translate-y-0.5"
            />
          </Link>
        </div>
      </footer>
    </div>
  );
}
