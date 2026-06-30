"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsHighlightBox from "@/components/NewsHighlightBox";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";

export default function FreguesiaPage() {
  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      {/* HERO WRAPPER */}
      <div className="relative w-full">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src="/freguesia-hero.jpg"
            alt="Vista da Freguesia"
            className="w-full h-full object-cover"
          />
          {/* Blue Overlay matching the design */}
          <div className="absolute inset-0 bg-[#1C2E56]/70 mix-blend-multiply" />
        </div>

        {/* Header Layer */}
        <div className="relative z-50">
          <Header />
        </div>

        {/* Hero Content Layer */}
        <section className="relative z-10 max-w-[1200px] mx-auto px-8 lg:px-16 pb-20 pt-10 dark:text-white">
          <div>
            <h1 className="text-white dark:text-white text-[48px] lg:text-[56px] font-extrabold leading-none tracking-wide mb-2">
              Freguesia
            </h1>
            <p className="text-white dark:text-white text-[24px] lg:text-[28px] font-bold tracking-wide">
              Comunidade & território
            </p>
          </div>
        </section>
      </div>

      <main className="flex-grow">
        {/* CONTENT SECTION */}
        <section className="px-8 lg:px-16 py-16 max-w-[1200px] mx-auto">
          <div className="grid lg:grid-cols-[300px_1fr] gap-16">
            {/* SIDEBAR */}
            <aside className="space-y-10">
              {/* Conhecer a Freguesia */}
              <div>
                <h3 className="font-extrabold text-[#1C2E56] text-[16px] mb-4 tracking-wide">
                  Conhecer a Freguesia
                </h3>
                <nav className="flex flex-col gap-3">
                  <Link
                    href="/freguesia/historia"
                    className="flex items-center gap-2 text-[#1C2E56] hover:text-[#B4142F] font-semibold text-[15px] transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-[#1C2E56]" />
                    História
                  </Link>
                  <Link
                    href="/freguesia/heraldica"
                    className="flex items-center gap-2 text-[#1C2E56] hover:text-[#B4142F] font-semibold text-[15px] transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-[#1C2E56]" />
                    Heráldica
                  </Link>
                  <Link
                    href="/freguesia/espacos"
                    className="flex items-center gap-2 text-[#1C2E56] hover:text-[#B4142F] font-semibold text-[15px] transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-[#1C2E56]" />A visitar
                  </Link>
                </nav>
              </div>

              {/* Viver a Freguesia */}
              <div>
                <h3 className="font-extrabold text-[#1C2E56] text-[16px] mb-4 tracking-wide">
                  Viver a Freguesia
                </h3>
                <nav className="flex flex-col gap-3">
                  <Link
                    href="/eventos"
                    className="flex items-center gap-2 text-[#1C2E56] hover:text-[#B4142F] font-semibold text-[15px] transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-[#1C2E56]" />
                    Agenda
                  </Link>
                  <Link
                    href="/contactos-uteis"
                    className="flex items-center gap-2 text-[#1C2E56] hover:text-[#B4142F] font-semibold text-[15px] transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-[#1C2E56]" />
                    Lista pública
                  </Link>
                </nav>
              </div>

              {/* FAQ Accordion */}
              <div className="pt-4">
                <h3 className="font-extrabold text-[#1C2E56] text-[18px] mb-4">
                  Perguntas frequentes
                </h3>
                <button className="w-full text-left bg-[#FDF6E3] border border-[#BFA55A] p-4 flex justify-between items-start gap-4 text-[#1C2E56] text-[14px] font-medium hover:bg-[#FCECD4] transition-colors rounded-[4px]">
                  <span className="leading-snug pr-2">
                    O que fazer se um ficheiro não abrir corretamente?
                  </span>
                  <ChevronDown className="w-4 h-4 shrink-0 mt-0.5" />
                </button>
              </div>

              <NewsHighlightBox variant="standard" />
            </aside>

            {/* MAIN CONTENT */}
            <div className="text-[#1C2E56]">
              <h2 className="text-[36px] lg:text-[42px] font-extrabold mb-8 tracking-wide leading-tight">
                Uma união de freguesias ligada à ria, à história e à identidade aveirense
              </h2>

              <div className="space-y-6 text-[15px] leading-relaxed mb-12">
                <p>
                  Conheça a estrutura organizativa, os serviços e a equipa da Junta de Freguesia,
                  bem como as diferentes áreas de atuação, iniciativas e projetos desenvolvidos em
                  proximidade com a comunidade. Esta página reúne informação sobre o executivo, os
                  serviços administrativos, o funcionamento institucional e o trabalho realizado
                  diariamente em apoio à população e ao território.
                </p>
                <p>
                  A Junta de Freguesia desempenha um papel de proximidade junto dos cidadãos,
                  assegurando o acompanhamento de necessidades locais, a gestão de diferentes
                  serviços e a promoção de iniciativas comunitárias, culturais e sociais. Através
                  desta área poderá consultar informações institucionais, contactos, competências,
                  horários de atendimento e outras informações relevantes relacionadas com a
                  atividade da junta.
                </p>
                <p>
                  O objetivo é promover uma relação mais transparente, acessível e próxima com a
                  comunidade, disponibilizando um espaço informativo dedicado à freguesia, aos seus
                  serviços e às pessoas que contribuem diariamente para o desenvolvimento e
                  bem-estar da população.
                </p>
              </div>

              {/* FEATURE BANNER (Green right-aligned box) */}
              <div className="relative rounded-xl overflow-hidden shadow-sm mb-12">
                <img
                  src="/farmacia-banner.jpg"
                  alt="Procura uma farmácia?"
                  className="w-full h-[350px] object-cover bg-gray-200"
                />

                {/* Right aligned, green background */}
                <div className="absolute right-5 bottom-5 bg-[#4A773C] text-white rounded-[4px] p-8 max-w-[340px] border-2 border-white">
                  <h3 className="font-bold text-[22px] mb-3 leading-tight">
                    Procura uma farmácia?
                  </h3>

                  <p className="text-[14px]">
                    Visite a{" "}
                    <Link
                      href="/contactos-uteis"
                      className="underline underline-offset-4 hover:text-gray-200 transition-colors"
                    >
                      Lista pública
                    </Link>
                  </p>
                </div>
              </div>

              {/* BOTTOM TEXT */}
              <div className="space-y-6 text-[15px] leading-relaxed">
                <p>
                  Conheça a estrutura organizativa, os serviços e a equipa da Junta de Freguesia,
                  bem como as diferentes áreas de atuação, iniciativas e projetos desenvolvidos em
                  proximidade com a comunidade. Esta página reúne informação sobre o executivo, os
                  serviços administrativos, o funcionamento institucional e o trabalho realizado
                  diariamente em apoio à população e ao território.
                </p>
                <p>
                  A Junta de Freguesia desempenha um papel de proximidade junto dos cidadãos,
                  assegurando o acompanhamento de necessidades locais, a gestão de diferentes
                  serviços e a promoção de iniciativas comunitárias, culturais e sociais. Através
                  desta área poderá consultar informações institucionais, contactos, competências,
                  horários de atendimento e outras informações relevantes relacionadas com a
                  atividade da junta.
                </p>
                <p>
                  O objetivo é promover uma relação mais transparente, acessível e próxima com a
                  comunidade, disponibilizando um espaço informativo dedicado à freguesia, aos seus
                  serviços e às pessoas que contribuem diariamente para o desenvolvimento e
                  bem-estar da população.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
