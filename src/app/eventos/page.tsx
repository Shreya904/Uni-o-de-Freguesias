"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ChevronUp, ChevronDown, ArrowDownUp, ExternalLink, FileEdit } from "lucide-react";
// import EmptyState from "@/components/ui/emptystate";

// --- TYPES FOR CMS ARCHITECTURE ---
export interface EventItem {
  id: string;
  slug: string;
  categoryTop: string; // e.g., "Exposições", "Mercados"
  categorySub: string; // e.g., "Hoje", "Esta semana" (derived dynamically or set in CMS)
  priceType: string; // e.g., "Gratuito", "A pagar"
  title: string;
  description: string;
  dateStr: string; // Formatted date string for display (e.g., "1 setembro 2026")
  timeStr: string; // Formatted time string (e.g., "10:00 - 17:00")
  location: string;
  mainImage: string;
  registrationLink?: string; // Link to /inscricoes or external
}

// --- FALLBACK DATA (Matches image exactly) ---
const fallbackEvents: EventItem[] = [
  {
    id: "1",
    slug: "ginastica-manutencao",
    categoryTop: "Atividades ao ar livre",
    categorySub: "Esta semana",
    priceType: "Gratuito",
    title: "Ginástica de Manutenção",
    description: "Inscrições abertas a partir de 1 de setembro de 2025.",
    dateStr: "1 setembro 2025",
    timeStr: "10:00 - 11:00",
    location: "Polo Glória e Polo Vera Cruz",
    mainImage: "/evento-ginastica.jpg",
    registrationLink: "/inscricoes",
  },
  {
    id: "2",
    slug: "musiria-projeto",
    categoryTop: "Atividades ao ar livre",
    categorySub: "Este mês",
    priceType: "Gratuito",
    title: "Musiria — Projeto de Música Gratuito",
    description:
      "MUSIRIA: um Projeto da União das Freguesias de Glória e Vera Cruz. Aulas e Ensaios de Música GRATUITOS — para todas as idades! Quer aprender música, tocar num grupo ou desenvolver a sua voz em conjunto com outras pessoas? Na Musiria temos vagas abertas! Acompanhamento por professores de música dedicados. Experiência musical coletiva, divertida e inclusiva.",
    dateStr: "Segundas e Quintas-feiras",
    timeStr: "18:30-19:30",
    location: "Polo Vera Cruz",
    mainImage: "/evento-musiria.jpg",
    registrationLink: "/inscricoes",
  },
  {
    id: "3",
    slug: "feira-de-marco",
    categoryTop: "Mercados",
    categorySub: "Este mês",
    priceType: "A pagar",
    title: "Abriu a Feira de Março Edição 2027",
    description:
      "A edição de 2026 da Feira de Março abriu oficialmente ao público, trazendo concertos, gastronomia, animação, tradições populares e diversas atividades para todas as idades ao longo das próximas semanas.",
    dateStr: "24 março a 25 de abril 2027",
    timeStr: "10:00 - 01:00",
    location: "Parque de Exposições",
    mainImage: "/evento-feira-marco.jpg",
    registrationLink: "/inscricoes",
  },
  {
    id: "4",
    slug: "caminhada-comunitaria",
    categoryTop: "Atividades ao ar livre",
    categorySub: "Este mês",
    priceType: "Gratuito",
    title: "Caminhada Comunitária — Percursos da Ria e Património Local",
    description:
      "Percurso guiado ao longo da ria com momentos de interpretação ambiental e descoberta do património local.",
    dateStr: "12 Abril",
    timeStr: "09:00",
    location: "Marginal da Ria",
    mainImage: "/evento-caminhada.jpg",
    registrationLink: "/inscricoes",
  },
  {
    id: "5",
    slug: "torneio-sueca",
    categoryTop: "Atividades ao ar livre",
    categorySub: "Este mês",
    priceType: "Gratuito",
    title: "Torneio de Sueca",
    description:
      "Iniciativa comunitária dedicada ao tradicional jogo de cartas, promovendo o convívio, a participação intergeracional e os momentos de encontro entre residentes da freguesia.",
    dateStr: "26 abril (domingo)",
    timeStr: "15:00",
    location: "Centro de Convívio da Glória",
    mainImage: "", // No image provided for this one in the mockup
    registrationLink: "/inscricoes",
  },
  {
    id: "6",
    slug: "campeonato-junior",
    categoryTop: "Atividades ao ar livre",
    categorySub: "Este mês",
    priceType: "Gratuito",
    title: "Campeonato Junior Os Cagaretes",
    description:
      'O Campeonato Junior "Os Cagaretes" reúne jovens atletas da região numa jornada dedicada ao desporto, convívio e participação comunitária, promovendo o espírito de equipa e a formação desportiva local.',
    dateStr: "18 abril (domingo)",
    timeStr: "11:00",
    location: "Estádio Municipal",
    mainImage: "/evento-cagaretes.jpg",
    registrationLink: "/inscricoes",
  },
];

