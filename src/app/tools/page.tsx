import type { Metadata } from "next";
import Header from "@/components/Header";
import {
  BookOpenTextIcon,
  LoaderPinwheelIcon,
  TelescopeIcon,
  TextSearchIcon,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SEO Tools | SEOToolSuite",
};

export default function ToolsPage() {
  return (
    <div className="seotoolsuite-tools">
      <Header />
      <div className="seotoolsuite-tools-content flex h-full w-full flex-col overflow-auto bg-slate-50 px-4 py-4 md:px-8 md:py-8">
        <div className="flex w-full flex-col rounded-md border-2 border-slate-200 bg-white px-6 py-6">
          <h1 className="w-fit bg-linear-to-r from-sky-950 to-sky-700 bg-clip-text text-2xl font-semibold text-transparent md:text-4xl">
            SEO Tools
          </h1>
          <div className="mt-0.5 text-base text-black/80 md:text-lg">
            Find the tools you need to take your SEO game to the next level.
          </div>
          <div className="mt-8 flex items-center gap-2 text-xl font-medium md:text-2xl">
            <div className="flex items-center gap-2 rounded-md border bg-sky-950 p-2 text-white md:p-3">
              <TelescopeIcon size={24} />
            </div>
            <span>Keyword Research</span>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/tool/keyword-research/overview"
              className={`group flex h-full flex-row items-center rounded-md border-2 border-slate-200 text-lg font-medium transition hover:bg-slate-50`}
            >
              <div
                className={`flex h-full items-center justify-center px-4 md:px-5`}
              >
                <BookOpenTextIcon
                  size={24}
                  className="text-black/80 md:hidden"
                />
                <BookOpenTextIcon
                  size={46}
                  className="hidden text-black/80 md:block"
                />
              </div>
              <div className="flex flex-col py-4 pr-4">
                <span className="text-lg text-black/80 md:text-xl">
                  Keyword Overview
                </span>
                <span className="mt-1 text-sm leading-tight text-pretty text-black/60 md:text-base">
                  Analyze keyword metrics with clickstream data.
                </span>
              </div>
            </Link>
            <Link
              href="/tool/keyword-research/suggestions"
              className={`group flex h-full flex-row items-center rounded-md border-2 border-slate-200 text-lg font-medium transition hover:bg-slate-50`}
            >
              <div
                className={`flex h-full items-center justify-center px-4 md:px-5`}
              >
                <TextSearchIcon size={24} className="text-black/80 md:hidden" />
                <TextSearchIcon
                  size={46}
                  className="hidden text-black/80 md:block"
                />
              </div>
              <div className="flex flex-col py-4 pr-4">
                <span className="text-lg text-black/80 md:text-xl">
                  Keyword Suggestions
                </span>
                <span className="mt-1 text-sm leading-tight text-pretty text-black/60 md:text-base">
                  Get keyword suggestions that include the seed keyword.
                </span>
              </div>
            </Link>
            <Link
              href="/tool/keyword-research/autocomplete"
              className={`group flex h-full flex-row items-center rounded-md border-2 border-slate-200 text-lg font-medium transition hover:bg-slate-50`}
            >
              <div
                className={`flex h-full items-center justify-center px-4 md:px-5`}
              >
                <LoaderPinwheelIcon
                  size={24}
                  className="text-black/80 md:hidden"
                />
                <LoaderPinwheelIcon
                  size={46}
                  className="hidden text-black/80 md:block"
                />
              </div>
              <div className="flex flex-col py-4 pr-4">
                <span className="text-lg text-black/80 md:text-xl">
                  Keyword Autocomplete
                </span>
                <span className="mt-1 text-sm leading-tight text-pretty text-black/60 md:text-base">
                  Generate long-tail keywords using Google autocomplete.
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
