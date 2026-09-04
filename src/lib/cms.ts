type PayloadList<T> = {
  docs: T[];
};

export type RichTextTextNode = {
  type?: "text";
  text: string;
  format?: number;
  detail?: number;
  mode?: string;
  style?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  children?: never;
};

export type RichTextElementNode = {
  type: string;
  children?: RichTextNode[];
  direction?: "ltr" | "rtl" | null;
  format?: string;
  indent?: number;
  version?: number;
  tag?: string;
  fields?: Record<string, unknown>;
  [key: string]: unknown;
};

export type RichTextNode = RichTextTextNode | RichTextElementNode;

export type RichTextContent = {
  root?: {
    type?: string;
    version?: number;
    format?: string;
    indent?: number;
    direction?: "ltr" | "rtl" | null;
    children?: RichTextNode[];
  };
};

export type CmsNewsItem = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  description: RichTextContent | string;
  date: string;
  mainImage?: string;
  galleryImages: string[];
  isFeatured?: boolean;
};

// --- UPDATED TYPES ---

export type CmsDocumentItem = {
  id: string;
  slug?: string;
  format: "Documento" | "Audio" | "Video";
  type: string;
  topic: string;
  date: string;
  rawDate?: string;
  readTime: string;
  tags: string[];
  title: string;
  description?: string;
  fileTypeLabel: string;
  fileUrl: string;
  thumbnailUrl?: string;
  isFeatured?: boolean;
};

export type CmsEventItem = {
  id: string;
  slug: string;
  categoryTop: string;
  priceType: string;
  title: string;
  excerpt: string;
  description: RichTextContent | string;
  date: string;
  displayDate: string;
  time: string;
  location: string;
  registrationLink: string;
  isPast: boolean;
  mainImage?: string;
  galleryImages: string[];
  isFeatured?: boolean;
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
  isFeatured?: boolean;
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
  locationUrl?: string;
  image?: string;
  isFeatured?: boolean;
};

export type CmsExecutivoItem = {
  id: string;
  name: string;
  role: string;
  responsibilities: string;
  image?: string;
  order: number;
};

export type CmsMesaItem = {
  id: string;
  name: string;
  role: string;
  responsibilities?: string;
  image?: string;
  order: number;
};

export interface ReunioesPageData {
  introText: RichTextContent | string;
  documents: CmsDocumentItem[];
}

const CMS_URL =
  process.env.NEXT_PUBLIC_PAYLOAD_URL || process.env.NEXT_PUBLIC_API_URL || process.env.PAYLOAD_URL;

if (!CMS_URL) {
  throw new Error("Missing CMS base URL");
}

/* ---------------- FETCH ---------------- */

// For standard Collections (returns { docs: [] })
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

// For Globals/Singletons (returns the object directly)
async function cmsFetchGlobal<T>(path: string, query?: Record<string, string | number>) {
  const url = new URL(`${CMS_URL}${path}`);

  if (query) {
    Object.entries(query).forEach(([k, v]) => {
      if (v !== undefined && v !== null) {
        url.searchParams.append(k, String(v));
      }
    });
  }

  const res = await fetch(url.toString(), { next: { revalidate: 60 } });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return (await res.json()) as T;
}

/* ---------------- SAFE HELPERS ---------------- */

function asText(v: unknown): string {
  if (typeof v === "string") return v;
  if (typeof v === "number") return String(v);
  return "";
}

