"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Send, AlertTriangle, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const issueTypes = [
  "Buraco na estrada",
  "Iluminação pública",
  "Lixo / Resíduos",
  "Sinalização danificada",
  "Espaço verde",
  "Outro",
];

const MapPage = () => {
  const [selectedPoint, setSelectedPoint] = useState<{ x: number; y: number } | null>(null);
  const [formData, setFormData] = useState({ type: "", description: "", name: "", email: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSelectedPoint({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPoint) {
      toast.error("Por favor assinale um ponto no mapa.");
      return;
    }
    if (!formData.type || !formData.description) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }
    setSubmitted(true);
    toast.success("Ocorrência submetida! Será validada pela equipa.");
  };

  if (submitted) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="section-padding">
          <div className="container max-w-lg mx-auto text-center">
            <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
            <h1 className="font-display text-3xl font-bold text-foreground mb-3">
              Ocorrência Registada
            </h1>
            <p className="text-muted-foreground mb-4">
              A sua ocorrência será validada pela nossa equipa antes de ser encaminhada para
              resolução.
            </p>
            <p className="text-xs text-muted-foreground mb-6">
              <AlertTriangle className="w-4 h-4 inline mr-1" />
              As submissões passam por um processo de validação.
            </p>
            <Button
              onClick={() => {
                setSubmitted(false);
                setSelectedPoint(null);
                setFormData({ type: "", description: "", name: "", email: "" });
              }}
            >
              Reportar Nova Ocorrência
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="section-padding bg-section-alt">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
                Mapa de Ocorrências
              </h1>
              <p className="text-muted-foreground mt-3">
                Clique no mapa para assinalar uma ocorrência. Todas as submissões são validadas.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Map area */}
              <div className="lg:col-span-2">
                <div
                  className="relative bg-card rounded-2xl border shadow-sm overflow-hidden cursor-crosshair"
                  style={{ aspectRatio: "16/10" }}
                  onClick={handleMapClick}
                  role="img"
                  aria-label="Mapa interativo da freguesia. Clique para marcar uma ocorrência."
                >
                  <div className="absolute inset-0 bg-muted flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-10 h-10 text-muted-foreground/30 mx-auto mb-2" />
                      <p className="text-muted-foreground text-sm">Clique para assinalar o local</p>
                      <p className="text-muted-foreground/60 text-xs mt-1">
                        Mapa será integrado com API geográfica
                      </p>
                    </div>
                  </div>
                  {selectedPoint && (
                    <div
                      className="absolute w-6 h-6 -ml-3 -mt-6"
                      style={{ left: `${selectedPoint.x}%`, top: `${selectedPoint.y}%` }}
                    >
                      <MapPin className="w-6 h-6 text-destructive drop-shadow-md" />
                    </div>
                  )}
                </div>
              </div>

              {/* Form */}
              <div>
                <form onSubmit={handleSubmit} className="bg-card rounded-2xl border p-6 space-y-4">
                  <h3 className="font-display font-semibold text-foreground mb-2">
                    Detalhes da Ocorrência
                  </h3>

                  {selectedPoint ? (
                    <p className="text-xs text-success flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> Ponto selecionado no mapa
                    </p>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      Clique no mapa para marcar o local
                    </p>
                  )}

                  <div className="space-y-2">
                    <Label>Tipo de Ocorrência *</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(v) => setFormData({ ...formData, type: v })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {issueTypes.map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Descrição *</Label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Descreva o problema..."
                      rows={3}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Nome (opcional)</Label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="O seu nome"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Email (opcional)</Label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Para receber atualizações"
                    />
                  </div>

                  <div className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground">
                    <AlertTriangle className="w-3.5 h-3.5 inline mr-1" />
                    As submissões são validadas antes de publicação.
                  </div>

                  <Button type="submit" className="w-full">
                    <Send className="w-4 h-4 mr-2" /> Submeter Ocorrência
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MapPage;
