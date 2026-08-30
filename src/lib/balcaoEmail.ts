export type BalcaoFormKey =
  | "marcacao"
  | "inscricao_passeios"
  | "inscricao_almocos"
  | "inscricao_hidroginastica"
  | "declaracao_uniao_de_facto"
  | "declaracao_comunhao"
  | "cemiterio_concessao"
  | "cemiterio_atualizacao"
  | "cemiterio_licenca"
  | "cemiterio_requerimento"
  | "atestado_prova_de_vida"
  | "atestado_residencia"
  | "atestado_residencia_escolas"
  | "atestado_outros"
  | "proposta"
  | "reclamacao"
  | "canideos";

export const BALCAO_EMAILS: Record<BalcaoFormKey, string> = {
  marcacao: "secretaria.fgloriavcruz@gmail.com",
  inscricao_passeios: "secretaria.fgloriavcruz@gmail.com",
  inscricao_almocos: "secretaria.fgloriavcruz@gmail.com",
  inscricao_hidroginastica: "secretaria.fgloriavcruz@gmail.com",
  declaracao_uniao_de_facto: "secretaria.fgloriavcruz@gmail.com",
  declaracao_comunhao: "secretaria.fgloriavcruz@gmail.com",
  cemiterio_concessao: "cemiterio.fgloriavcruz@gmail.com",
  cemiterio_atualizacao: "secretaria.fgloriavcruz@gmail.com",
  cemiterio_licenca: "secretaria.fgloriavcruz@gmail.com",
  cemiterio_requerimento: "secretaria.fgloriavcruz@gmail.com",
  atestado_prova_de_vida: "secretaria.fgloriavcruz@gmail.com",
  atestado_residencia: "presidente.fgloriavcruz@gmail.com",
  atestado_residencia_escolas: "servicos.fgloriavcruz@gmail.com",
  atestado_outros: "secretaria.fgloriavcruz@gmail.com",
  proposta: "servicos.fgloriavcruz@gmail.com",
  reclamacao: "servicos.fgloriavcruz@gmail.com",
  canideos: "servicos.fgloriavcruz@gmail.com",
};

export type NormalizedField = {
  label: string;
  value: string;
};

export function collectBalcaoFields(root: HTMLElement): {
  fields: NormalizedField[];
  files: { name: string; file: File }[];
} {
  const controls = Array.from(
    root.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
      "input, textarea, select",
    ),
  );

  const fields: NormalizedField[] = [];
  const files: { name: string; file: File }[] = [];

  controls.forEach((control, index) => {
    if (control instanceof HTMLInputElement && control.type === "radio") return;
    if (control instanceof HTMLInputElement && control.type === "checkbox") {
      fields.push({
        label: getLabel(control, index),
        value: control.checked ? "Sim" : "Não",
      });
      return;
    }
    if (control instanceof HTMLInputElement && control.type === "file") {
      const file = control.files?.[0];
      if (file) {
        files.push({ name: getLabel(control, index), file });
      }
      return;
    }

    fields.push({
      label: getLabel(control, index),
      value: control.value?.trim() || "",
    });
  });

  return { fields, files };
}

function getLabel(control: Element, index: number) {
  const container = control.closest("div");
  const label = container?.querySelector("label")?.textContent?.trim();
  return label || `Campo ${index + 1}`;
}
