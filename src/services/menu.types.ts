import { Timestamp } from "firebase/firestore";

export type TMenuCategoryItem = {
  id: string;
  title: string;
  description: string;
  price: { label: string; value: string }[];
  new?: boolean;
  bestSeller?: boolean;
  imageUrls?: string[];
  unavailable?: boolean;
};

export type TMenuCategory = {
  id: string;
  name: string;
  indexPosition: number;
  items: TMenuCategoryItem[];
  createdAt: Timestamp;
};

export type TMenuCategoryItemPayload = Pick<
  TMenuCategoryItem,
  | "title"
  | "description"
  | "price"
  | "new"
  | "bestSeller"
  | "imageUrls"
  | "unavailable"
> & { id?: string };
