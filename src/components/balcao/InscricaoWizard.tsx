"use client";
import { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";

type InscricaoType = "passeios" | "almosos" | "hidroginastica";

const titles: Record<InscricaoType, string> = {
  passeios: "Inscrição em passeios",
  almosos: "Inscrição em almoços",
  hidroginastica: "Inscrição em hidroginástica",
};

const descriptions: Record<InscricaoType, string> = {
  passeios:
    "Inscreva-se online nos passeios organizados pela junta de freguesia, preenchendo os dados solicitados e efetuando o respetivo pagamento, quando aplicável. A inscrição fica sujeita às vagas disponíveis e às condições definidas para cada atividade.",
  almosos:
    "Inscreva-se online nos almoços organizados pela junta de freguesia, preenchendo os dados solicitados e efetuando o respetivo pagamento, quando aplicável. A inscrição fica sujeita às vagas disponíveis e às condições definidas para cada atividade.",
  hidroginastica:
    "Inscreva-se online nas aulas de hidroginástica organizadas pela junta de freguesia, preenchendo os dados solicitados e efetuando o respetivo pagamento, quando aplicável. A inscrição fica sujeita às vagas disponíveis e às condições definidas para cada atividade.",
};

const steps = ["Dados", "Pagamento", "Confirmação"];

const faqAnswer =
  "A pesquisa de documentos pode ser realizada através do centro de documentação da plataforma, onde se encontram disponíveis diferentes conteúdos administrativos, regulamentos, atas, formulários, editais e outros documentos relacionados com a atividade da Junta de Freguesia. O sistema permite uma navegação simples e organizada para facilitar o acesso à informação.";

function SidebarFaqs() {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
    "Como posso inscrever-me para participar na feira?",
    "Que documentos são necessários para participar?",
  ];
  return (
    <div className="space-y-2">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className="border rounded-lg p-3 bg-amber-50 dark:bg-black dark:border-white/20 cursor-pointer text-xs text-muted-foreground dark:text-white/70"
          onClick={() => setOpen(open === i ? null : i)}
        >
          <div className="flex items-center justify-between">
            <span>{faq}</span>
            <ChevronDown
              className={`w-3 h-3 shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`}
            />
          </div>
          {open === i && <p className="mt-2">Deve tentar novamente :)</p>}
        </div>
      ))}
    </div>
  );
}

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

