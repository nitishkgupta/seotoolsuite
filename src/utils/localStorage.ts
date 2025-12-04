"use client";

export function getLocalStorageItem(key: string) {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(key);
}

export function setLocalStorageItem(key: string, value: string) {
  if (typeof window === "undefined") return null;
  window.localStorage.setItem(key, value);
}

export function removeLocalStorageItem(key: string) {
  if (typeof window === "undefined") return null;
  window.localStorage.removeItem(key);
}

export function clearLocalStorage() {
  if (typeof window === "undefined") return null;
  window.localStorage.clear();
}
