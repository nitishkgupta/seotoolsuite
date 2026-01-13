"use client";

import { Skeleton } from "@heroui/react";

export default function Loading() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center px-4 py-8 md:px-8 md:py-16">
      <Skeleton className="block h-24 w-24 rounded-full" />
      <Skeleton className="mt-3 block h-9 w-72 rounded-md" />
      <Skeleton className="mt-2 block h-7 w-full max-w-[500px] rounded-md" />
      <Skeleton className="mt-8 block h-40 w-full rounded-md lg:w-1/2 lg:min-w-[800px]" />
    </div>
  );
}
