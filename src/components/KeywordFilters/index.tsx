"use client";

import {
  Button,
  Checkbox,
  CheckboxGroup,
  Input,
  NumberInput,
  Tooltip,
} from "@heroui/react";
import {
  BadgeDollarSignIcon,
  BadgeQuestionMarkIcon,
  ChevronDownIcon,
  FunnelIcon,
  GaugeIcon,
  SquaresExcludeIcon,
  SquaresIntersectIcon,
  TargetIcon,
  TrendingUpIcon,
} from "lucide-react";
import { memo, useState } from "react";

export type KeywordFiltersInitialValues = {
  minSearchVolume?: number;
  maxSearchVolume?: number;
  minCPC?: number;
  maxCPC?: number;
  minPPC?: number;
  maxPPC?: number;
  minKD?: number;
  maxKD?: number;
  includeKeyword?: string;
  excludeKeyword?: string;
  searchIntents?: Array<
    "informational" | "navigational" | "commercial" | "transactional"
  >;
};

const KeywordFilters = ({
  defaultOpen = false,
  initialValues = {},
  activeFiltersCount,
}: {
  defaultOpen?: boolean;
  initialValues?: KeywordFiltersInitialValues;
  activeFiltersCount?: number;
}) => {
  const [filtersVisible, setFiltersVisible] = useState<boolean>(defaultOpen);
  const [initialValuesState, setInitialValuesState] =
    useState<KeywordFiltersInitialValues>(initialValues);
  return (
    <div className="keyword-filters flex flex-col items-start justify-start rounded-md border-2 border-slate-200">
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
                Search Volume
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <NumberInput
                  name="searchVolume-min"
                  classNames={{
                    inputWrapper: "shadow-none",
                  }}
                  variant="bordered"
                  type="number"
                  label="Min."
                  size="sm"
                  minValue={0}
                  maxValue={initialValuesState.maxSearchVolume || undefined}
                  value={initialValuesState.minSearchVolume}
                  onValueChange={(val) =>
                    setInitialValuesState({
                      ...initialValuesState,
                      minSearchVolume: val,
                    })
                  }
                />
                <NumberInput
                  name="searchVolume-max"
                  classNames={{
                    inputWrapper: "shadow-none",
                  }}
                  variant="bordered"
                  type="number"
                  label="Max."
                  size="sm"
                  minValue={initialValuesState.minSearchVolume || 0}
                  value={initialValuesState.maxSearchVolume}
                  onValueChange={(val) =>
                    setInitialValuesState({
                      ...initialValuesState,
                      maxSearchVolume: val,
                    })
                  }
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1 text-sm">
                <GaugeIcon size={16} />
                SEO Difficulty
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <NumberInput
                  name="kd-min"
                  classNames={{
                    inputWrapper: "shadow-none",
                  }}
                  variant="bordered"
                  type="number"
                  label="Min."
                  size="sm"
                  minValue={0}
                  maxValue={initialValuesState.maxKD || 100}
                  value={initialValuesState.minKD}
                  onValueChange={(val) =>
                    setInitialValuesState({
                      ...initialValuesState,
                      minKD: val,
                    })
                  }
                />
                <NumberInput
                  name="kd-max"
                  classNames={{
                    inputWrapper: "shadow-none",
                  }}
                  variant="bordered"
                  type="number"
                  label="Max."
                  size="sm"
                  minValue={initialValuesState.minKD || 0}
                  maxValue={100}
                  value={initialValuesState.maxKD}
                  onValueChange={(val) =>
                    setInitialValuesState({
                      ...initialValuesState,
                      maxKD: val,
                    })
                  }
                />
              </div>
              <div className="mt-2 flex flex-row flex-wrap items-center gap-2 lg:gap-1">
                <Tooltip content="Very Easy">
                  <Button
                    className="border border-[#1ba005] bg-transparent px-2 text-xs font-semibold text-[#1ba005] lg:h-auto lg:min-w-auto lg:py-1"
                    size="sm"
                    variant="flat"
                    onPress={() => {
                      setInitialValuesState({
                        ...initialValuesState,
                        minKD: 0,
                        maxKD: 14,
                      });
                    }}
                  >
                    0-14
                  </Button>
                </Tooltip>
                <Tooltip content="Easy">
                  <Button
                    className="border border-[#AADA2B] bg-transparent px-2 text-xs font-semibold text-[#AADA2B] lg:h-auto lg:min-w-auto lg:py-1"
                    size="sm"
                    variant="flat"
                    onPress={() => {
                      setInitialValuesState({
                        ...initialValuesState,
                        minKD: 15,
                        maxKD: 29,
                      });
                    }}
                  >
                    15-29
                  </Button>
                </Tooltip>
                <Tooltip content="Medium">
                  <Button
                    className="border border-[#ffbe02] bg-transparent px-2 text-xs font-semibold text-[#ffbe02] lg:h-auto lg:min-w-auto lg:py-1"
                    size="sm"
                    variant="flat"
                    onPress={() => {
                      setInitialValuesState({
                        ...initialValuesState,
                        minKD: 30,
                        maxKD: 49,
                      });
                    }}
                  >
                    30-49
                  </Button>
                </Tooltip>
                <Tooltip content="Hard">
                  <Button
                    className="border border-[#ef7a24] bg-transparent px-2 text-xs font-semibold text-[#ef7a24] lg:h-auto lg:min-w-auto lg:py-1"
                    size="sm"
                    variant="flat"
                    onPress={() => {
                      setInitialValuesState({
                        ...initialValuesState,
                        minKD: 50,
                        maxKD: 69,
                      });
                    }}
                  >
                    50-69
                  </Button>
                </Tooltip>
                <Tooltip content="Very Hard">
                  <Button
                    className="border border-[#bd462e] bg-transparent px-2 text-xs font-semibold text-[#bd462e] lg:h-auto lg:min-w-auto lg:py-1"
                    size="sm"
                    variant="flat"
                    onPress={() => {
                      setInitialValuesState({
                        ...initialValuesState,
                        minKD: 70,
                        maxKD: 84,
                      });
                    }}
                  >
                    70-84
                  </Button>
                </Tooltip>
                <Tooltip content="Extremely Hard">
                  <Button
                    className="border border-[red] bg-transparent px-2 text-xs font-semibold text-[red] lg:h-auto lg:min-w-auto lg:py-1"
                    size="sm"
                    variant="flat"
                    onPress={() => {
                      setInitialValuesState({
                        ...initialValuesState,
                        minKD: 85,
                        maxKD: 100,
                      });
                    }}
                  >
                    85-100
                  </Button>
                </Tooltip>
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div>
              <div className="flex items-center gap-1 text-sm">
                <BadgeDollarSignIcon size={16} />
                CPC
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <NumberInput
                  name="cpc-min"
                  classNames={{
                    inputWrapper: "shadow-none",
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
                  maxValue={initialValuesState.maxCPC || undefined}
                  value={initialValuesState.minCPC}
                  onValueChange={(val) =>
                    setInitialValuesState({
                      ...initialValuesState,
                      minCPC: val,
                    })
                  }
                />
                <NumberInput
                  name="cpc-max"
                  classNames={{
                    inputWrapper: "shadow-none",
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
                  minValue={initialValuesState.minCPC || 0}
                  value={initialValuesState.maxCPC}
                  onValueChange={(val) =>
                    setInitialValuesState({
                      ...initialValuesState,
                      maxCPC: val,
                    })
                  }
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1 text-sm">
                <TargetIcon size={16} />
                PPC
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <NumberInput
                  name="ppc-min"
                  classNames={{
                    inputWrapper: "shadow-none",
                  }}
                  variant="bordered"
                  type="number"
                  label="Min."
                  size="sm"
                  minValue={0}
                  maxValue={initialValuesState.maxPPC || 100}
                  value={initialValuesState.minPPC}
                  onValueChange={(val) =>
                    setInitialValuesState({
                      ...initialValuesState,
                      minPPC: val,
                    })
                  }
                />
                <NumberInput
                  name="ppc-max"
                  classNames={{
                    inputWrapper: "shadow-none",
                  }}
                  variant="bordered"
                  type="number"
                  label="Max."
                  size="sm"
                  maxValue={100}
                  minValue={initialValuesState.minPPC || 0}
                  value={initialValuesState.maxPPC}
                  onValueChange={(val) =>
                    setInitialValuesState({
                      ...initialValuesState,
                      maxPPC: val,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div>
              <div className="flex items-center gap-1 text-sm">
                <SquaresIntersectIcon size={16} />
                Include Keyword
              </div>
              <div className="mt-2">
                <Input
                  name="includeKeyword"
                  variant="bordered"
                  classNames={{
                    inputWrapper: "shadow-none",
                  }}
                  radius="sm"
                  type="text"
                  size="md"
                  value={initialValuesState.includeKeyword}
                  onValueChange={(val) =>
                    setInitialValuesState({
                      ...initialValuesState,
                      includeKeyword: val,
                    })
                  }
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1 text-sm">
                <SquaresExcludeIcon size={16} />
                Exclude Keyword
              </div>
              <div className="mt-2">
                <Input
                  name="excludeKeyword"
                  variant="bordered"
                  classNames={{
                    inputWrapper: "shadow-none",
                  }}
                  radius="sm"
                  type="text"
                  size="md"
                  value={initialValuesState.excludeKeyword}
                  onValueChange={(val) =>
                    setInitialValuesState({
                      ...initialValuesState,
                      excludeKeyword: val,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="flex items-center gap-1 text-sm">
                <BadgeQuestionMarkIcon size={16} />
                Search Intent
              </div>
            </div>
            <div className="mt-2 w-full">
              <CheckboxGroup
                name="searchIntents[]"
                orientation="horizontal"
                value={initialValuesState.searchIntents}
                onValueChange={(val: any) =>
                  setInitialValuesState({
                    ...initialValuesState,
                    searchIntents: val,
                  })
                }
              >
                <Checkbox value="informational" size="sm">
                  Informational
                </Checkbox>
                <Checkbox value="navigational" size="sm">
                  Navigational
                </Checkbox>
                <Checkbox value="commercial" size="sm">
                  Commercial
                </Checkbox>
                <Checkbox value="transactional" size="sm">
                  Transactional
                </Checkbox>
              </CheckboxGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(KeywordFilters);
