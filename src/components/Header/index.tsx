"use client";

import { APP_VERSION } from "@/env";
import { Tooltip } from "@heroui/react";
import { SettingsIcon, TelescopeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logoImage from "@/assets/images/logo.png";

export default function Header() {
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
          <div className="block rounded-md border border-slate-200 px-2 py-1 text-sm font-medium text-black/60">
            v{APP_VERSION}
          </div>
        </div>
        <div className="header-right flex h-fit items-stretch gap-2">
          <div className="flex items-center rounded-md border-2 border-slate-200">
            <Tooltip content="Keyword Research">
              <Link
                href="/tool/keyword-research"
                className={`flex items-center gap-1 rounded-md px-2 py-2 text-sky-950 ${isToolActive("keyword-research") ? "bg-sky-950/10" : ""}`}
              >
                <TelescopeIcon size={24} />
              </Link>
            </Tooltip>
          </div>
          <div className="my-1 w-0.5 bg-slate-200"></div>
          <Tooltip content="Settings">
            <Link
              href="/account/settings"
              className={`flex items-center gap-1 rounded-md border-2 border-slate-200 px-2 py-2 text-black/80 ${isSettingsPageActive() ? "bg-sky-950/10" : ""}`}
            >
              <SettingsIcon size={24} />
            </Link>
          </Tooltip>
        </div>
      </header>
    </div>
  );
}
