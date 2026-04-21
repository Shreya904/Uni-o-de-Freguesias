import Link from "next/link";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { ArrowRight } from "lucide-react";

const presidenteImg = "/presidente.jpg";

const PresidentSection = () => (
  <section className="relative bg-primary overflow-hidden">
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
            Mensagem da Presidente
          </h2>
          <span className="inline-block text-accent font-medium text-sm mb-6">
            Maria Silva · Presidente da Junta
          </span>

          <p className="text-primary-foreground/85 leading-relaxed mb-4">
            Caras e Caros cidadãos da União de Freguesias de Gafanha da Vagueira e Cacia,
          </p>
          <p className="text-primary-foreground/80 leading-relaxed mb-4">
            É com renovado compromisso que iniciamos este novo ciclo ao serviço da nossa comunidade.
            Trabalhamos diariamente para garantir mais proximidade, transparência e qualidade nos
            serviços que prestamos a todos os nossos munícipes.
          </p>
          <p className="text-primary-foreground/80 leading-relaxed mb-6">
            O nosso foco continua na requalificação dos espaços públicos, no apoio social às famílias
            e no reforço da participação cívica. Contamos com todos para, juntos, construirmos uma
            freguesia mais unida e próspera.
          </p>

          <Link
            href="/institucional"
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

