"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { getDifficultyColor, getDifficultyText } from "@/utils/difficulty";
import KeywordResearchLoader from "./loader";
import {
  ArrowLeftIcon,
  BadgeDollarSignIcon,
  BinocularsIcon,
  FileClockIcon,
  InfoIcon,
  NavigationIcon,
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
} from "@/utils/dataforseo";
import Image from "next/image";
import { getLocalStorageItem } from "@/utils/localStorage";
import Link from "next/link";
import DataForSEO from "@/services/DataForSEO";
import { trackUmamiEvent } from "@/utils/umami";
import useDFSBalance from "@/hooks/useDFSBalance";

type KeywordSuggestionItem = {
  id: number;
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
};

type KeywordSuggestionData = KeywordSuggestionItem[];

const KeywordResearchTool = () => {
  const { refreshDFSBalance } = useDFSBalance(false);

  const limit: number = 250;
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
    };
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
        cellClassName: "min-h-12",
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
              <div className="flex flex-row items-center gap-1">
                {params.value.toLocaleString(navigator.language)}
                {params.row.searchVolumeTrend.yearly ? (
                  <Tooltip content="Search Volume Trend (Yearly)">
                    <span
                      className={`ml-1 text-xs ${params.row.searchVolumeTrend.yearly > 0 ? "text-green-500" : "text-red-500"}`}
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
        field: "cpc",
        headerName: "CPC",
        description: "Avg. Cost Per Click",
        type: "number",
        display: "flex",
        flex: 1,
        minWidth: 80,
        align: "left",
        headerAlign: "left",
        renderCell: (params) => (
          <>
            {typeof params.value !== "number" ? (
              <div>N/A</div>
            ) : (
              <div>${params.value}</div>
            )}
          </>
        ),
      },
      {
        field: "ppc",
        headerName: "PPC",
        description: "Paid Competition",
        type: "number",
        display: "flex",
        flex: 1,
        minWidth: 80,
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
        align: "left",
        headerAlign: "left",
        display: "flex",
        cellClassName: "datagrid-cell-p0",
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
                  className="relative flex h-full w-full items-center justify-center py-4 text-center font-medium"
                  style={{
                    backgroundColor: `color-mix(in oklch, ${getDifficultyColor(params.value)}, white 90%)`,
                    color: getDifficultyColor(params.value),
                    borderColor: getDifficultyColor(params.value),
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
    [],
  );

  const getKeywordSuggestions = useCallback(
    async (
      keyword: string,
      location_code: string,
      language_code: string,
      limit: number,
      offset: number,
    ) => {
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

      try {
        trackUmamiEvent("keyword-research", {
          location:
            getDataForSEOLocationFromCode(Number(location_code))
              ?.location_name ?? "N/A",
        });
      } catch (error) {
        console.error(error);
      }

      try {
        const DataForSEOService = new DataForSEO(dfsUsername, dfsPassword);
        const apiResponse = await DataForSEOService.getKeywordSuggestions(
          keyword,
          Number(location_code),
          language_code,
          limit,
          offset,
        );

        const data = apiResponse.tasks[0].result[0];
        setIsLoading(false);

        if (data) {
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
          setIsDataPageActive(true);
          setActiveKeywordData(tableData[0]);
          window.setTimeout(() => {
            document
              .querySelector(`.MuiDataGrid-row[data-id="${tableData[0].id}"]`)
              ?.classList.add("Mui-selected");
          }, 100);
        }

        refreshDFSBalance();
      } catch (error: any) {
        setIsLoading(false);
        setFormError(error.message);
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
        limit,
        offset,
      );
    }
  }, [formInputData, getKeywordSuggestions, limit, offset]);

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

  return (
    <div className="keyword-research-tool w-full">
      {!isDataPageActive && !isLoading && (
        <>
          {data && data.length > 0 && (
            <div className="flex h-16 w-full flex-row items-center justify-between border-b-2 border-slate-200 bg-white">
              <div></div>
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
              <div className="mt-4 w-full rounded-md border-2 border-slate-200 bg-white p-2 md:w-1/2">
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
                  className="tool-input-form mx-auto flex w-full flex-col items-center justify-start rounded-md border-2 border-slate-200 bg-white p-5 md:w-1/2"
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
                  <Button
                    color="primary"
                    variant="flat"
                    type="submit"
                    size="lg"
                    isLoading={isLoading}
                    className="mt-2 w-full shrink-0"
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
            <div className="flex h-full min-h-16 flex-col items-stretch gap-4 md:flex-row md:gap-2">
              <div className="flex h-full min-h-auto items-center gap-2 border-r-0 border-slate-200 px-4 md:min-h-16 md:border-r-2">
                <div className="relative rounded-full bg-sky-950 p-2">
                  <TelescopeIcon size={20} className="text-white" />
                </div>
                <span>Keyword Research</span>
              </div>
              <div className="flex h-full min-h-auto flex-col flex-wrap gap-2 gap-y-0 border-slate-200 px-4 md:min-h-16 md:flex-row md:items-center">
                <span>Keyword: {formInputData.keyword}</span>
                <span className="hidden md:block">|</span>
                <span>
                  Location:{" "}
                  {
                    getDataForSEOLocationFromCode(
                      Number(formInputData.location_code!),
                    )?.location_name
                  }
                </span>
                <span className="hidden md:block">|</span>
                <span>
                  Language:{" "}
                  {
                    getDataForSEOLanguageFromCode(formInputData.language_code!)
                      ?.language_name
                  }
                </span>
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
          <div className="tool-results-container flex w-full flex-col gap-8 p-4 md:gap-4 md:p-8 lg:flex-row">
            <div
              className="tool-results-table-container h-fit w-full scroll-m-8 rounded-md border-2 border-slate-200 bg-white"
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
              className="w-full shrink-0 scroll-m-8 lg:w-1/2 lg:max-w-[550px]"
              id="keyword-details"
            >
              <KeywordDetails keywordData={activeKeywordData} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default KeywordResearchTool;
