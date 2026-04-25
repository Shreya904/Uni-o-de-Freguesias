import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const heroBg = "/hero-bg.jpg";

const HeroSection = () => (
  <section className="relative min-h-[85vh] flex items-center overflow-hidden">
    <div className="absolute inset-0">
      <img
        src={heroBg}
        alt="Vista panorâmica da freguesia"
        className="w-full h-full object-cover"
        width={1920}
        height={960}
      />
      <div className="absolute inset-0 bg-primary/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/55 to-transparent" />
    </div>

    <div className="relative container max-w-7xl mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-2xl"
      >
        <span className="inline-block bg-accent/20 text-accent px-4 py-1.5 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-accent/30">
          Ao serviço da comunidade
        </span>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight mb-6">
          CONTEÚDO A PRODUZIR
        </h1>
        <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
          A secção Hero necessita de conteúdo novo: fotografia institucional de alta qualidade e
          tagline atualizada. Em baixo, elementos de identidade existentes que podem apoiar a
          composição.
        </p>

        <div className="flex flex-wrap gap-3">
          <Button size="lg" variant="secondary" asChild>
            <Link href="/contactos">
              Contactar-nos <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="bg-primary-foreground/15 text-primary-foreground border border-primary-foreground/25 hover:bg-primary-foreground/25"
            asChild
          >
            <Link href="/eventos">Ver Eventos</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
