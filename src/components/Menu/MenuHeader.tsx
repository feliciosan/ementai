import { TCompanyInfo } from "@/app/actions/company.types";
import Image from "next/image";

export default function MenuHeader({ info }: { info: TCompanyInfo }) {
  return (
    <header
      className="min-h-[70vh] bg-no-repeat bg-cover bg-center relative flex items-center justify-center"
      style={{
        backgroundColor: info.theme.primaryColor,
        backgroundImage: `url(${info.backgroundImage})`,
        color: "white",
      }}
    >
      <span className="text-xs absolute mx-auto inline-block top-4 z-10">
        Cardápio online by Ementai
      </span>
      <div className="absolute inset-0 bg-black opacity-35"></div>
      <picture className="relative w-44 h-44 overflow-hidden rounded-3xl">
        <Image
          src={info.logo}
          alt="Company Name logo"
          priority
          width={176}
          height={176}
        />
      </picture>
    </header>
  );
}
