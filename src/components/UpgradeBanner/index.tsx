"use client";

import { Button } from "@/components/ui/button";
import { useSubscription } from "@/hooks/use-subscription.hook";
import { useCustomerPortal } from "@/hooks/use-customer-portal.hook";
import { useAuth } from "@/hooks/use-auth.hook";
import { usePathname } from "next/navigation";
import { Crown, ArrowRight, AlertTriangle, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface UpgradeBannerProps {
  priceId?: string;
}

export default function UpgradeBanner({
  priceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_MENU_PRO!,
}: UpgradeBannerProps) {
  const { createCheckoutSession, isLoading: isSubscriptionLoading } =
    useSubscription();
  const { openCustomerPortal, isLoading: isPortalLoading } =
    useCustomerPortal();
  const { currentCompany } = useAuth();
  const pathname = usePathname();

  const handleUpgrade = () => {
    if (!currentCompany?.email) {
      toast.error("Erro: Email da empresa não encontrado");
      return;
    }

    createCheckoutSession(currentCompany.email, priceId);
  };

  const handleRenewSubscription = () => {
    if (!currentCompany?.subscription?.stripeCustomerId) {
      toast.error("Erro: Informações da assinatura não encontradas");
      return;
    }

    const returnUrl = `${process.env.NEXT_PUBLIC_DOMAIN}${pathname}`;
    openCustomerPortal(currentCompany.subscription.stripeCustomerId, returnUrl);
  };

  const isSubscribed = currentCompany?.subscription?.status === "active";
  const isPendingCancellation = currentCompany?.subscription?.cancelAtPeriodEnd;
  const currentPeriodEnd = currentCompany?.subscription?.currentPeriodEnd;

  // Check if subscription is scheduled for cancellation (either by period end or specific date)
  const isScheduledForCancellation = !!(
    isPendingCancellation || currentPeriodEnd
  );

  // Don't show banner if user is subscribed and not scheduled for cancellation
  if (isSubscribed && !isScheduledForCancellation) {
    return null;
  }

  // Helper function to format date
  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Show expiration warning for scheduled cancellation
  if (isSubscribed && isScheduledForCancellation && currentPeriodEnd) {
    return (
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-600 to-red-600 rounded-lg shadow-lg mb-6 h-20">
        <div className="relative px-6 py-4 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Left side - Warning Content */}
            <div className="flex items-center gap-4">
              <div className="bg-yellow-400 p-2 rounded-full">
                <AlertTriangle className="w-5 h-5 text-orange-900" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">
                  Sua assinatura será cancelada
                </h3>
                <p className="text-white/90 text-sm">
                  Menu Pro expira em {formatDate(currentPeriodEnd)}
                </p>
              </div>
            </div>

            {/* Right side - CTA */}
            <Button
              onClick={handleRenewSubscription}
              disabled={isPortalLoading}
              className="bg-white text-orange-600 hover:bg-gray-100 font-semibold px-6 py-2 rounded-full shadow-lg"
            >
              {isPortalLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-orange-600 border-t-transparent rounded-full animate-spin mr-2" />
                  Carregando...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Renovar Assinatura
                </>
              )}
            </Button>
          </div>

          {/* Bottom accent */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-red-400"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg mb-6 h-20">
      <div className="relative px-6 py-4 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Left side - Content */}
          <div className="flex items-center gap-4">
            <div className="bg-yellow-400 p-2 rounded-full">
              <Crown className="w-5 h-5 text-yellow-900" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">
                Atualizar para Menu Pro
              </h3>
              <p className="text-white/90 text-sm">
                Recursos ilimitados e personalização completa
              </p>
            </div>
          </div>

          {/* Right side - CTA */}
          <Button
            onClick={handleUpgrade}
            disabled={isSubscriptionLoading}
            className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-6 py-2 rounded-full shadow-lg"
          >
            {isSubscriptionLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2" />
                Carregando...
              </>
            ) : (
              <>
                Assinar Menu Pro
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>

        {/* Bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-orange-400"></div>
      </div>
    </div>
  );
}
