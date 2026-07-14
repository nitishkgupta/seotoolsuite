import { Metadata } from "next";
import TrafficOverviewTool from "@/tools/CompetitiveResearch/TrafficOverview";

export const metadata: Metadata = {
  title: "Traffic Overview | SEOToolSuite",
  description:
    "The Traffic Overview tool analyzes a website’s organic and paid search performance.",
  openGraph: {
    type: "website",
    title: "Traffic Overview | SEOToolSuite",
    description:
      "The Traffic Overview tool analyzes a website’s organic and paid search performance.",
    images: [{ url: "/assets/images/traffic-overview-screenshot.png" }],
  },
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
