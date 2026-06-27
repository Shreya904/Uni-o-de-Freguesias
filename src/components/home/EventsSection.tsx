"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FileEdit } from "lucide-react";
import EmptyState from "@/components/ui/emptystate";
import { motion } from "framer-motion";

// --- TYPES & INTERFACES ---
interface LatestEvent {
  id: string;
  title: string;
  description: string;
  dateStr: string;
  time: string;
  location: string;
  imageUrl: string;
  price: string;
  hasRegistration: boolean;
  registrationLink: string;
}

// Helper to format real CMS dates to match the "18 abril (domingo)" format
const formatFullDate = (value: string) => {
  try {
    const date = new Date(value);
    const day = date.getDate();
    const month = date.toLocaleDateString("pt-PT", { month: "long" });
    const weekday = date.toLocaleDateString("pt-PT", { weekday: "long" });
    return `${day} ${month} (${weekday})`;
  } catch {
    return value;
  }
};

const fallbackEvent: LatestEvent = {
  id: "fallback-1",
  title: "Campeonato Junior\nOs Cagaretes",
  description:
    "O Campeonato Júnior “Os Cagaretes” reuniu jovens atletas da região numa jornada dedicada ao desporto, convívio e participação comunitária, promovendo o espírito de equipa e a formação desportiva local.",
  dateStr: "18 abril (domingo)",
  time: "11:00",
  location: "Estádio Municipal",
  imageUrl: "/agenda-ex.png",
  price: "Gratuito",
  hasRegistration: true,
  registrationLink: "/balcao-digital/inscricoes",
};

// --- MOCK CMS FETCH FUNCTION ---
const fetchLatestEventFromCMS = async (): Promise<LatestEvent | null> => {
  try {
    // Fetch only the latest event (limit=1) and ensure images are populated (depth=1)
    const res = await fetch("/api/events?limit=1&depth=1&sort=-date");

    if (!res.ok) throw new Error("CMS fetch failed");

    const data = await res.json();

    if (data && data.docs && data.docs.length > 0) {
      const doc = data.docs[0];

      return {
        id: doc.id,
        title: doc.title,
        // Map the short excerpt for the card description
        description: doc.excerpt || "",
        // Use the displayDate if available, otherwise format the exact date
        dateStr: doc.displayDate || (doc.date ? formatFullDate(doc.date) : ""),
        time: doc.time || "",
        location: doc.location || "",
        imageUrl: doc.mainImage?.url || fallbackEvent.imageUrl,
        price: doc.priceType || "Gratuito",
        // Defaulting to true as per your UI requirement, or you could drive this via CMS later
        hasRegistration: true,
        // Keep standard link unless overridden in CMS
        registrationLink: doc.registrationLink || "/balcao-digital/inscricoes",
      };
    }

    return null;
  } catch (error) {
    console.warn("Failed to fetch latest event from CMS.");
    return null;
  }
};

const EventsSection = () => {
  const [latestEvent, setLatestEvent] = useState<LatestEvent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Toggle this to false once CMS is updated to handle errors via EmptyState
  const ENABLE_FALLBACK = true;

  useEffect(() => {
    let isMounted = true;

    const loadEvent = async () => {
      const eventData = await fetchLatestEventFromCMS();
      if (isMounted) {
        setLatestEvent(eventData);
        setIsLoading(false);
      }
    };

    void loadEvent();

    return () => {
      isMounted = false;
    };
  }, []);

  const isEmpty = !latestEvent;
  const showEmptyState = isEmpty && !ENABLE_FALLBACK;

  // Render CMS data if available, otherwise use fallback (if enabled)
  const displayEvent = !isEmpty ? latestEvent : fallbackEvent;

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* LEFT CONTENT */}
          <div className="flex-1 max-w-lg">
            <h2 className="text-[36px] md:text-[44px] leading-[1.15] font-bold text-[#1e3050] mb-4">
              Descubra o que
              <br />
              pode fazer na
              <br />
              nossa freguesia
            </h2>
            <h3 className="text-[22px] font-bold text-[#1e3050] mb-6">
              Visite a{" "}
              <Link
                href="/eventos"
                className="underline decoration-[3px] underline-offset-4 hover:text-primary transition-colors"
              >
                Agenda
              </Link>
            </h3>
            <p className="text-[16px] font-medium text-[#1e3050] leading-relaxed">
              O Centro de Documentação reúne regulamentos, editais, atas, formulários, documentos
              administrativos e outros conteúdos relacionados com a atividade da Junta de Freguesia.
              Utilize a pesquisa e os filtros disponíveis para encontrar rapidamente a informação ou
              documento que procura.
            </p>
          </div>

          {/* RIGHT CONTENT */}
          <div className="flex-1 w-full flex lg:justify-end">
            {isLoading ? (
              <div className="w-full max-w-[420px] lg:ml-auto h-[500px] animate-pulse bg-slate-100 rounded-lg border border-slate-200" />
            ) : showEmptyState ? (
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
                <div className="w-full h-[220px] mb-5 overflow-hidden border border-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={displayEvent.imageUrl}
                    alt={displayEvent.title.replace("\n", " ")}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Body */}
                <div>
                  <h4 className="text-[22px] font-bold text-[#1e3050] whitespace-pre-line leading-tight mb-3">
                    {displayEvent.title}
                  </h4>
                  <p className="text-[15px] font-medium text-[#1e3050] leading-relaxed mb-6">
                    {displayEvent.description}
                  </p>

                  {/* Details */}
                  <div className="space-y-2 text-[15px] mb-6">
                    <p className="text-[#1e3050]">
                      <span className="font-bold">Data:</span>{" "}
                      <span className="font-medium">{displayEvent.dateStr}</span>
                    </p>
                    <p className="text-[#1e3050]">
                      <span className="font-bold">Hora:</span>{" "}
                      <span className="font-medium">{displayEvent.time}</span>
                    </p>
                    <p className="text-[#1e3050]">
                      <span className="font-bold">Local:</span>{" "}
                      <span className="font-medium">{displayEvent.location}</span>
                    </p>
                  </div>

                  <hr className="border-[#1e3050]/20 border-t-2 mb-4" />

                  {/* Footer Elements (Link) */}
                  <Link
                    href={displayEvent.registrationLink}
                    className="inline-flex items-center gap-4 text-[#1e3050] hover:opacity-75 transition-opacity"
                  >
                    <span className="font-bold text-[16px]">{displayEvent.price}</span>
                    {displayEvent.hasRegistration && (
                      <>
                        <span className="w-0.5 h-5 bg-[#1e3050]/30"></span>
                        <span className="flex items-center gap-1.5 text-[16px] font-bold">
                          Inscrição <FileEdit className="w-4 h-4 ml-1" />
                        </span>
                      </>
                    )}
                  </Link>
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
