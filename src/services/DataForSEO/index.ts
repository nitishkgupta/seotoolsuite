import axios from "axios";
import UpstashRedis from "@/services/UpstashRedis";
import { getLocalStorageItem } from "@/utils/localStorage";

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

      return apiResponse.data?.tasks[0]?.result?.[0]?.money?.balance ?? null;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get keyword suggestions.
   */
  async getKeywordSuggestions(
    keyword: string,
    location_code: number,
    language_code: string = "any",
    filters: Array<any> = [],
    limit: number = 50,
    offset: number = 0,
  ) {
    if (!this.sandboxEnabled && this.enableCaching && this.upstashRedis) {
      let cachedData;
      try {
        cachedData = await this.upstashRedis.getData(
          btoa(
            `keyword-suggestions-${keyword}-${location_code}-${language_code}-${JSON.stringify(filters)}-${limit}-${offset}`,
          ),
        );
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
        },
      );

      const taskStatusCode = apiResponse?.data?.tasks[0]?.status_code ?? null;

      if (
        !this.sandboxEnabled &&
        this.enableCaching &&
        this.upstashRedis &&
        taskStatusCode === 20000
      ) {
        try {
          this.upstashRedis.setData(
            btoa(
              `keyword-suggestions-${keyword}-${location_code}-${language_code}-${JSON.stringify(filters)}-${limit}-${offset}`,
            ),
            JSON.stringify(apiResponse.data),
            60 * 60 * 24 * this.cachingDuration,
          );
        } catch (error) {
          console.error(error);
        }
      }

      return apiResponse.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get keywords overview.
   */
  async getKeywordsOverview(
    keywords: string[],
    location_code: number,
    language_code: string = "en",
    includeClickstreamData: boolean = false,
  ) {
    if (!this.sandboxEnabled && this.enableCaching && this.upstashRedis) {
      let cachedData;
      try {
        cachedData = await this.upstashRedis.getData(
          btoa(
            `keywords-overview-${JSON.stringify(keywords)}-${location_code}-${language_code}-${includeClickstreamData}`,
          ),
        );
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
        },
      );

      const taskStatusCode = apiResponse?.data?.tasks[0]?.status_code ?? null;

      if (
        !this.sandboxEnabled &&
        this.enableCaching &&
        this.upstashRedis &&
        taskStatusCode === 20000
      ) {
        try {
          this.upstashRedis.setData(
            btoa(
              `keywords-overview-${JSON.stringify(keywords)}-${location_code}-${language_code}-${includeClickstreamData}`,
            ),
            JSON.stringify(apiResponse.data),
            60 * 60 * 24 * this.cachingDuration,
          );
        } catch (error) {
          console.error(error);
        }
      }

      return apiResponse.data;
    } catch (error) {
      throw error;
    }
  }
}

export default DataForSEO;
