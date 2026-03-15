import { MONTH_NAMES } from "@/constants";
import { HistoricalRankOverviewItem } from "@/types/DFS/HistoricalRankOverview";
import {
  formatNumberToWord,
  getHistoricalRankTrendChartLabel,
} from "@/utils/chart";
import { formatHistoricalRankOverviewData } from "@/utils/dataforseo";
import { memo, useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts";

const HistoricalRankChangesChart = ({
  data,
  sourceType,
  xAxisLabelType,
  chartHeight,
  chartAnimation = true,
  showAxis = true,
  showAxisLine = true,
  showTickLine = true,
  showTooltip = true,
  showCartesianGrid = true,
  yAxisTickCount = 5,
}: {
  data: HistoricalRankOverviewItem[];
  sourceType: "organic" | "paid";
  xAxisLabelType: "month" | "monthWithYear";
  chartHeight: number;
  chartAnimation?: boolean;
  showAxis?: boolean;
  showAxisLine?: boolean;
  showTickLine?: boolean;
  showTooltip?: boolean;
  showCartesianGrid?: boolean;
  yAxisTickCount?: number;
}) => {
  const chartData = useMemo(
    () => formatHistoricalRankOverviewData(data),
    [data],
  );

  return (
    <div className="historical-rank-changes-chart w-full">
      <BarChart
        style={{ width: "100%", height: chartHeight }}
        stackOffset="sign"
        data={chartData}
        barGap={0}
        barCategoryGap={0}
        responsive
      >
        {showCartesianGrid && (
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
        )}
        {showTooltip && (
          <RechartsTooltip
            formatter={(value: any, name: any) => [
              Math.round(value).toLocaleString(navigator.language),
              getHistoricalRankTrendChartLabel(name),
            ]}
            itemSorter={(item) => {
              if (item.dataKey === "metrics.organic.is_new") return 1;
              if (item.dataKey === "metrics.organic.is_up") return 2;
              if (item.dataKey === "metrics.organic.is_lost") return 3;
              if (item.dataKey === "metrics.organic.is_down") return 4;
              return 0;
            }}
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
        {sourceType === "organic" && (
          <>
            <Bar
              type="monotone"
              dataKey="metrics.organic.is_new"
              fill="oklch(52.7% 0.154 150.069)"
              stackId="a"
              isAnimationActive={chartAnimation}
              animationDuration={500}
            />
            <Bar
              type="monotone"
              dataKey="metrics.organic.is_up"
              fill="oklch(72.3% 0.219 149.579)"
              stackId="a"
              isAnimationActive={chartAnimation}
              animationDuration={500}
            />
            <Bar
              type="monotone"
              dataKey="metrics.organic.is_lost"
              fill="oklch(50.5% 0.213 27.518)"
              stackId="a"
              isAnimationActive={chartAnimation}
              animationDuration={500}
            />
            <Bar
              type="monotone"
              dataKey="metrics.organic.is_down"
              fill="oklch(63.7% 0.237 25.331)"
              stackId="a"
              isAnimationActive={chartAnimation}
              animationDuration={500}
            />
          </>
        )}
        {sourceType === "paid" && (
          <>
            <Bar
              type="monotone"
              dataKey="metrics.paid.is_new"
              fill="oklch(52.7% 0.154 150.069)"
              stackId="a"
              isAnimationActive={chartAnimation}
              animationDuration={500}
            />
            <Bar
              type="monotone"
              dataKey="metrics.paid.is_lost"
              fill="oklch(50.5% 0.213 27.518)"
              stackId="a"
              isAnimationActive={chartAnimation}
              animationDuration={500}
            />
          </>
        )}
      </BarChart>
    </div>
  );
};

export default memo(HistoricalRankChangesChart);
