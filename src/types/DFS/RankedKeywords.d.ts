import { AgeDistribution, GenderDistribution } from "@/types/DFS/common";
import { KeywordSuggestionsItem } from "./KeywordSuggestions";

/**
 * DataForSEO Ranked Keywords Metrics Data.
 * @see https://docs.dataforseo.com/v3/dataforseo_labs/google/ranked_keywords/live/
 */
export interface RankedKeywordsMetricsData {
  pos_1: number;
  pos_2_3: number;
  pos_4_10: number;
  pos_11_20: number;
  pos_21_30: number;
  pos_31_40: number;
  pos_41_50: number;
  pos_51_60: number;
  pos_61_70: number;
  pos_71_80: number;
  pos_81_90: number;
  pos_91_100: number;
  etv: number;
  count: number;
  estimated_paid_traffic_cost: number;
  is_new: number;
  is_up: number;
  is_down: number;
  is_lost: number;
  clickstream_etv?: number;
  clickstream_gender_distribution?: GenderDistribution;
  clickstream_age_distribution?: AgeDistribution;
}

/**
 * DataForSEO Ranked Keywords Metrics.
 * @see https://docs.dataforseo.com/v3/dataforseo_labs/google/ranked_keywords/live/
 */
export interface RankedKeywordsMetrics {
  organic: RankedKeywordsMetricsData;
  paid: RankedKeywordsMetricsData;
  featured_snippet: RankedKeywordsMetricsData;
  local_pack: RankedKeywordsMetricsData;
  ai_overview_referenced: RankedKeywordsMetricsData;
}

/**
 * DataForSEO Ranked Keywords Item.
 * @see https://docs.dataforseo.com/v3/dataforseo_labs/google/ranked_keywords/live/
 */
export interface RankedKeywordsItem {
  se_type: string;
  keyword_data: KeywordSuggestionsItem;
  ranked_serp_element: {
    se_type: string;
    serp_item: {
      se_type: string;
      type: "organic";
      rank_group: number;
      rank_absolute: number;
      position: "left" | "right";
      xpath: string;
      domain: string;
      title: string;
      url: string;
      breadcrumb: string;
      website_name: string;
      is_image: boolean;
      is_video: boolean;
      is_featured_snippet: boolean;
      is_malicious: boolean;
      description: string;
      pre_snippet: string;
      extended_snippet: string;
      amp_version: boolean;
      rating?: {
        rating_type: string;
        value: number;
        votes_count: number;
        rating_max: number;
      };
      highlighted?: Array<string>;
      links?: Array<{
        type: string;
        title: string;
        description: string;
        url: string;
      }>;
      about_this_result?: {
        type: string;
        url: string;
        source: string;
        source_info: string;
        source_url: string;
        language: string;
        location: string;
        search_terms: Array<string>;
        related_terms: Array<string>;
      };
      main_domain: string;
      relative_url: string;
      etv: number;
      estimated_paid_traffic_cost: number;
      clickstream_etv?: number;
      rank_changes: {
        previous_rank_absolute: number;
        is_new: boolean;
        is_up: boolean;
        is_down: boolean;
      };
      backlinks_info: {
        referring_domains: number;
        referring_main_domains: number;
        referring_pages: number;
        dofollow: number;
        backlinks: number;
        time_update: string;
      };
      rank_info: {
        page_rank: number;
        main_domain_rank: number;
      };
    };
    check_url: string;
    serp_item_types: Array<string>;
    se_results_count: string;
    keyword_difficulty: number;
    is_lost: boolean;
    last_updated_time: string;
    previous_updated_time: string;
  };
}
