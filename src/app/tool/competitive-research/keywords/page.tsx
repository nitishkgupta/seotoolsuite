import { Metadata } from "next";
import RankedKeywordsTool from "@/tools/CompetitiveResearch/RankedKeywords";

export const metadata: Metadata = {
  title: "Ranked Keywords | SEOToolSuite",
};

export default function RankedKeywordsPage({
  searchParams,
}: {
  searchParams?: Promise<{
    target?: string;
    location_code?: string;
    language_code?: string;
  }>;
}) {
  return (
    <div className="ranked-keywords-page">
      <RankedKeywordsTool searchParams={searchParams} />
    </div>
  );
}
