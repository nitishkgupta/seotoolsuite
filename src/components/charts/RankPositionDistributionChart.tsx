import { RankedKeywordsMetricsData } from "@/types/DFS/RankedKeywords";
import { formatNumberToWord } from "@/utils/chart";
import { formatRankPositionDistribution } from "@/utils/dataforseo";
import { memo, useMemo } from "react";
import {
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
} from "recharts";

const RankPositionDistributionChart = ({
  data,
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
  data: RankedKeywordsMetricsData;
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
  const chartData = useMemo(() => formatRankPositionDistribution(data), [data]);

  return (
    <div className="w-full">
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
            labelFormatter={(label) => `Position ${label}`}
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
            dataKey="label"
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
          dataKey="Keywords"
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
    </div>
  );
};

export default memo(RankPositionDistributionChart);
