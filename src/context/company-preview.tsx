import React, { createContext, useState } from "react";
import { TCompanyResponse } from "@/app/actions/company.types";

interface ICompanyPreviewContext {
  companyPreview: Partial<TCompanyResponse> | null;
  setCompanyPreview: React.Dispatch<
    React.SetStateAction<Partial<TCompanyResponse> | null>
  >;
}

export const CompanyPreviewContext = createContext<
  ICompanyPreviewContext | undefined
>(undefined);

export const CompanyPreviewProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [companyPreview, setCompanyPreview] =
    useState<Partial<TCompanyResponse> | null>(null);

  return (
    <CompanyPreviewContext.Provider
      value={{
        companyPreview,
        setCompanyPreview,
      }}
    >
      {children}
    </CompanyPreviewContext.Provider>
  );
};
