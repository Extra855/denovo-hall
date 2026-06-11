import type { MetadataRoute } from "next";

const BASE_URL = "https://denovohall.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/gallery", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/events", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" as const },
  ];

  let blogRoutes: { path: string; priority: number; changeFrequency: "monthly" }[] = [];

  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try {
      const { sanityFetch } = await import("@/sanity/lib/fetch");
      const { ALL_POST_SLUGS_QUERY } = await import("@/sanity/lib/queries");
      const blogSlugs = await sanityFetch<string[]>(ALL_POST_SLUGS_QUERY);
      blogRoutes = blogSlugs.map((slug) => ({
        path: `/blog/${slug}`,
        priority: 0.6,
        changeFrequency: "monthly" as const,
      }));
    } catch {
      // Blog not configured yet
    }
  }

  return ["ar", "en"].flatMap((locale) =>
    [...routes, ...blogRoutes].map((route) => ({
      url: `${BASE_URL}/${locale}${route.path}`,
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    }))
  );
}
