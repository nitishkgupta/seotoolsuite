"use client";

import TopPagesTool from "@/tools/CompetitiveResearch/TopPages";

const TopPagesToolClient = ({
  searchParams,
}: {
  searchParams: {
    target?: string;
    location_code?: string;
    language_code?: string;
  };
}) => {
  return (
    <div className="top-pages-tool-page">
      <TopPagesTool searchParams={searchParams} />
    </div>
  );
};

export default TopPagesToolClient;
