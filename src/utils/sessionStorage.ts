"use client";

export function getSessionStorageItem(key: string) {
  if (typeof window === "undefined") return null;
  return window.sessionStorage.getItem(key);
}

export function setSessionStorageItem(key: string, value: string) {
  if (typeof window === "undefined") return null;
  return window.sessionStorage.setItem(key, value);
}

export function removeSessionStorageItem(key: string) {
  if (typeof window === "undefined") return null;
  window.sessionStorage.removeItem(key);
}

export function clearSessionStorage() {
  if (typeof window === "undefined") return null;
  window.sessionStorage.clear();
}
