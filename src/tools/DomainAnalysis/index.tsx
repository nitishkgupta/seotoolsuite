"use client";

import { memo, useCallback, useMemo, useState } from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import DomainAnalysisLoader from "./loader";
import { BoxIcon, DatabaseZapIcon, GlobeIcon } from "lucide-react";
import {
  Alert,
  Autocomplete,
  AutocompleteItem,
  Button,
  Form,
  Input,
  Tooltip,
} from "@heroui/react";
import { getFlagImageUrl } from "@/utils/flags";
import {
  getDataForSEOLocations,
  getDataForSEOLanguages,
  getDataForSEOLocationFromCode,
} from "@/utils/dataforseo";
import Image from "next/image";
import { getLocalStorageItem } from "@/utils/localStorage";
import Link from "next/link";
import DataForSEO from "@/services/DataForSEO";
import { trackUmamiEvent } from "@/utils/umami";
import useDFSBalance from "@/hooks/useDFSBalance";
import useDFSCredentials from "@/hooks/useDFSCredentials";

type DomainKeywordItem = {
  id: number;
  keyword: string;
  searchVolume: number | null;
  competition: number | null;
  cpc: number | null;
};

type DomainKeywordData = DomainKeywordItem[];

const DomainAnalysisTool = () => {
  const { refreshDFSBalance } = useDFSBalance(false);
  const { credentials: dfsCredentials, isLoading: isCredentialsLoading } =
    useDFSCredentials();

  const [dfsSandboxEnabled, setDFSSandboxEnabled] = useState<boolean>(false);
  const [cachingEnabled, setCachingEnabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<DomainKeywordData>([]);
  const [isDataPageActive, setIsDataPageActive] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>();
  const [analyzedDomain, setAnalyzedDomain] = useState<string>("");
  const [selectedLocationKey, setSelectedLocationKey] =
    useState<string>("2840");
  const [selectedLanguageKey, setSelectedLanguageKey] = useState<string>("en");

  const dfsUsername = dfsCredentials?.username;
  const dfsPassword = dfsCredentials?.password;

  const locations = getDataForSEOLocations();
  const languages = getDataForSEOLanguages();

  const getMUIRowHeight = useCallback(() => "auto", []);

  const dataGridInitialState = useMemo(() => {
    return {
      pagination: {
        paginationModel: { page: 0, pageSize: 20 },
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
        minWidth: 300,
        type: "string",
        display: "flex",
        flex: 1,
        align: "left",
        headerAlign: "left",
      },
      {
        field: "searchVolume",
        headerName: "Search Volume",
        description: "Monthly Search Volume",
        type: "number",
        display: "flex",
        flex: 1,
        minWidth: 150,
        align: "left",
        headerAlign: "left",
        renderCell: (params) => (
          <>
            {typeof params.value !== "number" ? (
              <div>N/A</div>
            ) : (
              <div className="py-2">
                {params.value.toLocaleString(navigator.language)}
              </div>
            )}
          </>
        ),
      },
      {
        field: "competition",
        headerName: "Competition",
        description: "Paid Competition Level",
        type: "number",
        display: "flex",
        flex: 1,
        minWidth: 130,
        align: "left",
        headerAlign: "left",
        renderCell: (params) => (
          <>
            {typeof params.value !== "number" ? (
              <div>N/A</div>
            ) : (
              <div className="py-2">{Math.round(params.value * 100)}%</div>
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
        minWidth: 100,
        align: "left",
        headerAlign: "left",
        renderCell: (params) => (
          <>
            {typeof params.value !== "number" ? (
              <div>N/A</div>
            ) : (
              <div className="py-2">${params.value.toFixed(2)}</div>
            )}
          </>
        ),
      },
    ],
    [],
  );

  const getDomainKeywords = useCallback(
    async (
      domain: string,
      location_code: string,
      language_code: string,
    ) => {
      const dfsSandboxEnabled =
        getLocalStorageItem("DATAFORSEO_SANDBOX") === "true";
      const cachingEnabled = getLocalStorageItem("CACHING_ENABLED") === "true";
      setIsDataPageActive(false);
      setIsLoading(true);
      setFormError(null);

      if (!dfsUsername || !dfsPassword) {
        setFormError(
          "DataForSEO API not connected. Please add credentials from settings.",
        );
        setIsLoading(false);
        return;
      }

      if (!dfsSandboxEnabled) {
        try {
          trackUmamiEvent("domain-analysis", {
            location:
              getDataForSEOLocationFromCode(Number(location_code))
                ?.location_name ?? "N/A",
          });
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
        const result = await DataForSEOService.getKeywordsForDomain(
          domain,
          Number(location_code),
          language_code,
          20,
          0,
        );

        if (result.statusCode !== 20000) {
          setIsLoading(false);
          setFormError(`DataForSEO API error: Status code ${result.statusCode}`);
          return;
        }

        setIsLoading(false);

        if (result.data && result.data.length > 0) {
          const tableData: DomainKeywordData = result.data.slice(0, 20).map((item, index) => ({
            id: index + 1,
            keyword: item.keyword,
            searchVolume: item.searchVolume ?? null,
            competition: item.competition ?? null,
            cpc: item.cpc ?? null,
          }));

          setData(tableData);
          setAnalyzedDomain(domain);
        } else {
          setData([]);
          setFormError("No keywords found for this domain.");
        }

        setIsDataPageActive(true);
        if (!dfsSandboxEnabled) refreshDFSBalance();
      } catch (error: unknown) {
        console.error(error);
        setIsLoading(false);
        const err = error as { message?: string; response?: { data?: { tasks?: Array<{ status_message?: string }> } } };
        if (err?.response?.data?.tasks?.[0]?.status_message) {
          setFormError(
            `DataForSEO API error: ${err.response.data.tasks[0].status_message}`,
          );
        } else {
          setFormError(
            `Error analyzing domain. Please try again.`,
          );
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
      const domain = formData.get("domain")?.toString() ?? "";
      const location_code = selectedLocationKey;
      const language_code = selectedLanguageKey;

      if (!domain) {
        setFormError("Please enter a domain.");
        return;
      }

      setDFSSandboxEnabled(
        getLocalStorageItem("DATAFORSEO_SANDBOX") === "true",
      );
      setCachingEnabled(getLocalStorageItem("CACHING_ENABLED") === "true");

      getDomainKeywords(domain, location_code, language_code);
    },
    [selectedLocationKey, selectedLanguageKey, getDomainKeywords],
  );

  if (isCredentialsLoading) {
    return <DomainAnalysisLoader />;
  }

  return (
    <div className="domain-analysis-tool">
      {isDataPageActive && data.length > 0 && (
        <div className="flex h-16 w-full flex-row items-center justify-between border-b-2 border-slate-200 bg-white px-4">
          <div className="flex items-center gap-2">
            <Button
              variant="flat"
              onClick={() => {
                setIsDataPageActive(false);
                setData([]);
                setAnalyzedDomain("");
              }}
            >
              ← New Search
            </Button>
            <span className="text-lg font-medium">{analyzedDomain}</span>
          </div>
          <div className="flex items-center gap-2">
            {dfsSandboxEnabled && (
              <Tooltip content="Sandbox Mode Enabled" placement="bottom-end">
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
        </div>
      )}

      {isDataPageActive && data.length > 0 ? (
        <div className="p-4 md:p-8">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold">{analyzedDomain}</h2>
            <p className="text-slate-500">
              Top {data.length} keywords by search volume
            </p>
          </div>
          <div className="rounded-md border-2 border-slate-200 bg-white">
            <DataGrid
              rows={data}
              columns={tableColumns}
              initialState={dataGridInitialState}
              getRowHeight={getMUIRowHeight}
              disableRowSelectionOnClick
              pageSizeOptions={[10, 20]}
              sx={{
                border: "none",
                fontFamily: "Poppins, sans-serif",
                "& .MuiDataGrid-cell": {
                  borderColor: "#e2e8f0",
                },
                "& .MuiDataGrid-columnHeaders": {
                  borderColor: "#e2e8f0",
                  backgroundColor: "#f8fafc",
                },
                "& .MuiDataGrid-footerContainer": {
                  borderColor: "#e2e8f0",
                },
              }}
            />
          </div>
        </div>
      ) : (
        <>
          {(dfsSandboxEnabled || cachingEnabled) && (
            <div className="flex items-center gap-2 px-4 py-4">
              {dfsSandboxEnabled && (
                <Tooltip content="Sandbox Mode Enabled" placement="bottom-end">
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
              <GlobeIcon size={60} className="text-white" />
              <div className="tool-input-icon-border absolute top-0 left-0 h-full w-full rounded-full border border-sky-500 border-t-transparent border-b-transparent p-1 opacity-0 transition-all"></div>
            </div>
            <div className="tool-input-heading mt-3 text-3xl font-medium text-slate-900">
              Domain Analysis
            </div>
            <div className="tool-input-sub-heading mt-0 w-full text-center text-lg font-medium text-slate-500 md:text-xl">
              Discover top keywords a domain ranks for.
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
                  className="tool-input-form mx-auto flex w-full flex-col items-center justify-start rounded-md border-2 border-slate-200 bg-white p-5 lg:w-1/2 lg:min-w-[600px]"
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
                      name="domain"
                      variant="flat"
                      type="text"
                      label="Domain"
                      placeholder="example.com"
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
                              height={16}
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
                  <div className="mt-4 flex w-full flex-row justify-end gap-2">
                    <Button
                      type="submit"
                      color="primary"
                      className="w-full md:w-auto"
                      isLoading={isLoading}
                    >
                      Analyze Domain
                    </Button>
                  </div>
                </Form>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default memo(DomainAnalysisTool);
