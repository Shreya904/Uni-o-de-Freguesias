"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    image: "/hero/hero1.png",
    title: "Bem-vindo",
    subtitle: "à terra de cagaréus e ceboleiros",
    linkText: "Mensagem do Presidente",
    href: "/institucional/presidente",
    type: "hero",
  },
  {
    id: 2,
    image: "/hero/hero2.jpg",
    title: "Noticias e\nAvisos",
    date: "Atualidade\nLocal",
    location: "Acompanhe comunicados, avisos e novidades da freguesia.",
    linkText: "Ver noticias",
    href: "/noticias",
    type: "event",
  },
  {
    id: 3,
    image: "/hero/hero3.jpg",
    title: "Agenda de\nEventos",
    date: "Participe\nConosco",
    location: "Descubra iniciativas, atividades e encontros abertos a comunidade.",
    linkText: "Ver eventos",
    href: "/eventos",
    type: "event",
  },
  {
    id: 4,
    image: "/hero/hero4.jpg",
    title: "Documentos\nPublicos",
    date: "Consulte\nOnline",
    location: "Encontre atas, editais, regulamentos, formularios e outros documentos.",
    linkText: "Ver documentos",
    href: "/institucional/documentacao",
    type: "event",
  },
  {
    id: 5,
    image: "/hero/hero5.jpg",
    title: "Balcao\nDigital",
    date: "Servicos\nOnline",
    location: "Trate de pedidos, inscricoes, declaracoes e marcacoes sem deslocacoes.",
    linkText: "Aceder ao balcao",
    href: "/balcao-digital",
    type: "event",
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Auto-play functionality
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[85vh] lg:min-h-[95vh] flex items-end overflow-hidden bg-black">
      {/* BACKGROUND SLIDER */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title.replace("\n", " ")}
            className={`w-full h-full object-cover transition-all duration-700 ${
              slides[currentSlide].id === 1 ? "grayscale" : "grayscale-0"
            }`}
            width={1920}
            height={960}
          />

          {/* Dynamic Overlay: Blue tint for the first slide, normal darkening for others */}
          <div
            className={`absolute inset-0 transition-colors duration-700 ${
              slides[currentSlide].id === 1
                ? "bg-[#1c2841]/70 mix-blend-multiply" // Navy blue tint
                : "bg-black/30" // Normal subtle darkening
            }`}
          />

          {/* Secondary fallback overlay to ensure text readability on the blue slide */}
          {slides[currentSlide].id === 1 && <div className="absolute inset-0 bg-[#1c2841]/30" />}
        </motion.div>
      </AnimatePresence>

      {/* CONTENT */}
      <div className="relative z-10 container max-w-7xl mx-auto px-6 md:px-8 py-16 flex justify-start">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-2xl text-left"
          >
            {slides[currentSlide].type === "hero" ? (
              // LAYOUT 1: Simple text (Bem-vindo slide)
              <div className="mb-8">
                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4 drop-shadow-md">
                  {slides[currentSlide].title}
                  <br />
                  <span className="text-3xl md:text-4xl lg:text-5xl font-medium text-white/90">
                    {slides[currentSlide].subtitle}
                  </span>
                </h1>
                <Link
                  href={slides[currentSlide].href}
                  className="inline-flex items-center gap-1 mt-4 text-white/90 text-sm md:text-base hover:text-white transition-colors drop-shadow-sm"
                >
                  <ChevronRight className="w-4 h-4" />
                  {slides[currentSlide].linkText}
                </Link>
              </div>
            ) : (
              // LAYOUT 2: Split Box (Events and Classes slides)
              <div className="inline-block bg-[#1c2841]/90 backdrop-blur-md rounded-xl p-6 md:p-8 shadow-2xl mb-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-stretch gap-6 md:gap-8 text-white">
                  {/* Left Side: Title & Location */}
                  <div className="flex flex-col justify-between sm:border-r border-white/20 sm:pr-8">
                    <h2 className="text-3xl md:text-4xl font-bold leading-tight whitespace-pre-line mb-6 sm:mb-0">
                      {slides[currentSlide].title}
                    </h2>
                    <span className="text-xs md:text-sm text-white/70 flex items-center gap-1">
                      {slides[currentSlide].location}
                    </span>
                  </div>

                  {/* Right Side: Date & Link */}
                  <div className="flex flex-col justify-between pt-4 sm:pt-0 border-t border-white/20 sm:border-none w-full sm:w-auto">
                    <h2 className="text-3xl md:text-4xl font-bold leading-tight whitespace-pre-line mb-6 sm:mb-0">
                      {slides[currentSlide].date}
                    </h2>
                    <Link
                      href={slides[currentSlide].href}
                      className="inline-flex items-center gap-1 text-xs md:text-sm text-white/90 hover:text-white transition-colors group"
                    >
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      {slides[currentSlide].linkText}
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* NEXT SLIDE BUTTON */}
      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute z-20 right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center hover:bg-white/40 transition-all cursor-pointer"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
      </button>
    </section>
  );
};

export default HeroSection;
