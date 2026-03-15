/**
 * DataForSEO Keyword Search Intent.
 */
export type SearchIntent =
  | "informational"
  | "navigational"
  | "commercial"
  | "transactional";

/**
 * DataForSEO Keyword Monthly Searches.
 */
export interface MonthlySearches {
  year: number;
  month: number;
  search_volume: number;
}

/**
 * DataForSEO Keyword Search Volume Trend.
 */
export interface SearchVolumeTrend {
  monthly: number;
  quarterly: number;
  yearly: number;
}

/**
 * DataForSEO Gender Distribution.
 */
export interface GenderDistribution {
  male?: number;
  female?: number;
}

/**
 * DataForSEO Age Distribution.
 */
export type AgeDistribution = Record<string, number>;
