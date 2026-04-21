import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, MapPin, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { eventItems, eventCategories } from "@/data/mockData";
import { slugify } from "@/lib/utils";

const EventsSection = () => {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const upcomingEvents = eventItems.filter((e) => !e.isPast);
  const filtered =
    activeCategory === "Todos"
      ? upcomingEvents
      : upcomingEvents.filter((e) => e.category === activeCategory);

  return (
    <section className="section-padding bg-section-alt">
      <div className="container max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-8">
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

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-xl border p-6 hover:shadow-md transition-shadow flex gap-5"
            >
              <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-primary/10 flex flex-col items-center justify-center">
                <span className="text-primary font-display font-bold text-xl leading-none">
                  {new Date(event.date).getDate()}
                </span>
                <span className="text-primary/70 text-xs uppercase mt-0.5">
                  {new Date(event.date).toLocaleDateString("pt-PT", { month: "short" })}
                </span>
              </div>
              <div className="min-w-0">
                <span className="text-xs font-medium text-accent">{event.category}</span>
                <h3 className="font-display font-semibold text-foreground mt-1 mb-2">
                  {event.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {event.description}
                </p>
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
          <p className="text-center text-muted-foreground py-12">Sem eventos nesta categoria.</p>
        )}

        <div className="text-center mt-8">
          <Button variant="outline" asChild>
            <Link href="/eventos">
              Ver todos os eventos <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
