import {
  SearchIntent,
  MonthlySearches,
  SearchVolumeTrend,
  GenderDistribution,
  AgeDistribution,
} from "@/types/DFS/common";

/**
 * DataForSEO Keyword Overview Item.
 * @see https://docs.dataforseo.com/v3/dataforseo_labs/google/keyword_overview/live/
 */
export interface KeywordOverviewItem {
  se_type: string;
  keyword: string;
  location_code: number;
  language_code: string;
  search_partners: boolean;
  keyword_info: {
    se_type: string;
    last_updated_time: string;
    competition: number;
    competition_level: string;
    cpc: number;
    search_volume: number;
    low_top_of_page_bid: number;
    high_top_of_page_bid: number;
    categories: Array<number>;
    monthly_searches: Array<MonthlySearches>;
    search_volume_trend: SearchVolumeTrend;
    keyword_info_normalized_with_bing?: {
      last_updated_time: string;
      search_volume: number;
      is_normalized: boolean;
    };
    keyword_info_normalized_with_clickstream?: {
      last_updated_time: string;
      search_volume: number;
      is_normalized: boolean;
    };
  };
  clickstream_keyword_info?: {
    search_volume: number;
    last_updated_time: string;
    gender_distribution: GenderDistribution;
    age_distribution: AgeDistribution;
    monthly_searches: Array<MonthlySearches>;
  };
  keyword_properties: {
    se_type: string;
    core_keyword: string;
    synonym_clustering_algorithm: string;
    keyword_difficulty: number;
    detected_language: string;
    is_another_language: boolean;
  };
  serp_info: {
    se_type: string;
    check_url: string;
    serp_item_types: Array<string>;
    se_results_count: number;
    last_updated_time: string;
    previous_updated_time: string;
  };
  avg_backlinks_info: {
    se_type: string;
    backlinks: number;
    dofollow: number;
    referring_pages: number;
    referring_domains: number;
    referring_main_domains: number;
    rank: number;
    main_domain_rank: number;
    last_updated_time: string;
  };
  search_intent_info: {
    se_type: string;
    main_intent: SearchIntent;
    foreign_intent: Array<SearchIntent>;
    last_updated_time: string;
  };
}
