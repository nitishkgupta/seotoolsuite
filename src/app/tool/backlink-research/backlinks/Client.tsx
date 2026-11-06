"use client";

import BacklinkCheckerTool from "@/tools/BacklinkResearch/BacklinkChecker";

const BacklinkCheckerToolClient = ({
  searchParams,
}: {
  searchParams: {
    target?: string;
  };
}) => {
  return (
    <div className="backlink-checker-tool-page">
      <BacklinkCheckerTool searchParams={searchParams} />
    </div>
  );
};

export default BacklinkCheckerToolClient;
