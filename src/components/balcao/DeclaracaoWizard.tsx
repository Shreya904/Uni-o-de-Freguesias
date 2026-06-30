"use client";
import { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";

type DeclaracaoType = "comunhao" | "uniao";

const steps = ["Proponentes", "Documentos", "Pagamento", "Confirmação"];

const faqAnswer = "A pesquisa de documentos pode ser realizada através do centro de documentação da plataforma, onde se encontram disponíveis diferentes conteúdos administrativos, regulamentos, atas, formulários, editais e outros documentos relacionados com a atividade da Junta de Freguesia. O sistema permite uma navegação simples e organizada para facilitar o acesso à informação.";

function SidebarFaq() {
  const [open, setOpen] = useState(false);
  return (
    <div className="border rounded-lg p-3 bg-amber-50 dark:bg-black dark:border-white/20 cursor-pointer text-xs text-muted-foreground dark:text-white/70" onClick={() => setOpen(!open)}>
      <div className="flex items-center justify-between">
        <span>O que fazer se um ficheiro não abrir corretamente?</span>
        <ChevronDown className={`w-3 h-3 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </div>
      {open && <p className="mt-2">Deve tentar novamente :)</p>}
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

export default function DeclaracaoWizard({ active }: { active: DeclaracaoType }) {
  const [step, setStep] = useState(1);
  const next = () => setStep((s) => Math.min(s + 1, 4));

  return (
    <div className="balcao-shell">
      <aside className="balcao-sidebar">
        <p className="font-bold text-foreground mb-3 dark:text-white">Que declaração precisa?</p>
        <ul className="space-y-3 text-muted-foreground mb-8 dark:text-white/70">
          <li className="flex items-center gap-2">
            <input type="radio" readOnly checked={active === "comunhao"} className="accent-[#C41230]" />
            <a href="/balcao-digital/declaracoes" className={active === "comunhao" ? "text-foreground font-medium dark:text-white" : "hover:text-foreground transition dark:text-white/70"}>
              Comunhão de mesa e habitação
            </a>
          </li>
          <li className="flex items-center gap-2">
            <input type="radio" readOnly checked={active === "uniao"} className="accent-[#C41230]" />
            <a href="/balcao-digital/declaracoes/uniao-de-facto" className={active === "uniao" ? "text-foreground font-medium dark:text-white" : "hover:text-foreground transition dark:text-white/70"}>
              União de facto
            </a>
          </li>
        </ul>
        <p className="font-bold text-foreground mb-3 dark:text-white">Perguntas frequentes</p>
        <SidebarFaq />
      </aside>

      <div className="balcao-main">
        {active === "comunhao" ? (
          <ComunhaoContent />
        ) : (
          <>
            <h1 className="dark:text-white">União de facto</h1>
            <p className="mb-8 max-w-2xl dark:text-white/80">
              Indique os dados necessários para a emissão da declaração de união de facto, identificando os requerentes, para que os serviços da junta possam analisar e dar seguimento ao processo.
            </p>
            <div className="flex items-center gap-8 mb-10">
              {steps.map((label, i) => {
                const n = i + 1;
                const isActive = n === step;
                const isDone = n < step;
                return (
                  <div key={label} className="flex flex-col items-center gap-2">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold border-2 ${isActive || isDone ? "bg-[#C41230] text-white border-[#C41230]" : "border-border text-muted-foreground"}`}>{n}</div>
                    <span className={`text-xs ${isActive ? "text-[#C41230] font-medium" : "text-muted-foreground"}`}>{label}</span>
                  </div>
                );
              })}
            </div>
            {step === 1 && <StepProponentes onContinue={next} />}
            {step === 2 && <StepDocumentos onContinue={next} />}
            {step === 3 && <StepPagamento onContinue={next} />}
            {step === 4 && <StepConfirmacao />}
          </>
        )}

        <p className="balcao-section-title mb-3 mt-12">Outros assuntos populares</p>
        <MainFaqs />
      </div>
    </div>
  );
}

function ComunhaoContent() {
  return (
    <div>
      <h1 className="dark:text-white">Comunhão de mesa e habitação</h1>
      <div className="mb-10 max-w-2xl space-y-4 dark:text-white/80">
        <p>Para solicitar uma declaração de Comunhão de mesa e habitação, deverá dirigir-se presencialmente aos serviços da junta de freguesia.</p>
        <p>Este procedimento permite confirmar que a pessoa se encontra viva e pode ser necessário para efeitos de pensão, processos administrativos, entidades bancárias, seguradoras ou outros organismos públicos e privados.</p>
        <p>O requerente terá de trazer fotocópia dos seus documentos (B.I./Passaporte/Cartão de Cidadão e Cartão de Contribuinte).</p>
        <p>Não podem ser testemunhas os familiares do requerente nem os cidadãos estrangeiros.</p>
        <p>Depois da entrega deste requerimento, o atestado estará pronto num espaço de 2 dias úteis, altura em que poderá ser levantado, até ao limite de 30 dias, depois dessa data será arquivado, juntamente com o processo.</p>
        <p>A União das Freguesias de Glória e Vera Cruz utiliza os seus dados pessoais para dar resposta aos seus pedidos, instrução dos seus processos, prestar informação sobre assuntos da autarquia e para fins estatísticos.</p>
        <p>Para mais informações sobre as práticas de privacidade da União das Freguesias de Glória e Vera Cruz consulte a nossa página da privacidade ou envie-nos um email para direitoprivacidade.fgloriavcruz@gmail.com.</p>
        <p>Para qualquer esclarecimento poderá contactar os nossos serviços através do número 234 427 065</p>
      </div>
    </div>
  );
}

