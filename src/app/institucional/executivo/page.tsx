"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronDown, FileText, Download, Printer } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const years = ["2025", "2024", "2023"];

export default function ReunioesExecutivoPage() {
  // Set the first year as open by default, or null if you want them all closed initially
  const [openYear, setOpenYear] = useState<string | null>(null);

  const toggleAccordion = (year: string) => {
    setOpenYear((prev) => (prev === year ? null : year));
  };

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      {/* HEADER & SUB-HEADER WRAPPER */}
      <div className="relative w-full bg-[#243558]">
        {/* Header Layer */}
        <div className="relative z-50">
          <Header />
        </div>

        {/* Breadcrumb Layer */}
        <div className="relative z-10 py-6 px-6 lg:px-16">
          <div className="max-w-[1000px] mx-auto flex items-center">
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
        {/* CONTENT SECTION */}
        <section className="px-6 lg:px-16 py-12 md:py-20">
          <div className="max-w-[1000px] mx-auto">
            {/* Page Title */}
            <h1 className="text-[#1C2E56] text-[36px] md:text-[42px] font-extrabold tracking-wide mb-8">
              Reuniões de Executivo
            </h1>

            {/* Intro Text */}
            <div className="space-y-4 text-[14px] md:text-[15px] leading-relaxed text-[#1C2E56] mb-12 opacity-90">
              <p>
                Foi definida como &quot;pública&quot; a última reunião de cada mês da Junta de
                Freguesia.
              </p>
              <p>
                As reuniões ordinárias privadas terão início pelas 10h00, enquanto as reuniões
                ordinárias públicas terão início pelas 15h00. Qualquer alteração será efetuada de
                acordo com a legislação em vigor, nomeadamente o disposto no n.º 4 do artigo 40.º da
                Lei n.º 75/2013, de 12 de setembro.
              </p>
              <p>
                De acordo com o Regimento da Junta de Freguesia da Glória e Vera Cruz, a inscrição
                para intervenção do público deverá ser realizada até às 12h30 do dia útil anterior à
                reunião pública. Esta poderá ser efetuada através dos serviços online da Junta ou
                por correio eletrónico para o endereço institucional da freguesia.
              </p>
            </div>

            {/* Accordion List */}
            <div className="space-y-4">
              {years.map((year) => {
                const isOpen = openYear === year;

                return (
                  <div
                    key={year}
                    className={`border-2 border-[#1C2E56] rounded-[4px] overflow-hidden bg-white transition-all duration-300 ${
                      isOpen ? "pb-6" : ""
                    }`}
                  >
                    {/* Accordion Trigger */}
                    <button
                      onClick={() => toggleAccordion(year)}
                      className="w-full flex justify-between items-center px-6 py-5 text-left focus:outline-none"
                    >
                      <span className="text-[18px] font-extrabold text-[#1C2E56]">{year}</span>
                      <ChevronDown
                        className={`w-6 h-6 text-[#1C2E56] transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Accordion Content */}
                    {isOpen && (
                      <div className="px-6 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="text-[#1C2E56]">
                          <h2 className="text-[28px] md:text-[32px] font-normal mb-6">
                            29 dezembro, 2025
                          </h2>

                          <div className="space-y-6 text-[15px] leading-relaxed mb-8">
                            <p>
                              A união das Freguesias de Glória e Vera Cruz apresenta a ata em minuta
                              da Assembleia de Freguesia do passado dia 22 de dezembro de 2025.
                            </p>
                            <p>
                              O Resultado da votação traduz efetivamente o reconhecimento do rigor e
                              transparência colocados nesta nossa primeira Assembleia Ordinária,
                              particularmente no que diz respeito ao Plano de atividades e
                              Orçamento, documento elaborado em consonância perfeita com os nossos
                              objetivos.
                            </p>
                            <p>
                              Congratulamo-nos pela forma como decorreu esta Assembleia,
                              designadamente pela participação e envolvência de todos os membros,
                              contribuindo assim para a aprovação de todos os pontos da Ordem de
                              Trabalhos, com exceção do Regimento da Assembleia que, por acordo de
                              todos vai ser alvo de pequenos acertos nos prazos da apresentação da
                              documentação para consulta.
                            </p>
                            <p>Aveiro, 29 de Dezembro de 2025</p>

                            {/* Sign-off */}
                            <div className="pl-8 pt-2">
                              <p>O Presidente</p>
                              <p className="mt-4">Bruno José Ferreira</p>
                            </div>
                          </div>

                          {/* Dashed Divider */}
                          <div className="border-t border-dashed border-[#1C2E56]/40 mb-6" />

                          {/* Action Footer */}
                          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 text-[14px] text-[#1C2E56]">
                            <span className="font-extrabold">Formato PDF</span>

                            <div className="flex items-center gap-4 sm:gap-6">
                              <button className="flex items-center gap-2 hover:text-[#B4142F] transition-colors group">
                                Visualizar
                                <FileText className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                              </button>

                              <div className="w-px h-4 bg-[#1C2E56]/30 hidden sm:block" />

                              <button className="flex items-center gap-2 hover:text-[#B4142F] transition-colors group">
                                Descarregar
                                <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                              </button>

                              <div className="w-px h-4 bg-[#1C2E56]/30 hidden sm:block" />

                              <button className="flex items-center gap-2 hover:text-[#B4142F] transition-colors group">
                                Imprimir
                                <Printer className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
