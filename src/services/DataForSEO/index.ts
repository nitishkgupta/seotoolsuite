import axios from "axios";
import UpstashRedis from "@/services/UpstashRedis";
import { getLocalStorageItem } from "@/utils/localStorage";
import {
  transformKeywordSuggestions,
  transformKeywordOverview,
  transformDomainKeywords,
  type TransformResult,
  type TransformedKeywordSuggestion,
  type TransformedKeywordOverview,
  type TransformedDomainKeyword,
} from "./transformers";

/**
 * DataForSEO service.
 */
class DataForSEO {
  /**
   * DataForSEO API URL.
   */
  private API_BASE_URL: string;

  /**
   * DataForSEO API username.
   */
  private USERNAME: string;

  /**
   * DataForSEO API password.
   */
  private PASSWORD: string;

  /**
   * Sandbox mode.
   */
  private sandboxEnabled: boolean;

  /**
   * Enable caching.
   */
  private enableCaching: boolean;

  /**
   * Caching duration (in days).
   */
  private cachingDuration: number;

  /**
   * Upstash Redis instance.
   */
  private upstashRedis?: UpstashRedis;

  /**
   * Constructor.
   * @param isSandbox - Whether to use the sandbox version of the API.
   */
  constructor(
    username: string,
    password: string,
    isSandbox: boolean = false,
    enableCaching: boolean = false,
  ) {
    this.API_BASE_URL = isSandbox
      ? "https://sandbox.dataforseo.com/v3"
      : "https://api.dataforseo.com/v3";

    this.USERNAME = username;
    this.PASSWORD = password;
    this.sandboxEnabled = isSandbox;
    this.enableCaching = enableCaching;
    this.cachingDuration = Number(
      getLocalStorageItem("CACHING_DURATION") ?? 30,
    );

    if (!this.sandboxEnabled && enableCaching) {
      this.upstashRedis = new UpstashRedis();
    }
  }

