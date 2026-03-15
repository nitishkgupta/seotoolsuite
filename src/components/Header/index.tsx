"use client";

import { APP_VERSION } from "@/env";
import { Tooltip } from "@heroui/react";
import { SettingsIcon, ToolCaseIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logoImage from "@/assets/images/logo.png";
import DFSBalanceBox from "@/components/DFSBalanceBox";
import discordIcon from "@/assets/images/discord-icon.svg";
import { memo } from "react";

function Header() {
  const pathName = usePathname();

  const isSettingsPageActive = () => {
    return pathName === `/account/settings`;
  };

  return (
    <div className="header-container shrink-0 border-b-2 border-slate-200 bg-white">
      <header className="header mx-auto flex w-full flex-col items-center justify-between gap-4 px-4 py-4 md:flex-row lg:h-17">
        <div className="header-left flex items-center gap-2">
          <Link href="/">
            <Image
              src={logoImage}
              alt="SEOToolSuite"
              className="w-38 lg:w-46"
            />
          </Link>
          <Link
            href="https://github.com/nitishkgupta/seotoolsuite/releases"
            target="_blank"
            rel="nofollow"
            className="block rounded-md border border-slate-200 px-2 py-1 text-sm font-medium text-black/60 transition hover:bg-slate-100"
          >
            v{APP_VERSION}
          </Link>
        </div>
        <div className="header-right flex h-fit flex-wrap items-stretch justify-center gap-2">
          <DFSBalanceBox />
          {pathName.startsWith("/account/") && (
            <>
              <Tooltip content="SEO Tools">
                <Link
                  href="/tools"
                  className={`flex items-center gap-1 rounded-md border-2 border-slate-200 px-2 py-2 text-black/80 transition hover:bg-slate-100`}
                >
                  <ToolCaseIcon size={24} />
                </Link>
              </Tooltip>
              <div className="my-1 hidden w-0.5 bg-slate-200 lg:block"></div>
            </>
          )}
          <Tooltip content="Settings">
            <Link
              href="/account/settings"
              className={`flex items-center gap-1 rounded-md border-2 border-slate-200 px-2 py-2 text-black/80 transition hover:bg-slate-100 ${isSettingsPageActive() ? "bg-slate-100!" : ""}`}
            >
              <SettingsIcon size={24} />
            </Link>
          </Tooltip>
          <div className="my-1 hidden w-0.5 bg-slate-200 lg:block"></div>
          <Tooltip content="Discord Server">
            <Link
              href="https://discord.gg/Wt4RN4Xy8n"
              rel="nofollow"
              target="_blank"
              className={`flex items-center gap-1 rounded-md border-2 border-slate-200 px-2 py-2 text-black/80 transition hover:bg-slate-100`}
            >
              <Image src={discordIcon} alt="Discord" className="w-5" />
            </Link>
          </Tooltip>
        </div>
      </header>
    </div>
  );
}

export default memo(Header);
