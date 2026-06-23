"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Dados estruturados para facilitar a manutenção
const mesaDaAssembleia = [
  {
    name: "Maria Glória Oliveira Gomes Neto Leite",
    role: "Presidente da Assembleia",
  },
  {
    name: "Sofia Carlos Areias Teles",
    role: "Primeiro Secretário",
  },
  {
    name: "Fernando José Peixoto Cerqueira",
    role: "Segundo Secretário",
  },
];

const membrosDaAssembleia = [
  "Ana Maria Pinho Seiça Neves Ferreira",
  "João Ramiro de Almeida Alves",
  "Teresa Raquel Azevedo Sousa Martins",
  "Daniel Filipe Lopes Magalhães",
  "Vitor Manuel Baptista Regêncio",
  "Carlos Manuel da Silva Ferreira",
  "Maria Teresa Cabral Figueiredo Rebocho Christo Vaz Franco",
  "José Manuel Ramos Vieira",
  "Ana Patrícia Veiga Teles Veríssimo Moreira",
  "Marcelo André Pereira e Silva",
];

export default function AssembleiaPage() {
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
        <section className="px-6 lg:px-16 py-12">
          <div className="max-w-[1000px] mx-auto">
            <h1 className="text-[#1C2E56] text-[36px] md:text-[42px] font-extrabold tracking-wide mb-10">
              Assembleia de Freguesia
            </h1>

            {/* TOP CARDS: Mesa da Assembleia */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {mesaDaAssembleia.map((membro, index) => (
                <div
                  key={index}
                  className="border-2 border-[#1C2E56] rounded-[4px] p-6 bg-white flex flex-col h-full"
                >
                  <h2 className="text-[#1C2E56] text-[20px] font-extrabold mb-6 leading-snug">
                    {membro.name}
                  </h2>
                  <p className="text-[#1C2E56] text-[13px] font-extrabold mt-auto tracking-wide">
                    {membro.role}
                  </p>
                </div>
              ))}
            </div>

            {/* MAIN CONTENT CARD */}
            <div className="border-2 border-[#1C2E56] rounded-[4px] p-8 md:p-12 bg-white text-[#1C2E56]">
              {/* Secção: Membros da Assembleia */}
              <h2 className="text-[22px] font-extrabold mb-6">Membros da Assembleia</h2>

              <ul className="space-y-4 mb-12">
                {membrosDaAssembleia.map((nome, index) => (
                  <li key={index} className="font-extrabold text-[15px]">
                    {nome}
                  </li>
                ))}
              </ul>

              {/* Secção: Enquadramento Legal */}
              <div className="space-y-6 text-[15px] leading-relaxed mb-16">
                <p>
                  A Assembleia de Freguesia é o órgão deliberativo da freguesia, sendo as suas
                  atribuições, competências e funcionamento definidos na legislação em vigor,
                  nomeadamente:
                </p>

                <ul className="list-disc pl-6 space-y-3">
                  <li className="pl-2">Lei n.º 169/99, de 18 de setembro</li>
                  <li className="pl-2">Lei n.º 75/2013, de 12 de setembro</li>
                  <li className="pl-2">Lei Orgânica n.º 1/2001, de 14 de agosto</li>
                </ul>

                <p>
                  Este órgão é constituído por membros eleitos diretamente, de quatro em quatro
                  anos, em simultâneo com as eleições autárquicas. Integram ainda a Assembleia de
                  Freguesia, por inerência, o Presidente da Junta e os membros do executivo.
                </p>

                <p>
                  A mesa da Assembleia de Freguesia é composta por um Presidente e dois Secretários,
                  eleitos de entre os membros da Assembleia.
                </p>
              </div>

              {/* Secção: Sessões e público */}
              <h2 className="text-[32px] md:text-[36px] font-extrabold mb-10 tracking-wide">
                Sessões e público
              </h2>

              <div className="space-y-10">
                <div>
                  <h3 className="text-[20px] font-extrabold mb-2">Sessões ordinárias</h3>
                  <p className="text-[15px] leading-relaxed">
                    1 - A Assembleia de Freguesia reúne em sessões ordinárias ao longo do ano, em
                    datas definidas por lei e pelo respetivo regimento.
                  </p>
                </div>

                <div>
                  <h3 className="text-[20px] font-extrabold mb-2">Sessões extraordinárias</h3>
                  <p className="text-[15px] leading-relaxed">
                    2 - A Assembleia reúne em sessão extraordinária por iniciativa do seu Presidente
                    ou mediante requerimento nos termos legais.
                  </p>
                </div>

                <div>
                  <h3 className="text-[20px] font-extrabold mb-2">Caráter público das reuniões</h3>
                  <div className="text-[15px] leading-relaxed space-y-2">
                    <p>1 - As reuniões da Assembleia de Freguesia são públicas.</p>
                    <p>
                      2 - Em cada sessão, é definido um período para intervenção do público,
                      destinado à apresentação de assuntos de interesse local e pedidos de
                      esclarecimento.
                    </p>
                    <p>
                      3 - Os cidadãos que pretendam intervir devem identificar-se, indicando o nome,
                      e referir o assunto da sua intervenção.
                    </p>
                    <p>
                      4 - Cada intervenção é efetuada uma única vez e tem duração limitada, de
                      acordo com o regimento em vigor.
                    </p>
                  </div>
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
