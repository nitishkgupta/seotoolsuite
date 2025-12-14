import useDFSBalance from "@/hooks/useDFSBalance";
import { memo, useEffect } from "react";

function RefreshDFSBalance() {
  const { refreshDFSBalance } = useDFSBalance(false);

  useEffect(() => {
    refreshDFSBalance();
  }, [refreshDFSBalance]);

  return null;
}

export default memo(RefreshDFSBalance);
