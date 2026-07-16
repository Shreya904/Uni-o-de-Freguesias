type PayloadList<T> = {
  docs: T[];
};

export type SiteBannerVariant = "helpdesk" | "feature" | "sticky";

export type SiteBannerId =
  | "home-helpdesk"
  | "institucional-feature"
  | "freguesia-feature"
  | "ajuda-feature"
  | "freguesia-espacos-helpdesk"
  | "contactos-uteis-helpdesk"
  | "noticias-slug-pharmacy"
  | "eventos-slug-pharmacy";

export type SiteBannerContent = {
  identifier: SiteBannerId;
  pageId: string;
  slotId: string;
  variant: SiteBannerVariant;
  tone?: "news" | "event";
  imageSrc: string;
  imageAlt: string;
  headline?: string;
  headlineLine1?: string;
  headlineLine2?: string;
  bodyPrefix: string;
  ctaLabel: string;
  ctaHref: string;
};

export const siteBannerIds = {
  homeHelpdesk: "home-helpdesk",
  institucionalFeature: "institucional-feature",
  freguesiaFeature: "freguesia-feature",
  ajudaFeature: "ajuda-feature",
  freguesiaEspacosHelpdesk: "freguesia-espacos-helpdesk",
  contactosUteisHelpdesk: "contactos-uteis-helpdesk",
  noticiasSlugPharmacy: "noticias-slug-pharmacy",
  eventosSlugPharmacy: "eventos-slug-pharmacy",
} as const satisfies Record<string, SiteBannerId>;

const CMS_URL =
  process.env.NEXT_PUBLIC_PAYLOAD_URL?.replace(/\/$/, "") ||
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
  process.env.PAYLOAD_URL?.replace(/\/$/, "");

function asText(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  return "";
}

function media(value: unknown): string | undefined {
  if (!value) return undefined;
  if (typeof value === "string") return value;
  if (
    typeof value === "object" &&
    value !== null &&
    "url" in value &&
    typeof (value as { url: unknown }).url === "string"
  ) {
    return (value as { url: string }).url;
  }
  return undefined;
}

function mapCmsBanner(doc: Record<string, unknown>): SiteBannerContent | null {
  const identifier = asText(doc.identifier) as SiteBannerId;

  if (!identifier) {
    return null;
  }

  // FORCE correct variant routing so it never renders the wrong layout
  let derivedVariant: SiteBannerVariant = "feature";
  if (identifier.includes("helpdesk")) derivedVariant = "helpdesk";
  else if (identifier.includes("sticky") || identifier.includes("pharmacy"))
    derivedVariant = "sticky";

  return {
    identifier,
    pageId: asText(doc.pageId),
    slotId: asText(doc.slotId),
    variant: derivedVariant,
    tone: asText(doc.tone) === "event" ? "event" : asText(doc.tone) === "news" ? "news" : undefined,
    imageSrc: media(doc.image) || asText(doc.imageSrc),
    imageAlt: asText(doc.imageAlt),
    headline: asText(doc.headline),
    headlineLine1: asText(doc.headlineLine1),
    headlineLine2: asText(doc.headlineLine2),
    bodyPrefix: asText(doc.bodyPrefix),
    ctaLabel: asText(doc.ctaLabel),
    ctaHref: asText(doc.ctaHref),
  };
}
export async function fetchSiteBanner(identifier: SiteBannerId): Promise<SiteBannerContent | null> {
  if (!CMS_URL) {
    return null;
  }

  try {
    const url = new URL(`${CMS_URL}/api/site-banners`);
    url.searchParams.set("where[identifier][equals]", identifier);
    url.searchParams.set("limit", "1");
    url.searchParams.set("depth", "1");

    const res = await fetch(url.toString(), { cache: "no-store" });

    if (!res.ok) {
      return null;
    }

    const data = (await res.json()) as PayloadList<Record<string, unknown>>;
    const doc = data.docs?.[0];

    if (!doc) {
      return null;
    }

    return mapCmsBanner(doc);
  } catch {
    return null;
  }
}
