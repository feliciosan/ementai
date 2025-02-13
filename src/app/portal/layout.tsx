import { Metadata } from "next";
import { Providers } from "./providers";
import PortalHeader from "@/components/PortalHeader";

export const metadata: Metadata = {
  title: "Ementai | Admin",
  description: "Admin panel for Ementai",
};

export default function PortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <div className="flex flex-col min-h-screen w-full">
        <PortalHeader />
        <main className="w-full max-w-6xl mx-auto md:px-6 py-4">
          {children}
        </main>
      </div>
    </Providers>
  );
}
