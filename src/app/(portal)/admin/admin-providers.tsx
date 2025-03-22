"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/context/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

export function AdminProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
