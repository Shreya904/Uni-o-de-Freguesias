import Link from "next/link";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { ArrowRight } from "lucide-react";

const presidenteImg = "/presidente.jpg";

const PresidentSection = () => (
  <section className="relative bg-primary overflow-hidden border-t border-primary-foreground/25">
    <div className="container max-w-7xl mx-auto px-4 py-16 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:col-span-4 flex justify-center"
        >
          <div className="relative">
            <div className="absolute -inset-3 bg-accent/20 rounded-2xl rotate-3" />
            <img
              src={presidenteImg}
              alt="Presidente da Junta de Freguesia"
              className="relative rounded-2xl w-64 md:w-full max-w-xs object-cover shadow-2xl"
              loading="lazy"
              width={640}
              height={800}
            />
          </div>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="md:col-span-8"
        >
          <Quote className="w-10 h-10 text-accent/60 mb-4" />
          <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-2">
            Presidência
          </h2>
          <span className="inline-block text-accent font-medium text-sm mb-6">
            Bruno José Ferreira · Presidente da Junta
          </span>

          <p className="text-primary-foreground/85 leading-relaxed mb-4">
            Bem vindos à Página pública da União das Freguesias de Glória e Vera Cruz - Aveiro.
          </p>
          <p className="text-primary-foreground/80 leading-relaxed mb-4">
            Pelas suas potencialidades e consequente visibilidade em qualquer momento e a partir de
            qualquer lugar do território urbano da Cidade de Aveiro, na sua dimensão institucional,
            esta página torna-se mais acessível e interativa.
          </p>

          <Link
            href="/institucional/presidente"
            className="inline-flex items-center gap-2 text-accent font-semibold text-sm hover:underline transition-colors"
          >
            Ler mensagem completa <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  </section>
);

export default PresidentSection;
