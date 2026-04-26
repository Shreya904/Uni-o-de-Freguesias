"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FileText, Download } from "lucide-react";
import { deriveDocumentPreviewUrl } from "@/lib/utils";

type DocumentItem = {
  id: string;
  title: string;
  docName: string;
  date: string;
  sourceUrl: string;
};

// Template data. This will be replaced by CMS document entries.
const documents: DocumentItem[] = [
  {
    id: "ata-001",
    title: "Ata da Assembleia - Janeiro 2026",
    docName: "Ata_Assembleia_Janeiro_2026.pdf",
    date: "2026-01-28",
    sourceUrl:
      "https://37734829-6d22-4c58-9181-3975325eb308.filesusr.com/ugd/1b8a70_86450d7d6120468a815751db3afe06ff.pdf",
  },
  {
    id: "edital-004",
    title: "Edital de Consulta Publica",
    docName: "Edital_Consulta_Publica_004.pdf",
    date: "2026-03-04",
    sourceUrl:
      "https://37734829-6d22-4c58-9181-3975325eb308.filesusr.com/ugd/1b8a70_86450d7d6120468a815751db3afe06ff.pdf",
  },
  {
    id: "reg-002",
    title: "Regulamento de Utilizacao de Espacos",
    docName: "Regulamento_Utilizacao_Espacos_002.pdf",
    date: "2026-02-16",
    sourceUrl:
      "https://37734829-6d22-4c58-9181-3975325eb308.filesusr.com/ugd/1b8a70_86450d7d6120468a815751db3afe06ff.pdf",
  },
];

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("pt-PT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

export default function DocumentacaoPage() {
  const [activeDocId, setActiveDocId] = useState<string | null>(null);

  const activeDoc = useMemo(
    () => documents.find((doc) => doc.id === activeDocId) ?? null,
    [activeDocId],
  );

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="section-padding bg-section-alt">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-10">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">
                Documentacao
              </h1>
              <p className="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto">
                Arquivo institucional com documentos oficiais da Junta e da Assembleia.
              </p>
            </div>

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
                      onClick={(event) => event.stopPropagation()}
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                    >
                      <Download className="w-4 h-4" /> Transferir
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

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
