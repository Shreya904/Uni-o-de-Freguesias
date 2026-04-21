"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Clock, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { eventItems, eventCategories } from "@/data/mockData";
import Link from "next/link";
import { slugify } from "@/lib/utils";

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [showPast, setShowPast] = useState(false);

  const upcoming = eventItems.filter((e) => !e.isPast);
  const displayEvents = showPast ? eventItems : upcoming;
  const filtered =
    activeCategory === "Todos"
      ? displayEvents
      : displayEvents.filter((e) => e.category === activeCategory);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="section-padding bg-section-alt">
          <div className="container max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
                Agenda de Eventos
              </h1>
              <p className="text-muted-foreground mt-3">
                Descubra as próximas atividades e eventos na freguesia.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
              {eventCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex justify-center mb-8">
              <button
                onClick={() => setShowPast(!showPast)}
                className="text-sm text-primary hover:underline"
              >
                {showPast ? "Ocultar eventos passados" : "Mostrar todos (incluindo passados)"}
              </button>
            </div>

            <div className="space-y-4">
              {filtered.map((event, i) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`bg-card rounded-xl border p-6 flex gap-5 ${event.isPast ? "opacity-60" : "hover:shadow-md"} transition-shadow`}
                >
                  <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-primary/10 flex flex-col items-center justify-center">
                    <span className="text-primary font-display font-bold text-xl leading-none">
                      {new Date(event.date).getDate()}
                    </span>
                    <span className="text-primary/70 text-xs uppercase mt-0.5">
                      {new Date(event.date).toLocaleDateString("pt-PT", { month: "short" })}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-accent">{event.category}</span>
                      {event.isPast && (
                        <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                          Passado
                        </span>
                      )}
                    </div>
                    <h3 className="font-display font-semibold text-foreground mb-2">
                      {event.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {event.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> {event.location}
                      </span>
                    </div>
                    <Link
                      href={`/eventos/${slugify(event.title)}`}
                      className="inline-flex mt-3 text-sm font-medium text-primary hover:underline"
                    >
                      Ver detalhes
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            {filtered.length === 0 && (
              <p className="text-center text-muted-foreground py-16">
                Sem eventos nesta categoria.
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
