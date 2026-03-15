import { AgeDistribution } from "@/types/DFS/common";
import { memo } from "react";

const AgeDistributionChart = ({ data }: { data: AgeDistribution }) => {
  const isDataEmpty = Object.values(data).every(
    (value) => value === 0 || value === null,
  );
  return (
    <div className="age-distribution-chart flex w-full flex-col">
      {Object.entries(data).map(([key, value]) => (
        <div className="flex flex-row items-center gap-2" key={key}>
          <div className="min-w-12 shrink-0 text-base">{key}</div>
          <div className="shrink-0">|</div>
          {value > 0 && (
            <div
              className="scale-x-anim relative h-3 shrink overflow-hidden rounded-full bg-sky-950 transition-all duration-500"
              style={{ width: `${value ?? 0}%` }}
            ></div>
          )}
          <div className="shrink-0 text-xs text-sky-950">
            {isDataEmpty ? "N/A" : `${value ?? 0}%`}
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(AgeDistributionChart);
