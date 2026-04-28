import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Quote } from "lucide-react";

const presidentInfo = {
  name: "Bruno José Ferreira",
  role: "Presidente da Junta",
  term: "Mandato 2025-2029",
  messageTitle: "TEXTO - Mensagem do Presidente",
  messageDescription:
    "Bem vindos à Página pública da União das Freguesias de Glória e Vera Cruz - Aveiro.",
};

export default function PresidentePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="pt-6 pb-12 md:pt-8 md:pb-16">
          <div className="container max-w-6xl mx-auto px-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-5"
            >
              <ArrowLeft className="w-4 h-4" /> Voltar ao início
            </Link>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              Mensagem do Presidente
            </h1>
            <p className="text-muted-foreground mb-8">
              {presidentInfo.name} · {presidentInfo.role}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
              <aside className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden border border-border/80 bg-card">
                  <img
                    src="/presidente.jpg"
                    alt="Presidente da Junta"
                    className="w-full h-[360px] md:h-[520px] object-cover"
                    width={900}
                    height={1200}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                    <p className="font-display text-xl font-semibold text-white">
                      {presidentInfo.name}
                    </p>
                    <p className="text-white/80 text-sm">{presidentInfo.role}</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  <Button asChild>
                    <Link href="/contactos">Contacto Geral</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/institucional/documentacao">Consultar Documentacao</Link>
                  </Button>
                </div>
              </aside>

              <article className="lg:col-span-7 bg-card rounded-2xl border p-6 md:p-8">
                <Quote className="w-10 h-10 text-accent/70 mb-4" />
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                  {presidentInfo.messageTitle}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {presidentInfo.messageDescription}
                </p>

                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Pelas suas potencialidades e consequente visibilidade em qualquer momento e a
                    partir de qualquer lugar do território urbano da Cidade de Aveiro, na sua
                    dimensão institucional, esta página torna-se mais acessível e interativa.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Na Glória e na Vera Cruz, pela sua geografia, história, riqueza patrimonial,
                    cultural e moldura humana única, evidencia-se parte importante da identidade
                    secular da nossa cidade de Aveiro.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Iniciado um novo mandato autárquico, que se estenderá de 2025 a 2029, o
                    executivo desta União das Freguesias tem como objetivo principal de melhorar as
                    suas políticas de proximidade, inovação, sustentabilidade, transparência e rigor
                    orçamental.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Não obstante, em respeito pelos princípios da boa governação e aplicação dos
                    recursos do erário público, apostaremos fundamentalmente:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
                    <li>Numa Governação Participativa e transparente</li>
                    <li>Nos Espaços Públicos e na Mobilidade</li>
                    <li>Na Habitação e Coesão Social</li>
                    <li>Na Juventude e Família</li>
                    <li>Na Cultura no Desporto e Associativismo</li>
                    <li>No Ambiente e na Sustentabilidade</li>
                    <li>Na economia Local e no Emprego</li>
                    <li>E na preservação do património</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed">
                    Esta página permite ainda que se disponibilizem os dados Institucionais,
                    nomeadamente os nossos serviços (horários, locais e valências), informações
                    úteis aos nossos cidadãos, e também uma mais célere a divulgação dos eventos que
                    protagonizamos ou aos quais nos associamos.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Privilegiando sempre o contacto próximo, humano e igualitário, a União das
                    Freguesias de Glória e Vera Cruz abre assim uma janela no mundo virtual através
                    de uma página que se pretende útil, dinâmica e amigável.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">Cordialmente,</p>
                  <p className="text-muted-foreground leading-relaxed">Bruno José Ferreira</p>
                  <p className="text-muted-foreground leading-relaxed">
                    Presidente da União das Freguesias de Glória e Vera Cruz
                  </p>
                </div>

                <p className="text-sm text-muted-foreground/90 mt-6">
                  {presidentInfo.name} · {presidentInfo.term}
                </p>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
