import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const presidenteImg = "/presidente.jpg";

const PresidentSection = () => (
  <section className="py-16 md:py-20">
    <div className="container max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:col-span-5 flex justify-center"
        >
          <img
            src={presidenteImg}
            alt="Presidente da Junta de Freguesia"
            className="rounded-2xl w-full max-w-sm md:max-w-none object-cover shadow-lg"
            loading="lazy"
            width={720}
            height={900}
          />
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="md:col-span-7"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Presidência
          </h2>
          <p className="text-primary font-semibold text-base md:text-lg mb-5">
            Bruno José Ferreira · Presidente da Junta
          </p>

          <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-5">
            Bem vindos à Página pública da União das Freguesias de Glória e Vera Cruz - Aveiro.
          </p>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
            Pelas suas potencialidades e consequente visibilidade em qualquer momento e a partir de
            qualquer lugar do território urbano da Cidade de Aveiro, na sua dimensão institucional,
            esta página torna-se mais acessível e interativa.
          </p>

          <Link
            href="/institucional/presidente"
            className="inline-flex items-center gap-2 text-primary font-semibold text-sm md:text-base hover:underline transition-colors"
          >
            Ler mensagem completa <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  </section>
);

export default PresidentSection;
