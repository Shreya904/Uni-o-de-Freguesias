"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { fetchSiteBanner, type SiteBannerContent, type SiteBannerId } from "@/lib/siteBanners";

type SiteBannerProps = {
  bannerId: SiteBannerId;
};

function HelpDeskBannerLayout({ banner }: { banner: SiteBannerContent }) {
  const titleLine1 = banner.headlineLine1 || banner.headline || "Precisa de um serviço";
  const titleLine2 = banner.headlineLine2;

  return (
    // No margins, no rounding. Fits perfectly above the footer.
    <section className="relative w-full h-[300px] md:h-[400px] lg:h-[450px] overflow-hidden bg-[#243558]">
      <img
        src={banner.imageSrc || "/help-desk.jpg"}
        alt={banner.imageAlt || "Helpdesk"}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* flex justify-end forces the box to the right side */}
      <div className="absolute inset-0 w-full max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-end">
        <div className="bg-[#b81d34] p-6 md:p-8 shadow-2xl border-2 border-dashed border-white/80 max-w-sm w-full text-left rounded-none">
          <h2 className="text-white font-bold text-2xl md:text-3xl leading-snug mb-4">
            {titleLine1}
            {titleLine2 ? (
              <>
                <br />
                {titleLine2}
              </>
            ) : null}
          </h2>
          <p className="text-white/90 text-sm md:text-base">
            {banner.bodyPrefix || "Visite o"}{" "}
            <Link
              href={banner.ctaHref || "/balcao-digital"}
              className="underline underline-offset-4 decoration-white/70 hover:decoration-white font-medium transition-all"
            >
              {banner.ctaLabel || "Balcão Digital"}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

function FeatureBannerLayout({ banner }: { banner: SiteBannerContent }) {
  const isFreguesia = banner.identifier === "freguesia-feature";
  const isAjuda = banner.identifier === "ajuda-feature";
  const title = banner.headline || banner.headlineLine1 || "";

  const wrapperClassName = isAjuda
    ? "relative mt-8 rounded-xl overflow-hidden shadow-sm h-[320px]"
    : "relative rounded-xl overflow-hidden shadow-sm mb-12";
  const imageClassName = isAjuda
    ? "w-full h-full object-cover dark:opacity-90"
    : "w-full h-[350px] object-cover bg-gray-200";
  const boxPositionClasses = isFreguesia
    ? "absolute right-5 bottom-5 bg-[#4A773C] text-white rounded-[4px] p-8 max-w-[340px] border-2 border-white"
    : isAjuda
      ? "absolute right-6 bottom-6 bg-[#1C2E56] dark:bg-[#1C2E56]/90 dark:backdrop-blur-sm text-white rounded-xl p-6 lg:p-7 max-w-[340px] shadow-lg"
      : "absolute left-5 bottom-5 bg-[#B4142F] text-white rounded-[4px] p-8 max-w-[340px] border-2 border-white";

  const headingClassName = isAjuda
    ? "font-bold text-[22px] leading-tight mb-2"
    : "font-bold text-[22px] mb-3 leading-tight";
  const boxLinkClassName = isAjuda
    ? "font-bold underline underline-offset-4 decoration-2 hover:text-[#F8C127] transition-colors"
    : "underline underline-offset-4 hover:text-gray-200 transition-colors";

  return (
    <div className={wrapperClassName}>
      <img src={banner.imageSrc} alt={banner.imageAlt} className={imageClassName} />

      <div className={boxPositionClasses}>
        <h3 className={headingClassName}>{title}</h3>

        <p className="text-[14px]">
          {banner.bodyPrefix}{" "}
          <Link href={banner.ctaHref} className={boxLinkClassName}>
            {banner.ctaLabel}
          </Link>
        </p>
      </div>
    </div>
  );
}

function StickyBannerLayout({ banner }: { banner: SiteBannerContent }) {
  const isEvent = banner.tone === "event";
  const title = banner.headline || banner.headlineLine1 || "";
  const outerClasses = isEvent
    ? "relative w-full h-[320px] overflow-hidden rounded-md border border-gray-300 dark:border-gray-800"
    : "relative w-full h-[220px] md:h-[280px] overflow-hidden rounded-md border border-gray-300 dark:border-gray-800";
  const innerBoxClasses = isEvent
    ? "bg-[#46782a] px-5 py-5 rounded-md shadow-xl border border-white/20 w-full"
    : "bg-[#46782a] px-6 py-5 rounded-md shadow-xl border border-white/20 max-w-[280px]";
  const titleClassName = isEvent
    ? "text-white font-extrabold text-[19px] leading-snug mb-2"
    : "text-white font-extrabold text-xl leading-snug mb-2";
  const containerPosition = isEvent
    ? "absolute bottom-6 left-6 right-6"
    : "absolute bottom-6 right-6 md:bottom-8 md:right-8";
  const gradientClasses = isEvent
    ? "absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
    : "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent";

  return (
    <div className="sticky top-8 mt-4">
      <div className={outerClasses}>
        <img
          src={banner.imageSrc}
          alt={banner.imageAlt}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className={gradientClasses} />
        <div className={containerPosition}>
          <div className={innerBoxClasses}>
            <h2 className={titleClassName}>{title}</h2>
            <p className="text-white/90 text-sm font-medium">
              {banner.bodyPrefix}{" "}
              <Link
                href={banner.ctaHref}
                className="underline decoration-2 underline-offset-4 hover:text-white transition-colors font-bold text-white"
              >
                {banner.ctaLabel}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SiteBanner({ bannerId }: SiteBannerProps) {
  const [banner, setBanner] = useState<SiteBannerContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    void fetchSiteBanner(bannerId).then((resolved) => {
      if (isMounted) {
        setBanner(resolved);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [bannerId]);

  if (isLoading) return null;

  // Local safety fallback ensures the page layout never breaks even if CMS is completely empty
  const isHelpdesk = bannerId.includes("helpdesk");
  const isSticky = bannerId.includes("sticky") || bannerId.includes("pharmacy");

  const safeBanner: SiteBannerContent = banner || {
    identifier: bannerId,
    pageId: "",
    slotId: "",
    variant: isHelpdesk ? "helpdesk" : isSticky ? "sticky" : "feature",
    imageSrc: isHelpdesk ? "/help-desk.jpg" : "/farmacia-banner.jpg",
    imageAlt: "Banner",
    headlineLine1: "Precisa de um serviço",
    headlineLine2: "da Junta?",
    headline: "Procura algo?",
    bodyPrefix: "Visite o",
    ctaLabel: "Balcão Digital",
    ctaHref: "/balcao-digital",
  };

  if (safeBanner.variant === "helpdesk") {
    return <HelpDeskBannerLayout banner={safeBanner} />;
  }

  if (safeBanner.variant === "sticky") {
    return <StickyBannerLayout banner={safeBanner} />;
  }

  return <FeatureBannerLayout banner={safeBanner} />;
}
