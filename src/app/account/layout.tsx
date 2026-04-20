import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="seotoolsuite-account">
      <Header />
      <div className="seotoolsuite-account-content">{children}</div>
      <Footer />
    </div>
  );
}
