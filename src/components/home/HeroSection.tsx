"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

type HeroSlide = {
  title: string;
  subtitle?: string;
  href: string;
  linkText: string;
  image?: { url?: string } | string;
  type?: "hero" | "event" | "class" | string;
  location?: string;
  date?: string;
  isExternal?: boolean;
};

const FALLBACK_SLIDES: HeroSlide[] = [
  {
    title: "União de Freguesias",
    subtitle: "Comunidade, serviços e participação",
    href: "/noticias",
    linkText: "Ver notícias",
    image: "/hero-bg.jpg",
    type: "hero",
    isExternal: false,
  },
];

const HeroSection = () => {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Fetch data from Payload CMS
  useEffect(() => {
    const fetchSlider = async () => {
      try {
        const cmsBaseUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL?.replace(/\/$/, "");
        const sliderUrl = cmsBaseUrl
          ? `${cmsBaseUrl}/api/hero-slider?where[isActive][equals]=true`
          : "/api/hero-slider?where[isActive][equals]=true";

        const res = await fetch(sliderUrl, { cache: "no-store" });

        if (!res.ok) {
          throw new Error(`Failed to load hero slider: ${res.status}`);
        }

        const data = await res.json();

        if (data?.docs?.length > 0 && data.docs[0].slides?.length > 0) {
          setSlides(data.docs[0].slides);
        } else {
          setSlides(FALLBACK_SLIDES);
        }
      } catch (error) {
        console.error("Erro ao carregar o slider:", error);
        setSlides(FALLBACK_SLIDES);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSlider();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // 2. Auto-play functionality (only runs if slides exist)
  useEffect(() => {
    if (slides.length <= 1) return; // No need to auto-play if there's only 1 slide

    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Loading state (prevents errors before data arrives)
  if (isLoading) {
    return <div className="min-h-[85vh] lg:min-h-[95vh] bg-black" />;
  }

  // Fallback if no active slider or slides are found
  if (!slides || slides.length === 0) {
    return null;
  }

  const activeSlide = slides[currentSlide];
  const isHeroType = activeSlide.type === "hero";

  // Payload returns the full media object for uploads. We need the .url property.
  const imageUrl = typeof activeSlide.image === "string" ? activeSlide.image : activeSlide.image?.url;

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
            src={imageUrl}
            alt={activeSlide.title}
            className={`w-full h-full object-cover transition-all duration-700 ${
              isHeroType ? "grayscale" : "grayscale-0"
            }`}
            width={1920}
            height={960}
          />

          {/* Dynamic Overlay: Blue tint for the hero slide, normal darkening for others */}
          <div
            className={`absolute inset-0 transition-colors duration-700 ${
              isHeroType
                ? "bg-[#1c2841]/70 mix-blend-multiply" // Navy blue tint
                : "bg-black/30" // Normal subtle darkening
            }`}
          />

          {/* Secondary fallback overlay to ensure text readability on the blue slide */}
          {isHeroType && <div className="absolute inset-0 bg-[#1c2841]/30" />}
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
            className="w-full text-left"
          >
            {isHeroType ? (
              // LAYOUT 1: Simple text (Hero slide)
              <div className="mb-8 w-full">
                <h1 className="font-display font-bold text-white leading-tight mb-4 drop-shadow-md flex flex-col gap-2">
                  <span className="text-5xl md:text-6xl lg:text-7xl w-max max-w-full">
                    {activeSlide.title}
                  </span>
                  {activeSlide.subtitle && (
                    <span className="text-3xl md:text-4xl lg:text-5xl font-medium text-white/90 w-max max-w-full">
                      {activeSlide.subtitle}
                    </span>
                  )}
                </h1>
                <Link
                  href={activeSlide.href}
                  target={activeSlide.isExternal ? "_blank" : undefined}
                  rel={activeSlide.isExternal ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-1 mt-4 text-white/90 text-sm md:text-base hover:text-white transition-colors drop-shadow-sm w-max max-w-full"
                >
                  <ChevronRight className="w-4 h-4" />
                  {activeSlide.linkText}
                </Link>
              </div>
            ) : (
              // LAYOUT 2: Split Box (Events and Classes slides)
              <div className="inline-block bg-[#1c2841]/90 backdrop-blur-md rounded-xl p-6 md:p-8 shadow-2xl mb-4 max-w-full w-fit">
                <div className="flex flex-col md:flex-row items-start md:items-stretch gap-6 md:gap-8 text-white">
                  {/* Left Side: Title & Location */}
                  <div className="flex flex-col justify-between md:border-r border-white/20 md:pr-8 min-w-0">
                    <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4 md:mb-0 w-max max-w-full">
                      {activeSlide.title}
                    </h2>
                    {activeSlide.location && (
                      <p className="text-sm md:text-base text-white/70 flex items-center mt-2 md:mt-6 w-max max-w-full whitespace-pre-wrap">
                        {activeSlide.location}
                      </p>
                    )}
                  </div>

                  {/* Right Side: Date & Link */}
                  <div className="flex flex-col justify-between pt-4 md:pt-0 border-t border-white/20 md:border-none w-full md:w-auto shrink-0 min-w-0">
                    {activeSlide.date && (
                      <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4 md:mb-0 w-max max-w-full">
                        {activeSlide.date}
                      </h2>
                    )}
                    <Link
                      href={activeSlide.href}
                      target={activeSlide.isExternal ? "_blank" : undefined}
                      rel={activeSlide.isExternal ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-1 text-sm md:text-base text-white/90 hover:text-white transition-colors group mt-2 md:mt-6 w-max max-w-full"
                    >
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      {activeSlide.linkText}
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* NEXT SLIDE BUTTON */}
      {slides.length > 1 && (
        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute z-20 right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center hover:bg-white/40 transition-all cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </button>
      )}
    </section>
  );
};

export default HeroSection;
