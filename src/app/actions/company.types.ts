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

export type TCompanyInfo = {
  name: string;
  logo: string;
  backgroundImage: string;
  slogan: string;
  theme: {
    primaryColor: string;
    isDark: boolean;
  };
};

export type TCompanyResponse = {
  id: string;
  slug: string;
  email: string;
  info: TCompanyInfo;
  menu: TCompanyMenu[];
};
