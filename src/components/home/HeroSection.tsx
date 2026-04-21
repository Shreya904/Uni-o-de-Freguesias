import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, MapPin, HelpCircle } from "lucide-react";
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
          União de Freguesias de Gafanha da Vagueira e Cacia
        </h1>
        <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed mb-8 max-w-lg">
          Informação, serviços e participação cívica ao alcance de todos os cidadãos.
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

      {/* Quick access cards */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl"
      >
        {[
          {
            icon: Calendar,
            label: "Agendar Atendimento",
            desc: "Marque uma reunião presencial",
            href: "/agendar",
          },
          {
            icon: MapPin,
            label: "Reportar Ocorrência",
            desc: "Assinale um problema no mapa",
            href: "/mapa",
          },
          {
            icon: HelpCircle,
            label: "Centro de Ajuda",
            desc: "Consulte as perguntas frequentes",
            href: "/faq",
          },
        ].map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/20 rounded-xl p-5 hover:bg-primary-foreground/15 transition-all group"
          >
            <item.icon className="w-6 h-6 text-accent mb-3" />
            <h3 className="font-display font-semibold text-primary-foreground text-sm mb-1">
              {item.label}
            </h3>
            <p className="text-primary-foreground/60 text-xs">{item.desc}</p>
          </Link>
        ))}
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
