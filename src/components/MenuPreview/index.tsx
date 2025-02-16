"use client";

import { Fragment, useEffect, useState } from "react";
import MenuHeader from "../Menu/MenuHeader";
import MenuContent from "../Menu/MenuContent";
import MenuObservation from "../Menu/MenuObservation";
import MenuFooter from "../Menu/MenuFooter";
import classNames from "classnames";
import { useAuth } from "@/hooks/use-auth.hook";
import { menuMock } from "@/mocks/menu";
import { companyInfoMock } from "@/mocks/company";
import { useCompanyPreview } from "@/hooks/use-company-preview";
import { TCompanyInfo } from "@/app/actions/company.types";

export default function MenuPreview() {
  const { currentCompany } = useAuth();
  const { companyInfoPreview } = useCompanyPreview();
  const [companyInfo, setCompanyInfo] = useState<TCompanyInfo | null>(null);
  const menu = currentCompany?.menu || menuMock;

  useEffect(() => {
    let data: TCompanyInfo = {
      ...companyInfoMock,
      ...currentCompany?.info,
    };

    if (companyInfoPreview) {
      data = {
        ...data,
        ...companyInfoPreview,
      };
    }

    setCompanyInfo(data);
  }, [companyInfoPreview, currentCompany?.info]);

  return (
    <Fragment>
      {!!companyInfo && (
        <div
          className={classNames("flex flex-col", {
            "bg-neutral-900 text-white": companyInfo.theme.isDark,
            "bg-white text-neutral-950": !companyInfo.theme.isDark,
          })}
        >
          <MenuHeader info={companyInfo} />
          <MenuContent info={companyInfo} menu={menu} isPreview />
          <MenuObservation info={companyInfo} />
          <MenuFooter info={companyInfo} />
        </div>
      )}
    </Fragment>
  );
}
