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

  const res = await fetch(url.toString(), { cache: "no-store" });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return (await res.json()) as PayloadList<T>;
}

/* ---------------- SAFE HELPERS ---------------- */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function asText(v: any): string {
  if (typeof v === "string") return v;
  if (typeof v === "number") return String(v);
  return "";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function lexicalToText(value: any): string {
  if (!value?.root?.children) return "";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function media(v: any): string | undefined {
  if (!v) return undefined;
  if (typeof v === "string") return v;
  if (typeof v === "object" && v.url) return v.url;
  return undefined;
}

/* ---------------- MAPPERS ---------------- */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapDocument(d: any): CmsDocumentItem {
  const dateObj = new Date(d.date);
  const formattedDate = isNaN(dateObj.getTime())
    ? d.date
    : dateObj.toLocaleDateString("pt-PT", { day: "numeric", month: "long", year: "numeric" });

  return {
    id: String(d.id),
    format: d.format || "Documento",
    type: d.type || "Avisos",
    topic: d.topic || "Administrativo",
    date: formattedDate,
    readTime: asText(d.readTime) || "5min",
    tags: Array.isArray(d.tags) ? d.tags.map((t: any) => asText(t.tag)) : [],
    title: asText(d.title),
    description: d.description ? asText(d.description) : undefined,
    fileTypeLabel: asText(d.fileTypeLabel),
    fileUrl: media(d.file) || asText(d.sourceUrl) || "#",
    thumbnailUrl: media(d.thumbnail),
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapEvent(e: any): CmsEventItem {
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
    galleryImages: Array.isArray(e.galleryImages) ? e.galleryImages.map(media).filter(Boolean) : [],
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapUsefulContact(c: any): CmsUsefulContactItem {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapPlace(p: any): CmsPlaceItem {
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = await cmsFetch<any>("/api/news", {
    "where[isPublished][equals]": "true",
    sort: "-date",
    depth: "1",
    limit,
  });
  return (data.docs ?? []).map(mapNews);
}

export async function fetchNewsBySlug(slug: string): Promise<CmsNewsItem | null> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = await cmsFetch<any>("/api/news", {
    "where[isPublished][equals]": "true",
    "where[slug][equals]": decodeURIComponent(slug),
    depth: "1",
    limit: 1,
  });
  const item = data.docs?.[0];
  return item ? mapNews(item) : null;
}

export async function fetchPublishedDocuments(limit = 50): Promise<CmsDocumentItem[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = await cmsFetch<any>("/api/documents", {
    "where[isPublished][equals]": "true",
    sort: "-date",
    depth: "1", // Needed to resolve file media URLs
    limit,
  });
  return (data.docs ?? []).map(mapDocument);
}

export async function fetchPublishedEvents(limit = 50): Promise<CmsEventItem[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = await cmsFetch<any>("/api/events", {
    "where[isPublished][equals]": "true",
    sort: "date", // upcoming first
    depth: "1",
    limit,
  });
  return (data.docs ?? []).map(mapEvent);
}

export async function fetchEventBySlug(slug: string): Promise<CmsEventItem | null> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = await cmsFetch<any>("/api/events", {
    "where[isPublished][equals]": "true",
    "where[slug][equals]": decodeURIComponent(slug),
    depth: "1",
    limit: 1,
  });
  const item = data.docs?.[0];
  return item ? mapEvent(item) : null;
}

export async function fetchUsefulContacts(limit = 100): Promise<CmsUsefulContactItem[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = await cmsFetch<any>("/api/useful-contacts", {
    "where[isPublished][equals]": "true",
    limit,
  });
  return (data.docs ?? []).map(mapUsefulContact);
}

export async function fetchPlaces(limit = 100): Promise<CmsPlaceItem[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = await cmsFetch<any>("/api/places", {
    "where[isPublished][equals]": "true",
    limit,
  });
  return (data.docs ?? []).map(mapPlace);
}
