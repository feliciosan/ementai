"use client";

import MenuHeader from "./MenuHeader";
import MenuContent from "./MenuContent";
import MenuFooter from "./MenuFooter";
import EmentaiRights from "../EmentaiRights";
import classNames from "classnames";
import MenuService from "@/services/menu";
import Spinner from "../Spinner";
import { useQuery } from "@tanstack/react-query";
import { menuMock } from "@/mocks/menu";
import { TCompanyResponse } from "@/services/company.types";

export default function Menu({
  company,
  isAuthenticated,
}: {
  company: TCompanyResponse;
  isAuthenticated?: boolean;
}) {
  const {
    data: menu,
    isFetching,
    isFetched,
  } = useQuery({
    queryKey: ["get-menu", company?.id],
    queryFn: async () => MenuService.getMenuCategories(company?.id || ""),
    initialData: [],
    enabled: !!company?.id,
    select: (menu) => (menu.length ? menu : menuMock),
  });

  if (isFetching && !isFetched) {
    return (
      <div className="flex justify-center mt-32">
        <Spinner type="local" />
      </div>
    );
  }

  if (!company?.info && isAuthenticated) {
    return (
      <div className="flex flex-col items-center mt-16 px-4">
        <h1 className="text-white text-lg font-bold rounded-md bg-teal-600 px-2 py-1">
          Ementai
        </h1>
        <p className="text-center text-white mt-4">
          Configure as informações do seu estabelecimento no formulário ao lado.
        </p>
      </div>
    );
  }

  if (!company?.info) {
    return (
      <div className="flex flex-col items-center mt-16 px-4">
        <h1 className="text-neutral-950 text-lg font-bold rounded-md bg-teal-600 px-2 py-1">
          Ementai
        </h1>
        <p className="text-center text-neutral-950 mt-4">
          Este cardápio não está disponível no momento.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div
        className={classNames("flex flex-col", {
          "bg-neutral-900 text-white": company?.info?.theme?.isDark,
          "bg-white text-neutral-950": !company?.info?.theme?.isDark,
        })}
      >
        <MenuHeader info={company.info} />
        <MenuContent info={company.info} menu={menu} />
        <MenuFooter info={company.info} />
      </div>
      <EmentaiRights />
    </div>
  );
}
