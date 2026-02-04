"use client";

import useDFSBalance from "@/hooks/useDFSBalance";
import {
  buildDataForSEOKeywordFilters,
  getDataForSEOLanguages,
  getDataForSEOLocationFromCode,
  getDataForSEOLocations,
} from "@/utils/dataforseo";
import { getLocalStorageItem } from "@/utils/localStorage";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import KeywordFilters, {
  KeywordFiltersInitialValues,
} from "@/components/KeywordFilters";
import { GridColDef } from "@mui/x-data-grid";
import {
  Alert,
  Autocomplete,
  AutocompleteItem,
  Button,
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
  DatabaseZapIcon,
  InfoIcon,
  LoaderPinwheelIcon,
  NavigationIcon,
  TelescopeIcon,
  TextSearchIcon,
} from "lucide-react";
import { getDifficultyColor, getDifficultyText } from "@/utils/difficulty";
import { trackUmamiEvent } from "@/utils/umami";
import DataForSEO from "@/services/DataForSEO";
import Image from "next/image";
import { getFlagImageUrl } from "@/utils/flags";
import { DataGrid } from "@mui/x-data-grid";
import SearchVolumeChart from "@/components/SearchVolumeChart";
import useDeepCompareEffect from "use-deep-compare-effect";
import KeywordDetails from "./KeywordDetails";

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

type KeywordSuggestionsData = KeywordSuggestionItem[];

