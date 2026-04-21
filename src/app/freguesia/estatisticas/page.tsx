import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, House, GraduationCap, HeartPulse } from "lucide-react";

type StatItem = {
  id: string;
  label: string;
  value: string;
  context: string;
  icon: typeof Users;
};

// Template data. This will be replaced by CMS/statistical sources.
const statItems: StatItem[] = [
  {
    id: "habitantes",
    label: "População Residente",
    value: "12.450",
    context: "Estimativa atual",
    icon: Users,
  },
  {
    id: "agregados",
    label: "Agregados Familiares",
    value: "4.920",
    context: "Registos administrativos",
    icon: House,
  },
  {
    id: "escolaridade",
    label: "Taxa de Escolaridade",
    value: "94%",
    context: "Faixa etária obrigatória",
    icon: GraduationCap,
  },
  {
    id: "apoio-social",
    label: "Famílias Apoiadas",
    value: "320",
    context: "Programas locais",
    icon: HeartPulse,
  },
];

export default function FreguesiaEstatisticasPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="relative bg-primary py-20 md:py-28">
          <div className="container max-w-6xl mx-auto px-4">
            <Link
              href="/freguesia"
              className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground text-sm mb-5"
            >
              <ArrowLeft className="w-4 h-4" /> Voltar para Freguesia
            </Link>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Estatísticas
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-3xl">
              Indicadores demográficos e sociais para apoiar transparência e planeamento local.
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statItems.map((item) => (
                <Card key={item.id}>
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2">
                      Indicador
                    </Badge>
                    <item.icon className="w-7 h-7 text-accent mb-2" />
                    <CardTitle className="font-display text-base">{item.label}</CardTitle>
                    <CardDescription>{item.context}</CardDescription>
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
