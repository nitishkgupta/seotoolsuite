import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl: string = "https://seotoolsuite.nitishkgupta.com";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/features/keyword-overview`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/features/keyword-suggestions`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/features/keyword-autocomplete`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/features/traffic-overview`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/features/ranked-keywords`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/features/bulk-dr-checker`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/features/keyword-ideas`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/features/top-pages`,
      lastModified: new Date(),
    },
  ];
}
