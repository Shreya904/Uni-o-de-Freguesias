"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { CmsNewsItem, fetchPublishedNews } from "@/lib/cms";
import EmptyState from "@/components/ui/emptystate"; // adjust path if needed

const NewsSection = () => {
  const [newsItems, setNewsItems] = useState<CmsNewsItem[]>([]);

  useEffect(() => {
    let isMounted = true;

    const loadNews = async () => {
      try {
        const items = await fetchPublishedNews(4);
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
    <section className="section-padding bg-background">
      <div className="container max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              Atualidade
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
              Últimas Notícias
            </h2>
          </div>

          <Link
            href="/noticias"
            className="hidden md:flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            Ver todas <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* ✅ EMPTY STATE */}
        {isEmpty ? (
          <EmptyState
            title="Sem notícias recentes"
            description="Ainda não existem notícias publicadas. Volte em breve para atualizações."
            primaryAction={{
              label: "Ver todas as notícias",
              href: "/noticias",
            }}
          />
        ) : (
          /* MASONRY */
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-8">
            {newsItems.map((item, i) => {
              const image =
                typeof item.mainImage === "string" && item.mainImage.trim()
                  ? item.mainImage.trim()
                  : null;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="mb-8 break-inside-avoid group"
                >
                  <Link href={`/noticias/${item.slug}`} className="block space-y-4">
                    {/* IMAGE */}
                    {image && (
                      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg bg-muted">
                        <Image
                          src={image}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    )}

                    {/* TEXT */}
                    <div className="space-y-2">
                      <time className="text-xs text-muted-foreground">
                        {new Date(item.date).toLocaleDateString("pt-PT")}
                      </time>

                      <h3 className="font-display text-xl md:text-2xl font-semibold leading-snug underline decoration-primary/40 underline-offset-4 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>

                      {item.excerpt && (
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.excerpt}
                        </p>
                      )}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* MOBILE CTA */}
        <Link
          href="/noticias"
          className="md:hidden flex items-center justify-center gap-1.5 mt-10 text-sm font-medium text-primary"
        >
          Ver todas as notícias <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};

export default NewsSection;
