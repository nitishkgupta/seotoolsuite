"use client";

import { getDomainRatingFree } from "@/actions/ahrefs";
import { trackUmamiEvent } from "@/utils/umami";
import { addToast, Button, Form, Progress, Textarea } from "@heroui/react";
import { DataGrid, GridColDef, useGridApiRef } from "@mui/x-data-grid";
import { LinkIcon, StarIcon } from "lucide-react";
import { memo, useCallback, useMemo, useState } from "react";

type DomainRatingItem = {
  id: number;
  target: string;
  domainRating?: number;
};

const BulkDRCheckerTool = () => {
  const dataGridRef = useGridApiRef();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedTargets, setSelectedTargets] = useState<string>();
  const [totalTargets, setTotalTargets] = useState<number>(0);
  const [targetsDone, setTargetsDone] = useState<number>(0);
  const bulkDRCheckerProgress = (targetsDone / totalTargets) * 100;

  const getBulkDRCheckerResults = useCallback(
    async (targets: string[]) => {
      if (!targets || targets.length === 0)
        throw new Error("No targets provided.");

      setIsLoading(true);
      setTotalTargets(targets.length);
      setTargetsDone(0);

      if (dataGridRef.current) dataGridRef.current.setRows([]);

      window.setTimeout(() => {
        document.getElementById("domain-ratings-table")?.scrollIntoView({
          behavior: "smooth",
        });
      }, 200);

      try {
        trackUmamiEvent("backlink-research/bulk-dr-checker");
      } catch (error) {
        console.error(error);
      }

      let rowId = 1;

      for (const target of targets) {
        try {
          const domainRating = await getDomainRatingFree(target);

          if (typeof domainRating === "number") {
            const tableRow: DomainRatingItem = {
              id: rowId,
              target: target,
              domainRating: domainRating,
            };

            if (dataGridRef.current) {
              dataGridRef.current.updateRows([tableRow]);
              rowId++;
            }
          }
        } catch (error) {
          console.error(error);
          addToast({
            title: "Ahrefs Domain Rating API Error",
            description: `Failed to get domain rating for target: ${target}.`,
            color: "danger",
          });
        } finally {
          setTargetsDone((prev) => prev + 1);
        }
      }

      setIsLoading(false);
    },
    [dataGridRef],
  );

  const handleFormSubmit = useCallback(
    async (e: React.SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();

      const targets: string | undefined = selectedTargets;
      const targetsFiltered: string[] = [];

      if (!targets) {
        return;
      }

      const targetsArray = targets.replace(/\r\n/g, "\n").split("\n");

      targetsArray.forEach((target) => {
        let domain: string;

        // Convert URL to domain.
        if (URL.canParse(target)) {
          domain = new URL(target).hostname;
        } else {
          domain = target;
        }

        if (domain && !targetsFiltered.includes(domain))
          targetsFiltered.push(domain);
      });

      await getBulkDRCheckerResults(targetsFiltered);
    },
    [selectedTargets, getBulkDRCheckerResults],
  );

  const getMUIRowHeight = useCallback(() => "auto", []);

  const dataGridInitialState = useMemo(() => {
    return {
      pagination: {
        paginationModel: { page: 0, pageSize: 25 },
      },
    };
  }, []);

  const dataGridSlotProps = useMemo(() => {
    return {
      toolbar: {
        csvOptions: {
          allColumns: true,
          fileName: `SEOToolSuite-bulk-dr-checker`,
          escapeFormulas: false,
        },
      },
    };
  }, []);

  const tableColumns: GridColDef[] = useMemo(
    () => [
      {
        field: "id",
        headerName: "#",
        type: "number",
        align: "left",
        display: "flex",
        headerAlign: "left",
        width: 64,
      },
      {
        field: "target",
        headerName: "Domain",
        minWidth: 250,
        type: "string",
        display: "flex",
        flex: 1,
        align: "left",
        headerAlign: "left",
        cellClassName: "min-h-12 relative group",
      },
      {
        field: "domainRating",
        display: "flex",
        flex: 1,
        headerName: "DR",
        description: "Ahrefs Domain Rating",
        type: "number",
        align: "center",
        headerAlign: "left",
        minWidth: 64,
        maxWidth: 80,
        resizable: false,
        renderCell: (params) => (
          <>
            {typeof params.value !== "number" ? (
              <div className="w-full px-2.5 text-center">N/A</div>
            ) : (
              <div className="relative flex h-9 w-12 flex-col items-center justify-center rounded-md border border-b-2 border-sky-950/50 bg-sky-950/10 text-center font-medium text-sky-950">
                <span className="relative z-20">{params.value}</span>
                <div className="mx-auto w-8 overflow-hidden rounded-full bg-sky-950/20">
                  <div
                    className="scale-x-anim h-1 bg-sky-950"
                    style={{
                      width: `${params.value}%`,
                    }}
                  ></div>
                </div>
              </div>
            )}
          </>
        ),
      },
    ],
    [],
  );

  const onDataGridPaginationModelChange = useCallback(() => {
    window.setTimeout(() => {
      document.getElementById("domain-ratings-table")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  }, []);

  return (
    <div className="bulk-dr-checker-tool relative w-full px-4 py-4 lg:px-8 lg:py-8">
      <div className="tool-form-container relative flex w-full flex-col items-start justify-start rounded-md border-2 border-b-3 border-slate-200 bg-white p-5">
        {isLoading && (
          <div className="absolute top-0 left-0 z-20 w-full overflow-hidden rounded-t-md">
            <Progress
              aria-label="Bulk DR Checker Progress"
              className="rounded-t-md"
              size="sm"
              radius="none"
              color="primary"
              value={bulkDRCheckerProgress}
            />
          </div>
        )}
        <div className="flex flex-col items-start gap-2 md:flex-row md:items-center">
          <div className="flex items-center gap-2 rounded-md border bg-sky-950 p-2 md:p-3">
            <LinkIcon size={26} className="animate-appearance-in text-white" />
            <div
              className="animate-appearance-in h-6 w-0.5 rounded-md bg-white"
              style={{ animationDelay: "100ms" }}
            ></div>
            <StarIcon
              size={22}
              className="animate-appearance-in text-white"
              style={{ animationDelay: "200ms" }}
            />
          </div>
          <div className="flex flex-col items-start md:translate-y-0.5">
            <div className="text-xl font-medium text-sky-950 md:leading-none">
              Bulk DR Checker
            </div>
            <div className="text-base font-medium text-slate-500">
              Check Ahrefs domain rating for multiple domains at once.
            </div>
          </div>
        </div>

        <div className="tool-input-form-container mt-4 w-full">
          <Form
            onSubmit={handleFormSubmit}
            className="tool-input-form flex w-full flex-col items-start justify-start"
          >
            <div className="flex w-full flex-col items-start justify-start gap-2 md:flex-row">
              <Textarea
                name="domains"
                variant="flat"
                type="text"
                label="Domains"
                isDisabled={isLoading}
                value={selectedTargets}
                onValueChange={setSelectedTargets}
                placeholder="example.com"
                autoFocus
                isRequired
              />
            </div>
            <div className="w-full">
              <Button
                color="primary"
                variant="flat"
                type="submit"
                size="lg"
                isDisabled={isLoading}
                className="h-14 w-full"
              >
                Submit
              </Button>
            </div>
            <div className="text-left text-sm">
              Domain Rating by{" "}
              <a
                href="https://ahrefs.com/"
                target="_blank"
                rel="nofollow"
                className="underline"
              >
                Ahrefs
              </a>
              .
            </div>
          </Form>
        </div>
      </div>
      {(isLoading || targetsDone > 0) && (
        <>
          <div className="tool-results-container mt-4 flex w-full flex-col gap-8 md:gap-4 lg:mt-8 lg:flex-row">
            <div
              className="tool-results-table-container h-fit w-full scroll-m-4 overflow-auto rounded-md border-2 border-b-3 border-slate-200 bg-white lg:scroll-m-8"
              id="domain-ratings-table"
            >
              <div className="header relative flex w-full items-center gap-2 border-b-2 border-slate-200 px-4 py-3 text-base md:text-lg">
                {isLoading && (
                  <div className="absolute top-0 left-0 z-20 w-full overflow-hidden rounded-t-md">
                    <Progress
                      aria-label="Bulk DR Checker Progress"
                      className="rounded-t-md"
                      size="sm"
                      radius="none"
                      color="primary"
                      value={bulkDRCheckerProgress}
                    />
                  </div>
                )}
                <StarIcon size={20} />
                <span>
                  Domain Ratings (
                  {totalTargets.toLocaleString(navigator.language)})
                </span>
              </div>
              <div className="max-h-full overflow-auto p-4">
                <DataGrid
                  apiRef={dataGridRef}
                  showCellVerticalBorder
                  showColumnVerticalBorder
                  columns={tableColumns}
                  initialState={dataGridInitialState}
                  showToolbar
                  disableRowSelectionOnClick
                  getRowHeight={getMUIRowHeight}
                  onPaginationModelChange={onDataGridPaginationModelChange}
                  checkboxSelection
                  slotProps={dataGridSlotProps}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default memo(BulkDRCheckerTool);
