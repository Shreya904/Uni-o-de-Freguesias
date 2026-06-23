import Link from "next/link";
import { motion } from "framer-motion";

const presidenteImg = "/presidente.jpg";

const PresidentSection = () => (
  <section className="py-16 md:py-20 bg-white">
    <div className="container max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
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
            className="rounded-2xl w-full max-w-sm md:max-w-none object-cover shadow-md border border-border/60 bg-white"
            loading="lazy"
            width={720}
            height={900}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="md:col-span-7"
        >
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-3">
            Caras e caros fregueses,
          </p>

          <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-5">
            É com grande sentido de responsabilidade e proximidade que continuamos a trabalhar
            diariamente para melhorar a qualidade de vida na nossa freguesia. Temos apostado na
            valorização dos espaços públicos, no reforço dos serviços de apoio à população e na
            promoção de iniciativas culturais e sociais que aproximam a comunidade. Acreditamos
            que uma freguesia mais dinâmica se constrói com a participação ativa de todos.
          </p>

          <Link
            href="/institucional/presidente"
            className="inline-flex items-center gap-2 bg-gray-100 text-foreground font-semibold text-sm md:text-base px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors mb-6"
          >
            Ler mais
          </Link>

          <div className="mt-4">
            <p className="font-bold text-foreground text-base">Bruno José Ferreira</p>
            <p className="text-muted-foreground text-sm">Presidente</p>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default PresidentSection;