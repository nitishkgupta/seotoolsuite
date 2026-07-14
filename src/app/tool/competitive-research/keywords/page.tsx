import { Metadata } from "next";
import RankedKeywordsTool from "@/tools/CompetitiveResearch/RankedKeywords";

export const metadata: Metadata = {
  title: "Ranked Keywords | SEOToolSuite",
  description:
    "The Ranked Keywords tool shows the keywords a domain or page ranks for in search results.",
  openGraph: {
    type: "website",
    title: "Ranked Keywords | SEOToolSuite",
    description:
      "The Ranked Keywords tool shows the keywords a domain or page ranks for in search results.",
    images: [{ url: "/assets/images/ranked-keywords-screenshot.png" }],
  },
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
