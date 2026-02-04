import { Metadata } from "next";
import KeywordOverviewTool from "@/tools/KeywordResearch/KeywordOverview";

export const metadata: Metadata = {
  title: "Keyword Overview | SEOToolSuite",
};

export default function KeywordOverviewPage({
  searchParams,
}: {
  searchParams?: Promise<{
    keyword?: string;
    location_code?: string;
    language_code?: string;
  }>;
}) {
  return (
    <div className="keyword-overview-page">
      <KeywordOverviewTool searchParams={searchParams} />
    </div>
  );
}
