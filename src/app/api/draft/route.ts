import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");

  if (
    !secret ||
    secret !== process.env.DRAFT_MODE_SECRET ||
    !slug
  ) {
    return new Response("Invalid token or missing slug", { status: 401 });
  }

  const dm = await draftMode();
  dm.enable();

  // Detect locale from cookie, default to ar
  const cookies = request.headers.get("cookie") || "";
  const localeMatch = cookies.match(/NEXT_LOCALE=(en|ar)/);
  const locale = localeMatch?.[1] || "ar";

  redirect(`/${locale}/blog/${slug}`);
}
