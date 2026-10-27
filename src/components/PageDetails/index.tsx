"use client";

import {
  BadgeDollarSignIcon,
  BookOpenTextIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CircleStarIcon,
  DiffIcon,
  FileIcon,
  LanguagesIcon,
  MapPinIcon,
  MegaphoneIcon,
  MinusIcon,
  PlusIcon,
  TextSearchIcon,
  TrendingUpIcon,
} from "lucide-react";
import { Tooltip } from "@heroui/react";
import { memo } from "react";
import RankPositionDistributionChart from "@/components/charts/RankPositionDistributionChart";
import {
  RelevantPagesItem,
  RelevantPagesMetricsData,
} from "@/types/DFS/RelevantPages";
import { RankedKeywordsMetricsData } from "@/types/DFS/RankedKeywords";
import {
  getDataForSEOLanguageFromCode,
  getDataForSEOLocationFromCode,
} from "@/utils/dataforseo";

function adaptMetricsData(
  data: RelevantPagesMetricsData,
): RankedKeywordsMetricsData {
  return {
    pos_1: data.pos_1,
    pos_2_3: data.pos_2_3,
    pos_4_10: data.pos_4_10,
    pos_11_20: data.pos_11_20,
    pos_21_30: data.pos_21_30,
    pos_31_40: data.pos_31_40,
    pos_41_50: data.pos_41_50,
    pos_51_60: data.pos_51_60,
    pos_61_70: data.pos_61_70,
    pos_71_80: data.pos_71_80,
    pos_81_90: data.pos_81_90,
    pos_91_100: data.pos_91_100,
    etv: data.etv,
    count: data.count,
    estimated_paid_traffic_cost: data.estimated_paid_traffic_cost,
    is_new: data.is_new,
    is_up: data.is_up,
    is_down: data.is_down,
    is_lost: data.is_lost,
  };
}

type MetricSectionProps = {
  title: string;
  icon: React.ReactNode;
  metrics: RelevantPagesMetricsData;
  type: "organic" | "paid";
};

const MetricsSection = ({ title, icon, metrics, type }: MetricSectionProps) => (
  <div className="rounded-md border-2 border-b-3 border-slate-200 bg-white">
    <div className="flex flex-row items-center gap-2 border-b-2 border-slate-200 px-4 py-3">
      {icon}
      <span className="text-base md:text-lg">{title}</span>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4">
      <div className="flex flex-col justify-between gap-2 border-r-2 border-b-2 border-slate-200 p-4 md:border-b-0">
        <div className="flex items-center gap-1 text-base">
          <TrendingUpIcon size={16} />
          Monthly Traffic
        </div>
        <div className="text-lg">
          {typeof metrics.etv === "number"
            ? metrics.etv.toLocaleString(navigator.language, {
                maximumFractionDigits: 0,
              })
            : "N/A"}
        </div>
      </div>
      <div className="flex flex-col justify-between gap-2 border-b-2 border-slate-200 p-4 md:border-r-2 md:border-b-0">
        <div className="flex items-center gap-1 text-base">
          <TextSearchIcon size={16} />
          Keywords
        </div>
        <div className="text-lg">
          {typeof metrics.count === "number"
            ? metrics.count.toLocaleString(navigator.language)
            : "N/A"}
        </div>
      </div>
      <div className="flex flex-col justify-between gap-2 border-r-2 border-slate-200 p-4">
        <div className="flex items-center gap-1 text-base">
          <BadgeDollarSignIcon size={16} />
          Traffic Cost
        </div>
        <div className="text-lg">
          {typeof metrics.estimated_paid_traffic_cost === "number"
            ? `$${metrics.estimated_paid_traffic_cost.toLocaleString(
                navigator.language,
                {
                  maximumFractionDigits: 0,
                },
              )}`
            : "N/A"}
        </div>
      </div>
      <div className="flex flex-col justify-between gap-2 p-4">
        <div className="flex items-center gap-1 text-base">
          <DiffIcon size={16} />
          Ranking Changes
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <Tooltip content="New Keywords">
            <span className="flex items-center gap-0.5 text-sm font-medium text-green-700">
              <PlusIcon size={12} />
              {(metrics.is_new ?? 0).toLocaleString(navigator.language)}
            </span>
          </Tooltip>
          {type === "organic" && (
            <Tooltip content="Keywords Moved Up">
              <span className="flex items-center gap-0.5 text-sm font-medium text-green-500">
                <ChevronUpIcon size={12} />
                {(metrics.is_up ?? 0).toLocaleString(navigator.language)}
              </span>
            </Tooltip>
          )}
          {type === "organic" && (
            <Tooltip content="Keywords Moved Down">
              <span className="flex items-center gap-0.5 text-sm font-medium text-red-500">
                <ChevronDownIcon size={12} />
                {(metrics.is_down ?? 0).toLocaleString(navigator.language)}
              </span>
            </Tooltip>
          )}
          {type === "paid" && (
            <Tooltip content="Keywords Lost">
              <span className="flex items-center gap-0.5 text-sm font-medium text-red-700">
                <MinusIcon size={12} />
                {(metrics.is_lost ?? 0).toLocaleString(navigator.language)}
              </span>
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  </div>
);

const PageDetails = ({
  pageItem,
  locationCode,
  languageCode,
}: {
  pageItem: RelevantPagesItem | null;
  locationCode: string;
  languageCode: string;
}) => {
  if (!pageItem) return null;

  const { metrics } = pageItem;
  const organic = metrics?.organic;
  const paid = metrics?.paid;

  return (
    <>
      <div className="flex w-full flex-wrap items-center gap-2 border-b-2 border-slate-200 bg-white p-4">
        <div className="flex w-fit items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-base font-normal break-all">
          <FileIcon size={14} className="shrink-0" />
          {pageItem.page_address.replace("https://", "").replace("http://", "")}
        </div>
        <div className="flex w-fit items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-base font-normal">
          <MapPinIcon size={14} />
          {getDataForSEOLocationFromCode(Number(locationCode))?.location_name}
        </div>
        <div className="flex w-fit items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-base font-normal">
          <LanguagesIcon size={14} />
          {getDataForSEOLanguageFromCode(languageCode)?.language_name}
        </div>
      </div>
      <div className="flex w-full flex-col gap-4 p-4">
        {organic && (
          <MetricsSection
            title="Organic Overview"
            icon={<BookOpenTextIcon size={20} />}
            metrics={organic}
            type="organic"
          />
        )}
        {organic && (
          <div className="rounded-md border-2 border-b-3 border-slate-200 bg-white">
            <div className="flex flex-row items-center gap-2 border-b-2 border-slate-200 px-4 py-3">
              <CircleStarIcon size={20} />
              <span className="text-base md:text-lg">
                Ranking Position Distribution
              </span>
            </div>
            <div className="pt-4 pr-4 pb-4">
              <RankPositionDistributionChart
                data={adaptMetricsData(organic)}
                chartHeight={200}
              />
            </div>
          </div>
        )}
        {paid && (
          <MetricsSection
            title="Paid Overview"
            icon={<MegaphoneIcon size={20} />}
            metrics={paid}
            type="paid"
          />
        )}
      </div>
    </>
  );
};

export default memo(PageDetails);
