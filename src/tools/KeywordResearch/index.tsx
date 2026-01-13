"use client";

import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { getDifficultyColor, getDifficultyText } from "@/utils/difficulty";
import KeywordResearchLoader from "./loader";
import {
  ArrowLeftIcon,
  BadgeDollarSignIcon,
  BinocularsIcon,
  BookOpenTextIcon,
  BoxIcon,
  DatabaseZapIcon,
  FileClockIcon,
  FunnelIcon,
  InfoIcon,
  LanguagesIcon,
  MapPinIcon,
  NavigationIcon,
  SearchIcon,
  TelescopeIcon,
  TextSearchIcon,
} from "lucide-react";
import {
  Alert,
  Autocomplete,
  AutocompleteItem,
  Button,
  Form,
  Input,
  Pagination,
  Tooltip,
} from "@heroui/react";
import { getFlagImageUrl } from "@/utils/flags";
import KeywordDetails from "./components/KeywordDetails";
import {
  getDataForSEOLocations,
  getDataForSEOLanguages,
  getDataForSEOLocationFromCode,
  getDataForSEOLanguageFromCode,
  buildDataForSEOKeywordFilters,
} from "@/utils/dataforseo";
import Image from "next/image";
import { getLocalStorageItem } from "@/utils/localStorage";
import Link from "next/link";
import DataForSEO from "@/services/DataForSEO";
import { trackUmamiEvent } from "@/utils/umami";
import useDFSBalance from "@/hooks/useDFSBalance";
import KeywordOverview from "./components/KeywordOverview";
import KeywordFilters, {
  type KeywordFiltersInitialValues,
} from "./components/KeywordFilters";

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

type KeywordSuggestionData = KeywordSuggestionItem[];

