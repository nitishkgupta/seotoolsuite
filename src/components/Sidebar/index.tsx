"use client";

import {
  BinocularsIcon,
  BookOpenTextIcon,
  FaceSlightlySmilingPlusIcon,
  FilesIcon,
  LightbulbIcon,
  LinkIcon,
  LoaderPinwheelIcon,
  MenuIcon,
  SettingsIcon,
  StarIcon,
  TelescopeIcon,
  TextSearchIcon,
  ToolCaseIcon,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo, useState } from "react";
import DFSBalanceBox from "../DFSBalanceBox";
import { Tooltip } from "@heroui/react";

const Sidebar = () => {
  const pathName = usePathname();
  const isSettingsPageActive = pathName === `/account/settings`;
  const [responsiveOpen, setResponsiveOpen] = useState<boolean>(false);

  const isToolActive = (slug: string) => {
    return pathName === `/tool/${slug}`;
  };

  return (
    <>
      <button
        className="absolute top-0 left-0 z-50 flex cursor-pointer rounded-br-md border-r-2 border-b-2 border-slate-200 p-2 active:scale-95 active:duration-75 md:right-0 md:left-auto md:rounded-br-none md:rounded-bl-md md:border-r-0 md:border-l-2 lg:hidden"
        onClick={() => setResponsiveOpen(!responsiveOpen)}
      >
        {responsiveOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
      </button>
      <div
        className={`seotoolsuite-sidebar lg:max-h-auto absolute z-50 hidden max-h-[calc(100dvh-62px)] min-h-[calc(100dvh-62px)] w-full shrink-0 flex-col gap-2 overflow-y-auto border-b-2 border-slate-200 bg-white py-3 opacity-0 lg:relative lg:flex lg:min-h-auto lg:max-w-60 lg:border-r-2 lg:border-b-0 lg:opacity-100 starting:opacity-0 lg:starting:opacity-100 ${responsiveOpen ? "flex! opacity-100" : ""}`}
        style={{
          transition: "all 0.3s ease allow-discrete",
        }}
      >
        <div className="flex flex-col gap-1.5">
          <Link
            href="/tool/keyword-research"
            className={`flex items-center gap-2 px-3 py-2 text-[15px] font-medium ${pathName.startsWith("/tool/keyword-research") ? "bg-slate-100!" : ""}`}
            onClick={() => setResponsiveOpen(false)}
          >
            <TelescopeIcon size={22} />
            <span>Keyword Research</span>
          </Link>
          <div className="flex flex-col gap-1">
            <Link
              href="/tool/keyword-research/overview"
              className={`relative ml-3 flex items-center gap-2 rounded-l-md px-3 py-2 text-sm transition hover:bg-slate-100 ${isToolActive("keyword-research/overview") ? "bg-slate-100!" : ""}`}
              onClick={() => setResponsiveOpen(false)}
            >
              <BookOpenTextIcon size={18} /> <span>Overview</span>
            </Link>
            <Link
              href="/tool/keyword-research/suggestions"
              className={`relative ml-3 flex items-center gap-2 rounded-l-md px-3 py-2 text-sm transition hover:bg-slate-100 ${isToolActive("keyword-research/suggestions") ? "bg-slate-100!" : ""}`}
              onClick={() => setResponsiveOpen(false)}
            >
              <TextSearchIcon size={18} /> <span>Suggestions</span>
            </Link>
            <Link
              href="/tool/keyword-research/ideas"
              className={`relative ml-3 flex items-center gap-2 rounded-l-md px-3 py-2 text-sm transition hover:bg-slate-100 ${isToolActive("keyword-research/ideas") ? "bg-slate-100!" : ""}`}
              onClick={() => setResponsiveOpen(false)}
            >
              <LightbulbIcon size={18} /> <span>Ideas</span>
            </Link>
            <Link
              href="/tool/keyword-research/autocomplete"
              className={`relative ml-3 flex items-center gap-2 rounded-l-md px-3 py-2 text-sm transition hover:bg-slate-100 ${isToolActive("keyword-research/autocomplete") ? "bg-slate-100!" : ""}`}
              onClick={() => setResponsiveOpen(false)}
            >
              <LoaderPinwheelIcon size={18} /> <span>Autocomplete</span>
              <span className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-sky-950/10 px-2 py-1 text-[10px] leading-none font-medium text-sky-950">
                FREE
              </span>
            </Link>
          </div>
        </div>
        <div className="h-0.5 w-full bg-slate-200"></div>
        <div className="flex flex-col gap-1.5">
          <Link
            href="/tool/competitive-research"
            className={`flex items-center gap-2 px-3 py-2 text-[15px] font-medium ${pathName.startsWith("/tool/competitive-research") ? "bg-slate-100!" : ""}`}
            onClick={() => setResponsiveOpen(false)}
          >
            <BinocularsIcon size={20} />
            <span>Competitive Research</span>
          </Link>
          <div className="flex flex-col gap-1">
            <Link
              href="/tool/competitive-research/overview"
              className={`relative ml-3 flex items-center gap-2 rounded-l-md px-3 py-2 text-sm transition hover:bg-slate-100 ${isToolActive("competitive-research/overview") ? "bg-slate-100!" : ""}`}
              onClick={() => setResponsiveOpen(false)}
            >
              <BookOpenTextIcon size={18} /> <span>Overview</span>
            </Link>
            <Link
              href="/tool/competitive-research/keywords"
              className={`relative ml-3 flex items-center gap-2 rounded-l-md px-3 py-2 text-sm transition hover:bg-slate-100 ${isToolActive("competitive-research/keywords") ? "bg-slate-100!" : ""}`}
              onClick={() => setResponsiveOpen(false)}
            >
              <TextSearchIcon size={18} /> <span>Keywords</span>
            </Link>
            <Link
              href="/tool/competitive-research/pages"
              className={`relative ml-3 flex items-center gap-2 rounded-l-md px-3 py-2 text-sm transition hover:bg-slate-100 ${isToolActive("competitive-research/pages") ? "bg-slate-100!" : ""}`}
              onClick={() => setResponsiveOpen(false)}
            >
              <FilesIcon size={18} /> <span>Pages</span>
            </Link>
          </div>
        </div>
        <div className="h-0.5 w-full bg-slate-200"></div>
        <div className="flex flex-col gap-1.5">
          <Link
            href="/tool/backlink-research"
            className={`flex items-center gap-2 px-3 py-2 text-[15px] font-medium ${pathName.startsWith("/tool/backlink-research") ? "bg-slate-100!" : ""}`}
            onClick={() => setResponsiveOpen(false)}
          >
            <LinkIcon size={20} />
            <span>Backlink Research</span>
          </Link>
          <div className="flex flex-col gap-1">
            <Link
              href="/tool/backlink-research/bulk-dr-checker"
              className={`relative ml-3 flex items-center gap-2 rounded-l-md px-3 py-2 text-sm transition hover:bg-slate-100 ${isToolActive("backlink-research/bulk-dr-checker") ? "bg-slate-100!" : ""}`}
              onClick={() => setResponsiveOpen(false)}
            >
              <StarIcon size={18} /> <span>Bulk DR Checker</span>
              <span className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-sky-950/10 px-2 py-1 text-[10px] leading-none font-medium text-sky-950">
                FREE
              </span>
            </Link>
          </div>
        </div>
        <div className="mt-auto h-0.5 w-full bg-slate-200 lg:hidden"></div>
        <div className="flex flex-row flex-wrap items-stretch gap-2 px-2 lg:hidden">
          <DFSBalanceBox />

          {pathName.startsWith("/account/") && (
            <>
              <Tooltip content="SEO Tools">
                <Link
                  href="/tools"
                  className={`flex items-center gap-1 rounded-md border-2 border-slate-200 px-2 py-2 text-black/80 transition hover:bg-slate-100 active:scale-95 active:duration-75`}
                >
                  <ToolCaseIcon size={24} />
                </Link>
              </Tooltip>
            </>
          )}
          <Tooltip content="Settings">
            <Link
              href="/account/settings"
              className={`flex items-center gap-1 rounded-md border-2 border-b-3 border-slate-200 px-2 py-2 text-black/80 transition hover:bg-slate-100 active:scale-95 active:duration-75 ${isSettingsPageActive ? "bg-slate-100!" : ""}`}
            >
              <SettingsIcon size={24} />
            </Link>
          </Tooltip>
          <Tooltip content="Feedback">
            <Link
              href="https://tally.so/r/rjeJlv"
              rel="nofollow"
              target="_blank"
              className={`flex items-center gap-1 rounded-md border-2 border-b-3 border-slate-200 px-2 py-2 text-black/80 transition hover:bg-slate-100 active:scale-95 active:duration-75`}
            >
              <FaceSlightlySmilingPlusIcon size={24} />
            </Link>
          </Tooltip>
        </div>
      </div>
    </>
  );
};

export default memo(Sidebar);
