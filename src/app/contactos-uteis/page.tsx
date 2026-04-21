import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Phone, Mail, Clock, MapPin, ArrowRight } from "lucide-react";

type UsefulContact = {
  id: string;
  department: string;
  category: string;
  phone: string;
  email: string;
  schedule: string;
  location: string;
  notes: string;
};

// Template data. This will be replaced by CMS content.
const usefulContacts: UsefulContact[] = [
  {
    id: "atendimento-geral",
    department: "Atendimento Geral",
    category: "Serviços Administrativos",
    phone: "+351 XXX XXX XXX",
    email: "atendimento@ufgvc.pt",
    schedule: "Seg-Sex, 09h00-17h00",
    location: "Edifício da Junta, Piso 0",
    notes: "Pedidos gerais, certificados e informações de balcão.",
  },
  {
    id: "urbanismo-obras",
    department: "Urbanismo e Obras",
    category: "Infraestruturas",
    phone: "+351 XXX XXX XXX",
    email: "obras@ufgvc.pt",
    schedule: "Seg-Sex, 09h00-16h30",
    location: "Edifício Técnico, Piso 1",
    notes: "Licenciamentos, manutenção de via pública e intervenções locais.",
  },
  {
    id: "acao-social",
    department: "Ação Social",
    category: "Apoio à Comunidade",
    phone: "+351 XXX XXX XXX",
    email: "social@ufgvc.pt",
    schedule: "Seg-Sex, 10h00-16h00",
    location: "Gabinete de Apoio Social",
    notes: "Apoio a famílias, encaminhamento social e respostas de proximidade.",
  },
  {
    id: "cultura-eventos",
    department: "Cultura e Eventos",
    category: "Programação Local",
    phone: "+351 XXX XXX XXX",
    email: "eventos@ufgvc.pt",
    schedule: "Seg-Sex, 09h30-17h30",
    location: "Casa da Cultura",
    notes: "Agenda cultural, inscrições e apoio logístico a iniciativas locais.",
  },
];

export default function ContactosUteisPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="relative bg-primary py-20 md:py-28">
          <div className="container max-w-6xl mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Contactos Úteis
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-3xl mx-auto">
              Encontre rapidamente os contactos dos departamentos e serviços mais relevantes da
              freguesia.
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {usefulContacts.map((contact) => (
                <Card key={contact.id} className="h-full border-border/80">
                  <CardHeader className="space-y-3">
                    <Badge variant="secondary" className="w-fit">
                      {contact.category}
                    </Badge>
                    <CardTitle className="font-display text-xl">{contact.department}</CardTitle>
                    <CardDescription>{contact.notes}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-muted-foreground">
                    <p className="flex items-start gap-2">
                      <Phone className="w-4 h-4 mt-0.5 text-accent" />
                      <span>{contact.phone}</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <Mail className="w-4 h-4 mt-0.5 text-accent" />
                      <span>{contact.email}</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <Clock className="w-4 h-4 mt-0.5 text-accent" />
                      <span>{contact.schedule}</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 mt-0.5 text-accent" />
                      <span>{contact.location}</span>
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-section-alt">
          <div className="container max-w-3xl mx-auto px-4 text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
              Não encontrou o contacto certo?
            </h2>
            <p className="text-muted-foreground mb-6">
              Use o formulário de contacto e encaminharemos o seu pedido para o serviço competente.
            </p>
            <Button size="lg" asChild>
              <Link href="/contactos">
                Ir para o formulário de contacto <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
