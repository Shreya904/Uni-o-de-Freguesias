import { NextRequest, NextResponse } from "next/server";

import { getPublishedNewsBySlug } from "@/lib/cms-server";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const { slug } = await context.params;
    const newsItem = await getPublishedNewsBySlug(slug);

    if (!newsItem) {
      return NextResponse.json({ error: "News item not found." }, { status: 404 });
    }

    return NextResponse.json({ doc: newsItem });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch news item.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