  /**
   * Get user data.
   */
  async getUserData() {
    try {
      const apiResponse = await axios.get(
        `${this.API_BASE_URL}/appendix/user_data`,
        {
          headers: {
            Authorization: `Basic ${Buffer.from(
              `${this.USERNAME}:${this.PASSWORD}`,
            ).toString("base64")}`,
          },
        },
      );

      console.log("[DataForSEO] getUserData response:", {
        status: apiResponse.status,
        tasks_count: apiResponse.data?.tasks?.length ?? 0,
      });

      return apiResponse.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get account balance.
   */
  async getAccountBalance(): Promise<number | null> {
    try {
      const apiResponse = await axios.get(
        `${this.API_BASE_URL}/appendix/user_data`,
        {
          headers: {
            Authorization: `Basic ${Buffer.from(
              `${this.USERNAME}:${this.PASSWORD}`,
            ).toString("base64")}`,
          },
        },
      );

      const balance = apiResponse.data?.tasks[0]?.result?.[0]?.money?.balance ?? null;
      console.log("[DataForSEO] getAccountBalance response:", {
        status: apiResponse.status,
        balance,
      });

      return balance;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get keyword suggestions.
   * Returns transformed data with only the fields needed by the UI.
   */
  async getKeywordSuggestions(
    keyword: string,
    location_code: number,
    language_code: string = "any",
    filters: Array<any> = [],
    limit: number = 50,
    offset: number = 0,
  ): Promise<TransformResult<TransformedKeywordSuggestion[]>> {
    const cacheKey = btoa(
      `keyword-suggestions-v2-${keyword}-${location_code}-${language_code}-${JSON.stringify(filters)}-${limit}-${offset}`,
    );

    if (!this.sandboxEnabled && this.enableCaching && this.upstashRedis) {
      let cachedData;
      try {
        cachedData = await this.upstashRedis.getData(cacheKey);
      } catch (error) {
        console.error(error);
      }

      if (cachedData) return JSON.parse(cachedData);
    }

    try {
      const apiResponse = await axios.post(
        `${this.API_BASE_URL}/dataforseo_labs/google/keyword_suggestions/live`,
        [
          {
            keyword,
            location_code,
            ...(language_code !== "any" ? { language_code } : {}),
            ...(filters && filters.length > 0 ? { filters } : {}),
            limit,
            offset,
            order_by: ["keyword_info.search_volume,desc"],
          },
        ],
        {
          headers: {
            Authorization: `Basic ${Buffer.from(
              `${this.USERNAME}:${this.PASSWORD}`,
            ).toString("base64")}`,
          },
          timeout: 60000,
        },
      );

      const transformed = transformKeywordSuggestions(apiResponse.data);

      console.log("[DataForSEO] getKeywordSuggestions response:", {
        status: apiResponse.status,
        task_status_code: transformed.statusCode,
        result_count: transformed.data.length,
        total_results: transformed.totalResults,
      });

      if (
        !this.sandboxEnabled &&
        this.enableCaching &&
        this.upstashRedis &&
        transformed.statusCode === 20000
      ) {
        try {
          this.upstashRedis.setData(
            cacheKey,
            JSON.stringify(transformed),
            60 * 60 * 24 * this.cachingDuration,
          );
        } catch (error) {
          console.error(error);
        }
      }

      return transformed;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get keywords overview.
   * Returns transformed data with only the fields needed by the UI.
   */
  async getKeywordsOverview(
    keywords: string[],
    location_code: number,
    language_code: string = "en",
    includeClickstreamData: boolean = false,
  ): Promise<TransformResult<TransformedKeywordOverview[]>> {
    const cacheKey = btoa(
      `keywords-overview-v2-${JSON.stringify(keywords)}-${location_code}-${language_code}-${includeClickstreamData}`,
    );

    if (!this.sandboxEnabled && this.enableCaching && this.upstashRedis) {
      let cachedData;
      try {
        cachedData = await this.upstashRedis.getData(cacheKey);
      } catch (error) {
        console.error(error);
      }

      if (cachedData) return JSON.parse(cachedData);
    }

    try {
      const apiResponse = await axios.post(
        `${this.API_BASE_URL}/dataforseo_labs/google/keyword_overview/live`,
        [
          {
            keywords,
            location_code,
            language_code,
            include_clickstream_data: includeClickstreamData,
          },
        ],
        {
          headers: {
            Authorization: `Basic ${Buffer.from(
              `${this.USERNAME}:${this.PASSWORD}`,
            ).toString("base64")}`,
          },
          timeout: 60000,
        },
      );

      const transformed = transformKeywordOverview(apiResponse.data);

      console.log("[DataForSEO] getKeywordsOverview response:", {
        status: apiResponse.status,
        task_status_code: transformed.statusCode,
        result_count: transformed.data.length,
      });

      if (
        !this.sandboxEnabled &&
        this.enableCaching &&
        this.upstashRedis &&
        transformed.statusCode === 20000
      ) {
        try {
          this.upstashRedis.setData(
            cacheKey,
            JSON.stringify(transformed),
            60 * 60 * 24 * this.cachingDuration,
          );
        } catch (error) {
          console.error(error);
        }
      }

      return transformed;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get keywords for a domain (ranked keywords).
   * Returns transformed data with only the fields needed by the UI.
   */
  async getKeywordsForDomain(
    target: string,
    location_code: number,
    language_code: string = "en",
    limit: number = 20,
    offset: number = 0,
  ): Promise<TransformResult<TransformedDomainKeyword[]>> {
    const cacheKey = btoa(
      `keywords-for-domain-v2-${target}-${location_code}-${language_code}-${limit}-${offset}`,
    );

    if (!this.sandboxEnabled && this.enableCaching && this.upstashRedis) {
      let cachedData;
      try {
        cachedData = await this.upstashRedis.getData(cacheKey);
      } catch (error) {
        console.error(error);
      }

      if (cachedData) return JSON.parse(cachedData);
    }

    try {
      const normalizedTarget = target.startsWith("http")
        ? target
        : `https://${target}/`;

      const requestPayload = [
        {
          target: normalizedTarget,
          location_code,
          language_code,
          sort_by: "search_volume",
          search_partners: false,
          include_adult_keywords: false,
        },
      ];

      console.log("[DataForSEO] Request URL:", `${this.API_BASE_URL}/keywords_data/google_ads/keywords_for_site/live`);

      const apiResponse = await axios.post(
        `${this.API_BASE_URL}/keywords_data/google_ads/keywords_for_site/live`,
        requestPayload,
        {
          headers: {
            Authorization: `Basic ${Buffer.from(
              `${this.USERNAME}:${this.PASSWORD}`,
            ).toString("base64")}`,
            "Content-Type": "application/json",
          },
          timeout: 60000,
        },
      );

      const transformed = transformDomainKeywords(apiResponse.data);

      console.log("[DataForSEO] getKeywordsForDomain response:", {
        status: apiResponse.status,
        task_status_code: transformed.statusCode,
        result_count: transformed.data.length,
        total_results: transformed.totalResults,
      });

      if (
        !this.sandboxEnabled &&
        this.enableCaching &&
        this.upstashRedis &&
        transformed.statusCode === 20000
      ) {
        try {
          this.upstashRedis.setData(
            cacheKey,
            JSON.stringify(transformed),
            60 * 60 * 24 * this.cachingDuration,
          );
        } catch (error) {
          console.error(error);
        }
      }

      return transformed;
    } catch (error: unknown) {
      const err = error as { message?: string; code?: string; response?: { data?: unknown } };
      console.error("[DataForSEO] API Error:", err.message);
      console.error("[DataForSEO] Error code:", err.code);
      console.error("[DataForSEO] Response data:", err.response?.data);
      throw error;
    }
  }
}

export default DataForSEO;
