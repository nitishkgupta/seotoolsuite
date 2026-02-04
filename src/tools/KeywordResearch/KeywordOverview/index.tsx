"use client";

import useDFSBalance from "@/hooks/useDFSBalance";
import DataForSEO from "@/services/DataForSEO";
import {
  getDataForSEOLanguages,
  getDataForSEOLocationFromCode,
  getDataForSEOLocations,
} from "@/utils/dataforseo";
import demographyIcon from "@/assets/icons/demography.svg";
import manIcon from "@/assets/icons/man.svg";
import womanIcon from "@/assets/icons/woman.svg";
import { getDifficultyColor, getDifficultyText } from "@/utils/difficulty";
import { getFlagImageUrl } from "@/utils/flags";
import { getLocalStorageItem } from "@/utils/localStorage";
import { trackUmamiEvent } from "@/utils/umami";
import {
  Alert,
  Autocomplete,
  AutocompleteItem,
  Button,
  Form,
  Input,
  Skeleton,
  Tooltip,
} from "@heroui/react";
import {
  BadgeDollarSignIcon,
  BadgeQuestionMarkIcon,
  BinocularsIcon,
  BookOpenTextIcon,
  BoxIcon,
  ChartNoAxesCombinedIcon,
  DatabaseZapIcon,
  GaugeIcon,
  InfoIcon,
  LinkIcon,
  NavigationIcon,
  TargetIcon,
  TelescopeIcon,
  TrendingUpIcon,
  UsersIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { memo, useCallback, useEffect, useState } from "react";
import {
  getSessionStorageItem,
  setSessionStorageItem,
} from "@/utils/sessionStorage";
import SearchVolumeChart from "@/components/SearchVolumeChart";

type KeywordOverviewData = {
  keyword: string;
  location_code: number;
  language_code: string;
  searchVolume: number;
  ppc: number;
  ppcLevel: string;
  cpc: number;
  lowTopPageBid?: number;
  highTopPageBid?: number;
  monthlySearches: {
    year: number;
    month: number;
    search_volume: number;
  }[];
  searchVolumeTrend: {
    monthly: number;
    quarterly: number;
    yearly: number;
  };
  searchIntent?: string;
  keywordDifficulty?: number;
  avgBacklinksData?: {
    backlinks: number;
    dofollowBacklinks: number;
    referringPages: number;
    referringDomains: number;
    pageRank: number;
    domainRank: number;
  };
  genderDistribution?: {
    male: number;
    female: number;
  };
  ageDistribution?: Record<string, number>;
};

const KeywordOverviewTool = ({
  searchParams,
}: {
  searchParams?: Promise<{
    keyword?: string;
    location_code?: string;
    language_code?: string;
  }>;
}) => {
  const { refreshDFSBalance } = useDFSBalance(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<KeywordOverviewData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const dfsUsername = getLocalStorageItem("DATAFORSEO_USERNAME");
  const dfsPassword = getLocalStorageItem("DATAFORSEO_PASSWORD");
  const dfsSandboxEnabled =
    getLocalStorageItem("DATAFORSEO_SANDBOX") === "true";
  const cachingEnabled = getLocalStorageItem("CACHING_ENABLED") === "true";

  const locations = getDataForSEOLocations();
  const languages = getDataForSEOLanguages();

  const [selectedKeyword, setSelectedKeyword] = useState<string>("");
  const [selectedLocationKey, setSelectedLocationKey] =
    useState<string>("2356");
  const [selectedLanguageKey, setSelectedLanguageKey] = useState<string>("en");

  const [formInput, setFormInput] = useState<{
    keyword?: string;
    location_code?: string;
    language_code?: string;
  }>({});

  const handleFormSubmit = useCallback(
    async (e: React.SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();

      const keyword: string = selectedKeyword;
      const location_code: string = selectedLocationKey;
      const language_code: string = selectedLanguageKey;

      if (!keyword || !location_code || !language_code) {
        return;
      }

      setFormInput({
        keyword,
        location_code,
        language_code,
      });
    },
    [selectedKeyword, selectedLocationKey, selectedLanguageKey],
  );

  useEffect(() => {
    const getKeywordOverview = async (
      keyword: string,
      location_code: number,
      language_code: string,
    ) => {
      const sessionCacheData = getSessionStorageItem(
        `kwresearch-overview-${keyword}-${location_code}-${language_code}`,
      );

      if (sessionCacheData) {
        setData(JSON.parse(sessionCacheData));
        setError(null);

        window.setTimeout(() => {
          document.getElementById("keyword-overview-data")?.scrollIntoView({
            behavior: "smooth",
          });
        }, 100);

        return;
      }

      setIsLoading(true);
      setError(null);

      if (!dfsUsername || !dfsPassword) {
        setError(
          "DataForSEO API not connected. Please add credentials from settings.",
        );
        return;
      }

      if (!dfsSandboxEnabled) {
        try {
          trackUmamiEvent("keyword-research/overview", {
            location:
              getDataForSEOLocationFromCode(Number(location_code))
                ?.location_name ?? "N/A",
          });
        } catch (error) {
          console.error(error);
        }
      }

      try {
        const DataForSEOService = new DataForSEO(
          dfsUsername,
          dfsPassword,
          dfsSandboxEnabled,
          cachingEnabled,
        );

        const apiResponse = await DataForSEOService.getKeywordsOverview(
          [keyword],
          location_code,
          language_code,
          true,
        );

        const taskStatusCode = apiResponse?.tasks[0]?.status_code;
        const taskStatusMessage =
          apiResponse?.tasks[0]?.status_message ?? "Unknown error.";

        if (taskStatusCode !== 20000) {
          setError(`DataForSEO API error: ${taskStatusMessage}`);
          return;
        }

        const apiData = apiResponse?.tasks[0]?.result[0] ?? null;
        const keywordOverviewItem =
          apiData && apiData.items && apiData.items.length > 0
            ? apiData?.items[0]
            : null;

        if (keywordOverviewItem) {
          const keywordOverviewData: KeywordOverviewData = {
            keyword: keywordOverviewItem.keyword,
            location_code: keywordOverviewItem.location_code,
            language_code: keywordOverviewItem.language_code,
            searchVolume: keywordOverviewItem.keyword_info.search_volume,
            ppc: keywordOverviewItem.keyword_info.competition,
            ppcLevel: keywordOverviewItem.keyword_info.competition_level,
            cpc: keywordOverviewItem.keyword_info.cpc,
            lowTopPageBid:
              keywordOverviewItem.keyword_info.low_top_of_page_bid ?? null,
            highTopPageBid:
              keywordOverviewItem.keyword_info.high_top_of_page_bid ?? null,
            monthlySearches: keywordOverviewItem.keyword_info.monthly_searches,
            searchVolumeTrend:
              keywordOverviewItem.keyword_info?.search_volume_trend ?? null,
            searchIntent:
              keywordOverviewItem.search_intent_info?.main_intent ?? null,
            keywordDifficulty:
              keywordOverviewItem.keyword_properties?.keyword_difficulty ??
              null,
            avgBacklinksData: {
              backlinks:
                keywordOverviewItem.avg_backlinks_info?.backlinks ?? null,
              dofollowBacklinks:
                keywordOverviewItem.avg_backlinks_info?.dofollow ?? null,
              referringPages:
                keywordOverviewItem.avg_backlinks_info?.referring_pages ?? null,
              referringDomains:
                keywordOverviewItem.avg_backlinks_info?.referring_domains ??
                null,
              pageRank: keywordOverviewItem.avg_backlinks_info?.rank ?? null,
              domainRank:
                keywordOverviewItem.avg_backlinks_info?.main_domain_rank ??
                null,
            },
            genderDistribution:
              keywordOverviewItem?.clickstream_keyword_info
                ?.gender_distribution ?? null,
            ageDistribution:
              keywordOverviewItem?.clickstream_keyword_info?.age_distribution ??
              null,
          };

          setData(keywordOverviewData);

          if (!dfsSandboxEnabled) {
            try {
              setSessionStorageItem(
                `kwresearch-overview-${keyword}-${location_code}-${language_code}`,
                JSON.stringify(keywordOverviewData),
              );
            } catch (error) {
              console.error(error);
            }
          }

          window.setTimeout(() => {
            document.getElementById("keyword-overview-data")?.scrollIntoView({
              behavior: "smooth",
            });
          }, 100);
        }

        if (!dfsSandboxEnabled) refreshDFSBalance();
      } catch (error: any) {
        console.error(error);

        if (error?.response?.data?.tasks[0]?.status_message) {
          setError(
            `DataForSEO API error: ${error.response.data.tasks[0].status_message}`,
          );
        } else {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (
      formInput.keyword &&
      formInput.location_code &&
      formInput.language_code
    ) {
      getKeywordOverview(
        formInput.keyword,
        Number(formInput.location_code),
        formInput.language_code,
      );
    }
  }, [
    formInput.keyword,
    formInput.location_code,
    formInput.language_code,
    dfsUsername,
    dfsPassword,
    dfsSandboxEnabled,
    cachingEnabled,
    refreshDFSBalance,
  ]);

  useEffect(() => {
    if (searchParams) {
      searchParams.then(({ keyword, location_code, language_code }) => {
        if (keyword && location_code && language_code) {
          setSelectedKeyword(keyword);
          setSelectedLocationKey(location_code);
          setSelectedLanguageKey(language_code);
          setFormInput({
            keyword,
            location_code,
            language_code,
          });
        }
      });
    }
  }, [searchParams]);

  return (
    <div className="keyword-overview-tool relative w-full px-4 py-4 lg:px-8 lg:py-8">
      <div className="tool-form-container relative flex w-full flex-col items-start justify-start rounded-md border-2 border-slate-200 bg-white p-5">
        {(dfsSandboxEnabled || cachingEnabled) && (
          <div className="absolute top-4 right-4 flex w-fit items-center gap-2">
            {dfsSandboxEnabled && (
              <Tooltip content="Sandbox Mode Enabled" placement="bottom-end">
                <div className="w-fit">
                  <BoxIcon size={18} />
                </div>
              </Tooltip>
            )}
            {dfsSandboxEnabled && cachingEnabled && (
              <div className="h-6 w-0.5 rounded-md bg-slate-200"></div>
            )}
            {cachingEnabled && (
              <Tooltip content="Caching Enabled" placement="bottom-end">
                <div className="w-fit">
                  <DatabaseZapIcon size={18} />
                </div>
              </Tooltip>
            )}
          </div>
        )}
        <div className="flex flex-col items-start gap-2 md:flex-row md:items-center">
          <div className="flex items-center gap-2 rounded-md border bg-sky-950 p-2 md:p-3">
            <TelescopeIcon
              size={28}
              className="animate-appearance-in text-white"
            />
            <div
              className="animate-appearance-in h-6 w-0.5 rounded-md bg-white"
              style={{ animationDelay: "100ms" }}
            ></div>
            <BookOpenTextIcon
              size={22}
              className="animate-appearance-in text-white"
              style={{ animationDelay: "200ms" }}
            />
          </div>
          <div className="flex flex-col items-start md:translate-y-0.5">
            <div className="text-xl font-medium text-sky-950 md:leading-none">
              Keyword Overview
            </div>
            <div className="text-base font-medium text-slate-500">
              Analyze keyword metrics with clickstream data.
            </div>
          </div>
        </div>
        <div className="tool-input-form-container mt-4 w-full">
          {!dfsUsername || !dfsPassword ? (
            <Alert
              color="warning"
              variant="flat"
              title={
                <span>
                  DataForSEO API not connected. Please add credentials from{" "}
                  <Link href="/account/settings" className="underline">
                    settings
                  </Link>
                  .
                </span>
              }
            ></Alert>
          ) : (
            <Form
              onSubmit={handleFormSubmit}
              className="tool-input-form flex w-full flex-col items-start justify-start"
            >
              {error && (
                <Alert
                  color="danger"
                  variant="flat"
                  title={error}
                  className="mb-2"
                />
              )}
              <div className="flex w-full flex-col items-start justify-start gap-2 md:flex-row">
                <Input
                  name="keyword"
                  variant="flat"
                  type="text"
                  label="Keyword"
                  isDisabled={isLoading}
                  value={selectedKeyword}
                  onValueChange={setSelectedKeyword}
                  autoFocus
                  isRequired
                />
                <Autocomplete
                  name="location"
                  variant="flat"
                  label="Location"
                  isDisabled={isLoading}
                  isRequired
                  selectedKey={selectedLocationKey}
                  onSelectionChange={(key) =>
                    setSelectedLocationKey(key as string)
                  }
                >
                  {locations.map((location) => (
                    <AutocompleteItem
                      key={location.location_code}
                      startContent={
                        <Image
                          className="h-auto w-6 rounded-xs border border-slate-400"
                          src={getFlagImageUrl(location.country_iso_code)}
                          loading="lazy"
                          width={24}
                          height={15}
                          alt={location.location_name}
                        />
                      }
                    >
                      {location.location_name}
                    </AutocompleteItem>
                  ))}
                </Autocomplete>
                <Autocomplete
                  name="language"
                  variant="flat"
                  label="Language"
                  isDisabled={isLoading}
                  isRequired
                  selectedKey={selectedLanguageKey}
                  onSelectionChange={(key) =>
                    setSelectedLanguageKey(key as string)
                  }
                >
                  {languages.map((language) => (
                    <AutocompleteItem key={language.language_code}>
                      {language.language_name}
                    </AutocompleteItem>
                  ))}
                </Autocomplete>
                <Button
                  color="primary"
                  variant="flat"
                  type="submit"
                  size="lg"
                  isDisabled={isLoading}
                  className="h-14 w-full"
                >
                  Submit
                </Button>
              </div>
            </Form>
          )}
        </div>
      </div>
      {isLoading && (
        <Skeleton className="mt-4 h-[1000px] w-full rounded-md lg:mt-8 lg:h-[480px]" />
      )}
      {!isLoading && !error && data && (
        <div
          className="mt-4 w-full scroll-m-4 rounded-md border-2 border-slate-200 bg-white lg:mt-8 lg:scroll-m-8"
          id="keyword-overview-data"
        >
          <div className="flex flex-col items-stretch justify-between gap-3 border-b-2 border-slate-200 px-4 py-3 lg:flex-row">
            <div className="flex items-center gap-2">
              <BookOpenTextIcon size={20} />
              <span className="text-base lg:text-lg">Keyword Overview</span>
            </div>
          </div>
          <div className="grid grid-cols-1 items-stretch lg:grid-cols-5">
            <div className="flex flex-col justify-between border-b-2 border-slate-200 p-4 lg:border-r-2 lg:border-b-0">
              <div className="flex items-center gap-2">
                <TrendingUpIcon size={18} />
                Volume
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-1">
                <span className="text-xl lg:text-3xl">
                  {data.searchVolume.toLocaleString(navigator.language)}
                </span>
                {data.searchVolumeTrend?.yearly ? (
                  <Tooltip content="Search Volume Trend (Yearly)">
                    <span
                      className={`text-sm font-medium ${data.searchVolumeTrend.yearly > 0 ? "text-green-500" : "text-red-500"}`}
                    >
                      {data.searchVolumeTrend.yearly > 0 ? "+" : ""}
                      {data.searchVolumeTrend.yearly.toLocaleString(
                        navigator.language,
                      )}
                      %
                    </span>
                  </Tooltip>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="flex flex-col justify-between border-b-2 border-slate-200 p-4 lg:border-r-2 lg:border-b-0">
              <div className="flex items-center gap-2">
                <BadgeQuestionMarkIcon size={18} />
                Intent
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-1 text-xl lg:text-2xl">
                {typeof data.searchIntent !== "string" && <span>N/A</span>}
                {data.searchIntent === "informational" && (
                  <>
                    <InfoIcon size={24} />
                    <Tooltip
                      content={
                        <div className="flex flex-col gap-1 p-1">
                          <div className="max-w-60 text-sm">
                            Users are seeking information or answers to certain
                            questions.
                          </div>
                        </div>
                      }
                    >
                      Informational
                    </Tooltip>
                  </>
                )}
                {data.searchIntent === "navigational" && (
                  <>
                    <NavigationIcon size={24} />
                    <Tooltip
                      content={
                        <div className="flex flex-col gap-1 p-1">
                          <div className="max-w-60 text-sm">
                            Users are looking for a specific site or page.
                          </div>
                        </div>
                      }
                    >
                      Navigational
                    </Tooltip>
                  </>
                )}
                {data.searchIntent === "commercial" && (
                  <>
                    <BinocularsIcon size={24} />
                    <Tooltip
                      content={
                        <div className="flex flex-col gap-1 p-1">
                          <div className="max-w-60 text-sm">
                            Users are doing research before making a purchase
                            decision.
                          </div>
                        </div>
                      }
                    >
                      Commercial
                    </Tooltip>
                  </>
                )}
                {data.searchIntent === "transactional" && (
                  <>
                    <BadgeDollarSignIcon size={24} />
                    <Tooltip
                      content={
                        <div className="flex flex-col gap-1 p-1">
                          <div className="max-w-60 text-sm">
                            Users are completing a specific action, usually a
                            purchase.
                          </div>
                        </div>
                      }
                    >
                      Transactional
                    </Tooltip>
                  </>
                )}
              </div>
            </div>
            <div className="flex flex-col justify-between border-b-2 border-slate-200 p-4 lg:border-r-2 lg:border-b-0">
              <div className="flex items-center gap-2">
                <BadgeDollarSignIcon size={18} />
                CPC
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-1">
                <div className="text-xl lg:text-3xl">
                  {typeof data.cpc === "number" ? `$${data.cpc}` : "N/A"}
                </div>
                {(typeof data.lowTopPageBid === "number" ||
                  typeof data.highTopPageBid === "number") && (
                  <div className="text-base text-black/80">
                    |{" "}
                    <Tooltip
                      content={
                        <div className="flex flex-col gap-1 p-1">
                          <div className="font-medium">Low Top of Page Bid</div>
                          <div className="max-w-70 text-sm">
                            Minimum bid for the ad to be displayed at the top of
                            the first page.
                          </div>
                        </div>
                      }
                    >
                      <span>${data.lowTopPageBid ?? "N/A"}</span>
                    </Tooltip>{" "}
                    -{" "}
                    <Tooltip
                      content={
                        <div className="flex flex-col gap-1 p-1">
                          <div className="font-medium">
                            High Top of Page Bid
                          </div>
                          <div className="max-w-70 text-sm">
                            Maximum bid for the ad to be displayed at the top of
                            the first page.
                          </div>
                        </div>
                      }
                    >
                      <span>${data.highTopPageBid ?? "N/A"}</span>
                    </Tooltip>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col justify-between border-b-2 border-slate-200 p-4 lg:border-r-2 lg:border-b-0">
              <div className="flex items-center gap-2">
                <TargetIcon size={18} />
                PPC
              </div>
              <div className="mt-4 text-xl lg:text-3xl">
                {typeof data.ppc === "number"
                  ? Math.round(data.ppc * 100)
                  : "N/A"}
              </div>
            </div>
            <div className="flex flex-col justify-between border-slate-200 p-4">
              <div className="flex items-center gap-2">
                <GaugeIcon size={18} />
                SEO Difficulty
              </div>
              {typeof data.keywordDifficulty === "number" ? (
                <div
                  className="mt-4 flex flex-wrap items-center gap-1"
                  style={{ color: getDifficultyColor(data.keywordDifficulty) }}
                >
                  <span className="text-xl lg:text-3xl">
                    {data.keywordDifficulty}
                  </span>
                  <span className="text-base text-black/80 uppercase">
                    | {getDifficultyText(data.keywordDifficulty)}
                  </span>
                </div>
              ) : (
                <div className="mt-4 flex items-center gap-1">N/A</div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 items-stretch border-t-2 border-slate-200">
            <div className="flex flex-col justify-between border-b-2 border-slate-200 p-4 pb-1">
              <div className="flex items-center gap-2">
                <ChartNoAxesCombinedIcon size={18} />
                Search Volume Trend
              </div>
              <div className="mt-4 w-full">
                {data.monthlySearches && (
                  <SearchVolumeChart
                    data={data?.monthlySearches}
                    xAxisLabelType="monthWithYear"
                    chartType="area"
                    chartHeight={200}
                  />
                )}
              </div>
            </div>
            <div className="flex flex-col justify-between border-slate-200 p-4">
              <div className="flex items-center gap-2">
                <Image src={demographyIcon} alt="Demography" className="w-5" />
                Gender Distribution
              </div>
              {data.genderDistribution &&
              (data.genderDistribution.male !== null ||
                data.genderDistribution.female !== null) ? (
                <>
                  <div className="mt-4 flex items-center justify-between">
                    <Image src={manIcon} alt="Male" className="w-10" />
                    <div className="relative h-2 w-full shrink overflow-hidden rounded-full bg-pink-400">
                      <div
                        className={`scale-x-anim h-full border-white bg-blue-400 transition-all duration-500 ${data.genderDistribution.male > 0 && data.genderDistribution.male < 100 ? "border-r-2" : ""}`}
                        style={{
                          width: `${data.genderDistribution.male ?? 0}%`,
                        }}
                      ></div>
                    </div>
                    <Image src={womanIcon} alt="Female" className="w-10" />
                  </div>
                  <div className="mt-2 grid grid-cols-2 items-stretch">
                    <div className="flex flex-col items-start gap-1">
                      <div className="font-medium">Male</div>
                      <div className="max-w-60 text-sm">
                        {Math.round(
                          data.searchVolume *
                            (data.genderDistribution.male / 100),
                        ).toLocaleString(navigator.language)}{" "}
                        ({data.genderDistribution.male ?? 0}%)
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="font-medium">Female</div>
                      <div className="max-w-60 text-right text-sm">
                        {Math.round(
                          data.searchVolume *
                            (data.genderDistribution.female / 100),
                        ).toLocaleString(navigator.language)}{" "}
                        ({data.genderDistribution.female ?? 0}%)
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="mt-4 text-xl lg:text-3xl">N/A</div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 items-stretch border-t-2 border-slate-200 lg:grid-cols-2">
            <div className="flex flex-col border-b-2 border-slate-200 p-4 lg:border-r-2 lg:border-b-0">
              <div className="flex items-center gap-2">
                <LinkIcon size={18} />
                SERP Backlinks Data
              </div>
              <div className="mt-4 text-lg">
                {data.avgBacklinksData ? (
                  <div className="flex flex-col gap-0">
                    <div>
                      Avg. Backlinks:{" "}
                      {data.avgBacklinksData.backlinks
                        ? Math.round(
                            data.avgBacklinksData.backlinks,
                          ).toLocaleString(navigator.language)
                        : "N/A"}
                    </div>
                    <div>
                      Avg. DoFollow Backlinks:{" "}
                      {data.avgBacklinksData.dofollowBacklinks
                        ? Math.round(
                            data.avgBacklinksData.dofollowBacklinks,
                          ).toLocaleString(navigator.language)
                        : "N/A"}
                    </div>
                    <div>
                      Avg. Referring Pages:{" "}
                      {data.avgBacklinksData.referringPages
                        ? Math.round(
                            data.avgBacklinksData.referringPages,
                          ).toLocaleString(navigator.language)
                        : "N/A"}
                    </div>
                    <div>
                      Avg. Referring Domains:{" "}
                      {data.avgBacklinksData.referringDomains
                        ? Math.round(
                            data.avgBacklinksData.referringDomains,
                          ).toLocaleString(navigator.language)
                        : "N/A"}
                    </div>
                    <div>
                      Avg. PageRank:{" "}
                      {data.avgBacklinksData.pageRank
                        ? Math.round(
                            Math.sin(data.avgBacklinksData.pageRank / 636.62) *
                              100,
                          )
                        : "N/A"}
                    </div>
                    <div>
                      Avg. DomainRank:{" "}
                      {data.avgBacklinksData.domainRank
                        ? Math.round(
                            Math.sin(
                              data.avgBacklinksData.domainRank / 636.62,
                            ) * 100,
                          )
                        : "N/A"}
                    </div>
                  </div>
                ) : (
                  <div className="text-xl lg:text-3xl">N/A</div>
                )}
              </div>
            </div>
            <div className="border-slate-200 p-4">
              <div className="flex items-center gap-2">
                <UsersIcon size={18} />
                Age Distribution
              </div>
              {data.ageDistribution ? (
                <div className="mt-4 flex flex-col gap-1.5">
                  {Object.entries(data.ageDistribution).map(([key, value]) => (
                    <div className="flex flex-row items-center gap-2" key={key}>
                      <div className="min-w-14 shrink-0 text-lg">{key}</div>
                      <div className="shrink-0">|</div>
                      {value > 0 && (
                        <div
                          className="scale-x-anim relative h-3 shrink overflow-hidden rounded-full bg-sky-950 transition-all duration-500"
                          style={{ width: `${value ?? 0}%` }}
                        ></div>
                      )}
                      <div className="shrink-0 text-base text-sky-950">
                        {value ?? 0}%
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-4 text-xl lg:text-3xl">N/A</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(KeywordOverviewTool);
