"use client";

import { BacklinkType } from "@/types/DFS/common";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Input,
  NumberInput,
} from "@heroui/react";
import {
  ChevronDownIcon,
  FunnelIcon,
  LinkIcon,
  StarIcon,
  TypeIcon,
} from "lucide-react";
import { memo, useState } from "react";

export type BacklinkCheckerFiltersInitialValues = {
  includeSource?: string;
  excludeSource?: string;
  includeTarget?: string;
  excludeTarget?: string;
  minSourceDR?: number;
  maxSourceDR?: number;
  minSourcePR?: number;
  maxSourcePR?: number;
  backlinkTypes?: Array<BacklinkType>;
};

const BacklinkCheckerFilters = ({
  defaultOpen = false,
  initialValues = {},
  activeFiltersCount,
}: {
  defaultOpen?: boolean;
  initialValues?: BacklinkCheckerFiltersInitialValues;
  activeFiltersCount?: number;
}) => {
  const [filtersVisible, setFiltersVisible] = useState<boolean>(defaultOpen);
  const [initialValuesState, setInitialValuesState] =
    useState<BacklinkCheckerFiltersInitialValues>(initialValues);

  return (
    <div className="backlink-checker-filters flex flex-col items-start justify-start rounded-md border-2 border-b-3 border-slate-200">
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
                <LinkIcon size={16} />
                Source URL
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Input
                  name="includeSource"
                  variant="bordered"
                  classNames={{
                    inputWrapper: "shadow-none border-b-3",
                  }}
                  radius="sm"
                  type="text"
                  size="sm"
                  label="Includes"
                  value={initialValuesState.includeSource}
                  onValueChange={(val) =>
                    setInitialValuesState({
                      ...initialValuesState,
                      includeSource: val,
                    })
                  }
                />
                <Input
                  name="excludeSource"
                  variant="bordered"
                  classNames={{
                    inputWrapper: "shadow-none border-b-3",
                  }}
                  radius="sm"
                  type="text"
                  size="sm"
                  label="Excludes"
                  value={initialValuesState.excludeSource}
                  onValueChange={(val) =>
                    setInitialValuesState({
                      ...initialValuesState,
                      excludeSource: val,
                    })
                  }
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1 text-sm">
                <LinkIcon size={16} />
                Target URL
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Input
                  name="includeTarget"
                  variant="bordered"
                  classNames={{
                    inputWrapper: "shadow-none border-b-3",
                  }}
                  radius="sm"
                  type="text"
                  size="sm"
                  label="Includes"
                  value={initialValuesState.includeTarget}
                  onValueChange={(val) =>
                    setInitialValuesState({
                      ...initialValuesState,
                      includeTarget: val,
                    })
                  }
                />
                <Input
                  name="excludeTarget"
                  variant="bordered"
                  classNames={{
                    inputWrapper: "shadow-none border-b-3",
                  }}
                  radius="sm"
                  type="text"
                  size="sm"
                  label="Excludes"
                  value={initialValuesState.excludeTarget}
                  onValueChange={(val) =>
                    setInitialValuesState({
                      ...initialValuesState,
                      excludeTarget: val,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div>
              <div className="flex items-center gap-1 text-sm">
                <StarIcon size={16} />
                Source Domain Strength
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <NumberInput
                  name="source-dr-min"
                  classNames={{
                    inputWrapper: "shadow-none border-b-3",
                  }}
                  variant="bordered"
                  type="number"
                  label="Min."
                  size="sm"
                  minValue={0}
                  maxValue={initialValuesState.maxSourceDR ?? 100}
                  value={initialValuesState.minSourceDR}
                  onValueChange={(val) =>
                    setInitialValuesState({
                      ...initialValuesState,
                      minSourceDR: val,
                    })
                  }
                />
                <NumberInput
                  name="source-dr-max"
                  classNames={{
                    inputWrapper: "shadow-none border-b-3",
                  }}
                  variant="bordered"
                  type="number"
                  label="Max."
                  size="sm"
                  minValue={initialValuesState.minSourceDR ?? 0}
                  maxValue={100}
                  value={initialValuesState.maxSourceDR}
                  onValueChange={(val) =>
                    setInitialValuesState({
                      ...initialValuesState,
                      maxSourceDR: val,
                    })
                  }
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1 text-sm">
                <StarIcon size={16} />
                Source Page Strength
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <NumberInput
                  name="source-pr-min"
                  classNames={{
                    inputWrapper: "shadow-none border-b-3",
                  }}
                  variant="bordered"
                  type="number"
                  label="Min."
                  size="sm"
                  minValue={0}
                  maxValue={initialValuesState.maxSourcePR ?? 100}
                  value={initialValuesState.minSourcePR}
                  onValueChange={(val) =>
                    setInitialValuesState({
                      ...initialValuesState,
                      minSourcePR: val,
                    })
                  }
                />
                <NumberInput
                  name="source-pr-max"
                  classNames={{
                    inputWrapper: "shadow-none border-b-3",
                  }}
                  variant="bordered"
                  type="number"
                  label="Max."
                  size="sm"
                  minValue={initialValuesState.minSourcePR ?? 0}
                  maxValue={100}
                  value={initialValuesState.maxSourcePR}
                  onValueChange={(val) =>
                    setInitialValuesState({
                      ...initialValuesState,
                      maxSourcePR: val,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="flex items-center gap-1 text-sm">
                <TypeIcon size={16} />
                Backlink Type
              </div>
            </div>
            <div className="mt-2 w-full">
              <CheckboxGroup
                name="backlinkTypes[]"
                orientation="horizontal"
                value={initialValuesState.backlinkTypes}
                onValueChange={(val: any) =>
                  setInitialValuesState({
                    ...initialValuesState,
                    backlinkTypes: val,
                  })
                }
              >
                <Checkbox value="anchor" size="sm">
                  Anchor
                </Checkbox>
                <Checkbox value="image" size="sm">
                  Image
                </Checkbox>
                <Checkbox value="redirect" size="sm">
                  Redirect
                </Checkbox>
                <Checkbox value="meta" size="sm">
                  Meta
                </Checkbox>
                <Checkbox value="canonical" size="sm">
                  Canonical
                </Checkbox>
                <Checkbox value="alternate" size="sm">
                  Alternate
                </Checkbox>
              </CheckboxGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(BacklinkCheckerFilters);
