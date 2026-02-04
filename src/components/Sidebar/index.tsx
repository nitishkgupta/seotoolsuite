"use client";

import {
  BookOpenTextIcon,
  LoaderPinwheelIcon,
  MenuIcon,
  TelescopeIcon,
  TextSearchIcon,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo, useState } from "react";

const Sidebar = () => {
  const pathName = usePathname();
  const [responsiveOpen, setResponsiveOpen] = useState<boolean>(false);

  const isToolActive = (slug: string) => {
    return pathName === `/tool/${slug}`;
  };

  return (
    <>
      <button
        className="absolute top-0 left-0 z-50 flex cursor-pointer rounded-br-md border-r-2 border-b-2 border-slate-200 p-2 lg:hidden"
        onClick={() => setResponsiveOpen(!responsiveOpen)}
      >
        {responsiveOpen ? <XIcon size={22} /> : <MenuIcon size={22} />}
      </button>
      <div
        className={`seotoolsuite-sidebar absolute z-50 hidden w-full shrink-0 flex-col gap-3 overflow-y-auto border-b-2 border-slate-200 bg-white py-4 opacity-0 lg:relative lg:flex lg:max-w-60 lg:border-r-2 lg:border-b-0 lg:opacity-100 starting:opacity-0 lg:starting:opacity-100 ${responsiveOpen ? "flex! opacity-100" : ""}`}
        style={{
          transition: "all 0.3s ease allow-discrete",
        }}
      >
        <div className="flex flex-col gap-1.5">
          <Link
            href="/tool/keyword-research"
            className={`flex items-center gap-2 px-3 py-3 text-[15px] font-medium ${pathName.startsWith("/tool/keyword-research") ? "bg-slate-100!" : ""}`}
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
              href="/tool/keyword-research/autocomplete"
              className={`relative ml-3 flex items-center gap-2 rounded-l-md px-3 py-2 text-sm transition hover:bg-slate-100 ${isToolActive("keyword-research/autocomplete") ? "bg-slate-100!" : ""}`}
              onClick={() => setResponsiveOpen(false)}
            >
              <LoaderPinwheelIcon size={18} /> <span>Autocomplete</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Sidebar);
