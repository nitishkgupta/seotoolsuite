import DataForSEOLocationsData from "@/data/dataforseo-locations-data.json";
import DataForSEOLanguagesData from "@/data/dataforseo-languages-data.json";
import { MONTH_NAMES } from "@/constants";

export type DataForSEOLocation = {
  location_name: string;
  country_iso_code: string;
  location_code: number;
};

export type DataForSEOLanguage = {
  language_name: string;
  language_code: string;
};

export type DataForSEOKeywordFilters = {
  minSearchVolume?: number;
  maxSearchVolume?: number;
  minCPC?: number;
  maxCPC?: number;
  minPPC?: number;
  maxPPC?: number;
  minKD?: number;
  maxKD?: number;
  includeKeyword?: string;
  excludeKeyword?: string;
  searchIntents?: Array<
    "informational" | "navigational" | "commercial" | "transactional"
  >;
};

/**
 * Get DataForSEO locations.
 */
export function getDataForSEOLocations(): DataForSEOLocation[] {
  const locations: DataForSEOLocation[] = [];
  const locationsData = DataForSEOLocationsData.tasks[0].result;

  locationsData.forEach((location: any) => {
    if (location.location_type === "Country") {
      locations.push({
        location_name: location.location_name,
        country_iso_code: location.country_iso_code.toLowerCase(),
        location_code: location.location_code,
      });
    }
  });

  return locations;
}

/**
 * Get DataForSEO location from code.
 */
export function getDataForSEOLocationFromCode(
  location_code: number,
): DataForSEOLocation | null {
  const locations = getDataForSEOLocations();
  return (
    locations.find((location) => location.location_code === location_code) ??
    null
  );
}

/**
 * Get DataForSEO languages.
 */
export function getDataForSEOLanguages(
  includeAnyLanguage: boolean = false,
): DataForSEOLanguage[] {
  const languages: DataForSEOLanguage[] = [];
  const languagesData = DataForSEOLanguagesData.tasks[0].result;

  if (includeAnyLanguage) {
    languages.push({
      language_name: "Any Language",
      language_code: "any",
    });
  }

  languagesData.forEach((language: any) => {
    languages.push({
      language_name: language.language_name,
      language_code: language.language_code,
    });
  });

  return languages;
}

/**
 * Get DataForSEO language from code.
 */
export function getDataForSEOLanguageFromCode(
  language_code: string,
): DataForSEOLanguage | null {
  const languages = getDataForSEOLanguages();
  return (
    languages.find((language) => language.language_code === language_code) ??
    null
  );
}

/**
 * Build DataForSEO keyword filters input.
 */
export function buildDataForSEOKeywordFilters(
  filters: DataForSEOKeywordFilters,
): Array<any> {
  if (Object.keys(filters).length > 0) {
    const dfsFilters = [];

    for (const [key, value] of Object.entries(filters)) {
      if (key === "minSearchVolume" && typeof value === "number") {
        if (dfsFilters.length > 0) dfsFilters.push("and");
        dfsFilters.push(["keyword_info.search_volume", ">=", value]);
      }

      if (key === "maxSearchVolume" && typeof value === "number") {
        if (dfsFilters.length > 0) dfsFilters.push("and");
        dfsFilters.push(["keyword_info.search_volume", "<=", value]);
      }

      if (key === "minCPC" && typeof value === "number") {
        if (dfsFilters.length > 0) dfsFilters.push("and");
        dfsFilters.push(["keyword_info.cpc", ">=", value]);
      }

      if (key === "maxCPC" && typeof value === "number") {
        if (dfsFilters.length > 0) dfsFilters.push("and");
        dfsFilters.push(["keyword_info.cpc", "<=", value]);
      }

      if (key === "minPPC" && typeof value === "number") {
        if (dfsFilters.length > 0) dfsFilters.push("and");
        dfsFilters.push(["keyword_info.competition", ">=", value / 100]);
      }

      if (key === "maxPPC" && typeof value === "number") {
        if (dfsFilters.length > 0) dfsFilters.push("and");
        dfsFilters.push(["keyword_info.competition", "<=", value / 100]);
      }

      if (key === "minKD" && typeof value === "number") {
        if (dfsFilters.length > 0) dfsFilters.push("and");
        dfsFilters.push(["keyword_properties.keyword_difficulty", ">=", value]);
      }

      if (key === "maxKD" && typeof value === "number") {
        if (dfsFilters.length > 0) dfsFilters.push("and");
        dfsFilters.push(["keyword_properties.keyword_difficulty", "<=", value]);
      }

      if (key === "includeKeyword" && typeof value === "string") {
        if (dfsFilters.length > 0) dfsFilters.push("and");
        dfsFilters.push(["keyword", "like", `%${value}%`]);
      }

      if (key === "excludeKeyword" && typeof value === "string") {
        if (dfsFilters.length > 0) dfsFilters.push("and");
        dfsFilters.push(["keyword", "not_like", `%${value}%`]);
      }

      if (key === "searchIntents" && Array.isArray(value) && value.length > 0) {
        if (dfsFilters.length > 0) dfsFilters.push("and");
        dfsFilters.push(["search_intent_info.main_intent", "in", value]);
      }
    }

    return dfsFilters;
  }

  return [];
}

/**
 * Format monthly searches.
 */
export function formatMonthlySearches(
  monthlySearches: {
    year: number;
    month: number;
    search_volume: number;
  }[],
): {
  year: number;
  month: number;
  search_volume: number;
  monthLabel: string;
  monthWithYearLabel: string;
}[] {
  if (monthlySearches.length > 0) {
    const reversedMonthlySearches = [...monthlySearches].reverse();
    return reversedMonthlySearches.map((item) => ({
      ...item,
      monthLabel: MONTH_NAMES[item.month - 1],
      monthWithYearLabel: `${MONTH_NAMES[item.month - 1]} '${item.year % 100}`,
    }));
  }

  return [];
}
