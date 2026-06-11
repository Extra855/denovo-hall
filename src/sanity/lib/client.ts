import { createClient, type SanityClient } from "@sanity/client";
import imageUrlBuilder, { type ImageUrlBuilder } from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const client: SanityClient | null = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2024-01-01",
      useCdn: true,
    })
  : null;

export function urlFor(source: any): ImageUrlBuilder {
  if (!client) {
    // Return a builder-like object that won't crash
    return imageUrlBuilder({ projectId: "placeholder", dataset: "production" } as unknown as SanityClient).image(source);
  }
  return imageUrlBuilder(client).image(source);
}
