"use client";

import {
  BadgeDollarSign,
  BadgeDollarSignIcon,
  BadgeQuestionMark,
  Binoculars,
  ChartNoAxesCombined,
  Gauge,
  Info,
  Languages,
  LinkIcon,
  Navigation,
  Search,
  Target,
  TrendingUp,
} from "lucide-react";
import { getDifficultyColor, getDifficultyText } from "@/utils/difficulty";
import { Tooltip } from "@heroui/react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
} from "recharts";
import { getDataForSEOLanguageFromCode } from "@/utils/dataforseo";
import { memo } from "react";

type KeywordSuggestionItem = {
  id: number;
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
};

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

const KeywordDetails = ({
  keywordData,
  hideLanguage = false,
}: {
  keywordData: KeywordSuggestionItem | null;
  hideLanguage?: boolean;
}) => {
  const monthlySearches = [...(keywordData?.monthlySearches || [])].reverse();
  return keywordData ? (
    <div className="flex w-full flex-col gap-4">
      <div className="rounded-md border-2 border-slate-200 bg-white">
        <div className="flex flex-row items-center justify-between gap-2 border-b-2 border-slate-200 px-4 py-3">
          <div className="flex flex-row items-center gap-2">
            <Search size={20} />
            <span className="text-base md:text-lg">Keyword</span>
          </div>
          {typeof keywordData.language_code === "string" && !hideLanguage && (
            <div className="flex flex-row items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-4 py-2">
              <Languages size={16} />
              <span className="text-sm">
                {
                  getDataForSEOLanguageFromCode(keywordData.language_code)
                    ?.language_name
                }
              </span>
            </div>
          )}
        </div>
        <div className="p-4">{keywordData.keyword}</div>
      </div>

      <div className="rounded-md border-2 border-slate-200 bg-white">
        <div className="flex flex-row items-center gap-2 border-b-2 border-slate-200 px-4 py-3">
          <Gauge size={20} />
          <span className="text-base md:text-lg">SEO Difficulty</span>
        </div>
        <div className="p-4">
          {typeof keywordData.keywordDifficulty === "number" ? (
            <div className="flex w-full flex-col">
              <div
                className="relative flex w-full items-center justify-center rounded-t-md border px-4 py-3 text-3xl font-medium"
                style={{
                  color: getDifficultyColor(keywordData.keywordDifficulty),
                  borderColor: getDifficultyColor(
                    keywordData.keywordDifficulty,
                  ),
                }}
              >
                <div
                  className="scale-x-anim absolute top-0 left-0 h-full rounded-tl-md transition-all duration-500 ease-[ease]"
                  style={{
                    width: `${keywordData.keywordDifficulty}%`,
                    backgroundColor: `color-mix(in oklch, ${getDifficultyColor(keywordData.keywordDifficulty)}, white 60%)`,
                  }}
                ></div>
                <span className="relative z-10">
                  {keywordData.keywordDifficulty}
                </span>
              </div>
              <div
                className="rounded-b-md border border-t-0 border-slate-200 px-4 py-1.5 text-center"
                style={{
                  borderColor: getDifficultyColor(
                    keywordData.keywordDifficulty,
                  ),
                }}
              >
                <div
                  className="text-sm font-semibold uppercase"
                  style={{
                    color: getDifficultyColor(keywordData.keywordDifficulty),
                  }}
                >
                  {getDifficultyText(keywordData.keywordDifficulty)}
                </div>
              </div>
            </div>
          ) : (
            <div>N/A</div>
          )}
        </div>
      </div>
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        <div className="w-full rounded-md border-2 border-slate-200 bg-white">
          <div className="flex flex-row items-center gap-2 border-b-2 border-slate-200 px-4 py-3">
            <TrendingUp size={20} />
            <span className="text-base">Volume</span>
          </div>
          <div className="flex items-center gap-1 overflow-auto p-4">
            {typeof keywordData.searchVolume === "number" ? (
              <span className="min-h-[26px]">
                {keywordData.searchVolume.toLocaleString(navigator.language)}
              </span>
            ) : (
              <span>N/A</span>
            )}
            {keywordData.searchVolumeTrend.yearly ? (
              <Tooltip content="Search Volume Trend (Yearly)">
                <span
                  className={`text-xs font-medium ${keywordData.searchVolumeTrend.yearly > 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {keywordData.searchVolumeTrend.yearly > 0 ? "+" : ""}
                  {keywordData.searchVolumeTrend.yearly.toLocaleString(
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
        <div className="w-full rounded-md border-2 border-slate-200 bg-white">
          <div className="flex flex-row items-center gap-2 border-b-2 border-slate-200 px-4 py-3">
            <BadgeQuestionMark size={20} />
            <span className="text-base">Intent</span>
          </div>
          <div className="flex items-center gap-1 overflow-auto p-4">
            {typeof keywordData.searchIntent !== "string" && <span>N/A</span>}
            {keywordData.searchIntent === "informational" && (
              <>
                <Info size={20} />
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
            {keywordData.searchIntent === "navigational" && (
              <>
                <Navigation size={20} />
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
            {keywordData.searchIntent === "commercial" && (
              <>
                <Binoculars size={20} />
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
            {keywordData.searchIntent === "transactional" && (
              <>
                <BadgeDollarSign size={20} />
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
      </div>
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        <div className="w-full rounded-md border-2 border-slate-200 bg-white">
          <div className="flex flex-row items-center gap-2 border-b-2 border-slate-200 px-4 py-3">
            <BadgeDollarSignIcon size={20} />
            <span className="text-base">CPC</span>
          </div>
          <div className="flex flex-wrap items-center gap-1 overflow-auto p-4">
            {typeof keywordData.cpc === "number"
              ? `$${keywordData.cpc}`
              : "N/A"}
            {(typeof keywordData.lowTopPageBid === "number" ||
              typeof keywordData.highTopPageBid === "number") && (
              <div className="text-xs text-black/80">
                |{" "}
                <Tooltip
                  content={
                    <div className="flex flex-col gap-1 p-1">
                      <div className="font-medium">Low Top of Page Bid</div>
                      <div className="max-w-70 text-sm">
                        Minimum bid for the ad to be displayed at the top of the
                        first page.
                      </div>
                    </div>
                  }
                >
                  <span>${keywordData.lowTopPageBid ?? "N/A"}</span>
                </Tooltip>{" "}
                -{" "}
                <Tooltip
                  content={
                    <div className="flex flex-col gap-1 p-1">
                      <div className="font-medium">High Top of Page Bid</div>
                      <div className="max-w-70 text-sm">
                        Maximum bid for the ad to be displayed at the top of the
                        first page.
                      </div>
                    </div>
                  }
                >
                  <span>${keywordData.highTopPageBid ?? "N/A"}</span>
                </Tooltip>
              </div>
            )}
          </div>
        </div>
        <div className="w-full rounded-md border-2 border-slate-200 bg-white">
          <div className="flex flex-row items-center gap-2 border-b-2 border-slate-200 px-4 py-3">
            <Target size={20} />
            <span className="text-base">PPC</span>
          </div>
          <div className="overflow-auto p-4">
            {typeof keywordData.ppc === "number"
              ? Math.round(keywordData.ppc * 100)
              : "N/A"}
          </div>
        </div>
      </div>
      {keywordData.monthlySearches ? (
        <div className="rounded-md border-2 border-slate-200 bg-white">
          <div className="flex flex-row items-center gap-2 border-b-2 border-slate-200 px-4 py-3">
            <ChartNoAxesCombined size={20} />
            <span className="text-base md:text-lg">Search Volume Trend</span>
          </div>
          <div className="p-4">
            <BarChart
              style={{ width: "100%", height: 300 }}
              data={monthlySearches}
              responsive
            >
              <CartesianGrid
                vertical={false}
                stroke="rgba(0, 0, 0, 0.1)"
                strokeWidth={1}
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickMargin={8}
                tickFormatter={(label) => monthNames[label - 1]}
                style={{
                  fontSize: "12px",
                  fontFamily: "Poppins",
                }}
              />
              <YAxis
                axisLine={false}
                tickCount={5}
                style={{
                  fontSize: "12px",
                  fontFamily: "Poppins",
                }}
                tickMargin={8}
                tickLine={false}
                tickFormatter={(value) =>
                  value.toLocaleString(navigator.language)
                }
              />
              <RechartsTooltip
                formatter={(value) => [
                  `${value?.toLocaleString(navigator.language)}`,
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
              <Bar
                dataKey="search_volume"
                fill="#052f4a"
                name="Search Volume"
                style={{
                  fontSize: "12px",
                  fontFamily: "Poppins",
                }}
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </div>
        </div>
      ) : null}
      {keywordData.avgBacklinksData ? (
        <div className="rounded-md border-2 border-slate-200 bg-white">
          <div className="flex flex-row items-center gap-2 border-b-2 border-slate-200 px-4 py-3">
            <LinkIcon size={20} />
            <span className="text-base md:text-lg">SERP Backlinks Data</span>
          </div>
          <div className="flex flex-col gap-1 p-4">
            <div>
              Avg. Backlinks:{" "}
              {keywordData.avgBacklinksData.backlinks
                ? Math.round(
                    keywordData.avgBacklinksData.backlinks,
                  ).toLocaleString(navigator.language)
                : "N/A"}
            </div>
            <div>
              Avg. DoFollow Backlinks:{" "}
              {keywordData.avgBacklinksData.dofollowBacklinks
                ? Math.round(
                    keywordData.avgBacklinksData.dofollowBacklinks,
                  ).toLocaleString(navigator.language)
                : "N/A"}
            </div>
            <div>
              Avg. Referring Pages:{" "}
              {keywordData.avgBacklinksData.referringPages
                ? Math.round(
                    keywordData.avgBacklinksData.referringPages,
                  ).toLocaleString(navigator.language)
                : "N/A"}
            </div>
            <div>
              Avg. Referring Domains:{" "}
              {keywordData.avgBacklinksData.referringDomains
                ? Math.round(
                    keywordData.avgBacklinksData.referringDomains,
                  ).toLocaleString(navigator.language)
                : "N/A"}
            </div>
            <div>
              Avg. PageRank:{" "}
              {keywordData.avgBacklinksData.pageRank
                ? Math.round(
                    Math.sin(keywordData.avgBacklinksData.pageRank / 636.62) *
                      100,
                  )
                : "N/A"}
            </div>
            <div>
              Avg. DomainRank:{" "}
              {keywordData.avgBacklinksData.domainRank
                ? Math.round(
                    Math.sin(keywordData.avgBacklinksData.domainRank / 636.62) *
                      100,
                  )
                : "N/A"}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  ) : null;
};

export default memo(KeywordDetails);
