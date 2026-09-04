"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsHighlightBox from "@/components/NewsHighlightBox";
import {
  ChevronUp,
  ChevronDown,
  ArrowDownUp,
  FileEdit,
  Calendar,
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { fetchPublishedEvents } from "@/lib/cms";

// --- TYPES FOR CMS ARCHITECTURE ---
export interface EventItem {
  id: string;
  slug: string;
  categoryTop: string;
  categorySub: string;
  priceType: string;
  title: string;
  description: string;
  dateStr: string;
  timeStr: string;
  location: string;
  mainImage: string;
  registrationLink: string;
  rawDate?: string; // Added to easily match events to calendar grid cells
  isFeatured?: boolean;
}

const isExternalRegistrationLink = (url?: string | null) => {
  return typeof url === "string" && url.startsWith("http");
};

// Helper to determine time-based categories dynamically (Updated for "Amanhã")
const getCategorySub = (eventDateStr: string): string => {
  if (!eventDateStr) return "Futuro";

  const eventDate = new Date(eventDateStr);
  const today = new Date();

  // Reset times for accurate day comparison
  today.setHours(0, 0, 0, 0);
  const compareDate = new Date(eventDate);
  compareDate.setHours(0, 0, 0, 0);

  const diffTime = compareDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Hoje";
  if (diffDays === 1) return "Amanhã";
  if (diffDays >= 0 && diffDays <= 7) return "Esta semana";
  if (diffDays > 7 && diffDays <= 31) return "Este mês";

  return "Futuro";
};

// Helper to normalize legacy DB categories for the frontend
const normalizeCategory = (category?: string): string => {
  if (category === "Mercados") return "Feiras e Mercados";
  return category || "Outros";
};

// --- FALLBACK DATA ---
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
    rawDate: "2025-09-01T10:00:00Z",
  },
  {
    id: "2",
    slug: "musiria-projeto",
    categoryTop: "Atividades ao ar livre",
    categorySub: "Este mês",
    priceType: "Gratuito",
    title: "Musiria — Projeto de Música Gratuito",
    description:
      "MUSIRIA: um Projeto da União das Freguesias de Glória e Vera Cruz. Aulas e Ensaios de Música GRATUITOS — para todas as idades!",
    dateStr: "Segundas e Quintas-feiras",
    timeStr: "18:30-19:30",
    location: "Polo Vera Cruz",
    mainImage: "/evento-musiria.jpg",
    registrationLink: "/inscricoes",
  },
];

