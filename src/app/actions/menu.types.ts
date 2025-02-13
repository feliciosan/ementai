export type TMenuItem = {
  name: string;
  price: { label: string; value: number }[];
  description: string;
  new?: boolean;
  bestSeller?: boolean;
};

export type TMenu = {
  category: string;
  items: TMenuItem[];
};
