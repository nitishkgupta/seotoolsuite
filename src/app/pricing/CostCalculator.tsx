"use client";

import { Slider } from "@heroui/react";
import { memo, useCallback, useState } from "react";

const CostCalculator = () => {
  const [kwOverviewReports, setKwOverviewReports] = useState<number>(100);
  const kwOverviewCreditsCost: number = parseFloat(
    Number(0.0241 * kwOverviewReports).toFixed(4),
  );

  const [kwSuggestionsReports, setKwSuggestionsReports] = useState<number>(50);
  const kwSuggestionsCreditsCost: number = parseFloat(
    Number(0.042 * kwSuggestionsReports).toFixed(4),
  );

  const dateFromFormatted = "2020-10-01";
  const dateFrom = new Date(dateFromFormatted);
  const currentDate = new Date();
  const dataMonthsCount =
    (currentDate.getFullYear() - dateFrom.getFullYear()) * 12 +
    (currentDate.getMonth() - dateFrom.getMonth()) +
    1;
  const [trafficOverviewReports, setTrafficOverviewReports] =
    useState<number>(15);
  const trafficOverviewCreditsCost: number = parseFloat(
    Number((0.12 + dataMonthsCount * 0.0012) * trafficOverviewReports).toFixed(
      4,
    ),
  );

  const [rankedKeywordsReports, setRankedKeywordsReports] =
    useState<number>(50);
  const rankedKeywordsCreditsCost: number = parseFloat(
    Number(0.042 * rankedKeywordsReports).toFixed(4),
  );

  const totalReports: number =
    kwOverviewReports +
    kwSuggestionsReports +
    trafficOverviewReports +
    rankedKeywordsReports;
  const totalRows: number =
    kwOverviewReports +
    kwSuggestionsReports * 250 +
    trafficOverviewReports +
    rankedKeywordsReports * 250;
  const totalCreditsCost: number = parseFloat(
    Number(
      kwOverviewCreditsCost +
        kwSuggestionsCreditsCost +
        trafficOverviewCreditsCost +
        rankedKeywordsCreditsCost,
    ).toFixed(4),
  );

  const handleKWOverviewReportsChange = useCallback(
    (reports: number | number[]) => {
      if (typeof reports === "number") setKwOverviewReports(reports);
    },
    [],
  );

  const handleKWSuggestionsReportsChange = useCallback(
    (reports: number | number[]) => {
      if (typeof reports === "number") setKwSuggestionsReports(reports);
    },
    [],
  );

  const handleTrafficOverviewReportsChange = useCallback(
    (reports: number | number[]) => {
      if (typeof reports === "number") setTrafficOverviewReports(reports);
    },
    [],
  );

  const handleRankedKeywordsReportsChange = useCallback(
    (reports: number | number[]) => {
      if (typeof reports === "number") setRankedKeywordsReports(reports);
    },
    [],
  );

  return (
    <div className="cost-calculator w-full">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-slate-200 px-4 py-3">
        <h2 className="text-xl font-semibold lg:text-3xl">Cost Calculator</h2>
        <div className="bg-default/40 rounded-full px-3 py-1 text-base">
          Credits: <b className="font-semibold">${totalCreditsCost}</b>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col gap-3 border-slate-200 p-4">
          <h3 className="flex items-center justify-between font-medium">
            <span>Keyword Overview</span>
            <div className="bg-default/40 rounded-full px-3 py-1 text-sm">
              <b className="font-medium">${kwOverviewCreditsCost}</b>
            </div>
          </h3>
          <div className="w-full px-2">
            <Slider
              value={kwOverviewReports}
              onChange={handleKWOverviewReportsChange}
              minValue={0}
              label="Reports"
              maxValue={1000}
              step={1}
              showTooltip
              size="md"
            ></Slider>
          </div>
        </div>
        <div className="flex flex-col gap-3 border-t-2 border-slate-200 p-4">
          <h3 className="flex items-center justify-between font-medium">
            <span>Keyword Suggestions (250 Rows)</span>
            <div className="bg-default/40 rounded-full px-3 py-1 text-sm">
              <b className="font-medium">${kwSuggestionsCreditsCost}</b>
            </div>
          </h3>
          <div className="w-full px-2">
            <Slider
              value={kwSuggestionsReports}
              onChange={handleKWSuggestionsReportsChange}
              minValue={0}
              label="Reports"
              maxValue={1000}
              step={1}
              showTooltip
              size="md"
            ></Slider>
          </div>
        </div>
        <div className="flex flex-col gap-3 border-t-2 border-slate-200 p-4">
          <h3 className="flex items-center justify-between font-medium">
            <span>Traffic Overview</span>
            <div className="bg-default/40 rounded-full px-3 py-1 text-sm">
              <b className="font-medium">${trafficOverviewCreditsCost}</b>
            </div>
          </h3>
          <div className="w-full px-2">
            <Slider
              value={trafficOverviewReports}
              onChange={handleTrafficOverviewReportsChange}
              minValue={0}
              label="Reports"
              maxValue={1000}
              step={1}
              showTooltip
              size="md"
            ></Slider>
          </div>
        </div>
        <div className="flex flex-col gap-3 border-t-2 border-slate-200 p-4">
          <h3 className="flex items-center justify-between font-medium">
            <span>Ranked Keywords (250 Rows)</span>
            <div className="bg-default/40 rounded-full px-3 py-1 text-sm">
              <b className="font-medium">${rankedKeywordsCreditsCost}</b>
            </div>
          </h3>
          <div className="w-full px-2">
            <Slider
              value={rankedKeywordsReports}
              onChange={handleRankedKeywordsReportsChange}
              minValue={0}
              label="Reports"
              maxValue={1000}
              step={1}
              showTooltip
              size="md"
            ></Slider>
          </div>
        </div>
        <div className="flex flex-col gap-3 border-t-2 border-slate-200 p-4">
          <h3 className="flex items-center justify-between font-medium">
            <span>Keyword Autocomplete</span>
            <div className="bg-default/40 rounded-full px-3 py-1 text-xs">
              <b className="font-medium">FREE</b>
            </div>
          </h3>
        </div>
        <div className="flex flex-col gap-3 border-t-2 border-slate-200 p-4">
          <h3 className="flex items-center justify-between font-medium">
            <span>Bulk DR Checker</span>
            <div className="bg-default/40 rounded-full px-3 py-1 text-xs">
              <b className="font-medium">FREE</b>
            </div>
          </h3>
        </div>
      </div>
      <div className="border-t-2 border-slate-200 p-4 text-base lg:text-lg">
        - That&apos;s only <b className="font-medium">${totalCreditsCost}</b>{" "}
        for{" "}
        <b className="font-medium">
          {totalReports.toLocaleString(navigator.language)} fresh reports,
        </b>{" "}
        with a total of{" "}
        <b className="font-medium">
          {totalRows.toLocaleString(navigator.language)} rows fetched
        </b>
        .
        <br />- Cached reports don&apos;t cost anything.
        <br />- Top up your DataForSEO credits whenever you like - they never
        expire.
      </div>
    </div>
  );
};

export default memo(CostCalculator);
