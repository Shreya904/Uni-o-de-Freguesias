import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function deriveDocumentPreviewUrl(sourceUrl: string) {
  const value = sourceUrl.trim();

  // Google Drive: /file/d/<id>/view|edit|preview -> /file/d/<id>/preview
  const driveFileMatch = value.match(/drive\.google\.com\/file\/d\/([^/]+)/i);
  if (driveFileMatch?.[1]) {
    return `https://drive.google.com/file/d/${driveFileMatch[1]}/preview`;
  }

  // Google Drive: open?id=<id> -> /file/d/<id>/preview
  const driveOpenMatch = value.match(/[?&]id=([^&]+)/i);
  if (value.includes("drive.google.com/open") && driveOpenMatch?.[1]) {
    return `https://drive.google.com/file/d/${driveOpenMatch[1]}/preview`;
  }

  // Direct PDFs or other embeddable links (e.g., filesusr) can be used as-is.
  return value;
}
