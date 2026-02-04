"use client";

import dfsBalanceAtom from "@/atoms/dfsBalanceAtom";
import { Tooltip } from "@heroui/react";
import { useAtomValue } from "jotai";
import { WalletIcon } from "lucide-react";
import { memo } from "react";

function DFSBalanceBox() {
  const currentBalance = useAtomValue(dfsBalanceAtom);

  if (typeof currentBalance !== "number") return null;

  return (
    <>
      <Tooltip content="DataForSEO Balance">
        <div className="flex items-center rounded-md border-2 border-slate-200">
          <div className="flex h-full items-center border-slate-200 px-2">
            <WalletIcon size={22} />
          </div>
          <div className="flex h-full items-center pr-2">
            ${Number(currentBalance).toFixed(4)}
          </div>
        </div>
      </Tooltip>
      <div className="my-1 hidden w-0.5 bg-slate-200 lg:block"></div>
    </>
  );
}

export default memo(DFSBalanceBox);
