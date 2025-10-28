import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { stripeService } from "@/services/stripe";

interface UseSubscriptionReturn {
  isLoading: boolean;
  createCheckoutSession: (email: string, priceId: string) => void;
}

export const useSubscription = (): UseSubscriptionReturn => {
  const { mutate: createCheckoutSession, isPending: isLoading } = useMutation({
    mutationFn: async ({
      email,
      priceId,
    }: {
      email: string;
      priceId: string;
    }) => {
      return stripeService.createCheckoutSession({ email, priceId });
    },
    onSuccess: (data) => {
      // Redirect to Stripe checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL received");
      }
    },
    onError: (error) => {
      console.error("Error creating checkout session:", error);
      toast.error("Erro ao processar pagamento. Tente novamente.");
    },
  });

  const handleCreateCheckoutSession = (email: string, priceId: string) => {
    createCheckoutSession({ email, priceId });
  };

  return {
    isLoading,
    createCheckoutSession: handleCreateCheckoutSession,
  };
};
