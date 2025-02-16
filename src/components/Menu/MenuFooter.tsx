import { TCompanyInfo } from "@/app/actions/company.types";
import classNames from "classnames";
import {
  RiFacebookBoxLine,
  RiInstagramLine,
  RiWhatsappLine,
} from "react-icons/ri";

export default function MenuFooter({ info }: { info: Partial<TCompanyInfo> }) {
  return (
    <footer className="px-6 py-6">
      {info.aditicional?.address && (
        <div className="flex flex-col gap-2 mb-6">
          <h3 className="text-lg font-bold">Morada:</h3>
          <p className="text-sm">{info.aditicional?.address}</p>
        </div>
      )}
      {info.aditicional?.phone && (
        <div className="flex flex-col gap-2 mb-6">
          <h3 className="text-lg font-bold">Telefone:</h3>
          <p className="text-sm">
            <a href={`tel:${info.aditicional?.phone}`}>
              {info.aditicional?.phone}
            </a>
          </p>
        </div>
      )}
      {info.aditicional?.email && (
        <div className="flex flex-col gap-2 mb-6">
          <h3 className="text-lg font-bold">E-mail:</h3>
          <p className="text-sm">
            <a href={`mailto:${info.aditicional?.email}`}>
              {info.aditicional?.email}
            </a>
          </p>
        </div>
      )}
      {info.aditicional?.extra && (
        <div className="flex flex-col gap-2 mb-6">
          <h3 className="text-lg font-bold">{info.aditicional?.extra.label}</h3>
          <p className="text-sm">{info.aditicional?.extra.value}</p>
        </div>
      )}
      {!!info.social && (
        <div
          className={classNames("flex flex-col gap-4 mt-6 border-t pt-6", {
            "border-gray-200": !info.theme?.isDark,
            "border-neutral-950": info.theme?.isDark,
          })}
        >
          <h3 className="text-lg font-bold">Visite-nos nas redes sociais:</h3>
          <div className="flex gap-4">
            {info.social.facebook && (
              <div className="bg-[#3b5998] text-white rounded-full p-2">
                <a
                  href={info.social.facebook}
                  target="_blank"
                  className="text-3xl"
                >
                  <RiFacebookBoxLine />
                </a>
              </div>
            )}
            {info.social.instagram && (
              <div className="bg-[#c13584] text-white rounded-full p-2">
                <a
                  href={info.social.instagram}
                  target="_blank"
                  className="text-3xl"
                >
                  <RiInstagramLine />
                </a>
              </div>
            )}
            {info.social.whatsapp && (
              <div className="bg-[#25d366] text-white rounded-full p-2">
                <a
                  href={`https://wa.me/${info.social.whatsapp}`}
                  target="_blank"
                  className="text-3xl"
                >
                  <RiWhatsappLine />
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </footer>
  );
}
