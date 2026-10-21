import { Metadata } from "next";
import KeywordIdeasToolClient from "./Client";

export const metadata: Metadata = {
  title: "Keyword Ideas | SEOToolSuite",
  description:
    "The Keyword Ideas tool generates a large list of keyword ideas that are related to the seed keyword.",
  openGraph: {
    type: "website",
    title: "Keyword Ideas | SEOToolSuite",
    description:
      "The Keyword Ideas tool generates a large list of keyword ideas that are related to the seed keyword.",
    images: [{ url: "/assets/images/keyword-ideas-screenshot.png" }],
  },
  robots: {
    index: false,
  },
};

export default async function KeywordIdeasPage({
  searchParams,
}: {
  searchParams: Promise<{
    keyword?: string;
    location_code?: string;
    language_code?: string;
  }>;
}) {
  const searchParameters = await searchParams;

  return <KeywordIdeasToolClient searchParams={searchParameters} />;
}
