import Link from "next/link";
import { Button } from "@/components/ui/button";

type EmptyStateProps = {
  title?: string;
  description?: string;
  primaryAction?: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
};

export default function EmptyState({
  title = "Nada por aqui ainda",
  description = "Ainda não existem dados disponíveis nesta secção.",
  primaryAction,
  secondaryAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-4">
      {/* 🎨 UPDATED GENERIC EMPTY STATE ILLUSTRATION */}
      <div className="w-32 mb-4">
        <svg viewBox="0 0 120 120" className="w-full h-auto" fill="none">
          {/* soft outer ring */}
          <circle
            cx="60"
            cy="60"
            r="48"
            className="stroke-[hsl(var(--primary))]/20"
            strokeWidth="2"
          />

          {/* broken arc (missing data metaphor) */}
          <path
            d="M32 60a28 28 0 0 1 56 0"
            className="stroke-[hsl(var(--primary))]"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* center anchor */}
          <circle cx="60" cy="60" r="6" className="fill-[hsl(var(--primary))]" />

          {/* floating data fragments */}
          <circle cx="42" cy="44" r="3" className="fill-muted-foreground/20" />
          <circle cx="78" cy="46" r="2.5" className="fill-muted-foreground/20" />
          <circle cx="40" cy="78" r="2.5" className="fill-muted-foreground/15" />
          <circle cx="82" cy="78" r="3" className="fill-muted-foreground/20" />
        </svg>
      </div>

      {/* TEXT */}
      <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-1">
        {title}
      </h3>

      <p className="text-sm text-muted-foreground max-w-sm mb-5">{description}</p>

      {/* ACTIONS */}
      {(primaryAction || secondaryAction) && (
        <div className="flex flex-col sm:flex-row gap-2">
          {primaryAction && (
            <Button asChild className="bg-foreground text-white hover:bg-foreground/90">
              <Link href={primaryAction.href}>{primaryAction.label}</Link>
            </Button>
          )}

          {secondaryAction && (
            <Button
              asChild
              className="bg-[hsl(var(--sidebar-ring))] text-white hover:bg-[hsl(var(--sidebar-ring))/90]"
            >
              <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
