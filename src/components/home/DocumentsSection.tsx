import Link from "next/link";
import { ArrowRight, Download, FileText } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type HomeDocumentItem = {
  id: string;
  title: string;
  type: string;
  date: string;
  status: "Publicado" | "Rascunho";
  summary: string;
  downloadUrl?: string;
};

// Template data. This will be replaced by CMS document entries.
const homeDocuments: HomeDocumentItem[] = [
  {
    id: "ata-001",
    title: "Ata da Assembleia - Janeiro 2026",
    type: "Ata",
    date: "2026-01-28",
    status: "Publicado",
    summary: "Deliberacoes e decisoes da reuniao ordinaria da Assembleia.",
    downloadUrl: "#",
  },
  {
    id: "edital-004",
    title: "Edital de Consulta Publica",
    type: "Edital",
    date: "2026-03-04",
    status: "Publicado",
    summary: "Abertura de periodo de participacao publica para proposta local.",
    downloadUrl: "#",
  },
  {
    id: "reg-002",
    title: "Regulamento de Utilizacao de Espacos",
    type: "Regulamento",
    date: "2026-02-16",
    status: "Rascunho",
    summary: "Normas de uso e criterios para cedencia de espacos municipais.",
  },
  {
    id: "orc-2026",
    title: "Resumo Orcamental 2026",
    type: "Financeiro",
    date: "2026-01-12",
    status: "Publicado",
    summary: "Principais rubricas de receita e despesa para o ano em curso.",
    downloadUrl: "#",
  },
  {
    id: "aviso-07",
    title: "Aviso de Atendimento Extraordinario",
    type: "Aviso",
    date: "2026-04-11",
    status: "Publicado",
    summary: "Atualizacao temporaria de horarios e canais de atendimento.",
    downloadUrl: "#",
  },
];

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("pt-PT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

const DocumentsSection = () => (
  <section className="section-padding bg-background">
    <div className="container max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-10">
        <div>
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Documentos
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
            Documentacao em Destaque
          </h2>
        </div>
        <Link
          href="/institucional/documentacao"
          className="hidden md:flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          Ver todas <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <Carousel opts={{ align: "start", loop: false }} className="w-full">
        <CarouselContent>
          {homeDocuments.map((doc) => (
            <CarouselItem key={doc.id} className="sm:basis-1/2 lg:basis-1/3">
              <article className="h-full bg-card rounded-xl border p-5 flex flex-col">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Badge variant="secondary">{doc.type}</Badge>
                  <Badge variant={doc.status === "Publicado" ? "default" : "outline"}>
                    {doc.status}
                  </Badge>
                </div>

                <h3 className="font-display font-semibold text-foreground leading-snug line-clamp-2 mb-2">
                  {doc.title}
                </h3>

                <p className="text-xs text-muted-foreground mb-3">Data: {formatDate(doc.date)}</p>

                <p className="text-sm text-muted-foreground line-clamp-2 mb-5">{doc.summary}</p>

                <div className="mt-auto flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <FileText className="w-3.5 h-3.5 text-accent" /> Documento oficial
                  </span>

                  {doc.downloadUrl && doc.status === "Publicado" ? (
                    <Button size="sm" asChild>
                      <a href={doc.downloadUrl} aria-label={`Download de ${doc.title}`}>
                        <Download className="w-4 h-4 mr-1.5" /> Download
                      </a>
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" disabled>
                      <Download className="w-4 h-4 mr-1.5" /> Indisponivel
                    </Button>
                  )}
                </div>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="hidden md:inline-flex" />
        <CarouselNext className="hidden md:inline-flex" />
      </Carousel>

      <Link
        href="/institucional/documentacao"
        className="md:hidden flex items-center justify-center gap-1.5 mt-8 text-sm font-medium text-primary"
      >
        Ver todas <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  </section>
);

export default DocumentsSection;
