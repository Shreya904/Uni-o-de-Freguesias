import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, FileText, Download } from "lucide-react";

type DocumentItem = {
  id: string;
  title: string;
  type: string;
  date: string;
  status: "Publicado" | "Rascunho";
};

// Template data. This will be replaced by CMS document entries.
const documents: DocumentItem[] = [
  {
    id: "ata-001",
    title: "Ata da Assembleia - Janeiro 2026",
    type: "Ata",
    date: "2026-01-28",
    status: "Publicado",
  },
  {
    id: "edital-004",
    title: "Edital de Consulta Publica",
    type: "Edital",
    date: "2026-03-04",
    status: "Publicado",
  },
  {
    id: "reg-002",
    title: "Regulamento de Utilizacao de Espacos",
    type: "Regulamento",
    date: "2026-02-16",
    status: "Rascunho",
  },
];

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("pt-PT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

export default function DocumentacaoPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="relative bg-primary py-20 md:py-28">
          <div className="container max-w-6xl mx-auto px-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground text-sm mb-5"
            >
              <ArrowLeft className="w-4 h-4" /> Voltar ao início
            </Link>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Documentacao
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-3xl">
              Arquivo institucional com documentos oficiais da Junta e da Assembleia.
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 gap-5">
              {documents.map((doc) => (
                <Card key={doc.id} className="border-border/80">
                  <CardHeader>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <Badge variant="secondary">{doc.type}</Badge>
                      <Badge variant={doc.status === "Publicado" ? "default" : "outline"}>
                        {doc.status}
                      </Badge>
                    </div>
                    <CardTitle className="font-display text-xl">{doc.title}</CardTitle>
                    <CardDescription>Data: {formatDate(doc.date)}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <FileText className="w-4 h-4 text-accent" />
                      Documento em formato template. Origem final: CMS.
                    </p>
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary opacity-70 cursor-not-allowed"
                      disabled
                    >
                      <Download className="w-4 h-4" /> Download
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
