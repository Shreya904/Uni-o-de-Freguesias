"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, Clock, Eye, Download, Printer } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { fetchEditaisDocuments, type CmsDocumentItem as DocItem } from "@/lib/cms";

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
    console.error("Print failed:", error);
    window.open(url, "_blank");
  }
};

// Helper to check if URL is a valid path/link rather than a fallback ID
const isValidFileUrl = (url?: string | null) => {
  if (!url || url === "#") return false;
  // A raw Payload CMS ID usually lacks slashes or dots. A valid URL/path will have one of these.
  if (!url.includes("/") && !url.includes(".")) return false;
  return true;
};

// Fallback data structure updated to match DocItem
const fallbackEditais: DocItem[] = [
  {
    id: "e-1",
    format: "Documento",
    type: "CONVOCATÓRIA",
    topic: "Assembleia",
    date: "23 abril 2026",
    readTime: "2min",
    tags: ["#assembleia", "#ordem-trabalhos"],
    title: "Assembleia de Freguesia Ordem de Trabalhos | 23 de abril",
    fileTypeLabel: "Formato PDF",
    fileUrl: "#", // Invalid URL to demonstrate fallback
  },
  {
    id: "e-2",
    format: "Documento",
    type: "EDITAL",
    topic: "Administrativo",
    date: "10 abril 2026",
    readTime: "1min",
    tags: ["#feriado", "#páscoa"],
    title: "Tolerância de ponto | Páscoa 2026",
    fileTypeLabel: "Formato PDF",
    fileUrl: "/docs/tolerancia-pascoa-2026.pdf", // Valid mock URL
  },
];

export default function EditaisPage() {
  const [documents, setDocuments] = useState<DocItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadDocs = async () => {
      try {
        const data = await fetchEditaisDocuments();
        if (isMounted) {
          setDocuments(data && data.length > 0 ? data : fallbackEditais);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching Editais from CMS:", error);
        if (isMounted) {
          setDocuments(fallbackEditais);
          setIsLoading(false);
        }
      }
    };
    loadDocs();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
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
            <h1 className="text-[#1C2E56] text-[36px] md:text-[42px] font-extrabold tracking-wide mb-10">
              Editais
            </h1>

            {isLoading ? (
              <div className="flex flex-col gap-5">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-[200px] w-full bg-slate-100 animate-pulse rounded-xl border-[1.5px] border-[#1c2841]/20"
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                {documents.map((doc) => {
                  const hasValidUrl = isValidFileUrl(doc.fileUrl);

                  return (
                    <div
                      key={doc.id}
                      className="bg-white border-[1.5px] border-[#1c2841] rounded-xl p-6 flex flex-col hover:shadow-lg transition-shadow"
                    >
                      {/* CARD HEADER */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                        <div className="flex flex-wrap items-center gap-3 text-sm font-bold text-[#1c2841]">
                          <span className="uppercase text-[#1c2841]">{doc.type}</span>
                          <span className="text-gray-400 font-medium">{doc.date}</span>
                          <span className="text-gray-400 font-medium flex items-center gap-1">
                            {doc.readTime} <Clock className="w-3.5 h-3.5" />
                          </span>
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

                      {/* CARD BODY */}
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

                      {/* CARD FOOTER (Only render links if valid URL exists) */}
                      <div className="mt-auto pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
                        <span className="text-sm font-extrabold text-[#1c2841]">
                          {doc.fileTypeLabel || "Formato PDF"}
                        </span>

                        {hasValidUrl && (
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-bold text-gray-500">
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
                              onClick={() => handleDownload(doc.fileUrl, `${doc.title}.pdf`)}
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
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
