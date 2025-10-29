import { Metadata } from "next";
import { QrcodeProviders } from "./qrcode-providers";

export const metadata: Metadata = {
  title: "Ementai | Menu online",
  description:
    "Crie menus online profissionais, gere QR codes e ofereça atendimento sem contato aos seus clientes. Simples, rápido e profissional.",
};

export default function PortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <QrcodeProviders>{children}</QrcodeProviders>;
}
