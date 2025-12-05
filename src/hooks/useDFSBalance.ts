import dfsBalanceAtom from "@/atoms/dfsBalanceAtom";
import DataForSEO from "@/services/DataForSEO";
import { getLocalStorageItem } from "@/utils/localStorage";
import { useAtom } from "jotai";
import { useCallback, useEffect } from "react";

export default function useDFSBalance(refreshBalance: boolean = false) {
  const [currentDFSBalance, setDFSBalance] = useAtom(dfsBalanceAtom);

  const refreshDFSBalance = useCallback(async () => {
    const dfsUsername = getLocalStorageItem("DATAFORSEO_USERNAME");
    const dfsPassword = getLocalStorageItem("DATAFORSEO_PASSWORD");

    if (!dfsUsername || !dfsPassword) return;
    const DataForSEOService = new DataForSEO(dfsUsername, dfsPassword);
    const dfsBalance = await DataForSEOService.getAccountBalance();

    if (typeof dfsBalance === "number") setDFSBalance(dfsBalance);
  }, [setDFSBalance]);

  useEffect(() => {
    if (refreshBalance) refreshDFSBalance();
  }, [refreshDFSBalance, refreshBalance]);

  return { currentDFSBalance, refreshDFSBalance };
}
