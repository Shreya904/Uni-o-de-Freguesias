import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const EmptyDataMotif = () => (
  <svg
    viewBox="0 0 240 240"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full max-w-[180px] md:max-w-[200px] mx-auto mb-6 drop-shadow-sm"
  >
    {/* Abstract Background Grid */}
    <path
      d="M20 20h200v200H20z"
      stroke="#CBD5E1"
      strokeWidth="2"
      strokeDasharray="6 6"
      opacity="0.6"
    />

    {/* Empty Document / File */}
    <rect
      x="60"
      y="50"
      width="120"
      height="140"
      rx="8"
      fill="#ffffff"
      stroke="#1c2841"
      strokeWidth="4"
    />

    {/* Ghosted Document Lines */}
    <path d="M84 84h72M84 110h48" stroke="#CBD5E1" strokeWidth="4" strokeLinecap="round" />

    {/* Magnifying Glass */}
    <circle cx="140" cy="150" r="32" fill="#f8fafc" stroke="#b81d34" strokeWidth="4" />
    <path d="M162 172l24 24" stroke="#b81d34" strokeWidth="6" strokeLinecap="round" />

    {/* Fixed Question Mark inside the glass */}
    <path
      // Notice the positive 5.5 and 8 in the first 'c' command to curve right
      // and the negative -8 in the second 'c' command to curve back to center
      d="M140 134c5.5 0 8 3.5 8 7c0 6-8 7.5-8 13v2"
      stroke="#b81d34"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="140" cy="164" r="2.5" fill="#b81d34" />
  </svg>
);

type ActionProps = {
  label: string;
  href?: string;
  onClick?: () => void;
};

type EmptyStateProps = {
  title?: string;
  description?: string;
  primaryAction?: ActionProps;
  secondaryAction?: ActionProps;
};

export default function EmptyState({
  title = "Sem resultados",
  description = "Ainda não existem conteúdos publicados nesta secção.",
  primaryAction,
  secondaryAction,
}: EmptyStateProps) {
  return (
    <div className="w-full bg-[#f8fafc] border-2 border-[#1c2841] border-dashed rounded-xl p-8 md:p-12 flex flex-col items-center justify-center text-center my-8">
      <EmptyDataMotif />

      <h3 className="text-[#1c2841] text-2xl md:text-3xl font-extrabold mb-3">{title}</h3>
      <p className="text-[15px] md:text-base font-medium text-[#4a5568] max-w-sm mx-auto leading-relaxed">
        {description}
      </p>

      {(primaryAction || secondaryAction) && (
        <div className="flex flex-col sm:flex-row gap-2 mt-6">
          {primaryAction &&
            (primaryAction.href ? (
              <Button asChild className="bg-[#1c2841] text-white hover:bg-[#1c2841]/90">
                <Link href={primaryAction.href}>{primaryAction.label}</Link>
              </Button>
            ) : (
              <Button
                onClick={primaryAction.onClick}
                className="bg-[#1c2841] text-white hover:bg-[#1c2841]/90"
              >
                {primaryAction.label}
              </Button>
            ))}

          {secondaryAction &&
            (secondaryAction.href ? (
              <Button asChild className="bg-[#b81d34] text-white hover:bg-[#9a182b]">
                <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
              </Button>
            ) : (
              <Button
                onClick={secondaryAction.onClick}
                className="bg-[#b81d34] text-white hover:bg-[#9a182b]"
              >
                {secondaryAction.label}
              </Button>
            ))}
        </div>
      )}
    </div>
  );
}
