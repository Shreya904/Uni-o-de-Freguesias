import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, AlertTriangle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";


const MapSection = () => (
  <section className="section-padding bg-section-alt">
    <div className="container max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">Participação</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Mapa Interativo de Ocorrências
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Assinale problemas na via pública, infraestruturas danificadas ou outras ocorrências diretamente no mapa. 
            Cada submissão passa por um processo de validação antes de ser encaminhada para resolução.
          </p>

          <div className="space-y-4 mb-8">
            {[
              { icon: MapPin, title: "Localize no Mapa", desc: "Clique para assinalar o local exato da ocorrência" },
              { icon: AlertTriangle, title: "Descreva o Problema", desc: "Adicione detalhes e fotografias se necessário" },
              { icon: Send, title: "Submeta e Acompanhe", desc: "Receba atualizações sobre o estado da ocorrência" },
            ].map((step, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <step.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-foreground text-sm">{step.title}</h4>
                  <p className="text-muted-foreground text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <Button asChild>
            <Link href="/mapa">Abrir Mapa Interativo</Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="bg-card rounded-2xl border shadow-lg overflow-hidden aspect-[4/3]">
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <div className="text-center p-8">
                <MapPin className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground text-sm">Mapa interativo da freguesia</p>
                <p className="text-muted-foreground/60 text-xs mt-1">Integração com mapa disponível em breve</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default MapSection;

