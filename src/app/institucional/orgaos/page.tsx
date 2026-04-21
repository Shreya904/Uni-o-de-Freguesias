import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users } from "lucide-react";

type OrganBody = {
  id: string;
  name: string;
  summary: string;
  members: string[];
};

// Template data. This will be replaced by CMS content.
const bodies: OrganBody[] = [
  {
    id: "executivo",
    name: "Executivo da Junta",
    summary: "Responsavel pela gestao corrente e execucao das deliberacoes.",
    members: ["Presidente", "Secretario", "Tesoureiro"],
  },
  {
    id: "assembleia",
    name: "Assembleia de Freguesia",
    summary: "Orgao deliberativo e fiscalizador da atividade da Junta.",
    members: ["Presidencia da Mesa", "Representantes dos partidos", "Secretariado"],
  },
  {
    id: "gabinetes",
    name: "Gabinetes de Apoio",
    summary: "Unidades tecnicas e administrativas de suporte ao atendimento e projetos.",
    members: ["Atendimento", "Apoio Social", "Obras e Manutencao"],
  },
];

export default function OrgaosPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="relative bg-primary py-20 md:py-28">
          <div className="container max-w-6xl mx-auto px-4">
            <Link
              href="/institucional"
              className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground text-sm mb-5"
            >
              <ArrowLeft className="w-4 h-4" /> Voltar para Institucional
            </Link>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Orgaos Autarquicos
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-3xl">
              Estrutura de governanca local e equipas responsaveis pela atividade institucional.
            </p>
          </div>
        </section>

        <section className="section-padding bg-section-alt">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {bodies.map((body) => (
                <Card key={body.id} className="h-full border-border/80">
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-3">
                      Estrutura
                    </Badge>
                    <Users className="w-7 h-7 text-accent mb-2" />
                    <CardTitle className="font-display text-xl">{body.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">{body.summary}</p>
                    <ul className="space-y-1.5 text-sm text-foreground">
                      {body.members.map((member) => (
                        <li key={member} className="flex items-start gap-2">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent" />
                          <span>{member}</span>
                        </li>
                      ))}
                    </ul>
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
