import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquareQuote, Users, FileText, Wallet, ArrowRight } from "lucide-react";

const sections = [
  {
    title: "Mensagem do Presidente",
    href: "/institucional/presidente",
    description: "Visao estrategica, prioridades do mandato e compromissos com a comunidade.",
    icon: MessageSquareQuote,
  },
  {
    title: "Orgaos Autarquicos",
    href: "/institucional/orgaos",
    description: "Composicao dos orgaos, pelouros e responsabilidades institucionais.",
    icon: Users,
  },
  {
    title: "Documentacao",
    href: "/institucional/documentacao",
    description: "Atas, editais, regulamentos e outros documentos oficiais da freguesia.",
    icon: FileText,
  },
  {
    title: "Informacao Financeira",
    href: "/institucional/financeira",
    description: "Orcamento, execucao e indicadores financeiros para transparencia publica.",
    icon: Wallet,
  },
];

export default function InstitucionalPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="relative bg-primary py-20 md:py-28">
          <div className="container max-w-6xl mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Institucional
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-3xl mx-auto">
              Estrutura institucional, documentos oficiais e informacao de gestao publica da Uniao
              de Freguesias.
            </p>
          </div>
        </section>

        <section className="section-padding bg-section-alt">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sections.map((section) => (
                <Card key={section.href} className="h-full border-border/80">
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-3">
                      Area Institucional
                    </Badge>
                    <section.icon className="w-7 h-7 text-accent mb-2" />
                    <CardTitle className="font-display text-xl">{section.title}</CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link
                      href={section.href}
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                    >
                      Abrir pagina <ArrowRight className="w-4 h-4" />
                    </Link>
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
