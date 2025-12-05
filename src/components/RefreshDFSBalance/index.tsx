import useDFSBalance from "@/hooks/useDFSBalance";
import { useEffect } from "react";

export default function RefreshDFSBalance() {
  const { refreshDFSBalance } = useDFSBalance(false);

  useEffect(() => {
    refreshDFSBalance();
  }, [refreshDFSBalance]);

  return null;
}