const KeywordResearchTool = () => {
  const { refreshDFSBalance } = useDFSBalance(false);

  const limit: number = 250;
  const [dfsSandboxEnabled, setDFSSandboxEnabled] = useState<boolean>(false);
  const [cachingEnabled, setCachingEnabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<KeywordSuggestionData>([]);
  const [isDataPageActive, setIsDataPageActive] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>();
  const [totalResults, setTotalResults] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeKeywordData, setActiveKeywordData] =
    useState<KeywordSuggestionItem | null>(null);
  const offset = (currentPage - 1) * limit;
  const totalPages = Math.ceil(totalResults / limit);
  const [selectedLocationKey, setSelectedLocationKey] =
    useState<string>("2356");
  const [selectedLanguageKey, setSelectedLanguageKey] = useState<string>("en");
  const [formInputData, setFormInputData] = useState<{
    keyword?: string;
    location_code?: string;
    language_code?: string;
  }>({});
  const [keywordOverviewInput, setKeywordOverviewInput] = useState<{
    keyword?: string;
    location_code?: string;
    language_code?: string;
  }>({});
  const [activeKeywordFilters, setActiveKeywordFilters] =
    useState<KeywordFiltersInitialValues>();
  const hasActiveKeywordFilters: boolean =
    activeKeywordFilters && Object.keys(activeKeywordFilters).length > 0
      ? true
      : false;

  const dfsUsername = getLocalStorageItem("DATAFORSEO_USERNAME");
  const dfsPassword = getLocalStorageItem("DATAFORSEO_PASSWORD");

  const locations = getDataForSEOLocations();
  const languages = getDataForSEOLanguages();

  const getMUIRowHeight = useCallback(() => "auto", []);

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

  const handleKWOverviewClick = useCallback(
    (
      event: React.MouseEvent<HTMLButtonElement>,
      keyword: string,
      location_code: number,
      language_code: string,
    ) => {
      event.preventDefault();
      event.stopPropagation();

      setKeywordOverviewInput({
        keyword,
        location_code: location_code.toString(),
        language_code,
      });

      window.setTimeout(() => {
        document.getElementById("keyword-overview")?.scrollIntoView({
          behavior: "instant",
        });
      }, 50);
    },
    [],
  );

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
        minWidth: 250,
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
              <Tooltip content="Check Keyword Overview">
                <button
                  onClick={(e) =>
                    handleKWOverviewClick(
                      e,
                      params.value,
                      params.row.location_code,
                      params.row.language_code,
                    )
                  }
                  className="top-0 right-2 bottom-0 z-90 my-auto h-fit shrink-0 cursor-pointer rounded-md border border-slate-200 bg-white p-2 text-black shadow-xs transition group-hover:opacity-100 hover:border-slate-400 focus-visible:opacity-100 lg:absolute lg:opacity-0"
                >
                  <BookOpenTextIcon size={16} />
                </button>
              </Tooltip>
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
    [handleKWOverviewClick],
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
      const dfsSandboxEnabled =
        getLocalStorageItem("DATAFORSEO_SANDBOX") === "true";
      const cachingEnabled = getLocalStorageItem("CACHING_ENABLED") === "true";
      setIsDataPageActive(false);
      setIsLoading(true);

      document.getElementById("keywords-table")?.scrollIntoView({
        behavior: "instant",
      });

      if (!dfsUsername || !dfsPassword) {
        setFormError(
          "DataForSEO API not connected. Please add credentials from settings.",
        );
        setIsLoading(false);
        return;
      }

      if (!dfsSandboxEnabled) {
        try {
          trackUmamiEvent("keyword-research", {
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
          setIsLoading(false);
          setFormError(`DataForSEO API error: ${taskStatusMessage}`);
          return;
        }

        const data = apiResponse?.tasks[0]?.result[0] ?? null;
        setIsLoading(false);

        if (data && data.items && data.items.length > 0) {
          const totalCount = data.total_count;
          setTotalResults(totalCount);
          const tableData: KeywordSuggestionData = [];
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
          setActiveKeywordData(tableData[0]);
          window.setTimeout(() => {
            document
              .querySelector(`.MuiDataGrid-row[data-id="${tableData[0].id}"]`)
              ?.classList.add("Mui-selected");
          }, 100);
        }

        setIsDataPageActive(true);
        if (!dfsSandboxEnabled) refreshDFSBalance();
      } catch (error: any) {
        console.error(error);
        setIsLoading(false);
        if (error?.response?.data?.tasks[0]?.status_message) {
          setFormError(
            `DataForSEO API error: ${error.response.data.tasks[0].status_message}`,
          );
        } else {
          setFormError(error.message);
        }
      }
    },
    [dfsUsername, dfsPassword, refreshDFSBalance],
  );

  const handleFormSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setFormError(null);

      const formData = new FormData(e.currentTarget);
      const keyword: string = formData.get("keyword") as string;
      const location_code: string = selectedLocationKey;
      const language_code: string = selectedLanguageKey;

      if (!keyword || !location_code || !language_code) {
        setFormError("Please fill in the required fields.");
        return;
      }

      setCurrentPage(1);

      setFormInputData({
        keyword,
        location_code,
        language_code,
      });

      setKeywordOverviewInput({
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
    [selectedLocationKey, selectedLanguageKey],
  );

  useEffect(() => {
    if (
      formInputData.keyword &&
      formInputData.location_code &&
      formInputData.language_code
    ) {
      getKeywordSuggestions(
        formInputData.keyword,
        formInputData.location_code,
        formInputData.language_code,
        activeKeywordFilters,
        limit,
        offset,
      );
    }
  }, [
    formInputData,
    activeKeywordFilters,
    getKeywordSuggestions,
    limit,
    offset,
  ]);

  const handleRowClick = useCallback((params: any) => {
    setActiveKeywordData(params.row);
    document.getElementById("keyword-details")?.scrollIntoView({
      behavior: "instant",
    });
    document.querySelectorAll(".MuiDataGrid-row").forEach((row) => {
      row.classList.remove("Mui-selected");
    });
    document
      .querySelector(`.MuiDataGrid-row[data-id="${params.row.id}"]`)
      ?.classList.add("Mui-selected");
  }, []);

  useEffect(() => {
    setDFSSandboxEnabled(getLocalStorageItem("DATAFORSEO_SANDBOX") === "true");
    setCachingEnabled(getLocalStorageItem("CACHING_ENABLED") === "true");
  }, []);

  const onDataGridPaginationModelChange = useCallback(() => {
    document.getElementById("keywords-table")?.scrollIntoView({
      behavior: "instant",
    });
  }, []);

  return (
    <div className="keyword-research-tool w-full">
      {!isDataPageActive && !isLoading && (
        <>
          {data && data.length > 0 && (
            <div className="flex h-16 w-full flex-row items-center justify-between border-b-2 border-slate-200 bg-white">
              <div className="flex items-center gap-2 px-4">
                {dfsSandboxEnabled && (
                  <Tooltip
                    content="Sandbox Mode Enabled"
                    placement="bottom-end"
                  >
                    <div className="flex w-fit items-center gap-1 rounded-md border-2 border-slate-200 bg-white px-2 py-2">
                      <BoxIcon size={18} />
                    </div>
                  </Tooltip>
                )}
                {cachingEnabled && (
                  <Tooltip content="Caching Enabled" placement="bottom-end">
                    <div className="flex w-fit items-center gap-1 rounded-md border-2 border-slate-200 bg-white px-2 py-2">
                      <DatabaseZapIcon size={18} />
                    </div>
                  </Tooltip>
                )}
              </div>
              <div className="flex h-full items-center gap-2 border-l-2 border-slate-200 px-4">
                <Button
                  color="default"
                  variant="flat"
                  size="md"
                  onPress={() => setIsDataPageActive(true)}
                >
                  <FileClockIcon size={16} />
                  <span>Previous Results</span>
                </Button>
              </div>
            </div>
          )}
          {(dfsSandboxEnabled || cachingEnabled) &&
            (!data || data.length === 0) && (
              <div className="flex items-center gap-2 px-4 py-4">
                {dfsSandboxEnabled && (
                  <Tooltip
                    content="Sandbox Mode Enabled"
                    placement="bottom-end"
                  >
                    <div className="flex w-fit items-center gap-1 rounded-md border-2 border-slate-200 bg-white px-2 py-2">
                      <BoxIcon size={18} />
                    </div>
                  </Tooltip>
                )}
                {cachingEnabled && (
                  <Tooltip content="Caching Enabled" placement="bottom-end">
                    <div className="flex w-fit items-center gap-1 rounded-md border-2 border-slate-200 bg-white px-2 py-2">
                      <DatabaseZapIcon size={18} />
                    </div>
                  </Tooltip>
                )}
              </div>
            )}
          <div className="tool-form-container relative flex w-full flex-col items-center justify-center px-4 py-8 md:px-8 md:py-16">
            <div
              className={
                `tool-input-icon relative rounded-full border border-sky-950 bg-sky-950 p-5` +
                `${isLoading ? " loading" : ""}`
              }
            >
              <TelescopeIcon size={60} className="text-white" />
              <div className="tool-input-icon-border absolute top-0 left-0 h-full w-full rounded-full border border-sky-500 border-t-transparent border-b-transparent p-1 opacity-0 transition-all"></div>
            </div>
            <div className="tool-input-headin mt-3 text-3xl font-medium text-slate-900">
              Keyword Research
            </div>
            <div className="tool-input-sub-heading mt-0 w-full text-center text-lg font-medium text-slate-500 md:text-xl">
              Generate keyword suggestions with multiple metrics.
            </div>
            {!dfsUsername || !dfsPassword ? (
              <div className="mt-4 w-full rounded-md border-2 border-slate-200 bg-white p-2 lg:w-1/2">
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
              </div>
            ) : (
              <div className="tool-input-form-container mt-8 w-full">
                <Form
                  onSubmit={handleFormSubmit}
                  className="tool-input-form mx-auto flex w-full flex-col items-center justify-start rounded-md border-2 border-slate-200 bg-white p-5 lg:w-1/2 lg:min-w-[800px]"
                >
                  {formError && (
                    <Alert
                      color="danger"
                      variant="flat"
                      title={formError}
                      className="mb-2"
                    />
                  )}
                  <div className="flex w-full flex-col items-start justify-start gap-2 md:flex-row">
                    <Input
                      name="keyword"
                      variant="flat"
                      type="text"
                      label="Keyword"
                      defaultValue={formInputData.keyword}
                      autoFocus
                      isRequired
                    />
                    <Autocomplete
                      name="location"
                      variant="flat"
                      label="Location"
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
                  </div>
                  <div className="keyword-filters-container mt-3 w-full">
                    <KeywordFilters
                      defaultOpen={hasActiveKeywordFilters}
                      initialValues={activeKeywordFilters}
                    />
                  </div>
                  <Button
                    color="primary"
                    variant="flat"
                    type="submit"
                    size="lg"
                    isLoading={isLoading}
                    className="mt-3 w-full shrink-0"
                  >
                    Submit
                  </Button>
                </Form>
              </div>
            )}
          </div>
        </>
      )}
      {isLoading && <KeywordResearchLoader />}
      {isDataPageActive && (
        <>
          <div className="flex w-full flex-col justify-between gap-4 border-b-2 border-slate-200 bg-white py-4 md:flex-row md:gap-0 md:py-0">
            <div className="flex h-full min-h-16 w-full flex-col items-stretch gap-4 md:flex-row md:gap-2">
              <div className="flex h-full min-h-auto shrink-0 items-center gap-2 border-r-0 border-slate-200 px-4 md:min-h-16 md:border-r-2">
                <div className="relative rounded-full bg-sky-950 p-2">
                  <TelescopeIcon size={20} className="text-white" />
                </div>
                <span>Keyword Research</span>
              </div>
              <div className="flex h-full min-h-auto w-full flex-row flex-wrap gap-2 border-slate-200 px-4 md:min-h-16 md:items-center">
                <div className="flex w-fit items-center gap-1 rounded-md bg-slate-100 px-2 py-1">
                  <SearchIcon size={14} />
                  {formInputData.keyword}
                </div>
                <div className="flex w-fit items-center gap-1 rounded-md bg-slate-100 px-2 py-1">
                  <MapPinIcon size={14} />
                  {
                    getDataForSEOLocationFromCode(
                      Number(formInputData.location_code!),
                    )?.location_name
                  }
                </div>
                <div className="flex w-fit items-center gap-1 rounded-md bg-slate-100 px-2 py-1">
                  <LanguagesIcon size={14} />
                  {
                    getDataForSEOLanguageFromCode(formInputData.language_code!)
                      ?.language_name
                  }
                </div>
                {hasActiveKeywordFilters && (
                  <Tooltip content="Filters Applied">
                    <div className="flex w-fit items-center gap-1 rounded-md bg-slate-100 px-2 py-1">
                      <FunnelIcon size={14} />
                      {activeKeywordFilters &&
                        Object.keys(activeKeywordFilters).length}
                    </div>
                  </Tooltip>
                )}
                <div className="flex items-center gap-2 md:ml-auto">
                  {dfsSandboxEnabled && (
                    <Tooltip content="Sandbox Mode Enabled">
                      <div className="flex w-fit items-center gap-1 rounded-md border-2 border-slate-200 bg-white px-2 py-2">
                        <BoxIcon size={18} />
                      </div>
                    </Tooltip>
                  )}
                  {cachingEnabled && (
                    <Tooltip content="Caching Enabled">
                      <div className="flex w-fit items-center gap-1 rounded-md border-2 border-slate-200 bg-white px-2 py-2">
                        <DatabaseZapIcon size={18} />
                      </div>
                    </Tooltip>
                  )}
                </div>
              </div>
            </div>
            <div className="flex h-full min-h-auto items-center gap-2 border-l-0 border-slate-200 px-4 md:min-h-16 md:border-l-2">
              <Button
                color="default"
                variant="flat"
                size="md"
                onPress={() => setIsDataPageActive(false)}
              >
                <ArrowLeftIcon size={16} />
                <span>Back</span>
              </Button>
            </div>
          </div>
          {keywordOverviewInput &&
            keywordOverviewInput.language_code !== "any" && (
              <div
                className="keyword-overview-container mt-8 w-full scroll-m-8 px-4 md:px-8"
                id="keyword-overview"
              >
                <KeywordOverview
                  keyword={keywordOverviewInput.keyword!}
                  locationCode={Number(keywordOverviewInput.location_code!)}
                  languageCode={keywordOverviewInput.language_code!}
                />
              </div>
            )}
          <div className="tool-results-container flex w-full flex-col gap-8 p-4 md:gap-4 md:p-8 lg:flex-row">
            <div
              className="tool-results-table-container h-fit w-full scroll-m-8 overflow-auto rounded-md border-2 border-slate-200 bg-white"
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
                  onRowClick={handleRowClick}
                  rows={data}
                  columns={tableColumns}
                  initialState={dataGridInitialState}
                  showToolbar
                  disableRowSelectionOnClick
                  getRowHeight={getMUIRowHeight}
                  onPaginationModelChange={onDataGridPaginationModelChange}
                  slotProps={{
                    toolbar: {
                      csvOptions: {
                        allColumns: true,
                        fileName: `SEOToolSuite-keyword-suggestions-${formInputData.keyword}-${formInputData.location_code}-${formInputData.language_code}-${currentPage}`,
                        escapeFormulas: false,
                      },
                    },
                    columnsManagement: {
                      getTogglableColumns,
                    },
                  }}
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
            <div
              className="w-full shrink-0 scroll-m-8 lg:w-[550px] lg:max-w-1/3 xl:max-w-1/2"
              id="keyword-details"
            >
              <KeywordDetails
                keywordData={activeKeywordData}
                hideLanguage={formInputData.language_code !== "any"}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default memo(KeywordResearchTool);
