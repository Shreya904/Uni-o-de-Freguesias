import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { FileText, MapPin, Calendar, HelpCircle, ClipboardList, CreditCard } from "lucide-react";

const services = [
  {
    icon: FileText,
    title: "Atestados e Certidões",
    description: "Requerimento de atestados de residência, certidões e outros documentos oficiais.",
    href: "#",
  },
  {
    icon: ClipboardList,
    title: "Requerimentos",
    description: "Submeta pedidos e requerimentos de forma digital, sem necessidade de deslocação.",
    href: "#",
  },
  {
    icon: MapPin,
    title: "Reportar Ocorrência",
    description: "Identifique problemas na via pública através do nosso mapa interativo.",
    href: "/mapa",
  },
  {
    icon: Calendar,
    title: "Agendar Atendimento",
    description: "Marque uma reunião presencial com os serviços da Junta de Freguesia.",
    href: "/agendar",
  },
  {
    icon: HelpCircle,
    title: "Centro de Ajuda",
    description: "Consulte as perguntas frequentes ou entre em contacto connosco.",
    href: "/faq",
  },
  {
    icon: CreditCard,
    title: "Pagamentos",
    description: "Realize pagamentos de taxas e serviços de forma segura e cómoda.",
    href: "#",
  },
];

const ServicosPage = () => (
  <div className="min-h-screen">
    <Header />
    <main>
      <section className="relative bg-primary py-20 md:py-28">
        <div className="container max-w-5xl mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Serviços Online
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Aceda aos serviços da Junta de Freguesia de forma rápida e cómoda, sem sair de casa.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <Link
                key={s.title}
                href={s.href}
                className="group bg-card rounded-xl border p-6 hover:shadow-md transition-all hover:border-primary/30"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <s.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Info banner */}
      <section className="section-padding bg-section-alt">
        <div className="container max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-2xl font-bold text-foreground mb-3">
            Precisa de ajuda?
          </h2>
          <p className="text-muted-foreground mb-6">
            Se tiver dificuldades com os serviços online, não hesite em contactar-nos. Estamos
            disponíveis para ajudar.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contactos"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground px-6 py-2.5 hover:bg-primary/90 transition-colors"
            >
              Contacte-nos
            </Link>
            <Link
              href="/faq"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-card px-6 py-2.5 hover:bg-muted transition-colors"
            >
              Ver FAQ
            </Link>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default ServicosPage;
