"use client";

import { AuthProvider } from "@/context/auth";
import { CompanyPreviewProvider } from "@/context/company-preview";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CompanyPreviewProvider>{children}</CompanyPreviewProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
