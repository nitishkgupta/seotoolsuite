/**
 * Format number to word format (ex: K, M, B)
 */
export const formatNumberToWord = (
  num: number,
  decimals: number = 1,
): string => {
  const numAbs = Math.abs(num);
  if (numAbs >= 1000000000) {
    return (num / 1000000000).toFixed(decimals) + "B";
  } else if (numAbs >= 1000000) {
    return (num / 1000000).toFixed(decimals) + "M";
  } else if (numAbs >= 1000) {
    return (num / 1000).toFixed(decimals) + "K";
  } else {
    return `${num}`;
  }
};

/**
 * Get label for historical rank trend chart.
 */
export const getHistoricalRankTrendChartLabel = (name: any) => {
  switch (name) {
    case "metrics.organic.etv":
      return "Monthly Organic Traffic";
    case "metrics.organic.count":
      return "Ranked Keywords";
    case "metrics.organic.estimated_paid_traffic_cost":
      return "Est. Traffic Cost ($)";
    case "metrics.organic.is_new":
      return "(+) New Keywords";
    case "metrics.organic.is_up":
      return "(^) Keywords Moved Up";
    case "metrics.organic.is_down":
      return "(v) Keywords Moved Down";
    case "metrics.organic.is_lost":
      return "(-) Keywords Lost";
    case "metrics.organic.pos_1":
      return "Position 1";
    case "metrics.organic.pos_2_3":
      return "Position 2-3";
    case "metrics.organic.pos_4_10":
      return "Position 4-10";
    case "metrics.organic.pos_11_20":
      return "Position 11-20";
    case "metrics.organic.pos_21_30":
      return "Position 21-30";
    case "metrics.organic.pos_31_40":
      return "Position 31-40";
    case "metrics.organic.pos_41_50":
      return "Position 41-50";
    case "metrics.organic.pos_51_60":
      return "Position 51-60";
    case "metrics.organic.pos_61_70":
      return "Position 61-70";
    case "metrics.organic.pos_71_80":
      return "Position 71-80";
    case "metrics.organic.pos_81_90":
      return "Position 81-90";
    case "metrics.organic.pos_91_100":
      return "Position 91-100";
    case "metrics.paid.etv":
      return "Monthly Paid Traffic";
    case "metrics.paid.count":
      return "Paid Keywords";
    case "metrics.paid.estimated_paid_traffic_cost":
      return "Est. Traffic Cost ($)";
    case "metrics.paid.is_new":
      return "(+) New Keywords";
    case "metrics.paid.is_lost":
      return "(-) Keywords Lost";
    default:
      return name;
  }
};
