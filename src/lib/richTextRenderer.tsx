import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

import type { RichTextContent, RichTextNode } from "@/lib/cms";

type LinkFields = {
  linkType?: "custom" | "internal";
  url?: string;
  doc?: {
    value?: {
      slug?: string;
      url?: string;
    };
  };
  newTab?: boolean;
  alt?: string;
  filename?: string;
  mimeType?: string;
  width?: number;
  height?: number;
  relationTo?: string;
  fields?: Record<string, unknown>;
};

const TEXT_FORMAT = {
  bold: 1,
  italic: 2,
  strikethrough: 4,
  underline: 8,
  code: 16,
  subscript: 32,
  superscript: 64,
  highlight: 128,
  uppercase: 256,
} as const;

function isRichTextContent(value: unknown): value is RichTextContent {
  return typeof value === "object" && value !== null && "root" in value;
}

function isTextNode(node: RichTextNode): node is Extract<RichTextNode, { text: string }> {
  return "text" in node;
}

function getTextFormat(node: Extract<RichTextNode, { text: string }>) {
  const format = typeof node.format === "number" ? node.format : 0;
  return {
    bold: Boolean(node.bold || (format & TEXT_FORMAT.bold)),
    italic: Boolean(node.italic || (format & TEXT_FORMAT.italic)),
    underline: Boolean(node.underline || (format & TEXT_FORMAT.underline)),
    strikethrough: Boolean(node.strikethrough || (format & TEXT_FORMAT.strikethrough)),
    code: Boolean(node.code || (format & TEXT_FORMAT.code)),
    subscript: Boolean(format & TEXT_FORMAT.subscript),
    superscript: Boolean(format & TEXT_FORMAT.superscript),
    highlight: Boolean(format & TEXT_FORMAT.highlight),
    uppercase: Boolean(format & TEXT_FORMAT.uppercase),
  };
}

function getTextAlign(format?: string) {
  switch (format) {
    case "center":
      return "text-center";
    case "right":
      return "text-right";
    case "justify":
      return "text-justify";
    default:
      return "text-left";
  }
}

function getLinkHref(value: LinkFields): string {
  if (value.linkType === "internal") {
    return value.doc?.value?.slug ? `/${value.doc.value.slug}` : value.doc?.value?.url || "#";
  }

  return value.url || "#";
}

function isExternalHref(href: string) {
  return /^https?:\/\//i.test(href) || href.startsWith("//");
}

function renderLeaf(node: Extract<RichTextNode, { text: string }>, key: string): ReactNode {
  const format = getTextFormat(node);
  let output: ReactNode = node.text;

  if (format.uppercase) output = <span className="uppercase">{output}</span>;
  if (format.superscript) output = <sup className="align-super text-[0.75em] leading-none">{output}</sup>;
  if (format.subscript) output = <sub className="align-sub text-[0.75em] leading-none">{output}</sub>;
  if (format.code) output = <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.95em]">{output}</code>;
  if (format.bold) output = <strong className="font-semibold text-slate-900">{output}</strong>;
  if (format.italic) output = <em>{output}</em>;
  if (format.underline) output = <span className="underline decoration-1 underline-offset-2">{output}</span>;
  if (format.strikethrough) output = <s>{output}</s>;
  if (format.highlight) output = <mark className="rounded bg-yellow-100 px-0.5 text-inherit">{output}</mark>;

  return (
    <span key={key} className="whitespace-pre-wrap">
      {output}
    </span>
  );
}

function renderChildren(children: RichTextNode[] | undefined): ReactNode[] {
  if (!children?.length) return [];
  return children.flatMap((child, index) => {
    if (isTextNode(child)) {
      return renderLeaf(child, `${index}-${child.text}`);
    }
    return renderNode(child, `${index}-${child.type}`);
  });
}

