import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { Vote, MessageSquare, Lightbulb, Users, FileCheck } from "lucide-react";

const features = [
  {
    icon: Lightbulb,
    title: "Propostas da Comunidade",
    description:
      "Submeta ideias para melhorar a nossa freguesia. As melhores propostas serão avaliadas e implementadas.",
  },
  {
    icon: Vote,
    title: "Consultas Públicas",
    description: "Participe em inquéritos e consultas sobre decisões que afetam a comunidade.",
  },
  {
    icon: MessageSquare,
    title: "Debates e Fóruns",
    description: "Contribua para discussões moderadas sobre temas relevantes para a freguesia.",
  },
  {
    icon: Users,
    title: "Assembleias",
    description: "Acompanhe as sessões da assembleia e participe nas intervenções públicas.",
  },
  {
    icon: FileCheck,
    title: "Petições Locais",
    description: "Crie ou apoie petições sobre questões importantes para os moradores.",
  },
];

const ParticipacaoPage = () => (
  <div className="min-h-screen">
    <Header />
    <main>
      <section className="relative bg-primary py-20 md:py-28">
        <div className="container max-w-5xl mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Participação Cívica
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            A sua voz conta. Participe ativamente nas decisões que moldam o futuro da nossa
            freguesia.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-card rounded-xl border p-6">
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                  <f.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-section-alt">
        <div className="container max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-2xl font-bold text-foreground mb-3">
            Tem uma questão ou sugestão?
          </h2>
          <p className="text-muted-foreground mb-6">
            Utilize o nosso formulário de contacto para enviar a sua questão diretamente aos
            serviços competentes.
          </p>
          <Link
            href="/contactos"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground px-6 py-2.5 hover:bg-primary/90 transition-colors"
          >
            Contacte-nos
          </Link>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default ParticipacaoPage;
