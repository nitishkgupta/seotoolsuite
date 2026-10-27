"use client";

import useDFSBalance from "@/hooks/useDFSBalance";
import {
  buildDataForSEORelevantPagesFilters,
  getDataForSEOLanguages,
  getDataForSEOLocations,
} from "@/utils/dataforseo";
import { getLocalStorageItem } from "@/utils/localStorage";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import TopPagesFilters, {
  TopPagesFiltersInitialValues,
} from "@/components/TopPagesFilters";
import { GridColDef } from "@mui/x-data-grid";
import {
  Alert,
  Autocomplete,
  AutocompleteItem,
  Button,
  Chip,
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
  BinocularsIcon,
  BookOpenTextIcon,
  BoxIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  DatabaseZapIcon,
  FilesIcon,
  PlusIcon,
  RefreshCwIcon,
  TextSearchIcon,
} from "lucide-react";

import PageActionsDropdown from "@/components/PageActionsDropdown";
import PageDetails from "@/components/PageDetails";
import { trackUmamiEvent } from "@/utils/umami";
import DataForSEO from "@/services/DataForSEO";
import Image from "next/image";
import { getFlagImageUrl } from "@/utils/flags";
import { DataGrid } from "@mui/x-data-grid";
import useDeepCompareEffect from "use-deep-compare-effect";
import { RelevantPagesItem } from "@/types/DFS/RelevantPages";
import { getLocalDateTimeFromISOString } from "@/utils/date";
import { ReportTabs, ReportTabsItem } from "@/components/ReportTabs";

type TopPagesTableItem = RelevantPagesItem & {
  id: number;
};

type TopPagesData = {
  pages: TopPagesTableItem[];
};