function Heading({
  tag,
  className,
  style,
  children,
}: {
  tag: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  switch (tag) {
    case "h1":
      return (
        <h1 style={style} className={`mb-5 mt-10 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl ${className || ""}`}>
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2 style={style} className={`mb-4 mt-8 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl ${className || ""}`}>
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3 style={style} className={`mb-3 mt-7 text-xl font-bold tracking-tight text-slate-900 md:text-2xl ${className || ""}`}>
          {children}
        </h3>
      );
    case "h4":
      return (
        <h4 style={style} className={`mb-3 mt-6 text-lg font-semibold text-slate-900 md:text-xl ${className || ""}`}>
          {children}
        </h4>
      );
    case "h5":
      return (
        <h5 style={style} className={`mb-3 mt-5 text-base font-semibold text-slate-900 md:text-lg ${className || ""}`}>
          {children}
        </h5>
      );
    case "h6":
      return (
        <h6 style={style} className={`mb-2 mt-4 text-sm font-semibold uppercase tracking-wide text-slate-700 ${className || ""}`}>
          {children}
        </h6>
      );
    default:
      return (
        <p style={style} className={`mb-5 leading-8 text-slate-700 ${className || ""}`}>
          {children}
        </p>
      );
  }
}

function List({
  ordered,
  className,
  style,
  children,
}: {
  ordered: boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag
      style={style}
      className={`mb-5 space-y-2 pl-6 text-slate-700 ${ordered ? "list-decimal" : "list-disc"} ${className || ""}`}
    >
      {children}
    </Tag>
  );
}

function renderNode(node: RichTextNode, key: string): ReactNode {
  if (isTextNode(node)) return renderLeaf(node, key);

  const children = renderChildren(node.children);
  const alignClass = getTextAlign(typeof node.format === "string" ? node.format : undefined);
  const indentStyle = node.indent ? { marginLeft: `${node.indent * 1.5}rem` } : undefined;
  const value = (node as { value?: LinkFields; fields?: LinkFields }).value ?? (node as { value?: LinkFields; fields?: LinkFields }).fields;

  switch (node.type) {
    case "root":
      return <div key={key}>{children}</div>;
    case "paragraph":
      return (
        <p key={key} style={indentStyle} className={`mb-5 leading-8 text-slate-700 ${alignClass}`}>
          {children}
        </p>
      );
    case "heading":
    case "h1":
    case "h2":
    case "h3":
    case "h4":
    case "h5":
    case "h6":
      return (
        <Heading key={key} tag={(node as { tag?: string }).tag || node.type} className={alignClass} style={indentStyle}>
          {children}
        </Heading>
      );
    case "quote":
      return (
        <blockquote
          key={key}
          style={indentStyle}
          className={`my-6 border-l-4 border-slate-300 pl-4 text-slate-600 italic ${alignClass}`}
        >
          {children}
        </blockquote>
      );
    case "list":
    case "ul": {
      const listType = (node as { listType?: string }).listType;
      const ordered = listType === "number";
      return (
        <List key={key} ordered={ordered} style={indentStyle} className={alignClass}>
          {children}
        </List>
      );
    }
    case "ol":
      return (
        <List key={key} ordered style={indentStyle} className={alignClass}>
          {children}
        </List>
      );
    case "listitem":
    case "list-item":
      return <li key={key} className="mb-2 leading-relaxed">{children}</li>;
    case "link": {
      const linkValue = (value || node) as LinkFields;
      const href = getLinkHref(linkValue);
      const external = isExternalHref(href);

      if (external) {
        return (
          <a
            key={key}
            href={href}
            target={linkValue.newTab ? "_blank" : "_self"}
            rel={linkValue.newTab ? "noopener noreferrer" : undefined}
            className="font-medium text-blue-700 underline decoration-blue-300 underline-offset-4 transition-colors hover:text-blue-900 hover:decoration-blue-700"
          >
            {children}
          </a>
        );
      }

      return (
        <Link
          key={key}
          href={href}
          className="font-medium text-blue-700 underline decoration-blue-300 underline-offset-4 transition-colors hover:text-blue-900 hover:decoration-blue-700"
        >
          {children}
        </Link>
      );
    }
    case "upload": {
      const media = (value || node) as LinkFields;
      const src = media?.url || "";
      if (!src) return null;

      const isImage =
        Boolean(media?.mimeType?.startsWith("image/")) ||
        /\.(png|jpe?g|gif|webp|avif|svg)$/i.test(src);

      if (!isImage) {
        return (
          <a
            key={key}
            href={src}
            className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-slate-50"
          >
            {media?.filename || "Ficheiro anexado"}
          </a>
        );
      }

      return (
        <figure key={key} className="my-6">
          <img
            src={src}
            alt={media?.alt || ""}
            width={media?.width}
            height={media?.height}
            className="h-auto w-full rounded-lg border border-slate-200 object-cover"
          />
        </figure>
      );
    }
    case "table":
      return (
        <div key={key} className="my-6 overflow-x-auto">
          <table className="min-w-full border-collapse border border-slate-200 text-left text-sm">
            {children}
          </table>
        </div>
      );
    case "tablerow":
      return <tr key={key}>{children}</tr>;
    case "tablecell":
      return (
        <td key={key} className="border border-slate-200 px-3 py-2 align-top text-slate-700">
          {children}
        </td>
      );
    case "tableheader":
      return (
        <th key={key} className="border border-slate-200 bg-slate-50 px-3 py-2 font-semibold text-slate-900">
          {children}
        </th>
      );
    case "linebreak":
      return <br key={key} />;
    case "horizontalrule":
      return <hr key={key} className="my-8 border-slate-200" />;
    default:
      if (children.length > 0) {
        return <div key={key}>{children}</div>;
      }
      return null;
  }
}

export function renderRichText(content: RichTextContent | string | null | undefined): ReactNode {
  if (!content) return null;

  if (typeof content === "string") {
    return <p className="mb-5 leading-8 text-slate-700">{content}</p>;
  }

  if (!isRichTextContent(content) || !content.root?.children?.length) {
    return null;
  }

  return <div className="space-y-0">{renderChildren(content.root.children)}</div>;
}
