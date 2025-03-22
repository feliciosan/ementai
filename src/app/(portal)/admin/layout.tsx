import { Metadata } from "next";
import { AdminProviders } from "./admin-providers";
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
    <AdminProviders>
      <div>
        <PortalHeader />
        <main className="w-full max-w-6xl mx-auto md:px-6 py-4">
          {children}
        </main>
      </div>
    </AdminProviders>
  );
}
