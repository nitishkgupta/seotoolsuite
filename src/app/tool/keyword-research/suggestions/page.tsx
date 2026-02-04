import { Metadata } from "next";
import KeywordSuggestionsTool from "@/tools/KeywordResearch/KeywordSuggestions";

export const metadata: Metadata = {
  title: "Keyword Suggestions | SEOToolSuite",
};

export default function KeywordSuggestionsPage({
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
      <KeywordSuggestionsTool searchParams={searchParams} />
    </div>
  );
}
