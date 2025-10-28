"use client";

import { useAuth } from "@/hooks/use-auth.hook";
import { useCustomerPortal } from "@/hooks/use-customer-portal.hook";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Crown,
  CreditCard,
  Settings,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import withProtected from "@/HOC/protected.route";
import UpgradeBanner from "@/components/UpgradeBanner";
import SubscriptionButton from "@/components/SubscriptionButton";

function SubscriptionPage() {
  const { currentCompany } = useAuth();
  const { openCustomerPortal, isLoading } = useCustomerPortal();

  const subscription = currentCompany?.subscription;
  const hasActiveSubscription = subscription?.status === "active";

  const handleManageSubscription = () => {
    if (subscription?.stripeCustomerId) {
      openCustomerPortal(
        subscription.stripeCustomerId,
        `${process.env.NEXT_PUBLIC_DOMAIN}/admin/subscription`
      );
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-200 hover:border-green-300 px-2 py-1">
            <CheckCircle className="w-3 h-3 mr-1" />
            Ativo
          </Badge>
        );
      case "canceled":
        return (
          <Badge variant="destructive">
            <XCircle className="w-3 h-3 mr-1" />
            Cancelado
          </Badge>
        );
      case "past_due":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <AlertCircle className="w-3 h-3 mr-1" />
            Pagamento Pendente
          </Badge>
        );
      case "incomplete":
        return (
          <Badge className="bg-gray-100 text-gray-800 border-gray-200">
            <AlertCircle className="w-3 h-3 mr-1" />
            Incompleto
          </Badge>
        );
      case "unpaid":
        return (
          <Badge variant="destructive">
            <XCircle className="w-3 h-3 mr-1" />
            Não Pago
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="pb-8 px-4">
      {/* Upgrade Banner for non-subscribers */}
      <UpgradeBanner />

      {/* Header */}
      <div className="py-4">
        <h1 className="text-xl md:text-2xl font-extrabold line-clamp-2">
          Minha Assinatura
        </h1>
        <p className="text-gray-600">Gerencie os detalhes da sua assinatura</p>
      </div>

      <div className="space-y-6">
        {/* Status Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-500" />
              Status da Assinatura
            </CardTitle>
            <CardDescription>Informações sobre seu plano atual</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {hasActiveSubscription ? (
              <>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">
                    Plano:
                  </span>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200 hover:border-blue-300 px-2 py-1">
                    <Crown className="w-3 h-3 mr-1" />
                    Menu Pro
                  </Badge>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">
                    Status:
                  </span>
                  {getStatusBadge(subscription.status)}
                </div>

                {subscription.cancelAtPeriodEnd && (
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center gap-2 text-yellow-800">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        Sua assinatura será cancelada no final do período atual
                      </span>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8">
                <Crown className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhuma assinatura ativa
                </h3>
                <p className="text-gray-600 mb-4">
                  Atualizar para o Menu Pro e desbloqueie recursos avançados
                </p>
                <SubscriptionButton />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Management Card */}
        {hasActiveSubscription && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Gerenciar Assinatura
              </CardTitle>
              <CardDescription>
                Altere seu método de pagamento, veja faturas ou cancele sua
                assinatura
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <CreditCard className="w-5 h-5 text-gray-600 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">
                      Portal de Gerenciamento
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Acesse o portal seguro do Stripe para gerenciar todos os
                      aspectos da sua assinatura
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1 mb-4">
                      <li>• Atualizar método de pagamento</li>
                      <li>• Baixar faturas</li>
                      <li>• Ver histórico de pagamentos</li>
                      <li>• Cancelar assinatura</li>
                    </ul>
                    <Button
                      onClick={handleManageSubscription}
                      disabled={isLoading}
                      className="w-full sm:w-auto"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Carregando...
                        </>
                      ) : (
                        <>
                          <Settings className="w-4 h-4 mr-2" />
                          Abrir Portal de Gerenciamento
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Features Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-500" />
              Recursos do Menu Pro
            </CardTitle>
            <CardDescription>
              Veja tudo que você tem acesso com sua assinatura
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm">Menu online 24hrs</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm">Acesso via QR code</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm">Categorias ilimitadas</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm">
                  Produtos ilimitados por categoria
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm">Personalização completa</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm">Suporte prioritário</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm">Relatórios personalizados</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm">Fotos dos pratos</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default withProtected(SubscriptionPage);
