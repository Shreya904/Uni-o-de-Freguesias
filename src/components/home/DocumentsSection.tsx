"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Download, FileText } from "lucide-react";
import { deriveDocumentPreviewUrl } from "@/lib/utils";
import { CmsDocumentItem, fetchPublishedDocuments } from "@/lib/cms";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import EmptyState from "@/components/ui/emptystate";

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("pt-PT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

const DocumentsSection = () => {
  const [homeDocuments, setHomeDocuments] = useState<CmsDocumentItem[]>([]);
  const [activeDocId, setActiveDocId] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadDocuments = async () => {
      try {
        const items = await fetchPublishedDocuments(8);
        if (isMounted) setHomeDocuments(items);
      } catch {
        if (isMounted) setHomeDocuments([]);
      }
    };

    void loadDocuments();

    return () => {
      isMounted = false;
    };
  }, []);

  const activeDoc = useMemo(
    () => homeDocuments.find((doc) => doc.id === activeDocId) ?? null,
    [activeDocId, homeDocuments],
  );

  const isEmpty = homeDocuments.length === 0;

  return (
    <section className="section-padding bg-background">
      <div className="container max-w-7xl mx-auto">
        {/* HEADER */}
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

        {/* ✅ EMPTY STATE */}
        {isEmpty ? (
          <EmptyState
            title="Sem documentos disponíveis"
            description="Ainda não existem documentos publicados. Volte em breve para consultar a documentação."
            primaryAction={{
              label: "Ir para documentação",
              href: "/institucional/documentacao",
            }}
          />
        ) : (
          /* CAROUSEL */
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

                    <p className="text-xs text-muted-foreground mb-3">
                      Data: {formatDate(doc.date)}
                    </p>

                    <div className="mt-auto flex items-center justify-between gap-3 relative z-10">
                      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground break-all">
                        <FileText className="w-3.5 h-3.5 text-accent" /> {doc.docName}
                      </span>

                      <Button
                        size="sm"
                        className="bg-foreground text-white hover:bg-foreground/90"
                        asChild
                      >
                        <a
                          href={doc.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
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
        )}

        {/* MOBILE CTA */}
        <Link
          href="/institucional/documentacao"
          className="md:hidden flex items-center justify-center gap-1.5 mt-8 text-sm font-medium text-primary"
        >
          Ver todas <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* PREVIEW MODAL */}
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
              >
                <path d="M18 6L6 18" />
                <path d="M6 6l12 12" />
              </svg>
            </button>

            <iframe
              src={deriveDocumentPreviewUrl(activeDoc.sourceUrl)}
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
