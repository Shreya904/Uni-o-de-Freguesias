import type { Metadata } from "next";
import MaintenancePage from "./MaintenancePage";

export const metadata: Metadata = {
  title: "Brevemente | Junta de Freguesia",
  description: "Estamos a preparar o novo website da Junta de Freguesia.",
  openGraph: {
    title: "Brevemente | Junta de Freguesia",
    description: "Estamos a preparar o novo website da Junta de Freguesia.",
    type: "website",
  },
};

export default function Page() {
  return <MaintenancePage />;
}
