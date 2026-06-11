import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { parseBody } from "next-sanity/webhook";

const TAG_PATTERN = /^(post|author|category|tag)(:[a-z0-9-]+)?$/;

// Rate limiting: 10 req/min per IP
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }

  entry.count++;
  return entry.count > 10;
}

// Periodic cleanup
if (typeof globalThis !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitMap) {
      if (now > entry.resetAt) rateLimitMap.delete(key);
    }
  }, 120_000);
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Rate limited" }, { status: 429 });
  }

  try {
    const { body, isValidSignature } = await parseBody(
      request,
      process.env.SANITY_REVALIDATE_SECRET,
    );

    if (!isValidSignature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const tags: unknown = body?.tags ?? [];
    const tagList = Array.isArray(tags) ? tags : [];

    if (tagList.length === 0) {
      return NextResponse.json({ error: "No tags provided" }, { status: 400 });
    }

    for (const tag of tagList) {
      if (typeof tag !== "string" || !TAG_PATTERN.test(tag)) continue;
      // Revalidate blog paths on content change
      revalidatePath("/blog", "layout");
      revalidatePath(`/blog`, "page");
      console.log(
        JSON.stringify({
          timestamp: new Date().toISOString(),
          tag,
          success: true,
          source: "sanity-webhook",
        }),
      );
    }

    return NextResponse.json({ revalidated: true, tags: tagList });
  } catch (err) {
    console.error("[revalidate] Error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