// --- MOCK CMS FETCH FUNCTION ---
const fetchEventsFromCMS = async (): Promise<EventItem[]> => {
  try {
    const res = await fetch("/api/cms/events");
    if (!res.ok) throw new Error("CMS fetch failed");
    const data = await res.json();
    if (data && data.length > 0) return data;
    return fallbackEvents;
  } catch (error) {
    console.warn("Failed to fetch from CMS, using fallback data.");
    return fallbackEvents;
  }
};

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [sortAsc, setSortAsc] = useState(true);
  const [faqOpen, setFaqOpen] = useState(false);

  // Filter Categories
  const filterCategories = [
    {
      title: "Formato (todos)",
      options: ["Hoje", "Esta semana", "Este mês"],
    },
    {
      title: "Tipo (todos)",
      options: ["Exposições", "Atividades ao ar livre", "Mercados"],
    },
    {
      title: "Preço",
      options: ["Gratuito", "A pagar"],
    },
  ];

  useEffect(() => {
    let mounted = true;
    fetchEventsFromCMS().then((data) => {
      if (mounted) setEvents(data);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter],
    );
  };

  const filteredAndSortedEvents = useMemo(() => {
    // If events array is empty (e.g. initial load before fallback resolves), use fallback
    let sourceData = events.length > 0 ? events : fallbackEvents;
    let result = [...sourceData];

    // Search Query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (e) => e.title.toLowerCase().includes(query) || e.description.toLowerCase().includes(query),
      );
    }

    // Sidebar Filters
    if (selectedFilters.length > 0) {
      result = result.filter(
        (e) =>
          selectedFilters.includes(e.categoryTop) ||
          selectedFilters.includes(e.categorySub) ||
          selectedFilters.includes(e.priceType),
      );
    }

    // Sort A-Z
    result.sort((a, b) => {
      if (sortAsc) return a.title.localeCompare(b.title);
      return b.title.localeCompare(a.title);
    });

    return result;
  }, [events, searchQuery, selectedFilters, sortAsc]);

  // Commented out Empty State for now
  // const isEmpty = filteredAndSortedEvents.length === 0;

  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* HERO SECTION WITH WRAPPED HEADER */}
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 z-50">
            <Header />
          </div>

          <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden flex items-end pb-12">
            <div className="absolute inset-0">
              <img
                src="/hero-bg.jpg" // Add your agenda background image here
                alt="Agenda - Todos os eventos"
                className="w-full h-full object-cover grayscale"
              />
              <div className="absolute inset-0 bg-[#253e6b]/60 mix-blend-multiply" />
              <div className="absolute inset-0 bg-[#253e6b]/30" />
            </div>

            <div className="container relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="text-white">
                <h1 className="font-extrabold text-4xl md:text-5xl lg:text-6xl mb-2">Agenda</h1>
                <p className="text-xl md:text-2xl font-medium text-white/90">Todos os eventos</p>
              </div>

              <div className="w-full md:max-w-xl">
                <div className="flex w-full mb-3 shadow-lg">
                  <input
                    type="text"
                    placeholder="O que procura"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-5 py-3.5 text-black rounded-l-md outline-none"
                  />
                  <button className="bg-white px-6 font-semibold text-[#253e6b] border-l border-gray-200 rounded-r-md hover:bg-gray-50 transition-colors">
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
            {/* Quick Date Filters Container */}
            <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-hide">
              <button className="border border-gray-300 rounded-md py-2 px-4 text-xs font-bold text-[#253e6b] text-center min-w-[80px] hover:border-[#253e6b] transition-colors">
                Hoje
                <br />
                <span className="font-semibold text-gray-500">25/05</span>
              </button>
              <button className="border border-gray-300 rounded-md py-2 px-4 text-xs font-bold text-[#253e6b] text-center min-w-[80px] hover:border-[#253e6b] transition-colors">
                Amanhã
                <br />
                <span className="font-semibold text-gray-500">26/05</span>
              </button>
              <button className="border-2 border-[#253e6b] rounded-md py-2 px-4 text-xs font-bold text-[#253e6b] text-center min-w-[80px]">
                Esta
                <br />
                Semana
              </button>
            </div>

            {/* Em Destaque */}
            <div className="mb-10">
              <h3 className="font-extrabold text-[#253e6b] mb-4 text-sm uppercase tracking-wide">
                Em destaque
              </h3>
              <div className="flex flex-col gap-3">
                <button className="w-full text-left px-5 py-3 border-[1.5px] border-[#253e6b] text-[#253e6b] rounded-md hover:bg-[#253e6b] hover:text-white font-bold transition-colors">
                  Passeio na Ria
                </button>
                <button className="w-full text-left px-5 py-3 border-[1.5px] border-[#253e6b] text-[#253e6b] rounded-md hover:bg-[#253e6b] hover:text-white font-bold transition-colors">
                  Feira de Março 2027
                </button>
              </div>
            </div>

            {/* Dynamic Filters */}
            {filterCategories.map((category, index) => (
              <div key={category.title} className="mb-8">
                <div className="flex items-center justify-between mb-4 cursor-pointer text-[#253e6b]">
                  <h3 className="font-extrabold text-sm uppercase tracking-wide">
                    {category.title}
                  </h3>
                  <ChevronUp className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-3.5 text-sm text-[#253e6b]/80 font-semibold">
                  {category.options.map((opt) => (
                    <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedFilters.includes(opt)}
                        onChange={() => toggleFilter(opt)}
                        className="w-4 h-4 rounded border-gray-300 text-[#253e6b] focus:ring-[#253e6b] cursor-pointer"
                      />
                      <span className="group-hover:text-[#253e6b]">{opt}</span>
                    </label>
                  ))}
                </div>
                {index !== filterCategories.length - 1 && <hr className="border-gray-200 my-8" />}
              </div>
            ))}

            <hr className="border-gray-200 my-8" />

            {/* Perguntas Frequentes Accordion */}
            <div className="mb-8">
              <h3 className="font-extrabold text-[#253e6b] mb-4 text-sm uppercase tracking-wide">
                Perguntas frequentes
              </h3>
              <div className="bg-[#fef4d8] border border-[#f5e0a6] rounded-md overflow-hidden transition-all">
                <button
                  onClick={() => setFaqOpen(!faqOpen)}
                  className="w-full p-4 flex justify-between items-center cursor-pointer hover:bg-[#fde9af] transition-colors text-left"
                >
                  <p className="text-sm font-bold text-[#253e6b] pr-4 leading-snug">
                    O que fazer se um ficheiro não abrir corretamente?
                  </p>
                  {faqOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#253e6b] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#253e6b] shrink-0" />
                  )}
                </button>
                <div
                  className={`px-4 text-sm text-[#253e6b]/80 font-medium transition-all duration-300 ease-in-out ${
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

            {/* Notícias Snippet */}
            <div className="bg-[#e6f4fd] border border-[#cbe5f8] p-5 rounded-md mt-6">
              <h3 className="font-extrabold text-[#253e6b] mb-3 text-sm uppercase tracking-wide">
                Notícias
              </h3>
              <p className="text-xs text-gray-500 mb-2 font-medium">24 Abril, 2024</p>
              <Link
                href="#"
                className="text-sm font-bold text-[#253e6b] hover:text-[#1c2841] transition-colors leading-snug block"
              >
                <span className="underline underline-offset-2 decoration-[#253e6b]/30">
                  Novo acordo de parceria entre o Município de Aveiro e Instituições locais para
                  reforçar a vitalidade, as artes e a cultura no concelho.
                </span>
              </Link>
            </div>
          </aside>

          {/* RIGHT MAIN CONTENT */}
          <div className="flex-1">
            {/* Header & Sorting */}
            <div className="flex items-center justify-between mb-8 text-sm text-gray-500 font-semibold border-b border-gray-200 pb-4">
              <div className="flex items-center">
                <span className="mr-3">Ordenar</span>
                <button
                  onClick={() => setSortAsc(!sortAsc)}
                  className="flex items-center gap-2 border-[1.5px] border-gray-300 rounded-md px-3 py-1.5 bg-white hover:bg-gray-50 text-[#253e6b] transition-colors"
                >
                  Nome
                  <ArrowDownUp className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              <div>
                <button className="p-2 bg-gray-100 rounded-md text-[#253e6b] hover:bg-gray-200 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </button>
              </div>
            </div>

            {/* Grid Map from CMS */}
            <div className="columns-1 md:columns-2 gap-8 [column-gap:2rem]">
              {filteredAndSortedEvents.map((event) => (
                <div key={event.id} className="break-inside-avoid mb-8">
                  {/* ACCURATE CARD DESIGN */}
                  <div className="bg-white border border-[#253e6b] rounded-md p-5 flex flex-col hover:shadow-lg transition-shadow h-full">
                    {/* Image - contained within padding, rounded corners */}
                    {event.mainImage && (
                      <div className="w-full mb-4">
                        <img
                          src={event.mainImage}
                          alt={event.title}
                          className="w-full h-auto object-cover rounded-sm block"
                        />
                      </div>
                    )}

                    <div className="flex flex-col flex-1">
                      {/* Non-clickable Title */}
                      <h2 className="text-[#253e6b] text-[22px] font-extrabold leading-tight mb-3 transition-colors">
                        {event.title}
                      </h2>

                      <p className="text-[15px] text-[#253e6b]/80 font-medium leading-relaxed mb-6">
                        {event.description}
                      </p>

                      {/* Event Details Grid - Accurate Spacing & Labels */}
                      <div className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 text-[15px] text-[#253e6b]/90 mb-6">
                        <span className="font-extrabold text-[#253e6b]">Data:</span>
                        <span className="font-medium">{event.dateStr}</span>

                        <span className="font-extrabold text-[#253e6b]">Hora:</span>
                        <span className="font-medium">{event.timeStr}</span>

                        <span className="font-extrabold text-[#253e6b]">Local de início:</span>
                        <span className="font-medium">{event.location}</span>
                      </div>

                      {/* Footer (Price & CTA) */}
                      <div className="mt-auto pt-4 border-t border-gray-200 flex items-center text-[15px]">
                        <span className="font-extrabold text-[#253e6b]">
                          {event.priceType}
                        </span>

                        {/* Vertical Divider */}
                        <div className="w-px h-4 bg-gray-300 mx-3"></div>

                        {/* ONLY this section is clickable and darkens on hover */}
                        <Link
                          href={event.registrationLink || "/inscricoes"}
                          className="flex items-center gap-1.5 text-[#253e6b]/80 font-medium hover:text-[#1c2841] transition-colors cursor-pointer group"
                        >
                          <span className="group-hover:text-[#1c2841]">Inscrição</span> 
                          <FileEdit className="w-4 h-4 group-hover:text-[#1c2841]" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}