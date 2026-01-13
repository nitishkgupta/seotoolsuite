"use client";

/**
 * AutoComplete service.
 */
class AutoComplete {
  /**
   * Constructor.
   */
  constructor() {}

  /**
   * Get JSONP response using script tag.
   */
  async getJSONPResponse(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const callbackName = `jsonp_${Date.now()}_${Math.round(Math.random() * 10000)}`;

      (window as any)[callbackName] = (data: any) => {
        delete (window as any)[callbackName];
        document.body.removeChild(script);
        resolve(data);
      };

      const script = document.createElement("script");
      script.src = `${url}&callback=${callbackName}`;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }

  /**
   * Get Google autocomplete suggest queries.
   */
  async getGoogleSuggestQueries(
    keyword: string,
    location_code = "in",
    language_code = "en",
  ): Promise<string[] | null> {
    try {
      const apiResponse = await this.getJSONPResponse(
        `https://suggestqueries.google.com/complete/search?gl=${location_code}&hl=${language_code}&output=chrome&q=${encodeURIComponent(keyword)}`,
      );

      if (
        apiResponse &&
        Array.isArray(apiResponse) &&
        Array.isArray(apiResponse[1])
      ) {
        return apiResponse[1];
      }

      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default AutoComplete;
