"use client";

import { useState, useEffect, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  ChevronUp,
  ChevronDown,
  ArrowDownUp,
  Clock,
  Eye,
  Download,
  Printer,
  Volume2,
  Play,
  Subtitles,
  List as ListIcon,
  LayoutGrid,
} from "lucide-react";
import { fetchPublishedDocuments, type CmsDocumentItem as DocItem } from "@/lib/cms";
import NewsHighlightBox from "@/components/NewsHighlightBox";

// --- UTILITY FUNCTIONS ---

// Helper to force download cross-origin files
const handleDownload = async (url: string, filename: string) => {
  if (!url || url === "#") return;
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename || "documento.pdf";
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Download failed:", error);
    // Fallback: just open in new tab if fetch fails due to CORS
    window.open(url, "_blank");
  }
};

// Helper to silently print a PDF (Bypasses Cross-Origin iframe blocks)
const handlePrint = async (url: string) => {
  if (!url || url === "#") return;

  try {
    // 1. Fetch the document as a Blob
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch document for printing");

    const blob = await response.blob();

    // 2. Create a local Object URL (Same-Origin)
    const blobUrl = window.URL.createObjectURL(blob);

    // 3. Create the iframe
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = blobUrl;

    document.body.appendChild(iframe);

    // 4. Print once loaded
    iframe.onload = () => {
      setTimeout(() => {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();

        // 5. Cleanup memory and DOM after a slight delay
        setTimeout(() => {
          if (document.body.contains(iframe)) {
            document.body.removeChild(iframe);
          }
          window.URL.revokeObjectURL(blobUrl);
        }, 5000); // Gives the print dialog time to open before cleanup
      }, 500);
    };
  } catch (error) {
    console.error("Print failed (likely CORS issue). Falling back to new tab.", error);
    // Fallback: If the fetch fails due to strict CORS rules on your media bucket,
    // gracefully degrade by opening the PDF in a new tab so the user can print it manually.
    window.open(url, "_blank");
  }
};

// --- FALLBACK DATA ---
const fallbackDocs: DocItem[] = [
  {
    id: "1",
    format: "Documento",
    type: "Regulamento",
    topic: "Administrativo",
    date: "1 fevereiro 2023",
    readTime: "6min",
    tags: ["#regras", "#2023", "#cemitério"],
    title: "Regulamento dos Cemitérios Sul e Central",
    description:
      "Regulamento que define as regras, taxas, licenças e procedimentos aplicáveis à gestão, utilização e funcionamento dos Cemitérios Sul e Central.",
    fileTypeLabel: "Formato PDF",
    fileUrl: "#",
  },
  {
    id: "2",
    format: "Documento",
    type: "Regulamento",
    topic: "Administrativo",
    date: "1 fevereiro 2023",
    readTime: "6min",
    tags: ["#licenças", "#2023", "#taxas"],
    title: "Regulamento e Tabela Geral de Taxas e Licenças",
    description:
      "Regulamento que estabelece as taxas, licenças e demais valores aplicáveis aos serviços, atos administrativos e utilizações sob gestão da junta de freguesia.",
    fileTypeLabel: "Formato PDF",
    fileUrl: "#",
  },
  {
    id: "3",
    format: "Documento",
    type: "Administração",
    topic: "Administrativo",
    date: "29 abril 2026",
    readTime: "8min",
    tags: ["#planeamento", "#2026", "#território"],
    title: "Relatório de Contas 2026",
    description:
      "Regulamento que estabelece as taxas, licenças e demais valores aplicáveis aos serviços, atos administrativos e utilizações sob gestão da junta de freguesia.",
    fileTypeLabel: "Formato PDF",
    fileUrl: "#",
  },
  {
    id: "4",
    format: "Audio",
    type: "Podcast",
    topic: "Comunidade",
    date: "18 março 2026",
    readTime: "42min",
    tags: ["#podcast", "#comunidade", "#proximidade"],
    title: "Debate sobre a ponte pedonal do Rossio",
    fileTypeLabel: "Audio",
    fileUrl: "#",
  },
  {
    id: "5",
    format: "Video",
    type: "Entrevista",
    topic: "Memória",
    date: "7 maio 2026",
    readTime: "3min",
    tags: ["#entrevista", "#memória", "#arq.sónia"],
    title: "Entrevista — Histórias e Transformações do Clube da Beira Mar no séc. XXI",
    description:
      "Testemunho de antigos moradores sobre tradições locais, evolução urbana e vivências marcantes da comunidade.",
    fileTypeLabel: "Formato Video",
    fileUrl: "#",
    thumbnailUrl: "/video-thumb-beiramar.jpg",
  },
];

