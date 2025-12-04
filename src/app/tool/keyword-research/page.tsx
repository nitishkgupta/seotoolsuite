import { Metadata } from "next";
import KeywordResearchTool from "@/tools/KeywordResearch";

export const metadata: Metadata = {
  title: "Keyword Research | SEOToolSuite",
};

export default function KeywordResearchPage() {
  return (
    <div className="keyword-research-tool">
      <KeywordResearchTool />
    </div>
  );
}