export default function InscricaoWizard({ active }: { active: InscricaoType }) {
  const [step, setStep] = useState(1);
  const next = () => setStep((s) => Math.min(s + 1, 3));

  return (
    <div className="balcao-shell">
      <aside className="balcao-sidebar">
        <p className="font-bold text-foreground mb-3 dark:text-white">
          Em que atividades se quer inscrever?
        </p>
        <ul className="space-y-3 text-muted-foreground mb-8 dark:text-white/70">
          {(["passeios", "almosos", "hidroginastica"] as InscricaoType[]).map((t) => (
            <li key={t} className="flex items-center gap-2">
              <input type="radio" readOnly checked={active === t} className="accent-[#C41230]" />
              <a
                href={`/balcao-digital/inscricoes/${t === "almosos" ? "almocos" : t}`}
                className={
                  active === t
                    ? "text-foreground font-medium dark:text-white"
                    : "hover:text-foreground transition dark:text-white/70"
                }
              >
                {t === "passeios"
                  ? "Passeios Sénior"
                  : t === "almosos"
                    ? "Almoços Sénior"
                    : "Hidroginástica"}
              </a>
            </li>
          ))}
        </ul>
        <p className="font-bold text-foreground mb-3 dark:text-white">Perguntas frequentes</p>
        <SidebarFaqs />
      </aside>

      <div className="balcao-main">
        <h1 className="dark:text-white">{titles[active]}</h1>
        <p className="mb-8 max-w-2xl dark:text-white/80">{descriptions[active]}</p>

        <div className="flex items-center gap-10 mb-10">
          {steps.map((label, i) => {
            const n = i + 1;
            const isActive = n === step;
            const isDone = n < step;
            return (
              <div key={label} className="flex flex-col items-center gap-2">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold border-2 ${isActive || isDone ? "bg-[#C41230] text-white border-[#C41230]" : "border-border text-muted-foreground"}`}
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

        {step === 1 && <StepDados onContinue={next} />}
        {step === 2 && <StepPagamento onContinue={next} />}
        {step === 3 && <StepConfirmacao />}

        <p className="balcao-section-title mb-3 mt-12">Outros assuntos populares</p>
        <MainFaqs />
      </div>
    </div>
  );
}

function StepDados({ onContinue }: { onContinue: () => void }) {
  return (
    <div>
      <p className="font-bold text-foreground mb-4">1 — Os seus dados pessoais</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mb-4">
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
            Idade <span className="text-xs">(Necessário)</span>
          </label>
          <input className="w-full border rounded-md px-3 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground">
            Freguesia <span className="text-xs">(Necessário)</span>
          </label>
          <input className="w-full border rounded-md px-3 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Data do passeio</label>
          <select className="w-full border rounded-md px-3 py-2 mt-1 text-sm text-muted-foreground">
            <option>— Selecione</option>
          </select>
        </div>
        <div />
        <div>
          <label className="text-sm text-muted-foreground">
            Email <span className="text-xs">(Necessário)</span>
          </label>
          <input className="w-full border rounded-md px-3 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Telefone ou Telemóvel</label>
          <input className="w-full border rounded-md px-3 py-2 mt-1 text-sm" />
        </div>
      </div>
      <p className="text-xs text-muted-foreground mb-4">
        Agora só falta preencher os dados do objeto do requerimento. Clique no botão ao lado para
        continuar.
      </p>
      <button
        onClick={onContinue}
        className="inline-flex items-center gap-1 bg-[#C41230] text-white rounded-md px-5 py-2 text-sm font-medium hover:bg-[#C41230]/90"
      >
        Continuar <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

function StepPagamento({ onContinue }: { onContinue: () => void }) {
  return (
    <div>
      <p className="font-bold text-foreground mb-4">2 — Pagamento</p>
      <p className="text-sm text-muted-foreground mb-2">
        Qual o método que prefere usar para efetuar o pagamento?
      </p>
      <button className="bg-[#C41230] text-white text-xs rounded px-3 py-1 mb-4">Na Junta</button>
      <p className="text-sm text-muted-foreground mb-6">
        Deverá deslocar-se aos serviços da junta para efetuar o pagamento e confirmar a sua
        participação.
      </p>
      <p className="text-xs text-muted-foreground mb-4">
        Agora só falta preencher os dados do objeto do requerimento. Clique no botão ao lado para
        continuar.
      </p>
      <button
        onClick={onContinue}
        className="inline-flex items-center gap-1 bg-[#C41230] text-white rounded-md px-5 py-2 text-sm font-medium hover:bg-[#C41230]/90"
      >
        Continuar <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

function StepConfirmacao() {
  return (
    <div>
      <p className="font-bold text-foreground mb-4">3 — Confirmação</p>
      <p className="text-sm text-muted-foreground mb-2">
        A confirmação da inscrição será enviada para o endereço de email indicado, que poderá ser{" "}
        <span className="font-semibold text-foreground">confirmado@gmail.pt</span>.
      </p>
      <p className="text-sm text-muted-foreground mb-6">
        Para qualquer esclarecimento poderá contactar os nossos serviços através do número 234 427
        065
      </p>
      <div className="space-y-3 mb-6 max-w-2xl">
        <label className="flex items-start gap-2 text-sm text-muted-foreground">
          <input type="checkbox" className="mt-1 accent-[#C41230]" />
          Tomei conhecimento que a União de Freguesias da Glória e Vera Cruz utiliza os seus dados
          pessoais para dar resposta aos seus pedidos, instrução dos seus processos, prestar
          informação sobre assuntos da autarquia e para fins estatísticos.
        </label>
        <label className="flex items-start gap-2 text-sm text-muted-foreground">
          <input type="checkbox" className="mt-1 accent-[#C41230]" />
          Tomei conhecimento que, de acordo com o entendimento da Comissão de Acesso aos Documentos
          Administrativos, os documentos apresentados no âmbito do presente processo são documentos
          administrativos, pelo que a Junta de Freguesia estará obrigada a garantir o seu acesso
          integral a todos aqueles que o solicitem.
        </label>
      </div>
      <div className="max-w-xl mb-4">
        <label className="text-sm text-muted-foreground">Descrição</label>
        <textarea className="w-full border rounded-md px-3 py-2 mt-1 text-sm h-20" />
      </div>
      <p className="text-xs text-muted-foreground mb-4">
        Agora só falta preencher os dados do objeto do requerimento. Clique no botão ao lado para
        continuar.
      </p>
      <button className="inline-flex items-center gap-1 bg-[#C41230] text-white rounded-md px-5 py-2 text-sm font-medium hover:bg-[#C41230]/90">
        Continuar <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
