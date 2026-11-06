/* eslint-disable @next/next/no-img-element */

"use client";

import useDFSBalance from "@/hooks/useDFSBalance";
import { buildDataForSEOBacklinksFilters } from "@/utils/dataforseo";
import { getLocalStorageItem } from "@/utils/localStorage";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import BacklinkCheckerFilters, {
  BacklinkCheckerFiltersInitialValues,
} from "@/components/BacklinkCheckerFilters";
import { GridColDef } from "@mui/x-data-grid";
import {
  Alert,
  Button,
  Checkbox,
  Chip,
  Form,
  Input,
  Pagination,
  Select,
  SelectItem,
  Skeleton,
  Tooltip,
} from "@heroui/react";
import Link from "next/link";
import {
  BoxIcon,
  DatabaseZapIcon,
  FileCodeIcon,
  GraphStarIcon,
  ImageIcon,
  IterationCcwIcon,
  Link2OffIcon,
  LinkIcon,
  MinusIcon,
  PlusIcon,
  RefreshCwIcon,
  TypeIcon,
} from "lucide-react";
import { trackUmamiEvent } from "@/utils/umami";
import DataForSEO from "@/services/DataForSEO";
import { DataGrid } from "@mui/x-data-grid";
import useDeepCompareEffect from "use-deep-compare-effect";
import { BacklinksItem } from "@/types/DFS/Backlinks";
import {
  getLocalDateTimeFromISOString,
  getLocalDateFromISOString,
} from "@/utils/date";

type BacklinksTableItem = BacklinksItem & {
  id: number;
};

type BacklinksData = {
  backlinks: BacklinksTableItem[];
};

type BacklinksStatusType = "all" | "live" | "lost";

type BacklinksModeType = "one_per_domain" | "as_is";

