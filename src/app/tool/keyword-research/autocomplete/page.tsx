import { Metadata } from "next";
import KeywordAutocompleteTool from "@/tools/KeywordResearch/KeywordAutocomplete/";

export const metadata: Metadata = {
  title: "Keyword Autocomplete | SEOToolSuite",
};

export default function KeywordAutocompletePage({
  searchParams,
}: {
  searchParams?: Promise<{
    keyword?: string;
    location_code?: string;
    language_code?: string;
  }>;
}) {
  return (
    <div className="keyword-autocomplete-page">
      <KeywordAutocompleteTool searchParams={searchParams} />
    </div>
  );
}
