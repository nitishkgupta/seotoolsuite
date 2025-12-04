import axios from "axios";

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
   * Constructor.
   * @param isSandbox - Whether to use the sandbox version of the API.
   */
  constructor(username: string, password: string, isSandbox: boolean = false) {
    this.API_BASE_URL = isSandbox
      ? "https://sandbox.dataforseo.com/v3"
      : "https://api.dataforseo.com/v3";

    this.USERNAME = username;
    this.PASSWORD = password;
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

      return apiResponse.data?.tasks[0]?.result[0]?.money?.balance ?? null;
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
    limit: number = 50,
    offset: number = 0,
  ) {
    try {
      const apiResponse = await axios.post(
        `${this.API_BASE_URL}/dataforseo_labs/google/keyword_suggestions/live`,
        [
          {
            keyword,
            location_code,
            ...(language_code !== "any" ? { language_code } : {}),
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

      return apiResponse.data;
    } catch (error) {
      throw error;
    }
  }
}

export default DataForSEO;
