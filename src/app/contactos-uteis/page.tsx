"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HelpDeskBanner from "@/components/home/helpDeskbanner";
import NewsHighlightBox from "@/components/NewsHighlightBox";
import { ExternalLink, ChevronUp, ChevronDown, ArrowDownUp } from "lucide-react";
import { fetchUsefulContacts } from "@/lib/cms"; // Added import from your CMS lib

// --- TYPES FOR CMS ARCHITECTURE ---
interface ContactItem {
  id: string;
  categoryTop: string;
  categorySub: string;
  title: string;
  address?: string;
  phone?: string;
  schedule?: string;
  websiteUrl?: string;
  email?: string;
}

// --- FALLBACK DATA ---
const fallbackContacts: ContactItem[] = [
  {
    id: "1",
    categoryTop: "Saúde",
    categorySub: "Hospitais",
    title: "Linha Emergência Médica (INEM)",
    phone: "112",
    websiteUrl: "#",
  },
  {
    id: "2",
    categoryTop: "Saúde",
    categorySub: "Hospitais",
    title: "Linha Intoxicações (INEM)",
    phone: "808 250 143",
    websiteUrl: "#",
  },
  {
    id: "3",
    categoryTop: "Ensino",
    categorySub: "Escolas",
    title: "Agrupamento de Escolas de Aveiro",
    address: "R. Belém do Pará, 3810-066 Aveiro",
    phone: "234 379 920",
    websiteUrl: "#",
  },
  {
    id: "4",
    categoryTop: "Ensino",
    categorySub: "Escolas",
    title: "Escola Básica 2º e 3º Ciclos João Afonso de Aveiro",
    address: "Rua das Pombas, 3810-150 Aveiro",
    phone: "234 379 920",
    websiteUrl: "#",
  },
  {
    id: "5",
    categoryTop: "Associações",
    categorySub: "Cultura",
    title: "Academia de Saberes",
    address: "Casa Municipal da Cultura, 1º, Praça da República, 3810-156 Aveiro",
    phone: "963 420 530",
    email: "acadsabaveiro@gmail.com",
    websiteUrl: "#",
  },
  {
    id: "6",
    categoryTop: "Associações",
    categorySub: "Cultura",
    title: "Ação Católica Rural",
    address: "Cave do Vilar",
    phone: "938 605 588",
    websiteUrl: "#",
  },
  {
    id: "7",
    categoryTop: "Segurança",
    categorySub: "Polícia",
    title: "Polícia de Segurança Pública (PSP)",
    address: "Rua do Carmo, Aveiro",
    phone: "234 400 400",
  },
];

