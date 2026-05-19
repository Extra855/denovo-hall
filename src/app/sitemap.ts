import type { MetadataRoute } from "next";

const BASE_URL = "https://denovohall.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/gallery", priority: 0.8, changeFrequency: "monthly" as const },
  ];

  return ["ar", "en"].flatMap((locale) =>
    routes.map((route) => ({
      url: `${BASE_URL}/${locale}${route.path}`,
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    }))
  );
}
