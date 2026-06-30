"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

type AppointmentType = "presidente" | "cemiterio";

const titles: Record<AppointmentType, string> = {
  presidente: "Atendimento do Presidente",
  cemiterio: "Atendimento do Secretariado do Cemitério",
};

const descriptions: Record<AppointmentType, string> = {
  presidente:
    "Solicite online o agendamento de atendimento com o presidente da junta de freguesia, indicando os seus dados e o assunto a tratar. Após a submissão do pedido, os serviços da junta entrarão em contacto para confirmar a marcação.",
  cemiterio:
    "Solicite online o agendamento de atendimento com o secretariado do cemitério, indicando os seus dados e o assunto a tratar. Após a submissão do pedido, os serviços da junta entrarão em contacto para confirmar a marcação.",
};

const steps = ["Marcação", "Dados", "Confirmação"];

const faqAnswer = "A pesquisa de documentos pode ser realizada através do centro de documentação da plataforma, onde se encontram disponíveis diferentes conteúdos administrativos, regulamentos, atas, formulários, editais e outros documentos relacionados com a atividade da Junta de Freguesia.";

function SidebarFaq() {
  const [open, setOpen] = useState(false);
  return (
    <div className="border rounded-lg p-3 bg-amber-50 dark:bg-black dark:border-white/20 cursor-pointer text-xs text-muted-foreground dark:text-white/70" onClick={() => setOpen(!open)}>
      <div className="flex items-center justify-between">
        <span>O que fazer se um ficheiro não abrir corretamente?</span>
        <ChevronDown className={`w-3 h-3 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </div>
      {open && <p className="mt-2 dark:text-white/70">Deve tentar novamente :)</p>}
    </div>
  );
}

function MainFaqs() {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = ["Quero casar, o que devo fazer?", "Sinto-me só preciso de ajuda como fazer?"];
  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="bg-amber-50 dark:bg-black rounded-lg overflow-hidden dark:border dark:border-white/20">
          <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-4 text-left font-medium text-foreground dark:text-white">
            {faq}
            <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
          </button>
          {open === i && (
            <div className="px-4 pb-4 text-sm text-muted-foreground dark:text-white/70 border-t border-amber-200 dark:border-white/20">
              <p className="mt-3 mb-3">{faqAnswer}</p>
              <ul className="space-y-1 mb-3 text-xs">
                <li>🔍 utilize a barra de pesquisa para procurar documentos por título, palavra-chave ou assunto</li>
                <li>📋 filtre os conteúdos por categoria, data, tipo de documento ou área temática</li>
                <li>📄 consulte regulamentos, editais, atas, formulários e documentos administrativos disponíveis online</li>
                <li>🏛 explore documentos relacionados com iniciativas, projetos e processos participativos da freguesia</li>
                <li>📥 descarregue documentos em diferentes formatos sempre que disponíveis</li>
                <li>⭐ utilize os destaques e documentos recentes para acompanhar novas publicações e atualizações.</li>
              </ul>
              <div className="flex items-center gap-4 text-xs text-muted-foreground dark:text-white/70 pt-2 border-t border-amber-200 dark:border-white/20">
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

export default function MarcacaoWizard() {
  const [type, setType] = useState<AppointmentType>("presidente");
  const [step, setStep] = useState(1);

  const next = () => setStep((s) => Math.min(s + 1, 3));

  return (
    <div className="balcao-shell">
      <aside className="balcao-sidebar">
        <p className="font-bold text-foreground mb-3">Com quem quer reunir?</p>
        <ul className="space-y-3 text-muted-foreground mb-8">
          <li className="flex items-center gap-2">
            <input
              type="radio"
              checked={type === "presidente"}
              onChange={() => { setType("presidente"); setStep(1); }}
              className="accent-[#C41230]"
            />
            <button onClick={() => { setType("presidente"); setStep(1); }} className={type === "presidente" ? "text-foreground font-medium" : "hover:text-foreground transition"}>
              Presidente
            </button>
          </li>
          <li className="flex items-center gap-2">
            <input
              type="radio"
              checked={type === "cemiterio"}
              onChange={() => { setType("cemiterio"); setStep(1); }}
              className="accent-[#C41230]"
            />
            <button onClick={() => { setType("cemiterio"); setStep(1); }} className={type === "cemiterio" ? "text-foreground font-medium" : "hover:text-foreground transition"}>
              Secretariado do Cemitério
            </button>
          </li>
        </ul>

        <p className="font-bold text-foreground mb-3">Perguntas frequentes</p>
        <SidebarFaq />
      </aside>

      <div className="balcao-main">
        <h1>
          {titles[type]}
        </h1>
        <p className="mb-8 max-w-2xl">
          {descriptions[type]}
        </p>

        {/* STEP INDICATOR */}
        <div className="flex items-center gap-10 mb-10">
          {steps.map((label, i) => {
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
                <span className={`text-xs ${isActive ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        {step === 1 && <StepMarcacao onContinue={next} />}
        {step === 2 && <StepDados onContinue={next} />}
        {step === 3 && <StepConfirmacao />}

        <p className="balcao-section-title mb-3 mt-12">Outros assuntos populares</p>
        <MainFaqs />
      </div>
    </div>
  );
}

function StepMarcacao({ onContinue }: { onContinue: () => void }) {
  const days = [29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 1, 2];
  const [selectedDay, setSelectedDay] = useState(14);

  return (
    <div>
      <p className="font-bold text-foreground mb-4">1 – Quando é que lhe dá jeito?</p>
      <div className="flex flex-wrap gap-6">
        <div className="border rounded-xl p-4 w-72">
          <div className="flex items-center justify-between mb-3">
            <button><ChevronLeft className="w-4 h-4" /></button>
            <span className="text-sm font-medium">Janeiro 2026</span>
            <button><ChevronRight className="w-4 h-4" /></button>
          </div>
          <div className="grid grid-cols-7 text-xs text-muted-foreground mb-2">
            {["S", "T", "Q", "Q", "S", "S", "D"].map((d, i) => (
              <div key={i} className="text-center">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 text-xs">
            {days.map((d, i) => (
              <button
                key={i}
                onClick={() => setSelectedDay(d)}
                className={`h-7 rounded-full ${
                  d === selectedDay ? "bg-[#1C2E56] text-white" : "hover:bg-muted text-foreground"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="border rounded-xl p-4 w-56">
          <div className="flex items-center justify-between mb-3">
            <button><ChevronLeft className="w-4 h-4" /></button>
            <span className="text-sm font-medium">{selectedDay} janeiro</span>
            <button><ChevronRight className="w-4 h-4" /></button>
          </div>
          <p className="text-xs text-muted-foreground mb-2">Horário disponível</p>
          <div className="space-y-2">
            <button className="w-full border rounded-md py-2 text-sm text-muted-foreground">15:30 – 16:00</button>
            <button className="w-full bg-[#1C2E56] text-white rounded-md py-2 text-sm">16:30 – 17:00</button>
          </div>
        </div>
      </div>

      <button
        onClick={onContinue}
        className="mt-6 inline-flex items-center gap-1 bg-[#C41230] text-white rounded-md px-5 py-2 text-sm font-medium hover:bg-[#C41230]/90"
      >
        Continuar <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

function StepDados({ onContinue }: { onContinue: () => void }) {
  return (
    <div>
      <p className="font-bold text-foreground mb-4">2 – Os seus dados pessoais</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mb-4">
        <div>
          <label className="text-sm text-muted-foreground">Nome <span className="text-xs">(Necessário)</span></label>
          <input className="w-full border rounded-md px-3 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Apelido <span className="text-xs">(Necessário)</span></label>
          <input className="w-full border rounded-md px-3 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Idade <span className="text-xs">(Necessário)</span></label>
          <input className="w-full border rounded-md px-3 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Freguesia <span className="text-xs">(Necessário)</span></label>
          <input className="w-full border rounded-md px-3 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Email <span className="text-xs">(Necessário)</span></label>
          <input className="w-full border rounded-md px-3 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Telefone ou Telemóvel</label>
          <input className="w-full border rounded-md px-3 py-2 mt-1 text-sm" />
        </div>
      </div>
      <div className="max-w-xl mb-2">
        <label className="text-sm text-muted-foreground">Assunto <span className="text-xs">(Necessário)</span></label>
        <textarea className="w-full border rounded-md px-3 py-2 mt-1 text-sm h-24" />
      </div>
      <p className="text-xs text-muted-foreground mb-4">
        Agora só falta preencher os dados do objeto do requerimento. Clique no botão ao lado para continuar.
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
      <p className="font-bold text-foreground mb-4">3 – Confirmação</p>
      <p className="text-sm text-muted-foreground mb-4">
        Os formulários/declarações/requerimentos e os regulamentos da União das Freguesias da Glória e Vera Cruz podem ser consultados em www.ufgloriavcruz.pt
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
          Tomei conhecimento que, de acordo com o atendimento da Comissão de Acesso aos Documentos Administrativos, os documentos apresentados no âmbito do presente processo são documentos administrativos, pelo que a Junta de Freguesia estará obrigada a garantir o seu acesso integral a todos aqueles que o solicitem.
        </label>
      </div>
      <p className="text-xs text-muted-foreground mb-4">
        Para mais informações sobre as práticas de privacidade da União das Freguesias de Glória e Vera Cruz consulte a nossa página da privacidade ou envie-nos um email para direitoprivacidade.fgloriavcruz@gmail.com
      </p>
      <div className="max-w-xl mb-4">
        <label className="text-sm text-muted-foreground">Observações</label>
        <textarea className="w-full border rounded-md px-3 py-2 mt-1 text-sm h-20" />
      </div>
      <p className="text-xs text-muted-foreground mb-4">
        Agora só falta preencher os dados do objeto do requerimento. Clique no botão ao lado para continuar.
      </p>
      <button className="inline-flex items-center gap-1 bg-[#C41230] text-white rounded-md px-5 py-2 text-sm font-medium hover:bg-[#C41230]/90">
        Continuar <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
