import Link from "next/link";

interface SidebarItem {
  label: string;
  href: string;
  active?: boolean;
}

export default function AtestadoDetail({
  title,
  sidebarItems,
  paragraphs,
}: {
  title: string;
  sidebarItems: SidebarItem[];
  paragraphs: string[];
}) {
  return (
    <div className="balcao-shell">
      <aside className="balcao-sidebar">
        <p className="font-bold text-foreground mb-3">Qual é o atestado que precisa?</p>
        <ul className="space-y-3 text-muted-foreground mb-8">
          {sidebarItems.map((item) => (
            <li key={item.label} className="flex items-center gap-2">
              <input type="radio" checked={item.active} readOnly className="accent-[#C41230]" />
              <Link
                href={item.href}
                className={item.active ? "text-foreground font-medium" : "hover:text-foreground transition"}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <p className="font-bold text-foreground mb-3">Perguntas frequentes</p>
        <details className="border rounded-lg p-3 text-muted-foreground text-xs bg-amber-50 cursor-pointer">
          <summary>O que fazer se um ficheiro não abrir corretamente?</summary>
        </details>
      </aside>

      <div className="balcao-main">
        <h1>
          {title}
        </h1>
        <div className="mb-10 space-y-4">
          {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
        </div>

        <p className="balcao-section-title mb-3">Outros assuntos populares</p>
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
