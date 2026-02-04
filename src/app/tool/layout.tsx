import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function ToolLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="seotoolsuite-tool relative flex w-full flex-col overflow-hidden lg:h-screen">
      <Header />
      <div className="seotoolsuite-tool-container flex h-[calc(100%-68px)] w-full">
        <Sidebar />
        <div className="seotoolsuite-tool-content h-full w-full overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
