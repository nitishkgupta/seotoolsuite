"use client";

import { Skeleton } from "@heroui/react";

export default function Loading() {
  return (
    <div className="relative flex w-full flex-col px-4 py-4 lg:px-8 lg:py-8">
      <Skeleton className="block h-42 w-full rounded-md" />
    </div>
  );
}
