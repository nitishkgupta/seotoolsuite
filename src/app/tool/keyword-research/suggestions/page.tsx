import { Metadata } from "next";
import KeywordSuggestionsTool from "@/tools/KeywordResearch/KeywordSuggestions";

export const metadata: Metadata = {
  title: "Keyword Suggestions | SEOToolSuite",
  description:
    "The Keyword Suggestions tool generates a large list of relevant keyword ideas based on your seed keyword.",
  openGraph: {
    type: "website",
    title: "Keyword Suggestions | SEOToolSuite",
    description:
      "The Keyword Suggestions tool generates a large list of relevant keyword ideas based on your seed keyword.",
    images: [{ url: "/assets/images/keyword-suggestions-screenshot.png" }],
  },
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
