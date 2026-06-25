"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";

export default function OrganismoPage() {
  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      {/* HERO WRAPPER */}
      <div className="relative w-full">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src="/organismo-hero.jpg"
            alt="Edifício da Junta"
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
        <section className="relative z-10 max-w-[1200px] mx-auto px-8 lg:px-16 pb-20 pt-10">
          <div>
            <h1 className="text-white text-[48px] lg:text-[56px] font-extrabold leading-none tracking-wide mb-2">
              Organismo
            </h1>
            <p className="text-white text-[24px] lg:text-[28px] font-bold tracking-wide">
              Gestão & proximidade
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
              {/* Conhecer a Junta */}
              <div>
                <h3 className="font-extrabold text-[#1C2E56] text-[16px] mb-4 tracking-wide">
                  Conhecer a Junta
                </h3>
                <nav className="flex flex-col gap-3">
                  <Link
                    href="/institucional/presidente"
                    className="flex items-center gap-2 text-[#1C2E56] hover:text-[#B4142F] font-semibold text-[15px] transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-[#1C2E56]" />
                    Presidência
                  </Link>
                  <Link
                    href="/institucional/orgaos"
                    className="flex items-center gap-2 text-[#1C2E56] hover:text-[#B4142F] font-semibold text-[15px] transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-[#1C2E56]" />
                    Executivo
                  </Link>
                  <Link
                    href="/institucional/assembleia"
                    className="flex items-center gap-2 text-[#1C2E56] hover:text-[#B4142F] font-semibold text-[15px] transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-[#1C2E56]" />
                    Assembleia
                  </Link>
                </nav>
              </div>

              {/* Atividades da Junta */}
              <div>
                <h3 className="font-extrabold text-[#1C2E56] text-[16px] mb-4 tracking-wide">
                  Atividades da Junta
                </h3>
                <nav className="flex flex-col gap-3">
                  <Link
                    href="/institucional/executivo"
                    className="flex items-center gap-2 text-[#1C2E56] hover:text-[#B4142F] font-semibold text-[15px] transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-[#1C2E56]" />
                    Reuniões
                  </Link>
                  <Link
                    href="/institucional/editais"
                    className="flex items-center gap-2 text-[#1C2E56] hover:text-[#B4142F] font-semibold text-[15px] transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-[#1C2E56]" />
                    Editais
                  </Link>
                </nav>
              </div>

              {/* Transparência da Junta */}
              <div>
                <h3 className="font-extrabold text-[#1C2E56] text-[16px] mb-4 tracking-wide">
                  Transparência da Junta
                </h3>
                <nav className="flex flex-col gap-3">
                  <Link
                    href="/institucional/financeiro"
                    className="flex items-center gap-2 text-gray-400 font-semibold text-[15px] cursor-not-allowed"
                  >
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    Financeiro
                  </Link>
                  <Link
                    href="/institucional/documentacao"
                    className="flex items-center gap-2 text-[#1C2E56] hover:text-[#B4142F] font-semibold text-[15px] transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-[#1C2E56]" />
                    Documentação
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

              {/* News Box */}
              <div className="bg-[#EAF4FD] p-6 rounded-[4px]">
                <h3 className="font-extrabold text-[#1C2E56] text-[16px] mb-4">Notícias</h3>
                <p className="text-[12px] text-[#1C2E56]/70 mb-2 font-medium">24 Abril, 2026</p>
                <Link
                  href="#"
                  className="text-[#1C2E56] text-[14px] leading-relaxed underline underline-offset-2 hover:text-[#B4142F] transition-colors block"
                >
                  Novo acordo de parceria entre o Município de Aveiro e instituições locais para
                  reforçar a vitalidade, as artes e a cultura no concelho.
                </Link>
              </div>
            </aside>

            {/* MAIN CONTENT */}
            <div className="text-[#1C2E56]">
              <h2 className="text-[36px] lg:text-[42px] font-extrabold mb-8 tracking-wide leading-tight">
                Uma junta próxima, acessível e ligada à comunidade
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

              {/* FEATURE BANNER (Similar to Ajuda page) */}
              <div className="relative rounded-xl overflow-hidden shadow-sm mb-12">
                <img
                  src="/comunidade-banner.jpg"
                  alt="Membros da comunidade a sorrir"
                  className="w-full h-[350px] object-cover bg-gray-200"
                />

                <div className="absolute left-5 bottom-5 bg-[#B4142F] text-white rounded-[4px] p-8 max-w-[340px] border-2 border-white">
                  <h3 className="font-bold text-[22px] mb-3 leading-tight">
                    Quer participar nas construção da nossa freguesia?
                  </h3>

                  <p className="text-[14px]">
                    Visite o{" "}
                    <Link
                      href="#"
                      className="underline underline-offset-4 hover:text-gray-200 transition-colors"
                    >
                      Espaço Comunidade
                    </Link>
                  </p>
                </div>
              </div>

              {/* BOTTOM TEXT (Repeated in mockup, kept for fidelity) */}
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
