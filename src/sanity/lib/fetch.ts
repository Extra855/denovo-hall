import { createClient } from "@sanity/client";
import { draftMode } from "next/headers";
import { unstable_cache } from "next/cache";

const SANITY_FETCH_TIMEOUT = 5000;
const MAX_RETRIES = 2;
const RETRY_DELAY = 1000;

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

function createFetchClient() {
  if (!projectId) return null;
  return createClient({
    projectId,
    dataset,
    apiVersion: "2024-01-01",
    token: process.env.SANITY_API_READ_TOKEN,
    useCdn: false,
  });
}

interface SanityFetchOptions {
  tags?: string[];
}

export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  options: SanityFetchOptions = {},
): Promise<T> {
  const { tags = [] } = options;
  const fetchClient = createFetchClient();

  if (!fetchClient) {
    return [] as unknown as T;
  }

  let perspective: "published" | "previewDrafts" = "published";
  try {
    const dm = await draftMode();
    if (dm.isEnabled) {
      perspective = "previewDrafts";
    }
  } catch {
    // draftMode() not available
  }

  // In draft mode, skip cache entirely
  if (perspective === "previewDrafts") {
    return rawFetch<T>(fetchClient, query, params, perspective);
  }

  // Use unstable_cache with tags for ISR
  const cached = unstable_cache(
    () => rawFetch<T>(fetchClient, query, params, "published"),
    tags.length > 0 ? tags : [`sanity-${query.slice(0, 40)}`],
    {
      revalidate: 3600,
      tags: tags.length > 0 ? tags : undefined,
    },
  );

  return cached();
}

async function rawFetch<T>(
  fetchClient: ReturnType<typeof createFetchClient>,
  query: string,
  params: Record<string, unknown>,
  perspective: "published" | "previewDrafts",
): Promise<T> {
  async function attempt(retriesLeft: number): Promise<T> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), SANITY_FETCH_TIMEOUT);

    try {
      const result = await fetchClient!.fetch<T>(query, params, {
        filterResponse: true,
        perspective,
        signal: controller.signal,
      });
      return result;
    } catch (err: any) {
      const isRetryable =
        !err?.message?.includes("abort") &&
        (err?.statusCode >= 500 || err?.name === "TypeError" || err?.code === "ECONNRESET");

      if (isRetryable && retriesLeft > 0) {
        await new Promise((r) => setTimeout(r, RETRY_DELAY));
        return attempt(retriesLeft - 1);
      }
      throw err;
    } finally {
      clearTimeout(timeout);
    }
  }

  return attempt(MAX_RETRIES);
}
