"use client";
import { useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BalcaoHeader from "@/components/balcao/BalcaoHeader";
import { ChevronRight, ChevronDown } from "lucide-react";
import { submitBalcaoForm } from "@/lib/balcaoSubmit";
import { validateAcknowledgements, validateRequiredFields } from "@/components/balcao/validateRequiredFields";
import { toast } from "sonner";

const faqAnswer =
  "A pesquisa de documentos pode ser realizada através do centro de documentação da plataforma, onde se encontram disponíveis diferentes conteúdos administrativos, regulamentos, atas, formulários, editais e outros documentos relacionados com a atividade da Junta de Freguesia. O sistema permite uma navegação simples e organizada para facilitar o acesso à informação.";

function MainFaqs() {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = ["Quero casar, o que devo fazer?", "Sinto-me só preciso de ajuda como fazer?"];
  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="bg-amber-50 dark:bg-black rounded-lg overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between p-4 text-left font-medium text-foreground dark:text-white"
          >
            {faq}
            <ChevronDown
              className={`w-4 h-4 shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`}
            />
          </button>
          {open === i && (
            <div className="px-4 pb-4 text-sm text-muted-foreground border-t border-amber-200 dark:border-white/20 dark:text-white/70">
              <p className="mt-3 mb-3">{faqAnswer}</p>
              <ul className="space-y-1 mb-3 text-xs">
                <li>
                  🔍 utilize a barra de pesquisa para procurar documentos por título, palavra-chave
                  ou assunto
                </li>
                <li>
                  📋 filtre os conteúdos por categoria, data, tipo de documento ou área temática
                </li>
                <li>
                  📄 consulte regulamentos, editais, atas, formulários e documentos administrativos
                  disponíveis online
                </li>
                <li>
                  🏛 explore documentos relacionados com iniciativas, projetos e processos
                  participativos da freguesia
                </li>
                <li>📥 descarregue documentos em diferentes formatos sempre que disponíveis</li>
                <li>
                  ⭐ utilize os destaques e documentos recentes para acompanhar novas publicações e
                  atualizações.
                </li>
              </ul>
              <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-amber-200 dark:border-white/20 dark:text-white/70">
                <span>Atualizado a 29 abril, 2026</span>
                <span>Partilhar 🔗</span>
                <span>Esta informação foi útil? 👍 👎</span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function ReclamacoesPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  return (
    <div className="min-h-screen" ref={rootRef}>
      <Header />
      <BalcaoHeader />
      <main className="container max-w-2xl mx-auto px-4 py-12">
        <h1 className="font-display text-3xl font-bold text-foreground text-center mb-2">
          Reclamações e Sugestões
        </h1>

        <p className="text-muted-foreground text-sm text-center mb-8 max-w-lg mx-auto">
          Apresente uma reclamação ou deixe uma sugestão à Junta de Freguesia através do balcão
          digital. Indique a natureza do assunto, descreva a situação com o máximo de detalhe
          possível e deixe os seus contactos para que os serviços possam analisar o pedido e dar-lhe
          resposta.
        </p>
        <div className="flex items-center justify-center gap-16 mb-10">
          {["Dados", "Confirmação"].map((label, i) => {
            const n = i + 1;
            const isActive = n === step;
            const isDone = n < step;
            return (
              <div key={label} className="flex flex-col items-center gap-2">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold border-2 ${
                    isActive || isDone
                      ? "bg-[#C41230] text-white border-[#C41230]"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  {n}
                </div>
                <span
                  className={`text-xs ${isActive ? "text-foreground font-medium" : "text-muted-foreground"}`}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
        {step === 1 && (
          <div className="space-y-8" data-required-fields>
            <div>
              <h2 className="font-bold text-foreground mb-4">1 — Natureza do problema?</h2>
              <label className="text-sm text-muted-foreground">
                Tipo de problema <span className="text-xs">(Necessário)</span>
              </label>
              <select className="w-full border rounded-md px-3 py-2 mt-1 text-sm text-muted-foreground">
                <option>— Selecione</option>
                <option>Espaço público</option>
                <option>Serviços</option>
                <option>Outro</option>
              </select>
            </div>
            <div>
              <h2 className="font-bold text-foreground mb-4">
                2 — Qual é a sua reclamação ou sugestão?
              </h2>
              <label className="text-sm text-muted-foreground">
                Reclamação ou sugestão <span className="text-xs">(Necessário)</span>
              </label>
              <textarea
                placeholder="Mensagem..."
                className="w-full border rounded-md px-3 py-2 mt-1 text-sm h-32 resize-none"
              />
            </div>
            <div>
              <h2 className="font-bold text-foreground mb-4">3 — Os seus dados</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">
                    Nome <span className="text-xs">(Necessário)</span>
                  </label>
                  <input className="w-full border rounded-md px-3 py-2 mt-1 text-sm" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">
                    Apelido <span className="text-xs">(Necessário)</span>
                  </label>
                  <input className="w-full border rounded-md px-3 py-2 mt-1 text-sm" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">
                    Email <span className="text-xs">(Necessário)</span>
                  </label>
                  <input type="email" className="w-full border rounded-md px-3 py-2 mt-1 text-sm" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Telefone ou Telemóvel</label>
                  <input className="w-full border rounded-md px-3 py-2 mt-1 text-sm" />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2">
              <p className="text-xs text-muted-foreground">
                Agora só falta confirmar. Vamos a isso!
              </p>
              <button
                onClick={(event) => validateRequiredFields(event.currentTarget) && setStep(2)}
                className="inline-flex items-center gap-1 bg-[#C41230] text-white rounded-md px-5 py-2 text-sm font-medium hover:bg-[#C41230]/90"
              >
                Continuar <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div data-required-acknowledgements>
            <h2 className="font-bold text-foreground mb-4">2 — Confirmação</h2>
            <p className="text-sm text-muted-foreground mb-2">
              A confirmação da inscrição será enviada para o respectivo endereço de e-mail responsável.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Para qualquer esclarecimento poderá contactar os nossos serviços através do número 234 427 065
            </p>
            <div className="space-y-3 mb-6 max-w-2xl">
              <label className="flex items-start gap-2 text-sm text-muted-foreground">
                <input type="checkbox" className="mt-1 accent-[#C41230]" />
                Tomei conhecimento que a União de Freguesias da Glória e Vera Cruz utiliza os seus dados pessoais para dar resposta aos seus pedidos, instrução dos seus processos, prestar informação sobre assuntos da autarquia e para fins estatísticos.
              </label>
              <label className="flex items-start gap-2 text-sm text-muted-foreground">
                <input type="checkbox" className="mt-1 accent-[#C41230]" />
                Tomei conhecimento que, de acordo com o entendimento da Comissão de Acesso aos Documentos Administrativos, os documentos apresentados no âmbito do presente processo são documentos administrativos, pelo que a Junta de Freguesia estará obrigada a garantir o seu acesso integral a todos aqueles que o solicitem.
              </label>
            </div>
            <div className="max-w-xl mb-4">
              <label className="text-sm text-muted-foreground">Descrição</label>
              <textarea className="w-full border rounded-md px-3 py-2 mt-1 text-sm h-20" />
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              Agora só falta preencher os dados do objeto do requerimento. Clique no botão ao lado para continuar.
            </p>
            <button
              onClick={async (event) => {
                if (!validateAcknowledgements(event.currentTarget) || isSubmitting) return;
                if (!rootRef.current) return;
                setIsSubmitting(true);
                try {
                  await submitBalcaoForm({
                    root: rootRef.current,
                    formKey: "reclamacao",
                    formTitle: "Reclamações e Sugestões",
                  });
                  toast.success("Reclamação submetida com sucesso!");
                  setStep(1);
                } catch (error) {
                  toast.error(error instanceof Error ? error.message : "Não foi possível submeter a reclamação.");
                } finally {
                  setIsSubmitting(false);
                }
              }}
              disabled={isSubmitting}
              className="inline-flex items-center gap-1 bg-[#C41230] text-white rounded-md px-5 py-2 text-sm font-medium hover:bg-[#C41230]/90"
            >
              {isSubmitting ? "A submeter..." : "Submeter"} <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
        <div className="border-t mt-12 pt-8">
          <p className="font-bold text-foreground mb-3">Outros assuntos populares</p>
          <MainFaqs />
        </div>
      </main>
      <Footer />
    </div>
  );
}
