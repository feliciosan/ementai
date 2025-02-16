"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import {
  RiArrowDownSLine,
  RiBookReadLine,
  RiBuilding4Line,
  RiInformationLine,
  RiShareCircleLine,
} from "react-icons/ri";
import CompanyInfoForm from "./CompanyInfoForm";
import CompanyAditionalInfoForm from "./CompanyAditionalInfoForm";
import CompanySocialForm from "./CompanySocialForm";

export default function ConfigForms() {
  return (
    <div className="w-full divide-y rounded-xl bg-gray-50 mb-4">
      <Disclosure as="div" className="p-4 md:p-6" defaultOpen={true}>
        <DisclosureButton className="group flex w-full items-center justify-between">
          <span className="flex items-center gap-2">
            <RiBuilding4Line className="size-5" />
            <span className="text-md font-bold">
              Informações do seu negócio
            </span>
          </span>
          <RiArrowDownSLine className="size-5 group-data-[open]:rotate-180" />
        </DisclosureButton>
        <DisclosurePanel className="mt-2 text-sm/5" unmount={false}>
          <CompanyInfoForm />
        </DisclosurePanel>
      </Disclosure>
      <Disclosure as="div" className="p-4 md:p-6">
        <DisclosureButton className="group flex w-full items-center justify-between">
          <span className="flex items-center gap-2">
            <RiBookReadLine className="size-5" />
            <span className="text-md font-bold">Itens do menu</span>
          </span>
          <RiArrowDownSLine className="size-5 group-data-[open]:rotate-180" />
        </DisclosureButton>
        <DisclosurePanel className="mt-2 text-sm/5" unmount={false}>
          No.
        </DisclosurePanel>
      </Disclosure>
      <Disclosure as="div" className="p-4 md:p-6">
        <DisclosureButton className="group flex w-full items-center justify-between">
          <span className="flex items-center gap-2">
            <RiInformationLine className="size-5" />
            <span className="text-md font-bold">Informações adicionais</span>
          </span>
          <RiArrowDownSLine className="size-5 group-data-[open]:rotate-180" />
        </DisclosureButton>
        <DisclosurePanel className="mt-2 text-sm/5" unmount={false}>
          <CompanyAditionalInfoForm />
        </DisclosurePanel>
      </Disclosure>
      <Disclosure as="div" className="p-4 md:p-6">
        <DisclosureButton className="group flex w-full items-center justify-between">
          <span className="flex items-center gap-2">
            <RiShareCircleLine className="size-5" />
            <span className="text-md font-bold">Redes socias</span>
          </span>
          <RiArrowDownSLine className="size-5 group-data-[open]:rotate-180" />
        </DisclosureButton>
        <DisclosurePanel className="mt-2 text-sm/5" unmount={false}>
          <CompanySocialForm />
        </DisclosurePanel>
      </Disclosure>
    </div>
  );
}
