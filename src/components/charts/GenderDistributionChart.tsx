import { GenderDistribution } from "@/types/DFS/common";
import Image from "next/image";
import { memo } from "react";
import ObserverAnimate from "@/components/ObserverAnimate";

const GenderDistributionChart = ({ data }: { data: GenderDistribution }) => {
  return (
    <>
      {data.male !== undefined && data.female !== undefined ? (
        <div className="gender-distribution-chart w-full">
          <div className="flex items-center justify-between">
            <Image
              src="/assets/icons/man.svg"
              width={40}
              height={40}
              quality={100}
              alt="Male"
            />
            <div
              className={`relative h-3 w-full shrink overflow-hidden rounded-full ${!data.male && !data.female ? "bg-slate-200" : "bg-pink-400"}`}
            >
              <ObserverAnimate className="h-full">
                <div
                  className={`scale-x-visible-anim h-full origin-left border-white bg-blue-400 transition-all duration-500 ${data.male > 0 && data.male < 100 ? "border-r-2" : ""}`}
                  style={{
                    width: `${data.male ?? 0}%`,
                  }}
                ></div>
              </ObserverAnimate>
            </div>
            <Image
              src="/assets/icons/woman.svg"
              width={40}
              height={40}
              quality={100}
              alt="Female"
              className="w-10"
            />
          </div>
          <div className="mt-2 grid grid-cols-2 items-stretch">
            <div className="flex flex-col items-start gap-1">
              <div className="font-medium">Male</div>
              {!data.male && !data.female ? "N/A" : `${data.male ?? 0}%`}
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="font-medium">Female</div>
              <div className="max-w-60 text-right text-sm">
                {!data.male && !data.female ? "N/A" : `${data.female ?? 0}%`}
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
