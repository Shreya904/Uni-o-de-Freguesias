"use client";

import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { newsItems } from "@/data/mockData";
import { Calendar } from "lucide-react";
import { slugify } from "@/lib/utils";

export default function NoticiasPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="relative bg-primary py-10 md:py-14">
          <div className="container max-w-4xl mx-auto px-4 text-center">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-3">
              Notícias
            </h1>
            <p className="text-primary-foreground/80 text-base md:text-lg max-w-2xl mx-auto">
              Fique a par das últimas novidades e informações da nossa freguesia.
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container max-w-5xl mx-auto px-4">
            {/* Sidebar style: featured + grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main news grid */}
              <div className="lg:col-span-2 space-y-6">
                {newsItems.map((item) => (
                  <Link
                    key={item.id}
                    href={`/noticias/${slugify(item.title)}`}
                    className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                  >
                    <article className="bg-card rounded-xl border overflow-hidden hover:shadow-md transition-shadow">
                      <div className="p-4 sm:p-5 flex gap-4 items-start">
                        {item.mainImage && (
                          <div className="relative w-28 h-24 sm:w-36 sm:h-28 shrink-0 rounded-lg overflow-hidden bg-muted/40 border border-border/60">
                            <Image
                              src={item.mainImage}
                              alt={item.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 640px) 112px, 144px"
                            />
                          </div>
                        )}

                        <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(item.date).toLocaleDateString("pt-PT")}
                          <span className="ml-2 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-medium">
                            {item.category}
                          </span>
                        </div>
                        <h2 className="font-display text-lg sm:text-xl font-semibold text-foreground mb-2 line-clamp-2">
                          {item.title}
                        </h2>
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                          {item.excerpt}
                        </p>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

              {/* Sidebar */}
              <aside className="space-y-6">
                <div className="bg-card rounded-xl border p-5">
                  <h3 className="font-display font-semibold text-foreground mb-4">
                    A Acontecer Agora
                  </h3>
                  <ul className="space-y-3">
                    {newsItems.slice(0, 3).map((item) => (
                      <li key={item.id} className="text-sm">
                        <Link
                          href={`/noticias/${slugify(item.title)}`}
                          className="text-foreground font-medium block leading-snug hover:text-primary transition-colors"
                        >
                          {item.title}
                        </Link>
                        <span className="text-xs text-muted-foreground">
                          {new Date(item.date).toLocaleDateString("pt-PT")}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/*
                <div className="bg-accent/10 rounded-xl p-5">
                  <h3 className="font-display font-semibold text-foreground mb-2">Subscreva</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Receba as últimas notícias diretamente no seu email.
                  </p>
                  <input
                    type="email"
                    placeholder="O seu email"
                    className="w-full px-3 py-2 rounded-md border bg-card text-sm mb-2"
                  />
                  <button className="w-full text-sm font-medium bg-primary text-primary-foreground rounded-md py-2 hover:bg-primary/90 transition-colors">
                    Subscrever
                  </button>
                </div>
                */}
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
