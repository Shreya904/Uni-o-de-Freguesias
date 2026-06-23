"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Data array for the notices, making it easy to map through and update later via CMS
const editaisData = [
  {
    type: "CONVOCATÓRIA",
    description: "Assembleia de Freguesia Ordem de Trabalhos | 23 de abril",
    href: "#", // Replace with actual PDF link
  },
  {
    type: "CONVOCATÓRIA",
    description: "Assembleia de Freguesia Ordem de Trabalhos | 23 de abril",
    href: "#",
  },
  {
    type: "EDITAL",
    description: "Tolerância de ponto | Páscoa 2026",
    href: "#",
  },
];

export default function EditaisPage() {
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
              href="/organismo"
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
        <section className="px-6 lg:px-16 py-12 md:py-20">
          <div className="max-w-[1000px] mx-auto">
            {/* Page Title */}
            <h1 className="text-[#1C2E56] text-[36px] md:text-[42px] font-extrabold tracking-wide mb-10">
              Editais
            </h1>

            {/* List of Documents */}
            <div className="flex flex-col gap-4">
              {editaisData.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="border-2 border-[#1C2E56] rounded-[4px] p-5 md:px-6 md:py-5 bg-white text-[#1C2E56] hover:bg-gray-50 transition-colors flex flex-col sm:flex-row sm:items-center group"
                >
                  <div className="flex items-center">
                    <span className="font-extrabold text-[14px] md:text-[15px] tracking-wide group-hover:text-[#B4142F] transition-colors">
                      {item.type}
                    </span>
                    <span className="mx-2 text-[14px] md:text-[15px] opacity-50">|</span>
                  </div>
                  <span className="text-[14px] md:text-[15px] font-medium mt-1 sm:mt-0">
                    {item.description}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
