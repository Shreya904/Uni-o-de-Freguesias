import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const heroBg = "/hero-bg1.jpg";

const HeroSection = () => (
  <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
    {/* BACKGROUND */}
    <div className="absolute inset-0">
      <img
        src={heroBg}
        alt="Vista panorâmica da freguesia"
        className="w-full h-full object-cover grayscale"
        width={1920}
        height={960}
      />
      <div className="absolute inset-0 bg-black/40" />
    </div>

    {/* CONTENT */}
    <div className="relative container max-w-7xl mx-auto px-4 py-20 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl text-center"
      >
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
          Bem-vindo à terra de cagaréus e ceboleiros
        </h1>
        <Link
          href="/institucional/presidente"
          className="inline-flex items-center gap-1 text-white/80 text-sm hover:text-white transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
          Mensagem do Presidente
        </Link>
      </motion.div>
    </div>

    {/* Slideshow arrow */}
    <button className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 border border-white/40 flex items-center justify-center hover:bg-white/30 transition-colors">
      <ChevronRight className="w-5 h-5 text-white" />
    </button>
  </section>
);

export default HeroSection;