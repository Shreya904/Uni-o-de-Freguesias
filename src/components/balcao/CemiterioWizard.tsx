"use client";
import { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";

type CemiterioType = "concessao" | "atualizacao" | "licenca" | "requerimento";

const config: Record<CemiterioType, { title: string; description: string }> = {
  concessao: {
    title: "Concessão de Terreno",
    description: "Preencha os dados relativos ao terreno pretendido, indicando a finalidade do pedido e a informação necessária para que os serviços da junta possam analisar, validar e dar seguimento ao processo.",
  },
  atualizacao: {
    title: "Atualização da Concessão",
    description: "Preencha os dados relativos ao terreno pretendido, indicando a finalidade do pedido e a informação necessária para que os serviços da junta possam analisar, validar e dar seguimento ao processo.",
  },
  licenca: {
    title: "Licença de Obras",
    description: "Preencha os dados relativos ao terreno pretendido, indicando a finalidade do pedido e a informação necessária para que os serviços da junta possam analisar, validar e dar seguimento ao processo.",
  },
  requerimento: {
    title: "Requerimento para Inumação, Cremação, Trasladação e Exumação",
    description: "Preencha os dados relativos ao terreno pretendido, indicando a finalidade do pedido e a informação necessária para que os serviços da junta possam analisar, validar e dar seguimento ao processo.",
  },
};

const steps = ["Requerente(s)", "Objeto", "Documentos", "Confirmação"];

const sidebarItems: { label: string; href: string; type: CemiterioType }[] = [
  { label: "Concessão de terreno", href: "/balcao-digital/cemiterios", type: "concessao" },
  { label: "Atualização da concessão", href: "/balcao-digital/cemiterios/atualizacao", type: "atualizacao" },
  { label: "Licença de obras", href: "/balcao-digital/cemiterios/licenca", type: "licenca" },
  { label: "Requerimento para inumação, cremação, trasladação e exumação", href: "/balcao-digital/cemiterios/requerimento", type: "requerimento" },
];

const faqAnswer = "A pesquisa de documentos pode ser realizada através do centro de documentação da plataforma, onde se encontram disponíveis diferentes conteúdos administrativos, regulamentos, atas, formulários, editais e outros documentos relacionados com a atividade da Junta de Freguesia. O sistema permite uma navegação simples e organizada para facilitar o acesso à informação.";

function SidebarFaqs() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-2">
      {[0, 1, 2].map((i) => (
        <div key={i} className="border rounded-lg p-3 bg-amber-50 dark:bg-black dark:border-white/20 cursor-pointer text-xs text-muted-foreground dark:text-white/70" onClick={() => setOpen(open === i ? null : i)}>
          <div className="flex items-center justify-between">
            <span>O que fazer se um ficheiro não abrir corretamente?</span>
            <ChevronDown className={`w-3 h-3 shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
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
          <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-4 text-left font-medium text-foreground dark:text-white">
            {faq}
            <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
          </button>
          {open === i && (
            <div className="px-4 pb-4 text-sm text-muted-foreground border-t border-amber-200 dark:border-white/20 dark:text-white/70">
              <p className="mt-3 mb-3">{faqAnswer}</p>
              <ul className="space-y-1 mb-3 text-xs">
                <li>🔍 utilize a barra de pesquisa para procurar documentos por título, palavra-chave ou assunto</li>
                <li>📋 filtre os conteúdos por categoria, data, tipo de documento ou área temática</li>
                <li>📄 consulte regulamentos, editais, atas, formulários e documentos administrativos disponíveis online</li>
                <li>🏛 explore documentos relacionados com iniciativas, projetos e processos participativos da freguesia</li>
                <li>📥 descarregue documentos em diferentes formatos sempre que disponíveis</li>
                <li>⭐ utilize os destaques e documentos recentes para acompanhar novas publicações e atualizações.</li>
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

export default function CemiterioWizard({ active }: { active: CemiterioType }) {
  const [step, setStep] = useState(1);
  const next = () => setStep((s) => Math.min(s + 1, 4));
  const { title, description } = config[active];

  return (
    <div className="container max-w-6xl mx-auto px-4 py-10 flex gap-10">
      <aside className="hidden md:block w-72 shrink-0 text-sm">
        <p className="font-bold text-foreground mb-3 dark:text-white">O que precisa?</p>
        <ul className="space-y-3 text-muted-foreground mb-8 dark:text-white/70">
          {sidebarItems.map((item) => (
            <li key={item.type} className="flex items-start gap-2">
              <input type="radio" readOnly checked={active === item.type} className="accent-[#C41230] mt-0.5 shrink-0" />
              <a href={item.href} className={active === item.type ? "text-[#C41230] font-medium dark:text-white" : "hover:text-foreground transition dark:text-white/70"}>{item.label}</a>
            </li>
          ))}
        </ul>
        <p className="font-bold text-foreground mb-3 dark:text-white">Perguntas frequentes</p>
        <SidebarFaqs />
      </aside>

      <div className="flex-1">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3 dark:text-white">{title}</h1>
        <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-2xl dark:text-white/80">{description}</p>

        <div className="flex items-start gap-8 mb-10">
          {steps.map((label, i) => {
            const n = i + 1;
            const isActive = n === step;
            const isDone = n < step;
            return (
              <div key={label} className="flex flex-col items-center gap-2 min-w-[60px]">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold border-2 ${isActive || isDone ? "bg-[#C41230] text-white border-[#C41230]" : "border-border text-muted-foreground"}`}>{n}</div>
                <span className={`text-xs text-center ${isActive ? "text-[#C41230] font-medium" : "text-muted-foreground"}`}>{label}</span>
              </div>
            );
          })}
        </div>

        {step === 1 && <StepRequerente onContinue={next} />}
        {step === 2 && <StepObjeto onContinue={next} />}
        {step === 3 && <StepDocumentos onContinue={next} />}
        {step === 4 && <StepConfirmacao />}

        <p className="font-bold text-foreground mb-3 mt-12">Outros assuntos populares</p>
        <MainFaqs />
      </div>
    </div>
  );
}