function asBoolean(v: unknown): boolean {
  return v === true || v === "true" || v === 1 || v === "1";
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
    description: (n.description as RichTextContent | string | undefined) ?? "",
    date: asText(n.date),
    mainImage: media(n.mainImage),
    galleryImages: Array.isArray(n.galleryImages)
      ? n.galleryImages.map(media).filter((img): img is string => typeof img === "string")
      : [],
    isFeatured: asBoolean(n.isFeatured ?? n.featured),
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
    slug: asText(d.slug),
    format: formatRaw === "Audio" || formatRaw === "Video" ? formatRaw : "Documento",
    type: asText(d.type) || "Avisos",
    topic: asText(d.topic) || "Administrativo",
    date: formattedDate,
    rawDate: dateStr,
    readTime: asText(d.readTime) || "5min",
    tags: Array.isArray(d.tags)
      ? d.tags.map((t) => asText((t as Record<string, unknown>)?.tag)).filter(Boolean)
      : [],
    title: asText(d.title),
    description: d.description ? asText(d.description) : undefined,
    fileTypeLabel: asText(d.fileTypeLabel),
    fileUrl: media(d.file) || asText(d.sourceUrl) || "#",
    thumbnailUrl: media(d.thumbnail),
    isFeatured: asBoolean(d.isFeatured ?? d.featured),
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
    description: (e.description as RichTextContent | string | undefined) ?? "",
    date: asText(e.date),
    displayDate: asText(e.displayDate),
    time: asText(e.time),
    location: asText(e.location),
    registrationLink: asText(e.registrationLink) || "/balcao-digital/inscricoes",
    isPast: Boolean(e.isPast),
    mainImage: media(e.mainImage),
    galleryImages: Array.isArray(e.galleryImages)
      ? e.galleryImages.map(media).filter((img): img is string => typeof img === "string")
      : [],
    isFeatured: asBoolean(e.isFeatured ?? e.featured),
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
    isFeatured: asBoolean(c.isFeatured ?? c.featured),
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
    locationUrl: p.locationUrl ? asText(p.locationUrl) : undefined,
    image: media(p.image),
    isFeatured: asBoolean(p.isFeatured ?? p.featured),
  };
}

function mapExecutivo(e: Record<string, unknown>): CmsExecutivoItem {
  return {
    id: String(e.id),
    name: asText(e.name),
    role: asText(e.role),
    responsibilities: asText(e.responsibilities),
    image: media(e.image),
    order: Number(e.order) || 0,
  };
}

function mapMesa(m: Record<string, unknown>): CmsMesaItem {
  return {
    id: String(m.id),
    name: asText(m.name),
    role: asText(m.role),
    responsibilities: m.responsibilities ? asText(m.responsibilities) : undefined,
    image: media(m.image),
    order: Number(m.order) || 0,
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

export async function fetchEditaisDocuments(limit = 50): Promise<CmsDocumentItem[]> {
  const data = await cmsFetch<Record<string, unknown>>("/api/documents", {
    "where[isPublished][equals]": "true",
    "where[type][equals]": "Editais", // Exact match for your Editais page
    sort: "-date",
    depth: "1",
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
    depth: "1",
    limit,
  });
  return (data.docs ?? []).map(mapPlace);
}

export async function fetchExecutivo(limit = 100): Promise<CmsExecutivoItem[]> {
  const data = await cmsFetch<Record<string, unknown>>("/api/executivo", {
    sort: "order",
    depth: "1",
    limit,
  });
  return (data.docs ?? []).map(mapExecutivo);
}

export async function fetchMesaAssembleia(limit = 100): Promise<CmsMesaItem[]> {
  const data = await cmsFetch<Record<string, unknown>>("/api/mesa-assembleia", {
    sort: "order",
    depth: "1",
    limit,
  });
  return (data.docs ?? []).map(mapMesa);
}

export async function fetchReunioesExecutivo(): Promise<ReunioesPageData | null> {
  try {
    const data = await cmsFetchGlobal<Record<string, unknown>>("/api/globals/reunioes-executivo", {
      depth: 1,
    });
    if (!data) return null;

    return {
      introText: (data.introText as RichTextContent | string) || "",
      documents: Array.isArray(data.documents)
        ? data.documents.map((d) => mapDocument(d as Record<string, unknown>))
        : [],
    };
  } catch (error) {
    console.error("Error fetching Reunioes Executivo:", error);
    return null;
  }
}

export async function fetchReunioesAssembleia(): Promise<ReunioesPageData | null> {
  try {
    const data = await cmsFetchGlobal<Record<string, unknown>>("/api/globals/reunioes-assembleia", {
      depth: 1,
    });
    if (!data) return null;

    return {
      introText: (data.introText as RichTextContent | string) || "",
      documents: Array.isArray(data.documents)
        ? data.documents.map((d) => mapDocument(d as Record<string, unknown>))
        : [],
    };
  } catch (error) {
    console.error("Error fetching Reunioes Assembleia:", error);
    return null;
  }
}
