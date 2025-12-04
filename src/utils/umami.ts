"use client";

/**
 * Track Umami event for analytics.
 */
export function trackUmamiEvent(eventName: string, eventProperties?: object) {
  if (typeof window !== "undefined" && "umami" in window) {
    (window as any).umami.track(eventName, eventProperties);
  }
}
