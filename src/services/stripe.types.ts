// Types for Stripe service

export interface CreateCheckoutSessionParams {
  email: string;
  priceId: string;
}

export interface CreateCheckoutSessionResponse {
  sessionId: string;
  url: string;
}

export interface CreateCustomerPortalParams {
  customerId: string;
  returnUrl?: string;
}

export interface CreateCustomerPortalResponse {
  url: string;
}

export interface VerifySessionParams {
  sessionId: string;
}

export interface VerifySessionResponse {
  success: boolean;
  session?: {
    id: string;
    customerEmail: string;
    paymentStatus: string;
    subscriptionId: string;
  };
  message?: string;
  paymentStatus?: string;
  status?: string;
}
