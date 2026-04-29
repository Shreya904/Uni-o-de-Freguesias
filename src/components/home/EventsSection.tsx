"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";

import { fetchPublishedEvents } from "@/lib/cms";
import EmptyState from "@/components/ui/emptystate"; // fix path if needed

const EventsSection = () => {
  const [events, setEvents] = useState<any[]>([]);

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

  const upcoming = events
    .filter((e) => new Date(e.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) // ✅ better UX
    .slice(0, 5);

  const featured = upcoming[0];
  const rest = upcoming.slice(1);

  return (
    <section className="section-padding">
      <div className="container max-w-6xl mx-auto px-4">
        {/* HEADER */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">Agenda</h2>
            <div className="h-[2px] w-20 bg-primary mt-3" />
          </div>

          <Link
            href="/eventos"
            className="hidden md:flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            Ver agenda completa <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* ✅ EMPTY STATE */}
        {!upcoming.length ? (
          <EmptyState
            title="Sem eventos agendados"
            description="Fique atento — novos eventos serão adicionados em breve."
            primaryAction={{
              label: "Ver agenda completa",
              href: "/eventos",
            }}
          />
        ) : (
          /* MAIN */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* FEATURED */}
            {featured && (
              <Link href={`/eventos/${featured.slug}`} className="group block">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  {featured.mainImage && (
                    <div className="relative w-full aspect-[4/3] overflow-hidden">
                      <Image
                        src={featured.mainImage}
                        alt={featured.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <p className="text-sm text-primary font-medium">{featured.category}</p>

                    <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                      {featured.title}
                    </h3>

                    <div className="flex flex-wrap gap-3 text-sm text-foreground/70">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" /> {featured.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" /> {featured.location}
                      </span>
                    </div>

                    <p className="text-base text-foreground/70 line-clamp-3">{featured.excerpt}</p>
                  </div>
                </motion.div>
              </Link>
            )}

            {/* SIDE LIST */}
            <div className="flex flex-col gap-6">
              {rest.map((event, i) => (
                <Link key={event.id} href={`/eventos/${event.slug}`} className="group block">
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="flex gap-4 items-start"
                  >
                    {event.mainImage && (
                      <div className="relative w-24 h-20 shrink-0 overflow-hidden">
                        <Image
                          src={event.mainImage}
                          alt={event.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    <div className="space-y-1">
                      <p className="text-xs text-primary font-medium">{event.category}</p>

                      <h4 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                        {event.title}
                      </h4>

                      <div className="text-xs text-foreground/70 flex flex-wrap gap-2">
                        <span>{event.time}</span>
                        <span>•</span>
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* MOBILE CTA */}
        <div className="mt-8 md:hidden">
          <Link
            href="/eventos"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            Ver agenda completa <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
