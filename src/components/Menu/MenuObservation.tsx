import { TCompanyInfo } from "@/app/actions/company.types";
import classNames from "classnames";

export default function MenuObservation({
  info,
}: {
  info: Partial<TCompanyInfo>;
}) {
  return (
    <section
      className={classNames("px-4 py-6", {
        "bg-gray-50": !info.theme?.isDark,
        "bg-neutral-950": info.theme?.isDark,
      })}
    >
      <h2 className="text-xl font-bold text-center">Mais informações</h2>
    </section>
  );
}
