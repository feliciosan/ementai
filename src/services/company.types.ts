export type TCompanyMenuItem = {
  name: string;
  price: { label: string; value: number }[];
  description: string;
  new?: boolean;
  bestSeller?: boolean;
};

export type TCompanyMenu = {
  category: string;
  items: TCompanyMenuItem[];
};

export type ICompanyAditional = {
  address: string;
  phone: string;
  email: string;
  extra: {
    label: string;
    value: string;
  };
};

export type ICompanySocial = {
  instagram: string;
  facebook: string;
  whatsapp: string;
};

export type TCompanyInfo = {
  name: string;
  logo: string;
  backgroundImage: string;
  slogan: string;
  theme: {
    primaryColor: string;
    isDark: boolean;
  };
  aditicional?: ICompanyAditional;
  social?: ICompanySocial;
};

export type TSubscription = {
  status: "active" | "canceled" | "past_due" | "unpaid" | "incomplete";
  stripeSubscriptionId: string;
  stripePriceId: string;
  stripeCustomerId: string;
  cancelAtPeriodEnd: boolean;
  currentPeriodEnd?: number; // Unix timestamp - when subscription will be canceled (cancel_at from Stripe)
};

export type TCompanyResponse = {
  id: string;
  email: string;
  slug?: string;
  info?: Partial<TCompanyInfo>;
  menu?: TCompanyMenu[];
  subscription?: TSubscription;
};
