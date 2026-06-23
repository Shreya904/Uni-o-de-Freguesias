"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Calendar, MapPin, Clock } from "lucide-react";
import { CmsEventItem, fetchPublishedEvents } from "@/lib/cms";
import EmptyState from "@/components/ui/emptystate";
import { motion } from "framer-motion";

const formatDate = (value: string) => {
  const date = new Date(value);
  return {
    day: date.toLocaleDateString("pt-PT", { day: "2-digit" }),
    month: date.toLocaleDateString("pt-PT", { month: "short" }),
  };
};

const EventsSection = () => {
  const [events, setEvents] = useState<CmsEventItem[]>([]);

  useEffect(() => {
    let isMounted = true;
    const loadEvents = async () => {
      try {
        const items = await fetchPublishedEvents(4);
        if (isMounted) setEvents(items);
      } catch {
        if (isMounted) setEvents([]);
      }
    };
    void loadEvents();
    return () => { isMounted = false; };
  }, []);

  const isEmpty = events.length === 0;

  return (
    <section className="section-padding bg-background">
      <div className="container max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              Agenda
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
              Próximos Eventos
            </h2>
          </div>
          <Link
            href="/eventos"
            className="hidden md:flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            Ver todos <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {isEmpty ? (
          <EmptyState
            title="Sem eventos agendados"
            description="Fique atento — novos eventos serão adicionados em breve."
            primaryAction={{
              label: "Ver agenda completa",
              href: "/eventos",
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event, i) => {
              const { day, month } = formatDate(event.date);
              return (
                <motion.article
                  key={event.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card rounded-xl border p-5 flex gap-4"
                >
                  <div className="flex flex-col items-center justify-center bg-primary/10 rounded-lg px-3 py-2 min-w-[56px]">
                    <span className="text-2xl font-bold text-primary">{day}</span>
                    <span className="text-xs text-primary uppercase">{month}</span>
                  </div>
                  <div className="flex-1">
                    <span className="text-xs text-accent font-semibold uppercase">{event.category}</span>
                    <h3 className="font-display font-semibold text-foreground mt-1 mb-2">{event.title}</h3>
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                      {event.time && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {event.time}
                        </span>
                      )}
                      {event.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {event.location}
                        </span>
                      )}
                    </div>
                    <Link href={`/eventos/${event.slug}`} className="text-xs text-primary hover:underline mt-2 inline-block">
                      Ver detalhes
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}

        <Link
          href="/eventos"
          className="md:hidden flex items-center justify-center gap-1.5 mt-8 text-sm font-medium text-primary"
        >
          Ver todos os eventos <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};

export default EventsSection;