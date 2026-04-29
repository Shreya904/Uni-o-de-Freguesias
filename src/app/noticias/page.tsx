"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { fetchPublishedNews } from "@/lib/cms";
import EmptyState from "@/components/ui/emptystate"; // adjust path if needed

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

  const isEmpty = newsItems.length === 0;

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        <section className="section-padding">
          <div className="container max-w-6xl mx-auto px-4">
            {/* TITLE */}
            <div className="mb-12">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                Notícias
              </h1>
              <div className="h-[2px] w-24 bg-primary mt-4" />
            </div>

            {/* ✅ EMPTY STATE */}
            {isEmpty ? (
              <EmptyState
                title="Sem notícias publicadas"
                description="Ainda não existem notícias disponíveis. Volte mais tarde para atualizações."
                primaryAction={{
                  label: "Voltar à página inicial",
                  href: "/",
                }}
              />
            ) : (
              /* MASONRY GRID */
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-10 [column-gap:2.5rem] space-y-10">
                {newsItems.map((item) => {
                  const image =
                    typeof item.mainImage === "string" && item.mainImage.trim()
                      ? item.mainImage.trim()
                      : null;

                  return (
                    <Link
                      key={item.id}
                      href={`/noticias/${item.slug}`}
                      className="block break-inside-avoid mb-12 group"
                    >
                      <article className="flex flex-col gap-4">
                        {/* IMAGE */}
                        {image && (
                          <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg bg-muted">
                            <Image
                              src={image}
                              alt={item.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}

                        {/* TEXT */}
                        <div className="flex flex-col gap-2">
                          <div className="text-xs text-muted-foreground">
                            {new Date(item.date).toLocaleDateString("pt-PT")}
                          </div>

                          <h2 className="font-display text-xl md:text-2xl font-semibold leading-snug underline decoration-primary/40 underline-offset-4 group-hover:text-primary transition-colors">
                            {item.title}
                          </h2>

                          {item.excerpt && (
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {item.excerpt}
                            </p>
                          )}
                        </div>
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
