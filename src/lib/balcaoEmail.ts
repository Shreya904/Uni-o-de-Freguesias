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
  marcacao: "office@uhxilab.com",
  inscricao_passeios: "office@uhxilab.com",
  inscricao_almocos: "office@uhxilab.com",
  inscricao_hidroginastica: "office@uhxilab.com",
  declaracao_uniao_de_facto: "office@uhxilab.com",
  declaracao_comunhao: "office@uhxilab.com",
  cemiterio_concessao: "office@uhxilab.com",
  cemiterio_atualizacao: "office@uhxilab.com",
  cemiterio_licenca: "office@uhxilab.com",
  cemiterio_requerimento: "office@uhxilab.com",
  atestado_prova_de_vida: "office@uhxilab.com",
  atestado_residencia: "office@uhxilab.com",
  atestado_residencia_escolas: "office@uhxilab.com",
  atestado_outros: "office@uhxilab.com",
  proposta: "office@uhxilab.com",
  reclamacao: "office@uhxilab.com",
  canideos: "office@uhxilab.com",
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
    // Ignore submit/button controls
    if (
      control instanceof HTMLInputElement &&
      (control.type === "submit" || control.type === "button")
    ) {
      return;
    }

    // Skip unchecked radios so we only record the selected value
    if (control instanceof HTMLInputElement && control.type === "radio") {
      if (control.checked) {
        fields.push({
          label: getLabel(control, index),
          value: control.value || "Selecionado",
        });
      }
      return;
    }

    const label = getLabel(control, index);

    // Checkboxes
    if (control instanceof HTMLInputElement && control.type === "checkbox") {
      fields.push({
        label,
        value: control.checked ? "Sim" : "Não",
      });
      return;
    }

    // File attachments
    if (control instanceof HTMLInputElement && control.type === "file") {
      const fileList = control.files;
      if (fileList && fileList.length > 0) {
        Array.from(fileList).forEach((file) => {
          files.push({ name: label, file });
        });
      }
      return;
    }

    // Standard text, email, select, textarea
    const rawVal = control.value?.trim();
    fields.push({
      label,
      value: rawVal && rawVal !== "— Selecione" ? rawVal : "Não preenchido",
    });
  });

  return { fields, files };
}

function cleanLabelText(text: string): string {
  return text
    .replace(/\(Necessário\)|\*/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getLabel(control: HTMLElement, index: number): string {
  // 1. Prioritize explicit name or aria-label attributes
  const directName = control.getAttribute("name");
  if (directName && directName.trim()) return directName.trim();

  const ariaLabel = control.getAttribute("aria-label");
  if (ariaLabel && ariaLabel.trim()) return ariaLabel.trim();

  // 2. Check for an explicit `<label for="...">`
  if (control.id) {
    const explicitLabel = document.querySelector(`label[for="${CSS.escape(control.id)}"]`);
    if (explicitLabel?.textContent) {
      const cleaned = cleanLabelText(explicitLabel.textContent);
      if (cleaned) return cleaned;
    }
  }

  // 3. Check if wrapped inside a `<label>`
  const parentLabel = control.closest("label");
  if (parentLabel) {
    const clone = parentLabel.cloneNode(true) as HTMLElement;
    clone.querySelectorAll("input, textarea, select").forEach((el) => el.remove());
    const cleaned = cleanLabelText(clone.textContent || "");
    if (cleaned) return cleaned;
  }

  // 4. Look for the nearest label inside the parent container
  const container = control.closest("div");
  const containerLabel = container?.querySelector("label")?.textContent;
  if (containerLabel) {
    const cleaned = cleanLabelText(containerLabel);
    if (cleaned) return cleaned;
  }

  // 5. Placeholder fallback before numeric index
  const placeholder = control.getAttribute("placeholder");
  if (placeholder && placeholder.trim()) return placeholder.trim();

  return `Campo ${index + 1}`;
}
