import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";


const CalendarSection = () => (
  <section className="section-padding bg-background">
    <div className="container max-w-7xl mx-auto">
      <div className="bg-primary rounded-2xl p-8 md:p-14 flex flex-col lg:flex-row items-center gap-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex-1"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">Atendimento</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mt-2 mb-4">
            Agende o seu Atendimento Presencial
          </h2>
          <p className="text-primary-foreground/70 leading-relaxed mb-6 max-w-lg">
            Escolha o dia e a hora que mais lhe convém para ser atendido presencialmente na Junta de Freguesia. 
            Evite filas e garanta um atendimento personalizado.
          </p>

          <div className="flex flex-wrap gap-6 text-primary-foreground/60 text-sm mb-8">
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Segunda a Sexta</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 9h00 – 17h00</span>
          </div>

          <Button size="lg" variant="secondary" asChild>
            <Link href="/agendar">
              Agendar Agora <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex-shrink-0 w-full lg:w-80"
        >
          <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6 border border-primary-foreground/20">
            <div className="text-center mb-4">
              <span className="font-display font-bold text-primary-foreground text-lg">Abril 2026</span>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs text-primary-foreground/50 mb-2">
              {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((d) => (
                <span key={d} className="py-1">{d}</span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-sm">
              {Array.from({ length: 2 }, (_, i) => (
                <span key={`empty-${i}`} />
              ))}
              {Array.from({ length: 30 }, (_, i) => {
                const day = i + 1;
                const isToday = day === 9;
                const isWeekend = (i + 2) % 7 >= 5;
                return (
                  <span
                    key={day}
                    className={`py-1.5 rounded-md ${
                      isToday
                        ? "bg-accent text-accent-foreground font-bold"
                        : isWeekend
                        ? "text-primary-foreground/20"
                        : "text-primary-foreground/70 hover:bg-primary-foreground/10 cursor-pointer"
                    }`}
                  >
                    {day}
                  </span>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default CalendarSection;