export default function DocumentacaoPage() {
  const [documents, setDocuments] = useState<DocItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [sortAsc, setSortAsc] = useState(true);
  const [faqOpen, setFaqOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const filterCategories = [
    {
      title: "Formato (todos)",
      options: ["Documento", "Video", "Audio"],
    },
    {
      title: "Tipo (todos)",
      options: ["Avisos", "Editais", "Regulamentos", "Administração", "Podcast", "Entrevista"],
    },
    {
      title: "Tópico",
      options: ["Administrativo", "Memória", "Comunidade"],
    },
  ];

  // UPDATED: Using the helper from lib/cms.ts
  useEffect(() => {
    let isMounted = true;
    const loadDocs = async () => {
      try {
        const cmsData = await fetchPublishedDocuments(100);
        if (isMounted) {
          // Use CMS data if available, otherwise use fallback
          setDocuments(cmsData && cmsData.length > 0 ? cmsData : fallbackDocs);
        }
      } catch (error) {
        console.error("Error fetching documents from CMS:", error);
        if (isMounted) setDocuments(fallbackDocs);
      }
    };
    loadDocs();
    return () => {
      isMounted = false;
    };
  }, []);

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter],
    );
  };

  const filteredAndSortedDocs = useMemo(() => {
    let result = [...documents];

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (d) =>
          d.title.toLowerCase().includes(query) ||
          (d.description && d.description.toLowerCase().includes(query)),
      );
    }

    if (selectedFilters.length > 0) {
      result = result.filter(
        (d) =>
          selectedFilters.includes(d.format) ||
          selectedFilters.includes(d.type) ||
          selectedFilters.includes(d.topic),
      );
    }

    result.sort((a, b) => {
      if (sortAsc) return a.title.localeCompare(b.title);
      return b.title.localeCompare(a.title);
    });

    return result;
  }, [documents, searchQuery, selectedFilters, sortAsc]);

  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* HERO SECTION WITH WRAPPED HEADER */}
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 z-50">
            <Header />
          </div>

          <section className="relative w-full min-h-[400px] md:min-h-[450px] overflow-hidden flex items-end pb-12 pt-[180px] md:pt-[160px]">
            <div className="absolute inset-0">
              <img
                src="/documents-hero.jpg"
                alt="Documentação - Todos os documentos"
                className="w-full h-full object-cover grayscale"
              />
              <div className="absolute inset-0 bg-[#1c2841]/80 mix-blend-multiply" />
              <div className="absolute inset-0 bg-[#1c2841]/50" />
            </div>

            <div className="container relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="text-white">
                <h1 className="font-extrabold text-4xl md:text-5xl lg:text-6xl mb-2">
                  Documentação
                </h1>
                <p className="text-xl md:text-2xl font-medium text-white/90">Todos os documentos</p>
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
              <h3 className="font-extrabold text-[#1c2841] dark:text-white mb-4 text-sm uppercase tracking-wide">
                Em destaque
              </h3>
              <div className="flex flex-col gap-3">
                <button className="w-full text-left px-5 py-3 border-[1.5px] border-[#1c2841] text-[#1c2841] rounded-md hover:bg-[#1c2841] hover:text-white font-bold transition-colors">
                  Ata da Assembleia Março 2026
                </button>
                <button className="w-full text-left px-5 py-3 border-[1.5px] border-[#1c2841] text-[#1c2841] rounded-md hover:bg-[#1c2841] hover:text-white font-bold transition-colors">
                  Relatório de contas 2025
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
              <div className="bg-[#fef4d8] dark:bg-black border border-[#f5e0a6] dark:border-white/20 rounded-md overflow-hidden transition-all">
                <button
                  onClick={() => setFaqOpen(!faqOpen)}
                  className="w-full p-4 flex justify-between items-center cursor-pointer hover:bg-[#fde9af] dark:hover:bg-white/10 transition-colors text-left"
                >
                  <p className="text-sm font-bold text-[#1c2841] dark:text-white pr-4 leading-snug">
                    O que fazer se um ficheiro não abrir corretamente?
                  </p>
                  {faqOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#1c2841] dark:text-white shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#1c2841] dark:text-white shrink-0" />
                  )}
                </button>
                <div
                  className={`px-4 text-sm text-[#1c2841]/80 dark:text-white/70 font-medium transition-all duration-300 ease-in-out ${
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
            <NewsHighlightBox />
          </aside>

          {/* RIGHT MAIN CONTENT */}
          <div className="flex-1">
            {/* Header & Sorting / Views */}
            <div className="flex items-center justify-between mb-6 text-sm text-gray-500 font-semibold">
              <div className="flex items-center">
                <span className="mr-3">Ordenar</span>
                <button
                  onClick={() => setSortAsc(!sortAsc)}
                  className="flex items-center gap-2 border-[1.5px] border-gray-300 rounded-md px-3 py-1.5 bg-white hover:bg-gray-50 text-[#1c2841] transition-colors"
                >
                  Nome
                  <ArrowDownUp className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors ${viewMode === "list" ? "bg-gray-200 text-[#1c2841]" : "text-gray-400 hover:bg-gray-100"}`}
                >
                  <ListIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors ${viewMode === "grid" ? "bg-gray-200 text-[#1c2841]" : "text-gray-400 hover:bg-gray-100"}`}
                >
                  <LayoutGrid className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content List/Grid */}
            <div
              className={`flex ${viewMode === "list" ? "flex-col" : "flex-wrap grid grid-cols-1 md:grid-cols-2"} gap-5`}
            >
              {filteredAndSortedDocs.map((doc) => {
                return (
                  <div
                    key={doc.id}
                    className="bg-white border-[1.5px] border-[#1c2841] rounded-xl p-6 flex flex-col hover:shadow-lg transition-shadow"
                  >
                    {/* CARD HEADER */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                      <div className="flex flex-wrap items-center gap-3 text-sm font-bold text-[#1c2841]">
                        <span>{doc.type}</span>
                        <span className="text-gray-400 font-medium">{doc.date}</span>
                        <span className="text-gray-400 font-medium flex items-center gap-1">
                          {doc.readTime} <Clock className="w-3.5 h-3.5" />
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {doc.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs font-semibold text-gray-500 hover:text-[#1c2841] cursor-pointer transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CARD BODY: PDF / Document */}
                    {doc.format === "Documento" && (
                      <div className="mb-6">
                        <h2 className="text-[#1c2841] text-2xl font-extrabold leading-tight mb-2 hover:text-blue-900 cursor-pointer transition-colors">
                          {doc.title}
                        </h2>
                        {doc.description && (
                          <p className="text-sm text-[#4a5568] font-medium leading-relaxed">
                            {doc.description}
                          </p>
                        )}
                      </div>
                    )}

                    {/* CARD BODY: Audio */}
                    {doc.format === "Audio" && (
                      <div className="flex flex-col sm:flex-row items-center gap-6 mb-4">
                        <button className="w-32 h-32 shrink-0 bg-gray-100 hover:bg-gray-200 transition-colors rounded-lg flex flex-col items-center justify-center gap-2 border border-gray-200">
                          <Volume2 className="w-8 h-8 text-[#1c2841]" />
                          <span className="text-xs font-bold text-[#1c2841]">Ouvir episódio</span>
                        </button>
                        <div className="flex-1 w-full">
                          <div className="flex items-center gap-1 h-12 mb-4 w-full opacity-60">
                            {[...Array(30)].map((_, i) => (
                              <div
                                key={i}
                                className="flex-1 bg-[#1c2841] rounded-full"
                                style={{ height: `${Math.max(20, Math.random() * 100)}%` }}
                              />
                            ))}
                          </div>
                          <h2 className="text-[#1c2841] text-[22px] font-extrabold leading-tight">
                            {doc.title}
                          </h2>
                        </div>
                      </div>
                    )}

                    {/* CARD BODY: Video */}
                    {doc.format === "Video" && (
                      <div className="mb-4">
                        <div className="relative w-full h-48 md:h-64 bg-gray-200 rounded-lg overflow-hidden mb-4 group cursor-pointer border border-gray-200">
                          {doc.thumbnailUrl ? (
                            <img
                              src={doc.thumbnailUrl}
                              alt="Video thumbnail"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-blue-900 to-gray-800" />
                          )}
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                              <Play className="w-6 h-6 text-[#1c2841] ml-1" fill="currentColor" />
                            </div>
                          </div>
                        </div>
                        <h2 className="text-[#1c2841] text-2xl font-extrabold leading-tight mb-2 hover:text-blue-900 cursor-pointer transition-colors">
                          {doc.title}
                        </h2>
                        {doc.description && (
                          <p className="text-sm text-[#4a5568] font-medium leading-relaxed">
                            {doc.description}
                          </p>
                        )}
                      </div>
                    )}

                    {/* CARD FOOTER */}
                    <div className="mt-auto pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
                      <span className="text-sm font-extrabold text-[#1c2841]">
                        {doc.fileTypeLabel}
                      </span>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-bold text-gray-500">
                        {doc.format === "Documento" && (
                          <>
                            {/* VIEW LOGIC */}
                            <a
                              href={doc.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 hover:text-[#1c2841] transition-colors cursor-pointer"
                            >
                              Visualizar <Eye className="w-4 h-4" />
                            </a>
                            <span className="text-gray-300 hidden sm:inline">|</span>

                            {/* DOWNLOAD LOGIC */}
                            <button
                              onClick={() => handleDownload(doc.fileUrl, `${doc.title}.pdf`)}
                              className="flex items-center gap-1.5 hover:text-[#1c2841] transition-colors"
                            >
                              Descarregar <Download className="w-4 h-4" />
                            </button>
                            <span className="text-gray-300 hidden sm:inline">|</span>

                            {/* PRINT LOGIC */}
                            <button
                              onClick={() => handlePrint(doc.fileUrl)}
                              className="flex items-center gap-1.5 hover:text-[#1c2841] transition-colors"
                            >
                              Imprimir <Printer className="w-4 h-4" />
                            </button>
                          </>
                        )}

                        {doc.format === "Video" && (
                          <div className="flex items-center gap-2">
                            <span>Legendas CC</span>
                            <Subtitles className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                    </div>
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
