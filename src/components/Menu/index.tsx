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

export default function Menu({ company }: { company: TCompanyResponse }) {
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
      <div className="flex justify-center mt-16">
        <Spinner type="local" />
      </div>
    );
  }

  if (!company?.info) {
    return <div>Not found</div>;
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
