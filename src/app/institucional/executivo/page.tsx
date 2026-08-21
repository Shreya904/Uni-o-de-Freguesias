"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronDown,
  Clock,
  Eye,
  Download,
  Printer,
  Volume2,
  Play,
  Subtitles,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { renderRichText } from "@/lib/richTextRenderer";
import EmptyState from "@/components/ui/emptystate";
import {
  fetchReunioesExecutivo,
  type ReunioesPageData,
  type CmsDocumentItem as DocItem,
} from "@/lib/cms";

// --- UTILITY FUNCTIONS ---
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
    window.open(url, "_blank");
  }
};

const handlePrint = async (url: string) => {
  if (!url || url === "#") return;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch document for printing");

    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = blobUrl;

    document.body.appendChild(iframe);
    iframe.onload = () => {
      setTimeout(() => {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();

        setTimeout(() => {
          if (document.body.contains(iframe)) {
            document.body.removeChild(iframe);
          }
          window.URL.revokeObjectURL(blobUrl);
        }, 5000);
      }, 500);
    };
  } catch (error) {
    console.error("Print failed (likely CORS issue). Falling back to new tab.", error);
    window.open(url, "_blank");
  }
};

const isValidFileUrl = (url?: string | null) => {
  if (!url || url === "#") return false;
  if (!url.includes("/") && !url.includes(".")) return false;
  return true;
};

