import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, MapPin, FileEdit } from "lucide-react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import EventGallery from "@/components/EventGallery"; // <-- Imported the new component
import RichTextRenderer from "@/components/RichTextRenderer";
import { fetchEventBySlug, fetchPublishedEvents } from "@/lib/cms";

// --- HELPER: FORMAT DATES ---
const formatEventDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("pt-PT", { month: "long" });
  const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
  const year = date.getFullYear();
  return `${day} ${capitalizedMonth} ${year}`;
};

export async function generateStaticParams() {
  const events = await fetchPublishedEvents();
  return events.map((event: { slug: string }) => ({
    slug: event.slug,
  }));
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const eventItem = await fetchEventBySlug(slug);
  const allEvents = await fetchPublishedEvents(4);

  if (!eventItem) notFound();

  const otherEvents = allEvents.filter((e: any) => e.id !== eventItem.id).slice(0, 3);
  const finalDisplayDate =
    eventItem.displayDate || (eventItem.date ? formatEventDate(eventItem.date) : "");

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors">
      {/* WRAPPED HEADER & BLUE BAR */}
      <div className="relative z-50">
        <div className="bg-[#253e6b]">
          <Header />
          <Link
            href="/eventos"
            className="container max-w-[1400px] mx-auto px-6 py-3 flex items-center gap-2 text-sm font-semibold text-white hover:text-blue-200 transition-colors"
          >
            <span>{"<"}</span>
            <span>Agenda</span>
          </Link>
        </div>
      </div>

      <main className="py-12 md:py-16">
        <div className="container max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* LEFT MAIN ARTICLE */}
            <div className="lg:col-span-8">
              {/* Category Tag */}
              <div className="mb-4 inline-block bg-gray-100 dark:bg-gray-800 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#253e6b] dark:text-blue-300 rounded-sm">
                {eventItem.categoryTop}
              </div>

              {/* Title */}
              <h1 className="text-[#253e6b] dark:text-white text-[32px] md:text-[44px] font-extrabold leading-[1.15] mb-8">
                {eventItem.title}
              </h1>

              {/* Sleek Meta Info Box (Date, Time, Location) */}
              <div className="flex flex-col md:flex-row bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm mb-10 overflow-hidden divide-y md:divide-y-0 md:divide-x divide-gray-100 dark:divide-gray-800">
                <div className="flex-1 p-5 flex items-center gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-full text-[#253e6b] dark:text-blue-400">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[11px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-0.5">
                      Data
                    </p>
                    <p className="text-[#1c2841] dark:text-white font-bold text-sm md:text-base leading-snug">
                      {finalDisplayDate}
                    </p>
                  </div>
                </div>
                <div className="flex-1 p-5 flex items-center gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-full text-[#253e6b] dark:text-blue-400">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[11px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-0.5">
                      Hora
                    </p>
                    <p className="text-[#1c2841] dark:text-white font-bold text-sm md:text-base leading-snug">
                      {eventItem.time}
                    </p>
                  </div>
                </div>
                <div className="flex-1 p-5 flex items-center gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-full text-[#253e6b] dark:text-blue-400">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[11px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-0.5">
                      Local
                    </p>
                    <p className="text-[#1c2841] dark:text-white font-bold text-sm md:text-base leading-snug">
                      {eventItem.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Rich Text Description (Moved BEFORE Main Image) */}
              <div className="mb-10">
                <RichTextRenderer
                  content={eventItem.description}
                  className="rich-text-container text-[16px] md:text-[18px] text-[#1c2841]/90 dark:text-white/90 font-medium"
                />
              </div>

              {/* Main Image */}
              {eventItem.mainImage && (
                <div className="mb-12 w-full overflow-hidden rounded-md border border-gray-200 dark:border-gray-800">
                  <img
                    src={eventItem.mainImage}
                    alt={eventItem.title}
                    className="w-full h-auto object-cover block"
                  />
                </div>
              )}

              {/* Registration Link / CTA */}
              {eventItem.registrationLink && (
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
                  <Link
                    href={eventItem.registrationLink}
                    target={eventItem.registrationLink.startsWith("http") ? "_blank" : "_self"}
                    className="inline-flex items-center gap-2 bg-[#253e6b] dark:bg-blue-600 text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-[#1c2841] dark:hover:bg-blue-700 transition-colors"
                  >
                    <FileEdit className="w-5 h-5" />
                    Inscreva-se neste evento
                  </Link>
                </div>
              )}

              {/* Gallery Component */}
              <EventGallery images={eventItem.galleryImages} />
            </div>

            {/* RIGHT SIDEBAR */}
            <aside className="lg:col-span-4 mt-12 lg:mt-0 flex flex-col">
              {/* Other Events List */}
              <div className="mb-10">
                <h3 className="font-extrabold text-[#253e6b] dark:text-white text-sm uppercase tracking-wide mb-8">
                  Outros Eventos
                </h3>
                <div className="space-y-8">
                  {otherEvents.map((item: any) => (
                    <Link key={item.id} href={`/eventos/${item.slug}`} className="block group">
                      <article className="flex flex-col gap-3">
                        {item.mainImage && (
                          <div className="w-full rounded-md overflow-hidden border border-gray-100 dark:border-gray-800">
                            <img
                              src={item.mainImage}
                              alt={item.title}
                              className="w-full h-auto block object-cover aspect-video group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <h4 className="text-[#253e6b] dark:text-blue-300 text-[18px] font-extrabold leading-tight underline decoration-2 underline-offset-[5px] group-hover:text-blue-800 dark:group-hover:text-blue-400 transition-colors mt-2">
                          {item.title}
                        </h4>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 dark:text-gray-400 font-semibold mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {item.displayDate || (item.date && formatEventDate(item.date))}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {item.location}
                          </span>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </div>

              {/* SMALL RIGHT BANNER - Placed immediately beneath the events, sticking on scroll */}
              <div className="sticky top-8 mt-4">
                <div className="relative w-full h-[320px] overflow-hidden rounded-md border border-gray-300 dark:border-gray-800">
                  <img
                    src="/farmacia-banner.jpg"
                    alt="Procura uma farmácia?"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-[#46782a] px-5 py-5 rounded-md shadow-xl border border-white/20 w-full">
                      <h2 className="text-white font-extrabold text-[19px] leading-snug mb-2">
                        Procura uma farmácia?
                      </h2>
                      <p className="text-white/90 text-sm font-medium">
                        Visite a{" "}
                        <Link
                          href="/contactos-uteis"
                          className="underline decoration-2 underline-offset-4 hover:text-white transition-colors font-bold text-white"
                        >
                          Lista pública
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
