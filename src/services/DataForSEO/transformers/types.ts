/**
 * Monthly search volume data point.
 */
export interface MonthlySearch {
  year: number;
  month: number;
  search_volume: number;
}

/**
 * Search volume trend data.
 */
export interface SearchVolumeTrend {
  monthly: number;
  quarterly: number;
  yearly: number;
}

/**
 * Backlinks data for keyword analysis.
 */
export interface BacklinksData {
  backlinks: number;
  dofollowBacklinks: number;
  referringPages: number;
  referringDomains: number;
  pageRank: number;
  domainRank: number;
}

/**
 * Transformed keyword suggestion matching UI requirements.
 * @see KeywordSuggestionItem in tools/KeywordResearch/index.tsx
 */
export interface TransformedKeywordSuggestion {
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
  monthlySearches: MonthlySearch[];
  searchVolumeTrend: SearchVolumeTrend;
  searchIntent?: string;
  keywordDifficulty?: number;
  avgBacklinksData?: BacklinksData;
}

/**
 * Minimal keyword overview data.
 */
export interface TransformedKeywordOverview {
  keyword: string;
  location_code: number;
  language_code: string;
  searchVolume: number;
  ppc: number;
  ppcLevel: string;
  cpc: number;
  lowTopPageBid?: number;
  highTopPageBid?: number;
  monthlySearches: MonthlySearch[];
  searchVolumeTrend: SearchVolumeTrend;
  searchIntent?: string;
  keywordDifficulty?: number;
  avgBacklinksData?: BacklinksData;
  genderDistribution?: {
    male: number;
    female: number;
  };
  ageDistribution?: Record<string, number>;
}

/**
 * Domain keyword result from keywords_for_site endpoint.
 */
export interface TransformedDomainKeyword {
  keyword: string;
  searchVolume: number;
  cpc: number;
  competition: number;
  competitionLevel: string;
  monthlySearches: MonthlySearch[];
}

/**
 * Wrapper for transformed results with metadata.
 */
export interface TransformResult<T> {
  data: T;
  totalResults: number;
  cost: number;
  statusCode: number;
}