function StepRequerente({ onContinue }: { onContinue: () => void }) {
  return (
    <div>
      <p className="font-bold text-foreground mb-6">1 — Dados do(s) requerente(s)</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mb-4">
        <div>
          <label className="text-sm text-muted-foreground">Nome <span className="text-xs">(Necessário)</span></label>
          <input className="w-full border rounded-md px-3 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Apelido <span className="text-xs">(Necessário)</span></label>
          <input className="w-full border rounded-md px-3 py-2 mt-1 text-sm" />
        </div>
        <div className="md:col-span-2">
          <label className="text-sm text-muted-foreground">Morada <span className="text-xs">(Necessário)</span></label>
          <textarea className="w-full border rounded-md px-3 py-2 mt-1 text-sm h-20" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Código Postal <span className="text-xs">(Necessário)</span></label>
          <input className="w-full border rounded-md px-3 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Freguesia <span className="text-xs">(Necessário)</span></label>
          <select className="w-full border rounded-md px-3 py-2 mt-1 text-sm text-muted-foreground"><option>— Selecione</option></select>
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Cartão de Cidadão <span className="text-xs">(Necessário)</span></label>
          <input className="w-full border rounded-md px-3 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Válido até <span className="text-xs">(Necessário)</span></label>
          <input className="w-full border rounded-md px-3 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground">NIF <span className="text-xs">(Necessário)</span></label>
          <input className="w-full border rounded-md px-3 py-2 mt-1 text-sm" />
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
      <p className="text-xs text-muted-foreground mb-4">Agora só falta preencher os dados do objeto do requerimento. Clique no botão ao lado para continuar.</p>
      <button onClick={onContinue} className="inline-flex items-center gap-1 bg-[#C41230] text-white rounded-md px-5 py-2 text-sm font-medium hover:bg-[#C41230]/90">Continuar <ChevronRight className="w-4 h-4" /></button>
    </div>
  );
}

