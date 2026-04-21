"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, TreePine, Landmark, Users } from "lucide-react";

const stats = [
  { icon: Users, label: "Habitantes", value: "~12.000" },
  { icon: MapPin, label: "Área", value: "24 km²" },
  { icon: Landmark, label: "Monumentos", value: "8" },
  { icon: TreePine, label: "Espaços Verdes", value: "12" },
];

export default function FreguesiaPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative min-h-[52vh] md:min-h-[60vh] overflow-hidden flex items-end">
          <div className="absolute inset-0">
            <img
              src="/hero-bg.jpg"
              alt="A nossa freguesia"
              className="w-full h-full object-cover"
              width={1920}
              height={1080}
            />
            <div className="absolute inset-0 bg-primary/25" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/55 to-transparent" />
          </div>
          <div className="container max-w-5xl mx-auto px-4 text-center relative pb-14 md:pb-16">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              A Nossa Freguesia
            </h1>
            <p className="text-primary-foreground/85 text-lg max-w-2xl mx-auto">
              Conheça a história, o património e as tradições que fazem da nossa freguesia um lugar
              único.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="-mt-10 relative z-10 pb-12">
          <div className="container max-w-4xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-card rounded-xl border p-5 text-center shadow-sm">
                  <s.icon className="w-6 h-6 text-accent mx-auto mb-2" />
                  <div className="font-display text-2xl font-bold text-foreground">{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* History */}
        <section className="section-padding">
          <div className="container max-w-4xl mx-auto px-4">
            <h2 className="font-display text-3xl font-bold text-foreground mb-6">História</h2>
            <div className="prose prose-lg text-muted-foreground max-w-none">
              <p>
                A União de Freguesias tem raízes históricas profundas, com vestígios de ocupação que
                remontam a épocas ancestrais. Ao longo dos séculos, a nossa comunidade cresceu em
                torno de valores de solidariedade, trabalho e respeito pela terra.
              </p>
              <p>
                Hoje, a freguesia combina o charme do passado com uma visão moderna de
                desenvolvimento sustentável, oferecendo aos seus habitantes e visitantes uma
                qualidade de vida invejável.
              </p>
            </div>
          </div>
        </section>

        {/* Heritage */}
        <section className="section-padding bg-section-alt">
          <div className="container max-w-4xl mx-auto px-4">
            <h2 className="font-display text-3xl font-bold text-foreground mb-6">Património</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {["Monumentos Históricos", "Locais Históricos", "Cultura Local"].map((title) => (
                <div key={title} className="bg-card rounded-xl border p-6">
                  <Landmark className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-display font-semibold text-foreground mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Descubra os tesouros culturais e históricos que enriquecem a identidade da nossa
                    freguesia.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Infrastructure */}
        <section className="section-padding">
          <div className="container max-w-4xl mx-auto px-4">
            <h2 className="font-display text-3xl font-bold text-foreground mb-6">
              Infraestruturas
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Escolas e Estabelecimentos de Ensino",
                "Centros de Saúde",
                "Equipamentos Desportivos e Culturais",
                "Espaços Verdes e Parques",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 bg-card rounded-lg border p-4">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
