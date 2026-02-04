"use client";

import AutoComplete from "@/services/AutoComplete";
import {
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
  ClipboardCopyIcon,
  LoaderPinwheelIcon,
  TelescopeIcon,
} from "lucide-react";
import Image from "next/image";
import { memo, useCallback, useEffect, useMemo, useState } from "react";

type KeywordAutocompleteItem = {
  id: number;
  keyword: string;
  wordsCount: number;
  prefix?: string;
  suffix?: string;
};

type KeywordAutocompleteModifier = {
  prefix?: string;
  suffix?: string;
};

type KeywordAutocompleteModifiers = KeywordAutocompleteModifier[];

const KeywordAutocompleteTool = ({
  searchParams,
}: {
  searchParams?: Promise<{
    keyword?: string;
    location_code?: string;
    language_code?: string;
  }>;
}) => {
  const dataGridRef = useGridApiRef();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [selectedKeyword, setSelectedKeyword] = useState<string>("");
  const [selectedLocationKey, setSelectedLocationKey] =
    useState<string>("2356");
  const [selectedLanguageKey, setSelectedLanguageKey] = useState<string>("en");

  const [keywordModifiersDone, setKeywordModifiersDone] = useState<number>(0);
  const [keywordSuggestionsFound, setKeywordSuggestionsFound] =
    useState<number>(0);

  const [formInput, setFormInput] = useState<{
    keyword?: string;
    location_code?: string;
    language_code?: string;
  }>({});

  const keywordAutocompleteModifiers: KeywordAutocompleteModifiers = useMemo(
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

  const totalKeywordAutocompleteModifiers = keywordAutocompleteModifiers.length;
  const keywordAutocompleteProgress =
    (keywordModifiersDone / totalKeywordAutocompleteModifiers) * 100;

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

  const dataGridSlotProps = useMemo(() => {
    return {
      toolbar: {
        csvOptions: {
          allColumns: true,
          fileName: `SEOToolSuite-autocomplete-suggestions-${formInput.keyword}-${formInput.location_code}-${formInput.language_code}`,
          escapeFormulas: false,
        },
      },
    };
  }, [formInput.keyword, formInput.location_code, formInput.language_code]);

  const handleKeywordClipboardCopy = useCallback(async (keyword: string) => {
    if ("clipboard" in navigator) {
      await navigator.clipboard.writeText(keyword);
      addToast({
        title: "Keyword copied to clipboard.",
        color: "default",
      });
    }
  }, []);

  const getKeywordAutocompleteSuggestions = useCallback(
    async (
      keyword: string,
      locationCode: string,
      languageCode: string,
      locationName?: string,
    ) => {
      setIsLoading(true);
      setKeywordModifiersDone(0);
      setKeywordSuggestionsFound(0);

      if (dataGridRef.current) {
        dataGridRef.current.setRows([]);
      }

      window.setTimeout(() => {
        document.getElementById("keywords-table")?.scrollIntoView({
          behavior: "smooth",
        });
      }, 200);

      const autocompleteSuggestions: string[] = [];
      const AutoCompleteService = new AutoComplete();
      let rowId = 1;

      try {
        trackUmamiEvent("keyword-research/autocomplete", {
          location: locationName || "N/A",
        });
      } catch (error) {
        console.error(error);
      }

      for (const keywordAutocompleteModifier of keywordAutocompleteModifiers) {
        let finalKeyword = keyword;
        if (keywordAutocompleteModifier.prefix)
          finalKeyword = `${keywordAutocompleteModifier.prefix} ${finalKeyword}`;
        if (keywordAutocompleteModifier.suffix)
          finalKeyword = `${finalKeyword} ${keywordAutocompleteModifier.suffix}`;

        try {
          const keywordAutocompleteSuggestions =
            await AutoCompleteService.getGoogleSuggestQueries(
              finalKeyword,
              locationCode,
              languageCode,
            );

          if (
            keywordAutocompleteSuggestions &&
            keywordAutocompleteSuggestions.length > 0
          ) {
            for (const keywordAutocompleteSuggestion of keywordAutocompleteSuggestions) {
              if (
                autocompleteSuggestions.includes(keywordAutocompleteSuggestion)
              )
                continue;

              const tableRow: KeywordAutocompleteItem = {
                id: rowId,
                keyword: keywordAutocompleteSuggestion,
                wordsCount: keywordAutocompleteSuggestion.split(" ").length,
                prefix: keywordAutocompleteModifier.prefix,
                suffix: keywordAutocompleteModifier.suffix,
              };

              if (dataGridRef.current) {
                dataGridRef.current.updateRows([tableRow]);
                rowId++;
              }
              setKeywordSuggestionsFound((prev) => prev + 1);
              autocompleteSuggestions.push(keywordAutocompleteSuggestion);
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
    [keywordAutocompleteModifiers, dataGridRef],
  );

  const handleFormSubmit = useCallback(
    async (e: React.SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();

      const keyword: string = selectedKeyword;
      const location_code: string = selectedLocationKey;
      const language_code: string = selectedLanguageKey;

      if (!keyword || !location_code || !language_code) {
        return;
      }

      setFormInput({
        keyword,
        location_code,
        language_code,
      });
    },
    [selectedKeyword, selectedLocationKey, selectedLanguageKey],
  );

  useEffect(() => {
    if (
      formInput.keyword &&
      formInput.location_code &&
      formInput.language_code
    ) {
      getKeywordAutocompleteSuggestions(
        formInput.keyword,
        getDataForSEOLocationFromCode(Number(formInput.location_code))
          ?.country_iso_code || "in",
        formInput.language_code,
        getDataForSEOLocationFromCode(Number(formInput.location_code))
          ?.location_name,
      );
    }
  }, [
    formInput.keyword,
    formInput.location_code,
    formInput.language_code,
    getKeywordAutocompleteSuggestions,
  ]);

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
              <div className="top-0 right-2 bottom-0 z-50 my-auto flex h-fit shrink-0 items-center rounded-md border border-slate-200 bg-white shadow-xs transition group-hover:opacity-100 focus-visible:opacity-100 has-[.keyword-action:focus-visible]:opacity-100 lg:absolute lg:opacity-0">
                <Tooltip content="Copy Keyword">
                  <button
                    onClick={() => handleKeywordClipboardCopy(params.value)}
                    className="keyword-action cursor-pointer rounded-md p-2 text-black/80 transition"
                  >
                    <ClipboardCopyIcon size={18} />
                  </button>
                </Tooltip>
              </div>
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
    window.setTimeout(() => {
      document.getElementById("keywords-table")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  }, []);

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
    <div className="keyword-autocomplete-tool relative w-full px-4 py-4 lg:px-8 lg:py-8">
      <div className="tool-form-container relative flex w-full flex-col items-start justify-start rounded-md border-2 border-slate-200 bg-white p-5">
        {isLoading && (
          <div className="absolute top-0 left-0 z-20 w-full overflow-hidden rounded-t-md">
            <Progress
              aria-label="Keyword Autocomplete Progress"
              className="rounded-t-md"
              size="sm"
              radius="none"
              color="primary"
              value={keywordAutocompleteProgress}
            />
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
            <LoaderPinwheelIcon
              size={22}
              className="animate-appearance-in text-white"
              style={{ animationDelay: "200ms" }}
            />
          </div>
          <div className="flex flex-col items-start md:translate-y-0.5">
            <div className="text-xl font-medium text-sky-950 md:leading-none">
              Keyword Autocomplete
            </div>
            <div className="text-base font-medium text-slate-500">
              Generate long-tail keywords using Google autocomplete.
            </div>
          </div>
        </div>

        <div className="tool-input-form-container mt-4 w-full">
          <Form
            onSubmit={handleFormSubmit}
            className="tool-input-form flex w-full flex-col items-start justify-start"
          >
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
          </Form>
        </div>
      </div>
      {(isLoading || keywordSuggestionsFound > 0) && (
        <>
          <div className="tool-results-container mt-4 flex w-full flex-col gap-8 md:gap-4 lg:mt-8 lg:flex-row">
            <div
              className="tool-results-table-container h-fit w-full scroll-m-4 overflow-auto rounded-md border-2 border-slate-200 bg-white lg:scroll-m-8"
              id="keywords-table"
            >
              <div className="header flex w-full items-center gap-2 border-b-2 border-slate-200 px-4 py-3 text-base md:text-lg">
                <LoaderPinwheelIcon size={20} />
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
                  slotProps={dataGridSlotProps}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default memo(KeywordAutocompleteTool);
