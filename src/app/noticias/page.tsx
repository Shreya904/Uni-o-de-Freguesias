"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { fetchPublishedNews, type CmsNewsItem } from "@/lib/cms";
import EmptyState from "@/components/ui/emptystate";

// Helper to format date exactly like "26 Janeiro 2026"
const formatNewsDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("pt-PT", { month: "long" });
  const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
  const year = date.getFullYear();
  return `${day} ${capitalizedMonth} ${year}`;
};

export default function NoticiasPage() {
  const [newsItems, setNewsItems] = useState<CmsNewsItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let isMounted = true;
    const loadNews = async () => {
      try {
        const items = await fetchPublishedNews();
        if (isMounted) setNewsItems(items);
      } catch {
        if (isMounted) setNewsItems([]);
      }
    };
    void loadNews();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredNews = useMemo(() => {
    if (!searchQuery.trim()) return newsItems;
    const query = searchQuery.toLowerCase();
    return newsItems.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        (item.excerpt && item.excerpt.toLowerCase().includes(query)),
    );
  }, [newsItems, searchQuery]);

  const isEmpty = filteredNews.length === 0;

  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* HERO SECTION WITH WRAPPED HEADER */}
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 z-50">
            <Header />
          </div>

          {/* Hero with Lighter Blue Tint */}
          <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden flex items-end pb-12">
            <div className="absolute inset-0">
              <img
                src="/noticia-hero.jpg"
                alt="Notícias - Toda a atualidade"
                className="w-full h-full object-cover grayscale"
              />
              {/* Lighter blue overlay for a more open, modern look */}
              <div className="absolute inset-0 bg-[#253e6b]/70 mix-blend-multiply" />
            </div>

            <div className="container relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="text-white">
                <h1 className="font-extrabold text-4xl md:text-5xl lg:text-6xl mb-2">Notícias</h1>
                <p className="text-xl md:text-2xl font-medium text-white/90">Toda a atualidade</p>
              </div>

              <div className="w-full md:max-w-xl">
                <div className="flex w-full mb-3 shadow-lg">
                  <input
                    type="text"
                    placeholder="O que procura"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-5 py-3.5 text-black rounded-l-md outline-none"
                  />
                  <button className="bg-white px-6 font-semibold text-[#253e6b] border-l border-gray-200 rounded-r-md hover:bg-gray-50 transition-colors">
                    Pesquisar
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* MAIN CONTENT: MASONRY GRID */}
        <section className="py-12 md:py-16">
          <div className="container max-w-[1400px] mx-auto px-6 md:px-12">
            {isEmpty ? (
              <div className="py-12">
                <EmptyState
                  title="Sem notícias encontradas"
                  description="Tente usar outros termos."
                  primaryAction={{ label: "Limpar pesquisa", onClick: () => setSearchQuery("") }}
                />
              </div>
            ) : (
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 md:gap-14 [column-gap:3.5rem]">
                {filteredNews.map((item) => {
                  const image =
                    typeof item.mainImage === "string" && item.mainImage.trim()
                      ? item.mainImage.trim()
                      : null;

                  return (
                    <Link
                      key={item.id}
                      href={`/noticias/${item.slug}`}
                      className="block break-inside-avoid mb-12 md:mb-16 group"
                    >
                      <article className="flex flex-col">
                        {image && (
                          <div className="relative w-full aspect-[4/3] md:aspect-[3/2] overflow-hidden bg-gray-100 mb-5">
                            <Image
                              src={image}
                              alt={item.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        )}
                        <h2 className="text-[#253e6b] text-2xl md:text-[28px] font-extrabold leading-[1.25] mb-4 underline decoration-[2px] underline-offset-[6px] group-hover:text-[#1c2841] transition-colors">
                          {item.title}
                        </h2>
                        <div className="text-[15px] font-medium text-[#253e6b]/80 mb-3">
                          {formatNewsDate(item.date)}
                        </div>
                        {item.excerpt && (
                          <p className="text-base md:text-[17px] text-[#4a5568] font-medium leading-relaxed">
                            {item.excerpt}
                          </p>
                        )}
                      </article>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
