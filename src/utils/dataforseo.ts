import DataForSEOLocationsData from "@/data/dataforseo-locations-data.json";
import DataForSEOLanguagesData from "@/data/dataforseo-languages-data.json";

export type DataForSEOLocation = {
  location_name: string;
  country_iso_code: string;
  location_code: number;
};

export type DataForSEOLanguage = {
  language_name: string;
  language_code: string;
};

/**
 * Get DataForSEO locations.
 */
export function getDataForSEOLocations(): DataForSEOLocation[] {
  const locations: DataForSEOLocation[] = [];
  const locationsData = DataForSEOLocationsData.tasks[0].result;

  locationsData.forEach((location: any) => {
    if (location.location_type === "Country") {
      locations.push({
        location_name: location.location_name,
        country_iso_code: location.country_iso_code.toLowerCase(),
        location_code: location.location_code,
      });
    }
  });

  return locations;
}

/**
 * Get DataForSEO location from code.
 */
export function getDataForSEOLocationFromCode(
  location_code: number,
): DataForSEOLocation | null {
  const locations = getDataForSEOLocations();
  return (
    locations.find((location) => location.location_code === location_code) ??
    null
  );
}

/**
 * Get DataForSEO languages.
 */
export function getDataForSEOLanguages(): DataForSEOLanguage[] {
  const languages: DataForSEOLanguage[] = [
    {
      language_name: "Any Language",
      language_code: "any",
    },
  ];
  const languagesData = DataForSEOLanguagesData.tasks[0].result;

  languagesData.forEach((language: any) => {
    languages.push({
      language_name: language.language_name,
      language_code: language.language_code,
    });
  });

  return languages;
}

/**
 * Get DataForSEO language from code.
 */
export function getDataForSEOLanguageFromCode(
  language_code: string,
): DataForSEOLanguage | null {
  const languages = getDataForSEOLanguages();
  return (
    languages.find((language) => language.language_code === language_code) ??
    null
  );
}
