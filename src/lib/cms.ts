type PayloadList<T> = {
  docs: T[];
};

export type CmsNewsItem = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  date: string;
  mainImage?: string;
  galleryImages: string[];
};

// --- UPDATED TYPES ---

export type CmsDocumentItem = {
  id: string;
  format: "Documento" | "Audio" | "Video";
  type: string;
  topic: string;
  date: string;
  readTime: string;
  tags: string[];
  title: string;
  description?: string;
  fileTypeLabel: string;
  fileUrl: string;
  thumbnailUrl?: string;
};

export type CmsEventItem = {
  id: string;
  slug: string;
  categoryTop: string;
  priceType: string;
  title: string;
  excerpt: string;
  description: string;
  date: string;
  displayDate: string;
  time: string;
  location: string;
  registrationLink: string;
  isPast: boolean;
  mainImage?: string;
  galleryImages: string[];
};

export type CmsUsefulContactItem = {
  id: string;
  categoryTop: string;
  categorySub: string;
  title: string;
  address?: string;
  phone?: string;
  schedule?: string;
  websiteUrl?: string;
  email?: string;
};

export type CmsPlaceItem = {
  id: string;
  categoryTop: string;
  categorySub: string;
  title: string;
  address: string;
  phone?: string;
  schedule?: string;
  websiteUrl?: string;
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

  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return (await res.json()) as PayloadList<T>;
}

/* ---------------- SAFE HELPERS ---------------- */

function asText(v: unknown): string {
  if (typeof v === "string") return v;
  if (typeof v === "number") return String(v);
  return "";
}

function lexicalToText(value: unknown): string {
  if (typeof value !== "object" || value === null) return "";

  const val = value as Record<string, unknown>;
  const root = val.root as Record<string, unknown> | undefined;

  if (!root?.children) return "";

  const walk = (nodes: unknown[]): string =>
    nodes
      .map((n) => {
        if (typeof n !== "object" || n === null) return "";
        const node = n as Record<string, unknown>;
        if (typeof node.text === "string") return node.text;
        if (Array.isArray(node.children)) return walk(node.children);
        return "";
      })
      .join(" ");

  if (Array.isArray(root.children)) {
    return walk(root.children).trim();
  }
  return "";
}

function media(v: unknown): string | undefined {
  if (!v) return undefined;
  if (typeof v === "string") return v;
  if (
    typeof v === "object" &&
    v !== null &&
    "url" in v &&
    typeof (v as { url: unknown }).url === "string"
  ) {
    return (v as { url: string }).url;
  }
  return undefined;
}

/* ---------------- MAPPERS ---------------- */

function mapNews(n: Record<string, unknown>): CmsNewsItem {
  return {
    id: String(n.id),
    slug: asText(n.slug),
    title: asText(n.title),
    excerpt: asText(n.excerpt),
    description: typeof n.description === "string" ? n.description : lexicalToText(n.description),
    date: asText(n.date),
    mainImage: media(n.mainImage),
    // Fixed: explicit type guard for string filtering
    galleryImages: Array.isArray(n.galleryImages)
      ? n.galleryImages.map(media).filter((img): img is string => typeof img === "string")
      : [],
  };
}

function mapDocument(d: Record<string, unknown>): CmsDocumentItem {
  const dateStr = asText(d.date);
  const dateObj = new Date(dateStr);
  const formattedDate = isNaN(dateObj.getTime())
    ? dateStr
    : dateObj.toLocaleDateString("pt-PT", { day: "numeric", month: "long", year: "numeric" });

  const formatRaw = asText(d.format);

  return {
    id: String(d.id),
    format: formatRaw === "Audio" || formatRaw === "Video" ? formatRaw : "Documento",
    type: asText(d.type) || "Avisos",
    topic: asText(d.topic) || "Administrativo",
    date: formattedDate,
    readTime: asText(d.readTime) || "5min",
    // Fixed: safer type casting inside map loop for tags
    tags: Array.isArray(d.tags)
      ? d.tags.map((t) => asText((t as Record<string, unknown>)?.tag)).filter(Boolean)
      : [],
    title: asText(d.title),
    description: d.description ? asText(d.description) : undefined,
    fileTypeLabel: asText(d.fileTypeLabel),
    fileUrl: media(d.file) || asText(d.sourceUrl) || "#",
    thumbnailUrl: media(d.thumbnail),
  };
}

