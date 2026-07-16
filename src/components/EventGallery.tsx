"use client";

import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type GalleryImageInput = string | { url?: string; alt?: string } | null | undefined;

interface GalleryImage {
  url: string;
  alt?: string;
}

function normalizeImage(image: GalleryImageInput): GalleryImage | null {
  if (!image) return null;
  if (typeof image === "string") {
    const url = image.trim();
    return url ? { url } : null;
  }

  if (typeof image.url === "string" && image.url.trim()) {
    return { url: image.url.trim(), alt: image.alt };
  }

  return null;
}

export default function EventGallery({ images }: { images: GalleryImageInput[] }) {
  const normalizedImages = images.map(normalizeImage).filter((img): img is GalleryImage => Boolean(img));
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Prevent background scrolling when lightbox is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedIndex]);

  if (normalizedImages.length === 0) return null;

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === null || prev === normalizedImages.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === null || prev === 0 ? normalizedImages.length - 1 : prev - 1));
  };

  return (
    <div className="mt-12">
      <h3 className="font-extrabold text-[#253e6b] dark:text-white text-xl mb-6">Galeria</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {normalizedImages.map((img, idx) => (
          <div
            key={idx}
            className="aspect-square rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 cursor-pointer group"
            onClick={() => setSelectedIndex(idx)}
          >
            <img
              src={img.url}
              alt={img.alt || `Imagem da galeria ${idx + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>

      {/* Lightbox Overlay */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            className="absolute top-4 right-4 md:top-8 md:right-8 text-white/70 hover:text-white p-2 transition-colors z-50"
            onClick={() => setSelectedIndex(null)}
          >
            <X className="w-8 h-8 md:w-10 md:h-10" />
          </button>

          <button
            className="absolute left-2 md:left-8 text-white/70 hover:text-white p-2 transition-colors z-50"
            onClick={handlePrev}
          >
            <ChevronLeft className="w-10 h-10 md:w-14 md:h-14 stroke-[1.5]" />
          </button>

          <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
            <img
              src={normalizedImages[selectedIndex].url}
              alt={normalizedImages[selectedIndex].alt || "Imagem expandida"}
              className="max-w-full max-h-[85vh] object-contain rounded-md shadow-2xl pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <button
            className="absolute right-2 md:right-8 text-white/70 hover:text-white p-2 transition-colors z-50"
            onClick={handleNext}
          >
            <ChevronRight className="w-10 h-10 md:w-14 md:h-14 stroke-[1.5]" />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white font-medium text-sm tracking-widest bg-black/50 px-4 py-2 rounded-full">
            {selectedIndex + 1} / {normalizedImages.length}
          </div>
        </div>
      )}
    </div>
  );
}
