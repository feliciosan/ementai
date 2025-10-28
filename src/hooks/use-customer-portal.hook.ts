import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { stripeService } from "@/services/stripe";

interface UseCustomerPortalReturn {
  isLoading: boolean;
  openCustomerPortal: (customerId: string, returnUrl?: string) => void;
}

export const useCustomerPortal = (): UseCustomerPortalReturn => {
  const { mutate: openCustomerPortal, isPending: isLoading } = useMutation({
    mutationFn: async ({
      customerId,
      returnUrl,
    }: {
      customerId: string;
      returnUrl?: string;
    }) => {
      return stripeService.createCustomerPortal({ customerId, returnUrl });
    },
    onSuccess: (data) => {
      // Redirect to Stripe Customer Portal
      window.location.href = data.url;
    },
    onError: (error) => {
      console.error("Error opening customer portal:", error);
      toast.error("Erro ao abrir portal de gerenciamento. Tente novamente.");
    },
  });

  const handleOpenCustomerPortal = (customerId: string, returnUrl?: string) => {
    openCustomerPortal({ customerId, returnUrl });
  };

  return {
    isLoading,
    openCustomerPortal: handleOpenCustomerPortal,
  };
};
