"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { fetchPublishedNews } from "@/lib/cms";

type News = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  date: string;
  mainImage?: string;
};

export default function NoticiasPage() {
  const [newsItems, setNewsItems] = useState<News[]>([]);

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
            <div className="mb-10">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                Notícias
              </h1>
              <div className="h-[2px] w-20 bg-primary mt-3" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsItems.map((item) => {
                const image =
                  typeof item.mainImage === "string" && item.mainImage.trim()
                    ? item.mainImage.trim()
                    : null;

                return (
                  <Link key={item.id} href={`/noticias/${item.slug}`} className="group block">
                    <article className="flex flex-col gap-3 h-full">
                      {/* IMAGE (no reserved spacing, no forced layout) */}
                      {image && (
                        <div className="relative w-full aspect-[16/10] overflow-hidden bg-muted rounded-md">
                          <Image
                            src={image}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}

                      {/* TEXT */}
                      <div className="flex flex-col gap-1 flex-1">
                        <div className="text-xs text-muted-foreground">
                          {new Date(item.date).toLocaleDateString("pt-PT")}
                        </div>

                        {/* UNDERLINED HEADLINE (restored) */}
                        <h2 className="font-display text-lg md:text-xl font-bold leading-snug underline decoration-primary/30 underline-offset-4 group-hover:text-primary transition-colors">
                          {item.title}
                        </h2>

                        {item.excerpt && (
                          <p className="text-sm text-muted-foreground line-clamp-3">
                            {item.excerpt}
                          </p>
                        )}
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>

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
