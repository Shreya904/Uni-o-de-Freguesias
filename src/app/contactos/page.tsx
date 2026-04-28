"use client";

import { useState, useRef } from "react";
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
import { Send, Paperclip, X, CheckCircle, ExternalLink } from "lucide-react";
import { toast } from "sonner";

const categories = [
  { label: "Serviços e Atestados", value: "Servicos e Atestados" },
  { label: "Obras e Infraestruturas", value: "Obras e Infraestruturas" },
  { label: "Apoio Social", value: "Apoio Social" },
  { label: "Atividades e Eventos", value: "Atividades e Eventos" },
  { label: "Outras Questões", value: "Outras Questoes" },
];

const MAX_CHARS = 200;
const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", category: "", message: "" });
  const [file, setFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submissionRef, setSubmissionRef] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const payloadBaseUrl =
    process.env.NEXT_PUBLIC_PAYLOAD_URL?.replace(/\/$/, "") || "http://localhost:3000";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f && f.size > MAX_FILE_SIZE) {
      toast.error(
        "Ficheiro demasiado grande. Limite: 3 MB. Considere fornecer um URL em alternativa.",
      );
      return;
    }
    setFile(f || null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.category || !formData.message) {
      toast.error("Por favor preencha todos os campos obrigatórios.");
      return;
    }

    try {
      setIsSubmitting(true);

      const payloadUrl = `${payloadBaseUrl}/api/contact-submissions`;

      const res = await fetch(payloadUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          category: formData.category,
          message: formData.message,
          sourcePage: "/contactos",
          locale: "pt-PT",
          consent: true,
        }),
      });

      const data = (await res.json().catch(() => null)) as {
        doc?: { id?: string | number };
        error?: string;
        errors?: Array<{ message?: string }>;
      } | null;

      const responseError =
        data?.error || data?.errors?.[0]?.message || `Server error: ${res.status}`;

      if (!res.ok || !data.doc?.id) {
        throw new Error(responseError);
      }

      setSubmissionRef(String(data.doc.id));
      setSubmitted(true);
      toast.success(`Questão submetida com sucesso! Ref: ${data.doc.id}`);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Nao foi possivel submeter a questao. Tente novamente.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="section-padding">
          <div className="container max-w-lg mx-auto text-center">
            <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
            <h1 className="font-display text-3xl font-bold text-foreground mb-3">
              Questão Submetida
            </h1>
            <p className="text-muted-foreground mb-6">
              Obrigado pelo seu contacto. Responderemos assim que possível.
            </p>
            {submissionRef && (
              <p className="text-sm text-muted-foreground mb-4">
                Referência da submissão: {submissionRef}
              </p>
            )}
            <Button
              onClick={() => {
                setSubmitted(false);
                setSubmissionRef("");
                setFormData({ name: "", email: "", category: "", message: "" });
                setFile(null);
              }}
            >
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
          <div className="container max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 rounded-2xl overflow-hidden border bg-card shadow-sm">
              <aside className="relative lg:col-span-6 min-h-[360px] lg:min-h-full">
                <img
                  src="/hero-bg.jpg"
                  alt="Contacto institucional"
                  className="absolute inset-0 w-full h-full object-cover"
                  width={1200}
                  height={1600}
                />
                <div className="absolute inset-0 bg-primary/75" />
                <div className="relative z-10 h-full p-6 md:p-8 text-primary-foreground flex flex-col justify-between gap-5">
                  <div className="space-y-5">
                    <h1 className="font-display text-3xl md:text-4xl font-bold">Contacte-nos</h1>
                    <p className="text-primary-foreground/85 text-sm md:text-base leading-relaxed">
                      Envie a sua questão ou sugestão. Responderemos brevemente.
                    </p>

                    <div className="rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 p-4 space-y-3 text-sm md:text-[15px] leading-relaxed">
                      <h2 className="font-display text-lg md:text-xl font-semibold">
                        Horários de Atendimento (Segunda a Sexta)
                      </h2>
                      <p>Serviço Secretaria (presencial ou email): 09h00-12h30 | 14h00-17h30</p>
                      <p>Email Secretaria: secretaria.fgloriavcruz@gmail.com</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 p-4 space-y-3 text-sm md:text-[15px] leading-relaxed">
                      <h3 className="font-display text-lg font-semibold">Redes Sociais</h3>
                      <p>Facebook: @ufgloriaveracruz</p>
                      <a
                        href="https://www.facebook.com/ufgloriaveracruz"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-white bg-white px-3 py-2 text-sm font-semibold text-primary hover:bg-white/90 transition-colors"
                      >
                        Abrir Facebook <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>

                    <div className="rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 p-4 space-y-3 text-sm md:text-[15px] leading-relaxed">
                      <h3 className="font-display text-lg font-semibold">Formulários Online</h3>
                      <p>Avaliação da qualidade / Sugestões / Reclamações / Elogios</p>
                      <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLSdY1NePDz-YMu7hInSK1v8eOjrQ9PSilF63UE_SSTVeZhiNIw/viewform"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-white bg-white px-3 py-2 text-sm font-semibold text-primary hover:bg-white/90 transition-colors"
                      >
                        Abrir Formulário <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </aside>

              <div className="lg:col-span-6 p-6 md:p-8 lg:p-10">
                <form
                  id="formulario-contacto"
                  onSubmit={handleSubmit}
                  className="space-y-5 scroll-mt-24"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="O seu nome"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="email@exemplo.pt"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Categoria *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(v) => setFormData({ ...formData, category: v })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((c) => (
                          <SelectItem key={c.value} value={c.value}>
                            {c.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="message">Mensagem *</Label>
                      <span
                        className={`text-xs ${formData.message.length > MAX_CHARS ? "text-destructive" : "text-muted-foreground"}`}
                      >
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
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => fileRef.current?.click()}
                      >
                        <Paperclip className="w-4 h-4 mr-1.5" /> Anexar ficheiro
                      </Button>
                      {file && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="truncate max-w-[200px]">{file.name}</span>
                          <button type="button" onClick={() => setFile(null)}>
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                    <input
                      ref={fileRef}
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <p className="text-xs text-muted-foreground">
                      Se o ficheiro exceder 3 MB, considere fornecer um URL de acesso na mensagem.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={formData.message.length > MAX_CHARS || isSubmitting}
                  >
                    <Send className="w-4 h-4 mr-2" /> Enviar Questão
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
}
