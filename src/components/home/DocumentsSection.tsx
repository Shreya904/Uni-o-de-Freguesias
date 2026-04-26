"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Download, FileText } from "lucide-react";

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
  docName: string;
  date: string;
  previewUrl: string;
  downloadUrl: string;
};

// Template data. This will be replaced by CMS document entries.
const homeDocuments: HomeDocumentItem[] = [
  {
    id: "ata-001",
    title: "Ata da Assembleia - Janeiro 2026",
    docName: "Ata_Assembleia_Janeiro_2026.pdf",
    date: "2026-01-28",
    previewUrl: "https://drive.google.com/file/d/1t_IKnEP0FddArhM4LQ7EFMKvAYVc5NLj/preview",
    downloadUrl: "https://drive.google.com/file/d/1t_IKnEP0FddArhM4LQ7EFMKvAYVc5NLj/view",
  },
  {
    id: "edital-004",
    title: "Edital de Consulta Publica",
    docName: "Edital_Consulta_Publica_004.pdf",
    date: "2026-03-04",
    previewUrl: "https://drive.google.com/file/d/1t_IKnEP0FddArhM4LQ7EFMKvAYVc5NLj/preview",
    downloadUrl: "https://drive.google.com/file/d/1t_IKnEP0FddArhM4LQ7EFMKvAYVc5NLj/view",
  },
  {
    id: "reg-002",
    title: "Regulamento de Utilizacao de Espacos",
    docName: "Regulamento_Utilizacao_Espacos_002.pdf",
    date: "2026-02-16",
    previewUrl: "https://drive.google.com/file/d/1t_IKnEP0FddArhM4LQ7EFMKvAYVc5NLj/preview",
    downloadUrl: "https://drive.google.com/file/d/1t_IKnEP0FddArhM4LQ7EFMKvAYVc5NLj/view",
  },
  {
    id: "orc-2026",
    title: "Resumo Orcamental 2026",
    docName: "Resumo_Orcamental_2026.pdf",
    date: "2026-01-12",
    previewUrl: "https://drive.google.com/file/d/1t_IKnEP0FddArhM4LQ7EFMKvAYVc5NLj/preview",
    downloadUrl: "https://drive.google.com/file/d/1t_IKnEP0FddArhM4LQ7EFMKvAYVc5NLj/view",
  },
  {
    id: "aviso-07",
    title: "Aviso de Atendimento Extraordinario",
    docName: "Aviso_Atendimento_Extraordinario_07.pdf",
    date: "2026-04-11",
    previewUrl: "https://drive.google.com/file/d/1t_IKnEP0FddArhM4LQ7EFMKvAYVc5NLj/preview",
    downloadUrl: "https://drive.google.com/file/d/1t_IKnEP0FddArhM4LQ7EFMKvAYVc5NLj/view",
  },
];

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("pt-PT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

const DocumentsSection = () => {
  const [activeDocId, setActiveDocId] = useState<string | null>(null);

  const activeDoc = useMemo(
    () => homeDocuments.find((doc) => doc.id === activeDocId) ?? null,
    [activeDocId],
  );

  return (
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
                <article className="relative h-full bg-card rounded-xl border p-5 flex flex-col">
                  <button
                    type="button"
                    onClick={() => setActiveDocId(doc.id)}
                    className="absolute inset-0 rounded-xl"
                    aria-label={`Abrir pré-visualização de ${doc.title}`}
                  />

                  <h3 className="font-display font-semibold text-foreground leading-snug line-clamp-2 mb-2">
                    {doc.title}
                  </h3>

                  <p className="text-xs text-muted-foreground mb-3">Data: {formatDate(doc.date)}</p>

                  <div className="mt-auto flex items-center justify-between gap-3 relative z-10">
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground break-all">
                      <FileText className="w-3.5 h-3.5 text-accent" /> {doc.docName}
                    </span>

                    <Button size="sm" asChild>
                      <a
                        href={doc.downloadUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(event) => event.stopPropagation()}
                        aria-label={`Download de ${doc.title}`}
                      >
                        <Download className="w-4 h-4 mr-1.5" /> Transferir
                      </a>
                    </Button>
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

      {activeDoc && (
        <div className="fixed inset-0 z-50 bg-black/70 p-4 md:p-8">
          <div className="relative w-full max-w-6xl h-full max-h-[92vh] mx-auto bg-card rounded-2xl border border-border/70 overflow-hidden shadow-2xl">
            <button
              type="button"
              onClick={() => setActiveDocId(null)}
              className="absolute top-3 right-3 z-10 inline-flex items-center justify-center w-9 h-9 rounded-full bg-background/90 border border-border hover:bg-background"
              aria-label="Fechar pré-visualização"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 text-foreground"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M18 6L6 18" />
                <path d="M6 6l12 12" />
              </svg>
            </button>

            <iframe
              src={activeDoc.previewUrl}
              title={`Pré-visualização de ${activeDoc.title}`}
              className="w-full h-full"
              allow="autoplay"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default DocumentsSection;
