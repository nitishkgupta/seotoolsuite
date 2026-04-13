"use client";

import useDFSBalance from "@/hooks/useDFSBalance";
import DataForSEO from "@/services/DataForSEO";
import {
  getDataForSEOLanguages,
  getDataForSEOLocations,
} from "@/utils/dataforseo";
import demographyIcon from "@/assets/icons/demography.svg";
import { getFlagImageUrl } from "@/utils/flags";
import { getLocalStorageItem } from "@/utils/localStorage";
import { trackUmamiEvent } from "@/utils/umami";
import {
  Alert,
  Autocomplete,
  AutocompleteItem,
  Button,
  Chip,
  Form,
  Input,
  Skeleton,
  Tooltip,
} from "@heroui/react";
import {
  BadgeDollarSignIcon,
  BinocularsIcon,
  BookOpenTextIcon,
  BoxIcon,
  ChartNoAxesCombinedIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CircleStarIcon,
  ClockIcon,
  DatabaseZapIcon,
  DiffIcon,
  MegaphoneIcon,
  MinusIcon,
  PlusIcon,
  TextSearchIcon,
  TrendingUpIcon,
  UsersIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { MONTH_NAMES } from "@/constants";
import { HistoricalRankOverviewItem } from "@/types/DFS/HistoricalRankOverview";
import GenderDistributionChart from "@/components/charts/GenderDistributionChart";
import AgeDistributionChart from "@/components/charts/AgeDistributionChart";
import HistoricalRankTrendChart from "@/components/charts/HistoricalRankTrendChart";
import { formatNumberToWord } from "@/utils/chart";
import HistoricalRankChangesChart from "@/components/charts/HistoricalRankChangesChart";
import HistoricalRankPositionChart from "@/components/charts/HistoricalRankPositionChart";

type TrafficOverviewData = {
  historicalRankOverviewData: HistoricalRankOverviewItem[];
};

const TrafficOverviewTool = ({
  searchParams,
}: {
  searchParams?: Promise<{
    target?: string;
    location_code?: string;
    language_code?: string;
  }>;
}) => {
  const { refreshDFSBalance } = useDFSBalance(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<TrafficOverviewData | null>(null);
  const latestRankOverviewData: HistoricalRankOverviewItem | null =
    useMemo(() => {
      return data?.historicalRankOverviewData?.[0] ?? null;
    }, [data]);
  const secondLatestRankOverviewData: HistoricalRankOverviewItem | null =
    useMemo(() => {
      return data?.historicalRankOverviewData?.[1] ?? null;
    }, [data]);
  const [error, setError] = useState<string | null>(null);

  const dfsUsername = getLocalStorageItem("DATAFORSEO_USERNAME");
  const dfsPassword = getLocalStorageItem("DATAFORSEO_PASSWORD");
  const dfsSandboxEnabled =
    getLocalStorageItem("DATAFORSEO_SANDBOX") === "true";
  const cachingEnabled = getLocalStorageItem("CACHING_ENABLED") === "true";
  const cachingDuration: number =
    Number(getLocalStorageItem("TRAFFIC_OVERVIEW_CACHING_DURATION")) ?? 30;

  const locations = getDataForSEOLocations();
  const languages = getDataForSEOLanguages();

  const dateFromFormatted = "2020-10-01";
  const dateFrom = new Date(dateFromFormatted);
  const currentDate = new Date();
  const dataMonthsCount =
    (currentDate.getFullYear() - dateFrom.getFullYear()) * 12 +
    (currentDate.getMonth() - dateFrom.getMonth()) +
    1;
  const [selectedTarget, setSelectedTarget] = useState<string>("");
  const [selectedLocationKey, setSelectedLocationKey] =
    useState<string>("2356");
  const [selectedLanguageKey, setSelectedLanguageKey] = useState<string>("en");

  const [formInput, setFormInput] = useState<{
    target?: string;
    location_code?: string;
    language_code?: string;
  }>({});

  const handleFormSubmit = useCallback(
    async (e: React.SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();

      let target: string = selectedTarget;
      target = target.replace("https://", "").replace("http://", "");
      const location_code: string = selectedLocationKey;
      const language_code: string = selectedLanguageKey;

      if (!target || !location_code || !language_code) {
        return;
      }

      setSelectedTarget(target);

      setFormInput({
        target,
        location_code,
        language_code,
      });
    },
    [selectedTarget, selectedLocationKey, selectedLanguageKey],
  );

  useEffect(() => {
    const getTrafficOverview = async (
      target: string,
      location_code: number,
      language_code: string,
    ) => {
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
          trackUmamiEvent("competitive-research/traffic-overview");
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

        const apiResponse = await DataForSEOService.getHistoricalRankOverview(
          target,
          location_code,
          language_code,
          dateFromFormatted,
          true,
          cachingDuration,
        );

        const taskStatusCode = apiResponse?.tasks[0]?.status_code;
        const taskStatusMessage =
          apiResponse?.tasks[0]?.status_message ?? "Unknown error.";

        if (taskStatusCode !== 20000) {
          setError(`DataForSEO API error: ${taskStatusMessage}`);
          return;
        }

        const apiData = apiResponse?.tasks[0]?.result[0] ?? null;
        const historicalRankItems = apiData.items;

        if (historicalRankItems) {
          const trafficOverviewData: TrafficOverviewData = {
            historicalRankOverviewData: historicalRankItems,
          };

          setData(trafficOverviewData);

          window.setTimeout(() => {
            document.getElementById("traffic-overview-data")?.scrollIntoView({
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
      formInput.target &&
      formInput.location_code &&
      formInput.language_code
    ) {
      getTrafficOverview(
        formInput.target,
        Number(formInput.location_code),
        formInput.language_code,
      );
    }
  }, [
    dateFromFormatted,
    formInput.target,
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
      searchParams.then(({ target, location_code, language_code }) => {
        if (target && location_code && language_code) {
          let targetDomain: string = target;
          targetDomain = targetDomain
            .replace("https://", "")
            .replace("http://", "");
          setSelectedTarget(targetDomain);
          setSelectedLocationKey(location_code);
          setSelectedLanguageKey(language_code);
          setFormInput({
            target,
            location_code,
            language_code,
          });
        }
      });
    }
  }, [searchParams]);

  return (
    <div className="traffic-overview-tool relative w-full px-4 py-4 lg:px-8 lg:py-8">
      <div className="tool-form-container relative flex w-full flex-col items-start justify-start rounded-md border-2 border-slate-200 bg-white p-5">
        <div className="absolute top-4 right-4 flex w-fit items-center gap-2">
          <Tooltip content="Credits Cost (Uncached)">
            <Chip size="md" variant="flat">
              ${0.2 + dataMonthsCount * 0.001}
            </Chip>
          </Tooltip>
          {(dfsSandboxEnabled || cachingEnabled) && (
            <div className="h-6 w-0.5 rounded-md bg-slate-200"></div>
          )}
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
        <div className="flex flex-col items-start gap-2 md:flex-row md:items-center">
          <div className="flex items-center gap-2 rounded-md border bg-sky-950 p-2 md:p-3">
            <BinocularsIcon
              size={28}
              className="animate-appearance-in scale-90 text-white"
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
              Traffic Overview
            </div>
            <div className="text-base font-medium text-slate-500">
              Analyze website traffic metrics with clickstream data.
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
                  name="target"
                  variant="flat"
                  type="text"
                  label="Target"
                  isDisabled={isLoading}
                  value={selectedTarget}
                  onValueChange={setSelectedTarget}
                  placeholder="example.com"
                  autoFocus
                  isRequired
                />
                <Autocomplete
                  name="location"
                  variant="flat"
                  label="Location"
                  isDisabled={isLoading}
                  isRequired
                  value={selectedLocationKey}
                  onChange={(key: any) =>
                    setSelectedLocationKey(key.target.value)
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
                  value={selectedLanguageKey}
                  onChange={(key: any) =>
                    setSelectedLanguageKey(key.target.value)
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
        <>
          <Skeleton className="mt-4 h-[1000px] w-full rounded-md lg:mt-8 lg:h-[480px]" />
          <Skeleton className="mt-4 h-[1000px] w-full rounded-md lg:mt-8 lg:h-[480px]" />
        </>
      )}
      {!isLoading &&
        !error &&
        data &&
        latestRankOverviewData &&
        secondLatestRankOverviewData && (
          <div
            className="mt-4 w-full scroll-m-4 rounded-md border-2 border-slate-200 bg-white lg:mt-8 lg:scroll-m-8"
            id="traffic-overview-data"
          >
            <div className="flex flex-row flex-wrap items-stretch justify-between gap-3 border-b-2 border-slate-200 px-4 py-3">
              <div className="flex items-center gap-2">
                <BookOpenTextIcon size={20} />
                <span className="text-base lg:text-lg">Organic Overview</span>
              </div>
              <div className="flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1">
                <ClockIcon size={16} />
                <span className="text-sm lg:text-base">
                  {latestRankOverviewData
                    ? `${MONTH_NAMES[latestRankOverviewData.month - 1]}, ${latestRankOverviewData.year}`
                    : "N/A"}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 items-stretch border-b-2 border-slate-200 lg:grid-cols-4">
              <div className="flex flex-col justify-between border-b-2 border-slate-200 p-4 lg:border-r-2 lg:border-b-0">
                <div className="flex items-center gap-2">
                  <TrendingUpIcon size={18} />
                  Monthly Organic Traffic
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-1">
                  <span className="text-xl lg:text-3xl">
                    {Math.round(
                      latestRankOverviewData.metrics.organic.etv,
                    ).toLocaleString(navigator.language)}
                  </span>
                  {latestRankOverviewData.metrics.organic.etv -
                    secondLatestRankOverviewData.metrics.organic.etv !==
                    0 && (
                    <Tooltip content="Compared To Previous Month">
                      <span
                        className={`text-sm font-medium ${latestRankOverviewData.metrics.organic.etv - secondLatestRankOverviewData.metrics.organic.etv > 0 ? "text-green-500" : "text-red-500"}`}
                      >
                        {latestRankOverviewData.metrics.organic.etv -
                          secondLatestRankOverviewData.metrics.organic.etv >
                        0
                          ? "+"
                          : ""}
                        {formatNumberToWord(
                          Math.round(
                            latestRankOverviewData.metrics.organic.etv -
                              secondLatestRankOverviewData.metrics.organic.etv,
                          ),
                          2,
                        )}
                      </span>
                    </Tooltip>
                  )}
                </div>
              </div>
              <div className="flex flex-col justify-between border-b-2 border-slate-200 p-4 lg:border-r-2 lg:border-b-0">
                <div className="flex items-center gap-2">
                  <TextSearchIcon size={18} />
                  Ranked Keywords
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-1">
                  <span className="text-xl lg:text-3xl">
                    {latestRankOverviewData.metrics.organic.count.toLocaleString(
                      navigator.language,
                    )}
                  </span>
                  {latestRankOverviewData.metrics.organic.count -
                    secondLatestRankOverviewData.metrics.organic.count !==
                    0 && (
                    <Tooltip content="Compared To Previous Month">
                      <span
                        className={`text-sm font-medium ${latestRankOverviewData.metrics.organic.count - secondLatestRankOverviewData.metrics.organic.count > 0 ? "text-green-500" : "text-red-500"}`}
                      >
                        {latestRankOverviewData.metrics.organic.count -
                          secondLatestRankOverviewData.metrics.organic.count >
                        0
                          ? "+"
                          : ""}
                        {formatNumberToWord(
                          Math.round(
                            latestRankOverviewData.metrics.organic.count -
                              secondLatestRankOverviewData.metrics.organic
                                .count,
                          ),
                          2,
                        )}
                      </span>
                    </Tooltip>
                  )}
                </div>
              </div>
              <div className="flex flex-col justify-between border-b-2 border-slate-200 p-4 lg:border-r-2 lg:border-b-0">
                <div className="flex items-center gap-2">
                  <BadgeDollarSignIcon size={18} />
                  Est. Traffic Cost
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-1">
                  <div className="text-xl lg:text-3xl">
                    $
                    {Math.round(
                      latestRankOverviewData.metrics.organic
                        .estimated_paid_traffic_cost,
                    ).toLocaleString(navigator.language)}
                  </div>
                  {latestRankOverviewData.metrics.organic
                    .estimated_paid_traffic_cost -
                    secondLatestRankOverviewData.metrics.organic
                      .estimated_paid_traffic_cost !==
                    0 && (
                    <Tooltip content="Compared To Previous Month">
                      <span
                        className={`text-sm font-medium ${latestRankOverviewData.metrics.organic.estimated_paid_traffic_cost - secondLatestRankOverviewData.metrics.organic.estimated_paid_traffic_cost > 0 ? "text-green-500" : "text-red-500"}`}
                      >
                        {latestRankOverviewData.metrics.organic
                          .estimated_paid_traffic_cost -
                          secondLatestRankOverviewData.metrics.organic
                            .estimated_paid_traffic_cost >
                        0
                          ? "+"
                          : ""}
                        {formatNumberToWord(
                          Math.round(
                            latestRankOverviewData.metrics.organic
                              .estimated_paid_traffic_cost -
                              secondLatestRankOverviewData.metrics.organic
                                .estimated_paid_traffic_cost,
                          ),
                          2,
                        )}
                      </span>
                    </Tooltip>
                  )}
                </div>
              </div>
              <div className="flex flex-col justify-between border-slate-200 p-4">
                <div className="flex items-center gap-2">
                  <DiffIcon size={18} />
                  Ranking Changes
                </div>
                <div className="mt-4 flex w-full flex-wrap items-center gap-2">
                  <Tooltip content="New Keywords">
                    <div className="flex items-center gap-1 rounded-md text-sm font-medium text-green-700">
                      <PlusIcon size={16} />
                      {latestRankOverviewData.metrics.organic.is_new.toLocaleString(
                        navigator.language,
                      )}
                    </div>
                  </Tooltip>
                  <Tooltip content="Keywords Lost">
                    <div className="flex items-center gap-1 rounded-md text-sm font-medium text-red-700">
                      <MinusIcon size={16} />
                      {latestRankOverviewData.metrics.organic.is_lost.toLocaleString(
                        navigator.language,
                      )}
                    </div>
                  </Tooltip>
                </div>
                <div className="mt-0.5 flex w-full flex-wrap items-center gap-2">
                  <Tooltip content="Keywords Moved Up">
                    <div className="flex items-center gap-1 rounded-md text-sm font-medium text-green-500">
                      <ChevronUpIcon size={16} />
                      {latestRankOverviewData.metrics.organic.is_up.toLocaleString(
                        navigator.language,
                      )}
                    </div>
                  </Tooltip>
                  <Tooltip content="Keywords Moved Down">
                    <div className="flex items-center gap-1 rounded-md text-sm font-medium text-red-500">
                      <ChevronDownIcon size={16} />
                      {latestRankOverviewData.metrics.organic.is_down.toLocaleString(
                        navigator.language,
                      )}
                    </div>
                  </Tooltip>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 items-stretch border-b-2 border-slate-200">
              <div className="flex flex-col justify-between p-4 pb-1">
                <div className="flex items-center gap-2">
                  <ChartNoAxesCombinedIcon size={18} />
                  Historical Trend
                </div>
                <div className="mt-4 w-full">
                  {data && data.historicalRankOverviewData && (
                    <HistoricalRankTrendChart
                      data={data.historicalRankOverviewData}
                      sourceType="organic"
                      chartHeight={300}
                      xAxisLabelType="monthWithYear"
                      showAxis={true}
                      showAxisLine={true}
                      showTickLine={true}
                      showTooltip={true}
                      showCartesianGrid={true}
                      yAxisTickCount={10}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 items-stretch border-b-2 border-slate-200">
              <div className="flex flex-col justify-between p-4 pb-1">
                <div className="flex items-center gap-2">
                  <DiffIcon size={18} />
                  Ranking Changes Trend
                </div>
                <div className="mt-4 w-full">
                  {data && data.historicalRankOverviewData && (
                    <HistoricalRankChangesChart
                      data={data.historicalRankOverviewData}
                      sourceType="organic"
                      chartHeight={300}
                      xAxisLabelType="monthWithYear"
                      showAxis={true}
                      showAxisLine={true}
                      showTickLine={true}
                      showTooltip={true}
                      showCartesianGrid={true}
                      chartAnimation={false}
                      yAxisTickCount={9}
                    />
                  )}
                </div>
                <div className="my-2 flex w-full flex-wrap items-center justify-center gap-x-3 gap-y-2">
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-green-700"></div>
                    <span className="text-sm">New Keywords</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span className="text-sm">Keywords Moved Up</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-red-700"></div>
                    <span className="text-sm">Keywords Lost</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <span className="text-sm">Keywords Moved Down</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col justify-between border-b-2 border-slate-200 p-4 pb-1">
              <div className="flex items-center gap-2">
                <CircleStarIcon size={18} />
                Ranking Position Trend
              </div>
              <div className="mt-4 w-full">
                {data && data.historicalRankOverviewData && (
                  <HistoricalRankPositionChart
                    data={data.historicalRankOverviewData}
                    sourceType="organic"
                    chartHeight={300}
                    xAxisLabelType="monthWithYear"
                    showAxis={true}
                    showAxisLine={true}
                    showTickLine={true}
                    showTooltip={true}
                    showCartesianGrid={true}
                    yAxisTickCount={10}
                    chartAnimation={false}
                  />
                )}
              </div>
              <div className="my-2 flex w-full flex-wrap items-center justify-center gap-x-3 gap-y-2">
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-green-700"></div>
                  <span className="text-sm">Position 1-3</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span className="text-sm">Position 4-10</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <span className="text-sm">Position 11-50</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <span className="text-sm">Position 51-100</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 items-stretch border-slate-200 lg:grid-cols-2">
              <div className="flex flex-col justify-between border-b-2 border-slate-200 p-4 lg:border-r-2 lg:border-b-0">
                <div className="flex items-center gap-2">
                  <Image
                    src={demographyIcon}
                    alt="Demography"
                    className="w-5"
                  />
                  Gender Distribution
                </div>
                {latestRankOverviewData.metrics.organic
                  .clickstream_gender_distribution && (
                  <div className="mt-4">
                    <GenderDistributionChart
                      data={
                        latestRankOverviewData.metrics.organic
                          .clickstream_gender_distribution
                      }
                    />
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-between border-slate-200 p-4">
                <div className="flex items-center gap-2">
                  <UsersIcon size={18} />
                  Age Distribution
                </div>
                {latestRankOverviewData.metrics.organic
                  .clickstream_age_distribution ? (
                  <div className="mt-4">
                    <AgeDistributionChart
                      data={
                        latestRankOverviewData.metrics.organic
                          .clickstream_age_distribution
                      }
                    />
                  </div>
                ) : (
                  <div className="mt-4 text-xl lg:text-3xl">N/A</div>
                )}
              </div>
            </div>
          </div>
        )}
      {!isLoading &&
        !error &&
        data &&
        latestRankOverviewData &&
        secondLatestRankOverviewData && (
          <div
            className="mt-4 w-full scroll-m-4 rounded-md border-2 border-slate-200 bg-white lg:mt-8 lg:scroll-m-8"
            id="traffic-overview-data"
          >
            <div className="flex flex-row flex-wrap items-stretch justify-between gap-3 border-b-2 border-slate-200 px-4 py-3">
              <div className="flex items-center gap-2">
                <MegaphoneIcon size={20} />
                <span className="text-base lg:text-lg">Paid Overview</span>
              </div>
              <div className="flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1">
                <ClockIcon size={16} />
                <span className="text-sm lg:text-base">
                  {latestRankOverviewData
                    ? `${MONTH_NAMES[latestRankOverviewData.month - 1]}, ${latestRankOverviewData.year}`
                    : "N/A"}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 items-stretch border-b-2 border-slate-200 lg:grid-cols-4">
              <div className="flex flex-col justify-between border-b-2 border-slate-200 p-4 lg:border-r-2 lg:border-b-0">
                <div className="flex items-center gap-2">
                  <TrendingUpIcon size={18} />
                  Monthly Paid Traffic
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-1">
                  <span className="text-xl lg:text-3xl">
                    {Math.round(
                      latestRankOverviewData.metrics.paid.etv,
                    ).toLocaleString(navigator.language)}
                  </span>
                  {latestRankOverviewData.metrics.paid.etv -
                    secondLatestRankOverviewData.metrics.paid.etv !==
                    0 && (
                    <Tooltip content="Compared To Previous Month">
                      <span
                        className={`text-sm font-medium ${latestRankOverviewData.metrics.paid.etv - secondLatestRankOverviewData.metrics.paid.etv > 0 ? "text-green-500" : "text-red-500"}`}
                      >
                        {latestRankOverviewData.metrics.paid.etv -
                          secondLatestRankOverviewData.metrics.paid.etv >
                        0
                          ? "+"
                          : ""}
                        {formatNumberToWord(
                          Math.round(
                            latestRankOverviewData.metrics.paid.etv -
                              secondLatestRankOverviewData.metrics.paid.etv,
                          ),
                          2,
                        )}
                      </span>
                    </Tooltip>
                  )}
                </div>
              </div>
              <div className="flex flex-col justify-between border-b-2 border-slate-200 p-4 lg:border-r-2 lg:border-b-0">
                <div className="flex items-center gap-2">
                  <TextSearchIcon size={18} />
                  Paid Keywords
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-1">
                  <span className="text-xl lg:text-3xl">
                    {latestRankOverviewData.metrics.paid.count.toLocaleString(
                      navigator.language,
                    )}
                  </span>
                  {latestRankOverviewData.metrics.paid.count -
                    secondLatestRankOverviewData.metrics.paid.count !==
                    0 && (
                    <Tooltip content="Compared To Previous Month">
                      <span
                        className={`text-sm font-medium ${latestRankOverviewData.metrics.paid.count - secondLatestRankOverviewData.metrics.paid.count > 0 ? "text-green-500" : "text-red-500"}`}
                      >
                        {latestRankOverviewData.metrics.paid.count -
                          secondLatestRankOverviewData.metrics.paid.count >
                        0
                          ? "+"
                          : ""}
                        {formatNumberToWord(
                          Math.round(
                            latestRankOverviewData.metrics.paid.count -
                              secondLatestRankOverviewData.metrics.paid.count,
                          ),
                          2,
                        )}
                      </span>
                    </Tooltip>
                  )}
                </div>
              </div>
              <div className="flex flex-col justify-between border-b-2 border-slate-200 p-4 lg:border-r-2 lg:border-b-0">
                <div className="flex items-center gap-2">
                  <BadgeDollarSignIcon size={18} />
                  Est. Traffic Cost
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-1">
                  <div className="text-xl lg:text-3xl">
                    $
                    {Math.round(
                      latestRankOverviewData.metrics.paid
                        .estimated_paid_traffic_cost,
                    ).toLocaleString(navigator.language)}
                  </div>
                  {latestRankOverviewData.metrics.paid
                    .estimated_paid_traffic_cost -
                    secondLatestRankOverviewData.metrics.paid
                      .estimated_paid_traffic_cost !==
                    0 && (
                    <Tooltip content="Compared To Previous Month">
                      <span
                        className={`text-sm font-medium ${latestRankOverviewData.metrics.paid.estimated_paid_traffic_cost - secondLatestRankOverviewData.metrics.paid.estimated_paid_traffic_cost > 0 ? "text-green-500" : "text-red-500"}`}
                      >
                        {latestRankOverviewData.metrics.paid
                          .estimated_paid_traffic_cost -
                          secondLatestRankOverviewData.metrics.paid
                            .estimated_paid_traffic_cost >
                        0
                          ? "+"
                          : ""}
                        {formatNumberToWord(
                          Math.round(
                            latestRankOverviewData.metrics.paid
                              .estimated_paid_traffic_cost -
                              secondLatestRankOverviewData.metrics.paid
                                .estimated_paid_traffic_cost,
                          ),
                          2,
                        )}
                      </span>
                    </Tooltip>
                  )}
                </div>
              </div>
              <div className="flex flex-col border-slate-200 p-4">
                <div className="flex items-center gap-2">
                  <DiffIcon size={18} />
                  Ranking Changes
                </div>
                <div className="mt-4 flex w-full flex-wrap items-center gap-2">
                  <Tooltip content="New Keywords">
                    <div className="flex items-center gap-1 rounded-md text-lg font-medium text-green-700">
                      <PlusIcon size={16} />
                      {latestRankOverviewData.metrics.paid.is_new.toLocaleString(
                        navigator.language,
                      )}
                    </div>
                  </Tooltip>
                  <Tooltip content="Keywords Lost">
                    <div className="flex items-center gap-1 rounded-md text-lg font-medium text-red-700">
                      <MinusIcon size={16} />
                      {latestRankOverviewData.metrics.paid.is_lost.toLocaleString(
                        navigator.language,
                      )}
                    </div>
                  </Tooltip>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 items-stretch border-b-2 border-slate-200">
              <div className="flex flex-col justify-between p-4 pb-1">
                <div className="flex items-center gap-2">
                  <ChartNoAxesCombinedIcon size={18} />
                  Historical Trend
                </div>
                <div className="mt-4 w-full">
                  {data && data.historicalRankOverviewData && (
                    <HistoricalRankTrendChart
                      data={data.historicalRankOverviewData}
                      sourceType="paid"
                      chartHeight={300}
                      xAxisLabelType="monthWithYear"
                      showAxis={true}
                      showAxisLine={true}
                      showTickLine={true}
                      showTooltip={true}
                      showCartesianGrid={true}
                      yAxisTickCount={10}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 items-stretch border-b-2 border-slate-200">
              <div className="flex flex-col justify-between p-4 pb-1">
                <div className="flex items-center gap-2">
                  <DiffIcon size={18} />
                  Ranking Changes Trend
                </div>
                <div className="mt-4 w-full">
                  {data && data.historicalRankOverviewData && (
                    <HistoricalRankChangesChart
                      data={data.historicalRankOverviewData}
                      sourceType="paid"
                      chartHeight={300}
                      xAxisLabelType="monthWithYear"
                      showAxis={true}
                      showAxisLine={true}
                      showTickLine={true}
                      showTooltip={true}
                      showCartesianGrid={true}
                      chartAnimation={false}
                      yAxisTickCount={9}
                    />
                  )}
                </div>
                <div className="my-2 flex w-full flex-wrap items-center justify-center gap-x-3 gap-y-2">
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-green-700"></div>
                    <span className="text-sm">New Keywords</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-red-700"></div>
                    <span className="text-sm">Keywords Lost</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 items-stretch border-slate-200 lg:grid-cols-2">
              <div className="flex flex-col justify-between border-b-2 border-slate-200 p-4 lg:border-r-2 lg:border-b-0">
                <div className="flex items-center gap-2">
                  <Image
                    src={demographyIcon}
                    alt="Demography"
                    className="w-5"
                  />
                  Gender Distribution
                </div>
                {latestRankOverviewData.metrics.paid
                  .clickstream_gender_distribution && (
                  <div className="mt-4">
                    <GenderDistributionChart
                      data={
                        latestRankOverviewData.metrics.paid
                          .clickstream_gender_distribution
                      }
                    />
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-between border-slate-200 p-4">
                <div className="flex items-center gap-2">
                  <UsersIcon size={18} />
                  Age Distribution
                </div>
                {latestRankOverviewData.metrics.paid
                  .clickstream_age_distribution ? (
                  <div className="mt-4">
                    <AgeDistributionChart
                      data={
                        latestRankOverviewData.metrics.paid
                          .clickstream_age_distribution
                      }
                    />
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

export default memo(TrafficOverviewTool);
