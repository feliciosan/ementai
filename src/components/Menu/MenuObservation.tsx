import { TCompanyInfo } from "@/app/actions/company.types";
import classNames from "classnames";

export default function MenuObservation({ info }: { info: TCompanyInfo }) {
  return (
    <section
      className={classNames("px-4 py-10", {
        "bg-gray-50": !info.theme.isDark,
        "bg-neutral-950": info.theme.isDark,
      })}
    >
      <p className="text-sm text-center">
        Observação: O IVA já está incluído nos preços. Não são permitidas taxas
        adicionais aos clientes.
      </p>
    </section>
  );
}
