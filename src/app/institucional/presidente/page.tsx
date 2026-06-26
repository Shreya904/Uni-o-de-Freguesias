import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ChevronLeft } from "lucide-react";

export default function PresidentePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      {/* HEADER & SUB-HEADER WRAPPER */}
      <div className="relative w-full bg-[#243558]">
        {/* Header Layer */}
        <div className="relative z-50">
          <Header />
        </div>

        {/* Breadcrumb Layer */}
        <div className="relative z-10 py-6 px-4 sm:px-6">
          <div className="container max-w-6xl mx-auto flex items-center">
            <Link
              href="/institucional"
              className="flex items-center gap-2 text-[16px] font-bold text-white hover:text-gray-300 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              Organismo
            </Link>
          </div>
        </div>
      </div>

      <main className="flex-grow">
        <section className="pt-8 pb-16 md:pt-12 md:pb-20">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6">
            {/* TITLE */}
            <h1 className="font-display text-3xl md:text-[40px] font-extrabold text-[#243558] mb-10 tracking-wide">
              Presidência
            </h1>

            {/* PHOTO + TEXT LAYOUT */}
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start">
              {/* IMAGE */}
              <img
                src="/presidente.jpg"
                alt="Presidente da Junta"
                className="w-full max-w-[340px] h-auto object-cover rounded-[24px] flex-shrink-0 shadow-sm"
                width={340}
                height={450}
              />

              {/* TEXT CONTENT - Updated Color, Size, and Weight */}
              <div className="flex-1 space-y-5 text-[#243558] text-[16px] font-medium leading-[1.8]">
                <p>
                  Bem vindos à Página pública da União das Freguesias de Glória e Vera Cruz -
                  Aveiro. Pelas suas potencialidades e consequente visibilidade em qualquer momento
                  e a partir de qualquer lugar do território urbano da Cidade de Aveiro, na sua
                  dimensão institucional, esta página torna-se mais acessível e interativa.
                </p>
                <p>
                  Na Glória e na Vera Cruz, pela sua geografia, história, riqueza patrimonial,
                  cultural e moldura humana única, evidencia-se parte importante da identidade
                  secular da nossa cidade de Aveiro.
                  <br />
                  Iniciado um novo mandato autárquico, que se estenderá de 2025 a 2029, o executivo
                  desta União das Freguesias tem como objetivo principal de melhorar as suas
                  políticas de proximidade, inovação, sustentabilidade, transparência e rigor
                  orçamental.
                </p>
                <p>
                  Não obstante, em respeito pelos princípios da boa governação e aplicação dos
                  recursos do erário público, apostaremos fundamentalmente:
                </p>
                <ul className="list-disc pl-5 space-y-1 ml-2 marker:text-[#243558]">
                  <li>Numa Governação Participativa e transparente</li>
                  <li>Nos Espaços Públicos e na Mobilidade</li>
                  <li>Na Habitação e Coesão Social</li>
                  <li>Na Juventude e Família</li>
                  <li>Na Cultura no Desporto e Associativismo</li>
                  <li>No Ambiente e na Sustentabilidade</li>
                  <li>Na economia Local e no Emprego</li>
                  <li>E na preservação do património</li>
                </ul>
                <p>
                  Esta página permite ainda que se disponibilizem os dados Institucionais,
                  nomeadamente os nossos serviços (horários, locais e valências), informações úteis
                  aos nossos cidadãos, e também uma mais célere a divulgação dos eventos que
                  protagonizamos ou aos quais nos associamos.
                </p>
                <p>
                  Privilegiando sempre o contacto próximo, humano e igualitário, a União das
                  Freguesias de Glória e Vera Cruz abre assim uma janela no mundo virtual através de
                  uma página que se pretende útil, dinâmica e amigável.
                </p>
                <p className="pt-2">Cordialmente,</p>
                <div className="pt-1">
                  <p className="font-extrabold text-[#243558] text-[18px]">Bruno José Ferreira</p>
                  <p className="text-[15px] font-semibold">
                    Presidente da União das Freguesias de Glória e Vera Cruz
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
