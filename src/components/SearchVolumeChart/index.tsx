"use client";

import { MONTH_NAMES } from "@/constants";
import { formatMonthlySearches } from "@/utils/dataforseo";
import { memo, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  BarChart,
  Bar,
} from "recharts";

const SearchVolumeChart = ({
  data,
  xAxisLabelType,
  chartType,
  chartHeight,
  chartAnimation = true,
  showAxis = true,
  showAxisLine = true,
  showTickLine = true,
  showTooltip = true,
}: {
  data: {
    year: number;
    month: number;
    search_volume: number;
  }[];
  xAxisLabelType: "month" | "monthWithYear";
  chartType: "area" | "bar";
  chartHeight: number;
  chartAnimation?: boolean;
  showAxis?: boolean;
  showAxisLine?: boolean;
  showTickLine?: boolean;
  showTooltip?: boolean;
}) => {
  const chartData = useMemo(() => formatMonthlySearches(data), [data]);

  return (
    <div className="w-full">
      {chartType === "area" && (
        <AreaChart
          style={{ width: "100%", height: chartHeight }}
          data={chartData}
          responsive
        >
          {showTooltip && (
            <RechartsTooltip
              formatter={(value) => [
                `${value?.toLocaleString(navigator.language)}`,
              ]}
              labelFormatter={(_label: any, payload: any) =>
                `${MONTH_NAMES[payload[0].payload.month - 1]}, ${payload[0].payload.year}`
              }
              labelStyle={{
                fontSize: "18px",
                fontFamily: "Poppins",
              }}
              itemStyle={{
                fontSize: "16px",
                fontFamily: "Poppins",
              }}
              contentStyle={{
                borderRadius: "8px",
              }}
            />
          )}
          {showAxis && (
            <XAxis
              dataKey={
                xAxisLabelType === "month" ? "monthLabel" : "monthWithYearLabel"
              }
              axisLine={showAxisLine}
              tickLine={showTickLine}
              tickMargin={8}
              style={{
                fontSize: "12px",
                fontFamily: "Poppins",
              }}
            />
          )}
          {showAxis && (
            <YAxis
              axisLine={showAxisLine}
              tickLine={showTickLine}
              style={{
                fontSize: "12px",
                fontFamily: "Poppins",
              }}
              tickFormatter={(value) =>
                value.toLocaleString(navigator.language)
              }
            />
          )}
          <Area
            type="monotone"
            dataKey="search_volume"
            fill="#052f4a99"
            stroke="#052f4a"
            strokeWidth={1.5}
            isAnimationActive={chartAnimation}
            animationDuration={500}
          />
        </AreaChart>
      )}
      {chartType === "bar" && (
        <BarChart
          style={{ width: "100%", height: chartHeight }}
          data={chartData}
          responsive
        >
          {showTooltip && (
            <RechartsTooltip
              formatter={(value) => [
                `${value?.toLocaleString(navigator.language)}`,
              ]}
              labelFormatter={(_label: any, payload: any) =>
                `${MONTH_NAMES[payload[0].payload.month - 1]}, ${payload[0].payload.year}`
              }
              labelStyle={{
                fontSize: "18px",
                fontFamily: "Poppins",
              }}
              itemStyle={{
                fontSize: "16px",
                fontFamily: "Poppins",
              }}
              contentStyle={{
                borderRadius: "8px",
              }}
            />
          )}
          {showAxis && (
            <XAxis
              dataKey={
                xAxisLabelType === "month" ? "monthLabel" : "monthWithYearLabel"
              }
              axisLine={showAxisLine}
              tickLine={showTickLine}
              tickMargin={8}
              style={{
                fontSize: "12px",
                fontFamily: "Poppins",
              }}
            />
          )}
          {showAxis && (
            <YAxis
              axisLine={showAxisLine}
              tickLine={showTickLine}
              style={{
                fontSize: "12px",
                fontFamily: "Poppins",
              }}
              tickFormatter={(value) =>
                value.toLocaleString(navigator.language)
              }
            />
          )}
          <Bar
            dataKey="search_volume"
            fill="#052f4a"
            style={{
              fontSize: "12px",
              fontFamily: "Poppins",
            }}
            radius={[6, 6, 0, 0]}
            isAnimationActive={chartAnimation}
            animationDuration={500}
          />
        </BarChart>
      )}
    </div>
  );
};

export default memo(SearchVolumeChart);
