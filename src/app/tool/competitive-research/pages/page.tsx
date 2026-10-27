import { Metadata } from "next";
import TopPagesToolClient from "./Client";

export const metadata: Metadata = {
  title: "Top Pages | SEOToolSuite",
  description:
    "The Top Pages tool shows the top-performing organic pages of a website.",
  openGraph: {
    type: "website",
    title: "Top Pages | SEOToolSuite",
    description:
      "The Top Pages tool shows the top-performing organic pages of a website.",
    images: [{ url: "/assets/images/top-pages-screenshot.png" }],
  },
  robots: {
    index: false,
  },
};

export default async function TopPagesPage({
  searchParams,
}: {
  searchParams: Promise<{
    target?: string;
    location_code?: string;
    language_code?: string;
  }>;
}) {
  const searchParameters = await searchParams;

  return <TopPagesToolClient searchParams={searchParameters} />;
}
