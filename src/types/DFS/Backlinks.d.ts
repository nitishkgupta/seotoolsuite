import { BacklinkPlatformType, BacklinkType } from "@/types/DFS/common";

/**
 * DataForSEO Backlinks Item.
 */
export interface BacklinksItem {
  type: string;
  domain_from: string;
  url_from: string;
  url_from_https: boolean;
  domain_to: string;
  url_to: string;
  url_to_https: boolean;
  tld_from: string;
  is_new: boolean;
  is_lost: boolean;
  backlink_spam_score: number;
  rank: number;
  page_from_rank: number;
  domain_from_rank: number;
  domain_from_platform_type: Array<BacklinkPlatformType>;
  domain_from_is_ip: boolean;
  domain_from_ip: string;
  domain_from_country: string;
  page_from_external_links: number;
  page_from_internal_links: number;
  page_from_size: number;
  page_from_encoding: string;
  page_from_language: string;
  page_from_title: string;
  page_from_status_code: number;
  first_seen: string;
  prev_seen: string;
  last_seen: string;
  item_type: BacklinkType;
  attributes: Array<string>;
  dofollow: boolean;
  original: boolean;
  alt?: string;
  image_url?: string;
  anchor?: string;
  text_pre?: string;
  text_post?: string;
  semantic_location?: string;
  links_count: number;
  group_count: number;
  is_broken: boolean;
  url_to_status_code: number;
  url_to_spam_score: number;
  url_to_redirect_target: string;
  ranked_keywords_info?: {
    page_from_keywords_count_top_3: number;
    page_from_keywords_count_top_10: number;
    page_from_keywords_count_top_100: number;
  };
  is_indirect_link: boolean;
  indirect_link_path?: Array<{
    type: string;
    status_code: number;
    url: string;
  }>;
}
