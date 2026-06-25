"use client";
import { useState } from "react";
import { ChevronRight } from "lucide-react";

const steps = ["Requerente(s)", "Falecido", "Documentos", "Confirmação"];

const MONTHS = ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"];
const DAYS = ["T","T","Q","Q","S","S","D"];
const SLOTS = ["10:30 – 11:30","13:30 – 14:30","14:30 – 17:30"];

function MiniCalendar() {
  const [month, setMonth] = useState(0); // 0 = Janeiro 2026
  const [selectedDay, setSelectedDay] = useState(14);
  const [selectedSlot, setSelectedSlot] = useState(2);
  const year = 2026;
  const monthName = MONTHS[month];
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="flex gap-4 flex-wrap mt-2 mb-6">
      {/* Calendar */}
      <div className="border rounded-lg p-3 w-56">
        <div className="flex items-center justify-between mb-2">
          <button onClick={() => setMonth(m => Math.max(0, m - 1))} className="text-muted-foreground hover:text-foreground px-1">‹</button>
          <span className="text-xs font-semibold">{monthName} {year}</span>
          <button onClick={() => setMonth(m => Math.min(11, m + 1))} className="text-muted-foreground hover:text-foreground px-1">›</button>
        </div>
        <div className="grid grid-cols-7 gap-0.5 mb-1">
          {DAYS.map((d, i) => <div key={i} className="text-center text-[10px] text-muted-foreground">{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-0.5">
          {cells.map((d, i) => (
            <button
              key={i}
              disabled={!d}
              onClick={() => d && setSelectedDay(d)}
              className={`text-[11px] rounded w-6 h-6 flex items-center justify-center ${
                d === selectedDay ? "bg-[#C41230] text-white font-bold" :
                d ? "hover:bg-muted text-foreground" : ""
              }`}
            >{d ?? ""}</button>
          ))}
        </div>
      </div>
      {/* Time slots */}
      <div className="border rounded-lg p-3 w-40">
        <p className="text-[11px] font-semibold mb-2 text-center">{selectedDay} {monthName}</p>
        <p className="text-[10px] text-muted-foreground mb-2 text-center">Horário disponível</p>
        <div className="space-y-1">
          {SLOTS.map((s, i) => (
            <button
              key={i}
              onClick={() => setSelectedSlot(i)}
              className={`w-full text-xs rounded px-2 py-1 ${
                selectedSlot === i ? "bg-[#1a1a2e] text-white" : "border hover:bg-muted text-foreground"
              }`}
            >{s}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

function FileRow({ label, preloaded }: { label: string; preloaded?: string }) {
  return (
    <div className="flex items-center gap-3 flex-wrap mb-2">
      <span className="text-sm text-muted-foreground w-64 shrink-0">{label}</span>
      {preloaded ? (
        <div className="flex items-center gap-2 border border-green-500 rounded-md px-3 py-1.5 text-sm text-green-700 bg-green-50">
          ✓ {preloaded}
        </div>
      ) : (
        <>
          <label className="flex items-center gap-2 border rounded-md px-3 py-1.5 text-sm cursor-pointer hover:bg-muted">
            <input type="file" className="hidden" />
            Escolher ficheiro
          </label>
          <span className="text-xs text-muted-foreground">Nenhum ficheiro selecionado</span>
        </>
      )}
    </div>
  );
}

function StepRequerentes({ onContinue }: { onContinue: () => void }) {
  return (
    <div>
      <p className="font-bold text-foreground mb-4">1 – Dados do(s) requerente(s)</p>

      {/* Agency section */}
      <p className="font-semibold text-foreground mb-3">Agência</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mb-6">
        <div className="md:col-span-2">
          <label className="text-sm text-muted-foreground">Nome/Designação <span className="text-xs">(Necessário)</span></label>
          <input className="w-full border rounded-md px-3 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Fax <span className="text-xs">(Necessário)</span></label>
          <input className="w-full border rounded-md px-3 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Telefone ou Telemóvel</label>
          <input className="w-full border rounded-md px-3 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground">NIF <span className="text-xs">(Necessário)</span></label>
          <input className="w-full border rounded-md px-3 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Registo DGAE nº <span className="text-xs">(Necessário)</span></label>
          <input className="w-full border rounded-md px-3 py-2 mt-1 text-sm" />
        </div>
      </div>

      {/* Requester section */}
      <p className="font-semibold text-foreground mb-3">Requerente</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mb-6">
        <div>
          <label className="text-sm text-muted-foreground">Nome <span className="text-xs">(Necessário)</span></label>
          <input className="w-full border rounded-md px-3 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Apelido <span className="text-xs">(Necessário)</span></label>
          <input className="w-full border rounded-md px-3 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Estado Civil <span className="text-xs">(Necessário)</span></label>
          <input className="w-full border rounded-md px-3 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Profissão <span className="text-xs">(Necessário)</span></label>
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
          <select className="w-full border rounded-md px-3 py-2 mt-1 text-sm text-muted-foreground">
            <option>— Selecione</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Telefone ou Telemóvel</label>
          <input className="w-full border rounded-md px-3 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Cartão de Cidadão <span className="text-xs">(Necessário)</span></label>
          <input className="w-full border rounded-md px-3 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Passaporte nº <span className="text-xs">(Necessário)</span></label>
          <input className="w-full border rounded-md px-3 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Contribuinte <span className="text-xs">(Necessário)</span></label>
          <input className="w-full border rounded-md px-3 py-2 mt-1 text-sm" />
        </div>
      </div>

      {/* Vem na qualidade */}
      <div className="max-w-2xl mb-6">
        <label className="text-sm text-muted-foreground">Vem, na qualidade de e nos termos dos artigos 3º e 4º do Decreto-Lei nº 411/98 de 30 de Dezembro</label>
        <select className="w-full border rounded-md px-3 py-2 mt-1 text-sm text-muted-foreground">
          <option>— Selecione qualquer das situações previstas no nº 2</option>
        </select>
      </div>

      {/* Requerer checkboxes */}
      <div className="max-w-2xl mb-6">
        <p className="text-sm font-semibold text-foreground mb-2">Requerer:</p>
        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
          {["Inumação de Cadáver","Cremação de Cadáver","Exumação de Cadáver","Trasladação de Cadáver","Cremação dos Ossadas","Trasladação do Ossadas"].map(opt => (
            <label key={opt} className="flex items-center gap-2">
              <input type="checkbox" className="accent-[#C41230]" />
              {opt}
            </label>
          ))}
        </div>
      </div>

      {/* Calendar */}
      <p className="text-sm font-semibold text-foreground mb-1">Na seguinte data e hora,</p>
      <MiniCalendar />

      {/* Cemetery selector */}
      <div className="max-w-2xl mb-6">
        <label className="text-sm text-muted-foreground">No Cemitério/Centro Funerário de: <span className="text-xs">(Necessário)</span></label>
        <select className="w-full border rounded-md px-3 py-2 mt-1 text-sm text-muted-foreground">
          <option>— Selecione</option>
        </select>
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

function StepFalecido({ onContinue }: { onContinue: () => void }) {
  return (
    <div>
      <p className="font-bold text-foreground mb-4">1 – Dados do Falecido</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mb-6">
        <div>
          <label className="text-sm text-muted-foreground">Nome <span className="text-xs">(Necessário)</span></label>
          <input className="w-full border rounded-md px-3 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Apelido <span className="text-xs">(Necessário)</span></label>
          <input className="w-full border rounded-md px-3 py-2 mt-1 text-sm" />
        </div>
        <div className="md:col-span-2">
          <label className="text-sm text-muted-foreground">Estado Civil e data da morte <span className="text-xs">(Necessário)</span></label>
          <select className="w-full border rounded-md px-3 py-2 mt-1 text-sm text-muted-foreground">
            <option>— Selecione</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Cartão de Bilhete nº <span className="text-xs">(Necessário)</span></label>
          <input className="w-full border rounded-md px-3 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Data de emissão <span className="text-xs">(Necessário)</span></label>
          <input className="w-full border rounded-md px-3 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Residência à data da morte <span className="text-xs">(Necessário)</span></label>
          <textarea className="w-full border rounded-md px-3 py-2 mt-1 text-sm h-16" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Código Postal <span className="text-xs">(Necessário)</span></label>
          <input className="w-full border rounded-md px-3 py-2 mt-1 text-sm" />
          <label className="text-sm text-muted-foreground mt-2 block">Freguesia <span className="text-xs">(Necessário)</span></label>
          <select className="w-full border rounded-md px-3 py-2 mt-1 text-sm text-muted-foreground">
            <option>— Selecione</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Local de falecimento <span className="text-xs">(Necessário)</span></label>
          <textarea className="w-full border rounded-md px-3 py-2 mt-1 text-sm h-16" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Concelho <span className="text-xs">(Necessário)</span></label>
          <input className="w-full border rounded-md px-3 py-2 mt-1 text-sm" />
          <label className="text-sm text-muted-foreground mt-2 block">Freguesia <span className="text-xs">(Necessário)</span></label>
          <select className="w-full border rounded-md px-3 py-2 mt-1 text-sm text-muted-foreground">
            <option>— Selecione</option>
          </select>
        </div>
      </div>

      {/* Situação atual */}
      <p className="font-semibold text-foreground mb-3">Situação atual</p>
      <div className="max-w-2xl mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
          <div>
            <label className="text-sm text-muted-foreground">Que se encontra no Cemitério/Centro Funerário de: <span className="text-xs">(Necessário)</span></label>
            <input className="w-full border rounded-md px-3 py-2 mt-1 text-sm" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Concelho <span className="text-xs">(Necessário)</span></label>
            <input className="w-full border rounded-md px-3 py-2 mt-1 text-sm" />
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-1">Em: <span className="text-xs">(Necessário)</span></p>
        <div className="grid grid-cols-3 gap-2 mb-3">
          {["Jazigo Particular","Jazigo Municipal","Aeróbea","Sepultura Perpétua","Sepultura Temporária","Colombário","Ossário Particular","Ossário Municipal","Lar corres"].map(opt => (
            <label key={opt} className="flex items-center gap-1 text-xs text-muted-foreground">
              <input type="checkbox" className="accent-[#C41230]" />{opt}
            </label>
          ))}
        </div>
        <div className="flex gap-3 flex-wrap mb-3">
          <div><label className="text-xs text-muted-foreground">Nº</label><input className="border rounded px-2 py-1 text-sm w-20 mt-1 block" /></div>
          <div><label className="text-xs text-muted-foreground">Secção</label><input className="border rounded px-2 py-1 text-sm w-24 mt-1 block" /></div>
          <div><label className="text-xs text-muted-foreground">Rua</label><input className="border rounded px-2 py-1 text-sm w-32 mt-1 block" /></div>
        </div>
        <p className="text-sm text-muted-foreground mb-1">Desde: <span className="text-xs">(Necessário)</span></p>
        <div className="flex gap-2">
          <div><label className="text-xs text-muted-foreground">Dia</label><input className="border rounded px-2 py-1 text-sm w-16 mt-1 block" /></div>
          <div><label className="text-xs text-muted-foreground">Mês</label><input className="border rounded px-2 py-1 text-sm w-16 mt-1 block" /></div>
          <div><label className="text-xs text-muted-foreground">Ano</label><input className="border rounded px-2 py-1 text-sm w-20 mt-1 block" /></div>
        </div>
      </div>

      {/* Situação pretendida */}
      <p className="font-semibold text-foreground mb-3 mt-6">Situação pretendida</p>
      <div className="max-w-2xl mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
          <div>
            <label className="text-sm text-muted-foreground">Destinar-se ao Cemitério/Centro Funerário de: <span className="text-xs">(Necessário)</span></label>
            <input className="w-full border rounded-md px-3 py-2 mt-1 text-sm" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Concelho <span className="text-xs">(Necessário)</span></label>
            <input className="w-full border rounded-md px-3 py-2 mt-1 text-sm" />
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-1">A fim de ser: <span className="text-xs">(Necessário)</span></p>
        <p className="text-xs text-muted-foreground mb-1">Inumado em:</p>
        <div className="grid grid-cols-3 gap-2 mb-2">
          {["Jazigo Particular","Jazigo Municipal","Aeróbea","Sepultura Perpétua","Sepultura Temporária"].map(opt => (
            <label key={opt} className="flex items-center gap-1 text-xs text-muted-foreground">
              <input type="checkbox" className="accent-[#C41230]" />{opt}
            </label>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mb-1">OU</p>
        <p className="text-xs text-muted-foreground mb-1">Colocado em:</p>
        <div className="flex gap-3 mb-3">
          {["Ossário Particular","Ossário Municipal","Colombário"].map(opt => (
            <label key={opt} className="flex items-center gap-1 text-xs text-muted-foreground">
              <input type="checkbox" className="accent-[#C41230]" />{opt}
            </label>
          ))}
        </div>
        <div className="flex gap-3 flex-wrap mb-4">
          <div><label className="text-xs text-muted-foreground">Nº</label><input className="border rounded px-2 py-1 text-sm w-20 mt-1 block" /></div>
          <div><label className="text-xs text-muted-foreground">Secção</label><input className="border rounded px-2 py-1 text-sm w-24 mt-1 block" /></div>
          <div className="flex-1">
            <label className="text-xs text-muted-foreground">Selecione o Cemitério / Centro Funerário</label>
            <select className="w-full border rounded px-2 py-1 text-sm mt-1 text-muted-foreground"><option>— Selecione</option></select>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-1">As cinzas devem ser entregues:</p>
        <div className="space-y-1 mb-4">
          {["Ao requerente","À agência funerária"].map(opt => (
            <label key={opt} className="flex items-center gap-2 text-sm text-muted-foreground">
              <input type="checkbox" className="accent-[#C41230]" />{opt}
            </label>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mb-1">Utilização de Viatura Municipal?</p>
        <div className="flex gap-4 mb-4">
          {["Sim","Não"].map(opt => (
            <label key={opt} className="flex items-center gap-2 text-sm text-muted-foreground">
              <input type="radio" name="viatura" className="accent-[#C41230]" />{opt}
            </label>
          ))}
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

function StepDocumentos({ onContinue }: { onContinue: () => void }) {
  const fileLimit = "Limite de 2 MB. Ficheiros maiores do que este não serão aceites pelo sistema.\nTipos permitidos: gif, jpg, jpeg, png, txt, pdf, doc, docx, ppt, pptx, xls, xlsx.";
  return (
    <div>
      <p className="font-bold text-foreground mb-2">3 – Documentos instrutórios</p>

      {/* 3A */}
      <div className="mb-6">
        <p className="font-semibold text-foreground mb-1">3A – Se é Pessoa Singular precisa enviar-nos estes documentos</p>
        <p className="text-xs text-muted-foreground mb-3 whitespace-pre-line">Número de Identificação Civil e Número de Identificação Fiscal{"\n"}{fileLimit}</p>
        <FileRow label="Carregar a fotocópia do Cartão de Cidadão" />
        <FileRow label="Carregar a fotocópia do Cartão de Contribuinte" preloaded="manuelabreu-117700411-3zx2.pdf" />
      </div>

      {/* 3B */}
      <div className="mb-6">
        <p className="font-semibold text-foreground mb-1">3B – Se é Pessoa Coletiva precisa enviar-nos estes documentos</p>
        <p className="text-xs text-muted-foreground mb-3 whitespace-pre-line">Certidão da Conservatória do Registo Comercial / Número de Identificação Fiscal da Pessoa{"\n"}{fileLimit}</p>
        <FileRow label="Carregar a fotocópia da Certidão da Conservatória do Registo Comercial" />
        <FileRow label="Carregar a fotocópia do Número de Identificação Fiscal da Pessoa" preloaded="slibineral-ida.pdf" />
      </div>

      {/* 3C */}
      <div className="mb-6">
        <p className="font-semibold text-foreground mb-1">3C – Se tem procuração com poderes especiais para o efeito</p>
        <p className="text-xs text-muted-foreground mb-3">Nos casos do nº 3 do art.º 3º{"\n"}{fileLimit}</p>
        <FileRow label="Carregar a fotocópia da Procuração" />
      </div>

      {/* Cartão eleitor */}
      <div className="mb-6 border-t pt-4">
        <p className="font-semibold text-foreground mb-1">Importante! Deverá sempre enviar-nos o Cartão de eleitor do falecido</p>
        <p className="text-xs text-muted-foreground mb-3 whitespace-pre-line">{fileLimit}</p>
        <FileRow label="Carregar a fotocópia do Cartão de Cidadão" />
      </div>

      <p className="text-xs text-muted-foreground mb-4">Agora só falta confirmar, está quase.</p>
      <button onClick={onContinue} className="inline-flex items-center gap-1 bg-[#C41230] text-white rounded-md px-5 py-2 text-sm font-medium hover:bg-[#C41230]/90">
        Continuar <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

function StepConfirmacao() {
  return (
    <div>
      <p className="font-bold text-foreground mb-4">4 – Confirmação</p>
      <p className="text-sm text-muted-foreground mb-2">
        Os formulários/declarações/requerimentos e os regulamentos da União das Freguesias de Glória e Vera Cruz podem ser consultados em{" "}
        <a href="#" className="underline">www.ufgloriaveracruz.pt</a>.
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
        <label className="flex items-start gap-2 text-sm text-muted-foreground">
          <input type="checkbox" className="mt-1 accent-[#C41230]" />
          Para mais informações sobre as práticas de privacidade da União das Freguesias de Glória e Vera Cruz consulte a nossa{" "}
          <a href="#" className="underline">página da privacidade</a> ou envie-nos um email para direitoprivacidade.fgloriavcruz@gmail.com
        </label>
      </div>
      <div className="max-w-xl mb-4">
        <label className="text-sm text-muted-foreground">Observações</label>
        <textarea className="w-full border rounded-md px-3 py-2 mt-1 text-sm h-24" />
      </div>
      <p className="text-xs text-muted-foreground mb-4">
        Tudo preenchido e pronto a enviar! Resta clicar no botão ao lado para confirmar o envio do seu pedido.
      </p>
      <button className="inline-flex items-center gap-1 bg-[#C41230] text-white rounded-md px-5 py-2 text-sm font-medium hover:bg-[#C41230]/90">
        Confirmar <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

export default function CemiterioWizard() {
  const [step, setStep] = useState(1);
  const next = () => setStep((s) => Math.min(s + 1, 4));

  return (
    <div className="balcao-shell">
      {/* SIDEBAR */}
      <aside className="balcao-sidebar">
        <p className="font-bold text-foreground mb-3">O que precisa?</p>
        <ul className="space-y-2 text-muted-foreground mb-8">
          {[
            "Concessão de terreno",
            "Atualização da concessão",
            "Licença de obras",
            "Requerimento para inumação, cremação, trasladação e exumação",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <input type="radio" readOnly checked={i === 3} className="accent-[#C41230] mt-0.5" />
              <span className={i === 3 ? "text-[#C41230] font-medium" : ""}>{item}</span>
            </li>
          ))}
        </ul>
        <p className="font-bold text-foreground mb-3">Perguntas Frequentes</p>
        <div className="space-y-2">
          {["O que fazer se um ficheiro não abrir corretamente?","O que fazer se um ficheiro não abrir corretamente?","O que fazer se um ficheiro não abrir corretamente?"].map((q, i) => (
            <details key={i} className="border rounded-lg p-3 text-muted-foreground text-xs bg-amber-50 cursor-pointer">
              <summary>{q}</summary>
            </details>
          ))}
        </div>
      </aside>

      {/* MAIN */}
      <div className="balcao-main">
        <h1>
          Requerimento para Inumação, Cremação, Trasladação e Exumação
        </h1>
        <p className="mb-8 max-w-2xl">
          Preencha os dados relativos ao terreno pretendido, indicando a finalidade do pedido e a informação necessária para que os serviços da junta possam analisar, validar e dar seguimento ao processo.
        </p>

        {/* STEP INDICATOR */}
        <div className="flex items-center gap-8 mb-10">
          {steps.map((label, i) => {
            const n = i + 1;
            const isActive = n === step;
            const isDone = n < step;
            return (
              <div key={label} className="flex flex-col items-center gap-2">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold border-2 ${
                  isActive || isDone ? "bg-[#C41230] text-white border-[#C41230]" : "border-border text-muted-foreground"
                }`}>{n}</div>
                <span className={`text-xs text-center ${isActive ? "text-[#C41230] font-medium" : "text-muted-foreground"}`}>{label}</span>
              </div>
            );
          })}
        </div>

        {step === 1 && <StepRequerentes onContinue={next} />}
        {step === 2 && <StepFalecido onContinue={next} />}
        {step === 3 && <StepDocumentos onContinue={next} />}
        {step === 4 && <StepConfirmacao />}

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
