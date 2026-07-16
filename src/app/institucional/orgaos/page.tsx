"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { fetchExecutivo, CmsExecutivoItem } from "@/lib/cms";

// Dados do executivo estruturados num array para facilitar a manutenção (Fallback)
const fallbackExecutivo: CmsExecutivoItem[] = [
  {
    id: "fb-1",
    name: "Bruno José das Neves Ferreira",
    role: "Presidente",
    responsibilities:
      "Coordenação Geral, Finanças, Urbanismo, Infraestruturas e Ambiente, Serviços Urbanos e Cemitérios",
    image: "/presidente.jpg",
    order: 1,
  },
  {
    id: "fb-2",
    name: "Marília Fernanda Correia Martins",
    role: "Secretário",
    responsibilities: "Serviços Administrativos, Secretariado de Reuniões, Recursos Humanos",
    order: 2,
  },
  {
    id: "fb-3",
    name: "João Eduardo Alves Teixeira Calisto",
    role: "Tesoureiro",
    responsibilities:
      "Contabilidade, Tesouraria, Aquisição de Bens e Serviços, Manutenção do Site e Redes Sociais",
    order: 3,
  },
  {
    id: "fb-4",
    name: "Rosa Nunes da Fonseca",
    role: "1º Vogal",
    responsibilities: "Educação, Ação Social, Património, Cultura",
    order: 4,
  },
  {
    id: "fb-5",
    name: "Adelino António Bastos Camões Sobral",
    role: "2º Vogal",
    responsibilities: "Associativismo, Desportos, Tempos Livres",
    order: 5,
  },
];

export default function ExecutivoPage() {
  const [members, setMembers] = useState<CmsExecutivoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const data = await fetchExecutivo();
        if (isMounted) {
          setMembers(data && data.length > 0 ? data : fallbackExecutivo);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch executivo from CMS:", error);
        if (isMounted) {
          setMembers(fallbackExecutivo);
          setIsLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

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
              Executivo
            </h1>

            {isLoading ? (
              // Simple loading skeleton to prevent layout shift
              <div className="flex flex-col gap-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-[220px] w-full bg-slate-100 animate-pulse rounded-[4px] border-2 border-slate-200"
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="border-2 border-[#1C2E56] rounded-[4px] p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 bg-white"
                  >
                    {/* Renderiza a imagem apenas se ela existir nos dados */}
                    {member.image && (
                      <div className="relative w-full md:w-[220px] h-[260px] md:h-[220px] rounded-[4px] overflow-hidden shrink-0">
                        <Image
                          src={member.image}
                          alt={`Fotografia de ${member.name}`}
                          fill
                          className="object-cover object-top"
                        />
                      </div>
                    )}

                    {/* Informações do Membro */}
                    <div className="flex flex-col justify-center text-[#1C2E56]">
                      <h2 className="text-[20px] md:text-[22px] font-extrabold mb-2">
                        {member.name}
                      </h2>

                      <p className="text-[14px] font-extrabold mb-6">{member.role}</p>

                      <p className="text-[14px] md:text-[15px] leading-relaxed opacity-90">
                        {member.responsibilities}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
