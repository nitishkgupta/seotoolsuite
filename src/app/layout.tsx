import type { Metadata } from "next";
import Providers from "@/app/providers";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "SEOToolSuite",
  metadataBase: new URL("https://seotoolsuite.nitishkgupta.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID ? (
          <script
            defer
            src="https://cloud.umami.is/script.js"
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
          ></script>
        ) : null}
      </head>
      <body className={`seotoolsuite-app antialiased ${poppins.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
