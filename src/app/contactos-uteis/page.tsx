import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, Clock, MapPin, ArrowRight } from "lucide-react";

type UsefulContact = {
  id: string;
  title: string;
  category: string;
  image: string;
  phone: string;
  email: string;
  address: string;
  scheduleLines: string[];
};

const usefulContacts: UsefulContact[] = [
  {
    id: "casa-comunidade-sustentavel",
    title: "Casa da Comunidade Sustentável",
    category: "Contactos",
    image: "/Casa da Comunidade Sustentável.jpg",
    phone: "+351 234 427 065",
    email: "servicos.fgloriavcruz@gmail.com",
    address: "Rua das Pombas Nº9/11, 3810-150 Aveiro (Apartado 84 ECAveiro)",
    scheduleLines: ["Seg–Sex: 09h00–12h30 | 14h00–17h30 (secretaria e cemitérios)."],
  },
  {
    id: "sede-instalacoes-provisorias",
    title: "Sede - Instalações Provisórias",
    category: "Contactos",
    image: "/Sede - Mudança Provisória de Instalações.webp",
    phone: "+351 234 427 832",
    email: "geral.fgloriavcruz@gmail.com",
    address: "Avenida Dr. Lourenço Peixinho, Edifício 15 - 1º B, 3800-164 Aveiro",
    scheduleLines: ["Seg–Sex: 09h00–12h30 | 14h00–17h30 (secretaria e cemitérios)."],
  },
];

export default function ContactosUteisPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* TITLE (centered + reduced whitespace) */}
        <div className="mt-8 mb-6 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            Contactos Úteis
          </h1>
          <div className="h-[2px] w-20 bg-primary mx-auto mt-3" />
        </div>

        <section className="section-padding pt-6">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {usefulContacts.map((contact) => (
                <Card key={contact.id} className="h-full border-border/80">
                  <div className="relative h-48 overflow-hidden rounded-t-xl border-b border-border/60">
                    <img
                      src={contact.image}
                      alt={contact.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <CardHeader>
                    <CardTitle className="font-display text-xl">{contact.title}</CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4 text-sm text-muted-foreground">
                    <p className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 mt-0.5 text-accent" />
                      {contact.address}
                    </p>

                    <p className="flex items-start gap-2">
                      <Phone className="w-4 h-4 mt-0.5 text-accent" />
                      {contact.phone}
                    </p>

                    <p className="flex items-start gap-2">
                      <Mail className="w-4 h-4 mt-0.5 text-accent" />
                      {contact.email}
                    </p>

                    <div className="rounded-lg border border-border/70 bg-muted/30 p-3">
                      <p className="flex items-center gap-2 font-medium text-foreground mb-2">
                        <Clock className="w-4 h-4 text-accent" />
                        Horários de Atendimento
                      </p>

                      <div className="space-y-1.5">
                        {contact.scheduleLines.map((line) => (
                          <p key={line}>{line}</p>
                        ))}
                        <p>Contabilidade por marcação.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA UPDATED */}
        <section className="section-padding bg-section-alt">
          <div className="container max-w-3xl mx-auto px-4 text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
              Não encontrou o contacto certo?
            </h2>

            <p className="text-muted-foreground mb-6">
              Use o formulário de contacto e encaminharemos o seu pedido para o serviço competente.
            </p>

            <Button size="lg" asChild className="bg-foreground text-white hover:bg-foreground/90">
              <Link href="/contactos">
                Ir para o formulário de contacto
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
