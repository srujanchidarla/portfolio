import { fetchGitHubActivity } from "@/lib/github";
import { NextResponse } from "next/server";

/** Live GitHub stats JSON — same data as the homepage section */
export async function GET() {
  try {
    const data = await fetchGitHubActivity();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600",
      },
    });
  } catch (err) {
    console.error("[api/github/activity]", err);
    return NextResponse.json({ error: "Failed to fetch GitHub activity" }, { status: 500 });
  }
}
