import { Metadata } from "next";
import SettingsComponent from "./SettingsComponent";

export const metadata: Metadata = {
  title: "Settings | SEOToolSuite",
};

export default function SettingsPage() {
  return <SettingsComponent />;
}
