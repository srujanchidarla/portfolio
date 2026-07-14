import { NextResponse } from "next/server";
import { fetchDSAActivity } from "@/lib/algochronicle";

/** Lightweight JSON for clients — same data as the DailyDSA section */
export async function GET() {
  try {
    const data = await fetchDSAActivity();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=600",
      },
    });
  } catch (err) {
    console.error("[api/dsa-activity]", err);
    return NextResponse.json({ error: "Failed to fetch DSA activity" }, { status: 500 });
  }
}
