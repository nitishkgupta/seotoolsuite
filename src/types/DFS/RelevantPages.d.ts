import { AgeDistribution, GenderDistribution } from "@/types/DFS/common";

/**
 * DataForSEO Relevant Pages Metrics Data.
 * @see https://docs.dataforseo.com/v3/dataforseo_labs/google/relevant_pages/live/
 */
export interface RelevantPagesMetricsData {
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
 * DataForSEO Relevant Pages Item.
 * @see https://docs.dataforseo.com/v3/dataforseo_labs/google/relevant_pages/live/
 */
export interface RelevantPagesItem {
  se_type: string;
  page_address: string;
  metrics: {
    organic: RelevantPagesMetricsData;
    paid: RelevantPagesMetricsData;
    featured_snippet: RelevantPagesMetricsData;
    local_pack: RelevantPagesMetricsData;
  };
}
