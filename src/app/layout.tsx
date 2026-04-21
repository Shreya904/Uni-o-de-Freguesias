import type { Metadata } from "next";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import QueryClientWrapper from "./query-client-wrapper";
import "./globals.css";

export const metadata: Metadata = {
  title: "União de Freguesias Community Hub",
  description: "Centro Comunitário da União de Freguesias",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-PT">
      <body>
        <QueryClientWrapper>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            {children}
          </TooltipProvider>
        </QueryClientWrapper>
      </body>
    </html>
  );
}