function ProponenteFields({ label }: { label: string }) {
  return (
    <div className="mb-8">
      <p className="font-semibold text-foreground mb-4">{label}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
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
          <textarea className="w-full border rounded-md px-3 py-2 mt-1 text-sm h-16" />
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
        <div className="md:col-span-2">
          <label className="text-sm text-muted-foreground">Data de nascimento <span className="text-xs">(Necessário)</span></label>
          <div className="flex gap-2 mt-1">
            <input placeholder="Dia" className="w-20 border rounded-md px-3 py-2 text-sm" />
            <input placeholder="Mês" className="w-20 border rounded-md px-3 py-2 text-sm" />
            <input placeholder="Ano" className="w-24 border rounded-md px-3 py-2 text-sm" />
          </div>
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
    </div>
  );
}

function StepProponentes({ onContinue }: { onContinue: () => void }) {
  return (
    <div>
      <p className="font-bold text-foreground mb-6">1A — Dados do 1º Proponente</p>
      <ProponenteFields label="1A — Dados do 1º Proponente" />
      <p className="font-bold text-foreground mb-6">1B — Dados do 2º Proponente</p>
      <ProponenteFields label="1B — Dados do 2º Proponente" />
      <p className="text-xs text-muted-foreground mb-4">Agora só falta preencher os dados do objeto do requerimento. Clique no botão ao lado para continuar.</p>
      <button onClick={onContinue} className="inline-flex items-center gap-1 bg-[#C41230] text-white rounded-md px-5 py-2 text-sm font-medium hover:bg-[#C41230]/90">Continuar <ChevronRight className="w-4 h-4" /></button>
    </div>
  );
}

function StepDocumentos({ onContinue }: { onContinue: () => void }) {
  return (
    <div>
      <p className="font-bold text-foreground mb-2">2 — Documentos instrutórios</p>
      <p className="text-xs text-muted-foreground mb-6">
        Número de Identificação Civil e Número de Identificação Fiscal<br />
        Limite de 2 MB. Ficheiros maiores do que este não serão aceites pelo sistema.<br />
        Tipos permitidos: gif, jpg, jpeg, png, txt, pdf, doc, docx, ppt, pptx, xls, xlsx.
      </p>
      {["1º Proponente", "2º Proponente"].map((label, idx) => (
        <div key={idx} className="mb-8">
          <p className="font-semibold text-foreground mb-4">2{idx === 0 ? "A" : "B"} — Documentos do {label}</p>
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground w-56">Carregar a fotocópia do Cartão de Cidadão</span>
              <label className="flex items-center gap-2 border rounded-md px-3 py-2 text-sm cursor-pointer hover:bg-muted">
                <input type="file" className="hidden" />Escolher ficheiro
              </label>
              <span className="text-xs text-muted-foreground">Nenhum ficheiro selecionado</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground w-56">Carregar a fotocópia do Cartão de Contribuinte</span>
              <div className="flex items-center gap-2 border border-green-500 rounded-md px-3 py-2 text-sm text-green-700 bg-green-50">
                ✓ manuelabreu-11770041-3zx2.pdf
              </div>
            </div>
          </div>
        </div>
      ))}
      <p className="text-xs text-muted-foreground mb-4">Agora só falta confirmar, está quase.</p>
      <button onClick={onContinue} className="inline-flex items-center gap-1 bg-[#C41230] text-white rounded-md px-5 py-2 text-sm font-medium hover:bg-[#C41230]/90">Continuar <ChevronRight className="w-4 h-4" /></button>
    </div>
  );
}

function StepPagamento({ onContinue }: { onContinue: () => void }) {
  return (
    <div>
      <p className="font-bold text-foreground mb-4">3 — Pagamento</p>
      <p className="text-sm text-muted-foreground mb-2">Qual é o método que prefere usar para efetuar o pagamento?</p>
      <button className="bg-[#C41230] text-white text-xs rounded px-3 py-1 mb-4">Na Junta</button>
      <p className="text-sm text-muted-foreground mb-6">Deverá deslocar-se aos serviços da junta para efetuar o pagamento e confirmar a sua participação.</p>
      <p className="text-xs text-muted-foreground mb-4">Agora só falta preencher os dados do objeto do requerimento. Clique no botão ao lado para continuar.</p>
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
