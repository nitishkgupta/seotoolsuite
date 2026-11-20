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
        <div className="flex items-center rounded-md border border-b-2 border-sky-950/40">
          <div className="flex h-full items-center border-slate-200 px-2">
            <WalletIcon size={22} />
          </div>
          <div className="flex h-full items-center pr-2">
            ${parseFloat(Number(currentBalance).toFixed(4))}
          </div>
        </div>
      </Tooltip>
      <div className="my-1 hidden w-px bg-sky-950/40 lg:block"></div>
    </>
  );
}

export default memo(DFSBalanceBox);
