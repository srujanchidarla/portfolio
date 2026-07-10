import { createHmac, timingSafeEqual } from "crypto";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { GITHUB_CACHE_TAG } from "@/lib/github";

/**
 * GitHub webhook — revalidates cached stats when you push code.
 *
 * Setup: GitHub repo → Settings → Webhooks → Add webhook
 *   Payload URL: https://srujanchidarla.com/api/github/webhook
 *   Content type: application/json
 *   Secret: same as GITHUB_WEBHOOK_SECRET in .env
 *   Events: Push, Repository
 */
export async function POST(request: Request) {
  const secret = process.env.GITHUB_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "GITHUB_WEBHOOK_SECRET not configured" },
      { status: 501 }
    );
  }

  const signature = request.headers.get("x-hub-signature-256");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 401 });
  }

  const body = await request.text();
  const expected =
    "sha256=" + createHmac("sha256", secret).update(body).digest("hex");

  try {
    const sigBuf = Buffer.from(signature);
    const expBuf = Buffer.from(expected);
    if (sigBuf.length !== expBuf.length || !timingSafeEqual(sigBuf, expBuf)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = request.headers.get("x-github-event") ?? "unknown";
  revalidateTag(GITHUB_CACHE_TAG, { expire: 0 });

  return NextResponse.json({
    ok: true,
    event,
    revalidated: GITHUB_CACHE_TAG,
    at: new Date().toISOString(),
  });
}
