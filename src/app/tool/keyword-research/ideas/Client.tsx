"use client";

import KeywordIdeasTool from "@/tools/KeywordResearch/KeywordIdeas";

const KeywordIdeasToolClient = ({
  searchParams,
}: {
  searchParams: {
    keyword?: string;
    location_code?: string;
    language_code?: string;
  };
}) => {
  return (
    <div className="keyword-ideas-tool-page">
      <KeywordIdeasTool searchParams={searchParams} />
    </div>
  );
};

export default KeywordIdeasToolClient;
