import { NextRequest, NextResponse } from "next/server";

import { getPublishedNews } from "@/lib/cms-server";

export async function GET(request: NextRequest) {
  try {
    const limitParam = request.nextUrl.searchParams.get("limit");
    const limit = limitParam ? Number.parseInt(limitParam, 10) : undefined;

    const news = await getPublishedNews(Number.isFinite(limit) ? limit : undefined);
    return NextResponse.json({ docs: news });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch news.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
