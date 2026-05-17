import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const inquirySchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  phone: z.string().optional(),
  date: z.string().optional(),
  guests: z.string().optional().refine(
    (val) => !val || (Number(val) >= 0 && Number(val) <= 1000),
    { message: "Guest count must be between 0 and 1000" }
  ),
  message: z.string().optional(),
});

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// In-memory rate limiting: 3 requests per IP per minute
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }

  entry.count++;
  return entry.count > 3;
}

// Periodic cleanup of stale entries
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

  console.log("[inquiry] Incoming request from IP:", ip);

  if (isRateLimited(ip)) {
    console.warn("[inquiry] Rate limited IP:", ip);
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment and try again." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    console.error("[inquiry] Failed to parse JSON body");
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    console.error("[inquiry] Validation failed:", parsed.error.flatten());
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const data = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
  const toEmail = process.env.RESEND_TO_EMAIL;

  console.log("[inquiry] Env check:", {
    hasApiKey: !!apiKey,
    apiKeyPrefix: apiKey?.slice(0, 6),
    fromEmail,
    toEmail: toEmail ?? "(missing)",
  });

  if (!toEmail) {
    console.error("[inquiry] RESEND_TO_EMAIL not configured");
    return NextResponse.json(
      { error: "Server misconfiguration" },
      { status: 500 }
    );
  }

  const safe = (v: string | undefined) => (v ? escapeHtml(v) : "—");

  try {
    console.log("[inquiry] Sending email:", { from: fromEmail, to: toEmail, replyTo: data.email, name: data.name });

    const result = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: data.email,
      subject: `New Inquiry from ${escapeHtml(data.name)}`,
      html: `
        <div style="max-width:560px;margin:0 auto;font-family:Georgia,'Times New Roman',serif;color:#2C2C2C;background:#FAF9F6">
          <!-- Header -->
          <div style="background:#2C2C2C;padding:40px 32px;text-align:center">
            <h1 style="margin:0;font-size:22px;font-weight:400;color:#FAF9F6;letter-spacing:4px;text-transform:uppercase">
              New Inquiry
            </h1>
            <div style="width:60px;height:1px;background:#E8DCC4;margin:16px auto 0"></div>
          </div>

          <!-- Body -->
          <div style="padding:40px 32px">
            <!-- Name -->
            <p style="margin:0 0 4px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#A9B3A2">
              Name
            </p>
            <p style="margin:0 0 28px;font-size:17px;color:#2C2C2C">
              ${escapeHtml(data.name)}
            </p>

            <!-- Email -->
            <p style="margin:0 0 4px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#A9B3A2">
              Email
            </p>
            <p style="margin:0 0 28px;font-size:17px">
              <a href="mailto:${escapeHtml(data.email)}" style="color:#2C2C2C;text-decoration:none;border-bottom:1px solid #E8DCC4">${escapeHtml(data.email)}</a>
            </p>

            <!-- Phone -->
            <p style="margin:0 0 4px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#A9B3A2">
              Phone
            </p>
            <p style="margin:0 0 28px;font-size:17px;color:#2C2C2C">
              ${safe(data.phone)}
            </p>

            <!-- Wedding Date & Guests row -->
            <table style="width:100%;border-collapse:collapse" cellpadding="0" cellspacing="0">
              <tr>
                <td style="width:50%;vertical-align:top;padding-right:12px">
                  <p style="margin:0 0 4px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#A9B3A2">
                    Wedding Date
                  </p>
                  <p style="margin:0 0 28px;font-size:17px;color:#2C2C2C">
                    ${safe(data.date)}
                  </p>
                </td>
                <td style="width:50%;vertical-align:top;padding-left:12px">
                  <p style="margin:0 0 4px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#A9B3A2">
                    Guests
                  </p>
                  <p style="margin:0 0 28px;font-size:17px;color:#2C2C2C">
                    ${safe(data.guests)}
                  </p>
                </td>
              </tr>
            </table>

            <!-- Divider -->
            <div style="height:1px;background:#E8DCC4;margin:8px 0 28px"></div>

            <!-- Message -->
            <p style="margin:0 0 4px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#A9B3A2">
              Message
            </p>
            <p style="margin:0;font-size:15px;line-height:1.7;color:#2C2C2C;white-space:pre-wrap">
              ${safe(data.message)}
            </p>
          </div>

          <!-- Footer -->
          <div style="background:#2C2C2C;padding:24px 32px;text-align:center">
            <p style="margin:0;font-size:11px;letter-spacing:1px;color:#E8DCC4">
              De Novo &middot; Wedding Venue
            </p>
          </div>
        </div>
      `,
    });

    console.log("[inquiry] Resend response:", JSON.stringify(result));
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[inquiry] Resend error:", err);
    if (err instanceof Error) {
      console.error("[inquiry] Error message:", err.message);
      try {
        console.error("[inquiry] Error body:", JSON.stringify((err as unknown as { body?: unknown }).body));
      } catch { /* ignore */ }
    }
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
