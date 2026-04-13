"use client";

/**
 * Track Umami event for analytics.
 */
export function trackUmamiEvent(eventName: string, eventProperties?: object) {
  if (typeof window !== "undefined" && "umami" in window) {
    if (eventProperties && Object.keys(eventProperties).length > 0)
      (window as any).umami.track(eventName, eventProperties);
    else (window as any).umami.track(eventName);
  }
}
