import { GenderDistribution } from "@/types/DFS/common";
import Image from "next/image";
import manIcon from "@/assets/icons/man.svg";
import womanIcon from "@/assets/icons/woman.svg";
import { memo } from "react";

const GenderDistributionChart = ({ data }: { data: GenderDistribution }) => {
  return (
    <>
      {data.male !== undefined && data.female !== undefined ? (
        <div className="gender-distribution-chart w-full">
          <div className="flex items-center justify-between">
            <Image src={manIcon} alt="Male" className="w-10" />
            <div
              className={`relative h-2 w-full shrink overflow-hidden rounded-full ${data.male === 0 && data.female === 0 ? "bg-slate-200" : "bg-pink-400"}`}
            >
              <div
                className={`scale-x-anim h-full border-white bg-blue-400 transition-all duration-500 ${data.male > 0 && data.male < 100 ? "border-r-2" : ""}`}
                style={{
                  width: `${data.male ?? 0}%`,
                }}
              ></div>
            </div>
            <Image src={womanIcon} alt="Female" className="w-10" />
          </div>
          <div className="mt-2 grid grid-cols-2 items-stretch">
            <div className="flex flex-col items-start gap-1">
              <div className="font-medium">Male</div>
              {data.male === 0 && data.female === 0
                ? "N/A"
                : `${data.male ?? 0}%`}
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="font-medium">Female</div>
              <div className="max-w-60 text-right text-sm">
                {data.male === 0 && data.female === 0
                  ? "N/A"
                  : `${data.female ?? 0}%`}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-xl lg:text-3xl">N/A</div>
      )}
    </>
  );
};

export default memo(GenderDistributionChart);
