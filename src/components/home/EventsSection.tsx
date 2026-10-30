"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FileEdit } from "lucide-react";
import EmptyState from "@/components/ui/emptystate";
import { motion } from "framer-motion";
import { fetchLatestFeaturedEvent, type CmsEventItem } from "@/lib/cms";

const EventsSection = () => {
  const [featuredEvent, setFeaturedEvent] = useState<CmsEventItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadFeaturedEvent = async () => {
      try {
        const event = await fetchLatestFeaturedEvent();

        if (isMounted) {
          setFeaturedEvent(event);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch featured event from CMS:", error);
        if (isMounted) {
          setFeaturedEvent(null);
          setIsLoading(false);
        }
      }
    };

    void loadFeaturedEvent();

    return () => {
      isMounted = false;
    };
  }, []);

  const isEmpty = !featuredEvent;

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* LEFT CONTENT */}
          <div className="flex-1 max-w-lg">
            <h2 className="text-[36px] md:text-[44px] leading-[1.15] font-bold text-[#1e3050] dark:text-white mb-4">
              Descubra o que
              <br />
              acontece na
              <br />
              nossa freguesia
            </h2>
            <h3 className="text-[22px] font-bold text-[#1e3050] dark:text-white mb-6">
              Visite a{" "}
              <Link
                href="/eventos"
                className="underline decoration-[3px] underline-offset-4 hover:text-primary transition-colors"
              >
                Agenda
              </Link>
            </h3>
            <p className="text-[16px] font-medium text-[#1e3050] dark:text-white/90 leading-relaxed">
              Feiras e mercados, cultura, desporto e atividades para todas as idades: a Agenda reúne
              os eventos de Glória e Vera Cruz e da cidade. Consulte datas, horários e locais e
              saiba como participar.
            </p>
          </div>

          {/* RIGHT CONTENT */}
          <div className="flex-1 w-full flex lg:justify-end">
            {isLoading ? (
              <div className="w-full max-w-[420px] lg:ml-auto h-[500px] animate-pulse bg-slate-100 rounded-lg border border-slate-200" />
            ) : isEmpty ? (
              <EmptyState
                title="Sem eventos agendados"
                description="Fique atento — novos eventos serão adicionados em breve."
                primaryAction={{
                  label: "Ver agenda completa",
                  href: "/eventos",
                }}
              />
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="w-full max-w-[420px] lg:ml-auto bg-white border-2 border-[#1e3050] p-5 rounded-md shadow-sm"
              >
                {/* Image */}
                {featuredEvent.mainImage && (
                  <Link
                    href={`/eventos/${featuredEvent.slug}`}
                    className="block w-full h-[220px] mb-5 overflow-hidden border border-slate-100 rounded-sm hover:opacity-90 transition-opacity"
                  >
                    <img
                      src={featuredEvent.mainImage}
                      alt={featuredEvent.title}
                      className="w-full h-full object-cover"
                    />
                  </Link>
                )}

                {/* Body */}
                <div>
                  <Link href={`/eventos/${featuredEvent.slug}`}>
                    <h4 className="text-[22px] font-bold text-[#1e3050] whitespace-pre-line leading-tight mb-3 hover:text-blue-800 transition-colors">
                      {featuredEvent.title}
                    </h4>
                  </Link>
                  <p className="text-[15px] font-medium text-[#1e3050] leading-relaxed mb-6">
                    {featuredEvent.excerpt}
                  </p>

                  {/* Details */}
                  <div className="space-y-2 text-[15px] mb-6">
                    <p className="text-[#1e3050]">
                      <span className="font-bold">Data:</span>{" "}
                      <span className="font-medium">{featuredEvent.dateStr}</span>
                    </p>
                    <p className="text-[#1e3050]">
                      <span className="font-bold">Hora:</span>{" "}
                      <span className="font-medium">{featuredEvent.timeStr}</span>
                    </p>
                    <p className="text-[#1e3050]">
                      <span className="font-bold">Local:</span>{" "}
                      <span className="font-medium">{featuredEvent.location}</span>
                    </p>
                  </div>

                  <hr className="border-[#1e3050]/20 border-t-2 mb-4" />

                  {/* Footer Elements (Price & Registration) */}
                  <div className="flex items-center gap-4 text-[#1e3050]">
                    <span className="font-bold text-[16px]">{featuredEvent.priceType}</span>
                    {featuredEvent.registrationLink && (
                      <>
                        <span className="w-0.5 h-5 bg-[#1e3050]/30" />
                        <Link
                          href={featuredEvent.registrationLink}
                          target={
                            featuredEvent.registrationLink.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            featuredEvent.registrationLink.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="inline-flex items-center gap-1.5 text-[16px] font-bold hover:text-blue-800 transition-colors"
                        >
                          Inscrição <FileEdit className="w-4 h-4 ml-1" />
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
