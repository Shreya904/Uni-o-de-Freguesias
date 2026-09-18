import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Wallet, TrendingUp, Landmark } from "lucide-react";

type FinancialIndicator = {
  id: string;
  label: string;
  value: string;
  period: string;
  trend: string;
};

// Template data. This will be replaced by CMS/financial feed.
const indicators: FinancialIndicator[] = [
  {
    id: "orcamento-anual",
    label: "Orcamento Anual",
    value: "EUR 1.250.000",
    period: "2026",
    trend: "Aprovado",
  },
  {
    id: "execucao-receita",
    label: "Execucao de Receita",
    value: "74%",
    period: "Ate T3 2026",
    trend: "+6% face ao periodo anterior",
  },
  {
    id: "execucao-despesa",
    label: "Execucao de Despesa",
    value: "69%",
    period: "Ate T3 2026",
    trend: "Em linha com plano",
  },
];

export default function FinanceiraPage() {
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
              Informacao Financeira
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-3xl">
              Indicadores financeiros para reforco da transparencia e acompanhamento publico.
            </p>
          </div>
        </section>

        <section className="section-padding bg-section-alt">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {indicators.map((item, index) => (
                <Card key={item.id} className="h-full border-border/80">
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-3">
                      {item.period}
                    </Badge>
                    {index === 0 ? (
                      <Wallet className="w-7 h-7 text-accent mb-2" />
                    ) : index === 1 ? (
                      <TrendingUp className="w-7 h-7 text-accent mb-2" />
                    ) : (
                      <Landmark className="w-7 h-7 text-accent mb-2" />
                    )}
                    <CardTitle className="font-display text-xl">{item.label}</CardTitle>
                    <CardDescription>{item.trend}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="font-display text-3xl font-bold text-foreground">{item.value}</p>
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
