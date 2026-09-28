import { NextRequest, NextResponse } from "next/server";
import { type BalcaoFormKey, BALCAO_EMAILS } from "@/lib/balcaoEmail";

// Allow dynamic execution and up to 30s for uploading binary attachments
export const dynamic = "force-dynamic";
export const maxDuration = 30;

type IncomingPayload = {
  formKey?: BalcaoFormKey;
  formTitle?: string;
  pageUrl?: string;
  fields?: { label: string; value: string }[];
  files?: { name: string; filename: string; contentType: string; data: string }[];
};

const RECIPIENT_ENV_BY_FORM: Record<BalcaoFormKey, string> = {
  marcacao: "BALCAO_RECIPIENT_MARCACAO",
  inscricao_passeios: "BALCAO_RECIPIENT_INSCRICAO_PASSEIOS",
  inscricao_almocos: "BALCAO_RECIPIENT_INSCRICAO_ALMOCOS",
  inscricao_hidroginastica: "BALCAO_RECIPIENT_INSCRICAO_HIDROGINASTICA",
  declaracao_uniao_de_facto: "BALCAO_RECIPIENT_DECLARACAO_UNIAO_DE_FACTO",
  declaracao_comunhao: "BALCAO_RECIPIENT_DECLARACAO_COMUNHAO",
  cemiterio_concessao: "BALCAO_RECIPIENT_CEMITERIO_CONCESSAO",
  cemiterio_atualizacao: "BALCAO_RECIPIENT_CEMITERIO_ATUALIZACAO",
  cemiterio_licenca: "BALCAO_RECIPIENT_CEMITERIO_LICENCA",
  cemiterio_requerimento: "BALCAO_RECIPIENT_CEMITERIO_REQUERIMENTO",
  atestado_prova_de_vida: "BALCAO_RECIPIENT_ATESTADO_PROVA_DE_VIDA",
  atestado_residencia: "BALCAO_RECIPIENT_ATESTADO_RESIDENCIA",
  atestado_residencia_escolas: "BALCAO_RECIPIENT_ATESTADO_RESIDENCIA_ESCOLAS",
  atestado_outros: "BALCAO_RECIPIENT_ATESTADO_OUTROS",
  proposta: "BALCAO_RECIPIENT_PROPOSTA",
  reclamacao: "BALCAO_RECIPIENT_RECLAMACAO",
  canideos: "BALCAO_RECIPIENT_CANIDEOS",
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as IncomingPayload;
    if (!payload.formKey) {
      return NextResponse.json({ error: "Missing or invalid form key." }, { status: 400 });
    }

    const recipientEnv = RECIPIENT_ENV_BY_FORM[payload.formKey];
    // Routing priority: Env var -> BALCAO_EMAILS record -> FORM_RECIPIENT_EMAIL
    const to =
      (recipientEnv ? process.env[recipientEnv] : undefined) ||
      BALCAO_EMAILS[payload.formKey] ||
      process.env.FORM_RECIPIENT_EMAIL;

    if (!to) {
      return NextResponse.json({ error: "Missing recipient email." }, { status: 400 });
    }

    const title = payload.formTitle || payload.formKey;
    const fields = payload.fields ?? [];
    const files = payload.files ?? [];

    // 1. Generate clean HTML table rows
    const rowsHtml = fields
      .map((field) => {
        const safeLabel = escapeHtml(field.label);
        const safeValue = escapeHtml(field.value || "-").replace(/\n/g, "<br/>");
        return `
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 10px 14px; font-weight: 600; color: #374151; width: 35%; vertical-align: top; background-color: #f9fafb;">
              ${safeLabel}
            </td>
            <td style="padding: 10px 14px; color: #111827; vertical-align: top; white-space: pre-wrap;">
              ${safeValue}
            </td>
          </tr>
        `;
      })
      .join("");

    // 2. Generate file attachment section HTML
    const filesListHtml =
      files.length > 0
        ? `
        <div style="margin-top: 24px; padding: 14px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px;">
          <h4 style="margin: 0 0 8px 0; color: #1e293b; font-size: 14px; font-weight: 600;">
            Ficheiros Anexados (${files.length})
          </h4>
          <ul style="margin: 0; padding-left: 18px; color: #475569; font-size: 13px;">
            ${files.map((f) => `<li><strong>${escapeHtml(f.name)}:</strong>${escapeHtml(f.filename)}</li>`).join("")}
          </ul>
        </div>
      `
        : "";

    // 3. Complete email HTML wrapper
    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 640px; margin: 0 auto; color: #111827; line-height: 1.5;">
        <div style="background-color: #C41230; padding: 16px 20px; border-radius: 6px 6px 0 0;">
          <h1 style="color: #ffffff; margin: 0; font-size: 18px; font-weight: 700;">
            Balcão Digital — ${escapeHtml(title)}
          </h1>
        </div>
        
        <div style="border: 1px solid #e5e7eb; border-top: none; padding: 20px; border-radius: 0 0 6px 6px;">
          <p style="margin-top: 0; margin-bottom: 16px; font-size: 13px; color: #6b7280;">
            <strong>Página de Origem:</strong> <a href="${payload.pageUrl || "#"}" style="color: #C41230; text-decoration: none;">${payload.pageUrl || "N/A"}</a>
          </p>

          <table style="width: 100%; border-collapse: collapse; font-size: 14px; border: 1px solid #e5e7eb; border-radius: 4px; overflow: hidden;">
            <tbody>
              ${rowsHtml || `<tr><td style="padding: 12px; color: #9ca3af;">Nenhum campo preenchido.</td></tr>`}
            </tbody>
          </table>

          ${filesListHtml}
        </div>
      </div>
    `;

    // 4. Plain-text version for fallback
    const text = [
      `NOVO PEDIDO: ${title}`,
      `Página: ${payload.pageUrl || "N/A"}`,
      "--------------------------------------------------",
      ...fields.map((field) => `${field.label}: ${field.value || "-"}`),
      ...(files.length > 0
        ? ["", "ANEXOS:", ...files.map((f) => `- ${f.name}: ${f.filename}`)]
        : []),
    ].join("\n");

    // 5. Parse attachments with Buffer encoding
    const attachments = files
      .filter((file) => Boolean(file?.data && file?.filename))
      .map((file) => {
        const base64Data = file.data.includes(",")
          ? file.data.split(",")[1].trim()
          : file.data.trim();

        return {
          filename: file.filename,
          content: Buffer.from(base64Data, "base64"),
        };
      });

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY || ""}`,
        "Content-Type": "application/json",
        "User-Agent": "uniao-freguesias-nextjs/1.0",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL || "Balcão Digital <onboarding@resend.dev>",
        to: [to],
        subject: `Novo pedido - ${title}`,
        text,
        html: emailHtml,
        attachments,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: errorText }, { status: response.status || 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to submit form.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
