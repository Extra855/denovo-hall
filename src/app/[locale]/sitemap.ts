import type { MetadataRoute } from "next";

const BASE_URL = "https://denovohall.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["en", "ar"];
  const hashes = ["", "#spaces", "#gallery", "#testimonials", "#journey", "#faq", "#location", "#inquiry"];
  const priorities: Record<string, number> = {
    "": 1.0,
    "#spaces": 0.8,
    "#gallery": 0.8,
    "#testimonials": 0.7,
    "#journey": 0.6,
    "#faq": 0.6,
    "#location": 0.7,
    "#inquiry": 0.9,
  };
  const frequencies: Record<string, "weekly" | "monthly" | "yearly"> = {
    "": "weekly",
    "#spaces": "monthly",
    "#gallery": "monthly",
    "#testimonials": "monthly",
    "#journey": "yearly",
    "#faq": "monthly",
    "#location": "yearly",
    "#inquiry": "yearly",
  };

  return locales.flatMap((locale) =>
    hashes.map((hash) => ({
      url: `${BASE_URL}/${locale}${hash}`,
      lastModified: new Date(),
      changeFrequency: frequencies[hash] || "monthly",
      priority: priorities[hash] || 0.5,
    }))
  );
}