export default function ReunioesExecutivoPage() {
  const [pageData, setPageData] = useState<ReunioesPageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [openYear, setOpenYear] = useState<string | null>(null);
  const [hasAutoOpened, setHasAutoOpened] = useState(false); // FIX FOR ACCORDION BUG

  // Fetch Page Data from CMS
  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      try {
        const data = await fetchReunioesExecutivo();
        if (isMounted) {
          setPageData(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        if (isMounted) setIsLoading(false);
      }
    };
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Group Documents by Year
  const groupedDocuments = useMemo(() => {
    if (!pageData?.documents) return {};
    const groups: Record<string, DocItem[]> = {};

    pageData.documents.forEach((doc) => {
      const dateObj = new Date(doc.rawDate || doc.date);
      const year = isNaN(dateObj.getTime())
        ? doc.date.split(" ").pop() || "Outros"
        : dateObj.getFullYear().toString();

      if (!groups[year]) groups[year] = [];
      groups[year].push(doc);
    });

    Object.keys(groups).forEach((year) => {
      groups[year].sort((a, b) => {
        const dateA = new Date(a.rawDate || a.date).getTime();
        const dateB = new Date(b.rawDate || b.date).getTime();
        return dateB - dateA;
      });
    });

    return groups;
  }, [pageData]);

  // Sort Years Descending
  const sortedYears = useMemo(() => {
    return Object.keys(groupedDocuments).sort((a, b) => {
      if (a === "Outros") return 1;
      if (b === "Outros") return -1;
      return Number(b) - Number(a);
    });
  }, [groupedDocuments]);

  // Open the most recent year automatically (only once)
  useEffect(() => {
    if (sortedYears.length > 0 && !hasAutoOpened) {
      setOpenYear(sortedYears[0]);
      setHasAutoOpened(true); // Ensures it doesn't reopen if the user closes it manually
    }
  }, [sortedYears, hasAutoOpened]);

  const toggleAccordion = (year: string) => {
    setOpenYear((prev) => (prev === year ? null : year));
  };

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      {/* HEADER & SUB-HEADER WRAPPER */}
      <div className="relative w-full bg-[#243558]">
        <div className="relative z-50">
          <Header />
        </div>

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
        <section className="px-6 lg:px-16 py-12 md:py-20">
          <div className="max-w-[1000px] mx-auto">
            {/* Page Title */}
            <h1 className="text-[#1C2E56] text-[36px] md:text-[42px] font-extrabold tracking-wide mb-8">
              Reuniões de Executivo
            </h1>

            {/* Intro Text from CMS */}
            <div className="text-[15px] leading-relaxed text-[#1C2E56] mb-12 opacity-90">
              {isLoading ? (
                <div className="animate-pulse h-24 bg-gray-100 rounded-md w-full" />
              ) : pageData?.introText ? (
                renderRichText(pageData.introText)
              ) : null}
            </div>

            {!isLoading && (!pageData?.documents || pageData.documents.length === 0) && (
              <div className="mb-12">
                <EmptyState
                  title="Sem conteúdo disponível"
                  description="Não existem elementos publicados para o Executivo neste momento."
                />
              </div>
            )}

            {/* Accordion List Grouped by Year */}
            <div className="space-y-4">
              {sortedYears.map((year) => {
                const isOpen = openYear === year;
                const docsForYear = groupedDocuments[year];

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
                      className="w-full flex justify-between items-center px-6 py-5 text-left focus:outline-none hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-[18px] font-extrabold text-[#1C2E56]">{year}</span>
                      <ChevronDown
                        className={`w-6 h-6 text-[#1C2E56] transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Accordion Content (Document Cards) */}
                    {isOpen && (
                      <div className="px-6 animate-in fade-in slide-in-from-top-2 duration-300 pt-2">
                        <div className="flex flex-col gap-5">
                          {docsForYear.map((doc) => {
                            const hasValidUrl = isValidFileUrl(doc.fileUrl);

                            return (
                              <div
                                key={doc.id}
                                className="bg-white border-[1.5px] border-[#1c2841] rounded-xl p-6 flex flex-col hover:shadow-md transition-shadow"
                              >
                                {/* Header: Type, Date, ReadTime & Tags */}
                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                                  <div className="flex flex-wrap items-center gap-3 text-sm font-bold text-[#1c2841]">
                                    <span>{doc.type}</span>
                                    <span className="text-gray-400 font-medium">{doc.date}</span>
                                    {doc.readTime && (
                                      <span className="text-gray-400 font-medium flex items-center gap-1">
                                        {doc.readTime} <Clock className="w-3.5 h-3.5" />
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                    {doc.tags?.map((tag) => (
                                      <span
                                        key={tag}
                                        className="text-xs font-semibold text-gray-500 hover:text-[#1c2841] cursor-pointer transition-colors"
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                {/* Body: Documents, Video, or Audio formats */}
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

                                {doc.format === "Audio" && (
                                  <div className="flex flex-col sm:flex-row items-center gap-6 mb-4">
                                    <button className="w-32 h-32 shrink-0 bg-gray-100 hover:bg-gray-200 transition-colors rounded-lg flex flex-col items-center justify-center gap-2 border border-gray-200">
                                      <Volume2 className="w-8 h-8 text-[#1c2841]" />
                                      <span className="text-xs font-bold text-[#1c2841]">
                                        Ouvir episódio
                                      </span>
                                    </button>
                                    <div className="flex-1 w-full">
                                      <div className="flex items-center gap-1 h-12 mb-4 w-full opacity-60">
                                        {[...Array(30)].map((_, i) => (
                                          <div
                                            key={i}
                                            className="flex-1 bg-[#1c2841] rounded-full"
                                            style={{
                                              height: `${Math.max(20, Math.random() * 100)}%`,
                                            }}
                                          />
                                        ))}
                                      </div>
                                      <h2 className="text-[#1c2841] text-[22px] font-extrabold leading-tight">
                                        {doc.title}
                                      </h2>
                                    </div>
                                  </div>
                                )}

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
                                          <Play
                                            className="w-6 h-6 text-[#1c2841] ml-1"
                                            fill="currentColor"
                                          />
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

                                {/* Footer: File Type & Actions */}
                                <div className="mt-auto pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
                                  <span className="text-sm font-extrabold text-[#1c2841]">
                                    {doc.fileTypeLabel || `Formato ${doc.format}`}
                                  </span>

                                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-bold text-gray-500">
                                    {doc.format === "Documento" && hasValidUrl && (
                                      <>
                                        <a
                                          href={doc.fileUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="flex items-center gap-1.5 hover:text-[#1c2841] transition-colors cursor-pointer"
                                        >
                                          Visualizar <Eye className="w-4 h-4" />
                                        </a>
                                        <span className="text-gray-300 hidden sm:inline">|</span>

                                        <button
                                          onClick={() =>
                                            handleDownload(doc.fileUrl, `${doc.title}.pdf`)
                                          }
                                          className="flex items-center gap-1.5 hover:text-[#1c2841] transition-colors"
                                        >
                                          Descarregar <Download className="w-4 h-4" />
                                        </button>
                                        <span className="text-gray-300 hidden sm:inline">|</span>

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
