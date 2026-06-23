"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const normasERegulamentos = [
  "Regulamento de Apoio Social",
  "Regulamento de Utilização de Espaços Públicos",
  "Regulamento de Cedência de Equipamentos",
  "Normas de Funcionamento dos Serviços",
];

const planosEEstrategias = [
  "Plano de Atividades e Orçamento",
  "Relatório de Atividades",
  "Plano de Desenvolvimento Local",
  "Estratégias de Sustentabilidade e Ambiente",
];

export default function NormasPlaneamentoPage() {
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
              href="/organismo"
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
          <div className="max-w-[1000px] mx-auto text-[#1C2E56]">
            {/* Page Title */}
            <h1 className="text-[36px] md:text-[42px] font-extrabold tracking-wide mb-6">
              Normas e Planeamento
            </h1>

            <p className="text-[15px] leading-relaxed mb-16 opacity-90 max-w-[800px]">
              A Junta de Freguesia da Glória e Vera Cruz orienta a sua atividade por princípios de
              transparência, legalidade e planeamento estratégico, assegurando uma gestão eficiente
              e sustentável dos recursos da freguesia.
            </p>

            <div className="space-y-16">
              {/* SECTION: Normas e Regulamentos */}
              <div>
                <h2 className="text-[24px] md:text-[28px] font-extrabold mb-4 tracking-wide">
                  Normas e Regulamentos
                </h2>

                <p className="text-[15px] leading-relaxed mb-6 opacity-90 max-w-[800px]">
                  Nesta secção pode consultar os principais regulamentos em vigor, que definem o
                  funcionamento dos serviços e a relação com os cidadãos:
                </p>

                <ul className="list-disc pl-6 space-y-4 marker:text-[#1C2E56]">
                  {normasERegulamentos.map((item, index) => (
                    <li key={index} className="pl-2">
                      <Link
                        href="#"
                        className="text-[15px] font-semibold underline underline-offset-4 decoration-[#1C2E56]/30 hover:decoration-[#B4142F] hover:text-[#B4142F] transition-colors"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* SECTION: Planos e Estratégias */}
              <div>
                <h2 className="text-[24px] md:text-[28px] font-extrabold mb-4 tracking-wide">
                  Planos e Estratégias
                </h2>

                <p className="text-[15px] leading-relaxed mb-6 opacity-90 max-w-[800px]">
                  A Junta desenvolve planos de ação que orientam o desenvolvimento da freguesia a
                  curto, médio e longo prazo:
                </p>

                <ul className="list-disc pl-6 space-y-4 marker:text-[#1C2E56]">
                  {planosEEstrategias.map((item, index) => (
                    <li key={index} className="pl-2">
                      <Link
                        href="#"
                        className="text-[15px] font-semibold underline underline-offset-4 decoration-[#1C2E56]/30 hover:decoration-[#B4142F] hover:text-[#B4142F] transition-colors"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
