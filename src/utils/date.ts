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
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .replace("am", "AM")
    .replace("pm", "PM");
}
