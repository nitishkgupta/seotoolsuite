import { Metadata } from "next";
import KeywordAutocompleteTool from "@/tools/KeywordResearch/KeywordAutocomplete/";

export const metadata: Metadata = {
  title: "Keyword Autocomplete | SEOToolSuite",
  description:
    "The Keyword Autocomplete tool generates long-tail keyword ideas using Google autocomplete data. ",
  openGraph: {
    type: "website",
    title: "Keyword Autocomplete | SEOToolSuite",
    description:
      "The Keyword Autocomplete tool generates long-tail keyword ideas using Google autocomplete data. ",
    images: [{ url: "/assets/images/keyword-autocomplete-screenshot.png" }],
  },
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
