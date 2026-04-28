type PayloadListResponse<T> = {
  docs: T[];
};

type CmsMedia = {
  url?: string | null;
};

type RawCmsDocument = {
  id: string | number;
  title?: string | null;
  docName?: string | null;
  date?: string | null;
  sourceUrl?: string | null;
};

type RawCmsNews = {
  id: string | number;
  title?: string | null;
  slug?: string | null;
  excerpt?: string | null;
  description?: unknown;
  date?: string | null;
  category?: string | null;
  mainImage?: CmsMedia | string | null;
  galleryImages?: Array<CmsMedia | string> | null;
};

export type CmsDocumentItem = {
  id: string;
  title: string;
  docName: string;
  date: string;
  sourceUrl: string;
};

export type CmsNewsItem = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  description?: string;
  date: string;
  category: string;
  mainImage?: string;
  galleryImages: string[];
};

function getPayloadBaseUrl() {
  const baseUrl =
    process.env.PAYLOAD_URL ??
    process.env.NEXT_PUBLIC_PAYLOAD_URL ??
    process.env.NEXT_PUBLIC_API_URL ??
    "";
  return baseUrl.trim().replace(/\/$/, "");
}

function assertPayloadBaseUrl() {
  const baseUrl = getPayloadBaseUrl();
  if (!baseUrl) {
    throw new Error("Missing Payload base URL. Set PAYLOAD_URL or NEXT_PUBLIC_PAYLOAD_URL.");
  }

  return baseUrl;
}

function toAbsoluteCmsUrl(url: string) {
  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  const baseUrl = getPayloadBaseUrl();
  if (!baseUrl || !url.startsWith("/")) {
    return url;
  }

  return `${baseUrl}${url}`;
}

function buildPayloadApiUrl(path: string, query?: Record<string, string>) {
  const queryString = query ? new URLSearchParams(query).toString() : "";
  const finalPath = queryString ? `${path}?${queryString}` : path;

  return `${assertPayloadBaseUrl()}${finalPath}`;
}

async function payloadRequest<T>(path: string, init?: RequestInit, query?: Record<string, string>) {
  const response = await fetch(buildPayloadApiUrl(path, query), {
    ...init,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Payload request failed: ${response.status}`);
  }

  if (response.status === 204) {
    return null as T;
  }

  return (await response.json()) as T;
}

function asText(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function toSlugLike(value: string) {
  return normalizeText(value)
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function asIsoDate(value: unknown) {
  if (typeof value !== "string" || value.length === 0) {
    return new Date(0).toISOString();
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return new Date(0).toISOString();
  }

  return parsed.toISOString();
}

function resolveMediaUrl(media: CmsMedia | string | null | undefined) {
  if (!media) {
    return undefined;
  }

  if (typeof media === "string") {
    return toAbsoluteCmsUrl(media);
  }

  if (typeof media.url === "string") {
    return toAbsoluteCmsUrl(media.url);
  }

  return undefined;
}

function lexicalToPlainText(value: unknown) {
  if (!value || typeof value !== "object") {
    return "";
  }

  const root = (value as { root?: { children?: Array<{ children?: Array<{ text?: string }> }> } })
    .root;
  if (!root?.children) {
    return "";
  }

  return root.children
    .map((node) =>
      Array.isArray(node.children)
        ? node.children.map((leaf) => (typeof leaf.text === "string" ? leaf.text : "")).join("")
        : "",
    )
    .filter((line) => line.length > 0)
    .join("\n");
}

function mapDocument(item: RawCmsDocument): CmsDocumentItem {
  return {
    id: String(item.id),
    title: asText(item.title, "Sem titulo"),
    docName: asText(item.docName, "Documento"),
    date: asIsoDate(item.date),
    sourceUrl: asText(item.sourceUrl),
  };
}

function mapNews(item: RawCmsNews): CmsNewsItem {
  const gallery = Array.isArray(item.galleryImages)
    ? item.galleryImages
        .map((entry) => resolveMediaUrl(entry))
        .filter((value): value is string => Boolean(value))
    : [];

  return {
    id: String(item.id),
    slug: asText(item.slug),
    title: asText(item.title, "Sem titulo"),
    excerpt: asText(item.excerpt),
    description: asText(item.description) || lexicalToPlainText(item.description) || undefined,
    date: asIsoDate(item.date),
    category: asText(item.category, "Geral"),
    mainImage: resolveMediaUrl(item.mainImage),
    galleryImages: gallery,
  };
}

export async function getPublishedDocuments(limit?: number) {
  const response = await payloadRequest<PayloadListResponse<RawCmsDocument>>(
    "/api/documents",
    undefined,
    {
      "where[isPublished][equals]": "true",
      sort: "-date",
      ...(typeof limit === "number" ? { limit: String(limit) } : {}),
    },
  );

  return response.docs.map(mapDocument).filter((item) => item.sourceUrl.length > 0);
}

export async function getPublishedNews(limit?: number) {
  const response = await payloadRequest<PayloadListResponse<RawCmsNews>>("/api/news", undefined, {
    "where[isPublished][equals]": "true",
    sort: "-date",
    depth: "2",
    ...(typeof limit === "number" ? { limit: String(limit) } : {}),
  });

  return response.docs.map(mapNews).filter((item) => item.slug.length > 0);
}

export async function getPublishedNewsBySlug(slug: string) {
  const docs = await getPublishedNews(200);

  let decodedSlug = slug;
  try {
    decodedSlug = decodeURIComponent(slug);
  } catch {
    decodedSlug = slug;
  }

  const normalizedInput = decodedSlug.trim().toLowerCase();
  const slugLikeInput = toSlugLike(normalizedInput);

  return (
    docs.find((item) => {
      const itemSlug = item.slug.trim().toLowerCase();
      const itemSlugLike = toSlugLike(itemSlug);
      const titleSlugLike = toSlugLike(item.title);

      return (
        itemSlug === normalizedInput ||
        itemSlugLike === slugLikeInput ||
        titleSlugLike === slugLikeInput
      );
    }) ?? null
  );
}