function mapEvent(e: Record<string, unknown>): CmsEventItem {
  return {
    id: String(e.id),
    slug: asText(e.slug),
    categoryTop: asText(e.categoryTop) || "Outros",
    priceType: asText(e.priceType) || "Gratuito",
    title: asText(e.title),
    excerpt: asText(e.excerpt),
    description: typeof e.description === "string" ? e.description : lexicalToText(e.description),
    date: asText(e.date),
    displayDate: asText(e.displayDate),
    time: asText(e.time),
    location: asText(e.location),
    registrationLink: asText(e.registrationLink) || "/balcao-digital/inscricoes",
    isPast: Boolean(e.isPast),
    mainImage: media(e.mainImage),
    // Fixed: explicit type guard for string filtering
    galleryImages: Array.isArray(e.galleryImages)
      ? e.galleryImages.map(media).filter((img): img is string => typeof img === "string")
      : [],
  };
}

function mapUsefulContact(c: Record<string, unknown>): CmsUsefulContactItem {
  return {
    id: String(c.id),
    categoryTop: asText(c.categoryTop),
    categorySub: asText(c.categorySub),
    title: asText(c.title),
    address: c.address ? asText(c.address) : undefined,
    phone: c.phone ? asText(c.phone) : undefined,
    schedule: c.schedule ? asText(c.schedule) : undefined,
    websiteUrl: c.websiteUrl ? asText(c.websiteUrl) : undefined,
    email: c.email ? asText(c.email) : undefined,
  };
}

function mapPlace(p: Record<string, unknown>): CmsPlaceItem {
  return {
    id: String(p.id),
    categoryTop: asText(p.categoryTop),
    categorySub: asText(p.categorySub),
    title: asText(p.title),
    address: asText(p.address),
    phone: p.phone ? asText(p.phone) : undefined,
    schedule: p.schedule ? asText(p.schedule) : undefined,
    websiteUrl: p.websiteUrl ? asText(p.websiteUrl) : undefined,
  };
}

/* ---------------- API FUNCTIONS ---------------- */

export async function fetchPublishedNews(limit = 50): Promise<CmsNewsItem[]> {
  const data = await cmsFetch<Record<string, unknown>>("/api/news", {
    "where[isPublished][equals]": "true",
    sort: "-date",
    depth: "1",
    limit,
  });
  return (data.docs ?? []).map(mapNews);
}

export async function fetchNewsBySlug(slug: string): Promise<CmsNewsItem | null> {
  const data = await cmsFetch<Record<string, unknown>>("/api/news", {
    "where[isPublished][equals]": "true",
    "where[slug][equals]": decodeURIComponent(slug),
    depth: "1",
    limit: 1,
  });
  const item = data.docs?.[0];
  return item ? mapNews(item) : null;
}

export async function fetchPublishedDocuments(limit = 50): Promise<CmsDocumentItem[]> {
  const data = await cmsFetch<Record<string, unknown>>("/api/documents", {
    "where[isPublished][equals]": "true",
    sort: "-date",
    depth: "1", // Needed to resolve file media URLs
    limit,
  });
  return (data.docs ?? []).map(mapDocument);
}

export async function fetchPublishedEvents(limit = 50): Promise<CmsEventItem[]> {
  const data = await cmsFetch<Record<string, unknown>>("/api/events", {
    "where[isPublished][equals]": "true",
    sort: "date", // upcoming first
    depth: "1",
    limit,
  });
  return (data.docs ?? []).map(mapEvent);
}

export async function fetchEventBySlug(slug: string): Promise<CmsEventItem | null> {
  const data = await cmsFetch<Record<string, unknown>>("/api/events", {
    "where[isPublished][equals]": "true",
    "where[slug][equals]": decodeURIComponent(slug),
    depth: "1",
    limit: 1,
  });
  const item = data.docs?.[0];
  return item ? mapEvent(item) : null;
}

export async function fetchUsefulContacts(limit = 100): Promise<CmsUsefulContactItem[]> {
  const data = await cmsFetch<Record<string, unknown>>("/api/useful-contacts", {
    "where[isPublished][equals]": "true",
    limit,
  });
  return (data.docs ?? []).map(mapUsefulContact);
}

export async function fetchPlaces(limit = 100): Promise<CmsPlaceItem[]> {
  const data = await cmsFetch<Record<string, unknown>>("/api/places", {
    "where[isPublished][equals]": "true",
    limit,
  });
  return (data.docs ?? []).map(mapPlace);
}
