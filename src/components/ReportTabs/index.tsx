"use client";

import Link from "next/link";
import { memo } from "react";

const ReportTabs = memo(
  ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => {
    return (
      <div className={`report-tabs ${className}`}>
        <div className="text-sm font-medium text-black/80">Reports:</div>
        <div className="bg-default-50 mt-1 flex w-fit flex-row flex-wrap gap-2 rounded-md border border-b-2 border-slate-200 p-2">
          {children}
        </div>
      </div>
    );
  },
);

ReportTabs.displayName = "ReportTabs";

const ReportTabsItem = memo(
  ({
    children,
    href,
    active = false,
    startContent,
  }: {
    children: string;
    href?: string;
    active?: boolean;
    startContent?: React.ReactNode;
  }) => {
    return (
      <>
        {href ? (
          <Link
            prefetch={false}
            href={href}
            target="_blank"
            className={`flex min-h-9 items-center gap-1 rounded-md px-2 py-1.5 text-sm transition hover:bg-black/4 ${active ? "border border-b-2 border-slate-200 bg-white!" : ""}`}
          >
            {startContent} {children}
          </Link>
        ) : (
          <div
            className={`flex min-h-9 cursor-default items-center gap-1 rounded-md px-2 py-1.5 text-sm transition hover:bg-black/4 ${active ? "border border-b-2 border-slate-200 bg-white!" : ""}`}
          >
            {startContent} {children}
          </div>
        )}
      </>
    );
  },
);

ReportTabsItem.displayName = "ReportTabsItem";

export { ReportTabs, ReportTabsItem };
