import { Metadata } from "next";
import BacklinkCheckerToolClient from "./Client";

export const metadata: Metadata = {
  title: "Backlink Checker | SEOToolSuite",
  description:
    "The Backlink Checker tool lets you analyze backlinks pointing to any domain, subdomain, or URL.",
  openGraph: {
    type: "website",
    title: "Backlink Checker | SEOToolSuite",
    description:
      "The Backlink Checker tool lets you analyze backlinks pointing to any domain, subdomain, or URL.",
    images: [{ url: "/assets/images/backlink-checker-screenshot.png" }],
  },
  robots: {
    index: false,
  },
};

export default async function BacklinkCheckerPage({
  searchParams,
}: {
  searchParams: Promise<{
    target?: string;
  }>;
}) {
  const searchParameters = await searchParams;

  return <BacklinkCheckerToolClient searchParams={searchParameters} />;
}
