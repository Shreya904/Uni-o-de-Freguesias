import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, MapPin, ArrowLeft, Share2 } from "lucide-react";
import { eventItems } from "@/data/mockData";
import { slugify } from "@/lib/utils";

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

  // Temporary lookup for local mock data.
  // Replace this section with CMS fetching by slug.
  const event = eventItems.find((item) => slugify(item.title) === slug);

  if (!event) {
    notFound();
  }

  const galleryFromCMS = (event as { galleryImages?: string[] }).galleryImages ?? [];
  const galleryImages =
    galleryFromCMS.length > 0 ? galleryFromCMS : event.mainImage ? [event.mainImage] : [];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="bg-section-alt pt-3 pb-12 md:pt-4 md:pb-16">
          <div className="container max-w-6xl mx-auto px-4 space-y-6">
            <Link
              href="/eventos"
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <ArrowLeft className="w-4 h-4" /> Voltar para Eventos
            </Link>

            <article className="bg-card rounded-2xl border overflow-hidden shadow-sm">
              {event.mainImage && (
                <div className="relative w-full h-[32vh] min-h-[220px] sm:h-[38vh] md:h-[44vh] lg:h-[48vh] bg-muted/50">
                  <Image
                    src={event.mainImage}
                    alt={event.title}
                    fill
                    className="object-fill"
                    sizes="100vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/25 via-transparent to-transparent pointer-events-none" />
                </div>
              )}

              <div className="p-6 md:p-8 lg:p-10 space-y-5">
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <time>{formatDate(event.date)}</time>
                  <span className="inline-flex items-center rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                    {event.category}
                  </span>
                </div>

                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight">
                  {event.title}
                </h1>

                <p className="text-muted-foreground leading-relaxed whitespace-pre-line break-words">
                  {event.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="bg-background rounded-xl border p-4">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
                      Data
                    </p>
                    <p className="flex items-center gap-2 text-sm text-foreground font-medium">
                      <CalendarDays className="w-4 h-4 text-accent" /> {formatDate(event.date)}
                    </p>
                  </div>
                  <div className="bg-background rounded-xl border p-4">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
                      Horário
                    </p>
                    <p className="flex items-center gap-2 text-sm text-foreground font-medium">
                      <Clock className="w-4 h-4 text-accent" /> {event.time}
                    </p>
                  </div>
                  <div className="bg-background rounded-xl border p-4">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
                      Local
                    </p>
                    <p className="flex items-center gap-2 text-sm text-foreground font-medium">
                      <MapPin className="w-4 h-4 text-accent" /> {event.location}
                    </p>
                  </div>
                </div>
              </div>
              {galleryImages.length > 0 && (
                <div className="border-t p-6 md:p-8 lg:p-10 pt-6 space-y-4 bg-background/70">
                  <h2 className="font-display text-xl font-semibold text-foreground">Galeria</h2>
                  <div
                    className={`grid gap-4 ${
                      galleryImages.length === 1
                        ? "grid-cols-1"
                        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    }`}
                  >
                    {galleryImages.map((image, index) => (
                      <div
                        key={`${image}-${index}`}
                        className={`relative w-full rounded-xl overflow-hidden border border-border/70 ${
                          galleryImages.length === 1 ? "h-[320px] md:h-[420px]" : "aspect-[4/3]"
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`${event.title} ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </article>

            <div className="rounded-2xl border bg-card p-5 md:p-6 lg:p-7">
              <p className="font-display text-xl md:text-2xl font-semibold text-foreground mb-4">
                Precisa de apoio relacionado com este evento?
              </p>

              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/institucional/documentacao">Ver Documentação</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/contactos">
                    Contactar organização <Share2 className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
