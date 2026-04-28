type PayloadList<T> = {
  docs: T[];
};

const CMS_URL =
  process.env.NEXT_PUBLIC_PAYLOAD_URL || process.env.NEXT_PUBLIC_API_URL || process.env.PAYLOAD_URL;

if (!CMS_URL) {
  throw new Error("Missing CMS base URL");
}

/* ---------------- FETCH ---------------- */

async function cmsFetch<T>(path: string, query?: Record<string, string | number>) {
  const url = new URL(`${CMS_URL}${path}`);

  if (query) {
    Object.entries(query).forEach(([k, v]) => {
      if (v !== undefined && v !== null) {
        url.searchParams.append(k, String(v));
      }
    });
  }

  const res = await fetch(url.toString(), { cache: "no-store" });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return (await res.json()) as PayloadList<T>;
}

/* ---------------- SAFE HELPERS ---------------- */

function asText(v: any): string {
  if (typeof v === "string") return v;
  if (typeof v === "number") return String(v);
  return "";
}

function lexicalToText(value: any): string {
  if (!value?.root?.children) return "";

  const walk = (nodes: any[]): string =>
    nodes
      .map((n) => {
        if (typeof n?.text === "string") return n.text;
        if (Array.isArray(n?.children)) return walk(n.children);
        return "";
      })
      .join(" ");

  return walk(value.root.children).trim();
}

function media(v: any): string | undefined {
  if (!v) return undefined;
  if (typeof v === "string") return v;
  if (typeof v === "object" && v.url) return v.url;
  return undefined;
}

/* ---------------- MAPPER (IMPORTANT FIX) ---------------- */

function mapNews(n: any) {
  return {
    id: String(n.id),
    slug: asText(n.slug),
    title: asText(n.title),
    excerpt: asText(n.excerpt),
    description: typeof n.description === "string" ? n.description : lexicalToText(n.description),
    date: asText(n.date),
    mainImage: media(n.mainImage),
    galleryImages: Array.isArray(n.galleryImages) ? n.galleryImages.map(media).filter(Boolean) : [],
  };
}

/* ---------------- API ---------------- */

export async function fetchPublishedNews(limit = 50) {
  const data = await cmsFetch<any>("/api/news", {
    "where[isPublished][equals]": "true",
    sort: "-date",
    depth: "2",
    limit,
  });

  return (data.docs ?? []).map(mapNews);
}

export async function fetchNewsBySlug(slug: string) {
  const data = await cmsFetch<any>("/api/news", {
    "where[isPublished][equals]": "true",
    "where[slug][equals]": decodeURIComponent(slug),
    depth: "2",
    limit: 1,
  });

  const item = data.docs?.[0];
  return item ? mapNews(item) : null;
}

export async function fetchPublishedDocuments(limit = 50) {
  const data = await cmsFetch<any>("/api/documents", {
    "where[isPublished][equals]": "true",
    sort: "-date",
    limit,
  });

  return data.docs ?? [];
}
