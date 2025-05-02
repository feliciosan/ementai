"use client";

import CompanyInfoForm from "./CompanyInfoForm";
import CompanyAditionalInfoForm from "./CompanyAditionalInfoForm";
import CompanySocialForm from "./CompanySocialForm";
import { Building, Info, Share2 } from "lucide-react";

export default function ConfigForms() {
  return (
    <div className="w-full flex flex-col gap-4 rounded-xl mb-4">
      <div className="bg-white border border-neutral-200 rounded-lg divide-y divide-neutral-200 overflow-hidden">
        <div className="flex items-center gap-2 p-4 bg-neutral-100">
          <Building className="size-5" />
          <h3 className="font-semibold">Informações do seu negócio</h3>
        </div>
        <div className="p-4">
          <CompanyInfoForm />
        </div>
      </div>
      <div className="bg-white border border-neutral-200 rounded-lg divide-y divide-neutral-200 overflow-hidden">
        <div className="flex items-center gap-2 p-4 bg-neutral-100">
          <Info className="size-5" />
          <h3 className="font-semibold">Informações adicionais</h3>
        </div>
        <div className="p-4">
          <CompanyAditionalInfoForm />
        </div>
      </div>
      <div className="bg-white border border-neutral-200 rounded-lg divide-y divide-neutral-200 overflow-hidden">
        <div className="flex items-center gap-2 p-4 bg-neutral-100">
          <Share2 className="size-5" />
          <h3 className="font-semibold">Redes sociais</h3>
        </div>
        <div className="p-4">
          <CompanySocialForm />
        </div>
      </div>
    </div>
  );
}
