"use client";

import { Button } from "@/components/ui/button";
import { useSubscription } from "@/hooks/use-subscription.hook";
import { useAuth } from "@/hooks/use-auth.hook";
import { Crown, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface SubscriptionButtonProps {
  priceId?: string;
  className?: string;
}

export default function SubscriptionButton({
  priceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_MENU_PRO!,
  className = "",
}: SubscriptionButtonProps) {
  const { createCheckoutSession, isLoading } = useSubscription();
  const { currentCompany } = useAuth();

  const handleSubscribe = () => {
    if (!currentCompany?.email) {
      toast.error("Erro: Email da empresa não encontrado");
      return;
    }

    createCheckoutSession(currentCompany.email, priceId);
  };

  const isSubscribed = currentCompany?.subscription?.status === "active";
  const isPendingCancellation = currentCompany?.subscription?.cancelAtPeriodEnd;

  if (isSubscribed) {
    return (
      <Button variant="outline" disabled className={className}>
        <Crown className="w-4 h-4 mr-2" />
        {isPendingCancellation
          ? "Cancelando no fim do período"
          : "Menu Pro Ativo"}
      </Button>
    );
  }

  return (
    <Button
      onClick={handleSubscribe}
      disabled={isLoading}
      variant="default"
      className={className}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Processando...
        </>
      ) : (
        <>
          <Crown className="w-4 h-4 mr-2" />
          Assinar Menu Pro
        </>
      )}
    </Button>
  );
}
