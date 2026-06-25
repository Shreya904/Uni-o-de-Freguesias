"use client";
import { useState } from "react";
import { ChevronRight } from "lucide-react";

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

export default function InscricaoWizard({ active }: { active: InscricaoType }) {
  const [step, setStep] = useState(1);
  const next = () => setStep((s) => Math.min(s + 1, 3));

  return (
    <div className="balcao-shell">
      {/* SIDEBAR */}
      <aside className="balcao-sidebar">
        <p className="font-bold text-foreground mb-3">Em que atividades se quer inscrever?</p>
        <ul className="space-y-3 text-muted-foreground mb-8">
          {(["passeios", "almosos", "hidroginastica"] as InscricaoType[]).map((t) => (
            <li key={t} className="flex items-center gap-2">
              <input type="radio" readOnly checked={active === t} className="accent-[#C41230]" />

<a
  href={`/balcao-digital/inscricoes/${t === "almosos" ? "almocos" : t}`}
  className={
    active === t
      ? "text-foreground font-medium"
      : "hover:text-foreground transition"
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
        <p className="font-bold text-foreground mb-3">Perguntas frequentes</p>
        <details className="border rounded-lg p-3 text-muted-foreground text-xs bg-amber-50 cursor-pointer">
          <summary>Como posso inscrever-me para participar na feira?</summary>
        </details>
        <details className="border rounded-lg p-3 text-muted-foreground text-xs bg-amber-50 cursor-pointer mt-2">
          <summary>Que documentos são necessários para participar?</summary>
        </details>
      </aside>

      {/* MAIN */}
      <div className="balcao-main">
        <h1>
          {titles[active]}
        </h1>
        <p className="mb-8 max-w-2xl">
          {descriptions[active]}
        </p>

        {/* STEP INDICATOR */}
        <div className="flex items-center gap-10 mb-10">
          {steps.map((label, i) => {
            const n = i + 1;
            const isActive = n === step;
            const isDone = n < step;
            return (
              <div key={label} className="flex flex-col items-center gap-2">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold border-2 ${
                  isActive || isDone ? "bg-[#C41230] text-white border-[#C41230]" : "border-border text-muted-foreground"
                }`}>{n}</div>
                <span className={`text-xs ${isActive ? "text-foreground font-medium" : "text-muted-foreground"}`}>{label}</span>
              </div>
            );
          })}
        </div>

        {step === 1 && <StepDados onContinue={next} />}
        {step === 2 && <StepPagamento onContinue={next} />}
        {step === 3 && <StepConfirmacao />}

        <p className="balcao-section-title mb-3 mt-12">Outros assuntos populares</p>
        <div className="space-y-3">
          <details className="bg-amber-50 rounded-lg p-4 cursor-pointer">
            <summary className="font-medium text-foreground">Quero casar, o que devo fazer?</summary>
          </details>
          <details className="bg-amber-50 rounded-lg p-4 cursor-pointer">
            <summary className="font-medium text-foreground">Sinto-me só preciso de ajuda como fazer?</summary>
          </details>
        </div>
      </div>
    </div>
  );
}

function StepDados({ onContinue }: { onContinue: () => void }) {
  return (
    <div>
      <p className="font-bold text-foreground mb-4">1 – Os seus dados pessoais</p>
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
          <label className="text-sm text-muted-foreground">Data de passeia</label>
          <select className="w-full border rounded-md px-3 py-2 mt-1 text-sm text-muted-foreground">
            <option>— Selecione</option>
          </select>
        </div>
        <div />
        <div>
          <label className="text-sm text-muted-foreground">Email <span className="text-xs">(Necessário)</span></label>
          <input className="w-full border rounded-md px-3 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Telefone ou Telemóvel</label>
          <input className="w-full border rounded-md px-3 py-2 mt-1 text-sm" />
        </div>
      </div>
      <p className="text-xs text-muted-foreground mb-4">
        Agora só falta preencher os dados do objeto do requerimento. Clique no botão ao lado para continuar.
      </p>
      <button onClick={onContinue} className="inline-flex items-center gap-1 bg-[#C41230] text-white rounded-md px-5 py-2 text-sm font-medium hover:bg-[#C41230]/90">
        Continuar <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

function StepPagamento({ onContinue }: { onContinue: () => void }) {
  return (
    <div>
      <p className="font-bold text-foreground mb-4">2 – Pagamento</p>
      <p className="text-sm text-muted-foreground mb-2">Qual o método que prefere usar para efetuar o pagamento?</p>
      <p className="text-xs text-muted-foreground mb-4">Dor data entidade não temos nas gls parti ispar.</p>
      <button className="bg-[#C41230] text-white text-xs rounded px-3 py-1 mb-4">Na Junta</button>
      <p className="text-sm text-muted-foreground mb-6">
        Deverá deslocar-se aos serviços da junta para efetuar o pagamento e confirmar a sua participação e finar a série teste.
      </p>
      <p className="text-xs text-muted-foreground mb-4">
        Agora só falta preencher os dados do objeto do requerimento. Clique no botão ao lado para continuar.
      </p>
      <button onClick={onContinue} className="inline-flex items-center gap-1 bg-[#C41230] text-white rounded-md px-5 py-2 text-sm font-medium hover:bg-[#C41230]/90">
        Continuar <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

function StepConfirmacao() {
  return (
    <div>
      <p className="font-bold text-foreground mb-4">3 – Confirmação</p>
      <p className="text-sm text-muted-foreground mb-2">
        A confirmação da inscrição será enviada para o endereço de email indicado, que poderá ser{" "}
        <span className="font-semibold text-foreground">confirmado@gmail.pt</span>.
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
      <button className="inline-flex items-center gap-1 bg-[#C41230] text-white rounded-md px-5 py-2 text-sm font-medium hover:bg-[#C41230]/90">
        Continuar <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
