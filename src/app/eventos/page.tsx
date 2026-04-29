"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Clock, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

import { fetchPublishedEvents } from "@/lib/cms";
import EmptyState from "@/components/ui/emptystate";

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [showPast, setShowPast] = useState(false);

  useEffect(() => {
    let mounted = true;

    fetchPublishedEvents().then((data) => {
      if (mounted) setEvents(data);
    });

    return () => {
      mounted = false;
    };
  }, []);

  const now = new Date();

  const upcoming = events.filter((e) => new Date(e.date) >= now);
  const displayEvents = showPast ? events : upcoming;

  const categories = [
    "Todos",
    ...Array.from(new Set(events.map((e) => e.category).filter(Boolean))),
  ];

  const filtered =
    activeCategory === "Todos"
      ? displayEvents
      : displayEvents.filter((e) => e.category === activeCategory);

  const isEmpty = filtered.length === 0;

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        <section className="section-padding pt-6 md:pt-8">
          <div className="container max-w-6xl mx-auto px-4">
            {/* TITLE */}
            <div className="mb-6">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                Agenda
              </h1>
              <div className="h-[2px] w-24 bg-primary mt-3" />
            </div>

            {/* FILTERS */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* TOGGLE */}
            <div className="mb-6">
              <button
                onClick={() => setShowPast(!showPast)}
                className="text-xs text-primary hover:underline"
              >
                {showPast ? "Ocultar eventos passados" : "Mostrar todos (incluindo passados)"}
              </button>
            </div>

            {/* ✅ EMPTY STATE */}
            {isEmpty ? (
              <EmptyState
                title={
                  activeCategory !== "Todos"
                    ? `Sem eventos em "${activeCategory}"`
                    : showPast
                      ? "Sem eventos disponíveis"
                      : "Sem eventos futuros"
                }
                description={
                  showPast
                    ? "Ainda não existem eventos registados."
                    : "Não há eventos futuros agendados de momento."
                }
                primaryAction={{
                  label: "Contactar organização",
                  href: "/contactos",
                }}
              />
            ) : (
              /* GRID */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((event, i) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link href={`/eventos/${event.slug}`} className="group block">
                      <article className={`${new Date(event.date) < now ? "opacity-50" : ""}`}>
                        {event.mainImage && (
                          <div className="relative w-full aspect-[4/2.6] mb-3 overflow-hidden bg-muted">
                            <Image
                              src={event.mainImage}
                              alt={event.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}

                        <div className="flex items-center gap-1 text-sm text-foreground/80 mb-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {event.location}
                        </div>

                        <h3 className="font-display text-xl md:text-2xl font-bold text-foreground leading-snug mb-1 group-hover:text-primary transition-colors">
                          {event.title}
                        </h3>

                        <div className="flex items-center gap-3 text-sm text-foreground/70 mb-2">
                          <span>{new Date(event.date).toLocaleDateString("pt-PT")}</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {event.time}
                          </span>
                        </div>

                        <p className="text-base text-foreground/70 leading-relaxed line-clamp-3">
                          {event.excerpt}
                        </p>
                      </article>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
