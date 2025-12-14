import {
  BadgeDollarSignIcon,
  BadgeQuestionMarkIcon,
  BinocularsIcon,
  BookOpenTextIcon,
  ChartNoAxesCombinedIcon,
  GaugeIcon,
  InfoIcon,
  LanguagesIcon,
  LinkIcon,
  MapPinIcon,
  NavigationIcon,
  SearchIcon,
  TargetIcon,
  TrendingUpIcon,
  UsersIcon,
} from "lucide-react";
import { Tooltip as RechartsTooltip, ComposedChart, Area } from "recharts";
import demographyIcon from "@/assets/icons/demography.svg";
import manIcon from "@/assets/icons/man.svg";
import womanIcon from "@/assets/icons/woman.svg";
import Image from "next/image";
import { Alert, Skeleton, Tooltip } from "@heroui/react";
import {
  getDataForSEOLanguageFromCode,
  getDataForSEOLocationFromCode,
} from "@/utils/dataforseo";
import { memo, useEffect, useState } from "react";
import { getLocalStorageItem } from "@/utils/localStorage";
import DataForSEO from "@/services/DataForSEO";
import useDFSBalance from "@/hooks/useDFSBalance";
import { getDifficultyColor, getDifficultyText } from "@/utils/difficulty";
import {
  getSessionStorageItem,
  setSessionStorageItem,
} from "@/utils/sessionStorage";
import { trackUmamiEvent } from "@/utils/umami";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

