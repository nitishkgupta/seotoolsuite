import { MONTH_NAMES } from "@/constants";
import { MonthlySearches } from "@/types/DFS/common";
import { formatNumberToWord } from "@/utils/chart";
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
  CartesianGrid,
  Legend,
} from "recharts";

const SearchVolumeTrendChart = ({
  data,
  xAxisLabelType,
  chartType,
  chartHeight,
  chartAnimation = true,
  showAxis = true,
  showAxisLine = true,
  showTickLine = true,
  showTooltip = true,
  showCartesianGrid = true,
  showLegend = false,
  yAxisTickCount = 5,
}: {
  data: Array<MonthlySearches>;
  xAxisLabelType: "month" | "monthWithYear";
  chartType: "area" | "bar";
  chartHeight: number;
  chartAnimation?: boolean;
  showAxis?: boolean;
  showAxisLine?: boolean;
  showTickLine?: boolean;
  showTooltip?: boolean;
  showCartesianGrid?: boolean;
  showLegend?: boolean;
  yAxisTickCount?: number;
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
          {showCartesianGrid && (
            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
          )}
          {showTooltip && (
            <RechartsTooltip
              formatter={(value) => value?.toLocaleString(navigator.language)}
              labelFormatter={(_label: any, payload: any) =>
                payload && payload.length > 0
                  ? `${MONTH_NAMES[payload[0].payload.month - 1]}, ${payload[0].payload.year}`
                  : ""
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
              wrapperStyle={{
                zIndex: 9999,
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
              tickCount={yAxisTickCount}
              style={{
                fontSize: "12px",
                fontFamily: "Poppins",
              }}
              tickFormatter={(value) => formatNumberToWord(value)}
            />
          )}
          <Area
            type="monotone"
            dataKey="Monthly Searches"
            fill="oklch(29.3% 0.066 243.157)"
            stroke="oklch(29.3% 0.066 243.157)"
            fillOpacity={0.3}
            strokeWidth={1}
            isAnimationActive={chartAnimation}
            animationDuration={500}
          />
          {showLegend && <Legend />}
        </AreaChart>
      )}
      {chartType === "bar" && (
        <BarChart
          style={{ width: "100%", height: chartHeight }}
          data={chartData}
          responsive
        >
          {showCartesianGrid && (
            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
          )}
          {showTooltip && (
            <RechartsTooltip
              formatter={(value) => value?.toLocaleString(navigator.language)}
              labelFormatter={(_label: any, payload: any) =>
                payload && payload.length > 0
                  ? `${MONTH_NAMES[payload[0].payload.month - 1]}, ${payload[0].payload.year}`
                  : ""
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
              wrapperStyle={{
                zIndex: 9999,
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
              tickCount={yAxisTickCount}
              style={{
                fontSize: "12px",
                fontFamily: "Poppins",
              }}
              tickFormatter={(value) => formatNumberToWord(value)}
            />
          )}
          <Bar
            dataKey="Monthly Searches"
            fill="#052f4a"
            style={{
              fontSize: "12px",
              fontFamily: "Poppins",
            }}
            radius={[6, 6, 0, 0]}
            isAnimationActive={chartAnimation}
            animationDuration={500}
          />
          {showLegend && <Legend />}
        </BarChart>
      )}
    </div>
  );
};

export default memo(SearchVolumeTrendChart);
