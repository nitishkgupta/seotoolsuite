import { Skeleton } from "@heroui/react";
import { memo } from "react";

const KeywordResearchLoader = () => {
  return (
    <>
      <div className="flex h-16 w-full flex-row items-center justify-between border-b-2 border-slate-200 bg-white px-4">
        <Skeleton className="h-6 w-full rounded-md" />
      </div>
      <div className="mt-8 w-full px-4 md:px-8">
        <Skeleton className="h-[480px] w-full rounded-md" />
      </div>
      <div className="keyword-research-loader flex w-full flex-col gap-8 p-4 md:gap-4 md:p-8 lg:flex-row">
        <div className="h-[1600px] w-full">
          <Skeleton className="h-full w-full rounded-md" />
        </div>
        <div className="flex w-full shrink-0 scroll-m-8 flex-col gap-4 lg:w-1/2 lg:max-w-[550px]">
          <Skeleton className="h-28 w-full rounded-md" />
          <Skeleton className="h-32 w-full rounded-md" />
          <div className="flex w-full flex-col items-stretch gap-4 md:flex-row">
            <Skeleton className="h-28 w-full rounded-md" />
            <Skeleton className="h-28 w-full rounded-md" />
          </div>
          <div className="flex w-full flex-col items-stretch gap-4 md:flex-row">
            <Skeleton className="h-28 w-full rounded-md" />
            <Skeleton className="h-28 w-full rounded-md" />
          </div>
          <Skeleton className="h-96 w-full rounded-md" />
          <Skeleton className="h-64 w-full rounded-md" />
        </div>
      </div>
    </>
  );
};

export default memo(KeywordResearchLoader);
