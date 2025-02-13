"use client";

import { useContext } from "react";
import { CompanyPreviewContext } from "@/context/company-preview";

export function useCompanyPreview() {
  const context = useContext(CompanyPreviewContext);

  if (!context) {
    throw new Error(
      "useCompanyPreview must be used within a CompanyPreviewProvider"
    );
  }

  return context;
}
