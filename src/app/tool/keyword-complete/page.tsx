import { Metadata } from "next";
import KeywordCompleteTool from "@/tools/KeywordComplete";

export const metadata: Metadata = {
  title: "Keyword Complete | SEOToolSuite",
};

export default function KeywordCompletePage() {
  return (
    <div className="keyword-complete-tool">
      <KeywordCompleteTool />
    </div>
  );
}
