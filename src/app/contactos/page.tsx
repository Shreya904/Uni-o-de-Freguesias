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
import { CheckCircle, Calendar, MapPin, Mail, Phone } from "lucide-react";
import { toast } from "sonner";

const categories = [
  { label: "Serviços e Atestados", value: "Servicos e Atestados" },
  { label: "Obras e Infraestruturas", value: "Obras e Infraestruturas" },
  { label: "Apoio Social", value: "Apoio Social" },
  { label: "Atividades e Eventos", value: "Atividades e Eventos" },
  { label: "Outras Questões", value: "Outras Questoes" },
];

const MAX_CHARS = 200;
const MAX_FILE_SIZE = 2 * 1024 * 1024; // Ajustado para 2MB conforme as novas diretrizes de texto

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    category: "",
    message: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [submissionRef, setSubmissionRef] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const payloadBaseUrl =
    process.env.NEXT_PUBLIC_PAYLOAD_URL?.replace(/\/$/, "") || "http://localhost:3000";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f && f.size > MAX_FILE_SIZE) {
      toast.error(
        "Ficheiro demasiado grande. Limite: 2 MB. Ficheiros maiores do que este não serão aceites pelo sistema.",
      );
      return;
    }
    setFile(f || null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.lastName ||
      !formData.email ||
      !formData.category ||
      !formData.message
    ) {
      toast.error("Por favor preencha todos os campos obrigatórios.");
      return;
    }

    try {
      setIsSubmitting(true);

      let mediaId = null;

      // 1. Upload file to Media FIRST
      if (file) {
        const formDataUpload = new FormData();
        formDataUpload.append("file", file);

        const uploadRes = await fetch(`${payloadBaseUrl}/api/media`, {
          method: "POST",
          body: formDataUpload,
        });

        const uploadData = await uploadRes.json();

        if (!uploadRes.ok || !uploadData.doc?.id) {
          throw new Error("Falha ao fazer upload do ficheiro");
        }

        mediaId = uploadData.doc.id;
      }

      // 2. Submit contact form with media reference
      const res = await fetch(`${payloadBaseUrl}/api/contact-submissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${formData.name} ${formData.lastName}`.trim(),
          email: formData.email,
          category: formData.category,
          message: formData.message,
          attachment: mediaId,
          sourcePage: "/contactos",
          locale: "pt-PT",
          consent: true,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.doc?.id) {
        throw new Error("Server error");
      }

      setSubmissionRef(data.doc.id);
      setSubmitted(true);
      toast.success(`Questão submetida com sucesso!`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro ao submeter");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <main>
        {/* WRAPPED HEADER & HERO */}
        <div className="relative">
          {/* Header overlaying the section */}
          <div className="absolute top-0 left-0 right-0 z-50">
            <Header />
          </div>

          {/* HERO */}
          <section className="relative h-[400px] overflow-hidden">
            <img
              src="/contact-hero.jpg"
              alt="Contacto"
              className="absolute inset-0 h-full w-full object-cover grayscale"
            />

            {/* Blue tinted overlay to blend with header */}
            <div className="absolute inset-0 bg-[#253e6b]/70 mix-blend-multiply" />
            <div className="absolute inset-0 bg-[#253e6b]/40" />

            <div className="relative z-10 flex h-full items-end px-6 md:px-8 lg:px-16 pb-10 max-w-[1600px] mx-auto">
              <div>
                <h1 className="text-white text-4xl md:text-[56px] leading-tight md:leading-[52px] font-extrabold tracking-[1.12px]">
                  Contacto
                </h1>
                <p className="text-white text-xl md:text-[28px] font-extrabold tracking-[0.56px] mt-2">
                  Fale connosco
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* CONTENT */}
        <section className="max-w-[1600px] mx-auto border-x border-[#E5E5E5]">
          {/* Added grid-cols-1 for proper mobile stacking */}
          <div className="grid grid-cols-1 lg:grid-cols-[450px_1fr] xl:grid-cols-[500px_1fr]">
            {/* SIDEBAR */}
            <aside className="bg-[#F8F8F8] dark:bg-black px-6 md:px-8 py-12 lg:px-12 border-r border-[#E5E5E5] dark:border-white/10">
              {/* SEDE */}
              <div className="mb-14">
                <h2 className="text-[#1C2E56] dark:text-white text-3xl md:text-[32px] font-extrabold leading-tight tracking-[0.64px] mb-1">
                  Sede
                </h2>
                <p className="text-[#1C2E56] dark:text-white font-bold text-[16px] mb-6">
                  Mudança Provisória de Instalações
                </p>

                <div className="space-y-6 text-[#1C2E56] dark:text-white text-[16px]">
                  <div className="flex gap-3 items-start">
                    <Calendar className="w-5 h-5 mt-0.5 shrink-0" />
                    <div>
                      <h3 className="font-extrabold tracking-wide mb-1">Horários de Atendimento</h3>
                      <p>Segunda a Sexta</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <Calendar className="w-5 h-5 mt-0.5 shrink-0" />
                    <div>
                      <h3 className="font-extrabold tracking-wide mb-1">Serviço Secretaria</h3>
                      <p>Presencial ou por email</p>
                      <p className="font-semibold">09h00 - 12h30 | 14h00 - 17h30</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <MapPin className="w-5 h-5 mt-0.5 shrink-0" />
                    <div>
                      <h3 className="font-extrabold tracking-wide mb-1">Morada</h3>
                      <p>
                        Avenida Dr. Lourenço Peixinho, Edifício 15 - 1º B, 3800 - 164 Aveiro /
                        (Apartado 84 ECAveiro)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 overflow-hidden border border-[#E5E5E5] dark:border-white/10">
                  <iframe
                    title="Mapa Sede"
                    src="https://maps.google.com/maps?q=Avenida%20Dr.%20Louren%C3%A7o%20Peixinho,%20Edif%C3%ADcio%2015,%20Aveiro&t=&z=16&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-[220px] border-0"
                    allowFullScreen={false}
                    loading="lazy"
                  />
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex gap-2 items-center text-[#1C2E56] dark:text-white">
                    <Mail className="w-5 h-5 shrink-0" />
                    <p className="font-semibold break-all">geral.fgloriavcruz@gmail.com</p>
                  </div>
                  <button className="flex items-center justify-center gap-3 border-2 border-[#1C2E56] dark:border-white/20 rounded-none px-6 py-3 font-extrabold text-[#1C2E56] dark:text-white hover:bg-[#1C2E56] hover:text-white transition-colors w-full sm:w-auto">
                    <Phone className="w-5 h-5" />
                    <span>234 427 832</span>
                  </button>
                  <p className="text-[13px] text-[#1C2E56] dark:text-white mt-2">
                    (chamada para a rede fixa nacional)
                  </p>
                </div>
              </div>

              {/* CASA DA COMUNIDADE SUSTENTÁVEL */}
              <div>
                <h2 className="text-[#1C2E56] dark:text-white text-3xl md:text-[32px] font-extrabold leading-tight tracking-[0.64px]">
                  Casa da Comunidade
                </h2>
                <h2 className="text-[#1C2E56] dark:text-white text-3xl md:text-[32px] font-extrabold leading-tight tracking-[0.64px] mb-6">
                  Sustentável
                </h2>

                <div className="space-y-6 text-[#1C2E56] dark:text-white text-[16px]">
                  <div className="flex gap-3 items-start">
                    <Calendar className="w-5 h-5 mt-0.5 shrink-0" />
                    <div>
                      <h3 className="font-extrabold tracking-wide mb-1">Horários de Atendimento</h3>
                      <p>Segunda a Sexta</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <Calendar className="w-5 h-5 mt-0.5 shrink-0" />
                    <div>
                      <h3 className="font-extrabold tracking-wide mb-1">Serviço Secretaria</h3>
                      <p>Presencial ou por email</p>
                      <p className="font-semibold">09h00 - 12h30 | 14h00 - 17h30</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <Calendar className="w-5 h-5 mt-0.5 shrink-0" />
                    <div>
                      <h3 className="font-extrabold tracking-wide mb-1">
                        Serviço Contabilidade / Tesouraria
                      </h3>
                      <p>por marcação telefónica ou por email</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <Calendar className="w-5 h-5 mt-0.5 shrink-0" />
                    <div>
                      <h3 className="font-extrabold tracking-wide mb-1">Serviço Cemitérios</h3>
                      <p>Presencial ou por email</p>
                      <p className="font-semibold">09h00 - 12h30 | 14h00 - 17h30</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <MapPin className="w-5 h-5 mt-0.5 shrink-0" />
                    <div>
                      <h3 className="font-extrabold tracking-wide mb-1">Morada</h3>
                      <p>Rua das Pombas Nº9 /11, 3810 - 150 Aveiro / (Apartado 84 ECAveiro)</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 overflow-hidden border border-[#E5E5E5] dark:border-white/10">
                  <iframe
                    title="Mapa Casa da Comunidade Sustentável"
                    src="https://maps.google.com/maps?q=Rua%20das%20Pombas%209%2011,%20Aveiro&t=&z=16&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-[220px] border-0"
                    allowFullScreen={false}
                    loading="lazy"
                  />
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex gap-2 items-center text-[#1C2E56] dark:text-white">
                    <Mail className="w-5 h-5 shrink-0" />
                    <p className="font-semibold break-all">servicos.fgloriavcruz@gmail.com</p>
                  </div>
                  <button className="flex items-center justify-center gap-3 border-2 border-[#1C2E56] dark:border-white/20 rounded-none px-6 py-3 font-extrabold text-[#1C2E56] dark:text-white hover:bg-[#1C2E56] hover:text-white transition-colors w-full sm:w-auto">
                    <Phone className="w-5 h-5" />
                    <span>234 427 065</span>
                  </button>
                  <p className="text-[13px] text-[#1C2E56] dark:text-white mt-2">
                    (chamada para a rede fixa nacional)
                  </p>
                </div>
              </div>
            </aside>

            {/* MAIN FORM AREA */}
            <div className="px-6 py-12 md:px-8 lg:px-16 lg:py-16 bg-white dark:bg-black">
              <div className="max-w-[700px] w-full">
                {submitted ? (
                  <div className="bg-[#F8F8F8] dark:bg-black border-2 border-[#1C2E56] dark:border-white/20 p-6 md:p-10 text-center">
                    <CheckCircle className="w-16 h-16 text-[#B4142F] mx-auto mb-6" />
                    <h2 className="text-[#1C2E56] dark:text-white text-2xl md:text-[36px] font-extrabold mb-4">
                      Mensagem Enviada!
                    </h2>
                    <p className="text-[#1C2E56] dark:text-white/80 text-[18px] leading-relaxed mb-8">
                      Recebemos o seu contacto e responderemos com a maior brevidade possível.
                    </p>
                    <Button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: "",
                          lastName: "",
                          email: "",
                          category: "",
                          message: "",
                        });
                        setFile(null);
                      }}
                      className="h-[50px] px-8 bg-[#1C2E56] hover:bg-[#162545] rounded-none text-white font-extrabold text-[16px] w-full sm:w-auto"
                    >
                      Enviar Nova Mensagem
                    </Button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-[#1C2E56] dark:text-white text-3xl md:text-[48px] leading-tight font-extrabold tracking-[0.96px] mb-6">
                      Estamos aqui para ajudar
                    </h2>

                    <p className="text-[#1C2E56] dark:text-white/80 text-lg md:text-[22px] leading-relaxed mb-12">
                      Procuramos responder a toda a comunicação escrita o mais rapidamente possível
                      e no prazo máximo de 20 dias úteis. Saiba mais sobre como gerimos a sua
                      correspondência.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-8 w-full">
                      {/* Name & Surname Group */}
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <Label
                            htmlFor="name"
                            className="font-extrabold text-[18px] tracking-[0.36px] text-[#1C2E56]"
                          >
                            Nome (Necessário)
                          </Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="h-[50px] rounded-none border-2 border-[#1C2E56] bg-white text-[#1C2E56] text-[16px] focus-visible:ring-0 focus-visible:ring-offset-0"
                            required
                          />
                        </div>

                        <div className="space-y-3">
                          <Label
                            htmlFor="lastName"
                            className="font-extrabold text-[18px] tracking-[0.36px] text-[#1C2E56]"
                          >
                            Apelido (Necessário)
                          </Label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            className="h-[50px] rounded-none border-2 border-[#1C2E56] bg-white text-[#1C2E56] text-[16px] focus-visible:ring-0 focus-visible:ring-offset-0"
                            required
                          />
                        </div>
                      </div>

                      {/* Category */}
                      <div className="space-y-3">
                        <Label className="font-extrabold text-[18px] tracking-[0.36px] text-[#1C2E56]">
                          Quem é? (Necessário)
                        </Label>
                        <Select
                          value={formData.category}
                          onValueChange={(v) => setFormData({ ...formData, category: v })}
                          required
                        >
                          <SelectTrigger className="h-[50px] rounded-none border-2 border-[#1C2E56] text-[#1C2E56] text-[16px] focus:ring-0 focus:ring-offset-0">
                            <SelectValue placeholder=" — Selecione" />
                          </SelectTrigger>
                          <SelectContent className="rounded-none border-2 border-[#1C2E56]">
                            {categories.map((c) => (
                              <SelectItem
                                key={c.value}
                                value={c.value}
                                className="text-[16px] focus:bg-[#F8F8F8] focus:text-[#1C2E56]"
                              >
                                {c.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Email */}
                      <div className="space-y-3">
                        <Label
                          htmlFor="email"
                          className="font-extrabold text-[18px] tracking-[0.36px] text-[#1C2E56]"
                        >
                          Email (Necessário)
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="h-[50px] rounded-none border-2 border-[#1C2E56] bg-white text-[#1C2E56] text-[16px] focus-visible:ring-0 focus-visible:ring-offset-0"
                          required
                        />
                      </div>

                      {/* Message */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label
                            htmlFor="message"
                            className="font-extrabold text-[18px] tracking-[0.36px] text-[#1C2E56]"
                          >
                            A sua mensagem
                          </Label>
                          <span
                            className={`text-[14px] font-bold ${formData.message.length > MAX_CHARS ? "text-[#B4142F]" : "text-[#1C2E56]/60"}`}
                          >
                            {formData.message.length}/{MAX_CHARS}
                          </span>
                        </div>
                        <p className="text-sm text-[#1C2E56]/80 -mt-1">
                          Por favor, explique o seu pedido. Se tiver mais detalhes a acrescentar,
                          carregue-os como um documento Word na secção de anexos.
                        </p>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => {
                            if (e.target.value.length <= MAX_CHARS) {
                              setFormData({ ...formData, message: e.target.value });
                            }
                          }}
                          className="min-h-[126px] rounded-none border-2 border-[#1C2E56] bg-white text-[#1C2E56] text-[16px] resize-none focus-visible:ring-0 focus-visible:ring-offset-0 w-full"
                          required
                        />
                      </div>

                      {/* Upload */}
                      <div className="space-y-3">
                        <Label className="font-extrabold text-[18px] tracking-[0.36px] text-[#1C2E56]">
                          Carregue documentos
                        </Label>
                        <p className="text-sm text-[#1C2E56]/80 -mt-1">
                          Limite de 2 MB. Ficheiros maiores do que este não serão aceites pelo
                          sistema.
                        </p>
                        <p className="text-[12px] text-[#1C2E56]/60 -mt-1">
                          Tipos permitidos: gif, jpg, jpeg, png, txt, pdf, doc, docx, ppt, pptx,
                          xls, xlsx.
                        </p>

                        <div className="h-[50px] border-2 border-[#1C2E56] flex items-center px-[10px] gap-[10px] bg-white w-full overflow-hidden">
                          <Button
                            type="button"
                            variant="outline"
                            className="rounded-none border border-[#D0CCCC] h-[34px] px-4 font-bold text-[#1C2E56] hover:bg-[#F8F8F8] shrink-0"
                            onClick={() => fileRef.current?.click()}
                          >
                            Escolher ficheiro
                          </Button>
                          <span className="text-[15px] text-[#1C2E56] truncate">
                            {file ? file.name : "Nenhum ficheiro selecionado"}
                          </span>
                        </div>
                        <input
                          ref={fileRef}
                          type="file"
                          accept=".gif,.jpg,.jpeg,.png,.txt,.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </div>

                      {/* Consent & Submit */}
                      <div className="space-y-6 pt-4">
                        <p className="text-[14px] leading-relaxed text-[#1C2E56]/80 font-medium">
                          Ao submeter este formulário, consente no tratamento dos seus dados
                          pessoais para efeitos de análise e resposta ao seu pedido de contacto
                          dirigido à Junta de Freguesia. Os seus dados serão tratados em
                          conformidade com a nossa política de privacidade.
                        </p>

                        <div className="flex justify-end">
                          <Button
                            type="submit"
                            disabled={formData.message.length > MAX_CHARS || isSubmitting}
                            className="h-[60px] px-12 bg-[#B4142F] hover:bg-[#9B1128] rounded-none text-white font-extrabold text-[18px] tracking-[0.36px] transition-colors w-full sm:w-auto"
                          >
                            {isSubmitting ? "A submeter..." : "Continuar"}
                          </Button>
                        </div>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
