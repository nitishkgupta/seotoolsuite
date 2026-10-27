import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SEOToolSuite",
    short_name: "SEOToolSuite",
    description: "Open-source SEO tools for everyone.",
    start_url: "/tools",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#052f4a",
    icons: [
      {
        src: "/assets/images/favicon-large.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/assets/images/favicon-large.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
