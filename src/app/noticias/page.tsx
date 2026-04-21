"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { newsItems } from "@/data/mockData";
import { Calendar } from "lucide-react";

export default function NoticiasPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="relative bg-primary py-20 md:py-28">
          <div className="container max-w-5xl mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Notícias
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
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
                  <article
                    key={item.id}
                    className="bg-card rounded-xl border overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <Calendar className="w-3.5 h-3.5" />
                        {item.date}
                        <span className="ml-2 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-medium">
                          {item.category}
                        </span>
                      </div>
                      <h2 className="font-display text-xl font-semibold text-foreground mb-2">
                        {item.title}
                      </h2>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.excerpt}
                      </p>
                    </div>
                  </article>
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
                        <span className="text-foreground font-medium block leading-snug">
                          {item.title}
                        </span>
                        <span className="text-xs text-muted-foreground">{item.date}</span>
                      </li>
                    ))}
                  </ul>
                </div>

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
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
