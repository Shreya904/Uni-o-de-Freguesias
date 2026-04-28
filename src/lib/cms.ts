import type { CmsDocumentItem, CmsNewsItem } from "@/lib/cms-server";

type CmsListResponse<T> = {
  docs: T[];
};

type CmsDocResponse<T> = {
  doc?: T;
};

async function parseErrorMessage(response: Response) {
  try {
    const payload = (await response.json()) as { error?: string };
    if (payload.error) {
      return payload.error;
    }
  } catch {
    // ignore parse errors and fallback to status text
  }

  return `Request failed: ${response.status}`;
}

async function localRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  if (response.status === 204) {
    return null as T;
  }

  return (await response.json()) as T;
}

export async function fetchPublishedDocuments(limit?: number) {
  const query = typeof limit === "number" ? `?limit=${limit}` : "";
  const response = await localRequest<CmsListResponse<CmsDocumentItem>>(
    `/api/cms/documents${query}`,
  );
  return response.docs;
}

export async function fetchPublishedNews(limit?: number) {
  const query = typeof limit === "number" ? `?limit=${limit}` : "";
  const response = await localRequest<CmsListResponse<CmsNewsItem>>(`/api/cms/news${query}`);
  return response.docs;
}

export async function fetchNewsBySlug(slug: string) {
  const response = await localRequest<CmsDocResponse<CmsNewsItem>>(
    `/api/cms/news/${encodeURIComponent(slug)}`,
  );
  return response.doc ?? null;
}

export type { CmsDocumentItem, CmsNewsItem };
