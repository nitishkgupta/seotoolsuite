import type {
  TransformedDomainKeyword,
  TransformResult,
  MonthlySearch,
} from "./types";

/**
 * Transforms a single raw domain keyword item.
 */
function transformItem(
  item: Record<string, unknown>
): TransformedDomainKeyword {
  const monthlySearches: MonthlySearch[] = Array.isArray(item.monthly_searches)
    ? (item.monthly_searches as Array<Record<string, unknown>>).map((m) => ({
        year: (m.year as number) ?? 0,
        month: (m.month as number) ?? 0,
        search_volume: (m.search_volume as number) ?? 0,
      }))
    : [];

  return {
    keyword: (item.keyword as string) ?? "",
    searchVolume: (item.search_volume as number) ?? 0,
    cpc: (item.cpc as number) ?? 0,
    competition: (item.competition as number) ?? 0,
    competitionLevel: (item.competition_level as string) ?? "",
    monthlySearches,
  };
}

/**
 * Transforms raw DataForSEO domain keywords response to minimal UI format.
 * Note: keywords_for_site endpoint returns flat array in tasks[0].result[]
 * @param rawResponse - The full API response from keywords_for_site/live endpoint
 * @returns Transformed result with metadata
 */
export function transformDomainKeywords(
  rawResponse: Record<string, unknown>
): TransformResult<TransformedDomainKeyword[]> {
  const tasks = rawResponse.tasks as Array<Record<string, unknown>> | undefined;
  const task = tasks?.[0];
  // Note: This endpoint returns flat array in result[], not nested in items
  const items = (task?.result as Array<Record<string, unknown>>) ?? [];

  const data = items.map((item) => transformItem(item));

  return {
    data,
    totalResults: (task?.result_count as number) ?? data.length,
    cost: (rawResponse.cost as number) ?? 0,
    statusCode: (task?.status_code as number) ?? 0,
  };
}
