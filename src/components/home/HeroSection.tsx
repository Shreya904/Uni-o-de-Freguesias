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
<<<<<<< Updated upstream

      {/* bluish cinematic overlays */}
      <div className="absolute inset-0 bg-blue-950/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-blue-950/40 to-transparent" />
      {/* toned down overlays (same red, less intensity)
      <div className="absolute inset-0 bg-primary/18" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/45 to-transparent" /> */}
=======
      <div className="absolute inset-0 bg-black/40" />
>>>>>>> Stashed changes
    </div>

    {/* CONTENT */}
    <div className="relative container max-w-7xl mx-auto px-4 py-20 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl text-center"
      >
<<<<<<< Updated upstream
        {/* <span className="inline-block bg-accent/20 text-accent px-4 py-1.5 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-accent/30">
          Ao serviço da comunidade
        </span> */}

        {/* CENTERED TITLE */}
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight mb-6 text-center">
          União das Freguesias de Glória e Vera-Cruz
        </h1>

        <div className="flex flex-wrap justify-center gap-3">
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
            <Link href="/noticias">Ver Notícias</Link>
          </Button>
        </div>
=======
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
>>>>>>> Stashed changes
      </motion.div>
    </div>

    {/* Slideshow arrow */}
    <button className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 border border-white/40 flex items-center justify-center hover:bg-white/30 transition-colors">
      <ChevronRight className="w-5 h-5 text-white" />
    </button>
  </section>
);

export default HeroSection;