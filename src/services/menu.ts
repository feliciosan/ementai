import { database } from "@/config/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import {
  TMenuCategory,
  TMenuCategoryItem,
  TMenuCategoryItemPayload,
} from "./menu.types";

const MenuService = {
  async getMenuCategories(companyId: string): Promise<TMenuCategory[]> {
    try {
      const companyRef = doc(database, "companies", companyId);
      const menuCollectionRef = collection(companyRef, "menu");
      const queryRef = query(
        menuCollectionRef,
        orderBy("indexPosition", "asc")
      );
      const menuCategoriesSnapshot = await getDocs(queryRef);

      if (menuCategoriesSnapshot.empty) {
        return [];
      }

      const promises = menuCategoriesSnapshot.docs.map(async (doc) => {
        const data = doc.data();
        const items = await getDocs(collection(doc.ref, "items"));
        const ItemsData = items.docs.map((item) => {
          const itemData = item.data();

          return {
            ...itemData,
            id: item.id,
          } as TMenuCategoryItem;
        });

        return {
          ...data,
          id: doc.id,
          items: ItemsData,
        } as TMenuCategory;
      });

      return Promise.all(promises);
    } catch (error) {
      console.error("Error getting documents: ", error);
      throw error;
    }
  },
  async getMenuCategoryItems(params: {
    categoryId: string;
    companyId: string;
  }): Promise<TMenuCategory | null> {
    const companyRef = doc(database, "companies", params.companyId);
    const menuCollectionRef = collection(companyRef, "menu");
    const categoryRef = doc(menuCollectionRef, params.categoryId);
    const categorySnapshot = await getDoc(categoryRef);
    const itemsCollectionRef = collection(categoryRef, "items");
    const itemsSnapshot = await getDocs(itemsCollectionRef);

    const items = itemsSnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      } as TMenuCategoryItem;
    });

    return {
      ...categorySnapshot.data(),
      id: categorySnapshot.id,
      items,
    } as TMenuCategory;
  },
  async updateMenuCategoryOrder(params: {
    companyId: string;
    orderedCategories: { id: string; index: number }[];
  }): Promise<void> {
    const companyRef = doc(database, "companies", params.companyId);
    const menuCollectionRef = collection(companyRef, "menu");
    const batch = writeBatch(database);

    params.orderedCategories.forEach((category) => {
      const categoryRef = doc(menuCollectionRef, category.id);

      batch.update(categoryRef, {
        indexPosition: category.index,
      });
    });

    await batch.commit();
  },
  async createMenuCategory(
    companyId: string,
    category: { name: string }
  ): Promise<void> {
    const companyRef = doc(database, "companies", companyId);
    const menuCollectionRef = collection(companyRef, "menu");
    const categoriesSnapshot = await getDocs(menuCollectionRef);
    const indexPosition = categoriesSnapshot.size;

    addDoc(menuCollectionRef, {
      name: category.name,
      createdAt: serverTimestamp(),
      indexPosition,
      items: [],
    });
  },
  async deleteMenuCategory(params: {
    companyId: string;
    categoryId: string;
  }): Promise<void> {
    const companyRef = doc(database, "companies", params.companyId);
    const menuCollectionRef = collection(companyRef, "menu");
    const categoryRef = doc(menuCollectionRef, params.categoryId);

    await deleteDoc(categoryRef);
  },
  async setMenuItems(
    companyId: string,
    categoryId: string,
    items: TMenuCategoryItemPayload[]
  ): Promise<void> {
    const companyRef = doc(database, "companies", companyId);
    const menuCollectionRef = collection(companyRef, "menu");
    const categoryRef = doc(menuCollectionRef, categoryId);
    const itemsCollectionRef = collection(categoryRef, "items");
    const batch = writeBatch(database);

    items.forEach((item) => {
      if (item.id) {
        batch.set(doc(itemsCollectionRef, item.id), item, { merge: true });
        return;
      }

      batch.set(doc(itemsCollectionRef), {
        ...item,
        createdAt: serverTimestamp(),
      });
    });

    await batch.commit();
  },
  async deleteMenuItems(
    companyId: string,
    categoryId: string,
    itemIds: string[]
  ): Promise<void> {
    const companyRef = doc(database, "companies", companyId);
    const menuCollectionRef = collection(companyRef, "menu");
    const categoryRef = doc(menuCollectionRef, categoryId);
    const itemsCollectionRef = collection(categoryRef, "items");
    const batch = writeBatch(database);

    itemIds.forEach((itemId) => {
      batch.delete(doc(itemsCollectionRef, itemId));
    });

    await batch.commit();
  },
};

export default MenuService;
