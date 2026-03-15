import { MONTH_NAMES } from "@/constants";
import { HistoricalRankOverviewItem } from "@/types/DFS/HistoricalRankOverview";
import {
  formatNumberToWord,
  getHistoricalRankTrendChartLabel,
} from "@/utils/chart";
import { formatHistoricalRankOverviewData } from "@/utils/dataforseo";
import { RadioGroup, Radio } from "@heroui/react";
import { memo, useMemo, useState } from "react";
import {
  AreaChart,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  YAxis,
  XAxis,
  Area,
} from "recharts";

const HistoricalRankTrendChart = ({
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

  const [activeMetric, setActiveMetric] = useState<string>(
    sourceType === "organic" ? "metrics.organic.etv" : "metrics.paid.etv",
  );

  return (
    <div className="historical-rank-trend-chart w-full">
      <div className="mb-3">
        <RadioGroup
          color="primary"
          size="sm"
          value={activeMetric}
          onValueChange={setActiveMetric}
          orientation="horizontal"
        >
          {sourceType === "organic" && (
            <>
              <Radio value="metrics.organic.etv">Monthly Organic Traffic</Radio>
              <Radio value="metrics.organic.count">Ranked Keywords</Radio>
              <Radio value="metrics.organic.estimated_paid_traffic_cost">
                Est. Traffic Cost
              </Radio>
            </>
          )}
          {sourceType === "paid" && (
            <>
              <Radio value="metrics.paid.etv">Monthly Paid Traffic</Radio>
              <Radio value="metrics.paid.count">Paid Keywords</Radio>
              <Radio value="metrics.paid.estimated_paid_traffic_cost">
                Est. Traffic Cost
              </Radio>
            </>
          )}
        </RadioGroup>
      </div>
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
            formatter={(value: any, name: any) => [
              Math.round(value).toLocaleString(navigator.language),
              getHistoricalRankTrendChartLabel(name),
            ]}
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
        {sourceType === "organic" && activeMetric === "metrics.organic.etv" && (
          <Area
            type="monotone"
            dataKey="metrics.organic.etv"
            fill="oklch(29.3% 0.066 243.157)"
            fillOpacity={0.3}
            stroke="oklch(29.3% 0.066 243.157)"
            isAnimationActive={chartAnimation}
            strokeWidth={1}
            animationDuration={500}
          />
        )}
        {sourceType === "organic" &&
          activeMetric === "metrics.organic.count" && (
            <Area
              type="monotone"
              dataKey="metrics.organic.count"
              fillOpacity={0.3}
              fill="oklch(29.1% 0.149 302.717)"
              stroke="oklch(29.1% 0.149 302.717)"
              isAnimationActive={chartAnimation}
              strokeWidth={1}
              animationDuration={500}
            />
          )}
        {sourceType === "organic" &&
          activeMetric === "metrics.organic.estimated_paid_traffic_cost" && (
            <Area
              type="monotone"
              dataKey="metrics.organic.estimated_paid_traffic_cost"
              fillOpacity={0.3}
              fill="oklch(28.2% 0.091 267.935)"
              stroke="oklch(28.2% 0.091 267.935)"
              isAnimationActive={chartAnimation}
              strokeWidth={1}
              animationDuration={500}
            />
          )}
        {sourceType === "paid" && activeMetric === "metrics.paid.etv" && (
          <Area
            type="monotone"
            dataKey="metrics.paid.etv"
            fill="oklch(29.3% 0.066 243.157)"
            fillOpacity={0.3}
            stroke="oklch(29.3% 0.066 243.157)"
            isAnimationActive={chartAnimation}
            strokeWidth={1}
            animationDuration={500}
          />
        )}
        {sourceType === "paid" && activeMetric === "metrics.paid.count" && (
          <Area
            type="monotone"
            dataKey="metrics.paid.count"
            fillOpacity={0.3}
            fill="oklch(29.1% 0.149 302.717)"
            stroke="oklch(29.1% 0.149 302.717)"
            isAnimationActive={chartAnimation}
            strokeWidth={1}
            animationDuration={500}
          />
        )}
        {sourceType === "paid" &&
          activeMetric === "metrics.paid.estimated_paid_traffic_cost" && (
            <Area
              type="monotone"
              dataKey="metrics.paid.estimated_paid_traffic_cost"
              fillOpacity={0.3}
              fill="oklch(28.2% 0.091 267.935)"
              stroke="oklch(28.2% 0.091 267.935)"
              isAnimationActive={chartAnimation}
              strokeWidth={1}
              animationDuration={500}
            />
          )}
      </AreaChart>
    </div>
  );
};

export default memo(HistoricalRankTrendChart);
