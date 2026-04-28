"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CmsNewsItem, fetchPublishedNews } from "@/lib/cms";

export default function NoticiasPage() {
  const [newsItems, setNewsItems] = useState<CmsNewsItem[]>([]);

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

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        <section className="section-padding">
          <div className="container max-w-6xl mx-auto px-4">

            {/* TITLE */}
            <div className="mb-10">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                Notícias
              </h1>
              <div className="h-[2px] w-20 bg-primary mt-3" />
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

              {newsItems.map((item) => {
                const image =
                  typeof item.mainImage === "string" && item.mainImage.trim()
                    ? item.mainImage.trim()
                    : null;

                return (
                  <Link
                    key={item.id}
                    href={`/noticias/${item.slug}`}
                    className="group block h-full"
                  >
                    <article className="space-y-3 h-full flex flex-col">

                      {/* IMAGE */}
                      {image ? (
                        <div className="relative w-full aspect-[16/10] overflow-hidden bg-muted">
                          <Image
                            src={image}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ) : null}

                      {/* TEXT */}
                      <div className="space-y-1 flex flex-col flex-1">
                        <div className="text-xs text-muted-foreground">
                          {item.date ? new Date(item.date).toLocaleDateString("pt-PT") : ""}
                        </div>

                        <h2 className="font-display text-lg md:text-xl font-bold leading-snug group-hover:text-primary transition-colors underline decoration-primary/30 underline-offset-4">
                          {item.title}
                        </h2>

                        {item.excerpt && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {item.excerpt}
                          </p>
                        )}
                      </div>

                    </article>
                  </Link>
                );
              })}

            </div>

            {/* EMPTY STATE */}
            {newsItems.length === 0 && (
              <p className="text-sm text-muted-foreground mt-10">
                Sem noticias publicadas de momento.
              </p>
            )}

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}