const BacklinkCheckerTool = ({
  searchParams,
}: {
  searchParams?: {
    target?: string;
  };
}) => {
  const { refreshDFSBalance } = useDFSBalance(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<BacklinksData | null>(null);
  const [isCachedData, setIsCachedData] = useState<boolean>(false);
  const [dataCachedAt, setDataCachedAt] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const MAX_ROWS: number = Number(
    getLocalStorageItem("BACKLINK_CHECKER_MAX_ROWS") ??
      getLocalStorageItem("BACKLINK_CHECKER_MAX_ROWS") ??
      250,
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
    "BACKLINK_CHECKER_CACHING_DURATION",
  )
    ? Number(getLocalStorageItem("BACKLINK_CHECKER_CACHING_DURATION"))
    : 30;

  const [selectedTarget, setSelectedTarget] = useState<string>("");
  const [selectedBacklinksStatus, setSelectedBacklinksStatus] =
    useState<BacklinksStatusType>("live");
  const [includeSubdomains, setIncludeSubdomains] = useState<boolean>(true);
  const [oneLinkPerDomain, setOneLinkPerDomain] = useState<boolean>(true);
  const [onlyDofollow, setOnlyDofollow] = useState<boolean>(false);
  const [onlyBroken, setOnlyBroken] = useState<boolean>(false);

  const [activeBacklinkFilters, setActiveBacklinkFilters] =
    useState<BacklinkCheckerFiltersInitialValues>();
  const activeBacklinkFiltersCount: number = activeBacklinkFilters
    ? Object.keys(activeBacklinkFilters).length
    : 0;

  const [formInput, setFormInput] = useState<{
    target?: string;
    backlinksStatus?: BacklinksStatusType;
    includeSubdomains?: boolean;
    mode?: BacklinksModeType;
    onlyDofollow?: boolean;
    onlyBroken?: boolean;
  }>({});

  const handleFormSubmit = useCallback(
    async (e: React.SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const target: string = selectedTarget;

      if (!target) {
        return;
      }

      const mode: BacklinksModeType = oneLinkPerDomain
        ? "one_per_domain"
        : "as_is";

      setCurrentPage(1);
      setFormInput({
        target,
        backlinksStatus: selectedBacklinksStatus,
        includeSubdomains,
        mode,
        onlyDofollow,
        onlyBroken,
      });
      setActiveBacklinkFilters({
        ...(formData.get("includeSource") !== "" &&
          formData.get("includeSource") !== null && {
            includeSource: formData.get("includeSource") as any,
          }),
        ...(formData.get("excludeSource") !== "" &&
          formData.get("excludeSource") !== null && {
            excludeSource: formData.get("excludeSource") as any,
          }),
        ...(formData.get("includeTarget") !== "" &&
          formData.get("includeTarget") !== null && {
            includeTarget: formData.get("includeTarget") as any,
          }),
        ...(formData.get("excludeTarget") !== "" &&
          formData.get("excludeTarget") !== null && {
            excludeTarget: formData.get("excludeTarget") as any,
          }),
        ...(formData.get("source-dr-min") !== "" && {
          minSourceDR: Number(formData.get("source-dr-min") as any),
        }),
        ...(formData.get("source-dr-max") !== "" && {
          maxSourceDR: Number(formData.get("source-dr-max") as any),
        }),
        ...(formData.get("source-pr-min") !== "" && {
          minSourcePR: Number(formData.get("source-pr-min") as any),
        }),
        ...(formData.get("source-pr-max") !== "" && {
          maxSourcePR: Number(formData.get("source-pr-max") as any),
        }),
        ...(formData.getAll("backlinkTypes[]") &&
          formData.getAll("backlinkTypes[]").length > 0 && {
            backlinkTypes: formData.getAll("backlinkTypes[]") as any,
          }),
      });
    },
    [
      selectedTarget,
      selectedBacklinksStatus,
      includeSubdomains,
      oneLinkPerDomain,
      onlyDofollow,
      onlyBroken,
    ],
  );

  const getBacklinks = useCallback(
    async (
      target: string,
      mode: BacklinksModeType,
      backlinksStatus: BacklinksStatusType,
      incSubdomains: boolean,
      dofollowOnly: boolean,
      brokenOnly: boolean,
      backlinkFilters: BacklinkCheckerFiltersInitialValues | undefined,
      limit: number,
      offset: number,
      refreshData: boolean = false,
    ) => {
      setIsLoading(true);
      setError(null);
      setIsCachedData(false);
      setDataCachedAt(null);

      window.setTimeout(() => {
        document.getElementById("backlinks-table")?.scrollIntoView({
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
          trackUmamiEvent("backlink-research/backlink-checker");
        } catch (error) {
          console.error(error);
        }
      }

      try {
        const dfsBacklinkFilters = backlinkFilters
          ? buildDataForSEOBacklinksFilters(backlinkFilters)
          : [];

        // Add dofollow filter if enabled
        if (dofollowOnly) {
          if (dfsBacklinkFilters.length > 0) dfsBacklinkFilters.push("and");
          dfsBacklinkFilters.push(["dofollow", "=", true]);
        }

        // Add broken filter if enabled
        if (brokenOnly) {
          if (dfsBacklinkFilters.length > 0) dfsBacklinkFilters.push("and");
          dfsBacklinkFilters.push(["is_broken", "=", true]);
        }

        const DataForSEOService = new DataForSEO(
          dfsUsername,
          dfsPassword,
          dfsSandboxEnabled,
          cachingEnabled,
        );

        const apiResponse = await DataForSEOService.getBacklinks(
          target,
          mode,
          backlinksStatus,
          incSubdomains,
          dfsBacklinkFilters,
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
          const tableData: BacklinksData["backlinks"] = [];
          let rowId = 1 + offset;

          resultData.items.forEach((backlinkItem: BacklinksItem) => {
            tableData.push({
              id: rowId,
              ...backlinkItem,
            });
            rowId++;
          });

          setData({
            backlinks: tableData,
          });
        } else {
          setTotalResults(0);
          setData({ backlinks: [] });
        }

        window.setTimeout(() => {
          document.getElementById("backlinks-table")?.scrollIntoView({
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
    if (formInput.target) {
      getBacklinks(
        formInput.target,
        formInput.mode ?? "one_per_domain",
        formInput.backlinksStatus ?? "live",
        formInput.includeSubdomains ?? true,
        formInput.onlyDofollow ?? false,
        formInput.onlyBroken ?? false,
        activeBacklinkFilters,
        MAX_ROWS,
        offset,
      );
    }
  }, [
    formInput.target,
    formInput.mode,
    formInput.backlinksStatus,
    formInput.includeSubdomains,
    formInput.onlyDofollow,
    formInput.onlyBroken,
    activeBacklinkFilters,
    offset,
    getBacklinks,
  ]);

  useEffect(() => {
    if (searchParams) {
      const { target } = searchParams;

      if (target) {
        setSelectedTarget(target);
        setFormInput({
          target,
        });
      }
    }
  }, [searchParams]);

  const refreshBacklinksData = useCallback(async () => {
    if (formInput.target) {
      getBacklinks(
        formInput.target,
        formInput.mode ?? "one_per_domain",
        formInput.backlinksStatus ?? "live",
        formInput.includeSubdomains ?? true,
        formInput.onlyDofollow ?? false,
        formInput.onlyBroken ?? false,
        activeBacklinkFilters,
        MAX_ROWS,
        offset,
        true,
      );
    }
  }, [
    formInput.target,
    formInput.mode,
    formInput.backlinksStatus,
    formInput.includeSubdomains,
    formInput.onlyDofollow,
    formInput.onlyBroken,
    activeBacklinkFilters,
    offset,
    MAX_ROWS,
    getBacklinks,
  ]);

  const getMUIRowHeight = useCallback(() => "auto", []);

  const getTogglableColumns = useCallback((columns: GridColDef[]) => {
    const hiddenColumns: Array<string> = [
      "anchor",
      "backlinkType",
      "followType",
      "backlinkBroken",
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
          fileName: `SEOToolSuite-backlink-checker-${formInput.target}-${formInput.backlinksStatus}-${currentPage}`,
          escapeFormulas: false,
        },
      },
      columnsManagement: {
        getTogglableColumns,
      },
    };
  }, [
    formInput.target,
    formInput.backlinksStatus,
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
          anchor: false,
          firstSeen: false,
          backlinkType: false,
          followType: false,
          backlinkBroken: false,
        },
      },
    };
  }, []);

  const onDataGridPaginationModelChange = useCallback(() => {
    window.setTimeout(() => {
      document.getElementById("backlinks-table")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  }, []);

  const tableColumns: GridColDef<BacklinksTableItem>[] = useMemo(
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
        field: "source",
        headerName: "Source",
        minWidth: 300,
        type: "string",
        display: "flex",
        flex: 1,
        align: "left",
        headerAlign: "left",
        cellClassName: "relative group",
        valueGetter: (_, row) => row.url_from,
        renderCell: (params) => (
          <div className="flex w-full flex-row gap-2 py-2.5">
            <div className="flex shrink-0 translate-y-1 flex-col gap-2">
              <div className="search-intent-badge rounded-md border border-b-2 border-slate-200 bg-black/1 p-1">
                <img
                  src={`https://www.google.com/s2/favicons?domain=${params.row.domain_from}&sz=128`}
                  loading="lazy"
                  alt=""
                  className="h-4 w-4"
                />
              </div>
            </div>
            <div className="flex w-full flex-col gap-1 overflow-hidden">
              {!params.row.page_from_title && "—"}
              {params.row.page_from_title && (
                <Tooltip content={params.row.page_from_title}>
                  <div className="w-full overflow-hidden text-nowrap text-ellipsis">
                    {params.row.page_from_title}
                  </div>
                </Tooltip>
              )}
              <Tooltip content={params.row.url_from}>
                <a
                  href={params.row.url_from}
                  target="_blank"
                  rel="nofollow"
                  className="block w-fit max-w-full overflow-hidden text-xs text-nowrap text-ellipsis text-black/80"
                >
                  {params.row.url_from
                    .replace("https://", "")
                    .replace("http://", "")}
                </a>
              </Tooltip>
              <div className="mt-1 flex flex-wrap items-center gap-1">
                {params.row.is_new && (
                  <Tooltip content="New Backlink">
                    <div className="search-intent-badge flex h-6 items-center justify-center rounded-md border border-b-2 border-slate-200 bg-black/1 px-2 text-green-700">
                      <PlusIcon size={14} />
                    </div>
                  </Tooltip>
                )}
                {params.row.is_lost && (
                  <Tooltip content="Lost Backlink">
                    <div className="search-intent-badge flex h-6 items-center justify-center rounded-md border border-b-2 border-slate-200 bg-black/1 px-2 text-red-700">
                      <MinusIcon size={14} />
                    </div>
                  </Tooltip>
                )}
                {params.row.dofollow ? (
                  <Tooltip content="DoFollow">
                    <div className="search-intent-badge flex h-6 items-center justify-center rounded-md border border-b-2 border-slate-200 bg-black/1 px-2 text-xs font-semibold text-green-700">
                      DF
                    </div>
                  </Tooltip>
                ) : (
                  <Tooltip content="NoFollow">
                    <div className="search-intent-badge flex h-6 items-center justify-center rounded-md border border-b-2 border-slate-200 bg-black/1 px-2 text-xs font-semibold text-black/70">
                      NF
                    </div>
                  </Tooltip>
                )}
                <div className="search-intent-badge flex h-6 items-center justify-center rounded-md border border-b-2 border-slate-200 bg-black/1 px-2">
                  {params.row.item_type === "anchor" && (
                    <Tooltip content="Backlink Type: Anchor">
                      <TypeIcon size={14} />
                    </Tooltip>
                  )}
                  {params.row.item_type === "image" && (
                    <Tooltip content="Backlink Type: Image">
                      <ImageIcon size={14} />
                    </Tooltip>
                  )}
                  {params.row.item_type === "redirect" && (
                    <Tooltip content="Backlink Type: Redirect">
                      <IterationCcwIcon size={14} />
                    </Tooltip>
                  )}
                  {params.row.item_type === "meta" && (
                    <Tooltip content="Backlink Type: Meta">
                      <FileCodeIcon size={14} />
                    </Tooltip>
                  )}
                  {params.row.item_type === "canonical" && (
                    <Tooltip content="Backlink Type: Canonical">
                      <FileCodeIcon size={14} />
                    </Tooltip>
                  )}
                  {params.row.item_type === "alternate" && (
                    <Tooltip content="Backlink Type: Alternate">
                      <FileCodeIcon size={14} />
                    </Tooltip>
                  )}
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        field: "target",
        headerName: "Target",
        minWidth: 300,
        type: "string",
        display: "flex",
        flex: 1,
        align: "left",
        headerAlign: "left",
        cellClassName: "min-h-12 relative group",
        valueGetter: (_, row) => row.url_to,
        renderCell: (params) => (
          <div className="flex w-full flex-col gap-1 overflow-hidden py-2">
            {!params.row.anchor && "—"}
            {params.row.anchor && (
              <Tooltip
                content={
                  <div className="max-w-80 py-1 text-black/70">
                    {params.row.text_pre}{" "}
                    <a
                      href={params.value}
                      rel="nofollow"
                      target="_blank"
                      className="font-medium text-sky-950 underline"
                    >
                      {params.row.anchor}
                    </a>{" "}
                    {params.row.text_post}
                  </div>
                }
              >
                <div className="w-fit max-w-full items-center justify-between gap-2 overflow-hidden text-nowrap text-ellipsis">
                  {params.row.anchor}
                </div>
              </Tooltip>
            )}
            <Tooltip content={params.value}>
              <a
                href={params.value}
                target="_blank"
                rel="nofollow"
                className="block w-fit max-w-full overflow-hidden text-xs text-nowrap text-ellipsis text-black/80"
              >
                {params.value.replace("https://", "").replace("http://", "")}
              </a>
            </Tooltip>
            {params.row.is_broken && (
              <div className="mt-1 flex flex-wrap items-center gap-1">
                <Tooltip content="Broken Backlink">
                  <div className="search-intent-badge flex h-6 items-center justify-center rounded-md border border-b-2 border-slate-200 bg-black/1 px-2 text-red-700">
                    <Link2OffIcon size={14} />
                  </div>
                </Tooltip>
              </div>
            )}
          </div>
        ),
      },
      {
        field: "anchor",
        headerName: "Anchor",
        type: "string",
        valueGetter: (_, row) => row.anchor ?? null,
      },
      {
        field: "backlinkType",
        headerName: "Type",
        type: "singleSelect",
        valueOptions: [
          "Anchor",
          "Image",
          "Redirect",
          "Meta",
          "Canonical",
          "Alternate",
        ],
        valueGetter: (_, row) =>
          row?.item_type
            ? `${row.item_type.charAt(0).toUpperCase() + row.item_type.slice(1)}`
            : null,
      },
      {
        field: "followType",
        headerName: "Follow",
        type: "singleSelect",
        valueOptions: ["DoFollow", "NoFollow"],
        valueGetter: (_, row) => (row?.dofollow ? "DoFollow" : "NoFollow"),
      },
      {
        field: "backlinkBroken",
        headerName: "Broken",
        type: "boolean",
        valueGetter: (_, row) => row.is_broken ?? false,
        valueFormatter: (_, row) => (row.is_broken ? "Yes" : "No"),
      },
      {
        field: "domainRank",
        headerName: "DR",
        description: "Source Domain Rank",
        type: "number",
        display: "flex",
        flex: 1,
        minWidth: 80,
        maxWidth: 80,
        resizable: false,
        align: "center",
        headerAlign: "left",
        valueGetter: (_, row) => row.domain_from_rank ?? null,
        renderCell: (params) => (
          <>
            {typeof params.value !== "number" ? (
              <div className="w-full px-2.5 text-center">N/A</div>
            ) : (
              <div className="relative flex h-9 w-12 flex-col items-center justify-center rounded-md border border-b-2 border-sky-950/50 bg-sky-950/10 text-center font-medium text-sky-950">
                <span className="relative z-20">{params.value}</span>
                <div className="mx-auto w-8 overflow-hidden rounded-full bg-sky-950/20">
                  <div
                    className="scale-x-anim h-1 origin-left bg-sky-950"
                    style={{
                      width: `${params.value}%`,
                    }}
                  ></div>
                </div>
              </div>
            )}
          </>
        ),
      },
      {
        field: "pageRank",
        headerName: "PR",
        description: "Source Page Rank",
        type: "number",
        display: "flex",
        flex: 1,
        minWidth: 80,
        maxWidth: 80,
        resizable: false,
        align: "center",
        headerAlign: "left",
        valueGetter: (_, row) => row.page_from_rank ?? null,
        renderCell: (params) => (
          <>
            {typeof params.value !== "number" ? (
              <div className="w-full px-2.5 text-center">N/A</div>
            ) : (
              <div className="relative flex h-9 w-12 flex-col items-center justify-center rounded-md border border-b-2 border-sky-950/50 bg-sky-950/10 text-center font-medium text-sky-950">
                <span className="relative z-20">{params.value}</span>
                <div className="mx-auto w-8 overflow-hidden rounded-full bg-sky-950/20">
                  <div
                    className="scale-x-anim h-1 origin-left bg-sky-950"
                    style={{
                      width: `${params.value}%`,
                    }}
                  ></div>
                </div>
              </div>
            )}
          </>
        ),
      },
      {
        field: "spamScore",
        headerName: "SS",
        description: "Backlink Spam Score",
        type: "number",
        display: "flex",
        flex: 1,
        minWidth: 80,
        maxWidth: 80,
        resizable: false,
        align: "left",
        headerAlign: "left",
        valueGetter: (_, row) => row.backlink_spam_score ?? null,
        renderCell: (params) => (
          <>
            {typeof params.value !== "number" ? (
              <div className="py-2">N/A</div>
            ) : (
              <div className="flex flex-wrap items-center gap-2">
                <span>{Math.round(params.value)}</span>
                {params?.value <= 30 && (
                  <div className="h-1.5 w-1.5 rounded-full bg-[#1ba005]"></div>
                )}
                {params?.value > 30 && params?.value <= 60 && (
                  <div className="h-1.5 w-1.5 rounded-full bg-[#ef7a24]"></div>
                )}
                {params?.value > 60 && (
                  <div className="h-1.5 w-1.5 rounded-full bg-[red]"></div>
                )}
              </div>
            )}
          </>
        ),
      },
      {
        field: "firstSeen",
        headerName: "First Seen",
        description: "Date First Seen",
        type: "dateTime",
        display: "flex",
        flex: 1,
        minWidth: 110,
        maxWidth: 110,
        resizable: false,
        align: "left",
        headerAlign: "left",
        valueGetter: (_, row) =>
          row.first_seen ? new Date(row.first_seen) : null,
        renderCell: (params) => (
          <div className="py-2 text-sm">
            {params.value ? getLocalDateFromISOString(params.value) : "N/A"}
          </div>
        ),
      },
      {
        field: "lastSeen",
        headerName: "Last Seen",
        description: "Date Last Seen",
        type: "dateTime",
        display: "flex",
        flex: 1,
        minWidth: 110,
        maxWidth: 110,
        resizable: false,
        align: "left",
        headerAlign: "left",
        valueGetter: (_, row) =>
          row.last_seen ? new Date(row.last_seen) : null,
        renderCell: (params) => (
          <div className="py-2 text-sm">
            {params.value ? getLocalDateFromISOString(params.value) : "N/A"}
          </div>
        ),
      },
    ],
    [],
  );

  return (
    <div className="backlink-checker-tool relative w-full px-4 py-4 lg:px-8 lg:py-8">
      <div className="tool-form-container relative flex w-full flex-col items-start justify-start rounded-md border-2 border-b-3 border-slate-200 bg-white p-5">
        <div className="absolute top-4 right-4 flex w-fit items-center gap-2">
          <Tooltip content="Credits Cost (Uncached)">
            <Chip size="md" variant="flat">
              ${parseFloat(Number(0.024 + MAX_ROWS * 0.000036).toFixed(4))}
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
            <LinkIcon
              size={28}
              className="animate-appearance-in scale-90 text-white"
            />
            <div
              className="animate-appearance-in h-6 w-0.5 rounded-md bg-white"
              style={{ animationDelay: "100ms" }}
            ></div>
            <GraphStarIcon
              size={22}
              className="animate-appearance-in text-white"
              style={{ animationDelay: "200ms" }}
            />
          </div>
          <div className="flex flex-col items-start md:translate-y-0.5">
            <div className="text-xl font-medium text-sky-950 md:leading-none">
              Backlink Checker
            </div>
            <div className="text-base font-medium text-slate-500">
              Analyze backlinks pointing to any domain, subdomain, or URL.
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
                  label="Domain / Subdomain / URL"
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
                <Select
                  name="backlinksStatus"
                  variant="flat"
                  label="Backlinks Status"
                  isRequired
                  isDisabled={isLoading}
                  selectedKeys={[selectedBacklinksStatus]}
                  className="select-input"
                  classNames={{
                    popoverContent: "border border-slate-200 border-b-2",
                  }}
                  onSelectionChange={(keys) => {
                    const val = Array.from(keys)[0] as BacklinksStatusType;
                    if (val) setSelectedBacklinksStatus(val);
                  }}
                >
                  <SelectItem key="all">All</SelectItem>
                  <SelectItem key="live">Live</SelectItem>
                  <SelectItem key="lost">Lost</SelectItem>
                </Select>
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
              <div className="mt-2 flex flex-wrap items-center gap-4">
                <Checkbox
                  name="includeSubdomains"
                  isSelected={includeSubdomains}
                  onValueChange={setIncludeSubdomains}
                  isDisabled={isLoading}
                  size="sm"
                >
                  Include Subdomains
                </Checkbox>
                <Checkbox
                  name="oneLinkPerDomain"
                  isSelected={oneLinkPerDomain}
                  onValueChange={setOneLinkPerDomain}
                  isDisabled={isLoading}
                  size="sm"
                >
                  One Link Per Domain
                </Checkbox>
                <Checkbox
                  name="onlyDofollow"
                  isSelected={onlyDofollow}
                  onValueChange={setOnlyDofollow}
                  isDisabled={isLoading}
                  size="sm"
                >
                  Only DoFollow
                </Checkbox>
                <Checkbox
                  name="onlyBroken"
                  isSelected={onlyBroken}
                  onValueChange={setOnlyBroken}
                  isDisabled={isLoading}
                  size="sm"
                >
                  Only Broken
                </Checkbox>
              </div>
              <div className="keyword-filters-container mt-3 w-full">
                <BacklinkCheckerFilters
                  initialValues={activeBacklinkFilters}
                  activeFiltersCount={activeBacklinkFiltersCount}
                />
              </div>
            </Form>
          )}
        </div>
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
            id="backlinks-table"
          >
            <div className="header flex w-full items-center justify-between gap-2 border-b-2 border-slate-200 px-4 py-3 text-base md:text-lg">
              <div className="flex items-center gap-2">
                <GraphStarIcon size={20} />
                <span>
                  Backlinks ({totalResults.toLocaleString(navigator.language)})
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
                        onClick={refreshBacklinksData}
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
                rows={data.backlinks}
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
                Showing {offset + 1}-{offset + data.backlinks.length} results of{" "}
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
    </div>
  );
};

export default memo(BacklinkCheckerTool);
