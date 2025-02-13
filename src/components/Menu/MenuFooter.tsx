import { TCompanyInfo } from "@/app/actions/company.types";
import classNames from "classnames";
import {
  RiFacebookBoxLine,
  RiInstagramLine,
  RiWhatsappLine,
} from "react-icons/ri";

export default function MenuFooter({ info }: { info: TCompanyInfo }) {
  return (
    <footer className="px-6 py-10">
      <div
        className={classNames("flex flex-col gap-2 border-b  pb-10", {
          "border-gray-200": !info.theme.isDark,
          "border-neutral-950": info.theme.isDark,
        })}
      >
        <h3 className="text-lg font-bold">{info.name}</h3>
        <p className="text-sm">Rua do Estabelecimento, 1234</p>
        <p className="text-sm">
          <span className="inline-block mr-1">Telefone:</span>
          <a href="tel:+">123 456 789</a>
        </p>
        <p className="text-sm">
          Horário de Funcionamento: 12:00 - 15:00, 19:00 - 23:00
        </p>
      </div>
      <div
        className={classNames("flex flex-col gap-2 pt-10 border-b pb-10", {
          "border-gray-200": !info.theme.isDark,
          "border-neutral-950": info.theme.isDark,
        })}
      >
        <h3 className="text-lg font-bold">Encomendas e Take Away</h3>
        <p className="text-sm">Telefone: 123 456 789</p>
      </div>
      <div className="flex flex-col gap-4 mt-10">
        <h3 className="text-lg font-bold">Visite-nos nas redes sociais:</h3>
        <div className="flex gap-4">
          <div className="bg-[#3b5998] text-white rounded-full p-2">
            <a
              href="https://www.facebook.com"
              target="_blank"
              className="text-3xl"
            >
              <RiFacebookBoxLine />
            </a>
          </div>
          <div className="bg-[#c13584] text-white rounded-full p-2">
            <a
              href="https://www.instagram.com"
              target="_blank"
              className="text-3xl"
            >
              <RiInstagramLine />
            </a>
          </div>
          <div className="bg-[#25d366] text-white rounded-full p-2">
            <a
              href="https://www.whatsapp.com"
              target="_blank"
              className="text-3xl"
            >
              <RiWhatsappLine />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