const KeywordSuggestionsTool = ({
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
  const [data, setData] = useState<KeywordSuggestionsData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const limit: number = 250;
  const [totalResults, setTotalResults] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const offset = (currentPage - 1) * limit;
  const totalPages = Math.ceil(totalResults / limit);

  const dfsUsername = getLocalStorageItem("DATAFORSEO_USERNAME");
  const dfsPassword = getLocalStorageItem("DATAFORSEO_PASSWORD");
  const dfsSandboxEnabled =
    getLocalStorageItem("DATAFORSEO_SANDBOX") === "true";
  const cachingEnabled = getLocalStorageItem("CACHING_ENABLED") === "true";

  const locations = getDataForSEOLocations();
  const languages = getDataForSEOLanguages(true);

  const [selectedKeyword, setSelectedKeyword] = useState<string>("");
  const [selectedLocationKey, setSelectedLocationKey] =
    useState<string>("2356");
  const [selectedLanguageKey, setSelectedLanguageKey] = useState<string>("en");

  const [activeKeywordData, setActiveKeywordData] =
    useState<KeywordSuggestionItem | null>(null);
  const {
    isOpen: keywordDetailsModalOpen,
    onOpen: openKeywordDetailsModal,
    onOpenChange: setKeywordDetailsModalOpen,
  } = useDisclosure();

  const [activeKeywordFilters, setActiveKeywordFilters] =
    useState<KeywordFiltersInitialValues>();
  const activeKeywordFiltersCount: number = activeKeywordFilters
    ? Object.keys(activeKeywordFilters).length
    : 0;

  const [formInput, setFormInput] = useState<{
    keyword?: string;
    location_code?: string;
    language_code?: string;
  }>({});

  const handleFormSubmit = useCallback(
    async (e: React.SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const keyword: string = selectedKeyword;
      const location_code: string = selectedLocationKey;
      const language_code: string = selectedLanguageKey;

      if (!keyword || !location_code || !language_code) {
        return;
      }

      setCurrentPage(1);
      setFormInput({
        keyword,
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
      });
    },
    [selectedKeyword, selectedLocationKey, selectedLanguageKey],
  );

  const getKeywordSuggestions = useCallback(
    async (
      keyword: string,
      location_code: string,
      language_code: string,
      keywordFilters: KeywordFiltersInitialValues | undefined,
      limit: number,
      offset: number,
    ) => {
      setIsLoading(true);

      window.setTimeout(() => {
        document.getElementById("keywords-table")?.scrollIntoView({
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
          trackUmamiEvent("keyword-research/suggestions", {
            location:
              getDataForSEOLocationFromCode(Number(location_code))
                ?.location_name ?? "N/A",
          });
        } catch (error) {
          console.error(error);
        }
      }

      try {
        const dfsKeywordFilters = keywordFilters
          ? buildDataForSEOKeywordFilters(keywordFilters)
          : [];

        const DataForSEOService = new DataForSEO(
          dfsUsername,
          dfsPassword,
          dfsSandboxEnabled,
          cachingEnabled,
        );

        const apiResponse = await DataForSEOService.getKeywordSuggestions(
          keyword,
          Number(location_code),
          language_code,
          dfsKeywordFilters,
          limit,
          offset,
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
          const tableData: KeywordSuggestionsData = [];
          let rowId = 1 + offset;

          data.items.forEach((keywordSuggestionItem: any) => {
            tableData.push({
              id: rowId,
              keyword: keywordSuggestionItem.keyword,
              location_code: keywordSuggestionItem.location_code,
              language_code: keywordSuggestionItem.language_code,
              searchVolume: keywordSuggestionItem.keyword_info.search_volume,
              ppc: keywordSuggestionItem.keyword_info.competition,
              ppcLevel: keywordSuggestionItem.keyword_info.competition_level,
              cpc: keywordSuggestionItem.keyword_info.cpc,
              lowTopPageBid:
                keywordSuggestionItem.keyword_info.low_top_of_page_bid ?? null,
              highTopPageBid:
                keywordSuggestionItem.keyword_info.high_top_of_page_bid ?? null,
              monthlySearches:
                keywordSuggestionItem.keyword_info.monthly_searches,
              searchVolumeTrend:
                keywordSuggestionItem.keyword_info?.search_volume_trend ?? null,
              searchIntent:
                keywordSuggestionItem.search_intent_info?.main_intent ?? null,
              keywordDifficulty:
                keywordSuggestionItem.keyword_properties?.keyword_difficulty ??
                null,
              avgBacklinksData: {
                backlinks:
                  keywordSuggestionItem.avg_backlinks_info?.backlinks ?? null,
                dofollowBacklinks:
                  keywordSuggestionItem.avg_backlinks_info?.dofollow ?? null,
                referringPages:
                  keywordSuggestionItem.avg_backlinks_info?.referring_pages ??
                  null,
                referringDomains:
                  keywordSuggestionItem.avg_backlinks_info?.referring_domains ??
                  null,
                pageRank:
                  keywordSuggestionItem.avg_backlinks_info?.rank ?? null,
                domainRank:
                  keywordSuggestionItem.avg_backlinks_info?.main_domain_rank ??
                  null,
              },
            });
            rowId++;
          });

          setData(tableData);
        }

        window.setTimeout(() => {
          document.getElementById("keywords-table")?.scrollIntoView({
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
      formInput.keyword &&
      formInput.location_code &&
      formInput.language_code
    ) {
      getKeywordSuggestions(
        formInput.keyword,
        formInput.location_code,
        formInput.language_code,
        activeKeywordFilters,
        limit,
        offset,
      );
    }
  }, [
    formInput.keyword,
    formInput.location_code,
    formInput.language_code,
    activeKeywordFilters,
    limit,
    offset,
    getKeywordSuggestions,
  ]);

  const getMUIRowHeight = useCallback(() => "auto", []);

  const getTogglableColumns = useCallback((columns: GridColDef[]) => {
    const hiddenColumns = [
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
          fileName: `SEOToolSuite-keyword-suggestions-${formInput.keyword}-${formInput.location_code}-${formInput.language_code}-${currentPage}`,
          escapeFormulas: false,
        },
      },
      columnsManagement: {
        getTogglableColumns,
      },
    };
  }, [
    formInput.keyword,
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
          searchVolumeTrendYearly: false,
          lowTopPageBid: false,
          highTopPageBid: false,
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
        renderCell: (params) => (
          <>
            <div className="flex w-full items-center justify-between gap-2 py-2">
              {params.value}
              <div className="top-0 right-2 bottom-0 z-50 my-auto flex h-fit shrink-0 items-center rounded-md border border-slate-200 bg-white shadow-xs transition group-hover:opacity-100 focus-visible:opacity-100 has-[.keyword-action:focus-visible]:opacity-100 lg:absolute lg:opacity-0">
                <Tooltip content="Keyword Details">
                  <button
                    onClick={() => {
                      setActiveKeywordData(params.row);
                      openKeywordDetailsModal();
                    }}
                    className="keyword-action cursor-pointer rounded-l-md border-r-1 border-slate-200 p-2 text-black transition"
                  >
                    <InfoIcon size={18} />
                  </button>
                </Tooltip>
                <Tooltip content="Keyword Overview">
                  <Link
                    prefetch={false}
                    href={`/tool/keyword-research/overview?keyword=${params.value}&location_code=${params.row.location_code}&language_code=${params.row.language_code}`}
                    target="_blank"
                    className="keyword-action border-r-1 border-slate-200 p-2 text-black/80 transition"
                  >
                    <BookOpenTextIcon size={18} />
                  </Link>
                </Tooltip>
                <Tooltip content="Autocomplete Suggestions">
                  <Link
                    prefetch={false}
                    href={`/tool/keyword-research/autocomplete?keyword=${params.value}&location_code=${params.row.location_code}&language_code=${params.row.language_code}`}
                    target="_blank"
                    className="keyword-action rounded-r-md p-2 text-black transition"
                  >
                    <LoaderPinwheelIcon size={18} />
                  </Link>
                </Tooltip>
              </div>
            </div>
          </>
        ),
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
        renderCell: (params) => (
          <>
            {typeof params.value !== "number" ? (
              <div>N/A</div>
            ) : (
              <div className="flex flex-row flex-wrap items-center gap-1 py-2">
                {params.value.toLocaleString(navigator.language)}
                {params.row.searchVolumeTrend.yearly ? (
                  <Tooltip content="Search Volume Trend (Yearly)">
                    <span
                      className={`text-xs ${params.row.searchVolumeTrend.yearly > 0 ? "text-green-500" : "text-red-500"}`}
                    >
                      {params.row.searchVolumeTrend.yearly > 0 ? "+" : ""}
                      {params.row.searchVolumeTrend.yearly.toLocaleString(
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
            <SearchVolumeChart
              data={params.row.monthlySearches}
              chartHeight={40}
              chartAnimation={false}
              xAxisLabelType="month"
              chartType="bar"
              showTooltip={false}
              showAxis={false}
              showAxisLine={false}
              showTickLine={false}
            />
          </div>
        ),
      },
      {
        field: "searchVolumeTrendYearly",
        headerName: "Search Volume Trend (Yearly)",
        type: "number",
        valueGetter: (_value, row) => row.searchVolumeTrend.yearly,
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
        renderCell: (params) => (
          <>
            {typeof params.value !== "number" ? (
              <div>N/A</div>
            ) : (
              <div className="flex w-full flex-col gap-1 py-2">
                <div>${params.value}</div>
                {(typeof params.row.lowTopPageBid === "number" ||
                  typeof params.row.highTopPageBid === "number") && (
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
                      <span>${params.row.lowTopPageBid ?? "N/A"}</span>
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
                      <span>${params.row.highTopPageBid ?? "N/A"}</span>
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
      },
      {
        field: "highTopPageBid",
        headerName: "High Top of Page Bid",
        type: "number",
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
    <div className="keyword-suggestions-tool relative w-full px-4 py-4 lg:px-8 lg:py-8">
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
            <TextSearchIcon
              size={22}
              className="animate-appearance-in text-white"
              style={{ animationDelay: "200ms" }}
            />
          </div>
          <div className="flex flex-col items-start md:translate-y-0.5">
            <div className="text-xl font-medium text-sky-950 md:leading-none">
              Keyword Suggestions
            </div>
            <div className="text-base font-medium text-slate-500">
              Get keyword suggestions that include the seed keyword.
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
              <div className="keyword-filters-container mt-3 w-full">
                <KeywordFilters
                  initialValues={activeKeywordFilters}
                  activeFiltersCount={activeKeywordFiltersCount}
                />
              </div>
            </Form>
          )}
        </div>
      </div>
      {isLoading && (
        <Skeleton className="mt-4 h-[1500px] w-full rounded-md lg:mt-8" />
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
                Keyword Suggestions (
                {totalResults.toLocaleString(navigator.language)})
              </span>
            </div>
            <div className="max-h-full overflow-auto p-4">
              <DataGrid
                showCellVerticalBorder
                showColumnVerticalBorder
                rows={data}
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
                Showing {offset + 1}-{offset + data.length} results of{" "}
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

export default memo(KeywordSuggestionsTool);
