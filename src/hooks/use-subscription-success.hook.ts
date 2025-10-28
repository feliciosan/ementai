"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { stripeService } from "@/services/stripe";

export const useSubscriptionSuccess = () => {
  const searchParams = useSearchParams();
  const hasProcessedSession = useRef(false);

  const { mutate: verifySession } = useMutation({
    mutationFn: async (sessionId: string) => {
      return stripeService.verifySession({ sessionId });
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success(
          "🎉 Assinatura ativada com sucesso! Bem-vindo ao Menu Pro!",
          {
            duration: 5000,
          }
        );

        // Remove session_id from URL without reloading the page
        const url = new URL(window.location.href);
        url.searchParams.delete("session_id");
        window.history.replaceState({}, "", url.toString());
      } else {
        toast.error("Erro ao verificar a assinatura. Tente novamente.");
      }
    },
    onError: (error) => {
      console.error("Error verifying session:", error);
      toast.error("Erro ao verificar a assinatura. Tente novamente.");
    },
  });

  useEffect(() => {
    const sessionId = searchParams.get("session_id");

    if (sessionId && !hasProcessedSession.current) {
      hasProcessedSession.current = true;
      verifySession(sessionId);
    }
  }, [searchParams, verifySession]);
};
