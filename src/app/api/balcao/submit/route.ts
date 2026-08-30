import { NextRequest, NextResponse } from "next/server";

import { type BalcaoFormKey } from "@/lib/balcaoEmail";

type IncomingPayload = {
  formKey?: BalcaoFormKey;
  formTitle?: string;
  pageUrl?: string;
  fields?: { label: string; value: string }[];
  files?: { name: string; filename: string; contentType: string; data: string }[];
};

// Shared balcao submission endpoint.
// The frontend sends a formKey so we can route each form to its own recipient mailbox.
// Route map:
// - marcacao -> /balcao-digital/marcacoes
// - inscricao_* -> /balcao-digital/inscricoes/*
// - declaracao_* -> /balcao-digital/declaracoes/*
// - cemiterio_* -> /balcao-digital/cemiterios/*
// - proposta -> /balcao-digital/comunidade/propostas
// - reclamacao -> /balcao-digital/comunidade/reclamacoes
// - canideos -> /balcao-digital/canideos
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

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as IncomingPayload;
    if (!payload.formKey) {
      return NextResponse.json({ error: "Missing or invalid form key." }, { status: 400 });
    }

    const recipientEnv = RECIPIENT_ENV_BY_FORM[payload.formKey];
    // Prefer the form-specific mailbox while domain verification and final routing are being
    // completed. `FORM_RECIPIENT_EMAIL` is only the fallback if the specific env var is missing.
    const to = process.env[recipientEnv] || process.env.FORM_RECIPIENT_EMAIL;

    if (!to) {
      return NextResponse.json({ error: "Missing recipient email." }, { status: 400 });
    }

    const text = [
      `Formulário: ${payload.formTitle || payload.formKey}`,
      `Página: ${payload.pageUrl || "N/A"}`,
      "",
      ...(payload.fields ?? []).map((field) => `${field.label}: ${field.value || "-"}`),
    ].join("\n");

    const attachments =
      payload.files?.map((file) => ({
        filename: file.filename,
        content: file.data.includes(",") ? file.data.split(",")[1] : file.data,
      })) ?? [];

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
        subject: `Novo pedido - ${payload.formTitle || payload.formKey}`,
        text,
        attachments,
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: await response.text() },
        { status: response.status || 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to submit form.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
