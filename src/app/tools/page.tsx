import type { Metadata } from "next";
import Header from "@/components/Header";
import { LightbulbIcon, TelescopeIcon } from "lucide-react";
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
          <div className="mt-8 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/tool/keyword-research"
              className={`group flex h-full flex-row items-center rounded-md border-2 border-slate-200 text-lg font-medium transition hover:bg-slate-50`}
            >
              <div
                className={`flex h-full items-center justify-center px-4 md:px-5`}
              >
                <TelescopeIcon size={32} className="text-black/80 md:hidden" />
                <TelescopeIcon
                  size={52}
                  className="hidden text-black/80 md:block"
                />
              </div>
              <div className="flex flex-col py-4 pr-4">
                <span className="text-xl text-black/80 md:text-2xl">
                  Keyword Research
                </span>
                <span className="mt-2 text-sm leading-tight text-pretty text-black/60 md:text-base">
                  Generate keyword suggestions with multiple metrics.
                </span>
              </div>
            </Link>
            <Link
              href="/tool/keyword-complete"
              className={`group flex h-full flex-row items-center rounded-md border-2 border-slate-200 text-lg font-medium transition hover:bg-slate-50`}
            >
              <div
                className={`flex h-full items-center justify-center px-4 md:px-5`}
              >
                <LightbulbIcon size={32} className="text-black/80 md:hidden" />
                <LightbulbIcon
                  size={52}
                  className="hidden text-black/80 md:block"
                />
              </div>
              <div className="flex flex-col py-4 pr-4">
                <span className="text-xl text-black/80 md:text-2xl">
                  Keyword Complete
                </span>
                <span className="mt-2 text-sm leading-tight text-pretty text-black/60 md:text-base">
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
