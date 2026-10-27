"use client";

import { Button, Input, NumberInput } from "@heroui/react";
import {
  BadgeDollarSignIcon,
  ChevronDownIcon,
  FileIcon,
  FunnelIcon,
  TextSearchIcon,
  TrendingUpIcon,
} from "lucide-react";
import { memo, useState } from "react";

export type TopPagesFiltersInitialValues = {
  minTraffic?: number;
  maxTraffic?: number;
  minKeywords?: number;
  maxKeywords?: number;
  minTrafficCost?: number;
  maxTrafficCost?: number;
  includePageAddress?: string;
  excludePageAddress?: string;
};

const TopPagesFilters = ({
  defaultOpen = false,
  initialValues = {},
  activeFiltersCount,
}: {
  defaultOpen?: boolean;
  initialValues?: TopPagesFiltersInitialValues;
  activeFiltersCount?: number;
}) => {
  const [filtersVisible, setFiltersVisible] = useState<boolean>(defaultOpen);
  const [initialValuesState, setInitialValuesState] =
    useState<TopPagesFiltersInitialValues>(initialValues);

  return (
    <div className="top-pages-filters flex flex-col items-start justify-start rounded-md border-2 border-b-3 border-slate-200">
      <div
        className={`flex w-full items-center justify-between gap-1 rounded-t-md border-slate-200 py-2 pr-2 pl-4 text-base ${filtersVisible ? "border-b-2" : ""}`}
      >
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setFiltersVisible(!filtersVisible)}
          className="flex cursor-pointer items-center gap-1"
        >
          <FunnelIcon size={16} />
          <span>Filters</span>
          {typeof activeFiltersCount === "number" && activeFiltersCount > 0 && (
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-medium">
              {activeFiltersCount}
            </div>
          )}
        </button>
        <Button
          isIconOnly
          size="sm"
          variant="light"
          onPress={() => setFiltersVisible(!filtersVisible)}
        >
          <ChevronDownIcon
            size={16}
            className={`transition-all ${filtersVisible ? "rotate-180" : ""}`}
          />
        </Button>
      </div>
      <div
        className={`w-full overflow-hidden starting:h-0 ${!filtersVisible ? "hidden h-0" : "h-fit"}`}
        style={{
          transition: "all 0.3s ease allow-discrete",
        }}
      >
        <div className="flex flex-col px-4 py-4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div>
              <div className="flex items-center gap-1 text-sm">
                <TrendingUpIcon size={16} />
                Monthly Traffic
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <NumberInput
                  name="traffic-min"
                  classNames={{
                    inputWrapper: "shadow-none border-b-3",
                  }}
                  variant="bordered"
                  type="number"
                  label="Min."
                  size="sm"
                  minValue={0}
                  maxValue={initialValuesState.maxTraffic || undefined}
                  value={initialValuesState.minTraffic}
                  onValueChange={(val) =>
                    setInitialValuesState({
                      ...initialValuesState,
                      minTraffic: val,
                    })
                  }
                />
                <NumberInput
                  name="traffic-max"
                  classNames={{
                    inputWrapper: "shadow-none border-b-3",
                  }}
                  variant="bordered"
                  type="number"
                  label="Max."
                  size="sm"
                  minValue={initialValuesState.minTraffic || 0}
                  value={initialValuesState.maxTraffic}
                  onValueChange={(val) =>
                    setInitialValuesState({
                      ...initialValuesState,
                      maxTraffic: val,
                    })
                  }
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1 text-sm">
                <TextSearchIcon size={16} />
                Keywords
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <NumberInput
                  name="keywords-min"
                  classNames={{
                    inputWrapper: "shadow-none border-b-3",
                  }}
                  variant="bordered"
                  type="number"
                  label="Min."
                  size="sm"
                  minValue={0}
                  maxValue={initialValuesState.maxKeywords || undefined}
                  value={initialValuesState.minKeywords}
                  onValueChange={(val) =>
                    setInitialValuesState({
                      ...initialValuesState,
                      minKeywords: val,
                    })
                  }
                />
                <NumberInput
                  name="keywords-max"
                  classNames={{
                    inputWrapper: "shadow-none border-b-3",
                  }}
                  variant="bordered"
                  type="number"
                  label="Max."
                  size="sm"
                  minValue={initialValuesState.minKeywords || 0}
                  value={initialValuesState.maxKeywords}
                  onValueChange={(val) =>
                    setInitialValuesState({
                      ...initialValuesState,
                      maxKeywords: val,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div>
              <div className="flex items-center gap-1 text-sm">
                <BadgeDollarSignIcon size={16} />
                Traffic Cost
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <NumberInput
                  name="traffic-cost-min"
                  classNames={{
                    inputWrapper: "shadow-none border-b-3",
                  }}
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-600 text-small">$</span>
                    </div>
                  }
                  variant="bordered"
                  type="number"
                  label="Min."
                  size="sm"
                  minValue={0}
                  maxValue={initialValuesState.maxTrafficCost || undefined}
                  value={initialValuesState.minTrafficCost}
                  onValueChange={(val) =>
                    setInitialValuesState({
                      ...initialValuesState,
                      minTrafficCost: val,
                    })
                  }
                />
                <NumberInput
                  name="traffic-cost-max"
                  classNames={{
                    inputWrapper: "shadow-none border-b-3",
                  }}
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-600 text-small">$</span>
                    </div>
                  }
                  variant="bordered"
                  type="number"
                  label="Max."
                  size="sm"
                  minValue={initialValuesState.minTrafficCost || 0}
                  value={initialValuesState.maxTrafficCost}
                  onValueChange={(val) =>
                    setInitialValuesState({
                      ...initialValuesState,
                      maxTrafficCost: val,
                    })
                  }
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1 text-sm">
                <FileIcon size={16} />
                Page Address
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Input
                  name="includePageAddress"
                  variant="bordered"
                  classNames={{
                    inputWrapper: "shadow-none border-b-3",
                  }}
                  radius="sm"
                  type="text"
                  size="sm"
                  label="Includes"
                  value={initialValuesState.includePageAddress}
                  onValueChange={(val) =>
                    setInitialValuesState({
                      ...initialValuesState,
                      includePageAddress: val,
                    })
                  }
                />
                <Input
                  name="excludePageAddress"
                  variant="bordered"
                  classNames={{
                    inputWrapper: "shadow-none border-b-3",
                  }}
                  radius="sm"
                  type="text"
                  size="sm"
                  label="Excludes"
                  value={initialValuesState.excludePageAddress}
                  onValueChange={(val) =>
                    setInitialValuesState({
                      ...initialValuesState,
                      excludePageAddress: val,
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(TopPagesFilters);
