"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { fetchMesaAssembleia, CmsMesaItem } from "@/lib/cms"; // <-- Make sure to export the function and type
import EmptyState from "@/components/ui/emptystate";

// Mock Data (Fallback / Placeholder) if CMS is empty or fails
const fallbackMesa: CmsMesaItem[] = [
  {
    id: "m-1",
    name: "Maria Glória Oliveira Gomes Neto Leite",
    role: "Presidente da Assembleia",
    responsibilities:
      "Coordenação da mesa, direção dos trabalhos e representação oficial da Assembleia de Freguesia.",
    image: "/presidente-assembleia.jpg",
    order: 1,
  },
  {
    id: "m-2",
    name: "Sofia Carlos Areias Teles",
    role: "Primeiro Secretário",
    responsibilities:
      "Substituição da Presidente nas suas faltas, secretariado e organização das sessões.",
    order: 2,
  },
  {
    id: "m-3",
    name: "Fernando José Peixoto Cerqueira",
    role: "Segundo Secretário",
    responsibilities:
      "Apoio secretarial, elaboração de atas e acompanhamento do escrutínio de votações.",
    order: 3,
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
  const [mesaDaAssembleia, setMesaDaAssembleia] = useState<CmsMesaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const data = await fetchMesaAssembleia();

        if (isMounted) {
          // If we got valid data from the CMS, sort it just in case and slice to 3
          if (data && data.length > 0) {
            const sortedData = data.sort((a, b) => a.order - b.order).slice(0, 3);
            setMesaDaAssembleia(sortedData);
          } else {
            // Use fallback if CMS returned empty
            const sortedFallback = fallbackMesa.sort((a, b) => a.order - b.order).slice(0, 3);
            setMesaDaAssembleia(sortedFallback);
          }
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch mesa from CMS:", error);
        if (isMounted) {
          // Fallback in case of error
          const sortedFallback = fallbackMesa.sort((a, b) => a.order - b.order).slice(0, 3);
          setMesaDaAssembleia(sortedFallback);
          setIsLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Helper to extract image URL safely from Payload CMS relationship object or string
  const getImageUrl = (imageField: unknown) => {
    if (!imageField) return null;
    if (typeof imageField === "string") return imageField;
    if (
      typeof imageField === "object" &&
      imageField !== null &&
      "url" in imageField &&
      typeof (imageField as { url?: unknown }).url === "string"
    ) {
      return (imageField as { url: string }).url;
    }
    return null;
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
        <section className="px-6 lg:px-16 py-12">
          <div className="max-w-[1000px] mx-auto">
            <h1 className="text-[#1C2E56] text-[36px] md:text-[42px] font-extrabold tracking-wide mb-10">
              Assembleia de Freguesia
            </h1>

            {/* TOP CARDS: Mesa da Assembleia */}
            {isLoading ? (
              // Loading Skeleton
              <div className="flex flex-col gap-6 mb-10">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-[220px] w-full bg-slate-100 animate-pulse rounded-[4px] border-2 border-slate-200"
                  />
                ))}
              </div>
            ) : mesaDaAssembleia.length > 0 ? (
              <div className="flex flex-col gap-6 mb-10">
                {mesaDaAssembleia.map((membro) => {
                  const imageUrl = getImageUrl(membro.image);

                  return (
                    <div
                      key={membro.id}
                      className="border-2 border-[#1C2E56] rounded-[4px] p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 bg-white"
                    >
                      {/* Renderiza a imagem apenas se ela existir nos dados */}
                      {imageUrl && (
                        <div className="relative w-full md:w-[220px] h-[260px] md:h-[220px] rounded-[4px] overflow-hidden shrink-0 bg-gray-100">
                          <Image
                            src={imageUrl}
                            alt={`Fotografia de ${membro.name}`}
                            fill
                            className="object-cover object-top"
                          />
                        </div>
                      )}

                      {/* Informações do Membro */}
                      <div className="flex flex-col justify-center text-[#1C2E56]">
                        <h2 className="text-[20px] md:text-[22px] font-extrabold mb-2">
                          {membro.name}
                        </h2>

                        <p className="text-[14px] font-extrabold mb-6">{membro.role}</p>

                        {membro.responsibilities && (
                          <p className="text-[14px] md:text-[15px] leading-relaxed opacity-90">
                            {membro.responsibilities}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : null}

            {!isLoading && mesaDaAssembleia.length === 0 && (
              <div className="mb-10">
                <EmptyState
                  title="Sem conteúdo disponível"
                  description="Não existem elementos publicados para a mesa da Assembleia neste momento."
                />
              </div>
            )}

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
