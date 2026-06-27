"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HelpDeskBanner from "@/components/home/helpDeskbanner";
import NewsHighlightBox from "@/components/NewsHighlightBox";
import { ExternalLink, ChevronUp, ChevronDown, ArrowDownUp } from "lucide-react";
import { fetchPlaces } from "@/lib/cms"; // Added import from your CMS lib

// --- TYPES FOR CMS ARCHITECTURE ---
interface PlaceItem {
  id: string;
  categoryTop: string;
  categorySub: string;
  title: string;
  address: string;
  phone?: string;
  schedule?: string;
  websiteUrl?: string;
}

// --- FALLBACK DATA ---
const fallbackPlaces: PlaceItem[] = [
  {
    id: "1",
    categoryTop: "Cultura",
    categorySub: "Posto de Turismo",
    title: "Turismo do Centro de Portugal",
    address: "Rua João Mendonça, 8, 3800-200 Aveiro",
    phone: "234 420 760",
    websiteUrl: "https://turismodocentro.pt",
  },
  {
    id: "2",
    categoryTop: "Cultura",
    categorySub: "Igrejas",
    title: "Capela de São Gonçalinho",
    address: "Largo de São Gonçalinho 6, 3800-073 Aveiro",
    websiteUrl: "#",
  },
  {
    id: "3",
    categoryTop: "Cultura",
    categorySub: "Museus",
    title: "Museu de Aveiro",
    address: "Avenida de Santa Joana, 3810-329 Aveiro",
    phone: "234 423 297",
    websiteUrl: "https://museudeaveiro.pt",
  },
  {
    id: "4",
    categoryTop: "Natureza",
    categorySub: "Espaços urbanos",
    title: "Parque da Cidade",
    address: "3810-164 Aveiro",
  },
  {
    id: "5",
    categoryTop: "Cultura",
    categorySub: "Monumentos",
    title: "Estátua de José Estêvão",
    address: "3810-156 Aveiro",
    websiteUrl: "#",
  },
  {
    id: "6",
    categoryTop: "Natureza",
    categorySub: "Vida selvagem",
    title: "Ecomuseu Marinha da Troncalhada",
    address: "Canal das Pirâmides, 3800 Aveiro",
  },
  {
    id: "7",
    categoryTop: "Natureza",
    categorySub: "Observatórios",
    title: "Observatório de Aves",
    address: "R. da Pega 69, 3810-64 Aveiro",
  },
  {
    id: "8",
    categoryTop: "Cultura",
    categorySub: "Museus",
    title: "Museu da Cidade de Aveiro",
    address: "Rua João Mendonça n.º 9/11, 3800-200 Aveiro",
    phone: "234 406 485",
  },
  {
    id: "9",
    categoryTop: "Cultura",
    categorySub: "Mercados",
    title: "Mercado José Estêvão",
    address: "Largo da Praça do Peixe",
    phone: "961 526 773",
    schedule: "Terça a sábado 07h00-14h00",
  },
];

export default function EspacosPublicosPage() {
  const [places, setPlaces] = useState<PlaceItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [sortAsc, setSortAsc] = useState(true);
  const [faqOpen, setFaqOpen] = useState(false);

  // UPDATED: Using the helper from lib/cms.ts
  useEffect(() => {
    let isMounted = true;

    const loadPlaces = async () => {
      try {
        const data = await fetchPlaces(100);
        if (isMounted) {
          setPlaces(data && data.length > 0 ? data : fallbackPlaces);
        }
      } catch (error) {
        console.error("Error fetching places from CMS:", error);
        if (isMounted) setPlaces(fallbackPlaces);
      }
    };

    loadPlaces();

    return () => {
      isMounted = false;
    };
  }, []);

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter],
    );
  };

  const filteredAndSortedPlaces = useMemo(() => {
    let result = [...places];

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter((p) => p.title.toLowerCase().includes(query));
    }

    if (selectedFilters.length > 0) {
      result = result.filter(
        (p) => selectedFilters.includes(p.categorySub) || selectedFilters.includes(p.categoryTop),
      );
    }

    result.sort((a, b) => {
      if (sortAsc) return a.title.localeCompare(b.title);
      return b.title.localeCompare(a.title);
    });

    return result;
  }, [places, searchQuery, selectedFilters, sortAsc]);

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
                alt="A visitar - Links úteis"
                className="w-full h-full object-cover grayscale"
              />
              <div className="absolute inset-0 bg-[#1c2841]/70 mix-blend-multiply" />
              <div className="absolute inset-0 bg-[#1c2841]/40" />
            </div>

            <div className="container relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="text-white">
                <h1 className="font-extrabold text-4xl md:text-5xl lg:text-6xl mb-2">A visitar</h1>
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
                  Museu de Aveiro
                </button>
                <button className="w-full text-left px-5 py-3 border-2 border-[#1c2841] text-[#1c2841] rounded-md hover:bg-[#1c2841] hover:text-white font-bold transition-colors">
                  Parque da Cidade
                </button>
              </div>
            </div>

            {/* Filtros: Cultura */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4 cursor-pointer text-[#1c2841]">
                <h3 className="font-extrabold text-sm uppercase tracking-wide">Cultura</h3>
                <ChevronUp className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-3.5 text-sm text-[#1c2841]/80 font-semibold">
                {["Museus", "Igrejas", "Mercados", "Monumentos", "Teatros", "Posto de Turismo"].map(
                  (cat) => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedFilters.includes(cat)}
                        onChange={() => toggleFilter(cat)}
                        className="w-4 h-4 rounded border-gray-300 text-[#1c2841] focus:ring-[#1c2841] cursor-pointer"
                      />
                      <span className="group-hover:text-[#1c2841]">{cat}</span>
                    </label>
                  ),
                )}
              </div>
            </div>

            <hr className="border-gray-200 my-8" />

            {/* Filtros: Natureza */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4 cursor-pointer text-[#1c2841]">
                <h3 className="font-extrabold text-sm uppercase tracking-wide">Natureza</h3>
                <ChevronUp className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-3.5 text-sm text-[#1c2841]/80 font-semibold">
                {["Espaços urbanos", "Vida selvagem", "Observatórios"].map((cat) => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedFilters.includes(cat)}
                      onChange={() => toggleFilter(cat)}
                      className="w-4 h-4 rounded border-gray-300 text-[#1c2841] focus:ring-[#1c2841] cursor-pointer"
                    />
                    <span className="group-hover:text-[#1c2841]">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

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
              {filteredAndSortedPlaces.map((place, index) => {
                return (
                  <div key={place.id} className="contents">
                    {/* ACCURATE CARD DESIGN */}
                    <div className="bg-white border-2 border-[#1c2841] rounded-xl p-6 flex flex-col justify-between h-full hover:shadow-lg transition-shadow">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-sm font-bold text-[#1c2841]">
                            {place.categoryTop} / {place.categorySub}
                          </span>
                          {place.websiteUrl && (
                            <a
                              href={place.websiteUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[#1c2841] hover:text-[#1c2841]/70 text-sm flex items-center gap-1.5 font-medium transition-colors"
                            >
                              Website <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                        <h2 className="text-[#1c2841] text-[22px] md:text-2xl font-extrabold leading-tight mt-3 mb-4">
                          {place.title}
                        </h2>

                        <div className="text-[#1c2841] text-base font-medium flex flex-col gap-1.5">
                          <p>{place.address}</p>
                          {place.phone && <p>Tel. {place.phone}</p>}
                          {place.schedule && <p>{place.schedule}</p>}
                        </div>
                      </div>
                    </div>

                    {/* NEW MIDDLE BANNER */}
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
