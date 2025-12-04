/**
 * Get the URL of a country flag image.
 */
export function getFlagImageUrl(countryCode: string): string {
  return `https://flagcdn.com/${countryCode}.svg`;
}
