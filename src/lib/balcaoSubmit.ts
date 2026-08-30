import { collectBalcaoFields, type BalcaoFormKey } from "@/lib/balcaoEmail";

type SubmitOptions = {
  root: HTMLElement;
  formKey: BalcaoFormKey;
  formTitle: string;
};

async function fileToDataUrl(file: File): Promise<string> {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

export async function submitBalcaoForm({ root, formKey, formTitle }: SubmitOptions) {
  const { fields, files } = collectBalcaoFields(root);
  const payloadFiles = await Promise.all(
    files.map(async ({ name, file }) => ({
      name,
      filename: file.name,
      contentType: file.type || "application/octet-stream",
      data: await fileToDataUrl(file),
    })),
  );

  const response = await fetch("/api/balcao/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      formKey,
      formTitle,
      pageUrl: window.location.href,
      fields,
      files: payloadFiles,
    }),
  });

  if (!response.ok) {
    throw new Error((await response.json().catch(() => null))?.error || "Submission failed");
  }
}