const TopPagesTool = ({
  searchParams,
}: {
  searchParams?: {
    target?: string;
    location_code?: string;
    language_code?: string;
  };
}) => {
  const { refreshDFSBalance } = useDFSBalance(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<TopPagesData | null>(null);
  const [isCachedData, setIsCachedData] = useState<boolean>(false);
  const [dataCachedAt, setDataCachedAt] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const MAX_ROWS: number = Number(
    getLocalStorageItem("TOP_PAGES_MAX_ROWS") ?? 250,
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
  const cachingDuration: number = getLocalStorageItem(
    "TOP_PAGES_CACHING_DURATION",
  )
    ? Number(getLocalStorageItem("TOP_PAGES_CACHING_DURATION"))
    : 30;

  const locations = getDataForSEOLocations();
  const languages = getDataForSEOLanguages(true);

  const [selectedTarget, setSelectedTarget] = useState<string>("");
  const [selectedLocationKey, setSelectedLocationKey] = useState<string>(
    getLocalStorageItem("DEFAULT_LOCATION_KEY") ?? "2356",
  );
  const [selectedLanguageKey, setSelectedLanguageKey] = useState<string>(
    getLocalStorageItem("DEFAULT_LANGUAGE_KEY") ?? "en",
  );

  const [activeTopPagesFilters, setActiveTopPagesFilters] =
    useState<TopPagesFiltersInitialValues>();
  const activeTopPagesFiltersCount: number = activeTopPagesFilters
    ? Object.keys(activeTopPagesFilters).length
    : 0;

  const [activePageItem, setActivePageItem] =
    useState<TopPagesTableItem | null>(null);
  const {
    isOpen: pageDetailsModalOpen,
    onOpen: openPageDetailsModal,
    onOpenChange: setPageDetailsModalOpen,
  } = useDisclosure();

  const [formInput, setFormInput] = useState<{
    target?: string;
    location_code?: string;
    language_code?: string;
  }>({});

  const handleFormSubmit = useCallback(
    async (e: React.SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      let target: string = selectedTarget;
      const location_code: string = selectedLocationKey;
      const language_code: string = selectedLanguageKey;

      if (!target || !location_code || !language_code) {
        return;
      }

      // Convert URL to domain.
      if (URL.canParse(target)) {
        target = new URL(target).hostname;
      } else {
        target = target
          .replace("https://", "")
          .replace("http://", "")
          .replace("www.", "");
      }

      setSelectedTarget(target);
      setCurrentPage(1);
      setFormInput({
        target,
        location_code,
        language_code,
      });
      setActiveTopPagesFilters({
        ...(formData.get("traffic-min") !== "" && {
          minTraffic: Number(formData.get("traffic-min") as any),
        }),
        ...(formData.get("traffic-max") !== "" && {
          maxTraffic: Number(formData.get("traffic-max") as any),
        }),
        ...(formData.get("keywords-min") !== "" && {
          minKeywords: Number(formData.get("keywords-min") as any),
        }),
        ...(formData.get("keywords-max") !== "" && {
          maxKeywords: Number(formData.get("keywords-max") as any),
        }),
        ...(formData.get("traffic-cost-min") !== "" && {
          minTrafficCost: Number(formData.get("traffic-cost-min") as any),
        }),
        ...(formData.get("traffic-cost-max") !== "" && {
          maxTrafficCost: Number(formData.get("traffic-cost-max") as any),
        }),
        ...(formData.get("includePageAddress") !== "" &&
          formData.get("includePageAddress") !== null && {
            includePageAddress: formData.get("includePageAddress") as any,
          }),
        ...(formData.get("excludePageAddress") !== "" &&
          formData.get("excludePageAddress") !== null && {
            excludePageAddress: formData.get("excludePageAddress") as any,
          }),
      });
    },
    [selectedTarget, selectedLocationKey, selectedLanguageKey],
  );

  const getTopPages = useCallback(
    async (
      target: string,
      location_code: string,
      language_code: string,
      topPagesFilters: TopPagesFiltersInitialValues | undefined,
      limit: number,
      offset: number,
      refreshData: boolean = false,
    ) => {
      setIsLoading(true);
      setError(null);
      setIsCachedData(false);
      setDataCachedAt(null);

      window.setTimeout(() => {
        document.getElementById("top-pages-table")?.scrollIntoView({
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
          trackUmamiEvent("competitive-research/top-pages");
        } catch (error) {
          console.error(error);
        }
      }

      try {
        const dfsTopPagesFilters = topPagesFilters
          ? buildDataForSEORelevantPagesFilters(topPagesFilters)
          : [];

        const DataForSEOService = new DataForSEO(
          dfsUsername,
          dfsPassword,
          dfsSandboxEnabled,
          cachingEnabled,
        );

        const apiResponse = await DataForSEOService.getRelevantPages(
          target,
          Number(location_code),
          language_code,
          dfsTopPagesFilters,
          limit,
          offset,
          cachingDuration,
          refreshData,
        );

        if (apiResponse.isCachedData) {
          setIsCachedData(true);
          if (apiResponse.cachedAt) setDataCachedAt(apiResponse.cachedAt);
        }

        const taskStatusCode = apiResponse?.tasks[0]?.status_code;
        const taskStatusMessage =
          apiResponse?.tasks[0]?.status_message ?? "Unknown error.";

        if (taskStatusCode !== 20000) {
          setError(`DataForSEO API error: ${taskStatusMessage}`);
          return;
        }

        const resultData = apiResponse?.tasks[0]?.result[0] ?? null;

        if (resultData && resultData.items && resultData.items.length > 0) {
          const totalCount = resultData.total_count;
          setTotalResults(totalCount);
          const tableData: TopPagesData["pages"] = [];
          let rowId = 1 + offset;

          resultData.items.forEach((pageItem: RelevantPagesItem) => {
            tableData.push({
              id: rowId,
              ...pageItem,
            });
            rowId++;
          });

          setData({
            pages: tableData,
          });
        } else {
          setTotalResults(0);
          setData({ pages: [] });
        }

        window.setTimeout(() => {
          document.getElementById("top-pages-table")?.scrollIntoView({
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
      cachingDuration,
      cachingEnabled,
      dfsPassword,
      dfsSandboxEnabled,
      dfsUsername,
      refreshDFSBalance,
    ],
  );

  useDeepCompareEffect(() => {
    if (
      formInput.target &&
      formInput.location_code &&
      formInput.language_code
    ) {
      getTopPages(
        formInput.target,
        formInput.location_code,
        formInput.language_code,
        activeTopPagesFilters,
        MAX_ROWS,
        offset,
      );
    }
  }, [
    formInput.target,
    formInput.location_code,
    formInput.language_code,
    activeTopPagesFilters,
    offset,
    getTopPages,
  ]);

  const refreshTopPagesData = useCallback(async () => {
    if (
      formInput.target &&
      formInput.location_code &&
      formInput.language_code
    ) {
      getTopPages(
        formInput.target,
        formInput.location_code,
        formInput.language_code,
        activeTopPagesFilters,
        MAX_ROWS,
        offset,
        true,
      );
    }
  }, [
    formInput.target,
    formInput.location_code,
    formInput.language_code,
    activeTopPagesFilters,
    offset,
    MAX_ROWS,
    getTopPages,
  ]);

  const getMUIRowHeight = useCallback(() => "auto", []);

  const getTogglableColumns = useCallback((columns: GridColDef[]) => {
    const hiddenColumns: Array<string> = [];
    return columns
      .filter((column) => !hiddenColumns.includes(column.field))
      .map((column) => column.field);
  }, []);

  const dataGridSlotProps = useMemo(() => {
    return {
      toolbar: {
        csvOptions: {
          allColumns: true,
          fileName: `SEOToolSuite-top-pages-${formInput.target}-${formInput.location_code}-${formInput.language_code}-${currentPage}`,
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
    };
  }, []);

  const onDataGridPaginationModelChange = useCallback(() => {
    window.setTimeout(() => {
      document.getElementById("top-pages-table")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  }, []);

  const tableColumns: GridColDef<TopPagesTableItem>[] = useMemo(
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
        field: "page",
        headerName: "Page",
        minWidth: 400,
        type: "string",
        display: "flex",
        flex: 1,
        align: "left",
        headerAlign: "left",
        cellClassName: "min-h-12 relative group",
        valueGetter: (_, row) => row.page_address,
        renderCell: (params) => (
          <div className="flex w-full flex-col gap-2 py-2">
            <div className="flex w-full items-center justify-between gap-2">
              <Tooltip content={params.value}>
                <a
                  href={params.value}
                  target="_blank"
                  rel="nofollow noopener"
                  className="block w-fit max-w-full overflow-hidden text-sm text-nowrap text-ellipsis"
                >
                  {params.value.replace("https://", "").replace("http://", "")}
                </a>
              </Tooltip>
              <PageActionsDropdown
                pageAddress={params.value}
                locationCode={Number(formInput.location_code)}
                languageCode={formInput.language_code ?? "en"}
                showPageDetailsItem
                onPageDetailsClick={() => {
                  setActivePageItem(params.row);
                  openPageDetailsModal();
                }}
              />
            </div>
          </div>
        ),
      },
      {
        field: "traffic",
        headerName: "Traffic",
        description: "Monthly Traffic",
        type: "number",
        display: "flex",
        flex: 1,
        minWidth: 120,
        align: "left",
        headerAlign: "left",
        valueGetter: (_, row) => row.metrics?.organic?.etv ?? null,
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
        field: "keywords",
        headerName: "Keywords",
        type: "number",
        display: "flex",
        flex: 1,
        minWidth: 120,
        align: "left",
        headerAlign: "left",
        valueGetter: (_, row) => row.metrics?.organic?.count ?? null,
        renderCell: (params) => (
          <div className="py-2">
            {typeof params.value === "number"
              ? params.value.toLocaleString(navigator.language)
              : "N/A"}
          </div>
        ),
      },
      {
        field: "rankingChanges",
        headerName: "Ranking Changes",
        type: "string",
        display: "flex",
        flex: 1,
        minWidth: 200,
        align: "left",
        headerAlign: "left",
        sortable: false,
        filterable: false,
        disableExport: true,
        renderCell: (params) => {
          const organic = params.row.metrics?.organic;
          if (!organic) return <div className="py-2">N/A</div>;
          return (
            <div className="flex flex-wrap items-center gap-2 py-2">
              <Tooltip content="New Keywords">
                <div className="flex items-center gap-0.5 text-sm font-medium text-green-700">
                  <PlusIcon size={14} />
                  {(organic.is_new ?? 0).toLocaleString(navigator.language)}
                </div>
              </Tooltip>
              <Tooltip content="Keywords Moved Up">
                <div className="flex items-center gap-0.5 text-sm font-medium text-green-500">
                  <ChevronUpIcon size={14} />
                  {(organic.is_up ?? 0).toLocaleString(navigator.language)}
                </div>
              </Tooltip>
              <Tooltip content="Keywords Moved Down">
                <div className="flex items-center gap-0.5 text-sm font-medium text-red-500">
                  <ChevronDownIcon size={14} />
                  {(organic.is_down ?? 0).toLocaleString(navigator.language)}
                </div>
              </Tooltip>
            </div>
          );
        },
      },
      {
        field: "trafficCost",
        headerName: "Traffic Cost",
        type: "number",
        display: "flex",
        flex: 1,
        minWidth: 140,
        align: "left",
        headerAlign: "left",
        valueGetter: (_, row) =>
          row.metrics?.organic?.estimated_paid_traffic_cost != null
            ? Number(row.metrics.organic.estimated_paid_traffic_cost.toFixed(2))
            : null,
        renderCell: (params) => (
          <div className="py-2">
            {typeof params.value === "number"
              ? `$${params.value.toLocaleString(navigator.language, {
                  maximumFractionDigits: 0,
                })}`
              : "N/A"}
          </div>
        ),
      },
    ],
    [formInput.location_code, formInput.language_code, openPageDetailsModal],
  );

  useEffect(() => {
    if (searchParams) {
      const { target, location_code, language_code } = searchParams;

      if (target && location_code && language_code) {
        let targetDomain: string = target;

        // Convert URL to domain.
        if (URL.canParse(targetDomain)) {
          targetDomain = new URL(targetDomain).hostname;
        } else {
          targetDomain = targetDomain
            .replace("https://", "")
            .replace("http://", "")
            .replace("www.", "");
        }

        setSelectedTarget(targetDomain);
        setSelectedLocationKey(location_code);
        setSelectedLanguageKey(language_code);
        setFormInput({
          target: targetDomain,
          location_code,
          language_code,
        });
      }
    }
  }, [searchParams]);

  return (
    <div className="top-pages-tool relative w-full px-4 py-4 lg:px-8 lg:py-8">
      <div className="tool-form-container relative flex w-full flex-col items-start justify-start rounded-md border-2 border-b-3 border-slate-200 bg-white p-5">
        <div className="absolute top-4 right-4 flex w-fit items-center gap-2">
          <Tooltip content="Credits Cost (Uncached)">
            <Chip size="md" variant="flat">
              ${parseFloat(Number(0.012 + MAX_ROWS * 0.00012).toFixed(4))}
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
            <FilesIcon
              size={22}
              className="animate-appearance-in text-white"
              style={{ animationDelay: "200ms" }}
            />
          </div>
          <div className="flex flex-col items-start md:translate-y-0.5">
            <div className="text-xl font-medium text-sky-950 md:leading-none">
              Top Pages
            </div>
            <div className="text-base font-medium text-slate-500">
              Get the top-performing organic pages of a website.
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
                  label="Domain"
                  placeholder="example.com"
                  isDisabled={isLoading}
                  value={selectedTarget}
                  classNames={{
                    inputWrapper: "shadow-none",
                  }}
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
                  className="autocomplete-input"
                  classNames={{
                    popoverContent: "border border-slate-200 border-b-2",
                  }}
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
                  className="autocomplete-input"
                  classNames={{
                    popoverContent: "border border-slate-200 border-b-2",
                  }}
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
                <TopPagesFilters
                  initialValues={activeTopPagesFilters}
                  activeFiltersCount={activeTopPagesFiltersCount}
                />
              </div>
            </Form>
          )}
        </div>
        {formInput.target &&
          formInput.location_code &&
          formInput.language_code && (
            <ReportTabs className="mt-4">
              <ReportTabsItem
                startContent={<BookOpenTextIcon size={16} />}
                href={`/tool/competitive-research/overview?target=${formInput.target}&location_code=${formInput.location_code}&language_code=${formInput.language_code}`}
              >
                Traffic Overview
              </ReportTabsItem>
              <ReportTabsItem
                startContent={<TextSearchIcon size={16} />}
                href={`/tool/competitive-research/keywords?target=${formInput.target}&location_code=${formInput.location_code}&language_code=${formInput.language_code}`}
              >
                Ranked Keywords
              </ReportTabsItem>
              <ReportTabsItem startContent={<FilesIcon size={16} />} active>
                Top Pages
              </ReportTabsItem>
            </ReportTabs>
          )}
      </div>
      {isLoading && (
        <>
          <Skeleton className="mt-4 h-375 w-full rounded-md lg:mt-8" />
        </>
      )}

      {!isLoading && !error && data && (
        <div className="tool-results-container mt-4 flex w-full flex-col gap-8 md:gap-4 lg:mt-8 lg:flex-row">
          <div
            className="tool-results-table-container h-fit w-full scroll-m-4 overflow-auto rounded-md border-2 border-b-3 border-slate-200 bg-white lg:scroll-m-8"
            id="top-pages-table"
          >
            <div className="header flex w-full items-center justify-between gap-2 border-b-2 border-slate-200 px-4 py-3 text-base md:text-lg">
              <div className="flex items-center gap-2">
                <FilesIcon size={20} />
                <span>
                  Top Pages ({totalResults.toLocaleString(navigator.language)})
                </span>
              </div>
              <div className="flex items-center gap-2">
                {isCachedData && (
                  <div className="text-small text-default-700 relative flex items-stretch gap-2 rounded-full border-2 border-b-3 border-slate-200 p-2">
                    <Tooltip
                      content={`Cached Data ${dataCachedAt ? `(${getLocalDateTimeFromISOString(dataCachedAt)})` : ""}`}
                    >
                      <DatabaseZapIcon size={18} />
                    </Tooltip>
                    <div className="w-0.5 shrink-0 rounded-full bg-slate-200"></div>
                    <Tooltip content="Refresh Data">
                      <button
                        className="cursor-pointer transition hover:rotate-90 active:scale-95 active:duration-75"
                        onClick={refreshTopPagesData}
                      >
                        <RefreshCwIcon size={18} />
                      </button>
                    </Tooltip>
                  </div>
                )}
              </div>
            </div>
            <div className="max-h-full overflow-auto p-4">
              <DataGrid
                showCellVerticalBorder
                showColumnVerticalBorder
                rows={data.pages}
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
                Showing {offset + 1}-{offset + data.pages.length} results of{" "}
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
        isOpen={pageDetailsModalOpen}
        onOpenChange={setPageDetailsModalOpen}
      >
        <ModalContent className="rounded-md">
          <ModalHeader className="border-b-2 border-slate-200">
            Page Details
          </ModalHeader>
          <ModalBody className="gap-0 rounded-b-md bg-gray-100 p-0">
            <PageDetails
              pageItem={activePageItem}
              locationCode={formInput.location_code!}
              languageCode={formInput.language_code!}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default memo(TopPagesTool);
