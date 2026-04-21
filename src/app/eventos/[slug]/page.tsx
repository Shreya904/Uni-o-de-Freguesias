import Link from "next/link";
import { notFound } from "next/navigation";
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

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="relative bg-primary py-16 md:py-20">
          <div className="container max-w-4xl mx-auto px-4">
            <Link
              href="/eventos"
              className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground text-sm mb-6"
            >
              <ArrowLeft className="w-4 h-4" /> Voltar para Eventos
            </Link>

            <div className="space-y-4">
              <Badge className="bg-accent/20 text-accent border-accent/30">{event.category}</Badge>
              <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground leading-tight">
                {event.title}
              </h1>
              <p className="text-primary-foreground/80 text-base md:text-lg max-w-3xl">
                {event.description}
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-section-alt">
          <div className="container max-w-4xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-card rounded-xl border p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Data</p>
                <p className="flex items-center gap-2 text-sm text-foreground font-medium">
                  <CalendarDays className="w-4 h-4 text-accent" /> {formatDate(event.date)}
                </p>
              </div>
              <div className="bg-card rounded-xl border p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
                  Horário
                </p>
                <p className="flex items-center gap-2 text-sm text-foreground font-medium">
                  <Clock className="w-4 h-4 text-accent" /> {event.time}
                </p>
              </div>
              <div className="bg-card rounded-xl border p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Local</p>
                <p className="flex items-center gap-2 text-sm text-foreground font-medium">
                  <MapPin className="w-4 h-4 text-accent" /> {event.location}
                </p>
              </div>
            </div>

            <article className="bg-card rounded-2xl border p-6 md:p-8 space-y-4">
              <h2 className="font-display text-2xl font-bold text-foreground">Sobre este evento</h2>
              <p className="text-muted-foreground leading-relaxed">
                Esta secção funciona como template para detalhe de evento vindo do CMS. Pode incluir
                descrição longa, programa, oradores, inscrições, anexos e outras informações.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                No momento da integração com CMS, este conteúdo deve ser substituído pelos campos
                ricos do evento correspondente ao slug.
              </p>
            </article>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/agendar">Marcar atendimento</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contactos">
                  Contactar organização <Share2 className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
