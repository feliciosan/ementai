import { Metadata } from "next";
import { MenuProviders } from "./menu-providers";

export const metadata: Metadata = {
  title: "Ementai | Digital Menu",
  description:
    "Ementai is a digital menu platform that allows you to create and manage your digital menu with ease.",
};

export default function PortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MenuProviders>{children}</MenuProviders>;
}
