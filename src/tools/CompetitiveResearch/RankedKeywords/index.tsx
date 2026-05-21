"use client";

import useDFSBalance from "@/hooks/useDFSBalance";
import {
  buildDataForSEORankedKeywordFilters,
  getDataForSEOLanguages,
  getDataForSEOLocations,
} from "@/utils/dataforseo";
import { getLocalStorageItem } from "@/utils/localStorage";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import RankedKeywordFilters, {
  RankedKeywordFiltersInitialValues,
} from "@/components/RankedKeywordFilters";
import { GridColDef } from "@mui/x-data-grid";
import {
  addToast,
  Alert,
  Autocomplete,
  AutocompleteItem,
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Pagination,
  Skeleton,
  Tooltip,
  useDisclosure,
} from "@heroui/react";
import Link from "next/link";
import {
  BadgeDollarSignIcon,
  BinocularsIcon,
  BookOpenTextIcon,
  BoxIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CircleStarIcon,
  ClipboardCopyIcon,
  DatabaseZapIcon,
  DiffIcon,
  EllipsisIcon,
  InfoIcon,
  LoaderPinwheelIcon,
  MinusIcon,
  NavigationIcon,
  PlusIcon,
  TextSearchIcon,
  TrendingUpIcon,
} from "lucide-react";
import { getDifficultyColor, getDifficultyText } from "@/utils/difficulty";
import { trackUmamiEvent } from "@/utils/umami";
import DataForSEO from "@/services/DataForSEO";
import Image from "next/image";
import { getFlagImageUrl } from "@/utils/flags";
import { DataGrid } from "@mui/x-data-grid";
import SearchVolumeTrendChart from "@/components/charts/SearchVolumeTrendChart";
import useDeepCompareEffect from "use-deep-compare-effect";
import KeywordDetails from "./KeywordDetails";
import {
  RankedKeywordsItem,
  RankedKeywordsMetrics,
} from "@/types/DFS/RankedKeywords";
import RankPositionDistributionChart from "@/components/charts/RankPositionDistributionChart";

type RankedKeywordsTableItem = RankedKeywordsItem & {
  id: number;
  wordsCount: number;
};

type RankedKeywordsData = {
  metrics: RankedKeywordsMetrics;
  keywords: RankedKeywordsTableItem[];
};

