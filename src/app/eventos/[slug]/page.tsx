import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CalendarDays, Clock, MapPin } from "lucide-react";

import { fetchEventBySlug, fetchPublishedEvents } from "@/lib/cms";

type EventPageProps = {
  params: Promise<{ slug: string }>;
};

const formatDate = (isoDate: string) =>
  new Date(isoDate).toLocaleDateString("pt-PT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

export default async function EventDetailPage({ params }: EventPageProps) {
  const { slug } = await params;

  const event = await fetchEventBySlug(slug);
  if (!event) notFound();

  const allEvents = await fetchPublishedEvents();
  const recentEvents = allEvents.filter((e) => e.id !== event.id).slice(0, 3);

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        <section className="section-padding pt-6 md:pt-8">
          <div className="container max-w-6xl mx-auto px-4 relative">
            {/* BACK */}
            <Link href="/eventos" className="inline-flex items-center gap-2 mb-6 -ml-2 group">
              <span className="text-foreground text-xl font-semibold group-hover:-translate-x-1 transition-transform">
                {"<"}
              </span>
              <span className="font-display text-2xl md:text-3xl font-bold text-primary">
                Agenda
              </span>
            </Link>

            <div className="space-y-6 lg:pr-[360px]">
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight">
                {event.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/70">
                <span className="text-primary font-medium">{event.category}</span>

                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> {event.location}
                </span>

                <span className="flex items-center gap-1">
                  <CalendarDays className="w-4 h-4" /> {formatDate(event.date)}
                </span>

                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> {event.time}
                </span>
              </div>

              <p className="text-base text-foreground/80 leading-relaxed">{event.description}</p>

              {event.mainImage && (
                <div className="relative w-full aspect-[16/9] overflow-hidden">
                  <Image src={event.mainImage} alt={event.title} fill className="object-cover" />
                </div>
              )}
            </div>

            {/* CTA */}
            <div className="hidden lg:block">
              <div className="absolute top-16 md:top-20 right-0 w-[320px] z-10">
                <div className="bg-foreground text-white rounded-2xl p-6 shadow-md space-y-4">
                  <p className="font-display text-lg font-semibold leading-snug">
                    Precisa de apoio relacionado com este evento?
                  </p>

                  <div className="flex flex-col gap-3">
                    <Link
                      href="/institucional/documentacao"
                      className="bg-yellow-400 text-black text-sm font-medium rounded-md py-2 text-center hover:bg-yellow-300 transition-colors"
                    >
                      Ver Documentação
                    </Link>

                    <Link
                      href="/contactos"
                      className="border border-white text-white text-sm font-medium rounded-md py-2 text-center hover:bg-white hover:text-foreground transition-colors"
                    >
                      Contactar organização
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* RECENT */}
            <div className="pt-12 space-y-4">
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Eventos Recentes
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentEvents.map((e) => (
                  <Link key={e.id} href={`/eventos/${e.slug}`} className="group block">
                    <div>
                      {e.mainImage && (
                        <div className="relative w-full aspect-[4/2.6] mb-2 overflow-hidden">
                          <Image
                            src={e.mainImage}
                            alt={e.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}

                      <p className="text-sm text-foreground/70 mb-1">{e.location}</p>

                      <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {e.title}
                      </h3>

                      <p className="text-sm text-foreground/70">{formatDate(e.date)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
