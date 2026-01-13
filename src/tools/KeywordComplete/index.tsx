"use client";

import AutoComplete from "@/services/AutoComplete";
import {
  getDataForSEOLanguageFromCode,
  getDataForSEOLanguages,
  getDataForSEOLocationFromCode,
  getDataForSEOLocations,
} from "@/utils/dataforseo";
import { getFlagImageUrl } from "@/utils/flags";
import { trackUmamiEvent } from "@/utils/umami";
import {
  addToast,
  Autocomplete,
  AutocompleteItem,
  Button,
  Form,
  Input,
  Progress,
  Tooltip,
} from "@heroui/react";
import { DataGrid, GridColDef, useGridApiRef } from "@mui/x-data-grid";
import {
  ArrowLeftIcon,
  ClipboardCopyIcon,
  LanguagesIcon,
  LightbulbIcon,
  MapPinIcon,
  SearchIcon,
  TextSearchIcon,
} from "lucide-react";
import Image from "next/image";
import { memo, useCallback, useEffect, useMemo, useState } from "react";

type KeywordCompleteItem = {
  id: number;
  keyword: string;
  wordsCount: number;
  prefix?: string;
  suffix?: string;
};

type KeywordCompleteModifier = {
  prefix?: string;
  suffix?: string;
};

type KeywordCompleteModifiers = KeywordCompleteModifier[];