const RankedKeywordsTool = ({
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
  const [data, setData] = useState<RankedKeywordsData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const MAX_ROWS: number = Number(
    getLocalStorageItem("RANKED_KWS_MAX_ROWS") ?? 250,
  );
  const [totalResults, setTotalResults] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const offset = (currentPage - 1) * MAX_ROWS;
  const totalPages = Math.ceil(totalResults / MAX_ROWS);

  const dfsUsername = getLocalStorageItem("DATAFORSEO_USERNAME");
  const dfsPassword = getLocalStorageItem("DATAFORSEO_PASSWORD");
  const dfsSandboxEnabled =
    getLocalStorageItem("DATAFORSEO_SANDBOX") === "true";
  const cachingEnabled = getLocalStorageItem("CACHING_ENABLED") === "true";
  const cachingDuration: number =
    Number(getLocalStorageItem("RANKED_KWS_CACHING_DURATION")) ?? 30;

  const locations = getDataForSEOLocations();
  const languages = getDataForSEOLanguages(true);

  const [selectedTarget, setSelectedTarget] = useState<string>("");
  const [selectedLocationKey, setSelectedLocationKey] =
    useState<string>("2356");
  const [selectedLanguageKey, setSelectedLanguageKey] = useState<string>("en");

  const [activeKeywordData, setActiveKeywordData] = useState<
    RankedKeywordsItem["keyword_data"] | null
  >(null);
  const {
    isOpen: keywordDetailsModalOpen,
    onOpen: openKeywordDetailsModal,
    onOpenChange: setKeywordDetailsModalOpen,
  } = useDisclosure();

  const [activeRankedKeywordFilters, setActiveKeywordFilters] =
    useState<RankedKeywordFiltersInitialValues>();
  const activeRankedKeywordFiltersCount: number = activeRankedKeywordFilters
    ? Object.keys(activeRankedKeywordFilters).length
    : 0;

  const [formInput, setFormInput] = useState<{
    target?: string;
    location_code?: string;
    language_code?: string;
  }>({});

  const handleKeywordClipboardCopy = useCallback(async (keyword: string) => {
    if ("clipboard" in navigator) {
      await navigator.clipboard.writeText(keyword);
      addToast({
        title: "Keyword copied to clipboard.",
        color: "default",
      });
    }
  }, []);

  const handleFormSubmit = useCallback(
    async (e: React.SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const target: string = selectedTarget;
      const location_code: string = selectedLocationKey;
      const language_code: string = selectedLanguageKey;

      if (!target || !location_code || !language_code) {
        return;
      }

      setCurrentPage(1);
      setFormInput({
        target,
        location_code,
        language_code,
      });
      setActiveKeywordFilters({
        ...(formData.get("searchVolume-min") !== "" && {
          minSearchVolume: Number(formData.get("searchVolume-min") as any),
        }),
        ...(formData.get("searchVolume-max") !== "" && {
          maxSearchVolume: Number(formData.get("searchVolume-max") as any),
        }),
        ...(formData.get("cpc-min") !== "" && {
          minCPC: Number(formData.get("cpc-min") as any),
        }),
        ...(formData.get("cpc-max") !== "" && {
          maxCPC: Number(formData.get("cpc-max") as any),
        }),
        ...(formData.get("ppc-min") !== "" && {
          minPPC: Number(formData.get("ppc-min") as any),
        }),
        ...(formData.get("ppc-max") !== "" && {
          maxPPC: Number(formData.get("ppc-max") as any),
        }),
        ...(formData.get("kd-min") !== "" && {
          minKD: Number(formData.get("kd-min") as any),
        }),
        ...(formData.get("kd-max") !== "" && {
          maxKD: Number(formData.get("kd-max") as any),
        }),
        ...(formData.get("includeKeyword") !== "" &&
          formData.get("includeKeyword") !== null && {
            includeKeyword: formData.get("includeKeyword") as any,
          }),
        ...(formData.get("excludeKeyword") !== "" &&
          formData.get("excludeKeyword") !== null && {
            excludeKeyword: formData.get("excludeKeyword") as any,
          }),
        ...(formData.getAll("searchIntents[]") &&
          formData.getAll("searchIntents[]").length > 0 && {
            searchIntents: formData.getAll("searchIntents[]") as any,
          }),
        ...(formData.get("rank-pos-min") !== "" && {
          minRankedPosition: Number(formData.get("rank-pos-min") as any),
        }),
        ...(formData.get("rank-pos-max") !== "" && {
          maxRankedPosition: Number(formData.get("rank-pos-max") as any),
        }),
        ...(formData.get("est-traffic-min") !== "" && {
          minEstimatedTraffic: Number(formData.get("est-traffic-min") as any),
        }),
        ...(formData.get("est-traffic-max") !== "" && {
          maxEstimatedTraffic: Number(formData.get("est-traffic-max") as any),
        }),
      });
    },
    [selectedTarget, selectedLocationKey, selectedLanguageKey],
  );

  const getRankedKeywords = useCallback(
    async (
      target: string,
      location_code: string,
      language_code: string,
      rankedKeywordFilters: RankedKeywordFiltersInitialValues | undefined,
      limit: number,
      offset: number,
    ) => {
      setIsLoading(true);
      setError(null);

      window.setTimeout(() => {
        document.getElementById("ranked-overview-data")?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);

      if (!dfsUsername || !dfsPassword) {
        setError(
          "DataForSEO API not connected. Please add credentials from settings.",
        );
        return;
      }

      if (!dfsSandboxEnabled) {
        try {
          trackUmamiEvent("competitive-research/ranked-keywords");
        } catch (error) {
          console.error(error);
        }
      }

      try {
        const dfsRankedKeywordFilters = rankedKeywordFilters
          ? buildDataForSEORankedKeywordFilters(rankedKeywordFilters)
          : [];

        const DataForSEOService = new DataForSEO(
          dfsUsername,
          dfsPassword,
          dfsSandboxEnabled,
          cachingEnabled,
        );

        const apiResponse = await DataForSEOService.getRankedKeywords(
          target,
          Number(location_code),
          language_code,
          dfsRankedKeywordFilters,
          limit,
          offset,
          cachingDuration,
        );

        const taskStatusCode = apiResponse?.tasks[0]?.status_code;
        const taskStatusMessage =
          apiResponse?.tasks[0]?.status_message ?? "Unknown error.";

        if (taskStatusCode !== 20000) {
          setError(`DataForSEO API error: ${taskStatusMessage}`);
          return;
        }

        const data = apiResponse?.tasks[0]?.result[0] ?? null;

        if (data && data.items && data.items.length > 0) {
          const totalCount = data.total_count;
          setTotalResults(totalCount);
          const tableData: RankedKeywordsData["keywords"] = [];
          let rowId = 1 + offset;

          data.items.forEach((keywordSuggestionItem: RankedKeywordsItem) => {
            tableData.push({
              id: rowId,
              wordsCount:
                keywordSuggestionItem.keyword_data.keyword.split(" ").length,
              ...keywordSuggestionItem,
            });
            rowId++;
          });

          setData({
            metrics: data.metrics,
            keywords: tableData,
          });
        }

        window.setTimeout(() => {
          document.getElementById("ranked-overview-data")?.scrollIntoView({
            behavior: "smooth",
          });
        }, 100);

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
    },
    [
      dfsUsername,
      dfsPassword,
      dfsSandboxEnabled,
      cachingEnabled,
      refreshDFSBalance,
    ],
  );

  useDeepCompareEffect(() => {
    if (
      formInput.target &&
      formInput.location_code &&
      formInput.language_code
    ) {
      getRankedKeywords(
        formInput.target,
        formInput.location_code,
        formInput.language_code,
        activeRankedKeywordFilters,
        MAX_ROWS,
        offset,
      );
    }
  }, [
    formInput.target,
    formInput.location_code,
    formInput.language_code,
    activeRankedKeywordFilters,
    MAX_ROWS,
    offset,
    getRankedKeywords,
  ]);

  const getMUIRowHeight = useCallback(() => "auto", []);

  const getTogglableColumns = useCallback((columns: GridColDef[]) => {
    const hiddenColumns = [
      "rankingPage",
      "positionChange",
      "searchVolumeTrendYearly",
      "lowTopPageBid",
      "highTopPageBid",
    ];
    return columns
      .filter((column) => !hiddenColumns.includes(column.field))
      .map((column) => column.field);
  }, []);

  const dataGridSlotProps = useMemo(() => {
    return {
      toolbar: {
        csvOptions: {
          allColumns: true,
          fileName: `SEOToolSuite-ranked-keywords-${formInput.target}-${formInput.location_code}-${formInput.language_code}-${currentPage}`,
          escapeFormulas: false,
        },
      },
      columnsManagement: {
        getTogglableColumns,
      },
    };
  }, [
    formInput.target,
    formInput.location_code,
    formInput.language_code,
    currentPage,
    getTogglableColumns,
  ]);

  const dataGridInitialState = useMemo(() => {
    return {
      pagination: {
        paginationModel: { page: 0, pageSize: 25 },
      },
      columns: {
        columnVisibilityModel: {
          rankingPage: false,
          positionChange: false,
          searchVolumeTrendYearly: false,
          lowTopPageBid: false,
          highTopPageBid: false,
          wordsCount: false,
          volumeTrend: false,
        },
      },
    };
  }, []);

  const onDataGridPaginationModelChange = useCallback(() => {
    window.setTimeout(() => {
      document.getElementById("keywords-table")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  }, []);

  const tableColumns: GridColDef[] = useMemo(
    () => [
      {
        field: "id",
        headerName: "#",
        type: "number",
        align: "left",
        display: "flex",
        headerAlign: "left",
        width: 64,
      },
      {
        field: "keyword",
        headerName: "Keyword",
        minWidth: 350,
        type: "string",
        display: "flex",
        flex: 1,
        align: "left",
        headerAlign: "left",
        cellClassName: "min-h-12 relative group",
        valueGetter: (_, row) => row.keyword_data.keyword,
        renderCell: (params) => (
          <div className="flex w-full flex-col gap-2 py-2">
            <div className="flex w-full items-center justify-between gap-2">
              {params.value}
              <div>
                <Dropdown>
                  <DropdownTrigger>
                    <Button size="sm" isIconOnly variant="flat">
                      <EllipsisIcon size={16} />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu variant="flat">
                    <DropdownItem
                      key="keyword-copy"
                      onPress={() => handleKeywordClipboardCopy(params.value)}
                      startContent={<ClipboardCopyIcon size={16} />}
                    >
                      Copy Keyword
                    </DropdownItem>
                    <DropdownItem
                      key="keyword-details"
                      onPress={() => {
                        setActiveKeywordData(params.row.keyword_data);
                        openKeywordDetailsModal();
                      }}
                      startContent={<InfoIcon size={16} />}
                    >
                      Keyword Details
                    </DropdownItem>
                    <DropdownItem
                      key="keyword-overview"
                      href={`/tool/keyword-research/overview?keyword=${params.value}&location_code=${params.row.keyword_data.location_code}&language_code=${params.row.keyword_data.language_code}`}
                      target="_blank"
                      startContent={<BookOpenTextIcon size={16} />}
                    >
                      Keyword Overview
                    </DropdownItem>
                    <DropdownItem
                      key="keyword-suggestions"
                      href={`/tool/keyword-research/suggestions?keyword=${params.value}&location_code=${params.row.keyword_data.location_code}&language_code=${params.row.keyword_data.language_code}`}
                      target="_blank"
                      startContent={<TextSearchIcon size={18} />}
                    >
                      Keyword Suggestions
                    </DropdownItem>
                    <DropdownItem
                      key="autocomplete-suggestions"
                      href={`/tool/keyword-research/autocomplete?keyword=${params.value}&location_code=${params.row.keyword_data.location_code}&language_code=${params.row.keyword_data.language_code}`}
                      target="_blank"
                      startContent={<LoaderPinwheelIcon size={16} />}
                    >
                      Autocomplete Suggestions
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
            <Tooltip
              content={
                <div className="flex flex-col gap-1 py-1">
                  <div>{params.row.ranked_serp_element.serp_item.title}</div>
                  <div className="text-xs">
                    {params.row.ranked_serp_element.serp_item.url}
                  </div>
                  {params.row.ranked_serp_element.serp_item.backlinks_info && (
                    <>
                      <div className="my-1 h-px w-full bg-slate-200"></div>
                      <div className="flex flex-col gap-0.5 text-xs leading-normal">
                        <span>
                          <b className="font-medium">Domain Rank:</b>{" "}
                          {typeof params.row.ranked_serp_element.serp_item
                            .rank_info.main_domain_rank === "number"
                            ? Math.round(
                                Math.sin(
                                  params.row.ranked_serp_element.serp_item
                                    .rank_info.main_domain_rank / 636.62,
                                ) * 100,
                              )
                            : "N/A"}
                        </span>
                        <span>
                          <b className="font-medium">Page Rank:</b>{" "}
                          {typeof params.row.ranked_serp_element.serp_item
                            .rank_info.page_rank === "number"
                            ? Math.round(
                                Math.sin(
                                  params.row.ranked_serp_element.serp_item
                                    .rank_info.page_rank / 636.62,
                                ) * 100,
                              )
                            : "N/A"}
                        </span>
                        <span>
                          <b className="font-medium">Backlinks:</b>{" "}
                          {typeof params.row.ranked_serp_element.serp_item
                            .backlinks_info.backlinks === "number"
                            ? params.row.ranked_serp_element.serp_item.backlinks_info.backlinks.toLocaleString(
                                navigator.language,
                              )
                            : "N/A"}
                        </span>
                        <span>
                          <b className="font-medium">DoFollow Backlinks:</b>{" "}
                          {typeof params.row.ranked_serp_element.serp_item
                            .backlinks_info.dofollow === "number"
                            ? params.row.ranked_serp_element.serp_item.backlinks_info.dofollow.toLocaleString(
                                navigator.language,
                              )
                            : "N/A"}
                        </span>
                        <span>
                          <b className="font-medium">Referring Pages:</b>{" "}
                          {typeof params.row.ranked_serp_element.serp_item
                            .backlinks_info.referring_pages === "number"
                            ? params.row.ranked_serp_element.serp_item.backlinks_info.referring_pages.toLocaleString(
                                navigator.language,
                              )
                            : "N/A"}
                        </span>
                        <span>
                          <b className="font-medium">Referring Domains:</b>{" "}
                          {typeof params.row.ranked_serp_element.serp_item
                            .backlinks_info.referring_domains === "number"
                            ? params.row.ranked_serp_element.serp_item.backlinks_info.referring_domains.toLocaleString(
                                navigator.language,
                              )
                            : "N/A"}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              }
              placement="top"
            >
              <a
                href={params.row.ranked_serp_element.serp_item.url}
                target="_blank"
                rel="nofollow"
                className="block w-fit max-w-full overflow-hidden text-xs text-nowrap text-ellipsis text-black/80"
              >
                {params.row.ranked_serp_element.serp_item.url
                  .replace("https://", "")
                  .replace("http://", "")}
              </a>
            </Tooltip>
          </div>
        ),
      },
      {
        field: "rankingPage",
        headerName: "Page",
        type: "string",
        valueGetter: (_, row) => row.ranked_serp_element.serp_item.url,
      },
      {
        field: "wordsCount",
        display: "flex",
        headerName: "Words",
        description: "No. of Words In Keyword",
        type: "number",
        align: "left",
        headerAlign: "left",
        width: 100,
      },
      {
        field: "searchIntent",
        headerName: "Intent",
        description: "Search Intent",
        type: "string",
        display: "flex",
        flex: 1,
        minWidth: 80,
        maxWidth: 80,
        resizable: false,
        align: "left",
        headerAlign: "left",
        valueGetter: (_, row) =>
          row.keyword_data.search_intent_info.main_intent,
        renderCell: (params) => (
          <>
            {typeof params.value !== "string" ? (
              <div>N/A</div>
            ) : (
              <div className="search-intent-badge flex w-full min-w-8 items-center justify-center rounded-md border border-slate-200 bg-black/1 px-3 py-2">
                {params.value === "informational" && (
                  <Tooltip
                    content={
                      <div className="flex flex-col gap-1 p-1">
                        <div className="font-medium">Informational</div>
                        <div className="max-w-60 text-sm">
                          Users are seeking information or answers to certain
                          questions.
                        </div>
                      </div>
                    }
                  >
                    <InfoIcon size={18} />
                  </Tooltip>
                )}
                {params.value === "navigational" && (
                  <Tooltip
                    content={
                      <div className="flex flex-col gap-1 p-1">
                        <div className="font-medium">Navigational</div>
                        <div className="max-w-60 text-sm">
                          Users are looking for a specific site or page.
                        </div>
                      </div>
                    }
                  >
                    <NavigationIcon size={18} />
                  </Tooltip>
                )}
                {params.value === "commercial" && (
                  <Tooltip
                    content={
                      <div className="flex flex-col gap-1 p-1">
                        <div className="font-medium">Commercial</div>
                        <div className="max-w-60 text-sm">
                          Users are doing research before making a purchase
                          decision.
                        </div>
                      </div>
                    }
                  >
                    <BinocularsIcon size={18} />
                  </Tooltip>
                )}
                {params.value === "transactional" && (
                  <Tooltip
                    content={
                      <div className="flex flex-col gap-1 p-1">
                        <div className="font-medium">Transactional</div>
                        <div className="max-w-60 text-sm">
                          Users are completing a specific action, usually a
                          purchase.
                        </div>
                      </div>
                    }
                  >
                    <BadgeDollarSignIcon size={18} />
                  </Tooltip>
                )}
              </div>
            )}
          </>
        ),
      },
      {
        field: "searchVolume",
        headerName: "Volume",
        description: "Avg. Monthly Search Volume",
        type: "number",
        display: "flex",
        flex: 1,
        minWidth: 126,
        align: "left",
        headerAlign: "left",
        valueGetter: (_, row) => row.keyword_data.keyword_info.search_volume,
        renderCell: (params) => (
          <>
            {typeof params.value !== "number" ? (
              <div>N/A</div>
            ) : (
              <div className="flex flex-row flex-wrap items-center gap-1 py-2">
                {params.value.toLocaleString(navigator.language)}
                {params.row.keyword_data.keyword_info.search_volume_trend
                  .yearly ? (
                  <Tooltip content="Search Volume Trend (Yearly)">
                    <span
                      className={`text-xs ${params.row.keyword_data.keyword_info.search_volume_trend.yearly > 0 ? "text-green-500" : "text-red-500"}`}
                    >
                      {params.row.keyword_data.keyword_info.search_volume_trend
                        .yearly > 0
                        ? "+"
                        : ""}
                      {params.row.keyword_data.keyword_info.search_volume_trend.yearly.toLocaleString(
                        navigator.language,
                      )}
                      %
                    </span>
                  </Tooltip>
                ) : (
                  ""
                )}
              </div>
            )}
          </>
        ),
      },
      {
        field: "position",
        headerName: "Position",
        description: "Ranking Position",
        type: "number",
        display: "flex",
        flex: 1,
        minWidth: 80,
        maxWidth: 100,
        align: "left",
        headerAlign: "left",
        valueGetter: (_, row) => row.ranked_serp_element.serp_item.rank_group,
        renderCell: (params) => (
          <div className="flex items-center gap-2 py-2">
            <span>
              {typeof params.value === "number" ? params.value : "N/A"}
            </span>
            {params.row.ranked_serp_element.serp_item.rank_changes.is_new && (
              <Tooltip content="New Keyword">
                <span className="text-green-700">
                  <PlusIcon size={16} />
                </span>
              </Tooltip>
            )}
            {params.row.ranked_serp_element.serp_item.rank_changes.is_up && (
              <Tooltip content="Moved Up">
                <span className="text-green-500">
                  <ChevronUpIcon size={16} />
                </span>
              </Tooltip>
            )}
            {params.row.ranked_serp_element.serp_item.rank_changes.is_down && (
              <Tooltip content="Moved Down">
                <span className="text-red-500">
                  <ChevronDownIcon size={16} />
                </span>
              </Tooltip>
            )}
          </div>
        ),
      },
      {
        field: "positionChange",
        headerName: "Position Change",
        type: "string",
        valueGetter: (_, row) => {
          const rankChanges = row.ranked_serp_element.serp_item.rank_changes;

          if (rankChanges.is_new) return "New";
          if (rankChanges.is_up) return "Up";
          if (rankChanges.is_down) return "Down";
          return "";
        },
      },
      {
        field: "estimatedTraffic",
        headerName: "Traffic",
        description: "Estimated Traffic",
        type: "number",
        display: "flex",
        flex: 1,
        minWidth: 110,
        align: "left",
        headerAlign: "left",
        valueGetter: (_, row) => row.ranked_serp_element.serp_item.etv,
        renderCell: (params) => (
          <div className="py-2">
            {typeof params.value === "number"
              ? params.value.toLocaleString(navigator.language, {
                  maximumFractionDigits: 0,
                })
              : "N/A"}
          </div>
        ),
      },
      {
        field: "volumeTrend",
        disableExport: true,
        filterable: false,
        headerName: "Volume Trend",
        description: "Search Volume Trend",
        display: "flex",
        flex: 1,
        minWidth: 150,
        maxWidth: 150,
        align: "left",
        headerAlign: "left",
        renderCell: (params) => (
          <div className="flex w-full items-center">
            <SearchVolumeTrendChart
              data={params.row.keyword_data.keyword_info.monthly_searches}
              chartHeight={40}
              chartAnimation={false}
              xAxisLabelType="month"
              chartType="bar"
              showTooltip={false}
              showAxis={false}
              showAxisLine={false}
              showTickLine={false}
              showCartesianGrid={false}
            />
          </div>
        ),
      },
      {
        field: "searchVolumeTrendYearly",
        headerName: "Search Volume Trend (Yearly)",
        type: "number",
        valueGetter: (_, row) =>
          row.keyword_data.keyword_info.search_volume_trend.yearly,
      },
      {
        field: "cpc",
        headerName: "CPC",
        description: "Avg. Cost Per Click",
        type: "number",
        display: "flex",
        flex: 1,
        minWidth: 105,
        align: "left",
        headerAlign: "left",
        valueGetter: (_, row) =>
          Number(row?.keyword_data?.keyword_info?.cpc?.toFixed(2)) ?? null,
        renderCell: (params) => (
          <>
            {typeof params.value !== "number" ? (
              <div>N/A</div>
            ) : (
              <div className="flex w-full flex-col gap-1 py-2">
                <div>${params.value}</div>
                {(typeof params.row.keyword_data.keyword_info
                  .low_top_of_page_bid === "number" ||
                  typeof params.row.keyword_data.keyword_info
                    .high_top_of_page_bid === "number") && (
                  <div className="text-xs text-black/80">
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
                          params?.row?.keyword_data?.keyword_info?.low_top_of_page_bid?.toFixed(
                            2,
                          ),
                        ) ?? "N/A"}
                      </span>
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
                      <span>
                        $
                        {Number(
                          params?.row?.keyword_data?.keyword_info?.high_top_of_page_bid?.toFixed(
                            2,
                          ),
                        ) ?? "N/A"}
                      </span>
                    </Tooltip>
                  </div>
                )}
              </div>
            )}
          </>
        ),
      },
      {
        field: "lowTopPageBid",
        headerName: "Low Top of Page Bid",
        type: "number",
        valueGetter: (_, row) =>
          Number(
            row?.keyword_data?.keyword_info?.low_top_of_page_bid?.toFixed(2),
          ) ?? null,
      },
      {
        field: "highTopPageBid",
        headerName: "High Top of Page Bid",
        type: "number",
        valueGetter: (_, row) =>
          Number(
            row?.keyword_data?.keyword_info?.high_top_of_page_bid?.toFixed(2),
          ) ?? null,
      },
      {
        field: "ppc",
        headerName: "PPC",
        description: "Paid Competition",
        type: "number",
        display: "flex",
        flex: 1,
        minWidth: 80,
        maxWidth: 80,
        align: "left",
        headerAlign: "left",
        valueGetter: (_, row) => row.keyword_data.keyword_info.competition,
        valueFormatter: (value: number) =>
          typeof value === "number" ? Math.round(value * 100) : null,
        renderCell: (params) => (
          <>
            {typeof params.value !== "number" ? (
              <div>N/A</div>
            ) : (
              <div>{Math.round(params.value * 100)}</div>
            )}
          </>
        ),
      },
      {
        field: "keywordDifficulty",
        headerName: "KD",
        description: "SEO Difficulty",
        type: "number",
        align: "center",
        headerAlign: "left",
        display: "flex",
        flex: 1,
        minWidth: 64,
        maxWidth: 80,
        resizable: false,
        valueGetter: (_, row) =>
          row.keyword_data.keyword_properties.keyword_difficulty,
        renderCell: (params) => (
          <>
            {typeof params.value !== "number" ? (
              <div className="w-full px-2.5 text-center">N/A</div>
            ) : (
              <Tooltip content={getDifficultyText(params.value)}>
                <div
                  className="relative flex h-8 w-12 items-center justify-center rounded-md border text-center font-medium"
                  style={{
                    backgroundColor: `color-mix(in oklch, ${getDifficultyColor(params.value)}, white 90%)`,
                    color: getDifficultyColor(params.value),
                    borderColor: `color-mix(in oklch, ${getDifficultyColor(params.value)}, white 50%)`,
                  }}
                >
                  <span className="relative z-20">{params.value}</span>
                </div>
              </Tooltip>
            )}
          </>
        ),
      },
    ],
    [openKeywordDetailsModal],
  );

  useEffect(() => {
    if (searchParams) {
      searchParams.then(({ target, location_code, language_code }) => {
        if (target && location_code && language_code) {
          setSelectedTarget(target);
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
    <div className="ranked-keywords-tool relative w-full px-4 py-4 lg:px-8 lg:py-8">
      <div className="tool-form-container relative flex w-full flex-col items-start justify-start rounded-md border-2 border-slate-200 bg-white p-5">
        <div className="absolute top-4 right-4 flex w-fit items-center gap-2">
          <Tooltip content="Credits Cost (Uncached)">
            <Chip size="md" variant="flat">
              ${Number(0.01 + MAX_ROWS * 0.0001).toFixed(4)}
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
            <TextSearchIcon
              size={22}
              className="animate-appearance-in text-white"
              style={{ animationDelay: "200ms" }}
            />
          </div>
          <div className="flex flex-col items-start md:translate-y-0.5">
            <div className="text-xl font-medium text-sky-950 md:leading-none">
              Ranked Keywords
            </div>
            <div className="text-base font-medium text-slate-500">
              Get the keywords that a domain or page ranks for.
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
                  placeholder="example.com or https://example.com/page"
                  isDisabled={isLoading}
                  value={selectedTarget}
                  onValueChange={setSelectedTarget}
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
              <div className="keyword-filters-container mt-3 w-full">
                <RankedKeywordFilters
                  initialValues={activeRankedKeywordFilters}
                  activeFiltersCount={activeRankedKeywordFiltersCount}
                />
              </div>
            </Form>
          )}
        </div>
        {formInput.target &&
          formInput.location_code &&
          formInput.language_code && (
            <div className="mt-4 w-full">
              <div className="flex w-full flex-col flex-wrap items-start gap-2 rounded-md border border-slate-200 p-3 text-sm md:w-fit md:flex-row md:items-center">
                <div className="mr-1 flex items-center gap-1 border-slate-200 text-sm font-medium text-black/80 transition">
                  Other Reports:
                </div>
                <Link
                  prefetch={false}
                  href={`/tool/competitive-research/overview?target=${formInput.target}&location_code=${formInput.location_code}&language_code=${formInput.language_code}`}
                  target="_blank"
                  className="flex items-center gap-1 border-slate-200 text-black/80 transition hover:text-black"
                >
                  <BookOpenTextIcon size={16} /> Traffic Overview
                </Link>
              </div>
            </div>
          )}
      </div>
      {isLoading && (
        <>
          <Skeleton className="mt-4 h-110 w-full rounded-md lg:mt-8" />
          <Skeleton className="mt-4 h-[1500px] w-full rounded-md lg:mt-8" />
        </>
      )}
      {!isLoading && !error && data && (
        <div
          className="mt-4 w-full scroll-m-4 rounded-md border-2 border-slate-200 bg-white lg:mt-8 lg:scroll-m-8"
          id="ranked-overview-data"
        >
          <div className="flex flex-row flex-wrap items-stretch justify-between gap-3 border-b-2 border-slate-200 px-4 py-3">
            <div className="flex items-center gap-2">
              <BookOpenTextIcon size={20} />
              <span className="text-base lg:text-lg">Ranked Overview</span>
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
                  {Math.round(data.metrics.organic.etv).toLocaleString(
                    navigator.language,
                  )}
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-between border-b-2 border-slate-200 p-4 lg:border-r-2 lg:border-b-0">
              <div className="flex items-center gap-2">
                <TextSearchIcon size={18} />
                Ranked Keywords
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-1">
                <span className="text-xl lg:text-3xl">
                  {data.metrics.organic.count.toLocaleString(
                    navigator.language,
                  )}
                </span>
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
                    data.metrics.organic.estimated_paid_traffic_cost,
                  ).toLocaleString(navigator.language)}
                </div>
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
                    {data.metrics.organic.is_new.toLocaleString(
                      navigator.language,
                    )}
                  </div>
                </Tooltip>
                <Tooltip content="Keywords Moved Up">
                  <div className="flex items-center gap-1 rounded-md text-sm font-medium text-green-500">
                    <ChevronUpIcon size={16} />
                    {data.metrics.organic.is_up.toLocaleString(
                      navigator.language,
                    )}
                  </div>
                </Tooltip>
                <Tooltip content="Keywords Moved Down">
                  <div className="flex items-center gap-1 rounded-md text-sm font-medium text-red-500">
                    <ChevronDownIcon size={16} />
                    {data.metrics.organic.is_down.toLocaleString(
                      navigator.language,
                    )}
                  </div>
                </Tooltip>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col justify-between border-slate-200 p-4">
            <div className="flex items-center gap-2">
              <CircleStarIcon size={18} />
              Ranking Position Distribution
            </div>
            <div className="mt-4 w-full">
              <RankPositionDistributionChart
                data={data.metrics.organic}
                chartHeight={200}
              />
            </div>
          </div>
        </div>
      )}
      {!isLoading && !error && data && (
        <div className="tool-results-container mt-4 flex w-full flex-col gap-8 md:gap-4 lg:mt-8 lg:flex-row">
          <div
            className="tool-results-table-container h-fit w-full scroll-m-4 overflow-auto rounded-md border-2 border-slate-200 bg-white lg:scroll-m-8"
            id="keywords-table"
          >
            <div className="header flex w-full items-center gap-2 border-b-2 border-slate-200 px-4 py-3 text-base md:text-lg">
              <TextSearchIcon size={20} />
              <span>
                Ranked Keywords (
                {totalResults.toLocaleString(navigator.language)})
              </span>
            </div>
            <div className="max-h-full overflow-auto p-4">
              <DataGrid
                showCellVerticalBorder
                showColumnVerticalBorder
                rows={data.keywords}
                columns={tableColumns}
                initialState={dataGridInitialState}
                showToolbar
                disableRowSelectionOnClick
                getRowHeight={getMUIRowHeight}
                onPaginationModelChange={onDataGridPaginationModelChange}
                checkboxSelection
                slotProps={dataGridSlotProps}
              />
              <div className="mt-4 w-full text-center text-base text-black/70">
                Showing {offset + 1}-{offset + data.keywords.length} results of{" "}
                {totalResults.toLocaleString(navigator.language)}
              </div>
              {totalPages > 1 && (
                <div className="mt-3 flex items-center justify-center">
                  <Pagination
                    showControls
                    variant="light"
                    initialPage={currentPage}
                    total={totalPages}
                    onChange={setCurrentPage}
                    isDisabled={isLoading}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <Modal
        size="4xl"
        scrollBehavior="inside"
        backdrop="blur"
        isOpen={keywordDetailsModalOpen}
        onOpenChange={setKeywordDetailsModalOpen}
      >
        <ModalContent className="rounded-md">
          <ModalHeader className="border-b-2 border-slate-200">
            Keyword Details
          </ModalHeader>
          <ModalBody className="gap-0 rounded-b-md bg-slate-50 p-0">
            <KeywordDetails keywordData={activeKeywordData} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default memo(RankedKeywordsTool);
