"use client";

import { useState, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, Paperclip, X, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const categories = [
  "Serviços e Atestados",
  "Obras e Infraestruturas",
  "Apoio Social",
  "Atividades e Eventos",
  "Outras Questões",
];

const MAX_CHARS = 200;
const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", category: "", message: "" });
  const [file, setFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f && f.size > MAX_FILE_SIZE) {
      toast.error("Ficheiro demasiado grande. Limite: 3 MB. Considere fornecer um URL em alternativa.");
      return;
    }
    setFile(f || null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.category || !formData.message) {
      toast.error("Por favor preencha todos os campos obrigatórios.");
      return;
    }
    // Simulated submission
    setSubmitted(true);
    toast.success("Questão submetida com sucesso!");
  };

  if (submitted) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="section-padding">
          <div className="container max-w-lg mx-auto text-center">
            <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
            <h1 className="font-display text-3xl font-bold text-foreground mb-3">Questão Submetida</h1>
            <p className="text-muted-foreground mb-6">Obrigado pelo seu contacto. Responderemos assim que possível.</p>
            <Button onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", category: "", message: "" }); setFile(null); }}>
              Enviar Nova Questão
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
          <div className="container max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">Contacte-nos</h1>
              <p className="text-muted-foreground mt-3">Envie a sua questão ou sugestão. Responderemos brevemente.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-card rounded-2xl border p-6 md:p-8 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome *</Label>
                  <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="O seu nome" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="email@exemplo.pt" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Categoria *</Label>
                <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="message">Mensagem *</Label>
                  <span className={`text-xs ${formData.message.length > MAX_CHARS ? "text-destructive" : "text-muted-foreground"}`}>
                    {formData.message.length}/{MAX_CHARS}
                  </span>
                </div>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => {
                    if (e.target.value.length <= MAX_CHARS) {
                      setFormData({ ...formData, message: e.target.value });
                    }
                  }}
                  placeholder="Descreva a sua questão..."
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Anexo (opcional, máx. 3 MB)</Label>
                <div className="flex items-center gap-3">
                  <Button type="button" variant="outline" size="sm" onClick={() => fileRef.current?.click()}>
                    <Paperclip className="w-4 h-4 mr-1.5" /> Anexar ficheiro
                  </Button>
                  {file && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="truncate max-w-[200px]">{file.name}</span>
                      <button type="button" onClick={() => setFile(null)}><X className="w-4 h-4" /></button>
                    </div>
                  )}
                </div>
                <input ref={fileRef} type="file" className="hidden" onChange={handleFileChange} />
                <p className="text-xs text-muted-foreground">
                  Se o ficheiro exceder 3 MB, considere fornecer um URL de acesso na mensagem.
                </p>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={formData.message.length > MAX_CHARS}>
                <Send className="w-4 h-4 mr-2" /> Enviar Questão
              </Button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
