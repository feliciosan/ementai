import CompanyService from "@/app/actions/company";
import MenuHeader from "./MenuHeader";
import MenuContent from "./MenuContent";
import MenuObservation from "./MenuObservation";
import MenuFooter from "./MenuFooter";
import EmentaiRights from "../EmentaiRights";
import classNames from "classnames";
import { menuMock } from "@/mocks/menu";

export default async function Menu({ slug }: { slug: string }) {
  const company = await CompanyService.getCompanyBySlug(slug);

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
        <MenuContent info={company.info} menu={company.menu || menuMock} />
        <MenuObservation info={company.info} />
        <MenuFooter info={company.info} />
      </div>
      <EmentaiRights />
    </div>
  );
}
