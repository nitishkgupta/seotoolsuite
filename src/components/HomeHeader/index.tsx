"use client";

import { memo, useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@heroui/react";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpenTextIcon,
  ChevronDownIcon,
  ExternalLinkIcon,
  LightbulbIcon,
  LoaderPinwheelIcon,
  MenuIcon,
  StarIcon,
  TextSearchIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";

const HomeHeader = () => {
  const pathName = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const isFeaturesPage = pathName.startsWith("/features/");
  const isPricingPage = pathName.startsWith("/pricing");

  const isFeaturesPageActive = (featuresPage: string): boolean => {
    return pathName === `/features/${featuresPage}`;
  };

  return (
    <div className="header-container border-b-2 border-slate-200 bg-white">
      <header className="header relative mx-auto flex w-full max-w-358 flex-row items-center justify-start px-4 py-3">
        <div className="mr-2 md:hidden">
          <button
            className={`cursor-pointer rounded-md p-2 ${isMobileMenuOpen ? "bg-slate-200" : ""}`}
            onClick={toggleMobileMenu}
          >
            <MenuIcon size={18} />
          </button>
        </div>
        <div className="header-left flex items-center">
          <Link href="/">
            <Image
              src="/assets/images/logo.png"
              alt="SEOToolSuite"
              className="w-38 lg:w-46"
              width={216}
              height={30}
              quality={100}
            />
          </Link>
        </div>
        <div
          className={`absolute top-full left-0 z-20 hidden w-full flex-col gap-4 border-t-2 border-b-2 border-slate-200 bg-white p-4 md:relative md:ml-7 md:flex md:w-fit md:flex-row md:items-center md:border-none md:p-0 ${isMobileMenuOpen ? "flex!" : ""}`}
        >
          <Dropdown className="w-full border-2 border-slate-200 shadow-none md:w-auto">
            <DropdownTrigger>
              <button
                className={`flex cursor-pointer items-center gap-1 ${isFeaturesPage ? "font-medium!" : ""}`}
              >
                <span>Features</span>
                <ChevronDownIcon size={18} />
              </button>
            </DropdownTrigger>
            <DropdownMenu className="min-w-64">
              <DropdownSection
                showDivider
                title="KEYWORD RESEARCH"
                className="font-medium"
              >
                <DropdownItem
                  key="keyword-overview"
                  href="/features/keyword-overview"
                  startContent={<BookOpenTextIcon size={18} />}
                  className={`p-2 hover:bg-slate-100! ${isFeaturesPageActive("keyword-overview") ? "bg-slate-100!" : ""}`}
                >
                  Keyword Overview
                </DropdownItem>
                <DropdownItem
                  key="keyword-suggestions"
                  href="/features/keyword-suggestions"
                  startContent={<TextSearchIcon size={18} />}
                  className={`p-2 hover:bg-slate-100! ${isFeaturesPageActive("keyword-suggestions") ? "bg-slate-100!" : ""}`}
                >
                  Keyword Suggestions
                </DropdownItem>
                <DropdownItem
                  key="keyword-ideas"
                  href="/features/keyword-ideas"
                  startContent={<LightbulbIcon size={18} />}
                  className={`p-2 hover:bg-slate-100! ${isFeaturesPageActive("keyword-ideas") ? "bg-slate-100!" : ""}`}
                >
                  Keyword Ideas
                </DropdownItem>
                <DropdownItem
                  key="keyword-autocomplete"
                  href="/features/keyword-autocomplete"
                  startContent={<LoaderPinwheelIcon size={18} />}
                  className={`p-2 hover:bg-slate-100! ${isFeaturesPageActive("keyword-autocomplete") ? "bg-slate-100!" : ""}`}
                >
                  Keyword Autocomplete
                </DropdownItem>
              </DropdownSection>
              <DropdownSection
                showDivider
                title="COMPETITIVE RESEARCH"
                className="font-medium"
              >
                <DropdownItem
                  key="traffic-overview"
                  href="/features/traffic-overview"
                  startContent={<BookOpenTextIcon size={18} />}
                  className={`p-2 hover:bg-slate-100! ${isFeaturesPageActive("traffic-overview") ? "bg-slate-100!" : ""}`}
                >
                  Traffic Overview
                </DropdownItem>
                <DropdownItem
                  key="ranked-keywords"
                  href="/features/ranked-keywords"
                  startContent={<TextSearchIcon size={18} />}
                  className={`p-2 hover:bg-slate-100! ${isFeaturesPageActive("ranked-keywords") ? "bg-slate-100!" : ""}`}
                >
                  Ranked Keywords
                </DropdownItem>
              </DropdownSection>
              <DropdownSection
                title="BACKLINK RESEARCH"
                className="font-medium"
              >
                <DropdownItem
                  key="bulk-dr-checker"
                  href="/features/bulk-dr-checker"
                  startContent={<StarIcon size={18} />}
                  className={`p-2 hover:bg-slate-100! ${isFeaturesPageActive("bulk-dr-checker") ? "bg-slate-100!" : ""}`}
                >
                  Bulk DR Checker
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
          <Dropdown className="border-2 border-slate-200 shadow-none">
            <DropdownTrigger>
              <button className="flex cursor-pointer items-center gap-1">
                <span>Resources</span>
                <ChevronDownIcon size={18} />
              </button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem
                key="github"
                href="https://github.com/nitishkgupta/seotoolsuite"
                target="_blank"
                endContent={<ExternalLinkIcon size={18} />}
                className="hover:bg-slate-100!"
              >
                GitHub
              </DropdownItem>
              <DropdownItem
                key="discord"
                href="https://discord.gg/Wt4RN4Xy8n"
                endContent={<ExternalLinkIcon size={18} />}
                rel="nofollow"
                target="_blank"
                className="hover:bg-slate-100!"
              >
                Discord
              </DropdownItem>
              <DropdownItem
                key="dataforseo"
                href="https://dataforseo.com/?aff=4d6a573c-0675-4d96-add0-f864b53b7c11"
                endContent={<ExternalLinkIcon size={18} />}
                target="_blank"
                rel="nofollow"
                className="hover:bg-slate-100!"
              >
                DataForSEO
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Link
            href="/pricing"
            className={`${isPricingPage ? "font-medium!" : ""}`}
          >
            Pricing
          </Link>
        </div>
        <div className="header-right ml-auto flex h-fit items-center gap-3">
          <Link
            href="https://github.com/nitishkgupta/seotoolsuite"
            target="_blank"
            className="hidden items-center gap-1 rounded-md border-2 border-b-3 border-sky-950 bg-white px-4 py-2 text-sm font-medium text-sky-950 transition hover:scale-105 active:scale-95 md:flex lg:text-base"
          >
            <Image
              src="/assets/images/github-icon.svg"
              alt="GitHub"
              width={20}
              height={20}
              quality={100}
            />
          </Link>
          <Link
            href="/tools"
            className="block rounded-md border-2 border-b-3 border-black/80 bg-sky-950 px-4 py-2 text-sm font-medium text-white transition hover:scale-105 active:scale-95 lg:text-base"
          >
            Get Started
          </Link>
        </div>
      </header>
    </div>
  );
};

export default memo(HomeHeader);
