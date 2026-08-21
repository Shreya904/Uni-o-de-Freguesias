"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { fetchPublishedNews, type CmsNewsItem } from "@/lib/cms";
import EmptyState from "@/components/ui/emptystate";
import { ArrowDownUp } from "lucide-react";

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
  const [sortBy, setSortBy] = useState<"date" | "name">("date");
  const [sortAsc, setSortAsc] = useState(false);
  const [sortTouched, setSortTouched] = useState(false);

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
    let result = [...newsItems];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          (item.excerpt && item.excerpt.toLowerCase().includes(query)),
      );
    }

    result.sort((a, b) => {
      if (sortBy === "date") {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        if (dateA === dateB) return a.title.localeCompare(b.title);
        return sortAsc ? dateA - dateB : dateB - dateA;
      }

      if (sortAsc) return a.title.localeCompare(b.title);
      return b.title.localeCompare(a.title);
    });

    return result;
  }, [newsItems, searchQuery, sortBy, sortAsc]);

  const isEmpty = filteredNews.length === 0;

  return (
    <div className="min-h-screen bg-white">
      <main>
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 z-50">
            <Header />
          </div>

          <section className="relative w-full min-h-[400px] md:min-h-[450px] overflow-hidden flex items-end pb-12 pt-[180px] md:pt-[160px]">
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

        {/* MAIN CONTENT: GRID (Row by Row) */}
        <section className="py-12 md:py-16">
          <div className="container max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="flex items-center justify-between mb-6 text-sm text-[#253e6b] font-semibold">
              <div className="flex items-center gap-3">
                <span className="hidden sm:block">Ordenar</span>
                <div className="flex items-center rounded-md border-[1.5px] border-gray-300 bg-white overflow-hidden">
                  <button
                    onClick={() => {
                        setSortBy("date");
                        setSortAsc(false);
                      }}
                    className={`px-3 py-1.5 transition-colors ${sortBy === "date" ? "bg-[#253e6b] text-white" : "text-[#253e6b] hover:bg-gray-50"}`}
                  >
                    Data
                  </button>
                  <button
                    onClick={() => {
                        setSortBy("name");
                        setSortAsc(true);
                      }}
                    className={`px-3 py-1.5 border-l border-gray-200 transition-colors ${sortBy === "name" ? "bg-[#253e6b] text-white" : "text-[#253e6b] hover:bg-gray-50"}`}
                  >
                    Nome
                  </button>
                  <button
                    onClick={() => {
                      setSortTouched(true);
                      setSortAsc((prev) => !prev);
                    }}
                    className={`flex items-center gap-2 px-3 py-1.5 border-l border-gray-200 transition-colors ${sortTouched ? "text-[#253e6b] hover:bg-gray-50" : "text-gray-400 hover:bg-gray-50"}`}
                    title={sortAsc ? "Mais antigos primeiro" : "Mais recentes primeiro"}
                  >
                    <ArrowDownUp
                      className={`w-4 h-4 transition-transform ${sortTouched ? (sortAsc ? "rotate-180 text-[#253e6b]" : "rotate-0 text-[#253e6b]") : "rotate-0 text-gray-400"}`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {isEmpty ? (
              <div className="py-12">
                <EmptyState
                  title="Sem notícias encontradas"
                  description="Tente usar outros termos."
                  primaryAction={{ label: "Limpar pesquisa", onClick: () => setSearchQuery("") }}
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 md:gap-x-14 md:gap-y-16">
                {/* 🔹 Changed from 'columns' to 'grid' layout here */}
                {filteredNews.map((item) => {
                  const image =
                    typeof item.mainImage === "string" && item.mainImage.trim()
                      ? item.mainImage.trim()
                      : null;

                  return (
                    <Link
                      key={item.id}
                      href={`/noticias/${item.slug}`}
                      className="flex flex-col group"
                    >
                      <article className="flex flex-col h-full">
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
