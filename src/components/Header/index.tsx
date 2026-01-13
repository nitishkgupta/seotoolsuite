"use client";

import { APP_VERSION } from "@/env";
import { Tooltip } from "@heroui/react";
import {
  SettingsIcon,
  SmilePlusIcon,
  TelescopeIcon,
  LightbulbIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logoImage from "@/assets/images/logo.png";
import DFSBalanceBox from "@/components/DFSBalanceBox";
import { memo } from "react";

function Header() {
  const pathName = usePathname();

  const isToolActive = (slug: string) => {
    return pathName === `/tool/${slug}`;
  };

  const isSettingsPageActive = () => {
    return pathName === `/account/settings`;
  };

  return (
    <div className="header-container border-b-2 border-slate-200 bg-white">
      <header className="header mx-auto flex w-full flex-col items-center justify-between gap-4 px-8 py-4 md:flex-row">
        <div className="header-left flex items-center gap-2">
          <Link href="/">
            <Image
              src={logoImage}
              alt="SEOToolSuite"
              className="w-38 lg:w-48"
            />
          </Link>
          <Link
            href="https://github.com/nitishkgupta/seotoolsuite/blob/main/CHANGELOG.md"
            target="_blank"
            rel="nofollow"
            className="block rounded-md border border-slate-200 px-2 py-1 text-sm font-medium text-black/60 transition hover:bg-slate-100"
          >
            v{APP_VERSION}
          </Link>
        </div>
        <div className="header-right flex h-fit flex-wrap items-stretch justify-center gap-2">
          <div className="flex w-full items-center gap-1 overflow-hidden rounded-md border-2 border-slate-200 p-1 md:w-fit">
            <Tooltip content="Keyword Research">
              <Link
                href="/tool/keyword-research"
                className={`flex w-full items-center justify-center gap-1 rounded-md px-2 py-2 text-black transition hover:bg-slate-100 md:w-fit ${isToolActive("keyword-research") ? "bg-sky-950/10!" : ""}`}
              >
                <TelescopeIcon size={24} />
              </Link>
            </Tooltip>
            <Tooltip content="Keyword Complete">
              <Link
                href="/tool/keyword-complete"
                className={`flex w-full items-center justify-center gap-1 rounded-md px-2 py-2 text-black transition hover:bg-slate-100 md:w-fit ${isToolActive("keyword-complete") ? "bg-sky-950/10!" : ""}`}
              >
                <LightbulbIcon size={24} />
              </Link>
            </Tooltip>
          </div>
          <DFSBalanceBox />
          <div className="my-1 hidden w-0.5 bg-slate-200 lg:block"></div>
          <Tooltip content="Settings">
            <Link
              href="/account/settings"
              className={`flex items-center gap-1 rounded-md border-2 border-slate-200 px-2 py-2 text-black/80 transition hover:bg-slate-100 ${isSettingsPageActive() ? "bg-sky-950/10!" : ""}`}
            >
              <SettingsIcon size={24} />
            </Link>
          </Tooltip>
          <div className="my-1 hidden w-0.5 bg-slate-200 lg:block"></div>
          <Tooltip content="Feedback">
            <Link
              href="https://github.com/nitishkgupta/seotoolsuite/issues/new/choose"
              rel="nofollow"
              target="_blank"
              className={`flex items-center gap-1 rounded-md border-2 border-slate-200 px-2 py-2 text-black/80 transition hover:bg-slate-100`}
            >
              <SmilePlusIcon size={24} />
            </Link>
          </Tooltip>
        </div>
      </header>
    </div>
  );
}

export default memo(Header);
