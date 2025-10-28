// Service for Stripe API integration
import {
  CreateCheckoutSessionParams,
  CreateCheckoutSessionResponse,
  CreateCustomerPortalParams,
  CreateCustomerPortalResponse,
  VerifySessionParams,
  VerifySessionResponse,
} from "./stripe.types";

export const stripeService = {
  /**
   * Creates a Stripe checkout session
   */
  createCheckoutSession: async (
    params: CreateCheckoutSessionParams
  ): Promise<CreateCheckoutSessionResponse> => {
    const response = await fetch("/api/stripe/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to create checkout session");
    }

    return response.json();
  },

  /**
   * Creates a Stripe Customer Portal session
   */
  createCustomerPortal: async (
    params: CreateCustomerPortalParams
  ): Promise<CreateCustomerPortalResponse> => {
    const response = await fetch("/api/stripe/customer-portal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        error.error || "Failed to create customer portal session"
      );
    }

    return response.json();
  },

  /**
   * Verifies if a checkout session was successful
   */
  verifySession: async (
    params: VerifySessionParams
  ): Promise<VerifySessionResponse> => {
    const response = await fetch("/api/stripe/verify-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to verify session");
    }

    return response.json();
  },
};
