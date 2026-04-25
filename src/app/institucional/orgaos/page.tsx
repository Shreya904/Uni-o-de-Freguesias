import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Briefcase, Mail, Phone, Users2 } from "lucide-react";

type AssociateProfile = {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone?: string;
  photoUrl?: string;
  bio: string;
  tags: string[];
  featured?: boolean;
};

// Template data. This shape is CMS-ready and can be hydrated from API fields.
const associates: AssociateProfile[] = [
  {
    id: "executivo-ana-pereira",
    name: "Ana Pereira",
    role: "Coordenadora Executiva",
    department: "Executivo da Junta",
    email: "executivo@uniaofreguesias.pt",
    phone: "+351 210 000 101",
    photoUrl: "/presidente.jpg",
    bio: "Coordena a atividade executiva e o acompanhamento das prioridades anuais da freguesia.",
    tags: ["Governacao", "Planeamento"],
    featured: true,
  },
  {
    id: "assembleia-joao-carvalho",
    name: "Joao Carvalho",
    role: "Secretariado da Assembleia",
    department: "Assembleia de Freguesia",
    email: "assembleia@uniaofreguesias.pt",
    phone: "+351 210 000 102",
    bio: "Assegura suporte tecnico-administrativo as reunioes e aos processos deliberativos.",
    tags: ["Deliberacoes", "Apoio Juridico"],
  },
  {
    id: "apoio-sofia-martins",
    name: "Sofia Martins",
    role: "Tecnica de Atendimento",
    department: "Gabinete de Apoio ao Cidadao",
    email: "atendimento@uniaofreguesias.pt",
    phone: "+351 210 000 103",
    bio: "Presta informacao de proximidade e encaminha pedidos para os servicos competentes.",
    tags: ["Atendimento", "Servicos Online"],
  },
  {
    id: "obras-ricardo-lopes",
    name: "Ricardo Lopes",
    role: "Responsavel de Obras e Manutencao",
    department: "Gabinete Tecnico",
    email: "obras@uniaofreguesias.pt",
    bio: "Acompanha intervencoes no espaco publico e articulacao com equipas operacionais.",
    tags: ["Infraestruturas", "Manutencao"],
  },
  {
    id: "social-carla-santos",
    name: "Carla Santos",
    role: "Tecnica de Acao Social",
    department: "Gabinete de Acao Social",
    email: "social@uniaofreguesias.pt",
    phone: "+351 210 000 104",
    bio: "Dinamiza respostas locais de apoio social e acompanhamento de situacoes prioritarias.",
    tags: ["Apoio Social", "Proximidade"],
  },
];

const getInitials = (fullName: string) =>
  fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((namePart) => namePart[0]?.toUpperCase())
    .join("");

export default function OrgaosPage() {
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
              Orgaos Autarquicos
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-3xl">
              Conheca os principais elementos em funcoes institucionais e tecnicas por departamento.
            </p>
          </div>
        </section>

        <section className="section-padding bg-section-alt">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <Badge variant="secondary" className="mb-3">
                  Equipa Institucional
                </Badge>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  Perfis de dirigentes e tecnicos
                </h2>
              </div>
              <p className="text-sm text-muted-foreground max-w-xl">
                Esta listagem e um template para integracao com CMS, incluindo nome, cargo,
                departamento, contactos e nota biografica.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {associates.map((person) => (
                <Card
                  key={person.id}
                  className="h-full border-border/80 flex flex-col transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <CardHeader className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <Avatar className="h-14 w-14 border border-border/70">
                          <AvatarImage src={person.photoUrl} alt={person.name} />
                          <AvatarFallback className="text-sm font-semibold bg-muted text-foreground">
                            {getInitials(person.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <CardTitle className="font-display text-xl leading-tight truncate">
                            {person.name}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground truncate">{person.role}</p>
                        </div>
                      </div>
                      {person.featured ? <Badge>Destaque</Badge> : null}
                    </div>

                    <div className="inline-flex items-center gap-2 text-sm text-foreground">
                      <Briefcase className="w-4 h-4 text-accent" />
                      <span>{person.department}</span>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4 mt-auto">
                    <p className="text-sm text-muted-foreground leading-relaxed">{person.bio}</p>

                    <div className="flex flex-wrap gap-2">
                      {person.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="space-y-2 text-sm">
                      <a
                        href={`mailto:${person.email}`}
                        className="inline-flex items-center gap-2 text-primary hover:underline"
                      >
                        <Mail className="w-4 h-4" />
                        {person.email}
                      </a>
                      {person.phone ? (
                        <a
                          href={`tel:${person.phone.replaceAll(" ", "")}`}
                          className="inline-flex items-center gap-2 text-primary hover:underline"
                        >
                          <Phone className="w-4 h-4" />
                          {person.phone}
                        </a>
                      ) : null}
                    </div>

                    <div className="pt-1 flex items-center gap-2 text-sm font-medium text-foreground">
                      <Users2 className="w-4 h-4 text-accent" />
                      Perfil publico
                    </div>
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
