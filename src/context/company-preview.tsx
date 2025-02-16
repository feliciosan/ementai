import React, { createContext, useState } from "react";
import { TCompanyResponse } from "@/app/actions/company.types";

interface ICompanyPreviewContext {
  companyInfoPreview: Partial<TCompanyResponse["info"]> | null;
  setCompanyInfoPreview: React.Dispatch<
    React.SetStateAction<Partial<TCompanyResponse["info"]> | null>
  >;
}

export const CompanyPreviewContext = createContext<
  ICompanyPreviewContext | undefined
>(undefined);

export const CompanyInfoPreviewProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [companyInfoPreview, setCompanyInfoPreview] = useState<Partial<
    TCompanyResponse["info"]
  > | null>(null);

  return (
    <CompanyPreviewContext.Provider
      value={{
        companyInfoPreview,
        setCompanyInfoPreview,
      }}
    >
      {children}
    </CompanyPreviewContext.Provider>
  );
};
