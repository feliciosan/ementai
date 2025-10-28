import { Metadata, Viewport } from "next";
import { AdminProviders } from "./admin-providers";
import AdminHeader from "@/components/AdminHeader";

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

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
        <AdminHeader />
        <main className="w-full max-w-6xl mx-auto py-4">{children}</main>
      </div>
    </AdminProviders>
  );
}
