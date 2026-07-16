import type { ReactNode } from "react";

import { renderRichText } from "@/lib/richTextRenderer";
import type { RichTextContent } from "@/lib/cms";

type RichTextRendererProps = {
  content: RichTextContent | string | null | undefined;
  className?: string;
};

export default function RichTextRenderer({ content, className }: RichTextRendererProps) {
  return <div className={className}>{renderRichText(content) as ReactNode}</div>;
}