// --- CALENDAR COMPONENT ---
const CalendarView = ({ events }: { events: EventItem[] }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const nextMonth = () =>
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  const prevMonth = () =>
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0,
  ).getDate();
  let firstDayIndex = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay() - 1;
  if (firstDayIndex === -1) firstDayIndex = 6; // Adjust so Monday is 0, Sunday is 6

  // Create an array of 42 cells (6 weeks) to maintain a perfect grid
  const days = Array.from({ length: 42 }, (_, i) => {
    const dayNumber = i - firstDayIndex + 1;
    if (dayNumber > 0 && dayNumber <= daysInMonth) {
      return new Date(currentMonth.getFullYear(), currentMonth.getMonth(), dayNumber);
    }
    return null;
  });

  // Drop the last row if it's completely empty
  if (days.slice(35).every((d) => d === null)) {
    days.splice(35);
  }

  const monthNames = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];

  return (
    <div className="w-full bg-white animate-in fade-in duration-300">
      {/* Month Navigation */}
      <div className="flex items-center justify-center gap-12 py-6 mb-4">
        <button onClick={prevMonth} className="text-[#253e6b] hover:text-black transition-colors">
          <ChevronLeft className="w-6 h-6 stroke-[3]" />
        </button>
        <h2 className="text-2xl font-extrabold text-[#253e6b]">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h2>
        <button onClick={nextMonth} className="text-[#253e6b] hover:text-black transition-colors">
          <ChevronRight className="w-6 h-6 stroke-[3]" />
        </button>
      </div>

      {/* Responsive Grid Wrapper */}
      <div className="w-full overflow-x-auto pb-4">
        <div className="min-w-[900px] border border-gray-200">
          <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50/50">
            {["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"].map((day) => (
              <div
                key={day}
                className="p-3 text-sm font-medium text-gray-500 border-r border-gray-200 last:border-r-0"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7">
            {days.map((date, i) => {
              if (!date) {
                return (
                  <div
                    key={i}
                    className="min-h-[140px] border-b border-r border-gray-100 bg-gray-50/30"
                  ></div>
                );
              }

              const isToday = new Date().toDateString() === date.toDateString();
              const dayEvents = events.filter(
                (e) => e.rawDate && new Date(e.rawDate).toDateString() === date.toDateString(),
              );

              return (
                <div
                  key={i}
                  className={`min-h-[140px] p-3 border-b border-r border-gray-200 transition-colors 
                    ${isToday ? "border-2 border-[#1c2841] bg-[#f9fafb]" : ""}
                  `}
                >
                  <span
                    className={`block font-extrabold text-xl mb-3 ${isToday ? "text-[#1c2841]" : "text-[#253e6b]"}`}
                  >
                    {date.getDate()} {isToday && "- Hoje"}
                  </span>

                  <div className="flex flex-col gap-2">
                    {dayEvents.map((e) => (
                      <Link key={e.id} href={`/eventos/${e.slug}`}>
                        <div className="bg-[#1c2841] text-white p-2 rounded text-xs leading-snug hover:bg-blue-800 transition-colors cursor-pointer">
                          <div className="font-bold mb-1 truncate">{e.title}</div>
                          <div className="text-white/80">{e.timeStr}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"name" | "date">("date");
  const [sortAsc, setSortAsc] = useState(false);
  const [sortTouched, setSortTouched] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);

  // NEW: State to toggle between grid cards and the calendar widget
  const [viewMode, setViewMode] = useState<"grid" | "calendar">("grid");

  // Dynamic Dates for Sidebar Headers
  const todayDate = new Date();
  const tomorrowDate = new Date(todayDate);
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);

  const formatShortDate = (d: Date) =>
    `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`;

  const hojeLabel = formatShortDate(todayDate);
  const amanhaLabel = formatShortDate(tomorrowDate);
  const featuredEvents = useMemo(
    () => {
      const selected = events.filter((event) => event.isFeatured);
      return (selected.length > 0 ? selected : events).slice(0, 2);
    },
    [events],
  );

  // Filter Categories
  const filterCategories = [
    {
      title: "Tipo (todos)",
      options: [
        "Exposições",
        "Atividades ao ar livre",
        "Feiras e Mercados",
        "Música e Espetáculos",
        "Desporto",
        "Cultura e Património",
        "Educação e Ciência",
        "Solidariedade",
        "Religião e Tradições",
      ],
    },
    {
      title: "Preço",
      options: ["Gratuito", "A pagar"],
    },
  ];

  useEffect(() => {
    let mounted = true;

    const loadEvents = async () => {
      try {
        const cmsData = await fetchPublishedEvents(100);

        if (mounted) {
          if (cmsData && cmsData.length > 0) {
            const mappedEvents: EventItem[] = cmsData.map((doc) => {
              const fallbackFormattedDate = doc.date
                ? new Date(doc.date).toLocaleDateString("pt-PT", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "";

              return {
                id: doc.id,
                slug: doc.slug,
                categoryTop: normalizeCategory(doc.categoryTop),
                categorySub: getCategorySub(doc.date),
                priceType: doc.priceType || "Gratuito",
                title: doc.title,
                description: doc.excerpt || "",
                dateStr: doc.displayDate || fallbackFormattedDate,
                timeStr: doc.time || "",
                location: doc.location || "",
                mainImage: doc.mainImage || "",
                registrationLink: doc.registrationLink || "",
                rawDate: doc.date || "", // Capture raw date for calendar
              };
            });
            setEvents(mappedEvents);
          } else {
            setEvents(fallbackEvents);
          }
        }
      } catch (error) {
        console.error("Failed to fetch events from CMS:", error);
        if (mounted) setEvents(fallbackEvents);
      }
    };

    loadEvents();
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
    let result = [...events];

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (e) => e.title.toLowerCase().includes(query) || e.description.toLowerCase().includes(query),
      );
    }

    if (selectedFilters.length > 0) {
      result = result.filter((e) => {
        // Direct matches for Top Categories and Price
        if (selectedFilters.includes(e.categoryTop) || selectedFilters.includes(e.priceType))
          return true;

        // Intelligent Date Matching
        if (selectedFilters.includes("Hoje") && e.categorySub === "Hoje") return true;
        if (selectedFilters.includes("Amanhã") && e.categorySub === "Amanhã") return true;

        // "Esta semana" should include today, tomorrow, and the rest of the week
        if (
          selectedFilters.includes("Esta semana") &&
          ["Hoje", "Amanhã", "Esta semana"].includes(e.categorySub)
        ) {
          return true;
        }

        return false;
      });
    }

    result.sort((a, b) => {
      if (sortBy === "date") {
        const dateA = a.rawDate ? new Date(a.rawDate).getTime() : 0;
        const dateB = b.rawDate ? new Date(b.rawDate).getTime() : 0;

        if (dateA === dateB) return a.title.localeCompare(b.title);
        return sortAsc ? dateA - dateB : dateB - dateA;
      }

      if (sortAsc) return a.title.localeCompare(b.title);
      return b.title.localeCompare(a.title);
    });

    return result;
  }, [events, searchQuery, selectedFilters, sortBy, sortAsc]);

  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* HERO SECTION */}
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 z-50">
            <Header />
          </div>

          <section className="relative w-full min-h-[400px] md:min-h-[450px] overflow-hidden flex items-end pb-12 pt-[180px] md:pt-[160px]">
            <div className="absolute inset-0">
              <img
                src="/hero-bg.jpg"
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
                {/* <p className="text-xs text-white/80 font-medium">
                  Termos Populares:{" "}
                  <span className="underline cursor-pointer hover:text-white ml-1">
                    Feira de Março
                  </span>
                  , <span className="underline cursor-pointer hover:text-white ml-1">Passeios</span>
                  ,{" "}
                  <span className="underline cursor-pointer hover:text-white ml-1">
                    Feira de antiguidades
                  </span>
                </p> */}
              </div>
            </div>
          </section>
        </div>

        {/* MAIN LAYOUT: SIDEBAR + CONTENT */}
        <section className="container max-w-[1400px] mx-auto px-6 md:px-12 py-12 flex flex-col lg:flex-row gap-12">
          {/* LEFT SIDEBAR */}
          <aside className="w-full lg:w-[320px] shrink-0">
            {/* UPDATED: Grouped Date Filters based on image aesthetic */}
            <div className="flex w-full border border-gray-300 rounded-md overflow-hidden mb-10">
              <button
                onClick={() => toggleFilter("Hoje")}
                className={`flex-1 py-2 px-1 text-center border-r border-gray-300 transition-colors ${
                  selectedFilters.includes("Hoje")
                    ? "bg-[#1c2841] text-white"
                    : "bg-white text-[#253e6b] hover:bg-gray-50"
                }`}
              >
                <span
                  className={`block text-xs font-medium mb-0.5 ${selectedFilters.includes("Hoje") ? "text-white/80" : "text-[#253e6b]/70"}`}
                >
                  Hoje
                </span>
                <span className="block text-sm font-extrabold leading-none">{hojeLabel}</span>
              </button>

              <button
                onClick={() => toggleFilter("Amanhã")}
                className={`flex-1 py-2 px-1 text-center border-r border-gray-300 transition-colors ${
                  selectedFilters.includes("Amanhã")
                    ? "bg-[#1c2841] text-white"
                    : "bg-white text-[#253e6b] hover:bg-gray-50"
                }`}
              >
                <span
                  className={`block text-xs font-medium mb-0.5 ${selectedFilters.includes("Amanhã") ? "text-white/80" : "text-[#253e6b]/70"}`}
                >
                  Amanhã
                </span>
                <span className="block text-sm font-extrabold leading-none">{amanhaLabel}</span>
              </button>

              <button
                onClick={() => toggleFilter("Esta semana")}
                className={`flex-1 py-2 px-1 text-center transition-colors ${
                  selectedFilters.includes("Esta semana")
                    ? "bg-[#1c2841] text-white"
                    : "bg-white text-[#253e6b] hover:bg-gray-50"
                }`}
              >
                <span
                  className={`block text-xs font-medium mb-0.5 ${selectedFilters.includes("Esta semana") ? "text-white/80" : "text-[#253e6b]/70"}`}
                >
                  Esta
                </span>
                <span className="block text-sm font-extrabold leading-none">Semana</span>
              </button>
            </div>

            {/* Em Destaque */}
            <div className="mb-10">
              <h3 className="font-extrabold text-[#253e6b] dark:text-white mb-4 text-sm uppercase tracking-wide">
                Em destaque
              </h3>
              <div className="flex flex-col gap-3">
                {featuredEvents.map((event) => (
                  <Link
                    key={event.id}
                    href={`/eventos/${event.slug}`}
                    className="w-full text-left px-5 py-3 border-[1.5px] border-[#253e6b] text-[#253e6b] rounded-md hover:bg-[#253e6b] hover:text-white font-bold transition-colors"
                  >
                    {event.title}
                  </Link>
                ))}
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

            {/* FAQ Accordion */}
            <div className="mb-8">
              <h3 className="font-extrabold text-[#253e6b] mb-4 text-sm uppercase tracking-wide">
                Perguntas frequentes
              </h3>
              <div className="bg-[#fef4d8] dark:bg-black border border-[#f5e0a6] dark:border-white/20 rounded-md overflow-hidden transition-all">
                <button
                  onClick={() => setFaqOpen(!faqOpen)}
                  className="w-full p-4 flex justify-between items-center cursor-pointer hover:bg-[#fde9af] dark:hover:bg-white/10 transition-colors text-left"
                >
                  <p className="text-sm font-bold text-[#253e6b] dark:text-white pr-4 leading-snug">
                    O que fazer se um ficheiro não abrir corretamente?
                  </p>
                  {faqOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#253e6b] dark:text-white shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#253e6b] dark:text-white shrink-0" />
                  )}
                </button>
                <div
                  className={`px-4 text-sm text-[#253e6b]/80 dark:text-white/70 font-medium transition-all duration-300 ease-in-out ${
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
          <div className="flex-1 w-full min-w-0">
            {/* Header, Sorting & View Toggle */}
            <div className="flex items-center justify-between mb-8 text-sm text-[#253e6b] font-semibold border-b border-gray-200 pb-4">
              <div />
              <div className="flex items-center gap-4 ml-auto">
                <div className="flex items-center gap-3">
                  <span className="hidden sm:block">Ordenar</span>
                  <div className="flex items-center rounded-md border-[1.5px] border-gray-300 bg-white overflow-hidden">
                    <button
                      onClick={() => {
                        setSortBy("date");
                        setSortAsc(false);
                      }}
                      className={`px-3 py-1.5 transition-colors ${sortBy === "date" ? "bg-[#1c2841] text-white" : "text-[#253e6b] hover:bg-gray-50"}`}
                    >
                      Data
                    </button>
                    <button
                      onClick={() => {
                        setSortBy("name");
                        setSortAsc(true);
                      }}
                      className={`px-3 py-1.5 border-l border-gray-200 transition-colors ${sortBy === "name" ? "bg-[#1c2841] text-white" : "text-[#253e6b] hover:bg-gray-50"}`}
                    >
                      Nome
                    </button>
                    <button
                      onClick={() => {
                        setSortTouched(true);
                        setSortAsc((prev) => !prev);
                      }}
                      className={`flex items-center gap-2 px-3 py-1.5 border-l border-gray-200 transition-colors ${sortTouched ? "text-[#253e6b] hover:bg-gray-50" : "text-gray-400 hover:bg-gray-50"}`}
                      title={sortAsc ? "Mais antigos primeiro" : "Mais recentes primeiro"}
                    >
                      <ArrowDownUp
                        className={`w-4 h-4 transition-transform ${sortTouched ? (sortAsc ? "rotate-180 text-[#253e6b]" : "rotate-0 text-[#253e6b]") : "rotate-0 text-gray-400"}`}
                      />
                    </button>
                  </div>
                </div>

                {/* View Mode Toggle */}
                <button
                  onClick={() => setViewMode((prev) => (prev === "grid" ? "calendar" : "grid"))}
                  className="p-2 bg-[#1c2841] text-white rounded-md hover:bg-[#253e6b] transition-colors shadow-sm"
                  title={`Mudar para ${viewMode === "grid" ? "Calendário" : "Grelha"}`}
                >
                  {viewMode === "grid" ? (
                    <Calendar className="w-5 h-5" />
                  ) : (
                    <LayoutGrid className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Conditionally Render View */}
            {viewMode === "calendar" ? (
              <CalendarView events={filteredAndSortedEvents} />
            ) : (
              <div className="columns-1 md:columns-2 gap-8 [column-gap:2rem] animate-in fade-in duration-300">
                {filteredAndSortedEvents.map((event) => (
                  <div key={event.id} className="break-inside-avoid mb-8">
                    <div className="bg-white border border-[#253e6b] rounded-md p-5 flex flex-col hover:shadow-lg transition-shadow h-full">
                      {event.mainImage && (
                        <Link href={`/eventos/${event.slug}`} className="w-full mb-4 block">
                          <img
                            src={event.mainImage}
                            alt={event.title}
                            className="w-full h-auto object-cover rounded-sm block hover:opacity-90 transition-opacity"
                          />
                        </Link>
                      )}

                      <div className="flex flex-col flex-1">
                        <Link href={`/eventos/${event.slug}`}>
                          <h2 className="text-[#253e6b] text-[22px] font-extrabold leading-tight mb-3 hover:text-blue-800 hover:underline decoration-2 underline-offset-4 transition-colors cursor-pointer">
                            {event.title}
                          </h2>
                        </Link>

                        <p className="text-[15px] text-[#253e6b]/80 font-medium leading-relaxed mb-6">
                          {event.description}
                        </p>

                        <div className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 text-[15px] text-[#253e6b]/90 mb-6">
                          <span className="font-extrabold text-[#253e6b]">Data:</span>
                          <span className="font-medium">{event.dateStr}</span>

                          <span className="font-extrabold text-[#253e6b]">Hora:</span>
                          <span className="font-medium">{event.timeStr}</span>

                          <span className="font-extrabold text-[#253e6b]">Local:</span>
                          <span className="font-medium">{event.location}</span>
                        </div>

                        <div className="mt-auto pt-4 border-t border-gray-200 flex items-center text-[15px]">
                          <span className="font-extrabold text-[#253e6b]">{event.priceType}</span>
                          <div className="w-px h-4 bg-gray-300 mx-3"></div>
                          {isExternalRegistrationLink(event.registrationLink) && (
                            <Link
                              href={event.registrationLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 text-[#253e6b]/80 font-medium hover:text-[#1c2841] transition-colors group"
                            >
                              <span className="group-hover:text-[#1c2841]">Mais informações</span>
                              <FileEdit className="w-4 h-4 group-hover:text-[#1c2841]" />
                            </Link>
                          )}
                        </div>
                      </div>
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
