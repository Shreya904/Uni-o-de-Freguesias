"use client";

import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FileText, Download } from "lucide-react";
import { deriveDocumentPreviewUrl } from "@/lib/utils";
import { CmsDocumentItem, fetchPublishedDocuments } from "@/lib/cms";
import EmptyState from "@/components/ui/emptystate";

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("pt-PT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

export default function DocumentacaoPage() {
  const [activeDocId, setActiveDocId] = useState<string | null>(null);
  const [documents, setDocuments] = useState<CmsDocumentItem[]>([]);

  useEffect(() => {
    let isMounted = true;

    const loadDocuments = async () => {
      try {
        const items = await fetchPublishedDocuments();
        if (isMounted) setDocuments(items);
      } catch {
        if (isMounted) setDocuments([]);
      }
    };

    void loadDocuments();

    return () => {
      isMounted = false;
    };
  }, []);

  const activeDoc = useMemo(
    () => documents.find((doc) => doc.id === activeDocId) ?? null,
    [activeDocId, documents],
  );

  const isEmpty = documents.length === 0;

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        <section className="section-padding bg-section-alt">
          <div className="container max-w-6xl mx-auto px-4">
            {/* HEADER */}
            <div className="text-center mb-10">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">
                Documentacao
              </h1>
              <p className="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto">
                Arquivo institucional com documentos oficiais da Junta e da Assembleia.
              </p>
            </div>

            {/* ✅ EMPTY STATE */}
            {isEmpty ? (
              <EmptyState
                title="Sem documentos disponíveis"
                description="Ainda não existem documentos publicados. Volte em breve para consultar a documentação."
                primaryAction={{
                  label: "Ir para página inicial",
                  href: "/",
                }}
              />
            ) : (
              /* GRID */
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {documents.map((doc) => (
                  <article
                    key={doc.id}
                    className="bg-card rounded-2xl border border-border/80 p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveDocId(doc.id)}
                      className="text-left w-full"
                      aria-label={`Abrir pré-visualização de ${doc.title}`}
                    >
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                        <FileText className="w-3.5 h-3.5 text-accent" />
                        {formatDate(doc.date)}
                      </div>

                      <h2 className="font-display text-xl font-semibold text-foreground leading-snug mb-2">
                        {doc.title}
                      </h2>

                      <p className="text-sm text-muted-foreground mb-5 break-all">{doc.docName}</p>
                    </button>

                    <div className="pt-2 border-t border-border/70">
                      <a
                        href={doc.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                      >
                        <Download className="w-4 h-4" /> Transferir
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

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
      </main>

      <Footer />
    </div>
  );
}
