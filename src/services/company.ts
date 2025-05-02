import { database } from "@/config/firebase";
import { TCompanyResponse } from "./company.types";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  setDoc,
  where,
} from "firebase/firestore";

const CompanyService = {
  async getCompanyBySlug(slug: string): Promise<TCompanyResponse | null> {
    const companiesRef = collection(database, "companies");
    const companiesQuery = query(
      companiesRef,
      where("slug", "==", slug),
      limit(1)
    );

    const querySnapshot = await getDocs(companiesQuery);

    if (querySnapshot.size) {
      const company = {
        id: querySnapshot.docs[0].id,
        ...querySnapshot.docs[0].data(),
      } as TCompanyResponse;

      return company;
    }

    return null;
  },
  async getCompanyById(companyId: string): Promise<TCompanyResponse | null> {
    const companyRef = doc(database, "companies", companyId);
    const companySnapshot = await getDoc(companyRef);

    if (companySnapshot.exists()) {
      const company = {
        id: companySnapshot.id,
        ...companySnapshot.data(),
      } as TCompanyResponse;

      return company;
    }

    return null;
  },
  async setCompanyInfo(
    companyId: string,
    data: Partial<TCompanyResponse>
  ): Promise<void> {
    if (data.slug) {
      const company = await this.getCompanyBySlug(data.slug);

      if (company && company.id !== companyId) {
        throw new Error("Esse link já está sendo utilizado por outra empresa.");
      }
    }

    const companyRef = doc(database, "companies", companyId);
    await setDoc(companyRef, data, { merge: true });
  },
};

export default CompanyService;
