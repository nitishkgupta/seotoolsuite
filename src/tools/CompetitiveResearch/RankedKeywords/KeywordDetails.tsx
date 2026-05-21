"use client";

import {
  BadgeDollarSign,
  BadgeDollarSignIcon,
  BadgeQuestionMark,
  Binoculars,
  ChartNoAxesCombined,
  Gauge,
  Info,
  LanguagesIcon,
  LinkIcon,
  MapPinIcon,
  Navigation,
  SearchIcon,
  Target,
  TrendingUp,
} from "lucide-react";
import { getDifficultyColor, getDifficultyText } from "@/utils/difficulty";
import { Tooltip } from "@heroui/react";
import { memo } from "react";
import SearchVolumeTrendChart from "@/components/charts/SearchVolumeTrendChart";
import {
  getDataForSEOLanguageFromCode,
  getDataForSEOLocationFromCode,
} from "@/utils/dataforseo";
import { RankedKeywordsItem } from "@/types/DFS/RankedKeywords";

const KeywordDetails = ({
  keywordData,
}: {
  keywordData: RankedKeywordsItem["keyword_data"] | null;
}) => {
  return keywordData ? (
    <>
      <div className="flex w-full flex-wrap items-center gap-2 border-b-2 border-slate-200 bg-white p-4">
        <div className="flex w-fit items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-base font-normal">
          <SearchIcon size={14} />
          {keywordData.keyword}
        </div>
        <div className="flex w-fit items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-base font-normal">
          <MapPinIcon size={14} />
          {
            getDataForSEOLocationFromCode(Number(keywordData.location_code!))
              ?.location_name
          }
        </div>
        <div className="flex w-fit items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-base font-normal">
          <LanguagesIcon size={14} />
          {
            getDataForSEOLanguageFromCode(keywordData.language_code)
              ?.language_name
          }
        </div>
      </div>
      <div className="flex w-full flex-col gap-4 p-4">
        <div className="rounded-md border-2 border-slate-200 bg-white">
          <div className="flex flex-row items-center gap-2 border-b-2 border-slate-200 px-4 py-3">
            <Gauge size={20} />
            <span className="text-base md:text-lg">SEO Difficulty</span>
          </div>
          <div className="p-4">
            {typeof keywordData.keyword_properties.keyword_difficulty ===
            "number" ? (
              <div className="flex w-full flex-col">
                <div
                  className="relative flex w-full items-center justify-center rounded-t-md border px-4 py-3 text-3xl font-medium"
                  style={{
                    color: getDifficultyColor(
                      keywordData.keyword_properties.keyword_difficulty,
                    ),
                    borderColor: getDifficultyColor(
                      keywordData.keyword_properties.keyword_difficulty,
                    ),
                  }}
                >
                  <div
                    className="scale-x-anim absolute top-0 left-0 h-full rounded-tl-md transition-all duration-500 ease-[ease]"
                    style={{
                      width: `${keywordData.keyword_properties.keyword_difficulty}%`,
                      backgroundColor: `color-mix(in oklch, ${getDifficultyColor(keywordData.keyword_properties.keyword_difficulty)}, white 60%)`,
                    }}
                  ></div>
                  <span className="relative z-10">
                    {keywordData.keyword_properties.keyword_difficulty}
                  </span>
                </div>
                <div
                  className="rounded-b-md border border-t-0 border-slate-200 px-4 py-1.5 text-center"
                  style={{
                    borderColor: getDifficultyColor(
                      keywordData.keyword_properties.keyword_difficulty,
                    ),
                  }}
                >
                  <div
                    className="text-sm font-semibold uppercase"
                    style={{
                      color: getDifficultyColor(
                        keywordData.keyword_properties.keyword_difficulty,
                      ),
                    }}
                  >
                    {getDifficultyText(
                      keywordData.keyword_properties.keyword_difficulty,
                    )}
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
              {typeof keywordData.keyword_info.search_volume === "number" ? (
                <span className="min-h-[26px]">
                  {keywordData.keyword_info.search_volume.toLocaleString(
                    navigator.language,
                  )}
                </span>
              ) : (
                <span>N/A</span>
              )}
              {keywordData.keyword_info.search_volume_trend.yearly ? (
                <Tooltip content="Search Volume Trend (Yearly)">
                  <span
                    className={`text-xs font-medium ${keywordData.keyword_info.search_volume_trend.yearly > 0 ? "text-green-500" : "text-red-500"}`}
                  >
                    {keywordData.keyword_info.search_volume_trend.yearly > 0
                      ? "+"
                      : ""}
                    {keywordData.keyword_info.search_volume_trend.yearly.toLocaleString(
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
              {typeof keywordData.search_intent_info.main_intent !==
                "string" && <span>N/A</span>}
              {keywordData.search_intent_info.main_intent ===
                "informational" && (
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
              {keywordData.search_intent_info.main_intent ===
                "navigational" && (
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
              {keywordData.search_intent_info.main_intent === "commercial" && (
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
              {keywordData.search_intent_info.main_intent ===
                "transactional" && (
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
              {typeof keywordData.keyword_info.cpc === "number"
                ? `$${Number(keywordData.keyword_info.cpc.toFixed(2))}`
                : "N/A"}
              {(typeof keywordData.keyword_info.low_top_of_page_bid ===
                "number" ||
                typeof keywordData.keyword_info.high_top_of_page_bid ===
                  "number") && (
                <div className="text-xs text-black/80">
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
                    <span>
                      $
                      {Number(
                        keywordData.keyword_info.low_top_of_page_bid.toFixed(2),
                      ) ?? "N/A"}
                    </span>
                  </Tooltip>{" "}
                  -{" "}
                  <Tooltip
                    content={
                      <div className="flex flex-col gap-1 p-1">
                        <div className="font-medium">High Top of Page Bid</div>
                        <div className="max-w-70 text-sm">
                          Maximum bid for the ad to be displayed at the top of
                          the first page.
                        </div>
                      </div>
                    }
                  >
                    <span>
                      $
                      {Number(
                        keywordData.keyword_info.high_top_of_page_bid.toFixed(
                          2,
                        ),
                      ) ?? "N/A"}
                    </span>
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
              {typeof keywordData.keyword_info.competition === "number"
                ? Math.round(keywordData.keyword_info.competition * 100)
                : "N/A"}
            </div>
          </div>
        </div>
        {keywordData.keyword_info.monthly_searches ? (
          <div className="rounded-md border-2 border-slate-200 bg-white">
            <div className="flex flex-row items-center gap-2 border-b-2 border-slate-200 px-4 py-3">
              <ChartNoAxesCombined size={20} />
              <span className="text-base md:text-lg">Search Volume Trend</span>
            </div>
            <div className="p-4">
              <SearchVolumeTrendChart
                data={keywordData.keyword_info.monthly_searches}
                chartType="bar"
                xAxisLabelType="month"
                chartHeight={250}
              />
            </div>
          </div>
        ) : null}
        {keywordData.avg_backlinks_info ? (
          <div className="rounded-md border-2 border-slate-200 bg-white">
            <div className="flex flex-row items-center gap-2 border-b-2 border-slate-200 px-4 py-3">
              <LinkIcon size={20} />
              <span className="text-base md:text-lg">SERP Backlinks Data</span>
            </div>
            <div className="flex flex-col gap-1 p-4">
              <div>
                Avg. Backlinks:{" "}
                {keywordData.avg_backlinks_info.backlinks
                  ? Math.round(
                      keywordData.avg_backlinks_info.backlinks,
                    ).toLocaleString(navigator.language)
                  : "N/A"}
              </div>
              <div>
                Avg. DoFollow Backlinks:{" "}
                {keywordData.avg_backlinks_info.dofollow
                  ? Math.round(
                      keywordData.avg_backlinks_info.dofollow,
                    ).toLocaleString(navigator.language)
                  : "N/A"}
              </div>
              <div>
                Avg. Referring Pages:{" "}
                {keywordData.avg_backlinks_info.referring_pages
                  ? Math.round(
                      keywordData.avg_backlinks_info.referring_pages,
                    ).toLocaleString(navigator.language)
                  : "N/A"}
              </div>
              <div>
                Avg. Referring Domains:{" "}
                {keywordData.avg_backlinks_info.referring_domains
                  ? Math.round(
                      keywordData.avg_backlinks_info.referring_domains,
                    ).toLocaleString(navigator.language)
                  : "N/A"}
              </div>
              <div>
                Avg. PageRank:{" "}
                {keywordData.avg_backlinks_info.rank
                  ? Math.round(
                      Math.sin(keywordData.avg_backlinks_info.rank / 636.62) *
                        100,
                    )
                  : "N/A"}
              </div>
              <div>
                Avg. DomainRank:{" "}
                {keywordData.avg_backlinks_info.main_domain_rank
                  ? Math.round(
                      Math.sin(
                        keywordData.avg_backlinks_info.main_domain_rank /
                          636.62,
                      ) * 100,
                    )
                  : "N/A"}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  ) : null;
};

export default memo(KeywordDetails);
