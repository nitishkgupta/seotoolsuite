import axios from "axios";
import { getLocalStorageItem } from "@/utils/localStorage";

/**
 * Upstash Redis service.
 */
class UpstashRedis {
  /**
   * Upstash Redis REST URL.
   */
  private UPSTASH_REDIS_REST_URL: string;

  /**
   * Upstash Redis REST Token.
   */
  private UPSTASH_REDIS_REST_TOKEN: string;

  /**
   * Constructor.
   */
  constructor(redisURL?: string, redisToken?: string) {
    if (redisURL && redisToken) {
      this.UPSTASH_REDIS_REST_URL = redisURL;
      this.UPSTASH_REDIS_REST_TOKEN = redisToken;
    } else if (
      getLocalStorageItem("UPSTASH_REDIS_REST_URL") &&
      getLocalStorageItem("UPSTASH_REDIS_REST_TOKEN")
    ) {
      this.UPSTASH_REDIS_REST_URL = getLocalStorageItem(
        "UPSTASH_REDIS_REST_URL",
      ) as string;
      this.UPSTASH_REDIS_REST_TOKEN = getLocalStorageItem(
        "UPSTASH_REDIS_REST_TOKEN",
      ) as string;
    } else {
      throw new Error(
        "UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN not found.",
      );
    }
  }

  /**
   * Set data.
   */
  async setData(key: string, data: string, expiresAfterSeconds?: number) {
    let setDataURL = `${this.UPSTASH_REDIS_REST_URL}/set/${key}`;
    if (expiresAfterSeconds) setDataURL += `?EX=${expiresAfterSeconds}`;

    try {
      await axios.post(setDataURL, data, {
        timeout: 1000 * 60 * 2,
        headers: {
          Authorization: `Bearer ${this.UPSTASH_REDIS_REST_TOKEN}`,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get data.
   */
  async getData(key: string): Promise<string | null> {
    try {
      const response = await axios.get(
        `${this.UPSTASH_REDIS_REST_URL}/get/${key}`,
        {
          timeout: 1000 * 60 * 2,
          headers: {
            Authorization: `Bearer ${this.UPSTASH_REDIS_REST_TOKEN}`,
          },
        },
      );

      return response?.data?.result ?? null;
    } catch (error) {
      throw error;
    }
  }
}

export default UpstashRedis;
