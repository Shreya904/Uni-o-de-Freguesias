"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchPublishedNews, type CmsNewsItem } from "@/lib/cms";

type NewsHighlightBoxProps = {
  variant?: "compact" | "standard" | "help";
};

const formatNewsDate = (dateString: string) => {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "";

  const day = date.getDate();
  const month = date.toLocaleString("pt-PT", { month: "long" });
  const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
  const year = date.getFullYear();

  return `${day} ${capitalizedMonth}, ${year}`;
};

const styles = {
  compact: {
    wrapper: "bg-[#e6f4fd] dark:bg-black border border-[#cbe5f8] dark:border-white/10 p-5 rounded-md mt-6",
    heading: "font-extrabold text-[#1c2841] dark:text-white mb-3 text-sm uppercase tracking-wide",
    date: "text-xs text-gray-500 dark:text-white/70 mb-2 font-medium",
    link: "text-sm font-bold text-[#1c2841] dark:text-white hover:text-blue-800 dark:hover:text-white transition-colors leading-snug block",
    title: "underline underline-offset-2 decoration-[#1c2841]/30",
  },
  standard: {
    wrapper: "bg-[#EAF4FD] dark:bg-black p-6 rounded-[4px]",
    heading: "font-extrabold text-[#1C2E56] dark:text-white text-[16px] mb-4",
    date: "text-[12px] text-[#1C2E56]/70 dark:text-white/70 mb-2 font-medium",
    link:
      "text-[#1C2E56] dark:text-white text-[14px] leading-relaxed underline underline-offset-2 hover:text-[#B4142F] dark:hover:text-white transition-colors block",
    title: "",
  },
  help: {
    wrapper: "bg-[#DDE9F7] dark:bg-black p-4 rounded-lg",
    heading: "font-bold text-[#1C2E56] dark:text-white mb-3",
    date: "text-xs text-[#1C2E56]/70 dark:text-white/70 mb-2 font-medium",
    link: "text-sm text-[#1C2E56] dark:text-white hover:text-[#DE092D] dark:hover:text-white transition-colors block",
    title: "",
  },
};

export default function NewsHighlightBox({ variant = "compact" }: NewsHighlightBoxProps) {
  const [news, setNews] = useState<CmsNewsItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadNews = async () => {
      try {
        const [latestNews] = await fetchPublishedNews(1);
        if (isMounted) setNews(latestNews ?? null);
      } catch {
        if (isMounted) setNews(null);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    void loadNews();

    return () => {
      isMounted = false;
    };
  }, []);

  const currentStyles = styles[variant];

  return (
    <div className={currentStyles.wrapper}>
      <h3 className={currentStyles.heading}>Notícias</h3>

      {isLoading ? (
        <p className={variant === "help" ? "text-sm text-[#1C2E56] dark:text-white" : currentStyles.date}>
          A carregar...
        </p>
      ) : news ? (
        <>
          <p className={currentStyles.date}>{formatNewsDate(news.date)}</p>
          <Link href={`/noticias/${news.slug}`} className={currentStyles.link}>
            <span className={currentStyles.title}>{news.title}</span>
          </Link>
        </>
      ) : (
        <Link href="/noticias" className={currentStyles.link}>
          <span className={currentStyles.title}>Ver notícias</span>
        </Link>
      )}
    </div>
  );
}
