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

const HistoricalRankPositionChart = ({
  data,
  sourceType = "organic",
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
  sourceType?: "organic";
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
    <div className="historical-rank-position-chart w-full">
      <BarChart
        style={{ width: "100%", height: chartHeight }}
        stackOffset="sign"
        barGap={0}
        barCategoryGap={0}
        data={chartData}
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
              if (item.dataKey === "metrics.organic.pos_1") return 1;
              if (item.dataKey === "metrics.organic.pos_2_3") return 2;
              if (item.dataKey === "metrics.organic.pos_4_10") return 3;
              if (item.dataKey === "metrics.organic.pos_11_20") return 4;
              if (item.dataKey === "metrics.organic.pos_21_30") return 5;
              if (item.dataKey === "metrics.organic.pos_31_40") return 6;
              if (item.dataKey === "metrics.organic.pos_41_50") return 7;
              if (item.dataKey === "metrics.organic.pos_51_60") return 8;
              if (item.dataKey === "metrics.organic.pos_61_70") return 9;
              if (item.dataKey === "metrics.organic.pos_71_80") return 10;
              if (item.dataKey === "metrics.organic.pos_81_90") return 11;
              if (item.dataKey === "metrics.organic.pos_91_100") return 12;
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
              dataKey="metrics.organic.pos_1"
              fill="oklch(52.7% 0.154 150.069)"
              stackId="a"
              isAnimationActive={chartAnimation}
              animationDuration={500}
            />
            <Bar
              type="monotone"
              dataKey="metrics.organic.pos_2_3"
              fill="oklch(52.7% 0.154 150.069)"
              stackId="a"
              isAnimationActive={chartAnimation}
              animationDuration={500}
            />
            <Bar
              type="monotone"
              dataKey="metrics.organic.pos_4_10"
              fill="oklch(72.3% 0.219 149.579)"
              stackId="a"
              isAnimationActive={chartAnimation}
              animationDuration={500}
            />
            <Bar
              type="monotone"
              dataKey="metrics.organic.pos_11_20"
              fill="oklch(79.5% 0.184 86.047)"
              stackId="a"
              isAnimationActive={chartAnimation}
              animationDuration={500}
            />
            <Bar
              type="monotone"
              dataKey="metrics.organic.pos_21_30"
              fill="oklch(79.5% 0.184 86.047)"
              stackId="a"
              isAnimationActive={chartAnimation}
              animationDuration={500}
            />
            <Bar
              type="monotone"
              dataKey="metrics.organic.pos_31_40"
              fill="oklch(79.5% 0.184 86.047)"
              stackId="a"
              isAnimationActive={chartAnimation}
              animationDuration={500}
            />
            <Bar
              type="monotone"
              dataKey="metrics.organic.pos_41_50"
              fill="oklch(79.5% 0.184 86.047)"
              stackId="a"
              isAnimationActive={chartAnimation}
              animationDuration={500}
            />
            <Bar
              type="monotone"
              dataKey="metrics.organic.pos_51_60"
              fill="oklch(63.7% 0.237 25.331)"
              stackId="a"
              isAnimationActive={chartAnimation}
              animationDuration={500}
            />
            <Bar
              type="monotone"
              dataKey="metrics.organic.pos_61_70"
              fill="oklch(63.7% 0.237 25.331)"
              stackId="a"
              isAnimationActive={chartAnimation}
              animationDuration={500}
            />
            <Bar
              type="monotone"
              dataKey="metrics.organic.pos_71_80"
              fill="oklch(63.7% 0.237 25.331)"
              stackId="a"
              isAnimationActive={chartAnimation}
              animationDuration={500}
            />
            <Bar
              type="monotone"
              dataKey="metrics.organic.pos_81_90"
              fill="oklch(63.7% 0.237 25.331)"
              stackId="a"
              isAnimationActive={chartAnimation}
              animationDuration={500}
            />
            <Bar
              type="monotone"
              dataKey="metrics.organic.pos_91_100"
              fill="oklch(63.7% 0.237 25.331)"
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

export default memo(HistoricalRankPositionChart);