type KeywordOverviewItem = {
  keyword: string;
  location_code: number;
  language_code: string;
  searchVolume: number;
  ppc: number;
  ppcLevel: string;
  cpc: number;
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

const KeywordOverview = ({
  keyword,
  locationCode,
  languageCode,
}: {
  keyword: string;
  locationCode: number;
  languageCode: string;
}) => {
  const { refreshDFSBalance } = useDFSBalance(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<KeywordOverviewItem | null>();
  const [error, setError] = useState<string | null>();

  const dfsUsername = getLocalStorageItem("DATAFORSEO_USERNAME");
  const dfsPassword = getLocalStorageItem("DATAFORSEO_PASSWORD");

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
        return;
      }

      const dfsSandboxEnabled =
        getLocalStorageItem("DATAFORSEO_SANDBOX") === "true";
      setIsLoading(true);
      setError(null);

      if (!dfsUsername || !dfsPassword) {
        setError(
          "DataForSEO API not connected. Please add credentials from settings.",
        );
        setIsLoading(false);
        return;
      }

      if (!dfsSandboxEnabled) {
        try {
          trackUmamiEvent("keyword-overview", {
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
          setIsLoading(false);
          setError(`DataForSEO API error: ${taskStatusMessage}`);
          return;
        }

        const apiData = apiResponse?.tasks[0]?.result[0] ?? null;
        const keywordOverviewItem =
          apiData && apiData.items && apiData.items.length > 0
            ? apiData?.items[0]
            : null;
        setIsLoading(false);

        if (keywordOverviewItem) {
          const keywordOverviewData: KeywordOverviewItem = {
            keyword: keywordOverviewItem.keyword,
            location_code: keywordOverviewItem.location_code,
            language_code: keywordOverviewItem.language_code,
            searchVolume: keywordOverviewItem.keyword_info.search_volume,
            ppc: keywordOverviewItem.keyword_info.competition,
            ppcLevel: keywordOverviewItem.keyword_info.competition_level,
            cpc: keywordOverviewItem.keyword_info.cpc,
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
        }

        if (!dfsSandboxEnabled) refreshDFSBalance();
      } catch (error: any) {
        console.error(error);
        setIsLoading(false);

        if (error.response.data.tasks[0].status_message) {
          setError(
            `DataForSEO API error: ${error.response.data.tasks[0].status_message}`,
          );
        } else {
          setError(error.message);
        }
      }
    };
    getKeywordOverview(keyword, locationCode, languageCode);
  }, [
    dfsUsername,
    dfsPassword,
    keyword,
    locationCode,
    languageCode,
    refreshDFSBalance,
  ]);
  return (
    <>
      {isLoading && <Skeleton className="h-[480px] w-full rounded-md" />}
      {error && (
        <Alert color="danger" variant="flat" title={error} className="mb-2" />
      )}
      {!isLoading && data && (
        <div className="keyword-overview w-full rounded-md border-2 border-slate-200 bg-white">
          <div className="flex flex-col items-stretch justify-between gap-3 border-b-2 border-slate-200 px-4 py-3 lg:flex-row">
            <div className="flex items-center gap-2">
              <BookOpenTextIcon size={20} />
              <span className="text-base lg:text-lg">Keyword Overview</span>
            </div>
            <div className="flex items-stretch gap-2">
              <div className="flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1">
                <SearchIcon size={14} />
                {data.keyword}
              </div>
              <div className="flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1">
                <MapPinIcon size={14} />
                {
                  getDataForSEOLocationFromCode(data.location_code)
                    ?.location_name
                }
              </div>
              <div className="flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1">
                <LanguagesIcon size={14} />
                {
                  getDataForSEOLanguageFromCode(data.language_code)
                    ?.language_name
                }
              </div>
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
                  <span
                    className={`text-sm font-medium ${data.searchVolumeTrend.yearly > 0 ? "text-green-500" : "text-red-500"}`}
                  >
                    {data.searchVolumeTrend.yearly > 0 ? "+" : ""}
                    {data.searchVolumeTrend.yearly.toLocaleString(
                      navigator.language,
                    )}
                    %
                  </span>
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
              <div className="mt-4 text-xl lg:text-3xl">
                {typeof data.cpc === "number" ? `$${data.cpc}` : "N/A"}
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
          <div className="grid grid-cols-1 items-stretch border-t-2 border-slate-200 lg:grid-cols-2">
            <div className="flex flex-col justify-between border-b-2 border-slate-200 p-4 pb-1 lg:border-r-2 lg:border-b-0">
              <div className="flex items-center gap-2">
                <ChartNoAxesCombinedIcon size={18} />
                Search Volume Trend
              </div>
              <div className="mt-4 w-full">
                {data.monthlySearches && (
                  <ComposedChart
                    style={{ width: "100%", height: 55 }}
                    data={[...(data?.monthlySearches || [])].reverse()}
                    responsive
                  >
                    <RechartsTooltip
                      formatter={(value) => [
                        `${value.toLocaleString(navigator.language)}`,
                      ]}
                      labelFormatter={(_label: any, payload: any) =>
                        `${monthNames[payload[0].payload.month - 1]}, ${payload[0].payload.year}`
                      }
                      labelStyle={{
                        fontSize: "18px",
                        fontFamily: "Poppins",
                      }}
                      itemStyle={{
                        fontSize: "16px",
                        fontFamily: "Poppins",
                      }}
                      contentStyle={{
                        borderRadius: "8px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="search_volume"
                      fill="#052f4a99"
                      stroke="#052f4a"
                      strokeWidth={1.5}
                      animationDuration={500}
                    />
                  </ComposedChart>
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
                <Tooltip
                  className="p-0"
                  content={
                    <div className="flex min-w-52 items-stretch">
                      <div className="flex min-w-10 flex-col gap-1 border-r-2 border-slate-200 px-3 py-2">
                        <div className="font-medium">Male</div>
                        <div className="max-w-60 text-sm">
                          {Math.round(
                            data.searchVolume *
                              (data.genderDistribution.male / 100),
                          ).toLocaleString(navigator.language)}{" "}
                          ({data.genderDistribution.male ?? 0}%)
                        </div>
                      </div>
                      <div className="flex min-w-10 flex-col gap-1 px-3 py-2">
                        <div className="font-medium">Female</div>
                        <div className="max-w-60 text-sm">
                          {Math.round(
                            data.searchVolume *
                              (data.genderDistribution.female / 100),
                          ).toLocaleString(navigator.language)}{" "}
                          ({data.genderDistribution.female ?? 0}%)
                        </div>
                      </div>
                    </div>
                  }
                >
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
                </Tooltip>
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
                      <div className="min-w-12 shrink-0 text-lg">{key}</div>
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
    </>
  );
};

export default memo(KeywordOverview);
