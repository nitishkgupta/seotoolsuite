"use client";

import { useAtom } from "jotai";
import { useCallback, useRef, useState } from "react";
import dfsCredentialsAtom, {
  type DFSCredentials,
} from "@/atoms/dfsCredentialsAtom";
import { getLocalStorageItem } from "@/utils/localStorage";

export default function useDFSCredentials() {
  const [credentials, setCredentials] = useAtom(dfsCredentialsAtom);
  const [isLoading, setIsLoading] = useState(!credentials);
  const [error, setError] = useState<string | null>(null);
  const fetchInitiatedRef = useRef<boolean | null>(null);

  const fetchCredentials = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/credentials");
      if (response.ok) {
        const data: DFSCredentials = await response.json();
        setCredentials(data);
        return data;
      }
    } catch {
      // Server credentials not available, fall back to localStorage
    }

    const localUsername = getLocalStorageItem("DATAFORSEO_USERNAME");
    const localPassword = getLocalStorageItem("DATAFORSEO_PASSWORD");

    if (localUsername && localPassword) {
      const localCreds: DFSCredentials = {
        username: localUsername,
        password: localPassword,
        source: "localStorage",
      };
      setCredentials(localCreds);
      setIsLoading(false);
      return localCreds;
    }

    setError("No credentials available");
    setIsLoading(false);
    return null;
  }, [setCredentials]);

  if (fetchInitiatedRef.current === null) {
    fetchInitiatedRef.current = true;
    if (!credentials) {
      fetchCredentials();
    }
  }

  return {
    credentials,
    isLoading,
    error,
    refreshCredentials: fetchCredentials,
  };
}