export default function ContactosUteisPage() {
  const [contacts, setContacts] = useState<ContactItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [sortAsc, setSortAsc] = useState(true);
  const [faqOpen, setFaqOpen] = useState(false);

  const filterCategories = [
    {
      title: "Saúde",
      options: ["Centros de saúde", "Hospitais", "Clínicas", "Farmácias", "Dentistas"],
    },
    {
      title: "Segurança",
      options: ["Bombeiros", "Polícia", "Proteção Civil"],
    },
    {
      title: "Ensino",
      options: ["Escolas", "Jardins de infância", "Ensino superior", "Formação"],
    },
    {
      title: "Associações",
      options: ["Cultura", "Desporto", "Comercial"],
    },
  ];

  // UPDATED: Using the helper from lib/cms.ts
  useEffect(() => {
    let isMounted = true;

    const loadContacts = async () => {
      try {
        const data = await fetchUsefulContacts(100);
        if (isMounted) {
          setContacts(data && data.length > 0 ? data : fallbackContacts);
        }
      } catch (error) {
        console.error("Error fetching contacts from CMS:", error);
        if (isMounted) setContacts(fallbackContacts);
      }
    };

    loadContacts();

    return () => {
      isMounted = false;
    };
  }, []);

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter],
    );
  };

  const filteredAndSortedContacts = useMemo(() => {
    let result = [...contacts];

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter((c) => c.title.toLowerCase().includes(query));
    }

    if (selectedFilters.length > 0) {
      result = result.filter((c) => selectedFilters.includes(c.categorySub));
    }

    result.sort((a, b) => {
      if (sortAsc) return a.title.localeCompare(b.title);
      return b.title.localeCompare(a.title);
    });

    return result;
  }, [contacts, searchQuery, selectedFilters, sortAsc]);

  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* HERO SECTION WITH WRAPPED HEADER */}
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 z-50">
            <Header />
          </div>

          <section className="relative w-full h-[350px] md:h-[450px] overflow-hidden flex items-end pb-12">
            <div className="absolute inset-0">
              <img
                src="/visitar-hero.jpg"
                alt="Contactos úteis - Todos os links úteis"
                className="w-full h-full object-cover grayscale"
              />
              <div className="absolute inset-0 bg-[#1c2841]/70 mix-blend-multiply" />
              <div className="absolute inset-0 bg-[#1c2841]/40" />
            </div>

            <div className="container relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="text-white">
                <h1 className="font-extrabold text-4xl md:text-5xl lg:text-6xl mb-2">
                  Contactos úteis
                </h1>
                <p className="text-xl md:text-2xl font-medium text-white/90">
                  Todos os links úteis
                </p>
              </div>

              <div className="w-full md:max-w-xl">
                <div className="flex w-full mb-3 shadow-lg">
                  <input
                    type="text"
                    placeholder="O que procuro"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-5 py-3.5 text-black rounded-l-md outline-none"
                  />
                  <button className="bg-white px-6 font-semibold text-[#1c2841] border-l border-gray-200 rounded-r-md hover:bg-gray-50 transition-colors">
                    Pesquisar
                  </button>
                </div>
                <p className="text-xs text-white/80 font-medium">
                  Termos Populares:{" "}
                  <span className="underline cursor-pointer hover:text-white ml-1">
                    Feira de Março
                  </span>
                  , <span className="underline cursor-pointer hover:text-white ml-1">Passeios</span>
                  ,{" "}
                  <span className="underline cursor-pointer hover:text-white ml-1">
                    Feira de antiguidades
                  </span>
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* MAIN LAYOUT: SIDEBAR + CONTENT */}
        <section className="container max-w-[1400px] mx-auto px-6 md:px-12 py-12 flex flex-col lg:flex-row gap-12">
          {/* LEFT SIDEBAR */}
          <aside className="w-full lg:w-[300px] shrink-0">
            {/* Em Destaque */}
            <div className="mb-10">
              <h3 className="font-extrabold text-[#1c2841] mb-4 text-sm uppercase tracking-wide">
                Em destaque
              </h3>
              <div className="flex flex-col gap-3">
                <button className="w-full text-left px-5 py-3 border-2 border-[#1c2841] text-[#1c2841] rounded-md hover:bg-[#1c2841] hover:text-white font-bold transition-colors">
                  Hospital de Aveiro
                </button>
                <button className="w-full text-left px-5 py-3 border-2 border-[#1c2841] text-[#1c2841] rounded-md hover:bg-[#1c2841] hover:text-white font-bold transition-colors">
                  Universidade de Aveiro
                </button>
              </div>
            </div>

            {/* Dynamic Filters from Array */}
            {filterCategories.map((category, index) => (
              <div key={category.title} className="mb-8">
                <div className="flex items-center justify-between mb-4 cursor-pointer text-[#1c2841]">
                  <h3 className="font-extrabold text-sm uppercase tracking-wide">
                    {category.title}
                  </h3>
                  <ChevronUp className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-3.5 text-sm text-[#1c2841]/80 font-semibold">
                  {category.options.map((opt) => (
                    <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedFilters.includes(opt)}
                        onChange={() => toggleFilter(opt)}
                        className="w-4 h-4 rounded border-gray-300 text-[#1c2841] focus:ring-[#1c2841] cursor-pointer"
                      />
                      <span className="group-hover:text-[#1c2841]">{opt}</span>
                    </label>
                  ))}
                </div>
                {/* Render divider unless it's the last category */}
                {index !== filterCategories.length - 1 && <hr className="border-gray-200 my-8" />}
              </div>
            ))}

            <hr className="border-gray-200 my-8" />

            {/* Perguntas Frequentes Accordion */}
            <div className="mb-8">
              <h3 className="font-extrabold text-[#1c2841] mb-4 text-sm uppercase tracking-wide">
                Perguntas frequentes
              </h3>
              <div className="bg-[#fef4d8] border border-[#f5e0a6] rounded-md overflow-hidden transition-all">
                <button
                  onClick={() => setFaqOpen(!faqOpen)}
                  className="w-full p-4 flex justify-between items-center cursor-pointer hover:bg-[#fde9af] transition-colors text-left"
                >
                  <p className="text-sm font-bold text-[#1c2841] pr-4 leading-snug">
                    O que fazer se um ficheiro não abrir corretamente?
                  </p>
                  {faqOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#1c2841] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#1c2841] shrink-0" />
                  )}
                </button>
                <div
                  className={`px-4 text-sm text-[#1c2841]/80 font-medium transition-all duration-300 ease-in-out ${
                    faqOpen ? "max-h-40 pb-4 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                >
                  <p>
                    Certifique-se de que tem um leitor de PDF instalado ou tente abrir o ficheiro
                    noutro navegador web.
                  </p>
                </div>
              </div>
            </div>

            <NewsHighlightBox />
          </aside>

          {/* RIGHT MAIN CONTENT */}
          <div className="flex-1">
            {/* Header & Sorting */}
            <div className="flex items-center mb-6 text-sm text-gray-500 font-semibold">
              <span className="mr-3">Ordenar</span>
              <button
                onClick={() => setSortAsc(!sortAsc)}
                className="flex items-center gap-2 border-[1.5px] border-gray-300 rounded-md px-3 py-1.5 bg-white hover:bg-gray-50 text-[#1c2841] transition-colors"
              >
                Nome
                <ArrowDownUp className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            {/* Grid Map from CMS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 auto-rows-max">
              {filteredAndSortedContacts.map((contact, index) => {
                return (
                  <div key={contact.id || index} className="contents">
                    {/* ACCURATE CARD DESIGN */}
                    <div className="bg-white border-2 border-[#1c2841] rounded-xl p-6 flex flex-col justify-between h-full hover:shadow-lg transition-shadow">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-sm font-bold text-[#1c2841]">
                            {contact.categoryTop}{" "}
                            <span className="opacity-80">
                              {" "}
                              {contact.categoryTop && contact.categorySub ? "/" : ""}{" "}
                              {contact.categorySub}
                            </span>
                          </span>
                          {contact.websiteUrl && (
                            <a
                              href={contact.websiteUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[#1c2841] hover:text-[#1c2841]/70 text-sm flex items-center gap-1.5 font-medium transition-colors"
                            >
                              Website <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                        <h2 className="text-[#1c2841] text-[22px] md:text-2xl font-extrabold leading-tight mt-3 mb-4">
                          {contact.title}
                        </h2>

                        <div className="text-[#1c2841] text-base font-medium flex flex-col gap-1.5">
                          {contact.address && <p>{contact.address}</p>}
                          {contact.phone && <p>Tel. {contact.phone}</p>}
                          {contact.email && <p>{contact.email}</p>}
                          {contact.schedule && <p>{contact.schedule}</p>}
                        </div>
                      </div>
                    </div>

                    {/* NEW MIDDLE BANNER (Inserted after the 6th item to break the grid nicely) */}
                    {index === 5 && (
                      <div className="col-span-1 md:col-span-2 relative my-2 rounded-xl overflow-hidden h-[260px] shadow-sm">
                        <img
                          src="/visitar-banner.jpg"
                          alt="Precisa de ajuda"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30" />

                        <div className="absolute right-6 bottom-6 md:right-10 md:bottom-10 bg-[#fef4d8] rounded-lg p-6 md:p-8 max-w-[320px] shadow-lg border border-[#f5e0a6]">
                          <h3 className="text-[#1c2841] font-extrabold text-xl leading-snug mb-3">
                            Precisa de ajuda na utilização deste site?
                          </h3>
                          <p className="text-sm text-[#1c2841] font-medium">
                            Visite o{" "}
                            <Link
                              href="/ajuda"
                              className="underline decoration-2 underline-offset-4 font-bold text-[#1c2841] hover:text-[#1c2841]/70 transition-colors"
                            >
                              Centro de Ajuda
                            </Link>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* BOTTOM BANNER */}
              <div className="col-span-1 md:col-span-2 mt-4 rounded-xl overflow-hidden">
                <HelpDeskBanner />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
