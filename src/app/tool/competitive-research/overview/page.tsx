import { Metadata } from "next";
import TrafficOverviewTool from "@/tools/CompetitiveResearch/TrafficOverview";

export const metadata: Metadata = {
  title: "Traffic Overview | SEOToolSuite",
};

export default function TrafficOverviewPage({
  searchParams,
}: {
  searchParams?: Promise<{
    target?: string;
    location_code?: string;
    language_code?: string;
  }>;
}) {
  return (
    <div className="traffic-overview-page">
      <TrafficOverviewTool searchParams={searchParams} />
    </div>
  );
}
