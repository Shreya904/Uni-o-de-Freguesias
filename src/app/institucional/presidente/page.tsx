import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";

export default function PresidentePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="pt-6 pb-12 md:pt-8 md:pb-16">
          <div className="container max-w-4xl mx-auto px-4">

            {/* BREADCRUMB */}
            <Link
              href="/institucional/orgaos"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-6"
            >
              <ArrowLeft className="w-4 h-4" /> Organismo
            </Link>

            {/* TITLE */}
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">
              Presidência
            </h1>

            {/* PHOTO + TEXT */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <img
                src="/presidente.jpg"
                alt="Presidente da Junta"
                className="w-40 h-40 object-cover rounded-lg flex-shrink-0"
                width={160}
                height={160}
              />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>Bem-vindos à Página pública da União das Freguesias de Glória e Vera Cruz - Aveiro. Pelas suas potencialidades e consequente visibilidade em qualquer momento e a partir de qualquer lugar do território urbano da Cidade de Aveiro, na sua dimensão institucional, esta página torna-se mais acessível e interativa.</p>
                <p>Na Glória e na Vera Cruz, pela sua geografia, história, riqueza patrimonial, cultural e moldura humana única, evidencia-se parte importante da identidade secular da nossa cidade de Aveiro.</p>
                <p>Iniciado um novo mandato autárquico, que se estenderá de 2025 a 2029, o executivo desta União das Freguesias tem como objetivo principal de manter as suas políticas de proximidade, inovação, sustentabilidade, transparência e rigor orçamental.</p>
                <p>Não obstante, em respeito pelos princípios da boa governação e aplicação dos recursos do erário público, apostaremos fundamentalmente:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Numa Governação Participativa e transparente</li>
                  <li>Nos Espaços Públicos e na Mobilidade</li>
                  <li>Na Habitação e Coesão Social</li>
                  <li>Na Juventude e Família</li>
                  <li>Na Cultura no Desporto e Associativismo</li>
                  <li>No Ambiente e na Sustentabilidade</li>
                  <li>Na economia Local e no Emprego</li>
                  <li>E na preservação do património</li>
                </ul>
                <p>Esta página permite ainda que se disponibilizem os dados Institucionais, nomeadamente os nossos serviços (horários, locais e valências), informações úteis aos nossos cidadãos, e também uma mais célere a divulgação dos eventos que protagonizamos ou aos quais nos associamos.</p>
                <p>Privilegiando sempre o contacto próximo, humano e igualitário, a União das Freguesias de Glória e Vera Cruz abre assim uma janela no mundo virtual através de uma página que se pretende útil, dinâmica e amigável.</p>
                <p>Cordialmente,</p>
                <p className="font-bold text-foreground">Bruno José Ferreira</p>
                <p>Presidente da União das Freguesias de Glória e Vera Cruz</p>
              </div>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}