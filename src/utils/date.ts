/**
 * Get current datetime in UTC.
 */
export function getCurrentDateTimeUTC(): string {
  const date = new Date();
  return date.toISOString();
}

/**
 * Get local datetime from ISO string.
 */
export function getLocalDateTimeFromISOString(dateISOString: string): string {
  const date = new Date(dateISOString);
  return date
    .toLocaleString(navigator.language, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .toUpperCase();
}