function StepObjeto({ onContinue }: { onContinue: () => void }) {
  return (
    <div>
      <p className="font-bold text-foreground mb-6">2 — Objeto do requerimento</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mb-4">
        <div className="md:col-span-2">
          <label className="text-sm text-muted-foreground">Tipo de pedido <span className="text-xs">(Necessário)</span></label>
          <select className="w-full border rounded-md px-3 py-2 mt-1 text-sm text-muted-foreground">
            <option>— Selecione</option>
            <option>Inumação</option>
            <option>Cremação</option>
            <option>Trasladação</option>
            <option>Exumação</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="text-sm text-muted-foreground">Nome do falecido <span className="text-xs">(Necessário)</span></label>
          <input className="w-full border rounded-md px-3 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Data do óbito <span className="text-xs">(Necessário)</span></label>
          <input type="date" className="w-full border rounded-md px-3 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Local do óbito <span className="text-xs">(Necessário)</span></label>
          <input className="w-full border rounded-md px-3 py-2 mt-1 text-sm" />
        </div>
        <div className="md:col-span-2">
          <label className="text-sm text-muted-foreground">Observações</label>
          <textarea className="w-full border rounded-md px-3 py-2 mt-1 text-sm h-20" />
        </div>
      </div>
      <p className="text-xs text-muted-foreground mb-4">Agora só falta preencher os dados do objeto do requerimento. Clique no botão ao lado para continuar.</p>
      <button onClick={onContinue} className="inline-flex items-center gap-1 bg-[#C41230] text-white rounded-md px-5 py-2 text-sm font-medium hover:bg-[#C41230]/90">Continuar <ChevronRight className="w-4 h-4" /></button>
    </div>
  );
}

function StepDocumentos({ onContinue }: { onContinue: () => void }) {
  return (
    <div>
      <p className="font-bold text-foreground mb-2">3 — Documentos instrutórios</p>
      <p className="text-xs text-muted-foreground mb-6">
        Limite de 2 MB. Ficheiros maiores do que este não serão aceites pelo sistema.<br />
        Tipos permitidos: gif, jpg, jpeg, png, txt, pdf, doc, docx, ppt, pptx, xls, xlsx.
      </p>
      <div className="space-y-4 max-w-xl mb-6">
        {["Carregar a fotocópia do Cartão de Cidadão", "Carregar a fotocópia do Cartão de Contribuinte", "Carregar certidão de óbito"].map((label, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground w-64 shrink-0">{label}</span>
            <label className="flex items-center gap-2 border rounded-md px-3 py-2 text-sm cursor-pointer hover:bg-muted">
              <input type="file" className="hidden" />Escolher ficheiro
            </label>
            <span className="text-xs text-muted-foreground">Nenhum ficheiro selecionado</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mb-4">Agora só falta confirmar, está quase.</p>
      <button onClick={onContinue} className="inline-flex items-center gap-1 bg-[#C41230] text-white rounded-md px-5 py-2 text-sm font-medium hover:bg-[#C41230]/90">Continuar <ChevronRight className="w-4 h-4" /></button>
    </div>
  );
}

function StepConfirmacao() {
  return (
    <div>
      <p className="font-bold text-foreground mb-4">4 — Confirmação</p>
      <p className="text-sm text-muted-foreground mb-2">Os formulários/declarações/requerimentos e os regulamentos da União das Freguesias de Glória e Vera Cruz podem ser consultados em www.ufgloriaveracruz.pt.</p>
      <p className="text-sm text-muted-foreground mb-6">Para qualquer esclarecimento poderá contactar os nossos serviços através do número 234 427 065</p>
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
      <p className="text-xs text-muted-foreground mb-2">Para mais informações sobre as práticas de privacidade da União das Freguesias de Glória e Vera Cruz consulte a nossa página da privacidade ou envie-nos um email para direitoprivacidade.fgloriavcruz@gmail.com</p>
      <div className="max-w-xl mb-4 mt-4">
        <label className="text-sm text-muted-foreground">Observações</label>
        <textarea className="w-full border rounded-md px-3 py-2 mt-1 text-sm h-24" />
      </div>
      <p className="text-xs text-muted-foreground mb-4">Tudo preenchido e pronto a enviar! Resta clicar no botão ao lado para confirmar o envio do seu pedido.</p>
      <button className="inline-flex items-center gap-1 bg-[#C41230] text-white rounded-md px-5 py-2 text-sm font-medium hover:bg-[#C41230]/90">Confirmar <ChevronRight className="w-4 h-4" /></button>
    </div>
  );
}
