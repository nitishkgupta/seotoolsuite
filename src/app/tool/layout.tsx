import Header from "@/components/Header";

export default function ToolLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="seotoolsuite-tool">
      <Header />
      <div className="seotoolsuite-tool-content">{children}</div>
    </div>
  );
}