const KeywordCompleteTool = () => {
  const dataGridRef = useGridApiRef();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDataPageActive, setIsDataPageActive] = useState<boolean>(false);
  const [selectedLocationKey, setSelectedLocationKey] =
    useState<string>("2356");
  const [selectedLanguageKey, setSelectedLanguageKey] = useState<string>("en");
  const [keywordModifiersDone, setKeywordModifiersDone] = useState<number>(0);
  const [keywordSuggestionsFound, setKeywordSuggestionsFound] =
    useState<number>(0);
  const [formInputData, setFormInputData] = useState<{
    keyword?: string;
    location_code?: string;
    language_code?: string;
  }>({});

  const keywordCompleteModifiers: KeywordCompleteModifiers = useMemo(
    () => [
      {},
      // Prefix (a-z).
      { prefix: "a" },
      { prefix: "b" },
      { prefix: "c" },
      { prefix: "d" },
      { prefix: "e" },
      { prefix: "f" },
      { prefix: "g" },
      { prefix: "h" },
      { prefix: "i" },
      { prefix: "j" },
      { prefix: "k" },
      { prefix: "l" },
      { prefix: "m" },
      { prefix: "n" },
      { prefix: "o" },
      { prefix: "p" },
      { prefix: "q" },
      { prefix: "r" },
      { prefix: "s" },
      { prefix: "t" },
      { prefix: "u" },
      { prefix: "v" },
      { prefix: "w" },
      { prefix: "x" },
      { prefix: "y" },
      { prefix: "z" },
      // Suffix (a-z).
      { suffix: "a" },
      { suffix: "b" },
      { suffix: "c" },
      { suffix: "d" },
      { suffix: "e" },
      { suffix: "f" },
      { suffix: "g" },
      { suffix: "h" },
      { suffix: "i" },
      { suffix: "j" },
      { suffix: "k" },
      { suffix: "l" },
      { suffix: "m" },
      { suffix: "n" },
      { suffix: "o" },
      { suffix: "p" },
      { suffix: "q" },
      { suffix: "r" },
      { suffix: "s" },
      { suffix: "t" },
      { suffix: "u" },
      { suffix: "v" },
      { suffix: "w" },
      { suffix: "x" },
      { suffix: "y" },
      { suffix: "z" },
      // Prefix (0-9).
      { prefix: "0" },
      { prefix: "1" },
      { prefix: "2" },
      { prefix: "3" },
      { prefix: "4" },
      { prefix: "5" },
      { prefix: "6" },
      { prefix: "7" },
      { prefix: "8" },
      { prefix: "9" },
      // Suffix (0-9).
      { suffix: "0" },
      { suffix: "1" },
      { suffix: "2" },
      { suffix: "3" },
      { suffix: "4" },
      { suffix: "5" },
      { suffix: "6" },
      { suffix: "7" },
      { suffix: "8" },
      { suffix: "9" },
      // Common prefix/suffix words.
      { prefix: "is" },
      { prefix: "for" },
      { prefix: "near" },
      { prefix: "without" },
      { prefix: "can" },
      { prefix: "to" },
      { prefix: "with" },
      { prefix: "why" },
      { prefix: "where" },
      { prefix: "can" },
      { prefix: "who" },
      { prefix: "which" },
      { prefix: "will" },
      { prefix: "when" },
      { prefix: "what" },
      { prefix: "are" },
      { prefix: "how" },
      { prefix: "how many" },
      { prefix: "how much" },
      { prefix: "how often" },
      { suffix: "vs" },
      { suffix: "and" },
      { suffix: "like" },
      { suffix: "versus" },
      { suffix: "or" },
    ],
    [],
  );

  const totalKeywordCompleteModifiers = keywordCompleteModifiers.length;
  const keywordCompleteProgress =
    (keywordModifiersDone / totalKeywordCompleteModifiers) * 100;

  const locations = getDataForSEOLocations();
  const languages = getDataForSEOLanguages();

  const getMUIRowHeight = useCallback(() => "auto", []);

  const dataGridInitialState = useMemo(() => {
    return {
      pagination: {
        paginationModel: { page: 0, pageSize: 100 },
      },
    };
  }, []);

  const handleKeywordClipboardCopy = useCallback(async (keyword: string) => {
    if ("clipboard" in navigator) {
      await navigator.clipboard.writeText(keyword);
      addToast({
        title: "Keyword copied to clipboard.",
        color: "default",
      });
    }
  }, []);

  const getKeywordCompleteSuggestions = useCallback(
    async (keyword: string, locationCode: string, languageCode: string) => {
      setIsLoading(true);
      setKeywordModifiersDone(0);
      setKeywordSuggestionsFound(0);

      const completeSuggestions: string[] = [];
      const AutoCompleteService = new AutoComplete();
      let rowId = 1;

      try {
        trackUmamiEvent("keyword-complete", {
          location:
            getDataForSEOLocationFromCode(Number(locationCode))
              ?.location_name ?? "N/A",
        });
      } catch (error) {
        console.error(error);
      }

      for (const keywordCompleteModifier of keywordCompleteModifiers) {
        let finalKeyword = keyword;
        if (keywordCompleteModifier.prefix)
          finalKeyword = `${keywordCompleteModifier.prefix} ${finalKeyword}`;
        if (keywordCompleteModifier.suffix)
          finalKeyword = `${finalKeyword} ${keywordCompleteModifier.suffix}`;

        try {
          const keywordCompleteSuggestions =
            await AutoCompleteService.getGoogleSuggestQueries(
              finalKeyword,
              locationCode,
              languageCode,
            );

          if (
            keywordCompleteSuggestions &&
            keywordCompleteSuggestions.length > 0
          ) {
            for (const keywordCompleteSuggestion of keywordCompleteSuggestions) {
              if (completeSuggestions.includes(keywordCompleteSuggestion))
                continue;

              const tableRow: KeywordCompleteItem = {
                id: rowId,
                keyword: keywordCompleteSuggestion,
                wordsCount: keywordCompleteSuggestion.split(" ").length,
                prefix: keywordCompleteModifier.prefix,
                suffix: keywordCompleteModifier.suffix,
              };

              if (dataGridRef.current)
                dataGridRef.current.updateRows([tableRow]);
              rowId++;
              setKeywordSuggestionsFound((prev) => prev + 1);
              completeSuggestions.push(keywordCompleteSuggestion);
            }
          }
        } catch (error: any) {
          console.error(error);
          addToast({
            title: "Google Suggest API Error",
            description: `Failed to get suggest queries for keyword: ${finalKeyword}.`,
            color: "danger",
          });
        } finally {
          setKeywordModifiersDone((prev) => prev + 1);
        }
      }

      setIsLoading(false);
    },
    [keywordCompleteModifiers, dataGridRef],
  );

  const handleFormSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const keyword: string = formData.get("keyword") as string;
      const location_code: string = selectedLocationKey;
      const language_code: string = selectedLanguageKey;

      if (!keyword || !location_code || !language_code) {
        return;
      }

      setFormInputData({
        keyword,
        location_code,
        language_code,
      });

      setIsDataPageActive(true);
    },
    [selectedLocationKey, selectedLanguageKey],
  );

  useEffect(() => {
    if (
      formInputData.keyword &&
      formInputData.location_code &&
      formInputData.language_code
    ) {
      getKeywordCompleteSuggestions(
        formInputData.keyword,
        getDataForSEOLocationFromCode(Number(formInputData.location_code))
          ?.country_iso_code || "in",
        formInputData.language_code,
      );
    }
  }, [formInputData, getKeywordCompleteSuggestions]);

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
              <Tooltip content="Copy Keyword">
                <button
                  onClick={() => handleKeywordClipboardCopy(params.value)}
                  className="top-0 right-2 bottom-0 z-90 my-auto h-fit shrink-0 cursor-pointer rounded-md border border-slate-200 bg-white p-2 text-black shadow-xs transition group-hover:opacity-100 hover:border-slate-400 focus-visible:opacity-100 lg:absolute lg:opacity-0"
                >
                  <ClipboardCopyIcon size={16} />
                </button>
              </Tooltip>
            </div>
          </>
        ),
      },
      {
        field: "wordsCount",
        display: "flex",
        headerName: "Words",
        description: "No. of Words In Keyword",
        type: "number",
        width: 128,
      },
      {
        field: "prefix",
        display: "flex",
        headerName: "Prefix",
        description: "Prefix Used",
        type: "string",
      },
      {
        field: "suffix",
        display: "flex",
        headerName: "Suffix",
        description: "Suffix Used",
        type: "string",
      },
    ],
    [handleKeywordClipboardCopy],
  );

  const onDataGridPaginationModelChange = useCallback(() => {
    document.getElementById("keywords-table")?.scrollIntoView({
      behavior: "instant",
    });
  }, []);

  return (
    <div className="keyword-complete-tool w-full">
      {!isDataPageActive && !isLoading && (
        <>
          <div className="tool-form-container relative flex w-full flex-col items-center justify-center px-4 py-8 md:px-8 md:py-16">
            <div
              className={
                `tool-input-icon relative rounded-full border border-sky-950 bg-sky-950 p-5` +
                `${isLoading ? " loading" : ""}`
              }
            >
              <LightbulbIcon size={60} className="text-white" />
              <div className="tool-input-icon-border absolute top-0 left-0 h-full w-full rounded-full border border-sky-500 border-t-transparent border-b-transparent p-1 opacity-0 transition-all"></div>
            </div>
            <div className="tool-input-heading mt-3 text-center text-3xl font-medium text-slate-900">
              Keyword Complete
            </div>
            <div className="tool-input-sub-heading mt-0 w-full text-center text-lg font-medium text-slate-500 md:text-xl">
              Generate long-tail keywords using Google autocomplete.
            </div>

            <div className="tool-input-form-container mt-8 w-full">
              <Form
                onSubmit={handleFormSubmit}
                className="tool-input-form mx-auto flex w-full flex-col items-center justify-start rounded-md border-2 border-slate-200 bg-white p-5 lg:w-1/2 lg:min-w-[800px]"
              >
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
          </div>
        </>
      )}
      {isDataPageActive && (
        <>
          <div className="relative flex w-full flex-col justify-between gap-4 border-b-2 border-slate-200 bg-white py-4 md:flex-row md:gap-0 md:py-0">
            {isLoading && (
              <div className="absolute top-0 left-0 z-20 w-full">
                <Progress
                  aria-label="Keyword Complete Progress"
                  size="sm"
                  radius="none"
                  color="primary"
                  value={keywordCompleteProgress}
                />
              </div>
            )}
            <div
              className={`flex h-full min-h-16 w-full flex-col items-stretch gap-4 md:flex-row md:gap-2 ${isLoading ? "mt-1" : ""}`}
            >
              <div className="flex h-full min-h-auto shrink-0 items-center gap-2 border-r-0 border-slate-200 px-4 md:min-h-16 md:border-r-2">
                <div className="relative rounded-full bg-sky-950 p-2">
                  <LightbulbIcon size={20} className="text-white" />
                </div>
                <span>Keyword Complete</span>
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

                <div className="flex items-center gap-2 md:ml-auto"></div>
              </div>
            </div>
            <div
              className={`flex h-full min-h-auto items-center gap-2 border-l-0 border-slate-200 px-4 md:min-h-16 md:border-l-2 ${isLoading ? "mt-1" : ""}`}
            >
              <Button
                color="default"
                variant="flat"
                size="md"
                onPress={() => window.location.reload()}
              >
                <ArrowLeftIcon size={16} />
                <span>Back</span>
              </Button>
            </div>
          </div>

          <div className="tool-results-container flex w-full flex-col gap-8 p-4 md:gap-4 md:p-8 lg:flex-row">
            <div
              className="tool-results-table-container h-fit w-full scroll-m-8 overflow-auto rounded-md border-2 border-slate-200 bg-white"
              id="keywords-table"
            >
              <div className="header flex w-full items-center gap-2 border-b-2 border-slate-200 px-4 py-3 text-base md:text-lg">
                <TextSearchIcon size={20} />
                <span>
                  Autocomplete Suggestions (
                  {keywordSuggestionsFound.toLocaleString(navigator.language)})
                </span>
              </div>
              <div className="max-h-full overflow-auto p-4">
                <DataGrid
                  apiRef={dataGridRef}
                  showCellVerticalBorder
                  showColumnVerticalBorder
                  columns={tableColumns}
                  initialState={dataGridInitialState}
                  showToolbar
                  disableRowSelectionOnClick
                  getRowHeight={getMUIRowHeight}
                  onPaginationModelChange={onDataGridPaginationModelChange}
                  checkboxSelection
                  slotProps={{
                    toolbar: {
                      csvOptions: {
                        allColumns: true,
                        fileName: `SEOToolSuite-autocomplete-suggestions-${formInputData.keyword}-${formInputData.location_code}-${formInputData.language_code}`,
                        escapeFormulas: false,
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default memo(KeywordCompleteTool);
